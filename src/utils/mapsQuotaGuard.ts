import { useEffect, useState, useCallback } from 'react';

export type MapsUsageKind = 'mapLoads' | 'places' | 'routes';

export type MapsStopReason =
  | 'near_limit'
  | 'api_quota_exceeded'
  | 'manual_pause'
  | 'server_paused'
  | null;

export interface MapsQuotaGuardState {
  month: string;
  mapLoads: number;
  places: number;
  routes: number;
  manualPaused: boolean;
  apiQuotaExceeded: boolean;
}

export interface MapsQuotaLimits {
  mapLoads: number;
  places: number;
  routes: number;
  autoStopRatio: number; // Automatically stops at 80% of safe monthly budget
  warnRatio: number; // Warns gently at 65% of safe monthly budget
}

const STORAGE_KEY = 'sanctum_gmp_quota_guard_v1';
const GUARD_EVENT = 'sanctum-gmp-guard-change';

function parsePositiveInt(val: unknown, fallback: number): number {
  const n = Number(val);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

// Conservative defaults well under Google Maps Platform's monthly free caps
// so the circuit breaker trips long before any charges can ever occur.
export const MAPS_QUOTA_LIMITS: MapsQuotaLimits = {
  mapLoads: parsePositiveInt(import.meta.env.VITE_GMP_MONTHLY_MAP_LIMIT, 800),
  places: parsePositiveInt(import.meta.env.VITE_GMP_MONTHLY_PLACES_LIMIT, 400),
  routes: parsePositiveInt(import.meta.env.VITE_GMP_MONTHLY_ROUTES_LIMIT, 400),
  autoStopRatio: 0.8,
  warnRatio: 0.65,
};

function getCurrentMonthKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function createFreshState(): MapsQuotaGuardState {
  return {
    month: getCurrentMonthKey(),
    mapLoads: 0,
    places: 0,
    routes: 0,
    manualPaused: false,
    apiQuotaExceeded: false,
  };
}

export function isEnvMapsPaused(): boolean {
  return String(import.meta.env.VITE_GOOGLE_MAPS_PAUSED || '').toLowerCase() === 'true';
}

export function readMapsQuotaState(): MapsQuotaGuardState {
  const currentMonth = getCurrentMonthKey();
  if (typeof window === 'undefined') return createFreshState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createFreshState();
    const parsed = JSON.parse(raw) as Partial<MapsQuotaGuardState>;
    // Automatically reset counters on the 1st of each new calendar month
    if (parsed.month !== currentMonth) {
      const fresh: MapsQuotaGuardState = {
        ...createFreshState(),
        manualPaused: Boolean(parsed.manualPaused),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    return {
      month: currentMonth,
      mapLoads: Math.max(0, Number(parsed.mapLoads) || 0),
      places: Math.max(0, Number(parsed.places) || 0),
      routes: Math.max(0, Number(parsed.routes) || 0),
      manualPaused: Boolean(parsed.manualPaused),
      apiQuotaExceeded: Boolean(parsed.apiQuotaExceeded),
    };
  } catch {
    return createFreshState();
  }
}

function writeMapsQuotaState(next: MapsQuotaGuardState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(GUARD_EVENT, { detail: next }));
  } catch {
    // Ignore storage errors (private browsing)
  }
}

export function evaluateMapsQuotaStatus(
  state: MapsQuotaGuardState,
  serverPaused = false
): {
  isStopped: boolean;
  isApproaching: boolean;
  stopReason: MapsStopReason;
  maxPercentUsed: number;
  highestCategory: MapsUsageKind;
} {
  const ratios: Record<MapsUsageKind, number> = {
    mapLoads: state.mapLoads / MAPS_QUOTA_LIMITS.mapLoads,
    places: state.places / MAPS_QUOTA_LIMITS.places,
    routes: state.routes / MAPS_QUOTA_LIMITS.routes,
  };

  let highestCategory: MapsUsageKind = 'mapLoads';
  let maxRatio = ratios.mapLoads;
  if (ratios.places > maxRatio) {
    maxRatio = ratios.places;
    highestCategory = 'places';
  }
  if (ratios.routes > maxRatio) {
    maxRatio = ratios.routes;
    highestCategory = 'routes';
  }

  const maxPercentUsed = Math.min(100, Math.round(maxRatio * 100));

  if (serverPaused || isEnvMapsPaused()) {
    return {
      isStopped: true,
      isApproaching: false,
      stopReason: 'server_paused',
      maxPercentUsed,
      highestCategory,
    };
  }

  if (state.manualPaused) {
    return {
      isStopped: true,
      isApproaching: false,
      stopReason: 'manual_pause',
      maxPercentUsed,
      highestCategory,
    };
  }

  if (state.apiQuotaExceeded) {
    return {
      isStopped: true,
      isApproaching: false,
      stopReason: 'api_quota_exceeded',
      maxPercentUsed: Math.max(maxPercentUsed, 100),
      highestCategory,
    };
  }

  if (maxRatio >= MAPS_QUOTA_LIMITS.autoStopRatio) {
    return {
      isStopped: true,
      isApproaching: false,
      stopReason: 'near_limit',
      maxPercentUsed,
      highestCategory,
    };
  }

  return {
    isStopped: false,
    isApproaching: maxRatio >= MAPS_QUOTA_LIMITS.warnRatio,
    stopReason: null,
    maxPercentUsed,
    highestCategory,
  };
}

export function isGoogleMapsStopped(serverPaused = false): boolean {
  return evaluateMapsQuotaStatus(readMapsQuotaState(), serverPaused).isStopped;
}

/**
 * Records a Google Maps Platform billable call and returns `false` if the
 * safety threshold has been reached (stopping the call immediately).
 */
export function recordGoogleMapsUsage(kind: MapsUsageKind, amount = 1): boolean {
  const current = readMapsQuotaState();
  if (evaluateMapsQuotaStatus(current).isStopped) {
    return false;
  }
  const next: MapsQuotaGuardState = {
    ...current,
    [kind]: current[kind] + amount,
  };
  writeMapsQuotaState(next);
  return !evaluateMapsQuotaStatus(next).isStopped;
}

export function tripMapsApiQuotaExceeded(): void {
  const current = readMapsQuotaState();
  if (!current.apiQuotaExceeded) {
    writeMapsQuotaState({
      ...current,
      apiQuotaExceeded: true,
    });
  }
}

export function setManualMapsPaused(paused: boolean): void {
  const current = readMapsQuotaState();
  writeMapsQuotaState({
    ...current,
    manualPaused: paused,
    // If the user explicitly resumes after adding billing/budget, also clear stale local apiQuotaExceeded flag
    ...(paused ? {} : { apiQuotaExceeded: false }),
  });
}

export function resetMonthlyMapsQuotaCounters(): void {
  writeMapsQuotaState(createFreshState());
}

export function useMapsQuotaGuard(serverPaused = false) {
  const [state, setState] = useState<MapsQuotaGuardState>(() => readMapsQuotaState());

  useEffect(() => {
    const sync = () => setState(readMapsQuotaState());
    const onQuotaExceeded = () => {
      tripMapsApiQuotaExceeded();
      sync();
    };

    window.addEventListener(GUARD_EVENT, sync);
    window.addEventListener('storage', sync);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => {
      window.removeEventListener(GUARD_EVENT, sync);
      window.removeEventListener('storage', sync);
      window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
    };
  }, []);

  const evaluation = evaluateMapsQuotaStatus(state, serverPaused);

  const pauseMaps = useCallback(() => setManualMapsPaused(true), []);
  const resumeMaps = useCallback(() => setManualMapsPaused(false), []);

  return {
    state,
    ...evaluation,
    pauseMaps,
    resumeMaps,
  };
}

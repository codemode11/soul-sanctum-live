import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import {
  isGoogleMapsStopped,
  recordGoogleMapsUsage,
  tripMapsApiQuotaExceeded,
} from '../utils/mapsQuotaGuard';

export function isMapsQuotaError(err: unknown): boolean {
  if (!err) return false;
  const anyErr = err as any;
  const status = String(anyErr?.status ?? anyErr?.code ?? '').toUpperCase();
  const message = String(anyErr?.message ?? err ?? '');
  return (
    status === '429' ||
    status === 'RESOURCE_EXHAUSTED' ||
    status === 'OVER_QUERY_LIMIT' ||
    message.includes('RESOURCE_EXHAUSTED') ||
    message.includes('OVER_QUERY_LIMIT') ||
    message.includes('OverQuotaMapError') ||
    message.includes('QuotaExceededError') ||
    /\b429\b/.test(message)
  );
}

export function notifyMapsQuotaExceeded() {
  tripMapsApiQuotaExceeded();
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  }
}

export interface UsePlaceAutocompleteReturn {
  suggestions: google.maps.places.AutocompleteSuggestion[];
  isLoading: boolean;
  resetSession: () => void;
}

/**
 * Retrieves place autocomplete predictions using Places API (New)
 * AutocompleteSuggestion.fetchAutocompleteSuggestions with session token billing optimization.
 * Docs: https://developers.google.com/maps/documentation/javascript/place-autocomplete-data?utm_campaign=gmp_mcp_codeassist_v1_aistudio
 */
export function usePlaceAutocomplete(
  inputString: string,
  originBias?: google.maps.LatLngLiteral | null
): UsePlaceAutocompleteReturn {
  const placesLib = useMapsLibrary('places');
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmed = inputString.trim();
    if (!placesLib || trimmed.length < 2 || isGoogleMapsStopped()) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      if (isGoogleMapsStopped()) return;
      try {
        const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;
        if (!sessionTokenRef.current) {
          sessionTokenRef.current = new AutocompleteSessionToken();
          // Count once per billing session
          if (!recordGoogleMapsUsage('places')) {
            setSuggestions([]);
            setIsLoading(false);
            return;
          }
        }

        setIsLoading(true);
        const request: google.maps.places.AutocompleteRequest = {
          input: trimmed,
          sessionToken: sessionTokenRef.current,
          ...(originBias ? { origin: originBias } : {}),
        };

        const res = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        if (!cancelled) {
          setSuggestions(res?.suggestions ?? []);
        }
      } catch (err) {
        if (isMapsQuotaError(err)) {
          notifyMapsQuotaExceeded();
        }
        if (!cancelled) {
          setSuggestions([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 220);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [placesLib, inputString, originBias?.lat, originBias?.lng]);

  const resetSession = useCallback(() => {
    sessionTokenRef.current = null;
    setSuggestions([]);
  }, []);

  return { suggestions, isLoading, resetSession };
}

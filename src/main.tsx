import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';
import {installGlobalCurvedQuotes} from './utils/smartQuotes';

if (typeof window !== 'undefined') {
  (window as any).gm_authFailure = () => {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  };
  const origConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    origConsoleError.apply(console, args);
    const msg = args.map((a) => String(a)).join(' ');
    if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    }
  };

  if (import.meta.env.PROD) {
    registerSW({
      immediate: true,
      onRegisterError(error) {
        console.warn('[Soul Sanctum PWA] Service worker registration skipped:', error);
      },
    });
  } else if ('serviceWorker' in navigator) {
    const reloadOnceAfterEviction = () => {
      try {
        if (!sessionStorage.getItem('sanctum_dev_sw_evicted_v2')) {
          sessionStorage.setItem('sanctum_dev_sw_evicted_v2', '1');
          window.location.reload();
        }
      } catch {
        // Ignore storage errors in restricted iframes
      }
    };

    const hadController = Boolean(navigator.serviceWorker.controller);
    navigator.serviceWorker.addEventListener('controllerchange', reloadOnceAfterEviction, { once: true });

    Promise.all([
      navigator.serviceWorker.getRegistrations().then(async (registrations) => {
        if (registrations.length === 0) return false;
        await Promise.all(
          registrations.map(async (reg) => {
            try {
              await reg.update();
            } catch {
              // Ignore update error
            }
            try {
              await reg.unregister();
            } catch {
              // Ignore unregister error
            }
          }),
        );
        return true;
      }).catch(() => false),
      'caches' in window
        ? caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key).catch(() => false)))).catch(() => [])
        : Promise.resolve([]),
    ]).then(([hadRegistrations]) => {
      if (hadController || hadRegistrations) {
        reloadOnceAfterEviction();
      }
    }).catch(() => {});
  }
}

const rootEl = document.getElementById('root')!;
installGlobalCurvedQuotes(rootEl);
createRoot(rootEl).render(<App />);


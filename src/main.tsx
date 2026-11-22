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

  registerSW({
    immediate: true,
    onRegisterError(error) {
      console.warn('[Soul Sanctum PWA] Service worker registration skipped:', error);
    },
  });
}

const rootEl = document.getElementById('root')!;
installGlobalCurvedQuotes(rootEl);
createRoot(rootEl).render(<App />);


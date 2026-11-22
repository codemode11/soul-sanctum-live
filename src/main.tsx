import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';
import {installGlobalCurvedQuotes} from './utils/smartQuotes';

if (typeof window !== 'undefined') {
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


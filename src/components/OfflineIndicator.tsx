import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[76px] md:bottom-4 left-3 sm:left-4 z-50 flex items-center gap-2 rounded-xl bg-[#23140B]/95 border border-amber-400/60 px-3.5 py-2 text-xs font-serif text-amber-100 shadow-2xl backdrop-blur-md"
    >
      <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <span>Offline Mode — Using cached prayers &amp; readings.</span>
    </div>
  );
};

import React from 'react';
import { BookOpen, Sparkles, Crown, Library, Compass, Smartphone, WifiOff } from 'lucide-react';
import { ActiveTab } from './Navigation';
import { useOnlineStatus } from '../hooks/usePWAInstall';

interface AndroidBottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenIndexDrawer: () => void;
  onOpenAndroidModal: () => void;
  isAndroidPreviewMode: boolean;
  onToggleAndroidPreviewMode: () => void;
}

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-900/95 border border-amber-400/60 px-3.5 py-2 text-xs font-serif font-semibold text-amber-100 shadow-xl backdrop-blur-md">
      <WifiOff className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
      <span>Android Offline Mode — Reading from cached Sanctum treasury.</span>
    </div>
  );
};

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenIndexDrawer,
  onOpenAndroidModal,
  isAndroidPreviewMode,
}) => {
  const navItems: Array<{
    id: ActiveTab | 'index-drawer';
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'readings',
      label: 'Mass',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'bible-study',
      label: 'Catena',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'rosary',
      label: 'Rosary',
      icon: <Crown className="w-4 h-4" />,
    },
    {
      id: 'saints',
      label: 'Saint',
      icon: (
        <span className="text-sm leading-none font-serif font-bold">✠</span>
      ),
    },
    {
      id: 'spiritual-books',
      label: 'Classics',
      icon: <Library className="w-4 h-4" />,
    },
    {
      id: 'index-drawer',
      label: 'Index',
      icon: <Compass className="w-4 h-4" />,
    },
  ];

  return (
    <nav
      aria-label="Android Bottom Navigation"
      className={`${
        isAndroidPreviewMode
          ? 'flex max-w-[430px] mx-auto border-x-2 border-amber-500/45'
          : 'flex lg:hidden'
      } fixed bottom-0 inset-x-0 z-40 bg-gradient-to-t from-[#120904] via-[#1C0F08]/98 to-[#26150B]/95 backdrop-blur-xl border-t border-amber-500/35 shadow-[0_-6px_28px_rgba(0,0,0,0.75)] px-1.5 pt-1.5 pb-2 select-none`}
    >
      <div className="max-w-lg mx-auto w-full grid grid-cols-6 gap-0.5 items-center">
        {navItems.map((item) => {
          const isActive = item.id !== 'index-drawer' && activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === 'index-drawer') {
                  onOpenIndexDrawer();
                } else {
                  onSelectTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-amber-200'
                  : 'text-stone-400 hover:text-amber-200/80'
              }`}
            >
              <div
                className={`flex items-center justify-center w-11 h-6 rounded-full transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-700/80 via-amber-600/80 to-amber-700/80 text-white shadow-[0_0_12px_rgba(245,158,11,0.5)] ring-1 ring-amber-400/60'
                    : 'bg-transparent'
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] mt-0.5 font-serif tracking-tight truncate max-w-full ${
                  isActive ? 'font-bold text-amber-200' : 'font-medium text-stone-300'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subtle Android Home Gesture Indicator Pill */}
      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/25 pointer-events-none" />
    </nav>
  );
};

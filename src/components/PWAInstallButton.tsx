import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'sidebar' | 'header' | 'banner';
  className?: string;
}

const DISMISS_BANNER_KEY = 'sanctum_pwa_banner_dismissed_v1';

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'sidebar',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(DISMISS_BANNER_KEY) === '1';
    } catch {
      return false;
    }
  });

  // Automatically suppress when already running as an installed standalone PWA
  if (isInstalled) {
    return null;
  }

  const handleClickInstall = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        // User dismissed native prompt; do not force modal
      }
      return;
    }
    setShowGuideModal(true);
  };

  const handleDismissBanner = () => {
    setIsBannerDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_BANNER_KEY, '1');
    } catch {
      // Ignore storage restrictions
    }
  };

  const guideModal =
    showGuideModal && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setShowGuideModal(false)}
          >
            <div
              className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-[#23140B] via-[#1A100A] to-[#120A05] border border-amber-400/40 p-5 sm:p-6 text-stone-100 shadow-[0_24px_60px_rgba(0,0,0,0.85)] space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close install guide"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 pr-6">
                <img
                  src="/pwa-192x192.png"
                  alt="Soul Sanctum App Icon"
                  className="w-12 h-12 rounded-xl border border-amber-400/50 shadow-md shrink-0"
                />
                <div>
                  <span className="font-cinzel text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 block">
                    Install Catholic App
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-white leading-tight">
                    Soul Sanctum
                  </h3>
                </div>
              </div>

              <p className="text-xs font-serif text-stone-200 leading-relaxed">
                Install <strong>Soul Sanctum</strong> directly to your home screen for full-screen standalone prayer, Daily Mass Readings, Divine Office, and offline access.
              </p>

              {isIOS ? (
                <div className="space-y-2.5 rounded-xl bg-black/40 border border-amber-500/25 p-3.5 text-xs font-serif text-stone-200">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-200 font-cinzel text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      Tap the <strong className="text-amber-200 inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 inline" /> Share</strong> button in Safari&apos;s toolbar.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-200 font-cinzel text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      Scroll down and tap <strong className="text-amber-200 inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5 inline" /> Add to Home Screen</strong>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-200 font-cinzel text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      Tap <strong className="text-amber-200">Add</strong> in the top corner to launch Soul Sanctum as a standalone app.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 rounded-xl bg-black/40 border border-amber-500/25 p-3.5 text-xs font-serif text-stone-200">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-200 font-cinzel text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      Open your browser menu (<strong className="text-amber-200">⋮</strong> in Chrome/Edge or <strong className="text-amber-200">Share</strong> in Safari).
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-200 font-cinzel text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      Select <strong className="text-amber-200">Install App</strong> or <strong className="text-amber-200">Add to Home Screen</strong>.
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-[11px] text-amber-200/85 font-serif">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Works offline • Zero app store download needed</span>
              </div>

              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#A67C52] to-[#8B5A2B] hover:from-[#B5895E] hover:to-[#9B6837] text-amber-50 font-cinzel text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-amber-300/40"
              >
                Got It
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  if (variant === 'banner') {
    if (isBannerDismissed) return null;
    // Show banner on mobile/tablet browsers or whenever native prompt is ready
    if (!isInstallable && !isIOS) return null;

    return (
      <>
        <div
          className={`w-full max-w-4xl mx-auto rounded-xl bg-[#23140B]/90 backdrop-blur-md border border-amber-400/45 px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-lg flex items-center justify-between gap-3 ${className}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/pwa-192x192.png"
              alt="Soul Sanctum App"
              className="w-9 h-9 rounded-lg border border-amber-400/50 shrink-0 shadow-sm"
            />
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                <span className="font-cinzel text-[11px] sm:text-xs font-bold text-amber-100 tracking-wide truncate">
                  Install Soul Sanctum App
                </span>
              </div>
              <p className="text-[11px] font-serif text-stone-300 truncate">
                Full-screen sanctuary &amp; offline Mass readings on your phone
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleClickInstall}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A67C52] hover:bg-[#966B43] border border-amber-300/50 text-amber-50 font-cinzel text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isIOS ? 'Install' : 'Install App'}</span>
            </button>
            <button
              type="button"
              onClick={handleDismissBanner}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Dismiss install banner"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        {guideModal}
      </>
    );
  }

  if (variant === 'header') {
    return (
      <>
        <button
          type="button"
          onClick={handleClickInstall}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#A67C52]/90 hover:bg-[#966B43] border border-amber-300/50 text-amber-50 font-cinzel text-[10.5px] sm:text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer whitespace-nowrap ${className}`}
          title="Install Soul Sanctum as a standalone app"
        >
          <Download className="w-3.5 h-3.5 shrink-0" />
          <span>Install App</span>
        </button>
        {guideModal}
      </>
    );
  }

  // Default: 'sidebar' (Index drawer & desktop sidebar)
  return (
    <>
      <button
        type="button"
        onClick={handleClickInstall}
        className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#3A2212] via-[#2B190E] to-[#3A2212] hover:from-[#4A2C18] hover:to-[#4A2C18] border border-amber-400/45 hover:border-amber-300/80 text-amber-100 transition-all shadow-md cursor-pointer group ${className}`}
        title="Install Soul Sanctum App to your Home Screen"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#120A05] border border-amber-400/50 flex items-center justify-center shrink-0 overflow-hidden">
            <img src="/pwa-192x192.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="text-left min-w-0">
            <span className="font-cinzel text-[11px] font-bold tracking-wider uppercase text-amber-200 block truncate">
              Install App
            </span>
            <span className="font-serif text-[11px] text-stone-300 block truncate">
              {isIOS ? 'Add to iPhone / iPad' : 'Standalone & Offline Mode'}
            </span>
          </div>
        </div>
        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors shrink-0">
          {isIOS ? <Smartphone className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
        </div>
      </button>
      {guideModal}
    </>
  );
};

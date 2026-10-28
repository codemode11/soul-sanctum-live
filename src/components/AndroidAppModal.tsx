import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  Check,
  Copy,
  X,
  ShieldCheck,
  Wifi,
  Sparkles,
  BookOpen,
  Layers,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAndroidPreviewMode: boolean;
  onToggleAndroidPreviewMode: () => void;
}

export const PWAInstallButton: React.FC<{
  onOpenAndroidModal: () => void;
  isAndroidPreviewMode: boolean;
}> = ({ onOpenAndroidModal, isAndroidPreviewMode }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        onOpenAndroidModal();
      }
    } else {
      onOpenAndroidModal();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer shadow-md border ${
        isAndroidPreviewMode
          ? 'bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 border-emerald-400/60 ring-1 ring-emerald-400/40'
          : 'bg-gradient-to-r from-[#2D1A0E]/90 via-[#3D2312]/90 to-[#2D1A0E]/90 hover:from-[#3D2312] hover:to-[#4E2D17] text-amber-200 border-amber-400/45 backdrop-blur-md'
      }`}
      title={
        isInstalled
          ? 'Soul Sanctum Android App Installed — Open Android Settings & Mode'
          : 'Install or Launch Soul Sanctum for Android'
      }
    >
      <Smartphone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
      <span>{isAndroidPreviewMode ? 'Android View: ON' : isInstalled ? 'Android App' : 'Android App'}</span>
    </button>
  );
};

export const AndroidAppModal: React.FC<AndroidAppModalProps> = ({
  isOpen,
  onClose,
  isAndroidPreviewMode,
  onToggleAndroidPreviewMode,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeSection, setActiveSection] = useState<'install' | 'apk-build'>('install');

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://soulsanctum.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const bubblewrapCommands = `npm i -g @bubblewrap/cli
mkdir soul-sanctum-android && cd soul-sanctum-android
bubblewrap init --manifest="${appUrl}/manifest.webmanifest"
bubblewrap build`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(bubblewrapCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  const downloadFile = (filename: string, content: string, mimeType = 'application/json') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTWAManifest = () => {
    const twaManifest = {
      packageId: 'com.soulsanctum.catholic',
      host: typeof window !== 'undefined' ? window.location.host : 'soulsanctum.app',
      name: 'Soul Sanctum',
      launcherName: 'SoulSanctum',
      display: 'standalone',
      themeColor: '#1C0F08',
      navigationColor: '#120A05',
      navigationColorDark: '#120A05',
      navigationDividerColor: '#3E2415',
      backgroundColor: '#120A05',
      enableNotifications: true,
      startUrl: '/',
      iconUrl: `${appUrl}/pwa-512x512.png`,
      maskableIconUrl: `${appUrl}/pwa-maskable-512x512.png`,
      splashScreenFadeOutDuration: 300,
      appVersionName: '1.0.0',
      appVersionCode: 1,
      shortcuts: [
        {
          name: 'Daily Mass Readings',
          shortName: 'Readings',
          url: '/?tab=readings',
          chosenIconUrl: `${appUrl}/pwa-192x192.png`,
        },
        {
          name: 'Holy Rosary & Chaplet',
          shortName: 'Rosary',
          url: '/?tab=rosary',
          chosenIconUrl: `${appUrl}/pwa-192x192.png`,
        },
        {
          name: 'Saint of the Day',
          shortName: 'Saint',
          url: '/?tab=saints',
          chosenIconUrl: `${appUrl}/pwa-192x192.png`,
        },
        {
          name: 'Catholic Classics',
          shortName: 'Classics',
          url: '/?tab=spiritual-books',
          chosenIconUrl: `${appUrl}/pwa-192x192.png`,
        },
      ],
      generatorApp: 'bubblewrap-cli',
      orientation: 'portrait',
    };
    downloadFile('twa-manifest.json', JSON.stringify(twaManifest, null, 2));
  };

  const handleDownloadCapacitorConfig = () => {
    const capConfig = {
      appId: 'com.soulsanctum.catholic',
      appName: 'Soul Sanctum',
      webDir: 'dist',
      bundledWebRuntime: false,
      server: {
        androidScheme: 'https',
      },
      plugins: {
        SplashScreen: {
          launchShowDuration: 1500,
          backgroundColor: '#120A05',
          androidSplashResourceName: 'splash',
          androidScaleType: 'CENTER_CROP',
        },
        StatusBar: {
          style: 'DARK',
          backgroundColor: '#1C0F08',
        },
      },
    };
    downloadFile('capacitor.config.json', JSON.stringify(capConfig, null, 2));
  };

  const handleDownloadAndroidManifestXml = () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.soulsanctum.catholic"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:label="Soul Sanctum"
        android:supportsRtl="true"
        android:theme="@style/Theme.SoulSanctum.NoActionBar">

        <meta-data
            android:name="asset_statements"
            android:resource="@string/asset_statements" />

        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
            android:exported="true"
            android:label="Soul Sanctum"
            android:screenOrientation="portrait"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density">

            <meta-data
                android:name="android.support.customtabs.trusted.DEFAULT_URL"
                android:value="${appUrl}/" />
            <meta-data
                android:name="android.support.customtabs.trusted.STATUS_BAR_COLOR"
                android:resource="@color/sanctum_status_bar" />
            <meta-data
                android:name="android.support.customtabs.trusted.NAVIGATION_BAR_COLOR"
                android:resource="@color/sanctum_nav_bar" />
            <meta-data
                android:name="android.support.customtabs.trusted.SPLASH_IMAGE_DRAWABLE"
                android:resource="@drawable/splash" />
            <meta-data
                android:name="android.support.customtabs.trusted.SPLASH_SCREEN_BACKGROUND_COLOR"
                android:resource="@color/sanctum_splash_bg" />

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https" android:host="${typeof window !== 'undefined' ? window.location.host : 'soulsanctum.app'}" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;
    downloadFile('AndroidManifest.xml', xml, 'application/xml');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-[#23140B] via-[#1A0E07] to-[#120904] border border-amber-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-amber-50">
        
        {/* Top Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#1C0F08]/95 backdrop-blur-md border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/25 to-amber-900/40 border border-amber-400/50 flex items-center justify-center shadow-inner shrink-0">
              <img src="/pwa-192x192.png" alt="Soul Sanctum Android Icon" className="w-8 h-8 rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-amber-100 tracking-wide">
                  Soul Sanctum for Android
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-900/80 border border-emerald-500/50 text-emerald-200 text-[10px] font-serif font-bold uppercase tracking-wider">
                  v1.0 Ready
                </span>
              </div>
              <p className="text-xs font-serif text-amber-200/80">
                Installable Android WebAPK • Offline 25 Catholic Classics • Daily Mass & Rosary
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Interactive Android Mobile View Switcher Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/80 via-[#2E1A0D] to-amber-950/80 border border-amber-400/45 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-300" />
                <span className="font-cinzel text-sm font-bold text-amber-100">
                  Interactive Android Phone Mode
                </span>
              </div>
              <p className="text-xs font-serif text-stone-200 leading-relaxed">
                Switch into the native Android mobile layout with the 6-tab thumb navigation bar, Android status bar, and compact mobile cards.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onToggleAndroidPreviewMode();
                onClose();
              }}
              className={`px-4 py-2.5 rounded-xl font-serif font-bold text-xs shrink-0 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                isAndroidPreviewMode
                  ? 'bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/40'
                  : 'bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{isAndroidPreviewMode ? 'Exit Android Phone Frame' : 'Launch Android Phone View'}</span>
            </button>
          </div>

          {/* Section Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/40 border border-white/10">
            <button
              type="button"
              onClick={() => setActiveSection('install')}
              className={`py-2 px-3 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeSection === 'install'
                  ? 'bg-[#6B4423] text-white shadow-sm border border-amber-400/40'
                  : 'text-stone-300 hover:text-amber-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>1. Install directly on Android</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('apk-build')}
              className={`py-2 px-3 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeSection === 'apk-build'
                  ? 'bg-[#6B4423] text-white shadow-sm border border-amber-400/40'
                  : 'text-stone-300 hover:text-amber-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>2. Build Native APK / Play Store</span>
            </button>
          </div>

          {activeSection === 'install' ? (
            <div className="space-y-4">
              {/* Direct One-Tap Install Box */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-amber-200">
                      Option A: One-Tap Android Home Screen Install (WebAPK)
                    </h3>
                    <p className="text-xs font-serif text-stone-300 mt-0.5">
                      Installs Soul Sanctum as a standalone Android application with adaptive launcher icon, splash screen, and full offline library.
                    </p>
                  </div>

                  {isInstalled ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-serif font-bold shrink-0">
                      <Check className="w-4 h-4" />
                      Installed on Device
                    </span>
                  ) : isInstallable ? (
                    <button
                      type="button"
                      onClick={install}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-serif font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0 border border-emerald-400/50"
                    >
                      <Download className="w-4 h-4" />
                      <span>Install App Now</span>
                    </button>
                  ) : null}
                </div>

                {/* Step-by-Step Chrome on Android Guide */}
                <div className="p-3.5 rounded-xl bg-black/45 border border-amber-500/20 space-y-2 text-xs font-serif text-stone-200">
                  <p className="font-bold text-amber-300">
                    How to install on any Android phone or tablet (Chrome / Edge / Samsung Internet):
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 text-stone-200">
                    <li>
                      Open this app URL in <strong>Google Chrome</strong> on your Android device.
                    </li>
                    <li>
                      Tap the <strong>three-dot menu (⋮)</strong> in the top-right corner of Chrome and tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                    </li>
                    <li>
                      Tap <strong>Install</strong> — Soul Sanctum will appear in your Android app drawer with its Golden Monstrance icon and work completely offline!
                    </li>
                  </ol>

                  {isIOS && (
                    <p className="pt-1 text-amber-200/90 italic">
                      On iPhone / iPad Safari: Tap the <strong>Share</strong> button in the toolbar and select <strong>Add to Home Screen</strong>.
                    </p>
                  )}

                  {/* Copyable App Link for Android Phone */}
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={appUrl}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-amber-100 text-xs font-mono focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopyUrl}
                      className="px-3 py-1.5 rounded-lg bg-amber-800/80 hover:bg-amber-700 text-white text-xs font-serif font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUrl ? 'Copied' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Android Features Included Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-amber-200">
                      100% Offline Catholic Classics
                    </h4>
                    <p className="text-[11px] font-serif text-stone-300 mt-0.5">
                      All 25 Catholic Classics (1,038 chapters), prayers, Rosary mysteries, and checklist are cached on your Android device via Service Worker.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-amber-200">
                      Daily Automatic Liturgical Sync
                    </h4>
                    <p className="text-[11px] font-serif text-stone-300 mt-0.5">
                      Automatically updates the date, Daily Mass Readings, Saint of the Day, and Catena Aurea Gospel Commentary at midnight every day.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Layers className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-amber-200">
                      Android Home Screen App Shortcuts
                    </h4>
                    <p className="text-[11px] font-serif text-stone-300 mt-0.5">
                      Long-press the Soul Sanctum icon on your Android home screen to jump straight to Mass Readings, Holy Rosary, Saint, or Catholic Classics.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Wifi className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-amber-200">
                      Device Status: {isOnline ? 'Online & Cached' : 'Offline Mode Active'}
                    </h4>
                    <p className="text-[11px] font-serif text-stone-300 mt-0.5">
                      Adaptive 512×512 Maskable Icon, Standalone Fullscreen Manifest, and Android Bottom Navigation Bar active.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Native Android APK / Google Play Store Packaging */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 space-y-3">
                <h3 className="font-cinzel text-sm font-bold text-amber-200">
                  Option B: Generate a Native Android APK / AAB Package
                </h3>
                <p className="text-xs font-serif text-stone-300 leading-relaxed">
                  Download the pre-configured Android project manifests below to compile a standalone signed <code>SoulSanctum.apk</code> or Google Play Store <code>.aab</code> bundle using <strong>Google Bubblewrap (TWA)</strong> or <strong>Ionic Capacitor</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleDownloadTWAManifest}
                    className="p-3 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-amber-300 font-cinzel text-xs font-bold">
                      <span>twa-manifest.json</span>
                      <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] font-serif text-stone-300 mt-1">
                      Google Bubblewrap TWA config for signed APK & Play Store bundle.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadCapacitorConfig}
                    className="p-3 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-amber-300 font-cinzel text-xs font-bold">
                      <span>capacitor.config.json</span>
                      <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] font-serif text-stone-300 mt-1">
                      Capacitor Android Studio config for offline local asset APK.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadAndroidManifestXml}
                    className="p-3 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-amber-300 font-cinzel text-xs font-bold">
                      <span>AndroidManifest.xml</span>
                      <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] font-serif text-stone-300 mt-1">
                      Native Android XML manifest with permissions & intent filters.
                    </p>
                  </button>
                </div>

                {/* CLI Commands to build APK */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-cinzel font-bold text-amber-300 uppercase tracking-wider">
                      Quick Terminal Commands to Build Signed APK (Bubblewrap CLI)
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCmd}
                      className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs font-serif text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-amber-100/90 overflow-x-auto leading-relaxed">
                    {bubblewrapCommands}
                  </pre>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

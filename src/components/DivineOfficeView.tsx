import React, { useState } from 'react';
import {
  Clock,
  ExternalLink,
  RefreshCw,
  Maximize2,
  Minimize2,
  Volume2,
  Smartphone,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

export const DivineOfficeView: React.FC = () => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isExpandedHeight, setIsExpandedHeight] = useState(false);

  const handleReloadWidget = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Liturgical Header Banner */}
      <div className="bg-gradient-to-r from-[#2A1810] via-[#3A2218] to-[#23140D] rounded-xl p-5 sm:p-7 text-amber-50 shadow-xl border border-[#8B5A2B]/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#D4A373]">
                Liturgia Horarum • Universal Prayer of the Church
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF8DC] tracking-normal leading-tight">
              Divine Office
            </h2>
            <p className="text-xs sm:text-sm text-[#EADBC8] font-serif max-w-2xl leading-relaxed">
              The official Liturgy of the Hours text and built-in HTML5 audio player from the Divine Office Catholic Ministry, updated automatically each day with Invitatory, Office of Readings, Morning Prayer (Lauds), Daytime Prayer, Evening Prayer (Vespers), and Night Prayer (Compline).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            <button
              onClick={handleReloadWidget}
              className="px-3 py-2 rounded-lg bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#FFF8DC] border border-[#8B5A2B]/60 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Reload today's Divine Office widget"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setIsExpandedHeight(prev => !prev)}
              className="px-3 py-2 rounded-lg bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#FFF8DC] border border-[#8B5A2B]/60 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title={isExpandedHeight ? 'Standard height' : 'Expand reader height'}
            >
              {isExpandedHeight ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Standard View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Expand View</span>
                </>
              )}
            </button>

            <a
              href="https://divineoffice.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-[#5A381C] hover:bg-[#6B4423] text-[#FFF8DC] border border-[#C89D7C]/60 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
              title="Open DivineOffice.org in a new tab"
            >
              <span>DivineOffice.org</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FFD700]" />
            </a>
          </div>
        </div>

        {/* Built-in HTML5 Audio & AirPlay Info Strip */}
        <div className="mt-4 pt-3.5 border-t border-[#8B5A2B]/40 flex flex-wrap items-center justify-between gap-3 text-xs text-[#EADBC8]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Built-in HTML5 Choral &amp; Spoken Audio Player</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>AirPlay, Mobile &amp; Tablet Ready</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>In-Widget Font Size &amp; Dark Mode Controls</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Daily Breviary Feed</span>
          </span>
        </div>
      </div>

      {/* Main Responsive Divine Office Iframe Widget Container */}
      <section className="bg-white rounded-2xl border border-stone-200/90 shadow-lg overflow-hidden">
        <div className="w-full bg-[#FAF8F5]">
          <iframe
            key={iframeKey}
            src="https://divineoffice.org/widget"
            title="Divine Office — Liturgy of the Hours Widget"
            className={`w-full border-0 transition-all duration-300 ${
              isExpandedHeight ? 'h-[1150px]' : 'h-[780px]'
            }`}
            allow="autoplay; fullscreen"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

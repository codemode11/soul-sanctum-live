import React, { useState } from 'react';
import { Search, Volume2, VolumeX, Copy, Check } from 'lucide-react';
import {
  QUOTATION_SECTIONS,
  SACRED_QUOTATIONS_DATABASE,
  QuotationSectionId,
  SacredQuotation
} from '../data/quotations';
import { SacredReader } from '../utils/speech';
import { QuotationsRightFacingIcon } from './SanctumIcons';

export const QuotationsView: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<QuotationSectionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const handleCopy = (item: SacredQuotation) => {
    const prefix = item.subHeading ? `${item.subHeading}\n` : '';
    const base = item.attribution
      ? `${prefix}${item.text}\n${item.attribution}`
      : `${prefix}${item.text}`;
    const formatted = item.postscript ? `${base}\n${item.postscript}` : base;
    navigator.clipboard.writeText(formatted);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSpeak = (item: SacredQuotation) => {
    if (speakingId === item.id) {
      SacredReader.stop();
      setSpeakingId(null);
    } else {
      const prefix = item.subHeading ? `${item.subHeading}. ` : '';
      const base = item.attribution
        ? `${prefix}${item.text}. ${item.attribution}.`
        : `${prefix}${item.text}`;
      const speech = item.postscript ? `${base} ${item.postscript}` : base;
      SacredReader.speak(speech, () => setSpeakingId(null));
      setSpeakingId(item.id);
    }
  };

  const visibleSections = QUOTATION_SECTIONS.filter(
    sec => selectedSection === 'all' || sec.id === selectedSection
  );

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/75 backdrop-blur-xl backdrop-saturate-150 border border-white/85 ring-1 ring-inset ring-white/60 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12 animate-fadeIn">
      {/* Header & Filter Card (Light Frosted Glass) */}
      <div className="bg-white/85 backdrop-blur-xl rounded-xl p-5 sm:p-7 text-stone-900 shadow-xs border border-amber-900/15 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/15 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100/90 border border-amber-300/80 text-amber-900">
                <QuotationsRightFacingIcon className="w-5 h-5 text-amber-900" />
              </div>
              <div>
                <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-stone-950">
                  Quotations
                </h2>
                <p className="text-xs sm:text-sm text-stone-700 font-serif italic mt-0.5">
                  {QUOTATION_SECTIONS.length} Sacred Topics • {SACRED_QUOTATIONS_DATABASE.length} Catholic Quotations
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto px-3.5 py-1 rounded-full bg-amber-100/90 text-amber-950 text-xs sm:text-sm font-semibold border border-amber-300/80 uppercase tracking-wider font-cinzel">
              {SACRED_QUOTATIONS_DATABASE.length} Quotations
            </span>
          </div>

          {/* Section Filter Tabs & Search */}
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-center gap-1.5 flex-wrap max-h-44 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedSection('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-colors cursor-pointer ${
                  selectedSection === 'all'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'bg-stone-100/90 text-stone-800 hover:bg-amber-100/70 border border-stone-300/80'
                }`}
              >
                All ({SACRED_QUOTATIONS_DATABASE.length})
              </button>
              {QUOTATION_SECTIONS.map(sec => {
                const count = SACRED_QUOTATIONS_DATABASE.filter(
                  q => q.sectionId === sec.id
                ).length;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSection(sec.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-cinzel transition-colors cursor-pointer ${
                      selectedSection === sec.id
                        ? 'bg-amber-900 text-amber-50 shadow-xs'
                        : 'bg-stone-100/90 text-stone-800 hover:bg-amber-100/70 border border-stone-300/80'
                    }`}
                  >
                    {sec.title} ({count})
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search quotations, saints, topics, or works..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-white/95 text-stone-900 placeholder:text-stone-500 border border-stone-300 focus:outline-none focus:border-amber-700"
              />
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Sections & Quotations */}
      <div className="space-y-8">
        {visibleSections.map(section => {
          const sectionQuotes = SACRED_QUOTATIONS_DATABASE.filter(q => {
            if (q.sectionId !== section.id) return false;
            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase();
            return (
              q.text.toLowerCase().includes(query) ||
              q.sectionTitle.toLowerCase().includes(query) ||
              (q.attribution && q.attribution.toLowerCase().includes(query)) ||
              (q.subHeading && q.subHeading.toLowerCase().includes(query)) ||
              (q.postscript && q.postscript.toLowerCase().includes(query))
            );
          });

          if (sectionQuotes.length === 0) return null;

          return (
            <section
              key={section.id}
              className="bg-white/90 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-5 sm:p-8 shadow-sm border border-white/95 ring-1 ring-inset ring-amber-900/10 space-y-5"
            >
              {/* Section Heading */}
              <div className="border-b border-amber-900/20 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-950 tracking-wide">
                    {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 font-serif italic mt-0.5">
                    {section.subtitle}
                  </p>
                </div>
                <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-950 bg-amber-100/90 px-3 py-1 rounded-md border border-amber-300/80 self-start sm:self-auto">
                  {sectionQuotes.length} {sectionQuotes.length === 1 ? 'Quotation' : 'Quotations'}
                </span>
              </div>

              {/* Quotations List */}
              <div className="divide-y divide-stone-200/90">
                {sectionQuotes.map(item => {
                  const isCopied = copiedId === item.id;
                  const isSpeaking = speakingId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="py-5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
                    >
                      <div className="space-y-1.5 flex-1">
                        {item.subHeading && (
                          <h4 className="font-cinzel text-base sm:text-lg font-bold text-amber-900 pt-1 pb-0.5">
                            {item.subHeading}
                          </h4>
                        )}
                        <p className="font-serif-sacred text-stone-950 text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-line">
                          {item.text}
                        </p>
                        {item.attribution && (
                          <p className="font-serif text-sm sm:text-base font-bold text-amber-950">
                            {item.attribution}
                          </p>
                        )}
                        {item.postscript && (
                          <p className="font-serif-sacred text-stone-950 text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-wrap pt-2">
                            {item.postscript}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start pt-1">
                        <button
                          onClick={() => handleToggleSpeak(item)}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            isSpeaking
                              ? 'bg-[#6B4423] text-white border-[#5A381C]'
                              : 'bg-stone-100/90 text-stone-700 hover:text-stone-950 hover:bg-amber-100/60 border-stone-300/90'
                          }`}
                          title="Listen to quotation"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(item)}
                          className="p-2 rounded-lg bg-stone-100/90 text-stone-700 hover:text-stone-950 hover:bg-amber-100/60 border border-stone-300/90 transition-colors cursor-pointer"
                          title="Copy quotation"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

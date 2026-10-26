import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  BookOpen, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  Radio, 
  Clock, 
  FileText,
  Volume2
} from 'lucide-react';
import { PodcastEpisode } from '../types';

interface PodcastEpisodeModalProps {
  episode: PodcastEpisode | null;
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const PodcastEpisodeModal: React.FC<PodcastEpisodeModalProps> = ({
  episode,
  isOpen,
  onClose,
  isPlaying,
  onTogglePlay
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !episode) return null;

  const handleCopy = () => {
    const text = `${episode.title}
From: ${episode.podcastTitle} with ${episode.podcastHost}

SUMMARY:
${episode.description}

KEY CATHOLIC TAKEAWAYS:
${episode.keyTakeaways.map(t => `• ${t}`).join('\n')}

SCRIPTURE and CATECHISM:
${episode.scriptureReferences?.join(', ') || 'N/A'}
${episode.catechismReferences?.join(', ') || ''}

CONTEMPLATION PROMPT:
${episode.reflectionPrompt}

KEY QUOTE:
"${episode.keyQuote}"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FCFAF6] text-stone-900 rounded-xl shadow-2xl border border-amber-500/40 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 via-[#1C120C] to-stone-900 text-stone-100 flex items-start justify-between gap-4 border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <img 
              src={episode.podcastCoverUrl} 
              alt={episode.podcastTitle} 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-amber-400/50 shadow-md shrink-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-bold font-cinzel text-amber-400 uppercase tracking-widest block">
                {episode.podcastTitle}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
                {episode.title}
              </h3>
              <div className="text-xs text-stone-300 font-serif">
                {episode.podcastHost} • {episode.durationFormatted}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-5 py-3 bg-amber-50/60 border-b border-amber-200/60 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onTogglePlay}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs sm:text-sm font-cinzel font-bold shadow-md hover:scale-102 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Episode</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Play Episode Audio</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-serif transition-colors cursor-pointer"
              title="Copy study guide"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share Notes'}</span>
            </button>
          </div>
        </div>

        {/* Body Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-left">
          
          {/* Detailed Overview */}
          <div className="space-y-2">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>Episode Exposition and Overview</span>
            </h4>
            <p className="text-sm sm:text-base text-stone-800 font-serif leading-relaxed">
              {episode.description}
            </p>
          </div>

          {/* Key Quote Callout */}
          {episode.keyQuote && (
            <div className="p-4 rounded-xl bg-amber-100/70 border-l-4 border-amber-700 space-y-1">
              <span className="text-[10px] font-bold uppercase font-cinzel text-amber-900 tracking-wider">
                Key Quote
              </span>
              <p className="text-sm sm:text-base font-serif italic text-stone-900">
                {episode.keyQuote}
              </p>
            </div>
          )}

          {/* Scripture and Catechism References */}
          {(episode.scriptureReferences?.length || episode.catechismReferences?.length) && (
            <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 space-y-3">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Scripture and Catechism Paragraphs Cited</span>
              </h4>

              <div className="flex flex-wrap gap-2">
                {episode.scriptureReferences?.map(ref => (
                  <span 
                    key={ref}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-serif font-semibold text-xs border border-amber-200"
                  >
                    📖 {ref}
                  </span>
                ))}
                {episode.catechismReferences?.map(ccc => (
                  <span 
                    key={ccc}
                    className="px-2.5 py-1 rounded-lg bg-stone-200 text-stone-800 font-serif font-semibold text-xs"
                  >
                    📜 {ccc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Catholic Takeaways */}
          {episode.keyTakeaways && episode.keyTakeaways.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-900">
                <span>Key Catholic Takeaways</span>
              </h4>
              <ul className="space-y-2">
                {episode.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800 font-serif">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prayer Contemplation Prompt */}
          {episode.reflectionPrompt && (
            <div className="p-4 rounded-xl bg-stone-900 text-amber-100 space-y-1.5 border border-amber-500/30">
              <div className="text-xs font-bold font-cinzel text-amber-300 uppercase tracking-widest">
                <span>Contemplative Prayer Prompt</span>
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-stone-200 leading-relaxed">
                "{episode.reflectionPrompt}"
              </p>
            </div>
          )}

          {/* External Links */}
          {episode.externalLinks && (
            <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
              <span className="font-serif">Official Show Links:</span>
              <div className="flex items-center gap-3">
                {episode.externalLinks.apple && (
                  <a 
                    href={episode.externalLinks.apple} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-800 hover:underline flex items-center gap-1"
                  >
                    Apple Podcasts <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {episode.externalLinks.spotify && (
                  <a 
                    href={episode.externalLinks.spotify} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-800 hover:underline flex items-center gap-1"
                  >
                    Spotify <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {episode.externalLinks.youtube && (
                  <a 
                    href={episode.externalLinks.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-800 hover:underline flex items-center gap-1"
                  >
                    YouTube <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-cinzel font-semibold transition-colors cursor-pointer"
          >
            Close Study Guide
          </button>
        </div>

      </div>
    </div>
  );
};

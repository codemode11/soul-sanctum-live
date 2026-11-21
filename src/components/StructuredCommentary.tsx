import React from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { toCurvedQuotes } from '../utils/typography';
import { getSaintReaderPersona } from '../utils/speech';

export interface StructuredCommentaryData {
  homilyTitle: string;
  homilyParagraphs: string[];
  catenaAureaParagraphs: string[];
  lapideParagraphs: string[];
  magisteriumParagraphs: string[];
}

export function parseStructuredCommentary(text: string): StructuredCommentaryData {
  if (!text) {
    return {
      homilyTitle: '',
      homilyParagraphs: [],
      catenaAureaParagraphs: [],
      lapideParagraphs: [],
      magisteriumParagraphs: []
    };
  }

  const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  
  let homilyTitle = '';
  const homilyParagraphs: string[] = [];
  const catenaAureaParagraphs: string[] = [];
  const lapideParagraphs: string[] = [];
  const magisteriumParagraphs: string[] = [];

  let currentSection: 'homily' | 'catena' | 'lapide' | 'magisterium' = 'homily';

  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];

    // Check if paragraph starts with Cornelius a Lapide
    if (
      /^CORNELIUS\s+([ÀA])\s+LAPIDE/i.test(p) || 
      /^FR\.\s+LAPIDE/i.test(p) || 
      /^LAPIDE/i.test(p)
    ) {
      currentSection = 'lapide';
      lapideParagraphs.push(p);
      continue;
    }

    // Check if paragraph starts with Notes from the Magisterium / Catechism / Vatican II
    if (
      /^VATICAN\s+MAGISTERIUM/i.test(p) || 
      /^CATECHISM\s+OF/i.test(p) || 
      /^CCC\s+/i.test(p) || 
      /^VATICAN\s+II/i.test(p) || 
      /^COUNCIL\s+OF\s+TRENT/i.test(p) ||
      /^POPE\s+PIUS/i.test(p) ||
      /^POPE\s+ST\.\s+PAUL\s+VI/i.test(p) ||
      /^POPE\s+BENEDICT/i.test(p) || 
      /^POPE\s+FRANCIS/i.test(p) || 
      /^POPE\s+ST\.\s+JOHN\s+PAUL/i.test(p) || 
      /^ST\.\s+JOHN\s+PAUL\s+II\s+\(/i.test(p) ||
      /^MAGISTERIUM/i.test(p)
    ) {
      currentSection = 'magisterium';
      magisteriumParagraphs.push(p);
      continue;
    }

    // Check if paragraph belongs to Catena Aurea Church Fathers & Ecclesiastical Writers
    if (
      currentSection === 'homily' &&
      i > 0 &&
      (
        /^(ST\.|SAINT\s+|THE\s+VENERABLE\s+BEDE|VENERABLE\s+BEDE|POPE\s+ST\.|BLESSED\s+THEOPHYLACT|THEOPHYLACT|TITUS\s+OF\s+BOSTRA|ORIGEN|EUSEBIUS|SEVERUS|ATHANASIUS|HILARY|MAXIMUS|DAMASCENE|RABANUS|ALCUIN|REMIGIUS|ISIDORE|PHOTIUS|ANTIOCHUS|THEODOTUS|THEODORET|THEOPHILUS|CASSIAN|CYPRIAN|FULGENTIUS|SOPHRONIUS|IRENAEUS|PSEUDO-|CHRYSOSTOM|AUGUSTINE|AMBROSE|CYRIL|GREGORY|JEROME|BASIL|BERNARD|GAUDENTIUS|CAESARIUS|CHROMATIUS|LEO|EPHREM|METHODIUS|GLOSS|GREEK\s+EXPOSITOR)/i.test(p) ||
        /^[A-Z][A-Z0-9\s.,'ÀÈÉ()\-]{2,55}:\s/.test(p)
      )
    ) {
      currentSection = 'catena';
      catenaAureaParagraphs.push(p);
      continue;
    }

    // If currently in Homily section
    if (currentSection === 'homily') {
      if (i === 0 && /^HOMILY\s+OF/i.test(p)) {
        const colonIdx = p.indexOf(':');
        if (colonIdx !== -1) {
          homilyTitle = p.substring(0, colonIdx).trim();
          const firstParaContent = p.substring(colonIdx + 1).trim();
          if (firstParaContent) {
            homilyParagraphs.push(firstParaContent);
          }
        } else {
          homilyTitle = p;
        }
      } else {
        homilyParagraphs.push(p);
      }
      continue;
    }

    // Append to corresponding active section
    if (currentSection === 'catena') {
      catenaAureaParagraphs.push(p);
    } else if (currentSection === 'lapide') {
      lapideParagraphs.push(p);
    } else if (currentSection === 'magisterium') {
      magisteriumParagraphs.push(p);
    }
  }

  // Fallback title if not prefixed
  if (!homilyTitle && homilyParagraphs.length > 0) {
    const firstP = homilyParagraphs[0];
    const colonIdx = firstP.indexOf(':');
    if (colonIdx !== -1 && colonIdx < 80) {
      homilyTitle = firstP.substring(0, colonIdx).trim();
      homilyParagraphs[0] = firstP.substring(colonIdx + 1).trim();
    } else {
      homilyTitle = 'PATRISTIC EXPOSITION OF A SAINT';
    }
  }

  // Clean title: remove "HOMILY OF " or "HOMILY " prefix from headings inside Bible Commentary
  const cleanTitle = homilyTitle.replace(/^HOMILY\s+OF\s+/i, '').replace(/^HOMILY\s+/i, '').trim();

  return {
    homilyTitle: cleanTitle,
    homilyParagraphs,
    catenaAureaParagraphs,
    lapideParagraphs,
    magisteriumParagraphs
  };
}

/**
 * Stylized Line Divider Component with Gold Cross and Fleur-de-lis Ornaments
 */
export const StylizedDivider: React.FC<{ title: string }> = ({ title }) => (
  <div className="my-8 space-y-3">
    {/* Stylized Line */}
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C29B62]/60 to-[#9E733B]" />
      <span className="text-[#8C6239] text-base select-none font-serif tracking-widest flex items-center px-2">
        <span className="text-sm font-bold">✠</span>
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-[#9E733B] via-[#C29B62]/60 to-transparent" />
    </div>

    {/* Section Title */}
    <div className="text-center">
      <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#3B2512] tracking-wider uppercase">
        {title}
      </h4>
    </div>
  </div>
);

function formatAuthorLabel(rawAuthor: string): string {
  return rawAuthor
    .toLowerCase()
    .replace(/\b(st\.|pope|the|of|in|and|s\.j\.)\b/g, (w) => {
      if (w === 's.j.') return 'S.J.';
      if (w === 'of' || w === 'in' || w === 'and') return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bOf\b/g, 'of')
    .replace(/\bThe\b/g, (m, offset) => (offset === 0 ? 'The' : 'the'))
    .replace(/\bAnd\b/g, 'and')
    .replace(/\bS\.j\./g, 'S.J.')
    .replace(/\bCcc\b/g, 'CCC')
    .replace(/\bIi\b/g, 'II')
    .replace(/\bXi\b/g, 'XI')
    .replace(/\bXii\b/g, 'XII')
    .replace(/\bXvi\b/g, 'XVI')
    .replace(/\bVi\b/g, 'VI');
}

function normalizeForMatch(name: string): string {
  return (name || '')
    .toLowerCase()
    .replace(/\bsaint\b/g, 'st')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

interface StructuredCommentaryDisplayProps {
  commentaryText: string;
  fontSizeStyle?: React.CSSProperties;
  homilyOnly?: boolean;
  hideHomily?: boolean;
  onSpeakSection?: (sectionKey: string, authorName: string, textToSpeak: string, isCurrentlyActive: boolean) => void;
  activeSpeakingKey?: string | null;
  loadingSpeakingKey?: string | null;
  activeSpeakingAuthor?: string | null;
}

export const StructuredCommentaryDisplay: React.FC<StructuredCommentaryDisplayProps> = ({
  commentaryText,
  fontSizeStyle,
  homilyOnly = false,
  hideHomily = false,
  onSpeakSection,
  activeSpeakingKey = null,
  loadingSpeakingKey = null,
  activeSpeakingAuthor = null,
}) => {
  const data = parseStructuredCommentary(commentaryText);
  const normActiveAuthor = activeSpeakingAuthor ? normalizeForMatch(activeSpeakingAuthor) : '';

  const isSectionActive = (sectionKey: string, authorName: string): boolean => {
    if (activeSpeakingKey) {
      return activeSpeakingKey === sectionKey;
    }
    if (normActiveAuthor && authorName) {
      const normAuthor = normalizeForMatch(authorName);
      return (
        normActiveAuthor === normAuthor ||
        normActiveAuthor.includes(normAuthor) ||
        normAuthor.includes(normActiveAuthor)
      );
    }
    return false;
  };

  const renderAudioIconButton = (
    sectionKey: string,
    authorName: string,
    textToSpeak: string,
    isActive: boolean,
    isLoading: boolean
  ) => {
    if (!onSpeakSection) return null;
    const persona = getSaintReaderPersona(authorName);
    const displayAuthor = formatAuthorLabel(authorName);
    const tooltip = isLoading
      ? `Loading ${displayAuthor}…`
      : isActive
      ? `Stop ${displayAuthor}`
      : `Listen to ${displayAuthor} (${persona.timbreDescription})`;

    return (
      <button
        type="button"
        onClick={() => onSpeakSection(sectionKey, authorName, textToSpeak, isActive || isLoading)}
        title={tooltip}
        aria-label={tooltip}
        aria-pressed={isActive}
        className={`float-right ml-2.5 mb-1 inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all cursor-pointer shrink-0 ${
          isActive
            ? 'bg-[#6B4423] text-amber-50 border-[#8B5A2B] shadow-sm ring-2 ring-amber-400/50'
            : isLoading
            ? 'bg-amber-100 text-[#6B4423] border-amber-400/70'
            : 'bg-white/90 hover:bg-[#6B4423] text-[#6B4423] hover:text-amber-50 border-[#D8C7AE] hover:border-[#6B4423] shadow-2xs'
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isActive ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    );
  };

  const renderCommentaryParagraph = (
    para: string,
    sectionKey: string,
    containerClasses: string,
    fallbackAuthor: string
  ) => {
    const colonIdx = para.indexOf(':');
    const hasHeading = colonIdx !== -1 && colonIdx < 90;
    const author = hasHeading ? para.substring(0, colonIdx).trim() : fallbackAuthor;
    const bodyText = hasHeading ? para.substring(colonIdx + 1) : para;
    const spokenAuthor = formatAuthorLabel(author)
      .replace(/\bSts\.\s+/gi, 'Saints ')
      .replace(/\bSt\.\s+/gi, 'Saint ');
    const spokenText = hasHeading
      ? `${spokenAuthor}: ${bodyText.trim()}`
      : bodyText.trim();

    const isActive = isSectionActive(sectionKey, author);
    const isLoading = loadingSpeakingKey === sectionKey;

    const activeCardClasses = isActive
      ? 'bg-amber-50/95 border-amber-500/75 ring-1 ring-amber-400/50 shadow-sm'
      : '';

    return (
      <div
        key={sectionKey}
        className={`relative transition-all duration-200 ${containerClasses} ${activeCardClasses}`}
      >
        {renderAudioIconButton(sectionKey, author, spokenText, isActive, isLoading)}
        <p className="whitespace-pre-line">
          {hasHeading && (
            <strong className="font-bold text-[#2A1B0E] font-serif tracking-normal">
              {toCurvedQuotes(author)}:
            </strong>
          )}
          {toCurvedQuotes(bodyText)}
        </p>
      </div>
    );
  };

  let lastCatenaAuthor = 'Patristic Lector';

  return (
    <div className="space-y-6">
      {/* 1. HOMILY SECTION */}
      {!hideHomily && (
        <div className="space-y-3">
          {/* Homily Title */}
          {data.homilyTitle && (
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A1B0E] leading-snug">
                {toCurvedQuotes(data.homilyTitle)}
              </h3>
              {/* Separate the homily title from the first paragraph with one line */}
              <div className="h-px bg-[#DBCBB5] my-3" />
            </div>
          )}

          {/* Homily Body Paragraphs */}
          <div className="space-y-4 font-serif-sacred text-[#2C1C0E] leading-relaxed" style={fontSizeStyle}>
            {data.homilyParagraphs.map((para, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {toCurvedQuotes(para)}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 2. CATENA AUREA SECTION */}
      {!homilyOnly && data.catenaAureaParagraphs.length > 0 && (
        <div>
          {/* Title "Catena Aurea" without stylized line */}
          <div className="mb-3 text-center">
            <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#3B2512] tracking-wider uppercase">
              Catena Aurea
            </h4>
          </div>

          <div className="space-y-4 font-serif-sacred text-[#2C1C0E] leading-relaxed" style={fontSizeStyle}>
            {data.catenaAureaParagraphs.map((para, idx) => {
              const colonIdx = para.indexOf(':');
              if (colonIdx !== -1 && colonIdx < 90) {
                lastCatenaAuthor = para.substring(0, colonIdx).trim();
              }
              return renderCommentaryParagraph(
                para,
                `catena-${idx}`,
                'p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]',
                lastCatenaAuthor
              );
            })}
          </div>
        </div>
      )}

      {/* 3. CORNELIUS À LAPIDE SECTION */}
      {!homilyOnly && data.lapideParagraphs.length > 0 && (
        <div>
          {/* Stylized line followed by name "Cornelius à Lapide, S.J." at the center */}
          <StylizedDivider title="Cornelius à Lapide, S.J." />

          <div className="space-y-4 font-serif-sacred text-[#2C1C0E] leading-relaxed" style={fontSizeStyle}>
            {data.lapideParagraphs.map((para, idx) => {
              const cleanPara = para
                .replace(/^(?:CORNELIUS\s+[ÀA]\s+LAPIDE|FR\.\s+LAPIDE|LAPIDE)(?:,\s*S\.?J\.?)?:\s*/i, '')
                .trim();
              const sectionKey = `lapide-${idx}`;
              const authorName = 'Cornelius à Lapide, S.J.';
              const isActive = isSectionActive(sectionKey, authorName);
              const isLoading = loadingSpeakingKey === sectionKey;
              return (
                <div
                  key={sectionKey}
                  className={`relative p-4 rounded-xl bg-[#F8F3EA] border border-[#E5D8C3] shadow-2xs transition-all duration-200 ${
                    isActive ? 'bg-amber-50/95 border-amber-500/75 ring-1 ring-amber-400/50 shadow-sm' : ''
                  }`}
                >
                  {renderAudioIconButton(
                    sectionKey,
                    authorName,
                    `Cornelius à Lapide: ${cleanPara}`,
                    isActive,
                    isLoading
                  )}
                  <p className="whitespace-pre-line">{toCurvedQuotes(cleanPara)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. NOTES FROM THE MAGISTERIUM SECTION */}
      {!homilyOnly && data.magisteriumParagraphs.length > 0 && (
        <div>
          {/* Stylized line followed by title "Notes from the Magisterium." */}
          <StylizedDivider title="Notes from the Magisterium" />

          <div className="space-y-4 font-serif-sacred text-[#2C1C0E] leading-relaxed" style={fontSizeStyle}>
            {data.magisteriumParagraphs.map((para, idx) =>
              renderCommentaryParagraph(
                para,
                `magisterium-${idx}`,
                'p-4 rounded-xl bg-[#F3EDE3] border border-[#DDD0BC] shadow-2xs',
                'Vatican Magisterium'
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';

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

    // Check if paragraph belongs to Catena Aurea Church Fathers
    if (
      currentSection === 'homily' && 
      (
        /^ST\.\s+(CYRIL|AMBROSE|AUGUSTINE|JOHN\s+CHRYSOSTOM|JEROME|BASIL|BEDE|CHROMATIUS|LEO|CAESARIUS|EPHREM|GREGORY|GREGORY\s+NAZIANZEN)/i.test(p) ||
        /^THE\s+VENERABLE\s+BEDE/i.test(p) ||
        /^POPE\s+ST\.\s+GREGORY/i.test(p) ||
        /^BLESSED\s+THEOPHYLACT/i.test(p)
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

interface StructuredCommentaryDisplayProps {
  commentaryText: string;
  fontSizeStyle?: React.CSSProperties;
  homilyOnly?: boolean;
  hideHomily?: boolean;
}

export const StructuredCommentaryDisplay: React.FC<StructuredCommentaryDisplayProps> = ({
  commentaryText,
  fontSizeStyle,
  homilyOnly = false,
  hideHomily = false
}) => {
  const data = parseStructuredCommentary(commentaryText);

  return (
    <div className="space-y-6">
      {/* 1. HOMILY SECTION */}
      {!hideHomily && (
        <div className="space-y-3">
          {/* Homily Title */}
          {data.homilyTitle && (
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A1B0E] leading-snug">
                {data.homilyTitle}
              </h3>
              {/* Separate the homily title from the first paragraph with one line */}
              <div className="h-px bg-[#DBCBB5] my-3" />
            </div>
          )}

          {/* Homily Body Paragraphs */}
          <div className="space-y-4 font-serif-sacred text-[#2C1C0E] leading-relaxed" style={fontSizeStyle}>
            {data.homilyParagraphs.map((para, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {para}
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
            {data.catenaAureaParagraphs.map((para, idx) => (
              <p key={idx} className="whitespace-pre-line p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 3. CORNELIUS À LAPIDE SECTION */}
      {!homilyOnly && data.lapideParagraphs.length > 0 && (
        <div>
          {/* Stylized line followed by name "Cornelius à Lapide." */}
          <StylizedDivider title="Cornelius à Lapide" />

          <div className="space-y-4 font-serif-sacred text-[#2C1C0E] leading-relaxed" style={fontSizeStyle}>
            {data.lapideParagraphs.map((para, idx) => (
              <p key={idx} className="whitespace-pre-line p-4 rounded-xl bg-[#F8F3EA] border border-[#E5D8C3] shadow-2xs">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 4. NOTES FROM THE MAGISTERIUM SECTION */}
      {!homilyOnly && data.magisteriumParagraphs.length > 0 && (
        <div>
          {/* Stylized line followed by title "Notes from the Magisterium." */}
          <StylizedDivider title="Notes from the Magisterium" />

          <div className="space-y-4 font-serif-sacred text-[#2C1C0E] leading-relaxed" style={fontSizeStyle}>
            {data.magisteriumParagraphs.map((para, idx) => (
              <p key={idx} className="whitespace-pre-line p-4 rounded-xl bg-[#F3EDE3] border border-[#DDD0BC] shadow-2xs">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

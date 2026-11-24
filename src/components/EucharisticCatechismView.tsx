import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { EUCHARISTIC_MIRACLES_DATA, EucharisticMiracle } from '../data/eucharisticMiracles';
import {
  Sparkles,
  Filter,
  ShieldCheck,
  Microscope,
  Heart,
  Globe,
  X,
  BookOpen,
  Calendar,
  MapPin,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Landmark,
  RotateCcw,
  Share2,
  Download,
  Copy,
  Check
} from 'lucide-react';

interface EucharisticCatechismViewProps {
  initialSection?: 'john6' | 'miracles' | 'transubstantiation';
}

type SortOption = 'chrono-asc' | 'chrono-desc' | 'country-az' | 'forensic-first';
type QuickCollection = 'all' | 'forensic' | 'Italy' | 'Spain' | 'France' | 'Germany' | 'americas' | 'other';
type EraFilter = 'all' | 'ancient' | 'medieval' | 'early-modern' | 'modern';

const AMERICAS_COUNTRIES = new Set(['Argentina', 'Mexico', 'Peru', 'Venezuela', 'Colombia', 'Martinique']);
const MAJOR_EUROPEAN_COUNTRIES = new Set(['Italy', 'Spain', 'France', 'Germany']);

export const EucharisticCatechismView: React.FC<EucharisticCatechismViewProps> = ({
  initialSection = 'miracles'
}) => {
  const [activeSection, setActiveSection] = useState<'john6' | 'miracles' | 'transubstantiation'>(initialSection);

  // Exhibition catalog filter & sort state
  const [quickCollection, setQuickCollection] = useState<QuickCollection>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedEra, setSelectedEra] = useState<EraFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('chrono-asc');
  const [showAllCountries, setShowAllCountries] = useState<boolean>(false);
  const [inspectedMiracle, setInspectedMiracle] = useState<EucharisticMiracle | null>(null);
  const [isLancianoFbModalOpen, setIsLancianoFbModalOpen] = useState<boolean>(false);
  const [lancianoFbCopied, setLancianoFbCopied] = useState<boolean>(false);

  const lancianoFacebookCaption = `EUCHARISTIC MIRACLES: The Lanciano Miracle and the Linoli Report

In the eighth century, in the Italian town of Lanciano, a Basilian monk who struggled with doubts about the Real Presence of Christ in the Eucharist was celebrating Mass. At the moment of consecration, the Sacred Host was transformed into visible human flesh, and the wine into visible blood. The flesh and blood have been preserved to this day in the Church of San Francesco in Lanciano, Italy.

THE LINOLI REPORT (1971)
On March 4, 1971, Dr. Edoardo Linoli and Dr. Ruggero Bertelli presented their findings:
1. The flesh was genuine human tissue, specifically cardiac tissue, identified as myocardium and endocardial tissue.
2. The blood was of human origin, with blood group AB.
3. No preservatives or substances capable of preserving the flesh artificially were detected.
4. The flesh and blood were not found to be artificially produced or anatomically fabricated specimens.

“I am the living bread that came down from heaven; whoever eats this bread will live forever; and the bread that I will give is my flesh for the life of the world.” (John 6:51, NABRE)

TRANSUBSTANTIATION
Transubstantiation (Lat. “change of substance”). The change (through the eucharistic words of consecration) of the substance of bread and wine into the body and blood of Christ, with the appearances of bread and wine remaining.

Gerald O’Collins and Edward G. Farrugia, A Concise Dictionary of Theology (New York; Mahwah, NJ: Paulist Press, 2013), 270.

SOUL SANCTUM`;

  const handleCopyLancianoCaption = () => {
    navigator.clipboard.writeText(lancianoFacebookCaption);
    setLancianoFbCopied(true);
    setTimeout(() => setLancianoFbCopied(false), 2200);
  };

  const handleDownloadLancianoGraphic = () => {
    const W = 1400;
    const canvas = document.createElement('canvas');
    const measureCtx = canvas.getContext('2d');
    if (!measureCtx) return;

    const wrapLines = (
      ctxRef: CanvasRenderingContext2D,
      text: string,
      maxWidth: number,
      font: string
    ): string[] => {
      ctxRef.font = font;
      const words = text.split(/\s+/);
      const lines: string[] = [];
      let current = '';
      for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        if (ctxRef.measureText(test).width > maxWidth && current) {
          lines.push(current);
          current = word;
        } else {
          current = test;
        }
      }
      if (current) lines.push(current);
      return lines;
    };

    const drawParagraph = (
      ctxRef: CanvasRenderingContext2D,
      text: string,
      x: number,
      startY: number,
      maxWidth: number,
      lineHeight: number,
      font: string,
      color: string,
      dryRun = false
    ): number => {
      const lines = wrapLines(ctxRef, text, maxWidth, font);
      if (!dryRun) {
        ctxRef.font = font;
        ctxRef.fillStyle = color;
        let y = startY;
        for (const line of lines) {
          ctxRef.fillText(line, x, y);
          y += lineHeight;
        }
      }
      return startY + lines.length * lineHeight;
    };

    const drawDropCapParagraph = (
      ctxRef: CanvasRenderingContext2D,
      text: string,
      x: number,
      startY: number,
      maxWidth: number,
      lineHeight: number,
      font: string,
      color: string,
      dropCapFont: string,
      dropCapColor: string,
      dryRun = false
    ): number => {
      const firstChar = text.charAt(0);
      const restWords = text.slice(1).split(/\s+/);

      ctxRef.font = dropCapFont;
      const dropCapW = Math.ceil(ctxRef.measureText(firstChar).width) + 6;

      ctxRef.font = font;
      const lines: { text: string; offsetX: number }[] = [];
      let current = '';
      let lineIndex = 0;

      for (const word of restWords) {
        const lineOffset = lineIndex < 2 ? dropCapW : 0;
        const limitW = maxWidth - lineOffset;
        const test = current ? `${current} ${word}` : word;
        if (ctxRef.measureText(test).width > limitW && current) {
          lines.push({ text: current, offsetX: lineOffset });
          current = word;
          lineIndex++;
        } else {
          current = test;
        }
      }
      if (current) {
        lines.push({ text: current, offsetX: lineIndex < 2 ? dropCapW : 0 });
      }

      if (!dryRun) {
        ctxRef.font = dropCapFont;
        ctxRef.fillStyle = dropCapColor;
        ctxRef.fillText(firstChar, x, startY - 4);

        ctxRef.font = font;
        ctxRef.fillStyle = color;
        let y = startY;
        for (const line of lines) {
          ctxRef.fillText(line.text, x + line.offsetX, y);
          y += lineHeight;
        }
      }

      const textBottom = startY + lines.length * lineHeight;
      const dropCapBottom = startY + lineHeight * 2;
      return Math.max(textBottom, dropCapBottom);
    };

    const renderPoster = (photoImg: HTMLImageElement | null) => {
      const headerH = 680;
      const bodyX = 84;
      const bodyW = W - 168;
      const gutter = 64;
      const colW = (bodyW - gutter) / 2;
      const leftX = bodyX;
      const rightX = bodyX + colW + gutter;

      const miracleText =
        'In the eighth century, in the Italian town of Lanciano, a Basilian monk who struggled with doubts about the Real Presence of Christ in the Eucharist was celebrating Mass. At the moment of consecration, according to the account of the miracle, the Sacred Host was transformed into visible human flesh, and the wine into visible blood. The flesh and blood have been preserved to this day in the Church of San Francesco in Lanciano, Italy.';
      const linoliIntro1 =
        'In November 1970, under ecclesiastical authorization, the relics underwent a scientific investigation conducted by Dr. Edoardo Linoli, a professor of anatomy and pathological histology, assisted by Dr. Ruggero Bertelli, professor of human anatomy at the University of Siena.';
      const linoliIntro2 =
        'On March 4, 1971, Linoli presented his findings. His examination reported that:';
      const findings = [
        '1. The flesh was genuine human tissue, specifically cardiac tissue, identified as myocardium and endocardial tissue.',
        '2. The blood was of human origin, with blood group AB.',
        '3. No preservatives or substances capable of preserving the flesh artificially were detected.',
        '4. The flesh and blood were not found to be artificially produced or anatomically fabricated specimens.'
      ];
      const faithPara =
        'The Eucharistic miracle of Lanciano invites us to contemplate one of the central mysteries of Catholic faith: the Real Presence of Jesus Christ in the Blessed Sacrament. At every Holy Mass, through the words of consecration and the power of the Holy Spirit, the bread and wine become the Body and Blood of Christ, while retaining their outward appearances of bread and wine. This is the mystery of transubstantiation. What our eyes perceive as bread and wine, faith recognizes as Jesus Christ Himself: Body, Blood, Soul, and Divinity.';
      const quoteText =
        'We do not need a visible miracle to believe. Our faith rests on the words of Christ Himself: “I am the living bread that came down from heaven; whoever eats this bread will live forever; and the bread that I will give is my flesh for the life of the world.”';
      const transubDefinition =
        'Transubstantiation (Lat. “change of substance”). The change (through the eucharistic words of consecration) of the substance of bread and wine into the body and blood of Christ, with the appearances of bread and wine remaining.';
      const transubSource =
        'Gerald O’Collins and Edward G. Farrugia, A Concise Dictionary of Theology (New York; Mahwah, NJ: Paulist Press, 2013), 270.';

      // Pre-measure exact total height so canvas never clips or leaves trailing whitespace
      let dryY = headerH + 58 + 54;
      dryY =
        drawDropCapParagraph(
          measureCtx,
          miracleText,
          bodyX,
          dryY,
          bodyW,
          46,
          '400 30px "Libre Baskerville", Georgia, serif',
          '#1E293B',
          '700 102px "Libre Baskerville", Georgia, serif',
          '#132338',
          true
        ) + 46;

      let dryLy = dryY + 52;
      dryLy = drawParagraph(measureCtx, linoliIntro1, leftX, dryLy, colW, 36, '400 23px "Libre Baskerville", Georgia, serif', '#1E293B', true) + 20;
      dryLy = drawParagraph(measureCtx, linoliIntro2, leftX, dryLy, colW, 36, '400 23px "Libre Baskerville", Georgia, serif', '#1E293B', true) + 28;

      const findingsBoxTopMeasure = dryLy;
      let findingsDryY = findingsBoxTopMeasure + 28;
      for (let i = 0; i < findings.length; i++) {
        findingsDryY = drawParagraph(
          measureCtx,
          findings[i],
          leftX + 26,
          findingsDryY,
          colW - 52,
          46,
          '700 34px "Libre Baskerville", Georgia, serif',
          '#0F2036',
          true
        );
        if (i < findings.length - 1) findingsDryY += 22;
      }
      const findingsBoxH = findingsDryY - findingsBoxTopMeasure + 26;
      const dryLyBottom = findingsBoxTopMeasure + findingsBoxH;

      let dryRy = dryY + 52;
      dryRy = drawParagraph(measureCtx, faithPara, rightX, dryRy, colW, 38, '400 24px "Libre Baskerville", Georgia, serif', '#1E293B', true);
      dryRy += 42 + 52;
      dryRy = drawParagraph(
        measureCtx,
        quoteText,
        rightX,
        dryRy,
        colW,
        38,
        '400 24px "Libre Baskerville", Georgia, serif',
        '#1E293B',
        true
      );
      dryRy += 44 + 40 + 52; // (John 6:51) + gap + Transubstantiation heading
      dryRy = drawParagraph(
        measureCtx,
        transubDefinition,
        rightX,
        dryRy,
        colW,
        38,
        '400 24px "Libre Baskerville", Georgia, serif',
        '#1E293B',
        true
      ) + 18;
      const dryRyBottom = drawParagraph(
        measureCtx,
        transubSource,
        rightX,
        dryRy,
        colW,
        30,
        '400 19px "Libre Baskerville", Georgia, serif',
        '#475569',
        true
      );

      const contentBottom = Math.max(dryLyBottom, dryRyBottom);
      const H = contentBottom + 114;

      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.textBaseline = 'top';

      // Pure white background for main text
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, W, H);

      // Top Darker Blue header banner
      const grad = ctx.createLinearGradient(0, 0, W, headerH);
      grad.addColorStop(0, '#132338');
      grad.addColorStop(0.5, '#1E3552');
      grad.addColorStop(1, '#132338');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, headerH);

      // Header bottom bleached sand rule
      ctx.fillStyle = '#EAE0CE';
      ctx.fillRect(0, headerH - 6, W, 6);

      // Outer bleached sand frame in header
      ctx.strokeStyle = 'rgba(234, 224, 206, 0.55)';
      ctx.lineWidth = 2;
      ctx.strokeRect(42, 38, W - 84, headerH - 82);

      // Framed reliquary monstrance photograph on the RIGHT
      const frameW = 430;
      const frameH = 516;
      const frameX = W - 82 - frameW;
      const frameY = 80;
      ctx.fillStyle = '#0D1929';
      ctx.fillRect(frameX, frameY, frameW, frameH);
      if (photoImg) {
        const imgAspect = photoImg.width / photoImg.height;
        const boxAspect = frameW / frameH;
        let sx = 0;
        let sy = 0;
        let sw = photoImg.width;
        let sh = photoImg.height;
        if (imgAspect > boxAspect) {
          sw = photoImg.height * boxAspect;
          sx = (photoImg.width - sw) / 2;
        } else {
          sh = photoImg.width / boxAspect;
          sy = (photoImg.height - sh) / 2;
        }
        ctx.drawImage(photoImg, sx, sy, sw, sh, frameX, frameY, frameW, frameH);
      }
      ctx.strokeStyle = '#EAE0CE';
      ctx.lineWidth = 3;
      ctx.strokeRect(frameX, frameY, frameW, frameH);

      // Left header typography
      const hx = 84;
      const hw = frameX - hx - 44;
      ctx.fillStyle = '#F4ECDC';
      ctx.font = '700 24px "Cinzel", Georgia, serif';
      ctx.fillText('EUCHARISTIC MIRACLES', hx, 112);

      ctx.fillStyle = 'rgba(234, 224, 206, 0.75)';
      ctx.fillRect(hx, 150, hw, 2);

      // Explicit 2-line title at maximized readable scale:
      // Line 1: The Lanciano Miracle
      // Line 2: and (italics) + the Linoli Report
      let titleFontSize = 72;
      const line2Width = (size: number) => {
        ctx.font = `italic 400 ${size}px "Libre Baskerville", Georgia, serif`;
        const w1 = ctx.measureText('and ').width;
        ctx.font = `700 ${size}px "Libre Baskerville", Georgia, serif`;
        const w2 = ctx.measureText('the Linoli Report').width;
        return w1 + w2;
      };
      const line1Width = (size: number) => {
        ctx.font = `700 ${size}px "Libre Baskerville", Georgia, serif`;
        return ctx.measureText('The Lanciano Miracle').width;
      };
      while ((line1Width(titleFontSize) > hw || line2Width(titleFontSize) > hw) && titleFontSize > 42) {
        titleFontSize -= 2;
      }

      const line1Y = 188;
      const line2Y = line1Y + Math.round(titleFontSize * 1.24);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 ${titleFontSize}px "Libre Baskerville", Georgia, serif`;
      ctx.fillText('The Lanciano Miracle', hx, line1Y);

      ctx.font = `italic 400 ${titleFontSize}px "Libre Baskerville", Georgia, serif`;
      const andText = 'and ';
      const andWidth = ctx.measureText(andText).width;
      ctx.fillStyle = '#F4ECDC';
      ctx.fillText(andText, hx, line2Y);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 ${titleFontSize}px "Libre Baskerville", Georgia, serif`;
      ctx.fillText('the Linoli Report', hx + andWidth, line2Y);

      const titleBottomY = line2Y + Math.round(titleFontSize * 1.15);
      ctx.fillStyle = 'rgba(234, 224, 206, 0.75)';
      ctx.fillRect(hx, titleBottomY + 18, hw, 2);

      drawParagraph(
        ctx,
        'An examination of the Eucharistic miracle of Lanciano',
        hx,
        titleBottomY + 46,
        hw,
        42,
        'italic 30px "Libre Baskerville", Georgia, serif',
        '#F4ECDC'
      );

      // Section 1: THE MIRACLE
      let y = headerH + 58;
      ctx.fillStyle = '#132338';
      ctx.font = '700 22px "Cinzel", Georgia, serif';
      ctx.fillText('THE MIRACLE', bodyX, y);
      ctx.fillStyle = '#1E3552';
      ctx.fillRect(bodyX, y + 34, bodyW, 2);
      y += 54;

      y = drawDropCapParagraph(
        ctx,
        miracleText,
        bodyX,
        y,
        bodyW,
        46,
        '400 30px "Libre Baskerville", Georgia, serif',
        '#1E293B',
        '700 102px "Libre Baskerville", Georgia, serif',
        '#132338'
      );

      y += 46;

      // Left Column: THE LINOLI REPORT (1971)
      let ly = y;
      ctx.fillStyle = '#132338';
      ctx.font = '700 21px "Cinzel", Georgia, serif';
      ctx.fillText('THE LINOLI REPORT (1971)', leftX, ly);
      ctx.fillStyle = '#1E3552';
      ctx.fillRect(leftX, ly + 32, colW, 2);
      ly += 52;

      ly = drawParagraph(
        ctx,
        linoliIntro1,
        leftX,
        ly,
        colW,
        36,
        '400 23px "Libre Baskerville", Georgia, serif',
        '#1E293B'
      );
      ly += 20;

      ly = drawParagraph(
        ctx,
        linoliIntro2,
        leftX,
        ly,
        colW,
        36,
        '400 23px "Libre Baskerville", Georgia, serif',
        '#1E293B'
      );
      ly += 28;

      // Warm light-brown / bleached sand background for the four findings (no blue outline)
      const findingsBoxTop = ly;
      ctx.fillStyle = '#F4ECDC';
      ctx.fillRect(leftX, findingsBoxTop, colW, findingsBoxH);

      ly = findingsBoxTop + 28;
      for (let i = 0; i < findings.length; i++) {
        ly = drawParagraph(
          ctx,
          findings[i],
          leftX + 26,
          ly,
          colW - 52,
          46,
          '700 34px "Libre Baskerville", Georgia, serif',
          '#0F2036'
        );
        if (i < findings.length - 1) ly += 22;
      }
      const leftBottom = findingsBoxTop + findingsBoxH;

      // Right Column: Faith Meaning
      let ry = y;
      ctx.fillStyle = '#132338';
      ctx.font = '700 21px "Cinzel", Georgia, serif';
      ctx.fillText('WHAT DOES THIS MEAN FOR OUR FAITH?', rightX, ry);
      ctx.fillStyle = '#1E3552';
      ctx.fillRect(rightX, ry + 32, colW, 2);
      ry += 52;

      ry = drawParagraph(
        ctx,
        faithPara,
        rightX,
        ry,
        colW,
        38,
        '400 24px "Libre Baskerville", Georgia, serif',
        '#1E293B'
      );

      // Faith in the Words of Christ — aligned flush with paragraph above
      ry += 42;
      ctx.fillStyle = '#132338';
      ctx.font = '700 21px "Cinzel", Georgia, serif';
      ctx.fillText('FAITH IN THE WORDS OF CHRIST', rightX, ry);
      ctx.fillStyle = '#1E3552';
      ctx.fillRect(rightX, ry + 32, colW, 2);
      ry += 52;

      ry = drawParagraph(
        ctx,
        quoteText,
        rightX,
        ry,
        colW,
        38,
        '400 24px "Libre Baskerville", Georgia, serif',
        '#1E293B'
      );

      ctx.fillStyle = '#132338';
      ctx.font = '700 20px "Cinzel", Georgia, serif';
      ctx.fillText('(John 6:51, NABRE)', rightX, ry + 14);
      ry += 44 + 40;

      // Transubstantiation definition (right column)
      ctx.fillStyle = '#132338';
      ctx.font = '700 21px "Cinzel", Georgia, serif';
      ctx.fillText('TRANSUBSTANTIATION', rightX, ry);
      ctx.fillStyle = '#1E3552';
      ctx.fillRect(rightX, ry + 32, colW, 2);
      ry += 52;

      ry = drawParagraph(
        ctx,
        transubDefinition,
        rightX,
        ry,
        colW,
        38,
        '400 24px "Libre Baskerville", Georgia, serif',
        '#1E293B'
      );
      ry += 18;

      const rightBottom = drawParagraph(
        ctx,
        transubSource,
        rightX,
        ry,
        colW,
        30,
        '400 19px "Libre Baskerville", Georgia, serif',
        '#475569'
      );

      // Footer
      const footerY = Math.max(leftBottom, rightBottom) + 36;
      ctx.fillStyle = '#1E3552';
      ctx.fillRect(bodyX, footerY, bodyW, 2);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#6B4C2B';
      ctx.font = '700 26px "Cinzel", Georgia, serif';
      ctx.fillText('SOUL SANCTUM', W / 2, footerY + 24);
      ctx.textAlign = 'left';

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'lanciano-miracle-linoli-report-facebook-post.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => renderPoster(img);
    img.onerror = () => renderPoster(null);
    img.src = '/assets/aistudio/LANCIANO_MONSTRANCE_1d58160a.jpg';
  };

  // Parse miracle year into numeric value for chronological sorting & era filtering
  const parseMiracleYear = (yearStr: string): number => {
    const fourDigit = yearStr.match(/\b(1\d{3}|20\d{2})\b/);
    if (fourDigit) return parseInt(fourDigit[1], 10);
    const threeDigit = yearStr.match(/\b(\d{3})\b/);
    if (threeDigit) return parseInt(threeDigit[1], 10);
    const centuryMatch = yearStr.match(/(\d{1,2})(?:st|nd|rd|th)\s+Century/i);
    if (centuryMatch) return (parseInt(centuryMatch[1], 10) - 1) * 100 + 50;
    return 1000;
  };

  const hasForensicReport = (m: EucharisticMiracle): boolean => {
    return Boolean(m.bloodType || (m.keyScientificFindings && m.keyScientificFindings.length > 0));
  };

  // Extract unique countries sorted by miracle count descending, then alphabetically
  const countryStats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of EUCHARISTIC_MIRACLES_DATA) {
      counts.set(m.country, (counts.get(m.country) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([country, count]) => ({ country, count }));
  }, []);

  const miracleTypes = [
    'All',
    'Heart Muscle Transformation',
    'Bleeding Host',
    'Incorrupt Host',
    'Apparition in Host',
    'Fire Resistance',
    'Levitation',
    'Supernatural Light',
    'Halting a Tsunami',
    'Adoration by Animals'
  ];

  // Handle quick collection change
  const handleSelectQuickCollection = (collection: QuickCollection) => {
    setQuickCollection(collection);
    if (collection === 'Italy' || collection === 'Spain' || collection === 'France' || collection === 'Germany') {
      setSelectedCountry(collection);
    } else {
      setSelectedCountry('All');
    }
    if (collection === 'forensic') {
      setSortBy('forensic-first');
    }
  };

  // Handle individual country button click
  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    if (country === 'All') {
      if (quickCollection === 'Italy' || quickCollection === 'Spain' || quickCollection === 'France' || quickCollection === 'Germany') {
        setQuickCollection('all');
      }
    } else if (country === 'Italy' || country === 'Spain' || country === 'France' || country === 'Germany') {
      setQuickCollection(country);
    } else {
      setQuickCollection('all');
    }
  };

  const resetAllFilters = () => {
    setQuickCollection('all');
    setSelectedCountry('All');
    setSelectedType('All');
    setSelectedEra('all');
    setSortBy('chrono-asc');
  };

  const filteredMiracles = useMemo(() => {
    return EUCHARISTIC_MIRACLES_DATA.filter((m) => {
      // Quick Collection filter
      if (quickCollection === 'forensic' && !hasForensicReport(m)) return false;
      if (quickCollection === 'americas' && !AMERICAS_COUNTRIES.has(m.country)) return false;
      if (
        quickCollection === 'other' &&
        (MAJOR_EUROPEAN_COUNTRIES.has(m.country) || AMERICAS_COUNTRIES.has(m.country))
      ) {
        return false;
      }

      // Specific Country filter
      if (selectedCountry !== 'All' && m.country !== selectedCountry) return false;

      // Phenomenon filter
      if (selectedType !== 'All' && m.miracleType !== selectedType) return false;

      // Historical Era filter
      if (selectedEra !== 'all') {
        const yr = parseMiracleYear(m.year);
        if (selectedEra === 'ancient' && yr >= 1200) return false;
        if (selectedEra === 'medieval' && (yr < 1200 || yr >= 1500)) return false;
        if (selectedEra === 'early-modern' && (yr < 1500 || yr >= 1800)) return false;
        if (selectedEra === 'modern' && yr < 1800) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'chrono-asc') {
        return parseMiracleYear(a.year) - parseMiracleYear(b.year) || a.title.localeCompare(b.title);
      }
      if (sortBy === 'chrono-desc') {
        return parseMiracleYear(b.year) - parseMiracleYear(a.year) || a.title.localeCompare(b.title);
      }
      if (sortBy === 'country-az') {
        return (
          a.country.localeCompare(b.country) ||
          a.location.localeCompare(b.location) ||
          parseMiracleYear(a.year) - parseMiracleYear(b.year)
        );
      }
      if (sortBy === 'forensic-first') {
        const aForensic = hasForensicReport(a) ? 1 : 0;
        const bForensic = hasForensicReport(b) ? 1 : 0;
        if (bForensic !== aForensic) return bForensic - aForensic;
        const aBlood = a.bloodType ? 1 : 0;
        const bBlood = b.bloodType ? 1 : 0;
        if (bBlood !== aBlood) return bBlood - aBlood;
        return parseMiracleYear(b.year) - parseMiracleYear(a.year);
      }
      return 0;
    });
  }, [quickCollection, selectedCountry, selectedType, selectedEra, sortBy]);

  // Index of currently inspected miracle for modal Next/Prev navigation
  const inspectedIndex = useMemo(() => {
    if (!inspectedMiracle) return -1;
    return filteredMiracles.findIndex((m) => m.id === inspectedMiracle.id);
  }, [inspectedMiracle, filteredMiracles]);

  const hasActiveFilters =
    quickCollection !== 'all' || selectedCountry !== 'All' || selectedType !== 'All' || selectedEra !== 'all';

  const formatYearTwoLines = (year: string): React.ReactNode => {
    const centuryMatch = year.match(/^(.+?)\s+(Century(?:\s+AD)?)$/i);
    if (centuryMatch) {
      return (
        <>
          <span className="block whitespace-nowrap">{centuryMatch[1]}</span>
          <span className="block whitespace-nowrap">{centuryMatch[2]}</span>
        </>
      );
    }

    const centAbbrevMatch = year.match(/^(.+?Cent\.?[,/])\s*(.+)$/i);
    if (centAbbrevMatch) {
      return (
        <>
          <span className="block whitespace-nowrap">{centAbbrevMatch[1]}</span>
          <span className="block whitespace-nowrap">{centAbbrevMatch[2]}</span>
        </>
      );
    }

    return <span className="whitespace-nowrap">{year}</span>;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-12">
      
      {/* Top Banner — Eucharistic Miracles with Lanciano Reliquary */}
      <div
        className="sanctum-top-banner relative isolate px-4 py-3 sm:px-6 sm:py-4 h-[196px] sm:h-[212px] rounded-xl text-[#F9F6F0] shadow-md border border-slate-700/80 overflow-hidden flex flex-col justify-center"
        style={{
          background:
            'linear-gradient(100deg, #0D1729 0%, #152846 36%, #224474 62%, #3E6FAE 82%, #5285C8 100%)',
        }}
      >
        {/* Soft continuous atmospheric glow bridging banner blue into the Lanciano sky */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 44% 95% at 84% 42%, rgba(126, 178, 240, 0.42) 0%, rgba(74, 126, 194, 0.16) 48%, transparent 78%)',
          }}
        />

        {/* Right-aligned Eucharistic Miracle of Lanciano Reliquary */}
        <div
          className="pointer-events-none select-none absolute inset-y-0 right-3 sm:right-7 flex items-center justify-end z-0"
          aria-hidden="true"
        >
          <img
            src="/assets/aistudio/EUCHARISTIC_MIRACLE_OF_LANCIANO_b56e5fa6.jpg"
            alt="Reliquary of the Eucharistic Miracle of Lanciano"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-auto max-w-none block"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.16) 6%, rgba(0,0,0,0.58) 14%, rgba(0,0,0,0.94) 24%, black 32%, black 82%, rgba(0,0,0,0.78) 91%, rgba(0,0,0,0.22) 97%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.16) 6%, rgba(0,0,0,0.58) 14%, rgba(0,0,0,0.94) 24%, black 32%, black 82%, rgba(0,0,0,0.78) 91%, rgba(0,0,0,0.22) 97%, transparent 100%)',
            }}
          />
        </div>

        {/* Continuous full-width translucent sweep smoothing left-to-right transition and bottom edge */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(to right, rgba(13,23,41,0.72) 0%, rgba(21,40,70,0.48) 46%, rgba(34,68,116,0.16) 72%, transparent 90%), linear-gradient(to top, rgba(13,23,41,0.42) 0%, transparent 24%)',
          }}
        />

        <div className="relative z-10 space-y-1 pr-[118px] sm:pr-[156px]">
          <div className="flex items-center gap-1.5">
            <span className="leading-tight font-cinzel text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#DFD5C3] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#EAE2D3] shrink-0" />
              <span>Sacramentum Caritatis • Source and Summit of Catholic Faith</span>
            </span>
          </div>
          <h3 className="font-cinzel text-[15px] sm:text-xl font-bold text-[#FBF9F5] tracking-wide leading-snug">
            Catechism on the Eucharist and Miracles Approved by the Vatican
          </h3>
          <p className="text-[10.5px] sm:text-[11.5px] text-[#EAE2D3] font-serif max-w-3xl leading-[1.32]">
            &ldquo;The Eucharist is the heart and the summit of the Church&apos;s life, for in it Christ associates his Church and all her members with his sacrifice of praise and thanksgiving offered once for all on the cross to his Father.&rdquo; (CCC 1407)
          </p>
        </div>
      </div>

      <div className="p-3 sm:p-6 md:p-8 rounded-xl bg-[#F6F2EA]/85 backdrop-blur-xl backdrop-saturate-150 border border-[#DFD6C7] ring-1 ring-inset ring-white/60 shadow-[0_8px_32px_0_rgba(51,65,85,0.12)] space-y-5">
      {/* Sub-navigation tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSection('miracles')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer flex items-center gap-2 border ${
            activeSection === 'miracles'
              ? 'bg-slate-900 text-[#FBF9F5] shadow-sm font-bold border-slate-800'
              : 'bg-[#F4EFE6] text-slate-800 hover:bg-[#EAE2D3] border-[#D8CFC0]'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${activeSection === 'miracles' ? 'text-[#DFD5C3]' : 'text-slate-600'}`} />
          <span>St. Carlo Acutis Complete Catalog ({EUCHARISTIC_MIRACLES_DATA.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('transubstantiation')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer border ${
            activeSection === 'transubstantiation'
              ? 'bg-slate-900 text-[#FBF9F5] shadow-sm font-bold border-slate-800'
              : 'bg-[#F4EFE6] text-slate-800 hover:bg-[#EAE2D3] border-[#D8CFC0]'
          }`}
        >
          The Dogma of Transubstantiation
        </button>

        <button
          onClick={() => setActiveSection('john6')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer border ${
            activeSection === 'john6'
              ? 'bg-slate-900 text-[#FBF9F5] shadow-sm font-bold border-slate-800'
              : 'bg-[#F4EFE6] text-slate-800 hover:bg-[#EAE2D3] border-[#D8CFC0]'
          }`}
        >
          Bread of Life Discourse (John 6)
        </button>
      </div>

      {/* =========================================================================
          SECTION 1: EXPLANATION OF TRANSUBSTANTIATION
         ========================================================================= */}
      {activeSection === 'transubstantiation' && (
        <div className="bg-[#FBF9F5]/95 backdrop-blur-xl rounded-xl p-6 sm:p-8 shadow-xs border border-[#DFD6C7] space-y-6">
          <div className="border-b border-[#D8CFC0] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-cinzel">
              Dogmatic Formulation • Council of Trent (1551)
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              What is Transubstantiation? (Substance vs. Accidents)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Metaphysics */}
            <div className="p-5 rounded-xl bg-[#F4EFE6] border border-[#D8CFC0] space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-cinzel font-bold text-sm">
                <span>1. Substance (What it Is)</span>
              </div>
              <p className="font-serif-sacred text-slate-700 text-sm sm:text-base leading-relaxed">
                In classical philosophy and Catholic theology (formulated by St. Thomas Aquinas), the <span className="font-bold text-slate-900">Substance</span> is the underlying essence or core identity of a thing—what it truly is in its deepest reality.
              </p>
              <div className="p-3 bg-[#EAE2D3]/75 rounded-xl border border-[#C8BBA6] text-xs font-serif-sacred text-slate-800 font-medium">
                At the consecration, the entire substance of bread and wine ceases to exist and is replaced by the true Substance of Christ: His Body, Blood, Soul, and Divinity.
              </div>
            </div>

            {/* The Accidents */}
            <div className="p-5 rounded-xl bg-[#F4EFE6] border border-[#D8CFC0] space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-cinzel font-bold text-sm">
                <span>2. The Accidents (How it Appears)</span>
              </div>
              <p className="font-serif-sacred text-slate-700 text-sm sm:text-base leading-relaxed">
                The <span className="font-bold text-slate-900">Accidents</span> (or species) are the perceptible physical properties: physical dimensions, chemical weight, color, taste, scent, texture, and nutritional breakdown.
              </p>
              <div className="p-3 bg-[#EAE2D3]/75 rounded-xl border border-[#C8BBA6] text-xs font-serif-sacred text-slate-800 font-medium">
                By a unique miracle of divine omnipotence, the accidents of bread and wine remain intact without their natural subject, allowing us to receive the King of Heaven without natural horror.
              </div>
            </div>
          </div>

          {/* Totus Christus and In Persona Christi */}
          <div className="p-6 rounded-xl bg-[#EFE9DC] border border-[#D8CFC0] space-y-4">
            <h5 className="font-cinzel text-base font-bold text-slate-900">
              Crucial Doctrinal Pillars of the Real Presence:
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-serif-sacred text-slate-700">
              <div className="bg-[#FBF9F5] p-4 rounded-lg border border-[#D8CFC0] space-y-1.5">
                <span className="font-bold font-cinzel text-slate-800 block text-xs">A. Totus Christus (Whole Christ)</span>
                <p>
                  Christ is present whole and entire in each of the species and whole and entire in each of their parts, in such a way that the breaking of the bread does not divide Christ. (CCC 1377)
                </p>
              </div>

              <div className="bg-[#FBF9F5] p-4 rounded-lg border border-[#D8CFC0] space-y-1.5">
                <span className="font-bold font-cinzel text-slate-800 block text-xs">B. Permanent Presence</span>
                <p>
                  The Eucharistic presence of Christ begins at the moment of consecration and endures as long as the consecrated species subsist. For this reason, the Blessed Sacrament is reserved in the tabernacle for adoration and Viaticum.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: BREAD OF LIFE DISCOURSE (JOHN 6)
         ========================================================================= */}
      {activeSection === 'john6' && (
        <div className="bg-[#FBF9F5]/95 backdrop-blur-xl rounded-xl p-6 sm:p-8 shadow-xs border border-[#DFD6C7] space-y-6">
          <div className="border-b border-[#D8CFC0] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-cinzel">
              Biblical Foundation • Holy Gospel of Saint John
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              The Bread of Life Discourse (John 6:51–69)
            </h4>
          </div>

          <div className="space-y-5 font-serif-sacred text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              In Capernaum, following the miraculous multiplication of the loaves, Our Lord Jesus Christ proclaimed the Eucharistic mystery in explicit, literal terms. When the crowds murmured, Jesus did not water down His language or explain it as a mere metaphor.
            </p>

            <blockquote className="py-5 px-6 bg-[#EFE9DC]/85 border-y border-slate-400/60 italic space-y-3 text-slate-900">
              <p className="text-base sm:text-lg leading-relaxed">
                &ldquo;I am the living bread which came down from heaven; if any one eats of this bread, he will live for ever; and the bread which I shall give for the life of the world is my flesh.&rdquo; <span className="not-italic font-cinzel text-xs font-bold text-slate-600 ml-1">(John 6:51)</span>
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                &ldquo;Truly, truly, I say to you, unless you eat the flesh of the Son of man and drink his blood, you have no life in you; he who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day. For my flesh is food indeed, and my blood is drink indeed.&rdquo; <span className="not-italic font-cinzel text-xs font-bold text-slate-600 ml-1">(John 6:53–55)</span>
              </p>
            </blockquote>

            <div className="p-4 bg-[#F4EFE6] rounded-xl border border-[#D8CFC0] space-y-2 text-xs sm:text-sm">
              <span className="font-cinzel font-bold text-slate-900 block">The Greek Verbs: Phago vs. Trogo</span>
              <p>
                In classical Greek, the general word for eating is <span className="font-bold text-slate-900">phago</span>. But when the listeners balked (&ldquo;How can this man give us his flesh to eat?&rdquo;), Jesus intensified His verb to <span className="font-bold text-slate-900">trogo</span> (used four times in verses 54–58), which literally means &ldquo;to gnaw, crunch, or chew,&rdquo; decisively refuting any purely symbolic interpretation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: ST. CARLO ACUTIS VATICAN EUCHARISTIC MIRACLES ARCHIVE
         ========================================================================= */}
      {activeSection === 'miracles' && (
        <div className="bg-[#FBF9F5]/95 backdrop-blur-xl rounded-xl p-5 sm:p-7 md:p-8 shadow-xs border border-[#DFD6C7] space-y-6">
          
          {/* Exhibition Masthead & Archival Summary Ribbon */}
          <div className="border-b border-[#D8CFC0] pb-6 space-y-4">
            <div className="space-y-1.5">
              <span className="font-cinzel text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 block">
                Vatican International Exhibition • Complete Archival Catalog
              </span>
              <h4 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900 tracking-wide">
                Complete Catalog of Eucharistic Miracles by Saint Carlo Acutis
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 font-serif-sacred leading-relaxed max-w-4xl">
                <span className="font-bold text-slate-900">130 documented prodigies recognized by the Catholic Church worldwide</span>, curated from the official international exhibition <span className="italic font-semibold text-slate-900">&ldquo;The Eucharistic Miracles of the World&rdquo;</span> compiled by <span className="font-bold text-slate-900">Saint Carlo Acutis</span> (<span className="underline decoration-slate-500 font-semibold">miracolieucaristici.com</span>).
              </p>
            </div>

            {/* Museum Operational / Archival Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-[#F4EFE6] border border-[#D8CFC0] rounded-lg px-3.5 py-2.5">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">130</div>
                <div className="text-[11px] font-cinzel uppercase tracking-wider text-slate-600">Documented Prodigies</div>
              </div>
              <div className="bg-[#F4EFE6] border border-[#D8CFC0] rounded-lg px-3.5 py-2.5">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">{countryStats.length} Nations</div>
                <div className="text-[11px] font-cinzel uppercase tracking-wider text-slate-600">Worldwide Sanctuary Sites</div>
              </div>
              <div className="bg-[#F4EFE6] border border-[#D8CFC0] rounded-lg px-3.5 py-2.5">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">3rd – 21st C.</div>
                <div className="text-[11px] font-cinzel uppercase tracking-wider text-slate-600">1,800 Years of Testimony</div>
              </div>
              <div className="bg-[#F4EFE6] border border-[#D8CFC0] rounded-lg px-3.5 py-2.5">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">Type AB</div>
                <div className="text-[11px] font-cinzel uppercase tracking-wider text-slate-600">Myocardium &amp; Shroud Match</div>
              </div>
            </div>
          </div>

          {/* Curatorial Navigation & Filter Console */}
          <div className="space-y-4 bg-[#F4EFE6]/90 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-[#D8CFC0] shadow-2xs">
            
            {/* Row 1: Quick Exhibition Collections + Order By Dropdown */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3.5 border-b border-[#D8CFC0]">
              <div className="space-y-1.5">
                <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-slate-600" />
                  Exhibition Collections:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { id: 'all', label: `All (${EUCHARISTIC_MIRACLES_DATA.length})` },
                      { id: 'forensic', label: 'With Forensic Report' },
                      { id: 'Italy', label: 'Italy' },
                      { id: 'Spain', label: 'Spain' },
                      { id: 'France', label: 'France' },
                      { id: 'Germany', label: 'Germany' },
                      { id: 'americas', label: 'The Americas' },
                      { id: 'other', label: 'Other Nations' }
                    ] as { id: QuickCollection; label: string }[]
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleSelectQuickCollection(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                        quickCollection === tab.id
                          ? 'bg-slate-800 text-[#F9F6F0] font-bold shadow-xs border border-slate-900'
                          : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3] hover:border-slate-400'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order By Control */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0">
                <label className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />
                  Order By:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold bg-[#FBF9F5] text-slate-900 border border-[#C8BBA6] focus:outline-none focus:border-slate-700 cursor-pointer"
                >
                  <option value="chrono-asc">Chronological (Ancient → Modern)</option>
                  <option value="chrono-desc">Chronological (Modern → Ancient)</option>
                  <option value="country-az">Country &amp; City (A–Z)</option>
                  <option value="forensic-first">Scientific &amp; Forensic Reports First</option>
                </select>
              </div>
            </div>

            {/* Row 2: Historical Era Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D8CFC0]">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-slate-700 mr-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  Historical Era:
                </span>
                {(
                  [
                    { id: 'all', label: 'All Centuries' },
                    { id: 'ancient', label: 'Early & Romanesque (3rd–12th C.)' },
                    { id: 'medieval', label: 'High & Late Middle Ages (13th–15th C.)' },
                    { id: 'early-modern', label: 'Renaissance & Baroque (16th–18th C.)' },
                    { id: 'modern', label: 'Modern & Forensic Era (19th–21st C.)' }
                  ] as { id: EraFilter; label: string }[]
                ).map((era) => (
                  <button
                    key={era.id}
                    onClick={() => setSelectedEra(era.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-serif-sacred transition-all cursor-pointer ${
                      selectedEra === era.id
                        ? 'bg-slate-700 text-[#F9F6F0] font-bold border border-slate-800'
                        : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3]'
                    }`}
                  >
                    {era.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Filter by Miracle Phenomenon */}
            <div className="space-y-1.5 pb-3 border-b border-[#D8CFC0]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 font-cinzel text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-600" />
                  Filter by Phenomenon:
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-cinzel font-bold text-slate-800">
                    Showing {filteredMiracles.length} of {EUCHARISTIC_MIRACLES_DATA.length} Prodigies
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={resetAllFilters}
                      className="text-[11px] font-cinzel font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {miracleTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-2.5 py-1 rounded-md text-xs font-cinzel transition-all cursor-pointer ${
                      selectedType === t
                        ? 'bg-slate-800 text-[#F9F6F0] font-bold shadow-xs border border-slate-900'
                        : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: Filter by Nation (with counts) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 font-cinzel text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-600" />
                  Filter by Nation ({countryStats.length} Countries):
                </span>
                <button
                  onClick={() => setShowAllCountries(!showAllCountries)}
                  className="text-[11px] font-cinzel font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
                >
                  {showAllCountries ? 'Compact Nation List' : `Show All ${countryStats.length} Nations`}
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => handleSelectCountry('All')}
                  className={`px-2.5 py-1 rounded-md text-xs font-serif-sacred transition-all cursor-pointer ${
                    selectedCountry === 'All'
                      ? 'bg-slate-800 text-[#F9F6F0] font-bold shadow-xs border border-slate-900'
                      : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3]'
                  }`}
                >
                  All Nations ({EUCHARISTIC_MIRACLES_DATA.length})
                </button>
                {(showAllCountries ? countryStats : countryStats.slice(0, 10)).map(({ country, count }) => (
                  <button
                    key={country}
                    onClick={() => handleSelectCountry(country)}
                    className={`px-2.5 py-1 rounded-md text-xs font-serif-sacred transition-all cursor-pointer ${
                      selectedCountry === country
                        ? 'bg-slate-800 text-[#F9F6F0] font-bold shadow-xs border border-slate-900'
                        : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3]'
                    }`}
                  >
                    {country} <span className="opacity-75 text-[11px]">({count})</span>
                  </button>
                ))}
                {!showAllCountries && countryStats.length > 10 && (
                  <button
                    onClick={() => setShowAllCountries(true)}
                    className="px-2.5 py-1 rounded-md text-xs font-cinzel font-semibold bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6] hover:bg-[#DFD5C3] cursor-pointer"
                  >
                    +{countryStats.length - 10} More Nations…
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Exhibition Catalog Grid — Bleached Sand & Slate Gray Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredMiracles.map((m, idx) => {
              const isForensic = hasForensicReport(m);
              return (
                <article
                  key={m.id}
                  onClick={() => setInspectedMiracle(m)}
                  className="p-5 rounded-xl bg-gradient-to-br from-[#FBF9F5] via-[#F6F2EA] to-[#ECE5D5] border border-[#D8CFC0] hover:border-slate-500 shadow-[0_3px_14px_rgba(51,65,85,0.06)] hover:shadow-[0_8px_24px_rgba(51,65,85,0.14)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3.5 group"
                >
                  {/* Top Editorial Kicker & Accession Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2.5 text-[11px] font-cinzel tracking-wider uppercase text-slate-600 border-b border-[#D8CFC0] pb-2">
                      <span className="font-bold text-slate-700 flex items-start gap-1.5 min-w-0 flex-1 leading-snug">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                        <span>{m.location}, {m.country}</span>
                      </span>
                      <span className="font-bold text-slate-900 shrink-0 text-right leading-snug">
                        {formatYearTwoLines(m.year)}
                      </span>
                    </div>

                    {/* Title */}
                    <h5 className="font-cinzel font-bold text-base sm:text-[17px] text-slate-900 group-hover:text-slate-600 transition-colors leading-snug pt-0.5">
                      {m.title}
                    </h5>

                    {/* Summary Prose */}
                    <p className="font-serif-sacred text-slate-700 text-xs sm:text-[13px] line-clamp-3 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>

                  {/* Unboxed Archival Footer */}
                  <div className="pt-2.5 border-t border-[#D8CFC0] space-y-2">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-cinzel font-semibold text-slate-700 truncate">
                        {m.miracleType}
                      </span>
                      {m.bloodType ? (
                        <span className="font-cinzel font-bold text-slate-800 shrink-0 flex items-center gap-1">
                          <Heart className="w-3 h-3 text-slate-700" />
                          Type {m.bloodType}
                        </span>
                      ) : isForensic ? (
                        <span className="font-cinzel font-semibold text-slate-700 shrink-0 flex items-center gap-1">
                          <Microscope className="w-3 h-3 text-slate-600" />
                          Forensic Dossier
                        </span>
                      ) : (
                        <span className="font-serif-sacred italic text-slate-500 shrink-0">
                          Cat. #{String(idx + 1).padStart(3, '0')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#D8CFC0]/70">
                      <span className="font-serif-sacred italic text-slate-600 truncate max-w-[65%]">
                        St. Carlo Acutis Archive
                      </span>
                      <span className="font-cinzel font-bold text-slate-800 group-hover:text-slate-950 transition-colors shrink-0">
                        Inspect Dossier →
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredMiracles.length === 0 && (
            <div className="text-center py-12 bg-[#F4EFE6] rounded-xl border border-[#D8CFC0] space-y-3">
              <p className="font-serif-sacred text-slate-700 text-base">
                No Eucharistic Miracles match the selected filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 rounded-lg bg-slate-800 text-[#F9F6F0] text-xs font-cinzel font-bold hover:bg-slate-900 transition-colors cursor-pointer"
              >
                Reset Exhibition Filters
              </button>
            </div>
          )}

        </div>
      )}
      </div>

      {/* Museum Accession Dossier Modal for Inspected Eucharistic Miracle */}
      {inspectedMiracle && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[120] bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setInspectedMiracle(null)}
        >
          <div
            className="bg-[#F9F6F0] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-600/70 shadow-2xl p-5 sm:p-7 space-y-5 text-slate-900 relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Navigation Bar inside Modal */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#D8CFC0]">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Exhibition Dossier {inspectedIndex >= 0 ? `${inspectedIndex + 1} of ${filteredMiracles.length}` : ''}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {inspectedIndex > 0 && (
                  <button
                    onClick={() => setInspectedMiracle(filteredMiracles[inspectedIndex - 1])}
                    className="px-2.5 py-1 rounded-md bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] text-xs font-cinzel font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Previous Miracle"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Prev
                  </button>
                )}
                {inspectedIndex >= 0 && inspectedIndex < filteredMiracles.length - 1 && (
                  <button
                    onClick={() => setInspectedMiracle(filteredMiracles[inspectedIndex + 1])}
                    className="px-2.5 py-1 rounded-md bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] text-xs font-cinzel font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Next Miracle"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setInspectedMiracle(null)}
                  className="p-1.5 rounded-md bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] transition-colors cursor-pointer ml-1"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Title & Accession Metadata Grid */}
            <div className="space-y-4">
              <div>
                <div className="text-xs font-cinzel font-bold uppercase tracking-widest text-slate-600">
                  {inspectedMiracle.location}, {inspectedMiracle.country} · {inspectedMiracle.year}
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 leading-snug mt-1">
                  {inspectedMiracle.title}
                </h3>
              </div>

              {/* Museum Accession Definition List */}
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#EFE9DC] p-3.5 rounded-xl border border-[#D8CFC0] text-xs">
                <div className="space-y-0.5">
                  <dt className="font-cinzel text-[10px] uppercase tracking-wider text-slate-600">Sanctuary City</dt>
                  <dd className="font-serif-sacred font-bold text-slate-900">{inspectedMiracle.location}, {inspectedMiracle.country}</dd>
                </div>
                <div className="space-y-0.5">
                  <dt className="font-cinzel text-[10px] uppercase tracking-wider text-slate-600">Documented Date</dt>
                  <dd className="font-serif-sacred font-bold text-slate-900 leading-snug">{formatYearTwoLines(inspectedMiracle.year)}</dd>
                </div>
                <div className="space-y-0.5">
                  <dt className="font-cinzel text-[10px] uppercase tracking-wider text-slate-600">Phenomenon</dt>
                  <dd className="font-serif-sacred font-bold text-slate-900">{inspectedMiracle.miracleType}</dd>
                </div>
                <div className="space-y-0.5">
                  <dt className="font-cinzel text-[10px] uppercase tracking-wider text-slate-600">Forensic Profile</dt>
                  <dd className="font-serif-sacred font-bold text-slate-900">
                    {inspectedMiracle.bloodType ? `Blood Type ${inspectedMiracle.bloodType}` : 'Canonical Testimony'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Historical Context */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-slate-600" />
                Historical Account &amp; Exhibition Narrative
              </h4>
              <div className="font-serif-sacred text-slate-800 text-sm sm:text-base leading-relaxed bg-[#FBF9F5] p-4 sm:p-5 rounded-xl border border-[#D8CFC0]">
                {inspectedMiracle.historicalContext}
              </div>
            </div>

            {/* Scientific and Canonical Investigation */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-slate-600" />
                Scientific, Canonical &amp; Reliquary Investigation
              </h4>
              <div className="font-serif-sacred text-slate-800 text-sm sm:text-base leading-relaxed bg-[#FBF9F5] p-4 sm:p-5 rounded-xl border border-[#D8CFC0]">
                {inspectedMiracle.scientificOrChurchInvestigation}
              </div>
            </div>

            {/* Scientific Findings List */}
            {inspectedMiracle.keyScientificFindings && inspectedMiracle.keyScientificFindings.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-cinzel font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-slate-600" />
                  Key Laboratory &amp; Histopathological Findings
                </h4>
                <div className="bg-[#EFE9DC] p-4 rounded-xl border border-[#C8BBA6] space-y-1.5 text-xs sm:text-sm font-serif-sacred text-slate-800">
                  {inspectedMiracle.keyScientificFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-slate-700 font-bold">•</span>
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Papal / Ecclesial Approval and Current Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif-sacred">
              <div className="p-3.5 bg-[#FBF9F5] rounded-xl border border-[#D8CFC0] space-y-1">
                <span className="font-cinzel font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                  Ecclesial &amp; Papal Recognition
                </span>
                <p className="text-slate-700 leading-relaxed">{inspectedMiracle.papalOrEcclesialApproval}</p>
              </div>

              <div className="p-3.5 bg-[#FBF9F5] rounded-xl border border-[#D8CFC0] space-y-1">
                <span className="font-cinzel font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                  Current Sanctuary &amp; Relic Preservation
                </span>
                <p className="text-slate-700 leading-relaxed">{inspectedMiracle.currentLocation}</p>
              </div>
            </div>

            {/* Source and Attribution Box */}
            <div className="bg-slate-800 text-[#F9F6F0] p-4 rounded-xl border border-slate-700 text-xs sm:text-sm font-serif-sacred space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#F4EFE6] font-cinzel text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#DFD5C3]" />
                {inspectedMiracle.sourceAttribution}
              </div>
              <p className="text-[#DFD5C3] text-xs">
                Complete Catalog of Eucharistic Miracles by Saint Carlo Acutis (<span className="italic">The Eucharistic Miracles of the World</span> · miracolieucaristici.com).
              </p>
            </div>

            {/* Modal Footer with Prev/Next and Close */}
            <div className="pt-3 border-t border-[#D8CFC0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {inspectedIndex > 0 && (
                  <button
                    onClick={() => setInspectedMiracle(filteredMiracles[inspectedIndex - 1])}
                    className="px-3.5 py-2 rounded-lg bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] text-xs font-cinzel font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Miracle
                  </button>
                )}
                {inspectedIndex >= 0 && inspectedIndex < filteredMiracles.length - 1 && (
                  <button
                    onClick={() => setInspectedMiracle(filteredMiracles[inspectedIndex + 1])}
                    className="px-3.5 py-2 rounded-lg bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] text-xs font-cinzel font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Next Miracle
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {inspectedMiracle.location === 'Lanciano' && (
                  <button
                    type="button"
                    onClick={() => setIsLancianoFbModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-[#132338] hover:bg-[#1E3552] text-[#F4ECDC] border border-[#1E3552] text-xs sm:text-sm font-cinzel font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Facebook Post</span>
                  </button>
                )}
                <button
                  onClick={() => setInspectedMiracle(null)}
                  className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-[#F9F6F0] text-xs sm:text-sm font-cinzel font-bold cursor-pointer transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Lanciano Miracle & Linoli Report Facebook Post Modal (Dark Blue, Bleached Sand & White Main Text) */}
      {isLancianoFbModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[130] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setIsLancianoFbModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl border-2 border-[#132338] max-w-4xl w-full shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="px-5 py-3.5 bg-[#132338] text-[#F4ECDC] border-b border-[#EAE0CE]/40 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                  Facebook Post · The Lanciano Miracle &amp; the Linoli Report
                </h3>
                <p className="text-xs text-[#EAE0CE] font-serif">
                  Dark Blue &amp; Bleached Sand · White Main Text · Bold Enlarged Findings · High-Res PNG Export
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLancianoFbModalOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-[#F4ECDC] cursor-pointer"
                aria-label="Close Facebook Post modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Graphic Preview + Action Buttons */}
            <div className="p-4 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto bg-[#EAE0CE]/50">
              <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl bg-white text-slate-900">
                {/* Dark Blue Header */}
                <div className="bg-gradient-to-br from-[#132338] via-[#1E3552] to-[#132338] p-5 sm:p-7 border-b-4 border-[#EAE0CE]">
                  <div className="border border-[#EAE0CE]/45 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    <div className="sm:col-span-8 space-y-3.5">
                      <div className="font-cinzel text-xs font-bold tracking-[0.18em] uppercase text-[#F4ECDC] border-b border-[#EAE0CE]/50 pb-2">
                        Eucharistic Miracles
                      </div>
                      <h4 className="font-serif text-2xl sm:text-[32px] font-bold text-white leading-[1.24]">
                        <span className="block whitespace-nowrap">The Lanciano Miracle</span>
                        <span className="block whitespace-nowrap">
                          <span className="italic font-normal text-[#F4ECDC]">and</span> the Linoli Report
                        </span>
                      </h4>
                      <div className="border-t border-[#EAE0CE]/50 pt-2.5">
                        <p className="font-serif italic text-sm sm:text-base text-[#F4ECDC]">
                          An examination of the Eucharistic miracle of Lanciano
                        </p>
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <div className="border-2 border-[#EAE0CE] bg-[#0D1929] overflow-hidden aspect-[4/4.8] shadow-lg">
                        <img
                          src="/assets/aistudio/LANCIANO_MONSTRANCE_1d58160a.jpg"
                          alt="Eucharistic Miracle of Lanciano Reliquary Monstrance"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* White Background for Main Text */}
                <div className="p-5 sm:p-7 bg-white space-y-6">
                  {/* THE MIRACLE */}
                  <div className="space-y-2">
                    <h5 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#132338] border-b border-[#1E3552]/40 pb-1">
                      The Miracle
                    </h5>
                    <p className="font-serif text-base sm:text-[17px] text-slate-800 leading-relaxed first-letter:float-left first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.82] first-letter:mr-1.5 first-letter:mt-1 first-letter:text-[#132338]">
                      In the eighth century, in the Italian town of Lanciano, a Basilian monk who struggled with doubts about the Real Presence of Christ in the Eucharist was celebrating Mass. At the moment of consecration, according to the account of the miracle, the Sacred Host was transformed into visible human flesh, and the wine into visible blood. The flesh and blood have been preserved to this day in the Church of San Francesco in Lanciano, Italy.
                    </p>
                  </div>

                  {/* Two Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Linoli Report */}
                    <div className="space-y-3">
                      <h5 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#132338] border-b border-[#1E3552]/40 pb-1">
                        The Linoli Report (1971)
                      </h5>
                      <p className="font-serif text-xs sm:text-sm text-slate-800 leading-relaxed">
                        In November 1970, under ecclesiastical authorization, the relics underwent a scientific investigation conducted by Dr. Edoardo Linoli, a professor of anatomy and pathological histology, assisted by Dr. Ruggero Bertelli, professor of human anatomy at the University of Siena.
                      </p>
                      <p className="font-serif text-xs sm:text-sm text-slate-800 leading-relaxed">
                        On March 4, 1971, Linoli presented his findings. His examination reported that:
                      </p>
                      <div className="bg-[#F4ECDC] p-4 sm:p-5">
                        <ol className="space-y-3 font-serif text-lg sm:text-xl font-bold text-[#0F2036] leading-snug">
                          <li>
                            <span className="text-[#1E3552]">1.</span> The flesh was genuine human tissue, specifically cardiac tissue, identified as myocardium and endocardial tissue.
                          </li>
                          <li>
                            <span className="text-[#1E3552]">2.</span> The blood was of human origin, with blood group AB.
                          </li>
                          <li>
                            <span className="text-[#1E3552]">3.</span> No preservatives or substances capable of preserving the flesh artificially were detected.
                          </li>
                          <li>
                            <span className="text-[#1E3552]">4.</span> The flesh and blood were not found to be artificially produced or anatomically fabricated specimens.
                          </li>
                        </ol>
                      </div>
                    </div>

                    {/* Right: Faith Meaning + Faith in the Words of Christ */}
                    <div className="space-y-6">
                      <div className="space-y-2.5">
                        <h5 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#132338] border-b border-[#1E3552]/40 pb-1">
                          What Does This Mean for Our Faith?
                        </h5>
                        <p className="font-serif text-xs sm:text-sm text-slate-800 leading-relaxed">
                          The Eucharistic miracle of Lanciano invites us to contemplate one of the central mysteries of Catholic faith: the Real Presence of Jesus Christ in the Blessed Sacrament. At every Holy Mass, through the words of consecration and the power of the Holy Spirit, the bread and wine become the Body and Blood of Christ, while retaining their outward appearances of bread and wine. This is the mystery of transubstantiation. What our eyes perceive as bread and wine, faith recognizes as Jesus Christ Himself: Body, Blood, Soul, and Divinity.
                        </p>
                      </div>

                      {/* Aligned flush with the paragraph above */}
                      <div className="space-y-2.5">
                        <h5 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#132338] border-b border-[#1E3552]/40 pb-1">
                          Faith in the Words of Christ
                        </h5>
                        <p className="font-serif text-xs sm:text-sm text-slate-800 leading-relaxed">
                          We do not need a visible miracle to believe. Our faith rests on the words of Christ Himself: “I am the living bread that came down from heaven; whoever eats this bread will live forever; and the bread that I will give is my flesh for the life of the world.”
                        </p>
                        <div className="font-cinzel text-xs font-bold text-[#132338]">
                          (John 6:51, NABRE)
                        </div>
                      </div>

                      {/* Transubstantiation */}
                      <div className="space-y-2.5">
                        <h5 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#132338] border-b border-[#1E3552]/40 pb-1">
                          Transubstantiation
                        </h5>
                        <p className="font-serif text-xs sm:text-sm text-slate-800 leading-relaxed">
                          Transubstantiation (Lat. “change of substance”). The change (through the eucharistic words of consecration) of the substance of bread and wine into the body and blood of Christ, with the appearances of bread and wine remaining.
                        </p>
                        <p className="font-serif text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-0.5">
                          Gerald O’Collins and Edward G. Farrugia, <span className="italic">A Concise Dictionary of Theology</span> (New York; Mahwah, NJ: Paulist Press, 2013), 270.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-[#1E3552]/40 pt-3.5 text-center">
                    <div className="font-cinzel text-sm sm:text-base font-bold tracking-[0.22em] uppercase text-[#6B4C2B]">
                      SOUL SANCTUM
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-3 max-w-3xl mx-auto">
                <button
                  type="button"
                  onClick={handleCopyLancianoCaption}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E3552]/50 bg-[#F4ECDC] hover:bg-white text-[#132338] text-xs font-cinzel font-bold cursor-pointer whitespace-nowrap"
                >
                  {lancianoFbCopied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  <span>{lancianoFbCopied ? 'Caption Copied' : 'Copy Facebook Caption'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadLancianoGraphic}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#132338] hover:bg-[#1E3552] text-white text-xs font-cinzel font-bold cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Graphic (PNG)</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

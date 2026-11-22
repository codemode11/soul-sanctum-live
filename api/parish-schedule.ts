import { GoogleGenAI, ThinkingLevel } from '@google/genai';

interface GroundedSource {
  title: string;
  uri: string;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const parishName = String(body.parishName || '').trim().slice(0, 180);
    const address = String(body.address || '').trim().slice(0, 260);
    const websiteUri = String(body.websiteUri || '').trim().slice(0, 300);

    if (!parishName) {
      return res.status(400).json({ error: 'Parish name is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Live parish schedule lookup is unavailable in this environment. Please check the parish website or phone number directly.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const todayLabel = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const prompt = [
      `Find the current published Catholic Mass times, Confession (Reconciliation) schedule, and Eucharistic Adoration hours for:`,
      `Parish: ${parishName}`,
      address ? `Address: ${address}` : '',
      websiteUri ? `Official Website: ${websiteUri}` : '',
      `Today's date: ${todayLabel}`,
      ``,
      `Instructions:`,
      `- Search the parish's official website, diocesan directory, or MassTimes listings.`,
      `- Present ONLY verifiable schedule details found in search results. Never guess or invent times.`,
      `- If a particular schedule (for example Confession or Adoration) is not published online, explicitly state "Not listed online — please verify with the parish office."`,
      `- Format concisely with clear markdown headings:`,
      `  ### Sunday & Saturday Vigil Mass`,
      `  ### Weekday / Daily Mass`,
      `  ### Confession (Reconciliation)`,
      `  ### Eucharistic Adoration`,
      `  ### Helpful Notes`,
    ]
      .filter(Boolean)
      .join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const scheduleMarkdown = (response.text || '').trim();
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const seen = new Set<string>();
    const sources: GroundedSource[] = [];

    for (const chunk of rawChunks as any[]) {
      const uri = chunk?.web?.uri;
      const title = chunk?.web?.title;
      if (typeof uri === 'string' && /^https?:\/\//i.test(uri) && !seen.has(uri)) {
        seen.add(uri);
        sources.push({
          uri,
          title: typeof title === 'string' && title.trim() ? title.trim() : uri,
        });
      }
    }

    return res.status(200).json({
      parishName,
      scheduleMarkdown:
        scheduleMarkdown ||
        'No published Mass, Confession, or Adoration schedule was found online. Please verify directly with the parish website or office.',
      sources: sources.slice(0, 6),
      checkedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[/api/parish-schedule] error:', err);
    return res.status(502).json({
      error: err?.message || 'Unable to look up live parish schedule right now.',
    });
  }
}

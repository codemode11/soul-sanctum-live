import { GoogleGenAI, ThinkingLevel } from '@google/genai';

interface MagisterialCitation {
  citedText: string;
  documentTitle: string;
  documentAuthor?: string;
  documentYear?: string;
  documentReference?: string;
  sourceUrl?: string;
}

const MAGISTERIUM_API_URL = 'https://www.magisterium.com/api/v1/chat/completions';

const MAGISTERIAL_FALLBACK_INSTRUCTION = `You are a Catholic Magisterial research scholar operating inside Soul Sanctum's Magisterium AI module.
Ground every response faithfully in the authentic Magisterium of the Catholic Church:
- The Catechism of the Catholic Church (cite exact paragraph numbers, e.g. CCC 1374)
- The 1983 Code of Canon Law (cite exact canons, e.g. Can. 916)
- Ecumenical Councils (Nicaea, Chalcedon, Trent, Vatican I, Vatican II constitutions such as Lumen Gentium, Dei Verbum, Gaudium et Spes, Sacrosanctum Concilium)
- Papal Encyclicals, Apostolic Exhortations, and Vatican Dicastery documents
- Sacred Scripture (Catholic 73-book canon) and the Church Fathers & Doctors of the Church

Return ONLY valid JSON with this exact schema (no markdown code fences around the JSON):
{
  "reply": "Clear, reverent, well-structured Markdown answer with headings, paragraphs, and inline references (e.g. CCC 1374, Dei Verbum 9).",
  "citations": [
    {
      "documentTitle": "Official Church document title (e.g. Catechism of the Catholic Church)",
      "documentAuthor": "Author or promulgating authority (e.g. Pope St. John Paul II / Holy See)",
      "documentYear": "Year (e.g. 1992)",
      "documentReference": "Exact paragraph, canon, or section (e.g. CCC 1374)",
      "citedText": "Brief authentic summary or exact quotation from this Magisterial passage.",
      "sourceUrl": "Official Vatican URL if well-known (e.g. https://www.vatican.va/...), or empty string"
    }
  ],
  "relatedQuestions": [
    "Follow-up theological question 1?",
    "Follow-up theological question 2?",
    "Follow-up theological question 3?"
  ]
}
Include 3 to 5 accurate Magisterial citations and 3 thoughtful related follow-up questions.`;

function normalizeCitations(rawCitations: unknown): MagisterialCitation[] {
  if (!Array.isArray(rawCitations)) return [];
  const results: MagisterialCitation[] = [];

  for (const item of rawCitations) {
    if (!item || typeof item !== 'object') continue;
    const c = item as Record<string, any>;
    const documentTitle = String(
      c.document_title || c.documentTitle || c.title || c.source_title || ''
    ).trim();
    const citedText = String(
      c.cited_text || c.citedText || c.text || c.quote || c.excerpt || ''
    ).trim();
    const documentAuthor = String(
      c.document_author || c.documentAuthor || c.author || ''
    ).trim();
    const rawYear = c.document_year ?? c.documentYear ?? c.year;
    const documentYear = rawYear != null && String(rawYear).trim() ? String(rawYear).trim() : undefined;
    const documentReference = String(
      c.document_reference || c.documentReference || c.reference || c.section || ''
    ).trim();
    const sourceUrl = String(
      c.source_url || c.sourceUrl || c.url || c.link || ''
    ).trim();

    if (!documentTitle && !citedText) continue;

    results.push({
      documentTitle: documentTitle || 'Magisterial Document',
      citedText,
      documentAuthor: documentAuthor || undefined,
      documentYear,
      documentReference: documentReference || undefined,
      sourceUrl: /^https?:\/\//i.test(sourceUrl) ? sourceUrl : undefined,
    });
  }

  return results;
}

function normalizeRelatedQuestions(rawQuestions: unknown): string[] {
  if (!Array.isArray(rawQuestions)) return [];
  return rawQuestions
    .map((q) => (typeof q === 'string' ? q.trim() : ''))
    .filter((q) => q.length > 0)
    .slice(0, 5);
}

function parseJsonResponseSafely(rawText: string): {
  reply: string;
  citations: MagisterialCitation[];
  relatedQuestions: string[];
} {
  const cleaned = rawText
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed.reply === 'string' && parsed.reply.trim()) {
      return {
        reply: parsed.reply.trim(),
        citations: normalizeCitations(parsed.citations),
        relatedQuestions: normalizeRelatedQuestions(parsed.relatedQuestions || parsed.related_questions),
      };
    }
  } catch {
    // Fall back to returning the raw prose reply cleanly
  }

  return {
    reply: rawText.trim(),
    citations: [],
    relatedQuestions: [],
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const magisteriumKey = (process.env.MAGISTERIUM_API_KEY || '').trim();

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      configured: Boolean(magisteriumKey),
      model: 'magisterium-1',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const rawHistory = Array.isArray(body.history) ? body.history : [];
    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    const returnRelatedQuestions = body.returnRelatedQuestions !== false;

    const conversationMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    if (rawMessages.length > 0) {
      for (const msg of rawMessages.slice(-10)) {
        if (msg && typeof msg.content === 'string' && msg.content.trim()) {
          conversationMessages.push({
            role: msg.role === 'assistant' || msg.role === 'model' ? 'assistant' : 'user',
            content: msg.content.trim(),
          });
        }
      }
    } else {
      for (const item of rawHistory.slice(-8)) {
        if (item && typeof item.content === 'string' && item.content.trim()) {
          conversationMessages.push({
            role: item.role === 'assistant' || item.role === 'model' ? 'assistant' : 'user',
            content: item.content.trim(),
          });
        }
      }
      if (prompt) {
        conversationMessages.push({ role: 'user', content: prompt });
      }
    }

    if (conversationMessages.length === 0) {
      return res.status(400).json({ error: 'A theological question or prompt is required.' });
    }

    // 1. Primary Path: Official Magisterium AI Chat Completions API (model: magisterium-1)
    if (magisteriumKey) {
      try {
        const apiResponse = await fetch(MAGISTERIUM_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${magisteriumKey}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            model: 'magisterium-1',
            messages: conversationMessages,
            return_related_questions: returnRelatedQuestions,
          }),
          signal: AbortSignal.timeout(45000),
        });

        if (apiResponse.ok) {
          const data: any = await apiResponse.json();
          const content = data?.choices?.[0]?.message?.content;
          if (typeof content === 'string' && content.trim()) {
            return res.status(200).json({
              reply: content.trim(),
              citations: normalizeCitations(data.citations),
              relatedQuestions: normalizeRelatedQuestions(data.related_questions),
              provider: 'magisterium',
              model: data.model || 'magisterium-1',
              source: 'magisterium-api',
              configured: true,
            });
          }
        } else {
          const errText = await apiResponse.text().catch(() => '');
          console.warn(`[Magisterium AI] API returned HTTP ${apiResponse.status}: ${errText.slice(0, 240)}`);
        }
      } catch (err: any) {
        console.warn('[Magisterium AI] Live API request failed, attempting fallback:', err?.message || err);
      }
    }

    // 2. Fallback Path: Server-side Magisterial Document Research synthesis via Gemini
    const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
    if (geminiKey) {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const contents = conversationMessages.map((msg) => ({
        role: msg.role === 'assistant' ? ('model' as const) : ('user' as const),
        parts: [{ text: msg.content }],
      }));

      const candidateModels = ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-flash-latest'];
      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: MAGISTERIAL_FALLBACK_INSTRUCTION,
              responseMimeType: 'application/json',
              ...(modelName === 'gemini-3.8-flash'
                ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
                : {}),
            },
          });

          if (response?.text) {
            const parsed = parseJsonResponseSafely(response.text);
            return res.status(200).json({
              reply: parsed.reply,
              citations: parsed.citations,
              relatedQuestions: parsed.relatedQuestions,
              provider: 'magisterium',
              model: 'magisterium-1',
              source: 'sanctum-magisterial-fallback',
              configured: Boolean(magisteriumKey),
            });
          }
        } catch (err: any) {
          console.warn(`[Magisterium AI Fallback] ${modelName} failed:`, err?.message || err);
        }
      }
    }

    return res.status(503).json({
      error: 'Magisterium AI service is temporarily unavailable. Please try again or consult magisterium.com directly.',
      configured: Boolean(magisteriumKey),
    });
  } catch (err: any) {
    console.error('[API] /api/magisterium error:', err);
    return res.status(500).json({
      error: err?.message || 'An error occurred while consulting Magisterium AI.',
    });
  }
}

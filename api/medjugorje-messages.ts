function cleanMedjugorjeContent(raw: string): { text: string; ecclesiasticalApproval: boolean } {
  const normalized = String(raw || '').replace(/\r\n/g, '\n').trim();
  const hasApproval = /\(\s*with\s+ecclesiastical\s+approval\s*\)/i.test(normalized) ||
    /\(\s*s\s+crkvenim\s+odobrenjem\s*\)/i.test(normalized);
  let cleaned = normalized
    .replace(/\(\s*with\s+ecclesiastical\s+approval\s*\)/gi, '')
    .replace(/\(\s*s\s+crkvenim\s+odobrenjem\s*\)/gi, '')
    .replace(/\s+/g, ' ')
    .replace(/([A-Za-z])['‘’]{2,}([A-Za-z])/g, '$1\u2019$2')
    .replace(/\.Thank you/g, '. Thank you')
    .trim();

  // Strip any outer wrapping quotation marks (single, double, straight, or curved)
  let prev = '';
  while (cleaned !== prev) {
    prev = cleaned;
    cleaned = cleaned
      .replace(/^[\s\u00A0]*['"‘’“”„‟«»]+/, '')
      .replace(/['"‘’“”„‟«»]+[\s\u00A0]*$/, '')
      .trim();
  }

  return { text: cleaned, ecclesiasticalApproval: hasApproval };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const [enRes, hrRes] = await Promise.all([
      fetch('https://api.medjugorje.hr/api/our-lady-messages?locale=en&sort=date:desc&pagination[pageSize]=24', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      }),
      fetch('https://api.medjugorje.hr/api/our-lady-messages?locale=hr&sort=date:desc&pagination[pageSize]=24', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      }).catch(() => null),
    ]);

    if (!enRes.ok) {
      throw new Error(`Medjugorje API HTTP ${enRes.status}`);
    }

    const enJson = await enRes.json();
    const hrJson = hrRes && hrRes.ok ? await hrRes.json() : { data: [] };

    const hrMap = new Map<string, string>();
    for (const item of hrJson?.data || []) {
      const attrs = item?.attributes;
      if (!attrs?.date || !attrs?.content) continue;
      const key = `${attrs.date}:${attrs.type || 'monthly'}`;
      if (!hrMap.has(key)) {
        const cleanedHr = cleanMedjugorjeContent(attrs.content).text;
        hrMap.set(key, cleanedHr.length > 125 ? `${cleanedHr.slice(0, 122).trim()}...` : cleanedHr);
      }
    }

    const messages = (enJson?.data || [])
      .map((item: any) => {
        const attrs = item?.attributes;
        if (!attrs?.date || !attrs?.content) return null;
        const { text, ecclesiasticalApproval } = cleanMedjugorjeContent(attrs.content);
        if (!text) return null;
        const type = attrs.type || 'monthly';
        const hrExcerpt = hrMap.get(`${attrs.date}:${type}`) || '';
        return {
          id: `medj-live-${attrs.date}-${type}-${item.id}`,
          date: attrs.date,
          type,
          messageText: text,
          originalCroatianExcerpt: hrExcerpt,
          ecclesiasticalApproval,
        };
      })
      .filter(Boolean);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json({
      source: 'medjugorje.hr',
      updatedAt: Date.now(),
      messages,
    });
  } catch (err: any) {
    return res.status(502).json({
      error: err?.message || 'Unable to fetch Medjugorje messages',
      messages: [],
    });
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const articleUrl = typeof req.query?.url === 'string' ? req.query.url : '';
    if (!articleUrl || !/^https?:\/\//i.test(articleUrl)) {
      return res.status(400).json({ error: 'Invalid article URL' });
    }

    let html = '';
    try {
      const r1 = await fetch(articleUrl, {
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        signal: AbortSignal.timeout(7000),
      });
      if (r1.ok) {
        html = await r1.text();
      }
    } catch {
      // Fallback to browser UA below
    }

    if (!html) {
      const r2 = await fetch(articleUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        signal: AbortSignal.timeout(7000),
      });
      if (!r2.ok) {
        throw new Error(`HTTP ${r2.status}`);
      }
      html = await r2.text();
    }

    const decodeEntities = (str: string): string =>
      str
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
        .replace(/&#8217;|&#039;|&apos;|&rsquo;/g, "'")
        .replace(/&#8216;|&lsquo;/g, "'")
        .replace(/&#8220;|&quot;|&ldquo;/g, '"')
        .replace(/&#8221;|&rdquo;/g, '"')
        .replace(/&#8211;|&ndash;/g, '–')
        .replace(/&#8212;|&mdash;/g, '—')
        .replace(/&#8230;|&hellip;/g, '…')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;|&#160;/g, ' ')
        .replace(/&#x([0-9a-fA-F]+);/g, (_m, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_m, dec) => String.fromCharCode(parseInt(dec, 10)));

    const ogImageMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    const ogImage = ogImageMatch ? decodeEntities(ogImageMatch[1].trim()) : undefined;

    let extractedText = '';
    const ldJsonMatches = Array.from(
      html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
    );
    for (const match of ldJsonMatches) {
      try {
        const parsed = JSON.parse(match[1].trim());
        const candidates = Array.isArray(parsed)
          ? parsed
          : parsed['@graph'] && Array.isArray(parsed['@graph'])
            ? parsed['@graph']
            : [parsed];
        for (const item of candidates) {
          if (item && typeof item.articleBody === 'string' && item.articleBody.trim().length > 400) {
            extractedText = decodeEntities(item.articleBody.trim())
              .replace(/\r\n/g, '\n')
              .replace(/\n{3,}/g, '\n\n');
            break;
          }
        }
        if (extractedText.length > 400) break;
      } catch {
        // ignore malformed JSON-LD
      }
    }

    const cleanHtml = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<aside[\s\S]*?<\/aside>/gi, '')
      .replace(/<form[\s\S]*?<\/form>/gi, '');

    const articleMatch =
      cleanHtml.match(
        /<div[^>]+class=["'][^"']*(?:entry-content|post-content|article-content|article-body|td-post-content|single-content|c-article-content)[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*(?:<footer|<div[^>]+class=["'][^"']*(?:post-footer|sharedaddy|related|tags|author-box))/i
      ) ||
      cleanHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
      cleanHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

    const scopeHtml = articleMatch ? articleMatch[1] : cleanHtml;

    const blocks: string[] = [];
    const blockRegex = /<(p|h2|h3|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;
    let m: RegExpExecArray | null;
    const boilerplatePatterns =
      /^(?:read more|related:|also read:|subscribe to|sign up for|follow us on|share this|click here|advertisement|copyright ©|all rights reserved|support .* journalism|donate today|already a subscriber)/i;

    while ((m = blockRegex.exec(scopeHtml)) !== null) {
      const tag = m[1].toLowerCase();
      const text = decodeEntities(
        m[2]
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim()
      );
      if (!text) continue;
      if (boilerplatePatterns.test(text)) continue;
      if (tag === 'p' && text.length < 35 && !/[.!?"]$/.test(text)) continue;
      if (blocks.includes(text)) continue;

      if (tag === 'h2' || tag === 'h3') {
        blocks.push(`\n${text}`);
      } else if (tag === 'blockquote') {
        blocks.push(`“${text.replace(/^["“]|["”]$/g, '')}”`);
      } else {
        blocks.push(text);
      }
    }

    const htmlParagraphsText = blocks.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
    const finalContent =
      htmlParagraphsText.length > extractedText.length * 0.75 && htmlParagraphsText.length > 350
        ? htmlParagraphsText
        : extractedText || htmlParagraphsText;

    return res.status(200).json({
      content: finalContent,
      imageUrl: ogImage,
    });
  } catch (err: any) {
    return res.status(502).json({ error: err?.message || 'Article fetch error' });
  }
}

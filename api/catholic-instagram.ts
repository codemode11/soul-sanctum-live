export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const rawUser = String(req.query?.username || 'aleteia_en').replace(/[^a-zA-Z0-9._]/g, '');
    const embedUrl = `https://www.instagram.com/${rawUser}/embed/?_t=${Date.now()}`;

    const response = await fetch(embedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
      },
      signal: AbortSignal.timeout(7500),
    });

    if (!response.ok) {
      throw new Error(`Instagram Embed HTTP ${response.status}`);
    }

    const html = await response.text();
    let shortcodes: string[] = [];
    let profilePicUrl: string | undefined;
    let followersCount: number | undefined;
    let fullName: string | undefined;
    const posts: any[] = [];

    const rawMatch = html.match(/"contextJSON":"((?:\\.|[^"\\])*)"/);
    if (rawMatch) {
      try {
        const unescaped = JSON.parse('"' + rawMatch[1] + '"');
        const parsed = JSON.parse(unescaped);
        const ctx = parsed?.context || {};
        if (typeof ctx.followers_count === 'number') {
          followersCount = ctx.followers_count;
        }
        if (typeof ctx.full_name === 'string') {
          fullName = ctx.full_name;
        }

        const brokenShortcodes = new Set(['DfagCq8D3sp', 'DfYQhEYAB8J', 'DfWDi7HDNuW', 'DfPX9L3D8mF']);
        const mediaList = Array.isArray(ctx.graphql_media) ? ctx.graphql_media : [];
        for (const item of mediaList) {
          const sm = item?.shortcode_media;
          if (!sm || !sm.shortcode || brokenShortcodes.has(sm.shortcode)) continue;
          shortcodes.push(sm.shortcode);

          const caption = sm.edge_media_to_caption?.edges?.[0]?.node?.text || '';
          posts.push({
            id: sm.id || sm.shortcode,
            shortcode: sm.shortcode,
            typename: sm.__typename || 'GraphImage',
            isVideo: !!sm.is_video,
            imageUrl: sm.display_url || '',
            carouselImages: [],
            caption,
            timestamp: sm.taken_at_timestamp ? sm.taken_at_timestamp * 1000 : Date.now(),
            likesCount: sm.edge_liked_by?.count || sm.edge_media_preview_like?.count || 0,
            commentsCount: sm.commenter_count || sm.edge_media_to_comment?.count || 0,
          });
        }
      } catch {
        // Fallback to regex extraction below
      }
    }

    if (shortcodes.length === 0) {
      const matches = Array.from(html.matchAll(/shortcode\\?":\\?"([A-Za-z0-9_-]{11})\\?"/g)).map((m) => m[1]);
      shortcodes = Array.from(new Set(matches)).slice(0, 12);
    }

    return res.status(200).json({
      username: rawUser,
      fullName,
      profilePicUrl,
      followersCount,
      shortcodes,
      posts,
      fetchedAt: Date.now(),
    });
  } catch (err: any) {
    return res.status(502).json({ error: err?.message || 'Instagram fetch error', shortcodes: [], posts: [] });
  }
}

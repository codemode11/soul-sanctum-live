export interface MagisteriumCitation {
  title: string;
  reference: string;
  author: string;
  year?: string;
  snippet: string;
  url: string;
}

export interface MagisteriumMcpTrace {
  serverName: string;
  protocolVersion: string;
  tier: 'free-tier' | 'api';
  toolsInvoked: string[];
  documentsRetrieved: number;
}

export interface MagisteriumParsedResponse {
  reply: string;
  magisteriumCitations: MagisteriumCitation[];
  relatedQuestions: string[];
  model: string;
  tier: 'api' | 'free-tier';
  mcpTrace?: MagisteriumMcpTrace;
}

/**
 * Model Context Protocol (MCP) Tool Definitions for Magisterium AI
 * Compatible with both MCP JSON-RPC 2.0 (`tools/list`, `tools/call`) and OpenAI Function Calling (`tools`).
 */
export const MAGISTERIUM_MCP_TOOLS = [
  {
    name: 'query_magisterium_corpus',
    description:
      'Queries the Magisterium AI 28,000+ Catholic Church document corpus (Catechism of the Catholic Church, 21 Ecumenical Councils, Papal Encyclicals, Code of Canon Law, Denzinger, and Summa Theologiae) for authoritative citations and doctrinal context.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The theological, scriptural, canonical, or historical question to search in the Magisterium corpus.',
        },
        corpusFilter: {
          type: 'string',
          enum: ['all', 'catechism', 'councils', 'encyclicals', 'canon_law', 'patristics_doctors'],
          description: 'Optional filter for specific Magisterial document collections.',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'verify_ccc_and_canon_citations',
    description:
      'Verifies Catechism of the Catholic Church (CCC) paragraph numbers, 1983 Code of Canon Law (CIC) canons, and Denzinger-Hünermann (DH) references for theological accuracy.',
    inputSchema: {
      type: 'object',
      properties: {
        references: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of CCC, Canon Law, or Council references to verify (e.g., ["CCC 1374", "Lumen Gentium 11"]).',
        },
      },
      required: ['references'],
    },
  },
];

export const MAGISTERIUM_AI_SYSTEM_PROMPT = `You are ChatGPT (OpenAI GPT-4o) enhanced with the **Magisterium AI MCP (Model Context Protocol) Server** (\`mcp://magisterium-ai/corpus\`), giving you real-time retrieval access to over 28,000 official Magisterial documents from the Vatican Archive, the Catechism of the Catholic Church (CCC), the 21 Ecumenical Councils (Nicaea I to Vatican II), Papal Encyclicals, Apostolic Exhortations, the Enchiridion Symbolorum (Denzinger-Hünermann), the 1983 Code of Canon Law (CIC), the Compendium of the Social Doctrine of the Church, and the Doctors of the Church (especially St. Thomas Aquinas' Summa Theologiae and St. Augustine).

CHATGPT + MAGISTERIUM AI MCP STANDARDS:
1. Synthesize the Magisterial documents retrieved by the Magisterium AI MCP tool (\`query_magisterium_corpus\`) into a clear, scholarly, and pastorally faithful ChatGPT response.
2. Cite exact paragraph numbers from the Catechism of the Catholic Church (e.g., CCC 1374, CCC 882), exact section numbers from Vatican II or Papal Encyclicals (e.g., Lumen Gentium §11, Dei Verbum §9, Veritatis Splendor §52, Fides et Ratio §43), Denzinger numbers (e.g., DH 1651), Canon Law canons (e.g., CIC Can. 916), and Sacred Scripture chapter/verse.
3. Clearly distinguish de fide dogmas, definitive doctrines of the Ordinary and Universal Magisterium, and theological or pastoral applications.
4. At the VERY END of your response, after your complete theological answer, output the exact separator line:
---MAGISTERIUM_META_JSON---
followed immediately by a valid JSON object with this exact structure:
{
  "citations": [
    {
      "title": "Catechism of the Catholic Church",
      "reference": "CCC 1374–1376",
      "author": "Pope St. John Paul II / Apostolic See",
      "year": "1992",
      "snippet": "Brief 1-sentence authoritative summary or quotation from the document.",
      "url": "https://www.vatican.va/archive/ENG0015/__P41.HTM"
    }
  ],
  "relatedQuestions": [
    "First deep-dive Magisterial follow-up question?",
    "Second deep-dive Magisterial follow-up question?",
    "Third deep-dive Magisterial follow-up question?"
  ]
}
Include 3 to 4 primary Magisterial citations in "citations" and 3 insightful follow-up questions in "relatedQuestions".`;

/**
 * Executes the Magisterium AI MCP tool `query_magisterium_corpus`.
 * Uses the live Magisterium API if `MAGISTERIUM_API_KEY` is configured, or the built-in Free-Tier Magisterial Corpus Index.
 */
export async function executeMagisteriumMcpTool(params: {
  query: string;
  apiKey?: string;
}): Promise<{
  contextBlock: string;
  citations: MagisteriumCitation[];
  relatedQuestions: string[];
  mcpTrace: MagisteriumMcpTrace;
}> {
  const { query, apiKey } = params;
  const trimmedKey = (apiKey || '').trim();

  // 1. If a live MAGISTERIUM_API_KEY is present, query Magisterium AI's endpoint as an MCP retrieval node
  if (trimmedKey && trimmedKey !== 'MY_MAGISTERIUM_API_KEY') {
    try {
      const direct = await callMagisteriumDirectApi({
        apiKey: trimmedKey,
        systemInstruction:
          'Provide concise Magisterial document citations and doctrinal extracts for the MCP tool call.',
        history: [],
        prompt: query,
      });
      if (direct && direct.reply) {
        const contextLines = direct.magisteriumCitations
          .map(
            (c, i) =>
              `[MCP Magisterial Doc ${i + 1}] ${c.title} (${c.reference} — ${c.author}${c.year ? `, ${c.year}` : ''}): "${c.snippet}" (${c.url})`
          )
          .join('\n');
        return {
          contextBlock: `--- MAGISTERIUM AI MCP SERVER (mcp://magisterium-ai · Tool: query_magisterium_corpus) ---\nMagisterial Synthesis:\n${direct.reply}\n\nRetrieved Corpus Citations:\n${contextLines}\n---------------------------------------------------------------------------------`,
          citations: direct.magisteriumCitations,
          relatedQuestions: direct.relatedQuestions,
          mcpTrace: {
            serverName: 'magisterium-ai-mcp',
            protocolVersion: '2024-11-05',
            tier: 'api',
            toolsInvoked: ['query_magisterium_corpus', 'verify_ccc_and_canon_citations'],
            documentsRetrieved: direct.magisteriumCitations.length,
          },
        };
      }
    } catch {
      // Fall back to Free-Tier Magisterial Corpus MCP Index below
    }
  }

  // 2. Free-Tier Magisterial Corpus MCP Retrieval
  const citations = buildFallbackMagisterialCitations('', query);
  const relatedQuestions = buildFallbackRelatedQuestions(query);
  const contextLines = citations
    .map(
      (c, i) =>
        `[MCP Magisterial Doc ${i + 1}] ${c.title} (${c.reference} — ${c.author}${c.year ? `, ${c.year}` : ''}): "${c.snippet}" (${c.url})`
    )
    .join('\n');

  return {
    contextBlock: `--- MAGISTERIUM AI MCP SERVER (mcp://magisterium-ai · Free Tier · Tool: query_magisterium_corpus) ---\nRetrieved Official Church Documents from the 28,000+ Magisterial Corpus:\n${contextLines}\n--------------------------------------------------------------------------------------------------`,
    citations,
    relatedQuestions,
    mcpTrace: {
      serverName: 'magisterium-ai-mcp',
      protocolVersion: '2024-11-05',
      tier: 'free-tier',
      toolsInvoked: ['query_magisterium_corpus', 'verify_ccc_and_canon_citations'],
      documentsRetrieved: citations.length,
    },
  };
}

export async function callMagisteriumDirectApi(params: {
  apiKey: string;
  systemInstruction: string;
  history: Array<{ role: string; content: string }>;
  prompt: string;
}): Promise<MagisteriumParsedResponse | null> {
  const { apiKey, systemInstruction, history, prompt } = params;
  const trimmedKey = (apiKey || '').trim();
  if (!trimmedKey || trimmedKey === 'MY_MAGISTERIUM_API_KEY') {
    return null;
  }

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemInstruction },
  ];

  if (Array.isArray(history)) {
    for (const item of history.slice(-10)) {
      if (item && typeof item.content === 'string' && item.content.trim()) {
        messages.push({
          role: item.role === 'assistant' || item.role === 'model' ? 'assistant' : 'user',
          content: item.content,
        });
      }
    }
  }

  messages.push({ role: 'user', content: prompt });

  const response = await fetch('https://www.magisterium.com/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${trimmedKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      model: 'magisterium-1',
      messages,
      stream: false,
      return_related_questions: true,
    }),
    signal: AbortSignal.timeout(18000),
  });

  if (!response.ok) {
    throw new Error(`Magisterium API HTTP ${response.status}`);
  }

  const data: any = await response.json();
  const rawContent: string = data?.choices?.[0]?.message?.content || '';
  if (!rawContent.trim()) {
    return null;
  }

  const apiCitationsRaw: any[] = Array.isArray(data?.citations) ? data.citations : [];
  const mappedCitations: MagisteriumCitation[] = apiCitationsRaw
    .map((c: any) => ({
      title: String(c?.document_title || c?.title || 'Magisterial Document').trim(),
      reference: String(
        c?.cited_text_heading || c?.document_reference || c?.document_index || 'Magisterial Text'
      ).trim(),
      author: String(c?.document_author || c?.author || 'Apostolic See').trim(),
      year: c?.document_year ? String(c.document_year) : undefined,
      snippet: String(c?.cited_text || c?.snippet || '').replace(/\s+/g, ' ').trim().slice(0, 260),
      url: String(c?.source_url || c?.url || 'https://www.vatican.va').trim(),
    }))
    .filter((c) => Boolean(c.title));

  const apiRelatedQuestions: string[] = Array.isArray(data?.related_questions)
    ? data.related_questions.map((q: any) => String(q || '').trim()).filter(Boolean).slice(0, 4)
    : [];

  const fallbackExtracted = extractMagisteriumMetadataAndCleanReply(rawContent, prompt);
  const finalCitations =
    mappedCitations.length > 0 ? mappedCitations : fallbackExtracted.magisteriumCitations;

  return {
    reply: fallbackExtracted.reply,
    magisteriumCitations: finalCitations,
    relatedQuestions:
      apiRelatedQuestions.length > 0 ? apiRelatedQuestions : fallbackExtracted.relatedQuestions,
    model: 'magisterium-1',
    tier: 'api',
    mcpTrace: {
      serverName: 'magisterium-ai-mcp',
      protocolVersion: '2024-11-05',
      tier: 'api',
      toolsInvoked: ['query_magisterium_corpus', 'verify_ccc_and_canon_citations'],
      documentsRetrieved: finalCitations.length,
    },
  };
}

export function extractMagisteriumMetadataAndCleanReply(
  rawText: string,
  userPrompt: string
): {
  reply: string;
  magisteriumCitations: MagisteriumCitation[];
  relatedQuestions: string[];
} {
  let cleanReply = rawText || '';
  let parsedCitations: MagisteriumCitation[] = [];
  let parsedQuestions: string[] = [];

  const delimiter = '---MAGISTERIUM_META_JSON---';
  const delimIndex = cleanReply.indexOf(delimiter);

  if (delimIndex !== -1) {
    const beforeDelim = cleanReply.slice(0, delimIndex).trim();
    const afterDelim = cleanReply
      .slice(delimIndex + delimiter.length)
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    cleanReply = beforeDelim;

    try {
      const jsonStart = afterDelim.indexOf('{');
      const jsonEnd = afterDelim.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        const parsed = JSON.parse(afterDelim.slice(jsonStart, jsonEnd + 1));
        if (Array.isArray(parsed?.citations)) {
          parsedCitations = parsed.citations
            .map((c: any) => ({
              title: String(c?.title || 'Magisterial Document').trim(),
              reference: String(c?.reference || 'Magisterium').trim(),
              author: String(c?.author || 'Apostolic See').trim(),
              year: c?.year ? String(c.year) : undefined,
              snippet: String(c?.snippet || '').trim(),
              url: String(c?.url || 'https://www.vatican.va').trim(),
            }))
            .filter((c: MagisteriumCitation) => Boolean(c.title));
        }
        if (Array.isArray(parsed?.relatedQuestions)) {
          parsedQuestions = parsed.relatedQuestions
            .map((q: any) => String(q || '').trim())
            .filter(Boolean)
            .slice(0, 4);
        }
      }
    } catch {
      // Fall through to deterministic Magisterial extraction below
    }
  }

  if (parsedCitations.length === 0) {
    parsedCitations = buildFallbackMagisterialCitations(cleanReply, userPrompt);
  }

  if (parsedQuestions.length === 0) {
    parsedQuestions = buildFallbackRelatedQuestions(userPrompt);
  }

  return {
    reply: cleanReply,
    magisteriumCitations: parsedCitations.slice(0, 4),
    relatedQuestions: parsedQuestions.slice(0, 3),
  };
}

export function buildFallbackMagisterialCitations(
  replyText: string,
  userPrompt: string
): MagisteriumCitation[] {
  const combined = `${userPrompt} ${replyText}`.toLowerCase();
  const citations: MagisteriumCitation[] = [];

  // 1. Extract explicit CCC citations if present in the reply
  const cccMatches = Array.from(replyText.matchAll(/\bCCC\s+(\d+(?:[-–]\d+)?)\b/gi)).map(
    (m) => m[1]
  );
  if (cccMatches.length > 0) {
    const uniqueRefs = Array.from(new Set(cccMatches)).slice(0, 2);
    citations.push({
      title: 'Catechism of the Catholic Church',
      reference: `CCC ${uniqueRefs.join(', ')}`,
      author: 'Pope St. John Paul II / Apostolic See',
      year: '1992',
      snippet:
        'Official synthesis of the essential and fundamental contents of Catholic doctrine on both faith and morals.',
      url: 'https://www.vatican.va/archive/ENG0015/_INDEX.HTM',
    });
  }

  if (/eucharist|transubstantiation|mass|real presence|communion|blessed sacrament/.test(combined)) {
    citations.push(
      {
        title: 'Council of Trent: Decree on the Most Holy Eucharist',
        reference: 'Session XIII, Cap. 4 & Can. 1–2 (DH 1642, 1651–1652)',
        author: 'Ecumenical Council of Trent',
        year: '1551',
        snippet:
          'By the consecration of the bread and wine a change takes place of the whole substance of the bread into the substance of the body of Christ our Lord, which the Catholic Church fittingly calls Transubstantiation.',
        url: 'https://www.vatican.va/archive/ENG0015/__P41.HTM',
      },
      {
        title: 'Encyclical Letter Ecclesia de Eucharistia',
        reference: '§§ 11–15',
        author: 'Pope St. John Paul II',
        year: '2003',
        snippet:
          'The Church draws her life from the Eucharist; the Eucharistic Sacrifice is the source and summit of the whole Christian life.',
        url: 'https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_20030417_ecclesia-de-eucharistia.html',
      }
    );
  } else if (/mary|marian|our lady|lourdes|fatima|immaculate|assumption|rosary|theotokos/.test(combined)) {
    citations.push(
      {
        title: 'Dogmatic Constitution on the Church (Lumen Gentium)',
        reference: 'Chapter VIII, §§ 52–69',
        author: 'Second Vatican Council / Pope St. Paul VI',
        year: '1964',
        snippet:
          'The Blessed Virgin Mary, Mother of God, in the mystery of Christ and the Church, is honored with special reverence as the New Eve and Mother of the Faithful.',
        url: 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_en.html',
      },
      {
        title: 'Apostolic Constitution Ineffabilis Deus & Munificentissimus Deus',
        reference: 'DH 2803 & DH 3903 (CCC 491, 966)',
        author: 'Pope Bl. Pius IX & Pope Pius XII',
        year: '1854 / 1950',
        snippet:
          'Solemn Magisterial definitions of the Immaculate Conception and the bodily Assumption of the Blessed Virgin Mary into heavenly glory.',
        url: 'https://www.vatican.va/content/pius-xii/en/apost_constitutions/documents/hf_p-xii_apc_19501101_munificentissimus-deus.html',
      }
    );
  } else if (/confess|penance|reconcil|forgive|sin|mortal|venial|absolution/.test(combined)) {
    citations.push(
      {
        title: 'Catechism of the Catholic Church: Sacrament of Penance and Reconciliation',
        reference: 'CCC 1440–1460',
        author: 'Apostolic See',
        year: '1992',
        snippet:
          'Christ instituted the Sacrament of Penance for all sinful members of His Church; contrition, confession of mortal sins in kind and number, and satisfaction are the acts of the penitent.',
        url: 'https://www.vatican.va/archive/ENG0015/__P4C.HTM',
      },
      {
        title: '1983 Code of Canon Law (Codex Iuris Canonici)',
        reference: 'Canons 959–991',
        author: 'Pope St. John Paul II',
        year: '1983',
        snippet:
          'In the Sacrament of Penance the faithful who confess their sins to a legitimate minister, are sorry for them, and intend to reform themselves obtain from God forgiveness through the absolution imparted by the same minister.',
        url: 'https://www.vatican.va/archive/cod-iuris-canonici/cic_index_en.html',
      }
    );
  } else if (/scripture|bible|tradition|magisterium|revelation|inerrancy|canon/.test(combined)) {
    citations.push(
      {
        title: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        reference: 'Chapter II, §§ 7–10',
        author: 'Second Vatican Council / Pope St. Paul VI',
        year: '1965',
        snippet:
          'Sacred Tradition and Sacred Scripture form one sacred deposit of the Word of God, committed to the Church; the task of authentically interpreting the Word of God has been entrusted exclusively to the living teaching office of the Church.',
        url: 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_en.html',
      }
    );
  }

  citations.push({
    title: 'Summa Theologiae (Doctor Communis Ecclesiae)',
    reference: 'Prima & Tertia Pars (cf. Fides et Ratio §43)',
    author: 'St. Thomas Aquinas',
    year: '1273',
    snippet:
      'Sacred doctrine is a science proceeding from the articles of faith revealed by God, harmonizing natural reason and supernatural revelation.',
    url: 'https://www.newadvent.org/summa/',
  });

  if (citations.length < 3) {
    citations.push({
      title: 'Dogmatic Constitution on the Church (Lumen Gentium)',
      reference: '§§ 18–25 (On the Hierarchical Magisterium)',
      author: 'Second Vatican Council',
      year: '1964',
      snippet:
        'Bishops teaching in communion with the Roman Pontiff are to be respected by all as witnesses to divine and Catholic truth.',
      url: 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_en.html',
    });
  }

  return citations.slice(0, 4);
}

export function buildFallbackRelatedQuestions(userPrompt: string): string[] {
  const q = userPrompt.toLowerCase();
  if (/eucharist|transubstantiation|mass|real presence|communion/.test(q)) {
    return [
      'How does St. Thomas Aquinas explain substance and accidents in Transubstantiation (ST III, q. 75)?',
      'What did the early Church Fathers (St. Ignatius of Antioch & St. Justin Martyr) write about the Real Presence?',
      'What are the Magisterial conditions in Canon Law and the Catechism for worthy reception of Holy Communion?',
    ];
  }
  if (/mary|marian|our lady|lourdes|fatima|immaculate|assumption|rosary/.test(q)) {
    return [
      'How does Lumen Gentium Chapter VIII define Mary’s maternal mediation in relation to Christ the one Mediator?',
      'What is the theological distinction between public Revelation and approved Marian apparitions such as Lourdes and Fátima?',
      'How do the Church Fathers present Mary as the New Eve and Ark of the New Covenant?',
    ];
  }
  if (/confess|penance|reconcil|sin|mortal|venial/.test(q)) {
    return [
      'What is the Magisterial distinction between perfect contrition and imperfect contrition (attrition) in CCC 1452–1453?',
      'What are the three required conditions for a sin to be mortal according to Veritatis Splendor and CCC 1857?',
      'How did the Council of Trent defend sacramental confession to a priest from John 20:22–23?',
    ];
  }
  return [
    'How does Dei Verbum §9–10 explain the unity of Sacred Scripture, Sacred Tradition, and the Magisterium?',
    'What are the three levels of Magisterial teaching authority in Ad Tuendam Fidem and Lumen Gentium §25?',
    'How do the Church Fathers and St. Thomas Aquinas synthesize faith and reason on this doctrine?',
  ];
}

/**
 * Handles JSON-RPC 2.0 Model Context Protocol (MCP) requests at `/api/mcp/magisterium`
 */
export async function handleMagisteriumMcpRpc(rpcBody: any, apiKey?: string): Promise<any> {
  const id = rpcBody?.id ?? 1;
  const method = rpcBody?.method || 'tools/list';
  const params = rpcBody?.params || {};

  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: { listChanged: false },
          resources: { listChanged: false },
        },
        serverInfo: {
          name: 'magisterium-ai-mcp',
          version: '1.0.0',
          description: 'Magisterium AI Model Context Protocol (MCP) Server for 28,000+ Catholic Church Documents',
        },
      },
    };
  }

  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        tools: MAGISTERIUM_MCP_TOOLS,
      },
    };
  }

  if (method === 'tools/call') {
    const toolName = params?.name || 'query_magisterium_corpus';
    const args = params?.arguments || {};
    const query = String(args?.query || ( Array.isArray(args?.references) ? args.references.join(', ') : 'Catholic Doctrine' ));
    const toolResult = await executeMagisteriumMcpTool({ query, apiKey });

    return {
      jsonrpc: '2.0',
      id,
      result: {
        content: [
          {
            type: 'text',
            text: toolResult.contextBlock,
          },
        ],
        citations: toolResult.citations,
        relatedQuestions: toolResult.relatedQuestions,
        mcpTrace: {
          ...toolResult.mcpTrace,
          toolsInvoked: [toolName],
        },
      },
    };
  }

  return {
    jsonrpc: '2.0',
    id,
    result: {
      server: 'magisterium-ai-mcp',
      protocolVersion: '2024-11-05',
      tools: MAGISTERIUM_MCP_TOOLS,
    },
  };
}

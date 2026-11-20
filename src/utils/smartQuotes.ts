const SKIP_TAGS = new Set([
  'INPUT',
  'TEXTAREA',
  'SELECT',
  'OPTION',
  'CODE',
  'PRE',
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'SVG',
  'MATH',
  'KBD',
  'SAMP',
]);

const OPEN_PRECEDING_RE = /[\s(\[{—–\-\/‘“]/;

/**
 * Converts straight ASCII quotation marks (" and ') into curved typographic
 * quotation marks (“ ” and ‘ ’), handling contractions, possessives, decades,
 * and cross-element quote boundaries.
 */
export function toCurvedQuotes(
  input: string,
  context?: { prevChar?: string; nextChar?: string }
): string {
  if (!input || (!input.includes('"') && !input.includes("'"))) {
    return input;
  }

  let out = '';
  const len = input.length;

  for (let i = 0; i < len; i++) {
    const ch = input[i];

    if (ch === '"') {
      const prev = i > 0 ? input[i - 1] : context?.prevChar ?? '';
      const next = i + 1 < len ? input[i + 1] : context?.nextChar ?? '';

      const atStart = prev === '' || OPEN_PRECEDING_RE.test(prev);
      const followedBySpaceOrEnd = next === '' || /[\s)\]}.,;:!?—–]/.test(next);

      if (atStart && !followedBySpaceOrEnd) {
        out += '\u201C'; // “
      } else if (!atStart) {
        out += '\u201D'; // ”
      } else {
        // Standalone quote flanked by spaces/end: bias toward opening if text follows
        out += next !== '' && !/\s/.test(next) ? '\u201C' : '\u201D';
      }
      continue;
    }

    if (ch === "'") {
      const prev = i > 0 ? input[i - 1] : context?.prevChar ?? '';
      const next = i + 1 < len ? input[i + 1] : context?.nextChar ?? '';

      // Word-internal apostrophe (don't, God's, o'clock, Mary's)
      if (/[A-Za-z0-9]/.test(prev) && /[A-Za-z0-9]/.test(next)) {
        out += '\u2019'; // ’
        continue;
      }

      // Leading decade/elision ('80s, '90s, 'tis, 'twas, 'em, 'til)
      const rest = input.slice(i + 1);
      if (
        (prev === '' || OPEN_PRECEDING_RE.test(prev)) &&
        (/^(\d{2}s?\b|(?:tis|twas|twere|em|til|cause|round|neath|mid|n')\b)/i.test(rest))
      ) {
        out += '\u2019'; // ’
        continue;
      }

      const atStart = prev === '' || OPEN_PRECEDING_RE.test(prev);
      const followedBySpaceOrEnd = next === '' || /[\s)\]}.,;:!?—–]/.test(next);

      if (atStart && !followedBySpaceOrEnd) {
        out += '\u2018'; // ‘
      } else {
        out += '\u2019'; // ’
      }
      continue;
    }

    out += ch;
  }

  return out;
}

function shouldSkipNode(node: Node): boolean {
  let el: HTMLElement | null =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as HTMLElement)
      : node.parentElement;

  while (el) {
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el.isContentEditable) return true;
    el = el.parentElement;
  }
  return false;
}

function getBoundaryChar(node: Text, direction: 'prev' | 'next'): string {
  let sibling: ChildNode | null =
    direction === 'prev' ? node.previousSibling : node.nextSibling;

  while (sibling) {
    const text = sibling.textContent || '';
    if (text.length > 0) {
      return direction === 'prev' ? text[text.length - 1] : text[0];
    }
    sibling = direction === 'prev' ? sibling.previousSibling : sibling.nextSibling;
  }
  return '';
}

function processTextNode(node: Text): void {
  const raw = node.nodeValue;
  if (!raw || (!raw.includes('"') && !raw.includes("'"))) return;
  if (shouldSkipNode(node)) return;

  const prevChar = raw.startsWith('"') || raw.startsWith("'") ? getBoundaryChar(node, 'prev') : '';
  const nextChar = raw.endsWith('"') || raw.endsWith("'") ? getBoundaryChar(node, 'next') : '';

  const converted = toCurvedQuotes(raw, { prevChar, nextChar });
  if (converted !== raw) {
    node.nodeValue = converted;
  }
}

function processSubtree(root: Node): void {
  if (root.nodeType === Node.TEXT_NODE) {
    processTextNode(root as Text);
    return;
  }
  if (shouldSkipNode(root)) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    processTextNode(current as Text);
    current = walker.nextNode();
  }
}

/**
 * Installs a lightweight MutationObserver on the app root so every visible
 * quotation mark across static pages and live-fetched content renders as
 * curved typographic quotation marks (“ ” and ‘ ’).
 */
export function installGlobalCurvedQuotes(root: HTMLElement): () => void {
  processSubtree(root);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        if (mutation.target.nodeType === Node.TEXT_NODE) {
          processTextNode(mutation.target as Text);
        }
      } else if (mutation.type === 'childList') {
        for (const added of Array.from(mutation.addedNodes)) {
          processSubtree(added);
        }
      }
    }
  });

  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  return () => observer.disconnect();
}

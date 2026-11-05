export function toCurvedQuotes(text: string): string {
  if (!text) return '';
  return text
    .replace(/(^|[\s([—–-])"/g, '$1\u201C')
    .replace(/"/g, '\u201D')
    .replace(/([a-zA-Z0-9])'([a-zA-Z0-9])/g, '$1\u2019$2')
    .replace(/(^|[\s([\u201C—–-])'/g, '$1\u2018')
    .replace(/'/g, '\u2019');
}

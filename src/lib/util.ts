export function normalizeWhitespace (text: string): string {
  return text.replace(/\s+/g, " ").replace(/^ /, "").replace(/ $/, "");
}

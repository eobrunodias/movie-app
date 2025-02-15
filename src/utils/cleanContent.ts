export function cleanContent(content: string): string {
  const index = content.lastIndexOf("[");
  return index !== -1 ? content.slice(0, index).trim() : content;
}

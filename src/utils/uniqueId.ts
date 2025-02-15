export function uniqueId(title: string) {
  return title.replace(/\s+/g, "-").toLowerCase();
}

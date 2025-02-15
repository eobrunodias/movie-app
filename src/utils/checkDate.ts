export function checkDate(date: string): boolean {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const lastUpdate = new Date(date).getTime();

  return now - lastUpdate > oneDay;
}

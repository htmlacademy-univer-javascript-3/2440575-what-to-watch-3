export function formatPlayerTime(seconds: number): string {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatRunTime(minutes: number): string {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

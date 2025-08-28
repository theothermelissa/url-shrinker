export interface UrlEntry {
  id: number;
  url: string;
  short_url: string;
}

declare global {
  var __urlStorage: UrlEntry[] | undefined;
}

if (!global.__urlStorage) {
  global.__urlStorage = [];
}

export function addUrl(url: string, shortUrl: string): UrlEntry {
  const newEntry: UrlEntry = {
    id: global.__urlStorage!.length + 1,
    url,
    short_url: shortUrl,
  };

  global.__urlStorage!.push(newEntry);
  return newEntry;
}

export function findUrlByShortUrl(shortUrl: string): UrlEntry | undefined {
  return global.__urlStorage!.find((entry) => entry.short_url === shortUrl);
}

export function getAllUrls(): UrlEntry[] {
  return [...global.__urlStorage!];
}

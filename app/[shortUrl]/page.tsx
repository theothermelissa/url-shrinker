import { redirect } from "next/navigation";
import { findUrlByShortUrl } from "../lib/urlStorage";

export default async function ShortUrlPage({
  params,
}: {
  params: Promise<{ shortUrl: string }>;
}) {
  const { shortUrl } = await params;

  const urlEntry = findUrlByShortUrl(shortUrl);

  if (!urlEntry) {
    redirect("/");
  }

  redirect(urlEntry.url);
}

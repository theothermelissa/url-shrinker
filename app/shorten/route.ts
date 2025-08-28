import { NextRequest, NextResponse } from "next/server";
import { generateCustomUuid } from "custom-uuid";
import { addUrl } from "../lib/urlStorage";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let normalizedUrl = url.toString().trim();

    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = `http://${normalizedUrl}`;
    }

    try {
      new URL(normalizedUrl);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const shortUrl = generateCustomUuid(
      "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      8
    );

    const newUrl = addUrl(normalizedUrl, shortUrl);

    const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://pro.kp";

    return NextResponse.json(
      { short_url: `${domain}/${shortUrl}` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}

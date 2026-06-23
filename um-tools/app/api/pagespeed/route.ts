import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const strategy = searchParams.get("strategy") || "mobile";

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  let targetUrl = url.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = "https://" + targetUrl;
  }

  try {
    new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  const apiKey = process.env.PAGESPEED_API_KEY;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo${apiKey ? `&key=${apiKey}` : ""}`;

  try {
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      return NextResponse.json(
        { error: errData?.error?.message || "Could not analyze this website. It may be unreachable or blocking automated checks." },
        { status: 502 }
      );
    }
    const data = await res.json();

    const lh = data.lighthouseResult;
    const categories = lh?.categories || {};
    const audits = lh?.audits || {};

    const result = {
      url: data.id || targetUrl,
      strategy,
      scores: {
        performance: categories.performance ? Math.round(categories.performance.score * 100) : null,
        accessibility: categories.accessibility ? Math.round(categories.accessibility.score * 100) : null,
        bestPractices: categories["best-practices"] ? Math.round(categories["best-practices"].score * 100) : null,
        seo: categories.seo ? Math.round(categories.seo.score * 100) : null,
      },
      metrics: {
        firstContentfulPaint: audits["first-contentful-paint"]?.displayValue || "N/A",
        largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue || "N/A",
        totalBlockingTime: audits["total-blocking-time"]?.displayValue || "N/A",
        cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue || "N/A",
        speedIndex: audits["speed-index"]?.displayValue || "N/A",
      },
    };

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Request timed out or failed. The website may be slow to respond — please try again." },
      { status: 504 }
    );
  }
}

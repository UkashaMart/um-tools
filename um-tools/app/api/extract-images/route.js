export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json({ error: "URL required" }, { status: 400 });
    }

    let targetUrl;
    try {
      targetUrl = new URL(url);
    } catch {
      return Response.json({ error: "Invalid URL" }, { status: 400 });
    }

    const res = await fetch(targetUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return Response.json(
        { error: `Failed to fetch page (status ${res.status})` },
        { status: 400 }
      );
    }

    const html = await res.text();

    const images = new Set();

    // og:image / twitter:image meta tags
    const metaRegex =
      /<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/gi;
    let m;
    while ((m = metaRegex.exec(html)) !== null) {
      images.add({ url: m[1], type: "meta" });
    }

    // <img> tags (src and data-src for lazy-loaded images)
    const imgRegex = /<img[^>]+(?:src|data-src)=["']([^"']+)["']/gi;
    while ((m = imgRegex.exec(html)) !== null) {
      images.add({ url: m[1], type: "gallery" });
    }

    // Resolve relative URLs to absolute, dedupe
    const seen = new Set();
    const resolved = [];

    for (const img of images) {
      try {
        const absolute = new URL(img.url, targetUrl).toString();
        if (!seen.has(absolute) && /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i.test(absolute)) {
          seen.add(absolute);
          resolved.push({ url: absolute, type: img.type });
        }
      } catch {
        // skip invalid URLs
      }
    }

    if (resolved.length === 0) {
      return Response.json(
        { error: "No images found on this page" },
        { status: 404 }
      );
    }

    return Response.json({ images: resolved });
  } catch (err) {
    return Response.json(
      { error: "Something went wrong fetching this page" },
      { status: 500 }
    );
  }
}
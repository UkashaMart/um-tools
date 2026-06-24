import { NextRequest, NextResponse } from "next/server";

function cleanDomain(input: string): string {
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, "");
  d = d.replace(/^www\./, "");
  d = d.split("/")[0];
  d = d.split("?")[0];
  return d;
}

async function fetchWithTimeout(url: string, timeoutMs: number, headers?: Record<string, string>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, headers });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domainParam = searchParams.get("domain");

  if (!domainParam) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  const domain = cleanDomain(domainParam);

  if (!domain || !domain.includes(".")) {
    return NextResponse.json({ error: "Please enter a valid domain name" }, { status: 400 });
  }

  const tld = domain.split(".").pop() || "";

  const sources = [
    `https://rdap.org/domain/${domain}`,
    `https://www.rdap.net/domain/${domain}`,
  ];

  let data: any = null;
  let lastError = "";

  for (const sourceUrl of sources) {
    try {
      const res = await fetchWithTimeout(sourceUrl, 8000, { Accept: "application/rdap+json" });

      if (res.status === 404) {
        return NextResponse.json({ error: "Domain not found or not registered." }, { status: 404 });
      }
      if (!res.ok) {
        lastError = `Registry returned status ${res.status}`;
        continue;
      }
      data = await res.json();
      break;
    } catch (err: any) {
      lastError = err?.name === "AbortError" ? "Request timed out" : "Network error";
      continue;
    }
  }

  if (!data) {
    return NextResponse.json(
      { error: `Could not retrieve data for ".${tld}" domains right now. Some domain extensions have limited public RDAP support, or the registry may be temporarily slow. Please try again or try a .com/.net/.org domain.` },
      { status: 504 }
    );
  }

  try {
    let registered: string | null = null;
    let expires: string | null = null;
    let updated: string | null = null;

    for (const event of data.events || []) {
      if (event.eventAction === "registration") registered = event.eventDate;
      else if (event.eventAction === "expiration") expires = event.eventDate;
      else if (event.eventAction === "last changed" || event.eventAction === "last update of RDAP database") updated = event.eventDate;
    }

    const nameservers = (data.nameservers || []).map((ns: any) => ns.ldhName).filter(Boolean);

    let registrar: string | null = null;
    for (const entity of data.entities || []) {
      if (entity.roles?.includes("registrar")) {
        const vcard = entity.vcardArray?.[1];
        if (vcard) {
          const fnEntry = vcard.find((v: any[]) => v[0] === "fn");
          if (fnEntry) registrar = fnEntry[3];
        }
        if (!registrar) registrar = entity.handle || null;
      }
    }

    let ageYears: number | null = null;
    let ageDays: number | null = null;
    if (registered) {
      const regDate = new Date(registered);
      const now = new Date();
      const diffMs = now.getTime() - regDate.getTime();
      ageDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      ageYears = Math.floor(ageDays / 365.25);
    }

    return NextResponse.json({
      domain,
      registered,
      expires,
      updated,
      registrar,
      nameservers,
      ageYears,
      ageDays,
      status: data.status || [],
    });
  } catch (err) {
    return NextResponse.json({ error: "Received unexpected data format from registry. Please try again." }, { status: 502 });
  }
}
import { NextRequest, NextResponse } from "next/server";

function cleanDomain(input: string): string {
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, "");
  d = d.replace(/^www\./, "");
  d = d.split("/")[0];
  d = d.split("?")[0];
  return d;
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

  try {
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      signal: AbortSignal.timeout(15000),
      headers: { Accept: "application/rdap+json" },
    });

    if (res.status === 404) {
      return NextResponse.json({ error: "Domain not found or not registered." }, { status: 404 });
    }
    if (!res.ok) {
      return NextResponse.json({ error: "Could not retrieve data for this domain. The registry may not support lookups." }, { status: 502 });
    }

    const data = await res.json();

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
    return NextResponse.json({ error: "Lookup failed or timed out. Please try again." }, { status: 504 });
  }
}

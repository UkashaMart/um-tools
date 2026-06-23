import type { Metadata } from "next";
import DomainAgeClient from "./DomainAgeClient";

export const metadata: Metadata = {
  title: "Domain Age Checker — Free Domain Registration Date Lookup",
  description: "Check any domain's age, registration date, expiration date, registrar and nameservers for free. Powered by RDAP. Instant results, no signup required.",
  keywords: "domain age checker, domain age lookup, whois lookup, domain registration date, when was domain registered, free domain checker",
};

export default function Page() { return <DomainAgeClient />; }

"use client";
import { useState } from "react";

type DomainResult = {
  domain: string;
  registered: string | null;
  expires: string | null;
  updated: string | null;
  registrar: string | null;
  nameservers: string[];
  ageYears: number | null;
  ageDays: number | null;
  status: string[];
};

type ResultState = { domain: string; status: "pending" | "loading" | "done" | "error"; data?: DomainResult; error?: string };

function formatDate(iso: string | null) {
  if (!iso) return "Unknown";
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

export default function DomainAgeClient() {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [domain, setDomain] = useState("");
  const [bulkDomains, setBulkDomains] = useState("");
  const [results, setResults] = useState<ResultState[]>([]);
  const [loading, setLoading] = useState(false);

  const checkSingle = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setResults([{ domain: domain.trim(), status: "loading" }]);
    try {
      const res = await fetch(`/api/domain-age?domain=${encodeURIComponent(domain.trim())}`);
      const data = await res.json();
      setResults([res.ok ? { domain: domain.trim(), status: "done", data } : { domain: domain.trim(), status: "error", error: data.error }]);
    } catch {
      setResults([{ domain: domain.trim(), status: "error", error: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const checkBulk = async () => {
    const domains = bulkDomains.split("\n").map(d => d.trim()).filter(Boolean).slice(0, 5);
    if (domains.length === 0) return;
    setLoading(true);
    setResults(domains.map(d => ({ domain: d, status: "pending" })));

    for (let i = 0; i < domains.length; i++) {
      setResults(prev => prev.map((r, idx) => idx === i ? { ...r, status: "loading" } : r));
      try {
        const res = await fetch(`/api/domain-age?domain=${encodeURIComponent(domains[i])}`);
        const data = await res.json();
        setResults(prev => prev.map((r, idx) => idx === i
          ? (res.ok ? { ...r, status: "done", data } : { ...r, status: "error", error: data.error })
          : r));
      } catch {
        setResults(prev => prev.map((r, idx) => idx === i ? { ...r, status: "error", error: "Network error" } : r));
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Domain Age Checker</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Check any domain's registration date, age, expiration and registrar — free and instant</p>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem" }}>
          {[["single", "Single Domain"], ["bulk", "Bulk Check (up to 5)"]].map(([key, label]) => (
            <button key={key} onClick={() => { setMode(key as any); setResults([]); }}
              style={{ padding: ".4rem .9rem", borderRadius: 20, border: `1px solid ${mode === key ? "#D4A017" : "rgba(212,160,23,.3)"}`, background: mode === key ? "rgba(212,160,23,.15)" : "transparent", color: mode === key ? "#F5C842" : "#9A8F78", cursor: "pointer", fontSize: ".8rem" }}>
              {label}
            </button>
          ))}
        </div>

        {mode === "single" ? (
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <input type="text" className="inp" placeholder="example.com"
              value={domain} onChange={e => setDomain(e.target.value)} onKeyDown={e => e.key === "Enter" && checkSingle()}
              style={{ flex: 1, minWidth: 220 }} />
            <button className="btn-gold" onClick={checkSingle} disabled={loading || !domain.trim()}>
              {loading ? "Checking..." : "Check Domain"}
            </button>
          </div>
        ) : (
          <div>
            <textarea className="inp" rows={5} placeholder={"Enter up to 5 domains, one per line:\nexample.com\nanotherdomain.com\nthirddomain.com"}
              value={bulkDomains} onChange={e => setBulkDomains(e.target.value)} style={{ resize: "vertical", marginBottom: ".6rem" }} />
            <button className="btn-gold" onClick={checkBulk} disabled={loading || !bulkDomains.trim()}>
              {loading ? "Checking domains..." : "Check All Domains"}
            </button>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          {results.map((r, i) => (
            <div key={i} className="card" style={{ marginBottom: ".75rem" }}>
              <div style={{ fontSize: ".9rem", fontWeight: 600, color: "#F5C842", marginBottom: ".5rem" }}>{r.domain}</div>

              {r.status === "pending" && <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>Waiting in queue...</div>}
              {r.status === "loading" && <div style={{ fontSize: ".78rem", color: "#D4A017" }}>Looking up registration data...</div>}
              {r.status === "error" && <div style={{ fontSize: ".78rem", color: "#ef4444" }}>{r.error}</div>}

              {r.status === "done" && r.data && (
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: ".75rem" }}>
                    <div className="stat-box">
                      <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5C842" }}>{r.data.ageYears ?? "—"}</div>
                      <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>Years Old</div>
                    </div>
                    <div className="stat-box">
                      <div style={{ fontSize: ".9rem", fontWeight: 600, color: "#F0E6C8" }}>{r.data.ageDays?.toLocaleString() ?? "—"}</div>
                      <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>Days Old</div>
                    </div>
                  </div>
                  <div style={{ fontSize: ".82rem", color: "#9A8F78" }}>
                    {[
                      ["Registered", formatDate(r.data.registered)],
                      ["Expires", formatDate(r.data.expires)],
                      ["Last Updated", formatDate(r.data.updated)],
                      ["Registrar", r.data.registrar || "Unknown"],
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: ".3rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
                        <span>{label}</span><strong style={{ color: "#F0E6C8" }}>{value}</strong>
                      </div>
                    ))}
                  </div>
                  {r.data.nameservers.length > 0 && (
                    <div style={{ marginTop: ".5rem", fontSize: ".75rem", color: "#9A8F78" }}>
                      <strong style={{ color: "#D4A017" }}>Nameservers:</strong> {r.data.nameservers.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Why Domain Age Matters</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["Trust Signal", "Older domains often appear more established and trustworthy"], ["Email Deliverability", "Aged domains typically have better email reputation"], ["Buying Domains", "Check history before purchasing an expired or aged domain"], ["Security Research", "Newly registered domains are often used for phishing"]].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>FAQ</h2>
        {[
          ["Is this tool free?", "Yes, completely free using public RDAP registry data, no signup required."],
          ["What is domain age?", "Domain age is how long ago a domain name was first registered, not how long the current website content has existed."],
          ["Does domain age affect SEO?", "Google has not officially confirmed domain age as a ranking factor, though many SEO professionals believe older domains may have a slight trust advantage."],
          ["Why might a lookup fail?", "Some country-specific domain extensions (ccTLDs) have limited public RDAP data, or the registry may be temporarily unavailable."],
          ["What is RDAP?", "RDAP (Registration Data Access Protocol) is the modern, standardized replacement for traditional WHOIS, maintained by domain registries worldwide."]
        ].map(([q, a]) => (
          <div key={q} style={{ marginBottom: ".6rem", paddingBottom: ".6rem", borderBottom: "1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>Q: {q}</div>
            <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

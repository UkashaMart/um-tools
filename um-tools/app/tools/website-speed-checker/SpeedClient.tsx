"use client";
import { useState } from "react";

type Result = {
  url: string;
  scores: { performance: number | null; accessibility: number | null; bestPractices: number | null; seo: number | null };
  metrics: { firstContentfulPaint: string; largestContentfulPaint: string; totalBlockingTime: string; cumulativeLayoutShift: string; speedIndex: string };
};

type ResultState = { url: string; status: "pending" | "loading" | "done" | "error"; data?: Result; error?: string };

function scoreColor(score: number | null) {
  if (score === null) return "#9A8F78";
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

export default function SpeedClient() {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState("mobile");
  const [bulkUrls, setBulkUrls] = useState("");
  const [results, setResults] = useState<ResultState[]>([]);
  const [loading, setLoading] = useState(false);

  const checkSingle = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResults([{ url: url.trim(), status: "loading" }]);
    try {
      const res = await fetch(`/api/pagespeed?url=${encodeURIComponent(url.trim())}&strategy=${strategy}`);
      const data = await res.json();
      if (!res.ok) {
        setResults([{ url: url.trim(), status: "error", error: data.error || "Failed to analyze" }]);
      } else {
        setResults([{ url: url.trim(), status: "done", data }]);
      }
    } catch {
      setResults([{ url: url.trim(), status: "error", error: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const checkBulk = async () => {
    const urls = bulkUrls.split("\n").map(u => u.trim()).filter(Boolean).slice(0, 5);
    if (urls.length === 0) return;
    setLoading(true);
    const initial: ResultState[] = urls.map(u => ({ url: u, status: "pending" }));
    setResults(initial);

    for (let i = 0; i < urls.length; i++) {
      setResults(prev => prev.map((r, idx) => idx === i ? { ...r, status: "loading" } : r));
      try {
        const res = await fetch(`/api/pagespeed?url=${encodeURIComponent(urls[i])}&strategy=${strategy}`);
        const data = await res.json();
        setResults(prev => prev.map((r, idx) => idx === i
          ? (res.ok ? { ...r, status: "done", data } : { ...r, status: "error", error: data.error || "Failed to analyze" })
          : r));
      } catch {
        setResults(prev => prev.map((r, idx) => idx === i ? { ...r, status: "error", error: "Network error" } : r));
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Website Speed Checker</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Check your website's performance, SEO, and accessibility score — powered by Google PageSpeed Insights</p>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem" }}>
          {[["single", "Single URL"], ["bulk", "Bulk Check (up to 5)"]].map(([key, label]) => (
            <button key={key} onClick={() => { setMode(key as any); setResults([]); }}
              style={{ padding: ".4rem .9rem", borderRadius: 20, border: `1px solid ${mode === key ? "#D4A017" : "rgba(212,160,23,.3)"}`, background: mode === key ? "rgba(212,160,23,.15)" : "transparent", color: mode === key ? "#F5C842" : "#9A8F78", cursor: "pointer", fontSize: ".8rem" }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: ".75rem" }}>
          <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Device</div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            {[["mobile", "Mobile"], ["desktop", "Desktop"]].map(([key, label]) => (
              <button key={key} onClick={() => setStrategy(key)}
                style={{ padding: ".35rem .8rem", borderRadius: 8, border: `1px solid ${strategy === key ? "#D4A017" : "rgba(212,160,23,.3)"}`, background: strategy === key ? "rgba(212,160,23,.15)" : "transparent", color: strategy === key ? "#F5C842" : "#9A8F78", cursor: "pointer", fontSize: ".78rem" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {mode === "single" ? (
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <input type="text" className="inp" placeholder="example.com or https://example.com"
              value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && checkSingle()}
              style={{ flex: 1, minWidth: 220 }} />
            <button className="btn-gold" onClick={checkSingle} disabled={loading || !url.trim()}>
              {loading ? "Checking..." : "Check Speed"}
            </button>
          </div>
        ) : (
          <div>
            <textarea className="inp" rows={5} placeholder={"Enter up to 5 URLs, one per line:\nexample.com\nanothersite.com\nthirdsite.com"}
              value={bulkUrls} onChange={e => setBulkUrls(e.target.value)} style={{ resize: "vertical", marginBottom: ".6rem" }} />
            <button className="btn-gold" onClick={checkBulk} disabled={loading || !bulkUrls.trim()}>
              {loading ? "Checking sites..." : "Check All Sites"}
            </button>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          {results.map((r, i) => (
            <div key={i} className="card" style={{ marginBottom: ".75rem" }}>
              <div style={{ fontSize: ".85rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".5rem", wordBreak: "break-all" }}>{r.url}</div>

              {r.status === "pending" && <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>Waiting in queue...</div>}
              {r.status === "loading" && <div style={{ fontSize: ".78rem", color: "#D4A017" }}>Analyzing — this can take 5-15 seconds...</div>}
              {r.status === "error" && <div style={{ fontSize: ".78rem", color: "#ef4444" }}>{r.error}</div>}

              {r.status === "done" && r.data && (
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: ".75rem" }}>
                    {[["Performance", r.data.scores.performance], ["SEO", r.data.scores.seo], ["Accessibility", r.data.scores.accessibility], ["Best Practices", r.data.scores.bestPractices]].map(([label, score]) => (
                      <div key={label as string} style={{ textAlign: "center", minWidth: 90 }}>
                        <div style={{
                          width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                          border: `3px solid ${scoreColor(score as number | null)}`, color: scoreColor(score as number | null),
                          fontSize: "1.1rem", fontWeight: 700, margin: "0 auto .3rem"
                        }}>
                          {score ?? "—"}
                        </div>
                        <div style={{ fontSize: ".65rem", color: "#9A8F78" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", fontSize: ".72rem", color: "#9A8F78", borderTop: "1px solid rgba(212,160,23,.1)", paddingTop: ".6rem" }}>
                    <span>FCP: <strong style={{ color: "#F0E6C8" }}>{r.data.metrics.firstContentfulPaint}</strong></span>
                    <span>LCP: <strong style={{ color: "#F0E6C8" }}>{r.data.metrics.largestContentfulPaint}</strong></span>
                    <span>TBT: <strong style={{ color: "#F0E6C8" }}>{r.data.metrics.totalBlockingTime}</strong></span>
                    <span>CLS: <strong style={{ color: "#F0E6C8" }}>{r.data.metrics.cumulativeLayoutShift}</strong></span>
                    <span>Speed Index: <strong style={{ color: "#F0E6C8" }}>{r.data.metrics.speedIndex}</strong></span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Understanding Your Scores</h2>
        <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>
          {[["90-100", "Good — your site performs well", "#22c55e"], ["50-89", "Needs Improvement", "#f59e0b"], ["0-49", "Poor — significant issues to fix", "#ef4444"]].map(([range, desc, color]) => (
            <div key={range} style={{ display: "flex", gap: ".6rem", alignItems: "center", padding: ".3rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
              <strong style={{ color: color as string, minWidth: 60 }}>{range}</strong><span>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Why Website Speed Matters</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["SEO Ranking", "Google uses Core Web Vitals as a ranking signal"], ["User Experience", "Visitors expect pages to load under 3 seconds"], ["Conversions", "A 1-second delay can reduce mobile conversions"], ["Bounce Rate", "Slow sites see significantly higher bounce rates"]].map(([t, d]) => (
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
          ["Is this tool free?", "Yes, completely free. Powered by Google's official PageSpeed Insights API."],
          ["Why does it take a few seconds?", "Google runs a real performance test on your page in real time, which typically takes 5-15 seconds per URL."],
          ["What's the difference between mobile and desktop scores?", "Mobile scores simulate a slower connection and device — most sites score lower on mobile than desktop."],
          ["Can I check any website?", "Yes, any public website can be checked. Password-protected or local sites cannot be analyzed."],
          ["Why might a check fail?", "Some sites block automated requests or may be temporarily unreachable. Try again after a moment."]
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

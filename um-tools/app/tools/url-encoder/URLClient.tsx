"use client";
import { useState } from "react";

export default function URLClient() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [err, setErr] = useState("");

  const run = (type: "e" | "d") => {
    try {
      setErr("");
      setResult(type === "e" ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch (e: any) {
      setErr("Error: " + e.message);
      setResult("");
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>URL Encoder / Decoder</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Encode or decode special characters in your URLs instantly—an essential tool for web developers.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea className="inp" rows={3} placeholder="Enter your URL or text here..." value={input} onChange={e => setInput(e.target.value)} style={{ resize: "vertical", marginBottom: ".6rem" }} />
        <div style={{ display: "flex", gap: ".6rem" }}>
          <button className="btn-gold" onClick={() => run("e")}>Encode URL</button>
          <button className="btn-gold" onClick={() => run("d")}>Decode URL</button>
        </div>
        {err && <div style={{ color: "#ef4444", fontSize: ".8rem", marginTop: ".5rem" }}>{err}</div>}
        {result && (
          <>
            <div className="res-box ok" style={{ wordBreak: "break-all", marginTop: ".75rem" }}>{result}</div>
            <button className="btn-outline" onClick={() => navigator.clipboard.writeText(result)} style={{ marginTop: ".5rem" }}>Copy Result</button>
          </>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Common Encodings</h2>
        <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>
          {[["Space", "%20"], ["@", "%40"], ["&", "%26"], ["=", "%3D"], ["+", "%2B"], ["?", "%3F"], ["#", "%23"], ["/", "%2F"]].map(([char, enc]) => (
            <div key={char} style={{ display: "flex", justifyContent: "space-between", padding: ".25rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
              <code style={{ color: "#F0E6C8" }}>{char}</code>
              <code style={{ color: "#F5C842" }}>{enc}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>When to Use URL Encoding</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["API Parameters", "Encode special characters in query strings."], ["International Text", "Encode non-ASCII/Unicode text for URLs."], ["Search Queries", "Handle symbols and spaces safely."], ["Redirects", "Ensure valid URL structure during redirection."]].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["What is URL encoding?", "URLs only allow specific characters. Encoding converts special/non-allowed characters into a valid %XX format."],
          ["What is the difference between encoding and decoding?", "Encoding makes text URL-safe, while decoding restores encoded URLs into a readable format."],
          ["Can I encode non-English languages?", "Yes. Encoding characters like Urdu, Arabic, or symbols allows them to be transmitted safely within a URL."]
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
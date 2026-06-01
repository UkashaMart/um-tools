"use client";
import { useState } from "react";

export default function CaseClient() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const convert = (type: string) => {
    let r = input;
    if (type === "upper") r = input.toUpperCase();
    else if (type === "lower") r = input.toLowerCase();
    else if (type === "title") r = input.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    else if (type === "sent") r = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    else if (type === "alt") r = input.split("").map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join("");
    else if (type === "rev") r = input.split("").reverse().join("");
    setResult(r);
  };

  const copy = () => navigator.clipboard.writeText(result);

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Case Converter</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Convert your text to UPPERCASE, lowercase, Title Case, Sentence case, and more — free and instant.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea className="inp" rows={4} placeholder="Type or paste your text here..." value={input} onChange={(e) => setInput(e.target.value)} style={{ resize: "vertical" }} />
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginTop: ".6rem" }}>
          {[["upper", "UPPER"], ["lower", "lower"], ["title", "Title Case"], ["sent", "Sentence case"], ["alt", "aLtErNaTe"], ["rev", "Reverse"]].map(([t, l]) => (
            <button key={t} className="btn-gold" onClick={() => convert(t)}>{l}</button>
          ))}
        </div>
        {result && (
          <>
            <div className="res-box ok" style={{ wordBreak: "break-all", marginTop: ".75rem" }}>{result}</div>
            <button className="btn-outline" onClick={copy} style={{ marginTop: ".5rem" }}><i className="ti ti-copy" /> Copy to Clipboard</button>
          </>
        )}
      </div>

      {/* SEO Content */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>How to Use the Case Converter</h2>
        {[
          ["1", "Type or paste your text into the input box provided above."],
          ["2", "Click on any conversion format button — UPPER, lower, Title Case, etc."],
          ["3", "The transformed output appears instantly below — simply click Copy to replicate it."]
        ].map(([n, t]) => (
          <div key={n} style={{ display: "flex", gap: ".75rem", marginBottom: ".5rem" }}>
            <div style={{ background: "linear-gradient(135deg,#A07810,#D4A017)", color: "#111", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, flexShrink: 0 }}>{n}</div>
            <p style={{ fontSize: ".85rem", color: "#9A8F78", marginTop: 2 }}>{t}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Text Case Styles Explained</h2>
        {[
          ["UPPERCASE", "Converts every single character into capital letters. Ideal for prominent headings, conceptual acronyms, or strong layout emphasis."],
          ["lowercase", "Transforms all alphabets into small letters. Widely used for structural email addresses, system usernames, or modern CSS class configurations."],
          ["Title Case", "Capitalizes the initial letter of every distinct word. Highly recommended for standard blog titles, formal headings, and book names."],
          ["Sentence Case", "Capitalizes exclusively the first letter of a complete paragraph or text segment. Best suited for normal structural sentences."],
          ["aLtErNaTe", "Alternates dynamically between upper and lower case positioning. Frequently utilized for memes, casual interactions, and stylized text formatting."],
          ["Reverse Case", "Inverts the entire structural sequence of characters backwards. Great for playful engagements or quick custom text variations."],
        ].map(([t, d]) => (
          <div key={t} style={{ borderLeft: "2px solid rgba(212,160,23,0.4)", paddingLeft: ".75rem", marginBottom: ".6rem" }}>
            <div style={{ fontSize: ".85rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
            <div style={{ fontSize: ".8rem", color: "#9A8F78" }}>{d}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Key Features</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem" }}>
          {["Real-time instant processing", "6 dynamic conversion structures", "One-click clipboard copy function", "No character length restrictions", "Fully optimized for mobile and desktop", "100% free with no registration required"].map(f => (
            <div key={f} style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
              <span style={{ color: "#22c55e" }}>✓</span>
              <span style={{ fontSize: ".82rem", color: "#9A8F78" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is there an input character limit on this tool?", "No, you can paste and modify as much content configuration as required. There are no volume restrictions implemented."],
          ["Does this platform execute properly on mobile devices?", "Yes, our responsive case converter operates natively across mobile browsers, tablets, and full desktop monitors."],
          ["Is my pasted text monitored or stored anywhere?", "Never. All data processes occur entirely local inside your client browser interface. Your text content is never dispatched to external servers."],
          ["Can I utilize this tool for managing SEO metadata?", "Absolutely. Title Case works effectively for drafting blog post titles, while Sentence Case is ideal for polishing meta description lengths."]
        ].map(([q, a]) => (
          <div key={q} style={{ borderLeft: "2px solid rgba(212,160,23,0.4)", paddingLeft: ".75rem", marginBottom: ".6rem" }}>
            <div style={{ fontSize: ".85rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>Q: {q}</div>
            <div style={{ fontSize: ".8rem", color: "#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
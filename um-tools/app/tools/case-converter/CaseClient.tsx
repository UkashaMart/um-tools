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
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Convert text to UPPERCASE, lowercase, Title Case, Sentence case and more — free and instant.</p>
      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea className="inp" rows={4} placeholder="Type or paste your text here..." value={input} onChange={(e) => setInput(e.target.value)} style={{ resize: "vertical" }} />
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginTop: ".6rem" }}>
          {[["upper","UPPER"],["lower","lower"],["title","Title Case"],["sent","Sentence case"],["alt","aLtErNaTe"],["rev","Reverse"]].map(([t,l]) => (
            <button key={t} className="btn-gold" onClick={() => convert(t)}>{l}</button>
          ))}
        </div>
        {result && (
          <>
            <div className="res-box ok">{result}</div>
            <button className="btn-outline" onClick={copy} style={{ marginTop: ".5rem" }}><i className="ti ti-copy" /> Copy</button>
          </>
        )}
      </div>

      {/* SEO Content */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>How to Use Case Converter</h2>
        {[["1","Type or paste your text in the box above"],["2","Click any conversion button — UPPER, lower, Title Case etc."],["3","Result appears instantly below — click Copy to copy it"]].map(([n,t]) => (
          <div key={n} style={{ display:"flex", gap:".75rem", marginBottom:".5rem" }}>
            <div style={{ background:"linear-gradient(135deg,#A07810,#D4A017)", color:"#111", borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:".7rem", fontWeight:700, flexShrink:0 }}>{n}</div>
            <p style={{ fontSize:".85rem", color:"#9A8F78", marginTop:2 }}>{t}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Case Types Explained</h2>
        {[
          ["UPPERCASE", "Converts all letters to capitals. Used for headings, acronyms, emphasis."],
          ["lowercase", "Converts all letters to small. Used for emails, usernames, CSS class names."],
          ["Title Case", "Capitalizes first letter of each word. Used for titles, headings, names."],
          ["Sentence Case", "Capitalizes only the first letter. Used for normal sentences and paragraphs."],
          ["aLtErNaTe", "Alternates between upper and lower case. Used for memes and fun text."],
          ["Reverse", "Reverses all characters in the text. Used for fun or simple encoding."],
        ].map(([t,d]) => (
          <div key={t} style={{ borderLeft:"2px solid rgba(212,160,23,0.4)", paddingLeft:".75rem", marginBottom:".6rem" }}>
            <div style={{ fontSize:".85rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
            <div style={{ fontSize:".8rem", color:"#9A8F78" }}>{d}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Features</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".5rem" }}>
          {["Real-time instant conversion","6 conversion types","One-click copy to clipboard","No character limit","Works on mobile and desktop","100% free — no signup needed"].map(f => (
            <div key={f} style={{ display:"flex", gap:".5rem", alignItems:"center" }}>
              <span style={{ color:"#22c55e" }}>✓</span>
              <span style={{ fontSize:".82rem", color:"#9A8F78" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is there a character limit?", "No! You can convert as much text as you want. There is no limit at all."],
          ["Does it work on mobile?", "Yes! Our case converter works perfectly on mobile, tablet and desktop browsers."],
          ["Is my text stored anywhere?", "Never. All conversions happen in your browser. Your text is never sent to any server."],
          ["Can I use it for SEO content?", "Yes! Title Case is great for blog post titles and headings. Sentence case works best for meta descriptions."],
        ].map(([q,a]) => (
          <div key={q} style={{ borderLeft:"2px solid rgba(212,160,23,0.4)", paddingLeft:".75rem", marginBottom:".6rem" }}>
            <div style={{ fontSize:".85rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{q}</div>
            <div style={{ fontSize:".8rem", color:"#9A8F78" }}>{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

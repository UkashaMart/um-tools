"use client";
import { useState } from "react";

export default function WordCounterClient() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const noSpace = text.replace(/\s/g, "").length;
  const lines = text ? text.split("\n").length : 0;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  const readTime = Math.max(1, Math.ceil(words / 200));

  const stats = [
    { v: words, k: "Words" }, { v: chars, k: "Characters" }, { v: noSpace, k: "No Spaces" },
    { v: lines, k: "Lines" }, { v: sentences, k: "Sentences" }, { v: paragraphs, k: "Paragraphs" },
    { v: readTime + " min", k: "Read Time" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Word and Character Counter</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Get real-time text analysis: count words, characters, sentences, and paragraphs instantly.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea className="inp" rows={8} placeholder="Paste your text here..." value={text} onChange={(e) => setText(e.target.value)} style={{ resize: "vertical", minHeight: 160 }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginTop: ".75rem" }}>
          {stats.map(({ v, k }) => (
            <div key={k} className="stat-box">
              <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#F5C842" }}>{v}</div>
              <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>{k}</div>
            </div>
          ))}
        </div>
        {text && <button className="btn-outline" style={{ marginTop: ".75rem" }} onClick={() => setText("")}>Clear</button>}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>How to Use This Tool</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ marginBottom: ".4rem" }}>1. Paste or type your text into the area above.</div>
          <div style={{ marginBottom: ".4rem" }}>2. View results updated in real-time.</div>
          <div style={{ marginBottom: ".4rem" }}>3. Track words, sentences, reading time, and more.</div>
          <div>4. Click 'Clear' to start over.</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Why Use a Word Counter?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["Students", "Track word limits for academic assignments."], ["Bloggers", "Optimize content length for SEO."], ["Writers", "Monitor daily writing goals."], ["Social Media", "Ensure text fits character limits."]].map(([t, d]) => (
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
          ["Is this service free?", "Yes, it is completely free to use with no registration required."],
          ["Is my data stored?", "No. Your text is processed locally in your browser and is never saved or uploaded."],
          ["Does it work on mobile?", "Yes, it is fully responsive and works seamlessly on both mobile and desktop."],
          ["Is there a text limit?", "No limit! Feel free to paste as much content as you need."]
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
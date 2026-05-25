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
      <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Word & Character Counter</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Real-time text analysis</p>
      <div className="card">
        <textarea
          className="inp"
          rows={8}
          placeholder="Yahan text paste karo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ resize: "vertical", minHeight: 160 }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginTop: ".75rem" }}>
          {stats.map(({ v, k }) => (
            <div key={k} className="stat-box">
              <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#F5C842" }}>{v}</div>
              <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>{k}</div>
            </div>
          ))}
        </div>
        {text && (
          <button className="btn-outline" style={{ marginTop: ".75rem" }} onClick={() => setText("")}>
            <i className="ti ti-trash" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}

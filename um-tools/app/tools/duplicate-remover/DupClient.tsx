"use client";
import { useState } from "react";

export default function DupClient() {
  const [input, setInput] = useState(""); 
  const [result, setResult] = useState(""); 
  const [removed, setRemoved] = useState(0); 
  const [ci, setCi] = useState(false);

  const run = () => {
    const lines = input.split("\n");
    const seen = new Set<string>();
    const out: string[] = [];
    let dup = 0;
    
    lines.forEach(l => {
      const k = ci ? l.toLowerCase() : l;
      if (!seen.has(k)) {
        seen.add(k);
        out.push(l);
      } else {
        dup++;
      }
    });
    
    setResult(out.join("\n"));
    setRemoved(dup);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Duplicate Line Remover</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Instantly scan and remove duplicate lines from your text, lists, or dataset — perfect for cleaning email directories or code repositories.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea className="inp" rows={6} placeholder="Paste your text line by line here..." value={input} onChange={e => setInput(e.target.value)} style={{ resize: "vertical", marginBottom: ".6rem" }} />
        <div style={{ display: "flex", gap: ".75rem", alignItems: "center", flexWrap: "wrap" }}>
          <button className="btn-gold" onClick={run}>Remove Duplicates</button>
          <label style={{ display: "flex", alignItems: "center", gap: ".4rem", fontSize: ".8rem", cursor: "pointer" }}>
            <input type="checkbox" checked={ci} onChange={e => setCi(e.target.checked)} style={{ accentColor: "#D4A017" }} /> Case Insensitive Mode
          </label>
        </div>
        
        {result && (
          <>
            {removed > 0 && <div style={{ fontSize: ".75rem", color: "#4ade80", marginTop: ".4rem" }}>Successfully removed {removed} duplicate lines!</div>}
            <div className="res-box ok" style={{ whiteSpace: "pre-wrap", minHeight: 80, marginTop: ".5rem" }}>{result}</div>
            <button className="btn-outline" onClick={() => navigator.clipboard.writeText(result)} style={{ marginTop: ".5rem" }}>Copy to Clipboard</button>
          </>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>When to Use a Duplicate Line Remover</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[
            ["Email Marketing Lists", "Clean up newsletter subscription datasets by pruning duplicate email IDs."],
            ["Data Structuring", "Quickly remove redundant entries from messy spreadsheet logs or CSV outputs."],
            ["Code Repositories", "Eliminate redundant code chunks, repeating library imports, or duplicate global variables."],
            ["Vocabulary Word Lists", "Deduplicate lexicographical archives or phrase indexes effortlessly."],
            ["Contact Registers", "Scan through text registries to erase repeating phone contacts or entries."],
            ["Web URLs & Links", "Filter large datasets of crawled internet hyperlinks to keep unique paths only."]
          ].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Understanding Case Insensitivity</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ marginBottom: ".4rem" }}>
            When **Case Insensitive Mode is enabled**, variation in lettering formats is bypassed. For instance, the strings **"John"** and **"john"** will be flagged as equivalent matches, and the redundant lines will be discarded.
          </div>
          <div>
            When **disabled (default mode)**, the evaluation adheres strictly to exact binary equivalents. In this scenario, **"John"** and **"john"** are treated as unique lines, ensuring only identical case lines are deleted.
          </div>
        </div>
      </div>
    </div>
  );
}
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
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Text ka case change karo</p>
      <div className="card">
        <textarea className="inp" rows={4} placeholder="Text yahan likho..." value={input} onChange={(e) => setInput(e.target.value)} style={{ resize: "vertical" }} />
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
    </div>
  );
}

"use client";
import { useState } from "react";

const W = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur"];

const rnd = (a: string[]) => a[Math.floor(Math.random() * a.length)];

const sent = () => {
  const w = Array.from({ length: 8 + Math.floor(Math.random() * 10) }, () => rnd(W)).join(" ");
  return w.charAt(0).toUpperCase() + w.slice(1) + ".";
};

const para = () => Array.from({ length: 4 + Math.floor(Math.random() * 4) }, sent).join(" ");

export default function LoremClient() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState("p");
  const [result, setResult] = useState("");

  const gen = () => {
    let r = "";
    if (type === "w") r = Array.from({ length: count }, () => rnd(W)).join(" ");
    else if (type === "s") r = Array.from({ length: count }, sent).join(" ");
    else r = Array.from({ length: count }, para).join("\n\n");
    setResult(r);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Lorem Ipsum Generator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Generate placeholder dummy text for your web designs, print layouts, and UI mockups instantly.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: ".75rem", alignItems: "center" }}>
          <input type="number" className="inp" value={count} min={1} max={20} onChange={e => setCount(+e.target.value)} style={{ width: 80 }} />
          <select className="inp" value={type} onChange={e => setType(e.target.value)} style={{ width: 140 }}>
            <option value="p">Paragraphs</option>
            <option value="s">Sentences</option>
            <option value="w">Words</option>
          </select>
          <button className="btn-gold" onClick={gen}>Generate</button>
        </div>
        {result && (
          <>
            <div className="res-box ok" style={{ whiteSpace: "pre-wrap", minHeight: 100 }}>{result}</div>
            <button className="btn-outline" onClick={() => navigator.clipboard.writeText(result)} style={{ marginTop: ".5rem" }}>Copy to Clipboard</button>
          </>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>What is Lorem Ipsum?</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ marginBottom: ".5rem" }}>Lorem Ipsum is a placeholder Latin text used in the printing and typesetting industry since the 15th century. It is the standard dummy text for web designers and developers to visualize content layouts.</div>
          <div style={{ padding: ".4rem .6rem", background: "rgba(212,160,23,.06)", borderRadius: 5, borderLeft: "2px solid #D4A017", fontStyle: "italic", fontSize: ".8rem" }}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Typical Use Cases</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["Web Design", "Visualizing text layouts and component spacing."], ["Print Design", "Creating realistic brochure and flyer mockups."], ["Presentations", "Placeholder content for slide templates."], ["App Development", "Testing UI responsiveness with dummy data."]].map(([t, d]) => (
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
          ["Is Lorem Ipsum a real language?", "No, it is a scrambled form of Latin that is intentionally meaningless, used to focus on typography."],
          ["How much dummy text can I generate?", "You can generate up to 20 paragraphs, sentences, or individual words per click."],
          ["How do I copy the generated output?", "Simply click the 'Copy to Clipboard' button to instantly save the text for your project."]
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
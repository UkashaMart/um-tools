"use client";
import { useState } from "react";

export default function JSONClient() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [ok, setOk] = useState(false);

  const run = (type: string) => {
    try {
      const p = JSON.parse(input);
      if (type === "f") {
        setResult(JSON.stringify(p, null, 2));
        setOk(true);
      } else if (type === "m") {
        setResult(JSON.stringify(p));
        setOk(true);
      } else {
        setResult("Valid JSON! " + (Array.isArray(p) ? "Array length: " + p.length : "Total Keys: " + Object.keys(p).length));
        setOk(true);
      }
    } catch (e: any) {
      setResult("Invalid JSON: " + e.message);
      setOk(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>JSON Formatter and Validator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Beautify, minify, and validate your JSON data instantly — a free professional utility tool for developers.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea className="inp" rows={6} placeholder='Paste your JSON code here...' value={input} onChange={e => setInput(e.target.value)} style={{ resize: "vertical", fontFamily: "monospace", fontSize: ".82rem", marginBottom: ".6rem" }} />
        <div style={{ display: "flex", gap: ".6rem" }}>
          <button className="btn-gold" onClick={() => run("f")}>Beautify</button>
          <button className="btn-gold" onClick={() => run("m")}>Minify</button>
          <button className="btn-outline" onClick={() => run("v")}>Validate</button>
        </div>
        {result && (
          <>
            <div className={`res-box${ok ? " ok" : ""}`} style={{ fontFamily: "monospace", fontSize: ".8rem", whiteSpace: "pre-wrap", maxHeight: 300, overflowY: "auto", marginTop: ".75rem" }}>{result}</div>
            {ok && <button className="btn-outline" onClick={() => navigator.clipboard.writeText(result)} style={{ marginTop: ".5rem" }}>Copy to Clipboard</button>}
          </>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>What is JSON?</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ marginBottom: ".5rem" }}>JSON (JavaScript Object Notation) is a lightweight, human-readable data interchange format widely used in Web APIs, backend databases, and configuration files.</div>
          <div style={{ padding: ".5rem .75rem", background: "rgba(0,0,0,.3)", borderRadius: 7, fontFamily: "monospace", fontSize: ".8rem", color: "#F0E6C8" }}>
            {`{\n  "name": "John Doe",\n  "city": "New York",\n  "age": 25\n}`}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Common JSON Syntax Errors</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78" }}>
          {[
            ["Missing Comma", "Ensure commas separate all key-value property pairs."],
            ["Single Quotes", "JSON standard requires double quotes for all keys and string values."],
            ["Trailing Comma", "The final element in an object or array cannot be followed by a comma."],
            ["Unquoted Keys", "All property keys must be strictly wrapped in double quotes."]
          ].map(([err, desc]) => (
            <div key={err} style={{ marginBottom: ".5rem", paddingBottom: ".5rem", borderBottom: "1px solid rgba(212,160,23,.1)" }}>
              <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#ef4444", marginBottom: ".15rem" }}>{err}</div>
              <div style={{ fontSize: ".76rem", color: "#9A8F78" }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is this JSON formatter tool free to use?", "Yes, it is entirely free, requires no user registration, and processes everything locally."],
          ["How do I validate my JSON structure?", "Simply paste your data and click the 'Validate' button — the tool will immediately confirm structure validity or highlight errors."],
          ["Why should I minify JSON?", "Minification removes unnecessary whitespace, reducing file size for optimized production loading speeds."]
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
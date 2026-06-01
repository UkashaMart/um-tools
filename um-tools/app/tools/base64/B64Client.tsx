"use client";
import { useState } from "react";

export default function B64Client() {
  const [input, setInput] = useState(""); 
  const [result, setResult] = useState(""); 
  const [err, setErr] = useState("");
  
  const run = (type: "e" | "d") => {
    try {
      setErr("");
      const r = type === "e" 
        ? btoa(unescape(encodeURIComponent(input))) 
        : decodeURIComponent(escape(atob(input)));
      setResult(r);
    } catch (e) {
      setErr("Error: " + (type === "d" ? "Invalid Base64 string" : "Cannot encode this text"));
      setResult("");
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Base64 Encoder / Decoder</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Easily encode plain text into Base64 format or decode Base64 strings back to original plain text.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea className="inp" rows={4} placeholder="Enter your text or Base64 string here..." value={input} onChange={e => setInput(e.target.value)} style={{ resize: "vertical", marginBottom: ".6rem" }} />
        <div style={{ display: "flex", gap: ".6rem" }}>
          <button className="btn-gold" onClick={() => run("e")}>Encode to Base64</button>
          <button className="btn-gold" onClick={() => run("d")}>Decode from Base64</button>
        </div>
        {err && <div style={{ color: "#ef4444", fontSize: ".8rem", marginTop: ".5rem" }}>{err}</div>}
        {result && (
          <>
            <div className="res-box ok" style={{ wordBreak: "break-all", marginTop: ".75rem" }}>{result}</div>
            <button className="btn-outline" onClick={() => navigator.clipboard.writeText(result)} style={{ marginTop: ".5rem" }}>Copy</button>
          </>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Base64 Conversion Example</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ padding: ".5rem .75rem", background: "rgba(212,160,23,.06)", borderRadius: 7, fontFamily: "monospace", fontSize: ".8rem" }}>
            <div>Input Text: <span style={{ color: "#F0E6C8" }}>Hello Pakistan</span></div>
            <div>Base64 Result: <span style={{ color: "#F5C842" }}>SGVsbG8gUGFraXN0YW4=</span></div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Common Uses of Base64</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[
            ["Email Attachments", "Encoding binary files to safe text formats for MIME transmissions."],
            ["API Communications", "Transferring complex text or binary data blocks smoothly across networks."],
            ["Web Optimization", "Embedding small media assets or images directly inside inline CSS or HTML."],
            ["Authentication Headers", "Structuring basic credentials securely inside standard HTTP Authorization headers."],
            ["JWT Format tokens", "Constructing data payloads neatly within JSON Web Tokens."]
          ].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".5rem" }}>Important Security Note</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", padding: ".5rem .75rem", background: "rgba(239,68,68,.06)", borderRadius: 7, borderLeft: "2px solid #ef4444" }}>
          Base64 is a data encoding method, NOT a secure encryption standard! Anyone can easily decode it. Never use it to store or hide sensitive passwords or confidential information.
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is Base64 secure for data privacy?", "No, Base64 is only an encoding mechanism, not encryption. Anyone can decode a Base64 string instantly. For security or hashing purposes, use modern standards like AES or SHA-256."],
          ["What kind of text strings can I encode?", "You can encode virtually any text, data object configurations, structured JSON formats, query strings, or standard web URLs without compatibility issues."],
          ["How do I identify a standard Base64 string?", "Base64 strings generally contain character sets ranging from A-Z, a-z, 0-9, along with +, /, and frequently end with one or two padding characters (= or ==)."]
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
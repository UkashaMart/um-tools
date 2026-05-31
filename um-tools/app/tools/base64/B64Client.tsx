"use client";
import { useState } from "react";
export default function B64Client() {
  const [input,setInput]=useState(""); const [result,setResult]=useState(""); const [err,setErr]=useState("");
  const run=(type:"e"|"d")=>{
    try{setErr("");
      const r=type==="e"?btoa(unescape(encodeURIComponent(input))):decodeURIComponent(escape(atob(input)));
      setResult(r);}
    catch(e){setErr("Error: "+(type==="d"?"Invalid Base64 string":"Cannot encode this text"));setResult("");}
  };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Base64 Encoder / Decoder</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Text ko Base64 mein encode karo ya Base64 ko original text mein decode karo</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <textarea className="inp" rows={4} placeholder="Text ya Base64 string yahan..." value={input} onChange={e=>setInput(e.target.value)} style={{ resize:"vertical", marginBottom:".6rem" }} />
        <div style={{ display:"flex", gap:".6rem" }}>
          <button className="btn-gold" onClick={()=>run("e")}>Encode to Base64</button>
          <button className="btn-gold" onClick={()=>run("d")}>Decode from Base64</button>
        </div>
        {err && <div style={{ color:"#ef4444", fontSize:".8rem", marginTop:".5rem" }}>{err}</div>}
        {result && (
          <>
            <div className="res-box ok" style={{ wordBreak:"break-all", marginTop:".75rem" }}>{result}</div>
            <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}>Copy</button>
          </>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Base64 Example</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ padding:".5rem .75rem", background:"rgba(212,160,23,.06)", borderRadius:7, fontFamily:"monospace", fontSize:".8rem" }}>
            <div>Input: <span style={{ color:"#F0E6C8" }}>Hello Pakistan</span></div>
            <div>Encoded: <span style={{ color:"#F5C842" }}>SGVsbG8gUGFraXN0YW4=</span></div>
          </div>
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Base64 Kahan Use Hota Hai?</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[["Emails","Attachments encode karna"],["APIs","Data transfer mein"],["Web","Images CSS mein embed"],["Auth","Basic auth headers"],["JWT","JSON Web Tokens"]].map(([t,d])=>(
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".5rem" }}>Important Note</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", padding:".5rem .75rem", background:"rgba(239,68,68,.06)", borderRadius:7, borderLeft:"2px solid #ef4444" }}>
          Base64 encoding hai, encryption nahi! Sensitive passwords ya private data ke liye use mat karein.
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["Base64 secure hai?","Nahi! Base64 sirf encoding hai. Koi bhi decode kar sakta hai. Encryption ke liye AES use karein."],["Koi bhi text encode kar sakte hain?","Haan, plain text, JSON, URLs sab encode kar sakte hain."],["Base64 string kaise pehchanen?","Aksar = ya == se end hoti hai aur A-Z, a-z, 0-9, +, / characters hote hain."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";
export default function DupClient() {
  const [input, setInput] = useState(""); const [result, setResult] = useState(""); const [removed, setRemoved] = useState(0); const [ci, setCi] = useState(false);
  const run = () => { const lines = input.split("\n"); const seen = new Set<string>(); const out: string[] = []; let dup = 0; lines.forEach(l=>{ const k=ci?l.toLowerCase():l; if(!seen.has(k)){seen.add(k);out.push(l);}else dup++; }); setResult(out.join("\n")); setRemoved(dup); };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Duplicate Line Remover</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Duplicate lines hatao instantly</p>
      <div className="card">
        <textarea className="inp" rows={6} placeholder="Har line alag likho..." value={input} onChange={e=>setInput(e.target.value)} style={{ resize:"vertical" }} />
        <div style={{ display:"flex", gap:".75rem", alignItems:"center", marginTop:".6rem", flexWrap:"wrap" }}>
          <button className="btn-gold" onClick={run}>Remove Duplicates</button>
          <label style={{ display:"flex", alignItems:"center", gap:".4rem", fontSize:".8rem", cursor:"pointer" }}>
            <input type="checkbox" checked={ci} onChange={e=>setCi(e.target.checked)} style={{ accentColor:"#D4A017" }} /> Case insensitive
          </label>
        </div>
        {result && (
          <>
            {removed > 0 && <div style={{ fontSize:".75rem", color:"#F5C842", marginTop:".4rem" }}>{removed} duplicate lines removed!</div>}
            <div className="res-box ok" style={{ whiteSpace:"pre-wrap", minHeight:80, marginTop:".5rem" }}>{result}</div>
            <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}><i className="ti ti-copy" /> Copy</button>
          </>
        )}
      </div>
    </div>
  );
}

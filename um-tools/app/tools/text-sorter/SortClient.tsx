"use client";
import { useState } from "react";
export default function SortClient() {
  const [input, setInput] = useState(""); const [result, setResult] = useState("");
  const sort = (type: string) => { const lines = input.split("\n").filter(l=>l.trim()); let out: string[];
    if(type==="az") out=[...lines].sort((a,b)=>a.localeCompare(b));
    else if(type==="za") out=[...lines].sort((a,b)=>b.localeCompare(a));
    else if(type==="len") out=[...lines].sort((a,b)=>a.length-b.length);
    else out=[...lines].sort(()=>Math.random()-.5);
    setResult(out.join("\n")); };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Text Sorter</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Lines sort karo different ways</p>
      <div className="card">
        <textarea className="inp" rows={6} placeholder="Har line alag likho..." value={input} onChange={e=>setInput(e.target.value)} style={{ resize:"vertical" }} />
        <div style={{ display:"flex", gap:".5rem", flexWrap:"wrap", marginTop:".6rem" }}>
          {[["az","A → Z"],["za","Z → A"],["len","By Length"],["rand","Shuffle"]].map(([t,l])=>(
            <button key={t} className="btn-gold" onClick={()=>sort(t)}>{l}</button>
          ))}
        </div>
        {result && (
          <>
            <div className="res-box ok" style={{ whiteSpace:"pre-wrap", minHeight:80 }}>{result}</div>
            <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}><i className="ti ti-copy" /> Copy</button>
          </>
        )}
      </div>
    </div>
  );
}

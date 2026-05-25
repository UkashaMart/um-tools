"use client";
import { useState } from "react";
export default function PwClient() {
  const [len,setLen]=useState(16);
  const [upper,setUpper]=useState(true); const [lower,setLower]=useState(true);
  const [nums,setNums]=useState(true); const [syms,setSyms]=useState(false);
  const [pw,setPw]=useState(""); const [copied,setCopied]=useState(false);
  const gen=()=>{
    let c=""; if(upper)c+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; if(lower)c+="abcdefghijklmnopqrstuvwxyz"; if(nums)c+="0123456789"; if(syms)c+="!@#$%^&*()_+-=[]{}"; if(!c)c="abcdefghijklmnopqrstuvwxyz";
    setPw(Array.from({length:len},()=>c[Math.floor(Math.random()*c.length)]).join("")); setCopied(false);
  };
  const copy=()=>{navigator.clipboard.writeText(pw);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  const str=len<8?"Weak":len<12?"Fair":len<16?"Good":"Strong";
  const strCol=len<8?"#ef4444":len<12?"#f59e0b":len<16?"#3b82f6":"#22c55e";
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Password Generator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Strong secure password banao</p>
      <div className="card">
        <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".75rem" }}>
          <span style={{ fontSize:".8rem", color:"#9A8F78", width:50 }}>Length:</span>
          <input type="range" min={6} max={64} value={len} onChange={e=>setLen(+e.target.value)} style={{ flex:1 }} />
          <span style={{ color:"#F5C842", minWidth:24 }}>{len}</span>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:".75rem" }}>
          {[[upper,setUpper,"A-Z Uppercase"],[lower,setLower,"a-z Lowercase"],[nums,setNums,"0-9 Numbers"],[syms,setSyms,"!@# Symbols"]].map(([val,fn,label]:any)=>(
            <label key={label} style={{ display:"flex", alignItems:"center", gap:".35rem", fontSize:".8rem", cursor:"pointer" }}>
              <input type="checkbox" checked={val} onChange={e=>fn(e.target.checked)} style={{ accentColor:"#D4A017" }} />{label}
            </label>
          ))}
        </div>
        <div style={{ display:"flex", gap:".6rem", alignItems:"center", marginBottom:".6rem" }}>
          <button className="btn-gold" onClick={gen}><i className="ti ti-refresh" /> Generate</button>
          {pw && <span style={{ fontSize:".75rem", color:strCol, border:`1px solid ${strCol}`, padding:"2px 8px", borderRadius:5 }}>{str}</span>}
        </div>
        {pw && (
          <>
            <div className="res-box ok" style={{ fontFamily:"monospace", fontSize:".95rem", letterSpacing:1 }}>{pw}</div>
            <button className="btn-outline" onClick={copy} style={{ marginTop:".5rem" }}>
              <i className={`ti ${copied?"ti-check":"ti-copy"}`} /> {copied?"Copied!":"Copy Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

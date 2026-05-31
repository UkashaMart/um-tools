"use client";
import { useState } from "react";
export default function PwClient() {
  const [len,setLen]=useState(16);
  const [upper,setUpper]=useState(true); const [lower,setLower]=useState(true);
  const [nums,setNums]=useState(true); const [syms,setSyms]=useState(false);
  const [pw,setPw]=useState(""); const [copied,setCopied]=useState(false);
  const gen=()=>{
    let c="";
    if(upper)c+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(lower)c+="abcdefghijklmnopqrstuvwxyz";
    if(nums)c+="0123456789";
    if(syms)c+="!@#$%^&*()_+-=[]{}";
    if(!c)c="abcdefghijklmnopqrstuvwxyz";
    setPw(Array.from({length:len},()=>c[Math.floor(Math.random()*c.length)]).join(""));
    setCopied(false);
  };
  const copy=()=>{navigator.clipboard.writeText(pw);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  const str=len<8?"Weak":len<12?"Fair":len<16?"Good":"Strong";
  const strCol=len<8?"#ef4444":len<12?"#f59e0b":len<16?"#3b82f6":"#22c55e";
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Password Generator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Strong aur secure password banao - apna account hack hone se bachao</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
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
          <button className="btn-gold" onClick={gen}>Generate</button>
          {pw && <span style={{ fontSize:".75rem", color:strCol, border:`1px solid ${strCol}`, padding:"2px 8px", borderRadius:5 }}>{str}</span>}
        </div>
        {pw && (
          <>
            <div className="res-box ok" style={{ fontFamily:"monospace", fontSize:".95rem", letterSpacing:1 }}>{pw}</div>
            <button className="btn-outline" onClick={copy} style={{ marginTop:".5rem" }}>
              {copied ? "Copied!" : "Copy Password"}
            </button>
          </>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Strong Password Tips</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:".6rem" }}>
          {[["12+ characters","Lambi password zyada secure hoti hai"],["Mixed case","Uppercase aur lowercase dono use karein"],["Numbers add karein","Digits se password strong hoti hai"],["Symbols use karein","!@#$ se hackers ko mushkil hoti hai"],["Unique rakhein","Har account ke liye alag password"],["Regular change","3-6 mahine mein password badlein"]].map(([title,desc])=>(
            <div key={title} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{title}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Common Password Mistakes</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ color:"#ef4444" }}>123456 - Duniya ka sabse common password</div>
          <div style={{ color:"#ef4444" }}>password - Second most common</div>
          <div style={{ color:"#ef4444" }}>Apna naam ya date of birth</div>
          <div style={{ color:"#ef4444" }}>qwerty - Keyboard pattern</div>
          <div style={{ color:"#ef4444" }}>Purana password thoda modify karna</div>
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["Password save hota hai?","Nahi! Password sirf browser mein generate hota hai. Koi data save nahi hota."],["Kitna strong password chahiye?","Kam se kam 12 characters, uppercase + lowercase + numbers + symbols."],["Password manager use karein?","Haan! Bitwarden ya 1Password free mein use kar sakte hain."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
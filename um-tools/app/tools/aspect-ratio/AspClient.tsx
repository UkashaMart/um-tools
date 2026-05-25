"use client";
import { useState } from "react";
export default function AspClient() {
  const [ow,setOw]=useState(""); const [oh,setOh]=useState(""); const [nw,setNw]=useState("");
  const ratio=+oh/+ow; const nh=nw&&ow&&oh?Math.round(+nw*ratio):0;
  const gcd=(a:number,b:number):number=>b?gcd(b,a%b):a;
  const g=+ow&&+oh?gcd(+ow,+oh):1;
  const rStr=+ow&&+oh?`${+ow/g}:${+oh/g}`:"";
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Aspect Ratio Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Image dimensions maintain karo</p>
      <div className="card">
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".6rem" }}>Original Size</div>
        <div style={{ display:"flex", gap:".6rem", alignItems:"center", flexWrap:"wrap", marginBottom:".75rem" }}>
          <input type="number" className="inp" placeholder="Width (px)" value={ow} onChange={e=>setOw(e.target.value)} />
          <span style={{ color:"#9A8F78" }}>×</span>
          <input type="number" className="inp" placeholder="Height (px)" value={oh} onChange={e=>setOh(e.target.value)} />
        </div>
        {rStr && <div style={{ fontSize:".8rem", color:"#F5C842", marginBottom:".75rem" }}>Aspect Ratio: <strong>{rStr}</strong></div>}
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".6rem" }}>New Width chahiye?</div>
        <div style={{ display:"flex", gap:".6rem", alignItems:"center", flexWrap:"wrap" }}>
          <input type="number" className="inp" placeholder="New Width (px)" value={nw} onChange={e=>setNw(e.target.value)} />
          <span style={{ color:"#9A8F78" }}>→</span>
          <input type="number" className="inp" value={nh||""} placeholder="Height (auto)" readOnly style={{ background:"rgba(212,160,23,.05)" }} />
        </div>
        {nh>0 && (
          <div style={{ fontSize:".8rem", color:"#9A8F78", marginTop:".6rem", padding:".4rem .6rem", background:"rgba(212,160,23,.06)", borderRadius:5, borderLeft:"2px solid #D4A017" }}>
            New size: {nw}×{nh}px (Ratio: {rStr})
          </div>
        )}
      </div>
    </div>
  );
}

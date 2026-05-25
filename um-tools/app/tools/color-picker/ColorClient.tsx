"use client";
import { useState } from "react";
function hexToRgb(h:string){h=h.replace("#","");if(h.length===3)h=h.split("").map(c=>c+c).join("");return{r:parseInt(h.substr(0,2),16),g:parseInt(h.substr(2,2),16),b:parseInt(h.substr(4,2),16)};}
function rgbToHsl(r:number,g:number,b:number){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0,s=0,l=(mx+mn)/2;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;}return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};}
export default function ColorClient() {
  const [hex,setHex]=useState("#D4A017");
  const valid=/^#[0-9A-Fa-f]{6}$/.test(hex);
  const {r,g,b}=valid?hexToRgb(hex):{r:0,g:0,b:0};
  const {h,s,l}=valid?rgbToHsl(r,g,b):{h:0,s:0,l:0};
  const rgb=`rgb(${r}, ${g}, ${b})`; const hsl=`hsl(${h}, ${s}%, ${l}%)`;
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Color Picker & Converter</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>HEX ↔ RGB ↔ HSL convert karo</p>
      <div className="card">
        <div style={{ display:"flex", gap:".6rem", alignItems:"center", marginBottom:".75rem" }}>
          <input type="color" value={valid?hex:"#000000"} onChange={e=>{setHex(e.target.value);}} style={{ width:56,height:40,border:"none",background:"none",cursor:"pointer",borderRadius:7 }} />
          <input type="text" className="inp" value={hex} onChange={e=>setHex(e.target.value)} placeholder="#HEX" style={{ maxWidth:140 }} />
          {valid && <div style={{ width:56,height:40,borderRadius:8,border:"1px solid rgba(212,160,23,.2)",background:hex }} />}
        </div>
        {valid && (
          <>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:".6rem" }}>
              {[[`${r}, ${g}, ${b}`,"RGB"],[`${h}°, ${s}%, ${l}%`,"HSL"],[hex.toUpperCase(),"HEX"]].map(([v,k])=>(
                <div key={k} className="stat-box"><div style={{ fontSize:".9rem", fontWeight:600, color:"#F5C842" }}>{v}</div><div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{k}</div></div>
              ))}
            </div>
            <div style={{ display:"flex", gap:".5rem", flexWrap:"wrap" }}>
              <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(rgb)}><i className="ti ti-copy" /> RGB</button>
              <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(hsl)}><i className="ti ti-copy" /> HSL</button>
              <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(hex.toUpperCase())}><i className="ti ti-copy" /> HEX</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

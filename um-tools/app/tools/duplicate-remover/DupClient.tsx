"use client";
import { useState } from "react";
export default function DupClient() {
  const [input,setInput]=useState(""); const [result,setResult]=useState(""); const [removed,setRemoved]=useState(0); const [ci,setCi]=useState(false);
  const run=()=>{const lines=input.split("\n");const seen=new Set<string>();const out:string[]=[];let dup=0;lines.forEach(l=>{const k=ci?l.toLowerCase():l;if(!seen.has(k)){seen.add(k);out.push(l);}else dup++;});setResult(out.join("\n"));setRemoved(dup);};
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Duplicate Line Remover</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Text se duplicate lines instantly remove karo - email lists, data cleaning ke liye perfect</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <textarea className="inp" rows={6} placeholder="Har line alag likho..." value={input} onChange={e=>setInput(e.target.value)} style={{ resize:"vertical", marginBottom:".6rem" }} />
        <div style={{ display:"flex", gap:".75rem", alignItems:"center", flexWrap:"wrap" }}>
          <button className="btn-gold" onClick={run}>Remove Duplicates</button>
          <label style={{ display:"flex", alignItems:"center", gap:".4rem", fontSize:".8rem", cursor:"pointer" }}>
            <input type="checkbox" checked={ci} onChange={e=>setCi(e.target.checked)} style={{ accentColor:"#D4A017" }} /> Case insensitive
          </label>
        </div>
        {result && (
          <>
            {removed > 0 && <div style={{ fontSize:".75rem", color:"#4ade80", marginTop:".4rem" }}>{removed} duplicate lines removed!</div>}
            <div className="res-box ok" style={{ whiteSpace:"pre-wrap", minHeight:80, marginTop:".5rem" }}>{result}</div>
            <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}>Copy</button>
          </>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Duplicate Remover Kab Use Karein?</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[["Email Lists","Newsletter mein duplicate emails hatao"],["Data Cleaning","Excel/CSV duplicate entries remove karo"],["Code","Repeated imports ya variables hatao"],["Word Lists","Dictionary lists clean karo"],["Phone Numbers","Duplicate contacts remove karo"],["URLs","Duplicate links hatao"]].map(([t,d])=>(
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Case Insensitive Kya Hota Hai?</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".4rem" }}>Case insensitive ON karne se "Ali" aur "ali" ko same treat kiya jata hai - dono remove ho jayenge.</div>
          <div>Case insensitive OFF mein "Ali" aur "ali" alag hain - sirf exact duplicates remove honge.</div>
        </div>
      </div>
    </div>
  );
}
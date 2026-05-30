"use client";
import { useState } from "react";
export default function SortClient() {
  const [input,setInput]=useState(""); const [result,setResult]=useState("");
  const sort=(type:string)=>{const lines=input.split("\n").filter(l=>l.trim());let out:string[];
    if(type==="az")out=[...lines].sort((a,b)=>a.localeCompare(b));
    else if(type==="za")out=[...lines].sort((a,b)=>b.localeCompare(a));
    else if(type==="len")out=[...lines].sort((a,b)=>a.length-b.length);
    else out=[...lines].sort(()=>Math.random()-.5);
    setResult(out.join("\n"));};
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Text Sorter</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Lines ko A-Z, Z-A, length ke hisaab se sort karo ya randomly shuffle karo</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <textarea className="inp" rows={6} placeholder="Har line alag likho..." value={input} onChange={e=>setInput(e.target.value)} style={{ resize:"vertical", marginBottom:".6rem" }} />
        <div style={{ display:"flex", gap:".5rem", flexWrap:"wrap" }}>
          {[["az","A to Z"],["za","Z to A"],["len","By Length"],["rand","Shuffle"]].map(([t,l])=>(
            <button key={t} className="btn-gold" onClick={()=>sort(t)}>{l}</button>
          ))}
        </div>
        {result && (
          <>
            <div className="res-box ok" style={{ whiteSpace:"pre-wrap", minHeight:80, marginTop:".75rem" }}>{result}</div>
            <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}>Copy</button>
          </>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Sorting Options</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[["A to Z","Alphabetical ascending order"],["Z to A","Reverse alphabetical order"],["By Length","Choti lines pehle, lambi baad"],["Shuffle","Randomly mix karo"]].map(([t,d])=>(
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Text Sorter Use Cases</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div>- Name lists alphabetically arrange karna</div>
          <div>- Country/city dropdown ke liye sorted list</div>
          <div>- Product catalog organize karna</div>
          <div>- To-do list priority se arrange karna</div>
          <div>- Vocabulary lists sort karna</div>
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["Sorting free hai?","Haan bilkul free hai."],["Kitni lines sort kar sakta hai?","Koi limit nahi."],["Case sensitive sorting hai?","Haan, uppercase pehle aati hai lowercase se."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";
const W = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur"];
const rnd=(a:string[])=>a[Math.floor(Math.random()*a.length)];
const sent=()=>{const w=Array.from({length:8+Math.floor(Math.random()*10)},()=>rnd(W)).join(" ");return w.charAt(0).toUpperCase()+w.slice(1)+".";};
const para=()=>Array.from({length:4+Math.floor(Math.random()*4)},sent).join(" ");
export default function LoremClient() {
  const [count,setCount]=useState(3); const [type,setType]=useState("p"); const [result,setResult]=useState("");
  const gen=()=>{
    let r="";
    if(type==="w")r=Array.from({length:count},()=>rnd(W)).join(" ");
    else if(type==="s")r=Array.from({length:count},sent).join(" ");
    else r=Array.from({length:count},para).join("\n\n");
    setResult(r);
  };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Lorem Ipsum Generator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Web design aur print layouts ke liye placeholder text generate karo</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem", alignItems:"center" }}>
          <input type="number" className="inp" value={count} min={1} max={20} onChange={e=>setCount(+e.target.value)} style={{ width:80 }} />
          <select className="inp" value={type} onChange={e=>setType(e.target.value)} style={{ width:140 }}>
            <option value="p">Paragraphs</option>
            <option value="s">Sentences</option>
            <option value="w">Words</option>
          </select>
          <button className="btn-gold" onClick={gen}>Generate</button>
        </div>
        {result && (
          <>
            <div className="res-box ok" style={{ whiteSpace:"pre-wrap", minHeight:100 }}>{result}</div>
            <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}>Copy</button>
          </>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Lorem Ipsum Kya Hai?</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".5rem" }}>Lorem Ipsum Latin text hai jo 45 BC se use ho raha hai. Web designers aur developers layout test karne ke liye yeh dummy text use karte hain.</div>
          <div style={{ padding:".4rem .6rem", background:"rgba(212,160,23,.06)", borderRadius:5, borderLeft:"2px solid #D4A017", fontStyle:"italic", fontSize:".8rem" }}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          </div>
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Kab Use Karein?</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[["Web Design","Layout test karne ke liye"],["Print Design","Brochure mockups ke liye"],["Presentations","Slide placeholders"],["App Development","UI testing ke liye"]].map(([t,d])=>(
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["Lorem Ipsum real language hai?","Nahi! Yeh Latin text hai jo intentionally meaningless hai."],["Kitne paragraphs generate kar sakte hain?","1 se 20 tak paragraphs, sentences ya words."],["Generated text copy kaise karein?","Copy button se ek click mein clipboard mein."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
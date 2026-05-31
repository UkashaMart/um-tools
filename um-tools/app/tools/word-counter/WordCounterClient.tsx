"use client";
import { useState } from "react";
export default function WordCounterClient() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const noSpace = text.replace(/\s/g, "").length;
  const lines = text ? text.split("\n").length : 0;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  const readTime = Math.max(1, Math.ceil(words / 200));
  const stats = [
    { v: words, k: "Words" }, { v: chars, k: "Characters" }, { v: noSpace, k: "No Spaces" },
    { v: lines, k: "Lines" }, { v: sentences, k: "Sentences" }, { v: paragraphs, k: "Paragraphs" },
    { v: readTime + " min", k: "Read Time" },
  ];
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Word and Character Counter</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Real-time text analysis - words, characters, sentences aur paragraphs count karo</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <textarea className="inp" rows={8} placeholder="Yahan text paste karo..." value={text} onChange={(e) => setText(e.target.value)} style={{ resize:"vertical", minHeight:160 }} />
        <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginTop:".75rem" }}>
          {stats.map(({ v, k }) => (
            <div key={k} className="stat-box">
              <div style={{ fontSize:"1.2rem", fontWeight:600, color:"#F5C842" }}>{v}</div>
              <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{k}</div>
            </div>
          ))}
        </div>
        {text && <button className="btn-outline" style={{ marginTop:".75rem" }} onClick={() => setText("")}>Clear</button>}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Word Counter Kaise Use Karein?</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".4rem" }}>1. Apna text upar text area mein paste karein ya type karein</div>
          <div style={{ marginBottom:".4rem" }}>2. Results automatically real-time mein update honge</div>
          <div style={{ marginBottom:".4rem" }}>3. Words, characters, sentences, paragraphs aur reading time dekhein</div>
          <div>4. Clear button se text delete karein</div>
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Word Counter Kyun Zaroori Hai?</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[["Students","Assignments mein word limit track karo"],["Bloggers","SEO ke liye 1000+ words count karo"],["Writers","Daily word count track karo"],["Social Media","Character limits check karo"]].map(([t,d])=>(
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["Word counter free hai?","Haan bilkul free hai. Koi signup nahi chahiye."],["Data save hota hai?","Nahi. Text sirf browser mein rehta hai."],["Mobile par kaam karta hai?","Haan, mobile aur desktop dono par perfectly kaam karta hai."],["Kitna text count kar sakta hai?","Koi limit nahi! Jitna chahein utna text paste karein."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
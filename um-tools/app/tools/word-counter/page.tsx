"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n+/).filter(p => p.trim()).length;
  const readTime = Math.ceil(words / 200);

  return (
    <div style={{ maxWidth: 780 }}>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.5rem", color:"#F5C842", marginBottom:".3rem" }}>Word Counter</h1>
      <p style={{ fontSize:".85rem", color:"#9A8F78", marginBottom:"1.25rem" }}>
        Free online word counter tool. Count words, characters, sentences, paragraphs and reading time instantly.
      </p>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <textarea
          className="inp"
          rows={8}
          placeholder="Type or paste your text here..."
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ resize:"vertical", width:"100%" }}
        />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".6rem", marginTop:".75rem" }}>
          {[["Words", words],["Characters", chars],["No Spaces", charsNoSpace],["Sentences", sentences],["Paragraphs", paragraphs],["Read Time", readTime+"min"]].map(([l,v])=>(
            <div key={l} className="stat-box">
              <div style={{ fontSize:"1.3rem", fontWeight:700, color:"#F5C842" }}>{v}</div>
              <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
        {text && <button onClick={()=>setText("")} className="btn-gold" style={{ marginTop:".75rem", padding:".4rem 1rem", fontSize:".8rem" }}>Clear</button>}
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>How to Use Word Counter</h2>
        <div style={{ display:"grid", gap:".5rem" }}>
          {[
            ["1", "Type or paste your text in the box above"],
            ["2", "Results update automatically in real time"],
            ["3", "Click Clear to reset and start over"],
          ].map(([n,t])=>(
            <div key={n} style={{ display:"flex", gap:".75rem", alignItems:"flex-start" }}>
              <div style={{ background:"linear-gradient(135deg,#A07810,#D4A017)", color:"#111", borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:".7rem", fontWeight:700, flexShrink:0 }}>{n}</div>
              <p style={{ fontSize:".85rem", color:"#9A8F78", marginTop:2 }}>{t}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Features</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".5rem" }}>
          {["Real-time word count","Character count with and without spaces","Sentence and paragraph count","Reading time estimate","No signup required","100% free and private"].map(f=>(
            <div key={f} style={{ display:"flex", gap:".5rem", alignItems:"center" }}>
              <span style={{ color:"#22c55e", fontSize:".9rem" }}>✓</span>
              <span style={{ fontSize:".82rem", color:"#9A8F78" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Frequently Asked Questions</h2>
        <div style={{ display:"grid", gap:".75rem" }}>
          {[
            ["How does the word counter work?", "Our tool splits your text by spaces and counts each word in real time as you type. No need to click any button."],
            ["Does it count characters with spaces?", "Yes! We show both — characters with spaces and characters without spaces separately."],
            ["How is reading time calculated?", "Reading time is based on an average reading speed of 200 words per minute."],
            ["Is my text saved anywhere?", "No! Everything runs in your browser. Your text is never sent to any server."],
            ["Can I use it for SEO content?", "Absolutely! Most blog posts should be 1000-2000 words. Use this tool to check your content length before publishing."],
          ].map(([q,a])=>(
            <div key={q as string} style={{ borderLeft:"2px solid rgba(212,160,23,0.4)", paddingLeft:".75rem" }}>
              <div style={{ fontSize:".85rem", fontWeight:600, color:"#F0E6C8", marginBottom:".25rem" }}>{q}</div>
              <div style={{ fontSize:".8rem", color:"#9A8F78" }}>{a}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".5rem" }}>Why Use UM Tools Word Counter?</h2>
        <p style={{ fontSize:".85rem", color:"#9A8F78", lineHeight:1.8 }}>
          Whether you are a student checking essay length, a blogger optimizing for SEO, or a professional writing reports —
          our free word counter gives you instant, accurate results. No ads interrupting your work, no signup needed,
          and your text stays completely private. Trusted by writers, students and developers across Pakistan and worldwide.
        </p>
      </div>
    </div>
  );
}
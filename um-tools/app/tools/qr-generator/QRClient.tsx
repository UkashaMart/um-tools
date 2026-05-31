"use client";
import { useState, useRef } from "react";
export default function QRClient() {
  const [text,setText]=useState(""); const [size,setSize]=useState("200"); const [generated,setGenerated]=useState(false);
  const qrRef=useRef<HTMLDivElement>(null);
  const gen=async()=>{
    if(!text||!qrRef.current)return;
    qrRef.current.innerHTML="";
    const QRCode=(await import("qrcode")).default;
    const canvas=document.createElement("canvas");
    await QRCode.toCanvas(canvas,text,{width:+size,margin:2,color:{dark:"#000000",light:"#ffffff"}});
    qrRef.current.appendChild(canvas);
    setGenerated(true);
  };
  const download=()=>{
    if(!qrRef.current)return;
    const canvas=qrRef.current.querySelector("canvas");
    if(!canvas)return;
    const a=document.createElement("a");a.download="qr-code.png";a.href=canvas.toDataURL();a.click();
  };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>QR Code Generator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Koi bhi text ya URL ka QR code banao - PNG mein download karo bilkul free</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem" }}>
          <input type="text" className="inp" placeholder="URL ya text yahan likho..." value={text} onChange={e=>setText(e.target.value)} style={{ flex:1 }} onKeyDown={e=>e.key==="Enter"&&gen()} />
          <select className="inp" value={size} onChange={e=>setSize(e.target.value)} style={{ width:120 }}>
            <option value="128">128px</option>
            <option value="200">200px</option>
            <option value="300">300px</option>
          </select>
          <button className="btn-gold" onClick={gen}>Generate QR</button>
        </div>
        <div ref={qrRef} style={{ background:"#fff", display:"inline-block", borderRadius:8, padding:8 }} />
        {generated && (
          <div style={{ marginTop:".6rem" }}>
            <button className="btn-outline" onClick={download}>Download PNG</button>
          </div>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>QR Code Kahan Use Karein?</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[["Business","Website, WhatsApp, payment link share karein"],["WiFi","WiFi password QR se share karein"],["Business Card","Digital contact info share karein"],["Marketing","Flyers, banners, packaging par lagaein"],["Restaurant","Digital menu QR se share karein"],["Payment","EasyPaisa, JazzCash link share karein"]].map(([t,d])=>(
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>QR Code Tips</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div>1. Print mein minimum 2cm x 2cm size rakhein</div>
          <div>2. Generate karne ke baad test karein ke scan hota hai</div>
          <div>3. Lamba URL ke liye bit.ly use karein pehle</div>
          <div>4. Dark background par light QR avoid karein</div>
          <div>5. High resolution PNG download karein print ke liye</div>
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["QR code generator free hai?","Haan bilkul free hai. Koi signup ya payment nahi chahiye."],["QR code expire hota hai?","Nahi! QR code permanently kaam karta hai jab tak URL active hai."],["Kitna data store kar sakta hai?","Text, URL, contact info sab store kar sakta hai. URL ke liye best hai."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
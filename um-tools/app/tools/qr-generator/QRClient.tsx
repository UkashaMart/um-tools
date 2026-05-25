"use client";
import { useState, useRef, useEffect } from "react";
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
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Koi bhi text ya URL ka QR banao</p>
      <div className="card">
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem" }}>
          <input type="text" className="inp" placeholder="Text ya URL yahan..." value={text} onChange={e=>setText(e.target.value)} style={{ flex:1 }} />
          <select className="inp" value={size} onChange={e=>setSize(e.target.value)} style={{ width:120 }}>
            <option value="128">128px</option><option value="200">200px</option><option value="300">300px</option>
          </select>
          <button className="btn-gold" onClick={gen}><i className="ti ti-qrcode" /> Generate</button>
        </div>
        <div ref={qrRef} style={{ background:"#fff", display:"inline-block", borderRadius:8, padding:8, minHeight:generated?0:0 }} />
        {generated && (
          <div style={{ marginTop:".6rem" }}>
            <button className="btn-outline" onClick={download}><i className="ti ti-download" /> Download PNG</button>
          </div>
        )}
      </div>
    </div>
  );
}

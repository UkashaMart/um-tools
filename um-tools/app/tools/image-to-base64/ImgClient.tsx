"use client";
import { useState } from "react";
export default function ImgClient() {
  const [b64,setB64]=useState(""); const [size,setSize]=useState(""); const [type,setType]=useState("");
  const handle=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0];if(!f)return;
    setType(f.type);
    const reader=new FileReader();
    reader.onload=(ev)=>{const r=ev.target?.result as string;setB64(r);setSize((r.length/1024).toFixed(1)+" KB");};
    reader.readAsDataURL(f);
  };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Image to Base64 Converter</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Image ko Base64 string mein convert karo - HTML aur CSS mein embed karne ke liye</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".5rem" }}>Image Select Karo</div>
        <input type="file" className="inp" accept="image/*" onChange={handle} style={{ padding:".4rem", marginBottom:".75rem" }} />
        {b64 && (
          <div>
            <img src={b64} alt="preview" style={{ maxWidth:180,maxHeight:180,borderRadius:8,border:"1px solid rgba(212,160,23,.2)",display:"block",marginBottom:".75rem" }} />
            <div style={{ display:"flex", gap:".6rem", marginBottom:".5rem", fontSize:".75rem", color:"#9A8F78" }}>
              <span>Size: <strong style={{ color:"#F5C842" }}>{size}</strong></span>
              <span>Type: <strong style={{ color:"#F5C842" }}>{type}</strong></span>
            </div>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".4rem" }}>Base64 String</div>
            <div className="res-box ok" style={{ maxHeight:100,overflowY:"auto",fontFamily:"monospace",fontSize:".7rem",wordBreak:"break-all" }}>{b64}</div>
            <div style={{ display:"flex", gap:".5rem", marginTop:".5rem", flexWrap:"wrap" }}>
              <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(b64)}>Copy Base64</button>
              <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(`<img src="${b64}" alt="image" />`)}>Copy as IMG tag</button>
            </div>
          </div>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>HTML mein Kaise Use Karein?</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".5rem" }}>Image copy karne ke baad HTML mein aise use karein:</div>
          <div style={{ padding:".5rem .75rem", background:"rgba(0,0,0,.3)", borderRadius:7, fontFamily:"monospace", fontSize:".78rem", color:"#F0E6C8", wordBreak:"break-all" }}>
            {`<img src="data:image/png;base64,iVBOR..." />`}
          </div>
          <div style={{ marginTop:".5rem" }}>CSS mein background ke liye:</div>
          <div style={{ padding:".5rem .75rem", background:"rgba(0,0,0,.3)", borderRadius:7, fontFamily:"monospace", fontSize:".78rem", color:"#F0E6C8", marginTop:".3rem" }}>
            {`background: url("data:image/png;base64,...");`}
          </div>
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Kab Use Karein?</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[["Email Templates","External images block hoti hain"],["Small Icons","Logo ya favicon embed karo"],["Offline Apps","Internet ke bina images"],["CSS Sprites","HTTP requests bachao"]].map(([t,d])=>(
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".5rem" }}>Limitation</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", padding:".5rem .75rem", background:"rgba(239,68,68,.06)", borderRadius:7, borderLeft:"2px solid #ef4444" }}>
          Large images (100KB+) ke liye suitable nahi - page size bahut badh jati hai. Choti images ke liye best hai.
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["Konsi image formats supported hain?","PNG, JPG, GIF, WebP, SVG sab supported hain."],["Image data safe hai?","Haan! Image sirf aapke browser mein process hoti hai. Koi server par upload nahi hoti."],["Large image convert kar sakte hain?","Technically haan, lekin 100KB se badi images ke liye recommend nahi karte."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
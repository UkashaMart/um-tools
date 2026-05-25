"use client";
import { useState } from "react";
export default function ImgClient() {
  const [b64,setB64]=useState(""); const [size,setSize]=useState("");
  const handle=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0];if(!f)return;
    const reader=new FileReader();
    reader.onload=(ev)=>{const r=ev.target?.result as string;setB64(r);setSize((r.length/1024).toFixed(1)+" KB");};
    reader.readAsDataURL(f);
  };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Image → Base64 Converter</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Image ko Base64 string mein convert karo</p>
      <div className="card">
        <input type="file" className="inp" accept="image/*" onChange={handle} style={{ padding:".4rem" }} />
        {b64 && (
          <div style={{ marginTop:".75rem" }}>
            <img src={b64} alt="preview" style={{ maxWidth:180,maxHeight:180,borderRadius:8,border:"1px solid rgba(212,160,23,.2)",display:"block",marginBottom:".6rem" }} />
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".4rem" }}>Base64 String <span style={{ color:"#9A8F78" }}>({size})</span></div>
            <div className="res-box ok" style={{ maxHeight:100,overflowY:"auto",fontFamily:"monospace",fontSize:".7rem" }}>{b64}</div>
            <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(b64)} style={{ marginTop:".5rem" }}><i className="ti ti-copy" /> Copy Base64</button>
          </div>
        )}
      </div>
    </div>
  );
}

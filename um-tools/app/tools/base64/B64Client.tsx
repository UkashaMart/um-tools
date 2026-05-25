"use client";
import { useState } from "react";
export default function B64Client() {
  const [input,setInput]=useState(""); const [result,setResult]=useState(""); const [err,setErr]=useState("");
  const run=(type:"e"|"d")=>{
    try{setErr("");
      const r=type==="e"?btoa(unescape(encodeURIComponent(input))):decodeURIComponent(escape(atob(input)));
      setResult(r);}
    catch(e){setErr("Error: "+(type==="d"?"Invalid Base64 string":"Cannot encode this text"));setResult("");}
  };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Base64 Encoder / Decoder</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Text ↔ Base64 convert karo</p>
      <div className="card">
        <textarea className="inp" rows={4} placeholder="Text ya Base64 yahan..." value={input} onChange={e=>setInput(e.target.value)} style={{ resize:"vertical" }} />
        <div style={{ display:"flex", gap:".6rem", marginTop:".6rem" }}>
          <button className="btn-gold" onClick={()=>run("e")}><i className="ti ti-lock" /> Encode to Base64</button>
          <button className="btn-gold" onClick={()=>run("d")}><i className="ti ti-lock-open" /> Decode from Base64</button>
        </div>
        {err && <div style={{ color:"#ef4444", fontSize:".8rem", marginTop:".5rem" }}>{err}</div>}
        {result && (
          <>
            <div className="res-box ok" style={{ wordBreak:"break-all" }}>{result}</div>
            <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}><i className="ti ti-copy" /> Copy</button>
          </>
        )}
      </div>
    </div>
  );
}

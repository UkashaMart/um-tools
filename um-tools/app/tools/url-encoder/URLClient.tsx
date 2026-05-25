"use client";
import { useState } from "react";
export default function URLClient() {
  const [input,setInput]=useState(""); const [result,setResult]=useState(""); const [err,setErr]=useState("");
  const run=(type:"e"|"d")=>{try{setErr("");setResult(type==="e"?encodeURIComponent(input):decodeURIComponent(input));}catch(e:any){setErr("Error: "+e.message);setResult("");}};
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>URL Encoder / Decoder</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>URL ko encode ya decode karo</p>
      <div className="card">
        <textarea className="inp" rows={3} placeholder="URL ya text yahan..." value={input} onChange={e=>setInput(e.target.value)} style={{ resize:"vertical" }} />
        <div style={{ display:"flex", gap:".6rem", marginTop:".6rem" }}>
          <button className="btn-gold" onClick={()=>run("e")}>Encode URL</button>
          <button className="btn-gold" onClick={()=>run("d")}>Decode URL</button>
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

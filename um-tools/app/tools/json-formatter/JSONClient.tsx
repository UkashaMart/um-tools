"use client";
import { useState } from "react";
export default function JSONClient() {
  const [input,setInput]=useState(""); const [result,setResult]=useState(""); const [ok,setOk]=useState(false);
  const run=(type:string)=>{
    try{const p=JSON.parse(input);
      if(type==="f"){setResult(JSON.stringify(p,null,2));setOk(true);}
      else if(type==="m"){setResult(JSON.stringify(p));setOk(true);}
      else{setResult("Valid JSON! "+(Array.isArray(p)?"Array length: "+p.length:"Keys: "+Object.keys(p).length));setOk(true);}
    }catch(e:any){setResult("Invalid JSON: "+e.message);setOk(false);}
  };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>JSON Formatter and Validator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>JSON data ko format, beautify, minify aur validate karo online free</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <textarea className="inp" rows={6} placeholder='{"name":"Ali","city":"Lahore","age":25}' value={input} onChange={e=>setInput(e.target.value)} style={{ resize:"vertical", fontFamily:"monospace", fontSize:".82rem", marginBottom:".6rem" }} />
        <div style={{ display:"flex", gap:".6rem" }}>
          <button className="btn-gold" onClick={()=>run("f")}>Beautify</button>
          <button className="btn-gold" onClick={()=>run("m")}>Minify</button>
          <button className="btn-outline" onClick={()=>run("v")}>Validate</button>
        </div>
        {result && (
          <>
            <div className={`res-box${ok?" ok":""}`} style={{ fontFamily:"monospace", fontSize:".8rem", whiteSpace:"pre-wrap", maxHeight:300, overflowY:"auto", marginTop:".75rem" }}>{result}</div>
            {ok && <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}>Copy</button>}
          </>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>JSON Kya Hota Hai?</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".5rem" }}>JSON (JavaScript Object Notation) ek lightweight data format hai jo APIs, databases aur config files mein use hota hai.</div>
          <div style={{ padding:".5rem .75rem", background:"rgba(0,0,0,.3)", borderRadius:7, fontFamily:"monospace", fontSize:".8rem", color:"#F0E6C8" }}>
            {`{\n  "name": "Ali",\n  "city": "Karachi",\n  "age": 25\n}`}
          </div>
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Common JSON Errors</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78" }}>
          {[["Missing comma","Properties ke beech comma lagana zaroori hai"],["Single quotes","JSON mein double quotes use hoti hain"],["Trailing comma","Last item ke baad comma nahi lagta"],["Unquoted keys","Keys ko double quotes mein likhein"]].map(([err,desc])=>(
            <div key={err} style={{ marginBottom:".5rem", paddingBottom:".5rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
              <div style={{ fontSize:".82rem", fontWeight:600, color:"#ef4444", marginBottom:".15rem" }}>{err}</div>
              <div style={{ fontSize:".76rem", color:"#9A8F78" }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["JSON formatter free hai?","Haan bilkul free hai. Koi signup nahi chahiye."],["JSON validate kaise karein?","Validate button click karein - valid ya invalid instantly pata chalta hai."],["Minify kyun karein?","Production code mein size kam karne ke liye - faster loading."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
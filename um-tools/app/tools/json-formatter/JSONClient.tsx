"use client";
import { useState } from "react";
export default function JSONClient() {
  const [input,setInput]=useState(""); const [result,setResult]=useState(""); const [ok,setOk]=useState(false);
  const run=(type:string)=>{
    try{const p=JSON.parse(input);
      if(type==="f"){setResult(JSON.stringify(p,null,2));setOk(true);}
      else if(type==="m"){setResult(JSON.stringify(p));setOk(true);}
      else{setResult(`✓ Valid JSON! ${Array.isArray(p)?"Array length: "+p.length:"Keys: "+Object.keys(p).length}`);setOk(true);}
    }catch(e:any){setResult("✗ Invalid JSON: "+e.message);setOk(false);}
  };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>JSON Formatter</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>JSON format, validate aur minify karo</p>
      <div className="card">
        <textarea className="inp" rows={6} placeholder={'{"name":"Ali","city":"Faisalabad"}'} value={input} onChange={e=>setInput(e.target.value)} style={{ resize:"vertical", fontFamily:"monospace", fontSize:".82rem" }} />
        <div style={{ display:"flex", gap:".6rem", marginTop:".6rem" }}>
          <button className="btn-gold" onClick={()=>run("f")}>Beautify</button>
          <button className="btn-gold" onClick={()=>run("m")}>Minify</button>
          <button className="btn-outline" onClick={()=>run("v")}>Validate</button>
        </div>
        {result && (
          <>
            <div className={`res-box${ok?" ok":""}`} style={{ fontFamily:"monospace", fontSize:".8rem", whiteSpace:"pre-wrap", maxHeight:300, overflowY:"auto" }}>{result}</div>
            {ok && <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}><i className="ti ti-copy" /> Copy</button>}
          </>
        )}
      </div>
    </div>
  );
}

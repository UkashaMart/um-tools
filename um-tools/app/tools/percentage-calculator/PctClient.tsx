"use client";
import { useState } from "react";
export default function PctClient() {
  const [v, setV] = useState<Record<string,string>>({});
  const set = (k:string,val:string) => setV(p=>({...p,[k]:val}));
  const n = (k:string) => parseFloat(v[k])||0;
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Percentage Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>3 types of percentage calculations</p>
      {[
        { title:"X ka Y% kya hoga?", fields:[["p1x","Amount"],["p1y","Percent %"]], calc:()=>`${n("p1x")} ka ${n("p1y")}% = ${(n("p1x")*n("p1y")/100).toFixed(2)}` },
        { title:"A, B ka kitna % hai?", fields:[["p2a","Part"],["p2b","Total"]], calc:()=>`${n("p2a")} is ${(n("p2a")/n("p2b")*100).toFixed(2)}% of ${n("p2b")}` },
        { title:"X se Y tak % change?", fields:[["p3x","Old value"],["p3y","New value"]], calc:()=>{ const ch=((n("p3y")-n("p3x"))/n("p3x")*100).toFixed(2); return `${Number(ch)>=0?"Increase":"Decrease"}: ${Math.abs(+ch)}%  (${n("p3x")} → ${n("p3y")})`; } },
      ].map(({title,fields,calc})=>{
        const [res,setRes] = useState("");
        return (
          <div key={title} className="card" style={{ marginBottom:"1rem" }}>
            <div style={{ fontSize:".62rem", fontWeight:600, color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".6rem" }}>{title}</div>
            <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".6rem" }}>
              {fields.map(([k,ph])=>(
                <input key={k} type="number" className="inp" placeholder={ph} value={v[k]||""} onChange={e=>set(k,e.target.value)} />
              ))}
              <button className="btn-gold" onClick={()=>setRes(calc())}>Calculate</button>
            </div>
            {res && <div className="res-box ok">{res}</div>}
          </div>
        );
      })}
    </div>
  );
}

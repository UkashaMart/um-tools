"use client";
import { useState } from "react";
export default function EMIClient() {
  const [p,setP]=useState(""); const [r,setR]=useState(""); const [t,setT]=useState(""); const [res,setRes]=useState<null|{emi:number,tot:number,int:number}>(null);
  const calc = () => { const pv=+p,rv=+r/12/100,tv=+t; if(!pv||!rv||!tv)return; const emi=pv*rv*Math.pow(1+rv,tv)/(Math.pow(1+rv,tv)-1); setRes({emi:Math.round(emi),tot:Math.round(emi*tv),int:Math.round(emi*tv-pv)}); };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Loan EMI Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Monthly installment calculate karo</p>
      <div className="card">
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem" }}>
          {[[p,setP,"Loan Amount (PKR)","e.g. 1000000"],[r,setR,"Annual Interest Rate (%)","e.g. 18"],[t,setT,"Tenure (Months)","e.g. 36"]].map(([val,fn,label,ph]:any)=>(
            <div key={label} style={{ flex:1, minWidth:150 }}>
              <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".3rem" }}>{label}</div>
              <input type="number" className="inp" placeholder={ph} value={val} onChange={e=>fn(e.target.value)} />
            </div>
          ))}
        </div>
        <button className="btn-gold" onClick={calc}>Calculate EMI</button>
        {res && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginTop:".75rem" }}>
            {[[res.emi.toLocaleString(),"Monthly EMI (PKR)"],[res.tot.toLocaleString(),"Total Payment"],[res.int.toLocaleString(),"Total Interest"]].map(([v,k])=>(
              <div key={k} className="stat-box"><div style={{ fontSize:"1.1rem", fontWeight:600, color:"#F5C842" }}>{v}</div><div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{k}</div></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

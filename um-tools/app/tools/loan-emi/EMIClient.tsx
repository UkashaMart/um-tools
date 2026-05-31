"use client";
import { useState } from "react";
export default function EMIClient() {
  const [p,setP]=useState(""); const [r,setR]=useState(""); const [t,setT]=useState("");
  const [res,setRes]=useState<null|{emi:number,tot:number,int:number}>(null);
  const calc=()=>{
    const pv=+p,rv=+r/12/100,tv=+t;
    if(!pv||!rv||!tv)return;
    const emi=pv*rv*Math.pow(1+rv,tv)/(Math.pow(1+rv,tv)-1);
    setRes({emi:Math.round(emi),tot:Math.round(emi*tv),int:Math.round(emi*tv-pv)});
  };
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Loan EMI Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Monthly installment calculate karo - car loan, home loan, personal loan sab ke liye</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem" }}>
          {([[p,setP,"Loan Amount (PKR)","e.g. 1000000"],[r,setR,"Annual Rate %","e.g. 18"],[t,setT,"Months","e.g. 36"]] as [string,(v:string)=>void,string,string][]).map(([val,fn,label,ph])=>(
            <div key={label} style={{ flex:1, minWidth:150 }}>
              <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".3rem" }}>{label}</div>
              <input type="number" className="inp" placeholder={ph} value={val} onChange={e=>fn(e.target.value)} />
            </div>
          ))}
        </div>
        <button className="btn-gold" onClick={calc}>Calculate EMI</button>
        {res && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginTop:".75rem" }}>
            {[[res.emi.toLocaleString(),"Monthly EMI"],[res.tot.toLocaleString(),"Total Payment"],[res.int.toLocaleString(),"Total Interest"]].map(([v,k])=>(
              <div key={k} className="stat-box">
                <div style={{ fontSize:"1.1rem", fontWeight:600, color:"#F5C842" }}>{v}</div>
                <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{k}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>EMI Kya Hota Hai?</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".5rem" }}>EMI (Equated Monthly Installment) woh fixed amount hai jo aap har mahine bank ko dete hain. Isme principal aur interest dono shamil hote hain.</div>
          <div style={{ padding:".5rem .75rem", background:"rgba(212,160,23,.06)", borderRadius:7, fontFamily:"monospace", fontSize:".8rem", color:"#F0E6C8" }}>
            EMI = P x r x (1+r)^n / [(1+r)^n - 1]
          </div>
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Pakistan Banks Interest Rates 2026</h2>
        <div style={{ fontSize:".78rem", color:"#9A8F78" }}>
          {[["HBL","16-20%","14-18%"],["MCB","17-21%","15-19%"],["UBL","16-20%","14-17%"],["Meezan Bank","Islamic","Islamic"]].map(([bank,personal,home])=>(
            <div key={bank} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:".3rem .5rem", borderBottom:"1px solid rgba(212,160,23,.08)" }}>
              <strong style={{ color:"#F0E6C8" }}>{bank}</strong>
              <span>Personal: {personal}</span>
              <span>Home: {home}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Loan Lene Se Pehle Sochein</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div>1. Monthly EMI income ka 30% se zyada na ho</div>
          <div>2. Emergency fund pahle banao (3-6 mahine ka kharch)</div>
          <div>3. Islamic banking option check karein</div>
          <div>4. Multiple banks se quotes compare karein</div>
          <div>5. Prepayment penalty check karein</div>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";
export default function TaxClient() {
  const [salary,setSalary]=useState("");
  const m=+salary; const a=m*12;
  let tax=0,slab="";
  if(a>0){
    if(a<=600000){tax=0;slab="0–6 Lakh: Tax Free";}
    else if(a<=1200000){tax=(a-600000)*0.05;slab="6L–12L: 5% on excess over 6L";}
    else if(a<=2200000){tax=30000+(a-1200000)*0.15;slab="12L–22L: 30,000 + 15%";}
    else if(a<=3200000){tax=180000+(a-2200000)*0.25;slab="22L–32L: 180,000 + 25%";}
    else if(a<=4100000){tax=430000+(a-3200000)*0.30;slab="32L–41L: 430,000 + 30%";}
    else{tax=700000+(a-4100000)*0.35;slab="41L+: 700,000 + 35%";}
  }
  const mTax=Math.round(tax/12); const takeHome=m-mTax;
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Salary Tax Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Pakistan FBR Income Tax 2024-25</p>
      <div className="card">
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".6rem" }}>Monthly Salary (PKR)</div>
        <input type="number" className="inp" placeholder="e.g. 150000" value={salary} onChange={e=>setSalary(e.target.value)} style={{ maxWidth:250 }} />
        {m>0 && (
          <div style={{ marginTop:".75rem" }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:".6rem" }}>
              {[[Math.round(a).toLocaleString(),"Annual Salary"],[Math.round(tax).toLocaleString(),"Annual Tax"],[mTax.toLocaleString(),"Monthly Tax"],[takeHome.toLocaleString(),"Take-home/mo"]].map(([v,k])=>(
                <div key={k} className="stat-box"><div style={{ fontSize:"1rem", fontWeight:600, color:"#F5C842" }}>{v}</div><div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{k}</div></div>
              ))}
            </div>
            <div style={{ fontSize:".75rem", color:"#9A8F78", padding:".4rem .6rem", background:"rgba(212,160,23,.06)", borderRadius:5, borderLeft:"2px solid #D4A017" }}>Slab: {slab}</div>
          </div>
        )}
      </div>
    </div>
  );
}

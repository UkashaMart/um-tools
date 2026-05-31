"use client";
import { useState } from "react";
export default function TaxClient() {
  const [salary,setSalary]=useState("");
  const m=+salary; const a=m*12;
  let tax=0,slab="";
  if(a>0){
    if(a<=600000){tax=0;slab="0-6 Lakh: Tax Free";}
    else if(a<=1200000){tax=(a-600000)*0.05;slab="6L-12L: 5% on excess over 6L";}
    else if(a<=2200000){tax=30000+(a-1200000)*0.15;slab="12L-22L: 30,000 + 15%";}
    else if(a<=3200000){tax=180000+(a-2200000)*0.25;slab="22L-32L: 180,000 + 25%";}
    else if(a<=4100000){tax=430000+(a-3200000)*0.30;slab="32L-41L: 430,000 + 30%";}
    else{tax=700000+(a-4100000)*0.35;slab="41L+: 700,000 + 35%";}
  }
  const mTax=Math.round(tax/12); const takeHome=m-mTax;
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Salary Tax Calculator Pakistan</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>FBR Income Tax 2025-26 - Monthly take-home salary janiye</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".6rem" }}>Monthly Salary (PKR)</div>
        <input type="number" className="inp" placeholder="e.g. 150000" value={salary} onChange={e=>setSalary(e.target.value)} style={{ maxWidth:250 }} />
        {m>0 && (
          <div style={{ marginTop:".75rem" }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:".6rem" }}>
              {[[Math.round(a).toLocaleString(),"Annual Salary"],[Math.round(tax).toLocaleString(),"Annual Tax"],[mTax.toLocaleString(),"Monthly Tax"],[takeHome.toLocaleString(),"Take-home/mo"]].map(([v,k])=>(
                <div key={k} className="stat-box">
                  <div style={{ fontSize:"1rem", fontWeight:600, color:"#F5C842" }}>{v}</div>
                  <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{k}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:".75rem", color:"#9A8F78", padding:".4rem .6rem", background:"rgba(212,160,23,.06)", borderRadius:5, borderLeft:"2px solid #D4A017" }}>
              Slab: {slab}
            </div>
          </div>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>FBR Tax Slabs 2025-26</h2>
        <div style={{ fontSize:".78rem", color:"#9A8F78" }}>
          {[["0 - 6 Lakh","0% Tax Free"],["6L - 12L","5%"],["12L - 22L","15%"],["22L - 32L","25%"],["32L - 41L","30%"],["41L se zyada","35%"]].map(([range,rate])=>(
            <div key={range} style={{ display:"flex", justifyContent:"space-between", padding:".3rem .5rem", borderBottom:"1px solid rgba(212,160,23,.08)" }}>
              <span>Annual Income: {range}</span>
              <strong style={{ color:"#F5C842" }}>{rate}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Tax Bachane ke Legal Tarike</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div>1. Zakat certificate submit karein FBR ko</div>
          <div>2. Charitable donations claim karein</div>
          <div>3. Medical allowance declare karein</div>
          <div>4. Provident fund contributions claim karein</div>
          <div>5. Tax consultant se mashwara lein</div>
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["Salary tax calculator free hai?","Haan bilkul free hai."],["FBR tax slabs kab update hote hain?","Har saal budget mein update hote hain."],["Monthly ya annual tax kaise calculate hota hai?","Annual tax calculate hota hai phir 12 se divide karke monthly nikala jata hai."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
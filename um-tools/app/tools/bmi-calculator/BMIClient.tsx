"use client";
import { useState } from "react";
export default function BMIClient() {
  const [weight, setWeight] = useState(""); const [height, setHeight] = useState("");
  const w = parseFloat(weight); const h = parseFloat(height)/100;
  const bmi = w && h ? +(w/(h*h)).toFixed(1) : null;
  const cat = bmi ? (bmi<18.5?"Underweight":bmi<25?"Normal":bmi<30?"Overweight":"Obese") : null;
  const pct = bmi ? (bmi<18.5?Math.max(0,(bmi/18.5)*25):bmi<25?25+(bmi-18.5)/(25-18.5)*25:bmi<30?50+(bmi-25)/5*25:Math.min(100,75+(bmi-30)/10*25)) : 0;
  const catColor = bmi ? (bmi<18.5?"#3b82f6":bmi<25?"#22c55e":bmi<30?"#f59e0b":"#ef4444") : "#9A8F78";
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>BMI Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Body Mass Index calculate karo - healthy weight range janiye</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem" }}>
          <input type="number" className="inp" placeholder="Weight (kg)" value={weight} onChange={e=>setWeight(e.target.value)} />
          <input type="number" className="inp" placeholder="Height (cm)" value={height} onChange={e=>setHeight(e.target.value)} />
        </div>
        {bmi && (
          <>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:".75rem" }}>
              <div className="stat-box"><div style={{ fontSize:"1.4rem", fontWeight:600, color:"#F5C842" }}>{bmi}</div><div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>BMI</div></div>
              <div className="stat-box"><div style={{ fontSize:"1rem", fontWeight:600, color:catColor }}>{cat}</div><div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Category</div></div>
            </div>
            <div style={{ height:12, borderRadius:6, background:"linear-gradient(90deg,#3b82f6 0%,#22c55e 25%,#f59e0b 50%,#ef4444 75%)", position:"relative", marginBottom:".3rem" }}>
              <div style={{ position:"absolute", top:-4, left:`${Math.min(98,pct)}%`, transform:"translateX(-50%)", width:4, height:20, background:"#fff", borderRadius:2 }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:".62rem", color:"#9A8F78", marginBottom:".75rem" }}>
              <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
            </div>
          </>
        )}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>BMI Categories</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78" }}>
          {[["Under 18.5","Underweight","#3b82f6"],["18.5 - 24.9","Normal Weight","#22c55e"],["25 - 29.9","Overweight","#f59e0b"],["30 aur upar","Obese","#ef4444"]].map(([range,cat,color])=>(
            <div key={cat} style={{ display:"flex", justifyContent:"space-between", padding:".3rem .5rem", borderLeft:`2px solid ${color}`, marginBottom:".3rem", background:"rgba(255,255,255,.02)", borderRadius:"0 4px 4px 0" }}>
              <span style={{ color:"#F0E6C8" }}>{range}</span><span style={{ color }}>{cat}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>BMI Formula</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ padding:".5rem .75rem", background:"rgba(212,160,23,.06)", borderRadius:7, marginBottom:".6rem", fontFamily:"monospace" }}>BMI = Weight (kg) / Height squared (m)</div>
          <div>Example: Weight 70kg, Height 170cm (1.70m)</div>
          <div>BMI = 70 / (1.70 x 1.70) = 24.2 (Normal)</div>
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["BMI accurate hai?","BMI ek estimate hai. Muscle mass, age aur gender consider nahi karta. Doctor se consult karein."],["Normal BMI kya hai?","18.5 se 24.9 ke beech normal maana jata hai."],["Pakistani adults ke liye?","Asian population ke liye 23+ overweight aur 27.5+ obese consider hota hai."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
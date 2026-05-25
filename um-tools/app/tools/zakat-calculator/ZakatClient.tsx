"use client";
import { useState } from "react";
export default function ZakatClient() {
  const [amount, setAmount] = useState(""); const [nisab, setNisab] = useState("");
  const a = parseFloat(amount)||0; const n = parseFloat(nisab)||87480;
  const zakat = a >= n ? (a * 0.025).toFixed(0) : null;
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Zakat Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Islamic Zakat — 2.5% on savings above Nisab</p>
      <div className="card">
        <div style={{ fontSize:".62rem", fontWeight:600, color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".6rem" }}>Total Savings / Assets (PKR)</div>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem" }}>
          <input type="number" className="inp" placeholder="Total savings (PKR)" value={amount} onChange={e=>setAmount(e.target.value)} />
          <input type="number" className="inp" placeholder="Nisab (default: 87,480)" value={nisab} onChange={e=>setNisab(e.target.value)} />
        </div>
        <div style={{ fontSize:".72rem", color:"#9A8F78", padding:".4rem .6rem", background:"rgba(212,160,23,.06)", borderRadius:5, borderLeft:"2px solid #D4A017", marginBottom:".75rem" }}>
          Nisab 2024: Gold (87.48g) ≈ PKR 87,480 | Silver (612.36g) ≈ PKR 87,480
        </div>
        {a > 0 && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem" }}>
            <div className="stat-box">
              <div style={{ fontSize:"1.2rem", fontWeight:600, color:"#F5C842" }}>{zakat ? Number(zakat).toLocaleString() : "0"}</div>
              <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Zakat Due (PKR)</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize:"1rem", fontWeight:600, color: zakat ? "#4ade80" : "#ef4444" }}>{zakat ? "Wajib ✓" : "Nahi"}</div>
              <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Status</div>
            </div>
            {zakat && (
              <div style={{ fontSize:".8rem", color:"#9A8F78", padding:".5rem .75rem", background:"rgba(212,160,23,.06)", borderRadius:7, borderLeft:"2px solid #D4A017", alignSelf:"center" }}>
                PKR {Number(a).toLocaleString()} ka 2.5% = PKR {Number(zakat).toLocaleString()}
              </div>
            )}
            {!zakat && a > 0 && (
              <div style={{ fontSize:".8rem", color:"#9A8F78", padding:".5rem .75rem", background:"rgba(239,68,68,.06)", borderRadius:7, borderLeft:"2px solid #ef4444", alignSelf:"center" }}>
                Nisab (PKR {n.toLocaleString()}) se kam — Zakat wajib nahi
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

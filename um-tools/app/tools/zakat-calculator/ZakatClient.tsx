"use client";
import { useState } from "react";

const currencies = [
  { code: "PKR", name: "Pakistani Rupee", symbol: "Rs", nisab: 87480 },
  { code: "USD", name: "US Dollar", symbol: "$", nisab: 315 },
  { code: "EUR", name: "Euro", symbol: "EUR", nisab: 290 },
  { code: "GBP", name: "British Pound", symbol: "GBP", nisab: 250 },
  { code: "SAR", name: "Saudi Riyal", symbol: "SAR", nisab: 1180 },
  { code: "AED", name: "UAE Dirham", symbol: "AED", nisab: 1160 },
  { code: "CAD", name: "Canadian Dollar", symbol: "CAD", nisab: 430 },
  { code: "AUD", name: "Australian Dollar", symbol: "AUD", nisab: 480 },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", nisab: 1480 },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", nisab: 5100000 },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "BDT", nisab: 34500 },
  { code: "INR", name: "Indian Rupee", symbol: "INR", nisab: 26000 },
  { code: "TRY", name: "Turkish Lira", symbol: "TRY", nisab: 10200 },
  { code: "EGP", name: "Egyptian Pound", symbol: "EGP", nisab: 15500 },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "KWD", nisab: 97 },
  { code: "QAR", name: "Qatari Riyal", symbol: "QAR", nisab: 1148 },
  { code: "OMR", name: "Omani Rial", symbol: "OMR", nisab: 121 },
  { code: "BHD", name: "Bahraini Dinar", symbol: "BHD", nisab: 119 },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JOD", nisab: 223 },
  { code: "NGN", name: "Nigerian Naira", symbol: "NGN", nisab: 504000 },
  { code: "ZAR", name: "South African Rand", symbol: "ZAR", nisab: 5900 },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", nisab: 283 },
  { code: "SGD", name: "Singapore Dollar", symbol: "SGD", nisab: 425 },
];

export default function ZakatClient() {
  const [currency, setCurrency] = useState("PKR");
  const [amount, setAmount] = useState("");
  const [customNisab, setCustomNisab] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const selected = currencies.find(c => c.code === currency)!;
  const nisab = customNisab ? parseFloat(customNisab) : selected.nisab;
  const a = parseFloat(amount) || 0;
  const zakat = a >= nisab ? (a * 0.025) : null;

  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Zakat Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Islamic Zakat 2.5% on savings above Nisab - All World Currencies</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".5rem" }}>Select Currency</div>
        <select className="inp" value={currency} onChange={e => { setCurrency(e.target.value); setCustomNisab(""); }} style={{ marginBottom:".75rem" }}>
          {currencies.map(c => (
            <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
          ))}
        </select>
        <div style={{ fontSize:".72rem", color:"#9A8F78", padding:".4rem .6rem", background:"rgba(212,160,23,.06)", borderRadius:5, borderLeft:"2px solid #D4A017", marginBottom:".75rem" }}>
          Nisab ({selected.code}): <strong style={{ color:"#F5C842" }}>{selected.symbol} {selected.nisab.toLocaleString()}</strong> - Silver 612.36g approx 2024
          <button onClick={() => setShowCustom(!showCustom)} style={{ marginLeft:".75rem", fontSize:".65rem", color:"#D4A017", background:"none", border:"1px solid rgba(212,160,23,.3)", borderRadius:4, padding:"2px 6px", cursor:"pointer" }}>Custom Nisab</button>
        </div>
        {showCustom && (
          <div style={{ marginBottom:".75rem" }}>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".3rem" }}>Custom Nisab ({selected.code})</div>
            <input type="number" className="inp" placeholder={"Default: " + selected.nisab} value={customNisab} onChange={e => setCustomNisab(e.target.value)} style={{ maxWidth:220 }} />
          </div>
        )}
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".5rem" }}>Total Savings ({selected.code})</div>
        <div style={{ display:"flex", gap:".6rem", alignItems:"center", marginBottom:".75rem" }}>
          <span style={{ color:"#F5C842", fontSize:"1.1rem", fontWeight:600 }}>{selected.symbol}</span>
          <input type="number" className="inp" placeholder={"Enter amount in " + selected.code} value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        {a > 0 && (
          <div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:".6rem" }}>
              <div className="stat-box">
                <div style={{ fontSize:"1.1rem", fontWeight:600, color:"#F5C842" }}>{selected.symbol} {zakat ? zakat.toLocaleString(undefined,{maximumFractionDigits:2}) : "0"}</div>
                <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Zakat Due</div>
              </div>
              <div className="stat-box">
                <div style={{ fontSize:"1rem", fontWeight:600, color:zakat?"#4ade80":"#ef4444" }}>{zakat?"Wajib":"Wajib Nahi"}</div>
                <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Status</div>
              </div>
              <div className="stat-box">
                <div style={{ fontSize:"1rem", fontWeight:600, color:"#F5C842" }}>2.5%</div>
                <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Rate</div>
              </div>
            </div>
            {zakat ? (
              <div style={{ fontSize:".8rem", color:"#9A8F78", padding:".5rem .75rem", background:"rgba(74,222,128,.06)", borderRadius:7, borderLeft:"2px solid #4ade80" }}>
                {selected.symbol} {a.toLocaleString()} ka 2.5% = <strong style={{ color:"#F5C842" }}>{selected.symbol} {zakat.toLocaleString(undefined,{maximumFractionDigits:2})}</strong> Zakat wajib hai
              </div>
            ) : (
              <div style={{ fontSize:".8rem", color:"#9A8F78", padding:".5rem .75rem", background:"rgba(239,68,68,.06)", borderRadius:7, borderLeft:"2px solid #ef4444" }}>
                Savings Nisab ({selected.symbol} {nisab.toLocaleString()}) se kam - Zakat wajib nahi
              </div>
            )}
          </div>
        )}
      </div>
      <div className="card">
        <div style={{ fontFamily:"Cinzel,serif", fontSize:".9rem", color:"#F5C842", marginBottom:".6rem" }}>Zakat ke Baare Mein</div>
        <div style={{ fontSize:".78rem", color:"#9A8F78", lineHeight:1.8 }}>
          <div>Zakat Islam ke 5 arkan mein se ek hai</div>
          <div>Nisab: Gold (87.48g) ya Silver (612.36g) ki qeemat</div>
          <div>Hawl: Ek saal tak possession mein ho</div>
          <div>Rate: Total maal ka 2.5%</div>
          <div>Nisab values approximate - apne local aalim se confirm karein</div>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";

const currencies = [
  { code: "PKR", name: "Pakistani Rupee", symbol: "Rs", goldNisab: 3583215, silverNisab: 87413 },
  { code: "USD", name: "US Dollar", symbol: "$", goldNisab: 12800, silverNisab: 314 },
  { code: "EUR", name: "Euro", symbol: "EUR", goldNisab: 11800, silverNisab: 289 },
  { code: "GBP", name: "British Pound", symbol: "GBP", goldNisab: 10100, silverNisab: 248 },
  { code: "SAR", name: "Saudi Riyal", symbol: "SAR", goldNisab: 48000, silverNisab: 1178 },
  { code: "AED", name: "UAE Dirham", symbol: "AED", goldNisab: 47000, silverNisab: 1153 },
  { code: "CAD", name: "Canadian Dollar", symbol: "CAD", goldNisab: 17800, silverNisab: 436 },
  { code: "AUD", name: "Australian Dollar", symbol: "AUD", goldNisab: 20000, silverNisab: 490 },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", goldNisab: 57000, silverNisab: 1398 },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", goldNisab: 210000000, silverNisab: 5150000 },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "BDT", goldNisab: 1410000, silverNisab: 34600 },
  { code: "INR", name: "Indian Rupee", symbol: "INR", goldNisab: 1070000, silverNisab: 26200 },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "KWD", goldNisab: 3930, silverNisab: 96 },
  { code: "QAR", name: "Qatari Riyal", symbol: "QAR", goldNisab: 46600, silverNisab: 1143 },
  { code: "OMR", name: "Omani Rial", symbol: "OMR", goldNisab: 4926, silverNisab: 121 },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", goldNisab: 11500, silverNisab: 282 },
  { code: "SGD", name: "Singapore Dollar", symbol: "SGD", goldNisab: 17200, silverNisab: 422 },
  { code: "TRY", name: "Turkish Lira", symbol: "TRY", goldNisab: 440000, silverNisab: 10800 },
  { code: "NGN", name: "Nigerian Naira", symbol: "NGN", goldNisab: 20500000, silverNisab: 503000 },
  { code: "ZAR", name: "South African Rand", symbol: "ZAR", goldNisab: 238000, silverNisab: 5840 },
];

export default function ZakatClient() {
  const [currency, setCurrency] = useState("PKR");
  const [nisabType, setNisabType] = useState("silver");
  const [cash, setCash] = useState("");
  const [goldVal, setGoldVal] = useState("");
  const [silverVal, setSilverVal] = useState("");
  const [savings, setSavings] = useState("");
  const [business, setBusiness] = useState("");
  const [debts, setDebts] = useState("");
  const [bills, setBills] = useState("");
  const [loans, setLoans] = useState("");

  const selected = currencies.find(c => c.code === currency)!;
  const nisab = nisabType === "gold" ? selected.goldNisab : selected.silverNisab;
  const totalAssets = [cash, goldVal, silverVal, savings, business].reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const totalLiabilities = [debts, bills, loans].reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const netWealth = Math.max(0, totalAssets - totalLiabilities);
  const zakatWajib = netWealth >= nisab;
  const zakat = zakatWajib ? netWealth * 0.025 : 0;
  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Zakat Calculator 2026</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Updated Nisab 2026 - Gold & Silver - All World Currencies</p>

      {/* Currency + Nisab Type - FIRST */}
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:160 }}>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".4rem" }}>Currency</div>
            <select className="inp" value={currency} onChange={e => setCurrency(e.target.value)}>
              {currencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
            </select>
          </div>
          <div style={{ flex:1, minWidth:160 }}>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".4rem" }}>Nisab Type</div>
            <select className="inp" value={nisabType} onChange={e => setNisabType(e.target.value)}>
              <option value="silver">Silver Nisab (Recommended)</option>
              <option value="gold">Gold Nisab</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nisab Info - shows SELECTED currency */}
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".75rem" }}>Nisab 2026 - {selected.code}</div>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".6rem" }}>
          <div style={{ flex:1, minWidth:180, padding:".6rem", background: nisabType==="gold" ? "rgba(212,160,23,.15)" : "rgba(212,160,23,.06)", borderRadius:7, borderLeft: nisabType==="gold" ? "3px solid #F5C842" : "2px solid #D4A017" }}>
            <div style={{ fontSize:".7rem", color:"#F5C842", fontWeight:600 }}>Gold Nisab</div>
            <div style={{ fontSize:".72rem", color:"#9A8F78", marginTop:".2rem" }}>7.5 Tolas (87.48g)</div>
            <div style={{ fontSize:"1rem", color:"#F0E6C8", marginTop:".3rem", fontWeight:700 }}>{selected.symbol} {selected.goldNisab.toLocaleString()}</div>
          </div>
          <div style={{ flex:1, minWidth:180, padding:".6rem", background: nisabType==="silver" ? "rgba(212,160,23,.15)" : "rgba(212,160,23,.06)", borderRadius:7, borderLeft: nisabType==="silver" ? "3px solid #F5C842" : "2px solid #D4A017" }}>
            <div style={{ fontSize:".7rem", color:"#F5C842", fontWeight:600 }}>Silver Nisab (Recommended)</div>
            <div style={{ fontSize:".72rem", color:"#9A8F78", marginTop:".2rem" }}>52.5 Tolas (612.36g)</div>
            <div style={{ fontSize:"1rem", color:"#F0E6C8", marginTop:".3rem", fontWeight:700 }}>{selected.symbol} {selected.silverNisab.toLocaleString()}</div>
          </div>
        </div>
        <div style={{ fontSize:".7rem", color:"#9A8F78", padding:".4rem .6rem", background:"rgba(255,255,255,.03)", borderRadius:5 }}>
          Active Nisab: <strong style={{ color:"#F5C842" }}>{selected.symbol} {nisab.toLocaleString()}</strong> ({nisabType === "silver" ? "Silver 52.5 Tolas" : "Gold 7.5 Tolas"})
        </div>
      </div>

      {/* Assets */}
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:".9rem", color:"#F5C842", marginBottom:".75rem" }}>Zakatable Assets ({selected.symbol})</div>
        {([
          [cash, setCash, "Cash - Hand + Bank Accounts"],
          [goldVal, setGoldVal, "Gold Value (current market rate)"],
          [silverVal, setSilverVal, "Silver Value (current market rate)"],
          [savings, setSavings, "Savings & Investments"],
          [business, setBusiness, "Business Inventory / Stock"],
        ] as [string, (v:string)=>void, string][]).map(([val, fn, label]) => (
          <div key={label} style={{ marginBottom:".5rem" }}>
            <div style={{ fontSize:".62rem", color:"#9A8F78", marginBottom:".2rem" }}>{label}</div>
            <input type="number" className="inp" placeholder="0.00" value={val} onChange={e => fn(e.target.value)} />
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", padding:".5rem .75rem", background:"rgba(212,160,23,.06)", borderRadius:5, marginTop:".5rem" }}>
          <span style={{ fontSize:".8rem", color:"#9A8F78" }}>Total Assets</span>
          <strong style={{ color:"#F5C842" }}>{selected.symbol} {fmt(totalAssets)}</strong>
        </div>
      </div>

      {/* Liabilities */}
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:".9rem", color:"#F5C842", marginBottom:".75rem" }}>Deductible Liabilities ({selected.symbol})</div>
        {([
          [debts, setDebts, "Immediate Debts"],
          [bills, setBills, "Unpaid Bills / Rent"],
          [loans, setLoans, "Loans Taken"],
        ] as [string, (v:string)=>void, string][]).map(([val, fn, label]) => (
          <div key={label} style={{ marginBottom:".5rem" }}>
            <div style={{ fontSize:".62rem", color:"#9A8F78", marginBottom:".2rem" }}>{label}</div>
            <input type="number" className="inp" placeholder="0.00" value={val} onChange={e => fn(e.target.value)} />
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", padding:".5rem .75rem", background:"rgba(239,68,68,.06)", borderRadius:5, marginTop:".5rem" }}>
          <span style={{ fontSize:".8rem", color:"#9A8F78" }}>Total Liabilities</span>
          <strong style={{ color:"#ef4444" }}>{selected.symbol} {fmt(totalLiabilities)}</strong>
        </div>
      </div>

      {/* Result */}
      {totalAssets > 0 && (
        <div className="card">
          <div style={{ fontFamily:"Cinzel,serif", fontSize:".9rem", color:"#F5C842", marginBottom:".75rem" }}>Zakat Result 2026</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:".75rem" }}>
            <div className="stat-box">
              <div style={{ fontSize:".9rem", fontWeight:600, color:"#F5C842" }}>{selected.symbol} {fmt(netWealth)}</div>
              <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Net Wealth</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize:".9rem", fontWeight:600, color:"#F5C842" }}>{selected.symbol} {nisab.toLocaleString()}</div>
              <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Nisab 2026</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize:"1rem", fontWeight:600, color: zakatWajib ? "#4ade80" : "#ef4444" }}>{zakatWajib ? "Wajib" : "Nahi"}</div>
              <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Status</div>
            </div>
            <div className="stat-box" style={{ background:"rgba(212,160,23,.15)" }}>
              <div style={{ fontSize:"1.1rem", fontWeight:700, color:"#F5C842" }}>{selected.symbol} {fmt(zakat)}</div>
              <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Zakat Due (2.5%)</div>
            </div>
          </div>
          {zakatWajib ? (
            <div style={{ fontSize:".8rem", color:"#9A8F78", padding:".5rem .75rem", background:"rgba(74,222,128,.06)", borderRadius:7, borderLeft:"2px solid #4ade80" }}>
              Net Wealth {selected.symbol} {fmt(netWealth)} Nisab se zyada. Zakat wajib: <strong style={{ color:"#F5C842" }}>{selected.symbol} {fmt(zakat)}</strong>
            </div>
          ) : (
            <div style={{ fontSize:".8rem", color:"#9A8F78", padding:".5rem .75rem", background:"rgba(239,68,68,.06)", borderRadius:7, borderLeft:"2px solid #ef4444" }}>
              Net Wealth {selected.symbol} {fmt(netWealth)} Nisab ({selected.symbol} {nisab.toLocaleString()}) se kam. Zakat wajib nahi.
            </div>
          )}
          <div style={{ fontSize:".7rem", color:"#9A8F78", marginTop:".6rem", padding:".4rem .6rem", background:"rgba(255,255,255,.03)", borderRadius:5 }}>
            Note: Nisab values ​​are approximate. Please confirm with your local scholar..
          </div>
        </div>
      )}
    </div>
  );
}
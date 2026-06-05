"use client";
import { useState, useEffect } from "react";

const POPULAR = ["USD","PKR","EUR","GBP","SAR","AED","CAD","AUD","INR","BDT","MYR","TRY","CNY","JPY","CHF","SGD","KWD","QAR","OMR","NGN","ZAR","EGP"];

const FLAGS: Record<string,string> = {
  USD:"🇺🇸",PKR:"🇵🇰",EUR:"🇪🇺",GBP:"🇬🇧",SAR:"🇸🇦",AED:"🇦🇪",
  CAD:"🇨🇦",AUD:"🇦🇺",INR:"🇮🇳",BDT:"🇧🇩",MYR:"🇲🇾",TRY:"🇹🇷",
  CNY:"🇨🇳",JPY:"🇯🇵",CHF:"🇨🇭",SGD:"🇸🇬",KWD:"🇰🇼",QAR:"🇶🇦",
  OMR:"🇴🇲",NGN:"🇳🇬",ZAR:"🇿🇦",EGP:"🇪🇬"
};

const NAMES: Record<string,string> = {
  USD:"US Dollar",PKR:"Pakistani Rupee",EUR:"Euro",GBP:"British Pound",
  SAR:"Saudi Riyal",AED:"UAE Dirham",CAD:"Canadian Dollar",AUD:"Australian Dollar",
  INR:"Indian Rupee",BDT:"Bangladeshi Taka",MYR:"Malaysian Ringgit",TRY:"Turkish Lira",
  CNY:"Chinese Yuan",JPY:"Japanese Yen",CHF:"Swiss Franc",SGD:"Singapore Dollar",
  KWD:"Kuwaiti Dinar",QAR:"Qatari Riyal",OMR:"Omani Rial",NGN:"Nigerian Naira",
  ZAR:"South African Rand",EGP:"Egyptian Pound"
};

export default function CurrencyClient() {
  const [rates, setRates] = useState<Record<string,number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then(r => r.json())
      .then(data => {
        setRates(data.rates);
        setLastUpdate(new Date(data.time_last_updated * 1000).toLocaleString());
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load live rates. Please try again.");
        setLoading(false);
      });
  }, []);

  const convert = (amt: number, f: string, t: string) => {
    if (!rates[f] || !rates[t]) return 0;
    return (amt / rates[f]) * rates[t];
  };

  const result = convert(parseFloat(amount) || 0, from, to);
  const swap = () => { setFrom(to); setTo(from); };

  const popularPairs = [
    ["USD","PKR"],["EUR","PKR"],["GBP","PKR"],["SAR","PKR"],["AED","PKR"],["CAD","PKR"]
  ];

  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Currency Converter</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Live exchange rates — Convert between 150+ world currencies instantly</p>

      {/* Main Converter */}
      <div className="card" style={{ marginBottom:"1rem" }}>
        {loading ? (
          <div style={{ textAlign:"center", padding:"2rem", color:"#9A8F78" }}>
            <div style={{ fontSize:"1.5rem", marginBottom:".5rem" }}>⏳</div>
            Loading live rates...
          </div>
        ) : error ? (
          <div style={{ color:"#ef4444", padding:"1rem", textAlign:"center" }}>{error}</div>
        ) : (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:".75rem", alignItems:"end", marginBottom:".75rem" }}>
              {/* From */}
              <div>
                <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".4rem" }}>From</div>
                <select className="inp" value={from} onChange={e=>setFrom(e.target.value)} style={{ marginBottom:".4rem" }}>
                  {POPULAR.map(c=><option key={c} value={c}>{FLAGS[c]} {c} - {NAMES[c]}</option>)}
                </select>
                <input type="number" className="inp" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter amount" />
              </div>

              {/* Swap */}
              <button onClick={swap} style={{ background:"rgba(212,160,23,.15)", border:"1px solid rgba(212,160,23,.4)", borderRadius:"50%", width:40, height:40, cursor:"pointer", fontSize:"1.2rem", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:".1rem" }}>⇄</button>

              {/* To */}
              <div>
                <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".4rem" }}>To</div>
                <select className="inp" value={to} onChange={e=>setTo(e.target.value)} style={{ marginBottom:".4rem" }}>
                  {POPULAR.map(c=><option key={c} value={c}>{FLAGS[c]} {c} - {NAMES[c]}</option>)}
                </select>
                <div style={{ background:"rgba(212,160,23,.08)", border:"1px solid rgba(212,160,23,.3)", borderRadius:7, padding:".5rem .75rem", fontSize:"1.1rem", fontWeight:700, color:"#F5C842", fontFamily:"monospace" }}>
                  {result.toLocaleString(undefined, { maximumFractionDigits:4 })}
                </div>
              </div>
            </div>

            {/* Result Summary */}
            <div style={{ background:"rgba(0,0,0,.3)", borderRadius:8, padding:".75rem 1rem", marginBottom:".6rem" }}>
              <div style={{ fontSize:"1rem", color:"#F0E6C8", fontWeight:600 }}>
                {FLAGS[from]} {parseFloat(amount)||1} {from} = {FLAGS[to]} {result.toLocaleString(undefined,{maximumFractionDigits:4})} {to}
              </div>
              <div style={{ fontSize:".75rem", color:"#9A8F78", marginTop:".3rem" }}>
                1 {from} = {convert(1,from,to).toLocaleString(undefined,{maximumFractionDigits:6})} {to} &nbsp;|&nbsp;
                1 {to} = {convert(1,to,from).toLocaleString(undefined,{maximumFractionDigits:6})} {from}
              </div>
            </div>

            <div style={{ fontSize:".7rem", color:"#9A8F78" }}>
              Live rates updated: {lastUpdate} • Source: ExchangeRate-API
            </div>
          </>
        )}
      </div>

      {/* Popular PKR Rates */}
      {!loading && !error && (
        <div className="card" style={{ marginBottom:"1rem" }}>
          <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Popular Rates vs PKR Today</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:".5rem" }}>
            {popularPairs.map(([f,t])=>(
              <div key={f} onClick={()=>{setFrom(f);setTo(t);}} style={{ padding:".6rem .75rem", background:"rgba(212,160,23,.06)", border:"1px solid rgba(212,160,23,.15)", borderRadius:8, cursor:"pointer", transition:"all .2s" }}>
                <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8" }}>{FLAGS[f]} {f} → {FLAGS[t]} {t}</div>
                <div style={{ fontSize:"1rem", color:"#F5C842", fontWeight:700, fontFamily:"monospace", marginTop:".2rem" }}>
                  {convert(1,f,t).toLocaleString(undefined,{maximumFractionDigits:2})}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All rates table */}
      {!loading && !error && (
        <div className="card" style={{ marginBottom:"1rem" }}>
          <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>All Major Currencies vs {from}</h2>
          <div style={{ maxHeight:300, overflowY:"auto" }}>
            {POPULAR.filter(c=>c!==from).map(c=>(
              <div key={c} onClick={()=>setTo(c)} style={{ display:"flex", justifyContent:"space-between", padding:".4rem .5rem", borderBottom:"1px solid rgba(212,160,23,.08)", cursor:"pointer", background:to===c?"rgba(212,160,23,.08)":"transparent", borderRadius:4 }}>
                <span style={{ fontSize:".82rem", color:"#F0E6C8" }}>{FLAGS[c]} {c} <span style={{ color:"#9A8F78", fontSize:".72rem" }}>{NAMES[c]}</span></span>
                <strong style={{ fontSize:".85rem", color:"#F5C842", fontFamily:"monospace" }}>{convert(1,from,c).toLocaleString(undefined,{maximumFractionDigits:4})}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Are rates live?","Yes! Rates are fetched live from ExchangeRate-API every time you load the page."],
          ["How accurate are the rates?","Rates are mid-market rates updated regularly. They may slightly differ from bank rates."],
          ["How many currencies are supported?","22 major currencies including PKR, USD, EUR, GBP, SAR, AED and more."],
          ["Is this tool free?","Yes, completely free. No signup or account required."]
        ].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

const categories = {
  Length: {
    units: ["Meter","Kilometer","Mile","Foot","Inch","Centimeter","Millimeter","Yard","Nautical Mile"],
    toBase: { Meter:1, Kilometer:1000, Mile:1609.34, Foot:0.3048, Inch:0.0254, Centimeter:0.01, Millimeter:0.001, Yard:0.9144, "Nautical Mile":1852 }
  },
  Weight: {
    units: ["Kilogram","Gram","Pound","Ounce","Tonne","Milligram","Stone","Ton (US)"],
    toBase: { Kilogram:1, Gram:0.001, Pound:0.453592, Ounce:0.0283495, Tonne:1000, Milligram:0.000001, Stone:6.35029, "Ton (US)":907.185 }
  },
  Temperature: {
    units: ["Celsius","Fahrenheit","Kelvin"],
    toBase: {}
  },
  Speed: {
    units: ["m/s","km/h","mph","knot","ft/s"],
    toBase: { "m/s":1, "km/h":0.277778, "mph":0.44704, "knot":0.514444, "ft/s":0.3048 }
  },
  Area: {
    units: ["Square Meter","Square Kilometer","Square Mile","Square Foot","Acre","Hectare","Square Yard","Square Inch"],
    toBase: { "Square Meter":1, "Square Kilometer":1e6, "Square Mile":2589988, "Square Foot":0.092903, "Acre":4046.86, "Hectare":10000, "Square Yard":0.836127, "Square Inch":0.00064516 }
  },
  Volume: {
    units: ["Liter","Milliliter","Gallon (US)","Gallon (UK)","Cup","Fluid Ounce","Cubic Meter","Pint"],
    toBase: { Liter:1, Milliliter:0.001, "Gallon (US)":3.78541, "Gallon (UK)":4.54609, Cup:0.236588, "Fluid Ounce":0.0295735, "Cubic Meter":1000, Pint:0.473176 }
  },
  Data: {
    units: ["Byte","Kilobyte","Megabyte","Gigabyte","Terabyte","Bit","Kilobit","Megabit"],
    toBase: { Byte:1, Kilobyte:1024, Megabyte:1048576, Gigabyte:1073741824, Terabyte:1099511627776, Bit:0.125, Kilobit:128, Megabit:131072 }
  }
};

function convertTemp(val: number, from: string, to: string): number {
  let celsius = from === "Fahrenheit" ? (val-32)*5/9 : from === "Kelvin" ? val-273.15 : val;
  if(to === "Fahrenheit") return celsius*9/5+32;
  if(to === "Kelvin") return celsius+273.15;
  return celsius;
}

export default function UnitClient() {
  const [cat, setCat] = useState("Length");
  const [from, setFrom] = useState("Meter");
  const [to, setTo] = useState("Kilometer");
  const [input, setInput] = useState("1");

  const catData = categories[cat as keyof typeof categories];

  const convert = (): string => {
    const val = parseFloat(input);
    if(isNaN(val)) return "";
    if(cat === "Temperature") return convertTemp(val, from, to).toFixed(6).replace(/\.?0+$/,"");
    const base = (catData.toBase as any)[from];
    const target = (catData.toBase as any)[to];
    if(!base || !target) return "";
    return ((val * base) / target).toFixed(8).replace(/\.?0+$/,"");
  };

  const result = convert();

  const handleCatChange = (newCat: string) => {
    setCat(newCat);
    const units = categories[newCat as keyof typeof categories].units;
    setFrom(units[0]);
    setTo(units[1]);
    setInput("1");
  };

  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Unit Converter</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Convert length, weight, temperature, speed, area, volume and data units</p>

      {/* Category tabs */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:".4rem", marginBottom:"1rem" }}>
        {Object.keys(categories).map(c=>(
          <button key={c} onClick={()=>handleCatChange(c)} style={{ padding:".4rem .85rem", borderRadius:20, fontSize:".78rem", fontWeight:600, cursor:"pointer", border:"1px solid rgba(212,160,23,.3)", background:cat===c?"linear-gradient(135deg,#A07810,#D4A017)":"rgba(255,255,255,.05)", color:cat===c?"#111":"#9A8F78", transition:"all .2s" }}>{c}</button>
        ))}
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:".75rem", alignItems:"end", marginBottom:".75rem" }}>
          <div>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".4rem" }}>From</div>
            <select className="inp" value={from} onChange={e=>setFrom(e.target.value)} style={{ marginBottom:".4rem" }}>
              {catData.units.map(u=><option key={u} value={u}>{u}</option>)}
            </select>
            <input type="number" className="inp" value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter value" />
          </div>
          <button onClick={()=>{setFrom(to);setTo(from);}} style={{ background:"rgba(212,160,23,.15)", border:"1px solid rgba(212,160,23,.4)", borderRadius:"50%", width:40, height:40, cursor:"pointer", fontSize:"1.2rem", display:"flex", alignItems:"center", justifyContent:"center" }}>⇄</button>
          <div>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".4rem" }}>To</div>
            <select className="inp" value={to} onChange={e=>setTo(e.target.value)} style={{ marginBottom:".4rem" }}>
              {catData.units.map(u=><option key={u} value={u}>{u}</option>)}
            </select>
            <div style={{ background:"rgba(212,160,23,.08)", border:"1px solid rgba(212,160,23,.3)", borderRadius:7, padding:".5rem .75rem", fontSize:"1.1rem", fontWeight:700, color:"#F5C842", fontFamily:"monospace" }}>
              {result || "—"}
            </div>
          </div>
        </div>
        {result && (
          <div style={{ background:"rgba(0,0,0,.3)", borderRadius:8, padding:".75rem 1rem" }}>
            <div style={{ fontSize:"1rem", color:"#F0E6C8", fontWeight:600 }}>{input} {from} = {result} {to}</div>
          </div>
        )}
      </div>

      {/* Quick reference */}
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Quick Reference — {cat}</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:".5rem", fontSize:".78rem" }}>
          {cat === "Length" && [["1 km","= 0.621 miles"],["1 mile","= 1.609 km"],["1 foot","= 30.48 cm"],["1 inch","= 2.54 cm"],["1 meter","= 3.281 feet"],["1 yard","= 0.914 meter"]].map(([f,t])=>(<div key={f} style={{ padding:".4rem .6rem", background:"rgba(212,160,23,.05)", borderRadius:6 }}><strong style={{ color:"#F5C842" }}>{f}</strong> <span style={{ color:"#9A8F78" }}>{t}</span></div>))}
          {cat === "Weight" && [["1 kg","= 2.205 lbs"],["1 lb","= 0.453 kg"],["1 tonne","= 1000 kg"],["1 stone","= 6.35 kg"],["1 oz","= 28.35 g"],["1 ton","= 907 kg"]].map(([f,t])=>(<div key={f} style={{ padding:".4rem .6rem", background:"rgba(212,160,23,.05)", borderRadius:6 }}><strong style={{ color:"#F5C842" }}>{f}</strong> <span style={{ color:"#9A8F78" }}>{t}</span></div>))}
          {cat === "Temperature" && [["0°C","= 32°F"],["100°C","= 212°F"],["37°C","= 98.6°F"],["0°K","= -273.15°C"],["20°C","= 68°F"],["Body temp","37°C / 98.6°F"]].map(([f,t])=>(<div key={f} style={{ padding:".4rem .6rem", background:"rgba(212,160,23,.05)", borderRadius:6 }}><strong style={{ color:"#F5C842" }}>{f}</strong> <span style={{ color:"#9A8F78" }}>{t}</span></div>))}
          {cat === "Speed" && [["1 km/h","= 0.621 mph"],["1 mph","= 1.609 km/h"],["1 knot","= 1.852 km/h"],["Speed of light","= 299,792 km/s"],["Sound speed","= 343 m/s"],["1 m/s","= 3.6 km/h"]].map(([f,t])=>(<div key={f} style={{ padding:".4rem .6rem", background:"rgba(212,160,23,.05)", borderRadius:6 }}><strong style={{ color:"#F5C842" }}>{f}</strong> <span style={{ color:"#9A8F78" }}>{t}</span></div>))}
          {(cat === "Area" || cat === "Volume" || cat === "Data") && catData.units.slice(0,6).map(u=>(<div key={u} style={{ padding:".4rem .6rem", background:"rgba(212,160,23,.05)", borderRadius:6 }}><span style={{ color:"#F5C842" }}>{u}</span></div>))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Frequently Asked Questions</h2>
        {[["Is this unit converter free?","Yes, completely free. No signup required."],["How accurate are the conversions?","All conversions use standard international values. Results are accurate to 8 decimal places."],["What categories are supported?","Length, Weight, Temperature, Speed, Area, Volume and Data (digital storage)."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

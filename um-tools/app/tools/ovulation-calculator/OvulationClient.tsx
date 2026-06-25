"use client";
import { useState } from "react";

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function fmt(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export default function OvulationClient() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [lutealPhase, setLutealPhase] = useState("14");
  const [result, setResult] = useState<null | {
    ovulation: Date; fertileStart: Date; fertileEnd: Date; nextPeriod: Date; nextOvulation: Date;
  }>(null);

  const calc = () => {
    if (!lastPeriod) return;
    const lp = new Date(lastPeriod);
    const cl = +cycleLength;
    const luteal = +lutealPhase;
    const ovulationDay = cl - luteal;
    const ovulation = addDays(lp, ovulationDay);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    const nextPeriod = addDays(lp, cl);
    const nextOvulation = addDays(nextPeriod, ovulationDay);
    setResult({ ovulation, fertileStart, fertileEnd, nextPeriod, nextOvulation });
  };

  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Ovulation Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Find your fertile window and predicted ovulation date based on your cycle</p>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem" }}>
          <div style={{ flex:1, minWidth:180 }}>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".3rem" }}>First Day of Last Period</div>
            <input type="date" className="inp" value={lastPeriod} onChange={e=>setLastPeriod(e.target.value)} />
          </div>
          <div style={{ flex:1, minWidth:140 }}>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".3rem" }}>Average Cycle Length</div>
            <select className="inp" value={cycleLength} onChange={e=>setCycleLength(e.target.value)}>
              {Array.from({length:21},(_,i)=>i+21).map(n=><option key={n} value={n}>{n} days</option>)}
            </select>
          </div>
          <div style={{ flex:1, minWidth:140 }}>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".3rem" }}>Luteal Phase Length</div>
            <select className="inp" value={lutealPhase} onChange={e=>setLutealPhase(e.target.value)}>
              {Array.from({length:9},(_,i)=>i+10).map(n=><option key={n} value={n}>{n} days</option>)}
            </select>
          </div>
        </div>
        <button className="btn-gold" onClick={calc}>Calculate Ovulation</button>

        {result && (
          <div style={{ marginTop:"1rem" }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:".75rem" }}>
              <div className="stat-box" style={{ background:"rgba(212,160,23,.15)" }}>
                <div style={{ fontSize:".95rem", fontWeight:700, color:"#F5C842" }}>{fmt(result.ovulation)}</div>
                <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Predicted Ovulation Day</div>
              </div>
              <div className="stat-box">
                <div style={{ fontSize:".95rem", fontWeight:600, color:"#F5C842" }}>{fmt(result.nextPeriod)}</div>
                <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>Next Period Expected</div>
              </div>
            </div>
            <div style={{ fontSize:".82rem", color:"#9A8F78", padding:".6rem .75rem", background:"rgba(74,222,128,.06)", borderRadius:7, borderLeft:"2px solid #4ade80", marginBottom:".6rem" }}>
              Your most fertile window: <strong style={{ color:"#F5C842" }}>{fmt(result.fertileStart)} - {fmt(result.fertileEnd)}</strong>
              <div style={{ marginTop:".3rem", fontSize:".75rem" }}>This is when pregnancy chances are highest.</div>
            </div>
            <div style={{ fontSize:".78rem", color:"#9A8F78", padding:".5rem .75rem", background:"rgba(212,160,23,.06)", borderRadius:7 }}>
              Following ovulation expected around: <strong style={{ color:"#F5C842" }}>{fmt(result.nextOvulation)}</strong>
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>How Ovulation Calculation Works</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".5rem" }}>Ovulation typically happens about 14 days before your next period starts, regardless of how long your cycle is. This is called the luteal phase, and it tends to stay consistent for most people even when cycle length varies.</div>
          <div>The fertile window includes the 5 days before ovulation plus the day of ovulation itself, since sperm can survive up to 5 days while the egg survives about 24 hours after release.</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Signs of Ovulation</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[
            ["Cervical Mucus Changes", "Becomes clear, stretchy, egg-white like texture"],
            ["Basal Body Temperature", "Slight rise of 0.5-1°F after ovulation"],
            ["Mild Pelvic Pain", "One-sided cramping known as mittelschmerz"],
            ["Increased Libido", "Natural rise in sex drive around ovulation"],
          ].map(([t,d]) => (
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["How accurate is an ovulation calculator?", "This calculator gives a good estimate based on average cycle patterns, but actual ovulation can vary due to stress, illness, or irregular cycles. Tracking basal body temperature or using ovulation predictor kits gives more precise results."],
          ["What if my cycle is irregular?", "If your cycles vary significantly month to month, this calculator becomes less accurate. Consider tracking several cycles first, or consult a doctor for personalized guidance."],
          ["Can I get pregnant outside the fertile window?", "It is less likely but not impossible, since cycle timing can shift unexpectedly. The fertile window represents the highest probability days, not the only possible days."],
        ].map(([q,a]) => (
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

const activityLevels = [
  { v: "1.2", label: "Sedentary (little or no exercise)" },
  { v: "1.375", label: "Light (exercise 1-3 days/week)" },
  { v: "1.55", label: "Moderate (exercise 3-5 days/week)" },
  { v: "1.725", label: "Active (exercise 6-7 days/week)" },
  { v: "1.9", label: "Very Active (hard exercise daily)" },
];

export default function CalorieClient() {
  const [unit, setUnit] = useState("metric");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [result, setResult] = useState<null | { bmr: number; tdee: number; lose1: number; lose05: number; gain: number }>(null);

  const calc = () => {
    const a = +age;
    let w = +weight;
    let h = +height;
    if (!a || !w || !h) return;

    if (unit === "imperial") {
      w = w * 0.453592; // lbs to kg
      h = h * 2.54; // inches to cm
    }

    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * +activity;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      lose1: Math.round(tdee - 1000),
      lose05: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
    });
  };

  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Calorie Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Find your daily calorie needs for weight loss, maintenance, or muscle gain</p>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ display:"flex", gap:".5rem", marginBottom:".75rem" }}>
          {["metric","imperial"].map(u => (
            <button key={u} className={unit===u ? "btn-gold" : "btn-outline"} onClick={()=>setUnit(u)} style={{ flex:1 }}>
              {u === "metric" ? "Metric (kg/cm)" : "Imperial (lb/in)"}
            </button>
          ))}
        </div>

        <div style={{ display:"flex", gap:".5rem", marginBottom:".75rem" }}>
          {["male","female"].map(g => (
            <button key={g} className={gender===g ? "btn-gold" : "btn-outline"} onClick={()=>setGender(g)} style={{ flex:1, textTransform:"capitalize" }}>{g}</button>
          ))}
        </div>

        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem" }}>
          <div style={{ flex:1, minWidth:100 }}>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".3rem" }}>Age</div>
            <input type="number" className="inp" placeholder="years" value={age} onChange={e=>setAge(e.target.value)} />
          </div>
          <div style={{ flex:1, minWidth:130 }}>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".3rem" }}>Weight</div>
            <input type="number" className="inp" placeholder={unit==="metric"?"kg":"lbs"} value={weight} onChange={e=>setWeight(e.target.value)} />
          </div>
          <div style={{ flex:1, minWidth:130 }}>
            <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".3rem" }}>Height</div>
            <input type="number" className="inp" placeholder={unit==="metric"?"cm":"inches"} value={height} onChange={e=>setHeight(e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom:".75rem" }}>
          <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".3rem" }}>Activity Level</div>
          <select className="inp" value={activity} onChange={e=>setActivity(e.target.value)}>
            {activityLevels.map(a => <option key={a.v} value={a.v}>{a.label}</option>)}
          </select>
        </div>

        <button className="btn-gold" onClick={calc}>Calculate Calories</button>

        {result && (
          <div style={{ marginTop:"1rem" }}>
            <div className="stat-box" style={{ background:"rgba(212,160,23,.15)", marginBottom:".75rem", display:"block", textAlign:"center", padding:"1rem" }}>
              <div style={{ fontSize:"1.5rem", fontWeight:700, color:"#F5C842" }}>{result.tdee.toLocaleString()} cal/day</div>
              <div style={{ fontSize:".7rem", color:"#9A8F78", marginTop:2 }}>Maintenance Calories (TDEE)</div>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem" }}>
              {[
                [result.lose1.toLocaleString(), "Lose ~1 kg/week", "#ef4444"],
                [result.lose05.toLocaleString(), "Lose ~0.5 kg/week", "#f59e0b"],
                [result.tdee.toLocaleString(), "Maintain Weight", "#4ade80"],
                [result.gain.toLocaleString(), "Gain ~0.5 kg/week", "#3b82f6"],
              ].map(([v,k,c]) => (
                <div key={String(k)} className="stat-box" style={{ borderLeft:`2px solid ${c}`, flex:1, minWidth:140 }}>
                  <div style={{ fontSize:"1rem", fontWeight:600, color:"#F5C842" }}>{v}</div>
                  <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{k}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:".75rem", color:"#9A8F78", marginTop:".6rem", padding:".4rem .6rem", background:"rgba(255,255,255,.03)", borderRadius:5 }}>
              Your BMR (calories burned at rest): <strong style={{ color:"#F5C842" }}>{result.bmr.toLocaleString()} cal/day</strong>
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>How This Calculator Works</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".5rem" }}>This calculator uses the Mifflin-St Jeor equation, considered the most accurate formula for estimating BMR (Basal Metabolic Rate) - the calories your body burns at complete rest.</div>
          <div>Your BMR is then multiplied by an activity factor to get TDEE (Total Daily Energy Expenditure) - the actual number of calories you burn in a day including movement and exercise.</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Calorie Deficit Guide</h2>
        <div style={{ fontSize:".78rem", color:"#9A8F78" }}>
          {[
            ["500 cal deficit/day", "~0.5 kg loss per week - sustainable, recommended pace"],
            ["1000 cal deficit/day", "~1 kg loss per week - faster but harder to maintain"],
            ["500 cal surplus/day", "~0.5 kg gain per week - for muscle building phases"],
          ].map(([t,d]) => (
            <div key={t} style={{ marginBottom:".5rem", paddingBottom:".5rem", borderBottom:"1px solid rgba(212,160,23,.08)" }}>
              <div style={{ fontWeight:600, color:"#F0E6C8" }}>{t}</div>
              <div style={{ fontSize:".74rem" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is this calculator accurate for everyone?", "It gives a solid estimate for most people, but individual metabolism varies based on muscle mass, genetics, and health conditions. Use it as a starting point and adjust based on real results over 2-3 weeks."],
          ["Should I eat below my BMR?", "No. Eating below your BMR for extended periods can slow metabolism and cause muscle loss. Stay above BMR and create your deficit through TDEE instead."],
          ["How often should I recalculate?", "Recalculate every time your weight changes by 5kg or more, or every 4-6 weeks during active weight loss or gain phases."],
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

"use client";
import { useState } from "react";

export default function BMIClient() {
  const [weight, setWeight] = useState(""); 
  const [height, setHeight] = useState("");
  
  const w = parseFloat(weight); 
  const h = parseFloat(height) / 100;
  const bmi = w && h ? +(w / (h * h)).toFixed(1) : null;
  const cat = bmi ? (bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese") : null;
  const pct = bmi ? (bmi < 18.5 ? Math.max(0, (bmi / 18.5) * 25) : bmi < 25 ? 25 + (bmi - 18.5) / (25 - 18.5) * 25 : bmi < 30 ? 50 + (bmi - 25) / 5 * 25 : Math.min(100, 75 + (bmi - 30) / 10 * 25)) : 0;
  const catColor = bmi ? (bmi < 18.5 ? "#3b82f6" : bmi < 25 ? "#22c55e" : bmi < 30 ? "#f59e0b" : "#ef4444") : "#9A8F78";

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>BMI Calculator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Calculate your Body Mass Index (BMI) and discover your ideal healthy weight range instantly.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
          <input type="number" className="inp" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
          <input type="number" className="inp" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
        {bmi && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: ".75rem" }}>
              <div className="stat-box">
                <div style={{ fontSize: "1.4rem", fontWeight: 600, color: "#F5C842" }}>{bmi}</div>
                <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>BMI Index</div>
              </div>
              <div className="stat-box">
                <div style={{ fontSize: "1rem", fontWeight: 600, color: catColor }}>{cat}</div>
                <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>Weight Category</div>
              </div>
            </div>
            <div style={{ height: 12, borderRadius: 6, background: "linear-gradient(90deg,#3b82f6 0%,#22c55e 25%,#f59e0b 50%,#ef4444 75%)", position: "relative", marginBottom: ".3rem" }}>
              <div style={{ position: "absolute", top: -4, left: `${Math.min(98, pct)}%`, transform: "translateX(-50%)", width: 4, height: 20, background: "#fff", borderRadius: 2 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".62rem", color: "#9A8F78", marginBottom: ".75rem" }}>
              <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
            </div>
          </>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Standard BMI Categories</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78" }}>
          {[
            ["Under 18.5", "Underweight", "#3b82f6"],
            ["18.5 - 24.9", "Normal Weight", "#22c55e"],
            ["25.0 - 29.9", "Overweight", "#f59e0b"],
            ["30.0 and Above", "Obese", "#ef4444"]
          ].map(([range, cat, color]) => (
            <div key={cat} style={{ display: "flex", justifyContent: "space-between", padding: ".3rem .5rem", borderLeft: `2px solid ${color}`, marginBottom: ".3rem", background: "rgba(255,255,255,.02)", borderRadius: "0 4px 4px 0" }}>
              <span style={{ color: "#F0E6C8" }}>{range}</span><span style={{ color }}>{cat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>The BMI Formula</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ padding: ".5rem .75rem", background: "rgba(212,160,23,.06)", borderRadius: 7, marginBottom: ".6rem", fontFamily: "monospace" }}>
            BMI = Weight (kg) / [Height (m)]²
          </div>
          <div>Calculation Example: Weight = 70kg, Height = 170cm (1.70m)</div>
          <div>BMI = 70 / (1.70 x 1.70) = 24.2 (<span style={{ color: "#22c55e" }}>Normal Range</span>)</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is BMI evaluation fully accurate for everyone?", "BMI serves as a general weight tracking estimate. It does not measure body fat directly or differentiate muscle mass, age, or structural body frames. Please consult a health professional for comprehensive evaluations."],
          ["What is considered a normal BMI range?", "A medical score ranging strictly between 18.5 and 24.9 is considered normal, indicative of optimal weight proportions according to World Health Organization (WHO) benchmarks."],
          ["Does BMI criteria differ for South Asian populations?", "Yes, research indicates that South Asian populations may experience health risks at lower scores. In some Asian health guidelines, a BMI above 23 is flagged as overweight, and scores above 27.5 denote clinical obesity."]
        ].map(([q, a]) => (
          <div key={q} style={{ marginBottom: ".6rem", paddingBottom: ".6rem", borderBottom: "1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>Q: {q}</div>
            <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
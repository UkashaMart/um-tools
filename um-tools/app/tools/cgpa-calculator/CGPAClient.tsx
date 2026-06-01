"use client";
import { useState } from "react";

type Subject = { name: string; gp: string; ch: string };

const grades = [
  ["4", "A (4.0)"], ["3.7", "A- (3.7)"], ["3.3", "B+ (3.3)"], 
  ["3", "B (3.0)"], ["2.7", "B- (2.7)"], ["2.3", "C+ (2.3)"], 
  ["2", "C (2.0)"], ["1.7", "C- (1.7)"], ["1.3", "D+ (1.3)"], 
  ["1", "D (1.0)"], ["0", "F (0.0)"]
];

export default function CGPAClient() {
  const [subs, setSubs] = useState<Subject[]>([
    { name: "", gp: "4", ch: "" },
    { name: "", gp: "4", ch: "" },
    { name: "", gp: "4", ch: "" }
  ]);
  const [result, setResult] = useState<{ cgpa: string; grade: string; ch: number } | null>(null);

  const update = (i: number, k: keyof Subject, v: string) => 
    setSubs(p => p.map((s, j) => j === i ? { ...s, [k]: v } : s));
    
  const add = () => setSubs(p => [...p, { name: "", gp: "4", ch: "" }]);
  const remove = (i: number) => setSubs(p => p.filter((_, j) => j !== i));
  
  const calc = () => {
    let tp = 0, tc = 0;
    subs.forEach(s => {
      const ch = +s.ch;
      if (ch > 0) {
        tp += +s.gp * ch;
        tc += ch;
      }
    });
    if (!tc) return;
    const cgpa = (tp / tc).toFixed(2);
    const g = +cgpa >= 3.7 ? "A" : +cgpa >= 3.3 ? "A-" : +cgpa >= 3 ? "B+" : +cgpa >= 2.7 ? "B" : +cgpa >= 2.3 ? "B-" : +cgpa >= 2 ? "C+" : "Below C";
    setResult({ cgpa, grade: g, ch: tc });
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>CGPA Calculator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Calculate your Semester GPA and Cumulative CGPA on a standard 4.0 scale for Pakistani universities.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: ".4rem", marginBottom: ".5rem" }}>
          {["Subject Name", "Grade", "Credit Hours", ""].map(h => (
            <div key={h} style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px" }}>{h}</div>
          ))}
        </div>
        
        {subs.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: ".4rem", marginBottom: ".4rem" }}>
            <input type="text" className="inp" placeholder={`Subject ${i + 1}`} value={s.name} onChange={e => update(i, "name", e.target.value)} />
            <select className="inp" value={s.gp} onChange={e => update(i, "gp", e.target.value)}>
              {grades.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <input type="number" className="inp" placeholder="e.g. 3" min={1} max={6} value={s.ch} onChange={e => update(i, "ch", e.target.value)} />
            <button className="btn-outline" onClick={() => remove(i)} style={{ padding: ".3rem .5rem" }}>✕</button>
          </div>
        ))}
        
        <div style={{ display: "flex", gap: ".6rem", marginTop: ".5rem" }}>
          <button className="btn-outline" onClick={add}>+ Add Subject</button>
          <button className="btn-gold" onClick={calc}>Calculate CGPA</button>
        </div>
        
        {result && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginTop: ".75rem" }}>
            {[[result.cgpa, "CGPA (4.0 Scales)"], [result.grade, "Overall Grade"], [result.ch, "Total Credit Hours Managed"]].map(([v, k]) => (
              <div key={k} className="stat-box">
                <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#F5C842" }}>{v}</div>
                <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>{k}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Grade Point Scale (HEC Pakistan Standard)</h2>
        <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>
          {[
            ["A", "90 - 100", "4.0"], ["A-", "85 - 89", "3.7"], ["B+", "80 - 84", "3.3"], 
            ["B", "75 - 79", "3.0"], ["B-", "70 - 74", "2.7"], ["C+", "65 - 69", "2.3"], 
            ["C", "60 - 64", "2.0"], ["D", "50 - 59", "1.0"], ["F", "Below 50", "0.0"]
          ].map(([g, marks, gp]) => (
            <div key={g} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", padding: ".25rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
              <strong style={{ color: "#F5C842" }}>{g}</strong>
              <span>{marks}% Marks</span>
              <span style={{ color: "#D4A017" }}>{gp} GP</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Academic CGPA Benchmark Requirements</h2>
        <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>
          {[
            ["Minimum Passing Criteria", "2.0+"], ["Dean's Honor List Distinction", "3.5+"], 
            ["University Gold Medal Standing", "3.8+"], ["Postgraduate MS/MPhil Admission", "2.5+"], 
            ["Merit Scholarship Retention", "3.0+"]
          ].map(([req, cgpa]) => (
            <div key={req} style={{ display: "flex", justifyContent: "space-between", padding: ".3rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
              <span>{req}</span>
              <strong style={{ color: "#F5C842" }}>CGPA {cgpa}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is this CGPA calculator fully free to use?", "Yes, this academic utility tool is entirely free for all university students, requiring no sign-up documentation."],
          ["What is the maximum limit of subjects I can input?", "There are no hard limits implemented. You can dynamically append as many rows as needed using the '+ Add Subject' feature."],
          ["How can I efficiently improve my cumulative CGPA?", "Prioritizing exceptional grades in high credit-hour subjects yields a significantly greater structural impact on your aggregate math calculations."]
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
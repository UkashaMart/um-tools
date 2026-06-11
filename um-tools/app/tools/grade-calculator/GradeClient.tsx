"use client";
import { useState } from "react";

type Subject = { name: string; score: string; total: string; weight: string };

export default function GradeClient() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "", score: "", total: "100", weight: "1" },
    { name: "", score: "", total: "100", weight: "1" },
  ]);

  const update = (i: number, k: keyof Subject, v: string) =>
    setSubjects(p => p.map((s, j) => j === i ? { ...s, [k]: v } : s));

  const add = () => setSubjects(p => [...p, { name: "", score: "", total: "100", weight: "1" }]);
  const remove = (i: number) => setSubjects(p => p.filter((_, j) => j !== i));

  const valid = subjects.filter(s => s.score && s.total && parseFloat(s.total) > 0);
  const totalWeight = valid.reduce((s, sub) => s + parseFloat(sub.weight || "1"), 0);
  const weightedPct = valid.length
    ? valid.reduce((s, sub) => s + (parseFloat(sub.score) / parseFloat(sub.total)) * 100 * parseFloat(sub.weight || "1"), 0) / totalWeight
    : 0;

  const getLetterGrade = (pct: number) =>
    pct >= 90 ? "A+" : pct >= 85 ? "A" : pct >= 80 ? "A-" : pct >= 75 ? "B+" : pct >= 70 ? "B" : pct >= 65 ? "B-" : pct >= 60 ? "C+" : pct >= 55 ? "C" : pct >= 50 ? "D" : "F";

  const getGPA = (pct: number) =>
    pct >= 90 ? 4.0 : pct >= 85 ? 3.7 : pct >= 80 ? 3.3 : pct >= 75 ? 3.0 : pct >= 70 ? 2.7 : pct >= 65 ? 2.3 : pct >= 60 ? 2.0 : pct >= 55 ? 1.7 : pct >= 50 ? 1.0 : 0.0;

  const letter = getLetterGrade(weightedPct);
  const gpa = getGPA(weightedPct);
  const gradeColor = weightedPct >= 75 ? "#22c55e" : weightedPct >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Grade Calculator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Calculate your weighted grade, GPA and percentage for all subjects</p>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: ".4rem", marginBottom: ".5rem" }}>
          {["Subject", "Score", "Total", "Weight", ""].map(h => (
            <div key={h} style={{ fontSize: ".6rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px" }}>{h}</div>
          ))}
        </div>

        {subjects.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: ".4rem", marginBottom: ".4rem" }}>
            <input type="text" className="inp" placeholder={`Subject ${i + 1}`} value={s.name} onChange={e => update(i, "name", e.target.value)} />
            <input type="number" className="inp" placeholder="Score" value={s.score} onChange={e => update(i, "score", e.target.value)} />
            <input type="number" className="inp" placeholder="100" value={s.total} onChange={e => update(i, "total", e.target.value)} />
            <input type="number" className="inp" placeholder="1" min="1" value={s.weight} onChange={e => update(i, "weight", e.target.value)} />
            <button onClick={() => remove(i)} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#ef4444", borderRadius: 6, padding: ".3rem .5rem", cursor: "pointer", fontSize: ".8rem" }}>X</button>
          </div>
        ))}

        <div style={{ display: "flex", gap: ".6rem", marginTop: ".5rem" }}>
          <button className="btn-outline" onClick={add}>+ Add Subject</button>
        </div>

        {valid.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginTop: "1rem" }}>
            <div className="stat-box" style={{ background: "rgba(212,160,23,.1)" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#F5C842" }}>{weightedPct.toFixed(1)}%</div>
              <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>Overall Percentage</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: gradeColor }}>{letter}</div>
              <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>Letter Grade</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#F5C842" }}>{gpa.toFixed(1)}</div>
              <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>GPA (4.0)</div>
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Grade Scale</h2>
        <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>
          {[["A+", "90-100%", "4.0"], ["A", "85-89%", "3.7"], ["A-", "80-84%", "3.3"], ["B+", "75-79%", "3.0"], ["B", "70-74%", "2.7"], ["C", "60-64%", "2.0"], ["D", "50-59%", "1.0"], ["F", "Below 50%", "0.0"]].map(([g, pct, gpa]) => (
            <div key={g} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", padding: ".25rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
              <strong style={{ color: "#F5C842" }}>{g}</strong>
              <span>{pct}</span>
              <span style={{ color: "#D4A017" }}>{gpa}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>FAQ</h2>
        {[["What is weighted grade?", "Weighted grade gives more importance to subjects with higher weight/credit hours."], ["How many subjects can I add?", "As many as you need — no limit!"], ["What is GPA?", "Grade Point Average on 4.0 scale. 4.0 is perfect, 2.0 is usually minimum to pass."]].map(([q, a]) => (
          <div key={q} style={{ marginBottom: ".6rem", paddingBottom: ".6rem", borderBottom: "1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>Q: {q}</div>
            <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

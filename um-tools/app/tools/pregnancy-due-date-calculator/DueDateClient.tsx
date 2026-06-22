"use client";
import { useState } from "react";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function getTrimester(week: number): string {
  if (week <= 13) return "First Trimester";
  if (week <= 27) return "Second Trimester";
  return "Third Trimester";
}

export default function DueDateClient() {
  const [method, setMethod] = useState<"lmp" | "conception" | "ivf">("lmp");
  const [lmpDate, setLmpDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [conceptionDate, setConceptionDate] = useState("");
  const [ivfDate, setIvfDate] = useState("");
  const [result, setResult] = useState<{
    dueDate: Date;
    currentWeek: number;
    currentDay: number;
    trimester: string;
    conceptionEst: Date;
    daysLeft: number;
  } | null>(null);

  const calculate = () => {
    let dueDate: Date;
    let conceptionEst: Date;
    const today = new Date();

    if (method === "lmp") {
      if (!lmpDate) return;
      const lmp = new Date(lmpDate);
      const cycleAdjust = parseInt(cycleLength) - 28;
      dueDate = addDays(lmp, 280 + cycleAdjust);
      conceptionEst = addDays(lmp, 14 + cycleAdjust);
    } else if (method === "conception") {
      if (!conceptionDate) return;
      const conception = new Date(conceptionDate);
      dueDate = addDays(conception, 266);
      conceptionEst = conception;
    } else {
      if (!ivfDate) return;
      const transferDate = new Date(ivfDate);
      dueDate = addDays(transferDate, 261); // 5-day transfer default
      conceptionEst = addDays(transferDate, -5);
    }

    const gestationStart = method === "lmp" ? new Date(lmpDate) : addDays(conceptionEst, -14);
    const diffMs = today.getTime() - gestationStart.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const currentWeek = Math.max(0, Math.floor(diffDays / 7));
    const currentDay = Math.max(0, diffDays % 7);
    const daysLeft = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    setResult({
      dueDate,
      currentWeek,
      currentDay,
      trimester: getTrimester(currentWeek),
      conceptionEst,
      daysLeft,
    });
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Pregnancy Due Date Calculator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Calculate your estimated due date, current week, and trimester — free and instant</p>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".5rem" }}>Calculate Using</div>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {[["lmp", "Last Period Date"], ["conception", "Conception Date"], ["ivf", "IVF Transfer Date"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMethod(key as any)}
              style={{
                padding: ".4rem .9rem",
                borderRadius: 20,
                border: `1px solid ${method === key ? "#D4A017" : "rgba(212,160,23,.3)"}`,
                background: method === key ? "rgba(212,160,23,.15)" : "transparent",
                color: method === key ? "#F5C842" : "#9A8F78",
                cursor: "pointer",
                fontSize: ".8rem",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {method === "lmp" && (
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>First Day of Last Period</div>
              <input type="date" className="inp" value={lmpDate} onChange={e => setLmpDate(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Average Cycle Length</div>
              <select className="inp" value={cycleLength} onChange={e => setCycleLength(e.target.value)}>
                {Array.from({ length: 15 }, (_, i) => 21 + i).map(n => (
                  <option key={n} value={n}>{n} days</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {method === "conception" && (
          <div style={{ marginBottom: ".75rem" }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Estimated Conception Date</div>
            <input type="date" className="inp" value={conceptionDate} onChange={e => setConceptionDate(e.target.value)} style={{ maxWidth: 250 }} />
          </div>
        )}

        {method === "ivf" && (
          <div style={{ marginBottom: ".75rem" }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>5-Day Embryo Transfer Date</div>
            <input type="date" className="inp" value={ivfDate} onChange={e => setIvfDate(e.target.value)} style={{ maxWidth: 250 }} />
          </div>
        )}

        <button className="btn-gold" onClick={calculate} style={{ width: "100%", padding: ".7rem", fontSize: "1rem" }}>Calculate Due Date</button>
      </div>

      {result && (
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div style={{ textAlign: "center", marginBottom: "1rem", padding: "1rem", background: "rgba(212,160,23,.1)", borderRadius: 10 }}>
            <div style={{ fontSize: ".7rem", color: "#9A8F78", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".4rem" }}>Estimated Due Date</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#F5C842", fontFamily: "Cinzel,serif" }}>{formatDate(result.dueDate)}</div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
            {[
              [`${result.currentWeek}w ${result.currentDay}d`, "Current Week"],
              [result.trimester, "Trimester"],
              [result.daysLeft, "Days Left"],
              [formatDate(result.conceptionEst).split(",")[0], "Est. Conception"],
            ].map(([v, k]) => (
              <div key={k} className="stat-box">
                <div style={{ fontSize: ".95rem", fontWeight: 600, color: "#F5C842" }}>{v}</div>
                <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>How Due Dates Are Calculated</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ marginBottom: ".5rem" }}>The most common method (Naegele's rule) estimates your due date as 280 days (40 weeks) from the first day of your last menstrual period, assuming a 28-day cycle.</div>
          <div style={{ marginBottom: ".5rem" }}>If your cycle is longer or shorter than 28 days, this calculator adjusts the estimate accordingly.</div>
          <div>For conception-based calculation, your due date is estimated at 266 days (38 weeks) from the conception date.</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Pregnancy Trimesters</h2>
        <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>
          {[["First Trimester", "Weeks 1-13", "Early development, morning sickness common"], ["Second Trimester", "Weeks 14-27", "Often called the 'golden period', energy returns"], ["Third Trimester", "Weeks 28-40+", "Final growth, preparation for birth"]].map(([t, w, d]) => (
            <div key={t} style={{ display: "flex", justifyContent: "space-between", padding: ".4rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)", gap: ".5rem" }}>
              <strong style={{ color: "#F5C842", minWidth: 110 }}>{t}</strong>
              <span style={{ minWidth: 80 }}>{w}</span>
              <span style={{ flex: 1, textAlign: "right" }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".5rem" }}>Important Note</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", padding: ".5rem .75rem", background: "rgba(239,68,68,.06)", borderRadius: 7, borderLeft: "2px solid #ef4444" }}>
          This calculator provides an estimate only. Only about 5% of babies are born exactly on their due date. Always consult your doctor or midwife for accurate dating, especially through ultrasound confirmation.
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>FAQ</h2>
        {[
          ["How accurate is a due date calculator?", "Due date calculators provide an estimate. Only about 5% of babies arrive on the exact predicted date — most arrive within 2 weeks before or after."],
          ["What if I don't know my last period date?", "Use the conception date method instead, or consult your doctor for an ultrasound-based estimate, which is often more accurate."],
          ["What is considered full term?", "Full term is defined as 39 weeks to 40 weeks and 6 days. Babies born before 37 weeks are considered preterm."],
          ["How is gestational age different from fetal age?", "Gestational age is counted from the last menstrual period, while fetal age is counted from conception — gestational age is typically about 2 weeks more."],
          ["Can cycle length affect my due date?", "Yes. Longer or shorter cycles shift when ovulation likely occurred, which this calculator accounts for when you select your cycle length."]
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

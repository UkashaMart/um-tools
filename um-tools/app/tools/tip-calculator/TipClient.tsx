"use client";
import { useState } from "react";

export default function TipClient() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("15");
  const [people, setPeople] = useState("1");

  const b = parseFloat(bill) || 0;
  const t = parseFloat(tip) || 0;
  const p = parseInt(people) || 1;
  const tipAmount = b * t / 100;
  const total = b + tipAmount;
  const perPerson = total / p;
  const tipPerPerson = tipAmount / p;

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Tip Calculator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Calculate tip amount and split bill between friends instantly</p>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ marginBottom: ".6rem" }}>
          <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".3rem" }}>Bill Amount</div>
          <input type="number" className="inp" placeholder="e.g. 5000" value={bill} onChange={e => setBill(e.target.value)} />
        </div>
        <div style={{ marginBottom: ".75rem" }}>
          <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".5rem" }}>Tip Percentage: {tip}%</div>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", marginBottom: ".5rem" }}>
            {["10", "15", "18", "20", "25"].map(pct => (
              <button key={pct} onClick={() => setTip(pct)} style={{ padding: ".35rem .75rem", borderRadius: 20, border: `1px solid ${tip === pct ? "#D4A017" : "rgba(212,160,23,.3)"}`, background: tip === pct ? "rgba(212,160,23,.15)" : "transparent", color: tip === pct ? "#F5C842" : "#9A8F78", cursor: "pointer", fontSize: ".8rem" }}>{pct}%</button>
            ))}
          </div>
          <input type="range" min="0" max="50" value={tip} onChange={e => setTip(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: ".75rem" }}>
          <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".3rem" }}>Number of People</div>
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <button onClick={() => setPeople(String(Math.max(1, p - 1)))} className="btn-outline" style={{ padding: ".3rem .7rem", fontSize: "1.2rem" }}>-</button>
            <input type="number" className="inp" min="1" value={people} onChange={e => setPeople(e.target.value)} style={{ width: 80, textAlign: "center" }} />
            <button onClick={() => setPeople(String(p + 1))} className="btn-outline" style={{ padding: ".3rem .7rem", fontSize: "1.2rem" }}>+</button>
          </div>
        </div>

        {b > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
            {[[tipAmount.toFixed(2), "Tip Amount"], [total.toFixed(2), "Total Bill"], [perPerson.toFixed(2), "Per Person"], [tipPerPerson.toFixed(2), "Tip/Person"]].map(([v, k]) => (
              <div key={k} className="stat-box">
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "#F5C842" }}>{v}</div>
                <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>{k}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Standard Tip Guide</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78" }}>
          {[["10%", "Poor service"], ["15%", "Average service"], ["18%", "Good service"], ["20%", "Great service"], ["25%+", "Exceptional service"]].map(([pct, desc]) => (
            <div key={pct} style={{ display: "flex", justifyContent: "space-between", padding: ".3rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
              <strong style={{ color: "#F5C842" }}>{pct}</strong><span>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>FAQ</h2>
        {[["How is tip calculated?", "Tip = Bill Amount x Tip Percentage / 100. Per person = Total / Number of people."], ["What is a good tip?", "15-20% is standard. For great service, 20-25% is appreciated."], ["Do we tip on tax?", "You can tip on pre-tax or post-tax amount — both are acceptable."]].map(([q, a]) => (
          <div key={q} style={{ marginBottom: ".6rem", paddingBottom: ".6rem", borderBottom: "1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>Q: {q}</div>
            <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

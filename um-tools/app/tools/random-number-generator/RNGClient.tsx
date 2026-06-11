"use client";
import { useState } from "react";

export default function RNGClient() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [result, setResult] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);

  const generate = () => {
    const mn = parseInt(min) || 1;
    const mx = parseInt(max) || 100;
    const cnt = Math.min(parseInt(count) || 1, 50);
    if (mn >= mx) return;
    const nums = Array.from({ length: cnt }, () => Math.floor(Math.random() * (mx - mn + 1)) + mn);
    setResult(nums);
    setHistory(prev => [...nums, ...prev].slice(0, 20));
  };

  const rollDice = (sides: number) => {
    const n = Math.floor(Math.random() * sides) + 1;
    setResult([n]);
    setHistory(prev => [n, ...prev].slice(0, 20));
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Random Number Generator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Generate random numbers instantly — set range, count, or roll dice</p>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".3rem" }}>Min</div>
            <input type="number" className="inp" value={min} onChange={e => setMin(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".3rem" }}>Max</div>
            <input type="number" className="inp" value={max} onChange={e => setMax(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".3rem" }}>Count</div>
            <input type="number" className="inp" value={count} min="1" max="50" onChange={e => setCount(e.target.value)} />
          </div>
        </div>
        <button className="btn-gold" onClick={generate} style={{ width: "100%", padding: ".7rem", fontSize: "1rem" }}>Generate</button>

        {result.length > 0 && (
          <div style={{ marginTop: ".75rem", textAlign: "center" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", justifyContent: "center" }}>
              {result.map((n, i) => (
                <div key={i} style={{ background: "linear-gradient(135deg,#A07810,#D4A017)", color: "#111", fontFamily: "Cinzel,serif", fontSize: result.length === 1 ? "2.5rem" : "1.3rem", fontWeight: 700, padding: result.length === 1 ? "1rem 2rem" : ".5rem 1rem", borderRadius: 10, minWidth: 60, textAlign: "center" }}>{n}</div>
              ))}
            </div>
            <button className="btn-outline" onClick={() => navigator.clipboard.writeText(result.join(", "))} style={{ marginTop: ".5rem", fontSize: ".75rem" }}>Copy</button>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".75rem" }}>Dice Roller</div>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          {[4, 6, 8, 10, 12, 20, 100].map(s => (
            <button key={s} className="btn-outline" onClick={() => rollDice(s)} style={{ fontSize: ".8rem" }}>D{s}</button>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".5rem" }}>History</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
            {history.map((n, i) => (
              <span key={i} style={{ fontSize: ".8rem", color: "#9A8F78", background: "rgba(212,160,23,.06)", padding: "2px 8px", borderRadius: 5 }}>{n}</span>
            ))}
          </div>
          <button className="btn-outline" onClick={() => setHistory([])} style={{ marginTop: ".5rem", fontSize: ".72rem" }}>Clear History</button>
        </div>
      )}

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Random Number Generator Uses</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["Games", "Lucky draw, board games, decisions"], ["Education", "Statistics, probability practice"], ["Passwords", "Random PIN generation"], ["Contests", "Winner selection from group"], ["Dice", "RPG, board games dice rolling"], ["Decisions", "Can't decide? Let random choose"]].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>FAQ</h2>
        {[["Is this truly random?", "Yes! Uses JavaScript's cryptographic Math.random() — unpredictable results every time."], ["How many numbers can I generate?", "Up to 50 numbers at once."], ["What is the range limit?", "Any range you want — from negative to any positive number."]].map(([q, a]) => (
          <div key={q} style={{ marginBottom: ".6rem", paddingBottom: ".6rem", borderBottom: "1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>Q: {q}</div>
            <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

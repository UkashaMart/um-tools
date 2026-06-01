"use client";
import { useState } from "react";

export default function AgeClient() {
  const [dob, setDob] = useState("");
  let y = 0, m = 0, d = 0, tot = 0, nextBd = 0;
  
  if (dob) {
    const birth = new Date(dob); 
    const now = new Date();
    y = now.getFullYear() - birth.getFullYear(); 
    m = now.getMonth() - birth.getMonth(); 
    d = now.getDate() - birth.getDate();
    
    if (d < 0) {
      m--;
      d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (m < 0) {
      y--;
      m += 12;
    }
    tot = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const nb = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nb <= now) nb.setFullYear(now.getFullYear() + 1);
    nextBd = Math.ceil((nb.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Age Calculator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Calculate your exact age in years, months, and days from your date of birth.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".5rem" }}>Date of Birth</div>
        <input type="date" className="inp" value={dob} onChange={e => setDob(e.target.value)} style={{ maxWidth: 220 }} />
        {dob && (
          <div style={{ marginTop: ".75rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: ".6rem" }}>
              {[[y, "Years"], [m, "Months"], [d, "Days"], [tot.toLocaleString(), "Total Days"]].map(([v, k]) => (
                <div key={String(k)} className="stat-box">
                  <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#F5C842" }}>{v}</div>
                  <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>{k}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: ".75rem", color: "#9A8F78", padding: ".4rem .6rem", background: "rgba(212,160,23,.06)", borderRadius: 5, borderLeft: "2px solid #D4A017" }}>
              Your next birthday is in {nextBd} days!
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Age Calculator Uses</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[
            ["Legal Documents", "Easily verify your exact age for passport, national identity card, or driving license applications."],
            ["Health & Fitness", "Essential for tracking age-based health recommendations and medical metrics."],
            ["Education", "Perfect for parents checking school eligibility and admission age requirements criteria."],
            ["Birthday Tracking", "Get a precise live countdown of how many days are left until your next birthday celebration."]
          ].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Standard Age Requirements (Pakistan)</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78" }}>
          {[
            ["Voting Age", "18 Years"],
            ["National Identity Card (CNIC)", "18 Years"],
            ["Driving License Eligibility", "18 Years"],
            ["Government Retirement Age", "60 Years"],
            ["Primary School Admission", "4-5 Years"]
          ].map(([label, age]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: ".25rem 0", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
              <span>{label}</span><strong style={{ color: "#F5C842" }}>{age}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is this age calculator free to use?", "Yes, it is completely free. There are no registration forms, subscriptions, or hidden charges."],
          ["Does it provide accurate age calculation?", "Yes, it calculates your exact age in years, months, and days based on standard calendar rules."],
          ["Does it show upcoming birthday information?", "Yes, it tells you exactly how many days are left until your next birthday automatically."]
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
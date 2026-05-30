"use client";
import { useState } from "react";
export default function PctClient() {
  const [v, setV] = useState<Record<string,string>>({});
  const [res1,setRes1]=useState(""); const [res2,setRes2]=useState(""); const [res3,setRes3]=useState("");
  const set=(k:string,val:string)=>setV(p=>({...p,[k]:val}));
  const n=(k:string)=>parseFloat(v[k])||0;
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Percentage Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>3 types ke percentage calculations - discount, marks, price change sab calculate karo</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".5rem" }}>Type 1: X ka Y% kya hoga?</div>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".5rem" }}>
          <input type="number" className="inp" placeholder="Amount (e.g. 5000)" value={v["p1x"]||""} onChange={e=>set("p1x",e.target.value)} />
          <input type="number" className="inp" placeholder="Percent % (e.g. 18)" value={v["p1y"]||""} onChange={e=>set("p1y",e.target.value)} />
          <button className="btn-gold" onClick={()=>setRes1(n("p1x")&&n("p1y")?`${n("p1x")} ka ${n("p1y")}% = ${(n("p1x")*n("p1y")/100).toFixed(2)}`:"Values enter karo")}>Calculate</button>
        </div>
        {res1 && <div className="res-box ok">{res1}</div>}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".5rem" }}>Type 2: A, B ka kitna % hai?</div>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".5rem" }}>
          <input type="number" className="inp" placeholder="Part (e.g. 45)" value={v["p2a"]||""} onChange={e=>set("p2a",e.target.value)} />
          <input type="number" className="inp" placeholder="Total (e.g. 60)" value={v["p2b"]||""} onChange={e=>set("p2b",e.target.value)} />
          <button className="btn-gold" onClick={()=>setRes2(n("p2a")&&n("p2b")?`${n("p2a")} is ${(n("p2a")/n("p2b")*100).toFixed(2)}% of ${n("p2b")}`:"Values enter karo")}>Calculate</button>
        </div>
        {res2 && <div className="res-box ok">{res2}</div>}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".5rem" }}>Type 3: X se Y tak % change?</div>
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".5rem" }}>
          <input type="number" className="inp" placeholder="Old value (e.g. 1000)" value={v["p3x"]||""} onChange={e=>set("p3x",e.target.value)} />
          <input type="number" className="inp" placeholder="New value (e.g. 1200)" value={v["p3y"]||""} onChange={e=>set("p3y",e.target.value)} />
          <button className="btn-gold" onClick={()=>{const ch=((n("p3y")-n("p3x"))/n("p3x")*100).toFixed(2);setRes3(n("p3x")&&n("p3y")?`${Number(ch)>=0?"Increase":"Decrease"}: ${Math.abs(+ch)}% (${n("p3x")} to ${n("p3y")})`:"Values enter karo")}}>Calculate</button>
        </div>
        {res3 && <div className="res-box ok">{res3}</div>}
      </div>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Real Life Examples</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:".6rem" }}>
          {[["Discount","Rs 5000 par 30% discount = Rs 1500 off"],["GST/Tax","Rs 10000 par 17% GST = Rs 1700"],["Exam Marks","450/600 marks = 75%"],["Salary Hike","40000 se 48000 = 20% increase"],["Profit/Loss","1000 se 900 = 10% loss"],["Commission","Sale Rs 50000 par 5% = Rs 2500"]].map(([t,ex])=>(
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{ex}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Aksar Pooche Jane Wale Sawal</h2>
        {[["Percentage kya hoti hai?","Percentage 100 ka fraction hai. 50% matlab 100 mein se 50."],["Discount calculate kaise karein?","Original price ka percentage nikalo aur minus karo. Type 1 use karein."],["Marks percentage kaise nikalein?","Type 2 use karein - obtained marks aur total marks dalo."]].map(([q,a])=>(
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
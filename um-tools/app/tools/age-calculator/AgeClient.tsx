"use client";
import { useState } from "react";
export default function AgeClient() {
  const [dob, setDob] = useState("");
  let y=0,m=0,d=0,tot=0,nextBd=0;
  if(dob){
    const birth=new Date(dob); const now=new Date();
    y=now.getFullYear()-birth.getFullYear(); m=now.getMonth()-birth.getMonth(); d=now.getDate()-birth.getDate();
    if(d<0){m--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(m<0){y--;m+=12;}
    tot=Math.floor((now.getTime()-birth.getTime())/(1000*60*60*24));
    const nb=new Date(now.getFullYear(),birth.getMonth(),birth.getDate());
    if(nb<=now)nb.setFullYear(now.getFullYear()+1);
    nextBd=Math.ceil((nb.getTime()-now.getTime())/(1000*60*60*24));
  }
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Age Calculator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Exact age years, months, days mein</p>
      <div className="card">
        <div style={{ fontSize:".62rem", fontWeight:600, color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".6rem" }}>Date of Birth</div>
        <input type="date" className="inp" value={dob} onChange={e=>setDob(e.target.value)} style={{ maxWidth:220 }} />
        {dob && (
          <div style={{ marginTop:".75rem" }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:".6rem" }}>
              {[[y,"Years"],[m,"Months"],[d,"Days"],[tot.toLocaleString(),"Total Days"]].map(([v,k])=>(
                <div key={String(k)} className="stat-box"><div style={{ fontSize:"1.2rem", fontWeight:600, color:"#F5C842" }}>{v}</div><div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{k}</div></div>
              ))}
            </div>
            <div style={{ fontSize:".75rem", color:"#9A8F78", padding:".4rem .6rem", background:"rgba(212,160,23,.06)", borderRadius:5, borderLeft:"2px solid #D4A017" }}>
              🎂 Agla birthday {nextBd} din baad hai!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

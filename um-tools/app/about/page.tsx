import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "About Us — UM Tools",
  description: "Free online utility tools for World Wide.",
};
export default function About() {
  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.5rem", color:"#F5C842", marginBottom:".3rem" }}>About UM Tools</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1.5rem" }}>Free online utility tools for everyone</p>
      <div style={{ background:"linear-gradient(135deg,#111827,#1a2235)", border:"1px solid rgba(212,160,23,0.3)", borderRadius:14, padding:"2rem", marginBottom:"1.25rem" }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.1rem", color:"#F5C842", marginBottom:".75rem" }}>Our Mission</div>
        <p style={{ fontSize:".9rem", color:"#9A8F78", lineHeight:1.8 }}>The aim of UM Tools is to help people in Pakistan and around the world <strong style={{ color:"#F0E6C8" }}>free, fast aur privacy-first</strong> Provide online tools. No signups, no data collection.</p>
      </div>
      <div style={{ display:"flex", gap:".75rem", flexWrap:"wrap", marginBottom:"1.25rem" }}>
        {[["25+","Free Tools"],["100%","Browser Based"],["0","Data Collected"],["24/7","Available"]].map(([v,k])=>(
          <div key={k} className="stat-box" style={{ flex:1, minWidth:100 }}>
            <div style={{ fontSize:"1.4rem", fontWeight:700, color:"#F5C842" }}>{v}</div>
            <div style={{ fontSize:".65rem", color:"#9A8F78", marginTop:2 }}>{k}</div>
          </div>
        ))}
      </div>
      <div className="card">
        {[["ti-bolt","Fast","All tools work instantly"],["ti-shield","Private","No data goes to our servers"],["ti-coin","Free","Absolutely free — No hidden charges"],["ti-device-mobile","Mobile Friendly","Works on both mobile and desktop"]].map(([icon,title,desc])=>(
          <div key={title} style={{ display:"flex", gap:".75rem", alignItems:"flex-start", marginBottom:".75rem" }}>
            <i className={`ti ${icon}`} style={{ fontSize:"1.1rem", color:"#D4A017", marginTop:2 }} />
            <div>
              <div style={{ fontSize:".85rem", fontWeight:600, color:"#F0E6C8" }}>{title}</div>
              <div style={{ fontSize:".78rem", color:"#9A8F78", marginTop:2 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center", marginTop:"1.5rem" }}>
        <Link href="/"><button className="btn-gold" style={{ padding:".6rem 1.5rem" }}>Explore All Tools</button></Link>
      </div>
    </div>
  );
}
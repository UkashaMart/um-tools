"use client";
import { useState } from "react";
const W = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur"];
const rnd = (a: string[]) => a[Math.floor(Math.random() * a.length)];
const sent = () => { const w = Array.from({length: 8+Math.floor(Math.random()*10)}, ()=>rnd(W)).join(" "); return w.charAt(0).toUpperCase()+w.slice(1)+"."; };
const para = () => Array.from({length: 4+Math.floor(Math.random()*4)}, sent).join(" ");

export default function LoremClient() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState("p");
  const [result, setResult] = useState("");

  const gen = () => {
    let r = "";
    if (type === "w") r = Array.from({length: count}, ()=>rnd(W)).join(" ");
    else if (type === "s") r = Array.from({length: count}, sent).join(" ");
    else r = Array.from({length: count}, para).join("\n\n");
    setResult(r);
  };

  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Lorem Ipsum Generator</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Placeholder text generate karo</p>
      <div className="card">
        <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem", alignItems:"center" }}>
          <input type="number" className="inp" value={count} min={1} max={20} onChange={e=>setCount(+e.target.value)} style={{ width:80 }} />
          <select className="inp" value={type} onChange={e=>setType(e.target.value)} style={{ width:140 }}>
            <option value="p">Paragraphs</option>
            <option value="s">Sentences</option>
            <option value="w">Words</option>
          </select>
          <button className="btn-gold" onClick={gen}><i className="ti ti-refresh" /> Generate</button>
        </div>
        {result && (
          <>
            <div className="res-box ok" style={{ whiteSpace:"pre-wrap", minHeight:100 }}>{result}</div>
            <button className="btn-outline" onClick={()=>navigator.clipboard.writeText(result)} style={{ marginTop:".5rem" }}><i className="ti ti-copy" /> Copy</button>
          </>
        )}
      </div>
    </div>
  );
}

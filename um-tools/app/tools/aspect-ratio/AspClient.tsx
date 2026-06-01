"use client";
import { useState } from "react";

export default function AspClient() {
  const [ow, setOw] = useState(""); 
  const [oh, setOh] = useState(""); 
  const [nw, setNw] = useState(""); 
  const [nh, setNh] = useState("");
  
  const ratio = +oh / +ow;
  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
  const g = +ow && +oh ? gcd(+ow, +oh) : 1;
  const rStr = +ow && +oh ? `${+ow / g}:${+oh / g}` : "";
  
  const calcFromW = () => { 
    if (ow && oh && nw) setNh(String(Math.round(+nw * ratio))); 
  };
  const calcFromH = () => { 
    if (ow && oh && nh) setNw(String(Math.round(+nh / ratio))); 
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Aspect Ratio Calculator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Maintain the perfect aspect ratio while resizing images to prevent distortion, stretching, or squishing.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".5rem" }}>Original Size</div>
        <div style={{ display: "flex", gap: ".6rem", alignItems: "center", flexWrap: "wrap", marginBottom: ".75rem" }}>
          <input type="number" className="inp" placeholder="Width (px)" value={ow} onChange={e => setOw(e.target.value)} />
          <span style={{ color: "#9A8F78" }}>x</span>
          <input type="number" className="inp" placeholder="Height (px)" value={oh} onChange={e => setOh(e.target.value)} />
        </div>
        
        {rStr && (
          <div style={{ padding: ".4rem .6rem", background: "rgba(212,160,23,.06)", borderRadius: 5, borderLeft: "2px solid #D4A017", marginBottom: ".75rem", fontSize: ".8rem", color: "#F0E6C8" }}>
            Aspect Ratio: <strong style={{ color: "#F5C842", fontSize: "1rem" }}>{rStr}</strong>
          </div>
        )}
        
        <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".5rem" }}>Calculate New Size</div>
        <div style={{ display: "flex", gap: ".6rem", alignItems: "center", flexWrap: "wrap", marginBottom: ".5rem" }}>
          <input type="number" className="inp" placeholder="New Width" value={nw} onChange={e => setNw(e.target.value)} />
          <span style={{ color: "#9A8F78" }}>x</span>
          <input type="number" className="inp" placeholder="New Height" value={nh} onChange={e => setNh(e.target.value)} />
        </div>
        
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <button className="btn-gold" onClick={calcFromW}>Calculate Height from Width</button>
          <button className="btn-gold" onClick={calcFromH}>Calculate Width from Height</button>
        </div>
        
        {nw && nh && rStr && (
          <div style={{ marginTop: ".75rem", padding: ".5rem .75rem", background: "rgba(74,222,128,.06)", borderRadius: 7, borderLeft: "2px solid #4ade80", fontSize: ".82rem", color: "#9A8F78" }}>
            New Size: <strong style={{ color: "#F5C842" }}>{nw} x {nh}px</strong> (Ratio: {rStr})
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Common Aspect Ratios</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[
            ["16:9", "YouTube Videos, TV Broadcasts, Desktop Monitors"],
            ["9:16", "Instagram Stories, TikToks, YouTube Shorts"],
            ["1:1", "Instagram Standard Posts, Profile Pictures"],
            ["4:3", "Classic Television Displays, Native Photograph Formats"],
            ["3:2", "DSLR Camera Prints, Traditional Film Photography"],
            ["2:1", "Panoramic Visuals, Ultrawide Digital Displays"]
          ].map(([ratio, use]) => (
            <div key={ratio} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".9rem", fontWeight: 700, color: "#F5C842", marginBottom: ".2rem", fontFamily: "monospace" }}>{ratio}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Social Media Image Sizes 2026</h2>
        <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>
          {[
            ["Facebook Cover Photo", "820 x 312px"],
            ["Instagram Standard Post", "1080 x 1080px"],
            ["Instagram Full Story", "1080 x 1920px"],
            ["YouTube Video Thumbnail", "1280 x 720px"],
            ["Twitter/X Header Banner", "1500 x 500px"],
            ["LinkedIn Company Cover", "1584 x 396px"]
          ].map(([platform, size]) => (
            <div key={platform} style={{ display: "flex", justifyContent: "space-between", padding: ".3rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
              <span>{platform}</span>
              <strong style={{ color: "#F5C842", fontFamily: "monospace" }}>{size}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["What exactly is an Aspect Ratio?", "It is the proportional relationship between an image's width and height. For example, a 16:9 ratio means that for every 16 units of width, there are 9 units of height."],
          ["Why do images get distorted or stretched?", "Distortion occurs when you change the width or height of an image independently without scaling the opposite dimension proportionally, forcing the graphic to stretch or squish."],
          ["What are the best aspect ratios for social media?", "The industry standard for generic feed posts is 1:1, full-screen mobile content or stories use 9:16, and widescreen landscape videos like YouTube utilize 16:9."]
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
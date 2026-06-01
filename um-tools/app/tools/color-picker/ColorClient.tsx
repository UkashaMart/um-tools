"use client";
import { useState } from "react";

function hexToRgb(h: string) {
  h = h.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16)
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0, l = (mx + mn) / 2;
  
  if (mx !== mn) {
    const d = mx - mn;
    s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
    switch (mx) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export default function ColorClient() {
  const [hex, setHex] = useState("#D4A017");
  const valid = /^#[0-9A-Fa-f]{6}$/.test(hex);
  const { r, g, b } = valid ? hexToRgb(hex) : { r: 0, g: 0, b: 0 };
  const { h, s, l } = valid ? rgbToHsl(r, g, b) : { h: 0, s: 0, l: 0 };
  
  const rgb = `rgb(${r}, ${g}, ${b})`; 
  const hsl = `hsl(${h}, ${s}%, ${l}%)`;

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Color Picker and Converter</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Convert colors between HEX, RGB, and HSL formats instantly — a free essential web utility tool for designers and front-end developers.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: ".6rem", alignItems: "center", marginBottom: ".75rem" }}>
          <input type="color" value={valid ? hex : "#000000"} onChange={e => setHex(e.target.value)} style={{ width: 56, height: 40, border: "none", background: "none", cursor: "pointer", borderRadius: 7 }} />
          <input type="text" className="inp" value={hex} onChange={e => setHex(e.target.value)} placeholder="#HEX" style={{ maxWidth: 140 }} />
          {valid && <div style={{ width: 56, height: 40, borderRadius: 8, border: "1px solid rgba(212,160,23,.2)", background: hex }} />}
        </div>
        
        {valid && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: ".6rem" }}>
              {[[`${r}, ${g}, ${b}`, "RGB Values"], [`${h}°, ${s}%, ${l}%`, "HSL Coordinates"], [hex.toUpperCase(), "HEX Code"]].map(([v, k]) => (
                <div key={k} className="stat-box">
                  <div style={{ fontSize: ".9rem", fontWeight: 600, color: "#F5C842" }}>{v}</div>
                  <div style={{ fontSize: ".65rem", color: "#9A8F78", marginTop: 2 }}>{k}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              <button className="btn-outline" onClick={() => navigator.clipboard.writeText(rgb)}>Copy RGB</button>
              <button className="btn-outline" onClick={() => navigator.clipboard.writeText(hsl)}>Copy HSL</button>
              <button className="btn-outline" onClick={() => navigator.clipboard.writeText(hex.toUpperCase())}>Copy HEX</button>
            </div>
          </>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Digital Color Formats Explained</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: ".6rem" }}>
          {[
            ["HEX Code", "The industry standard hexadecimal color shorthand format widely integrated throughout web architecture blueprints.", "#D4A017"],
            ["RGB Model", "Defines the specific structural intensity values ranging from 0-255 for Red, Green, and Blue source colors.", "rgb(212, 160, 23)"],
            ["HSL Space", "Represents colors based on Hue (degrees), Saturation (percentage), and Lightness (percentage) configurations.", "hsl(43, 80%, 46%)"]
          ].map(([title, desc, ex]) => (
            <div key={title} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{title}</div>
              <div style={{ fontSize: ".72rem", color: "#9A8F78", marginBottom: ".3rem" }}>{desc}</div>
              <div style={{ fontSize: ".7rem", color: "#D4A017", fontFamily: "monospace" }}>{ex}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Culturally Signified Branding Colors</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
          {[
            ["#01411C", "Pakistan Green"], ["#FFFFFF", "Pure White"], 
            ["#D4A017", "Premium Gold"], ["#001F5A", "Deep Navy Blue"], 
            ["#C8102E", "Classic Crimson Red"], ["#00A550", "Vibrant Emerald"]
          ].map(([color, name]) => (
            <div key={color} style={{ display: "flex", alignItems: "center", gap: ".5rem", padding: ".4rem .6rem", background: "rgba(255,255,255,.03)", borderRadius: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: color, border: "1px solid rgba(255,255,255,.1)" }} />
              <div>
                <div style={{ fontSize: ".75rem", color: "#F0E6C8" }}>{name}</div>
                <div style={{ fontSize: ".68rem", color: "#9A8F78", fontFamily: "monospace" }}>{color}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is this online color picker utility fully free to use?", "Yes, this conversion workspace is 100% free for all creative individuals and web developers, requiring no user account creation."],
          ["What is the fundamental difference between HEX and RGB formats?", "HEX is a base-16 alphanumeric shorthand code, whereas RGB explicitly states individual integers. Both map out the exact same visual spectrum point seamlessly."],
          ["Which color formatting option works best for modern CSS styling?", "HEX codes remain the easiest to integrate for fast deployment, but utilizing the HSL space is much more effective for setting up clean dark and light UI design themes."]
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
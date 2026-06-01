"use client";
import { useState } from "react";

export default function ImgClient() {
  const [b64, setB64] = useState(""); 
  const [size, setSize] = useState(""); 
  const [type, setType] = useState("");

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setType(f.type);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const r = ev.target?.result as string;
      setB64(r);
      setSize((r.length / 1024).toFixed(1) + " KB");
    };
    reader.readAsDataURL(f);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Image to Base64 Converter</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Instantly encode your local image files into Base64 raw strings — ideal for direct embedding into HTML structures or inline CSS stylesheets.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".5rem" }}>Select Image File</div>
        <input type="file" className="inp" accept="image/*" onChange={handle} style={{ padding: ".4rem", marginBottom: ".75rem" }} />
        {b64 && (
          <div>
            <img src={b64} alt="preview" style={{ maxWidth: 180, maxHeight: 180, borderRadius: 8, border: "1px solid rgba(212,160,23,.2)", display: "block", marginBottom: ".75rem" }} />
            <div style={{ display: "flex", gap: ".6rem", marginBottom: ".5rem", fontSize: ".75rem", color: "#9A8F78" }}>
              <span>File Size: <strong style={{ color: "#F5C842" }}>{size}</strong></span>
              <span>MIME Type: <strong style={{ color: "#F5C842" }}>{type}</strong></span>
            </div>
            <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".4rem" }}>Generated Base64 String</div>
            <div className="res-box ok" style={{ maxHeight: 100, overflowY: "auto", fontFamily: "monospace", fontSize: ".7rem", wordBreak: "break-all" }}>{b64}</div>
            <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem", flexWrap: "wrap" }}>
              <button className="btn-outline" onClick={() => navigator.clipboard.writeText(b64)}>Copy Base64</button>
              <button className="btn-outline" onClick={() => navigator.clipboard.writeText(`<img src="${b64}" alt="embedded image" />`)}>Copy as IMG Tag</button>
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>How to Implement in Development</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ marginBottom: ".5rem" }}>After copying the generated string, embed it directly into your HTML document:</div>
          <div style={{ padding: ".5rem .75rem", background: "rgba(0,0,0,.3)", borderRadius: 7, fontFamily: "monospace", fontSize: ".78rem", color: "#F0E6C8", wordBreak: "break-all" }}>
            {`<img src="data:image/png;base64,iVBOR..." alt="Embedded Asset" />`}
          </div>
          <div style={{ marginTop: ".5rem" }}>For rendering background images directly within inline CSS stylesheets:</div>
          <div style={{ padding: ".5rem .75rem", background: "rgba(0,0,0,.3)", borderRadius: 7, fontFamily: "monospace", fontSize: ".78rem", color: "#F0E6C8", marginTop: ".3rem" }}>
            {`background-image: url("data:image/png;base64,...");`}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>When to Use Base64 Image Strings</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[
            ["HTML Email Templates", "Bypass external asset filtering rules as remote asset paths often get blocked by default mail clients."],
            ["Small Interface Icons", "Embed micro logos, UI glyphs, or favicons directly into code blocks to optimize asset delivery."],
            ["Offline Applications", "Maintain visual layout components in standalone web tools operating entirely without internet connectivity."],
            ["CSS Sprite Optimization", "Reduce aggregate client overhead by cutting down on independent asset-fetching HTTP requests."]
          ].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".5rem" }}>Technical Restrictions</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", padding: ".5rem .75rem", background: "rgba(239,68,68,.06)", borderRadius: 7, borderLeft: "2px solid #ef4444" }}>
          This mechanism is not recommended for larger high-resolution images (100KB+). Base64 encoding increases file string size by approximately 33%, which can significantly slow down your document load speeds. Keep it reserved for small optimization assets only.
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Which image file extensions are supported?", "This decoder supports virtually all standard web formats including PNG, JPEG, GIF, WebP, and vector SVG files seamlessly."],
          ["Is my processed image data private and secure?", "Absolutely. All encoding operations run locally within your active client browser instance. No image components or file data strings are uploaded to external cloud platforms."],
          ["Can I process larger raw image sizes through this tool?", "Technically yes, but compiling assets over 100KB into long structural text configurations is highly discouraged due to document-rendering optimization bottlenecks."]
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
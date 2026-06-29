"use client";
import { useState, useRef } from "react";

export default function BgRemoverClient() {
  const [original, setOriginal] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setOriginal(URL.createObjectURL(f));
    setResult(null);
    setError("");
    process(f);
  };

  const process = async (file: File) => {
    setLoading(true);
    setProgress("Loading AI model (first time may take a moment)...");
    setError("");
    try {
      const mod: any = await import("@imgly/background-removal");
      const imglyRemoveBackground = mod.default;
      setProgress("Removing background...");
      const blob: Blob = await imglyRemoveBackground(file);
      const url = URL.createObjectURL(blob);
      setResult(url);
    } catch (err) {
      setError("Could not process this image. Please try a different photo or refresh and try again.");
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "background-removed.png";
    a.click();
  };

  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Background Remover</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Remove image backgrounds instantly with AI - free, no signup, processed entirely in your browser</p>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{ padding:".4rem", marginBottom:".75rem" }}
          className="inp"
        />

        {loading && (
          <div style={{ fontSize:".82rem", color:"#D4A017", padding:".6rem .75rem", background:"rgba(212,160,23,.08)", borderRadius:7, marginBottom:".75rem" }}>
            {progress}
          </div>
        )}

        {error && (
          <div style={{ fontSize:".82rem", color:"#ef4444", padding:".6rem .75rem", background:"rgba(239,68,68,.06)", borderRadius:7, marginBottom:".75rem" }}>
            {error}
          </div>
        )}

        {original && (
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".4rem" }}>Original</div>
              <img src={original} alt="original" style={{ maxWidth:"100%", maxHeight:280, borderRadius:8, border:"1px solid rgba(212,160,23,.2)" }} />
            </div>
            {result && (
              <div style={{ flex:1, minWidth:200 }}>
                <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".4rem" }}>Background Removed</div>
                <div style={{
                  background: "repeating-conic-gradient(#2a2a2a 0% 25%, #1a1a1a 0% 50%) 50% / 16px 16px",
                  borderRadius:8, border:"1px solid rgba(212,160,23,.2)", display:"inline-block"
                }}>
                  <img src={result} alt="result" style={{ maxWidth:"100%", maxHeight:280, display:"block" }} />
                </div>
                <button className="btn-gold" onClick={download} style={{ marginTop:".6rem" }}>Download PNG</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>How It Works</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".5rem" }}>This tool uses an AI segmentation model that runs entirely inside your browser. Your image is never uploaded to any server - all processing happens on your own device.</div>
          <div>The first time you use it, a small AI model file downloads to your browser. After that, results process much faster since the model is cached.</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Best Use Cases</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[
            ["Product Photos", "Clean white background for e-commerce listings"],
            ["Profile Pictures", "Isolate yourself for LinkedIn, resumes, or design work"],
            ["Graphic Design", "Extract subjects to combine with other backgrounds"],
            ["Presentations", "Add transparent images to slides cleanly"],
          ].map(([t,d]) => (
            <div key={t} style={{ padding:".6rem", background:"rgba(212,160,23,.05)", borderRadius:7, borderLeft:"2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>{t}</div>
              <div style={{ fontSize:".74rem", color:"#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is my image uploaded anywhere?", "No. The AI model runs entirely in your browser using your device's processing power. Your image never leaves your computer or phone."],
          ["Why does the first use take longer?", "An AI model file needs to download once. Your browser caches it afterward, so future uses are much faster."],
          ["What image formats are supported?", "JPG, PNG, and WebP images all work. The result downloads as a PNG with a transparent background."],
          ["Does it work on all backgrounds?", "It works best on images with a clear subject, like people, products, or animals. Very busy or low-contrast images may give less precise results."],
        ].map(([q,a]) => (
          <div key={q} style={{ marginBottom:".6rem", paddingBottom:".6rem", borderBottom:"1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize:".82rem", fontWeight:600, color:"#F0E6C8", marginBottom:".2rem" }}>Q: {q}</div>
            <div style={{ fontSize:".78rem", color:"#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
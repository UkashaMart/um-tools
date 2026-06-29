"use client";
import { useState, useRef, useCallback } from "react";

export default function BgRemoverClient() {
  const [original, setOriginal] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState(40);
  const [feather, setFeather] = useState(20);
  const [error, setError] = useState("");
  const [pickedColor, setPickedColor] = useState<[number, number, number] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgElRef = useRef<HTMLImageElement | null>(null);

  const colorDistance = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) => {
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  };

  const runRemoval = useCallback((bg: [number, number, number], tol: number, feath: number) => {
    const canvas = canvasRef.current;
    const img = imgElRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const [br, bg_, bb] = bg;
    const maxDist = 441.7;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const dist = colorDistance(r, g, b, br, bg_, bb);
      const distPct = (dist / maxDist) * 100;

      if (distPct < tol) {
        data[i + 3] = 0;
      } else if (distPct < tol + feath) {
        const fadeRatio = (distPct - tol) / feath;
        data[i + 3] = Math.round(255 * fadeRatio);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setResult(canvas.toDataURL("image/png"));
  }, []);

  const detectBackgroundColor = (img: HTMLImageElement): [number, number, number] => {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = img.naturalWidth;
    tmpCanvas.height = img.naturalHeight;
    const tmpCtx = tmpCanvas.getContext("2d")!;
    tmpCtx.drawImage(img, 0, 0);

    const w = tmpCanvas.width, h = tmpCanvas.height;
    const corners = [
      tmpCtx.getImageData(2, 2, 1, 1).data,
      tmpCtx.getImageData(w - 3, 2, 1, 1).data,
      tmpCtx.getImageData(2, h - 3, 1, 1).data,
      tmpCtx.getImageData(w - 3, h - 3, 1, 1).data,
    ];
    const avg = corners.reduce(
      (acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]],
      [0, 0, 0]
    ).map((v) => Math.round(v / 4)) as [number, number, number];
    return avg;
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setError("");
    setResult(null);

    const url = URL.createObjectURL(f);
    setOriginal(url);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgElRef.current = img;
      try {
        const bg = detectBackgroundColor(img);
        setPickedColor(bg);
        runRemoval(bg, tolerance, feather);
      } catch {
        setError("Could not process this image. Please try a different photo.");
      }
    };
    img.onerror = () => setError("Could not load this image file.");
    img.src = url;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = imgElRef.current;
    if (!img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * img.naturalWidth);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * img.naturalHeight);

    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = img.naturalWidth;
    tmpCanvas.height = img.naturalHeight;
    const tmpCtx = tmpCanvas.getContext("2d")!;
    tmpCtx.drawImage(img, 0, 0);
    const pixel = tmpCtx.getImageData(x, y, 1, 1).data;
    const bg: [number, number, number] = [pixel[0], pixel[1], pixel[2]];
    setPickedColor(bg);
    runRemoval(bg, tolerance, feather);
  };

  const updateTolerance = (val: number) => {
    setTolerance(val);
    if (pickedColor) runRemoval(pickedColor, val, feather);
  };

  const updateFeather = (val: number) => {
    setFeather(val);
    if (pickedColor) runRemoval(pickedColor, tolerance, val);
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
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1rem" }}>Remove solid or white backgrounds from images instantly - free, processed entirely in your browser</p>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <input type="file" accept="image/*" onChange={handleFile} className="inp" style={{ padding:".4rem", marginBottom:".75rem" }} />

        {error && (
          <div style={{ fontSize:".82rem", color:"#ef4444", padding:".6rem .75rem", background:"rgba(239,68,68,.06)", borderRadius:7, marginBottom:".75rem" }}>
            {error}
          </div>
        )}

        {original && (
          <>
            <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:".75rem" }}>
              <div style={{ flex:1, minWidth:160 }}>
                <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".3rem" }}>
                  Sensitivity: {tolerance}%
                </div>
                <input type="range" min={5} max={80} value={tolerance} onChange={e=>updateTolerance(+e.target.value)} style={{ width:"100%" }} />
              </div>
              <div style={{ flex:1, minWidth:160 }}>
                <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".3rem" }}>
                  Edge Smoothness: {feather}%
                </div>
                <input type="range" min={0} max={50} value={feather} onChange={e=>updateFeather(+e.target.value)} style={{ width:"100%" }} />
              </div>
            </div>
            <div style={{ fontSize:".74rem", color:"#9A8F78", marginBottom:".75rem" }}>
              Click anywhere on the original image below to pick a different background color.
            </div>

            <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
              <div style={{ flex:1, minWidth:200 }}>
                <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".4rem" }}>Original (click to pick color)</div>
                <img
                  src={original}
                  alt="original"
                  onClick={handleCanvasClick}
                  style={{ maxWidth:"100%", maxHeight:280, borderRadius:8, border:"1px solid rgba(212,160,23,.2)", cursor:"crosshair" }}
                />
              </div>
              {result && (
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"1px", textTransform:"uppercase", marginBottom:".4rem" }}>Result</div>
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
          </>
        )}
        <canvas ref={canvasRef} style={{ display:"none" }} />
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>How It Works</h2>
        <div style={{ fontSize:".82rem", color:"#9A8F78", lineHeight:1.9 }}>
          <div style={{ marginBottom:".5rem" }}>This tool automatically detects the background color from the corners of your image, then makes matching pixels transparent. It works entirely in your browser - your image is never uploaded anywhere.</div>
          <div>Works best on photos with a solid or near-solid background, like white or colored studio backdrops commonly used for product photography.</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".75rem" }}>Tips for Best Results</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:".6rem" }}>
          {[
            ["Use Solid Backgrounds", "White, black, or single-color backdrops work best"],
            ["Adjust Sensitivity", "Increase it if background remains, decrease if subject gets cut"],
            ["Click to Pick Color", "If auto-detection misses, click on the actual background area"],
            ["Smooth Edges", "Increase edge smoothness for cleaner, less jagged outlines"],
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
          ["Is my image uploaded anywhere?", "No. All processing happens directly in your browser using Canvas technology. Your image never leaves your device."],
          ["Does this work on any photo?", "It works best on images with a solid or uniform background, such as product photos taken against a plain backdrop. Complex or busy backgrounds will not separate cleanly."],
          ["The result removed part of my subject too, what do I do?", "Lower the sensitivity slider, or click directly on the background area to re-pick the correct color to target."],
          ["Why are the edges rough?", "Increase the edge smoothness slider to soften the transition between the subject and the transparent area."],
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
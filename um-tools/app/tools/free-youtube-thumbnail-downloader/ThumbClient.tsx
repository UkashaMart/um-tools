"use client";
import { useState } from "react";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

const qualities = [
  { key: "maxresdefault", label: "Max Resolution (HD)", size: "1280x720" },
  { key: "sddefault", label: "Standard Definition", size: "640x480" },
  { key: "hqdefault", label: "High Quality", size: "480x360" },
  { key: "mqdefault", label: "Medium Quality", size: "320x180" },
  { key: "default", label: "Default", size: "120x90" },
];

export default function ThumbClient() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState("");

  const fetchThumb = () => {
    const id = extractVideoId(url.trim());
    if (!id) {
      setError("Invalid YouTube URL. Please paste a valid YouTube video link.");
      setVideoId("");
      return;
    }
    setError("");
    setVideoId(id);
  };

  const download = async (imgUrl: string, quality: string) => {
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `youtube-thumbnail-${videoId}-${quality}.jpg`;
      link.click();
    } catch {
      window.open(imgUrl, "_blank");
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>YouTube Thumbnail Downloader</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Download YouTube video thumbnails in HD quality — free and instant</p>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
          <input
            type="text"
            className="inp"
            placeholder="Paste YouTube video URL here..."
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && fetchThumb()}
            style={{ flex: 1, minWidth: 220 }}
          />
          <button className="btn-gold" onClick={fetchThumb}>Get Thumbnail</button>
        </div>
        {error && <div style={{ color: "#ef4444", fontSize: ".8rem", marginTop: ".5rem" }}>{error}</div>}
      </div>

      {videoId && (
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".75rem" }}>Available Thumbnails</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: ".75rem" }}>
            {qualities.map(q => {
              const imgUrl = `https://img.youtube.com/vi/${videoId}/${q.key}.jpg`;
              return (
                <div key={q.key} style={{ background: "rgba(212,160,23,.05)", borderRadius: 10, padding: ".75rem", border: "1px solid rgba(212,160,23,.15)" }}>
                  <img
                    src={imgUrl}
                    alt={q.label}
                    style={{ width: "100%", borderRadius: 6, display: "block", marginBottom: ".5rem", background: "#000" }}
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div style={{ fontSize: ".8rem", color: "#F0E6C8", fontWeight: 600 }}>{q.label}</div>
                  <div style={{ fontSize: ".7rem", color: "#9A8F78", marginBottom: ".5rem" }}>{q.size}</div>
                  <button className="btn-outline" onClick={() => download(imgUrl, q.key)} style={{ width: "100%", fontSize: ".75rem" }}>Download</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>How to Download YouTube Thumbnail</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ marginBottom: ".4rem" }}>1. Copy any YouTube video URL (works with regular videos and Shorts)</div>
          <div style={{ marginBottom: ".4rem" }}>2. Paste it in the box above and click Get Thumbnail</div>
          <div style={{ marginBottom: ".4rem" }}>3. Choose your preferred quality and click Download</div>
          <div>4. Thumbnail saves directly to your device</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Who Uses This Tool?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["Content Creators", "Analyze competitor thumbnail styles"], ["Designers", "Reference for thumbnail design inspiration"], ["Marketers", "Save thumbnails for presentations"], ["Bloggers", "Use thumbnails in articles with credit"]].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".5rem" }}>Usage Note</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", padding: ".5rem .75rem", background: "rgba(239,68,68,.06)", borderRadius: 7, borderLeft: "2px solid #ef4444" }}>
          Thumbnails belong to their respective video owners. Please use downloaded images for personal reference, inspiration, or with proper credit — not for republishing as your own content.
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>FAQ</h2>
        {[
          ["Is this tool free?", "Yes, completely free with no limits on how many thumbnails you download."],
          ["What URL formats work?", "Regular YouTube links, youtu.be short links, and YouTube Shorts links all work."],
          ["Why does HD quality sometimes not show?", "Not every video has a maxresdefault (HD) thumbnail uploaded — try the High Quality option instead."],
          ["Can I download thumbnails from any video?", "Yes, as long as the video is public on YouTube."]
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

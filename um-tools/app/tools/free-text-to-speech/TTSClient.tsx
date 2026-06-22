"use client";
import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    puter?: any;
  }
}

const voiceOptions = [
  { id: "Joanna", label: "Joanna (US Female)" },
  { id: "Matthew", label: "Matthew (US Male)" },
  { id: "Amy", label: "Amy (UK Female)" },
  { id: "Brian", label: "Brian (UK Male)" },
  { id: "Aditi", label: "Aditi (Indian Female)" },
  { id: "Raveena", label: "Raveena (Indian Female)" },
  { id: "Salli", label: "Salli (US Female)" },
  { id: "Justin", label: "Justin (US Male Child)" },
];

export default function TTSClient() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("Joanna");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (window.puter) { setScriptReady(true); return; }
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => setError("Could not load speech engine. Please refresh and try again.");
    document.body.appendChild(script);
  }, []);

  const generate = async () => {
    if (!text.trim() || !window.puter) return;
    setLoading(true);
    setError("");
    if (audioUrl) { URL.revokeObjectURL(audioUrl); setAudioUrl(""); }

    try {
      const audio = await window.puter.ai.txt2speech(text, { voice });
      // audio is typically an HTMLAudioElement or a URL-bearing object depending on SDK version
      let src: string | null = null;
      if (audio instanceof HTMLAudioElement) {
        src = audio.src;
      } else if (audio && typeof audio === "object" && "src" in audio) {
        src = audio.src;
      } else if (typeof audio === "string") {
        src = audio;
      }
      if (src) {
        setAudioUrl(src);
      } else {
        setError("Audio generated but could not be loaded for download. Please try again.");
      }
    } catch (err) {
      setError("Could not generate speech right now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const downloadAudio = async () => {
    if (!audioUrl) return;
    try {
      const res = await fetch(audioUrl);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "text-to-speech.mp3";
      link.click();
    } catch {
      window.open(audioUrl, "_blank");
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Free Text to Speech Converter</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Convert text into natural speech and download as MP3 — completely free</p>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea
          className="inp"
          rows={8}
          placeholder="Paste or type your text here to convert it to speech..."
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ resize: "vertical", minHeight: 160, marginBottom: ".6rem" }}
        />
        <div style={{ fontSize: ".72rem", color: "#9A8F78", marginBottom: ".75rem" }}>{wordCount} words</div>

        <div style={{ marginBottom: ".75rem" }}>
          <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Voice</div>
          <select className="inp" value={voice} onChange={e => setVoice(e.target.value)}>
            {voiceOptions.map(v => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
          <button className="btn-gold" onClick={generate} disabled={!text.trim() || loading || !scriptReady}>
            {loading ? "Generating..." : "Generate Speech"}
          </button>
          <button className="btn-outline" onClick={() => { setText(""); setAudioUrl(""); setError(""); }}>Clear</button>
        </div>

        {error && <div style={{ color: "#ef4444", fontSize: ".8rem", marginTop: ".6rem" }}>{error}</div>}

        {audioUrl && (
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(212,160,23,.15)" }}>
            <audio ref={audioRef} controls src={audioUrl} style={{ width: "100%", marginBottom: ".6rem" }} />
            <button className="btn-gold" onClick={downloadAudio}>Download MP3</button>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Who Uses Text to Speech?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["Content Creators", "Generate voiceover audio for videos"], ["Students", "Listen to notes while multitasking"], ["Proofreading", "Hear your writing to catch mistakes"], ["Accessibility", "Helps people with reading difficulties"], ["Language Learning", "Hear correct pronunciation"], ["Podcasters", "Quick narration for short clips"]].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>FAQ</h2>
        {[
          ["Is this tool free?", "Yes, completely free with no signup required."],
          ["Can I download the audio?", "Yes! After generating, click Download MP3 to save the file to your device."],
          ["What voices are available?", "Multiple natural-sounding voices including US, UK, and Indian accents, male and female."],
          ["Is there a text length limit?", "Very long text may take longer to process. For best results, keep text under a few thousand characters per generation."],
          ["Is my text stored anywhere?", "Your text is sent only to generate the audio and is not stored by this site."]
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
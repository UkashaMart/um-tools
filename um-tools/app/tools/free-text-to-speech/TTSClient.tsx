"use client";
import { useState, useEffect, useRef } from "react";

export default function TTSClient() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIdx, setVoiceIdx] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const [recording, setRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const destRef = useRef<MediaStreamAudioDestinationNode | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) setVoices(v);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text.trim() || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setDownloadReady(false);
    if (downloadUrl) { URL.revokeObjectURL(downloadUrl); setDownloadUrl(""); }
    const utter = new SpeechSynthesisUtterance(text);
    if (voices[voiceIdx]) utter.voice = voices[voiceIdx];
    utter.rate = rate;
    utter.pitch = pitch;
    utter.onstart = () => { setSpeaking(true); setPaused(false); };
    utter.onend = () => { setSpeaking(false); setPaused(false); };
    utter.onerror = () => { setSpeaking(false); setPaused(false); };
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  };

  const pause = () => { window.speechSynthesis.pause(); setPaused(true); };
  const resume = () => { window.speechSynthesis.resume(); setPaused(false); };
  const stop = () => { window.speechSynthesis.cancel(); setSpeaking(false); setPaused(false); };

  // Records system audio output while speech plays, using the microphone
  // as a fallback capture path since direct TTS audio capture isn't exposed by the Web Speech API.
  const recordAndDownload = async () => {
    if (!text.trim() || !window.speechSynthesis) return;
    setDownloadReady(false);
    if (downloadUrl) { URL.revokeObjectURL(downloadUrl); setDownloadUrl(""); }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        alert("No system audio track found. Please make sure to check 'Share audio' / 'Share tab audio' in the screen share dialog.");
        stream.getTracks().forEach(t => t.stop());
        return;
      }
      const audioOnlyStream = new MediaStream(audioTracks);
      const recorder = new MediaRecorder(audioOnlyStream);
      audioChunksRef.current = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setDownloadReady(true);
        stream.getTracks().forEach(t => t.stop());
        setRecording(false);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);

      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      if (voices[voiceIdx]) utter.voice = voices[voiceIdx];
      utter.rate = rate;
      utter.pitch = pitch;
      utter.onstart = () => { setSpeaking(true); setPaused(false); };
      utter.onend = () => {
        setSpeaking(false);
        setPaused(false);
        setTimeout(() => { if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop(); }, 400);
      };
      utter.onerror = () => {
        setSpeaking(false);
        if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
      };
      utterRef.current = utter;
      window.speechSynthesis.speak(utter);
    } catch (err) {
      alert("Recording requires permission to capture audio. Please allow the prompt and check 'Share audio'.");
      setRecording(false);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estSeconds = Math.round((wordCount / 150) * 60 / rate);

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Free Text to Speech Converter</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Convert any text into natural sounding speech and download the audio — right in your browser, no signup</p>

      {!supported && (
        <div className="card" style={{ marginBottom: "1rem", borderLeft: "2px solid #ef4444" }}>
          <div style={{ color: "#ef4444", fontSize: ".85rem" }}>Your browser doesn't support text-to-speech. Try Chrome, Edge, or Safari.</div>
        </div>
      )}

      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea
          className="inp"
          rows={8}
          placeholder="Paste or type your text here to convert it to speech..."
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ resize: "vertical", minHeight: 160, marginBottom: ".6rem" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".72rem", color: "#9A8F78", marginBottom: ".75rem" }}>
          <span>{wordCount} words</span>
          {wordCount > 0 && <span>Estimated time: ~{estSeconds}s</span>}
        </div>

        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Voice</div>
            <select className="inp" value={voiceIdx} onChange={e => setVoiceIdx(Number(e.target.value))}>
              {voices.length === 0 && <option>Loading voices...</option>}
              {voices.map((v, i) => (
                <option key={i} value={i}>{v.name} ({v.lang})</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
          <div style={{ flex: 1, minWidth: 150 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Speed: {rate.toFixed(1)}x</div>
            <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
          <div style={{ flex: 1, minWidth: 150 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Pitch: {pitch.toFixed(1)}</div>
            <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={e => setPitch(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: ".6rem" }}>
          {!speaking && <button className="btn-gold" onClick={speak} disabled={!text.trim()}>Play</button>}
          {speaking && !paused && <button className="btn-gold" onClick={pause}>Pause</button>}
          {speaking && paused && <button className="btn-gold" onClick={resume}>Resume</button>}
          {speaking && <button className="btn-outline" onClick={stop}>Stop</button>}
          <button className="btn-outline" onClick={() => setText("")}>Clear</button>
        </div>

        <div style={{ borderTop: "1px solid rgba(212,160,23,.15)", paddingTop: ".6rem" }}>
          <button className="btn-outline" onClick={recordAndDownload} disabled={!text.trim() || recording} style={{ marginRight: ".5rem" }}>
            {recording ? "Recording..." : "Record & Download Audio"}
          </button>
          {downloadReady && downloadUrl && (
            <a href={downloadUrl} download="text-to-speech.webm" className="btn-gold" style={{ display: "inline-block", textDecoration: "none" }}>
              Download Audio File
            </a>
          )}
          <div style={{ fontSize: ".72rem", color: "#9A8F78", marginTop: ".5rem" }}>
            When you click "Record & Download Audio", your browser will ask you to share a tab/screen — check "Share audio" in that dialog, then the speech will play and record automatically.
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Who Uses Text to Speech?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["Students", "Listen to notes while multitasking"], ["Content Creators", "Download voiceover audio for videos"], ["Proofreading", "Hear your writing to catch mistakes"], ["Accessibility", "Helps people with reading difficulties"], ["Language Learning", "Hear correct pronunciation"], ["Busy People", "Listen to articles on the go"]].map(([t, d]) => (
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
          ["Is this tool free?", "Yes, completely free with no limits on usage or text length."],
          ["Does it work offline?", "No, it requires your browser's built-in speech engine which needs the page loaded."],
          ["Can I download the audio?", "Yes! Click 'Record & Download Audio', allow tab/screen sharing with audio enabled, and a downloadable file will be ready after playback finishes."],
          ["Why does download need screen sharing permission?", "Browsers don't allow websites to directly capture synthesized speech audio. Sharing your tab's audio is the only browser-supported way to record it."],
          ["Why are voices limited?", "Available voices depend on your device and browser. Chrome and Edge usually offer the most options."],
          ["Is my text stored anywhere?", "No, your text and audio are processed entirely in your browser and never sent to any server."]
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
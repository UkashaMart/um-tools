"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mkoeqkkb", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("sent"); setForm({ name:"", email:"", subject:"", message:"" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inp = { width:"100%", padding:".5rem .75rem", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(212,160,23,0.3)", borderRadius:8, color:"#F0E6C8", fontSize:".85rem", fontFamily:"Outfit,sans-serif", outline:"none" } as any;
  const label = { fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase" as any, marginBottom:".3rem", display:"block" };

  return (
    <div style={{ maxWidth: 620 }}>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.5rem", color:"#F5C842", marginBottom:".3rem" }}>Contact Us</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1.5rem" }}>Any question or suggestion? We would love to hear from you!</p>

      {status === "sent" ? (
        <div className="card" style={{ textAlign:"center", padding:"2.5rem" }}>
          <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>✅</div>
          <div style={{ fontFamily:"Cinzel,serif", color:"#F5C842", fontSize:"1.1rem", marginBottom:".5rem" }}>Message Sent!</div>
          <div style={{ fontSize:".85rem", color:"#9A8F78" }}>Thank you! We will get back to you soon.</div>
          <button onClick={() => setStatus("idle")} className="btn-gold" style={{ marginTop:"1.25rem", padding:".5rem 1.5rem" }}>Send Another</button>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={submit}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".75rem", marginBottom:".75rem" }}>
              <div>
                <label style={label}>Name *</label>
                <input style={inp} type="text" placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} required />
              </div>
              <div>
                <label style={label}>Email *</label>
                <input style={inp} type="email" placeholder="your@email.com" value={form.email} onChange={e => set("email", e.target.value)} required />
              </div>
            </div>
            <div style={{ marginBottom:".75rem" }}>
              <label style={label}>Subject</label>
              <input style={inp} type="text" placeholder="Subject" value={form.subject} onChange={e => set("subject", e.target.value)} />
            </div>
            <div style={{ marginBottom:"1rem" }}>
              <label style={label}>Message *</label>
              <textarea style={{ ...inp, resize:"vertical" }} rows={5} placeholder="Your message..." value={form.message} onChange={e => set("message", e.target.value)} required />
            </div>

            {status === "error" && (
              <div style={{ background:"rgba(239,68,68,0.1)", border:"1px solid #ef4444", borderRadius:8, padding:".6rem .75rem", marginBottom:".75rem", fontSize:".82rem", color:"#ef4444" }}>
                Something went wrong. Please try again!
              </div>
            )}

            <button type="submit" className="btn-gold" style={{ width:"100%", padding:".65rem", fontSize:".9rem" }} disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
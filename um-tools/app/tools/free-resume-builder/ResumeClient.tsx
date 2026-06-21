"use client";
import { useState } from "react";

type Exp = { title: string; company: string; duration: string; desc: string };
type Edu = { degree: string; school: string; year: string };

export default function ResumeClient() {
  const [personal, setPersonal] = useState({ name: "", title: "", email: "", phone: "", address: "", summary: "" });
  const [experience, setExperience] = useState<Exp[]>([{ title: "", company: "", duration: "", desc: "" }]);
  const [education, setEducation] = useState<Edu[]>([{ degree: "", school: "", year: "" }]);
  const [skills, setSkills] = useState("");
  const [photo, setPhoto] = useState("");

  const updateExp = (i: number, k: keyof Exp, v: string) =>
    setExperience(p => p.map((e, j) => j === i ? { ...e, [k]: v } : e));
  const addExp = () => setExperience(p => [...p, { title: "", company: "", duration: "", desc: "" }]);
  const removeExp = (i: number) => setExperience(p => p.filter((_, j) => j !== i));

  const updateEdu = (i: number, k: keyof Edu, v: string) =>
    setEducation(p => p.map((e, j) => j === i ? { ...e, [k]: v } : e));
  const addEdu = () => setEducation(p => [...p, { degree: "", school: "", year: "" }]);
  const removeEdu = (i: number) => setEducation(p => p.filter((_, j) => j !== i));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const skillList = skills.split(",").map(s => s.trim()).filter(Boolean);

  const printResume = () => {
    const printContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${personal.name} - Resume</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; color: #2a2a2a; padding: 40px; max-width: 800px; margin: 0 auto; }
  .header { display: flex; align-items: center; gap: 24px; border-bottom: 3px solid #D4A017; padding-bottom: 20px; margin-bottom: 24px; }
  .photo { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 3px solid #D4A017; }
  .name { font-size: 28px; font-weight: bold; color: #1a1a1a; }
  .title { font-size: 15px; color: #D4A017; font-weight: 600; margin-top: 2px; }
  .contact { font-size: 12px; color: #666; margin-top: 8px; }
  .contact span { margin-right: 16px; }
  .section { margin-bottom: 22px; }
  .section-title { font-size: 14px; font-weight: bold; color: #D4A017; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #eee; padding-bottom: 6px; margin-bottom: 12px; }
  .summary { font-size: 13px; line-height: 1.7; color: #444; }
  .exp-item, .edu-item { margin-bottom: 14px; }
  .exp-title { font-size: 14px; font-weight: bold; color: #1a1a1a; }
  .exp-meta { font-size: 12px; color: #888; margin-bottom: 4px; }
  .exp-desc { font-size: 12px; color: #555; line-height: 1.6; }
  .skills { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag { background: #f5e8c8; color: #8a6914; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
</style>
</head>
<body>
<div class="header">
  ${photo ? `<img src="${photo}" class="photo" />` : ""}
  <div>
    <div class="name">${personal.name || "Your Name"}</div>
    <div class="title">${personal.title || ""}</div>
    <div class="contact">
      ${personal.email ? `<span>${personal.email}</span>` : ""}
      ${personal.phone ? `<span>${personal.phone}</span>` : ""}
      ${personal.address ? `<span>${personal.address}</span>` : ""}
    </div>
  </div>
</div>

${personal.summary ? `<div class="section"><div class="section-title">Summary</div><div class="summary">${personal.summary}</div></div>` : ""}

${experience.some(e => e.title) ? `
<div class="section">
  <div class="section-title">Work Experience</div>
  ${experience.filter(e => e.title).map(e => `
    <div class="exp-item">
      <div class="exp-title">${e.title}${e.company ? ` — ${e.company}` : ""}</div>
      <div class="exp-meta">${e.duration}</div>
      <div class="exp-desc">${e.desc}</div>
    </div>
  `).join("")}
</div>` : ""}

${education.some(e => e.degree) ? `
<div class="section">
  <div class="section-title">Education</div>
  ${education.filter(e => e.degree).map(e => `
    <div class="edu-item">
      <div class="exp-title">${e.degree}</div>
      <div class="exp-meta">${e.school}${e.year ? ` — ${e.year}` : ""}</div>
    </div>
  `).join("")}
</div>` : ""}

${skillList.length > 0 ? `
<div class="section">
  <div class="section-title">Skills</div>
  <div class="skills">${skillList.map(s => `<span class="skill-tag">${s}</span>`).join("")}</div>
</div>` : ""}

</body>
</html>`;

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(printContent);
    win.document.close();
    win.onload = () => { win.print(); };
  };

  const inputStyle = { marginBottom: ".5rem" };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Free Resume Builder</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Build a professional resume and download as PDF — free, no signup, no watermark</p>

      {/* Personal Info */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".75rem" }}>Personal Information</div>
        <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Profile Photo (optional)</div>
        <input type="file" accept="image/*" onChange={handlePhoto} className="inp" style={{ ...inputStyle, fontSize: ".75rem", padding: ".3rem" }} />
        {photo && <img src={photo} alt="profile" style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", marginBottom: ".5rem" }} />}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem" }}>
          {[["Full Name", "name"], ["Job Title", "title"], ["Email", "email"], ["Phone", "phone"]].map(([ph, k]) => (
            <div key={k}>
              <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".2rem" }}>{ph}</div>
              <input type="text" className="inp" placeholder={ph} value={personal[k as keyof typeof personal]}
                onChange={e => setPersonal(p => ({ ...p, [k]: e.target.value }))} style={inputStyle} />
            </div>
          ))}
        </div>
        <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".2rem" }}>Address / Location</div>
        <input type="text" className="inp" placeholder="City, Country" value={personal.address}
          onChange={e => setPersonal(p => ({ ...p, address: e.target.value }))} style={inputStyle} />
        <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".2rem" }}>Professional Summary</div>
        <textarea className="inp" rows={3} placeholder="A brief 2-3 line summary about your professional background and strengths..."
          value={personal.summary} onChange={e => setPersonal(p => ({ ...p, summary: e.target.value }))} style={{ resize: "vertical" }} />
      </div>

      {/* Experience */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".75rem" }}>Work Experience</div>
        {experience.map((exp, i) => (
          <div key={i} style={{ padding: ".75rem", background: "rgba(212,160,23,.04)", borderRadius: 8, marginBottom: ".6rem", border: "1px solid rgba(212,160,23,.1)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem", marginBottom: ".5rem" }}>
              <input type="text" className="inp" placeholder="Job Title" value={exp.title} onChange={e => updateExp(i, "title", e.target.value)} />
              <input type="text" className="inp" placeholder="Company Name" value={exp.company} onChange={e => updateExp(i, "company", e.target.value)} />
            </div>
            <input type="text" className="inp" placeholder="Duration (e.g. Jan 2023 - Present)" value={exp.duration} onChange={e => updateExp(i, "duration", e.target.value)} style={{ marginBottom: ".5rem" }} />
            <textarea className="inp" rows={2} placeholder="Brief description of responsibilities and achievements" value={exp.desc} onChange={e => updateExp(i, "desc", e.target.value)} style={{ resize: "vertical", marginBottom: ".4rem" }} />
            <button onClick={() => removeExp(i)} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#ef4444", borderRadius: 6, padding: ".3rem .6rem", cursor: "pointer", fontSize: ".75rem" }}>Remove</button>
          </div>
        ))}
        <button className="btn-outline" onClick={addExp} style={{ fontSize: ".8rem" }}>+ Add Experience</button>
      </div>

      {/* Education */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".75rem" }}>Education</div>
        {education.map((edu, i) => (
          <div key={i} style={{ padding: ".75rem", background: "rgba(212,160,23,.04)", borderRadius: 8, marginBottom: ".6rem", border: "1px solid rgba(212,160,23,.1)" }}>
            <input type="text" className="inp" placeholder="Degree (e.g. BS Computer Science)" value={edu.degree} onChange={e => updateEdu(i, "degree", e.target.value)} style={{ marginBottom: ".5rem" }} />
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: ".5rem", marginBottom: ".4rem" }}>
              <input type="text" className="inp" placeholder="School / University" value={edu.school} onChange={e => updateEdu(i, "school", e.target.value)} />
              <input type="text" className="inp" placeholder="Year" value={edu.year} onChange={e => updateEdu(i, "year", e.target.value)} />
            </div>
            <button onClick={() => removeEdu(i)} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#ef4444", borderRadius: 6, padding: ".3rem .6rem", cursor: "pointer", fontSize: ".75rem" }}>Remove</button>
          </div>
        ))}
        <button className="btn-outline" onClick={addEdu} style={{ fontSize: ".8rem" }}>+ Add Education</button>
      </div>

      {/* Skills */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".5rem" }}>Skills</div>
        <div style={{ fontSize: ".72rem", color: "#9A8F78", marginBottom: ".4rem" }}>Separate skills with commas</div>
        <input type="text" className="inp" placeholder="e.g. JavaScript, Project Management, Communication, Excel" value={skills} onChange={e => setSkills(e.target.value)} />
        {skillList.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: ".6rem" }}>
            {skillList.map((s, i) => (
              <span key={i} style={{ fontSize: ".75rem", color: "#F5C842", background: "rgba(212,160,23,.1)", padding: "3px 10px", borderRadius: 20 }}>{s}</span>
            ))}
          </div>
        )}
      </div>

      <button className="btn-gold" onClick={printResume} style={{ width: "100%", padding: "1rem", fontSize: "1rem", borderRadius: 10 }}>
        Download Resume as PDF
      </button>

      {/* SEO Content */}
      <div className="card" style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Why Use Our Resume Builder?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["100% Free", "No signup, no hidden charges, no watermark"], ["PDF Download", "Print or save as a clean PDF instantly"], ["Photo Upload", "Add a professional profile photo"], ["Multiple Sections", "Experience, education and skills covered"], ["Privacy First", "Your data stays in your browser only"], ["Quick to Use", "Build a complete resume in minutes"]].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Resume Writing Tips</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div>1. Keep your summary short — 2 to 3 sentences highlighting your key strengths</div>
          <div>2. Use action words like "managed", "built", "led" in experience descriptions</div>
          <div>3. List your most recent job first</div>
          <div>4. Only include skills relevant to the job you're applying for</div>
          <div>5. Keep your resume to one page if possible, especially early in your career</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>FAQ</h2>
        {[
          ["Is this resume builder really free?", "Yes, completely free with no hidden costs, no watermark and no account required."],
          ["Can I download as PDF?", "Yes, click Download Resume and use your browser's print dialog to save as PDF."],
          ["Is my data saved anywhere?", "No, everything stays in your browser. Nothing is sent to any server."],
          ["Can I add multiple jobs and degrees?", "Yes, click Add Experience or Add Education to include as many as you need."],
          ["Does it work on mobile?", "Yes, the builder works on both mobile and desktop browsers."]
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

"use client";
import { useState } from "react";
export default function Contact() {
  const [sent,setSent]=useState(false);
  const [form,setForm]=useState({name:"",email:"",subject:"",message:""});
  const set=(k:string,v:string)=>setForm(p=>({...p,[k]:v}));
  const submit=(e:React.FormEvent)=>{e.preventDefault();const body=`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;window.location.href=`mailto:contact@ukashamart.com?subject=${encodeURIComponent(form.subject||"UM Tools Contact")}&body=${encodeURIComponent(body)}`;setSent(true);};
  return (
    <div style={{ maxWidth:620 }}>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.5rem", color:"#F5C842", marginBottom:".3rem" }}>Contact Us</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1.5rem" }}>Koi sawaal ya suggestion? Hum se rabta karo!</p>
      {sent?(
        <div className="card" style={{ textAlign:"center", padding:"2rem" }}>
          <i className="ti ti-circle-check" style={{ fontSize:"2.5rem", color:"#22c55e", display:"block", marginBottom:".75rem" }} />
          <div style={{ fontFamily:"Cinzel,serif", color:"#F5C842", marginBottom:".4rem" }}>Shukriya!</div>
          <div style={{ fontSize:".85rem", color:"#9A8F78" }}>Aapka message mil gaya!</div>
        </div>
      ):(
        <div className="card">
          <form onSubmit={submit}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".6rem", marginBottom:".6rem" }}>
              <div>
                <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".3rem" }}>Name *</div>
                <input type="text" className="inp" placeholder="Apna naam" value={form.name} onChange={e=>set("name",e.target.value)} required />
              </div>
              <div>
                <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".3rem" }}>Email *</div>
                <input type="email" className="inp" placeholder="apka@email.com" value={form.email} onChange={e=>set("email",e.target.value)} required />
              </div>
            </div>
            <div style={{ marginBottom:".6rem" }}>
              <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".3rem" }}>Subject</div>
              <input type="text" className="inp" placeholder="Subject" value={form.subject} onChange={e=>set("subject",e.target.value)} />
            </div>
            <div style={{ marginBottom:".75rem" }}>
              <div style={{ fontSize:".62rem", color:"#D4A017", letterSpacing:"2px", textTransform:"uppercase", marginBottom:".3rem" }}>Message *</div>
              <textarea className="inp" rows={5} placeholder="Apna message..." value={form.message} onChange={e=>set("message",e.target.value)} required style={{ resize:"vertical" }} />
            </div>
            <button type="submit" className="btn-gold" style={{ width:"100%", padding:".65rem" }}>
              <i className="ti ti-send" /> Send Message
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
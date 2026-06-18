"use client";
import { useState } from "react";

type Item = { desc: string; qty: string; rate: string };

export default function InvoiceClient() {
  const [from, setFrom] = useState({ name: "", email: "", phone: "", address: "" });
  const [to, setTo] = useState({ name: "", email: "", phone: "", address: "" });
  const [items, setItems] = useState<Item[]>([{ desc: "", qty: "1", rate: "" }]);
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [tax, setTax] = useState("0");
  const [notes, setNotes] = useState("");
  const [currency, setCurrency] = useState("$");
  const [logo, setLogo] = useState("");

  const updateItem = (i: number, k: keyof Item, v: string) =>
    setItems(p => p.map((it, j) => j === i ? { ...it, [k]: v } : it));
  const addItem = () => setItems(p => [...p, { desc: "", qty: "1", rate: "" }]);
  const removeItem = (i: number) => setItems(p => p.filter((_, j) => j !== i));

  const subtotal = items.reduce((s, it) => s + (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0), 0);
  const taxAmount = subtotal * (parseFloat(tax) || 0) / 100;
  const total = subtotal + taxAmount;
  const fmt = (n: number) => `${currency}${n.toFixed(2)}`;

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setLogo(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const printInvoice = () => {
    const printContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Invoice ${invoiceNo}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 14px; color: #333; padding: 40px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
  .logo { max-height: 80px; max-width: 200px; }
  .company-name { font-size: 24px; font-weight: bold; color: #D4A017; }
  .invoice-title { font-size: 32px; font-weight: bold; color: #333; text-align: right; }
  .invoice-meta { text-align: right; color: #666; margin-top: 8px; }
  .parties { display: flex; justify-content: space-between; margin-bottom: 40px; }
  .party h3 { font-size: 12px; text-transform: uppercase; color: #999; margin-bottom: 8px; letter-spacing: 1px; }
  .party p { color: #333; line-height: 1.6; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
  th { background: #D4A017; color: white; padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; }
  td { padding: 12px; border-bottom: 1px solid #eee; }
  tr:nth-child(even) { background: #fafafa; }
  .totals { width: 300px; margin-left: auto; }
  .total-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
  .total-final { display: flex; justify-content: space-between; padding: 12px 0; font-size: 18px; font-weight: bold; color: #D4A017; border-top: 2px solid #D4A017; margin-top: 8px; }
  .notes { margin-top: 40px; padding: 16px; background: #f9f9f9; border-left: 4px solid #D4A017; border-radius: 4px; }
  .notes h4 { margin-bottom: 8px; color: #666; font-size: 12px; text-transform: uppercase; }
  .footer { margin-top: 60px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
</style>
</head>
<body>
<div class="header">
  <div>
    ${logo ? `<img src="${logo}" class="logo" alt="Logo" />` : `<div class="company-name">${from.name}</div>`}
    <p style="color:#666;margin-top:8px">${from.address}</p>
    <p style="color:#666">${from.email}</p>
    <p style="color:#666">${from.phone}</p>
  </div>
  <div>
    <div class="invoice-title">INVOICE</div>
    <div class="invoice-meta">
      <p><strong>Invoice #:</strong> ${invoiceNo}</p>
      <p><strong>Date:</strong> ${date}</p>
      ${dueDate ? `<p><strong>Due Date:</strong> ${dueDate}</p>` : ""}
    </div>
  </div>
</div>
<div class="parties">
  <div class="party">
    <h3>From</h3>
    <p><strong>${from.name}</strong></p>
    <p>${from.address}</p>
    <p>${from.email}</p>
    <p>${from.phone}</p>
  </div>
  <div class="party" style="text-align:right">
    <h3>Bill To</h3>
    <p><strong>${to.name}</strong></p>
    <p>${to.address}</p>
    <p>${to.email}</p>
    <p>${to.phone}</p>
  </div>
</div>
<table>
  <thead>
    <tr>
      <th style="width:50%">Description</th>
      <th style="text-align:center">Qty</th>
      <th style="text-align:right">Rate</th>
      <th style="text-align:right">Amount</th>
    </tr>
  </thead>
  <tbody>
    ${items.map(it => `
    <tr>
      <td>${it.desc}</td>
      <td style="text-align:center">${it.qty}</td>
      <td style="text-align:right">${currency}${parseFloat(it.rate || "0").toFixed(2)}</td>
      <td style="text-align:right">${currency}${((parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0)).toFixed(2)}</td>
    </tr>`).join("")}
  </tbody>
</table>
<div class="totals">
  <div class="total-row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
  ${parseFloat(tax) > 0 ? `<div class="total-row"><span>Tax (${tax}%)</span><span>${fmt(taxAmount)}</span></div>` : ""}
  <div class="total-final"><span>Total</span><span>${fmt(total)}</span></div>
</div>
${notes ? `<div class="notes"><h4>Notes</h4><p>${notes}</p></div>` : ""}
<div class="footer">Thank you for your business!</div>
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
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Invoice Generator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Create professional invoices and download as PDF — free, no signup</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>

        {/* FROM */}
        <div className="card">
          <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".75rem" }}>Your Details</div>
          <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Your Logo (optional)</div>
          <input type="file" accept="image/*" onChange={handleLogo} className="inp" style={{ ...inputStyle, fontSize: ".75rem", padding: ".3rem" }} />
          {logo && <img src={logo} alt="logo" style={{ height: 50, marginBottom: ".5rem", borderRadius: 6 }} />}
          {[["Business / Your Name", "name"], ["Email", "email"], ["Phone", "phone"], ["Address", "address"]].map(([ph, k]) => (
            <div key={k}>
              <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".2rem" }}>{ph}</div>
              <input type="text" className="inp" placeholder={ph} value={from[k as keyof typeof from]}
                onChange={e => setFrom(p => ({ ...p, [k]: e.target.value }))} style={inputStyle} />
            </div>
          ))}
        </div>

        {/* TO */}
        <div className="card">
          <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".75rem" }}>Client Details</div>
          {[["Client Name", "name"], ["Client Email", "email"], ["Client Phone", "phone"], ["Client Address", "address"]].map(([ph, k]) => (
            <div key={k}>
              <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".2rem" }}>{ph}</div>
              <input type="text" className="inp" placeholder={ph} value={to[k as keyof typeof to]}
                onChange={e => setTo(p => ({ ...p, [k]: e.target.value }))} style={inputStyle} />
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Meta */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".75rem" }}>Invoice Details</div>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Invoice Number</div>
            <input type="text" className="inp" value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Invoice Date</div>
            <input type="date" className="inp" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Due Date</div>
            <input type="date" className="inp" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".3rem" }}>Currency</div>
            <select className="inp" value={currency} onChange={e => setCurrency(e.target.value)}>
              {[["$", "USD"], ["£", "GBP"], ["€", "EUR"], ["Rs", "PKR"], ["SAR", "SAR"], ["AED", "AED"]].map(([sym, code]) => (
                <option key={code} value={sym}>{sym} {code}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".75rem" }}>Items / Services</div>
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr auto", gap: ".4rem", marginBottom: ".4rem" }}>
          {["Description", "Qty", "Rate", ""].map(h => (
            <div key={h} style={{ fontSize: ".6rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px" }}>{h}</div>
          ))}
        </div>
        {items.map((it, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr auto", gap: ".4rem", marginBottom: ".4rem", alignItems: "center" }}>
            <input type="text" className="inp" placeholder="Service or product description" value={it.desc} onChange={e => updateItem(i, "desc", e.target.value)} />
            <input type="number" className="inp" placeholder="1" value={it.qty} onChange={e => updateItem(i, "qty", e.target.value)} />
            <input type="number" className="inp" placeholder="0.00" value={it.rate} onChange={e => updateItem(i, "rate", e.target.value)} />
            <button onClick={() => removeItem(i)} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#ef4444", borderRadius: 6, padding: ".35rem .5rem", cursor: "pointer", fontSize: ".8rem" }}>X</button>
          </div>
        ))}
        <button className="btn-outline" onClick={addItem} style={{ marginTop: ".3rem", fontSize: ".8rem" }}>+ Add Item</button>

        {/* Totals */}
        <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(212,160,23,.2)", paddingTop: "1rem" }}>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: ".75rem", alignItems: "center" }}>
            <div style={{ fontSize: ".62rem", color: "#D4A017", textTransform: "uppercase", letterSpacing: "1px" }}>Tax %</div>
            <input type="number" className="inp" placeholder="0" value={tax} onChange={e => setTax(e.target.value)} style={{ width: 100 }} />
          </div>
          <div style={{ maxWidth: 280, marginLeft: "auto" }}>
            {[[`Subtotal`, fmt(subtotal)], [`Tax (${tax}%)`, fmt(taxAmount)]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".4rem 0", borderBottom: "1px solid rgba(212,160,23,.1)", fontSize: ".85rem", color: "#9A8F78" }}>
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: ".6rem 0", fontSize: "1.1rem", fontWeight: 700, color: "#F5C842" }}>
              <span>Total</span><span>{fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: ".9rem", color: "#F5C842", marginBottom: ".5rem" }}>Notes (optional)</div>
        <textarea className="inp" rows={3} placeholder="Payment terms, bank details, thank you message..." value={notes} onChange={e => setNotes(e.target.value)} style={{ resize: "vertical" }} />
      </div>

      {/* Download Button */}
      <button className="btn-gold" onClick={printInvoice} style={{ width: "100%", padding: "1rem", fontSize: "1rem", borderRadius: 10 }}>
        Download / Print Invoice as PDF
      </button>

      {/* SEO Content */}
      <div className="card" style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Why Use Our Invoice Generator?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["100% Free", "No signup, no payment ever"], ["PDF Download", "Print or save as PDF instantly"], ["Logo Upload", "Add your business logo"], ["Professional", "Clean template clients trust"], ["Multi Currency", "USD, PKR, GBP, EUR, SAR"], ["No Data Saved", "Everything stays in your browser"]].map(([t, d]) => (
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
          ["Is this invoice generator free?", "Yes, completely free. No account needed, no watermark, no limit on invoices."],
          ["Can I save my invoice?", "Click Download/Print and save as PDF from your browser's print dialog."],
          ["Is my data safe?", "Yes! Everything stays in your browser. Nothing is sent to any server."],
          ["Can I add my logo?", "Yes! Upload your logo image and it will appear on the invoice."],
          ["What currencies are supported?", "USD, GBP, EUR, PKR, SAR, AED and more."]
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

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UM Tools — Free Online Utility Tools |title: "UM Tools - Free Online Utility Tools Pakistan",
  description: "25+ free online tools for text, calculators, dev tools and more. No signup required.",
};

const tools = [
  { name: "Word Counter", href: "/tools/word-counter", icon: "ti-letter-case", cat: "Text" },
  { name: "Case Converter", href: "/tools/case-converter", icon: "ti-transform", cat: "Text" },
  { name: "Lorem Ipsum", href: "/tools/lorem-ipsum", icon: "ti-file-text", cat: "Text" },
  { name: "Duplicate Remover", href: "/tools/duplicate-remover", icon: "ti-list-check", cat: "Text" },
  { name: "Text Sorter", href: "/tools/text-sorter", icon: "ti-arrows-sort", cat: "Text" },
  { name: "Zakat Calculator", href: "/tools/zakat-calculator", icon: "ti-coin", cat: "Pakistan" },
  { name: "BMI Calculator", href: "/tools/bmi-calculator", icon: "ti-heart-rate-monitor", cat: "Health" },
  { name: "Age Calculator", href: "/tools/age-calculator", icon: "ti-calendar", cat: "Calculator" },
  { name: "Percentage Calc", href: "/tools/percentage-calculator", icon: "ti-percentage", cat: "Calculator" },
  { name: "Loan EMI", href: "/tools/loan-emi", icon: "ti-building-bank", cat: "Finance" },
  { name: "CGPA Calculator", href: "/tools/cgpa-calculator", icon: "ti-school", cat: "Pakistan" },
  { name: "Salary Tax", href: "/tools/salary-tax", icon: "ti-receipt-tax", cat: "Pakistan" },
  { name: "Password Generator", href: "/tools/password-generator", icon: "ti-lock", cat: "Dev" },
  { name: "Base64 Tool", href: "/tools/base64", icon: "ti-code", cat: "Dev" },
  { name: "JSON Formatter", href: "/tools/json-formatter", icon: "ti-braces", cat: "Dev" },
  { name: "MD5 Hash", href: "/tools/md5-hash", icon: "ti-hash", cat: "Dev" },
  { name: "URL Encoder", href: "/tools/url-encoder", icon: "ti-link", cat: "Dev" },
  { name: "QR Generator", href: "/tools/qr-generator", icon: "ti-qrcode", cat: "Web" },
  { name: "Color Picker", href: "/tools/color-picker", icon: "ti-palette", cat: "Design" },
  { name: "Image→Base64", href: "/tools/image-to-base64", icon: "ti-photo", cat: "Image" },
  { name: "Aspect Ratio", href: "/tools/aspect-ratio", icon: "ti-aspect-ratio", cat: "Design" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg,#111827,#1a2235,rgba(30,58,110,0.25))',
        border: '1px solid rgba(212,160,23,0.2)', borderRadius: 14,
        padding: '2rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 150, height: 150,
          background: 'radial-gradient(circle,rgba(212,160,23,0.12) 0%,transparent 70%)'
        }} />
        <h1 className="gold-text" style={{ fontFamily: 'Cinzel, serif', fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          UM Tools — Digital Suite
        </h1>
        <p style={{ color: '#9A8F78', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 500 }}>
          Free browser-based tools. No signup, no API keys, no data sent anywhere. Everything runs in your browser.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
          {[['25+','Tools'],['100%','Free'],['0','Tracking']].map(([v,l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', color: '#F5C842' }}>{v}</div>
              <div style={{ fontSize: '0.65rem', color: '#9A8F78', textTransform: 'uppercase', letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#F5C842', marginBottom: '0.25rem' }}>All Tools</h2>
      <p style={{ fontSize: '0.78rem', color: '#9A8F78', marginBottom: '1rem' }}>Koi bhi tool click karo</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(145px,1fr))', gap: '0.75rem' }}>
        {tools.map((t) => (
          <Link key={t.href} href={t.href} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}>
              <i className={`ti ${t.icon}`} style={{ fontSize: '1.5rem', color: '#D4A017', display: 'block', marginBottom: '0.35rem' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#F0E6C8' }}>{t.name}</div>
              <div style={{ fontSize: '0.65rem', color: '#9A8F78', marginTop: 2 }}>{t.cat}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

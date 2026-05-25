import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "UM Tools — Free Online Utility Tools",
  description: "Free browser-based tools. Word Counter, Zakat Calculator, BMI, QR Generator, JSON Formatter and more. No signup, no tracking.",
  keywords: "free tools, word counter, zakat calculator, bmi, qr code, pakistan tools, online tools",
  openGraph: {
    title: "UM Tools — Free Online Utility Tools",
    description: "25+ free online tools. No signup required.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      </head>
      <body>
        {/* HEADER */}
        <header style={{
          background: '#111827',
          borderBottom: '1px solid rgba(212,160,23,0.4)',
          padding: '0 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          height: '52px',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg,#D4A017,#F5C842)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 12, color: '#1E3A6E'
            }}>UM</div>
            <div>
              <div className="gold-text" style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', fontWeight: 600 }}>UM Tools</div>
              <div style={{ fontSize: '0.6rem', color: '#9A8F78', letterSpacing: '2px', textTransform: 'uppercase' }}>Digital Suite</div>
            </div>
          </Link>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link href="/blog" style={{ fontSize: '0.8rem', color: '#9A8F78', textDecoration: 'none' }}>Blog</Link>
            <span style={{
              background: 'linear-gradient(135deg,#A07810,#D4A017)',
              color: '#111', fontSize: '0.65rem', fontWeight: 700,
              padding: '3px 10px', borderRadius: 20, letterSpacing: 1
            }}>FREE</span>
          </div>
        </header>

        {/* LAYOUT */}
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 52px)' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

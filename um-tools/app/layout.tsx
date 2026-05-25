import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "UM Tools - Free Online Utility Tools",
  description: "Free browser-based tools. Word Counter, Zakat Calculator, BMI, QR Generator and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MT7QYETVNL" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-MT7QYETVNL");`}</Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7032253044947209" crossOrigin="anonymous" strategy="afterInteractive" />
        <header style={{ background:"#111827", borderBottom:"1px solid rgba(212,160,23,0.4)", padding:"0 1.25rem", display:"flex", alignItems:"center", gap:"0.75rem", height:"52px", position:"sticky", top:0, zIndex:100 }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:"0.75rem", textDecoration:"none" }}>
            <img src="/logo.png" alt="UM Tools" width={36} height={36} style={{ borderRadius:"50%", objectFit:"cover" }} />
            <div>
              <div className="gold-text" style={{ fontFamily:"Cinzel, serif", fontSize:"1rem", fontWeight:600 }}>UM Tools</div>
              <div style={{ fontSize:"0.6rem", color:"#9A8F78", letterSpacing:"2px", textTransform:"uppercase" }}>Digital Suite</div>
            </div>
          </Link>
          <div style={{ marginLeft:"auto", display:"flex", gap:"1rem", alignItems:"center" }}>
            <Link href="/blog" style={{ fontSize:"0.8rem", color:"#9A8F78", textDecoration:"none" }}>Blog</Link>
            <Link href="/about" style={{ fontSize:"0.8rem", color:"#9A8F78", textDecoration:"none" }}>About</Link>
            <Link href="/contact" style={{ fontSize:"0.8rem", color:"#9A8F78", textDecoration:"none" }}>Contact</Link>
            <span style={{ background:"linear-gradient(135deg,#A07810,#D4A017)", color:"#111", fontSize:"0.65rem", fontWeight:700, padding:"3px 10px", borderRadius:20 }}>FREE</span>
          </div>
        </header>
        <div style={{ display:"flex", minHeight:"calc(100vh - 52px)" }}>
          <Sidebar />
          <main style={{ flex:1, padding:"1.5rem", overflowY:"auto" }}>{children}</main>
        </div>
        <footer style={{ background:"#111827", borderTop:"1px solid rgba(212,160,23,0.2)", padding:"1.5rem", textAlign:"center" }}>
          <div style={{ fontFamily:"Cinzel, serif", color:"#D4A017", fontSize:".9rem", marginBottom:".5rem" }}>UM Tools</div>
          <div style={{ display:"flex", justifyContent:"center", gap:"1.5rem", marginBottom:".75rem", flexWrap:"wrap" }}>
            <Link href="/" style={{ fontSize:".78rem", color:"#9A8F78", textDecoration:"none" }}>Home</Link>
            <Link href="/blog" style={{ fontSize:".78rem", color:"#9A8F78", textDecoration:"none" }}>Blog</Link>
            <Link href="/about" style={{ fontSize:".78rem", color:"#9A8F78", textDecoration:"none" }}>About</Link>
            <Link href="/contact" style={{ fontSize:".78rem", color:"#9A8F78", textDecoration:"none" }}>Contact</Link>
            <Link href="/privacy-policy" style={{ fontSize:".78rem", color:"#9A8F78", textDecoration:"none" }}>Privacy Policy</Link>
          </div>
          <div style={{ fontSize:".72rem", color:"#9A8F78" }}>2026 UM Tools - ukashamart.com</div>
        </footer>
      </body>
    </html>
  );
}
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Home", href: "/", icon: "ti-home", section: "Overview" },
  { label: "Word Counter", href: "/tools/word-counter", icon: "ti-letter-case", section: "Text Tools" },
  { label: "Invoice Generator", href: "/tools/invoice-generator", icon: "ti-file-invoice", section: "Business" },
  { label: "YouTube Thumbnail", href: "/tools/free-youtube-thumbnail-downloader", icon: "ti-brand-youtube", section: "Media" },
  { label: "Case Converter", href: "/tools/case-converter", icon: "ti-transform", section: null },
  { label: "Lorem Ipsum", href: "/tools/lorem-ipsum", icon: "ti-file-text", section: null },
  { label: "Hashtag Generator", href: "/tools/free-hashtag-generator", icon: "ti-hash", section: "Social Media" },
  { label: "Resume Builder", href: "/tools/free-resume-builder", icon: "ti-file-cv", section: "Career" },
  { label: "Text to Speech", href: "/tools/free-text-to-speech", icon: "ti-volume", section: null },
  { label: "Duplicate Remover", href: "/tools/duplicate-remover", icon: "ti-list-check", section: null },
  { label: "Text Sorter", href: "/tools/text-sorter", icon: "ti-arrows-sort", section: null },
  { label: "Due Date Calculator", href: "/tools/pregnancy-due-date-calculator", icon: "ti-baby-carriage", section: "Health" },
  { label: "Zakat Calc", href: "/tools/zakat-calculator", icon: "ti-coin", section: "Calculators" },
  { label: "BMI Calculator", href: "/tools/bmi-calculator", icon: "ti-heart-rate-monitor", section: null },
  { label: "Speed Checker", href: "/tools/website-speed-checker", icon: "ti-gauge", section: "SEO Tools" },
  { label: "Domain Age", href: "/tools/domain-age-checker", icon: "ti-calendar-time", section: null },
  { label: "Age Calculator", href: "/tools/age-calculator", icon: "ti-calendar", section: null },
  { label: "Percentage", href: "/tools/percentage-calculator", icon: "ti-percentage", section: null },
  { label: "Loan EMI", href: "/tools/loan-emi", icon: "ti-building-bank", section: null },
  { label: "CGPA Calc", href: "/tools/cgpa-calculator", icon: "ti-school", section: null },
  { label: "Salary Tax", href: "/tools/salary-tax", icon: "ti-receipt-tax", section: null },
  { label: "Password Gen", href: "/tools/password-generator", icon: "ti-lock", section: "Dev Tools" },
  { label: "Base64", href: "/tools/base64", icon: "ti-code", section: null },
  { label: "JSON Formatter", href: "/tools/json-formatter", icon: "ti-braces", section: null },
  { label: "MD5 Hash", href: "/tools/md5-hash", icon: "ti-hash", section: null },
  { label: "URL Encoder", href: "/tools/url-encoder", icon: "ti-link", section: null },
  { label: "QR Generator", href: "/tools/qr-generator", icon: "ti-qrcode", section: "Image/Web" },
  { label: "Color Picker", href: "/tools/color-picker", icon: "ti-palette", section: null },
  { label: "Image→Base64", href: "/tools/image-to-base64", icon: "ti-photo", section: null },
  { label: "Aspect Ratio", href: "/tools/aspect-ratio", icon: "ti-aspect-ratio", section: null },
  { label: "Currency Converter", href: "/tools/currency-converter", icon: "ti-currency-dollar", section: "Finance" },
  { label: "Unit Converter", href: "/tools/unit-converter", icon: "ti-ruler", section: null },
  { label: "Random Number", href: "/tools/random-number-generator", icon: "ti-dice", section: null },
{ label: "Tip Calculator", href: "/tools/tip-calculator", icon: "ti-receipt", section: null },
{ label: "Grade Calculator", href: "/tools/grade-calculator", icon: "ti-school", section: null },
  { label: "All Posts", href: "/blog", icon: "ti-news", section: "Blog" },
  { label: "About Us", href: "/about", icon: "ti-info-circle", section: "Info" },
  { label: "Contact", href: "/contact", icon: "ti-mail", section: null },
  { label: "Privacy Policy", href: "/privacy-policy", icon: "ti-shield", section: null },
  
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav style={{
      width: 200, background: '#111827',
      borderRight: '1px solid rgba(212,160,23,0.2)',
      padding: '0.75rem 0', flexShrink: 0,
      position: 'sticky', top: 52,
      height: 'calc(100vh - 52px)', overflowY: 'auto'
    }}>
      {nav.map((item) => (
        <div key={item.href}>
          {item.section && (
            <div style={{
              fontSize: '0.58rem', fontWeight: 600, color: '#D4A017',
              letterSpacing: '2px', textTransform: 'uppercase',
              padding: '0.6rem 0.9rem 0.25rem', marginTop: '0.25rem'
            }}>{item.section}</div>
          )}
          <Link href={item.href} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 0.9rem', fontSize: '0.78rem', textDecoration: 'none',
            borderLeft: `2px solid ${pathname === item.href ? '#D4A017' : 'transparent'}`,
            color: pathname === item.href ? '#F5C842' : '#9A8F78',
            background: pathname === item.href ? 'rgba(212,160,23,0.09)' : 'transparent',
            transition: 'all 0.15s'
          }}>
            <i className={`ti ${item.icon}`} style={{ fontSize: '0.9rem', width: 14 }} />
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
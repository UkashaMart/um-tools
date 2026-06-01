import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — UM Tools",
  description: "UM Tools privacy policy. We do not collect or store any personal data.",
};

export default function PrivacyPolicy() {
  const sections = [
    { 
      title: "Information We Collect", 
      content: "UM Tools does not collect any personal information. All utility tools run entirely in your browser client-side. No data is ever transmitted to or stored on our servers." 
    },
    { 
      title: "Cookies and Tracking", 
      content: "We may use cookies for performance and analytics purposes (such as Google Analytics) to understand visitor behavior and improve our services. These cookies do not contain personally identifiable information." 
    },
    { 
      title: "Google AdSense", 
      content: "We use Google AdSense to serve advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our website or other websites on the Internet. You may opt out of personalized advertising by visiting Google Ads Settings." 
    },
    { 
      title: "Third-Party Links", 
      content: "Our website may contain external links to other sites. Please note that we are not responsible for the privacy practices, content, or compliance of those third-party websites." 
    },
    { 
      title: "Data Security", 
      content: "Because all operations happen locally on your computer and we do not collect personal data, there is absolute zero risk of your data being leaked, breached, or compromised through our platform." 
    },
    { 
      title: "Children's Privacy", 
      content: "Our services are completely safe and are not targeted toward children under the age of 13. We do not knowingly monitor, track, or collect any private data from minors." 
    },
    { 
      title: "Contact Us", 
      content: "If you have any questions or feedback regarding this Privacy Policy, please reach out to us directly through our official Contact page." 
    },
  ];

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.5rem", color: "#F5C842", marginBottom: ".3rem" }}>Privacy Policy</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1.5rem" }}>Last updated: May 25, 2026</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <p style={{ fontSize: ".85rem", color: "#9A8F78", lineHeight: 1.8 }}>
          Welcome to <strong style={{ color: "#F0E6C8" }}>UM Tools (ukashamart.com)</strong>. We are committed to maintaining maximum transparency and protecting your privacy.
        </p>
      </div>

      {sections.map((s) => (
        <div key={s.title} className="card" style={{ marginBottom: ".75rem" }}>
          <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".5rem" }}>{s.title}</h2>
          <p style={{ fontSize: ".85rem", color: "#9A8F78", lineHeight: 1.8 }}>{s.content}</p>
        </div>
      ))}
    </div>
  );
}
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy — UM Tools",
  description: "UM Tools privacy policy. We do not collect or store any personal data.",
};
export default function PrivacyPolicy() {
  const sections = [
    { title: "Information We Collect", content: "UM Tools does not collect any personal information. All tools run entirely in your browser. No data is sent to our servers." },
    { title: "Cookies", content: "We may use cookies for analytics purposes (Google Analytics) to understand how visitors use our site. These cookies do not identify you personally." },
    { title: "Google AdSense", content: "We use Google AdSense to display advertisements. Google may use cookies to show you relevant ads based on your browsing history. You can opt out at Google Ads Settings." },
    { title: "Third Party Links", content: "Our website may contain links to other websites. We are not responsible for the privacy practices of those sites." },
    { title: "Data Security", content: "Since we do not collect any personal data, there is no risk of your personal information being compromised through our service." },
    { title: "Children's Privacy", content: "Our services are not directed to children under 13. We do not knowingly collect personal information from children." },
    { title: "Contact Us", content: "If you have any questions about this Privacy Policy, please contact us through our Contact page." },
  ];
  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.5rem", color:"#F5C842", marginBottom:".3rem" }}>Privacy Policy</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1.5rem" }}>Last updated: May 25, 2026</p>
      <div className="card" style={{ marginBottom:"1rem" }}>
        <p style={{ fontSize:".85rem", color:"#9A8F78", lineHeight:1.8 }}>Welcome to <strong style={{ color:"#F0E6C8" }}>UM Tools (ukashamart.com)</strong>. We are committed to protecting your privacy.</p>
      </div>
      {sections.map((s) => (
        <div key={s.title} className="card" style={{ marginBottom:".75rem" }}>
          <h2 style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".5rem" }}>{s.title}</h2>
          <p style={{ fontSize:".85rem", color:"#9A8F78", lineHeight:1.8 }}>{s.content}</p>
        </div>
      ))}
    </div>
  );
}
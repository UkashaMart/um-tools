"use client";
import { useState } from "react";

const hashtagBank: Record<string, string[]> = {
  business: ["#business", "#entrepreneur", "#smallbusiness", "#startup", "#marketing", "#success", "#businessowner", "#entrepreneurship", "#branding", "#growth", "#hustle", "#businesstips", "#digitalmarketing", "#smallbiz", "#leadership"],
  fashion: ["#fashion", "#style", "#ootd", "#fashionista", "#streetstyle", "#fashionblogger", "#outfitoftheday", "#trendy", "#fashiondesign", "#lookbook", "#fashionstyle", "#instafashion", "#styleinspo", "#fashionweek", "#wardrobe"],
  food: ["#food", "#foodie", "#foodphotography", "#instafood", "#foodporn", "#yummy", "#delicious", "#cooking", "#homemade", "#foodlover", "#tasty", "#foodblogger", "#chef", "#recipe", "#foodgasm"],
  fitness: ["#fitness", "#workout", "#gym", "#fitnessmotivation", "#health", "#training", "#fit", "#gymlife", "#bodybuilding", "#exercise", "#healthylifestyle", "#fitfam", "#strength", "#cardio", "#fitnessjourney"],
  travel: ["#travel", "#wanderlust", "#travelgram", "#explore", "#adventure", "#vacation", "#travelphotography", "#instatravel", "#traveling", "#tourism", "#travelblogger", "#trip", "#getaway", "#nature", "#wanderer"],
  beauty: ["#beauty", "#makeup", "#skincare", "#beautyblogger", "#makeupartist", "#cosmetics", "#beautytips", "#glam", "#mua", "#skincareroutine", "#beautycare", "#instabeauty", "#makeuplover", "#glowup", "#selfcare"],
  technology: ["#technology", "#tech", "#innovation", "#coding", "#programming", "#software", "#developer", "#ai", "#startup", "#webdevelopment", "#machinelearning", "#technews", "#gadgets", "#digital", "#engineering"],
  motivation: ["#motivation", "#inspiration", "#success", "#mindset", "#motivationalquotes", "#goals", "#hustle", "#positivity", "#selfimprovement", "#growth", "#hardwork", "#dreambig", "#nevergiveup", "#believe", "#focus"],
  music: ["#music", "#musician", "#singer", "#newmusic", "#musicvideo", "#hiphop", "#producer", "#songwriter", "#livemusic", "#musiclover", "#beats", "#artist", "#soundcloud", "#spotify", "#musicproducer"],
  photography: ["#photography", "#photo", "#photographer", "#photooftheday", "#picoftheday", "#instagood", "#nature", "#portrait", "#art", "#photoshoot", "#camera", "#capturedmoments", "#naturephotography", "#streetphotography", "#landscapephotography"],
};

const generic = ["#viral", "#trending", "#explorepage", "#followforfollow", "#like4like", "#instagood", "#picoftheday", "#instadaily"];

export default function HashtagClient() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const key = topic.trim().toLowerCase();
    let matched: string[] = [];

    for (const cat in hashtagBank) {
      if (key.includes(cat) || cat.includes(key)) {
        matched = hashtagBank[cat];
        break;
      }
    }

    if (matched.length === 0) {
      const words = key.split(/\s+/).filter(Boolean);
      const custom = words.map(w => `#${w.replace(/[^a-z0-9]/g, "")}`);
      matched = [...custom, ...generic, "#instagood", "#love", "#photooftheday", "#beautiful", "#happy", "#follow", "#repost", "#style"];
    } else {
      matched = [...matched, ...generic];
    }

    const limit = platform === "twitter" ? 5 : platform === "tiktok" ? 20 : 30;
    setHashtags(matched.slice(0, limit));
    setCopied(false);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>Hashtag Generator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Generate trending hashtags for Instagram, TikTok and Twitter — boost your reach instantly</p>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
          <input
            type="text"
            className="inp"
            placeholder="Enter your topic (e.g. fitness, travel, food)"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === "Enter" && generate()}
            style={{ flex: 1, minWidth: 200 }}
          />
          <select className="inp" value={platform} onChange={e => setPlatform(e.target.value)} style={{ width: 150 }}>
            <option value="instagram">Instagram (30)</option>
            <option value="tiktok">TikTok (20)</option>
            <option value="twitter">Twitter/X (5)</option>
          </select>
          <button className="btn-gold" onClick={generate}>Generate</button>
        </div>

        {hashtags.length > 0 && (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: ".75rem" }}>
              {hashtags.map((h, i) => (
                <span key={i} style={{ fontSize: ".8rem", color: "#F5C842", background: "rgba(212,160,23,.1)", padding: "4px 10px", borderRadius: 20, border: "1px solid rgba(212,160,23,.2)" }}>{h}</span>
              ))}
            </div>
            <button className="btn-outline" onClick={copyAll}>{copied ? "Copied!" : "Copy All Hashtags"}</button>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Hashtag Limits by Platform</h2>
        <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>
          {[["Instagram", "Up to 30 hashtags allowed per post"], ["TikTok", "Recommended 3-5, max around 20-30"], ["Twitter/X", "Best with 1-2, max effective around 5"]].map(([p, d]) => (
            <div key={p} style={{ display: "flex", justifyContent: "space-between", padding: ".3rem .5rem", borderBottom: "1px solid rgba(212,160,23,.08)" }}>
              <strong style={{ color: "#F5C842" }}>{p}</strong><span>{d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Hashtag Tips for More Reach</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div>1. Mix popular and niche hashtags — don't only use huge ones</div>
          <div>2. Avoid banned or spammy hashtags — they can hide your post</div>
          <div>3. Use hashtags relevant to your actual content</div>
          <div>4. Check hashtag performance and rotate them regularly</div>
          <div>5. Put hashtags in caption or first comment — both work fine</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>FAQ</h2>
        {[
          ["Is this hashtag generator free?", "Yes, completely free with unlimited use, no signup required."],
          ["Do hashtags really help reach?", "Yes! Relevant hashtags help your content get discovered by people interested in that topic."],
          ["How many hashtags should I use on Instagram?", "Instagram allows up to 30, but 8-15 well-chosen ones often perform better than maxing out."],
          ["Can I use the same hashtags every post?", "It's better to rotate hashtags slightly to avoid looking like spam to the algorithm."]
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

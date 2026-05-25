import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — UM Tools | Tips, Guides & More",
  description: "Free guides on Zakat, BMI, Password Security, and more useful tools for Pakistan.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div>
      <h1 style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:"#F5C842", marginBottom:".2rem" }}>Blog</h1>
      <p style={{ fontSize:".78rem", color:"#9A8F78", marginBottom:"1.25rem" }}>Guides, tips aur howtos</p>
      {posts.length === 0 && <div style={{ color:"#9A8F78" }}>No posts yet.</div>}
      <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
        {posts.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration:"none" }}>
            <div className="card" style={{ cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:".4rem" }}>
                <span style={{ fontSize:".65rem", color:"#D4A017", background:"rgba(212,160,23,.1)", padding:"2px 8px", borderRadius:10, letterSpacing:1 }}>{p.category}</span>
                <span style={{ fontSize:".7rem", color:"#9A8F78" }}>{p.date} · {p.readTime} min read</span>
              </div>
              <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#F5C842", marginBottom:".3rem" }}>{p.title}</div>
              <div style={{ fontSize:".8rem", color:"#9A8F78", lineHeight:1.6 }}>{p.excerpt}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

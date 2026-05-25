import { getPost, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} — UM Tools`, description: post.excerpt };
}

function mdToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 style="font-family:Cinzel,serif;color:#F5C842;font-size:1rem;margin:1.2rem 0 .4rem">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-family:Cinzel,serif;color:#F5C842;font-size:1.1rem;margin:1.5rem 0 .5rem">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-family:Cinzel,serif;color:#F5C842;font-size:1.3rem;margin:0 0 .75rem">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#F0E6C8">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#D4A017;text-decoration:underline">$1</a>')
    .replace(/^- (.+)$/gm, '<li style="margin:.2rem 0;color:#9A8F78">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, s => `<ul style="padding-left:1.2rem;margin:.5rem 0">${s}</ul>`)
    .replace(/❌ (.+)$/gm, '<div style="color:#ef4444;margin:.2rem 0">❌ $1</div>')
    .replace(/✅ (.+)$/gm, '<div style="color:#22c55e;margin:.2rem 0;font-family:monospace">✅ $1</div>')
    .replace(/\n\n/g, '</p><p style="color:#9A8F78;line-height:1.8;margin:.5rem 0">')
    .replace(/^(?!<[h|u|l|d])(.+)$/gm, (m) => m.startsWith("<") ? m : m);
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <div style={{ maxWidth: 680 }}>
      <Link href="/blog" style={{ fontSize:".78rem", color:"#9A8F78", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:".3rem", marginBottom:"1rem" }}>
        <i className="ti ti-arrow-left" /> Back to Blog
      </Link>
      <div style={{ display:"flex", gap:".6rem", alignItems:"center", marginBottom:".75rem" }}>
        <span style={{ fontSize:".65rem", color:"#D4A017", background:"rgba(212,160,23,.1)", padding:"2px 8px", borderRadius:10 }}>{post.category}</span>
        <span style={{ fontSize:".7rem", color:"#9A8F78" }}>{post.date} · {post.readTime} min read</span>
      </div>
      <div
        className="card"
        style={{ lineHeight:1.8 }}
        dangerouslySetInnerHTML={{ __html: `<p style="color:#9A8F78;line-height:1.8;margin:.5rem 0">${mdToHtml(post.content)}</p>` }}
      />
    </div>
  );
}

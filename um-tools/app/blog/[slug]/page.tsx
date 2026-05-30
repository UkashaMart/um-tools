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
  return { title: `${post.title} - UM Tools`, description: post.excerpt };
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(\/([^)]+)\)/g, '<a href="/$2" class="md-internal-link">$1</a>')
    .replace(/\[([^\]]+)\]\((https?[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="md-link">$1</a>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter((c, i) => i > 0 && i < match.split('|').length - 1);
      return '<tr>' + cells.map(c => c.trim().startsWith('-') ? '' : `<td>${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/^[\*\-] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, s => `<ul>${s}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\n\n/g, '</p><p>');
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const html = renderMarkdown(post.content);

  return (
    <div style={{ maxWidth: 720 }}>
      <Link href="/blog" style={{ fontSize:".78rem", color:"#9A8F78", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:".3rem", marginBottom:"1rem" }}>
        <i className="ti ti-arrow-left" /> Back to Blog
      </Link>
      <div style={{ display:"flex", gap:".6rem", alignItems:"center", marginBottom:".75rem" }}>
        <span style={{ fontSize:".65rem", color:"#D4A017", background:"rgba(212,160,23,.1)", padding:"2px 8px", borderRadius:10 }}>{post.category}</span>
        <span style={{ fontSize:".7rem", color:"#9A8F78" }}>{post.date} - {post.readTime} min read</span>
      </div>
      <style>{`
        .md-content h1{font-family:Cinzel,serif;font-size:1.4rem;color:#F5C842;margin:1.5rem 0 .75rem}
        .md-content h2{font-family:Cinzel,serif;font-size:1.15rem;color:#F5C842;margin:1.25rem 0 .6rem;border-bottom:1px solid rgba(212,160,23,.2);padding-bottom:.3rem}
        .md-content h3{font-family:Cinzel,serif;font-size:1rem;color:#D4A017;margin:1rem 0 .5rem}
        .md-content p{font-size:.88rem;color:#9A8F78;line-height:1.9;margin:.6rem 0}
        .md-content strong{color:#F0E6C8;font-weight:600}
        .md-content ul{padding-left:1.25rem;margin:.6rem 0}
        .md-content li{font-size:.85rem;color:#9A8F78;line-height:1.8;margin:.2rem 0;list-style:disc}
        .md-content a.md-internal-link{color:#F5C842;text-decoration:none;font-weight:600;border-bottom:1px solid rgba(245,200,66,.4)}
        .md-content a.md-internal-link:hover{border-bottom-color:#F5C842}
        .md-content a.md-link{color:#4A7FD4;text-decoration:none;border-bottom:1px solid rgba(74,127,212,.4)}
        .md-content code{background:rgba(0,0,0,.4);color:#F5C842;padding:2px 6px;border-radius:4px;font-size:.82rem;font-family:monospace}
        .md-content pre{background:rgba(0,0,0,.4);border:1px solid rgba(212,160,23,.2);border-radius:8px;padding:1rem;margin:.75rem 0;overflow-x:auto}
        .md-content pre code{background:none;padding:0;color:#F0E6C8}
        .md-content table{width:100%;border-collapse:collapse;margin:.75rem 0;font-size:.82rem}
        .md-content tr{border-bottom:1px solid rgba(212,160,23,.15)}
        .md-content td{padding:.4rem .75rem;color:#9A8F78}
        .md-content tr:first-child td{color:#F5C842;font-weight:600;background:rgba(212,160,23,.06)}
        .md-content hr{border:none;border-top:1px solid rgba(212,160,23,.2);margin:1.25rem 0}
      `}</style>
      <div className="card md-content" dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} />
      <div style={{ marginTop:"1.5rem", padding:"1rem", background:"rgba(212,160,23,.06)", borderRadius:10, border:"1px solid rgba(212,160,23,.2)" }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:".85rem", color:"#F5C842", marginBottom:".5rem" }}>Related Tools</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem" }}>
          {[["Word Counter","/tools/word-counter"],["Zakat Calculator","/tools/zakat-calculator"],["BMI Calculator","/tools/bmi-calculator"],["Password Generator","/tools/password-generator"],["QR Generator","/tools/qr-generator"]].map(([name,href]) => (
            <Link key={href} href={href} style={{ fontSize:".75rem", color:"#D4A017", background:"rgba(212,160,23,.1)", padding:"3px 10px", borderRadius:20, textDecoration:"none" }}>{name}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
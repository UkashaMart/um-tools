import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string; title: string; date: string;
  excerpt: string; category: string; readTime: number;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir).filter(f=>f.endsWith(".md")).map(file=>{
    const slug=file.replace(".md","");
    const raw=fs.readFileSync(path.join(postsDir,file),"utf8");
    const {data,content}=matter(raw);
    return { slug, title:data.title||slug, date:data.date||"", excerpt:data.excerpt||content.slice(0,150)+"...", category:data.category||"General", readTime:Math.max(1,Math.ceil(content.split(/\s+/).length/200)) };
  }).sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime());
}

export function getPost(slug:string){
  const file=path.join(postsDir,slug+".md");
  if(!fs.existsSync(file))return null;
  const raw=fs.readFileSync(file,"utf8");
  const {data,content}=matter(raw);
  return { slug, title:data.title||slug, date:data.date||"", excerpt:data.excerpt||"", category:data.category||"General", readTime:Math.max(1,Math.ceil(content.split(/\s+/).length/200)), content };
}

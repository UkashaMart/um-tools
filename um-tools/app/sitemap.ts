import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import fs from "fs";
import path from "path";

function getAllTools(): string[] {
  const toolsDir = path.join(process.cwd(), "app", "tools");
  try {
    return fs.readdirSync(toolsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ukashamart.com";
  const posts = getAllPosts();
  const tools = getAllTools();

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...tools.map((t) => ({
      url: `${base}/tools/${t}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
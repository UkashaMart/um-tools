import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const tools = ["word-counter","case-converter","lorem-ipsum","duplicate-remover","text-sorter","zakat-calculator","bmi-calculator","age-calculator","percentage-calculator","loan-emi","cgpa-calculator","salary-tax","password-generator","base64","json-formatter","md5-hash","url-encoder","qr-generator","color-picker","image-to-base64","aspect-ratio"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ukashamart.com";
  const posts = getAllPosts();
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...tools.map(t => ({ url: `${base}/tools/${t}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}

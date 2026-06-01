import type { Metadata } from "next";
import URLClient from "./URLClient";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder Online Free - Web Tools",
  description: "Free online URL encoder and decoder. Quickly encode or decode special characters in URLs for web development. Supports UTF-8 and international character sets.",
  keywords: "url encoder online, url decoder online, url encode decode free, url character encoding, web developer tool, encode special characters",
};

export default function Page() { 
  return <URLClient />; 
}
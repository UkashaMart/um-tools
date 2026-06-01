import type { Metadata } from "next";
import MD5Client from "./MD5Client";

export const metadata: Metadata = {
  title: "MD5 Hash Generator Online Free - Text to MD5",
  description: "Free online MD5 hash generator. Instantly generate MD5 checksums for text and file verification. No registration required.",
  keywords: "md5 hash generator, md5 generator online, md5 checksum generator, text to md5, md5 hash online free, generate md5 hash",
};

export default function Page() { 
  return <MD5Client />; 
}
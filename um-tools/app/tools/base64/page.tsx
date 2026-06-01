import type { Metadata } from "next";
import B64Client from "./B64Client";

export const metadata: Metadata = {
  title: "Base64 Encoder Decoder Online Free - Text Convert Tool",
  description: "Free online Base64 encoder and decoder tool. Easily encode plain text to Base64 format or decode Base64 strings back to original text instantly.",
  keywords: "base64 encoder online, base64 decoder online, base64 converter free, encode decode base64, base64 tool online, online text encoder",
};
export default function Page() { 
  return <B64Client />; 
}
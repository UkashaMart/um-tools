import type { Metadata } from "next";
import B64Client from "./B64Client";
export const metadata: Metadata = {
  title: "Base64 Encoder Decoder Online Free - Text Convert",
  description: "Base64 encoder decoder online free. Text ko Base64 mein encode karo ya Base64 ko original text mein decode karo. Developers ke liye fast tool.",
  keywords: "base64 encoder online, base64 decoder online, base64 converter free, encode decode base64, base64 tool online",
};
export default function Page() { return <B64Client />; }

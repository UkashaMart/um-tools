import type { Metadata } from "next";
import MD5Client from "./MD5Client";
export const metadata: Metadata = {
  title: "MD5 Hash Generator Online Free - Text to MD5",
  description: "MD5 hash generator online free. Text ka MD5 hash instantly generate karo. File verification aur checksums ke liye. No signup required.",
  keywords: "md5 hash generator, md5 generator online, md5 checksum generator, text to md5, md5 hash online free",
};
export default function Page() { return <MD5Client />; }

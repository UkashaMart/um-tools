import type { Metadata } from "next"; import MD5Client from "./MD5Client";
export const metadata: Metadata = { title: "MD5 Hash Generator — UM Tools", description: "Generate MD5 hash from text online free." };
export default function Page() { return <MD5Client />; }

import type { Metadata } from "next"; import B64Client from "./B64Client";
export const metadata: Metadata = { title: "Base64 Encoder Decoder — UM Tools", description: "Encode or decode Base64 text online free." };
export default function Page() { return <B64Client />; }

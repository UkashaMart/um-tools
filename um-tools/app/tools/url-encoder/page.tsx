import type { Metadata } from "next"; import URLClient from "./URLClient";
export const metadata: Metadata = { title: "URL Encoder Decoder — UM Tools", description: "Encode or decode URLs online free." };
export default function Page() { return <URLClient />; }

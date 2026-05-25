import type { Metadata } from "next"; import DupClient from "./DupClient";
export const metadata: Metadata = { title: "Duplicate Line Remover — UM Tools", description: "Remove duplicate lines from text online free." };
export default function Page() { return <DupClient />; }

import type { Metadata } from "next"; import LoremClient from "./LoremClient";
export const metadata: Metadata = { title: "Lorem Ipsum Generator — UM Tools", description: "Generate Lorem Ipsum placeholder text online free." };
export default function Page() { return <LoremClient />; }

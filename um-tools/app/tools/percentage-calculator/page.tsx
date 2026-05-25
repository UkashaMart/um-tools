import type { Metadata } from "next"; import PctClient from "./PctClient";
export const metadata: Metadata = { title: "Percentage Calculator — UM Tools", description: "Calculate percentage online free. 3 types of percentage calculations." };
export default function Page() { return <PctClient />; }

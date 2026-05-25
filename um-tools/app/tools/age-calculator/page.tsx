import type { Metadata } from "next"; import AgeClient from "./AgeClient";
export const metadata: Metadata = { title: "Age Calculator — UM Tools", description: "Calculate exact age in years, months and days. Find next birthday countdown." };
export default function Page() { return <AgeClient />; }

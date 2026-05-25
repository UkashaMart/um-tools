import type { Metadata } from "next"; import TaxClient from "./TaxClient";
export const metadata: Metadata = { title: "Pakistan Salary Tax Calculator 2024-25 — UM Tools", description: "Calculate Pakistan FBR income tax on salary 2024-25. Monthly take-home pay calculator." };
export default function Page() { return <TaxClient />; }

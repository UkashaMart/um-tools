import type { Metadata } from "next"; import ZakatClient from "./ZakatClient";
export const metadata: Metadata = { title: "Zakat Calculator Pakistan — UM Tools", description: "Calculate Zakat on savings, gold, silver according to Islamic rules. PKR Nisab 2024." };
export default function Page() { return <ZakatClient />; }

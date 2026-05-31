import type { Metadata } from "next";
import ZakatClient from "./ZakatClient";
export const metadata: Metadata = {
  title: "Zakat Calculator 2026 Pakistan - Nisab Silver Gold PKR",
  description: "Zakat calculator 2026 Pakistan. Silver nisab PKR 87,413 aur gold nisab PKR 3,583,215. 20+ currencies mein zakat calculate karo. Assets aur liabilities ke saath.",
  keywords: "zakat calculator 2026, zakat calculator pakistan, nisab 2026 pakistan, silver nisab pkr, gold nisab pakistan, zakat kaise calculate karein",
};
export default function Page() { return <ZakatClient />; }

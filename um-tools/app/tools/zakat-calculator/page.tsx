import type { Metadata } from "next";
import ZakatClient from "./ZakatClient";

export const metadata: Metadata = {
  title: "Zakat Calculator 2026 Pakistan - Nisab for Gold & Silver",
  description: "Calculate Zakat 2026 in Pakistan with our easy-to-use calculator. Features current Silver (PKR 87,413) and Gold (PKR 3,583,215) Nisab thresholds. Calculate Zakat on assets, cash, and gold accurately.",
  keywords: "zakat calculator 2026, zakat calculator pakistan, nisab 2026 pakistan, silver nisab pkr, gold nisab pakistan, how to calculate zakat, zakat on gold and assets",
};

export default function Page() { 
  return <ZakatClient />; 
}
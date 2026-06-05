import type { Metadata } from "next";
import CurrencyClient from "./CurrencyClient";
export const metadata: Metadata = {
  title: "Currency Converter - USD to PKR, EUR, GBP Live Rates 2026",
  description: "Free currency converter with live exchange rates. Convert USD to PKR, EUR, GBP, SAR, AED and 150+ currencies. Dollar to rupee rate today.",
  keywords: "currency converter, dollar to pkr today, usd to pkr, euro to pkr, currency converter online free, dollar rate pakistan today 2026",
};
export default function Page() { return <CurrencyClient />; }

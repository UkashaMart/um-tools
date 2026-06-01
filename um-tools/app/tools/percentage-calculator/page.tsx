import type { Metadata } from "next";
import PctClient from "./PctClient";

export const metadata: Metadata = {
  title: "Percentage Calculator Online Free - Fast & Accurate",
  description: "Free online percentage calculator. Instantly calculate discounts, exam marks percentages, GST/tax rates, salary increases, and profit/loss margins. Simple, fast, and accurate.",
  keywords: "percentage calculator online, discount calculator, percentage calculator free, marks percentage calculator, gst calculator, math tool, profit margin calculator",
};

export default function Page() { 
  return <PctClient />; 
}
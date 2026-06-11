import type { Metadata } from "next";
import TipClient from "./TipClient";

export const metadata: Metadata = {
  title: "Tip Calculator - Split Bill and Calculate Tip Online Free",
  description: "Calculate tip amount and split bill between friends. Free online tip calculator with custom tip percentage and bill splitting.",
  keywords: "tip calculator, bill splitter, restaurant tip calculator, split bill calculator, gratuity calculator",
};

export default function Page() { return <TipClient />; }

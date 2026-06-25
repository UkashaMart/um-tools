import type { Metadata } from "next";
import OvulationClient from "./OvulationClient";

export const metadata: Metadata = {
  title: "Ovulation Calculator - Free Fertile Window & Ovulation Date Tool",
  description: "Free ovulation calculator. Find your most fertile days, predicted ovulation date, and next period based on your cycle length. Accurate and private - no signup required.",
  keywords: "ovulation calculator, fertile window calculator, ovulation date calculator, fertility calculator, when am i ovulating, most fertile days calculator",
};

export default function Page() {
  return <OvulationClient />;
}

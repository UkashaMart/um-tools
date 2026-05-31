import type { Metadata } from "next";
import PctClient from "./PctClient";
export const metadata: Metadata = {
  title: "Percentage Calculator Online Free - Discount Marks Tax",
  description: "Percentage calculator online free. Discount, exam marks, GST tax, salary increase aur profit/loss percentage calculate karo. 3 types of calculations.",
  keywords: "percentage calculator online, discount calculator pakistan, percentage calculator free, marks percentage calculator, gst calculator pakistan",
};
export default function Page() { return <PctClient />; }

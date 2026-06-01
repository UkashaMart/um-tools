import type { Metadata } from "next";
import TaxClient from "./TaxClient";

export const metadata: Metadata = {
  title: "Salary Tax Calculator Pakistan 2025-26 - FBR Income Tax",
  description: "Calculate your monthly income tax and take-home salary in Pakistan for the 2025-26 tax year according to the latest FBR tax slabs. Accurate, fast, and easy to use.",
  keywords: "salary tax calculator pakistan 2026, fbr income tax calculator, pakistan tax calculator 2025-26, income tax slab pakistan, calculate take home salary pakistan",
};

export default function Page() { 
  return <TaxClient />; 
}
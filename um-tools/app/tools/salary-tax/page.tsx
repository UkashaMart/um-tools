import type { Metadata } from "next";
import TaxClient from "./TaxClient";
export const metadata: Metadata = {
  title: "Salary Tax Calculator Pakistan 2025-26 - FBR Income Tax",
  description: "Pakistan salary tax calculator 2025-26. FBR income tax slabs ke mutabiq monthly tax aur take-home salary calculate karo. Sarkari mulazim aur private sector.",
  keywords: "salary tax calculator pakistan 2026, fbr income tax calculator, pakistan tax calculator 2025-26, income tax pakistan",
};
export default function Page() { return <TaxClient />; }

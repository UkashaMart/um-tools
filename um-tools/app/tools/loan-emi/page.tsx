import type { Metadata } from "next";
import EMIClient from "./EMIClient";
export const metadata: Metadata = {
  title: "Loan EMI Calculator Pakistan - HBL MCB UBL Bank Installment",
  description: "Pakistan loan EMI calculator. Car loan, home loan, personal loan monthly installment calculate karo. HBL, MCB, UBL, Meezan Bank interest rates 2026.",
  keywords: "loan emi calculator pakistan, car loan calculator pakistan, home loan calculator pakistan, bank installment calculator, hbl loan calculator",
};
export default function Page() { return <EMIClient />; }

import type { Metadata } from "next";
import EMIClient from "./EMIClient";

export const metadata: Metadata = {
  title: "Loan EMI Calculator Pakistan - Bank Installment & Interest Tool",
  description: "Free online loan EMI calculator for Pakistani banks. Calculate monthly installments for car, home, and personal loans including interest rates for HBL, MCB, UBL, and Meezan Bank 2026.",
  keywords: "loan emi calculator pakistan, car loan calculator pakistan, home loan calculator pakistan, bank installment calculator, hbl loan calculator, personal loan calculator pakistan",
};

export default function Page() { 
  return <EMIClient />; 
}
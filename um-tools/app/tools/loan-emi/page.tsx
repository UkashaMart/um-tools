import type { Metadata } from "next"; import EMIClient from "./EMIClient";
export const metadata: Metadata = { title: "Loan EMI Calculator Pakistan — UM Tools", description: "Calculate monthly loan installment (EMI) for Pakistan banks. Free online EMI calculator." };
export default function Page() { return <EMIClient />; }

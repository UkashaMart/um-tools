import type { Metadata } from "next";
import AgeClient from "./AgeClient";

export const metadata: Metadata = {
  title: "Age Calculator Online - Exact Age in Years, Months & Days",
  description: "Calculate your exact age in years, months, and days online with our free tool. Get an accurate date of birth calculation and see a live countdown to your next birthday.",
  keywords: "age calculator online, exact age calculator, date of birth age calculator, birthday calculator, age tracker, calculate age online",
};

export default function Page() { 
  return <AgeClient />; 
}
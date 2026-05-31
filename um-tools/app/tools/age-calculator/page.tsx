import type { Metadata } from "next";
import AgeClient from "./AgeClient";
export const metadata: Metadata = {
  title: "Age Calculator Online - Exact Age Years Months Days",
  description: "Online age calculator. Date of birth se exact age years, months aur days mein calculate karo. Next birthday countdown bhi janiye. Free tool.",
  keywords: "age calculator online, age calculator pakistan, date of birth age calculator, exact age calculator, birthday calculator",
};
export default function Page() { return <AgeClient />; }

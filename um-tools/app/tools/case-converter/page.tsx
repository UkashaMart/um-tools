import type { Metadata } from "next";
import CaseClient from "./CaseClient";
export const metadata: Metadata = {
  title: "Case Converter Online Free - UPPER lower Title Sentence",
  description: "Free online case converter. Text ko uppercase, lowercase, title case, sentence case mein convert karo. Developers aur writers ke liye instant tool.",
  keywords: "case converter online, uppercase converter, lowercase converter, title case converter, text case changer free",
};
export default function Page() { return <CaseClient />; }

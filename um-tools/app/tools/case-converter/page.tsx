import type { Metadata } from "next";
import CaseClient from "./CaseClient";

export const metadata: Metadata = {
  title: "Case Converter Online Free - UPPER, lower, Title & Sentence Case",
  description: "Free online text case converter tool. Easily convert your text into UPPERCASE, lowercase, Title Case, Sentence Case, and more instantly. Perfect for writers and developers.",
  keywords: "case converter online, uppercase converter, lowercase converter, title case converter, text case changer free, sentence case generator",
};

export default function Page() { 
  return <CaseClient />; 
}
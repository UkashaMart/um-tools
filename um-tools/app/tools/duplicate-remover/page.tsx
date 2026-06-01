import type { Metadata } from "next";
import DupClient from "./DupClient";

export const metadata: Metadata = {
  title: "Duplicate Line Remover Online Free - Remove Repeated Lines",
  description: "Free online duplicate line remover tool. Instantly scan and remove repeating text strings or duplicate lines from email lists, messy text data, and code repositories.",
  keywords: "duplicate line remover, remove duplicate lines online, duplicate text remover free, duplicate remover tool, online text deduplication",
};

export default function Page() { 
  return <DupClient />; 
}
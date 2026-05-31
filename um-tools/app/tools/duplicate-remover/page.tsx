import type { Metadata } from "next";
import DupClient from "./DupClient";
export const metadata: Metadata = {
  title: "Duplicate Line Remover Online Free - Remove Repeated Lines",
  description: "Duplicate line remover online free. Text se duplicate lines instantly remove karo. Email lists, data cleaning aur code deduplication ke liye.",
  keywords: "duplicate line remover, remove duplicate lines online, duplicate text remover free, duplicate remover tool",
};
export default function Page() { return <DupClient />; }

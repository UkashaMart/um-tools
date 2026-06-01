import type { Metadata } from "next";
import SortClient from "./SortClient";

export const metadata: Metadata = {
  title: "Text Sorter Online Free - Sort Lines Alphabetically",
  description: "Free online text sorter. Easily organize your lists by sorting lines alphabetically (A-Z, Z-A), by length, or shuffling them randomly. A fast, simple tool for text management.",
  keywords: "text sorter online, sort lines alphabetically, line sorter free, text organizer online, alphabetical sorter, shuffle text lines",
};

export default function Page() { 
  return <SortClient />; 
}
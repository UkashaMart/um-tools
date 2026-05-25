import type { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";
export const metadata: Metadata = {
  title: "Word Counter — UM Tools",
  description: "Free online word counter. Count words, characters, lines, sentences and paragraphs instantly.",
};
export default function Page() { return <WordCounterClient />; }

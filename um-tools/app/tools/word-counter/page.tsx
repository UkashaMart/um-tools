import type { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";
export const metadata: Metadata = {
  title: "Word Counter Online Free - Characters Lines Sentences Count",
  description: "Free online word counter. Words, characters, sentences, paragraphs aur reading time instantly count karo. Students, bloggers aur writers ke liye.",
  keywords: "word counter online, character counter, word count tool, online word counter free, word counter urdu english",
};
export default function Page() { return <WordCounterClient />; }

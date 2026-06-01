import type { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter Online Free - Count Words, Characters & Sentences",
  description: "Free online word counter. Instantly count words, characters, sentences, paragraphs, and estimate reading time. Perfect for students, bloggers, and writers.",
  keywords: "word counter online, character counter, word count tool, online word counter free, count words and characters, text analysis tool",
};

export default function Page() { 
  return <WordCounterClient />; 
}
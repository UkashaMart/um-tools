import type { Metadata } from "next";
import TTSClient from "./TTSClient";

export const metadata: Metadata = {
  title: "Free Text to Speech Converter Online — Listen to Any Text",
  description: "Convert text to speech online for free. Choose voice, language, speed and pitch. Listen to articles, documents and notes instantly in your browser.",
  keywords: "text to speech, free text to speech converter, online tts, text to speech online free, read aloud tool",
};

export default function Page() { return <TTSClient />; }

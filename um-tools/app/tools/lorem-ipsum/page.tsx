import type { Metadata } from "next";
import LoremClient from "./LoremClient";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator Online Free - Placeholder Text",
  description: "Free online Lorem Ipsum generator. Easily generate custom paragraphs, sentences, or words for your web design layouts, print mockups, and UI testing.",
  keywords: "lorem ipsum generator, placeholder text generator, dummy text generator online, lorem ipsum online free, generate lipsum",
};

export default function Page() { 
  return <LoremClient />; 
}
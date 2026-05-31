import type { Metadata } from "next";
import LoremClient from "./LoremClient";
export const metadata: Metadata = {
  title: "Lorem Ipsum Generator Online Free - Placeholder Text",
  description: "Lorem ipsum generator online free. Paragraphs, sentences ya words generate karo. Web design aur print layouts ke liye placeholder text.",
  keywords: "lorem ipsum generator, placeholder text generator, dummy text generator online, lorem ipsum online free",
};
export default function Page() { return <LoremClient />; }

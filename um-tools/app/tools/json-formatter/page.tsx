import type { Metadata } from "next";
import JSONClient from "./JSONClient";
export const metadata: Metadata = {
  title: "JSON Formatter Beautifier Validator Online Free",
  description: "JSON formatter, beautifier aur validator online free. JSON ko format, minify aur validate karo. Developers ke liye instant JSON tool.",
  keywords: "json formatter online, json beautifier, json validator online, json minifier, format json online free",
};
export default function Page() { return <JSONClient />; }

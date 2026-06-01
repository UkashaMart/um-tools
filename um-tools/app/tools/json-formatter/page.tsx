import type { Metadata } from "next";
import JSONClient from "./JSONClient";

export const metadata: Metadata = {
  title: "JSON Formatter Beautifier Validator Online Free",
  description: "Free online JSON formatter, beautifier, and validator tool. Instantly format, minify, and validate your JSON data structures. Perfect for developers and web professionals.",
  keywords: "json formatter online, json beautifier, json validator online, json minifier, format json online free, json parser",
};

export default function Page() { 
  return <JSONClient />; 
}
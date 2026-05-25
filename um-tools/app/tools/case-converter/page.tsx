import type { Metadata } from "next";
import CaseClient from "./CaseClient";
export const metadata: Metadata = { title: "Case Converter — UM Tools", description: "Convert text to uppercase, lowercase, title case, sentence case online free." };
export default function Page() { return <CaseClient />; }

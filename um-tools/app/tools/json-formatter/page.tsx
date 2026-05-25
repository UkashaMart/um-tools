import type { Metadata } from "next"; import JSONClient from "./JSONClient";
export const metadata: Metadata = { title: "JSON Formatter & Validator — UM Tools", description: "Format, beautify, minify and validate JSON online free." };
export default function Page() { return <JSONClient />; }

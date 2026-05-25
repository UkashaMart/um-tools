import type { Metadata } from "next"; import AspClient from "./AspClient";
export const metadata: Metadata = { title: "Aspect Ratio Calculator — UM Tools", description: "Calculate image aspect ratio and new dimensions online free." };
export default function Page() { return <AspClient />; }

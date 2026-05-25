import type { Metadata } from "next"; import CGPAClient from "./CGPAClient";
export const metadata: Metadata = { title: "CGPA Calculator Pakistan — UM Tools", description: "Calculate CGPA on 4.0 scale for Pakistani universities free online." };
export default function Page() { return <CGPAClient />; }

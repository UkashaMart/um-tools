import type { Metadata } from "next"; import BMIClient from "./BMIClient";
export const metadata: Metadata = { title: "BMI Calculator — UM Tools", description: "Calculate Body Mass Index (BMI) free online. Underweight, normal, overweight check." };
export default function Page() { return <BMIClient />; }

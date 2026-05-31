import type { Metadata } from "next";
import BMIClient from "./BMIClient";
export const metadata: Metadata = {
  title: "BMI Calculator Pakistan - Body Mass Index Free Online",
  description: "BMI calculator Pakistan. Apna Body Mass Index calculate karo. Underweight, normal, overweight ya obese category janiye. Pakistani adults ke liye.",
  keywords: "bmi calculator pakistan, body mass index calculator, bmi calculator online free, bmi calculator urdu",
};
export default function Page() { return <BMIClient />; }

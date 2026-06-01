import type { Metadata } from "next";
import BMIClient from "./BMIClient";

export const metadata: Metadata = {
  title: "BMI Calculator Pakistan - Free Online Body Mass Index Tool",
  description: "Free online BMI calculator optimized for users in Pakistan and worldwide. Calculate your Body Mass Index instantly and determine if you are underweight, normal weight, overweight, or obese.",
  keywords: "bmi calculator pakistan, body mass index calculator, bmi calculator online free, accurate bmi tracker, ideal weight calculator",
};

export default function Page() { 
  return <BMIClient />; 
}
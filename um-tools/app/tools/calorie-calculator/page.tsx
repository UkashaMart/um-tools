import type { Metadata } from "next";
import CalorieClient from "./CalorieClient";

export const metadata: Metadata = {
  title: "Calorie Calculator - Free Daily Calorie & TDEE Calculator",
  description: "Free calorie calculator to find your daily calorie needs (TDEE) for weight loss, maintenance, or muscle gain. Based on Mifflin-St Jeor formula. No signup required.",
  keywords: "calorie calculator, tdee calculator, daily calorie needs, calories to lose weight, maintenance calories calculator, bmr calculator",
};

export default function Page() {
  return <CalorieClient />;
}

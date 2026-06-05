import type { Metadata } from "next";
import UnitClient from "./UnitClient";
export const metadata: Metadata = {
  title: "Unit Converter Online Free - Length Weight Temperature Speed",
  description: "Free online unit converter. Convert length, weight, temperature, speed, area and volume. Kilometers to miles, kg to lbs, Celsius to Fahrenheit and more.",
  keywords: "unit converter online, length converter, weight converter, temperature converter, km to miles, kg to lbs, celsius to fahrenheit",
};
export default function Page() { return <UnitClient />; }

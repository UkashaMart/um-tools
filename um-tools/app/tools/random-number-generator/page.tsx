import type { Metadata } from "next";
import RNGClient from "./RNGClient";

export const metadata: Metadata = {
  title: "Random Number Generator - Free Online Tool",
  description: "Generate random numbers instantly. Set min/max range, generate multiple numbers, dice roller and more. Free online random number generator.",
  keywords: "random number generator, random number picker, dice roller, number randomizer",
};

export default function Page() { return <RNGClient />; }

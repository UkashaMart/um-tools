import type { Metadata } from "next";
import ColorClient from "./ColorClient";
export const metadata: Metadata = {
  title: "Color Picker HEX RGB HSL Converter Online Free",
  description: "Color picker aur converter online free. HEX, RGB, HSL colors convert karo. Web designers aur developers ke liye. Pakistan brand colors bhi.",
  keywords: "color picker online, hex to rgb converter, rgb to hex, hsl color converter, color code converter free",
};
export default function Page() { return <ColorClient />; }

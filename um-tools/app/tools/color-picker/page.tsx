import type { Metadata } from "next";
import ColorClient from "./ColorClient";

export const metadata: Metadata = {
  title: "Color Picker HEX RGB HSL Converter Online Free",
  description: "Free online color picker and converter tool. Easily convert colors between HEX, RGB, and HSL formats. Perfect for web designers and front-end developers, including popular branding color presets.",
  keywords: "color picker online, hex to rgb converter, rgb to hex, hsl color converter, color code converter free, online color finder",
};

export default function Page() { 
  return <ColorClient />; 
}
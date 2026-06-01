import type { Metadata } from "next";
import ImgClient from "./ImgClient";

export const metadata: Metadata = {
  title: "Image to Base64 Converter Online Free - Convert PNG & JPG",
  description: "Free online image to Base64 converter tool. Instantly encode PNG, JPG, GIF, WebP, and SVG images into clean Base64 strings for direct embedding into HTML and CSS.",
  keywords: "image to base64 converter, png to base64 online, jpg to base64, image encoder online free, base64 image converter, convert image to data url",
};

export default function Page() { 
  return <ImgClient />; 
}
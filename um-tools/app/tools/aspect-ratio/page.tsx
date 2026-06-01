import type { Metadata } from "next";
import AspClient from "./AspClient";

export const metadata: Metadata = {
  title: "Aspect Ratio Calculator Online Free - Image Resize Tool",
  description: "Free online aspect ratio calculator. Maintain the perfect width and height proportions while resizing images. Check social media image sizes for 2026, including YouTube, Instagram, and TikTok dimensions.",
  keywords: "aspect ratio calculator, image aspect ratio, resize calculator, social media image size 2026, youtube thumbnail size, aspect ratio finder",
};

export default function Page() { 
  return <AspClient />; 
}
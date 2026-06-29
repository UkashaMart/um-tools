import type { Metadata } from "next";
import BgRemoverClient from "./BgRemoverClient";

export const metadata: Metadata = {
  title: "Free Background Remover - AI Image Background Eraser Online",
  description: "Remove image backgrounds instantly with AI, free and online. No signup, no watermark. Works on product photos, portraits, and more - all processing happens in your browser.",
  keywords: "background remover, remove background from image, transparent background maker, ai background remover, free background eraser online",
};

export default function Page() {
  return <BgRemoverClient />;
}

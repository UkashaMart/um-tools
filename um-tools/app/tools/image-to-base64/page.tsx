import type { Metadata } from "next";
import ImgClient from "./ImgClient";
export const metadata: Metadata = {
  title: "Image to Base64 Converter Online Free - PNG JPG",
  description: "Image to Base64 converter online free. PNG, JPG, GIF images ko Base64 string mein convert karo. HTML aur CSS mein embed karne ke liye.",
  keywords: "image to base64 converter, png to base64 online, jpg to base64, image encoder online free, base64 image converter",
};
export default function Page() { return <ImgClient />; }

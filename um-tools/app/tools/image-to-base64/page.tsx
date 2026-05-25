import type { Metadata } from "next"; import ImgClient from "./ImgClient";
export const metadata: Metadata = { title: "Image to Base64 Converter — UM Tools", description: "Convert any image to Base64 string online free." };
export default function Page() { return <ImgClient />; }

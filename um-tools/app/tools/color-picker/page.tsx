import type { Metadata } from "next"; import ColorClient from "./ColorClient";
export const metadata: Metadata = { title: "Color Picker HEX RGB HSL — UM Tools", description: "Convert colors between HEX, RGB and HSL online free." };
export default function Page() { return <ColorClient />; }

import type { Metadata } from "next"; import QRClient from "./QRClient";
export const metadata: Metadata = { title: "QR Code Generator — UM Tools", description: "Generate QR codes from any text or URL free. Download as PNG." };
export default function Page() { return <QRClient />; }

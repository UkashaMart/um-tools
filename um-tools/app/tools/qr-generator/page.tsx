import type { Metadata } from "next";
import QRClient from "./QRClient";

export const metadata: Metadata = {
  title: "QR Code Generator Online Free - High Quality PNG",
  description: "Free online QR code generator. Instantly create custom QR codes for URLs, text, WhatsApp links, and payments. Download as high-quality PNG. No registration required.",
  keywords: "qr code generator free, qr code generator online, create custom qr code, whatsapp qr code generator, qr code png download, free qr creator",
};

export default function Page() { 
  return <QRClient />; 
}
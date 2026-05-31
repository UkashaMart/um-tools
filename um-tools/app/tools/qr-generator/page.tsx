import type { Metadata } from "next";
import QRClient from "./QRClient";
export const metadata: Metadata = {
  title: "QR Code Generator Free Online - PNG Download",
  description: "Free QR code generator online. Kisi bhi URL, text, WhatsApp link ya payment link ka QR code banao. PNG mein download karo. No signup required.",
  keywords: "qr code generator free, qr code generator online, qr code banao, whatsapp qr code generator, qr code png download",
};
export default function Page() { return <QRClient />; }

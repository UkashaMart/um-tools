import type { Metadata } from "next";
import InvoiceClient from "./InvoiceClient";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create Professional Invoices Online",
  description: "Create and download professional invoices for free. Add your logo, client details, items and tax. Download as PDF instantly. Perfect for freelancers.",
  keywords: "invoice generator, free invoice maker, online invoice creator, freelancer invoice, pdf invoice generator, invoice template free",
};

export default function Page() { return <InvoiceClient />; }

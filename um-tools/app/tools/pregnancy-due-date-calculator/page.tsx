import type { Metadata } from "next";
import DueDateClient from "./DueDateClient";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator — Free & Accurate Online",
  description: "Calculate your pregnancy due date instantly. Enter your last period date or conception date and get your estimated due date, current week, and trimester. Free, accurate, no signup.",
  keywords: "pregnancy due date calculator, due date calculator, conception calculator, pregnancy calculator, pregnancy week calculator, estimated due date",
};

export default function Page() { return <DueDateClient />; }

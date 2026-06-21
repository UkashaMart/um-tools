import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Free Resume Builder — Create Professional CV Online",
  description: "Build a professional resume online for free. Add your experience, education and skills, then download as PDF instantly. No signup, no watermark.",
  keywords: "free resume builder, cv maker online, resume maker free, online resume builder, free cv builder, resume template free",
};

export default function Page() { return <ResumeClient />; }

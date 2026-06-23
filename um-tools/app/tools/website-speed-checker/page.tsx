import type { Metadata } from "next";
import SpeedClient from "./SpeedClient";

export const metadata: Metadata = {
  title: "Website Speed Test — Free Page Speed Checker Online",
  description: "Check your website's speed, performance, SEO and accessibility score for free. Powered by Google PageSpeed Insights. Get instant results for mobile and desktop.",
  keywords: "website speed test, page speed checker, free site speed test, google pagespeed insights, website performance checker, core web vitals checker",
};

export default function Page() { return <SpeedClient />; }

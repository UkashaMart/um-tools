import type { Metadata } from "next";
import HashtagClient from "./HashtagClient";

export const metadata: Metadata = {
  title: "Hashtag Generator for Instagram and TikTok — Free Tool",
  description: "Generate trending hashtags for Instagram, TikTok and Twitter instantly. Enter your topic and get relevant hashtags to boost your reach. Free, no signup.",
  keywords: "hashtag generator, instagram hashtag generator, tiktok hashtags, hashtag generator free, trending hashtags tool",
};

export default function Page() { return <HashtagClient />; }

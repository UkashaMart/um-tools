import type { Metadata } from "next";
import ThumbClient from "./ThumbClient";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader — Download HD Thumbnails Free",
  description: "Download YouTube video thumbnails in HD quality for free. Paste any YouTube URL and get thumbnail images instantly in multiple resolutions.",
  keywords: "youtube thumbnail downloader, download youtube thumbnail, youtube thumbnail grabber, youtube thumbnail HD download, get youtube thumbnail",
};

export default function Page() { return <ThumbClient />; }

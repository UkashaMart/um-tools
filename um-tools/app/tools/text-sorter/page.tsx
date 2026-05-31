import type { Metadata } from "next";
import SortClient from "./SortClient";
export const metadata: Metadata = {
  title: "Text Sorter Online Free - Sort Lines A-Z Z-A Alphabetically",
  description: "Text sorter online free. Lines ko A-Z, Z-A, length ke hisaab se sort karo ya randomly shuffle karo. Lists organize karne ka easy tool.",
  keywords: "text sorter online, sort lines alphabetically, line sorter free, text organizer online, alphabetical sorter",
};
export default function Page() { return <SortClient />; }

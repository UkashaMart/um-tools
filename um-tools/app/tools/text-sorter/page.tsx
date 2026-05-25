import type { Metadata } from "next"; import SortClient from "./SortClient";
export const metadata: Metadata = { title: "Text Sorter — UM Tools", description: "Sort lines A-Z, Z-A, by length or shuffle online free." };
export default function Page() { return <SortClient />; }

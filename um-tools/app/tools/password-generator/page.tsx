import type { Metadata } from "next"; import PwClient from "./PwClient";
export const metadata: Metadata = { title: "Password Generator — UM Tools", description: "Generate strong secure passwords online free. Customizable length and character sets." };
export default function Page() { return <PwClient />; }

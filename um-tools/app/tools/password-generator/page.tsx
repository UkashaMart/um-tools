import type { Metadata } from "next";
import PwClient from "./PwClient";
export const metadata: Metadata = {
  title: "Strong Password Generator Free - Secure Password Banao",
  description: "Strong password generator online free. Uppercase, lowercase, numbers aur symbols mix karo. Password strength indicator ke saath. Apna account secure karo.",
  keywords: "password generator, strong password generator, secure password generator free, random password generator online",
};
export default function Page() { return <PwClient />; }

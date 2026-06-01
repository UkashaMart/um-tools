import type { Metadata } from "next";
import PwClient from "./PwClient";

export const metadata: Metadata = {
  title: "Strong Password Generator Online Free - Secure Credentials",
  description: "Free online strong password generator. Create secure, randomized passwords with customizable options including symbols, numbers, and case settings. Boost your account security instantly.",
  keywords: "password generator, strong password generator, secure password generator free, random password generator online, create strong password",
};

export default function Page() { 
  return <PwClient />; 
}
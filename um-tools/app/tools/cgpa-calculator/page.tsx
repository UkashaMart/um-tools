import type { Metadata } from "next";
import CGPAClient from "./CGPAClient";
export const metadata: Metadata = {
  title: "CGPA Calculator Pakistan - University GPA 4.0 Scale",
  description: "CGPA calculator Pakistani universities ke liye. FAST, NUST, LUMS, UBL, Bahria University 4.0 scale par CGPA calculate karo. Grade points aur credit hours.",
  keywords: "cgpa calculator pakistan, cgpa calculator fast university, cgpa calculator nust, university gpa calculator pakistan, cgpa 4.0 scale",
};
export default function Page() { return <CGPAClient />; }

import type { Metadata } from "next";
import CGPAClient from "./CGPAClient";

export const metadata: Metadata = {
  title: "CGPA Calculator Pakistan - University GPA 4.0 Scale Tool",
  description: "Free online CGPA calculator for Pakistani universities. Calculate your semester GPA and cumulative CGPA on a standard 4.0 scale for FAST, NUST, LUMS, HEC, and other institutions.",
  keywords: "cgpa calculator pakistan, cgpa calculator fast university, cgpa calculator nust, university gpa calculator pakistan, cgpa 4.0 scale, hec grading system",
};

export default function Page() { 
  return <CGPAClient />; 
}
import type { Metadata } from "next";
import GradeClient from "./GradeClient";

export const metadata: Metadata = {
  title: "Grade Calculator - GPA and Percentage Grade Calculator Free",
  description: "Calculate your grade, GPA and percentage online. Add subjects with weights and get instant results. Free grade calculator for students.",
  keywords: "grade calculator, GPA calculator, percentage grade calculator, weighted grade calculator, final grade calculator",
};

export default function Page() { return <GradeClient />; }

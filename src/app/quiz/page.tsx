import { QuizRunner } from "@/components/QuizRunner";

// Module 1's knowledge check keeps the original /quiz URL; other modules live at /quiz/[slug].
export default function Quiz() {
  return <QuizRunner slug="understanding-call-reluctance" />;
}

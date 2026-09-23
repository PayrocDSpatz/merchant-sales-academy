import { notFound } from "next/navigation";
import { QuizRunner } from "@/components/QuizRunner";
import { quizzes } from "@/data/quiz";

export default async function ModuleQuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!quizzes[slug]) notFound();
  return <QuizRunner slug={slug} />;
}

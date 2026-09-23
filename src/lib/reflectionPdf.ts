import type { jsPDF as JsPDF } from "jspdf";

// Builds the downloadable PDFs (reflection summary, knowledge-check results) as real PDF files (Letter,
// portrait) instead of relying on the browser's print dialog, whose margin,
// orientation and background-graphics settings made the output inconsistent
// between machines. The copyright footer is drawn at the same spot on every page.

export type ReflectionPdfInput = {
  thought: string;
  rewrite: string;
  verdictLabel: string;
  verdict: "strong" | "close" | "needs_work";
  coachSummary: string;
  tighterVersion: string | null;
  action: string;
  date: Date;
};

const GREEN: [number, number, number] = [22, 126, 59];
const LIME: [number, number, number] = [195, 221, 99];
const INK: [number, number, number] = [10, 11, 10];
const MUTED: [number, number, number] = [98, 103, 96];
const LINE: [number, number, number] = [201, 203, 193];
const TINT: [number, number, number] = [242, 246, 231];
const PILL: Record<ReflectionPdfInput["verdict"], { bg: [number, number, number]; fg: [number, number, number] }> = {
  strong: { bg: GREEN, fg: [255, 255, 255] },
  close: { bg: LIME, fg: INK },
  needs_work: { bg: [243, 217, 201], fg: [122, 46, 14] },
};

const MARGIN = 54;
const FOOTER_SPACE = 60;

// jsPDF's built-in fonts only cover WinAnsi, so swap the typographic
// characters the coach commonly writes for plain equivalents.
function clean(text: string) {
  return text
    .replace(/[—–]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .replace(/[^\x00-\xFF]/g, "")
    .trim();
}

export async function downloadReflectionPdf(input: ReflectionPdfInput) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter", orientation: "portrait" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const contentW = pageW - MARGIN * 2;
  const dateText = input.date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  drawHeader(doc, "REFLECTION COMPLETE", "Reframe the rejection", dateText);

  let y = 150;
  const ensureRoom = (needed: number) => {
    if (y + needed > pageH - FOOTER_SPACE) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const section = (label: string, text: string, pill?: ReflectionPdfInput["verdict"]) => {
    doc.setFont("helvetica", "normal").setFontSize(12);
    const lines = doc.splitTextToSize(clean(text), contentW) as string[];
    ensureRoom(40 + lines.length * 16);
    doc.setDrawColor(...LINE).setLineWidth(0.75).line(MARGIN, y, pageW - MARGIN, y);
    y += 22;
    doc.setFont("helvetica", "bold").setFontSize(8.5).setTextColor(...MUTED);
    doc.text(label, MARGIN, y, { charSpace: 1.2 });
    if (pill) drawPill(doc, input.verdictLabel, pill, MARGIN + doc.getTextWidth(label) + label.length * 1.2 + 10, y);
    y += 18;
    doc.setFont("helvetica", "normal").setFontSize(12).setTextColor(...INK);
    doc.text(lines, MARGIN, y, { lineHeightFactor: 1.35 });
    y += lines.length * 16 + 12;
  };

  section("THE THOUGHT", input.thought);
  section("YOUR FACTS-ONLY REWRITE", input.rewrite, input.verdict);

  if (input.coachSummary) {
    doc.setFont("helvetica", "normal").setFontSize(10);
    const lines = doc.splitTextToSize(`Coach: ${clean(input.coachSummary)}`, contentW) as string[];
    ensureRoom(lines.length * 14 + 10);
    y -= 4;
    doc.setTextColor(...MUTED).text(lines, MARGIN, y, { lineHeightFactor: 1.4 });
    y += lines.length * 14 + 14;
  }

  if (input.tighterVersion) section("COACH'S TIGHTER VERSION", input.tighterVersion);
  section("YOUR ACTION FOR THE NEXT CALL", input.action);

  // "Read this" callout
  doc.setFont("times", "normal").setFontSize(16);
  const actionLines = doc.splitTextToSize(clean(input.action), contentW - 44) as string[];
  const boxH = 50 + actionLines.length * 21;
  ensureRoom(boxH + 10);
  y += 6;
  doc.setFillColor(...TINT).rect(MARGIN, y, contentW, boxH, "F");
  doc.setFillColor(...LIME).rect(MARGIN, y, 5, boxH, "F");
  doc.setFont("helvetica", "bold").setFontSize(8.5).setTextColor(...GREEN);
  doc.text("BEFORE YOUR NEXT CALL BLOCK, READ THIS", MARGIN + 24, y + 24, { charSpace: 1.2 });
  doc.setFont("times", "normal").setFontSize(16).setTextColor(...INK);
  doc.text(actionLines, MARGIN + 24, y + 46, { lineHeightFactor: 1.3 });

  drawFooters(doc, input.date);

  const stamp = input.date.toISOString().slice(0, 10);
  doc.save(`Reflection - Reframe the Rejection - ${stamp}.pdf`);
}

function drawPill(doc: JsPDF, label: string, verdict: ReflectionPdfInput["verdict"], x: number, baseline: number) {
  const { bg, fg } = PILL[verdict];
  doc.setFont("helvetica", "bold").setFontSize(8);
  const w = doc.getTextWidth(label) + 16;
  doc.setFillColor(...bg).roundedRect(x, baseline - 10, w, 15, 7.5, 7.5, "F");
  doc.setTextColor(...fg).text(label, x + 8, baseline + 0.5);
}

function drawHeader(doc: JsPDF, kicker: string, title: string, dateText: string) {
  const pageW = doc.internal.pageSize.getWidth();
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, pageW, 118, "F");
  doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(...LIME);
  doc.text(kicker, MARGIN, 44, { charSpace: 1 });
  doc.setFont("times", "normal").setFontSize(24).setTextColor(255, 255, 255);
  doc.text(title, MARGIN, 76);
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(201, 219, 213);
  doc.text(`Merchant Sales Academy  |  ${dateText}`, MARGIN, 98);
}

// Copyright footer at the same position on every page.
function drawFooters(doc: JsPDF, date: Date) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  for (let i = 1; i <= doc.getNumberOfPages(); i++) {
    doc.setPage(i);
    doc.setDrawColor(...LINE).setLineWidth(0.75).line(MARGIN, pageH - 42, pageW - MARGIN, pageH - 42);
    doc.setFont("helvetica", "normal").setFontSize(8.5).setTextColor(...MUTED);
    doc.text(`© ${date.getFullYear()} Merchant Sales Academy. All rights reserved.`, pageW / 2, pageH - 26, { align: "center" });
  }
}

export type QuizResultsPdfInput = {
  moduleTitle: string;
  score: number;
  total: number;
  passed: boolean;
  passMark: number;
  items: { prompt: string; chosen: string; correct: string; isCorrect: boolean; explanation: string }[];
  date: Date;
};

export async function downloadQuizResultsPdf(input: QuizResultsPdfInput) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter", orientation: "portrait" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const contentW = pageW - MARGIN * 2;
  const dateText = input.date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  drawHeader(doc, "KNOWLEDGE CHECK RESULTS", clean(input.moduleTitle), dateText);

  let y = 150;
  const ensureRoom = (needed: number) => {
    if (y + needed > pageH - FOOTER_SPACE) {
      doc.addPage();
      y = MARGIN;
    }
  };

  // Score summary
  doc.setFont("times", "normal").setFontSize(34).setTextColor(...INK);
  doc.text(`${input.score} of ${input.total}`, MARGIN, y + 20);
  const scoreW = doc.getTextWidth(`${input.score} of ${input.total}`);
  drawPill(doc, input.passed ? "Passed" : "Not yet passed", input.passed ? "strong" : "needs_work", MARGIN + scoreW + 16, y + 12);
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...MUTED);
  doc.text(`Pass mark: ${input.passMark} of ${input.total} correct`, MARGIN, y + 42);
  y += 70;

  input.items.forEach((item, i) => {
    doc.setFont("helvetica", "bold").setFontSize(11.5);
    const promptLines = doc.splitTextToSize(clean(item.prompt), contentW) as string[];
    doc.setFont("helvetica", "normal").setFontSize(10.5);
    const chosenLines = doc.splitTextToSize(`Your answer: ${clean(item.chosen)}`, contentW - 14) as string[];
    const correctLines = item.isCorrect ? [] : (doc.splitTextToSize(`Correct answer: ${clean(item.correct)}`, contentW - 14) as string[]);
    doc.setFontSize(9.5);
    const whyLines = doc.splitTextToSize(clean(item.explanation), contentW) as string[];
    const blockH = 40 + promptLines.length * 15 + (chosenLines.length + correctLines.length) * 14 + whyLines.length * 13 + 18;
    ensureRoom(blockH);

    doc.setDrawColor(...LINE).setLineWidth(0.75).line(MARGIN, y, pageW - MARGIN, y);
    y += 22;
    doc.setFont("helvetica", "bold").setFontSize(8.5).setTextColor(...MUTED);
    doc.text(`QUESTION ${String(i + 1).padStart(2, "0")}`, MARGIN, y, { charSpace: 1.2 });
    drawPill(doc, item.isCorrect ? "Correct" : "Missed", item.isCorrect ? "strong" : "needs_work", MARGIN + 92, y);
    y += 18;
    doc.setFont("helvetica", "bold").setFontSize(11.5).setTextColor(...INK);
    doc.text(promptLines, MARGIN, y, { lineHeightFactor: 1.3 });
    y += promptLines.length * 15 + 6;

    doc.setFont("helvetica", "normal").setFontSize(10.5);
    const mark = item.isCorrect ? GREEN : ([163, 50, 11] as [number, number, number]);
    doc.setFillColor(...mark).rect(MARGIN, y - 9, 3, chosenLines.length * 14, "F");
    doc.setTextColor(...INK).text(chosenLines, MARGIN + 12, y, { lineHeightFactor: 1.3 });
    y += chosenLines.length * 14;
    if (correctLines.length) {
      y += 4;
      doc.setFillColor(...GREEN).rect(MARGIN, y - 9, 3, correctLines.length * 14, "F");
      doc.text(correctLines, MARGIN + 12, y, { lineHeightFactor: 1.3 });
      y += correctLines.length * 14;
    }
    y += 8;
    doc.setFontSize(9.5).setTextColor(...MUTED);
    doc.text(whyLines, MARGIN, y, { lineHeightFactor: 1.35 });
    y += whyLines.length * 13 + 16;
  });

  drawFooters(doc, input.date);
  const stamp = input.date.toISOString().slice(0, 10);
  doc.save(`Knowledge Check Results - ${clean(input.moduleTitle)} - ${stamp}.pdf`);
}

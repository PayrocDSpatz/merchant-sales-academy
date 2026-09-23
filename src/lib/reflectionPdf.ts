import type { jsPDF as JsPDF } from "jspdf";

// Builds the "Reframe the Rejection" summary as a real PDF file (Letter,
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
const LIME: [number, number, number] = [186, 255, 41];
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

  // Header band
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, pageW, 118, "F");
  doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(...LIME);
  doc.text("REFLECTION COMPLETE", MARGIN, 44, { charSpace: 1 });
  doc.setFont("times", "normal").setFontSize(24).setTextColor(255, 255, 255);
  doc.text("Reframe the rejection", MARGIN, 76);
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(201, 219, 213);
  doc.text(`Merchant Sales Academy  |  ${dateText}`, MARGIN, 98);

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

  // Footer, same position on every page
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...LINE).setLineWidth(0.75).line(MARGIN, pageH - 42, pageW - MARGIN, pageH - 42);
    doc.setFont("helvetica", "normal").setFontSize(8.5).setTextColor(...MUTED);
    doc.text(`© ${input.date.getFullYear()} Merchant Sales Academy. All rights reserved.`, pageW / 2, pageH - 26, { align: "center" });
  }

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

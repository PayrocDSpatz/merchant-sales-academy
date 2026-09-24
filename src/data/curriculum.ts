export type Lesson = { id: string; title: string; minutes: number; type: "lesson" | "exercise" | "quiz"; href?: string };

// Where a module item lives. Exercises and quizzes have their own routes
// (set via href); regular lessons live under the module's lesson route.
export function lessonHref(moduleSlug: string, lesson: Lesson) {
  return lesson.href ?? `/courses/${moduleSlug}/lessons/${lesson.id}`;
}

export type NavLink = { href: string; label: string; title: string };

// Previous/next for any item in a module (lesson, exercise or quiz), so every
// page in a module navigates the same way. The last item points to the next
// module's first item, or back to the catalog if that module isn't written yet.
export function moduleNeighbors(moduleSlug: string, itemId: string) {
  const mIdx = modules.findIndex((m) => m.slug === moduleSlug);
  const module = modules[mIdx];
  const index = module.lessons.findIndex((l) => l.id === itemId);
  const kind = (l: Lesson) => (l.type === "exercise" ? "Practice" : l.type === "quiz" ? "Knowledge check" : "Lesson");
  const link = (l: Lesson): NavLink => ({ href: lessonHref(moduleSlug, l), label: kind(l), title: l.title });

  const prevItem = module.lessons[index - 1];
  const prev: NavLink = prevItem ? link(prevItem) : { href: `/courses/${moduleSlug}`, label: "Module overview", title: module.title };

  let next: NavLink;
  const nextItem = module.lessons[index + 1];
  if (nextItem) {
    next = link(nextItem);
  } else {
    const nextModule = modules[mIdx + 1];
    next = nextModule && nextModule.lessons.length && nextModule.status !== "preview"
      ? { href: lessonHref(nextModule.slug, nextModule.lessons[0]), label: `Module ${nextModule.id}`, title: nextModule.title }
      : { href: "/courses", label: "All modules", title: "Back to the catalog" };
  }
  return { module, index, total: module.lessons.length, prev, next };
}
export type Module = { id: number; slug: string; title: string; description: string; lessons: Lesson[]; status: "active" | "locked" | "available" | "preview" };
// "preview": written but not released. Only managers can open it (see PreviewGate),
// and it doesn't count toward reps' completion until it's switched to "available".

export const modules: Module[] = [
  { id: 1, slug: "understanding-call-reluctance", title: "Understanding Call Reluctance", description: "Recognize what is holding you back and learn how to separate personal rejection from a business outcome.", status: "available", lessons: [
    { id: "why-we-hesitate", title: "Why We Hesitate", minutes: 2, type: "lesson" },
    { id: "fear-of-rejection", title: "Fear of Rejection", minutes: 2, type: "lesson" },
    { id: "sounding-inexperienced", title: "Fear of Sounding Inexperienced", minutes: 2, type: "lesson" },
    { id: "avoidance-loop", title: "The Avoidance Loop", minutes: 2, type: "lesson" },
    { id: "reframe", title: "Reframe the Rejection", minutes: 10, type: "exercise", href: "/practice" },
    { id: "knowledge-check", title: "Module Knowledge Check", minutes: 5, type: "quiz", href: "/quiz" },
  ]},
  { id: 2, slug: "preparing-to-make-calls", title: "Preparing to Make Calls", description: "Create a repeatable call block, realistic activity goals, and a pre-call routine that removes hesitation.", status: "available", lessons: [
    { id: "the-call-block", title: "Building Your Call Block", minutes: 3, type: "lesson" },
    { id: "setting-your-number", title: "Setting a Real Daily Target", minutes: 2, type: "lesson" },
    { id: "the-precall-routine", title: "A Pre-Call Routine That Removes Hesitation", minutes: 2, type: "lesson" },
    { id: "activity-vs-outcome", title: "Track Activity, Not Just Outcomes", minutes: 2, type: "lesson" },
    { id: "call-plan", title: "Build Your Call Plan", minutes: 10, type: "exercise", href: "/practice/call-plan" },
    { id: "knowledge-check", title: "Module Knowledge Check", minutes: 5, type: "quiz", href: "/quiz/preparing-to-make-calls" },
  ]},
  { id: 3, slug: "opening-the-conversation", title: "Opening the Conversation", description: "Earn the next 30 seconds without sounding scripted, vague, or apologetic.", status: "available", lessons: [
    { id: "the-first-ten-seconds", title: "The First Ten Seconds", minutes: 3, type: "lesson" },
    { id: "a-reason-about-them", title: "Give Them a Reason That’s About Them", minutes: 3, type: "lesson" },
    { id: "drop-the-apology", title: "Drop the Apology and the Script Voice", minutes: 3, type: "lesson" },
    { id: "ask-for-the-next-30-seconds", title: "Ask for the Next 30 Seconds", minutes: 3, type: "lesson" },
    { id: "opener", title: "Write Your Opener", minutes: 10, type: "exercise", href: "/practice/opener" },
    { id: "knowledge-check", title: "Module Knowledge Check", minutes: 5, type: "quiz", href: "/quiz/opening-the-conversation" },
  ] },
  { id: 4, slug: "earning-attention", title: "Earning the Merchant's Attention", description: "Lead with relevance across restaurants, retail, service businesses, e-commerce, and integrated payments.", status: "preview", lessons: [
    { id: "every-vertical-has-its-own-pain", title: "Every Vertical Has Its Own Pain", minutes: 3, type: "lesson" },
    { id: "speak-in-their-numbers", title: "Speak in Their Numbers", minutes: 3, type: "lesson" },
    { id: "lead-with-a-business-like-theirs", title: "Lead With a Business Like Theirs", minutes: 3, type: "lesson" },
    { id: "fit-the-software-they-run", title: "Integrated Payments: Fit the Software They Already Run", minutes: 3, type: "lesson" },
    { id: "pitch-card", title: "Build Your Vertical Pitch Card", minutes: 10, type: "exercise", href: "/practice/pitch-card" },
    { id: "knowledge-check", title: "Module Knowledge Check", minutes: 5, type: "quiz", href: "/quiz/earning-attention" },
  ] },
  { id: 5, slug: "discovery-questions", title: "Discovery That Creates Value", description: "Ask concise questions that reveal business impact instead of interrogating the merchant.", status: "locked", lessons: [] },
  { id: 6, slug: "handling-objections", title: "Handling Common Objections", description: "Stay composed through 'not interested,' 'we're happy,' 'send me information,' and price resistance.", status: "locked", lessons: [] },
  { id: 7, slug: "booking-appointments", title: "Booking Qualified Appointments", description: "Move from conversation to a clear, worthwhile next step with the right stakeholders.", status: "locked", lessons: [] },
  { id: 8, slug: "follow-up", title: "Follow-Up Without Chasing", description: "Build a professional follow-up cadence that adds value and keeps opportunities moving.", status: "locked", lessons: [] },
  { id: 9, slug: "activity-mindset", title: "Activity, Mindset & Consistency", description: "Use controllable behaviors and honest scorekeeping to create durable selling habits.", status: "locked", lessons: [] },
  { id: 10, slug: "gatekeepers", title: "Working With Gatekeepers", description: "Navigate access professionally and turn gatekeepers into allies.", status: "locked", lessons: [] },
  { id: 11, slug: "vertical-practice", title: "Vertical Call Labs", description: "Practice realistic conversations across key merchant-services verticals.", status: "locked", lessons: [] },
  { id: 12, slug: "certification", title: "Appointment-Setter Certification", description: "Demonstrate call readiness through a final scenario, quiz, and action plan.", status: "locked", lessons: [] },
];

// Module knowledge checks. Scenario-based on purpose: each question has
// distractors that sound reasonable, and some name a real concept from a
// different lesson, so the rep has to apply the idea rather than recognize
// a phrase from the lesson text.

export type QuizQuestion = {
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
  lesson: { id: string; title: string };
};

export const PASS_MARK = 4;

export const module1Quiz: QuizQuestion[] = [
  {
    prompt:
      "It's 9:00 a.m. and Maria has 40 cold leads. She spends 25 minutes researching the first merchant, tidies up her CRM, then calls a warm contact who's always friendly. She feels productive. What's actually going on, and what's the best fix?",
    choices: [
      "She's being thorough. Research lowers the risk of a bad call, so she should keep it but cap it at 30 minutes.",
      "Warming up with an easy contact builds momentum. Saving the coldest leads for the afternoon is the right order.",
      "Each substitute task gives her quick relief, and that relief reinforces the avoidance. She should time-box research to 5 minutes and dial before opening email or the CRM.",
      "It's a motivation problem. A bigger daily call target would create the urgency she's missing.",
    ],
    answer: 2,
    explanation:
      "Research past a short cap, CRM cleanup and 'safe' warm calls are classic substitutes, and the relief they bring is what trains the habit. The lesson's fix is a hard boundary: 5 minutes of research, dial before email or CRM, and the coldest leads first thing. Neither more motivation nor a bigger target breaks the loop.",
    lesson: { id: "avoidance-loop", title: "The Avoidance Loop" },
  },
  {
    prompt:
      "A merchant says \"Not interested\" and hangs up mid-sentence. According to the emotion-regulation research in the lessons, which response lowers the sting the most?",
    choices: [
      "Push the feeling down and dial the next number right away, before it can build.",
      "Tell yourself, \"That merchant didn't agree to a conversation today.\"",
      "Tell yourself, \"Doesn't matter, I'm going to crush the next one.\"",
      "Replay the call to find exactly what you did wrong before you dial again.",
    ],
    answer: 1,
    explanation:
      "James Gross's research shows cognitive reappraisal, describing the event accurately, reduces the brain's threat response more than suppressing the feeling (A). Forced positivity (C) is still a prediction, and replaying the call for fault (D) turns one business decision into a story about your ability.",
    lesson: { id: "fear-of-rejection", title: "Fear of Rejection" },
  },
  {
    prompt:
      "Devon made 10 calls: 6 went to voicemail, 3 were short but polite \"not right now\" conversations, and 1 owner was rude. He goes home convinced \"today was terrible.\" Which concept best explains his conclusion?",
    choices: [
      "The impostor phenomenon",
      "The testing effect",
      "Two-factor avoidance learning",
      "The negativity bias",
    ],
    answer: 3,
    explanation:
      "Baumeister's negativity bias: one negative event carries more psychological weight than several neutral or positive ones, so a 9-to-1 day feels like 'a bad day.' The impostor phenomenon is about feeling like a fraud, the testing effect is about recall, and two-factor learning explains why avoidance gets reinforced.",
    lesson: { id: "why-we-hesitate", title: "Why We Hesitate" },
  },
  {
    prompt:
      "Priya knows her pricing well, but when a merchant asks \"So what's your rate?\" she hesitates and hedges. Which preparation does the lesson say will help most?",
    choices: [
      "Re-read the pricing sheet before every call block so the numbers stay fresh.",
      "Say her answers to the 2-3 most common questions out loud before calling, and have one real number ready.",
      "Keep a detailed script on screen that covers every pricing scenario.",
      "Give it time. Confidence on rate questions comes naturally with more months in the role.",
    ],
    answer: 1,
    explanation:
      "The testing effect (Roediger and Karpicke) shows that retrieving and saying information out loud builds fluent recall. Silent re-reading doesn't. Her problem is rehearsal, not knowledge. A full script is a crutch, and tenure alone rarely fixes it: the impostor phenomenon shows up in strong performers too.",
    lesson: { id: "sounding-inexperienced", title: "Fear of Sounding Inexperienced" },
  },
  {
    prompt:
      "Your manager wants one way to judge whether today's call block went well, based on what you actually control. Which is the best measure?",
    choices: [
      "Dials made with your prepared opener, discovery questions asked and follow-ups logged.",
      "Number of merchants who said they were interested.",
      "Number of appointments booked.",
      "Getting through the block without a rude hang-up.",
    ],
    answer: 0,
    explanation:
      "You control preparation, dials, tone, questions, follow-up and reflection. Interest, appointments and a merchant's mood also depend on timing, current contracts and competing priorities, which you don't control. Outcomes still matter, but judging a single block by them punishes you for things outside your control.",
    lesson: { id: "fear-of-rejection", title: "Fear of Rejection" },
  },
];

export const module2Quiz: QuizQuestion[] = [
  {
    prompt:
      "Jordan dials for 90 minutes straight. His notes show the first 25 minutes of calls were sharp; after that his openers got shorter and he started skipping discovery questions. What best explains it, and what's the fix?",
    choices: [
      "Decision fatigue from choosing who to call next. He should move those dials into the midday block.",
      "The vigilance decrement: focus on a monotonous task drops within about 20-30 minutes. He should split the block into 25-minute sprints with a real 5-minute break between them.",
      "Low motivation. A higher daily dial target would keep him pushing through the whole block.",
      "He started with his hardest leads. Opening the block with a few easy callbacks would have kept his energy up.",
    ],
    answer: 1,
    explanation:
      "Mackworth's vigilance research shows attention on effortful, repetitive work reliably fades within 20-30 minutes. The break isn't a reward; it's what lets attention reset. Skipping it is how a 90-minute block turns into 40 minutes of real focus.",
    lesson: { id: "the-call-block", title: "Building Your Call Block" },
  },
  {
    prompt: "Which of these call days follows the lesson's three-block structure?",
    choices: [
      "AM: coldest, highest-friction leads. Midday: fresh prospects from a new list while energy is back after lunch. PM: second pass on AM no-answers.",
      "AM: coldest leads, with quick research and email between dials so nothing piles up. Midday: callbacks and follow-ups. PM: second pass on AM no-answers.",
      "AM: coldest, highest-friction leads. Midday: callbacks and follow-ups only. PM: second pass on AM no-answers.",
      "AM: warm callbacks to build confidence. Midday: coldest leads. PM: second pass on everyone who didn't answer.",
    ],
    answer: 2,
    explanation:
      "The midday block is for callbacks and follow-ups only, with no fresh prospecting, and nothing else happens inside a block: email and research belong before or after it. The coldest leads go first, while willpower is highest.",
    lesson: { id: "the-call-block", title: "Building Your Call Block" },
  },
  {
    prompt:
      "Sam's written target is 35 dials. By 10:30 his first 12 calls were all voicemails or brush-offs, so he lowers today's number to 20 \"to stay realistic.\" According to the lesson, what's the problem?",
    choices: [
      "There isn't one. Adjusting a goal to real conditions is good planning.",
      "He should have set an appointment target instead, since appointments are what really matter.",
      "Shrinking the number on a hard day is exactly how it stops meaning anything. Call 13 doesn't know about the first 12.",
      "He should take a longer break and then reset the target based on how he feels.",
    ],
    answer: 2,
    explanation:
      "A target set from the list, not the mood, only works if it's non-negotiable. Locke and Latham's research shows specific, committed goals drive effort; a number that shrinks when the morning is rough turns back into a 'do your best' goal.",
    lesson: { id: "setting-your-number", title: "Setting a Real Daily Target" },
  },
  {
    prompt:
      "Alex's pre-call routine changes every day. Some days she re-reads account notes, some days she writes a new opener, some days she skips it to save time. She says the variety keeps her fresh. Based on the parole-judge study in the lesson, what's wrong?",
    choices: [
      "Nothing. Varying the routine prevents the vigilance decrement.",
      "Her routine is too short. A proper routine should take at least 20 minutes of preparation.",
      "She should run her routine after the first few dials, once she's warmed up.",
      "Every change brings back decisions right before the dial, when capacity to decide is lowest. The value is in doing the same steps every time.",
    ],
    answer: 3,
    explanation:
      "The judges' favorable rulings fell as each session wore on because their capacity to weigh fresh decisions ran down. A routine works by removing decisions from the moment before a hard dial, and changing it daily recreates exactly those decisions. The vigilance decrement is about sustained attention, not routines.",
    lesson: { id: "the-precall-routine", title: "A Pre-Call Routine That Removes Hesitation" },
  },
  {
    prompt:
      "Three weeks into a new territory, Riley has 0 closed deals but has logged 140 dials, 22 conversations and 9 next steps. Morgan has 2 closed deals (from a warm list they inherited) but has logged 30 dials and no conversations. Who is better positioned for the coming weeks?",
    choices: [
      "Riley. Dials, conversations and next steps are leading indicators of future results; Morgan's deals reflect work done before the territory changed hands.",
      "Morgan. Closed deals are the only number that pays, so they're the best predictor.",
      "They're even. Riley has more activity but Morgan has more results, so it balances out.",
      "There's no way to tell until Riley closes a deal.",
    ],
    answer: 0,
    explanation:
      "Closed deals are lagging indicators: they reflect calls made weeks ago. Riley's logged activity predicts future results and is fully in Riley's control, which, per Deci and Ryan, also sustains motivation better. Morgan's numbers say little about the next month.",
    lesson: { id: "activity-vs-outcome", title: "Track Activity, Not Just Outcomes" },
  },
];

export const module3Quiz: QuizQuestion[] = [
  {
    prompt:
      "Jordan's opener: \"Hi, this is Jordan with Apex Payments, how are you doing today? Great. So Apex has been around for fifteen years and we work with over 4,000 merchants across the Southeast...\" Twenty seconds in, the owner says \"Not interested\" and hangs up. What went wrong?",
    choices: [
      "He didn't build enough rapport before getting to business. The small talk needed more time.",
      "Twenty seconds in, the owner still didn't know why Jordan was calling them. Everything before the reason was time spent deciding without it.",
      "He should have led with the 4,000 merchants. Social proof is the strongest way to open.",
      "He talked too slowly. Speeding up would have fit the whole pitch in before the owner lost interest.",
    ],
    answer: 1,
    explanation:
      "The merchant is silently asking: Who is this? Why are they calling me? Is this worth another thirty seconds? \"How are you today?\" signals a sales call, and a long company introduction delays the one thing that could earn a yes: a reason that's about them. Ambady and Rosenthal's thin-slice research shows those first impressions form fast and stick.",
    lesson: { id: "the-first-ten-seconds", title: "The First Ten Seconds" },
  },
  {
    prompt:
      "Dana finds that several Google reviews for a taqueria mention \"card reader down again, cash only tonight.\" Which reason for calling follows the lesson best?",
    choices: [
      "\"I saw your reviews say your card reader keeps going down, and that's costing you customers.\"",
      "\"We help restaurants lower their processing costs.\" Langer's study showed even an empty reason gets a yes 93% of the time, so any reason will do.",
      "\"I'm calling to see if you're happy with your current processor.\"",
      "\"I noticed a few reviews mention the card reader being down. Owners in that spot are often stuck on older equipment from their processor, and every outage turns into a cash-only night.\"",
    ],
    answer: 3,
    explanation:
      "The observation becomes a likely problem, said as something common rather than an accusation, so the merchant can confirm or correct it. Langer's copy-machine requests were tiny and low-stakes; a merchant on their fifth processing call this week is paying closer attention, so a generic reason gets filed with the others.",
    lesson: { id: "a-reason-about-them", title: "Give Them a Reason That’s About Them" },
  },
  {
    prompt:
      "Priya's opener has a strong reason and a good question, but merchants keep cutting her off. A recording shows she reads it word for word at an even pace, and her voice rises at the end of every sentence: \"It's Priya with BytePOS?\" What's the best fix?",
    choices: [
      "Write a longer, more detailed script so she never has to pause or search for words.",
      "Speed up so she reaches the question before the merchant has a chance to interrupt.",
      "Know the three parts well enough to say them in her own words, rehearse out loud, and let her voice come down at the end of her name and reason, saving the rise for the one real question.",
      "Soften the start with \"Sorry to catch you at a busy time\" so the merchant feels respected.",
    ],
    answer: 2,
    explanation:
      "Script voice is a delivery problem: an even pace and a rise at the end of every sentence tell the merchant you're reading, and the rise turns statements into requests for permission. The structure stays; the wording becomes hers through rehearsal. An apology would frame the call as an imposition.",
    lesson: { id: "drop-the-apology", title: "Drop the Apology and the Script Voice" },
  },
  {
    prompt:
      "Marcus is calling a pizzeria owner who just opened a second location. Which closing question fits the lesson best?",
    choices: [
      "\"Did you keep the same processor for both locations?\"",
      "\"Would you be interested in saving money on processing at both locations?\"",
      "\"Do you have a minute to talk about your payment setup?\"",
      "\"What are your biggest challenges with payments right now, and what would the ideal setup look like?\"",
    ],
    answer: 0,
    explanation:
      "A good closing question is specific, about their business, and answerable in about five words. The second is a pitch, the third invites a reflex no, and the fourth takes real thought to answer. Freedman and Fraser's foot-in-the-door research is why the opener aims small: one easy answer makes continuing the conversation the natural next step.",
    lesson: { id: "ask-for-the-next-30-seconds", title: "Ask for the Next 30 Seconds" },
  },
  {
    prompt:
      "After Leah's opener, the owner says: \"We're happy with what we have. We've been with the same processor for eight years and they've been fine.\" Leah writes the call down as a failed opener. Is she right?",
    choices: [
      "Yes. \"We're happy\" means the opener didn't create enough interest.",
      "Yes, but only because she should have asked \"Do you have a minute?\" first to get permission.",
      "No, but only because she can call back in six months when the contract may be up.",
      "No. The owner is talking about their business, which means the opener did its job. That's the handoff to the rest of the call.",
    ],
    answer: 3,
    explanation:
      "The opener's only job is to earn the next thirty seconds. It worked if the merchant is talking about their business, even to say they're happy. It only failed if the call ended before they said anything about their business at all. What happens next is the job of the rest of the call.",
    lesson: { id: "ask-for-the-next-30-seconds", title: "Ask for the Next 30 Seconds" },
  },
];

export type ModuleQuiz = {
  moduleNumber: number;
  moduleSlug: string;
  moduleTitle: string;
  questions: QuizQuestion[];
  next: { href: string; label: string };
};

export const quizzes: Record<string, ModuleQuiz> = {
  "understanding-call-reluctance": {
    moduleNumber: 1,
    moduleSlug: "understanding-call-reluctance",
    moduleTitle: "Understanding Call Reluctance",
    questions: module1Quiz,
    next: { href: "/courses/preparing-to-make-calls", label: "Continue to Module 2" },
  },
  "preparing-to-make-calls": {
    moduleNumber: 2,
    moduleSlug: "preparing-to-make-calls",
    moduleTitle: "Preparing to Make Calls",
    questions: module2Quiz,
    next: { href: "/courses/opening-the-conversation", label: "Continue to Module 3" },
  },
  "opening-the-conversation": {
    moduleNumber: 3,
    moduleSlug: "opening-the-conversation",
    moduleTitle: "Opening the Conversation",
    questions: module3Quiz,
    next: { href: "/courses", label: "Back to all modules" },
  },
};

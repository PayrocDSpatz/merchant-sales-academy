// Module 1 knowledge check. Scenario-based on purpose: each question has
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

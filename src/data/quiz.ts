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

export const module4Quiz: QuizQuestion[] = [
  {
    prompt:
      "Jess has a list of 30 restaurants and a free hour at 12:00 p.m. What does the lesson suggest?",
    choices: [
      "Call now. Owners are on site at lunch, so you're more likely to reach the decision-maker.",
      "Use the noon hour for something else and call the restaurants in the mid-afternoon lull, roughly 2 to 4 p.m. Calling mid-rush tells the owner you don't know their business.",
      "Call now, but keep each call under 30 seconds so you don't hold them up.",
      "It doesn't matter when you call. A good opener works at any time of day.",
    ],
    answer: 1,
    explanation:
      "Timing is part of relevance. A restaurant owner at 12:15 is in the middle of the rush, and the call itself signals you don't understand their day. Matching the call block to the vertical is the cheapest relevance you'll ever get.",
    lesson: { id: "every-vertical-has-its-own-pain", title: "Every Vertical Has Its Own Pain" },
  },
  {
    prompt:
      "Marco is about to call an HVAC contractor with three service vans. Which opening problem is most likely to be relevant?",
    choices: [
      "Splitting checks and tip adjustments at the end of a shift.",
      "Lower processing rates, since every business wants to save money.",
      "Getting paid on the job instead of chasing invoices after the techs leave.",
      "Inventory that doesn't match what actually sold at the register.",
    ],
    answer: 2,
    explanation:
      "Service businesses in the field usually struggle with getting paid on site, cards on file, and unpaid invoices. Split checks are a restaurant problem, inventory is retail, and lower rates are what every merchant has in common, which is exactly why they don't make anyone lean in.",
    lesson: { id: "every-vertical-has-its-own-pain", title: "Every Vertical Has Its Own Pain" },
  },
  {
    prompt:
      "Which line best follows \"Speak in Their Numbers\" on a first call with a café?",
    choices: [
      "\"We deliver best-in-class efficiency and significant savings across your entire payment stack.\"",
      "\"We'll cut your processing costs by 40%, guaranteed.\"",
      "\"Your average ticket, your monthly volume, your chargeback rate and your tip percentage all improve with us.\"",
      "\"Most cafés your size run around 1,500 to 2,000 transactions a month. Is that close for you?\"",
    ],
    answer: 3,
    explanation:
      "One concrete figure, in the unit the owner already tracks, as a range they can confirm. Hansen and Wänke found concrete wording is judged more likely to be true. The first line is abstract, the second promises savings before seeing a statement, and the third stacks four numbers into a pitch deck.",
    lesson: { id: "speak-in-their-numbers", title: "Speak in Their Numbers" },
  },
  {
    prompt:
      "Priya is calling a nail salon. Her team hasn't set up any salons yet, but she knows the towel study: the closer the comparison, the stronger the effect. What should she say?",
    choices: [
      "\"We just set up a nail salon a few blocks from you.\" It's close enough to true, and it's the strongest comparison.",
      "\"Salons that take bookings online usually tell us no-shows are what hurts most. Are you taking deposits when people book?\"",
      "\"We work with thousands of merchants just like you.\"",
      "Skip examples entirely. Social proof only works when you have a customer to name.",
    ],
    answer: 1,
    explanation:
      "The example only works because it's true; an invented customer is a lie that one follow-up question exposes. With no close match, describe the situation honestly and go back to a question. \"Thousands of merchants\" is the generic hotel sign from Goldstein, Cialdini and Griskevicius's study, the weakest version of the effect.",
    lesson: { id: "lead-with-a-business-like-theirs", title: "Lead With a Business Like Theirs" },
  },
  {
    prompt:
      "A salon owner mentions: \"My front desk types each total into the card machine, and I match the deposits to the booking report every Friday.\" What's the best next move?",
    choices: [
      "Repeat it back in her words and ask how long that takes each week.",
      "Tell her to replace her booking software with yours so everything is in one place.",
      "Promise that your payments will integrate with her booking system so the problem goes away.",
      "Move on to rates, since that's where the real savings are.",
    ],
    answer: 0,
    explanation:
      "Double entry is the clearest sign of an integration problem, and the time it costs is the business case, told in the owner's own words. \"Replace your system\" fights status quo bias (Samuelson and Zeckhauser), and you should never promise an integration you haven't confirmed.",
    lesson: { id: "fit-the-software-they-run", title: "Integrated Payments: Fit the Software They Already Run" },
  },
];

export const module5Quiz: QuizQuestion[] = [
  {
    prompt:
      "Dana gets past the opener with a boutique owner and asks: \"Who do you process with, how long have you been with them, and are you happy with them?\" The owner says \"Square, and it's fine.\" What went wrong?",
    choices: [
      "Nothing. The owner answered, and \"it's fine\" tells Dana there's no opportunity here.",
      "She asked too early. Discovery questions belong at the appointment, not on the cold call.",
      "She stacked three questions, so the owner picked the easiest parts and skipped the rest. One question with a bit of context in front of it would have earned a real answer.",
      "She should have asked about monthly volume first, since that decides whether the account is worth pursuing.",
    ],
    answer: 2,
    explanation:
      "A stacked question lets the merchant answer the easy part and skip the rest. Ask one question, put a short reason in front of it so it feels like it's about their business, then stop talking and let the pause work. Leading with volume is exactly the form-filling that makes discovery feel like an audit.",
    lesson: { id: "discovery-not-interrogation", title: "Discovery Is Not an Interrogation" },
  },
  {
    prompt:
      "Which of these is an impact question, in the sense the lesson uses?",
    choices: [
      "\"When a customer's card gets declined at the counter on a busy Saturday, what does that do to the line and the sale?\"",
      "\"What POS system are you running at the register?\"",
      "\"Wouldn't you agree most merchants your size are overpaying on processing?\"",
      "\"How many terminals do you have across your two locations?\"",
    ],
    answer: 0,
    explanation:
      "Impact questions ask what a problem costs in time, money or customers. The POS and terminal questions are setup questions, which Rackham's research found less successful sellers lean on (and which you can often answer from their website). The \"wouldn't you agree\" line is a pitch with a question mark on the end.",
    lesson: { id: "ask-about-impact", title: "Ask About Impact, Not Just Setup" },
  },
  {
    prompt:
      "A salon owner says: \"Honestly, the last processor was a nightmare. The fees were all over the place.\" What's the best next move?",
    choices: [
      "\"Got it. So how many chairs do you have?\" Keep the call moving through your list.",
      "\"That's exactly why salons switch to us. Our pricing is flat and simple.\"",
      "\"Totally understand. Can I send you some information about our rates?\"",
      "\"All over the place how? Different every month, or just higher than you expected?\"",
    ],
    answer: 3,
    explanation:
      "\"Honestly,\" \"nightmare\" and \"last processor\" are loaded words, and \"all over the place\" needs clarifying. A follow-up built from her own words shows you were listening, which Huang, Brooks and colleagues found is what makes people more likable. Jumping to the next question or straight to a pitch throws away the best material you'll get.",
    lesson: { id: "follow-the-answer", title: "Follow the Answer" },
  },
  {
    prompt:
      "Luis is on with a café owner who has said the delivery apps eat too much of her takeout margin. How should he find out who else is involved in a decision?",
    choices: [
      "\"Are you the decision-maker for payments here?\"",
      "\"Besides you, who else would want to weigh in on something like this?\"",
      "Don't ask. It can offend the owner, so find out at the appointment.",
      "\"Do you need anyone's permission before you can sign up?\"",
    ],
    answer: 1,
    explanation:
      "The lesson's phrasing gets the same information without sounding like you're checking whether she matters, and it helps get everyone who matters into the meeting instead of hearing \"I need to run it by my partner\" afterward. Skipping the question is how that happens.",
    lesson: { id: "what-the-appointment-needs", title: "Know What the Appointment Needs" },
  },
  {
    prompt:
      "Eight minutes in, a contractor has explained that invoices take three weeks to collect, that he and his wife make these decisions together, and that he can pull last month's statement. Sam still has six discovery questions on his list. What should he do?",
    choices: [
      "Work through the remaining six questions so the appointment is fully prepared.",
      "Give him a savings estimate now, based on what he's shared, to make the meeting feel worthwhile.",
      "Stop digging, play back the problem in the contractor's words, and book a time with both him and his wife, statement in hand.",
      "Send a proposal by email instead, since he's clearly interested.",
    ],
    answer: 2,
    explanation:
      "Sam has what the appointment needs: a problem in the merchant's words, who decides, and a statement. More questions risk talking him out of a meeting he's ready to take, and nobody can honestly estimate savings without seeing the statement. The rest of the discovery belongs in the meeting.",
    lesson: { id: "what-the-appointment-needs", title: "Know What the Appointment Needs" },
  },
];

export const module6Quiz: QuizQuestion[] = [
  {
    prompt:
      "Eight seconds into Tasha's call, a pizzeria owner says \"Not interested\" and starts to hang up. What's the best response?",
    choices: [
      "\"I totally get it, but I just need two minutes. We're saving pizzerias like yours thousands a year.\"",
      "\"That's fair, you weren't expecting my call. Before I let you go, when did someone last walk you through your processing statement?\"",
      "\"No problem, have a great day.\" Early objections are final, so move straight to the next dial.",
      "\"Can I ask why? Who do you process with, and when does your contract end?\"",
    ],
    answer: 1,
    explanation:
      "Early \"not interested\" is a reflex, not a verdict. Acknowledge what's true, give a reason, and ask one easy question about their business. Pleading for two minutes with a savings claim is pressure, hanging up gives away a call that hadn't really started, and a stack of questions turns it into an interrogation.",
    lesson: { id: "not-interested", title: "When They Say “Not Interested”" },
  },
  {
    prompt:
      "Ben asked his one question, and the owner said \"Really, I'm not interested\" a second time, politely but firmly. What now?",
    choices: [
      "Try a different angle, since most sales happen after the fifth objection.",
      "Ask for a quick meeting anyway. The worst they can say is no.",
      "Thank them, ask whether it's all right to check back in a few months, and end the call warmly.",
      "Offer a lower rate on the spot to give them a reason to stay on the line.",
    ],
    answer: 2,
    explanation:
      "Pushing past two clear no's rarely turns into an appointment and guarantees a cold reception next time. A warm exit with permission to check back keeps the door open. Offering a rate on the phone is the anchoring mistake from Lesson 4.",
    lesson: { id: "not-interested", title: "When They Say “Not Interested”" },
  },
  {
    prompt:
      "A boutique owner says, \"We're happy with who we have.\" Which response best follows the lesson?",
    choices: [
      "\"Good, that's what you want. No change needed, but if I looked at your last statement, I'd tell you honestly whether you're getting a fair deal. Would that be useful?\"",
      "\"Most people who say that are overpaying and just don't know it yet.\"",
      "\"Your processor is known for hidden fees. You might want to check.\"",
      "\"Okay. Can I send you our pricing sheet so you can compare?\"",
    ],
    answer: 0,
    explanation:
      "Switching feels like a loss, so \"happy\" is a reasonable answer. Agree, then offer a small check-up instead of a switch, the foot-in-the-door idea from Freedman and Fraser. Criticizing their processor or claiming they're overpaying without evidence makes them defend their choice, and a pricing sheet invites a rate comparison you can't make honestly without a statement.",
    lesson: { id: "were-happy", title: "“We’re Happy With Who We Have”" },
  },
  {
    prompt:
      "An auto shop owner says, \"Just send me some information.\" What should Carlos do?",
    choices: [
      "Agree, get the email address, and send the full company brochure right after the call.",
      "Say \"Happy to. So I send something useful, what matters most: what you're paying, how fast you get funded, or how it works with your shop software?\" Then suggest ten minutes later in the week to go over it.",
      "Push back: \"Information won't help you. What you need is a meeting.\"",
      "Tell him you'll send it, then call back tomorrow to ask if he read it.",
    ],
    answer: 1,
    explanation:
      "\"Send me something\" is often a polite exit. Agreeing and then narrowing it tells you which it is: a merchant who's interested will say what matters, and his answer is discovery. Attaching a short, specific next step keeps it moving. A generic brochure gets buried, and pushing back turns a polite request into an argument.",
    lesson: { id: "send-me-information", title: "“Just Send Me Some Information”" },
  },
  {
    prompt:
      "A café owner asks, \"So what's your rate?\" Why shouldn't Nina just answer with a number?",
    choices: [
      "Because quoting rates on the phone is against card-network rules.",
      "Because a higher number makes the product seem more premium.",
      "Because she should always wait for the merchant to name a number first so she can undercut it.",
      "Because what the café really pays depends on its card mix, how cards are taken and its pricing model, and whatever number she says becomes the anchor the owner judges everything against.",
    ],
    answer: 3,
    explanation:
      "The honest comparison is the effective rate (total fees divided by total volume) from a real statement. Tversky and Kahneman showed that even a number people know is random pulls their judgment, so a quoted rate sticks. Offer to work out what the owner really pays now, and ask what they pay today.",
    lesson: { id: "price-resistance", title: "“What’s Your Rate?” and Price Pushback" },
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
  "earning-attention": {
    moduleNumber: 4,
    moduleSlug: "earning-attention",
    moduleTitle: "Earning the Merchant's Attention",
    questions: module4Quiz,
    next: { href: "/courses/discovery-questions", label: "Continue to Module 5" },
  },
  "discovery-questions": {
    moduleNumber: 5,
    moduleSlug: "discovery-questions",
    moduleTitle: "Discovery That Creates Value",
    questions: module5Quiz,
    next: { href: "/courses/handling-objections", label: "Continue to Module 6" },
  },
  "handling-objections": {
    moduleNumber: 6,
    moduleSlug: "handling-objections",
    moduleTitle: "Handling Common Objections",
    questions: module6Quiz,
    next: { href: "/courses/booking-appointments", label: "Continue to Module 7" },
  },
};

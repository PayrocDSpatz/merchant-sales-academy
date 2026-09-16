# Merchant Sales Academy

A commercial cold-calling training platform for merchant-services salespeople. The first release focuses on overcoming call reluctance, building outbound consistency, handling merchant objections, and booking qualified appointments.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS plus a small design-token layer
- Firebase-ready Auth, Firestore, and Storage configuration
- Resend-ready server email client
- Vercel-compatible build

## Included routes

- `/` — commercial landing page
- `/signin` and `/register` — authentication layouts
- `/dashboard` — learner dashboard
- `/courses` — 12-module course catalog
- `/courses/understanding-call-reluctance` — complete Module 1 outline
- `/courses/understanding-call-reluctance/lessons/*` — lesson experience
- `/practice` — guided practice exercise
- `/quiz` — knowledge-check interface
- `/progress` — learner progress
- `/manager` — team manager dashboard

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and fill in Firebase, Resend, and OpenAI values. The current interface works without the services connected; authentication, persistence, and outbound email are the next integration milestone.

## Validation

```bash
npm run typecheck
npm run build
```

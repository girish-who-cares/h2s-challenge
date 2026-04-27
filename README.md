# ElectionPath — AI-Powered Election Guide

> **H2S Challenge Submission**
> A step-by-step, AI-assisted civic guide that helps confused voters navigate the US election process — built from scratch using AI-first development tooling (Stitch MCP, Gemini, Claude).

![ElectionPath](logo.png)

---

## Table of Contents

- [The Challenge](#the-challenge)
- [What I Built](#what-i-built)
- [My Thinking Process](#my-thinking-process)
- [How I Actually Built It — Step by Step](#how-i-actually-built-it--step-by-step)
  - [Phase 1: Problem Research & PRD](#phase-1-problem-research--prd)
  - [Phase 2: Design System via Stitch MCP](#phase-2-design-system-via-stitch-mcp)
  - [Phase 3: Design-to-Code with AI](#phase-3-design-to-code-with-ai)
  - [Phase 4: Tailwind v4 Integration Crisis](#phase-4-tailwind-v4-integration-crisis)
  - [Phase 5: Backend & Gemini API](#phase-5-backend--gemini-api)
  - [Phase 6: Hosting on Firebase](#phase-6-hosting-on-firebase)
- [Prompts I Used (The Exact Ones)](#prompts-i-used-the-exact-ones)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [How to Run Locally](#how-to-run-locally)
- [Project Structure](#project-structure)
- [Key Design Decisions](#key-design-decisions)
- [What I'd Do Differently / Next](#what-id-do-differently--next)

---

## The Challenge

The H2S challenge asked participants to build a meaningful web application that demonstrates proficiency with modern AI-powered development tools — specifically **Google's Stitch MCP** (for UI/UX design generation), **Gemini** (for the AI assistant layer), and AI-assisted coding workflows.

The constraint was clear: **use AI tooling at every stage** — from ideation to design to implementation to deployment — and document the process transparently.

---

## What I Built

**ElectionPath** is a single-page web application that guides first-time voters, new citizens, and lapsed voters through the complete US election process in 6 clear steps:

1. **Check Eligibility** — Confirm citizenship, residency, and age requirements
2. **Register to Vote** — File voter registration with your state
3. **Understand Your Ballot** — Research candidates and ballot measures
4. **Choose How to Vote** — In-person, early voting, or mail-in
5. **Cast Your Vote** — Submit your ballot on Election Day
6. **Track Your Vote & Results** — Verify your vote was counted

The app features:
- 🗳️ **Election Cards** — Browse upcoming elections (federal, state, local) and select one to get a personalized path
- 📋 **Interactive Timeline** — A 6-step sequential journey with checklists, document lists, and official links
- 🤖 **AI Chat Assistant** — A Gemini-powered assistant (via FastAPI backend) that answers voting questions in plain English, scoped strictly to election process — zero political opinions
- ✅ **Progressive Unlocking** — Steps unlock sequentially; each requires completing a checklist before moving on
- 📊 **Progress Tracking** — Visual progress bar showing completion percentage
- 🔗 **State-Specific Data** — Registration deadlines and official portal links for all 50 states + DC

---

## My Thinking Process

My approach was **problem-first, not tool-first**. Here's how I was thinking at each stage:

### Why Elections?

I wanted a topic where:
- The **information problem is real** — election info is genuinely fragmented across dozens of government sites
- **AI assistance adds genuine value** — users don't know what to ask, and jargon is a huge barrier
- **Strict neutrality is a design constraint** — the AI can never give political opinions, which is a meaningful guardrail to implement
- **The emotional stakes are high** — people are genuinely anxious about voting wrong, which makes UX quality critical

### The Core Insight

Most voter education tools are either:
- Government websites (formal, intimidating, text-heavy) — users bounce
- News sites (biased, overwhelming, opinion-heavy) — users don't trust

Nobody had combined a **structured step-by-step path** with a **conversational AI that answers follow-up questions in plain language**. That was the gap.

### Design Philosophy

I deliberately aimed for a **premium SaaS aesthetic**, NOT a government-website feel. The reference I used was **glow.team** — clean whites, generous padding, soft shadows, and one confident primary color. The idea was: if the site *looks* trustworthy and modern, anxious first-time voters will *feel* more confident using it.

---

## How I Actually Built It — Step by Step

### Phase 1: Problem Research & PRD

**What I did:** Before writing a single line of code, I wrote a comprehensive Product Requirements Document (PRD) and a full Design Document.

**The PRD** ([PRD.md](PRD.md)) covers:
- Problem statement (fragmentation, jargon, anxiety)
- User personas (first-time voter, new citizen, lapsed voter)
- Feature requirements with priority levels (P0/P1/P2)
- Gemini Gem configuration — exact system prompt, knowledge scope, hard boundaries
- User flows (primary, secondary, recovery)
- Launch checklist

**The Design Document** ([design.md](design.md)) is a 1000+ line design specification covering:
- Global design system (colors, typography, spacing, shadows, border radii)
- Complete screen specifications for all 6 surfaces
- Interaction & animation timing specs
- Responsive breakpoints

**My thinking:** I front-loaded the planning because I knew the AI tools would be much more effective with a clear, detailed brief. A vague prompt produces vague output. A structured PRD produces structured code.

---

### Phase 2: Design System via Stitch MCP

**What I did:** Used Google's **Stitch MCP** tool to generate UI prototypes directly from my design specs.

**How it worked:**
1. Created a Stitch project (project ID: `16329239874792142161`)
2. Generated screens from text prompts describing the landing page, onboarding, and timeline views
3. Stitch produced complete HTML prototypes with embedded Tailwind CSS configurations, color tokens, and responsive layouts
4. Extracted the design system tokens (colors, fonts, spacing) directly from the Stitch output

**The Stitch outputs** are preserved as:
- [`landing.html`](landing.html) — The onboarding/landing page prototype
- [`timeline.html`](timeline.html) — The 6-step timeline prototype

These HTML files contain the exact Tailwind config that Stitch generated, including:
- Color system: `primary: #4F6DFF`, surfaces, urgency colors
- Typography: `Plus Jakarta Sans` for headlines, `Manrope` for body text
- Material Symbols icon system
- Custom shadows and spacing scale

**Key prompt I used with Stitch:**
> *"look into landing page design from @mcp:StitchMCP: project id 16329239874792142161"*

**My thinking:** Using Stitch MCP let me bypass the traditional "designer → developer handoff" bottleneck. Instead of sketching in Figma and then manually translating to CSS, I got production-ready HTML + Tailwind tokens directly from AI — which I could then map 1:1 into my React components.

---

### Phase 3: Design-to-Code with AI

**What I did:** Built the React frontend by translating the Stitch HTML prototypes into a component-based React application.

The AI coding assistant helped me:
1. **Extract the Tailwind config** from Stitch's inline `<script>` tags into a proper `tailwind.config.js`
2. **Build React components** that match the exact DOM structure, classes, and interactive states from the prototypes
3. **Add application logic** — sequential step locking, checkbox requirements, progress tracking

**Component architecture:**
```
App.jsx
├── ElectionCards (home screen with election card grid)
├── Timeline (core 6-step journey)
│   ├── TimelineStep (expandable step cards)
│   │   └── TodoItem (interactive checklists)
│   └── ChatWidget (AI assistant panel)
└── AppHeader (shared navigation)
```

**Key prompts I used:**
> *"build a website and assistant"* — initial scaffolding prompt

> *"Completely rewrite the React rendering tree to map to the structures in landing.html and timeline.html"* — design-to-code migration

> *"Redesign ElectionPath to match Stitch MCP"* — when the first pass didn't visually match the prototypes

**My thinking:** Rather than building from scratch and hoping it looked good, I treated the Stitch prototypes as the **source of truth** and reverse-engineered my React components to match them class-by-class. This gave me pixel-accurate implementation without manual CSS tweaking.

---

### Phase 4: Tailwind v4 Integration Crisis

**What happened:** This was the biggest technical challenge. Tailwind CSS v4 has a completely different configuration model compared to v3, and the migration broke the build.

**The problem:**
- Stitch generated Tailwind v3-style configs
- My project installed Tailwind v4 (latest)
- v4 uses `@import "tailwindcss"` instead of `@tailwind base/components/utilities`
- v4 requires `@tailwindcss/postcss` or `@tailwindcss/vite` plugin instead of using `tailwindcss` directly as a PostCSS plugin
- CSS wasn't loading at all — the entire app rendered unstyled

**How I fixed it (with AI assistance):**

1. Installed the v4 adapter: `npm i -D @tailwindcss/postcss @tailwindcss/vite`
2. Updated `index.css` to use the v4 import syntax:
   ```css
   @import "tailwindcss";
   @config "../tailwind.config.js";
   ```
3. Updated `vite.config.js` to use the Tailwind Vite plugin directly (eliminating the PostCSS intermediary)
4. Removed the now-unnecessary `postcss.config.js`

**The prompt that triggered this fix:**
> *"solve the issue"* (pointing at index.css line 1)
>
> *"is css even loading?"* (after seeing unstyled output)

**My thinking:** This was a classic "stack version mismatch" issue. The AI tools generated v3-era Tailwind configs, but npm installed v4. The fix required understanding the v3→v4 migration path, which the AI assistant navigated cleanly once I pointed it at the error.

---

### Phase 5: Backend & Gemini API

**What I did:** Built a minimal FastAPI backend that proxies chat messages to Google's Gemini API with a carefully crafted system prompt.

**Backend architecture** ([backend/main.py](backend/main.py)):
- **Framework:** FastAPI with CORS middleware (open for local MVP)
- **AI Model:** `gemini-1.5-flash` via `google-generativeai` Python SDK
- **System Prompt:** Strict persona definition — calm, neutral civic volunteer tone; hard boundaries against political opinions, candidate recommendations, and policy debate
- **Context Passing:** Each chat request includes the user's state, election timing, and current step — so the AI can give contextual, personalized answers
- **Graceful Fallback:** If the Gemini API key isn't configured, the backend returns a mock response so the frontend still works

**The system prompt:**
```
You are ElectionPath Assistant — a helpful, neutral guide for anyone
navigating the US election process.

Your role: Answer questions about voter eligibility, registration,
ballots, voting methods, Election Day logistics, and how votes are
counted — in plain, friendly English.

Your limits:
- You never recommend or comment on candidates, parties, or policies.
- If asked for a political opinion, say: "I'm only here to help with
  the voting process."
- If asked about anything outside elections: "I can only help with
  election and voting questions."

Tone: Calm, clear, friendly — like a knowledgeable civic volunteer.
Length: Keep responses short and conversational. Use bullet points.
Reading level: Plain English. Simple words. Short sentences.
```

**Frontend chat integration:**
- The `ChatWidget` component in the frontend sends messages to `POST /api/chat`
- If the backend is unreachable, it falls back to mock responses (so the UI demo always works)
- Typing indicator with animated dots during API calls
- Step-contextual opening messages when triggered from a timeline step

**My thinking:** I chose FastAPI because it's the fastest way to get a Python API running, and the `google-generativeai` SDK is first-class Python. The mock fallback was critical — I wanted the demo to work even without an API key configured.

---

### Phase 6: Hosting on Firebase

**What I did:** Deployed the frontend to Firebase Hosting for the live demo.

**Setup:**
- Firebase project: `h2s-challenge-girish`
- Build output: `dist/` directory from `vite build`
- SPA rewrite rule: all routes → `index.html`
- Config: [`firebase.json`](frontend/firebase.json)

**Commands used:**
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

**My thinking:** Firebase Hosting is free-tier, fast, and handles SPA routing out of the box. No need to overcomplicate deployment for an MVP.

---

## Prompts I Used (The Exact Ones)

Here's a chronological record of the key prompts I gave to AI tools throughout development:

### Stitch MCP (Design Generation)
| # | Prompt | What it did |
|---|--------|-------------|
| 1 | *"look into landing page design from @mcp:StitchMCP: project id 16329239874792142161"* | Pulled the generated UI prototype from Stitch and analyzed its design tokens |

### AI Coding Assistant (Implementation)
| # | Prompt | What it did |
|---|--------|-------------|
| 1 | *"build a website and assistant"* | Initial project scaffolding — Vite + React setup, basic component structure |
| 2 | *"Redesign ElectionPath to match Stitch MCP"* | Complete UI overhaul — replaced custom CSS with Tailwind, rebuilt DOM to match Stitch prototypes |
| 3 | *"solve the issue" (pointing at index.css)* | Fixed the Tailwind v3→v4 migration issue (PostCSS plugin change) |
| 4 | *"is css even loading?"* | Triggered deeper investigation — led to switching from PostCSS to the Vite plugin |
| 5 | *"lets launch to see how my application looks right now"* | Started dev server + browser preview for visual QA |
| 6 | *"Completely rewrite the React rendering tree to map to the structures in landing.html and timeline.html"* | Structural alignment of React JSX with Stitch-generated HTML |
| 7 | *"Separating landing page from dashboard"* | Decoupled the marketing landing page from the app's core timeline interface |

### The Meta-Prompt (This README)
| # | Prompt | What it did |
|---|--------|-------------|
| 1 | *"add a read.me file which captures everything on what i did and how i did, maybe even the prompts that i used and how my exact thinking was"* | Generated this comprehensive documentation |

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend Framework** | React 19 + Vite 8 | Fast HMR, modern JSX, minimal config |
| **Styling** | Tailwind CSS v4 | Design tokens from Stitch MCP map directly to Tailwind classes |
| **Typography** | Plus Jakarta Sans + Manrope (Google Fonts) | Clean, modern, rounded — matches the friendly civic tone |
| **Icons** | Material Symbols (Outlined, variable weight) | Consistent icon system, supports fill/weight variations |
| **Backend** | FastAPI (Python) | Fastest way to proxy Gemini API calls with structured context |
| **AI Model** | Google Gemini 1.5 Flash | Fast, capable, good at following system prompts for tone control |
| **Design Tool** | Stitch MCP | AI-generated UI prototypes with exportable Tailwind configs |
| **Hosting** | Firebase Hosting | Free tier, SPA support, instant deploys |
| **Testing** | Playwright | E2E tests for sequential step progression and checkbox logic |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                      │
│                                                          │
│  ┌────────────────────┐    ┌─────────────────────────┐  │
│  │   Election Cards    │    │     Timeline Journey     │  │
│  │   (Home Screen)     │───▶│   6-step progress path   │  │
│  │                     │    │   with checklists         │  │
│  └────────────────────┘    └──────────┬──────────────┘  │
│                                        │                 │
│                              ┌─────────▼─────────┐      │
│                              │   ChatWidget       │      │
│                              │   (AI Assistant)   │      │
│                              └─────────┬─────────┘      │
└────────────────────────────────────────┼────────────────┘
                                         │ POST /api/chat
                                         ▼
                              ┌─────────────────────┐
                              │   FastAPI Backend    │
                              │                     │
                              │  System Prompt +    │
                              │  User Context       │
                              │  (state, timing,    │
                              │   current step)     │
                              └─────────┬───────────┘
                                        │
                                        ▼
                              ┌─────────────────────┐
                              │  Google Gemini API   │
                              │  (gemini-1.5-flash)  │
                              └─────────────────────┘
```

**Data flow:**
1. User lands on Election Cards screen → selects an election
2. Timeline loads with 6 steps, each containing checklists
3. Steps unlock sequentially (Step N+1 unlocks only after Step N is marked done)
4. Each step's checklist must be fully checked before the "Mark as Done" button activates
5. "Ask AI" button opens the ChatWidget with step-specific context
6. Chat messages are sent to the FastAPI backend → Gemini API → response displayed

**State data** (all 50 states + DC) is stored as a static JSON object in [`data.js`](frontend/src/data.js) — no database needed for MVP.

---

## How to Run Locally

### Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

### Backend (for live AI chat)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Set your Gemini API key
export GEMINI_API_KEY="your-key-here"

uvicorn main:app --reload --port 8000
```

> **Note:** The frontend works without the backend — it falls back to mock AI responses if the API is unreachable.

---

## Project Structure

```
h2s challenge/
├── README.md                 ← You are here
├── PRD.md                    ← Product Requirements Document
├── design.md                 ← Complete Design Specification (1000+ lines)
├── landing.html              ← Stitch MCP-generated landing page prototype
├── timeline.html             ← Stitch MCP-generated timeline prototype
├── logo.png                  ← ElectionPath logo
│
├── frontend/                 ← React + Vite application
│   ├── index.html            ← Entry HTML with Google Fonts imports
│   ├── package.json          ← Dependencies (React 19, Tailwind v4, Playwright)
│   ├── tailwind.config.js    ← Design tokens extracted from Stitch MCP
│   ├── vite.config.js        ← Vite config with Tailwind plugin
│   ├── firebase.json         ← Firebase Hosting configuration
│   ├── .firebaserc           ← Firebase project: h2s-challenge-girish
│   ├── src/
│   │   ├── main.jsx          ← React entry point
│   │   ├── App.jsx           ← Root component (ElectionCards ↔ Timeline routing)
│   │   ├── App.css           ← Minimal overrides
│   │   ├── index.css         ← Tailwind imports + timeline axis styling
│   │   ├── data.js           ← Static data: 50 states, 6 steps, elections
│   │   └── components/
│   │       ├── TimelineStep.jsx  ← Expandable step card with checklist
│   │       └── ChatWidget.jsx    ← Floating AI assistant panel
│   └── tests/                ← Playwright E2E tests
│
└── backend/                  ← FastAPI + Gemini API
    ├── main.py               ← API server with system prompt
    └── requirements.txt      ← Python dependencies
```

---

## Key Design Decisions

### 1. Sequential Locking (Not Free Navigation)
Steps unlock one at a time. You can't skip to "Cast Your Vote" without first confirming eligibility and registration. This prevents users from missing critical prerequisites.

### 2. Checklist-Gated Progression
Each step has 2-3 actionable checklist items. The "Mark as Done" button is disabled until all items are checked. This ensures users actually *do* the work, not just click through.

### 3. AI as a Side-Panel, Not the Hero
Despite the PRD saying "AI is the primary product," in the implementation I made the structured timeline the central UI and the AI assistant a supporting panel. Users with high anxiety need *structure first*, then depth through conversation.

### 4. Mock Fallback for the AI
The frontend includes hardcoded mock responses so the demo always works, even without a running backend or Gemini API key. This was critical for the submission — reviewers shouldn't need to configure API keys.

### 5. Tailwind over Custom CSS
Stitch MCP generates Tailwind-based designs. Fighting that by translating to vanilla CSS would have been a waste. Embracing Tailwind v4 (despite the migration pain) meant my components stayed 1:1 with the design prototypes.

### 6. No Login, No Persistence
The PRD explicitly excludes user accounts. Everything is session-only. This reduces friction to zero — a user can go from "I don't know how to vote" to "I have a plan" in one sitting.

---

## What I'd Do Differently / Next

| What | Why |
|------|-----|
| **Add the landing page** | The current app jumps straight to Election Cards. The full landing page (hero, "how it works", Gemini callout) from the design doc would improve first impressions. |
| **State selection in onboarding** | The 2-question onboarding flow (timing + state) from the PRD isn't fully implemented yet. Adding it would personalize deadlines. |
| **Real election data** | Currently using placeholder election entries. Connecting to a real civic data API would make it genuinely useful. |
| **Completion celebration** | When all 6 steps are done, show the warm "You're ready to vote" completion screen from the design spec. |
| **Dark mode** | The design system supports it (Tailwind `darkMode: "class"`), but it's not togglable in the current UI. |
| **Mobile bottom nav** | The Stitch prototypes include a mobile bottom navigation bar. Not yet implemented in React. |

---

## Credits & Tools Used

- **[Google Stitch MCP](https://stitch.withgoogle.com/)** — AI-powered UI/UX design generation
- **[Google Gemini](https://ai.google.dev/)** — AI model powering the election assistant
- **[Antigravity (Claude)](https://www.anthropic.com/)** — AI coding assistant used throughout development
- **[Vite](https://vite.dev/)** — Frontend build tool
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Firebase Hosting](https://firebase.google.com/)** — Deployment platform
- **[FastAPI](https://fastapi.tiangolo.com/)** — Python API framework

---

*Built for the H2S Challenge, April 2026. Every line of this project was shaped by AI-assisted workflows — from ideation to deployment.*

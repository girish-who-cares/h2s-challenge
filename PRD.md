# PRD — ElectionPath
### Product Requirements Document
**Version:** 1.0
**Status:** Ready for Review
**Product:** ElectionPath — AI-Powered Election Guide
**Last Updated:** April 2026

---

## 1. OVERVIEW

### 1.1 Product Summary

ElectionPath is a web-based, single-page election guide that helps users navigate the complete voting process — from checking eligibility to tracking their counted vote. The product is built around a **Gemini Gem AI assistant** embedded directly in the website, serving as the primary interaction layer. The static timeline and step guide support the assistant and give users structure when they don't know what to ask.

### 1.2 The Core Shift This PRD Introduces

Previous thinking placed the interactive timeline as the *hero* and AI Q&A as a secondary helper.

**This PRD reverses that:**

> The **Gemini Gem assistant is the primary product.** The timeline and step cards are supporting scaffolding — they orient the user and give the assistant context to work with.

### 1.3 One-Line Product Definition

> A knowledgeable, friendly AI assistant that answers any election question — scoped strictly to voting, process, and civic participation — embedded in a guided web tool that keeps users on track.

---

## 2. PROBLEM STATEMENT

Users — especially first-time voters, new citizens, and lapsed voters — face three core problems:

- **Fragmentation:** Election info is scattered across government sites, social media, and news — none of it personalized
- **Jargon:** Terms like "absentee ballot," "precinct," "down-ballot," and "provisional vote" are never explained in context
- **Anxiety:** The dominant emotion is fear of doing something wrong or missing a deadline

No existing product combines a structured, step-by-step election journey *with* a conversational AI that can answer follow-up questions in plain language — without venturing into political opinion.

---

## 3. GOALS & SUCCESS METRICS

### Product Goals

| Goal | Description |
|---|---|
| Reduce confusion | User understands their next action within 60 seconds of landing |
| Drive completion | User progresses through all 6 steps of their election journey |
| Build trust | User trusts the assistant enough to ask follow-up questions |
| Stay neutral | Zero political opinions — process-only, always |

### Success Metrics (MVP)

| Metric | Target |
|---|---|
| % users who interact with the Gem assistant | > 60% of all sessions |
| % users who complete all 6 timeline steps | > 40% |
| Avg. questions asked per session | 2–4 |
| Bounce rate on landing | < 35% |
| Out-of-scope deflections by assistant | 100% (no political opinions ever given) |

---

## 4. USER PERSONAS

### Persona 1 — The First-Time Voter
- **Age:** 18–25
- **State of mind:** Wants to vote, feels overwhelmed, doesn't know where to start
- **Key question:** "Am I registered? What do I actually do on Election Day?"
- **How they'll use the Gem:** Ask basic procedural questions. "What's a polling place?" "Do I need ID?"

### Persona 2 — The New Citizen
- **Age:** 28–50
- **State of mind:** Motivated and civic-minded, unfamiliar with US-specific process
- **Key question:** "How is this different from voting in my home country? What are the rules?"
- **How they'll use the Gem:** Comparative questions, clarification of US-specific terms, reassurance

### Persona 3 — The Lapsed Voter
- **Age:** 30–55
- **State of mind:** Has voted before, moved or lost track, needs a refresh
- **Key question:** "Am I still registered? Do I need to re-register at my new address?"
- **How they'll use the Gem:** Quick targeted questions about registration status, mail-in voting

---

## 5. PRODUCT ARCHITECTURE

### 5.1 High-Level Structure

The product has two layers that work together:

```
┌─────────────────────────────────────────────────┐
│                  WEBSITE (Frontend)              │
│                                                  │
│   ┌─────────────────┐   ┌─────────────────────┐ │
│   │  GUIDED TIMELINE │   │   GEMINI GEM PANEL  │ │
│   │  (Structure)     │   │   (Conversation)    │ │
│   │                  │   │                     │ │
│   │  6-step journey  │◄──►  AI assistant scoped│ │
│   │  Deadlines       │   │  to election topics │ │
│   │  State context   │   │  only               │ │
│   └─────────────────┘   └─────────────────────┘ │
└─────────────────────────────────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │    GEMINI GEM         │
            │  (Hosted on Google)   │
            │                       │
            │  Knowledge: Election  │
            │  process, timelines,  │
            │  voting rules, civics │
            │                       │
            │  Guardrails: No party │
            │  opinions, no         │
            │  candidate views,     │
            │  no policy debate     │
            └───────────────────────┘
```

### 5.2 How the Two Layers Interact

- The timeline gives users **structure** — they know where they are in the process
- The Gem gives users **depth** — they can go as deep as they want on any topic
- When a user expands a timeline step (e.g., "Register to Vote"), the Gem panel pre-loads a **context prompt** — so the assistant already knows which step the user is looking at
- The user can also open the Gem independently and ask anything election-related from scratch

---

## 6. FEATURE REQUIREMENTS

### 6.1 Feature Priority Legend
- **P0** — Must have at launch. Product doesn't work without it.
- **P1** — High value, build in first sprint after P0.
- **P2** — Nice to have, post-MVP.

---

### 6.2 Feature List

#### F1 — Gemini Gem Assistant Panel `P0`

**What it is:** The embedded AI assistant — the core of the product.

**Requirements:**
- Embedded on the website via Gemini Gem link/iframe or web component
- Visible at all times (persistent panel or always-accessible button)
- Scoped strictly to election process knowledge (see Section 7 — Gem Configuration)
- Responds in plain language — no jargon unless the user asked about the jargon term specifically
- Handles follow-up questions within the same conversation thread
- Does NOT give opinions on candidates, parties, or policies
- When asked out-of-scope questions, deflects gracefully: *"I'm only able to help with election process questions. For that, I'd recommend [source]."*
- Mobile-friendly input and response display

**Gem Entry Points:**
- Floating "Ask a Question" button (always visible)
- "Still confused?" prompt within each expanded step card
- Pre-loaded context when triggered from a specific step (e.g., opens with "You're on Step 2 — Voter Registration. What would you like to know?")

---

#### F2 — Onboarding Context Setter `P0`

**What it is:** 2-question intake before the timeline loads.

**Requirements:**
- Question 1: "When is your election?" → Tile-button options: "A few months away" / "A few weeks away" / "Very soon (days)" / "It already happened"
- Question 2: "Which state are you in?" → Searchable dropdown with all 50 states + DC
- No other content shown until both questions are answered
- Answers stored in session (not persisted) to personalize the timeline
- User can change answers later via an "Edit" option

---

#### F3 — Interactive 6-Step Election Timeline `P0`

**What it is:** The structural backbone. A vertical, personalized journey of 6 steps.

**Steps:**
1. Check Eligibility
2. Register to Vote
3. Understand Your Ballot
4. Choose How to Vote (In-Person / Early / Mail-In)
5. Cast Your Vote
6. Track Your Vote & Results

**Requirements per step card:**
- Title + icon
- Status badge: Upcoming / Action Needed / Completed / Missed
- Deadline displayed prominently — color-coded by urgency
- Collapsed by default; expands on tap/click
- Expanded state shows: 3–4 plain-language bullet points + one official action link (external)
- Expanded state also shows "Ask the assistant about this step →" trigger (opens Gem with step context)
- "Mark as Done" button — moves step to Completed state

---

#### F4 — Deadline Urgency System `P0`

**What it is:** Visual and logical system that surfaces deadline urgency based on the user's stated election timing.

**Requirements:**
- Deadline badges update based on onboarding answer ("A few weeks away" → registration badge turns yellow)
- Color coding: Green (comfortable time) → Yellow (1–2 weeks) → Red (days away) → Grey (missed)
- Missed deadlines are shown with a soft, non-shameful message: *"This deadline has passed — here's what you can still do."*
- Gem assistant should be aware of the user's timing context when answering questions

---

#### F5 — Progress Tracker `P1`

**What it is:** A visual indicator of how far through the journey the user is.

**Requirements:**
- Shown at top of timeline
- "X of 6 steps completed"
- Progress bar or step-dot visual
- Updates in real time as user marks steps done
- At 6/6: triggers completion state (see F7)

---

#### F6 — State-Specific Content Layer `P1`

**What it is:** Each step's content adjusts based on the user's selected state.

**Requirements:**
- Registration deadlines vary by state — show the correct one
- Action links are state-specific (e.g., link to that state's official registration portal)
- The Gem assistant should also be aware of the user's state when answering questions (passed as context)
- MVP can cover all 50 states for registration deadlines and official links; other state-specific rules can be added post-MVP

---

#### F7 — Completion State `P1`

**What it is:** End state when all 6 steps are marked complete.

**Requirements:**
- Clear, warm message: "You're ready to vote."
- No upsell, no account creation prompt
- One CTA: "Share this guide with a friend" → generates a clean shareable link
- Shareable link opens the product fresh for the new user (no personal data shared)

---

#### F8 — Shareable Guide Link `P2`

**What it is:** A URL that can be shared person-to-person.

**Requirements:**
- Generated at completion state
- Can also be accessed via a persistent "Share" button in the nav/header
- Link opens the onboarding flow fresh — no pre-filled state, no session data transferred
- No login or account required to use a shared link

---

## 7. GEMINI GEM CONFIGURATION

This section defines exactly how the Gem must be configured. This is a critical product requirement, not just a technical detail.

### 7.1 Gem Identity & Persona

| Attribute | Definition |
|---|---|
| Name | ElectionPath Assistant |
| Tone | Calm, clear, friendly — like a knowledgeable civic volunteer, not a government official |
| Reading level | Plain English. 8th grade reading level target. |
| Response length | Short to medium. Conversational. No walls of text. |
| Formatting | Bullet points when listing steps. Bold for key terms. No headers inside responses. |

### 7.2 Knowledge Scope — What the Gem KNOWS

The Gem is trained/prompted to answer questions within these domains only:

- **Voter eligibility** — age, citizenship, residency, felony disenfranchisement rules
- **Voter registration** — how to register, deadlines, same-day registration, updating address
- **Ballot content** — types of elections (federal, state, local), what offices are on the ballot, how ballot measures work
- **Voting methods** — in-person, early voting, mail-in/absentee, drop boxes, polling locations
- **Election Day logistics** — what to bring, ID requirements, what to expect at a polling place
- **Post-voting process** — how votes are counted, canvassing, certification, results timelines
- **Civic vocabulary** — definitions of election terms (precinct, provisional ballot, down-ballot, canvass, etc.)
- **General US election structure** — Electoral College (informational only), primary vs. general elections, midterms

### 7.3 Hard Boundaries — What the Gem WILL NOT Do

| Prohibited Topic | Response Behavior |
|---|---|
| Candidate recommendations | "I can only help with the voting process — for candidate info, check your local news or vote.gov." |
| Party opinions or comparisons | Same deflection as above |
| Policy debate or opinions | "That's a policy question — I'm here to help with the voting process only." |
| Election fraud claims or conspiracy | "I can share how the official counting and certification process works if that helps." |
| Legal advice | "For legal questions about your specific situation, I'd recommend contacting your state election office." |
| Non-election topics | "I'm only able to help with election and voting questions. Is there anything about the voting process I can help with?" |

### 7.4 Context Passing (Website → Gem)

When the Gem is triggered from a specific timeline step, the website passes a context string to the Gem's opening prompt:

**Format:**
```
User context: State = [STATE], Election timing = [TIMING], Current step = [STEP NAME].
Open with: "You're looking at [STEP NAME]. What would you like to know about this?"
```

**Example:**
```
User context: State = Ohio, Election timing = "A few weeks away", Current step = Voter Registration.
Open with: "You're looking at Voter Registration in Ohio. What would you like to know?"
```

This makes the first interaction feel personal and reduces the user's cognitive load — they don't have to re-explain their situation to the assistant.

### 7.5 Fallback Behavior

If the Gem cannot answer a question within scope:
- Acknowledge the question
- Explain it's outside what the assistant covers
- Point to the most relevant official resource: vote.gov, USA.gov/absentee-voting, or the user's state election website

---

## 8. USER FLOWS

### 8.1 Primary Flow — First-Time User

```
LAND ON PAGE
    ↓
See product headline + "Start Here" CTA
    ↓
ONBOARDING (Screen 1)
  → "When is your election?" — select one of 4 options
  → "Which state are you in?" — select state
  → Click "Show My Election Path"
    ↓
TIMELINE LOADS (Screen 2)
  → 6 steps displayed vertically
  → Steps color-coded by urgency based on their timing input
  → First step auto-expands (Step 1: Check Eligibility)
    ↓
USER READS STEP 1
  → Sees plain-language explanation
  → Sees their state-specific deadline
  → Sees official action link
  → Option: "Ask the assistant about this step" → opens Gem
    ↓
[PATH A] User continues through steps manually
  → Expands each, marks complete, progresses
  → Uses Gem when confused

[PATH B] User opens Gem independently
  → Asks a question directly
  → Gets answer
  → Returns to timeline
    ↓
COMPLETION (Screen 3)
  → "You're ready to vote"
  → Share CTA
```

### 8.2 Secondary Flow — Direct Gem User

Some users will skip the timeline and go straight to the Gem.

```
LAND ON PAGE
    ↓
See "Ask the Assistant" button (always visible)
    ↓
Opens Gem panel
  → Types question: "Do I need an ID to vote in Texas?"
  → Gets answer
  → Asks follow-up
    ↓
Assistant may suggest: "Want to see the full voting checklist for Texas?"
  → If yes → opens timeline with Texas pre-selected
```

### 8.3 Recovery Flow — Missed Deadline

```
User selects "Very soon (days)" in onboarding
    ↓
Timeline loads — Step 2 (Registration) shows MISSED status in grey
    ↓
Step 2 expanded message: "Registration has likely closed. Here's what you may still be able to do."
    ↓
"Ask the assistant" → Gem opens with: "It looks like standard registration may have passed in your state. Want me to check if same-day registration is available?"
```

---

## 9. CONTENT REQUIREMENTS

### 9.1 What Content Needs to Be Written

| Content Piece | Owner | Notes |
|---|---|---|
| Step card body copy (6 steps × ~4 bullets) | Content / Product | Plain English, 8th grade reading level |
| State-specific registration deadlines (50 states) | Research / Product | Must be verified against official sources |
| State-specific official action links (50 states) | Research / Product | vote.gov where possible, state portals otherwise |
| Gem system prompt / persona configuration | Product + AI | See Section 7 — critical to get right |
| Deadline missed messaging (soft, non-shaming) | Content | Tone is important here |
| Completion state copy | Content | Warm, celebratory, civic pride tone |
| Onboarding question copy | Content | Simple, welcoming, zero jargon |

### 9.2 Content Rules (Non-Negotiable)

- No jargon without immediate plain-language explanation
- No mention of specific candidates, parties, or political positions — ever
- All deadlines must be sourced from official state election websites
- Missed deadline messaging must never make the user feel blamed or shamed

---

## 10. TECHNICAL REQUIREMENTS

### 10.1 Platform

- Web-based, responsive (mobile-first)
- No native app
- No user login or account system
- No persistent data storage — session only

### 10.2 Gemini Gem Integration

- Gem is created and hosted on Google's Gemini platform
- Embedded in the website via Gemini's provided embed method (iframe or web component)
- Context string passed to Gem on step-triggered open (see Section 7.4)
- Gem link also shareable as standalone URL for users who prefer direct access

### 10.3 State Data

- 50 states + DC
- Stored as a static JSON/data file on the frontend (no backend needed for MVP)
- Fields per state: registration deadline, same-day registration availability, official registration link, early voting availability, mail-in voting rules (brief)

### 10.4 No-Backend MVP Constraint

The MVP requires no backend server. All logic runs in the browser:
- Session state for progress tracking
- Static state data file
- Gem hosted externally by Google

---

## 11. OUT OF SCOPE (MVP)

These are explicitly excluded from V1:

| Feature | Reason Excluded |
|---|---|
| Voter registration form / backend | Legal and infrastructure complexity |
| Ballot lookup (specific candidates on your ballot) | Requires live government API integration |
| Notification / reminder system | Requires user contact info and backend |
| Multi-language support | Post-MVP priority |
| Native iOS / Android app | Unnecessary for web-first MVP |
| User accounts or saved progress | No data storage in MVP |
| Election results / live data | Out of product scope |

---

## 12. RISKS & MITIGATIONS

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Gem gives a politically biased answer | Low | High | Strict system prompt + manual testing before launch |
| User asks about specific candidate — Gem engages | Medium | High | Hard guardrail in Gem config; tested extensively |
| State deadline data is outdated | Medium | High | Source from official .gov sites; add "verify at vote.gov" disclaimer |
| User feels dismissed when Gem deflects | Medium | Medium | Write deflection responses warmly; always offer a redirect |
| Gem embed breaks on mobile | Low | Medium | Test across devices pre-launch; fallback to link-out |
| Users miss that the Gem exists | Medium | Medium | Gem trigger button always visible; surfaced within step cards |

---

## 13. LAUNCH CHECKLIST

- [ ] Gem created with correct system prompt and persona
- [ ] Gem tested for out-of-scope deflection (100 test questions)
- [ ] All 6 step card copy written and reviewed
- [ ] All 50 state deadlines verified and loaded
- [ ] All 50 state action links verified and working
- [ ] Context-passing from step cards to Gem tested
- [ ] Mobile responsiveness tested on iOS Safari + Android Chrome
- [ ] Deadline urgency logic tested for all 4 timing inputs
- [ ] Missed deadline recovery flow tested
- [ ] Completion state and share link tested
- [ ] Copy reviewed for jargon, political neutrality, and tone

---

## 14. APPENDIX

### A — Gem System Prompt (Draft)

```
You are ElectionPath Assistant — a helpful, neutral guide for anyone 
navigating the US election process.

Your role: Answer questions about voter eligibility, registration, 
ballots, voting methods, Election Day logistics, and how votes are 
counted — in plain, friendly English.

Your limits:
- You never recommend or comment on candidates, parties, or policies.
- If asked for a political opinion, say: "I'm only here to help with 
  the voting process. For candidate information, I'd suggest checking 
  your local news or vote.gov."
- If asked about anything outside elections and voting, say: "I can 
  only help with election and voting questions. Is there something 
  about the voting process I can help with?"

Tone: Calm, clear, friendly — like a knowledgeable civic volunteer.
Length: Keep responses short and conversational. Use bullet points 
for lists. Avoid walls of text.
Reading level: Plain English. Simple words. Short sentences.
```

### B — Step Card Content Structure

Each of the 6 steps follows this template:

```
STEP [N] — [TITLE]
Status: [Upcoming / Action Needed / Completed / Missed]
Deadline: [Date or timeframe] — [Color badge]

[3–4 bullet points, plain language]

→ [Official action link label] — [URL]
→ Ask the assistant about this step
□ Mark as Done
```

### C — Suggested Gem Knowledge Base Topics

Topics the Gem should be able to answer confidently:

- What is voter registration and why is it required?
- How do I check if I am registered?
- What is the registration deadline in my state?
- What is same-day voter registration?
- What ID do I need to bring to vote?
- What is an absentee ballot vs. a mail-in ballot?
- What is early voting?
- What is a polling place and how do I find mine?
- What is a provisional ballot?
- What happens after I vote?
- How are votes counted?
- What is the Electoral College?
- What is a primary election vs. a general election?
- What is a midterm election?
- What does "down-ballot" mean?
- What is a ballot measure or proposition?
- What is canvassing (in the vote-counting sense)?
- How long does it take to certify election results?

---

*ElectionPath PRD v1.0 — Built on ElectionPath MVP.md*

# ElectionPath — Complete Design Document
### The Single Source of Truth for the Designer
**Status:** Final. Use only this document. Discard all previous design files.
**Product:** ElectionPath — AI-Powered Election Guide
**Prepared for:** Designer handoff

---

## PART 0 — BEFORE YOU START

### What You Are Designing

**ElectionPath** is a web-based tool that guides confused, anxious users through the US election process — step by step — in plain language. It is built around a **Gemini AI assistant** embedded in the website, with a structured 6-step election journey supporting it.

It lives in a browser. No app. No login. No account. No political opinions — ever.

Think of it as a **personal civic guide**, not a government form. The user lands, sees upcoming elections, sets their context, gets a personalized path, and can ask the AI anything along the way.

---

### The Reference Aesthetic — Glow.team

Study **glow.team** before touching a frame. Their aesthetic is the north star for this product.

What defines the Glow standard:
- Clean white or near-white backgrounds with **subtle gradient mesh** for depth — never flat, never busy
- **Cards everywhere** — generous padding, soft drop shadows, fully rounded corners
- One primary color used purposefully — CTAs, active states, highlights only
- Headlines are large, confident, and airy. Body text is restrained.
- Every section breathes. Nothing is cramped or cluttered.
- Micro-detail quality: hover states, smooth transitions, consistent 8px grid
- Feels like a **premium SaaS product**, not a civic pamphlet or government site

This is the bar. Every screen of ElectionPath must meet this standard.

---

### Who You Are Designing For

Three user types. All share one emotion: **low-grade anxiety about doing something wrong.**

| User | Age | Their headspace when they land |
|---|---|---|
| First-time voter | 18–25 | "I have no idea where to start. I don't want to look dumb." |
| New citizen | 28–50 | "I really want to do this right. Everything still feels foreign." |
| Lapsed voter | 30–55 | "I've done this before but I'm out of practice. Just remind me." |

**What all three want immediately:**
- Reassurance they're in the right place
- A clear answer to "Am I already too late?"
- No jargon. No walls of text. No political opinions.

**What will make them leave immediately:**
- Anything that looks like a government website
- Text-heavy screens before they've done anything
- Feeling quizzed, judged, or overwhelmed

---

### The Emotional Arc to Design For

Every design decision should support this arc:

```
ANXIOUS & LOST  →  ORIENTED  →  GUIDED  →  CONFIDENT  →  DONE & PROUD
   (Landing)      (Elections)  (Timeline)  (Steps done)   (Completion)
```

- **Landing** = Calm, welcoming, "you're in exactly the right place"
- **Election Cards** = Grounding, "here is the real event you're voting in"
- **Timeline** = Focused, one step at a time, no overwhelm
- **Completion** = Satisfying, warm, genuine sense of civic pride

---

## PART 1 — GLOBAL DESIGN SYSTEM

Apply every rule in this section to every single screen without exception.

---

### 1.1 Font — Nunito. Only Nunito. Everywhere.

Import from Google Fonts: `Nunito` — weights 400, 600, 700, 800.

Every single piece of text uses Nunito. No system fonts. No fallbacks in the design file.

Nunito's rounded letterforms are intentional — they must feel native to the rounded, friendly UI system. The roundness of the font and the roundness of cards/buttons must feel like one coherent decision.

| Text Role | Weight | Desktop Size | Mobile Size |
|---|---|---|---|
| Hero headline | ExtraBold (800) | 56–64px | 36–40px |
| Section headline | Bold (700) | 32–40px | 24–28px |
| Card title | SemiBold (600) | 20–22px | 18px |
| Subheadline / intro | Regular (400) | 18–20px | 16–17px |
| Body / description | Regular (400) | 16px | 15px |
| Label / badge text | SemiBold (600) | 12–13px | 12px |
| CTA button label | Bold (700) | 15–16px | 15px |
| Input placeholder | Regular (400) | 15px | 15px |
| Muted / helper text | Regular (400) | 13px | 13px |

Line heights: Headlines 1.15–1.2. Body text 1.6. Labels 1.3.
Letter spacing: Headlines −0.5px. Body 0. Labels +0.2px (caps labels) or 0.

---

### 1.2 Border Radius — Rounded Everywhere

No sharp corners anywhere on this product. If an element has a corner, it is rounded.

| Element | Radius |
|---|---|
| Large cards (election cards, step cards, feature cards) | 20px |
| Medium cards (onboarding tiles, info boxes) | 16px |
| Primary CTA buttons | 14px |
| Secondary / ghost buttons | 14px |
| Input fields | 12px |
| Small chips / status pills / filter tabs | 999px (fully pill-shaped) |
| Floating Gemini panel | 24px (or left-edge only on desktop) |
| "Why it's important" callout boxes | 12px |
| Modal overlays | 24px |
| Progress bar track | 999px |
| Checkboxes within steps | 6px |

---

### 1.3 Color System

Use only these tokens. Do not introduce any other colors.

**Base palette:**

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#5B6CF9` | CTAs, active step indicator, links, icons, focus rings |
| `--primary-light` | `#EEF0FF` | Card tinted backgrounds, hover fills, callout boxes, assistant strip |
| `--primary-dark` | `#3D4ED6` | Button hover/pressed state |
| `--bg-base` | `#F5F6FA` | Overall page background |
| `--bg-white` | `#FFFFFF` | Card surfaces, nav bar, panel |
| `--text-primary` | `#1A1D2E` | Headlines, card titles, strong labels |
| `--text-secondary` | `#6B7080` | Body copy, descriptions, step subtitles |
| `--text-muted` | `#A0A6B8` | Placeholders, locked step text, helper text |
| `--border` | `#E4E7F0` | Card borders, dividers, input borders |
| `--border-focus` | `#5B6CF9` | Input focus state border |

**Deadline urgency system — step cards only:**

| Urgency Level | Trigger | Background | Text | Border |
|---|---|---|---|---|
| Comfortable | Months away | `#DCFCE7` | `#15803D` | none |
| Approaching | 1–3 weeks away | `#FEF3C7` | `#92400E` | none |
| Urgent | Days away | `#FEE2E2` | `#B91C1C` | none |
| Missed | Deadline passed | `#F3F4F6` | `#6B7280` | none |
| Completed | User marked done | `#EEF0FF` | `#3D4ED6` | none |

**Election type tag system — election cards only:**

| Election Type | Pill background | Pill text |
|---|---|---|
| General | `#EEF0FF` | `#3D4ED6` |
| Primary | `#F3E8FF` | `#6D28D9` |
| State | `#E0F7FA` | `#0277BD` |
| Local | `#DCFCE7` | `#15803D` |
| Special | `#FEF3C7` | `#92400E` |

---

### 1.4 Spacing Grid

Base unit: 8px. Every margin, padding, and gap must be a multiple of 8.

Common values to use: 8 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96px.

Card internal padding: 24px desktop, 20px mobile.
Section vertical padding: 80–96px desktop, 48–64px mobile.
Page horizontal margin: 80px desktop, 16px mobile.
Max content width: 1200px, centered.
Timeline content max-width: 720px, centered on page.

---

### 1.5 Shadow System

| Level | When to use | CSS value |
|---|---|---|
| Card resting | All cards at default state | `0 2px 12px rgba(0,0,0,0.06)` |
| Card hover | Cards on mouse hover | `0 8px 32px rgba(91,108,249,0.12)` |
| Card active/expanded | Currently expanded step card | `0 4px 20px rgba(91,108,249,0.15)` |
| Primary button | All filled CTA buttons | `0 4px 16px rgba(91,108,249,0.30)` |
| Floating panel | Gemini assistant panel | `0 16px 48px rgba(0,0,0,0.12)` |
| Floating button | Always-visible Gemini trigger | `0 4px 20px rgba(91,108,249,0.35)` |

---

### 1.6 Iconography

- Style: Outlined icons with 2px stroke weight. Rounded line caps.
- Recommended library: Lucide Icons or Phosphor Icons (outline style)
- Size: 20px within cards and buttons. 24px in section features. 16px in badges/labels.
- Color: Always use `--primary` for active/accent icons. `--text-muted` for inactive/locked icons.
- Never use filled icons except for the checkmark state in completed steps.

---

### 1.7 Background Treatment

The page background is not plain white. It uses a very subtle gradient mesh:

- Base: `--bg-base` (`#F5F6FA`)
- Hero section and landing: Add a soft indigo → lavender → white radial gradient blob in the upper-right quadrant. Opacity: 25–35%. This should feel like a gentle glow, not a gradient background.
- All other sections: `--bg-base` flat. The gradient appears only on hero/landing areas.
- Cards always use `--bg-white` regardless of section background.

---

## PART 2 — COMPLETE SCREEN SPECIFICATIONS

There are **6 design surfaces** total:

```
SURFACE 1 — Landing Page
      ↓ (CTA click)
SURFACE 2 — Election Cards Screen
      ↓ (card selection or "set manually")
SURFACE 3 — Onboarding Questions
      ↓ (submit)
SURFACE 4 — 6-Step Timeline Journey
      (always available alongside)
SURFACE 5 — Gemini Assistant Panel (floating overlay)
      (end state within Surface 4)
SURFACE 6 — Completion State
```

---

## SURFACE 1 — LANDING PAGE

The most important screen. It must earn trust and communicate the product's value in under 5 seconds. Premium SaaS quality. No government-site vibes.

---

### Section A — Navigation Bar

**Layout:** Full-width, sticky on scroll.

- **Left:** ElectionPath logo — small icon (ballot/checkmark mark) + wordmark "ElectionPath" in Nunito ExtraBold, `--primary` color
- **Right:** Two elements:
  - Ghost/outline button: "Upcoming Elections" → scrolls to Section D or navigates to Election Cards screen
  - Primary filled button: "Get Started →" → navigates to Election Cards screen
- **Background:** `--bg-white` at rest. On scroll: white with a 1px bottom border in `--border` + card resting shadow
- **Height:** 64px desktop / 56px mobile
- **Mobile:** Logo left + hamburger icon right. Hamburger expands to a full-screen nav drawer.

---

### Section B — Hero Section

**Layout:** Centered content, max-width 760px for text, full-width for background treatment.

Top to bottom order:

**1. Badge chip**
- Small pill shape (999px radius)
- Background: `--primary-light`
- Content: "🗳️ Your Free Civic Guide" — Nunito SemiBold 13px, `--primary` text
- Centered above headline

**2. Hero headline**
- 2 lines maximum
- Suggested copy: *"Your election, step by step."*
- Nunito ExtraBold 800, 56px desktop / 36px mobile
- Color: `--text-primary`
- Line height: 1.15
- Centered

**3. Sub-headline**
- 1 line
- Suggested copy: *"Plain language. Clear deadlines. No confusion."*
- Nunito Regular 400, 20px desktop / 16px mobile
- Color: `--text-secondary`
- Centered. 16px gap below headline.

**4. CTA Button Row**
- Two buttons, side by side, centered
- Gap between buttons: 16px
- **Primary button:** "Show My Election Path →" — filled primary, shadow, 14px radius, Nunito Bold 15px, white text, height 52px, min-width 220px
- **Secondary button:** "See Upcoming Elections" — ghost/outline, `--primary` border and text, same height, same radius
- On mobile: stack vertically, both full-width

**5. Trust chips row**
- 3 small chips, horizontal, centered, 8px gap between them
- Each chip: small dot + text. Examples:
  - "✓ No login required"
  - "✓ Politically neutral"
  - "✓ Free forever"
- Nunito Regular 13px, `--text-secondary` color
- On mobile: wrap to 2 rows if needed

**6. Product preview image (optional but strongly recommended)**
- A polished mockup screenshot of the timeline screen
- Desktop: positioned to the right of the headline text (2-column layout), slightly rotated 3–4°, card shadow beneath
- Mobile: below the trust chips, full-width, flat (no rotation)
- This is a static image/illustration — not functional on the landing page
- Treat it like a SaaS hero image. Polish it to the same quality as the rest of the design.

---

### Section C — How It Works

**Layout:** Centered, max-width 960px, white section background or `--bg-base`.

- **Section headline:** "Three steps to being ready" — Nunito Bold 32px, centered, `--text-primary`
- **Section sub-headline:** 1 line of body text, centered, `--text-secondary`
- **3 feature cards**, side by side (desktop) / stacked (mobile):
  - Each card: `--bg-white`, 16px radius, card resting shadow, 24px padding
  - Top: Icon in a 48×48 circle with `--primary-light` background, `--primary` icon
  - Below icon: Card title — Nunito SemiBold 18px, `--text-primary`
  - Below title: 1–2 lines of description — Nunito Regular 15px, `--text-secondary`
  - Steps:
    - Card 1: Calendar icon → "Tell us when and where" → "Select your election and state. Takes 10 seconds."
    - Card 2: Checklist icon → "Follow your personal path" → "A 6-step journey built around your real deadlines."
    - Card 3: Sparkle/AI icon → "Ask anything, anytime" → "Our Gemini assistant answers every voting question."
- Connector arrows or numbered indicators between cards on desktop — keep them subtle

---

### Section D — Upcoming Elections Preview Strip

**Layout:** Full-width section, `--bg-base` background.

- **Section headline:** "What's coming up" — Nunito Bold 32px, left-aligned, `--text-primary`
- **Sub-label:** "Upcoming elections across the US" — Nunito Regular 16px, `--text-secondary`
- **Card row:** 3 election cards displayed horizontally. Horizontal scroll on mobile (snap-scroll).
- Each card follows the full Election Card spec in Surface 2.
- At the end of the row: "See all upcoming elections →" as a text link in `--primary` with arrow icon
- This section is a **teaser** — it shows real, upcoming elections to ground the user in reality before they've even started

---

### Section E — Gemini Assistant Feature Callout

**Layout:** 2-column grid on desktop (text left, visual right). Single column stacked on mobile.

- **Left column:**
  - Label chip: "Powered by Google Gemini" — small pill, `--primary-light` fill, Gemini icon
  - Headline: "Ask anything about voting" — Nunito Bold 36px, `--text-primary`
  - Body: 2–3 sentences. Example: *"Our AI assistant knows every detail of the election process. Ask about deadlines, ID requirements, mail-in voting — anything. It will never give you a political opinion."*
  - CTA: "Try the Assistant →" — primary button
  
- **Right column:**
  - A **static visual mockup** of the Gemini panel (the chat interface)
  - Show a sample exchange: user asks "Do I need an ID to vote in Ohio?" / assistant responds with a clear 3-line answer
  - Apply the panel styling from Surface 5 — white panel, primary bubbles, `--bg-base` assistant bubbles
  - Small "Powered by Gemini" badge at the bottom of the visual

---

### Section F — Footer

**Layout:** Full-width, minimal.

- Background: `--bg-white`, 1px top border in `--border`
- Single row on desktop: Logo left · Nav links center · Attribution right
- Nav links: "How It Works" · "Upcoming Elections" · "Privacy"
- Attribution: Small "Powered by Gemini" badge with Gemini icon
- Copyright line below on a second row, `--text-muted`, small
- Mobile: Stack everything centered, 3 rows

---

## SURFACE 2 — ELECTION CARDS SCREEN

This screen appears immediately after the user clicks the primary CTA on the landing page. It shows real, upcoming elections before asking the user any questions. The purpose is to ground the user in a concrete, real event — not abstract civic steps.

---

### Screen Layout

**Top: Page header**
- Same sticky nav as landing page
- Below nav: Page headline "Upcoming Elections" — Nunito Bold 40px, `--text-primary`, left-aligned
- Below headline: Sub-label — "Select your election to get a personalized voting guide" — Nunito Regular 17px, `--text-secondary`

**Filter row**
- Pill-style filter tabs: "All" · "General" · "Primary" · "State" · "Local" · "Special"
- Each tab: 999px radius pill, Nunito SemiBold 13px
- Default state: `--bg-white` background, `--border` border, `--text-secondary` text
- Active/selected state: `--primary` background, white text, no border
- Row is horizontally scrollable on mobile with no scrollbar visible

**Card grid**
- 2-column grid on desktop, 1 column on mobile
- Gap: 24px
- Cards follow the full Election Card spec below

**Bottom fallback**
- Below the card grid: "Don't see your election? Set it up manually →"
- Nunito Regular 15px, `--primary` color, text link with arrow
- This navigates directly to the Onboarding Questions (Surface 3) without a card selection

---

### Election Card — Full Spec

This is a new component. Design it with maximum care — it is the first thing the user touches after the landing page.

**Card dimensions:** Full column width. Min-height: 200px. 24px padding all sides.
**Background:** `--bg-white`
**Border radius:** 20px
**Border:** 1px solid `--border`
**Shadow:** Card resting shadow at default. Card hover shadow on hover.

**Card anatomy, top to bottom:**

```
┌─────────────────────────────────────────────────┐
│  [TYPE TAG pill]              [DATE BADGE pill]  │  ← Row 1: Tags
│                                                  │
│  Election Title                                  │  ← Row 2: Title
│  2026 U.S. Midterm Elections                     │     Nunito SemiBold 20px
│                                                  │
│  📍 Federal — All 50 States                      │  ← Row 3: Scope
│                                                  │
│  ──────────────────────────────────────────────  │  ← Divider
│                                                  │
│  Key Dates                                       │  ← Row 4: Dates
│  Registration Deadline    Oct 7, 2026            │     label left, date right
│  Election Day             Nov 3, 2026            │
│                                                  │
│  [ See My Voting Path →                       ]  │  ← Row 5: CTA
└─────────────────────────────────────────────────┘
```

**Row 1 — Type tag (left) + Date badge (right):**
- **Type tag:** Pill shape, color from election type system in Section 1.3. Content: election type name (e.g., "General"). Nunito SemiBold 12px.
- **Date badge:** Pill shape, urgency color from deadline urgency system in Section 1.3. Content: "X days away" or "Happening now" or "Registration open". Nunito SemiBold 12px.
- Both on same row, space-between alignment.

**Row 2 — Title:**
- Nunito SemiBold 20px, `--text-primary`
- Max 2 lines, truncate with ellipsis if longer
- 8px top margin from Row 1

**Row 3 — Scope line:**
- Small location pin icon (16px, `--text-muted`) + scope text
- Nunito Regular 14px, `--text-secondary`
- 6px top margin from Row 2

**Divider:**
- 1px line, `--border` color, full width, 16px vertical margin

**Row 4 — Key Dates:**
- Label "Key Dates" — Nunito SemiBold 13px, `--text-muted`, all-caps, letter-spacing +0.5px
- Two date rows below:
  - Each row: label text left (Nunito Regular 14px, `--text-secondary`) + date right (Nunito SemiBold 14px, `--text-primary`)
  - If a deadline has passed: date text shows as `--text-muted` with a strikethrough + small "Closed" label in grey pill

**Row 5 — CTA Button:**
- Full-width within card
- "See My Voting Path →" — primary filled button, 14px radius, Nunito Bold 15px, white text, 48px height
- Primary button shadow applied
- 16px top margin from Row 4

---

### Election Card — All 4 States

**State 1: Default**
- White card, `--border` border, resting shadow
- All content as described above

**State 2: Hover**
- Shadow lifts to card hover shadow
- Card translates up 2px (transform: translateY(-2px))
- Border changes to 1px `--primary` at 30% opacity
- Transition: 150ms ease

**State 3: Happening Now**
- Top border: 3px solid `--primary` (replace standard border on top edge only)
- Date badge reads "Happening Now" in green urgency treatment
- Optional: very subtle `--primary-light` tint on card background (5–8% opacity)

**State 4: Registration Closed**
- Registration Deadline row: date shown in `--text-muted`, strikethrough text style, small "Closed" grey pill to the right
- CTA button still active (user can still explore the path and learn)
- No alarming visual treatment — just clear and honest

---

## SURFACE 3 — ONBOARDING QUESTIONS

This screen appears after the user selects an election (or clicks "Set it up manually"). It collects two pieces of context before building the personalized path.

---

### Screen Layout

**Background:** `--bg-base` with the subtle gradient mesh (same as landing hero — creates visual continuity)

**Top progress indicator:**
- Small text above form: "Step 1 of 2" — Nunito Regular 13px, `--text-muted`, centered
- Not a progress bar — just simple text. No pressure.

**Screen headline:** "Let's build your path" — Nunito Bold 36px, `--text-primary`, centered
**Screen sub-label:** "Two quick questions." — Nunito Regular 17px, `--text-secondary`, centered

---

### Question 1 — "When is your election?"

- Question label: Nunito Bold 20px, `--text-primary`, left-aligned above tile grid
- 4 option tiles arranged in a 2×2 grid (desktop) / 1-column stack (mobile)

**Tile spec:**
- Background: `--bg-white`
- Border: 1px solid `--border`
- Border radius: 16px
- Shadow: Card resting shadow
- Padding: 24px
- Height: ~100px desktop, ~80px mobile (must be large, tappable)

**Tile internal layout (centered):**
- Icon at top: calendar icon in `--primary-light` circle (40×40px circle, 20px icon)
- Label below: Nunito SemiBold 16px, `--text-primary`

**Tile options:**
1. "A few months away"
2. "A few weeks away"
3. "Very soon (days)"
4. "It already happened"

**Tile selected state:**
- Border changes to 2px solid `--primary`
- Background changes to `--primary-light`
- Icon circle fills to `--primary`, icon becomes white
- Label color changes to `--primary`
- Shadow upgrades to card hover shadow
- Transition: 150ms ease. Immediate, snappy. Not slow.

**Tile unselected state after a selection:**
- All other tiles drop to 60% opacity
- Do not remove from view — user should be able to change their choice

---

### Question 2 — "Which state are you in?"

- Question label: Nunito Bold 20px, `--text-primary`, left-aligned
- A searchable dropdown / select input

**Dropdown spec:**
- Background: `--bg-white`
- Border: 1px solid `--border`
- Border radius: 12px
- Height: 52px
- Padding: 0 16px
- Placeholder text: "Choose your state" — Nunito Regular 15px, `--text-muted`
- Selected text: Nunito Regular 15px, `--text-primary`
- Custom chevron icon on right (not native browser arrow)
- Focus state: border changes to 2px solid `--primary` (`--border-focus`)
- Dropdown options list: white background, 12px radius, card shadow, Nunito Regular 15px per option, `--primary-light` on hover per row

---

### CTA Button

- "Show My Election Path →" — Primary filled button
- Width: auto, centered, min-width 240px (desktop). Full-width on mobile.
- Height: 54px
- Nunito Bold 16px, white text
- Primary shadow
- Disabled state (if either question unanswered): 50% opacity, no shadow, cursor: not-allowed
- Active/clicked state: brief loading spinner inside button (1 second), then screen transition

---

## SURFACE 4 — 6-STEP TIMELINE JOURNEY

This is the core screen. The user spends most of their time here. Every detail matters.

---

### Screen Layout

**Sticky header bar (separate from nav):**
- Full-width bar below the nav
- Background: `--bg-white`, 1px bottom border `--border`
- Left: "Your Election Journey" label — Nunito Bold 18px, `--text-primary`
- Right: Two context chips showing the user's selections:
  - State chip: e.g., "Alabama" — Nunito SemiBold 13px, `--primary-light` background, `--primary` text, 999px radius
  - Timing chip: e.g., "It already happened" — same styling
  - Small edit icon next to chips — clicking opens a popover to change selections

**Progress section (below sticky header):**
- Large centered text: "Your Election Journey" — Nunito Bold 32px (desktop), 24px (mobile)
- Below: "You're making great progress! X of 6 steps completed." — Nunito Regular 16px, `--text-secondary`
- Progress bar: Full-width bar, 8px height, `--border` track, `--primary` fill, 999px radius
- Progress bar fills smoothly as steps complete

**Timeline content area:**
- Max-width: 720px, centered on page
- Left side: Vertical connector line (see spec below)
- Right side: Step cards stacked vertically, 16px gap between cards

---

### Connector Line System

The vertical line connecting all 6 steps.

- **Positioning:** 20px to the left of step cards. The step number circle sits on this line.
- **Default (incomplete) segments:** Dashed line, 2px wide, `--border` color
- **Completed segments (between done steps):** Solid line, 2px wide, `--primary` color
- **Transition:** When a step is marked complete, the connector segment below it animates from dashed to solid (200ms ease)

---

### Step Number Circles

Each step has a circle sitting on the connector line.

| Step State | Circle style |
|---|---|
| Upcoming (locked) | 36px circle, `--border` border (2px), `--bg-white` fill, lock icon inside in `--text-muted` |
| Active (current) | 36px circle, `--primary` fill, step number inside in white, Nunito Bold 16px |
| Completed | 36px circle, `--primary` fill, checkmark icon inside in white |
| Missed | 36px circle, `#9CA3AF` fill, cross/dash icon inside in white |

---

### Step Card — Collapsed State (Default)

All steps start collapsed. Only one step is expanded at a time.

**Card structure:**
- Background: `--bg-white`
- Border: 1px solid `--border`
- Border radius: 20px
- Shadow: Card resting shadow
- Padding: 20px 24px
- Min-height: 72px
- Cursor: pointer

**Internal layout (single row, vertically centered):**
- Left: Step number circle (connected to the line system)
- Middle: Step title + step label
  - "STEP X" — Nunito SemiBold 11px, `--text-muted`, letter-spacing +1px
  - Step title below — Nunito SemiBold 18px, `--text-primary`
- Right: Status pill + chevron down icon
  - Status pill styling from Section 1.3 urgency system
  - Chevron: `--text-muted`, rotates 180° when expanded

**Step titles:**
- Step 1: Check Eligibility
- Step 2: Register to Vote
- Step 3: Understand Your Ballot
- Step 4: Choose How to Vote
- Step 5: Cast Your Vote
- Step 6: Track Your Vote & Results

**Collapsed card states:**

| State | Card treatment |
|---|---|
| Upcoming (locked) | `--bg-base` background (slightly off-white), muted text, lock icon on circle |
| Active (next to complete) | `--bg-white` background, full opacity text, prominent status pill |
| Completed | `--bg-white` background, full opacity, green checkmark on circle, status pill reads "Done" in primary color |
| Missed | `--bg-white` background, `--text-secondary` on title, grey status pill reads "Missed" |

---

### Step Card — Expanded State

When a user taps a step card, it expands downward with a smooth height animation (200ms ease).

The expanded card has a **4px solid `--primary` left border** (accent line) replacing the standard 1px border on the left edge. This visually anchors the "you are here" state.

**Expanded content sections, top to bottom inside the card:**

---

**Section: "What to do"**
- Label: "What to do" — Nunito SemiBold 13px, `--primary`, letter-spacing +0.5px
- Content: 1 sentence. Plain English. Nunito Regular 16px, `--text-secondary`.

---

**Section: "How to do it"**
- Label: "How to do it" — same style as above
- Content: 2–3 sentences. Specific, actionable. Nunito Regular 16px, `--text-secondary`.

---

**"Why it's important" callout box**
- Background: `--primary-light`
- Left border: 4px solid `--primary`
- Border radius: 12px
- Padding: 16px 20px
- Top row: Info icon (16px, `--primary`) + "Why it's important" label (Nunito SemiBold 14px, `--primary`)
- Content below label: 1–2 sentences. Nunito Regular 15px, `--text-secondary`.

---

**"Documents to Keep Handy" box**
- Background: `--bg-base`
- Border: 1px solid `--border`
- Border radius: 12px
- Padding: 16px 20px
- Top row: Document icon (16px, `--text-secondary`) + "Documents to Keep Handy" label (Nunito SemiBold 14px, `--text-secondary`)
- Content: Bullet list of 2–3 items. Nunito Regular 15px, `--text-secondary`.
- Each bullet: small dot (`--primary`) + item text

---

**Checklist section**
- Label: "Checklist" — Nunito SemiBold 15px, `--text-primary`
- 2–3 checklist items below
- Each checklist item:
  - Container: `--bg-white`, 1px `--border` border, 12px radius, 48px height, 16px padding, full width
  - Left: Custom checkbox — 20px square, 6px radius, `--border` border (unchecked) → `--primary` fill + white checkmark (checked). Animate the check fill.
  - Right of checkbox: Item text — Nunito Regular 15px, `--text-primary`
  - Checked state: text color changes to `--text-muted`, light strikethrough optional

- Below checklist items: "Complete Checklist (X/Y)" CTA button
  - Full-width within card
  - Primary filled button, 14px radius, 48px height, Nunito Bold 15px
  - Disabled state: 50% opacity until all items checked
  - When all items checked: full opacity, shadow appears, button label changes to "Mark as Complete ✓"

---

**"Need help? Ask Assistant" bar**
This is the primary Gemini entry point within each step. Give it visual prominence.

- Background: `--primary-light`
- Full width within card
- Border-radius: 0 0 16px 16px (only bottom corners rounded — sits flush with card bottom)
- Height: 52px
- Padding: 0 20px
- Layout: space-between
  - Left: Small sparkle/Gemini icon (16px, `--primary`) + "Need help with this step?" (Nunito Regular 14px, `--text-secondary`)
  - Right: "Ask Assistant →" (Nunito SemiBold 14px, `--primary`) as a clickable text link with right arrow icon

When clicked: opens the Gemini panel (Surface 5) pre-loaded with context for this specific step.

---

### Deadline Display Within Steps

Each step shows a deadline row inside the expanded content, above the checklist:

- Row layout: Calendar icon + "Deadline:" label (Nunito SemiBold 13px, `--text-secondary`) + date value (Nunito Bold 14px, urgency color from Section 1.3) + urgency pill on right
- If missed: date shows in grey, strikethrough, + small "This deadline has passed" note below in `--text-muted` Regular 13px — non-shaming, just informative

---

## SURFACE 5 — GEMINI ASSISTANT PANEL

The Gemini assistant is the product's primary interaction layer. This panel must be designed with the same care as a core product screen — not as an afterthought.

---

### Always-Visible Floating Trigger Button

- **Position:** Fixed, bottom-right corner of screen. 24px from right edge. 24px from bottom edge.
- **Shape:** Pill (999px radius), NOT a circle FAB
- **Content:** Sparkle/Gemini icon (20px, white) + "Ask Assistant" label (Nunito Bold 14px, white)
- **Style:** `--primary` background fill. Floating button shadow. White text + icon.
- **Behavior:** Always visible. Never disappears on scroll. Never hides behind other content.
- **Mobile:** Same position. Ensure it doesn't overlap a "Complete Checklist" button — test on 375px viewport.

---

### Panel — Desktop (Slide-In from Right)

- **Width:** 380px fixed
- **Height:** 100vh (full screen height)
- **Position:** Fixed, right: 0, top: 0
- **Background:** `--bg-white`
- **Border radius:** 24px 0 0 24px (left edge only)
- **Shadow:** Floating panel shadow
- **Behavior:** Slides in from right (transform translateX from +380px to 0). 250ms ease-out. Does NOT push page content — overlays it.
- **Backdrop:** None on desktop (panel is narrow enough)

---

### Panel — Mobile (Slide-Up from Bottom)

- **Height:** 65vh
- **Width:** 100%
- **Position:** Fixed, bottom: 0
- **Background:** `--bg-white`
- **Border radius:** 24px 24px 0 0 (top corners only)
- **Shadow:** Floating panel shadow
- **Behavior:** Slides up from bottom (transform translateY from +65vh to 0). 250ms ease-out.
- **Backdrop:** Semi-transparent dark overlay behind panel (`rgba(0,0,0,0.4)`)

---

### Panel Anatomy

**1. Panel header (fixed at top, never scrolls):**
- Height: 64px
- Background: `--bg-white`
- 1px bottom border: `--border`
- Left: Sparkle icon (20px, `--primary`) + "ElectionPath Assistant" (Nunito Bold 16px, `--text-primary`)
- Below the title: "Powered by Gemini" (Nunito Regular 12px, `--text-muted`) with small Gemini logo
- Right: Close button — "✕" icon, 32×32px tap target, `--text-muted` color

**2. Context chip (appears only when triggered from a step — not when opened via floating button):**
- Appears directly below the header, above the conversation
- Pill shape, `--primary-light` background, `--primary` text, Nunito SemiBold 13px
- Content: "Step 2 · Register to Vote" (matches whichever step triggered the panel)
- 12px horizontal margin, 8px top margin

**3. Conversation thread area (scrollable):**
- Padding: 16px
- Scrolls independently — header and input bar stay fixed
- Starts with a welcome message from the assistant (see below)

**Welcome message bubble:**
- Left-aligned
- Background: `--bg-base`
- Border radius: 16px 16px 16px 4px (flat bottom-left)
- Padding: 12px 16px
- Text: "👋 Hi! I can answer any question about the voting process. What would you like to know?" — Nunito Regular 15px, `--text-primary`
- If triggered from a step, welcome message changes to: "You're on Step [X] — [Step Name]. What would you like to know about this?"

**User message bubbles:**
- Right-aligned
- Background: `--primary`
- Border radius: 16px 16px 4px 16px (flat bottom-right)
- Padding: 12px 16px
- Text: Nunito Regular 15px, white

**Assistant message bubbles:**
- Left-aligned
- Background: `--bg-base`
- Border radius: 16px 16px 16px 4px (flat bottom-left)
- Padding: 12px 16px
- Text: Nunito Regular 15px, `--text-primary`
- Max-width: 85% of panel width

**Loading state (while assistant is responding):**
- Left-aligned bubble in `--bg-base` with 3 animated dots (standard typing indicator)
- Dots animate in a wave pattern. Dot color: `--primary`.

**4. Input bar (fixed at bottom, never scrolls):**
- Height: 68px
- 1px top border: `--border`
- Background: `--bg-white`
- Padding: 10px 16px
- Input field: full width minus send button
  - Background: `--bg-base`
  - Border: 1px `--border`
  - Border radius: 12px
  - Height: 44px
  - Padding: 0 14px
  - Placeholder: "Type your question..." — Nunito Regular 15px, `--text-muted`
  - Focus: border `--border-focus` (2px)
- Send button: 44×44px, `--primary` background, 12px radius, white arrow/send icon. Primary shadow on hover. Disabled (grey, no shadow) when input is empty.

---

## SURFACE 6 — COMPLETION STATE

This appears when the user marks all 6 steps as complete.

---

### Layout

Replace the timeline content (not the full screen — header/nav stay) with a centered completion message.

**Icon:**
- Large centered illustration or icon
- A checkmark in a circle — `--primary` fill, white check — 80×80px
- Soft `--primary-light` glow ring behind it (optional radial gradient)

**Headline:**
- "You're ready to vote." — Nunito ExtraBold 40px, `--text-primary`, centered
- Subtext: "You've completed all 6 steps. You know exactly what to do." — Nunito Regular 18px, `--text-secondary`, centered

**Share CTA:**
- Button: "Share this guide with a friend" — Primary filled button, standard height, icon on left (share icon)
- Below button: small muted text — "No login required. Free for everyone." — Nunito Regular 13px, `--text-muted`

**No other content.** No upsell. No account creation ask. No social links. Nothing to distract from the moment. Clean exit.

---

## PART 3 — INTERACTIONS & ANIMATIONS

Keep all animations functional, purposeful, and fast. Nothing gratuitous.

| Interaction | Animation | Duration |
|---|---|---|
| Onboarding tile selected | Border + background fill transition | 150ms ease |
| Onboarding tile others deselected | Opacity drops to 60% | 150ms ease |
| CTA button clicked | Loading spinner inside button | 800ms, then transition |
| Election card hover | Shadow lift + translateY(-2px) | 150ms ease |
| Election card CTA click | Brief press state (scale 0.97) then navigate | 100ms |
| Timeline step expand | Height animates open | 200ms ease |
| Timeline step collapse | Height animates closed | 150ms ease |
| Checklist item checked | Checkbox fill animates, text fades slightly | 150ms ease |
| Step marked complete | Circle fills to checkmark, connector segment fills to primary | 250ms ease |
| Progress bar fill | Width animates to new percentage | 300ms ease |
| Gemini panel open (desktop) | translateX from +380px to 0 | 250ms ease-out |
| Gemini panel open (mobile) | translateY from +65vh to 0 | 250ms ease-out |
| Gemini panel close | Reverse of open | 200ms ease-in |
| Assistant response appears | Fade in (opacity 0 → 1) | 200ms ease |
| Completion state appears | Fade in entire section | 300ms ease |
| Status pill change | Cross-fade between states | 150ms ease |

---

## PART 4 — RESPONSIVENESS

Design at 3 breakpoints. Mobile-first.

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | 375px | Primary target. Most users will be on phones. |
| Tablet | 768px | Transitional. Some components shift to 2-column. |
| Desktop | 1280px | Full layout. 2-column sections unlock. |

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Navigation | Logo + hamburger | Logo + hamburger | Logo + 2 inline buttons |
| Hero layout | Stacked, centered | Stacked, centered | 2-col: text left, image right |
| "How It Works" cards | 1 column stack | 1 column stack | 3 columns horizontal |
| Election cards grid | 1 column | 2 columns | 2 columns |
| Election filter tabs | Horizontally scrollable | Inline row | Inline row |
| Onboarding tiles | 1 column stack, full-width | 2×2 grid | 2×2 grid |
| State dropdown | Full-width | 480px max-width | 480px max-width |
| Timeline step cards | Full-width, 16px margin | Max 600px centered | Max 720px centered |
| Gemini panel | Slides from bottom, 65vh | Slides from bottom, 55vh | Slides from right, 380px wide |
| Floating Gemini button | Bottom-right, 20px edge | Bottom-right, 24px edge | Bottom-right, 24px edge |
| Completion state | Full-width centered | Centered | Centered |

**Mobile-specific rules:**
- All CTA buttons: full-width on mobile
- All tap targets: minimum 48×48px
- Gemini input bar: ensure it lifts above the keyboard when the input is focused (use `env(safe-area-inset-bottom)` as padding note for developer)
- No hover states needed on mobile — design tap states (slight scale + opacity change) instead

---

## PART 5 — WHAT IS OUT OF SCOPE

Do not design any of the following. If asked, flag it.

- Login, signup, or account creation screens of any kind
- Candidate comparison or anything that shows political opinions
- News feed, election results, or live data
- Native iOS or Android app screens
- Admin or content management dashboard
- Email or push notification templates
- Dark mode (post-MVP)
- Multi-language interface (post-MVP)
- Any screen with maps, geolocation UI, or live search

---

## PART 6 — DESIGNER HANDOFF CHECKLIST

Complete all of these before handoff. No exceptions.

**Typography:**
- [ ] Every layer uses Nunito (check by running a font audit in Figma)
- [ ] All font sizes match the scale in Section 1.1
- [ ] No default system fonts anywhere

**Corners & Shape:**
- [ ] All cards use 20px radius
- [ ] All buttons use 14px radius
- [ ] All inputs use 12px radius
- [ ] All pills/chips use 999px radius
- [ ] Zero sharp corners anywhere in the file

**Color:**
- [ ] Color tokens from Section 1.3 used throughout — no ad-hoc hex values
- [ ] Deadline urgency colors applied correctly on step cards
- [ ] Election type tag colors applied correctly on election cards
- [ ] `--primary` not overused — reserved for CTAs and active states only

**Screens:**
- [ ] Surface 1 — Landing Page: all 6 sections complete (Nav, Hero, How It Works, Elections Preview, AI Callout, Footer)
- [ ] Surface 2 — Election Cards: filter row + full card grid + empty/fallback state
- [ ] Surface 3 — Onboarding: both questions + CTA + disabled state
- [ ] Surface 4 — Timeline: all 6 steps in all states (upcoming, active, completed, missed) + expanded states
- [ ] Surface 5 — Gemini Panel: desktop + mobile versions + all bubble states + loading state
- [ ] Surface 6 — Completion State

**Component states:**
- [ ] Election card: default, hover, happening now, registration closed
- [ ] Step card (collapsed): upcoming, active, completed, missed
- [ ] Step card (expanded): default expanded, checklist partial, checklist full (button active)
- [ ] Onboarding tile: default, selected, deselected (other)
- [ ] Primary button: default, hover, disabled, loading
- [ ] Gemini panel: desktop version, mobile version, context chip variant, no-context variant

**Responsiveness:**
- [ ] All surfaces designed at 375px (mobile)
- [ ] All surfaces designed at 1280px (desktop)
- [ ] Tablet (768px) layouts defined for key screens

**Interactions:**
- [ ] Hover states on all interactive elements (desktop)
- [ ] "Powered by Gemini" attribution present in panel header AND landing page
- [ ] Animation specs annotated on all interactive transitions

---

*ElectionPath — Complete Design Document. Single source of truth. All previous design files are superseded by this document.*

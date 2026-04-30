# ElectionPath — AI-Powered Election Guide

> **H2S Challenge Submission**
> A step-by-step, AI-assisted civic guide that helps confused voters navigate the US election process — built from scratch using AI-first development tooling (Stitch MCP, Gemini, Claude).

---

## Your Chosen Vertical

**Civic Tech / Voter Education**
The chosen vertical is civic engagement and voter education. The US election process is complex, and information is often fragmented across dozens of government sites. This project aims to simplify the process for first-time voters, new citizens, and lapsed voters by providing a structured, step-by-step path with an AI assistant that answers questions in plain language without any political bias.

---

## Approach and Logic

My approach was **problem-first, not tool-first**:
1. **Identify the Gap**: Most voter education tools are either too formal (government sites) or too opinionated (news sites). There was a need for a neutral, step-by-step guide with conversational AI support.
2. **Design Philosophy**: I aimed for a premium SaaS aesthetic rather than a government-website feel. A clean, modern, and trustworthy design helps reduce voter anxiety.
3. **AI-Driven Development**: I used AI tooling at every stage:
   - **Google's Stitch MCP**: Used to generate UI prototypes directly from design specs.
   - **Claude/Antigravity**: Used as an AI coding assistant to translate prototypes into a React application, handle Tailwind CSS configurations, and build the backend.
   - **Gemini**: Used to power the conversational AI assistant that answers voting questions in plain English.
4. **Structured Progression**: The logic relies on progressive unlocking. Users must complete a checklist for each step before moving on to the next, ensuring they don't miss critical prerequisites.

---

## How the Solution Works

**ElectionPath** is a single-page web application that guides users through the complete US election process in 6 clear steps:

1. **Check Eligibility** — Confirm citizenship, residency, and age requirements.
2. **Register to Vote** — File voter registration with your state.
3. **Understand Your Ballot** — Research candidates and ballot measures.
4. **Choose How to Vote** — In-person, early voting, or mail-in.
5. **Cast Your Vote** — Submit your ballot on Election Day.
6. **Track Your Vote & Results** — Verify your vote was counted.

### Architecture & Data Flow:
- **Frontend (React + Vite + Tailwind v4)**: The user selects an election from the home screen, which loads the 6-step timeline. Each step contains interactive checklists.
- **AI Chat Assistant (FastAPI + Gemini 1.5 Flash)**: An integrated chat widget allows users to ask questions. The frontend sends messages to the FastAPI backend, which proxies them to the Google Gemini API with a strict system prompt (ensuring neutrality and scoped knowledge).
- **Graceful Fallback**: If the Gemini API is unreachable, the frontend falls back to mock responses so the application remains functional.
- **Hosting**: The frontend is deployed on Firebase Hosting.

### How to Run Locally:

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export GEMINI_API_KEY="your-key-here"
uvicorn main:app --reload --port 8000
```

---

## Any Assumptions Made

1. **Session-Only Usage**: It is assumed that users want quick, low-friction answers. Therefore, there are no user accounts, login systems, or database persistence. All progress is kept in the local session.
2. **Mock Data Sufficiency**: For the MVP, state-specific data (for all 50 states + DC) is stored as static JSON (`data.js`), and election events are placeholders. It is assumed this static data is sufficient to demonstrate the core functionality and user flow.
3. **Neutrality as a Guardrail**: It is assumed that users value a strictly neutral guide. The Gemini system prompt is strictly bounded to refuse political opinions, candidate recommendations, and policy debates.
4. **Frontend Independence**: The frontend must work even if the backend is down. It is assumed that reviewers might not have API keys configured, so the mock fallback mechanism is essential for a smooth demonstration.

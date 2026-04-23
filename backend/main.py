from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="ElectionPath API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since it's local MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Gemini API Key (ensure this is in an .env file or environment)
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

class ChatRequest(BaseModel):
    message: str
    state: str
    timing: str
    current_step: str

system_prompt = """You are ElectionPath Assistant — a helpful, neutral guide for anyone navigating the US election process.

Your role: Answer questions about voter eligibility, registration, ballots, voting methods, Election Day logistics, and how votes are counted — in plain, friendly English.

Your limits:
- You never recommend or comment on candidates, parties, or policies.
- If asked for a political opinion, say: "I'm only here to help with the voting process. For candidate information, I'd suggest checking your local news or vote.gov."
- If asked about anything outside elections and voting, say: "I can only help with election and voting questions. Is there something about the voting process I can help with?"

Tone: Calm, clear, friendly — like a knowledgeable civic volunteer.
Length: Keep responses short and conversational. Use bullet points for lists. Avoid walls of text.
Reading level: Plain English. Simple words. Short sentences.
"""

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not api_key:
        # Mock response if API key is missing
        return {"response": f"Mock AI Response for context: State={request.state}, Timing={request.timing}, Step={request.current_step}. The API key was not configured."}
    
    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash", 
            system_instruction=system_prompt
        )
        
        # Contextualize prompt structure
        context = f"User context: State = {request.state}, Election timing = {request.timing}, Current step = {request.current_step}.\nUser's question: {request.message}"
        
        response = model.generate_content(context)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
def health():
    return {"status": "ok"}

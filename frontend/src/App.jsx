import { useState, useEffect } from 'react'
import './App.css'
import { stepsData, upcomingElections } from './data'
import TimelineStep from './components/TimelineStep'
import ChatWidget from './components/ChatWidget'

// ─── Election Cards (Home Screen) ───────────────────────────────────────────

function ElectionCard({ election, onSelect }) {
  return (
    <div
      onClick={() => onSelect(election)}
      className="bg-white rounded-2xl p-6 border border-outline-variant shadow-sm hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer flex flex-col group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-primary-container text-primary font-semibold text-xs rounded-full uppercase tracking-wider">{election.type}</span>
        <span className="text-text-muted text-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">calendar_today</span>
          {election.date}
        </span>
      </div>
      <h3 className="font-h2 text-xl text-on-surface mb-2 group-hover:text-primary transition-colors">{election.title}</h3>
      <p className="text-text-muted text-sm mb-6 flex-grow flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">location_on</span>
        {election.location}
      </p>
      <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
        View My Path
        <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
      </div>
    </div>
  )
}

function AppHeader() {
  return (
    <header className="bg-white dark:bg-slate-950 fixed top-0 w-full z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm font-['Plus_Jakarta_Sans'] antialiased">
      <div className="flex justify-between items-center h-16 w-full px-4 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">how_to_vote</span>
          <div className="text-xl font-extrabold tracking-tight text-[#4F6DFF] dark:text-white">ElectionPath</div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="font-semibold text-text-muted hover:text-primary cursor-pointer transition-colors">Resources</span>
          <span className="font-semibold text-text-muted hover:text-primary cursor-pointer transition-colors">Support</span>
        </div>
      </div>
    </header>
  )
}

function ElectionCards({ onSelectElection }) {
  return (
    <div className="bg-surface font-body-md text-text-main min-h-screen flex flex-col">
      <AppHeader />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 flex flex-col items-center max-w-5xl mx-auto w-full">
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-h1 text-h1 text-on-surface tracking-tight">Upcoming Elections</h1>
          <p className="font-body-lg text-text-muted max-w-lg mx-auto">Stay informed about your local, state, and federal representation. Your path to voting starts here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {upcomingElections.map(election => (
            <ElectionCard key={election.id} election={election} onSelect={onSelectElection} />
          ))}
        </div>

        <div className="mt-16 bg-surface-container-low w-full rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between border border-outline-variant">
          <div>
            <h3 className="font-h2 text-xl text-on-surface mb-2">Looking for something else?</h3>
            <p className="text-text-muted">Search by zip code to find upcoming ballot measures and local issues in your specific area.</p>
          </div>
          <div className="mt-6 md:mt-0 flex w-full md:w-auto gap-2">
            <input type="text" placeholder="Enter Zip Code" className="px-4 py-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary focus:outline-none w-full md:w-48" />
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">Search</button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-outline-variant py-8 px-6 text-center">
        <p className="text-text-muted text-sm mb-4">&copy; 2024 ElectionPath. Designed for clarity and civic pride.</p>
        <div className="flex justify-center gap-6 text-sm font-medium text-text-main">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
          <a href="#" className="hover:text-primary">FAQ</a>
          <a href="#" className="hover:text-primary">Accessibility</a>
        </div>
      </footer>
    </div>
  )
}

// ─── Chat logic ──────────────────────────────────────────────────────────────

const MOCK_REPLY_DEFAULT = "I'm a mock assistant! To give you a real answer, please connect me to a backend API. For now, I can tell you that checking your eligibility is the most important first step!"
const MOCK_REPLY_ID = "For most states, you'll need a valid state-issued driver's license or ID card. If you don't have one, you can often use the last 4 digits of your Social Security Number."

async function fetchChatReply(userMessage, stepContext) {
  const response = await fetch('http://localhost:8000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage, state: 'User State', step_context: stepContext }),
  })
  if (!response.ok) throw new Error('Network response was not ok')
  const data = await response.json()
  return data.reply
}

function getMockReply(lastUserMessage) {
  return lastUserMessage.toLowerCase().includes('id') ? MOCK_REPLY_ID : MOCK_REPLY_DEFAULT
}

// ─── Timeline ────────────────────────────────────────────────────────────────

function Timeline({ activeElection, onBack }) {
  const [completedSteps, setCompletedSteps] = useState([])
  const [expandedStep, setExpandedStep] = useState(1)
  const [checkedTodos, setCheckedTodos] = useState({})

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const initialTodos = {}
    stepsData.forEach(step => { if (step.todos) initialTodos[step.id] = [] })
    setCheckedTodos(initialTodos)
  }, [])

  const handleTodoToggle = (stepId, todoId) => {
    setCheckedTodos(prev => {
      const current = prev[stepId] || []
      const updated = current.includes(todoId)
        ? current.filter(id => id !== todoId)
        : [...current, todoId]
      return { ...prev, [stepId]: updated }
    })
  }

  const markStepDone = (id) => {
    if (!completedSteps.includes(id)) setCompletedSteps([...completedSteps, id])
    setExpandedStep(id < stepsData.length ? id + 1 : null)
  }

  const openChatWithContext = (step) => {
    setChatMessages([{
      role: 'assistant',
      content: `Hi! Let's talk about **Step ${step.id}: ${step.title}**. What questions do you have?`,
    }])
    setIsChatOpen(true)
  }

  const sendChatMessage = async () => {
    if (!userInput.trim()) return
    const newMsgs = [...chatMessages, { role: 'user', content: userInput }]
    setChatMessages(newMsgs)
    setUserInput('')
    setIsTyping(true)

    const stepContext = expandedStep ? stepsData.find(s => s.id === expandedStep)?.title : 'General Journey'
    try {
      const reply = await fetchChatReply(userInput, stepContext)
      setChatMessages([...newMsgs, { role: 'assistant', content: reply }])
    } catch {
      setTimeout(() => {
        const reply = getMockReply(newMsgs[newMsgs.length - 1].content)
        setChatMessages([...newMsgs, { role: 'assistant', content: reply }])
        setIsTyping(false)
      }, 1500)
      return
    }
    setIsTyping(false)
  }

  const highestCompleted = completedSteps.reduce((max, val) => Math.max(max, val), 0)
  const progressPercent = Math.round((completedSteps.length / stepsData.length) * 100)
  const progressLabel = completedSteps.length === stepsData.length
    ? "You're ready to vote!"
    : `You're making great progress! ${completedSteps.length} of ${stepsData.length} steps completed.`

  return (
    <div className="bg-surface font-body-md text-text-main min-h-screen">
      <header className="bg-white dark:bg-slate-950 fixed top-0 w-full z-40 border-b border-slate-100 dark:border-slate-800 shadow-sm font-['Plus_Jakarta_Sans'] antialiased">
        <div className="flex justify-between items-center h-16 w-full px-4 md:px-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-text-muted hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex items-center gap-2 border-l border-outline-variant pl-4">
              <span className="material-symbols-outlined text-primary text-2xl">how_to_vote</span>
              <div className="text-xl font-extrabold tracking-tight text-[#4F6DFF] dark:text-white">ElectionPath</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm">{activeElection?.title}</span>
            <span className="font-semibold text-on-surface-variant bg-surface-variant px-4 py-1.5 rounded-full text-sm">{activeElection?.date}</span>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-32 px-4 max-w-3xl mx-auto relative">
        <div className="mb-12 text-center">
          <h1 className="font-h1 text-4xl text-on-surface mb-3 tracking-tight">Your personalized path to the ballot box.</h1>
          <p className="text-text-muted font-body-lg mb-8">{progressLabel}</p>
          <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden shadow-inner">
            <div className="bg-urgency-safe h-full rounded-full transition-all duration-500 relative" style={{ width: `${progressPercent}%` }}>
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="relative space-y-8 timeline-axis">
          {stepsData.map(step => (
            <TimelineStep
              key={step.id}
              step={step}
              isCompleted={completedSteps.includes(step.id)}
              isExpanded={expandedStep === step.id}
              isLocked={step.id > highestCompleted + 1}
              checkedTodos={checkedTodos[step.id]}
              onToggle={handleTodoToggle}
              onExpand={setExpandedStep}
              onMarkDone={markStepDone}
              onAskAI={openChatWithContext}
            />
          ))}
        </div>
      </main>

      {isChatOpen && (
        <ChatWidget
          messages={chatMessages}
          isTyping={isTyping}
          userInput={userInput}
          onInputChange={e => setUserInput(e.target.value)}
          onSend={sendChatMessage}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeElection, setActiveElection] = useState(null)

  if (!activeElection) {
    return <ElectionCards onSelectElection={setActiveElection} />
  }

  return <Timeline activeElection={activeElection} onBack={() => setActiveElection(null)} />
}

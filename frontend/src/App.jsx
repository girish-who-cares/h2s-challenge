import { useState } from 'react';
import './App.css';
import { statesData, timingOptions, stepsData } from './data';

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [timing, setTiming] = useState('');
  const [usState, setUsState] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Status mapping based on urgency
  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'Completed';
    const t = timingOptions.find(t => t.id === timing);
    if (!t) return 'Upcoming';
    
    // Simplistic mockup logic for urgency
    if (t.id === 'past') return 'Missed';
    if (t.id === 'days' && stepId === 2) return 'Action Needed'; // registration might be missed
    return 'Upcoming';
  };

  const getBadgeColor = (stepId) => {
    const status = getStepStatus(stepId);
    if (status === 'Completed') return 'var(--urgency-safe)';
    if (status === 'Missed') return 'var(--urgency-muted)';
    if (status === 'Action Needed') return 'var(--urgency-critical)';
    
    // Default based on timing
    const t = timingOptions.find(t => t.id === timing);
    if (t) {
      if (t.id === 'days') return 'var(--urgency-critical)';
      if (t.id === 'weeks') return 'var(--urgency-warning)';
    }
    return 'var(--urgency-safe)';
  };

  const handleStartOnboarding = () => {
    if (timing && usState) {
      setOnboardingComplete(true);
    }
  };

  const markStepDone = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const askAssistant = async (prefillMsg = null) => {
    const messageToSend = prefillMsg || chatInput;
    if (!messageToSend) return;
    
    setChatMessages([...chatMessages, { role: 'user', content: messageToSend }]);
    setChatInput('');
    setIsLoading(true);

    try {
      const resp = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          state: statesData[usState]?.name || usState,
          timing: timing,
          current_step: stepsData.find(s => s.id === activeStep)?.title || "General"
        })
      });
      const data = await resp.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (e) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't connect to the server right now." }]);
    }
    setIsLoading(false);
  };

  const openChatForStep = (step) => {
    setChatOpen(true);
    setActiveStep(step.id);
    const contextStr = `You're looking at ${step.title}. What would you like to know?`;
    setChatMessages([{ role: 'assistant', content: contextStr }]);
  };

  if (!onboardingComplete) {
    return (
      <div className="container onboarding-container">
        <h1>Welcome to ElectionPath</h1>
        <p>A simple, clear guide to voting.</p>
        
        <div className="card">
          <h2>When is your election?</h2>
          <div className="tiles">
            {timingOptions.map(opt => (
              <button 
                key={opt.id}
                className={timing === opt.id ? 'button-primary' : 'button-outline'}
                onClick={() => setTiming(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <h2 style={{ marginTop: '24px' }}>Which state are you in?</h2>
          <select 
            value={usState} 
            onChange={(e) => setUsState(e.target.value)}
            className="state-select"
          >
            <option value="">Select a state...</option>
            {Object.keys(statesData).map(code => (
              <option key={code} value={code}>{statesData[code].name}</option>
            ))}
          </select>

          <div style={{ marginTop: '32px' }}>
            <button className="button-primary" onClick={handleStartOnboarding} disabled={!timing || !usState}>
              Show My Election Path
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = (completedSteps.length / stepsData.length) * 100;

  if (completedSteps.length === stepsData.length) {
    return (
      <div className="container center-text">
        <h1>You're ready to vote!</h1>
        <p>You've completed all the steps in your ElectionPath.</p>
        <button className="button-primary" onClick={() => alert("Copied to clipboard!")}>Share this guide with a friend</button>
      </div>
    );
  }

  return (
    <div className="container main-container">
      <div className="header">
        <h1>Your Election Path</h1>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p>{completedSteps.length} of 6 steps completed</p>
      </div>

      <div className="timeline">
        {stepsData.map((step) => {
          const isExpanded = activeStep === step.id;
          const status = getStepStatus(step.id);
          const badgeColor = getBadgeColor(step.id);

          return (
            <div key={step.id} className={`step-card ${isExpanded ? 'expanded' : ''}`}>
              <div className="step-header" onClick={() => setActiveStep(step.id)}>
                <div className="step-number">{step.id}</div>
                <div className="step-title">
                  <h3>{step.title}</h3>
                  <span className="status-badge" style={{ backgroundColor: badgeColor }}>
                    {getStepStatus(step.id)}
                  </span>
                </div>
              </div>
              
              {isExpanded && (
                <div className="step-details">
                  <p>{step.description}</p>
                  
                  {step.id === 2 && usState && (
                    <div className="state-info">
                      <p><strong>Deadline:</strong> {statesData[usState].deadline}</p>
                      <a href={statesData[usState].link} target="_blank" rel="noreferrer" className="button-outline" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '8px' }}>
                        Official Registration Portal
                      </a>
                    </div>
                  )}

                  <div className="step-actions">
                    <button className="button-text" onClick={() => openChatForStep(step)}>
                      Ask the assistant about this step →
                    </button>
                    {!completedSteps.includes(step.id) && (
                      <button className="button-primary" style={{marginLeft: 'auto'}} onClick={() => markStepDone(step.id)}>
                        Mark as Done
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {chatOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <h3>ElectionPath Assistant</h3>
            <button className="close-btn" onClick={() => setChatOpen(false)}>×</button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`msg ${msg.role}`}>
                <span>{msg.content}</span>
              </div>
            ))}
            {isLoading && <div className="msg assistant">...</div>}
          </div>
          <div className="chat-input-area">
            <input 
              value={chatInput} 
              onChange={e => setChatInput(e.target.value)} 
              placeholder="Ask anything about the process..."
              onKeyDown={e => e.key === 'Enter' && askAssistant()}
            />
            <button onClick={() => askAssistant()}>Send</button>
          </div>
        </div>
      )}

      {!chatOpen && (
        <button className="floating-chat-btn" onClick={() => setChatOpen(true)}>
          Ask a Question
        </button>
      )}
    </div>
  );
}

export default App;

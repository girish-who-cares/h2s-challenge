import { useRef, useEffect } from 'react'

const AI_ICON = 'temp_preferences_custom'

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
        <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{AI_ICON}</span>
      </div>
      <div className="max-w-[80%] p-4 text-[15px] bg-white border border-outline-variant/30 text-text-muted rounded-3xl rounded-tl-sm flex gap-1.5 items-center h-12">
        <div className="w-2 h-2 bg-text-muted/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-text-muted/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-text-muted/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

function ChatMessage({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
          <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{AI_ICON}</span>
        </div>
      )}
      <div className={`max-w-[85%] p-4 text-[15px] leading-relaxed shadow-sm ${isUser ? 'bg-surface-container-high text-on-surface rounded-3xl rounded-br-sm' : 'bg-white border border-outline-variant/30 text-on-surface rounded-3xl rounded-tl-sm'}`}>
        {msg.content}
      </div>
    </div>
  )
}

export default function ChatWidget({ messages, isTyping, userInput, onInputChange, onSend, onClose }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSend()
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100%-32px)] md:w-[400px] h-[600px] max-h-[calc(100vh-32px)] bg-surface rounded-3xl shadow-2xl border border-outline-variant/60 overflow-hidden flex flex-col animate-fade-in origin-bottom-right">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-outline-variant/30 p-4 flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{AI_ICON}</span>
          </div>
          <div>
            <h3 className="font-semibold text-on-surface text-[15px] leading-tight tracking-tight">Election Assistant</h3>
            <p className="text-text-muted text-[11px] font-medium">Powered by AI</p>
          </div>
        </div>
        <button onClick={onClose} className="text-text-muted hover:bg-surface-variant hover:text-on-surface w-8 h-8 rounded-full transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-surface/50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4 opacity-50">
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{AI_ICON}</span>
            <p className="text-sm">Hi! How can I help you with your election path today?</p>
          </div>
        )}
        {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-outline-variant/30 z-10 sticky bottom-0">
        <div className="flex gap-2 bg-surface px-2 py-2 rounded-full border border-outline-variant/50 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all shadow-sm">
          <input
            className="flex-1 bg-transparent px-4 py-2 text-[15px] border-none focus:ring-0 focus:outline-none placeholder:text-text-muted/70 m-0"
            placeholder="Ask a question..."
            value={userInput}
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${userInput.trim() ? 'bg-primary text-white shadow-md hover:bg-primary/90 scale-100' : 'bg-transparent text-text-muted/50 scale-90'}`}
            onClick={onSend}
            disabled={!userInput.trim()}
          >
            <span className="material-symbols-outlined text-[20px]" style={userInput.trim() ? { fontVariationSettings: "'FILL' 1" } : {}}> send</span>
          </button>
        </div>
        <p className="text-center text-[10px] text-text-muted mt-3 font-medium">Assistant can make mistakes. Verify important info.</p>
      </div>
    </div>
  )
}

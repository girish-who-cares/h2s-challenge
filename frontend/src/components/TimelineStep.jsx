function StepIcon({ icon, isCompleted }) {
  return (
    <span
      className="material-symbols-outlined text-2xl"
      style={isCompleted ? { fontVariationSettings: "'FILL' 1", fontWeight: 700 } : {}}
    >
      {icon}
    </span>
  )
}

function TodoItem({ todo, isChecked, onToggle }) {
  return (
    <label className={`flex items-center gap-4 p-4 rounded-xl border relative cursor-pointer hover:border-primary transition-all duration-200 ${isChecked ? 'bg-primary/5 border-primary/40 shadow-sm' : 'bg-surface border-outline-variant hover:shadow-sm'}`}>
      <input
        type="checkbox"
        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 transition-colors"
        checked={isChecked}
        onChange={onToggle}
      />
      <span className={`font-medium text-base ${isChecked ? 'line-through text-text-muted' : 'text-on-surface'}`}>{todo.text}</span>
    </label>
  )
}

function ImportantLinks({ links }) {
  if (!links || links.length === 0) return null
  return (
    <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 h-full flex flex-col">
      <h4 className="font-bold text-primary mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">link</span>
        Important Links
      </h4>
      <div className="space-y-3 flex-grow">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 bg-white rounded-xl border border-outline-variant hover:border-primary hover:shadow-sm transition-all group"
          >
            <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{link.title}</span>
            <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px]">open_in_new</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function getStepStyles(isCompleted, isLocked, isExpanded) {
  const card = 'flex-grow rounded-2xl transition-all duration-300 ease-in-out '
  const icon = 'flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-md border-4 border-surface z-10 transition-all duration-300 '

  if (isCompleted) return {
    card: card + 'bg-success-bg p-6 border border-urgency-safe/20 shadow-sm hover:shadow-md',
    icon: icon + 'bg-urgency-safe text-white',
    iconName: 'check',
  }
  if (isLocked) return {
    card: card + 'bg-slate-50 p-6 border border-slate-200 shadow-sm opacity-60 grayscale cursor-not-allowed',
    icon: icon + 'bg-slate-200 text-slate-500',
    iconName: 'lock',
  }
  if (isExpanded) return {
    card: card + 'bg-white p-8 border-2 border-primary shadow-xl scale-[1.01] ring-4 ring-primary/5',
    icon: icon + 'bg-primary text-white scale-110',
    iconName: 'edit_calendar',
  }
  return {
    card: card + 'bg-white/80 p-6 border border-outline-variant shadow-sm hover:border-primary/50 hover:shadow-md cursor-pointer',
    icon: icon + 'bg-surface-container-highest text-outline',
    iconName: 'menu_book',
  }
}

export default function TimelineStep({ step, isCompleted, isExpanded, isLocked, checkedTodos, onToggle, onExpand, onMarkDone, onAskAI }) {
  const stepTodos = step.todos || []
  const checkedCount = checkedTodos?.length || 0
  const allTodosChecked = stepTodos.length > 0 ? checkedCount === stepTodos.length : true
  const { card, icon, iconName } = getStepStyles(isCompleted, isLocked, isExpanded)

  const handleCardClick = () => {
    if (!isLocked && !isExpanded) onExpand(step.id)
    else if (isExpanded) onExpand(null)
  }

  const labelColor = isCompleted ? 'text-urgency-safe' : isExpanded ? 'text-primary' : 'text-text-muted'

  return (
    <div className="relative z-10 flex gap-6 group">
      <div className={icon}>
        <StepIcon icon={iconName} isCompleted={isCompleted} />
      </div>

      <div className={card} onClick={handleCardClick}>
        <div className="flex justify-between items-start mb-2">
          <span className={`font-semibold tracking-wider text-xs uppercase ${labelColor}`}>Step {step.id}</span>
          {isCompleted && <span className="text-xs font-bold bg-urgency-safe/10 text-urgency-safe px-3 py-1 rounded-full uppercase tracking-wider">Done</span>}
        </div>

        <h2 className={`font-h2 text-2xl ${isCompleted ? 'text-on-surface/60 line-through' : 'text-on-surface'}`}>{step.title}</h2>
        {!isExpanded && <p className="text-text-muted text-base mt-2">{step.description}</p>}

        {isExpanded && !isLocked && (
          <div className="mt-6 animate-fade-in cursor-default space-y-6" onClick={e => e.stopPropagation()}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wide">What to do</h4>
                  <p className="text-body-lg text-on-surface-variant leading-relaxed">{step.whatToDo}</p>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wide">How to do it</h4>
                  <p className="text-body-lg text-on-surface-variant leading-relaxed">{step.howToDo}</p>
                </div>

                {stepTodos.length > 0 && (
                  <div className="pt-4 border-t border-outline-variant/30">
                    <h4 className="font-bold text-on-surface mb-4 text-sm uppercase tracking-wide">Checklist</h4>
                    <div className="space-y-3">
                      {stepTodos.map(todo => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          isChecked={checkedTodos?.includes(todo.id)}
                          onToggle={() => onToggle(step.id, todo.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-1">
                <ImportantLinks links={step.links} />
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-outline-variant/30 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center text-sm">
                <span className="text-text-muted font-medium mr-2">Need help?</span>
                <button onClick={() => onAskAI(step)} className="text-primary font-bold hover:underline transition-colors">
                  Ask AI
                </button>
              </div>

              <button
                className={`w-full md:w-auto shrink-0 px-8 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${allTodosChecked ? 'bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg' : 'bg-surface-container text-text-muted cursor-not-allowed'}`}
                disabled={!allTodosChecked}
                onClick={() => onMarkDone(step.id)}
              >
                {allTodosChecked ? 'Mark Step as Done' : `Complete Checklist (${checkedCount}/${stepTodos.length})`}
                {allTodosChecked && <span className="material-symbols-outlined text-[20px]">check_circle</span>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

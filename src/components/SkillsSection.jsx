import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations/translations'
import '../Styles/SkillsSection.css'

function SkillsSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentDirectory, setCurrentDirectory] = useState('~')
  const [terminalInput, setTerminalInput] = useState('')
  const [hasExecutedCommand, setHasExecutedCommand] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [commandHistory, setCommandHistory] = useState([{ 
    type: 'welcome', 
    content: t.skills.welcomeMessage, 
    timestamp: Date.now(),
    id: 1
  }])

  const directories = {
    frontend: 'frontend',
    backend: 'backend', 
    tools: 'tools',
    android: 'android',
    database: 'database',
    desktopTools: 'desktop-tools'
  }

  const SKILLS_DIR = 'skills'

  const isSkillsDirectory = (dirName) => dirName === SKILLS_DIR

  const handleCommand = (command) => {
    if (command.trim() === '') return

    const newHistoryItem = { 
      command, timestamp: Date.now(), type: 'command', output: [],
      directory: currentDirectory, 
      id: commandHistory.length > 0 ? Math.max(...commandHistory.map(item => item.id || 0)) + 1 : 1
    }
    let response = null

    switch (true) {
      case command === 'exit':
        setCommandHistory([{ type: 'welcome', content: t.skills.welcomeMessage, timestamp: Date.now(), id: 1 }])
        setSelectedCategory(null); setCurrentDirectory('~'); setErrorMessage(''); setHasExecutedCommand(false)
        return

      case command === 'clear':
        setCommandHistory([]); setSelectedCategory(null); setCurrentDirectory('~'); setErrorMessage(''); setHasExecutedCommand(true)
        return

      case command === 'ls' && currentDirectory === '~':
        response = { type: 'file-list', content: `${SKILLS_DIR}/` }
        break

      case command === 'ls' && isSkillsDirectory(currentDirectory):
        response = { type: 'file-list', content: Object.values(directories).map(dir => `${dir}.txt`).join('\n') }
        break

      case command.startsWith('cd '): {
        const target = command.slice(3).trim()
        if (target === '~' || target === '') setCurrentDirectory('~')
        else if (isSkillsDirectory(target)) setCurrentDirectory(SKILLS_DIR)
        else response = { type: 'error', content: command, message: 'directory not found', suggestion: "Type 'ls' to see available directories" }
        return
      }

      case command.startsWith('cat '): {
        const file = command.slice(4).trim()
        if (isSkillsDirectory(currentDirectory)) {
          const key = Object.keys(directories).find(k => `${directories[k]}.txt` === file)
          response = key ? { type: 'skill', content: t.skills.responses[key], category: key }
            : { type: 'error', content: command, message: 'no such file or directory', suggestion: "Use 'ls' to see available files" }
        } else {
          response = { type: 'error', content: command, message: 'no such file or directory', suggestion: `Navigate to '${SKILLS_DIR}' first: cd ${SKILLS_DIR}` }
        }
        break
      }

      default:
        response = { type: 'error', content: command, message: t.skills.errorMessages.commandNotFound, suggestion: t.skills.errorMessages.helpSuggestion }
    }

    setCommandHistory(prev => [...prev, { ...newHistoryItem, output: [response] }])
    setHasExecutedCommand(true)
  }

  const handleTabCompletion = () => {
    const input = terminalInput.trim(); let prefix = '', suggestions = []
    if (input.includes(' ')) {
      const [cmd, arg] = input.split(/\s+(.+)/)
      if (cmd === 'cd') suggestions = currentDirectory === '~' ? [SKILLS_DIR] : ['~'], prefix = 'cd '
      if (cmd === 'cat' && isSkillsDirectory(currentDirectory)) suggestions = Object.values(directories).map(d => `${d}.txt`), prefix = 'cat '
      const matches = suggestions.filter(i => i.startsWith(arg))
      if (matches.length === 1) setTerminalInput(prefix + matches[0])
    } else {
      const base = ['ls','clear','exit','cd ','cat ']
      const matches = base.filter(c => c.startsWith(input))
      if (matches.length === 1) setTerminalInput(matches[0])
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Tab') { e.preventDefault(); handleTabCompletion() } }
  const handleKeyPress = (e) => { if (e.key === 'Enter') { handleCommand(terminalInput.trim()); setTerminalInput('') } }

  return (
    <div className="page-container"><section className="skills-section"><div className="container"><div className="terminal-container">
      <div className="terminal-output" onClick={() => document.querySelector('.terminal-input')?.focus()}>
        <div className="terminal-content">
          {commandHistory.map(item => (
            <div key={item.id} className="terminal-response">
              {item.type === 'welcome' ? <div className="welcome-message">{item.content}</div> : (
                <>
                  <div className="terminal-input-line">
                    <span className="terminal-prompt">user@portfolio:{item.directory || '~'}$</span>
                    {item.command && <span className="command-text">{item.command}</span>}
                  </div>
                  {item.output?.map((out,i) => (
                    <div key={i} className="output-content">
                      {out.type === 'skill' && <div className="skill-content">{out.content}</div>}
                      {out.type === 'file-list' && <div className="file-list-content">{out.content}</div>}
                      {out.type === 'error' && <div className="error-content"><div className="error-message">bash: {out.content}: {out.message}</div><div className="error-suggestion">{out.suggestion}</div></div>}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
          <div className="terminal-input-container"><div className="terminal-input-line">
            <span className="terminal-prompt">user@portfolio:{currentDirectory}$</span>
            <input type="text" value={terminalInput} onChange={e => setTerminalInput(e.target.value)} onKeyDown={handleKeyDown} onKeyPress={handleKeyPress} className="terminal-input" autoComplete="off" autoFocus spellCheck="false"/>
          </div></div>
        </div>
      </div>
    </div></div></section></div>
  )
}

export default SkillsSection;

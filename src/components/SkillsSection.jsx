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

  const handleCommand = (command) => {
    if (command.trim() === '') {
      return
    }

    const newHistoryItem = { 
      command, 
      timestamp: Date.now(),
      type: 'command',
      output: [],
      directory: currentDirectory, 
      id: commandHistory.length > 0 ? Math.max(...commandHistory.map(item => item.id || 0)) + 1 : 1
    }

    if (command === 'exit') {
      setCommandHistory([{ type: 'welcome', content: t.skills.welcomeMessage }])
      setSelectedCategory(null)
      setCurrentDirectory('~')
      setErrorMessage('')
      setHasExecutedCommand(false)
      return
    }

    if (command === 'clear') {
      setCommandHistory([])
      setSelectedCategory(null)
      setCurrentDirectory('~')
      setErrorMessage('')
      setHasExecutedCommand(true)
      return
    }

    let response = null
    
    if (command === 'ls') {
      if (currentDirectory === '~') {
    
        response = {
          type: 'file-list',
          content: 'competencias/'
        }
      } else if (currentDirectory === 'competencias') {
        
        const fileList = Object.values(directories).map(dir => `${dir}.txt`).join('\n')
        response = {
          type: 'file-list',
          content: fileList
        }
      } else {
       
        const category = Object.keys(directories).find(key => directories[key] === currentDirectory)
        if (category) {
          response = {
            type: 'file-list',
            content: `${currentDirectory}.txt`
          }
        }
      }
    } else if (command.startsWith('cd ')) {
      const targetDir = command.substring(3).trim()
      if (targetDir === '~' || targetDir === '') {
        setCurrentDirectory('~')
        // No output message - just change directory silently
        return
      } else if (targetDir === 'competencias') {
        setCurrentDirectory('competencias')
        // No output message - just change directory silently
        return
      } else {
        response = {
          type: 'error',
          content: command,
          message: 'directory not found',
          suggestion: "Type 'ls' to see available directories"
        }
      }
    } else if (command.startsWith('cat ')) {
      const filename = command.substring(4).trim()
      
      if (currentDirectory === 'competencias') {

        const categoryKey = Object.keys(directories).find(key => `${directories[key]}.txt` === filename)
        
        if (categoryKey) {
          response = {
            type: 'skill',
            content: t.skills.responses[categoryKey],
            category: categoryKey
          }
        } else {
          response = {
            type: 'error',
            content: command,
            message: 'no such file or directory',
            suggestion: "Use 'ls' to see available files"
          }
        }
      } else {
        response = {
          type: 'error',
          content: command,
          message: 'no such file or directory',
          suggestion: "Navigate to 'competencias' directory first: cd competencias"
        }
      }
    } else if (command === 'cat') {
      response = {
        type: 'error',
        content: command,
        message: 'missing filename',
        suggestion: "Usage: cat <filename>. Use 'ls' to see available files"
      }
    } else {
      response = {
        type: 'error',
        content: command,
        message: t.skills.errorMessages.commandNotFound,
        suggestion: t.skills.errorMessages.helpSuggestion
      }
    }


    setCommandHistory(prev => [
      ...prev,
      { ...newHistoryItem, output: [response] }
    ])
    setHasExecutedCommand(true)
  }

  const handleTabCompletion = () => {
    const input = terminalInput.trim()
    let suggestions = []
    let prefix = ''

    if (input.includes(' ')) {
      const parts = input.split(' ')
      const command = parts[0]
      const arg = parts.slice(1).join(' ')
      
      if (command === 'cd') {
        if (currentDirectory === '~') {
          suggestions = ['competencias']
        } else if (currentDirectory === 'competencias') {
          suggestions = ['~']
        }
        prefix = 'cd '
      } else if (command === 'cat') {
        if (currentDirectory === 'competencias') {
          const files = Object.values(directories).map(dir => `${dir}.txt`)
          suggestions = files
        }
        prefix = 'cat '
      }
      
      const matches = suggestions.filter(item => item.startsWith(arg))
      
      if (matches.length === 1) {
        setTerminalInput(prefix + matches[0])
      } else if (matches.length > 1) {
        const commonPrefix = matches.reduce((common, match) => {
          let result = ''
          for (let i = 0; i < Math.min(common.length, match.length); i++) {
            if (common[i] === match[i]) {
              result += common[i]
            } else {
              break
            }
          }
          return result
        })
        
        if (commonPrefix.length > arg.length) {
          setTerminalInput(prefix + commonPrefix)
        }
      }
    } else {

      const baseCommands = ['ls', 'clear', 'exit', 'cd ', 'cat ']
      const matches = baseCommands.filter(cmd => cmd.startsWith(input))
      
      if (matches.length === 1) {
        setTerminalInput(matches[0])
      } else if (matches.length > 1) {
        const commonPrefix = matches.reduce((common, match) => {
          let result = ''
          for (let i = 0; i < Math.min(common.length, match.length); i++) {
            if (common[i] === match[i]) {
              result += common[i]
            } else {
              break
            }
          }
          return result
        })
        
        if (commonPrefix.length > input.length) {
          setTerminalInput(commonPrefix)
        }
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      e.stopPropagation()
      handleTabCompletion()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.trim()
      if (command) {
        handleCommand(command)
        setTerminalInput('')
      } else {
  
        setCommandHistory(prev => [
          ...prev,
          { 
            type: 'empty', 
            timestamp: Date.now(),
            directory: currentDirectory,
            id: prev.length > 0 ? Math.max(...prev.map(item => item.id || 0)) + 1 : 1
          }
        ])
      }
    }
  }

  return (
    <div className="page-container">
      <section className="skills-section">
        <div className="container">
          <div className="terminal-container">
            {!hasExecutedCommand && (
              <div className="terminal-welcome">
              </div>
            )}


            <div 
              className="terminal-output"
              onClick={() => {
                const input = document.querySelector('.terminal-input');
                if (input) input.focus();
              }}
            >
              <div className="terminal-content">
                {commandHistory.map((historyItem) => (
                  <div key={historyItem.id || historyItem.timestamp} className="terminal-response">
                    {historyItem.type === 'empty' ? (
                      <div className="terminal-input-line">
                        <span className="terminal-prompt">user@portfolio:{historyItem.directory || '~'}$</span>
                      </div>
                    ) : historyItem.type === 'welcome' ? (
                      <div className="welcome-message">{historyItem.content}</div>
                    ) : (
                      <>
                        <div className="terminal-input-line">
                          <span className="terminal-prompt">user@portfolio:{historyItem.directory || '~'}$</span>
                          <span className="command-text">{historyItem.command}</span>
                        </div>
                        {historyItem.output && historyItem.output.map((output, i) => (
                          <div key={i} className="output-content">
                            {output.type === 'help' && (
                              <div className="help-commands">
                                {output.output.map((item, idx) => (
                                  <div key={idx} className="help-command-item">
                                    <span className="help-command-name">{item.command}</span>
                                    <span className="help-command-desc">{item.description}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {output.type === 'skill' && (
                              <div className="skill-content">{output.content}</div>
                            )}
                            {output.type === 'success' && (
                              <div className="success-content">{output.content}</div>
                            )}
                            {output.type === 'file-list' && (
                              <div className="file-list-content">{output.content}</div>
                            )}
                            {output.type === 'error' && (
                              <div className="error-content">
                                <div className="error-message">bash: {output.content}: {output.message}</div>
                                <div className="error-suggestion">{output.suggestion}</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
        
                <div className="terminal-input-container">
                  <div className="terminal-input-line">
                    <span className="terminal-prompt">user@portfolio:{currentDirectory}$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onKeyDown={handleKeyDown}
                      className="terminal-input"
                      autoComplete="off"
                      autoFocus
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SkillsSection;
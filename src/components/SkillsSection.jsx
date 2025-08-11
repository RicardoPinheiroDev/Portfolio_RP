import { useState, useEffect, useMemo, useRef } from 'react'
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
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(null)

  const directories = {
    frontend: 'frontend',
    backend: 'backend', 
    tools: 'tools',
    android: 'android',
    database: 'database',
    desktopTools: 'desktop-tools'
  }

  // Localized directory names
  const SKILLS_DIR = t?.skills?.dirName || 'skills'
  const PROJECTS_DIR = t?.projects?.dirName || 'projects'
  const LINKS_DIR = t?.projects?.linksDirName || 'links'

  const isSkillsDirectory = (dirName) => dirName === SKILLS_DIR
  const isProjectsDirectory = (dirName) => dirName === PROJECTS_DIR
  const isProjectsRoot = (dirName) => dirName === PROJECTS_DIR
  const isProjectAliasDir = (dirName) => dirName.startsWith(`${PROJECTS_DIR}/`) && dirName.split('/').length === 2
  const isProjectLinksDir = (dirName) => dirName.startsWith(`${PROJECTS_DIR}/`) && dirName.endsWith(`/${LINKS_DIR}`) && dirName.split('/').length === 3
  const getProjectAliasFromDir = (dirName) => (isProjectAliasDir(dirName) ? dirName.split('/')[1] : (isProjectLinksDir(dirName) ? dirName.split('/')[1] : null))

  // Derive projects from translations Projects page
  const projectsData = useMemo(() => {
    const list = t?.projects?.data || []
    const map = {}
    list.forEach(p => {
      const alias = p.id || (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      map[alias] = {
        title: p.title,
        summary: p.description,
        stack: Array.isArray(p.tech) ? p.tech : [],
        links: { repo: p.link, demo: p.demo || null }
      }
    })
    return map
  }, [t?.projects?.data])

  const githubProjects = useMemo(() => Object.keys(projectsData).reduce((acc, key) => {
    acc[key] = projectsData[key].links.repo
    return acc
  }, {}), [projectsData])

  const openExternal = (url) => { try { window.open(url, '_blank', 'noopener,noreferrer') } catch {} }

 
  const helpData = {
    ls: { usage: t?.skills?.help?.ls?.usage || 'ls', description: t?.skills?.help?.ls?.description || 'Lists items in the current location', examples: ['ls'] },
    cd: { usage: t?.skills?.help?.cd?.usage || 'cd', description: t?.skills?.help?.cd?.description || 'Changes to a different directory', examples: [`cd ${SKILLS_DIR}`, 'cd ..', 'cd ~'] },
    cat: { usage: t?.skills?.help?.cat?.usage || 'cat <file>', description: t?.skills?.help?.cat?.description || 'Shows file contents', examples: ['cd skills', 'ls', 'cat frontend.txt'] },
    open: { usage: t?.skills?.help?.open?.usage || 'open', description: t?.skills?.help?.open?.description || 'Opens the repository of the current project' },
    clear: { usage: t?.skills?.help?.clear?.usage || 'clear', description: t?.skills?.help?.clear?.description || 'Clears the terminal output', examples: ['clear'] },
    exit: { usage: t?.skills?.help?.exit?.usage || 'exit', description: t?.skills?.help?.exit?.description || 'Resets the terminal to its initial state', examples: ['exit'] }
  }

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
        setHistoryIndex(null)
        return

      case command === 'clear':
        // Clear the terminal screen but keep the current working directory and selections
        setCommandHistory([])
        setErrorMessage('')
        setHasExecutedCommand(true)
        setHistoryIndex(null)
        return

      case command === 'ls' && currentDirectory === '~':
        response = { type: 'file-list', content: `${SKILLS_DIR}/  ${PROJECTS_DIR}/` }
        break

      case command === 'ls' && isSkillsDirectory(currentDirectory):
        // Localized skill file names
        const fileNames = t?.skills?.fileNames || {
          frontend: 'frontend', backend: 'backend', tools: 'tools', android: 'android', database: 'database', desktopTools: 'desktop-tools'
        }
        response = { type: 'file-list', content: Object.keys(directories).map(key => `${fileNames[key]}.txt`).join('  ') }
        break

      case command === 'ls' && isProjectsRoot(currentDirectory): {
        const aliases = Object.keys(projectsData)
        response = { type: 'file-list', content: aliases.join('  ') }
        break
      }
      case command === 'ls' && isProjectAliasDir(currentDirectory): {
        const items = ['info.txt', 'tech.txt', `${LINKS_DIR}/`]
        response = { type: 'file-list', content: items.join('  ') }
        break
      }
      case command === 'ls' && isProjectLinksDir(currentDirectory): {
        const alias = getProjectAliasFromDir(currentDirectory)
        const p = projectsData[alias]
        const items = [p?.links?.repo ? 'repo' : null, p?.links?.demo ? 'demo' : null].filter(Boolean)
        response = { type: 'file-list', content: items.join('  ') || '' }
        break
      }

      case command.startsWith('cd '): {
        const rawTarget = command.slice(3).trim()
        // Normalize target by removing trailing slashes (so 'links/' works like 'links')
        const target = rawTarget.replace(/\/+$/, '')
        if (target === '~' || target === '') setCurrentDirectory('~')
        else if (target === '..') {
          if (currentDirectory === '~') setCurrentDirectory('~')
          else {
            const parts = currentDirectory.split('/'); parts.pop();
            const up = parts.join('/') || '~'
            setCurrentDirectory(up)
          }
        }
        else if (isSkillsDirectory(target)) setCurrentDirectory(SKILLS_DIR)
        else if (isProjectsDirectory(target)) setCurrentDirectory(PROJECTS_DIR)
        else if (currentDirectory === '~' && target === PROJECTS_DIR) setCurrentDirectory(PROJECTS_DIR)
        else if (isProjectsRoot(currentDirectory) && projectsData[target]) setCurrentDirectory(`${PROJECTS_DIR}/${target}`)
        else if (isProjectAliasDir(currentDirectory) && (target === LINKS_DIR)) setCurrentDirectory(`${currentDirectory}/${LINKS_DIR}`)
        else if (target.startsWith(`${PROJECTS_DIR}/`)) setCurrentDirectory(target)
        else response = { type: 'error', content: command, message: t.skills.errorMessages.noSuchFileOrDirectory }
        return
      }

      case command.startsWith('cat '): {
        const file = command.slice(4).trim()
        if (isSkillsDirectory(currentDirectory)) {
          const fileNames = t?.skills?.fileNames || {
            frontend: 'frontend', backend: 'backend', tools: 'tools', android: 'android', database: 'database', desktopTools: 'desktop-tools'
          }
          const key = Object.keys(directories).find(k => `${fileNames[k]}.txt` === file)
          response = key ? { type: 'skill', content: t.skills.responses[key], category: key }
            : { type: 'error', content: command, message: t.skills.errorMessages.noSuchFileOrDirectory }
        } else if (isProjectsRoot(currentDirectory)) {
          const alias = file
          const p = projectsData[alias]
          if (p) {
            const lines = [
              `${t.skills.labels.title}: ${p.title}`,
              `${t.skills.labels.stack}: ${p.stack.join(', ')}`,
              `${t.skills.labels.summary}: ${p.summary}`,
              `${t.skills.labels.links}:`,
              `  ${t.skills.labels.repo}: ${p.links.repo || '-'}`,
              `  ${t.skills.labels.demo}: ${p.links.demo || '-'}`
            ]
            response = { type: 'text', content: lines.join('\n') }
          } else {
            response = { type: 'error', content: command, message: t.skills.errorMessages.noSuchFileOrDirectory }
          }
        } else if (isProjectAliasDir(currentDirectory)) {
          const alias = getProjectAliasFromDir(currentDirectory)
          const p = projectsData[alias]
          if (!p) { response = { type: 'error', content: command, message: t.skills.errorMessages.noSuchFileOrDirectory }; break }
          if (file === 'info.txt') {
            const lines = [
              `${t.skills.labels.title}: ${p.title}`,
              `${t.skills.labels.stack}: ${p.stack.join(', ')}`,
              `${t.skills.labels.summary}: ${p.summary}`,
            ]
            response = { type: 'text', content: lines.join('\n') }
          } else if (file === 'tech.txt') {
            response = { type: 'text', content: p?.stack?.join(', ') || '-' }
          } else {
            response = { type: 'error', content: command, message: t.skills.errorMessages.noSuchFileOrDirectory }
          }
        } else if (isProjectLinksDir(currentDirectory)) {
          const alias = getProjectAliasFromDir(currentDirectory)
          const p = projectsData[alias]
          if (file === 'repo') response = { type: 'text', content: p?.links?.repo || '-' }
          else if (file === 'demo') response = { type: 'text', content: p?.links?.demo || '-' }
          else response = { type: 'error', content: command, message: t.skills.errorMessages.noSuchFileOrDirectory }
        } else {
          response = { type: 'error', content: command, message: t.skills.errorMessages.noSuchFileOrDirectory }
        }
        break
      }

      // Open GitHub repo by alias
      case command.startsWith('open '): {
        const parts = command.split(/\s+/).slice(1) // [alias?, maybe 'repo'|'demo']
        let alias = parts[0]
        let kind = parts[1] || 'repo'
        // Allow context-based open when inside a project dir
        if (!alias && (isProjectAliasDir(currentDirectory) || isProjectLinksDir(currentDirectory))) {
          alias = getProjectAliasFromDir(currentDirectory)
          kind = 'repo'
        }
        if ((alias === 'repo' || alias === 'demo') && (isProjectAliasDir(currentDirectory) || isProjectLinksDir(currentDirectory))) {
          kind = alias; alias = getProjectAliasFromDir(currentDirectory)
        }
        const p = projectsData[alias]
        if (!p) { response = { type: 'error', content: command, message: t.skills.errorMessages.repositoryNotFound, suggestion: t.skills.errorMessages.helpSuggestion }; break }
        const url = kind === 'demo' ? p.links.demo : p.links.repo
        if (!url) { response = { type: 'error', content: command, message: t.skills.errorMessages.targetNotAvailable }; break }
        openExternal(url)
        response = { type: 'text', content: `${t.skills.labels.opening} ${kind}: ${url}` }
        break
      }

      case command === 'pwd': {
        const path = currentDirectory === '~' ? '~' : `~/${currentDirectory}`
        response = { type: 'text', content: path }
        break
      }
      case command === 'whoami': {
        response = { type: 'text', content: 'user' }
        break
      }
      case command === 'hostname': {
        response = { type: 'text', content: 'portfolio' }
        break
      }
      case command.startsWith('echo '): {
        response = { type: 'text', content: command.slice(5) }
        break
      }
      case command === 'help': {
        const list = Object.keys(helpData).map((key) => {
          const { usage, description } = helpData[key]
          return { key, usage, description }
        })
        response = { type: 'help-list', content: list }
        break
      }
      case command.startsWith('help '): {
        const topic = command.split(/\s+/)[1]
        if (helpData[topic]) {
          const detail = { ...helpData[topic] }
          // Keep translations' description as-is; optionally compute examples per context later if needed
          response = { type: 'help-detail', content: detail, command: topic }
        } else {
          response = { type: 'error', content: command, message: `${t.skills.errorMessages.helpTopicNotFound} '${topic}'`, suggestion: t.skills.errorMessages.helpSuggestion }
        }
        break
      }

      default:
        response = { type: 'error', content: command, message: t.skills.errorMessages.commandNotFound, suggestion: t.skills.errorMessages.helpSuggestion }
    }

    setCommandHistory(prev => [...prev, { ...newHistoryItem, output: [response] }])
    setHasExecutedCommand(true)
    setHistoryIndex(null)
  }

  const handleTabCompletion = () => {
    const input = terminalInput.trim(); let prefix = '', suggestions = []
    if (input.includes(' ')) {
      const [cmd, argRaw] = input.split(/\s+(.+)/); const arg = argRaw || ''
      const lowerArg = arg.toLowerCase()
      if (cmd === 'cd') {
        if (currentDirectory === '~') {
          if (lowerArg.startsWith(`${PROJECTS_DIR}/`)) {
            const token = arg.slice(`${PROJECTS_DIR}/`.length)
            const matches = Object.keys(projectsData)
              .map(a => `${PROJECTS_DIR}/${a}`)
              .filter(i => i.toLowerCase().startsWith(`${PROJECTS_DIR}/${token}`.toLowerCase()))
            if (matches.length === 1) { setTerminalInput(`cd ${matches[0]}`); return }
          }
          suggestions = [`${SKILLS_DIR}/`, `${PROJECTS_DIR}/`]
        } else if (isProjectsRoot(currentDirectory)) suggestions = [...Object.keys(projectsData), '..']
        else if (isProjectAliasDir(currentDirectory)) suggestions = ['links/', '..']
        else if (isProjectLinksDir(currentDirectory)) suggestions = ['..']
        else suggestions = ['~','..']
        prefix = 'cd '
      }
      if (cmd === 'ls') {
        if (currentDirectory === '~') {
          suggestions = [`${SKILLS_DIR}/`, `${PROJECTS_DIR}/`]
        } else if (isProjectsRoot(currentDirectory)) {
          suggestions = Object.keys(projectsData)
        } else if (isSkillsDirectory(currentDirectory)) {
          // Autocomplete skills files
          suggestions = Object.values(directories).map(d => `${d}.txt`)
        } else if (isProjectAliasDir(currentDirectory)) {
          suggestions = ['info.txt','tech.txt','tips.txt',`${LINKS_DIR}/`]
        } else if (isProjectLinksDir(currentDirectory)) {
          const alias = getProjectAliasFromDir(currentDirectory)
          const p = projectsData[alias]
          suggestions = [p?.links?.repo ? 'repo' : null, p?.links?.demo ? 'demo' : null].filter(Boolean)
        }
        prefix = 'ls '
      }
      if (cmd === 'cat') {
        if (isSkillsDirectory(currentDirectory)) {
          const fileNames = t?.skills?.fileNames || {
            frontend: 'frontend', backend: 'backend', tools: 'tools', android: 'android', database: 'database', desktopTools: 'desktop-tools'
          }
          suggestions = Object.keys(directories).map(key => `${fileNames[key]}.txt`)
        } else if (isProjectsRoot(currentDirectory)) {
          suggestions = Object.keys(projectsData)
        } else if (isProjectAliasDir(currentDirectory)) {
          suggestions = ['info.txt','tech.txt']
        } else if (isProjectLinksDir(currentDirectory)) {
          const alias = getProjectAliasFromDir(currentDirectory)
          const p = projectsData[alias]
          suggestions = [p?.links?.repo ? 'repo' : null, p?.links?.demo ? 'demo' : null].filter(Boolean)
        }
        prefix = 'cat '
      }
      if (cmd === 'open') {
        if (isProjectsRoot(currentDirectory)) {
          suggestions = Object.keys(projectsData)
        } else if (isProjectAliasDir(currentDirectory) || isProjectLinksDir(currentDirectory)) {
          const alias = getProjectAliasFromDir(currentDirectory)
          const p = projectsData[alias]
          suggestions = [p?.links?.repo ? 'repo' : null, p?.links?.demo ? 'demo' : null].filter(Boolean)
        } else {
          suggestions = Object.keys(projectsData)
        }
        prefix = 'open '
      }
      if (cmd === 'help') { suggestions = Object.keys(helpData); prefix = 'help ' }
      const matches = suggestions.filter(i => i && i.toLowerCase().startsWith(lowerArg))
      if (matches.length === 1) { setTerminalInput(prefix + matches[0]); return }
      const exact = suggestions.find(i => i && i.toLowerCase() === lowerArg)
      if (exact) { setTerminalInput(prefix + exact); return }
      // If multiple matches, extend to the longest common prefix
      if (matches.length > 1 && arg.length > 0) {
        const lcp = (arr) => {
          if (arr.length === 0) return ''
          let pref = arr[0]
          for (let i = 1; i < arr.length; i++) {
            let j = 0
            const a = pref.toLowerCase(); const b = arr[i].toLowerCase()
            while (j < pref.length && j < arr[i].length && a[j] === b[j]) j++
            pref = pref.slice(0, j)
            if (pref === '') break
          }
          return pref
        }
        const common = lcp(matches)
        if (common && common.length > arg.length) { setTerminalInput(prefix + matches[0].slice(0, common.length)); return }
      }
    } else {
      const base = ['ls','clear','exit','cd ','cat ','open ','help']
      const matches = base.filter(c => c.toLowerCase().startsWith(input.toLowerCase()))
      if (matches.length === 1) setTerminalInput(matches[0])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') { e.preventDefault(); handleTabCompletion() }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const onlyCommands = commandHistory.filter(h => h.type === 'command')
      if (onlyCommands.length === 0) return
      const nextIndex = historyIndex === null ? onlyCommands.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setTerminalInput(onlyCommands[nextIndex].command || '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const onlyCommands = commandHistory.filter(h => h.type === 'command')
      if (onlyCommands.length === 0) return
      if (historyIndex === null) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= onlyCommands.length) { setHistoryIndex(null); setTerminalInput(''); return }
      setHistoryIndex(nextIndex)
      setTerminalInput(onlyCommands[nextIndex].command || '')
    }
  }
  const handleKeyPress = (e) => { if (e.key === 'Enter') { handleCommand(terminalInput.trim()); setTerminalInput('') } }

  useEffect(() => {
    const el = document.querySelector('.terminal-content')
    if (el) { el.scrollTop = el.scrollHeight }
  }, [commandHistory])

  const Prompt = ({ dir }) => (
    <span className="terminal-prompt">
      <span className="prompt-user">user</span>
      <span className="prompt-at">@</span>
      <span className="prompt-host">portfolio</span>
      <span className="prompt-colon">:</span>
      <span className="prompt-path">{dir || '~'}</span>
      <span className="prompt-symbol">$</span>
    </span>
  )

  return (
    <div className="page-container"><section className="skills-section"><div className="container"><div className="terminal-container">
      <div className="terminal-output" onClick={() => document.querySelector('.terminal-input')?.focus()}>
        <div className="terminal-content">
          {commandHistory.map(item => (
            <div key={item.id} className="terminal-response">
              {item.type === 'welcome' ? <div className="welcome-message">{item.content}</div> : (
                <>
                  <div className="terminal-input-line">
                    <Prompt dir={item.directory || '~'} />
                    {item.command && <span className="command-text">{item.command}</span>}
                  </div>
                  {item.output?.map((out,i) => (
                    <div key={i} className="output-content">
                      {out.type === 'skill' && <div className="skill-content">{out.content}</div>}
                      {out.type === 'file-list' && <div className="file-list-content">{out.content}</div>}
                      {out.type === 'text' && <div className="file-list-content">{out.content}</div>}
                      {out.type === 'help-list' && (
                        <div className="help-commands">
                          {out.content.map((c) => (
                            <div key={c.key} className="help-command-item">
                              <span className="help-command-name">{c.usage}</span>
                              <span className="help-command-desc">{c.description}</span>
                            </div>
                          ))}
                          {t?.skills?.helpTip && (
                            <div className="help-tip">{t.skills.helpTip}</div>
                          )}
                        </div>
                      )}
                      {out.type === 'help-detail' && (
                        <div className="help-commands">
                          <div className="help-command-item">
                            <span className="help-command-name">{t?.skills?.helpLabels?.command || 'Command'}</span>
                            <span className="help-command-desc">{out.command}</span>
                          </div>
                          <div className="help-command-item">
                            <span className="help-command-name">{t?.skills?.helpLabels?.usage || 'Usage'}</span>
                            <span className="help-command-desc">{out.content.usage}</span>
                          </div>
                          <div className="help-command-item">
                            <span className="help-command-name">{t?.skills?.helpLabels?.description || 'Description'}</span>
                            <span className="help-command-desc">{out.content.description}</span>
                          </div>
                          {out.content.examples?.length > 0 && (
                            <div className="help-command-item">
                              <span className="help-command-name">{t?.skills?.helpLabels?.examples || 'Examples'}</span>
                              <span className="help-command-desc">{out.content.examples.join(' | ')}</span>
                            </div>
                          )}
                        </div>
                      )}
                      {out.type === 'error' && (
                        <div className="error-content">
                          <div className="error-message">bash: {out.content}: {out.message}</div>
                          {out.suggestion && <div className="error-suggestion">{out.suggestion}</div>}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
          <div className="terminal-input-container"><div className="terminal-input-line">
            <Prompt dir={currentDirectory} />
            <input type="text" value={terminalInput} onChange={e => setTerminalInput(e.target.value)} onKeyDown={handleKeyDown} onKeyPress={handleKeyPress} className="terminal-input" autoComplete="off" autoFocus spellCheck="false"/>
          </div></div>
        </div>
      </div>
    </div></div></section></div>
  )
}

export default SkillsSection;

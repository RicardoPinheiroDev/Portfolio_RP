import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import { LanguageProvider } from './context/LanguageContext'
import HomeSection from './components/HomeSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import { translations } from './translations/translations'

function LanguageWrapper() {
  const { lang } = useParams()
  const routes = translations[lang]?.routes || translations.pt.routes
  
  return (
    <LanguageProvider initialLanguage={lang}>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={
          <main className="main-content">
            <HomeSection />
          </main>
        } />
        <Route path={`/${routes.home}`} element={
          <main className="main-content">
            <HomeSection />
          </main>
        } />
        <Route path={`/${routes.skills}`} element={<SkillsSection />} />
        <Route path={`/${routes.projects}`} element={<ProjectsSection />} />
      </Routes>
    </LanguageProvider>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/pt" replace />} />
        <Route path="/:lang/*" element={<LanguageWrapper />} />
      </Routes>
    </Router>
  )
}

export default App

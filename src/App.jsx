import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import { LanguageProvider } from './context/LanguageContext'
import HomeSection from './components/HomeSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'

function LanguageWrapper({ children }) {
  const { lang } = useParams()
  
  return (
    <LanguageProvider initialLanguage={lang}>
      <NavbarComponent />
      {children}
    </LanguageProvider>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/pt" replace />} />
        <Route path="/:lang/*" element={
          <LanguageWrapper>
            <Routes>
              <Route path="/" element={
                <main className="main-content">
                  <HomeSection />
                </main>
              } />
              <Route path="/habilidades" element={<SkillsSection />} />
              <Route path="/projects" element={<ProjectsSection />} />
            </Routes>
          </LanguageWrapper>
        } />
      </Routes>
    </Router>
  )
}

export default App

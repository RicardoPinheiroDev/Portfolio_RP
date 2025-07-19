import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import { LanguageProvider } from './context/LanguageContext'
import HomeSection from './components/HomeSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={
            <main className="main-content">
              <HomeSection />
            </main>
          } />
          <Route path="/habilidades" element={<SkillsSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App

import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import NavbarComponent from './components/Navbar'
import AudioPlayer from './components/AudioPlayer'
import { LanguageProvider } from './context/LanguageContext'
import HomeSection from './components/HomeSection'
import VideoBackground from './components/VideoBackground'
import SkillsSection from './components/SkillsSection'
import { translations } from './translations/translations'
import { getRouteKeyFromPath } from './utils/routeUtils'
import backgroundVideo from './images/video_01.mp4'

function LanguageWrapper() {
  const { lang } = useParams()
  const location = useLocation()
  const routes = translations[lang]?.routes || translations.pt.routes
  const audioPlayerRef = useRef()
  const routeKey = getRouteKeyFromPath(lang, location.pathname)
  
  return (
    <LanguageProvider initialLanguage={lang}>
      {routeKey === 'home' && (
        <VideoBackground src={backgroundVideo} />
      )}
      
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
        { /* Projects route removed: projects are handled within the terminal */ }
      </Routes>
      
      <AudioPlayer ref={audioPlayerRef} />
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
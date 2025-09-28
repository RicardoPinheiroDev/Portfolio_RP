import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations/translations'
import cvRicardoPinheiro from '../CV_Store/CV_RicardoPinheiro01.pdf'
import cvRichardPinewood from '../CV_Store/CV_RichardPinewood02.pdf'
import githubIcon from '../images/github_icon.png'
import xIcon from '../images/xlogo_twitter.png'
import '../Styles/Home.css'

function HomeSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const heroRef = useRef(null)
  const expertiseRef = useRef(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [showFooter, setShowFooter] = useState(false)

  useEffect(() => {
    const heroEl = heroRef.current
    const bottomEl = expertiseRef.current
    const heroObserver = new IntersectionObserver(([entry]) => {
      setIsHeroVisible(entry.isIntersecting)
    }, { root: null, threshold: 0.3 })
    const bottomObserver = new IntersectionObserver(([entry]) => {
      setShowFooter(entry.isIntersecting)
    }, { root: null, threshold: 0.15 })
    if (heroEl) heroObserver.observe(heroEl)
    if (bottomEl) bottomObserver.observe(bottomEl)
    return () => { heroObserver.disconnect(); bottomObserver.disconnect() }
  }, [])

  const handleDownloadCV = async () => {
    const cvFile = language === 'pt' ? cvRicardoPinheiro : cvRichardPinewood
    const fileName = t.home.cvFileName
   
    try {
      const response = await fetch(cvFile)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
     
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
     
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading CV:', error)
      
      const link = document.createElement('a')
      link.href = cvFile
      link.download = fileName
      link.target = '_blank'
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
return (
    <>
      <div className="hero-section" ref={heroRef}>
        <h1 className="greeting">
          {t.home.greeting}
        </h1>
        <p className="intro-text">
          {t.home.intro}
        </p>
        <div className="home-actions">
          <button 
            className={`cv-button fade-element ${isHeroVisible ? 'visible' : 'hidden'}`} 
            onClick={handleDownloadCV}
          >
            {t.home.downloadCV}
          </button>
        </div>
      </div>

      <section ref={expertiseRef} className="expertise-section">
        <div className="expertise-header">
          <h3 className="expertise-title">{t.home.expertiseTitle}</h3>
          <p className="expertise-intro">{t.home.expertiseIntro}</p>
        </div>
        <div className="expertise-grid-shell">
          <div className="expertise-grid">
          {(language === 'pt') ? (
            <>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.frontend || 'Frontend'}</h4>
                <div className="chips">
                  {t.home.expertise.frontend.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.backend || 'Backend'}</h4>
                <div className="chips">
                  {t.home.expertise.backend.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.mobile || 'Mobile'}</h4>
                <div className="chips">
                  {t.home.expertise.mobile.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.desktop || 'Desktop'}</h4>
                <div className="chips">
                  {t.home.expertise.desktop.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card tools-card">
                <h4>{t.home.expertiseLabels?.ferramentas || 'Ferramentas'}</h4>
                <div className="chips">
                  {t.home.expertise.ferramentas.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.baseDeDados || 'Bases de dados'}</h4>
                <div className="chips">
                  {t.home.expertise.baseDeDados.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.frontend || 'Frontend'}</h4>
                <div className="chips">
                  {t.home.expertise.frontend.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.backend || 'Backend'}</h4>
                <div className="chips">
                  {t.home.expertise.backend.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.mobile || 'Mobile'}</h4>
                <div className="chips">
                  {t.home.expertise.mobile.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.desktop || 'Desktop'}</h4>
                <div className="chips">
                  {t.home.expertise.desktop.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card tools-card">
                <h4>{t.home.expertiseLabels?.tools || 'Tools'}</h4>
                <div className="chips">
                  {t.home.expertise.tools.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
              <div className="expertise-card">
                <h4>{t.home.expertiseLabels?.databases || 'Databases'}</h4>
                <div className="chips">
                  {t.home.expertise.databases.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
            </>
          )}
          </div>
        </div>
      </section>

      <div className={`social-footer ${showFooter ? 'visible' : ''}`}>
        <div className="social-links">
          <a 
            href="https://github.com/RicardoPinheiroDev" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
          >
            <img 
              src={githubIcon} 
              alt="GitHub" 
              className="social-icon-img" 
            />
          </a>
          <a 
            href="https://x.com/Ricardo80987140" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
          >
            <img 
              src={xIcon} 
              alt="X (Twitter)" 
              className="social-icon-img" 
            />
          </a>
        </div>
        <div className="copyright">
          {t.home.copyright}
        </div>
      </div>
    </>
  )
}

export default HomeSection

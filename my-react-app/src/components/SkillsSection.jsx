import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations/translations'

function SkillsSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const buttons = ['frontend', 'backend', 'tools', 'android', 'database']
  const visibleButtons = 3

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleQuestionClick = (category) => {
    setSelectedCategory(category)
  }

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    const maxIndex = Math.max(0, buttons.length - visibleButtons)
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  const getVisibleButtons = () => {
    if (!isMobile) return buttons
    return buttons.slice(currentIndex, currentIndex + visibleButtons)
  }

  const getIndicatorPosition = (category) => {
    const buttons = ['frontend', 'backend', 'tools', 'android', 'database']
    const index = buttons.indexOf(category)
    return index * 20 + 7 
  }

  return (
    <div className="page-container">
      <section className="skills-section">
        <div className="container">
          <div className="chatbot-container">
            <div className="chatbot-header">
              <h1>{t.skills.chatTitle}</h1>
              <p>{t.skills.chatSubtitle}</p>
              <div className="header-line">
                {selectedCategory && (
                  <div 
                    className="header-line-indicator"
                    style={{ left: `${getIndicatorPosition(selectedCategory)}%` }}
                  />
                )}
              </div>
            </div>
            
            <div className="preset-questions">
              {isMobile && (
                <div className="carousel-container">
                  <button 
                    className="carousel-arrow left"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  
                  <div className="carousel-track">
                    <div 
                      className="carousel-buttons"
                      style={{
                        transform: `translateX(-${currentIndex * (100 / buttons.length)}%)`,
                        transition: 'transform 0.3s ease-in-out',
                        width: `${(buttons.length / visibleButtons) * 100}%`
                      }}
                    >
                      {buttons.map((buttonKey) => (
                        <button 
                          key={buttonKey}
                          onClick={() => handleQuestionClick(buttonKey)}
                          className="carousel-button"
                        >
                          {t.skills[`${buttonKey}Button`]}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="carousel-arrow right"
                    onClick={handleNext}
                    disabled={currentIndex >= buttons.length - visibleButtons}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              )}
              
              {!isMobile && (
                <>
                  <button onClick={() => handleQuestionClick('frontend')}>
                    {t.skills.frontendButton}
                  </button>
                  <button onClick={() => handleQuestionClick('backend')}>
                    {t.skills.backendButton}
                  </button>
                  <button onClick={() => handleQuestionClick('tools')}>
                    {t.skills.toolsButton}
                  </button>
                  <button onClick={() => handleQuestionClick('android')}>
                    {t.skills.androidButton}
                  </button>
                  <button onClick={() => handleQuestionClick('database')}>
                    {t.skills.databaseButton}
                  </button>
                </>
              )}
            </div>

            <div className="chat-messages">
              {selectedCategory && (
                <div className="message bot">
                  <div className="message-content">
                    {t.skills.responses[selectedCategory]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SkillsSection;
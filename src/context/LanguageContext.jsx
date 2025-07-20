import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children, initialLanguage = 'pt' }) => {
  const [language, setLanguage] = useState(initialLanguage)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      setLanguage(initialLanguage)
    }
  }, [initialLanguage])

  const changeLanguage = (newLang) => {
    const currentPath = location.pathname.replace(/^\/(en|pt)/, '')
    navigate(`/${newLang}${currentPath}`)
    setLanguage(newLang)
  }

  const toggleLanguage = () => {
    const newLang = language === 'pt' ? 'en' : 'pt'
    changeLanguage(newLang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
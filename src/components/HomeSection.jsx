import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations/translations'
import cvRicardoPinheiro from '../CV_Store/CV_RicardoPinheiro.pdf'
import cvRichardPinewood from '../CV_Store/CV_RichardPinewood.pdf'
import githubIcon from '../images/github_icon.png'
import xIcon from '../images/xlogo_twitter.png'
import '../Styles/Home.css'

function HomeSection() {
  const { language } = useLanguage()
  const t = translations[language]

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
      <div className="hero-section">
        <h1 className="greeting">
          {t.home.greeting}
        </h1>
        <p className="intro-text">
          {t.home.intro}
        </p>
        <button 
          className="cv-button" 
          onClick={handleDownloadCV}
        >
          {t.home.downloadCV}
        </button>
      </div>
     
      <div className="social-footer">
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
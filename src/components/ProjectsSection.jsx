import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations/translations'

function ProjectsSection() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="page-container">
      <section className="projects-section">
        <div className="container">
          <h2 className="section-title">{t.projects.title}</h2>
          
          <div className="projects-grid">
            {t.projects.data.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">{project.image}</div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link"
                  >
                    {project.link.includes('github') ? t.projects.seeOnGithub : t.projects.viewProject}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsSection
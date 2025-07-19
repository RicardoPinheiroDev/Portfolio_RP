import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

function NavbarComponent() {
  const { language, setLanguage } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const t = translations[language];
 
  console.log('Current pathname:', location.pathname);
  
  useEffect(() => {
    if (expanded) {
      document.body.classList.add('navbar-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('navbar-open');
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.classList.remove('navbar-open');
      document.body.style.overflow = 'auto';
    };
  }, [expanded]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="custom-brand">RP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-4">
            <Nav.Link
              as={Link}
              to="/habilidades"
              className={`nav-link-custom ${location.pathname === '/habilidades' ? 'nav-active' : ''}`}
              onClick={() => setExpanded(false)}
            >
              {t.nav.skills}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/projects"
              className={`nav-link-custom ${location.pathname === '/projects' ? 'nav-active' : ''}`}
              onClick={() => setExpanded(false)}
            >
              {t.nav.projects}
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="link" 
                className="language-dropdown" 
                id="language-dropdown" 
                aria-label={t.nav.selectLanguage}
                bsPrefix="custom-dropdown-toggle"
              >
                <span className="globe-emoji">🌍</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="language-menu">
                <Dropdown.Item
                  onClick={() => handleLanguageChange('pt')}
                  className={language === 'pt' ? 'active' : ''}
                  aria-label={t.nav.portuguese}
                >
                  {t.nav.portuguese}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleLanguageChange('en')}
                  className={language === 'en' ? 'active' : ''}
                  aria-label={t.nav.english}
                >
                  {t.nav.english}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
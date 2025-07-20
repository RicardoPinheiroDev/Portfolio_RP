import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import '../Styles/Navbar.css';

function NavbarComponent() {
  const { language, setLanguage } = useLanguage();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const location = useLocation();
  const t = translations[language];
 
  console.log('Current pathname:', location.pathname);
  
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && showOffcanvas) {
        setShowOffcanvas(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showOffcanvas]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowOffcanvas(false);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="custom-navbar"
        fixed="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="custom-brand">RP</Navbar.Brand>
          
          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-block">
            <Nav className="ms-auto me-4">
              <Nav.Link
                as={Link}
                to="/habilidades"
                className={`nav-link-custom ${location.pathname === '/habilidades' ? 'nav-active' : ''}`}
              >
                {t.nav.skills}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/projects"
                className={`nav-link-custom ${location.pathname === '/projects' ? 'nav-active' : ''}`}
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

          <button
            className={`custom-navbar-toggler d-lg-none ${showOffcanvas ? 'active' : ''}`}
            type="button"
            onClick={showOffcanvas ? handleClose : handleShow}
            aria-controls="offcanvas-navbar"
            aria-expanded={showOffcanvas}
            aria-label="Toggle navigation"
          >
            <div className="custom-toggler-icon">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </button>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              as={Link}
              to="/habilidades"
              className={`nav-link-custom ${location.pathname === '/habilidades' ? 'nav-active' : ''}`}
              onClick={handleClose}
            >
              {t.nav.skills}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/projects"
              className={`nav-link-custom ${location.pathname === '/projects' ? 'nav-active' : ''}`}
              onClick={handleClose}
            >
              {t.nav.projects}
            </Nav.Link>
            <hr className="my-3" />
            <Dropdown className="language-dropdown-offcanvas">
              <Dropdown.Toggle 
                variant="link" 
                className="offcanvas-language-toggle" 
                id="offcanvas-language-dropdown"
                aria-label={t.nav.selectLanguage}
              >
                <span className="globe-emoji me-2">🌍</span>
                {t.nav.selectLanguage}
              </Dropdown.Toggle>
              <Dropdown.Menu className="offcanvas-language-menu">
                <Dropdown.Item
                  onClick={() => handleLanguageChange('pt')}
                  className={language === 'pt' ? 'active' : ''}
                  aria-label={t.nav.portuguese}
                >
                  <span className="language-flag me-2">🇵🇹</span>
                  {t.nav.portuguese}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleLanguageChange('en')}
                  className={language === 'en' ? 'active' : ''}
                  aria-label={t.nav.english}
                >
                  <span className="language-flag me-2">🇺🇸</span>
                  {t.nav.english}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarComponent;
import { useEffect, useRef, useState } from 'react'
import './Navigation.css'

const navLinks = [
  { label: 'Home',      href: '#hero' },
  { label: 'Flavours',  href: '#flavours' },
  { label: 'Our Story', href: '#story' },
  { label: 'Products',  href: '#products' },
]

export default function Navigation() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (!target) return

    // Use native scrollTo for compatibility with Lenis
    const top = target.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    scrollToSection(href)
  }

  return (
    <>
      <header
        ref={navRef}
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        role="banner"
      >
        <div className="nav__inner">
          <a
            href="#hero"
            className="nav__logo"
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="Cavin's — Home"
          >
            <span className="nav__logo-text">Cavin&apos;s</span>
            <span className="nav__logo-sub">Since 1825</span>
          </a>

          <nav className="nav__links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav__link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a
              href="#flavours"
              className="nav__cta"
              onClick={(e) => handleNavClick(e, '#flavours')}
            >
              Explore
            </a>
            <button
              className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, link.href)}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}

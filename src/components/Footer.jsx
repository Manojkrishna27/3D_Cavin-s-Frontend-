import './Footer.css'

const year = new Date().getFullYear()

const footerLinks = {
  Products: ['Chocolate Milkshake', 'Flavour Range', 'Limited Editions', 'Gift Sets'],
  Company: ['Our Story', 'Since 1825', 'Sustainability', 'Careers'],
  Connect: ['Instagram', 'Facebook', 'Twitter / X', 'YouTube'],
  Legal: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Top row */}
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__logo">Cavin&apos;s</p>
            <p className="label-sm text-gold footer__since">Since 1825</p>
            <p className="body-md footer__tagline">
              Real milk. Real chocolate.<br />Real moments.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer__nav-col">
                <p className="label-sm footer__nav-heading">{category}</p>
                <ul className="footer__nav-list" role="list">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer__nav-link body-md">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="footer__divider" aria-hidden="true" />

        {/* Bottom row */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <p className="footer__copy body-md">
              &copy; {year} Cavin&apos;s Concept Page. Designed & Developed by{' '}
              <a href="https://github.com/Manojkrishna27" target="_blank" rel="noopener noreferrer" className="footer__author-link">Manojkrishna</a>.
            </p>
            <p className="footer__disclaimer body-md">
              Unofficial student concept project. Not affiliated with Cavin&apos;s or Hatsun Agro.
            </p>
          </div>
          <div className="footer__socials body-md">
            <a href="https://github.com/Manojkrishna27" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              GitHub
            </a>
            <span className="footer__social-sep" aria-hidden="true">·</span>
            <a href="https://www.linkedin.com/in/manoj-krishna-m/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

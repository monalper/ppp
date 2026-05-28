import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [showLogo, setShowLogo] = useState(true);

  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__brand">
          {showLogo && (
            <img
              src="/assets/header-logo.svg"
              alt="A. Augland logo"
              className="site-header__logo"
              onError={() => setShowLogo(false)}
            />
          )}

          <div className="site-header__copy">
            <span className="site-header__name">Ibrahim A. Ercan</span>
            <span className="site-header__label">Portfolio'26</span>

            <div className="site-header__contact-wrapper">
              <a href="#contact" className="site-header__nav-link site-header__contact-link">
                Contact me
              </a>
            </div>
          </div>
        </div>

        <div className="site-header__actions">
          <a href="#donate" className="site-header__donate">
            Visit Openwall
          </a>
        </div>
      </div>
    </header>
  );
}
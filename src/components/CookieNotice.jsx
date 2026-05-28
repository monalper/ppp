import { useState, useEffect } from 'react';
import './CookieNotice.css';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Daha önce kabul edilip edilmediğini kontrol ediyoruz
    const isCookieAccepted = localStorage.getItem('cookieAccepted');
    if (!isCookieAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Kabul edildi bilgisini hafızaya kaydedip bileşeni kapatıyoruz
    localStorage.setItem('cookieAccepted', 'true');
    setIsVisible(false);
  };

  // Eğer kullanıcı zaten kabul ettiyse hiçbir şey render etme
  if (!isVisible) return null;

  return (
    <aside className="cookie-notice" aria-label="Cookie preferences">
      <div className="cookie-notice__top">
        <img 
          src="/assets/cookie.svg" 
          alt="Cookie illustration" 
          className="cookie-notice__image"
        />
      </div>
      <div className="cookie-notice__bottom">
        <p className="cookie-notice__text">Accept cookies for a better site experience.</p>
        <button 
          type="button" 
          className="cookie-notice__button"
          onClick={handleAccept}
        >
          Accept
        </button>
      </div>
    </aside>
  );
}
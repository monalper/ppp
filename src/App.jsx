import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';

function App() {
  const cursorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mobile Check
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;

      if (isMobileDevice || isSmallScreen) {
        navigate('/mobile', { replace: true });
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate]);

  useEffect(() => {
    // 1. Lenis Smooth Scroll Ayarları
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. Özel İmleç (Cursor) Takip Mekanizması
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);

    // 3. Hover Efektleri (Buton ve Linkler için cursor-2.svg geçişi)
    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.classList.add('hovered');
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('hovered');
    };

    // Dinamik olarak eklenen butonları da kapsamak için event delegation kullanıyoruz
    const handleMouseOver = (e) => {
      // Tıklanabilir elementleri hedef alıyoruz (buton, link veya role="button" olanlar)
      const target = e.target.closest('a, button, [role="button"]');
      if (target) {
        handleMouseEnter();
      } else {
        handleMouseLeave();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // 4. Sağ Tık Menüsünü Engelleme
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);

    // Temizleme (Cleanup) Fonksiyonu
    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="app-shell">
      {/* Özel imleç DOM elemanı */}
      <div ref={cursorRef} className="custom-cursor" />

      <Header />
      <HomePage />
    </div>
  );
}

export default App;
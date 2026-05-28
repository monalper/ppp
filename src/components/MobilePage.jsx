import React from 'react';
import './MobilePage.css';

const MobilePage = () => {
    return (
        <main className="studio-mobile-container">
            {/* Üst Kısım: Sol tarafa eklenen Logo */}
            <header className="studio-mobile-header">
                <img
                    src="/terminal-logo.svg"
                    alt="Studio Logo"
                    className="studio-mobile-logo"
                />
            </header>

            {/* Orta Kısım: Ana Başlık ve Mesaj */}
            <section className="studio-mobile-content">
                <h1 className="studio-mobile-title">
                    Designed for <br />
                    <span>larger screens.</span>
                </h1>

                <div className="studio-mobile-divider"></div>

                <p className="studio-mobile-message">
                    This site is designed exclusively for wide-screen displays to provide a better visual and interactive experience. Please visit our site using a desktop device.
                </p>
            </section>

            {/* Alt Kısım: Görünürlüğü artırılmış alt bilgi */}
            <footer className="studio-mobile-footer">
            </footer>
        </main>
    );
};

export default MobilePage;
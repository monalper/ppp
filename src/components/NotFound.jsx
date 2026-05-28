import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <main className="studio-404-container">
            {/* Üst Kısım: Sol tarafa eklenen Logo */}
            <header className="studio-404-header">
                <img
                    src="/terminal-logo.svg"
                    alt="Studio Logo"
                    className="studio-404-logo"
                />
            </header>

            {/* Orta Kısım: Başlık, Metin ve Buton */}
            <section className="studio-404-content">
                <h1 className="studio-404-title">
                    Lost in <br />
                    <span>the Desert.</span>
                </h1>

                <p className="studio-404-message">
                    The page you're looking for may have been moved, deleted, or never existed. Please return to the homepage to continue.
                </p>

                <Link to="/" className="studio-404-link">
                    Return to index
                </Link>
            </section>

            {/* Alt Kısım */}
            <footer className="studio-404-footer">
            </footer>
        </main>
    );
};

export default NotFound;
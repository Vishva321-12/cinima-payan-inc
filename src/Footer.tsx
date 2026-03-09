import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaYoutube, FaArrowUp } from 'react-icons/fa';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ═══════════════════════════════════════════
           FOOTER
        ═══════════════════════════════════════════ */
        .cp-ft-footer {
          background: #000;
          color: #fff;
          padding: 90px 10% 48px;
          position: relative;
          overflow: hidden;
        }

        .cp-ft-footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(50,197,244,0.4) 30%,
            rgba(253,224,71,0.4) 70%,
            transparent
          );
        }

        .cp-ft-footer::after {
          content: '終';
          position: absolute;
          right: 4%; bottom: -30px;
          font-size: 22rem;
          color: rgba(255,255,255,0.012);
          font-family: serif; line-height: 1;
          pointer-events: none; user-select: none; z-index: 0;
        }

        /* ─── GRID ─────────────────────────────── */
        .cp-ft-grid {
          display: grid;
          grid-template-columns: 1.5fr 2fr 1fr;
          gap: 55px;
          margin-bottom: 70px;
          position: relative; z-index: 2;
        }

        /* ─── BRAND ────────────────────────────── */
        .cp-ft-brand-pre {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 12px;
        }
        .cp-ft-brand-pre-line {
          width: 24px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-ft-brand-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 4px;
          color: rgba(253,224,71,0.85); text-transform: uppercase;
        }

        .cp-ft-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 400;
          color: #fde047;
          letter-spacing: 3px; line-height: 1;
          margin: 0 0 12px;
        }

        .cp-ft-brand-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.2), rgba(50,197,244,0.15), transparent);
          margin-bottom: 14px;
        }

        .cp-ft-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          max-width: 240px; line-height: 1.8;
          margin: 0;
        }

        .cp-ft-socials {
          display: flex; gap: 14px; margin-top: 22px;
        }
        .cp-ft-socials a {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.35);
          font-size: 0.9rem;
          text-decoration: none;
          transition: border-color 0.3s, color 0.3s;
          position: relative; overflow: hidden;
        }
        .cp-ft-socials a::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-ft-socials a:hover::before { transform: scaleX(1); }
        .cp-ft-socials a:hover { color: #000; border-color: #fde047; }
        .cp-ft-socials a svg { position: relative; z-index: 1; }

        /* ─── LINKS ─────────────────────────────── */
        .cp-ft-links {
          display: flex; justify-content: space-around;
        }

        .cp-ft-col h4 {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 5px;
          color: rgba(253,224,71,0.85); text-transform: uppercase;
          margin: 0 0 20px;
        }

        .cp-ft-col a {
          display: block; text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          color: rgba(255,255,255,0.65);
          margin-bottom: 10px;
          transition: color 0.3s, padding-left 0.3s;
          position: relative;
        }
        .cp-ft-col a::before {
          content: '';
          position: absolute; left: -12px;
          top: 50%; transform: translateY(-50%);
          width: 6px; height: 1px;
          background: #fde047;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cp-ft-col a:hover { color: rgba(255,255,255,0.9); padding-left: 10px; }
        .cp-ft-col a:hover::before { opacity: 1; }

        /* ─── CONTACT ───────────────────────────── */
        .cp-ft-contact h4 {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 5px;
          color: rgba(253,224,71,0.85); text-transform: uppercase;
          margin: 0 0 20px;
        }

        .cp-ft-contact p {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
          margin: 0 0 10px; line-height: 1.7;
        }

        /* ─── BOTTOM BAR ────────────────────────── */
        .cp-ft-bottom {
          display: flex; justify-content: space-between;
          align-items: center;
          padding-top: 36px;
          border-top: 1px solid rgba(255,255,255,0.05);
          position: relative; z-index: 2;
        }

        .cp-ft-legal {
          display: flex; gap: 20px; flex-wrap: wrap;
        }
        .cp-ft-legal span {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.4); text-transform: uppercase;
        }

        .cp-ft-scroll-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 22px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.65);
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase; cursor: pointer;
          transition: color 0.4s, border-color 0.4s;
        }
        .cp-ft-scroll-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-ft-scroll-btn:hover::before { transform: scaleX(1); }
        .cp-ft-scroll-btn:hover { color: #000; border-color: #fde047; }
        .cp-ft-scroll-btn span,
        .cp-ft-scroll-btn svg { position: relative; z-index: 1; }

        /* ─── RESPONSIVE ────────────────────────── */
        @media (max-width: 1024px) {
          .cp-ft-grid { grid-template-columns: 1fr 1fr; gap: 38px; }
        }
        @media (max-width: 768px) {
          .cp-ft-grid {
            grid-template-columns: 1fr;
            gap: 32px; text-align: center;
          }
          .cp-ft-brand-pre { justify-content: center; }
          .cp-ft-tagline   { margin: 0 auto; }
          .cp-ft-socials   { justify-content: center; }
          .cp-ft-links     { flex-direction: column; gap: 28px; align-items: center; }
          .cp-ft-bottom    { flex-direction: column; gap: 18px; text-align: center; }
          .cp-ft-legal     { justify-content: center; gap: 10px; }
          .cp-ft-col a::before { display: none; }
          .cp-ft-col a:hover { padding-left: 0; }
        }
        @media (max-width: 480px) {
          .cp-ft-footer { padding: 65px 5% 32px; }
        }
      `}</style>

      <footer className="cp-ft-footer">
        <div className="cp-ft-grid">

          {/* ── BRAND ─────────────────────────────── */}
          <div className="cp-ft-brand">
            <div className="cp-ft-brand-pre">
              <div className="cp-ft-brand-pre-line" />
              <span className="cp-ft-brand-pre-text">EST. 2014</span>
            </div>

            <h2 className="cp-ft-logo">CINEMA PAYYAN</h2>
            <div className="cp-ft-brand-rule" />
            <p className="cp-ft-tagline">STORYTELLING THROUGH A CINEMATIC LENS.</p>

            <div className="cp-ft-socials">
              <a href="https://www.instagram.com/cinemapayyan.inc/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://x.com/cinemapayyan" target="_blank" rel="noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://www.youtube.com/@OpenPannaa" target="_blank" rel="noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* ── LINKS ─────────────────────────────── */}
          <div className="cp-ft-links">
            <div className="cp-ft-col">
              <h4>PRODUCTION</h4>
              <a href="#work">Projects</a>
              <a href="#about">The Studio</a>
              <a href="https://woolen-sodalite-e73.notion.site/16909085b6758040a618e11e9b9dabef" target="_blank" rel="noreferrer">
                Munai Portal
              </a>
            </div>
            <div className="cp-ft-col">
              <h4>SOCIALS</h4>
              <a href="https://www.instagram.com/cinemapayyan.inc/" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://x.com/cinemapayyan"                  target="_blank" rel="noreferrer">X (Twitter)</a>
              <a href="https://www.youtube.com/@OpenPannaa"         target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>

          {/* ── CONTACT ───────────────────────────── */}
          <div className="cp-ft-contact">
            <h4>INQUIRIES</h4>
            <p>cinemapayyanproductions<br />@gmail.com</p>
            <p>Chennai, India</p>
          </div>

        </div>

        {/* ── BOTTOM BAR ────────────────────────── */}
        <div className="cp-ft-bottom">
          <div className="cp-ft-legal">
            <span>© 2026 Cinema Payyan Productions.</span>
            <span>All Rights Reserved.</span>
          </div>

          <motion.button
            className="cp-ft-scroll-btn"
            onClick={scrollToTop}
            whileTap={{ scale: 0.95 }}
          >
            <span>BACK TO TOP</span>
            <FaArrowUp size={10} />
          </motion.button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
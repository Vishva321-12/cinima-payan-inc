import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Images } from './assets/assets';

const sections = [
  { img: Images.Munai1, title: "THE ARCHITECTS",  desc: "A CINEMAPAYYAN PRODUCT", bg: "#0a0f0e" },
  { img: Images.Munai2, title: "NARRATIVE DEPTH", desc: "A CINEMAPAYYAN PRODUCT", bg: "#0c0f0a" },
  { img: Images.Munai3, title: "THE SCRIPT LAB",  desc: "A CINEMAPAYYAN PRODUCT", bg: "#080e0e" },
  { img: Images.Munai4, title: "ARC CRAFTING",    desc: "A CINEMAPAYYAN PRODUCT", bg: "#0e0e0a" },
  { img: Images.Munai5, title: "VISIONARY FLOW",  desc: "A CINEMAPAYYAN PRODUCT", bg: "#090a0e" },
  { img: Images.Munai6, title: "DIALOGUE DESIGN", desc: "A CINEMAPAYYAN PRODUCT", bg: "#0a0e0c" },
  { img: Images.Munai7, title: "STORY PULSE",     desc: "A CINEMAPAYYAN PRODUCT", bg: "#070a09" },
  { img: Images.Munai8, title: "MUNAI CORE",      desc: "A CINEMAPAYYAN PRODUCT", bg: "#0d0e0a" },
  { img: Images.Munai9, title: "FINAL EDITION",   desc: "A CINEMAPAYYAN PRODUCT", bg: "#0a0f0e" },
];

const Munai: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 200);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');

        /* ═══════════════════════════════════════════
           WRAPPER
        ═══════════════════════════════════════════ */
        .cp-mn-wrapper {
          width: 100%;
          background: #000;
          color: #fff;
        }

        /* ═══════════════════════════════════════════
           HEADER
        ═══════════════════════════════════════════ */
        .cp-mn-header {
          text-align: center;
          padding: 110px 20px 90px;
          background: #000;
          position: relative;
          overflow: hidden;
        }

        /* top/bottom hairlines */
        .cp-mn-header::before,
        .cp-mn-header::after {
          content: '';
          position: absolute;
          left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.25), transparent);
        }
        .cp-mn-header::before { top: 28px; }
        .cp-mn-header::after  { bottom: 28px; }

        /* kanji watermark */
        .cp-mn-kanji {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          font-size: 38rem;
          color: rgba(255,255,255,0.008);
          font-family: serif; line-height: 1;
          pointer-events: none; user-select: none;
          z-index: 0;
        }

        /* pre-label */
        .cp-mn-header-pre {
          display: inline-flex; align-items: center; gap: 12px;
          margin-bottom: 18px; position: relative; z-index: 2;
        }
        .cp-mn-header-pre-line {
          width: 32px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-mn-header-pre-text {
          font-family: 'Courier New', monospace;
          font-size: 0.44rem; letter-spacing: 6px;
          color: rgba(253,224,71,0.5); text-transform: uppercase;
        }

        /* giant display title */
        .cp-mn-logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(72px, 14vw, 170px);
          font-weight: 800; font-style: italic;
          color: #fde047;
          letter-spacing: -4px; line-height: 0.9;
          text-shadow: 0 0 80px rgba(253,224,71,0.12);
          position: relative; z-index: 2;
          margin: 0 0 14px;
        }

        /* meta line */
        .cp-mn-meta {
          font-family: 'Courier New', monospace;
          font-size: 0.44rem; letter-spacing: 7px;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
          position: relative; z-index: 2;
        }

        /* gradient rule */
        .cp-mn-header-rule {
          width: 120px; height: 1px;
          background: linear-gradient(90deg, transparent, #32c5f4, #fde047, transparent);
          margin: 18px auto 0;
          opacity: 0.5;
          position: relative; z-index: 2;
        }

        /* ═══════════════════════════════════════════
           SECTIONS
        ═══════════════════════════════════════════ */
        .cp-mn-section {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 90vh;
          padding: 80px 9%;
          gap: 90px;
          position: relative;
          overflow: hidden;
          transition: background-color 1.2s ease;
        }

        .cp-mn-section.row         { flex-direction: row; }
        .cp-mn-section.row-reverse { flex-direction: row-reverse; }

        /* section top hairline */
        .cp-mn-section::before {
          content: '';
          position: absolute;
          top: 0; left: 6%; right: 6%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 50%, transparent);
          pointer-events: none;
        }

        /* section number watermark */
        .cp-mn-section-num {
          position: absolute;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 18rem; font-weight: 800; font-style: italic;
          color: rgba(255,255,255,0.018);
          line-height: 1; pointer-events: none; user-select: none;
          z-index: 0;
        }
        .cp-mn-section.row         .cp-mn-section-num { right: 5%; bottom: -40px; }
        .cp-mn-section.row-reverse .cp-mn-section-num { left: 5%;  bottom: -40px; }

        /* ─── TEXT BLOCK ────────────────────────── */
        .cp-mn-text {
          flex: 1; max-width: 460px;
          position: relative; z-index: 2;
        }

        /* pre-label */
        .cp-mn-text-pre {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
        }
        .cp-mn-text-pre-line {
          width: 28px; height: 1px;
          background: #fde047; opacity: 0.4;
        }
        .cp-mn-text-pre-txt {
          font-family: 'Courier New', monospace;
          font-size: 0.42rem; letter-spacing: 5px;
          color: rgba(253,224,71,0.4); text-transform: uppercase;
        }

        /* section title */
        .cp-mn-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.6rem, 5.5vw, 4.8rem);
          font-weight: 800; font-style: italic;
          color: #fff; line-height: 0.92;
          letter-spacing: -1px; margin: 0 0 14px;
        }

        /* gradient rule */
        .cp-mn-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(50,197,244,0.35), rgba(253,224,71,0.2), transparent);
          margin-bottom: 22px;
        }

        /* description */
        .cp-mn-desc {
          font-family: 'Courier New', monospace;
          font-size: 0.4rem; letter-spacing: 5px;
          color: rgba(255,255,255,0.3); text-transform: uppercase;
          line-height: 2;
        }

        /* CTA link */
        .cp-mn-section-cta {
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: 28px;
          position: relative; overflow: hidden;
          padding: 11px 24px;
          border: 1px solid rgba(253,224,71,0.25);
          color: rgba(253,224,71,0.6);
          text-decoration: none;
          font-family: 'Courier New', monospace;
          font-size: 0.4rem; letter-spacing: 4px;
          text-transform: uppercase;
          transition: color 0.4s;
        }
        .cp-mn-section-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-mn-section-cta:hover::before { transform: scaleX(1); }
        .cp-mn-section-cta:hover { color: #000; }
        .cp-mn-section-cta span { position: relative; z-index: 1; }

        /* ─── IMAGE BLOCK ───────────────────────── */
        .cp-mn-img-block {
          flex: 1.6;
          display: flex; justify-content: center;
          position: relative; z-index: 2;
        }

        /* outer frame — cp-corner style */
        .cp-mn-img-frame {
          position: relative; display: inline-block;
        }

        /* TL corner */
        .cp-mn-img-frame::before {
          content: '';
          position: absolute; top: -8px; left: -8px;
          width: 24px; height: 24px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          z-index: 5; pointer-events: none;
        }
        /* BR corner */
        .cp-mn-img-frame::after {
          content: '';
          position: absolute; bottom: -8px; right: -8px;
          width: 24px; height: 24px;
          border-bottom: 1px solid rgba(50,197,244,0.35);
          border-right: 1px solid rgba(50,197,244,0.35);
          z-index: 5; pointer-events: none;
        }

        /* image tag */
        .cp-mn-img-tag {
          position: absolute;
          top: 10px; right: 10px;
          font-family: 'Courier New', monospace;
          font-size: 0.36rem; letter-spacing: 3px;
          color: #000; background: #fde047;
          padding: 3px 8px; z-index: 6;
          text-transform: uppercase;
          pointer-events: none;
        }

        /* image */
        .cp-mn-img {
          max-width: 100%; max-height: 78vh;
          width: auto; height: auto;
          object-fit: contain;
          display: block;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-mn-img-frame:hover .cp-mn-img { transform: scale(1.015); }

        /* cyan scan line sweep on hover */
        .cp-mn-img-scan {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          transform: scaleX(0); transform-origin: left; z-index: 6;
          transition: transform 0.5s cubic-bezier(0.77,0,0.18,1);
          pointer-events: none;
        }
        .cp-mn-img-frame:hover .cp-mn-img-scan { transform: scaleX(1); }

        /* ═══════════════════════════════════════════
           FIXED CTA
        ═══════════════════════════════════════════ */
        .cp-mn-cta {
          position: fixed;
          bottom: 38px; right: 38px;
          z-index: 1000;
          overflow: hidden;
          display: flex; align-items: center;
          padding: 16px 32px;
          border: 1px solid #fde047;
          background: #fde047;
          color: #000;
          text-decoration: none;
          font-family: 'Courier New', monospace;
          font-size: 0.52rem; letter-spacing: 4px;
          text-transform: uppercase;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                      transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      background 0.35s, color 0.35s;
          box-shadow: 0 8px 30px rgba(253,224,71,0.2);
        }
        .cp-mn-cta.show {
          opacity: 1; transform: translateY(0);
        }
        .cp-mn-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #32c5f4;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-mn-cta:hover::before { transform: scaleX(1); }
        .cp-mn-cta:hover { color: #000; }
        .cp-mn-cta span { position: relative; z-index: 1; }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .cp-mn-section {
            flex-direction: column !important;
            text-align: center; gap: 48px;
          }
          .cp-mn-text-pre  { justify-content: center; }
          .cp-mn-rule { width: 60%; margin: 0 auto 22px; }
          .cp-mn-img { max-height: 50vh; }
          .cp-mn-section-num { display: none; }
          .cp-mn-section-cta { margin: 24px auto 0; }
        }
        @media (max-width: 768px) {
          .cp-mn-cta {
            bottom: 16px; right: 16px;
            padding: 10px 16px; font-size: 0.42rem;
          }
        }
        @media (max-width: 480px) {
          .cp-mn-logo  { font-size: 72px; }
          .cp-mn-title { font-size: 2.4rem; }
          .cp-mn-cta   { bottom: 12px; right: 12px; padding: 9px 12px; }
        }
      `}</style>

      <div className="cp-mn-wrapper">

        {/* ── FIXED CTA ────────────────────────────── */}
        <a
          href="https://woolen-sodalite-e73.notion.site/16909085b6758040a618e11e9b9dabef"
          target="_blank" rel="noreferrer"
          className={`cp-mn-cta ${scrolled ? 'show' : ''}`}
        >
          <span>MUNAI — FOCUS GROUP SUBMISSION</span>
        </a>

        {/* ── HEADER ───────────────────────────────── */}
        <header className="cp-mn-header">
          <div className="cp-mn-kanji">文</div>

          <div className="cp-mn-header-pre">
            <div className="cp-mn-header-pre-line" />
            <span className="cp-mn-header-pre-text">THE WRITERS' ROOM</span>
            <div className="cp-mn-header-pre-line" />
          </div>

          <motion.h1
            className="cp-mn-logo"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          >
            MUNAI
          </motion.h1>

          <p className="cp-mn-meta">BY CINEMAPAYYAN &bull; THE WRITERS' ROOM</p>
          <div className="cp-mn-header-rule" />
        </header>

        {/* ── SECTIONS ─────────────────────────────── */}
        <main>
          {sections.map((item, i) => (
            <section
              key={i}
              className={`cp-mn-section ${i % 2 === 0 ? 'row' : 'row-reverse'}`}
              style={{ backgroundColor: item.bg }}
            >
              {/* ghost section number */}
              <span className="cp-mn-section-num">{String(i + 1).padStart(2, '0')}</span>

              {/* text */}
              <motion.div
                className="cp-mn-text"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
              >
                <div className="cp-mn-text-pre">
                  <div className="cp-mn-text-pre-line" />
                  <span className="cp-mn-text-pre-txt">
                    {String(i + 1).padStart(2, '0')} — CINEMAPAYYAN
                  </span>
                </div>

                <h2 className="cp-mn-title">{item.title}</h2>
                <div className="cp-mn-rule" />
                <p className="cp-mn-desc">{item.desc}</p>

                <a
                  href="https://woolen-sodalite-e73.notion.site/16909085b6758040a618e11e9b9dabef"
                  target="_blank" rel="noreferrer"
                  className="cp-mn-section-cta"
                >
                  <span>EXPLORE MUNAI</span>
                </a>
              </motion.div>

              {/* image */}
              <motion.div
                className="cp-mn-img-block"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}
              >
                <div className="cp-mn-img-frame">
                  <div className="cp-mn-img-tag">
                    {String(i + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
                  </div>
                  <img src={item.img} alt={item.title} className="cp-mn-img" />
                  <div className="cp-mn-img-scan" />
                </div>
              </motion.div>
            </section>
          ))}
        </main>

      </div>
    </>
  );
};

export default Munai;
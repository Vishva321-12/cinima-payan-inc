import React from 'react';
import { motion } from 'framer-motion';
import { VideoAssets } from './assets/assets';

const ShadowPromotion: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');

        /* ═══════════════════════════════════════════
           SECTION
        ═══════════════════════════════════════════ */
        .cp-sh-section {
          background: #000;
          padding: 110px clamp(20px, 6%, 60px);
          overflow: hidden;
          position: relative;
        }
        /* top hairline */
        .cp-sh-section::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
          pointer-events: none;
        }
        /* kanji watermark */
        .cp-sh-section::after {
          content: '影';
          position: absolute;
          right: 3%; bottom: -30px;
          font-size: 22rem;
          color: rgba(255,255,255,0.012);
          font-family: serif; line-height: 1;
          pointer-events: none; user-select: none; z-index: 0;
        }

        /* ═══════════════════════════════════════════
           INNER CONTAINER
        ═══════════════════════════════════════════ */
        .cp-sh-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 65px;
          position: relative; z-index: 5;
        }

        /* ═══════════════════════════════════════════
           LEFT — CONTENT
        ═══════════════════════════════════════════ */
        .cp-sh-left { flex: 1; }

        /* pre-label */
        .cp-sh-pre {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
        }
        .cp-sh-pre-line {
          width: 32px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-sh-pre-text {
          font-family: 'Courier New', monospace;
          font-size: 0.44rem; letter-spacing: 6px;
          color: rgba(253,224,71,0.55); text-transform: uppercase;
        }

        /* main heading */
        .cp-sh-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          font-weight: 800; font-style: italic;
          color: #fff; line-height: 1.0;
          letter-spacing: -0.5px; margin: 0 0 10px;
        }
        .cp-sh-title-cyan { color: #32c5f4; font-style: normal; }

        /* gradient rule */
        .cp-sh-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.25), rgba(50,197,244,0.2), transparent);
          margin-bottom: 28px;
        }

        /* story block — replaces border-left */
        .cp-sh-story {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.06);
          border-left: 1px solid rgba(50,197,244,0.2);
          padding: 28px 28px 28px 28px;
          position: relative;
          overflow: hidden;
        }
        /* TL corner mark */
        .cp-sh-story::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 16px; height: 16px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          pointer-events: none;
        }
        /* BR corner mark */
        .cp-sh-story::after {
          content: '';
          position: absolute; bottom: 0; right: 0;
          width: 16px; height: 16px;
          border-bottom: 1px solid rgba(253,224,71,0.4);
          border-right: 1px solid rgba(253,224,71,0.4);
          pointer-events: none;
        }

        /* quote */
        .cp-sh-quote {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.05rem, 1.6vw, 1.25rem);
          font-style: italic; font-weight: 600;
          color: #fde047;
          line-height: 1.5; margin: 0 0 20px;
        }

        /* body paragraphs */
        .cp-sh-body {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.9rem, 1.3vw, 1.05rem);
          color: rgba(255,255,255,0.42);
          line-height: 1.85; margin: 0 0 14px;
        }
        .cp-sh-body strong { color: rgba(255,255,255,0.85); font-weight: 700; }
        .cp-sh-body em     { color: rgba(50,197,244,0.75); font-style: italic; }

        /* CTA — cp-cta fill-sweep */
        .cp-sh-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: 24px;
          padding: 13px 28px;
          border: 1px solid #fde047;
          color: #fde047; text-decoration: none;
          font-family: 'Courier New', monospace;
          font-size: 0.56rem; letter-spacing: 4px;
          text-transform: uppercase;
          transition: color 0.4s;
        }
        .cp-sh-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-sh-cta:hover::before { transform: scaleX(1); }
        .cp-sh-cta:hover { color: #000; }
        .cp-sh-cta span { position: relative; z-index: 1; }

        /* ═══════════════════════════════════════════
           RIGHT — VIDEO
        ═══════════════════════════════════════════ */
        .cp-sh-right { flex: 1.2; }

        /* video card — cp-yt-card style */
        .cp-sh-video-card {
          display: block;
          width: 100%; aspect-ratio: 16/9;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255,255,255,0.06);
          background: #0a0a0a;
          transition: border-color 0.4s, box-shadow 0.4s;
          text-decoration: none;
        }
        .cp-sh-video-card:hover {
          border-color: rgba(50,197,244,0.22);
          box-shadow: 0 14px 50px rgba(0,0,0,0.7);
        }

        /* TL corner */
        .cp-sh-video-card::before {
          content: '';
          position: absolute; top: 8px; left: 8px;
          width: 12px; height: 12px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          z-index: 5; pointer-events: none;
        }
        /* BR corner */
        .cp-sh-video-card::after {
          content: '';
          position: absolute; bottom: 8px; right: 8px;
          width: 12px; height: 12px;
          border-bottom: 1px solid rgba(253,224,71,0.4);
          border-right: 1px solid rgba(253,224,71,0.4);
          z-index: 5; pointer-events: none;
        }

        .cp-sh-vid {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-sh-video-card:hover .cp-sh-vid { transform: scale(1.04); }

        /* gradient overlay */
        .cp-sh-vid-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%);
          z-index: 2; pointer-events: none;
        }

        /* label tag */
        .cp-sh-vid-tag {
          position: absolute; top: 10px; right: 10px;
          font-family: 'Courier New', monospace;
          font-size: 0.38rem; letter-spacing: 3px;
          color: #000; background: #32c5f4;
          padding: 3px 8px; z-index: 6;
          text-transform: uppercase;
        }

        /* hover overlay */
        .cp-sh-vid-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; z-index: 10;
          backdrop-filter: blur(4px);
          transition: opacity 0.3s;
        }
        .cp-sh-video-card:hover .cp-sh-vid-overlay { opacity: 1; }

        .cp-sh-vid-label {
          font-family: 'Courier New', monospace;
          font-size: 0.46rem; letter-spacing: 4px;
          color: #000; background: #fde047;
          padding: 8px 20px; text-transform: uppercase;
          transform: translateY(6px);
          transition: transform 0.3s;
        }
        .cp-sh-video-card:hover .cp-sh-vid-label { transform: translateY(0); }

        /* scan line sweep */
        .cp-sh-scan {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          transform: scaleX(0); transform-origin: left;
          z-index: 6;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-sh-video-card:hover .cp-sh-scan { transform: scaleX(1); }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 992px) {
          .cp-sh-inner {
            flex-direction: column;
            text-align: center;
            gap: 42px;
          }
          .cp-sh-pre  { justify-content: center; }
          .cp-sh-rule { margin: 0 auto 28px; width: 60%; }
          .cp-sh-cta  { margin: 24px auto 0; }
          .cp-sh-right { width: 100%; }
        }
        @media (max-width: 480px) {
          .cp-sh-section { padding: 70px clamp(16px,5%,32px); }
          .cp-sh-title   { font-size: 2.2rem; }
          .cp-sh-quote   { font-size: 1rem; }
          .cp-sh-story   { padding: 20px 16px; }
        }
      `}</style>

      <section className="cp-sh-section">
        <div className="cp-sh-inner">

          {/* ── LEFT: CONTENT ───────────────────── */}
          <div className="cp-sh-left">

            {/* pre-label */}
            <div className="cp-sh-pre">
              <div className="cp-sh-pre-line" />
              <span className="cp-sh-pre-text">CINEMAPAYYAN ORIGINALS</span>
            </div>

            {/* heading */}
            <motion.h2
              className="cp-sh-title"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
            >
              SHADOW{' '}
              <span className="cp-sh-title-cyan">PROMOTION</span>
            </motion.h2>

            {/* rule */}
            <div className="cp-sh-rule" />

            {/* story block */}
            <div className="cp-sh-story">
              <p className="cp-sh-quote">
                "En annanukku naan dhan seiven moment 🙈"
              </p>

              <p className="cp-sh-body">
                When we at <strong>CinemaPayyan Inc</strong> envisioned pushing the boundaries
                of the famous shadow play for Sivakarthikeyan's{' '}
                <em>Maaveeran</em>, we collaborated with art curator Mamaran from
                Alai Global to bring this unique vision to life.
              </p>

              <p className="cp-sh-body">
                The execution was masterfully handled by{' '}
                <strong>Out Of The Box Sale</strong>, featuring an incredible design
                by Siva Digital Art. This grand vision was made possible through the
                support of SPI Cinemas and PVR Cinemas for a Shanthi Talkies production.
              </p>

              <a
                href="https://www.instagram.com/reel/CuoYbZqghwl/"
                target="_blank"
                rel="noreferrer"
                className="cp-sh-cta"
              >
                <span>WATCH FULL VIDEO 🔥</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT: VIDEO ─────────────────────── */}
          <div className="cp-sh-right">
            <a
              href="https://www.instagram.com/reel/CuoYbZqghwl/"
              target="_blank"
              rel="noreferrer"
              className="cp-sh-video-card"
            >
              <video autoPlay muted loop playsInline className="cp-sh-vid">
                <source src={VideoAssets.vjPreviews[33]} type="video/mp4" />
              </video>
              <div className="cp-sh-vid-grad" />
              <div className="cp-sh-vid-tag">REEL</div>
              <div className="cp-sh-vid-overlay">
                <span className="cp-sh-vid-label">WATCH NOW</span>
              </div>
              <div className="cp-sh-scan" />
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default ShadowPromotion;
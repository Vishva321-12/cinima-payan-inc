import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, VideoAssets } from "./assets/assets";

const Comic: React.FC = () => {
  const comicPages = [
    Images.ComicPag0,
    Images.ComicPag1,
    Images.ComicPag2,
    Images.ComicPag3,
    Images.ComicPag4,
    Images.ComicPag5,
    Images.ComicPag6,
    Images.ComicPag7,
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const paginate = (dir: number) => {
    const next = currentPage + dir;
    if (next >= 0 && next < comicPages.length) setCurrentPage(next);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ═══════════════════════════════════════════
           BG: Deep Sepia Ink — #0e0a04
           Flow: cold steel #080d12 → warm sepia #0e0a04
           Feels like: stepping from a cinema lobby
           into an aged comic archive room.
           Yellow accents glow richly on this base.
        ═══════════════════════════════════════════ */
        .cp-comic-section {
          background: #0e0a04;
          color: #fff;
          padding: 100px 0 120px;
          overflow-x: hidden;
          position: relative;
        }

        /* Top fade — blends cold steel into sepia */
        .cp-comic-section-top-fade {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 140px;
          background: linear-gradient(to bottom, rgba(8,13,18,0.5), transparent);
          pointer-events: none;
          z-index: 1;
        }

        /* Warm sepia ambient glow — center */
        .cp-comic-ambient {
          position: absolute;
          top: 30%; left: 50%;
          transform: translate(-50%, -50%);
          width: 70%; height: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(253,224,71,0.04) 0%,
            rgba(180,100,20,0.03) 40%,
            transparent 70%
          );
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        /* Bottom-right cyan accent glow */
        .cp-comic-cool-accent {
          position: absolute;
          bottom: 0; right: 0;
          width: 380px; height: 380px;
          background: radial-gradient(circle at bottom right, rgba(50,197,244,0.045) 0%, transparent 65%);
          pointer-events: none;
          z-index: 1;
        }

        /* Kanji watermark — sepia tinted */
        .cp-comic-section::after {
          content: '物';
          position: absolute;
          right: 3%; bottom: -20px;
          font-size: 22rem;
          color: rgba(253,200,80,0.018);
          font-family: serif;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* Top separator — warm gold tint */
        .cp-comic-section::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.10) 50%, transparent);
          pointer-events: none;
        }

        /* ═══════════════════════════════════════════
           HEADER
        ═══════════════════════════════════════════ */
        .cp-comic-header {
          text-align: center;
          margin-bottom: 65px;
          position: relative;
          z-index: 5;
        }

        .cp-comic-pre {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .cp-comic-pre-line {
          width: 32px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-comic-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 5px;
          color: rgba(253,224,71,0.85);
          text-transform: uppercase;
        }

        .cp-comic-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 9vw, 6.5rem);
          font-weight: 400;
          color: #fff;
          line-height: 0.95;
          letter-spacing: 3px;
          margin: 0 0 18px;
          /* sepia paper glow on title */
          text-shadow: 0 0 100px rgba(253,200,80,0.10);
        }
        .cp-comic-title-cyan   { color: #32c5f4; }
        .cp-comic-title-yellow { color: #fde047; }

        .cp-comic-rule {
          width: 80px; height: 1px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          margin: 0 auto;
          opacity: 0.7;
        }

        /* ═══════════════════════════════════════════
           BTS IMAGE
        ═══════════════════════════════════════════ */
        .cp-bts-wrap {
          max-width: 900px;
          margin: 0 auto 90px;
          padding: 0 clamp(20px, 5%, 40px);
          position: relative;
          z-index: 5;
        }

        .cp-bts-container {
          position: relative;
          border: 1px solid rgba(253,224,71,0.08);
          background: #0a0702;
          overflow: hidden;
          transition: border-color 0.5s, box-shadow 0.5s;
        }
        .cp-bts-container:hover {
          border-color: rgba(253,224,71,0.18);
          box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(253,200,80,0.06);
        }

        /* BTS badge */
        .cp-bts-badge {
          position: absolute;
          top: 18px; left: 18px;
          display: flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.85);
          background: rgba(14,10,4,0.82);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 7px 14px;
          z-index: 10;
          text-transform: uppercase;
          transition: border-color 0.3s, color 0.3s;
        }
        .cp-bts-container:hover .cp-bts-badge {
          border-color: #fde047; color: #fde047;
        }
        .cp-bts-badge-dot {
          width: 6px; height: 6px;
          background: #32c5f4;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .cp-bts-img-wrap {
          width: 100%;
          aspect-ratio: 16/7;
          overflow: hidden;
          position: relative;
        }
        .cp-bts-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 20%;
          filter: contrast(1.06) brightness(0.85) sepia(0.08);
          transition: transform 0.6s ease;
          display: block;
        }
        .cp-bts-container:hover .cp-bts-img { transform: scale(1.03); }

        .cp-bts-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(circle, transparent 30%, rgba(14,10,4,0.72) 100%);
          pointer-events: none;
        }

        /* corner marks */
        .cp-bts-corner-tl,
        .cp-bts-corner-br {
          position: absolute; z-index: 11;
          width: 22px; height: 22px;
          pointer-events: none;
        }
        .cp-bts-corner-tl::before, .cp-bts-corner-tl::after,
        .cp-bts-corner-br::before, .cp-bts-corner-br::after {
          content: '';
          position: absolute;
          background: rgba(253,224,71,0.45);
        }
        .cp-bts-corner-tl::before { width:100%; height:1px; top:0; left:0; }
        .cp-bts-corner-tl::after  { width:1px; height:100%; top:0; left:0; }
        .cp-bts-corner-tl { top: 0; left: 0; }

        .cp-bts-corner-br::before { width:100%; height:1px; bottom:0; right:0; }
        .cp-bts-corner-br::after  { width:1px; height:100%; bottom:0; right:0; }
        .cp-bts-corner-br { bottom: 0; right: 0; }

        /* ═══════════════════════════════════════════
           COMIC GRID
        ═══════════════════════════════════════════ */
        .cp-comic-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 65px;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5%, 50px);
          align-items: center;
          position: relative;
          z-index: 5;
        }

        /* ── Book viewer ── */
        .cp-book-wrap { max-width: 340px; margin: 0 auto; }

        .cp-comic-sheet {
          aspect-ratio: 3/4.2;
          border: 1px solid rgba(253,224,71,0.10);
          position: relative;
          background: #09060100;
          box-shadow:
            0 20px 60px rgba(0,0,0,0.75),
            0 0 30px rgba(253,200,80,0.05);
          overflow: hidden;
        }
        .cp-comic-sheet-img {
          width: 100%; height: 100%;
          object-fit: contain;
          display: block;
        }

        /* issue tag */
        .cp-issue-tag {
          position: absolute;
          top: 12px; left: 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 3px;
          color: #000;
          background: #fde047;
          padding: 4px 10px;
          z-index: 4;
          text-transform: uppercase;
        }

        /* navigation bar */
        .cp-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding: 13px 18px;
          background: rgba(253,224,71,0.025);
          border: 1px solid rgba(253,224,71,0.08);
        }

        /* nav buttons */
        .cp-nav-btn {
          position: relative;
          overflow: hidden;
          padding: 8px 20px;
          border: 1px solid #32c5f4;
          color: #32c5f4;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.35s;
        }
        .cp-nav-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #32c5f4;
          transform: scaleX(0); transform-origin: left;
          z-index: 0;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-nav-btn:hover:not(:disabled)::before { transform: scaleX(1); }
        .cp-nav-btn:hover:not(:disabled) { color: #000; }
        .cp-nav-btn span { position: relative; z-index: 1; }
        .cp-nav-btn:disabled { opacity: 0.22; cursor: not-allowed; }

        /* dots */
        .cp-dots-row { display: flex; gap: 8px; align-items: center; }
        .cp-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.12);
          transition: background 0.3s, width 0.3s, border-radius 0.3s;
        }
        .cp-dot.active { background: #fde047; width: 18px; border-radius: 3px; }

        /* ── Vision card ── */
        .cp-vision-card {
          padding: 42px;
          background: rgba(253,224,71,0.02);
          border: 1px solid rgba(253,224,71,0.08);
          border-left: 2px solid rgba(253,224,71,0.30);
          position: relative;
          overflow: hidden;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .cp-vision-card:hover {
          border-color: rgba(253,224,71,0.20);
          box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 30px rgba(253,200,80,0.05);
        }
        /* watermark */
        .cp-vision-card::before {
          content: '制';
          position: absolute;
          right: -10px; bottom: -30px;
          font-size: 14rem;
          color: rgba(253,200,80,0.022);
          font-family: serif; line-height: 1;
          pointer-events: none; user-select: none;
        }

        .cp-vision-pre {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 14px;
        }
        .cp-vision-pre-line {
          width: 28px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-vision-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 5px;
          color: rgba(253,224,71,0.85);
          text-transform: uppercase;
        }

        .cp-vision-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 4.5vw, 4.2rem);
          font-weight: 400;
          color: #fde047;
          margin: 0 0 14px;
          letter-spacing: 3px;
          line-height: 1;
        }

        .cp-vision-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.25), rgba(50,197,244,0.2), transparent);
          margin-bottom: 24px;
        }

        .cp-vision-lead {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.9rem, 1.3vw, 1rem);
          font-weight: 400;
          color: rgba(255,255,255,0.85);
          line-height: 1.75;
          margin-bottom: 18px;
        }

        .cp-vision-body {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.8rem, 1.1vw, 0.875rem);
          font-weight: 300;
          color: rgba(255,255,255,0.40);
          line-height: 1.85;
          margin-bottom: 28px;
        }
        .cp-vision-body strong { color: rgba(253,224,71,0.8); font-weight: 600; }



        /* CTA */
        .cp-vision-cta {
          position: relative; overflow: hidden;
          display: block; width: 100%;
          padding: 15px;
          border: 1px solid #fde047;
          color: #fde047;
          text-decoration: none;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          transition: color 0.4s;
        }
        .cp-vision-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left;
          z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-vision-cta:hover::before { transform: scaleX(1); }
        .cp-vision-cta:hover { color: #000; }
        .cp-vision-cta span { position: relative; z-index: 1; }

        /* ═══════════════════════════════════════════
           REEL FOOTER
        ═══════════════════════════════════════════ */
        .cp-reel-footer {
          text-align: center;
          padding-top: 100px;
          position: relative;
          z-index: 5;
        }
        .cp-reel-footer::before {
          content: '';
          position: absolute;
          top: 40px; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.08) 50%, transparent);
          pointer-events: none;
        }

        .cp-reel-pre {
          display: inline-flex; align-items: center; gap: 12px;
          margin-bottom: 14px;
        }
        .cp-reel-pre-line {
          width: 32px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-reel-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 5px;
          color: rgba(253,224,71,0.85);
          text-transform: uppercase;
        }

        .cp-reel-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 400;
          color: #fde047;
          margin: 0 0 48px;
          letter-spacing: 4px;
        }
        .cp-reel-title span { color: #fff; }

        .cp-reel-layout {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* side panels — sepia tinted */
        .cp-reel-side {
          flex: 1;
          height: 390px;
          border-top: 1px solid rgba(253,224,71,0.04);
          border-bottom: 1px solid rgba(253,224,71,0.04);
        }
        .cp-reel-side--left {
          background: linear-gradient(to right, #0e0a04, transparent);
        }
        .cp-reel-side--right {
          background: linear-gradient(to left, #0e0a04, transparent);
        }

        /* video frame */
        .cp-video-frame {
          width: 270px;
          aspect-ratio: 9/16;
          position: relative;
          border: 1px solid rgba(253,224,71,0.10);
          z-index: 10;
          background: #090601;
          box-shadow:
            0 0 60px rgba(0,0,0,1),
            0 0 30px rgba(253,200,80,0.06);
          flex-shrink: 0;
          overflow: hidden;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .cp-video-frame:hover {
          border-color: rgba(253,224,71,0.25);
          box-shadow:
            0 0 60px rgba(0,0,0,1),
            0 0 40px rgba(253,224,71,0.10);
        }

        /* corner marks */
        .cp-video-corner-tl,
        .cp-video-corner-br {
          position: absolute; z-index: 5;
          width: 12px; height: 12px;
          pointer-events: none;
        }
        .cp-video-corner-tl::before, .cp-video-corner-tl::after,
        .cp-video-corner-br::before, .cp-video-corner-br::after {
          content: '';
          position: absolute;
          background: rgba(253,224,71,0.4);
        }
        .cp-video-corner-tl::before { width:100%; height:1px; top:0; left:0; }
        .cp-video-corner-tl::after  { width:1px; height:100%; top:0; left:0; }
        .cp-video-corner-tl { top:8px; left:8px; }

        .cp-video-corner-br::before { width:100%; height:1px; bottom:0; right:0; }
        .cp-video-corner-br::after  { width:1px; height:100%; bottom:0; right:0; }
        .cp-video-corner-br { bottom:8px; right:8px; }

        .cp-video-el {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .cp-video-inner-vignette {
          position: absolute; inset: 0;
          box-shadow: inset 0 0 35px rgba(0,0,0,0.9);
          pointer-events: none;
        }

        /* label tab */
        .cp-video-tag {
          position: absolute;
          bottom: -1px; left: 50%;
          transform: translateX(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 3px;
          color: #000;
          background: #32c5f4;
          padding: 5px 20px;
          white-space: nowrap;
          text-transform: uppercase;
          z-index: 6;
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 960px) {
          .cp-comic-grid { grid-template-columns: 1fr; gap: 40px; }
          .cp-book-wrap  { max-width: 300px; }
          .cp-vision-card { padding: 30px 24px; }
        }
        @media (max-width: 600px) {
          .cp-comic-section { padding: 70px 0 80px; }
          .cp-reel-side { display: none; }
          .cp-bts-img-wrap { aspect-ratio: 16/9; }
          .cp-video-frame { width: 220px; }
          .cp-vision-card { padding: 24px 18px; }
          .cp-vision-card::before { display: none; }
          .cp-bts-badge { top: auto; bottom: 18px; left: 18px; }
        }
      `}</style>

      <section className="cp-comic-section">
        <div className="cp-comic-section-top-fade" />
        <div className="cp-comic-ambient" />
        <div className="cp-comic-cool-accent" />

        {/* ── HEADER ──────────────────────────────── */}
        <header className="cp-comic-header">
          <div className="cp-comic-pre">
            <div className="cp-comic-pre-line" />
            <span className="cp-comic-pre-text">CINEMAPAYYAN ORIGINALS</span>
            <div className="cp-comic-pre-line" />
          </div>
          <motion.h1
            className="cp-comic-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            RETRO <span className="cp-comic-title-cyan">BTS</span>{" "}
            <span className="cp-comic-title-yellow">COMIC</span>
          </motion.h1>
          <div className="cp-comic-rule" />
        </header>

        {/* ── BTS IMAGE ───────────────────────────── */}
        <div className="cp-bts-wrap">
          <div className="cp-bts-container">
            <div className="cp-bts-badge">
              <div className="cp-bts-badge-dot" />
              <span>BEHIND THE SCENES</span>
            </div>
            <div className="cp-bts-img-wrap">
              <img
                src={Images.ComicCOverimg}
                alt="BTS"
                className="cp-bts-img"
              />
              <div className="cp-bts-vignette" />
            </div>
            <div className="cp-bts-corner-tl" />
            <div className="cp-bts-corner-br" />
          </div>
        </div>

        {/* ── COMIC GRID ──────────────────────────── */}
        <div className="cp-comic-grid">
          {/* Book viewer */}
          <div className="cp-book-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                className="cp-comic-sheet"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <img
                  src={comicPages[currentPage]}
                  alt="Comic Page"
                  className="cp-comic-sheet-img"
                />
                <div className="cp-issue-tag">ISSUE.{currentPage + 1}</div>
              </motion.div>
            </AnimatePresence>

            {/* Nav bar */}
            <div className="cp-nav-bar">
              <button
                className="cp-nav-btn"
                onClick={() => paginate(-1)}
                disabled={currentPage === 0}
              >
                <span>PREV</span>
              </button>

              <div className="cp-dots-row">
                {comicPages.map((_, i) => (
                  <span
                    key={i}
                    className={`cp-dot ${i === currentPage ? "active" : ""}`}
                  />
                ))}
              </div>

              <button
                className="cp-nav-btn"
                onClick={() => paginate(1)}
                disabled={currentPage === comicPages.length - 1}
              >
                <span>NEXT</span>
              </button>
            </div>
          </div>

          {/* Vision card */}
          <aside className="cp-vision-card">
            <div className="cp-vision-pre">
              <div className="cp-vision-pre-line" />
              <span className="cp-vision-pre-text">CREATIVE VISION</span>
            </div>

            <h2 className="cp-vision-title">THE VISION</h2>
            <div className="cp-vision-rule" />

            <p className="cp-vision-lead">
              Where the raw grit of cinema meets the electric pulse of ink — a
              tribute to the golden era of visual storytelling, reimagined panel
              by panel.
            </p>

            <p className="cp-vision-body">
              Conceived and crafted by the creative force of{" "}
              <strong>Abishake Raja</strong>, every frame is a statement — bold
              lines, deeper meaning. The <strong>Cinema Payyan</strong>{" "}
              collective doesn't just make films; they leave marks. This is not
              a behind-the-scenes — it's a front-row seat to obsession.
            </p>

            <a
              href="https://www.instagram.com/cinemapayyan.inc/"
              target="_blank"
              rel="noreferrer"
              className="cp-vision-cta"
            >
              <span>VIEW FULL ARCHIVE</span>
            </a>
          </aside>
        </div>

        {/* ── REEL FOOTER ─────────────────────────── */}
        <footer className="cp-reel-footer">
          <div className="cp-reel-pre">
            <div className="cp-reel-pre-line" />
            <span className="cp-reel-pre-text">VISUAL CHRONICLE</span>
            <div className="cp-reel-pre-line" />
          </div>
          <h3 className="cp-reel-title">
            <span>EPISODE </span>PREVIEW
          </h3>

          <div className="cp-reel-layout">
            <div className="cp-reel-side cp-reel-side--left" />

            <div className="cp-video-frame">
              <video className="cp-video-el" autoPlay muted loop playsInline>
                <source src={VideoAssets.vjPreviews[22]} type="video/mp4" />
              </video>
              <div className="cp-video-inner-vignette" />
              <div className="cp-video-corner-tl" />
              <div className="cp-video-corner-br" />
              <div className="cp-video-tag">COMIC_REEL</div>
            </div>

            <div className="cp-reel-side cp-reel-side--right" />
          </div>
        </footer>
      </section>
    </>
  );
};

export default Comic;

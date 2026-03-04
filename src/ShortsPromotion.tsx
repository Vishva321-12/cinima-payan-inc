import React from 'react';
import { motion } from 'framer-motion';
import { VideoAssets, Images } from './assets/assets';

const ShortsPromotion: React.FC = () => {
  const topYT = [
    { id: 23, title: "CUSTODY Game | CSK Vs SRH - who will win?",        link: "https://youtu.be/aHxx-NtpAwQ?si=hoArL4w8_2clt2O7" },
    { id: 24, title: "Venkat Prabhu ARRESTED - CUSTODY Promo",            link: "https://youtu.be/2M-A_3U-Zmc?si=FPJ7TfFoZvRtPoZH" },
    { id: 25, title: "Naga Chaitanya tests Venkat Prabhu's patience",     link: "https://youtu.be/XbvzHgeK3VI?si=HeroAaf4kXPLaDLF" },
  ];

  const middleReels = [
    { id: 26, title: "What's holding everyone back?",          link: "https://www.instagram.com/reel/DHFzEYph_sM/" },
    { id: 28, title: "No matter how hard you hit, it'll stand tall", link: "https://www.instagram.com/reel/DHLXS6ghJfr/" },
  ];

  const bottomYT = [
    { id: 29, title: "Mood Of Iraivan",               link: "https://youtu.be/3IAV3UISk8U?si=ZwWgCxUeejVHDsqW" },
    { id: 30, title: "RaguThatha Countdown Series 1", link: "https://www.instagram.com/reel/C-ozgh8vB_9/" },
    { id: 31, title: "RaguThatha Countdown Series",   link: "https://www.instagram.com/reel/C-hRTVyIwLj/" },
  ];

  const specialPromo = {
    id: 32,
    title: "AMAZON PRIME X CINEMAPAYYAN",
    link: "https://youtu.be/tclNknwYTS0?si=6PeS3GpsiD7bqPJS",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');

        /* ═══════════════════════════════════════════
           SECTION
        ═══════════════════════════════════════════ */
        .cp-sp-section {
          background: #000;
          color: #fff;
          padding: 100px 0 120px;
          overflow-x: hidden;
          position: relative;
        }
        .cp-sp-section::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
          pointer-events: none;
        }
        .cp-sp-section::after {
          content: '映';
          position: absolute;
          right: 3%; bottom: -20px;
          font-size: 22rem;
          color: rgba(255,255,255,0.012);
          font-family: serif; line-height: 1;
          pointer-events: none; user-select: none; z-index: 0;
        }
        .cp-sp-section a { text-decoration: none !important; color: inherit; }

        /* ═══════════════════════════════════════════
           HEADER
        ═══════════════════════════════════════════ */
        .cp-sp-header {
          text-align: center;
          margin-bottom: 65px;
          position: relative; z-index: 5;
        }
        .cp-sp-pre {
          display: inline-flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
        }
        .cp-sp-pre-line {
          width: 32px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-sp-pre-text {
          font-family: 'Courier New', monospace;
          font-size: 0.44rem; letter-spacing: 6px;
          color: rgba(253,224,71,0.55); text-transform: uppercase;
        }
        .cp-sp-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 7.5vw, 5rem);
          font-weight: 800; font-style: italic;
          color: #fff; line-height: 0.95;
          letter-spacing: -1px; margin: 0 0 18px;
        }
        .cp-sp-title-yellow { color: #fde047; font-style: normal; }
        .cp-sp-rule {
          width: 80px; height: 1px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          margin: 0 auto; opacity: 0.7;
        }

        /* ═══════════════════════════════════════════
           SECTION LABEL (reused above each grid)
        ═══════════════════════════════════════════ */
        .cp-sp-label-row {
          display: flex; align-items: center; gap: 12px;
          max-width: 1180px;
          margin: 0 auto 24px;
          padding: 0 clamp(20px,5%,40px);
          position: relative; z-index: 5;
        }
        .cp-sp-label-line {
          width: 28px; height: 1px;
          background: #fde047; opacity: 0.4;
        }
        .cp-sp-label-text {
          font-family: 'Courier New', monospace;
          font-size: 0.42rem; letter-spacing: 5px;
          color: rgba(253,224,71,0.4); text-transform: uppercase;
        }

        /* ═══════════════════════════════════════════
           YT GRID
        ═══════════════════════════════════════════ */
        .cp-sp-yt-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1180px;
          margin: 0 auto 70px;
          padding: 0 clamp(20px,5%,40px);
          position: relative; z-index: 5;
        }

        /* card */
        .cp-sp-yt-card {
          display: flex; flex-direction: column;
          background: #080808;
          border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .cp-sp-yt-card:hover {
          border-color: rgba(253,224,71,0.18);
          box-shadow: 0 14px 44px rgba(0,0,0,0.65);
        }

        /* thumbnail */
        .cp-sp-thumb {
          position: relative;
          width: 100%; aspect-ratio: 16/9;
          background: #0a0a0a; overflow: hidden;
        }
        /* TL corner */
        .cp-sp-thumb::before {
          content: '';
          position: absolute;
          top: 8px; left: 8px;
          width: 10px; height: 10px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          z-index: 4; pointer-events: none;
        }
        /* BR corner */
        .cp-sp-thumb::after {
          content: '';
          position: absolute;
          bottom: 8px; right: 8px;
          width: 10px; height: 10px;
          border-bottom: 1px solid rgba(253,224,71,0.4);
          border-right: 1px solid rgba(253,224,71,0.4);
          z-index: 4; pointer-events: none;
        }

        .cp-sp-vid {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-sp-yt-card:hover .cp-sp-vid { transform: scale(1.04); }

        /* gradient overlay on thumb */
        .cp-sp-thumb-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%);
          z-index: 2; pointer-events: none;
        }

        /* YT label tag */
        .cp-sp-yt-tag {
          position: absolute;
          top: 10px; right: 10px;
          font-family: 'Courier New', monospace;
          font-size: 0.38rem; letter-spacing: 3px;
          color: #000; background: #fde047;
          padding: 3px 8px; z-index: 5;
          text-transform: uppercase;
        }

        /* hover overlay */
        .cp-sp-hover-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.72);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; z-index: 10;
          backdrop-filter: blur(4px);
          transition: opacity 0.3s;
        }
        .cp-sp-yt-card:hover .cp-sp-hover-overlay,
        .cp-sp-reel-card:hover .cp-sp-hover-overlay,
        .cp-sp-large-card:hover .cp-sp-hover-overlay { opacity: 1; }

        .cp-sp-hover-label {
          font-family: 'Courier New', monospace;
          font-size: 0.46rem; letter-spacing: 4px;
          color: #000; background: #fde047;
          padding: 8px 18px; text-transform: uppercase;
          transform: translateY(6px);
          transition: transform 0.3s;
        }
        .cp-sp-yt-card:hover .cp-sp-hover-label,
        .cp-sp-reel-card:hover .cp-sp-hover-label,
        .cp-sp-large-card:hover .cp-sp-hover-label { transform: translateY(0); }

        /* card info */
        .cp-sp-yt-info {
          padding: 16px 18px 20px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .cp-sp-yt-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.95rem, 1.6vw, 1.15rem);
          font-weight: 700; letter-spacing: 0.5px;
          color: rgba(255,255,255,0.85); margin: 0;
          line-height: 1.4;
          transition: color 0.3s;
          /* left accent line */
          border-left: 2px solid rgba(253,224,71,0.3);
          padding-left: 10px;
        }
        .cp-sp-yt-card:hover .cp-sp-yt-title { color: #fff; }

        /* scan line on hover — cp-yt-scan style */
        .cp-sp-scan {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #fde047, #32c5f4);
          transform-origin: left; z-index: 6;
        }

        /* ═══════════════════════════════════════════
           REELS + CENTER BRAND
        ═══════════════════════════════════════════ */
        .cp-sp-reels-hub {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          max-width: 1180px;
          margin: 0 auto 80px;
          padding: 0 clamp(20px,5%,40px);
          position: relative; z-index: 5;
        }

        /* reel card */
        .cp-sp-reel-card {
          flex: 0 0 240px;
          aspect-ratio: 9/16;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          position: relative;
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.45s;
        }
        .cp-sp-reel-card:hover {
          border-color: rgba(50,197,244,0.22);
          box-shadow: 0 10px 35px rgba(0,0,0,0.65);
          transform: translateY(-8px);
        }

        /* reel corner marks */
        .cp-sp-reel-tl, .cp-sp-reel-br {
          position: absolute; z-index: 4;
          width: 10px; height: 10px; pointer-events: none;
        }
        .cp-sp-reel-tl::before, .cp-sp-reel-tl::after,
        .cp-sp-reel-br::before, .cp-sp-reel-br::after {
          content: ''; position: absolute;
          background: rgba(253,224,71,0.35);
        }
        .cp-sp-reel-tl::before { width:100%; height:1px; top:0; left:0; }
        .cp-sp-reel-tl::after  { width:1px; height:100%; top:0; left:0; }
        .cp-sp-reel-tl { top:7px; left:7px; }
        .cp-sp-reel-br::before { width:100%; height:1px; bottom:0; right:0; }
        .cp-sp-reel-br::after  { width:1px; height:100%; bottom:0; right:0; }
        .cp-sp-reel-br { bottom:7px; right:7px; transform: scale(-1); }

        /* reel gradient */
        .cp-sp-reel-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.7) 100%);
          z-index: 2; pointer-events: none;
        }

        /* center brand panel */
        .cp-sp-brand-center {
          flex: 1;
          text-align: center;
          display: flex; flex-direction: column;
          align-items: center; gap: 0;
          position: relative;
        }

        .cp-sp-brand-logo {
          height: 70px;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 12px rgba(50,197,244,0.4));
        }

        .cp-sp-brand-pre {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 12px;
        }
        .cp-sp-brand-pre-line {
          width: 24px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-sp-brand-pre-text {
          font-family: 'Courier New', monospace;
          font-size: 0.42rem; letter-spacing: 5px;
          color: rgba(253,224,71,0.55); text-transform: uppercase;
        }

        .cp-sp-brand-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 800; font-style: italic;
          color: #fde047;
          margin: 0 0 14px; letter-spacing: -0.5px; line-height: 1;
        }

        .cp-sp-brand-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.25), rgba(50,197,244,0.2), transparent);
          margin-bottom: 18px;
        }

        .cp-sp-brand-desc {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.9rem, 1.3vw, 1.05rem);
          color: rgba(255,255,255,0.45);
          line-height: 1.8; margin: 0;
        }
        .cp-sp-brand-desc strong {
          display: block; margin-top: 14px;
          color: #fde047; font-weight: 700;
          font-size: 1.1em; letter-spacing: 2px;
          text-transform: uppercase;
          animation: cpPulse 2s infinite ease-in-out;
        }
        @keyframes cpPulse {
          0%,100% { opacity: 0.8; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.03); }
        }

        /* ═══════════════════════════════════════════
           SPECIAL PROMO
        ═══════════════════════════════════════════ */
        .cp-sp-special {
          background: rgba(255,255,255,0.015);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 70px clamp(20px,5%,40px);
          margin-top: 20px;
          position: relative; z-index: 5;
        }
        /* top separator */
        .cp-sp-special::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
        }

        .cp-sp-special-inner {
          max-width: 1080px;
          margin: 0 auto;
          display: flex; align-items: center; gap: 60px;
        }

        .cp-sp-special-video { flex: 1.2; position: relative; }

        /* large video card — cp-yt-card style */
        .cp-sp-large-card {
          display: block; position: relative;
          border: 1px solid rgba(255,255,255,0.06);
          background: #000; overflow: hidden;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .cp-sp-large-card:hover {
          border-color: rgba(50,197,244,0.22);
          box-shadow: 0 14px 44px rgba(0,0,0,0.7);
        }
        .cp-sp-large-card video {
          width: 100%; aspect-ratio: 16/9;
          display: block; object-fit: cover;
          transition: transform 0.5s ease;
        }
        .cp-sp-large-card:hover video { transform: scale(1.03); }

        /* TL / BR corners on large card */
        .cp-sp-large-card::before {
          content: '';
          position: absolute; top:8px; left:8px;
          width:10px; height:10px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          z-index:5; pointer-events:none;
        }
        .cp-sp-large-card::after {
          content: '';
          position: absolute; bottom:8px; right:8px;
          width:10px; height:10px;
          border-bottom: 1px solid rgba(253,224,71,0.4);
          border-right: 1px solid rgba(253,224,71,0.4);
          z-index:5; pointer-events:none;
        }

        /* prime badge */
        .cp-sp-prime-badge {
          position: absolute; top: 12px; left: 12px;
          font-family: 'Courier New', monospace;
          font-size: 0.38rem; letter-spacing: 3px;
          color: #000; background: #00A8E1;
          padding: 4px 10px; z-index: 15;
          text-transform: uppercase;
        }

        /* scan line */
        .cp-sp-large-scan {
          position: absolute; bottom:0; left:0; right:0;
          height: 2px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          transform-origin: left; z-index: 6;
        }

        /* special text side */
        .cp-sp-special-text { flex: 0.8; }

        .cp-sp-special-pre {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 14px;
        }
        .cp-sp-special-pre-line {
          width: 28px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-sp-special-pre-txt {
          font-family: 'Courier New', monospace;
          font-size: 0.42rem; letter-spacing: 5px;
          color: rgba(253,224,71,0.5); text-transform: uppercase;
        }

        .cp-sp-special-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 800; font-style: italic;
          color: #32c5f4; margin: 0 0 14px;
          letter-spacing: -0.5px; line-height: 1.05;
        }

        .cp-sp-special-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.25), rgba(50,197,244,0.2), transparent);
          margin-bottom: 22px;
        }

        .cp-sp-special-body {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.9rem, 1.3vw, 1.05rem);
          line-height: 1.85; color: rgba(255,255,255,0.4);
          margin-bottom: 32px;
        }

        /* CTA — fill sweep */
        .cp-sp-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 28px;
          border: 1px solid #fde047;
          color: #fde047; text-decoration: none;
          font-family: 'Courier New', monospace;
          font-size: 0.54rem; letter-spacing: 4px;
          text-transform: uppercase;
          transition: color 0.4s;
        }
        .cp-sp-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-sp-cta:hover::before { transform: scaleX(1); }
        .cp-sp-cta:hover { color: #000; }
        .cp-sp-cta span { position: relative; z-index: 1; }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .cp-sp-yt-grid { grid-template-columns: repeat(2,1fr); }
          .cp-sp-special-inner { gap: 32px; }
          .cp-sp-reel-card { flex: 0 0 190px; }
        }
        @media (max-width: 768px) {
          .cp-sp-yt-grid { grid-template-columns: 1fr; }
          .cp-sp-reels-hub { flex-direction: column; gap: 28px; }
          .cp-sp-brand-center { order: -1; margin-bottom: 10px; }
          .cp-sp-reel-card { width: 100%; max-width: 260px; flex: none; }
          .cp-sp-special-inner { flex-direction: column; gap: 28px; }
          .cp-sp-special-video,
          .cp-sp-special-text { width: 100%; flex: none; }
        }
        @media (max-width: 480px) {
          .cp-sp-section { padding: 70px 0 80px; }
          .cp-sp-title { font-size: 2.6rem; }
          .cp-sp-special-title { font-size: 1.8rem; }
        }
      `}</style>

      <section className="cp-sp-section">

        {/* ── HEADER ──────────────────────────────── */}
        <header className="cp-sp-header">
          <div className="cp-sp-pre">
            <div className="cp-sp-pre-line" />
            <span className="cp-sp-pre-text">CINEMAPAYYAN DIGITAL</span>
            <div className="cp-sp-pre-line" />
          </div>
          <motion.h1
            className="cp-sp-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            SHORTS{' '}
            <span className="cp-sp-title-yellow">PROMOTION</span>
          </motion.h1>
          <div className="cp-sp-rule" />
        </header>

        {/* ── TOP YT GRID ─────────────────────────── */}
        <div className="cp-sp-label-row">
          <div className="cp-sp-label-line" />
          <span className="cp-sp-label-text">YOUTUBE FEATURES</span>
        </div>

        <div className="cp-sp-yt-grid">
          {topYT.map((vid) => (
            <a key={vid.id} href={vid.link} target="_blank" rel="noreferrer" className="cp-sp-yt-card">
              <div className="cp-sp-thumb">
                <video autoPlay muted loop playsInline className="cp-sp-vid">
                  <source src={VideoAssets.vjPreviews[vid.id]} type="video/mp4" />
                </video>
                <div className="cp-sp-thumb-grad" />
                <div className="cp-sp-yt-tag">YT</div>
                <div className="cp-sp-hover-overlay">
                  <span className="cp-sp-hover-label">WATCH NOW</span>
                </div>
                <motion.div
                  className="cp-sp-scan"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.77,0,0.18,1] }}
                />
              </div>
              <div className="cp-sp-yt-info">
                <p className="cp-sp-yt-title">{vid.title}</p>
              </div>
            </a>
          ))}
        </div>

        {/* ── REELS + BRAND CENTER ─────────────────── */}
        <div className="cp-sp-reels-hub">
          {/* Reel 1 */}
          <a href={middleReels[0].link} target="_blank" rel="noreferrer" className="cp-sp-reel-card">
            <video autoPlay muted loop playsInline className="cp-sp-vid" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}>
              <source src={VideoAssets.vjPreviews[middleReels[0].id]} type="video/mp4" />
            </video>
            <div className="cp-sp-reel-grad" />
            <div className="cp-sp-reel-tl" />
            <div className="cp-sp-reel-br" />
            <div className="cp-sp-hover-overlay">
              <span className="cp-sp-hover-label">WATCH</span>
            </div>
          </a>

          {/* Brand center */}
          <div className="cp-sp-brand-center">
            <img src={Images.logo} alt="CinemaPayyan" className="cp-sp-brand-logo" />
            <div className="cp-sp-brand-pre">
              <div className="cp-sp-brand-pre-line" />
              <span className="cp-sp-brand-pre-text">SIGNATURE FORMAT</span>
              <div className="cp-sp-brand-pre-line" />
            </div>
            <h3 className="cp-sp-brand-title">COUNTDOWN SPECIALTY</h3>
            <div className="cp-sp-brand-rule" />
            <p className="cp-sp-brand-desc">
              High-energy rhythmic edits designed to build maximum anticipation.
              <strong>Namma Specialty.</strong>
            </p>
          </div>

          {/* Reel 2 */}
          <a href={middleReels[1].link} target="_blank" rel="noreferrer" className="cp-sp-reel-card">
            <video autoPlay muted loop playsInline className="cp-sp-vid" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}>
              <source src={VideoAssets.vjPreviews[middleReels[1].id]} type="video/mp4" />
            </video>
            <div className="cp-sp-reel-grad" />
            <div className="cp-sp-reel-tl" />
            <div className="cp-sp-reel-br" />
            <div className="cp-sp-hover-overlay">
              <span className="cp-sp-hover-label">WATCH</span>
            </div>
          </a>
        </div>

        {/* ── BOTTOM YT GRID ──────────────────────── */}
        <div className="cp-sp-label-row">
          <div className="cp-sp-label-line" />
          <span className="cp-sp-label-text">MORE FEATURES</span>
        </div>

        <div className="cp-sp-yt-grid">
          {bottomYT.map((vid) => (
            <a key={vid.id} href={vid.link} target="_blank" rel="noreferrer" className="cp-sp-yt-card">
              <div className="cp-sp-thumb">
                <video autoPlay muted loop playsInline className="cp-sp-vid">
                  <source src={VideoAssets.vjPreviews[vid.id]} type="video/mp4" />
                </video>
                <div className="cp-sp-thumb-grad" />
                <div className="cp-sp-yt-tag">YT</div>
                <div className="cp-sp-hover-overlay">
                  <span className="cp-sp-hover-label">WATCH NOW</span>
                </div>
                <motion.div
                  className="cp-sp-scan"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.77,0,0.18,1] }}
                />
              </div>
              <div className="cp-sp-yt-info">
                <p className="cp-sp-yt-title">{vid.title}</p>
              </div>
            </a>
          ))}
        </div>

        {/* ── SPECIAL PROMO ───────────────────────── */}
        <div className="cp-sp-special">
          <div className="cp-sp-special-inner">

            {/* Video */}
            <div className="cp-sp-special-video">
              <a href={specialPromo.link} target="_blank" rel="noreferrer" className="cp-sp-large-card">
                <video autoPlay muted loop playsInline>
                  <source src={VideoAssets.vjPreviews[specialPromo.id]} type="video/mp4" />
                </video>
                <div className="cp-sp-prime-badge">AMAZON PRIME ASSOCIATION</div>
                <div className="cp-sp-hover-overlay">
                  <span className="cp-sp-hover-label">WATCH FULL PROMO</span>
                </div>
                <div className="cp-sp-large-scan" />
              </a>
            </div>

            {/* Text */}
            <div className="cp-sp-special-text">
              <div className="cp-sp-special-pre">
                <div className="cp-sp-special-pre-line" />
                <span className="cp-sp-special-pre-txt">SPECIAL COLLABORATION</span>
              </div>
              <h2 className="cp-sp-special-title">
                CINEMAPAYYAN<br />SPECIAL PROMOTION
              </h2>
              <div className="cp-sp-special-rule" />
              <p className="cp-sp-special-body">
                Countdown videos are the heart and soul of our creative identity.
                It's our signature specialty — building high-octane anticipation through
                rhythmic editing and cinematic precision.
              </p>
              <a href={specialPromo.link} target="_blank" rel="noreferrer" className="cp-sp-cta">
                <span>WATCH FULL PROMO</span>
              </a>
            </div>

          </div>
        </div>

      </section>
    </>
  );
};

export default ShortsPromotion;
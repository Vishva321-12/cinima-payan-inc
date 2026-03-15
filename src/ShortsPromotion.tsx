import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoAssets, Images } from "./assets/assets";

const ShortsPromotion: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const topYT = [
    {
      id: 23,
      title: "CUSTODY Game | CSK Vs SRH - who will win?",
      link: "https://youtu.be/aHxx-NtpAwQ?si=hoArL4w8_2clt2O7",
    },
    {
      id: 24,
      title: "Venkat Prabhu ARRESTED - CUSTODY Promo",
      link: "https://youtu.be/2M-A_3U-Zmc?si=FPJ7TfFoZvRtPoZH",
    },
    {
      id: 25,
      title: "Naga Chaitanya tests Venkat Prabhu's patience",
      link: "https://youtu.be/XbvzHgeK3VI?si=HeroAaf4kXPLaDLF",
    },
  ];

  const countdownReels = [
    {
      id: 34,
      tag: "VP",
      title: "A Venkat Prabhu Forge",
      link: "https://www.instagram.com/reel/DB_VDkiPnQN/?igsh=MnRzeGhlanBnbm51",
    },
    {
      id: 35,
      tag: "KRR",
      title: "KRR Countdown 1",
      link: "https://www.instagram.com/reel/DVu87daiQWN/?igsh=cGFpYjFlb3E0ZGpk",
    },
    {
      id: 36,
      tag: "KRR",
      title: "KRR Countdown 2",
      link: "https://www.instagram.com/reel/DVnrPw1iUSU/?igsh=ZWUzd2hkYzh5bDE1",
    },
    {
      id: 37,
      tag: "DEAR",
      title: "Dear Short",
      link: "https://www.instagram.com/reel/C5aVNAay_nG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
  ];

  const bottomYT = [
    {
      id: 29,
      title: "Mood Of Iraivan",
      link: "https://youtu.be/3IAV3UISk8U?si=ZwWgCxUeejVHDsqW",
    },
    {
      id: 30,
      title: "RaguThatha Countdown Series 1",
      link: "https://www.instagram.com/reel/C-ozgh8vB_9/",
    },
    {
      id: 31,
      title: "RaguThatha Countdown Series",
      link: "https://www.instagram.com/reel/C-hRTVyIwLj/",
    },
  ];

  const specialPromo = {
    id: 32,
    title: "AMAZON PRIME X CINEMAPAYYAN",
    link: "https://youtu.be/tclNknwYTS0?si=6PeS3GpsiD7bqPJS",
  };

  // ── Slide definitions ──────────────────────────
  const slides = [
    { key: "shorts", label: "SHORTS PROMOTION", sublabel: "CINEMAPAYYAN DIGITAL" },
    { key: "countdown", label: "COUNTDOWN SPECIALTY", sublabel: "SIGNATURE FORMAT" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ═══════════════════════════════════════
           ROOT SECTION
        ═══════════════════════════════════════ */
        .cp-sp-section {
          background: #060a0f;
          color: #fff;
          padding: 100px 0 0;
          overflow: hidden;
          position: relative;
        }

        .cp-sp-top-fade {
          position: absolute;
          top: 0; left: 0; right: 0; height: 130px;
          background: linear-gradient(to bottom, rgba(14,10,4,0.45), transparent);
          pointer-events: none; z-index: 1;
        }
        .cp-sp-glow-tl {
          position: absolute; top: -60px; left: -60px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(50,197,244,0.06) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .cp-sp-glow-br {
          position: absolute; bottom: -60px; right: -60px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(253,224,71,0.04) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .cp-sp-scanlines {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(50,197,244,0.012) 2px, rgba(50,197,244,0.012) 4px
          );
          pointer-events: none; z-index: 0; opacity: 0.5;
        }
        .cp-sp-section::after {
          content: '映';
          position: absolute; right: 3%; bottom: -20px;
          font-size: 22rem; color: rgba(50,197,244,0.018);
          font-family: serif; line-height: 1;
          pointer-events: none; user-select: none; z-index: 0;
        }
        .cp-sp-section::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(50,197,244,0.12) 50%, transparent);
          pointer-events: none;
        }
        .cp-sp-section a { text-decoration: none !important; color: inherit; }

        /* ═══════════════════════════════════════
           SLIDE TABS — top switcher
        ═══════════════════════════════════════ */
        .cp-tab-bar {
          display: flex;
          justify-content: center;
          gap: 0;
          position: relative; z-index: 20;
          margin-bottom: 60px;
          padding: 0 clamp(20px,5%,40px);
        }

        .cp-tab-btn {
          position: relative;
          padding: 18px 48px;
          border: 1px solid rgba(50,197,244,0.12);
          background: transparent;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1rem, 2vw, 1.4rem);
          letter-spacing: 4px;
          color: rgba(255,255,255,0.30);
          cursor: pointer;
          transition: color 0.35s;
          overflow: hidden;
          flex: 1;
          max-width: 380px;
          text-align: center;
        }
        .cp-tab-btn + .cp-tab-btn { border-left: none; }

        .cp-tab-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(50,197,244,0.05);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
          z-index: 0;
        }
        .cp-tab-btn.active::before { transform: scaleY(1); }
        .cp-tab-btn.active { color: #fff; border-color: rgba(50,197,244,0.35); }

        .cp-tab-btn-inner { position: relative; z-index: 1; }
        .cp-tab-btn-sub {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 5px;
          color: rgba(50,197,244,0.7);
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        /* active underline bar */
        .cp-tab-indicator {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-tab-btn.active .cp-tab-indicator { transform: scaleX(1); }

        /* ═══════════════════════════════════════
           SLIDE PANELS
        ═══════════════════════════════════════ */
        .cp-slides-viewport {
          position: relative; overflow: hidden;
          min-height: 600px;
        }

        .cp-slide-panel {
          width: 100%;
          padding-bottom: 120px;
        }

        /* ═══════════════════════════════════════
           SHARED: SECTION LABEL ROW
        ═══════════════════════════════════════ */
        .cp-sp-label-row {
          display: flex; align-items: center; gap: 12px;
          max-width: 1180px; margin: 0 auto 24px;
          padding: 0 clamp(20px,5%,40px);
          position: relative; z-index: 5;
        }
        .cp-sp-label-line { width: 28px; height: 1px; background: #32c5f4; opacity: 0.4; }
        .cp-sp-label-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 5px; color: rgba(50,197,244,0.8); text-transform: uppercase;
        }

        /* ═══════════════════════════════════════
           YT GRID
        ═══════════════════════════════════════ */
        .cp-sp-yt-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          max-width: 1180px; margin: 0 auto 70px;
          padding: 0 clamp(20px,5%,40px);
          position: relative; z-index: 5;
        }
        .cp-sp-yt-card {
          display: flex; flex-direction: column;
          background: #04080d;
          border: 1px solid rgba(50,197,244,0.07);
          overflow: hidden;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .cp-sp-yt-card:hover {
          border-color: rgba(50,197,244,0.22);
          box-shadow: 0 14px 44px rgba(0,0,0,0.7), 0 0 20px rgba(50,197,244,0.05);
        }
        .cp-sp-thumb {
          position: relative; width: 100%; aspect-ratio: 16/9;
          background: #030710; overflow: hidden;
        }
        .cp-sp-thumb::before {
          content: ''; position: absolute; top:8px; left:8px;
          width:10px; height:10px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          z-index:4; pointer-events:none;
        }
        .cp-sp-thumb::after {
          content: ''; position: absolute; bottom:8px; right:8px;
          width:10px; height:10px;
          border-bottom: 1px solid rgba(253,224,71,0.4);
          border-right: 1px solid rgba(253,224,71,0.4);
          z-index:4; pointer-events:none;
        }
        .cp-sp-vid {
          width:100%; height:100%; object-fit:cover; display:block;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-sp-yt-card:hover .cp-sp-vid,
        .cp-sp-reel-card:hover .cp-sp-vid { transform: scale(1.04); }
        .cp-sp-thumb-grad {
          position: absolute; inset:0;
          background: linear-gradient(to bottom, transparent 40%, rgba(6,10,15,0.55) 100%);
          z-index:2; pointer-events:none;
        }
        .cp-sp-yt-tag {
          position: absolute; top:10px; right:10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size:0.8rem; letter-spacing:3px;
          color:#000; background:#fde047;
          padding:3px 8px; z-index:5;
        }
        .cp-sp-hover-overlay {
          position:absolute; inset:0;
          background: rgba(6,10,15,0.75);
          display:flex; align-items:center; justify-content:center;
          opacity:0; z-index:10;
          backdrop-filter:blur(4px);
          transition:opacity 0.3s;
        }
        .cp-sp-yt-card:hover .cp-sp-hover-overlay,
        .cp-sp-reel-card:hover .cp-sp-hover-overlay,
        .cp-sp-large-card:hover .cp-sp-hover-overlay { opacity:1; }
        .cp-sp-hover-label {
          font-family:'Inter',sans-serif;
          font-size:0.6rem; font-weight:600;
          letter-spacing:4px; color:#000; background:#fde047;
          padding:8px 18px; text-transform:uppercase;
          transform:translateY(6px); transition:transform 0.3s;
        }
        .cp-sp-yt-card:hover .cp-sp-hover-label,
        .cp-sp-reel-card:hover .cp-sp-hover-label,
        .cp-sp-large-card:hover .cp-sp-hover-label { transform:translateY(0); }
        .cp-sp-yt-info {
          padding:16px 18px 20px;
          border-top:1px solid rgba(50,197,244,0.06);
        }
        .cp-sp-yt-title {
          font-family:'Inter',sans-serif;
          font-size:clamp(0.8rem,1.3vw,0.95rem); font-weight:500;
          color:rgba(255,255,255,0.82); margin:0; line-height:1.5;
          border-left:2px solid rgba(50,197,244,0.35); padding-left:10px;
          transition:color 0.3s;
        }
        .cp-sp-yt-card:hover .cp-sp-yt-title { color:#fff; }
        .cp-sp-scan {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#32c5f4,#fde047);
          transform-origin:left; z-index:6;
        }

        /* ═══════════════════════════════════════
           SPECIAL PROMO STRIP
        ═══════════════════════════════════════ */
        .cp-sp-special {
          background: rgba(50,197,244,0.025);
          border-top:1px solid rgba(50,197,244,0.10);
          border-bottom:1px solid rgba(50,197,244,0.10);
          padding:70px clamp(20px,5%,40px) 70px;
          position:relative; z-index:5;
        }
        .cp-sp-special-inner {
          max-width:1080px; margin:0 auto;
          display:flex; align-items:center; gap:60px;
        }
        .cp-sp-special-video { flex:1.2; position:relative; }
        .cp-sp-large-card {
          display:block; position:relative;
          border:1px solid rgba(50,197,244,0.08);
          background:#030710; overflow:hidden;
          transition:border-color 0.4s,box-shadow 0.4s;
        }
        .cp-sp-large-card:hover {
          border-color:rgba(50,197,244,0.25);
          box-shadow:0 14px 44px rgba(0,0,0,0.75),0 0 30px rgba(50,197,244,0.07);
        }
        .cp-sp-large-card video {
          width:100%; aspect-ratio:16/9; display:block;
          object-fit:cover; transition:transform 0.5s ease;
        }
        .cp-sp-large-card:hover video { transform:scale(1.03); }
        .cp-sp-large-card::before {
          content:''; position:absolute; top:8px; left:8px;
          width:10px; height:10px;
          border-top:1px solid rgba(253,224,71,0.4);
          border-left:1px solid rgba(253,224,71,0.4);
          z-index:5; pointer-events:none;
        }
        .cp-sp-large-card::after {
          content:''; position:absolute; bottom:8px; right:8px;
          width:10px; height:10px;
          border-bottom:1px solid rgba(253,224,71,0.4);
          border-right:1px solid rgba(253,224,71,0.4);
          z-index:5; pointer-events:none;
        }
        .cp-sp-prime-badge {
          position:absolute; top:12px; left:12px;
          font-family:'Inter',sans-serif;
          font-size:0.58rem; font-weight:600;
          letter-spacing:3px; color:#000; background:#00A8E1;
          padding:4px 10px; z-index:15; text-transform:uppercase;
        }
        .cp-sp-large-scan {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#32c5f4,#fde047);
          transform-origin:left; z-index:6;
        }
        .cp-sp-special-text { flex:0.8; }
        .cp-sp-special-pre {
          display:flex; align-items:center; gap:12px; margin-bottom:14px;
        }
        .cp-sp-special-pre-line { width:28px; height:1px; background:#32c5f4; opacity:0.5; }
        .cp-sp-special-pre-txt {
          font-family:'Inter',sans-serif;
          font-size:0.65rem; font-weight:600;
          letter-spacing:5px; color:rgba(50,197,244,0.85); text-transform:uppercase;
        }
        .cp-sp-special-title {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(2.2rem,4vw,3.8rem);
          font-weight:400; color:#32c5f4;
          margin:0 0 14px; letter-spacing:3px; line-height:1.05;
        }
        .cp-sp-special-rule {
          width:100%; height:1px;
          background:linear-gradient(90deg,rgba(50,197,244,0.30),rgba(253,224,71,0.20),transparent);
          margin-bottom:22px;
        }
        .cp-sp-special-body {
          font-family:'Inter',sans-serif;
          font-size:clamp(0.8rem,1.2vw,0.9rem);
          font-weight:300; line-height:1.85;
          color:rgba(255,255,255,0.40); margin-bottom:32px;
        }
        .cp-sp-cta {
          position:relative; overflow:hidden;
          display:inline-flex; align-items:center; gap:10px;
          padding:13px 28px; border:1px solid #fde047;
          color:#fde047; text-decoration:none;
          font-family:'Inter',sans-serif;
          font-size:0.65rem; font-weight:600;
          letter-spacing:4px; text-transform:uppercase;
          transition:color 0.4s;
        }
        .cp-sp-cta::before {
          content:''; position:absolute; inset:0;
          background:#fde047; transform:scaleX(0); transform-origin:left;
          z-index:0; transition:transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-sp-cta:hover::before { transform:scaleX(1); }
        .cp-sp-cta:hover { color:#000; }
        .cp-sp-cta span { position:relative; z-index:1; }

        /* ═══════════════════════════════════════
           SLIDE 2 — COUNTDOWN
        ═══════════════════════════════════════ */
        .cp-countdown-hero {
          max-width: 1180px; margin: 0 auto 70px;
          padding: 0 clamp(20px,5%,40px);
          position: relative; z-index: 5;
        }

        /* Hero brand panel */
        .cp-cd-brand-panel {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 60px 40px 50px;
          background: rgba(50,197,244,0.02);
          border: 1px solid rgba(50,197,244,0.08);
          border-top: 2px solid rgba(50,197,244,0.30);
          margin-bottom: 50px;
          position: relative; overflow: hidden;
        }
        .cp-cd-brand-panel::before {
          content: '映';
          position: absolute; right: -20px; bottom: -40px;
          font-size: 18rem; color: rgba(50,197,244,0.025);
          font-family: serif; line-height:1;
          pointer-events:none; user-select:none;
        }

        .cp-cd-brand-logo {
          height: 65px; margin-bottom: 24px;
          filter: drop-shadow(0 0 14px rgba(50,197,244,0.50));
        }

        .cp-cd-pre {
          display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
        }
        .cp-cd-pre-line { width: 32px; height: 1px; background: #32c5f4; opacity: 0.5; }
        .cp-cd-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 5px; color: rgba(50,197,244,0.85); text-transform: uppercase;
        }

        .cp-cd-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 400; color: #fde047;
          margin: 0 0 16px; letter-spacing: 4px; line-height: 1;
          text-shadow: 0 0 80px rgba(253,200,80,0.15);
        }

        .cp-cd-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(50,197,244,0.3), rgba(253,224,71,0.2), transparent);
          margin-bottom: 20px;
        }

        .cp-cd-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
          font-weight: 300; color: rgba(255,255,255,0.50);
          line-height: 1.8; max-width: 520px;
        }
        .cp-cd-desc strong {
          display: block; margin-top: 16px;
          color: #fde047; font-weight: 600;
          font-size: 0.9em; letter-spacing: 5px;
          text-transform: uppercase;
          animation: cpPulse 2s infinite ease-in-out;
        }
        @keyframes cpPulse {
          0%,100% { opacity: 0.8; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.03); }
        }

        /* Reels grid */
        .cp-cd-reels-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
          max-width: 1180px; margin: 0 auto;
        }

        .cp-sp-reel-card {
          aspect-ratio: 9/16;
          overflow: hidden;
          border: 1px solid rgba(50,197,244,0.08);
          position: relative;
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.45s;
        }
        .cp-sp-reel-card:hover {
          border-color: rgba(50,197,244,0.28);
          box-shadow: 0 10px 35px rgba(0,0,0,0.7), 0 0 20px rgba(50,197,244,0.06);
          transform: translateY(-8px);
        }
        .cp-sp-reel-tl, .cp-sp-reel-br {
          position:absolute; z-index:4;
          width:10px; height:10px; pointer-events:none;
        }
        .cp-sp-reel-tl::before,.cp-sp-reel-tl::after,
        .cp-sp-reel-br::before,.cp-sp-reel-br::after {
          content:''; position:absolute; background:rgba(50,197,244,0.4);
        }
        .cp-sp-reel-tl::before{width:100%;height:1px;top:0;left:0;}
        .cp-sp-reel-tl::after{width:1px;height:100%;top:0;left:0;}
        .cp-sp-reel-tl{top:7px;left:7px;}
        .cp-sp-reel-br::before{width:100%;height:1px;bottom:0;right:0;}
        .cp-sp-reel-br::after{width:1px;height:100%;bottom:0;right:0;}
        .cp-sp-reel-br{bottom:7px;right:7px;}
        .cp-sp-reel-grad {
          position:absolute;inset:0;
          background:linear-gradient(to bottom,transparent 55%,rgba(6,10,15,0.75) 100%);
          z-index:2;pointer-events:none;
        }

        /* reel title caption */
        .cp-reel-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 14px 16px;
          z-index: 5;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem; font-weight: 500;
          color: rgba(255,255,255,0.85);
          border-left: 2px solid #fde047;
          margin: 0 10px 12px;
          background: rgba(6,10,15,0.50);
          backdrop-filter: blur(4px);
        }

        /* ═══════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════ */
        @media (max-width: 1024px) {
          .cp-sp-yt-grid { grid-template-columns: repeat(2,1fr); }
          .cp-sp-special-inner { gap:32px; }
        }
        @media (max-width: 768px) {
          .cp-sp-yt-grid { grid-template-columns: 1fr; }
          .cp-sp-special-inner { flex-direction:column; gap:28px; }
          .cp-sp-special-video, .cp-sp-special-text { width:100%; flex:none; }
          .cp-cd-reels-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .cp-sp-section { padding: 70px 0 0; }
          .cp-sp-special-title { font-size:2.2rem; }
          .cp-tab-btn { letter-spacing: 2px; font-size: 0.95rem; }
          .cp-cd-reels-grid { grid-template-columns: 1fr; max-width: 280px; }
        }
      `}</style>

      <section className="cp-sp-section">
        <div className="cp-sp-top-fade" />
        <div className="cp-sp-glow-tl" />
        <div className="cp-sp-glow-br" />
        <div className="cp-sp-scanlines" />

        {/* ── SLIDE TAB BAR ──────────────────────── */}
        <div className="cp-tab-bar">
          {slides.map((s, i) => (
            <button
              key={s.key}
              className={`cp-tab-btn ${activeSlide === i ? "active" : ""}`}
              onClick={() => setActiveSlide(i)}
            >
              <span className="cp-tab-btn-inner">
                <span className="cp-tab-btn-sub">{s.sublabel}</span>
                {s.label}
              </span>
              <span className="cp-tab-indicator" />
            </button>
          ))}
        </div>

        {/* ── SLIDES VIEWPORT ───────────────────── */}
        <div className="cp-slides-viewport">
          <AnimatePresence mode="wait">

            {/* ── SLIDE 0: SHORTS PROMOTION ──────── */}
            {activeSlide === 0 && (
              <motion.div
                key="shorts"
                className="cp-slide-panel"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Top YT Grid */}
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
                          transition={{ duration: 0.4, ease: [0.77, 0, 0.18, 1] }}
                        />
                      </div>
                      <div className="cp-sp-yt-info">
                        <p className="cp-sp-yt-title">{vid.title}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Bottom YT Grid */}
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
                          transition={{ duration: 0.4, ease: [0.77, 0, 0.18, 1] }}
                        />
                      </div>
                      <div className="cp-sp-yt-info">
                        <p className="cp-sp-yt-title">{vid.title}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Special Promo Strip */}
                <div className="cp-sp-special">
                  <div className="cp-sp-special-inner">
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
                        Countdown videos are the heart and soul of our creative
                        identity. It's our signature specialty — building high-octane
                        anticipation through rhythmic editing and cinematic precision.
                      </p>
                      <a href={specialPromo.link} target="_blank" rel="noreferrer" className="cp-sp-cta">
                        <span>WATCH FULL PROMO</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 1: COUNTDOWN SPECIALTY ───── */}
            {activeSlide === 1 && (
              <motion.div
                key="countdown"
                className="cp-slide-panel"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="cp-countdown-hero">
                  {/* Brand hero panel */}
                  <div className="cp-cd-brand-panel">
                    <img src={Images.logo} alt="CinemaPayyan" className="cp-cd-brand-logo" />
                    <div className="cp-cd-pre">
                      <div className="cp-cd-pre-line" />
                      <span className="cp-cd-pre-text">SIGNATURE FORMAT</span>
                      <div className="cp-cd-pre-line" />
                    </div>
                    <h2 className="cp-cd-title">COUNTDOWN SPECIALTY</h2>
                    <div className="cp-cd-rule" />
                    <p className="cp-cd-desc">
                      High-energy rhythmic edits designed to build maximum anticipation.
                      <strong>Namma Specialty.</strong>
                    </p>
                  </div>

                  {/* Reels 4-up grid */}
                  <div className="cp-cd-reels-grid">
                    {countdownReels.map((reel) => (
                      <a key={reel.id} href={reel.link} target="_blank" rel="noreferrer" className="cp-sp-reel-card">
                        <video
                          autoPlay muted loop playsInline
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        >
                          <source src={VideoAssets.vjPreviews[reel.id]} type="video/mp4" />
                        </video>
                        <div className="cp-sp-reel-grad" />
                        <div className="cp-sp-reel-tl" />
                        <div className="cp-sp-reel-br" />
                        <div className="cp-sp-yt-tag">{reel.tag}</div>
                        <div className="cp-sp-hover-overlay">
                          <span className="cp-sp-hover-label">WATCH</span>
                        </div>
                        <p className="cp-reel-caption">{reel.title}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default ShortsPromotion;
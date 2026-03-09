import React, { useRef, useState, useEffect, useCallback } from "react";
import { Images } from "./assets/assets";
import {
  Rocket,
  Zap,
  ShieldCheck,
  Trophy,
  ArrowUpRight,
  Clapperboard,
} from "lucide-react";
import "./App.css";

const Accelerator: React.FC = () => {
  const connections: string[] = [
    Images.Thalivar, Images.Vijay, Images.Danush, Images.Str,
    Images.Nani, Images.Prabas, Images.Lokash, Images.Vp,
    Images.Keerthi, Images.AnirutRavi, Images.Tyagaraja,
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animFrameRef = useRef<number>(0);
  const autoScrollSpeed = useRef(1);
  const isPaused = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateNav = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const third = el.scrollWidth / 3;
    const relPos = (((el.scrollLeft - third / 3) % third) + third) % third;
    const cardW = 316;
    const idx = Math.round(relPos / cardW) % connections.length;
    setActiveIndex(idx);
  }, [connections.length]);

  const autoScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    if (!isPaused.current) {
      el.scrollLeft += autoScrollSpeed.current;
      const third = el.scrollWidth / 3;
      if (el.scrollLeft >= third * 2) el.scrollLeft -= third;
      if (el.scrollLeft <= 0) el.scrollLeft += third;
    }
    updateNav();
    animFrameRef.current = requestAnimationFrame(autoScroll);
  }, [updateNav]);

  useEffect(() => {
    const el = sliderRef.current;
    if (el) el.scrollLeft = el.scrollWidth / 3;
    animFrameRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [autoScroll]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true; isPaused.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft ?? 0);
    scrollLeft.current = sliderRef.current?.scrollLeft ?? 0;
    if (sliderRef.current) sliderRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = sliderRef.current; if (!el) return;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
    updateNav();
  };
  const onMouseUp = () => {
    isDragging.current = false; isPaused.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
  };
  const onTouchStart = (e: React.TouchEvent) => {
    isPaused.current = true;
    startX.current = e.touches[0].pageX - (sliderRef.current?.offsetLeft ?? 0);
    scrollLeft.current = sliderRef.current?.scrollLeft ?? 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const el = sliderRef.current; if (!el) return;
    el.scrollLeft = scrollLeft.current - (e.touches[0].pageX - el.offsetLeft - startX.current) * 1.5;
    updateNav();
  };
  const onTouchEnd = () => { isPaused.current = false; };

  const tripled = [...connections, ...connections, ...connections];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');

        .gold-text { color: #fde047 !important; }
        .cyan-text { color: #32c5f4 !important; }
        .gold-bg   { background: #fde047 !important; }
        .cyan-bg   { background: #32c5f4 !important; }

        .acc-universe-v4 { background: #000; overflow: hidden; position: relative; }

        /* ── HERO ── */
        .acc-hero-parallax {
          position: relative; min-height: 320px;
          background-size: cover; background-position: center top;
          background-attachment: fixed;
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        .acc-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.96) 100%);
          pointer-events: none;
        }
        .acc-hero-content {
          position: relative; z-index: 2;
          padding: clamp(24px,6%,60px) clamp(20px,6%,60px) 0;
          max-width: 1200px; margin: 0 auto; width: 100%; box-sizing: border-box;
        }

        /* Inter — pre-title */
        .acc-pre-title {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.5vw, 0.62rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(253,224,71,0.85); text-transform: uppercase;
          margin-bottom: 12px;
        }

        /* Bebas Neue — hero main title */
        .acc-main-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 11vw, 8rem);
          font-weight: 400; color: #fff;
          line-height: 0.9; letter-spacing: 4px; margin: 0;
        }
        .acc-main-title-accent { color: #fde047; display: block; }

        /* ── CREDO TRAIN ── */
        .acc-credo-train {
          position: relative; z-index: 2; overflow: hidden;
          margin-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 10px 0; background: rgba(0,0,0,0.45);
        }
        .acc-train-track {
          display: flex; width: max-content;
          animation: acc-train-scroll 18s linear infinite; will-change: transform;
        }
        @keyframes acc-train-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .acc-track-item { display: flex; white-space: nowrap; }
        /* Inter — credo text */
        .acc-track-item span {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.5vw, 0.62rem);
          font-weight: 400; letter-spacing: 5px;
          color: rgba(253,224,71,0.75); text-transform: uppercase; padding: 0 4px;
        }

        /* ── WRAPPER ── */
        .acc-wrapper {
          max-width: 1200px; margin: 0 auto;
          padding: 0 clamp(20px,6%,60px) 100px; box-sizing: border-box;
        }

        /* ── MISSION HUB ── */
        .acc-mission-hub {
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: 36px; align-items: stretch; margin-bottom: 70px;
        }
        .acc-visual-side {
          display: flex; justify-content: center;
          align-items: stretch; padding-bottom: 30px; align-self: stretch;
        }
        .acc-portrait-container {
          position: relative; display: flex; flex-direction: column;
          width: 100%; height: 100%; padding-bottom: 28px;
        }
        .acc-img-glow {
          position: absolute; inset: -20px;
          background: radial-gradient(circle at center, rgba(50,197,244,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .acc-portrait-img {
          display: block; width: 100%; height: 100%; max-width: 100%;
          object-fit: cover; position: relative; z-index: 1;
          box-shadow: 0 24px 60px rgba(0,0,0,0.9);
        }
        /* Inter — status tag */
        .acc-status-tag {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 7px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 700; letter-spacing: 4px;
          color: #000; background: #32c5f4;
          padding: 7px 16px; white-space: nowrap; z-index: 4; text-transform: uppercase;
        }

        .acc-text-side { display: flex; flex-direction: column; gap: 22px; }

        /* Inter — pill label */
        .acc-pill-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.58rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(255,255,255,0.7); text-transform: uppercase;
          border: 1px solid rgba(253,224,71,0.25); padding: 7px 14px; width: fit-content;
        }

        /* Bebas Neue — section heading */
        .acc-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 400; color: #fff;
          line-height: 0.95; letter-spacing: 3px; margin: 0;
        }
        .acc-heading-accent { color: #32c5f4; }

        .acc-heading-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.35), rgba(50,197,244,0.2), transparent);
        }

        /* Inter — body */
        .acc-body {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.82rem, 1.2vw, 0.95rem);
          font-weight: 300; color: rgba(255,255,255,0.65); line-height: 1.9; margin: 0;
        }
        .acc-body strong { color: #fff; font-weight: 700; border-bottom: 1px solid rgba(253,224,71,0.4); }

        .acc-feature-stack { display: flex; flex-direction: column; gap: 14px; }
        .acc-feature-card {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 18px 20px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s;
        }
        .acc-feature-card:hover { border-color: rgba(253,224,71,0.2); }
        .highlight-card { border-color: rgba(50,197,244,0.2); background: rgba(50,197,244,0.04); }
        .acc-feature-icon {
          width: 42px; height: 42px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .acc-feature-text { display: flex; flex-direction: column; gap: 5px; }
        /* Inter — feature card title */
        .acc-feature-text h4 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.52rem, 1.2vw, 0.64rem);
          font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.9); margin: 0;
        }
        /* Inter — feature card body */
        .acc-feature-text p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.78rem, 1.1vw, 0.88rem);
          font-weight: 300; color: rgba(255,255,255,0.65); margin: 0; line-height: 1.65;
        }

        /* Inter — CTA */
        .acc-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px; border: 1px solid #fde047;
          color: #fde047; text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
          transition: color 0.4s; width: fit-content;
        }
        .acc-cta::before {
          content: ''; position: absolute; inset: 0; background: #fde047;
          transform-origin: left; transform: scaleX(0); z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .acc-cta:hover::before { transform: scaleX(1); }
        .acc-cta:hover { color: #000; }
        .acc-cta span, .acc-cta svg { position: relative; z-index: 1; }

        /* ── LEGACY REEL ── */
        .acc-legacy-reel { display: flex; flex-direction: column; gap: 28px; }
        .acc-reel-title { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
        .acc-reel-pre { display: flex; align-items: center; gap: 16px; }
        .acc-reel-pre-line { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, rgba(253,224,71,0.5)); }
        .acc-reel-pre-line:last-child { background: linear-gradient(90deg, rgba(253,224,71,0.5), transparent); }
        /* Inter — reel pre-label */
        .acc-reel-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.58rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(253,224,71,0.85); text-transform: uppercase;
        }
        /* Bebas Neue — reel heading */
        .acc-reel-title h4 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 400; letter-spacing: 4px; color: #fff; margin: 0;
        }

        /* ── SLIDER ── */
        .acc-slider-wrap { position: relative; display: flex; align-items: center; }
        .acc-slider-track {
          display: flex; gap: 16px; overflow-x: hidden;
          scroll-behavior: auto; cursor: grab; user-select: none;
          padding: 10px 0 20px; width: 100%;
          mask-image: linear-gradient(90deg, transparent, black 60px, black calc(100% - 60px), transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 60px, black calc(100% - 60px), transparent);
        }
        .acc-slide-card { flex-shrink: 0; width: 300px; }
        .acc-card-inner {
          position: relative; width: 100%; aspect-ratio: 3/4;
          overflow: hidden; border: 1px solid rgba(255,255,255,0.07);
          background: #0a0a0a; transition: border-color 0.35s, transform 0.4s;
        }
        .acc-card-inner:hover { border-color: rgba(253,224,71,0.25); transform: translateY(-6px); }
        .acc-card-inner img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; transition: transform 0.5s ease; }
        .acc-card-inner:hover img { transform: scale(1.06); }
        .acc-card-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.5) 100%); pointer-events: none; }
        .acc-card-corner-tl, .acc-card-corner-br { position: absolute; width: 12px; height: 12px; pointer-events: none; z-index: 4; }
        .acc-card-corner-tl { top:8px; left:8px; border-top:1px solid rgba(253,224,71,0.5); border-left:1px solid rgba(253,224,71,0.5); }
        .acc-card-corner-br { bottom:8px; right:8px; border-bottom:1px solid rgba(50,197,244,0.4); border-right:1px solid rgba(50,197,244,0.4); }

        /* Inter — legacy badge */
        .acc-legacy-badge {
          position: absolute; bottom: 10px; left: 65px;
          display: flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 400; letter-spacing: 3px;
          color: rgba(255,255,255,0.9); background: rgba(0,0,0,0.85);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 5px 10px; text-transform: uppercase; z-index: 5;
        }

        /* ── PROGRESS BAR ── */
        .acc-progress-bar-wrap { display: flex; align-items: center; gap: 14px; padding: 0 4px; }
        /* Inter — progress label */
        .acc-progress-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 400; letter-spacing: 3px;
          color: rgba(255,255,255,0.35); text-transform: uppercase; white-space: nowrap; flex-shrink: 0;
        }
        .acc-progress-label span { color: #fde047; font-weight: 700; }
        .acc-progress-track { flex: 1; height: 2px; background: rgba(255,255,255,0.08); position: relative; overflow: visible; }
        .acc-progress-fill {
          position: absolute; top: 0; left: 0; height: 100%;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          border-radius: 1px;
          transition: width 0.35s cubic-bezier(0.77,0,0.18,1);
          box-shadow: 0 0 8px rgba(253,224,71,0.4);
        }
        .acc-progress-fill::after {
          content: ''; position: absolute; right: -4px; top: 50%; transform: translateY(-50%);
          width: 8px; height: 8px; border-radius: 50%; background: #fde047;
          box-shadow: 0 0 10px #fde047, 0 0 20px rgba(253,224,71,0.5);
        }
        .acc-progress-ticks { position: absolute; top: 6px; left: 0; width: 100%; display: flex; justify-content: space-between; }
        .acc-progress-tick { width: 1px; height: 4px; background: rgba(255,255,255,0.12); flex-shrink: 0; }

        /* Inter — drag hint */
        .acc-drag-hint {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 400; letter-spacing: 5px;
          color: rgba(255,255,255,0.45); text-transform: uppercase; text-align: center; margin: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .acc-mission-hub { grid-template-columns: 1fr; gap: 40px; margin-bottom: 70px; text-align: center; }
          .acc-visual-side { justify-content: center; padding-bottom: 30px; }
          .acc-pill-label  { margin: 0 auto; }
          .acc-heading-rule { max-width: 360px; margin: 0 auto; }
          .acc-cta         { margin: 0 auto; }
          .acc-portrait-img { max-width: 280px; }
          .acc-feature-stack { text-align: left; }
        }
        @media (max-width: 700px) {
          .acc-hero-parallax  { min-height: 220px; background-attachment: scroll; }
          .acc-hero-content   { padding: 20px 16px 0; }
          .acc-credo-train    { margin-top: 50%; }
          .acc-wrapper        { padding: 70px 16px 80px; }
          .acc-mission-hub    { gap: 32px; margin-bottom: 56px; }
          .acc-slide-card     { width: 220px; }
          .acc-feature-card   { padding: 14px 16px; }
          .acc-progress-label { display: none; }
        }
        @media (max-width: 480px) {
          .acc-slide-card    { width: 180px; }
          .acc-main-title    { letter-spacing: 2px; }
          .acc-wrapper       { padding: 10px 14px 70px; }
          .acc-portrait-img  { max-width: 240px; }
          .acc-status-tag    { font-size: 0.5rem; letter-spacing: 2px; padding: 6px 12px; }
        }
      `}</style>

      <section className="acc-universe-v4">
        {/* ── HERO ── */}
        <div className="acc-hero-parallax" style={{ backgroundImage: `url(${Images.Bannerrr2})` }}>
          <div className="acc-hero-overlay" />
          <div className="acc-hero-content">
            <span className="acc-pre-title">ESTABLISHED INDUSTRY LINKS</span>
            <h2 className="acc-main-title">
              THE{" "}
              <span className="gold-text acc-main-title-accent">ACCELERATOR</span>
            </h2>
          </div>
          <div className="acc-credo-train">
            <div className="acc-train-track">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="acc-track-item">
                  <span>WE REDEFINE EVERY DAY &nbsp;•&nbsp;</span>
                  <span>WE REDEFINE EVERY DAY &nbsp;•&nbsp;</span>
                  <span>WE REDEFINE EVERY DAY &nbsp;•&nbsp;</span>
                  <span>WE REDEFINE EVERY DAY &nbsp;•&nbsp;</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WRAPPER ── */}
        <div className="acc-wrapper">
          <div className="acc-mission-hub">
            {/* IMAGE SIDE */}
            <div className="acc-visual-side">
              <div className="acc-portrait-container">
                <div className="acc-img-glow" />
                <img src={Images.AbishakeWhite} alt="Abishek Raaja" className="acc-portrait-img" />
                <div className="acc-status-tag">
                  <Zap size={13} fill="currentColor" />
                  <span>ACTIVE CONNECT</span>
                </div>
              </div>
            </div>

            {/* TEXT SIDE */}
            <div className="acc-text-side">
              <div className="acc-pill-label">
                <ShieldCheck size={13} className="gold-text" />
                <span>CINEMAPAYYAN INC&nbsp;•&nbsp;SINCE 2014</span>
              </div>

              <h3 className="acc-heading">
                REDEFINING THE <br />
                <span className="cyan-text acc-heading-accent">PROMOTION</span>{" "}ENGINE
              </h3>

              <div className="acc-heading-rule" />

              <p className="acc-body">
                We don't just promote; we <strong>accelerate</strong>. We turn
                films into cultural movements using 10+ years of trust and
                experimental digital IPs.
              </p>

              <div className="acc-feature-stack">
                <div className="acc-feature-card highlight-card">
                  <div className="acc-feature-icon cyan-bg">
                    <Clapperboard size={20} color="#000" />
                  </div>
                  <div className="acc-feature-text">
                    <h4 className="cyan-text">End-to-End Movie Marketing</h4>
                    <p>From pre-production buzz to post-release dominance.</p>
                  </div>
                </div>
                <div className="acc-feature-card">
                  <div className="acc-feature-icon gold-bg">
                    <Rocket size={20} color="#000" />
                  </div>
                  <div className="acc-feature-text">
                    <h4>Film Acceleration</h4>
                    <p>High-impact promotion cycles for Tier-1 cinema.</p>
                  </div>
                </div>
              </div>

              <a href="https://www.instagram.com/cinemapayyan.inc/" target="_blank" rel="noopener noreferrer" className="acc-cta">
                <span>EXPLORE OUR TECH</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* ── LEGACY REEL ── */}
          <div className="acc-legacy-reel">
            <div className="acc-reel-title">
              <div className="acc-reel-pre">
                <div className="acc-reel-pre-line" />
                <span className="acc-reel-pre-text">ESTABLISHED CONNECTIONS</span>
                <div className="acc-reel-pre-line" />
              </div>
              <h4>INDUSTRY <span className="gold-text">LEGACY</span></h4>
            </div>

            <div className="acc-slider-wrap">
              <div
                className="acc-slider-track" ref={sliderRef}
                onMouseDown={onMouseDown} onMouseMove={onMouseMove}
                onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
              >
                {tripled.map((img, i) => (
                  <div key={i} className="acc-slide-card">
                    <div className="acc-card-inner">
                      <img src={img} alt="Legacy Star" draggable={false} loading="lazy" />
                      <div className="acc-card-overlay" />
                      <div className="acc-card-corner-tl" />
                      <div className="acc-card-corner-br" />
                      <div className="acc-legacy-badge">
                        <Trophy size={13} className="gold-text" />
                        <span>LEGACY STAR</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="acc-progress-bar-wrap">
              <span className="acc-progress-label">
                <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                &nbsp;/&nbsp;{String(connections.length).padStart(2, "0")}
              </span>
              <div className="acc-progress-track">
                <div className="acc-progress-fill" style={{ width: `${((activeIndex + 1) / connections.length) * 100}%` }} />
                <div className="acc-progress-ticks">
                  {connections.map((_, i) => <div key={i} className="acc-progress-tick" />)}
                </div>
              </div>
            </div>

            <p className="acc-drag-hint">DRAG TO EXPLORE</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Accelerator;
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Images } from "./assets/assets";
import { Rocket, Zap, ShieldCheck, Trophy, ArrowUpRight, Clapperboard, ChevronLeft, ChevronRight } from "lucide-react";
import "./App.css";

const Accelerator: React.FC = () => {
  const connections: string[] = [
    Images.Thalivar, Images.Vijay, Images.Danush, Images.Str,
    Images.Nani, Images.Prabas, Images.Lokash, Images.Vp,
    Images.Keerthi, Images.AnirutRavi, Images.Tyagaraja,
  ];

  // ── Slider state ──────────────────────────────────────
  const sliderRef   = useRef<HTMLDivElement>(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollLeft  = useRef(0);
  const animFrameRef = useRef<number>(0);
  const autoScrollSpeed = useRef(1);          // px per frame
  const isPaused    = useRef(false);

  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex,    setActiveIndex]    = useState(0);

  // Auto-scroll loop
  const autoScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    if (!isPaused.current) {
      el.scrollLeft += autoScrollSpeed.current;
      // Loop back seamlessly (tripled array — jump when past 1/3)
      const third = el.scrollWidth / 3;
      if (el.scrollLeft >= third * 2) el.scrollLeft -= third;
      if (el.scrollLeft <= 0)         el.scrollLeft += third;
    }
    updateNav();
    animFrameRef.current = requestAnimationFrame(autoScroll);
  }, []);

  useEffect(() => {
    // Start scroll in the middle third for seamless looping
    const el = sliderRef.current;
    if (el) el.scrollLeft = el.scrollWidth / 3;
    animFrameRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [autoScroll]);

  const updateNav = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    // Active dot based on scroll position within middle third
    const third    = el.scrollWidth / 3;
    const relPos   = ((el.scrollLeft - third / 3) % third + third) % third;
    const cardW    = 316; // card + gap
    const idx      = Math.round(relPos / cardW) % connections.length;
    setActiveIndex(idx);
  };

  // ── Drag handlers ──────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isPaused.current   = true;
    startX.current     = e.pageX - (sliderRef.current?.offsetLeft ?? 0);
    scrollLeft.current = sliderRef.current?.scrollLeft ?? 0;
    if (sliderRef.current) sliderRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el   = sliderRef.current;
    if (!el) return;
    const x    = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
    updateNav();
  };

  const onMouseUp = () => {
    isDragging.current = false;
    isPaused.current   = false;
    if (sliderRef.current) sliderRef.current.style.cursor = 'grab';
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    isPaused.current   = true;
    startX.current     = e.touches[0].pageX - (sliderRef.current?.offsetLeft ?? 0);
    scrollLeft.current = sliderRef.current?.scrollLeft ?? 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    const x    = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
    updateNav();
  };

  const onTouchEnd = () => { isPaused.current = false; };

  // Arrow nav
  const scrollBy = (dir: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    isPaused.current = true;
    el.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
    setTimeout(() => { isPaused.current = false; }, 600);
    updateNav();
  };

  // Triple for seamless loop
  const tripled = [...connections, ...connections, ...connections];

  return (
    <section className="acc-universe-v4">

      {/* ── HERO ──────────────────────────────────────── */}
      <div
        className="acc-hero-parallax"
        style={{ backgroundImage: `url(${Images.Bannerrr2})` }}
      >
        <div className="acc-hero-overlay" />

        <div className="acc-hero-content">
          <span className="acc-pre-title">ESTABLISHED INDUSTRY LINKS</span>
          <h2 className="acc-main-title">
            THE{' '}
            <span className="gold-text acc-main-title-accent">ACCELERATOR</span>
          </h2>
        </div>

        {/* Credo train */}
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

      {/* ── WRAPPER ───────────────────────────────────── */}
      <div className="acc-wrapper">

        {/* ── MISSION HUB ───────────────────────────── */}
        <div className="acc-mission-hub">

          {/* IMAGE SIDE */}
          <div className="acc-visual-side">
            <div className="acc-portrait-container">
              <div className="acc-img-glow" />
              <img
                src={Images.AbishakeWhite}
                alt="Abishek Raaja"
                className="acc-portrait-img"
              />
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
              <span className="cyan-text acc-heading-accent">PROMOTION</span> ENGINE
            </h3>

            <div className="acc-heading-rule" />

            <p className="acc-body">
              We don't just promote; we <strong>accelerate</strong>. We turn films into
              cultural movements using 10+ years of trust and experimental digital IPs.
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

            <a
              href="https://www.instagram.com/cinemapayyan.inc/"
              target="_blank"
              rel="noopener noreferrer"
              className="acc-cta"
            >
              <span>EXPLORE OUR TECH</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* ── LEGACY REEL — INTERACTIVE SLIDER ─────── */}
        <div className="acc-legacy-reel">

          {/* Header */}
          <div className="acc-reel-title">
            <div className="acc-reel-pre">
              <div className="acc-reel-pre-line" />
              <span className="acc-reel-pre-text">ESTABLISHED CONNECTIONS</span>
              <div className="acc-reel-pre-line" />
            </div>
            <h4>
              INDUSTRY{' '}
              <span className="gold-text" style={{ fontStyle: 'normal' }}>LEGACY</span>
            </h4>
          </div>

          {/* Slider wrapper */}
          <div className="acc-slider-wrap">

            {/* Left arrow */}
            <button
              className={`acc-slider-arrow acc-slider-arrow--left ${!canScrollLeft ? 'acc-slider-arrow--hidden' : ''}`}
              onClick={() => scrollBy('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Drag-scroll track */}
            <div
              className="acc-slider-track"
              ref={sliderRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
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

            {/* Right arrow */}
            <button
              className={`acc-slider-arrow acc-slider-arrow--right ${!canScrollRight ? 'acc-slider-arrow--hidden' : ''}`}
              onClick={() => scrollBy('right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="acc-slider-dots">
            {connections.map((_, i) => (
              <span
                key={i}
                className={`acc-slider-dot ${i === activeIndex ? 'acc-slider-dot--active' : ''}`}
              />
            ))}
          </div>

          {/* Drag hint */}
          <p className="acc-drag-hint">DRAG TO EXPLORE</p>
        </div>

      </div>
    </section>
  );
};

export default Accelerator;
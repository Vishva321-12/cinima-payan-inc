import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Images } from "./assets/assets";

// ── Inject Google Fonts into <head> ──
const injectFonts = () => {
  const id = "cp-font-link";
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
};

const Logo: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [frameCount, setFrameCount] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectFonts();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 400);
      return () => clearTimeout(t);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setFrameCount((f) => (f + 1) % 24), 42);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        mx.set(dx * 0.18);
        my.set(dy * 0.18);
      } else {
        mx.set(0);
        my.set(0);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const pad2 = (n: number) => String(n).padStart(2, "0");
  const ticks = Array.from({ length: 12 });

  return (
    <>
      <style>{`
        /* ── Font base reset ── */
        .cp-logo-wrap,
        .cp-logo-wrap * {
          font-family: 'Inter', sans-serif;
        }

        .cp-logo-wrap {
          position: fixed;
          top: 14px; left: 14px;
          z-index: 2001;
          cursor: pointer;
        }

        /* outer ring */
        .cp-logo-ring {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          animation: cpLogoSpin 14s linear infinite;
          pointer-events: none;
        }
        .cp-logo-wrap:hover .cp-logo-ring {
          animation-play-state: paused;
        }
        @keyframes cpLogoSpin {
          to { transform: rotate(360deg); }
        }
        .cp-logo-ring svg { width: 100%; height: 100%; }

        /* scan line */
        .cp-logo-scan {
          position: absolute;
          inset: 0; border-radius: 50%;
          background: linear-gradient(
            135deg,
            transparent 40%,
            rgba(50,197,244,0.18) 50%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.15s;
          pointer-events: none;
        }
        .cp-logo-scan.active { opacity: 1; }

        /* image */
        .cp-logo-img {
          display: block;
          height: 64px; width: 64px;
          object-fit: contain;
          border-radius: 50%;
          border: 1px solid rgba(253,224,71,0.22);
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(8px);
          transition: border-color 0.35s, box-shadow 0.35s;
          position: relative; z-index: 2;
        }
        .cp-logo-wrap:hover .cp-logo-img {
          border-color: rgba(50,197,244,0.5);
          box-shadow:
            0 0 0 2px rgba(50,197,244,0.12),
            0 0 22px rgba(50,197,244,0.25);
        }
        .cp-logo-img.scrolled {
          height: 48px; width: 48px;
          border-color: rgba(50,197,244,0.3);
        }

        /* timecode — Inter */
        .cp-logo-tc {
          position: absolute;
          bottom: -18px; left: 50%;
          transform: translateX(-50%);
          font-family: 'Inter', sans-serif;
          font-size: 0.28rem;
          font-weight: 400;
          letter-spacing: 2px;
          color: rgba(50,197,244,0.45);
          white-space: nowrap;
          pointer-events: none;
          z-index: 3;
          transition: opacity 0.4s;
        }

        /* CP badge — Bebas Neue */
        .cp-logo-badge {
          position: absolute;
          top: -3px; right: -8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 1.5px;
          color: #000;
          background: #fde047;
          padding: 1px 5px;
          z-index: 5;
          pointer-events: none;
          white-space: nowrap;
        }

        /* REC — Inter */
        .cp-logo-rec {
          position: absolute;
          bottom: -3px; left: -3px;
          display: flex; align-items: center; gap: 3px;
          z-index: 5; pointer-events: none;
        }
        .cp-logo-rec-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #ff3333;
          box-shadow: 0 0 5px rgba(255,51,51,0.7);
          animation: cpRecBlink 1s step-end infinite;
        }
        .cp-logo-rec-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.24rem;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: rgba(255,51,51,0.7);
        }
        @keyframes cpRecBlink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }

        /* responsive */
        @media (max-width: 768px) {
          .cp-logo-img { height: 52px; width: 52px; }
          .cp-logo-img.scrolled { height: 40px; width: 40px; }
          .cp-logo-tc { display: none; }
        }
        @media (max-width: 480px) {
          .cp-logo-img { height: 44px; width: 44px; }
          .cp-logo-img.scrolled { height: 34px; width: 34px; }
          .cp-logo-badge { display: none; }
        }
      `}</style>

      <motion.div
        ref={containerRef}
        className="cp-logo-wrap"
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.92 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Back to top"
      >
        {/* spinning ring */}
        <div className="cp-logo-ring">
          <svg
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="42"
              cy="42"
              r="40"
              stroke="rgba(253,224,71,0.18)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
            <circle
              cx="42"
              cy="42"
              r="40"
              stroke="rgba(50,197,244,0.25)"
              strokeWidth="1"
              strokeDasharray="60 192"
              strokeDashoffset="20"
            />
            {ticks.map((_, i) => {
              const angle = (i / ticks.length) * 360;
              const rad = (angle - 90) * (Math.PI / 180);
              const r1 = 38,
                r2 = i % 3 === 0 ? 33 : 35;
              const x1 = 42 + r1 * Math.cos(rad);
              const y1 = 42 + r1 * Math.sin(rad);
              const x2 = 42 + r2 * Math.cos(rad);
              const y2 = 42 + r2 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={
                    i % 3 === 0
                      ? "rgba(253,224,71,0.5)"
                      : "rgba(255,255,255,0.12)"
                  }
                  strokeWidth={i % 3 === 0 ? "1.2" : "0.7"}
                />
              );
            })}
          </svg>
        </div>

        <div className={`cp-logo-scan ${pulse ? "active" : ""}`} />

        <img
          src={Images.logo}
          alt="CinemaPayyan"
          className={`cp-logo-img ${scrolled ? "scrolled" : ""}`}
        />

        <div className="cp-logo-badge">CP</div>

        <div className="cp-logo-rec">
          <div className="cp-logo-rec-dot" />
          <span className="cp-logo-rec-text">REC</span>
        </div>

        <div className="cp-logo-tc">
          {`00:00:${pad2(Math.floor(frameCount / 24) % 60)}:${pad2(
            frameCount
          )}`}
        </div>
      </motion.div>
    </>
  );
};

export default Logo;
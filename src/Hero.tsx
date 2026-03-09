import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroProps {
  onScrollRequest?: (target: string) => void;
}

/* ── counter hook ── */
function useCounter(target: number, ms = 1600, active = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0: number | null = null;
    const raf = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / ms, 1);
      setV(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, ms]);
  return v;
}

const BRANCHES = [
  { title: 'PROMOTIONS',  isScroll: true,  key: 'workRef',       path: '#work'       },
  { title: 'PRODUCTIONS', isScroll: true,  key: 'promotionsRef', path: '#promotions' },
  { title: 'MUNAI',       isScroll: false, key: '',              path: '/munai'       },
];

const TICKER_WORDS = ['CINEMA','PRODUCTION','STORYTELLING','DIRECTION','PROMOTIONS','COMEDY','DRAMA','SHORTS','ORIGINALS'];

export default function Hero({ onScrollRequest }: HeroProps) {
  const [gatePhase, setGatePhase] = useState<'visible'|'exit'|'gone'>('visible');
  const [ready,     setReady]     = useState(false);
  const [countOn,   setCountOn]   = useState(false);

  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  const years     = useCounter(10, 1500, countOn);
  const followers = useCounter(44, 1800, countOn);

  useEffect(() => {
    const t1 = setTimeout(() => setGatePhase('exit'),    2400);
    const t2 = setTimeout(() => { setGatePhase('gone'); setReady(true); setCountOn(true); }, 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    type P = { x: number; y: number; vy: number; vx: number; op: number; r: number; c: string };
    const particles: P[] = Array.from({ length: 60 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vy: 0.25 + Math.random() * 0.55,
      vx: (Math.random() - 0.5) * 0.15,
      op: 0.06 + Math.random() * 0.2,
      r:  Math.random() > 0.65 ? 1.4 : 0.7,
      c:  Math.random() > 0.5 ? '#fde047' : '#32c5f4',
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      const gridAlpha = 0.022 + Math.sin(t) * 0.008;
      ctx.strokeStyle = `rgba(253,224,71,${gridAlpha})`;
      ctx.lineWidth = 0.5;
      const gridW = Math.max(canvas.width, 1);
      const step  = 80;
      for (let x = 0; x < gridW; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.op;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y > canvas.height + 4) { p.y = -4; p.x = Math.random() * canvas.width; }
        if (p.x < -4 || p.x > canvas.width + 4) p.x = Math.random() * canvas.width;
      });
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    mx.set((e.clientX - cx) * 0.018);
    my.set((e.clientY - cy) * 0.018);
  }, [mx, my]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;0,800;1,700;1,800&family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');

        /* ─── font utility classes ─────────────── */
        .bebas-font { font-family: 'Bebas Neue', sans-serif; }
        .inter-font  { font-family: 'Inter', sans-serif; }

        /* ─── reset ─────────────────────────────── */
        *, *::before, *::after { box-sizing: border-box; }

        /* ─── ROOT ──────────────────────────────── */
        .h3-root {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 560px;
          background: #000;
          display: grid;
          grid-template-rows: auto 1fr auto;
          align-items: stretch;
          overflow: hidden;
        }

        .h3-root::after {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.055) 3px, rgba(0,0,0,0.055) 4px
          );
          pointer-events: none; z-index: 5;
        }

        .h3-vig {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 35%, transparent 20%, rgba(0,0,0,0.85) 80%);
          pointer-events: none; z-index: 2;
        }

        .h3-canvas {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 1;
        }

        .h3-corner {
          position: absolute; width: 22px; height: 22px; z-index: 8; pointer-events: none;
        }
        .h3-tl { top: 48px; left: 16px; border-top: 1px solid rgba(253,224,71,0.4); border-left: 1px solid rgba(253,224,71,0.4); }
        .h3-tr { top: 48px; right: 16px; border-top: 1px solid rgba(253,224,71,0.4); border-right: 1px solid rgba(253,224,71,0.4); }
        .h3-bl { bottom: 14px; left: 16px; border-bottom: 1px solid rgba(50,197,244,0.3); border-left: 1px solid rgba(50,197,244,0.3); }
        .h3-br { bottom: 14px; right: 16px; border-bottom: 1px solid rgba(50,197,244,0.3); border-right: 1px solid rgba(50,197,244,0.3); }

        .h3-rec {
          position: absolute; top: 54px; right: 48px;
          display: flex; align-items: center; gap: 5px;
          z-index: 9; pointer-events: none;
        }
        .h3-rec-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ff3333;
          box-shadow: 0 0 8px rgba(255,51,51,0.8);
          animation: h3Rec 1s step-end infinite;
        }
        @keyframes h3Rec { 0%,100%{opacity:1} 50%{opacity:0} }
        .h3-rec-txt {
          /* Inter — UI label */
          font-family: 'Inter', sans-serif;
          font-size: 0.52rem; letter-spacing: 2px; font-weight: 700;
          color: rgba(255,60,60,0.8);
        }

        /* ════════════════════════════════════════════
           GATE
        ════════════════════════════════════════════ */
        .h3-gate {
          position: fixed; inset: 0; z-index: 200;
          background: #000;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 0;
          padding: 24px;
        }
        .h3-gate::before {
          content: '';
          position: absolute;
          top: -40%; left: -20%; width: 60%; height: 200%;
          background: rgba(253,224,71,0.025);
          transform: rotate(-12deg);
          pointer-events: none;
        }

        .h3-gate-pre {
          /* Inter light — small label */
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.6rem, 2.5vw, 0.78rem);
          font-weight: 300;
          letter-spacing: 10px; color: rgba(253,224,71,0.65);
          text-transform: uppercase; margin: 0 0 16px;
          text-align: center;
        }

        .h3-gate-word {
          display: block;
          /* Bebas Neue — giant display */
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 16vw, 11rem);
          font-weight: 400;
          line-height: 0.9; letter-spacing: 4px;
          text-align: center;
        }
        .h3-gate-w1 { color: #fff; }
        .h3-gate-w2 { color: #fde047; }

        .h3-gate-bar {
          width: 0; height: 2px;
          background: linear-gradient(90deg, #fde047, #32c5f4);
          margin: 20px auto;
          animation: h3BarGrow 0.8s ease forwards 0.5s;
        }
        @keyframes h3BarGrow { to { width: min(220px, 60vw); } }

        .h3-gate-sub {
          /* Inter — small sub label */
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.55rem, 2vw, 0.7rem);
          font-weight: 300;
          letter-spacing: 7px; color: rgba(255,255,255,0.3);
          text-transform: uppercase; text-align: center;
        }

        /* ════════════════════════════════════════════
           TICKER
        ════════════════════════════════════════════ */
        .h3-ticker {
          position: relative; z-index: 10;
          width: 100%;
          background: rgba(253,224,71,0.05);
          border-bottom: 1px solid rgba(253,224,71,0.2);
          overflow: hidden;
          height: 34px;
          display: flex; align-items: center;
        }
        .h3-ticker-track {
          display: flex; white-space: nowrap;
          animation: h3Tick 24s linear infinite;
        }
        @keyframes h3Tick { to { transform: translateX(-50%); } }
        .h3-ticker-item {
          /* Bebas Neue — ticker strip */
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.85rem, 1.8vw, 1rem);
          letter-spacing: 6px; color: rgba(253,224,71,0.7);
          text-transform: uppercase; padding: 0 28px; flex-shrink: 0;
        }
        .h3-ticker-sep { color: #32c5f4; margin: 0 4px; }

        /* ════════════════════════════════════════════
           MAIN AREA
        ════════════════════════════════════════════ */
        .h3-main {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: clamp(20px,4vh,40px) clamp(16px,5vw,48px);
          gap: clamp(10px,2vh,20px);
          overflow: hidden;
        }

        /* ── pre label ── */
        .h3-pre {
          display: flex; align-items: center; gap: 12px;
        }
        .h3-pre-line {
          width: clamp(24px,5vw,44px); height: 1px;
          background: rgba(253,224,71,0.5);
        }
        .h3-pre-txt {
          /* Inter — small label */
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.52rem, 1.8vw, 0.66rem);
          font-weight: 400;
          letter-spacing: clamp(4px,1vw,7px);
          color: rgba(253,224,71,0.8);
          text-transform: uppercase; white-space: nowrap;
        }

        /* ── brand ── */
        .h3-brand {
          display: flex; align-items: baseline;
          justify-content: center; gap: clamp(8px,2vw,16px);
          flex-wrap: wrap; text-align: center;
        }
        .h3-name {
          /* Bebas Neue — hero title */
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(38px, 10.5vw, 120px);
          font-weight: 400;
          color: #fde047; line-height: 0.9;
          letter-spacing: clamp(4px, 1vw, 10px);
          text-shadow:
            0 0 50px rgba(253,224,71,0.28),
            0 0 120px rgba(253,224,71,0.1);
        }
        .h3-inc {
          /* Bebas Neue — INC tag */
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(14px, 2.8vw, 30px);
          color: #32c5f4; letter-spacing: 8px;
          text-shadow: 0 0 16px rgba(50,197,244,0.7);
          align-self: flex-end; padding-bottom: 0.06em;
        }

        /* ── gradient rule ── */
        .h3-rule {
          width: clamp(100px,35%,260px); height: 1px;
          background: linear-gradient(90deg, transparent, #fde047 40%, #32c5f4 70%, transparent);
          opacity: 0.55;
        }

        /* ── tagline ── */
        .h3-tagline {
          /* Inter — body tagline */
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.82rem, 2vw, 1.05rem);
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          text-align: center; line-height: 1.75;
          max-width: 520px;
          margin: 0;
        }
        .h3-tagline b {
          color: rgba(255,255,255,0.88);
          font-weight: 700;
          border-bottom: 1px solid rgba(253,224,71,0.4);
          padding-bottom: 1px;
        }

        /* ── spine ── */
        .h3-spine {
          width: 1px;
          background: linear-gradient(to bottom, rgba(253,224,71,0.6), rgba(50,197,244,0.3));
        }

        /* ── nav branches ── */
        .h3-branches {
          display: flex; justify-content: center;
          align-items: flex-start;
          gap: 0; width: 100%; max-width: 720px;
          flex-wrap: wrap; row-gap: 12px;
        }

        .h3-hbridge {
          display: flex; width: 100%;
          justify-content: space-between; align-items: flex-start;
          position: relative;
        }
        .h3-hbridge::before {
          content: '';
          position: absolute; top: 0; left: 16.5%; right: 16.5%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.3), transparent);
        }

        .h3-node {
          display: flex; flex-direction: column;
          align-items: center; flex: 1;
          transition: opacity 0.4s, filter 0.4s;
          min-width: 120px;
        }
        .h3-hbridge:hover .h3-node:not(:hover) {
          opacity: 0.18; filter: blur(1.5px);
        }

        .h3-stem {
          width: 1px; height: 30px;
          background: rgba(253,224,71,0.35);
          transition: background 0.4s, box-shadow 0.35s;
        }
        .h3-node:hover .h3-stem {
          background: #32c5f4;
          box-shadow: 0 0 12px rgba(50,197,244,0.6);
        }

        .h3-box {
          position: relative; overflow: hidden;
          padding: clamp(10px,1.8vw,14px) clamp(16px,3.5vw,32px);
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(6,6,6,0.82);
          cursor: pointer;
          transition: border-color 0.35s, transform 0.35s, box-shadow 0.35s;
        }
        .h3-box::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(50,197,244,0.08);
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .h3-node:hover .h3-box::before { transform: scaleX(1); }
        .h3-node:hover .h3-box {
          border-color: rgba(50,197,244,0.35);
          transform: translateY(5px);
          box-shadow: 0 8px 24px rgba(50,197,244,0.07);
        }
        .h3-box::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 10px; height: 10px;
          border-top: 1px solid rgba(253,224,71,0.5);
          border-left: 1px solid rgba(253,224,71,0.5);
          z-index: 5;
        }

        .h3-link {
          /* Bebas Neue — nav labels */
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          letter-spacing: clamp(4px, 0.8vw, 7px);
          color: rgba(255,255,255,0.7);
          text-decoration: none; text-transform: uppercase;
          display: block; position: relative; z-index: 1;
          text-align: center; cursor: pointer;
          transition: color 0.3s;
        }
        .h3-node:hover .h3-link {
          color: #fff;
          text-shadow: 0 0 10px rgba(50,197,244,0.5);
        }

        /* ── stats strip ── */
        .h3-stats {
          display: flex;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          width: 100%; max-width: 560px;
        }
        .h3-stat {
          flex: 1; padding: clamp(10px,2vh,14px) 0;
          display: flex; flex-direction: column;
          align-items: center; gap: 4px;
        }
        .h3-stat + .h3-stat { border-left: 1px solid rgba(255,255,255,0.07); }
        .h3-stat-num {
          /* Bebas Neue — stat numbers */
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 2.8rem);
          font-weight: 400; color: #32c5f4; line-height: 1;
          letter-spacing: 2px;
        }
        .h3-stat-sup { font-size: 0.55em; vertical-align: super; color: #fde047; }
        .h3-stat-lbl {
          /* Inter — stat labels */
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem,1vw,0.52rem);
          font-weight: 400;
          letter-spacing: 3px; color: rgba(255,255,255,0.4);
          text-transform: uppercase; text-align: center; line-height: 1.5;
        }

        /* ════════════════════════════════════════════
           FOOTER ROW
        ════════════════════════════════════════════ */
        .h3-footer {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(16px,5vw,48px) clamp(14px,3vh,28px);
          gap: 12px;
        }

        .h3-byline { flex: 1; }
        .h3-byline-lbl {
          /* Inter — small eyebrow */
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem,1.4vw,0.56rem);
          font-weight: 400;
          letter-spacing: 5px; color: rgba(255,255,255,0.35);
          text-transform: uppercase; display: block; margin-bottom: 4px;
        }
        .h3-byline-name {
          /* Bebas Neue — name display */
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.2rem, 3vw, 2.1rem);
          font-weight: 400;
          color: rgba(255,255,255,0.7); letter-spacing: 4px; margin: 0;
          line-height: 1;
        }

        .h3-scroll {
          display: flex; flex-direction: column;
          align-items: center; gap: 0;
          flex-shrink: 0;
        }
        .h3-scroll-lbl {
          /* Inter — scroll label */
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem,1.3vw,0.54rem);
          font-weight: 300;
          letter-spacing: 5px; color: rgba(255,255,255,0.28);
          text-transform: uppercase; margin-bottom: 8px;
        }
        .h3-mouse {
          width: 20px; height: 30px;
          border: 1px solid rgba(255,255,255,0.18); border-radius: 10px;
          display: flex; justify-content: center;
        }
        .h3-wheel {
          width: 2px; height: 6px; margin-top: 5px;
          background: #32c5f4; border-radius: 2px;
        }
        .h3-scroll-line {
          width: 1px; height: 22px; margin-top: 7px;
          background: linear-gradient(to bottom, #32c5f4, transparent);
          animation: h3SL 2s ease-in-out infinite;
        }
        @keyframes h3SL { 0%,100%{opacity:.28} 50%{opacity:1} }

        .h3-seq {
          flex: 1; text-align: right;
          /* Inter — seq tag */
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem,1.4vw,0.56rem);
          font-weight: 300;
          letter-spacing: 3px; color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          line-height: 1.6;
        }
        .h3-seq span { display: block; }
        .h3-seq strong { color: rgba(253,224,71,0.5); font-weight: 700; }

        /* ════════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════════ */
        @media (max-width: 640px) {
          /* nav: keep desktop horizontal tree — no stacking */
          .h3-node   { min-width: 80px; }
          .h3-box    { padding: 8px 12px; }
          .h3-link   { font-size: 0.82rem; letter-spacing: 2px; }
          .h3-stem   { height: 20px; }

          .h3-footer { flex-direction: column; align-items: center; text-align: center; gap: 8px; }
          .h3-byline { text-align: center; }
          .h3-seq    { text-align: center; }
          .h3-rec    { display: none; }
        }

        @media (max-width: 380px) {
          .h3-name   { font-size: 34px; }
          .h3-box    { padding: 10px 14px; }
          .h3-stats  { max-width: 100%; }
          .h3-main   { gap: 8px; }
        }

        @media (max-height: 520px) and (orientation: landscape) {
          .h3-root    { height: auto; min-height: 100svh; }
          .h3-spine   { display: none; }
          .h3-stats   { display: none; }
          .h3-tagline { display: none; }
          .h3-main    { justify-content: flex-start; padding-top: 12px; }
        }
      `}</style>

      {/* ════ GATE ════ */}
      <AnimatePresence>
        {gatePhase !== 'gone' && (
          <motion.div
            className="h3-gate"
            animate={gatePhase === 'exit'
              ? { opacity: 0, y: -30, filter: 'blur(8px)' }
              : { opacity: 1, y: 0,   filter: 'blur(0px)' }
            }
            transition={{ duration: 0.65, ease: [0.77,0,0.18,1] }}
          >
            <motion.p
              className="h3-gate-pre"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              WELCOME TO
            </motion.p>

            <div style={{ overflow: 'hidden' }}>
              <motion.span
                className="h3-gate-word h3-gate-w1"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.18, duration: 0.7, ease: [0.16,1,0.3,1] }}
              >
                CINEMA
              </motion.span>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.span
                className="h3-gate-word h3-gate-w2"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.16,1,0.3,1] }}
              >
                PAYYAN
              </motion.span>
            </div>

            <div className="h3-gate-bar" />

            <motion.p
              className="h3-gate-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              PRODUCTIONS · INC · EST. 2014
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ HERO ════ */}
      <motion.div
        className="h3-root"
        onMouseMove={onMouseMove}
        style={{ x: sx, y: sy }}
      >
        <canvas className="h3-canvas" ref={canvasRef} />
        <div className="h3-vig" />

        <div className="h3-corner h3-tl" />
        <div className="h3-corner h3-tr" />
        <div className="h3-corner h3-bl" />
        <div className="h3-corner h3-br" />

        <div className="h3-rec">
          <div className="h3-rec-dot" />
          <span className="h3-rec-txt">REC</span>
        </div>

        {/* ── TICKER ── */}
        <div className="h3-ticker">
          <div className="h3-ticker-track">
            {[0,1].map(r => TICKER_WORDS.map((w,i) => (
              <span key={`${r}-${i}`} className="h3-ticker-item">
                {w}<span className="h3-ticker-sep">•</span>
              </span>
            )))}
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="h3-main">

          <motion.div className="h3-pre"
            initial={{ opacity:0, y:14 }}
            animate={{ opacity: ready?1:0, y: ready?0:14 }}
            transition={{ duration:0.7 }}
          >
            <div className="h3-pre-line" />
            <span className="h3-pre-txt">EST. 2014 · CHENNAI</span>
            <div className="h3-pre-line" />
          </motion.div>

          <motion.div className="h3-brand"
            initial={{ opacity:0, y:20 }}
            animate={{ opacity: ready?1:0, y: ready?0:20 }}
            transition={{ duration:0.8, delay:0.05 }}
          >
            <h1 className="h3-name">CINEMAPAYYAN</h1>
            <motion.span className="h3-inc"
              animate={{ opacity:[0.35,1,0.35] }}
              transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
            >INC</motion.span>
          </motion.div>

          <motion.div className="h3-rule"
            initial={{ scaleX:0 }}
            animate={{ scaleX: ready?1:0 }}
            transition={{ duration:0.9, delay:0.15 }}
            style={{ transformOrigin:'center' }}
          />

          <motion.p className="h3-tagline"
            initial={{ opacity:0 }}
            animate={{ opacity: ready?1:0 }}
            transition={{ delay:0.25, duration:0.9 }}
          >
            <b>Storytelling</b> through a cinematic lens —<br />
            where every frame is a declaration.
          </motion.p>

          <motion.div className="h3-spine"
            initial={{ height:0 }}
            animate={{ height: ready?36:0 }}
            transition={{ delay:0.35, duration:0.6 }}
          />

          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity: ready?1:0 }}
            transition={{ delay:0.4, duration:0.6 }}
            style={{ width:'100%', display:'flex', justifyContent:'center' }}
          >
            <div className="h3-branches">
              <div className="h3-hbridge">
                {BRANCHES.map((b, i) => (
                  <motion.div key={i} className="h3-node"
                    initial={{ opacity:0, y:14 }}
                    animate={{ opacity: ready?1:0, y: ready?0:14 }}
                    transition={{ delay: 0.5 + i*0.1, duration:0.5 }}
                  >
                    <div className="h3-stem" />
                    <div className="h3-box">
                      {b.isScroll
                        ? <div className="h3-link" onClick={() => onScrollRequest?.(b.key)}>{b.title}</div>
                        : <Link to={b.path} className="h3-link">{b.title}</Link>
                      }
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="h3-stats"
            initial={{ opacity:0, y:14 }}
            animate={{ opacity: ready?1:0, y: ready?0:14 }}
            transition={{ delay:0.65, duration:0.7 }}
          >
            <div className="h3-stat">
              <span className="h3-stat-num">{years}<span className="h3-stat-sup">+</span></span>
              <span className="h3-stat-lbl">YEARS OF<br/>EVOLUTION</span>
            </div>
            <div className="h3-stat">
              <span className="h3-stat-num">{followers}<span className="h3-stat-sup">K</span></span>
              <span className="h3-stat-lbl">INSTAGRAM<br/>FOLLOWERS</span>
            </div>
            <div className="h3-stat">
              <span className="h3-stat-num">∞</span>
              <span className="h3-stat-lbl">CINEMATIC<br/>VISION</span>
            </div>
          </motion.div>

        </div>

        {/* ── FOOTER ── */}
        <motion.div className="h3-footer"
          initial={{ opacity:0 }}
          animate={{ opacity: ready?1:0 }}
          transition={{ delay:0.8, duration:0.8 }}
        >
          <div className="h3-byline">
            <span className="h3-byline-lbl">CINEMA ENTREPRENEUR</span>
            <h2 className="h3-byline-name">ABISHEK RAAJA</h2>
          </div>

          <div className="h3-scroll">
            <p className="h3-scroll-lbl">EXPLORE</p>
            <div className="h3-mouse">
              <motion.div className="h3-wheel"
                animate={{ y:[0,8,0] }}
                transition={{ duration:1.5, repeat:Infinity, ease:'easeInOut' }}
              />
            </div>
            <div className="h3-scroll-line" />
          </div>

          <div className="h3-seq">
            <span><strong>SEQ 01</strong></span>
            <span>HERO · WELCOME</span>
          </div>
        </motion.div>

      </motion.div>
    </>
  );
}
import React, { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { Images } from './assets/assets';

const projects = [
  { id: 1,  img: Images.mahaveeran,    title: "MAAVEERAN"          },
  { id: 2,  img: Images.chitha,        title: "CHITHA"             },
  { id: 3,  img: Images.coustdy,       title: "CUSTODY"            },
  { id: 4,  img: Images.ptsir,         title: "PT SIR"             },
  { id: 5,  img: Images.Eraivan,       title: "ERAIVAN"            },
  { id: 6,  img: Images.madrasMatniee, title: "MADRAS MATINEE"     },
  { id: 7,  img: Images.dear,          title: "DEAR"               },
  { id: 8,  img: Images.Angammal,      title: "ANGAMMAL"           },
  { id: 9,  img: Images.Kumki2,        title: "KUMKI 2"            },
  { id: 10, img: Images.Gevi,          title: "GEVI"               },
  { id: 11, img: Images.RetroImg,      title: "RETRO"              },
  { id: 12, img: Images.KadalReset,    title: "KADAL RESET REPEAT" },
  { id: 13, img: Images.SnakeAndLader, title: "SNAKE & LADDER"     },
  { id: 14, img: Images.Adipurshan,    title: "ADIPURUSHAN"        },
  { id: 15, img: Images.Ragut,         title: "RAGU THATHA"        },
  { id: 16, img: Images.Adiya,         title: "ADIYA"              },
];

const duplicatedProjects = [...projects, ...projects];

/* ─── FONT TOKENS ───────────────────────────────────────────────────────────
   Display  → 'Bebas Neue'  (bold condensed caps — titles & card headings)
   Body     → 'Inter'       (clean sans-serif — labels, tags, hint text)
─────────────────────────────────────────────────────────────────────────── */

const Work: React.FC = () => {
  const baseX = useMotionValue(0);

  const scrollY = useMotionValue(0);
  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], { clamp: false });

  useAnimationFrame((_t, delta) => {
    let moveBy = -0.005 * (delta / 16);
    moveBy += velocityFactor.get() * moveBy;
    let newValue = baseX.get() + moveBy;
    if (newValue <= -50) newValue = 0;
    else if (newValue > 0) newValue = -50;
    baseX.set(newValue);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <>
      <style>{`
        /* ── FONT IMPORTS ── */
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

        /* ── FONT TOKENS ── */
        :root {
          --font-display : 'Bebas Neue', sans-serif;
          --font-body    : 'Inter', sans-serif;
        }

        /* ─── SECTION ─────────────────────────────── */
        .cp-work-section {
          background: #000;
          padding: 100px 0 110px;
          overflow: hidden;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        .cp-work-section::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
          pointer-events: none;
        }

        /* ─── HEADER ──────────────────────────────── */
        .cp-work-header {
          padding: 0 clamp(20px, 8%, 80px);
          margin-bottom: 50px;
        }

        /* pre-label — Inter */
        .cp-work-pre {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .cp-work-pre-line {
          width: 32px; height: 1px;
          background: #fde047;
          opacity: 0.5;
          flex-shrink: 0;
        }
        .cp-work-pre-text {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 5px;
          color: rgba(253,224,71,0.85);
          text-transform: uppercase;
        }

        /* main title — Bebas Neue */
        .cp-work-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 11vw, 9rem);
          font-weight: 400;
          font-style: normal;
          color: #fff;
          line-height: 0.92;
          letter-spacing: 2px;
          margin: 0 0 16px;
        }
        .cp-work-title-stroke {
          font-family: var(--font-display);
          font-weight: 400;
          font-style: normal;
          -webkit-text-stroke: 1.5px #32c5f4;
          color: transparent;
          letter-spacing: 2px;
        }

        /* gradient rule */
        .cp-work-rule {
          width: 280px;
          height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.3), rgba(50,197,244,0.2), transparent);
          margin-bottom: 16px;
        }

        /* partner tag — Inter */
        .cp-work-tag {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 5px;
          color: rgba(253,224,71,0.75);
          text-transform: uppercase;
          margin: 0;
        }

        /* ─── MARQUEE ─────────────────────────────── */
        .cp-marquee-wrapper {
          display: flex;
          width: 100%;
          cursor: grab;
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          overflow: hidden;
        }
        .cp-marquee-wrapper:active { cursor: grabbing; }

        .cp-marquee-track {
          display: flex;
          gap: 20px;
          will-change: transform;
          padding: 10px 0 18px;
        }

        /* ─── FILM CARD ───────────────────────────── */
        .cp-film-card {
          flex: 0 0 400px;
          height: 570px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-film-card:hover {
          transform: translateY(-12px);
          z-index: 5;
        }

        .cp-img-box {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
          background: #0a0a0a;
          position: relative;
        }
        .cp-film-card:hover .cp-img-box {
          border-color: rgba(50,197,244,0.22);
          box-shadow: 0 14px 44px rgba(0,0,0,0.7);
        }

        .cp-img-box::before {
          content: '';
          position: absolute;
          top: 8px; left: 8px;
          width: 10px; height: 10px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          z-index: 4;
          pointer-events: none;
        }
        .cp-img-box::after {
          content: '';
          position: absolute;
          bottom: 8px; right: 8px;
          width: 10px; height: 10px;
          border-bottom: 1px solid rgba(253,224,71,0.4);
          border-right: 1px solid rgba(253,224,71,0.4);
          z-index: 4;
          pointer-events: none;
        }

        .cp-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.1s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
          user-select: none;
        }
        .cp-film-card:hover .cp-img-box img {
          transform: scale(1.06);
        }

        /* overlay */
        .cp-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.9) 0%,
            rgba(0,0,0,0.2) 45%,
            transparent 65%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 26px;
          z-index: 2;
        }
        .cp-card-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(50,197,244,0.05);
          opacity: 0;
          transition: opacity 0.4s;
          z-index: -1;
        }
        .cp-film-card:hover .cp-card-overlay::before { opacity: 1; }

        /* promo label — Inter */
        .cp-card-label {
          font-family: var(--font-body);
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(50,197,244,0.95);
          margin-bottom: 6px;
          display: block;
        }

        /* film title — Bebas Neue */
        .cp-card-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 400;
          font-style: normal;
          color: #fff;
          margin: 0;
          letter-spacing: 1.5px;
          line-height: 1;
          transition: color 0.35s;
        }
        .cp-film-card:hover .cp-card-title { color: #fde047; }

        /* ─── HINT BAR ────────────────────────────── */
        .cp-work-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 46px;
          gap: 12px;
        }

        .cp-hint-line {
          width: 80px; height: 1px;
          background: rgba(255,255,255,0.07);
          position: relative;
          overflow: hidden;
        }

        .cp-hint-fill {
          position: absolute;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, #32c5f4, #fde047);
        }

        /* hint text — Inter */
        .cp-hint-text {
          font-family: var(--font-body);
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        /* ─── RESPONSIVE ──────────────────────────── */
        @media (max-width: 1024px) {
          .cp-film-card { flex: 0 0 320px; height: 460px; }
        }
        @media (max-width: 600px) {
          .cp-work-section { padding: 70px 0 80px; }
          .cp-film-card { flex: 0 0 240px; height: 350px; }
          .cp-work-title { font-size: 3.5rem; }
          .cp-card-overlay { padding: 18px; }
          .cp-card-title { font-size: 1.6rem; }
        }
      `}</style>

      <section className="cp-work-section">

        {/* Header */}
        <div className="cp-work-header">
          <div className="cp-work-pre">
            <div className="cp-work-pre-line" />
            <span className="cp-work-pre-text">CINEMAPAYYAN INC</span>
          </div>

          <h1 className="cp-work-title">
            FINISHED{' '}
            <span className="cp-work-title-stroke">PROJECTS</span>
          </h1>

          <div className="cp-work-rule" />
          <p className="cp-work-tag">PROMOTIONAL PARTNER</p>
        </div>

        {/* Marquee */}
        <div className="cp-marquee-wrapper">
          <motion.div
            className="cp-marquee-track"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={(_e, info) => {
              baseX.set(baseX.get() + info.delta.x * 0.01);
            }}
          >
            {duplicatedProjects.map((proj, index) => (
              <div key={index} className="cp-film-card">
                <div className="cp-img-box">
                  <img src={proj.img} alt={proj.title} draggable={false} />
                  <div className="cp-card-overlay">
                    <span className="cp-card-label">PROMOTIONAL PARTNER</span>
                    <h2 className="cp-card-title">{proj.title}</h2>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hint */}
        <div className="cp-work-hint">
          <div className="cp-hint-line">
            <motion.div
              className="cp-hint-fill"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            />
          </div>
          <span className="cp-hint-text">CINEMATIC VIEW&nbsp;•&nbsp;DRAG TO SHIFT</span>
        </div>

      </section>
    </>
  );
};

export default Work;
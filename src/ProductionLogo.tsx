import React from 'react';
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useSpring,
} from 'framer-motion';
import { Images } from './assets/assets';

const logos = [
  { id: 1,  img: Images.Stone             },
  { id: 2,  img: Images.startda           },
  { id: 3,  img: Images.levelup           },
  { id: 4,  img: Images.Tseries           },
  { id: 5,  img: Images.PotentialStudio   },
  { id: 6,  img: Images.NutmegProduction  },
  { id: 7,  img: Images.EtakiLogo        },
  { id: 8,  img: Images.Srinivass         },
  { id: 9,  img: Images.MaliMovieMAkers   },
  { id: 10, img: Images.Arupthangles      },
  { id: 11, img: Images.PenStudio         },
  { id: 12, img: Images.madras            },
];

const quadrupledLogos = [...logos, ...logos, ...logos, ...logos];

const ProductionLogo: React.FC = () => {
  const baseX   = useMotionValue(0);
  const smoothX = useSpring(baseX, { damping: 50, stiffness: 300 });

  useAnimationFrame((_t, delta) => {
    let moveBy = 0.015 * (delta / 16);
    let nextX  = baseX.get() + moveBy;
    if (nextX >= 0) nextX = -25;
    baseX.set(nextX);
  });

  const x   = useTransform(smoothX, (v) => `${v}%`);
  const bgX = useTransform(smoothX, (v) => `${v * 15}px`);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ─── SECTION ─────────────────────────────── */
        .cp-prod-section {
          background: #000;
          padding: 110px 0 120px;
          width: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cp-prod-section::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
          pointer-events: none;
        }

        .cp-prod-section::after {
          content: '映';
          position: absolute;
          right: 4%; bottom: -40px;
          font-size: 22rem;
          color: rgba(255,255,255,0.012);
          font-family: serif;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* ─── RADIAL GLOW ─────────────────────────── */
        .cp-prod-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 100%; height: 70%;
          background: radial-gradient(circle, rgba(50,197,244,0.04) 0%, transparent 65%);
          filter: blur(80px);
          z-index: 1;
          pointer-events: none;
        }

        /* ─── HEADER ──────────────────────────────── */
        .cp-prod-header {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-bottom: 65px;
        }

        .cp-prod-pre {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .cp-prod-pre-line {
          width: 32px; height: 1px;
          background: #fde047;
          opacity: 0.5;
        }
        .cp-prod-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 5px;
          color: rgba(253,224,71,0.85);
          text-transform: uppercase;
        }

        .cp-prod-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 9vw, 6.5rem);
          font-weight: 400;
          color: #fff;
          margin: 0 0 18px;
          line-height: 0.95;
          letter-spacing: 3px;
        }
        .cp-prod-title-yellow {
          color: #fde047;
        }

        .cp-prod-rule {
          width: 130px; height: 1px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          margin: 0 auto;
          opacity: 0.7;
        }

        /* ─── FILM STRIP ──────────────────────────── */
        .cp-film-strip {
          position: relative;
          width: 100%;
          height: 210px;
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(253,224,71,0.15);
          border-bottom: 1px solid rgba(50,197,244,0.15);
          display: flex;
          align-items: center;
          z-index: 5;
          overflow: hidden;
        }

        .cp-sprockets {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(circle, rgba(253,224,71,0.55) 42%, transparent 45%),
            radial-gradient(circle, rgba(253,224,71,0.55) 42%, transparent 45%);
          background-size: 70px 22px;
          background-position: 0 10%, 0 90%;
          background-repeat: repeat-x;
        }

        .cp-film-strip::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        .cp-logo-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: 100px;
          cursor: grab;
          touch-action: none;
          z-index: 10;
          padding: 0 40px;
        }
        .cp-logo-track:active { cursor: grabbing; }

        .cp-logo-cell {
          flex: 0 0 160px;
          height: 110px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .cp-logo-cell:hover { transform: scale(1.1); }

        .cp-logo-cell::before,
        .cp-logo-cell::after {
          content: '';
          position: absolute;
          width: 8px; height: 8px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cp-logo-cell::before {
          top: 0; left: 0;
          border-top: 1px solid rgba(253,224,71,0.5);
          border-left: 1px solid rgba(253,224,71,0.5);
        }
        .cp-logo-cell::after {
          bottom: 0; right: 0;
          border-bottom: 1px solid rgba(253,224,71,0.5);
          border-right: 1px solid rgba(253,224,71,0.5);
        }
        .cp-logo-cell:hover::before,
        .cp-logo-cell:hover::after { opacity: 1; }

        .cp-logo-cell img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 8px 18px rgba(0,0,0,0.9));
          pointer-events: none;
          user-select: none;
          transition: filter 0.35s;
        }
        .cp-logo-cell:hover img {
          filter: drop-shadow(0 0 14px rgba(253,224,71,0.25))
                  drop-shadow(0 8px 18px rgba(0,0,0,0.9));
        }

        .cp-vignette {
          position: absolute;
          top: 0; bottom: 0;
          width: 22%;
          z-index: 20;
          pointer-events: none;
        }
        .cp-vignette--left  { left: 0;  background: linear-gradient(to right, #000, transparent); }
        .cp-vignette--right { right: 0; background: linear-gradient(to left,  #000, transparent); }

        /* ─── HINT ────────────────────────────────── */
        .cp-prod-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 44px;
          gap: 12px;
          position: relative;
          z-index: 10;
        }
        .cp-prod-hint-line {
          width: 80px; height: 1px;
          background: rgba(255,255,255,0.07);
          position: relative; overflow: hidden;
        }
        .cp-prod-hint-fill {
          position: absolute;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, #32c5f4, #fde047);
        }
        .cp-prod-hint-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        /* ─── RESPONSIVE ──────────────────────────── */
        @media (max-width: 768px) {
          .cp-logo-cell { flex: 0 0 120px; height: 80px; }
          .cp-logo-track { gap: 65px; }
          .cp-film-strip { height: 170px; }
          .cp-sprockets  { background-size: 50px 17px; }
        }
        @media (max-width: 480px) {
          .cp-prod-section { padding: 70px 0 80px; }
          .cp-logo-cell { flex: 0 0 95px; height: 65px; }
          .cp-logo-track { gap: 44px; }
          .cp-film-strip { height: 140px; }
        }
      `}</style>

      <section className="cp-prod-section">
        <div className="cp-prod-glow" />

        {/* ── HEADER ──────────────────────────────── */}
        <div className="cp-prod-header">
          <div className="cp-prod-pre">
            <div className="cp-prod-pre-line" />
            <span className="cp-prod-pre-text">OFFICIAL COLLABORATIONS</span>
            <div className="cp-prod-pre-line" />
          </div>

          <h2 className="cp-prod-title">
            TIE-UP{' '}
            <span className="cp-prod-title-yellow">PARTNERS</span>
          </h2>

          <div className="cp-prod-rule" />
        </div>

        {/* ── FILM STRIP ──────────────────────────── */}
        <div className="cp-film-strip">

          <motion.div
            className="cp-sprockets"
            style={{ backgroundPositionX: bgX }}
          />

          <motion.div
            className="cp-logo-track"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={(_e, info) => {
              baseX.set(baseX.get() + info.delta.x * 0.02);
            }}
          >
            {quadrupledLogos.map((logo, index) => (
              <div key={index} className="cp-logo-cell">
                <img src={logo.img} alt="Production Partner" draggable={false} />
              </div>
            ))}
          </motion.div>

          <div className="cp-vignette cp-vignette--left" />
          <div className="cp-vignette cp-vignette--right" />
        </div>

        {/* ── HINT ────────────────────────────────── */}
        <div className="cp-prod-hint">
          <div className="cp-prod-hint-line">
            <motion.div
              className="cp-prod-hint-fill"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            />
          </div>
          <span className="cp-prod-hint-text">DRAG TO EXPLORE</span>
        </div>

      </section>
    </>
  );
};

export default ProductionLogo;
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Images } from './assets/assets';

const About = forwardRef<HTMLDivElement>((props, ref) => {
  const movieTrain = [
    Images.bigboss, Images.stone, Images.levelup,
    Images.startda, Images.logo, Images.madras,
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');

        /* ═══════════════════════════════════════════
           SECTION
        ═══════════════════════════════════════════ */
        .cp-ab-section {
          width: 100%;
          min-height: 100vh;
          background: #000;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 110px 8%;
        }

        /* top hairline */
        .cp-ab-section::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
          pointer-events: none; z-index: 0;
        }

        /* kanji watermark */
        .cp-ab-section::after {
          content: '人';
          position: absolute;
          right: 3%; bottom: -40px;
          font-size: 28rem;
          color: rgba(255,255,255,0.012);
          font-family: serif; line-height: 1;
          pointer-events: none; user-select: none; z-index: 0;
        }

        /* film-grain noise */
        .cp-ab-grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }

        /* ═══════════════════════════════════════════
           BACKGROUND LOGO TRAIN
        ═══════════════════════════════════════════ */
        .cp-ab-train-wrap {
          position: absolute;
          top: 15%; left: 0;
          width: 100%; height: 200px;
          opacity: 0.07;
          z-index: 1;
          pointer-events: none;
          display: flex; align-items: center;
          overflow: hidden;
        }

        .cp-ab-train-track {
          display: flex;
          width: max-content;
          animation: cpAbTrain 38s linear infinite;
        }
        @keyframes cpAbTrain {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        .cp-ab-train-logo {
          height: 100px;
          margin-right: 80px;
          filter: grayscale(100%) brightness(1.8);
          object-fit: contain;
        }

        /* ═══════════════════════════════════════════
           MAIN LAYOUT
        ═══════════════════════════════════════════ */
        .cp-ab-layout {
          position: relative; z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          align-items: center;
          gap: 90px;
          width: 100%;
        }

        /* ─── VISUAL SIDE ───────────────────────── */
        .cp-ab-visual { position: relative; }

        /* TL corner mark — larger than card marks */
        .cp-ab-visual::before {
          content: '';
          position: absolute;
          top: -12px; left: -12px;
          width: 36px; height: 36px;
          border-top: 1px solid rgba(253,224,71,0.5);
          border-left: 1px solid rgba(253,224,71,0.5);
          pointer-events: none; z-index: 10;
        }

        /* BR corner mark */
        .cp-ab-visual::after {
          content: '';
          position: absolute;
          bottom: -12px; right: -12px;
          width: 36px; height: 36px;
          border-bottom: 1px solid rgba(50,197,244,0.45);
          border-right: 1px solid rgba(50,197,244,0.45);
          pointer-events: none; z-index: 10;
        }

        .cp-ab-img {
          width: 100%;
          max-width: 480px;
          height: auto;
          display: block;
          filter: drop-shadow(0 20px 60px rgba(0,0,0,0.9));
          transition: transform 0.6s ease;
        }
        .cp-ab-visual:hover .cp-ab-img { transform: scale(1.015); }

        /* status badge — cp-insta-btn style */
        .cp-ab-badge {
          position: absolute;
          top: 20px; left: -18px;
          display: flex; align-items: center; gap: 9px;
          font-family: 'Courier New', monospace;
          font-size: 0.42rem; letter-spacing: 3px;
          color: rgba(255,255,255,0.5);
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 8px 16px;
          z-index: 10;
          text-transform: uppercase;
          white-space: nowrap;
          transition: border-color 0.3s, color 0.3s;
        }
        .cp-ab-visual:hover .cp-ab-badge {
          border-color: #fde047; color: #fde047;
        }

        /* live dot */
        .cp-ab-dot {
          width: 7px; height: 7px;
          background: #ff3333;
          border-radius: 50%;
          box-shadow: 0 0 8px #ff3333;
          flex-shrink: 0;
          animation: cpAbPulse 1.5s infinite;
        }
        @keyframes cpAbPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.35; transform: scale(1.3); }
        }

        /* ─── TEXT SIDE ─────────────────────────── */
        .cp-ab-text {}

        /* pre-label */
        .cp-ab-pre {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 18px;
        }
        .cp-ab-pre-line {
          width: 32px; height: 1px;
          background: #fde047; opacity: 0.5;
        }
        .cp-ab-pre-text {
          font-family: 'Courier New', monospace;
          font-size: 0.44rem; letter-spacing: 6px;
          color: rgba(253,224,71,0.55); text-transform: uppercase;
        }

        /* main heading */
        .cp-ab-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3.2rem, 7.5vw, 7rem);
          font-weight: 800; font-style: italic;
          color: #fff;
          line-height: 0.9; letter-spacing: -2px;
          margin: 0 0 10px;
        }
        .cp-ab-title-yellow { color: #fde047; font-style: normal; }

        /* gradient rule */
        .cp-ab-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.25), rgba(50,197,244,0.2), transparent);
          margin-bottom: 26px;
        }

        /* lead */
        .cp-ab-lead {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          color: rgba(255,255,255,0.85);
          line-height: 1.7; margin: 0 0 14px;
        }
        .cp-ab-lead-cyan { color: #32c5f4; font-weight: 700; }

        /* philosophy */
        .cp-ab-philosophy {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.95rem, 1.3vw, 1.05rem);
          font-style: italic;
          color: rgba(255,255,255,0.38);
          line-height: 1.9; max-width: 520px;
          margin: 0;
        }
        .cp-ab-philosophy-hl {
          color: rgba(255,255,255,0.8);
          font-style: normal; font-weight: 600;
        }

        /* ─── STATS STRIP ───────────────────────── */
        .cp-ab-stats {
          display: flex;
          align-items: stretch;
          gap: 0;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          padding: 16px 22px;
          margin-top: 38px;
        }

        .cp-ab-stat {
          display: flex; flex-direction: column;
          gap: 5px; flex: 1;
        }

        .cp-ab-stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.07);
          margin: 0 22px; align-self: stretch;
        }

        .cp-ab-stat-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700; color: #32c5f4;
          line-height: 1;
        }

        .cp-ab-stat-label {
          font-family: 'Courier New', monospace;
          font-size: 0.38rem; letter-spacing: 3px;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase; line-height: 1.5;
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .cp-ab-layout {
            grid-template-columns: 1fr;
            text-align: center; gap: 55px;
          }
          .cp-ab-img      { max-width: 360px; margin: 0 auto; display: block; }
          .cp-ab-pre      { justify-content: center; }
          .cp-ab-philosophy { margin: 0 auto; }
          .cp-ab-badge,
          .cp-ab-visual::before,
          .cp-ab-visual::after { display: none; }
          .cp-ab-stats    { justify-content: center; max-width: 340px; margin: 38px auto 0; }
        }
        @media (max-width: 768px) {
          .cp-ab-section  { padding: 80px 5%; }
          .cp-ab-train-logo { height: 65px; margin-right: 40px; }
          .cp-ab-title    { font-size: 3.5rem; }
        }
        @media (max-width: 480px) {
          .cp-ab-title    { font-size: 2.8rem; }
          .cp-ab-stat-num { font-size: 1.8rem; }
          .cp-ab-stat-label { font-size: 0.35rem; }
        }
      `}</style>

      <section ref={ref} className="cp-ab-section">
        <div className="cp-ab-grain" />

        {/* ── LOGO TRAIN ──────────────────────────── */}
        <div className="cp-ab-train-wrap">
          <div className="cp-ab-train-track">
            {[...movieTrain, ...movieTrain, ...movieTrain].map((img, i) => (
              <img key={i} src={img} alt="Brand" className="cp-ab-train-logo" />
            ))}
          </div>
        </div>

        {/* ── MAIN LAYOUT ─────────────────────────── */}
        <div className="cp-ab-layout">

          {/* Visual */}
          <motion.div
            className="cp-ab-visual"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={Images.abishakeRaja} alt="Abishek Raaja" className="cp-ab-img" />
            <div className="cp-ab-badge">
              <span className="cp-ab-dot" />
              <span>STILL SEARCHING</span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="cp-ab-text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* pre-label */}
            <div className="cp-ab-pre">
              <div className="cp-ab-pre-line" />
              <span className="cp-ab-pre-text">ESTABLISHED &bull; REDEFINING DAILY</span>
            </div>

            {/* heading */}
            <h2 className="cp-ab-title">
              Abishek<br />
              <span className="cp-ab-title-yellow">Raaja</span>
            </h2>

            {/* rule */}
            <div className="cp-ab-rule" />

            {/* bio */}
            <p className="cp-ab-lead">
              Founder of{' '}
              <span className="cp-ab-lead-cyan">CINEMAPAYYAN PRODUCTIONS</span>.
            </p>
            <p className="cp-ab-philosophy">
              Success isn't a destination; it's a constant state of motion. Even now, we are{' '}
              <span className="cp-ab-philosophy-hl">searching for the unseen</span>.
              To us, every sunrise is a blank script and every day is a new opportunity to
              redefine what cinema can be.
            </p>

            {/* stats strip — exact cp-stats pattern */}
            <div className="cp-ab-stats">
              <div className="cp-ab-stat">
                <span className="cp-ab-stat-num">10<sup style={{ fontSize:'0.5em', verticalAlign:'super' }}>+</sup></span>
                <span className="cp-ab-stat-label">YEARS OF<br />EVOLUTION</span>
              </div>
              <div className="cp-ab-stat-divider" />
              <div className="cp-ab-stat">
                <span className="cp-ab-stat-num">44.6K</span>
                <span className="cp-ab-stat-label">INSTAGRAM<br />FOLLOWERS</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
});

export default About;
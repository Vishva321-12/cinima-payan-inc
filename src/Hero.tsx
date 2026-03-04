import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroProps {
  onScrollRequest?: (target: string) => void;
}

const Hero = ({ onScrollRequest }: HeroProps) => {
  const branches = [
    { title: "PROMOTIONS",  path: "#work",       className: "cp-hr-left",   isScroll: true  },
    { title: "PRODUCTIONS", path: "#promotions", className: "cp-hr-center", isScroll: true  },
    { title: "MUNAI",       path: "/munai",      className: "cp-hr-right",  isScroll: false },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');

        /* ═══════════════════════════════════════════
           HERO CONTAINER
        ═══════════════════════════════════════════ */
        .cp-hr-container {
          height: 100vh;
          min-height: 650px;
          width: 100%;
          background: #000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 60px 0 38px;
        }

        /* scanline texture */
        .cp-hr-container::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px
          );
          pointer-events: none; z-index: 3;
        }

        /* vignette */
        .cp-hr-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.92) 90%);
          pointer-events: none; z-index: 2;
        }

        /* ambient glow */
        .cp-hr-glow {
          position: absolute; width: 100%; height: 100%;
          background:
            radial-gradient(circle at 30% 60%, rgba(50,197,244,0.055) 0%, transparent 50%),
            radial-gradient(circle at 70% 40%, rgba(253,224,71,0.04) 0%, transparent 50%);
          animation: cpHrGlow 8s infinite alternate;
          pointer-events: none; z-index: 1;
        }
        @keyframes cpHrGlow {
          0%   { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.75; transform: scale(1.2); }
        }

        /* ═══════════════════════════════════════════
           TREE ARCHITECTURE
        ═══════════════════════════════════════════ */
        .cp-hr-tree {
          display: flex; flex-direction: column;
          align-items: center;
          z-index: 10; width: 100%;
          padding: 0 20px;
          margin: auto 0;
        }

        /* trunk */
        .cp-hr-trunk {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
        }

        /* brand name */
        .cp-hr-brand {
          display: flex; flex-direction: row;
          align-items: baseline; justify-content: center;
          gap: 12px;
        }

        /* CINEMAPAYYAN — editorial italic serif */
        .cp-hr-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(42px, 10vw, 115px);
          font-weight: 800;
          font-style: italic;
          color: #fde047;
          letter-spacing: -1px;
          line-height: 0.92;
          text-shadow:
            0 0 60px rgba(253,224,71,0.2),
            0 0 120px rgba(253,224,71,0.08);
        }

        /* INC — monospace counter */
        .cp-hr-inc {
          font-family: 'Courier New', monospace;
          font-size: clamp(14px, 2.5vw, 28px);
          color: #32c5f4;
          letter-spacing: 6px;
          font-weight: 400;
          text-shadow: 0 0 20px rgba(50,197,244,0.6);
          align-self: flex-end;
          padding-bottom: 0.1em;
        }

        /* trunk spine */
        .cp-hr-spine {
          width: 1px;
          background: linear-gradient(to bottom, #fde047, #32c5f4);
          box-shadow: 0 0 10px rgba(50,197,244,0.4);
          margin: 18px 0;
        }

        /* ─── BRANCHES ──────────────────────────── */
        .cp-hr-branches {
          position: relative; width: 100%;
          max-width: 1100px;
          display: flex; flex-direction: column;
          align-items: center;
        }

        /* horizontal line */
        .cp-hr-hline {
          width: 72%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.4), transparent);
        }

        /* nodes row */
        .cp-hr-nodes {
          display: flex; justify-content: space-between;
          width: 72%; margin-top: 0;
        }

        .cp-hr-node {
          display: flex; flex-direction: column;
          align-items: center; flex: 1;
          transition: opacity 0.4s, filter 0.4s;
        }

        /* dim non-hovered siblings */
        .cp-hr-nodes:hover .cp-hr-node:not(:hover) {
          opacity: 0.18; filter: blur(2px);
        }

        /* vertical stem */
        .cp-hr-stem {
          width: 1px;
          background: rgba(253,224,71,0.5);
          transition: background 0.4s, box-shadow 0.4s, height 0.4s;
        }
        .cp-hr-node:hover .cp-hr-stem {
          background: #32c5f4;
          box-shadow: 0 0 14px rgba(50,197,244,0.6);
        }

        /* interactive box — cp-feature border style */
        .cp-hr-box {
          padding: 16px 32px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(6,6,6,0.85);
          backdrop-filter: blur(20px);
          cursor: pointer;
          transition: border-color 0.35s, background 0.35s, transform 0.35s, box-shadow 0.35s;
          position: relative; overflow: hidden;
        }

        /* fill-sweep on hover */
        .cp-hr-box::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(50,197,244,0.06);
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-hr-node:hover .cp-hr-box::before { transform: scaleX(1); }
        .cp-hr-node:hover .cp-hr-box {
          border-color: rgba(50,197,244,0.3);
          transform: translateY(6px);
          box-shadow: 0 0 30px rgba(50,197,244,0.08);
        }

        /* TL corner mark on box */
        .cp-hr-box::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 8px; height: 8px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          pointer-events: none; z-index: 5;
          transition: border-color 0.3s;
        }
        .cp-hr-node:hover .cp-hr-box::after {
          border-color: rgba(50,197,244,0.5);
        }

        /* node link text */
        .cp-hr-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-family: 'Courier New', monospace;
          font-size: clamp(0.6rem, 1.4vw, 0.78rem);
          letter-spacing: 5px;
          text-transform: uppercase;
          display: block;
          position: relative; z-index: 1;
          transition: color 0.35s, letter-spacing 0.35s;
          cursor: pointer;
        }
        .cp-hr-node:hover .cp-hr-link {
          color: #fff;
          letter-spacing: 7px;
          text-shadow: 0 0 10px rgba(50,197,244,0.5);
        }

        /* ═══════════════════════════════════════════
           HERO FOOTER
        ═══════════════════════════════════════════ */
        .cp-hr-footer {
          position: relative; width: 100%;
          display: flex; flex-direction: column;
          align-items: center; gap: 14px;
          z-index: 15;
        }

        /* director tag */
        .cp-hr-director { text-align: center; }

        .cp-hr-credit {
          font-family: 'Courier New', monospace;
          font-size: 0.38rem; letter-spacing: 7px;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
          margin: 0 0 6px;
        }

        .cp-hr-director-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.1rem, 3vw, 2rem);
          font-weight: 700; font-style: italic;
          color: rgba(255,255,255,0.65);
          letter-spacing: 4px; margin: 0;
          line-height: 1;
        }

        /* scroll indicator */
        .cp-hr-scroll {
          display: flex; flex-direction: column;
          align-items: center; gap: 0;
        }

        .cp-hr-explore {
          font-family: 'Courier New', monospace;
          font-size: 0.38rem; letter-spacing: 5px;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          margin: 0 0 10px;
        }

        /* mouse */
        .cp-hr-mouse {
          width: 18px; height: 28px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 9px;
          display: flex; justify-content: center;
        }
        .cp-hr-wheel {
          width: 2px; height: 5px;
          background: #32c5f4; border-radius: 2px;
          margin-top: 5px;
        }

        /* scroll line */
        .cp-hr-scroll-line {
          width: 1px; height: 30px;
          background: linear-gradient(to bottom, #32c5f4, transparent);
          margin-top: 8px;
          animation: cpScrollLine 2s ease-in-out infinite;
        }
        @keyframes cpScrollLine {
          0%,100% { opacity: 0.35; }
          50%      { opacity: 1; }
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .cp-hr-hline, .cp-hr-nodes { width: 90%; }
        }
        @media (max-width: 768px) {
          .cp-hr-hline,
          .cp-hr-stem,
          .cp-hr-spine { display: none; }
          .cp-hr-tree   { padding-top: 30px; }
          .cp-hr-nodes  {
            flex-direction: column;
            width: 100%; align-items: center;
            gap: 14px; margin-top: 32px;
          }
          .cp-hr-box { width: 250px; text-align: center; }
          .cp-hr-footer { gap: 10px; }
          .cp-hr-scroll-line { height: 20px; }
        }
        @media (max-width: 480px) {
          .cp-hr-name { font-size: 36px; }
          .cp-hr-inc  { font-size: 18px; }
          .cp-hr-box  { width: 215px; padding: 11px 16px; }
          .cp-hr-link { font-size: 0.55rem; }
          .cp-hr-scroll-line { display: none; }
        }
        @media (max-height: 650px) {
          .cp-hr-footer { gap: 6px; }
          .cp-hr-scroll { transform: scale(0.85); }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .cp-hr-container { height: auto; padding: 55px 0; }
          .cp-hr-footer    { margin-top: 28px; }
        }
      `}</style>

      <div className="cp-hr-container">
        <div className="cp-hr-vignette" />
        <div className="cp-hr-glow" />

        {/* ── TREE ──────────────────────────────── */}
        <div className="cp-hr-tree">

          {/* trunk */}
          <motion.div
            className="cp-hr-trunk"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="cp-hr-brand">
              <h1 className="cp-hr-name">CINEMAPAYYAN</h1>
              <motion.span
                className="cp-hr-inc"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                INC
              </motion.span>
            </div>

            <motion.div
              className="cp-hr-spine"
              initial={{ height: 0 }}
              animate={{ height: 80 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>

          {/* branches */}
          <div className="cp-hr-branches">
            <div className="cp-hr-hline" />

            <div className="cp-hr-nodes">
              {branches.map((branch, i) => (
                <motion.div
                  key={i}
                  className={`cp-hr-node ${branch.className}`}
                  whileHover="hover"
                >
                  <motion.div
                    className="cp-hr-stem"
                    initial={{ height: 0 }}
                    animate={{ height: 40 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="cp-hr-box"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + i * 0.2 }}
                  >
                    {branch.isScroll ? (
                      <div
                        className="cp-hr-link"
                        onClick={() => {
                          if (branch.title === 'PROMOTIONS')  onScrollRequest?.('workRef');
                          if (branch.title === 'PRODUCTIONS') onScrollRequest?.('promotionsRef');
                        }}
                      >
                        {branch.title}
                      </div>
                    ) : (
                      <Link to={branch.path} className="cp-hr-link">
                        {branch.title}
                      </Link>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER ────────────────────────────── */}
        <div className="cp-hr-footer">
          <motion.div
            className="cp-hr-director"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            <p className="cp-hr-credit">CINEMA ENTREPRENEUR</p>
            <h2 className="cp-hr-director-name">ABISHEK RAAJA</h2>
          </motion.div>

          <motion.div
            className="cp-hr-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
          >
            <p className="cp-hr-explore">EXPLORE</p>
            <div className="cp-hr-mouse">
              <motion.div
                className="cp-hr-wheel"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <div className="cp-hr-scroll-line" />
          </motion.div>
        </div>

      </div>
    </>
  );
};

export default Hero;
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Mic2, ExternalLink } from "lucide-react";
import { Images } from "./assets/assets";

const RjArchives = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, amount: 0.4 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');

        .rja-section {
          background: #0a0f1a;
          background: radial-gradient(circle at center, #0f1628 0%, #0a0f1a 100%);
          padding: 90px 0 100px;
          overflow: hidden;
          position: relative;
        }
        .rja-section::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(50,197,244,0.08) 50%, transparent);
        }

        .rja-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px,6%,60px);
        }

        /* ── HEADER ── */
        .rja-header {
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 48px;
        }
        .rja-header-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.4));
          transform-origin: left;
        }
        .rja-header-rule--r {
          background: linear-gradient(90deg, rgba(50,197,244,0.35), transparent);
          transform-origin: right;
        }
        .rja-header-content { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
        .rja-header-icon {
          width: 38px; height: 38px;
          border: 1px solid rgba(50,197,244,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #32c5f4; flex-shrink: 0;
        }
        .rja-overline {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.5vw, 0.6rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(255,255,255,0.45); text-transform: uppercase; margin-bottom: 6px;
        }
        .rja-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 3.2rem);
          font-weight: 400; color: #fff; line-height: 1; margin: 0; letter-spacing: 3px;
        }
        .rja-heading-cyan { color: #32c5f4; }

        /* ── STAGE ── */
        .rja-stage {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px; align-items: center;
        }

        .rja-card {
          position: relative; overflow: hidden;
          display: block; text-decoration: none;
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.35s;
        }
        .rja-card:hover { border-color: rgba(50,197,244,0.25); }
        .rja-img {
          width: 100%; aspect-ratio: 16/9;
          object-fit: cover; display: block;
          filter: grayscale(0.3);
          transition: transform 0.6s, filter 0.5s;
        }
        .rja-card:hover .rja-img { transform: scale(1.05); filter: grayscale(0); }

        .rja-strip {
          position: absolute; bottom: 0; left: 0; right: 0;
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          background: rgba(8,13,21,0.92);
          border-top: 1px solid rgba(50,197,244,0.08);
          z-index: 4;
        }
        .rja-strip-left { display: flex; align-items: center; gap: 7px; flex-shrink: 0; }
        .rja-on-air {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 400; letter-spacing: 3px;
          color: rgba(255,255,255,0.55); text-transform: uppercase;
        }
        .rja-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ff3333;
          box-shadow: 0 0 8px rgba(255,51,51,0.8); flex-shrink: 0;
          animation: rjaDot 1s step-end infinite;
        }
        @keyframes rjaDot { 0%,100%{opacity:1} 50%{opacity:0} }
        .rja-strip-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.75rem, 2vw, 1rem);
          letter-spacing: 4px;
          color: rgba(255,255,255,0.85); text-transform: uppercase; flex: 1;
        }
        .rja-strip-icon { color: rgba(255,255,255,0.3); flex-shrink: 0; }

        .rja-hover {
          position: absolute; inset: 0; z-index: 5;
          background: rgba(0,0,0,0.78);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 12px;
          opacity: 0; transition: opacity 0.35s;
        }
        .rja-card:hover .rja-hover { opacity: 1; }
        .rja-play-btn {
          width: 52px; height: 52px; border-radius: 50%;
          background: #fde047;
          display: flex; align-items: center; justify-content: center;
        }
        .rja-hover-cta {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.85rem, 2vw, 1rem);
          letter-spacing: 5px; color: #fff; text-transform: uppercase;
        }
        .rja-hover-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 300; letter-spacing: 3px;
          color: rgba(255,255,255,0.45); text-transform: uppercase;
        }

        .rja-wave {
          display: flex; align-items: center; gap: 3px;
          position: absolute; bottom: 52px; left: 16px; z-index: 3;
          pointer-events: none;
        }
        .rja-wave-bar {
          width: 3px; border-radius: 2px;
          background: rgba(50,197,244,0.5);
          animation: rjaWave 1.1s ease-in-out infinite;
        }
        @keyframes rjaWave { 0%,100%{height:4px} 50%{height:20px} }

        /* ── META PANEL ── */
        .rja-meta {
          display: flex; flex-direction: column;
          border: 1px solid rgba(50,197,244,0.08);
          background: #0d1220;
          align-self: stretch;
        }
        .rja-meta-item {
          flex: 1; display: flex; flex-direction: column;
          align-items: flex-start; gap: 6px;
          padding: 22px 24px;
          border-bottom: 1px solid rgba(50,197,244,0.07);
        }
        .rja-meta-item:last-child { border-bottom: none; }
        .rja-meta-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 400; color: #32c5f4; line-height: 1; letter-spacing: 2px;
        }
        .rja-meta-plus { font-size: 0.6em; vertical-align: super; color: #fde047; }
        .rja-meta-lbl {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(255,255,255,0.45); text-transform: uppercase;
        }

        /* ════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════ */
        @media (max-width: 900px) {
          .rja-stage { grid-template-columns: 1fr; gap: 32px; }
          .rja-meta  { flex-direction: row; }
          .rja-meta-item { border-bottom: none; border-right: 1px solid rgba(50,197,244,0.07); }
          .rja-meta-item:last-child { border-right: none; }
        }
        @media (max-width: 640px) {
          .rja-section { padding: 60px 0 70px; }
          .rja-header  { justify-content: center; }
          .rja-header-rule { display: none; }
          .rja-meta    { flex-direction: column; }
          .rja-meta-item { border-right: none; border-bottom: 1px solid rgba(50,197,244,0.07); }
          .rja-meta-item:last-child { border-bottom: none; }
        }
      `}</style>

      <section className="rja-section">
        <div className="rja-inner">

          {/* ── HEADER ── */}
          <div className="rja-header" ref={headerRef}>
            <motion.div className="rja-header-rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.76,0,0.24,1] }}
            />
            <motion.div className="rja-header-content"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 18 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="rja-header-icon"><Mic2 size={18} /></div>
              <div>
                <span className="rja-overline">BROADCAST ARCHIVES</span>
                <h2 className="rja-heading">RJ <span className="rja-heading-cyan">ARCHIVES</span></h2>
              </div>
            </motion.div>
            <motion.div className="rja-header-rule rja-header-rule--r"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.76,0,0.24,1] }}
            />
          </div>

          {/* ── STAGE ── */}
          <motion.div className="rja-stage"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            <a href="https://soundcloud.com/rj-abishek" target="_blank" rel="noreferrer" className="rja-card">
              <img src={Images.AbishakeAudio} alt="RJ Archive" className="rja-img" />
              <div className="rja-strip">
                <div className="rja-strip-left">
                  <span className="rja-on-air">ON AIR</span>
                  <div className="rja-dot" />
                </div>
                <span className="rja-strip-title">RJ ABISHEK · ARCHIVES</span>
                <ExternalLink size={13} className="rja-strip-icon" />
              </div>
              <div className="rja-hover">
                <div className="rja-play-btn"><Play fill="black" size={20} /></div>
                <span className="rja-hover-cta">LISTEN TO ALL EPISODES</span>
                <span className="rja-hover-sub">SOUNDCLOUD ARCHIVES</span>
              </div>
              <div className="rja-wave">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="rja-wave-bar"
                    style={{ animationDelay: `${i * 0.07}s`, height: `${4 + Math.random() * 16}px` }}
                  />
                ))}
              </div>
            </a>

            <div className="rja-meta">
              <div className="rja-meta-item">
                <span className="rja-meta-num">100<span className="rja-meta-plus">+</span></span>
                <span className="rja-meta-lbl">EPISODES</span>
              </div>
              <div className="rja-meta-item">
                <span className="rja-meta-num">FM</span>
                <span className="rja-meta-lbl">BROADCAST</span>
              </div>
              <div className="rja-meta-item">
                <span className="rja-meta-num">∞</span>
                <span className="rja-meta-lbl">ON DEMAND</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default RjArchives;
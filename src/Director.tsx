import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clapperboard, Instagram } from "lucide-react";
import { Images } from "./assets/assets";

const crew = [
  "@abhinavsnayak", "@thenieswar_dop", "@naan__pradeep",
  "@navaa_rajkumar", "@valentino_suren", "@kvdurai",
  "@tuneyjohn", "@donechannel1", "@decoffl",
];

const Director = () => {
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(headerRef, { once: true, amount: 0.5 });
  const cardInView = useInView(cardRef,   { once: true, amount: 0.15 });
  const [imgHover, setImgHover] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');

        /* ══════════════════════════════════════════
           SECTION
        ══════════════════════════════════════════ */
        .dir-section {
          background: #000;
          padding: 90px 0 110px;
          overflow: hidden;
          position: relative;
        }
        .dir-section::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
        }
        .dir-section::after {
          content: '監';
          position: absolute; right: 2%; bottom: -60px;
          font-size: 28rem; font-family: serif; line-height: 1;
          color: rgba(255,255,255,0.012);
          pointer-events: none; user-select: none; z-index: 0;
        }

        .dir-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px,6%,60px);
          position: relative; z-index: 2;
        }

        /* ══════════════════════════════════════════
           HEADER
        ══════════════════════════════════════════ */
        .dir-header {
          display: flex; align-items: center; gap: 20px;
          padding: 0 clamp(20px,6%,60px);
          margin-bottom: 52px;
          max-width: 1200px; margin-left: auto; margin-right: auto;
        }
        .dir-header-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.35));
          transform-origin: left;
        }
        .dir-header-rule--r {
          background: linear-gradient(90deg, rgba(50,197,244,0.3), transparent);
          transform-origin: right;
        }
        .dir-header-content {
          display: flex; align-items: center; gap: 14px; flex-shrink: 0;
        }
        .dir-header-icon {
          width: 36px; height: 36px;
          border: 1px solid rgba(253,224,71,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #fde047; flex-shrink: 0;
        }

        /* Inter — overline */
        .dir-overline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.5vw, 0.6rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          display: block; margin-bottom: 5px;
        }

        /* Bebas Neue — section heading */
        .dir-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 3.2rem);
          font-weight: 400; letter-spacing: 3px;
          color: #fff; line-height: 1; margin: 0;
        }
        .dir-heading-yellow { color: #fde047; }

        /* ══════════════════════════════════════════
           FEATURE CARD
        ══════════════════════════════════════════ */
        .dir-card {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(6,6,6,0.9);
          padding: clamp(24px,4vw,48px);
          position: relative;
          overflow: hidden;
        }
        .dir-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 20px; height: 20px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          pointer-events: none; z-index: 5;
        }
        .dir-card::after {
          content: '';
          position: absolute; bottom: 0; right: 0;
          width: 20px; height: 20px;
          border-bottom: 1px solid rgba(50,197,244,0.3);
          border-right: 1px solid rgba(50,197,244,0.3);
          pointer-events: none; z-index: 5;
        }

        /* ── IMAGE SIDE ── */
        .dir-img-side {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .dir-corner { position: absolute; width: 20px; height: 20px; pointer-events: none; z-index: 5; }
        .dir-corner--tl { top:-8px; left:-8px; border-top:1px solid rgba(253,224,71,0.5); border-left:1px solid rgba(253,224,71,0.5); }
        .dir-corner--tr { top:-8px; right:-8px; border-top:1px solid rgba(253,224,71,0.5); border-right:1px solid rgba(253,224,71,0.5); }
        .dir-corner--bl { bottom:-8px; left:-8px; border-bottom:1px solid rgba(50,197,244,0.4); border-left:1px solid rgba(50,197,244,0.4); }
        .dir-corner--br { bottom:-8px; right:-8px; border-bottom:1px solid rgba(50,197,244,0.4); border-right:1px solid rgba(50,197,244,0.4); }

        .dir-img {
          width: 100%; height: auto; display: block;
          max-height: 520px; object-fit: cover;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.85));
          transition: transform 0.8s ease;
        }
        .dir-img-vignette {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.55) 100%);
          pointer-events: none; z-index: 2;
        }

        /* film strip */
        .dir-filmstrip {
          position: absolute; top: 0; left: 0; bottom: 0;
          width: 18px; z-index: 4;
          background: rgba(0,0,0,0.7);
          display: flex; flex-direction: column;
          align-items: center; justify-content: space-around;
          padding: 8px 0;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .dir-filmstrip-hole {
          width: 8px; height: 8px; border-radius: 1px;
          background: rgba(253,224,71,0.25); flex-shrink: 0;
        }

        /* Inter — format badge */
        .dir-format-badge {
          position: absolute; bottom: 10px; left: 26px; z-index: 6;
          display: flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 400; letter-spacing: 3px;
          color: rgba(255,255,255,0.7);
          background: rgba(0,0,0,0.78); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 5px 12px; text-transform: uppercase;
        }
        .dir-format-sep { color: #fde047; }

        /* scan line */
        .dir-img-scan {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 7;
          height: 2px;
          background: linear-gradient(90deg, #fde047, #32c5f4);
          transform-origin: left;
        }

        /* ── CONTENT SIDE ── */
        .dir-content { display: flex; flex-direction: column; gap: 20px; }

        /* Inter — pre-label */
        .dir-pre { display: flex; align-items: center; gap: 12px; }
        .dir-pre-line { width: 28px; height: 1px; background: #fde047; opacity: 0.5; transform-origin: left; }
        .dir-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.2vw, 0.6rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(253,224,71,0.7); text-transform: uppercase;
        }

        /* Bebas Neue — animated title chars */
        .dir-title-block {
          display: flex; align-items: baseline;
          flex-wrap: nowrap; line-height: 0.88; gap: 0;
          white-space: nowrap; overflow: visible;
        }
        .dir-title-char {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 7vw, 7rem);
          font-weight: 400; letter-spacing: 4px;
          color: #fff; line-height: 0.9;
          display: inline-block;
        }
        .dir-title-char--yellow { color: #fde047; }
        .dir-title-space { display: inline-block; width: 0.25em; }

        /* Inter — genre tag */
        .dir-genre {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.2vw, 0.6rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(50,197,244,0.8);
          text-transform: uppercase; margin: 0;
        }

        .dir-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.3), rgba(50,197,244,0.2), transparent);
          transform-origin: left;
        }

        /* Inter — description */
        .dir-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.82rem, 1.2vw, 0.95rem);
          font-weight: 300;
          color: rgba(255,255,255,0.58);
          line-height: 1.85; margin: 0;
        }
        .dir-mention { color: #32c5f4; font-weight: 700; text-shadow: 0 0 12px rgba(50,197,244,0.2); }

        /* crew */
        .dir-crew { display: flex; flex-direction: column; gap: 10px; }
        .dir-crew-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 400; letter-spacing: 5px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase; display: block;
        }
        .dir-crew-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .dir-crew-tag {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 300; letter-spacing: 2px;
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 5px 10px; text-transform: lowercase;
          transition: border-color 0.3s, color 0.3s; cursor: default;
        }
        .dir-crew-tag:hover { border-color: rgba(253,224,71,0.35); color: rgba(253,224,71,0.85); }

        /* Inter — CTA button */
        .dir-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          border: 1px solid #fde047;
          color: #fde047; text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
          transition: color 0.4s;
        }
        .dir-cta-bg {
          position: absolute; inset: 0; background: #fde047;
          transform-origin: left; transform: scaleX(0); z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .dir-cta:hover .dir-cta-bg { transform: scaleX(1); }
        .dir-cta:hover { color: #000; }
        .dir-cta-label, .dir-cta-icon { position: relative; z-index: 1; }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 960px) {
          .dir-card { grid-template-columns: 1fr; gap: 48px; text-align: center; }
          .dir-pre  { justify-content: center; }
          .dir-title-block { justify-content: center; }
          .dir-crew-tags { justify-content: center; }
          .dir-cta  { margin: 0 auto; }
          .dir-img  { max-width: 380px; margin: 0 auto; }
        }
        @media (max-width: 700px) {
          .dir-header {
            flex-direction: column; align-items: stretch;
            gap: 12px; padding: 0 clamp(16px,5%,40px);
            margin-bottom: 40px;
          }
          .dir-header-rule { display: none; }
          .dir-header-content {
            flex-direction: row; align-items: center;
            justify-content: flex-start; gap: 14px; width: 100%;
          }
        }
        @media (max-width: 640px) {
          .dir-section  { padding: 70px 0 80px; }
          .dir-inner    { padding: 0 16px; }
          .dir-card     { padding: 20px 16px 32px; gap: 32px; }
          .dir-filmstrip { display: none; }
          .dir-title-char { font-size: clamp(2.2rem, 11vw, 3.2rem); }
          .dir-crew-tag   { font-size: 0.5rem; padding: 4px 8px; }
          .dir-format-badge { font-size: 0.5rem; left: 10px; }
        }
        @media (max-width: 400px) {
          .dir-title-char { font-size: 2rem; }
          .dir-crew-tag   { font-size: 0.46rem; }
        }
      `}</style>

      <section className="dir-section">

        {/* ── HEADER ── */}
        <div className="dir-header" ref={headerRef}>
          <motion.div className="dir-header-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.76,0,0.24,1] }}
          />
          <motion.div
            className="dir-header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="dir-header-icon"><Clapperboard size={18} /></div>
            <div>
              <span className="dir-overline">DIRECTORIAL DEBUT</span>
              <h2 className="dir-heading">
                THE <span className="dir-heading-yellow">DIRECTOR</span>
              </h2>
            </div>
          </motion.div>
          <motion.div className="dir-header-rule dir-header-rule--r"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.76,0,0.24,1] }}
          />
        </div>

        {/* ── FEATURE CARD ── */}
        <div className="dir-inner">
          <motion.div
            className="dir-card"
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 50 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >

            {/* IMAGE SIDE */}
            <div
              className="dir-img-side"
              onMouseEnter={() => setImgHover(true)}
              onMouseLeave={() => setImgHover(false)}
            >
              <motion.img
                src={Images.JaamJaam || Images.openpanna}
                alt="Jaam Jaam"
                className="dir-img"
                animate={{ scale: imgHover ? 1.05 : 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="dir-img-vignette" />

              {(['tl','tr','bl','br'] as const).map(pos => (
                <div key={pos} className={`dir-corner dir-corner--${pos}`} />
              ))}

              <div className="dir-filmstrip">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="dir-filmstrip-hole" />
                ))}
              </div>

              <div className="dir-format-badge">
                <span>ROM</span>
                <span className="dir-format-sep">·</span>
                <span>காமம்</span>
              </div>

              <motion.div
                className="dir-img-scan"
                animate={{ scaleX: imgHover ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* CONTENT SIDE */}
            <div className="dir-content">

              <div className="dir-pre">
                <motion.div
                  className="dir-pre-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: cardInView ? 1 : 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
                <span className="dir-pre-text">DIRECTORIAL DEBUT</span>
              </div>

              <div className="dir-title-block">
                {'JAAM'.split('').map((char, i) => (
                  <motion.span key={`a${i}`} className="dir-title-char"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 30 }}
                    transition={{ delay: 0.6 + i * 0.06, duration: 0.5, ease: [0.16,1,0.3,1] }}
                  >{char}</motion.span>
                ))}
                <motion.span className="dir-title-space"
                  initial={{ opacity: 0 }} animate={{ opacity: cardInView ? 1 : 0 }}
                  transition={{ delay: 0.85 }}
                > </motion.span>
                {'JAAM'.split('').map((char, i) => (
                  <motion.span key={`b${i}`} className="dir-title-char dir-title-char--yellow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 30 }}
                    transition={{ delay: 0.9 + i * 0.06, duration: 0.5, ease: [0.16,1,0.3,1] }}
                  >{char}</motion.span>
                ))}
              </div>

              <motion.p className="dir-genre"
                initial={{ opacity: 0 }} animate={{ opacity: cardInView ? 1 : 0 }}
                transition={{ delay: 1.15, duration: 0.5 }}
              >A rom · காமம் Flick</motion.p>

              <motion.div className="dir-rule"
                initial={{ scaleX: 0 }} animate={{ scaleX: cardInView ? 1 : 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
              />

              <motion.p className="dir-desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 10 }}
                transition={{ delay: 1.25, duration: 0.6 }}
              >
                My directorial debut with the esteemed{" "}
                <span className="dir-mention">@axess_filmfactory</span>.
                Working alongside a stellar team to bring this vision to life.
                Grateful for the support of{" "}
                <span className="dir-mention">@dillibabugovindaraj</span> and the entire crew.
              </motion.p>

              <motion.div className="dir-crew"
                initial={{ opacity: 0 }} animate={{ opacity: cardInView ? 1 : 0 }}
                transition={{ delay: 1.35, duration: 0.6 }}
              >
                <span className="dir-crew-label">CREW</span>
                <div className="dir-crew-tags">
                  {crew.map((handle, i) => (
                    <motion.span key={handle} className="dir-crew-tag"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: cardInView ? 1 : 0, scale: cardInView ? 1 : 0.85 }}
                      transition={{ delay: 1.4 + i * 0.04, duration: 0.35 }}
                    >{handle}</motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 12 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <a
                  href="https://www.instagram.com/p/C3XNjxgIdgo/?utm_source=ig_web_copy_link"
                  target="_blank" rel="noopener noreferrer"
                  className="dir-cta"
                >
                  <div className="dir-cta-bg" />
                  <span className="dir-cta-label">VIEW PROJECT</span>
                  <Instagram size={15} className="dir-cta-icon" />
                </a>
              </motion.div>

            </div>
          </motion.div>
        </div>

      </section>
    </>
  );
};

export default Director;
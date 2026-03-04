import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clapperboard, Instagram } from "lucide-react";
import { Images } from "./assets/assets";
import "./App.css";

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
    <section className="dir-section">

      {/* ── SECTION HEADER ───────────────────── */}
      <div className="cinema-section-header" ref={headerRef}>
        <motion.div
          className="cinema-header-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="cinema-header-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="cinema-header-icon">
            <Clapperboard size={18} />
          </div>
          <div className="cinema-header-text">
            <span className="cinema-overline">DIRECTORIAL DEBUT</span>
            <h2 className="cinema-heading">
              THE <span className="text-yellow">DIRECTOR</span>
            </h2>
          </div>
        </motion.div>
        <motion.div
          className="cinema-header-rule cinema-header-rule--right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>

      {/* ── FEATURE CARD ─────────────────────── */}
      <div className="dir-inner">
        <motion.div
          className="dir-card"
          ref={cardRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 50 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* ── IMAGE SIDE ── */}
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

            {/* Vignette */}
            <div className="dir-img-vignette" />

            {/* Corner marks */}
            {['tl','tr','bl','br'].map(pos => (
              <div key={pos} className={`dir-corner dir-corner--${pos}`} />
            ))}

            {/* Film strip left edge */}
            <div className="dir-filmstrip">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="dir-filmstrip-hole" />
              ))}
            </div>

            {/* Format badge */}
            <div className="dir-format-badge">
              <span>ROM</span>
              <span className="dir-format-sep">·</span>
              <span>காமம்</span>
            </div>

            {/* Instagram overlay icon */}
            <motion.a
              href="https://www.instagram.com/p/C3XNjxgIdgo/"
              target="_blank"
              rel="noopener noreferrer"
              className="dir-insta-btn"
              animate={{ opacity: imgHover ? 1 : 0, y: imgHover ? 0 : 6 }}
              transition={{ duration: 0.25 }}
            >
              <Instagram size={16} />
            </motion.a>

            {/* Hover scan line */}
            <motion.div
              className="dir-img-scan"
              animate={{ scaleX: imgHover ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* ── CONTENT SIDE ── */}
          <div className="dir-content">

            {/* Pre-title */}
            <div className="dir-pre">
              <motion.div
                className="dir-pre-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: cardInView ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
              <span className="dir-pre-text">DIRECTORIAL DEBUT</span>
            </div>

            {/* Movie title */}
            <div className="dir-title-block">
              {'JAAM'.split('').map((char, i) => (
                <motion.span
                  key={`a${i}`}
                  className="dir-title-char"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 30 }}
                  transition={{ delay: 0.6 + i * 0.06, duration: 0.5, ease: [0.16,1,0.3,1] }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="dir-title-space"
                initial={{ opacity: 0 }}
                animate={{ opacity: cardInView ? 1 : 0 }}
                transition={{ delay: 0.85 }}
              > </motion.span>
              {'JAAM'.split('').map((char, i) => (
                <motion.span
                  key={`b${i}`}
                  className="dir-title-char dir-title-char--yellow"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 30 }}
                  transition={{ delay: 0.9 + i * 0.06, duration: 0.5, ease: [0.16,1,0.3,1] }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Genre line */}
            <motion.p
              className="dir-genre"
              initial={{ opacity: 0 }}
              animate={{ opacity: cardInView ? 1 : 0 }}
              transition={{ delay: 1.15, duration: 0.5 }}
            >
              A rom · காமம் Flick
            </motion.p>

            {/* Divider */}
            <motion.div
              className="dir-rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: cardInView ? 1 : 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            />

            {/* Description */}
            <motion.p
              className="dir-desc"
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

            {/* Crew grid */}
            <motion.div
              className="dir-crew"
              initial={{ opacity: 0 }}
              animate={{ opacity: cardInView ? 1 : 0 }}
              transition={{ delay: 1.35, duration: 0.6 }}
            >
              <span className="dir-crew-label">CREW</span>
              <div className="dir-crew-tags">
                {crew.map((handle, i) => (
                  <motion.span
                    key={handle}
                    className="dir-crew-tag"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: cardInView ? 1 : 0, scale: cardInView ? 1 : 0.85 }}
                    transition={{ delay: 1.4 + i * 0.04, duration: 0.35 }}
                  >
                    {handle}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: cardInView ? 1 : 0, y: cardInView ? 0 : 12 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <motion.a
                href="https://www.instagram.com/p/C3XNjxgIdgo/?utm_source=ig_web_copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="dir-cta"
                whileHover="hover"
              >
                <motion.span
                  className="dir-cta-bg"
                  variants={{ hover: { scaleX: 1 } }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="dir-cta-label">VIEW PROJECT</span>
                <Instagram size={15} className="dir-cta-icon" />
              </motion.a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Director;
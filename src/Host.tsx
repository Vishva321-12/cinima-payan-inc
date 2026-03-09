import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mic2, ExternalLink } from "lucide-react";
import { Images, VideoAssets } from "./assets/assets";

const projects = [
  {
    id: 1,
    index: "01",
    title: "International Standards",
    subtitle: "Chiyaan Vikram",
    tag: "TRIBUTE",
    link: "https://youtu.be/OpIYkWJ_rws?si=T0gC2JCt6jA4vter",
    video: VideoAssets.vjPreviews[13],
    host: "@abishek_raaja",
    feature: "Tribute to Excellence",
    body: "@the_real_chiyaan operates on an unprecedented level of craft, often drawing comparisons to global icons like Christian Bale. His dedication to character transformation is significantly underrated, and he deserves the highest pedestal for his consistent efforts in elevating Tamil cinema to international standards.",
  },
  {
    id: 2,
    index: "02",
    title: "Concert Curation",
    subtitle: "Neeye Oli",
    tag: "CONCERT",
    link: "https://www.instagram.com/reel/C01jVyrCb9F/?utm_source=ig_web_copy_link",
    video: VideoAssets.vjPreviews[14],
    host: "@abishek_raaja",
    feature: "Nehru Outdoor Stadium",
    body: "A significant milestone in my hosting career was the opportunity to name and present this grand concert. It was a privilege to contribute to the creative vision of @musicsanthosh, brought to life through a seamless collaboration with @directedbykenroyson and their dedicated production team.",
  },
];

/* ─── Host Card ─────────────────────────────── */
function HostCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) { v.muted = true; v.play().catch(() => {}); }
    else { v.pause(); }
  }, [hovered]);

  return (
    <motion.div
      className="hst-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── VIDEO SIDE ── */}
      <div className="hst-media">
        <video ref={videoRef} src={project.video} className="hst-video" muted loop playsInline />
        <div className="hst-media-gradient" />
        <div className="hst-c hst-c--tl" /><div className="hst-c hst-c--tr" />
        <div className="hst-c hst-c--bl" /><div className="hst-c hst-c--br" />
        <div className="hst-tag">{project.tag}</div>
        <div className="hst-index">{project.index}</div>
        <motion.a
          href={project.link} target="_blank" rel="noreferrer"
          className="hst-play"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.75 }}
          transition={{ duration: 0.25 }}
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink size={18} />
        </motion.a>
        <motion.div
          className="hst-scan"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── TEXT SIDE ── */}
      <div className="hst-body">
        <div className="hst-titles">
          <span className="hst-subtitle">{project.subtitle}</span>
          <h4 className="hst-title">{project.title}</h4>
          <motion.div
            className="hst-title-rule"
            animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="hst-desc">{project.body}</p>
        <div className="hst-credits">
          <div className="hst-credit-item">
            <span className="hst-credit-label">HOSTED BY</span>
            <span className="hst-credit-value">{project.host}</span>
          </div>
          <div className="hst-credit-div" />
          <div className="hst-credit-item">
            <span className="hst-credit-label">FEATURE</span>
            <span className="hst-credit-value">{project.feature}</span>
          </div>
        </div>
        <a href={project.link} target="_blank" rel="noreferrer" className="hst-cta">
          <div className="hst-cta-bg" />
          <span>WATCH NOW</span>
          <ExternalLink size={12} style={{ position: 'relative', zIndex: 1 }} />
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main ──────────────────────────────────── */
const Host = () => {
  const headerRef  = useRef<HTMLDivElement>(null);
  const inView     = useInView(headerRef, { once: true, amount: 0.5 });
  const [bannerHover, setBannerHover] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');

        /* ══════════════════════════════════════════
           SECTION
        ══════════════════════════════════════════ */
        .hst-section {
          background: #000;
          padding: 90px 0 110px;
          overflow: hidden;
          position: relative;
        }
        .hst-section::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
        }
        .hst-section::after {
          content: '舞';
          position: absolute; right: 2%; bottom: -60px;
          font-size: 28rem; font-family: serif; line-height: 1;
          color: rgba(255,255,255,0.012);
          pointer-events: none; user-select: none; z-index: 0;
        }

        .hst-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px,6%,60px);
          position: relative; z-index: 2;
        }

        /* ══════════════════════════════════════════
           HEADER
        ══════════════════════════════════════════ */
        .hst-header {
          display: flex; align-items: center; gap: 20px;
          padding: 0 clamp(20px,6%,60px);
          margin-bottom: 52px;
          max-width: 1200px; margin-left: auto; margin-right: auto;
        }
        .hst-header-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.35));
          transform-origin: left;
        }
        .hst-header-rule--r {
          background: linear-gradient(90deg, rgba(50,197,244,0.3), transparent);
          transform-origin: right;
        }
        .hst-header-content {
          display: flex; align-items: center; gap: 14px; flex-shrink: 0;
        }
        .hst-header-icon {
          width: 36px; height: 36px;
          border: 1px solid rgba(253,224,71,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #fde047; flex-shrink: 0;
        }

        /* Inter — overline */
        .hst-overline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.5vw, 0.6rem);
          font-weight: 400;
          letter-spacing: 6px;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          display: block; margin-bottom: 5px;
        }

        /* Bebas Neue — section heading */
        .hst-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 3.2rem);
          font-weight: 400; letter-spacing: 3px;
          color: #fff; line-height: 1; margin: 0;
        }
        .hst-heading-yellow { color: #fde047; }

        /* Bebas Neue — count number */
        .hst-count {
          display: flex; flex-direction: column;
          align-items: center; margin-left: 14px; flex-shrink: 0;
        }
        .hst-count-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 400; color: rgba(253,224,71,0.28);
          line-height: 1; letter-spacing: 2px;
        }
        /* Inter — count label */
        .hst-count-lbl {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 400;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.45); text-transform: uppercase;
        }

        /* ══════════════════════════════════════════
           HERO BANNER
        ══════════════════════════════════════════ */
        .hst-hero {
          position: relative; overflow: hidden;
          width: 100%; margin-bottom: 48px;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: border-color 0.4s;
        }
        .hst-hero:hover { border-color: rgba(253,224,71,0.2); }
        .hst-hero-img {
          width: 100%; aspect-ratio: 21/8;
          object-fit: cover; display: block;
          transition: transform 0.7s ease;
        }
        .hst-hero:hover .hst-hero-img { transform: scale(1.04); }
        .hst-hero-vig {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.75) 100%);
          pointer-events: none; z-index: 2;
        }
        .hst-hero-c {
          position: absolute; width: 16px; height: 16px; z-index: 4; pointer-events: none;
        }
        .hst-hero-tl { top:10px; left:10px; border-top:1px solid rgba(253,224,71,0.5); border-left:1px solid rgba(253,224,71,0.5); }
        .hst-hero-tr { top:10px; right:10px; border-top:1px solid rgba(253,224,71,0.5); border-right:1px solid rgba(253,224,71,0.5); }
        .hst-hero-bl { bottom:44px; left:10px; border-bottom:1px solid rgba(50,197,244,0.4); border-left:1px solid rgba(50,197,244,0.4); }
        .hst-hero-br { bottom:44px; right:10px; border-bottom:1px solid rgba(50,197,244,0.4); border-right:1px solid rgba(50,197,244,0.4); }

        .hst-hero-bar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 5;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 18px;
          background: rgba(0,0,0,0.82);
          border-top: 1px solid rgba(255,255,255,0.06);
          gap: 14px;
        }
        .hst-hero-bar-left { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .hst-hero-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #ff3333; flex-shrink: 0;
          box-shadow: 0 0 8px rgba(255,51,51,0.8);
        }
        /* Inter — FEATURED EVENT label */
        .hst-hero-live {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(255,255,255,0.75); text-transform: uppercase;
        }
        /* Bebas Neue — hero bar centre title */
        .hst-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1rem, 2.8vw, 1.8rem);
          font-weight: 400; letter-spacing: 4px;
          color: #fff; flex: 1; text-align: center;
        }
        /* Inter — right tag badge */
        .hst-hero-tag {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 700; letter-spacing: 3px;
          color: #000; background: #fde047;
          padding: 5px 12px; text-transform: uppercase; flex-shrink: 0;
        }
        .hst-hero-scan {
          position: absolute; bottom: 42px; left: 0; right: 0; z-index: 6;
          height: 2px;
          background: linear-gradient(90deg, #fde047, #32c5f4);
          transform-origin: left;
        }

        /* ══════════════════════════════════════════
           CARD GRID
        ══════════════════════════════════════════ */
        .hst-grid {
          display: flex; flex-direction: column; gap: 32px;
        }

        .hst-card {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(8,8,8,0.9);
          overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.4s;
          position: relative;
        }
        .hst-card:hover {
          border-color: rgba(253,224,71,0.2);
          box-shadow: 0 16px 50px rgba(0,0,0,0.65);
        }

        /* ── MEDIA SIDE ── */
        .hst-media {
          position: relative;
          width: 100%; aspect-ratio: 16/9;
          overflow: hidden; background: #0a0a0a;
        }
        .hst-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .hst-media-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%);
          z-index: 2; pointer-events: none;
        }
        .hst-c { position: absolute; width: 14px; height: 14px; pointer-events: none; z-index: 5; }
        .hst-c--tl { top:8px; left:8px; border-top:1px solid rgba(253,224,71,0.5); border-left:1px solid rgba(253,224,71,0.5); }
        .hst-c--tr { top:8px; right:8px; border-top:1px solid rgba(253,224,71,0.5); border-right:1px solid rgba(253,224,71,0.5); }
        .hst-c--bl { bottom:8px; left:8px; border-bottom:1px solid rgba(50,197,244,0.4); border-left:1px solid rgba(50,197,244,0.4); }
        .hst-c--br { bottom:8px; right:8px; border-bottom:1px solid rgba(50,197,244,0.4); border-right:1px solid rgba(50,197,244,0.4); }

        /* Inter — card tag badge */
        .hst-tag {
          position: absolute; top: 10px; left: 10px; z-index: 6;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 700; letter-spacing: 3px;
          color: #000; background: #fde047;
          padding: 3px 10px; text-transform: uppercase;
        }

        /* Bebas Neue — ghost index number */
        .hst-index {
          position: absolute; bottom: 10px; left: 14px; z-index: 4;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(253,224,71,0.12); line-height: 1;
          user-select: none; pointer-events: none;
        }

        .hst-play {
          position: absolute; bottom: 12px; right: 12px; z-index: 7;
          width: 38px; height: 38px; border-radius: 50%;
          background: #fde047;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; color: #000;
          transition: transform 0.2s;
        }
        .hst-play:hover { transform: scale(1.1); }

        .hst-scan {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 8;
          height: 2px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          transform-origin: left;
        }

        /* ── BODY SIDE ── */
        .hst-body {
          padding: clamp(20px,3vw,32px);
          display: flex; flex-direction: column; gap: 16px;
          border-left: 1px solid rgba(255,255,255,0.05);
        }

        .hst-titles { display: flex; flex-direction: column; gap: 6px; }

        /* Inter — subtitle label */
        .hst-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.2vw, 0.6rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(253,224,71,0.7);
          text-transform: uppercase; display: block;
        }

        /* Bebas Neue — card main title */
        .hst-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 400; letter-spacing: 3px;
          color: #fff; margin: 0; line-height: 1.05;
        }
        .hst-title-rule {
          height: 1px; width: 100%;
          background: linear-gradient(90deg, rgba(253,224,71,0.4), rgba(50,197,244,0.25), transparent);
          transform-origin: left;
        }

        /* Inter — description body text */
        .hst-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.82rem, 1.2vw, 0.95rem);
          font-weight: 300;
          color: rgba(255,255,255,0.58);
          line-height: 1.85; margin: 0;
          flex: 1;
        }

        /* credits strip */
        .hst-credits {
          display: flex; align-items: stretch;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          padding: 14px 18px; gap: 0;
        }
        .hst-credit-item {
          display: flex; flex-direction: column; gap: 4px; flex: 1;
        }
        .hst-credit-div {
          width: 1px; background: rgba(255,255,255,0.08); margin: 0 16px;
        }
        /* Inter — credit label */
        .hst-credit-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
        }
        /* Bebas Neue — credit value */
        .hst-credit-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 400; letter-spacing: 2px;
          color: #fff; line-height: 1.2;
        }

        /* Inter — CTA button */
        .hst-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 24px;
          border: 1px solid #fde047;
          color: #fde047; text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
          transition: color 0.4s;
          align-self: flex-start;
        }
        .hst-cta-bg {
          position: absolute; inset: 0;
          background: #fde047;
          transform-origin: left; transform: scaleX(0); z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .hst-cta:hover .hst-cta-bg { transform: scaleX(1); }
        .hst-cta:hover { color: #000; }
        .hst-cta span { position: relative; z-index: 1; }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 900px) {
          .hst-card { grid-template-columns: 1fr; }
          .hst-media { aspect-ratio: 16/9; }
          .hst-body  { border-left: none; border-top: 1px solid rgba(255,255,255,0.05); }
        }
        @media (max-width: 700px) {
          .hst-header {
            flex-direction: column; align-items: stretch;
            gap: 12px; padding: 0 clamp(16px,5%,40px);
            margin-bottom: 40px;
          }
          .hst-header-rule { display: none; }
          .hst-header-content {
            flex-direction: row; align-items: center;
            justify-content: space-between; gap: 0; width: 100%;
          }
          .hst-count { margin-left: auto; align-items: flex-end; }
          .hst-count-lbl { text-align: right; }
        }
        @media (max-width: 640px) {
          .hst-section   { padding: 70px 0 80px; }
          .hst-inner     { padding: 0 16px; }
          .hst-hero-img  { aspect-ratio: 16/7; }
          .hst-hero-tag  { display: none; }
          .hst-hero-bar  { padding: 10px 12px; }
          .hst-credits   { flex-wrap: wrap; gap: 12px; padding: 12px 14px; }
          .hst-credit-div { display: none; }
          .hst-credit-item { min-width: 120px; }
          .hst-body      { padding: 16px; gap: 12px; }
        }
        @media (max-width: 400px) {
          .hst-grid { gap: 20px; }
        }
      `}</style>

      <section className="hst-section">

        {/* ── HEADER ── */}
        <div className="hst-header" ref={headerRef}>
          <motion.div className="hst-header-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.76,0,0.24,1] }}
          />

          <motion.div
            className="hst-header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="hst-header-icon"><Mic2 size={18} /></div>
              <div>
                <span className="hst-overline">LIVE EVENTS · CONCERTS</span>
                <h2 className="hst-heading">
                  THE <span className="hst-heading-yellow">HOST</span>
                </h2>
              </div>
            </div>

            <div className="hst-count">
              <span className="hst-count-num">04</span>
              <span className="hst-count-lbl">EVENTS</span>
            </div>
          </motion.div>

          <motion.div className="hst-header-rule hst-header-rule--r"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.76,0,0.24,1] }}
          />
        </div>

        <div className="hst-inner">

          {/* ── HERO BANNER ── */}
          <motion.div className="hst-hero"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
            onMouseEnter={() => setBannerHover(true)}
            onMouseLeave={() => setBannerHover(false)}
          >
            <motion.img
              src={Images.NeeyaoliHost} alt="Neeye Oli 2024"
              className="hst-hero-img"
              animate={{ scale: bannerHover ? 1.04 : 1 }}
              transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            />
            <div className="hst-hero-vig" />
            <div className="hst-hero-c hst-hero-tl" />
            <div className="hst-hero-c hst-hero-tr" />
            <div className="hst-hero-c hst-hero-bl" />
            <div className="hst-hero-c hst-hero-br" />
            <div className="hst-hero-bar">
              <div className="hst-hero-bar-left">
                <motion.div
                  className="hst-hero-dot"
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="hst-hero-live">FEATURED EVENT</span>
              </div>
              <span className="hst-hero-title">NEEYE OLI 2024</span>
              <span className="hst-hero-tag">LIVE HOST</span>
            </div>
            <motion.div className="hst-hero-scan"
              animate={{ scaleX: bannerHover ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            />
          </motion.div>

          {/* ── PROJECT CARDS ── */}
          <div className="hst-grid">
            {projects.map((p, i) => (
              <HostCard key={p.id} project={p} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Host;
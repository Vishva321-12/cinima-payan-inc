import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mic2, ExternalLink } from "lucide-react";
import { Images, VideoAssets } from "./assets/assets";
import "./App.css";

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

/* ─── Project Card ──────────────────────────── */
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
      className="host-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Video half ── */}
      <div className="host-card-media">
        <video
          ref={videoRef}
          src={project.video}
          className="host-card-video"
          muted loop playsInline
        />

        {/* gradient overlay */}
        <div className="host-card-gradient" />

        {/* corner marks */}
        {['tl','tr','bl','br'].map(pos => (
          <div key={pos} className={`hc-corner hc-corner--${pos}`} />
        ))}

        {/* episode tag */}
        <div className="host-card-tag">{project.tag}</div>

        {/* index number watermark */}
        <div className="host-card-index">{project.index}</div>

        {/* external link — appears on hover */}
        <motion.a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="host-card-play"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.75 }}
          transition={{ duration: 0.25 }}
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink size={18} />
        </motion.a>

        {/* bottom scan line */}
        <motion.div
          className="host-card-scanline"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── Text half ── */}
      <div className="host-card-body">

        {/* title block */}
        <div className="host-card-titles">
          <span className="host-card-subtitle">{project.subtitle}</span>
          <h4 className="host-card-title">{project.title}</h4>
          <motion.div
            className="host-card-title-rule"
            animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* description */}
        <p className="host-card-desc">{project.body}</p>

        {/* credit strip */}
        <div className="host-card-credits">
          <div className="host-credit-item">
            <span className="host-credit-label">HOSTED BY</span>
            <span className="host-credit-value">{project.host}</span>
          </div>
          <div className="host-credit-divider" />
          <div className="host-credit-item">
            <span className="host-credit-label">FEATURE</span>
            <span className="host-credit-value">{project.feature}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────── */
const Host = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, amount: 0.5 });
  const [bannerHover, setBannerHover] = useState(false);

  return (
    <section className="host-section">

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
            <Mic2 size={18} />
          </div>
          <div className="cinema-header-text">
            <span className="cinema-overline">LIVE EVENTS · CONCERTS</span>
            <h2 className="cinema-heading">
              THE <span className="text-yellow">HOST</span>
            </h2>
          </div>
          <div className="cinema-header-count">
            <span>{projects.length.toString().padStart(2, '0')}</span>
            <span className="count-label">EVENTS</span>
          </div>
        </motion.div>
        <motion.div
          className="cinema-header-rule cinema-header-rule--right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>

      <div className="host-inner">

        {/* ── HERO BANNER ──────────────────────── */}
        <motion.div
          className="host-hero"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setBannerHover(true)}
          onMouseLeave={() => setBannerHover(false)}
        >
          <motion.img
            src={Images.NeeyaoliHost}
            alt="Neeye Oli 2024"
            className="host-hero-img"
            animate={{ scale: bannerHover ? 1.04 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="host-hero-vignette" />

          {/* corner marks */}
          {['tl','tr','bl','br'].map(pos => (
            <div key={pos} className={`host-hero-corner host-hero-corner--${pos}`} />
          ))}

          {/* bottom bar */}
          <div className="host-hero-bar">
            <div className="host-hero-bar-left">
              <motion.span
                className="host-hero-dot"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="host-hero-live">FEATURED EVENT</span>
            </div>
            <span className="host-hero-title">NEEYE OLI 2024</span>
            <span className="host-hero-tag">LIVE HOST</span>
          </div>

          {/* hover scan line */}
          <motion.div
            className="host-hero-scan"
            animate={{ scaleX: bannerHover ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* ── PROJECT CARDS ────────────────────── */}
        <div className="host-grid">
          {projects.map((p, i) => (
            <HostCard key={p.id} project={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Host;
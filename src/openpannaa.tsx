import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Film, Instagram, Facebook, Twitter, Youtube, ExternalLink } from 'lucide-react';
import { Images, VideoAssets } from './assets/assets';
import './App.css';

const criticPreviews = [
  { id: 1, title: "Retro",         tag: "REVIEW",   link: "https://youtu.be/mp8e0SBS4d4",  video: VideoAssets.vjPreviews[10] },
  { id: 2, title: "Dragon",        tag: "CRITIQUE",  link: "https://youtu.be/3z4uen7WeD8",  video: VideoAssets.vjPreviews[11] },
  { id: 3, title: "Vidaamuyarchi", tag: "ANALYSIS",  link: "https://youtu.be/vKdN87DhL9Y",  video: VideoAssets.vjPreviews[12] },
];

const socialLinks = [
  { icon: Youtube,   href: "https://youtube.com/@OpenPannaa",   label: "YouTube"   },
  { icon: Instagram, href: "https://instagram.com/openpannaa",  label: "Instagram" },
  { icon: Facebook,  href: "https://facebook.com/OpenPannaa",   label: "Facebook"  },
  { icon: Twitter,   href: "https://x.com/OpenPannaa",          label: "Twitter"   },
];

/* ─── Critic Card ───────────────────────────── */
function CriticCard({ item, index }: { item: typeof criticPreviews[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) { v.muted = true; v.play().catch(() => {}); }
    else { v.pause(); v.currentTime = 0; }
  }, [hovered]);

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="critic-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Media */}
      <div className="critic-card-media">
        <video
          ref={videoRef}
          src={item.video}
          className="critic-card-video"
          muted loop playsInline
        />
        {/* Gradient overlay */}
        <div className="critic-card-gradient" />

        {/* Tag top-left */}
        <div className="critic-card-tag">{item.tag}</div>

        {/* Play button center */}
        <motion.div
          className="critic-card-play"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.25 }}
        >
          <Play fill="black" size={20} />
        </motion.div>

        {/* Bottom scan line on hover */}
        <motion.div
          className="critic-card-scan"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Info */}
      <div className="critic-card-info">
        <div className="critic-card-info-left">
          <span className="critic-card-num">{String(item.id).padStart(2, '0')}</span>
          <h4 className="critic-card-title">{item.title}</h4>
        </div>
        <motion.div
          className="critic-card-ext"
          animate={{ opacity: hovered ? 1 : 0.3, x: hovered ? 0 : -4 }}
          transition={{ duration: 0.25 }}
        >
          <ExternalLink size={13} />
        </motion.div>
      </div>
    </motion.a>
  );
}

/* ─── Main Component ────────────────────────── */
const Filmcritic = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const inView      = useInView(headerRef, { once: true, amount: 0.5 });
  const [heroHover, setHeroHover] = useState(false);

  return (
    <section className="fc-section" ref={sectionRef}>

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
            <Film size={18} />
          </div>
          <div className="cinema-header-text">
            <span className="cinema-overline">OPEN PANNAA</span>
            <h2 className="cinema-heading">
              FILM <span className="text-yellow">CRITIC</span>
            </h2>
          </div>
          <div className="cinema-header-count">
            <span>{criticPreviews.length.toString().padStart(2, '0')}</span>
            <span className="count-label">REVIEWS</span>
          </div>
        </motion.div>
        <motion.div
          className="cinema-header-rule cinema-header-rule--right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>

      <div className="fc-inner">

        {/* ── HERO BANNER ──────────────────────── */}
        <motion.div
          className="fc-hero"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHeroHover(true)}
          onMouseLeave={() => setHeroHover(false)}
        >
          <motion.img
            src={Images.openpanna}
            alt="Open Pannaa"
            className="fc-hero-img"
            animate={{ scale: heroHover ? 1.04 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Cinematic vignette */}
          <div className="fc-hero-vignette" />

          {/* Film-frame corner marks */}
          {['tl','tr','bl','br'].map(pos => (
            <div key={pos} className={`fc-corner fc-corner--${pos}`} />
          ))}

          {/* Bottom info bar */}
          <div className="fc-hero-bar">
            <div className="fc-hero-bar-left">
              <motion.span
                className="fc-hero-dot"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="fc-hero-live">CHANNEL</span>
            </div>
            <span className="fc-hero-title">OPEN PANNAA</span>
            <div className="fc-hero-bar-right">
              <span className="fc-hero-tag">FILM CRITICISM</span>
            </div>
          </div>

          {/* Scan line */}
          <motion.div
            className="fc-hero-scan"
            animate={{ scaleX: heroHover ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* ── REVIEW GRID ──────────────────────── */}
        <div className="fc-grid">
          {criticPreviews.map((item, i) => (
            <CriticCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ── CHANNEL FOOTER ───────────────────── */}
        <motion.div
          className="fc-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Rule */}
          <div className="fc-footer-rule" />

          <div className="fc-footer-inner">
            {/* Logo */}
            <div className="fc-footer-logo-wrap">
              <img src={Images.OpenPannaimg} alt="Open Pannaa" className="fc-footer-logo" />
              <motion.div
                className="fc-footer-logo-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Channel info */}
            <div className="fc-footer-meta">
              <span className="fc-footer-overline">FILM CRITICISM · REVIEWS · ANALYSIS</span>
              <h3 className="fc-footer-name">OPEN PANNAA</h3>
              <span className="fc-footer-sub">BY ABISHEK RAAJA</span>
            </div>

            {/* Social icons */}
            <div className="fc-footer-socials">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="fc-social-btn"
                  whileHover={{ y: -4, scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Filmcritic;
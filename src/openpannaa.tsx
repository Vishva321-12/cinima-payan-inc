import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Film, Instagram, Facebook, Twitter, Youtube, ExternalLink } from 'lucide-react';
import { Images, VideoAssets } from './assets/assets';

const criticPreviews = [
  { id: 1, title: "Retro",         tag: "REVIEW",   link: "https://youtu.be/mp8e0SBS4d4",  video: VideoAssets.vjPreviews[10] },
  { id: 2, title: "Dragon",        tag: "CRITIQUE",  link: "https://youtu.be/3z4uen7WeD8",  video: VideoAssets.vjPreviews[11] },
  { id: 3, title: "Vidaamuyarchi", tag: "ANALYSIS",  link: "https://youtu.be/vKdN87DhL9Y",  video: VideoAssets.vjPreviews[12] },
];

const socialLinks = [
  { icon: Youtube,   href: "https://youtube.com/@OpenPannaa",  label: "YouTube"   },
  { icon: Instagram, href: "https://instagram.com/openpannaa", label: "Instagram" },
  { icon: Facebook,  href: "https://facebook.com/OpenPannaa",  label: "Facebook"  },
  { icon: Twitter,   href: "https://x.com/OpenPannaa",         label: "Twitter"   },
];

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
      href={item.link} target="_blank" rel="noreferrer"
      className="fcc-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="fcc-media">
        <video ref={videoRef} src={item.video} className="fcc-video" muted loop playsInline />
        <div className="fcc-gradient" />
        <div className="fcc-tag">{item.tag}</div>
        <motion.div
          className="fcc-play"
          animate={{ opacity: hovered ? 1 : 0.7, scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <Play fill="black" size={18} />
        </motion.div>
        <motion.div
          className="fcc-scan"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="fcc-tl" /><div className="fcc-br" />
      </div>

      <div className="fcc-info">
        <div className="fcc-info-left">
          <span className="fcc-num">{String(item.id).padStart(2, '0')}</span>
          <div>
            <span className="fcc-tag-label">{item.tag}</span>
            <h4 className="fcc-title">{item.title}</h4>
          </div>
        </div>
        <motion.div
          className="fcc-ext"
          animate={{ opacity: hovered ? 1 : 0.3, x: hovered ? 0 : -4 }}
        >
          <ExternalLink size={14} />
        </motion.div>
      </div>
    </motion.a>
  );
}

const Filmcritic = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, amount: 0.5 });
  const [heroHover, setHeroHover] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');

        .fcc-section {
          background: #000;
          padding: 90px 0 110px;
          overflow: hidden;
          position: relative;
        }
        .fcc-section::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
        }
        .fcc-section::after {
          content: '評';
          position: absolute; right: 2%; bottom: -60px;
          font-size: 28rem; font-family: serif; line-height: 1;
          color: rgba(255,255,255,0.012);
          pointer-events: none; user-select: none; z-index: 0;
        }

        .fcc-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px,6%,60px);
          position: relative; z-index: 2;
        }

        /* ── HEADER ── */
        .fcc-header {
          display: flex; align-items: center; gap: 20px;
          padding: 0 clamp(20px,6%,60px);
          margin-bottom: 52px;
          max-width: 1200px; margin-left: auto; margin-right: auto;
        }
        .fcc-header-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.35));
          transform-origin: left;
        }
        .fcc-header-rule--r {
          background: linear-gradient(90deg, rgba(50,197,244,0.3), transparent);
          transform-origin: right;
        }
        .fcc-header-content {
          display: flex; align-items: center; gap: 14px; flex-shrink: 0;
        }
        .fcc-header-icon {
          width: 36px; height: 36px;
          border: 1px solid rgba(253,224,71,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #fde047; flex-shrink: 0;
        }

        /* Inter — overline */
        .fcc-overline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.5vw, 0.6rem);
          font-weight: 400;
          letter-spacing: 6px;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          display: block; margin-bottom: 5px;
        }

        /* Bebas Neue — section heading */
        .fcc-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 3.2rem);
          font-weight: 400;
          color: #fff; line-height: 1; margin: 0;
          letter-spacing: 3px;
        }
        .fcc-heading-yellow { color: #fde047; }

        /* Bebas Neue — episode count */
        .fcc-count {
          display: flex; flex-direction: column; align-items: center;
          margin-left: 14px; flex-shrink: 0;
        }
        .fcc-count-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 400; color: rgba(253,224,71,0.28); line-height: 1;
          letter-spacing: 2px;
        }
        /* Inter — count label */
        .fcc-count-lbl {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 400;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.45); text-transform: uppercase;
        }

        /* ── HERO ── */
        .fcc-hero {
          position: relative; overflow: hidden;
          width: 100%; margin-bottom: 40px;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: border-color 0.4s;
        }
        .fcc-hero:hover { border-color: rgba(253,224,71,0.2); }
        .fcc-hero-img {
          width: 100%; aspect-ratio: 21/8;
          object-fit: cover; display: block;
          transition: transform 0.7s ease;
        }
        .fcc-hero:hover .fcc-hero-img { transform: scale(1.04); }
        .fcc-hero-vig {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.72) 100%);
          pointer-events: none; z-index: 2;
        }
        .fcc-hero-corner { position: absolute; width: 16px; height: 16px; z-index: 4; pointer-events: none; }
        .fcc-hero-tl { top:10px; left:10px; border-top:1px solid rgba(253,224,71,0.5); border-left:1px solid rgba(253,224,71,0.5); }
        .fcc-hero-tr { top:10px; right:10px; border-top:1px solid rgba(253,224,71,0.5); border-right:1px solid rgba(253,224,71,0.5); }
        .fcc-hero-bl { bottom:44px; left:10px; border-bottom:1px solid rgba(50,197,244,0.4); border-left:1px solid rgba(50,197,244,0.4); }
        .fcc-hero-br { bottom:44px; right:10px; border-bottom:1px solid rgba(50,197,244,0.4); border-right:1px solid rgba(50,197,244,0.4); }
        .fcc-hero-bar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 5;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 18px;
          background: rgba(0,0,0,0.82);
          border-top: 1px solid rgba(255,255,255,0.06);
          gap: 14px;
        }
        .fcc-hero-bar-left { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .fcc-hero-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #ff3333; flex-shrink: 0;
          box-shadow: 0 0 8px rgba(255,51,51,0.8);
        }
        /* Inter — CHANNEL label */
        .fcc-hero-live {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 400;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.75); text-transform: uppercase;
        }
        /* Bebas Neue — hero bar title */
        .fcc-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1rem, 2.8vw, 1.8rem);
          font-weight: 400; letter-spacing: 4px;
          color: #fff; flex: 1; text-align: center;
        }
        /* Inter — hero tag badge */
        .fcc-hero-tag {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 700;
          letter-spacing: 3px;
          color: #000; background: #fde047;
          padding: 5px 12px; text-transform: uppercase; flex-shrink: 0;
        }
        .fcc-hero-scan {
          position: absolute; bottom: 42px; left: 0; right: 0; z-index: 6;
          height: 2px;
          background: linear-gradient(90deg, #fde047, #32c5f4);
          transform-origin: left;
        }

        /* ── CARDS GRID ── */
        .fcc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 56px;
        }
        .fcc-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          text-decoration: none; display: block;
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.4s;
        }
        .fcc-card:hover {
          border-color: rgba(253,224,71,0.2);
          box-shadow: 0 12px 40px rgba(0,0,0,0.6);
          transform: translateY(-6px);
        }
        .fcc-media {
          position: relative; width: 100%;
          aspect-ratio: 16/9;
          background: #0a0a0a; overflow: hidden;
        }
        .fcc-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .fcc-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%);
          pointer-events: none; z-index: 2;
        }
        /* Inter — card tag pill */
        .fcc-tag {
          position: absolute; top: 10px; left: 10px; z-index: 5;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 700;
          letter-spacing: 3px;
          color: #000; background: #fde047;
          padding: 3px 10px; text-transform: uppercase;
        }
        .fcc-play {
          position: absolute; bottom: 10px; right: 10px; z-index: 5;
          width: 36px; height: 36px; border-radius: 50%;
          background: #fde047;
          display: flex; align-items: center; justify-content: center;
        }
        .fcc-scan {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 6;
          height: 2px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          transform-origin: left;
        }
        .fcc-tl {
          position: absolute; top: 0; left: 0; z-index: 4;
          width: 12px; height: 12px;
          border-top: 1px solid rgba(253,224,71,0.5);
          border-left: 1px solid rgba(253,224,71,0.5);
        }
        .fcc-br {
          position: absolute; bottom: 0; right: 0; z-index: 4;
          width: 12px; height: 12px;
          border-bottom: 1px solid rgba(50,197,244,0.4);
          border-right: 1px solid rgba(50,197,244,0.4);
        }
        .fcc-info {
          padding: 14px 16px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 10px;
          background: rgba(0,0,0,0.92);
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .fcc-info-left { display: flex; align-items: center; gap: 12px; }

        /* Bebas Neue — ghost number */
        .fcc-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.6rem, 2.5vw, 2rem);
          font-weight: 400; letter-spacing: 2px;
          color: rgba(253,224,71,0.22); line-height: 1; flex-shrink: 0;
        }

        /* Inter — tag label above title */
        .fcc-tag-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 400;
          letter-spacing: 4px;
          color: rgba(253,224,71,0.65); text-transform: uppercase;
          display: block; margin-bottom: 3px;
        }

        /* Bebas Neue — card title */
        .fcc-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 400; letter-spacing: 2px;
          color: #fff; margin: 0; line-height: 1.1;
        }
        .fcc-ext { color: rgba(255,255,255,0.35); flex-shrink: 0; transition: color 0.3s; }
        .fcc-card:hover .fcc-ext { color: #32c5f4; }

        /* ── FOOTER ── */
        .fcc-footer-rule {
          width: 100%; height: 1px; margin-bottom: 36px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.25), rgba(50,197,244,0.2), transparent);
        }
        .fcc-footer-inner {
          display: flex; align-items: center;
          gap: 32px; flex-wrap: wrap;
        }
        .fcc-logo-wrap {
          position: relative; flex-shrink: 0;
          width: 80px; height: 80px;
          display: flex; align-items: center; justify-content: center;
        }
        .fcc-logo {
          width: 60px; height: 60px; object-fit: contain; border-radius: 50%;
          position: relative; z-index: 2;
        }
        .fcc-logo-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px dashed rgba(253,224,71,0.3);
        }
        .fcc-footer-meta { flex: 1; min-width: 160px; }

        /* Inter — footer overline */
        .fcc-footer-overline {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 400;
          letter-spacing: 5px;
          color: rgba(255,255,255,0.55); text-transform: uppercase; margin-bottom: 6px;
        }

        /* Bebas Neue — channel name */
        .fcc-footer-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 400; letter-spacing: 4px;
          color: #fff; margin: 0 0 5px; line-height: 1;
        }

        /* Inter — by-line */
        .fcc-footer-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1vw, 0.54rem);
          font-weight: 300;
          letter-spacing: 5px;
          color: rgba(255,255,255,0.5); text-transform: uppercase;
        }

        /* ── SOCIAL BUTTONS ── */
        .fcc-socials { display: flex; gap: 10px; flex-wrap: wrap; flex-shrink: 0; }
        .fcc-social-btn {
          position: relative; overflow: hidden;
          width: 44px; height: 44px;
          border: 1px solid rgba(253,224,71,0.3);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.4s;
        }
        .fcc-social-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.38s cubic-bezier(0.77,0,0.18,1);
        }
        .fcc-social-btn:hover::before { transform: scaleX(1); }
        .fcc-social-btn:hover { color: #000; }
        .fcc-social-btn svg { position: relative; z-index: 1; }

        /* Inter — CTA button */
        .fcc-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: 28px;
          padding: 14px 28px;
          border: 1px solid #fde047;
          color: #fde047; text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          transition: color 0.4s;
        }
        .fcc-cta-bg {
          position: absolute; inset: 0;
          background: #fde047;
          transform-origin: left; transform: scaleX(0); z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .fcc-cta:hover .fcc-cta-bg { transform: scaleX(1); }
        .fcc-cta:hover { color: #000; }
        .fcc-cta span, .fcc-cta svg { position: relative; z-index: 1; }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 900px) {
          .fcc-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 700px) {
          .fcc-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 0 clamp(16px,5%,40px);
            margin-bottom: 40px;
          }
          .fcc-header-rule { display: none; }
          .fcc-header-content {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 0;
            width: 100%;
          }
          .fcc-count { margin-left: auto; align-items: flex-end; }
          .fcc-count-num { font-size: clamp(1.6rem, 8vw, 2.2rem); }
          .fcc-count-lbl { text-align: right; }
        }

        @media (max-width: 640px) {
          .fcc-section  { padding: 70px 0 80px; }
          .fcc-grid     { grid-template-columns: 1fr; }
          .fcc-hero-img { aspect-ratio: 16/7; }
          .fcc-footer-inner { flex-direction: column; align-items: flex-start; gap: 20px; }
          .fcc-hero-bar { padding: 10px 12px; }
          .fcc-hero-tag { display: none; }
        }
        @media (max-width: 400px) {
          .fcc-grid { gap: 14px; }
        }
      `}</style>

      <section className="fcc-section">

        {/* ── HEADER ── */}
        <div className="fcc-header" ref={headerRef}>
          <motion.div className="fcc-header-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.76,0,0.24,1] }}
          />

          <motion.div
            className="fcc-header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="fcc-header-icon"><Film size={18} /></div>
              <div>
                <span className="fcc-overline">OPEN PANNAA</span>
                <h2 className="fcc-heading">
                  FILM <span className="fcc-heading-yellow">CRITIC</span>
                </h2>
              </div>
            </div>

            <div className="fcc-count">
              <span className="fcc-count-num">{String(criticPreviews.length).padStart(2,'0')}</span>
              <span className="fcc-count-lbl">REVIEWS</span>
            </div>
          </motion.div>

          <motion.div className="fcc-header-rule fcc-header-rule--r"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.76,0,0.24,1] }}
          />
        </div>

        <div className="fcc-inner">

          {/* ── HERO BANNER ── */}
          <motion.div className="fcc-hero"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
            onMouseEnter={() => setHeroHover(true)}
            onMouseLeave={() => setHeroHover(false)}
          >
            <motion.img
              src={Images.openpanna} alt="Open Pannaa"
              className="fcc-hero-img"
              animate={{ scale: heroHover ? 1.04 : 1 }}
              transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            />
            <div className="fcc-hero-vig" />
            <div className="fcc-hero-corner fcc-hero-tl" />
            <div className="fcc-hero-corner fcc-hero-tr" />
            <div className="fcc-hero-corner fcc-hero-bl" />
            <div className="fcc-hero-corner fcc-hero-br" />
            <div className="fcc-hero-bar">
              <div className="fcc-hero-bar-left">
                <motion.div
                  className="fcc-hero-dot"
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="fcc-hero-live">CHANNEL</span>
              </div>
              <span className="fcc-hero-title">OPEN PANNAA</span>
              <span className="fcc-hero-tag">FILM CRITICISM</span>
            </div>
            <motion.div className="fcc-hero-scan"
              animate={{ scaleX: heroHover ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            />
          </motion.div>

          {/* ── REVIEW CARDS ── */}
          <div className="fcc-grid">
            {criticPreviews.map((item, i) => (
              <CriticCard key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* ── CHANNEL FOOTER ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          >
            <div className="fcc-footer-rule" />
            <div className="fcc-footer-inner">
              <div className="fcc-logo-wrap">
                <img src={Images.OpenPannaimg} alt="Open Pannaa" className="fcc-logo" />
                <motion.div className="fcc-logo-ring"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <div className="fcc-footer-meta">
                <span className="fcc-footer-overline">FILM CRITICISM · REVIEWS · ANALYSIS</span>
                <h3 className="fcc-footer-name">OPEN PANNAA</h3>
                <span className="fcc-footer-sub">BY ABISHEK RAAJA</span>
              </div>
              <div className="fcc-socials">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="fcc-social-btn" aria-label={label}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            <a href="https://youtube.com/@OpenPannaa" target="_blank" rel="noreferrer" className="fcc-cta">
              <div className="fcc-cta-bg" />
              <span>WATCH ALL REVIEWS</span>
              <ExternalLink size={13} />
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Filmcritic;
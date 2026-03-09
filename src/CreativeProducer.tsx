import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Instagram, LayoutGrid, Youtube, Play, Clapperboard, ExternalLink } from "lucide-react";
import { Images, VideoAssets } from "./assets/assets";

/* ─── YouTube Card ──────────────────────────── */
function YTCard({ item, index }: { item: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) { v.muted = true; v.play().catch(() => {}); }
    else { v.pause(); v.currentTime = 0; }
  }, [hovered]);

  return (
    <motion.div
      className="cpcp-yt-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cpcp-yt-media">
        <video ref={videoRef} src={item.preview} className="cpcp-yt-video" muted loop playsInline />
        <div className="cpcp-yt-gradient" />
        <div className="cpcp-yt-tag">{item.tag}</div>
        <motion.a
          href={item.link} target="_blank" rel="noreferrer"
          className="cpcp-yt-play"
          animate={{ opacity: hovered ? 1 : 0.7, scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <Play fill="black" size={18} />
        </motion.a>
        <motion.div
          className="cpcp-yt-scan"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="cpcp-yt-info">
        <h5 className="cpcp-yt-title">{item.title}</h5>
        <p className="cpcp-yt-desc">{item.desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── MAIN ──────────────────────────────────── */
const CreativeProducer = () => {
  const [activeTab,   setActiveTab]   = useState("images");
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, amount: 0.5 });

  const imagesList = useMemo(() => [
    Images.CreativePr1, Images.CreativePr2, Images.CreativePr3,
    Images.CreativePr4, Images.CreativePr5,
  ], []);

  const reelsList = useMemo(() => [
    VideoAssets.vjPreviews[15], VideoAssets.vjPreviews[16],
    VideoAssets.vjPreviews[17], VideoAssets.vjPreviews[18],
  ], []);

  const youtubeList = useMemo(() => [
    {
      id: 1, title: "Madras Matinee Reveal",
      desc: "Engineered the official digital reveal campaign, generating 500k+ organic impressions.",
      link: "https://youtu.be/iOoRSnCsftQ",
      preview: VideoAssets.vjPreviews[19], tag: "BRAND REVEAL",
    },
    {
      id: 2, title: "Marketing Strategy",
      desc: "High-impact precision targeting campaign focusing on regional cinema demographics.",
      link: "https://youtu.be/O_3zIwyqL6s",
      preview: VideoAssets.vjPreviews[20], tag: "DIGITAL STRATEGY",
    },
    {
      id: 3, title: "Matinee Trailer Drop",
      desc: "Coordinated cross-platform trailer distribution and hype-cycle management.",
      link: "https://youtu.be/F_LRE9Bfaw0",
      preview: VideoAssets.vjPreviews[21], tag: "PROMO DROP",
    },
  ], []);

  const currentList =
    activeTab === "images"  ? imagesList  :
    activeTab === "reels"   ? reelsList   : youtubeList;

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-card]'));
    if (!cards.length) return;
    const cMid = container.scrollLeft + container.offsetWidth / 2;
    let bestIdx = 0, bestDist = Infinity;
    cards.forEach((card) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - cMid);
      if (dist < bestDist) { bestDist = dist; bestIdx = Number(card.dataset.card); }
    });
    setScrollIndex(bestIdx);
  };

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    c.scrollLeft = 0;
    setScrollIndex(0);
  }, [activeTab]);

  const scrollToCard = (i: number) => {
    setScrollIndex(i);
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>(`[data-card="${i}"]`);
    if (!card) return;
    const target = card.offsetLeft + card.offsetWidth / 2 - container.offsetWidth / 2;
    container.scrollTo({ left: target, behavior: 'smooth' });
  };

  const tabs = [
    { key: "images",  label: "IMAGES",  Icon: LayoutGrid },
    { key: "reels",   label: "REELS",   Icon: Instagram  },
    { key: "youtube", label: "YOUTUBE", Icon: Youtube    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');

        .cpcp-section {
          background: #000;
          padding: 90px 0 110px;
          overflow: hidden;
          position: relative;
        }
        .cpcp-section::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
        }

        .cpcp-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px,6%,60px);
        }

        /* ── HEADER ── */
        .cpcp-header {
          display: flex; align-items: center; gap: 20px;
          padding: 0 clamp(20px,6%,60px);
          margin-bottom: 60px;
          max-width: 1200px; margin-left: auto; margin-right: auto;
        }
        .cpcp-header-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.35));
          transform-origin: left;
        }
        .cpcp-header-rule--r {
          background: linear-gradient(90deg, rgba(50,197,244,0.3), transparent);
          transform-origin: right;
        }
        .cpcp-header-content {
          display: flex; align-items: center; gap: 14px; flex-shrink: 0;
        }
        .cpcp-header-icon {
          width: 36px; height: 36px;
          border: 1px solid rgba(253,224,71,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #fde047; flex-shrink: 0;
        }

        /* Inter — overline */
        .cpcp-overline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.5vw, 0.6rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(255,255,255,0.55); text-transform: uppercase;
          display: block; margin-bottom: 5px;
        }

        /* Bebas Neue — section heading */
        .cpcp-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 3.2rem);
          font-weight: 400; letter-spacing: 3px;
          color: #fff; line-height: 1; margin: 0;
        }
        .cpcp-heading-yellow { color: #fde047; }

        /* ── FEATURE CARD ── */
        .cpcp-feature {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 100px;
        }

        /* Image side — extra bottom padding to give room for insta btn */
        .cpcp-img-side {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          padding-bottom: 56px;
        }
        .cpcp-corner { position: absolute; width: 20px; height: 20px; pointer-events: none; z-index: 5; }
        .cpcp-corner--tl { top:-8px; left:-8px; border-top:1px solid rgba(253,224,71,0.5); border-left:1px solid rgba(253,224,71,0.5); }
        .cpcp-corner--tr { top:-8px; right:-8px; border-top:1px solid rgba(253,224,71,0.5); border-right:1px solid rgba(253,224,71,0.5); }
        .cpcp-corner--bl { bottom:56px; left:-8px; border-bottom:1px solid rgba(50,197,244,0.4); border-left:1px solid rgba(50,197,244,0.4); }
        .cpcp-corner--br { bottom:56px; right:-8px; border-bottom:1px solid rgba(50,197,244,0.4); border-right:1px solid rgba(50,197,244,0.4); }

        .cpcp-img {
          max-width: 100%; height: auto; display: block;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.85));
        }
        .cpcp-img-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle at center, rgba(50,197,244,0.07) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }

        /* ── Instagram button — fixed bottom of image side ── */
        .cpcp-insta-btn {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          display: inline-flex; align-items: center; gap: 9px;
          /* Inter */
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 700; letter-spacing: 4px;
          text-transform: uppercase; text-decoration: none;
          white-space: nowrap;
          /* pill style */
          color: rgba(255,255,255,0.85);
          background: rgba(0,0,0,0.78);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(253,224,71,0.35);
          padding: 10px 22px;
          z-index: 8;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
          overflow: hidden;
          position: absolute;
        }
        /* fill sweep on hover */
        .cpcp-insta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.38s cubic-bezier(0.77,0,0.18,1);
        }
        .cpcp-insta-btn:hover::before { transform: scaleX(1); }
        .cpcp-insta-btn:hover { color: #000; border-color: #fde047; }
        .cpcp-insta-btn svg,
        .cpcp-insta-btn span { position: relative; z-index: 1; }

        /* content side */
        .cpcp-pre { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .cpcp-pre-line { width: 28px; height: 1px; background: #fde047; opacity: 0.5; }

        /* Inter — pre-label */
        .cpcp-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.2vw, 0.6rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(253,224,71,0.8); text-transform: uppercase;
        }

        /* Bebas Neue — feature title */
        .cpcp-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 5.5vw, 4.5rem);
          font-weight: 400; letter-spacing: 4px;
          color: #fff; line-height: 0.95; margin: 0 0 10px;
        }
        .cpcp-title-yellow { color: #fde047; }

        /* Inter — tagline */
        .cpcp-tagline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.2vw, 0.6rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(50,197,244,0.9); text-transform: uppercase; margin: 0 0 18px;
        }
        .cpcp-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.3), rgba(50,197,244,0.2), transparent);
          margin-bottom: 20px;
        }

        /* Inter — description */
        .cpcp-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.82rem, 1.2vw, 0.95rem);
          font-weight: 300;
          color: rgba(255,255,255,0.65); line-height: 1.85; margin: 0 0 28px;
        }
        .cpcp-highlight { color: #fff; font-weight: 700; border-bottom: 1px solid rgba(253,224,71,0.4); }

        .cpcp-stats {
          display: flex; align-items: stretch;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          padding: 18px 24px; margin-bottom: 32px; gap: 0;
          position: relative; z-index: 1;
        }
        .cpcp-stat { display: flex; flex-direction: column; gap: 5px; flex: 1; }
        .cpcp-stat-divider { width: 1px; flex-shrink: 0; background: rgba(255,255,255,0.08); margin: 0 20px; }

        /* Bebas Neue — stat numbers */
        .cpcp-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 400; color: #32c5f4; line-height: 1;
          letter-spacing: 2px;
        }
        .cpcp-stat-plus { font-size: 0.6em; vertical-align: super; }

        /* Inter — stat labels */
        .cpcp-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 400; letter-spacing: 3px;
          color: rgba(255,255,255,0.5); text-transform: uppercase;
        }

        /* Inter — CTA */
        .cpcp-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px; border: 1px solid #fde047;
          color: #fde047; text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
          transition: color 0.4s;
        }
        .cpcp-cta-bg {
          position: absolute; inset: 0; background: #fde047;
          transform-origin: left; transform: scaleX(0); z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cpcp-cta:hover .cpcp-cta-bg { transform: scaleX(1); }
        .cpcp-cta:hover { color: #000; }
        .cpcp-cta-label, .cpcp-cta svg { position: relative; z-index: 1; }

        /* ── TABS ── */
        .cpcp-tabs-wrap { margin-top: 10px; }
        .cpcp-tab-bar {
          display: flex; gap: 0;
          border: 1px solid rgba(255,255,255,0.08);
          width: fit-content; margin-bottom: 28px; overflow: hidden;
        }
        .cpcp-tab {
          position: relative; display: flex; align-items: center; gap: 8px;
          padding: 12px 28px; background: transparent; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.58rem);
          font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.45); transition: color 0.3s;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .cpcp-tab:last-child { border-right: none; }
        .cpcp-tab:hover { color: rgba(255,255,255,0.8); }
        .cpcp-tab--active { color: #000; }
        .cpcp-tab--active .cpcp-tab-icon { color: #000; }
        .cpcp-tab-pill { position: absolute; inset: 0; background: #fde047; z-index: 0; }
        .cpcp-tab-icon, .cpcp-tab-label { position: relative; z-index: 1; }
        .cpcp-tab-icon { opacity: 0.7; }
        .cpcp-tab--active .cpcp-tab-icon { opacity: 1; }

        /* ── DESKTOP GRID ── */
        .cpcp-desktop-grid { display: grid; gap: 20px; align-items: start; }
        .cpcp-desktop-grid--images  { grid-template-columns: repeat(5, 1fr); }
        .cpcp-desktop-grid--reels   { grid-template-columns: repeat(4, 1fr); }
        .cpcp-desktop-grid--youtube { grid-template-columns: repeat(3, 1fr); }

        /* POSTER */
        .cpcp-poster {
          width: 100%; aspect-ratio: 2/3; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: #0a0a0a; position: relative; transition: border-color 0.35s;
        }
        .cpcp-poster:hover { border-color: rgba(253,224,71,0.25); }
        .cpcp-poster img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.55s ease; }
        .cpcp-poster:hover img { transform: scale(1.07); }
        .cpcp-poster-overlay { position: absolute; inset: 0; background: rgba(50,197,244,0.06); opacity: 0; transition: opacity 0.35s; }
        .cpcp-poster:hover .cpcp-poster-overlay { opacity: 1; }
        .cpcp-poster-tl, .cpcp-poster-br { position: absolute; width: 10px; height: 10px; pointer-events: none; z-index: 4; }
        .cpcp-poster-tl { top:7px; left:7px; border-top:1px solid rgba(253,224,71,0.45); border-left:1px solid rgba(253,224,71,0.45); }
        .cpcp-poster-br { bottom:7px; right:7px; border-bottom:1px solid rgba(253,224,71,0.45); border-right:1px solid rgba(253,224,71,0.45); }

        /* REEL */
        .cpcp-reel-card {
          width: 100%; aspect-ratio: 9/16; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: #0a0a0a; position: relative; transition: border-color 0.35s, transform 0.4s;
        }
        .cpcp-reel-card:hover { border-color: rgba(50,197,244,0.25); transform: translateY(-6px); }
        .cpcp-reel-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .cpcp-reel-gradient { position: absolute; inset:0; background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.65) 100%); pointer-events:none; }

        /* Inter — reel tag */
        .cpcp-reel-tag {
          position: absolute; bottom:10px; left:10px; right:10px;
          display: flex; justify-content: space-between; align-items: center;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 400; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.85); z-index:3;
        }
        .cpcp-reel-num { color: #fde047; font-weight: 700; }

        /* YT CARD */
        .cpcp-yt-card {
          width: 100%; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07); overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s;
        }
        .cpcp-yt-card:hover { border-color: rgba(253,224,71,0.2); box-shadow: 0 12px 40px rgba(0,0,0,0.6); }
        .cpcp-yt-media { position: relative; width: 100%; aspect-ratio: 16/9; background: #0a0a0a; overflow: hidden; }
        .cpcp-yt-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .cpcp-yt-gradient { position:absolute; inset:0; background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%); pointer-events:none; }

        /* Inter — yt tag */
        .cpcp-yt-tag {
          position:absolute; top:10px; left:10px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.42rem, 1vw, 0.52rem);
          font-weight: 700; letter-spacing: 3px;
          color:#000; background:#fde047; padding:4px 10px; z-index:5; text-transform:uppercase;
        }
        .cpcp-yt-play {
          position:absolute; bottom:10px; right:10px; width:36px; height:36px;
          background:#fde047; border-radius:50%; display:flex; align-items:center;
          justify-content:center; text-decoration:none; z-index:5;
        }
        .cpcp-yt-scan { position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#32c5f4,#fde047); transform-origin:left; z-index:6; }
        .cpcp-yt-info { padding: 18px 20px; }

        /* Bebas Neue — yt card title */
        .cpcp-yt-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 400; letter-spacing: 2px;
          color: #fff; margin: 0 0 8px; line-height: 1.2;
        }

        /* Inter — yt card desc */
        .cpcp-yt-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 1.2vw, 0.78rem);
          font-weight: 300; letter-spacing: 0.5px;
          color: rgba(255,255,255,0.6); line-height: 1.75; margin: 0;
        }

        /* ── MOBILE SCROLL + DOTS hidden by default ── */
        .cpcp-scroll-outer { display: none; }
        .cpcp-dots          { display: none; }

        /* ════════════════════════════════════════
           RESPONSIVE — tablet
        ════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .cpcp-desktop-grid--images  { grid-template-columns: repeat(3, 1fr); }
          .cpcp-desktop-grid--reels   { grid-template-columns: repeat(3, 1fr); }
          .cpcp-desktop-grid--youtube { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 960px) {
          .cpcp-feature { grid-template-columns: 1fr; gap: 40px; text-align: center; margin-bottom: 80px; }
          .cpcp-img-side { justify-content: center; max-width: 380px; margin: 0 auto; }
          .cpcp-pre      { justify-content: center; }
          .cpcp-stats    { max-width: 420px; margin-left: auto; margin-right: auto; margin-bottom: 32px; }
          .cpcp-cta      { display: inline-flex; margin: 0 auto; }
          .cpcp-desktop-grid--images  { grid-template-columns: repeat(3, 1fr); }
          .cpcp-desktop-grid--reels   { grid-template-columns: repeat(2, 1fr); }
          .cpcp-desktop-grid--youtube { grid-template-columns: repeat(2, 1fr); }
        }

        /* ════════════════════════════════════════
           MOBILE ≤700px
        ════════════════════════════════════════ */
        @media (max-width: 700px) {
          .cpcp-header {
            flex-direction: column; align-items: flex-start;
            gap: 10px; padding: 0 clamp(16px,5%,40px); margin-bottom: 40px;
          }
          .cpcp-header-rule { display: none; }
          .cpcp-header-content { flex-direction: column; align-items: flex-start; gap: 10px; }
          .cpcp-header-icon { width: 30px; height: 30px; }
          .cpcp-feature  { margin-bottom: 70px; }

          /* Mobile: insta btn stretches full width of img side */
          .cpcp-insta-btn {
            left: 0; transform: none;
            width: 100%; justify-content: center;
            font-size: 0.52rem; padding: 10px 16px;
          }

          .cpcp-stats {
            flex-direction: row; flex-wrap: nowrap;
            justify-content: space-between;
            padding: 12px 14px; margin-bottom: 24px;
          }
          .cpcp-stat-divider { display: block; margin: 0 10px; }
          .cpcp-stat-num     { font-size: clamp(1.4rem, 6vw, 2rem); }
          .cpcp-stat-label   { font-size: 0.5rem; letter-spacing: 1.5px; }

          .cpcp-desktop-grid { display: none !important; }

          .cpcp-scroll-outer {
            display: block;
            margin-left:  calc(-1 * clamp(20px, 6%, 60px));
            margin-right: calc(-1 * clamp(20px, 6%, 60px));
            overflow-x: auto;
            overflow-y: visible;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 12px;
          }
          .cpcp-scroll-outer::-webkit-scrollbar { display: none; }

          .cpcp-mobile-flex {
            display: flex;
            gap: 14px;
            align-items: flex-start;
            padding: 0 10vw;
            width: max-content;
          }

          .cpcp-poster,
          .cpcp-reel-card,
          .cpcp-yt-card {
            flex-shrink: 0;
            scroll-snap-align: center;
          }
          .cpcp-poster    { width: 70vw; flex-basis: 70vw; }
          .cpcp-reel-card { width: 55vw; flex-basis: 55vw; }
          .cpcp-yt-card   { width: 80vw; flex-basis: 80vw; }

          .cpcp-dots {
            display: flex; justify-content: center; align-items: center;
            gap: 10px; margin-top: 18px; padding: 6px 0;
          }
          .cpcp-dot {
            width: 20px; height: 4px;
            background: rgba(255,255,255,0.18); border-radius: 2px; cursor: pointer;
            transition: width 0.35s cubic-bezier(0.77,0,0.18,1), background 0.35s, box-shadow 0.35s;
            flex-shrink: 0;
          }
          .cpcp-dot:hover { background: rgba(253,224,71,0.5); }
          .cpcp-dot--active { width: 40px; background: #fde047; box-shadow: 0 0 10px rgba(253,224,71,0.55); }
        }

        @media (max-width: 600px) {
          .cpcp-section { padding: 60px 0 70px; }
          .cpcp-inner   { padding: 0 16px; }
          .cpcp-tab-bar { width: 100%; }
          .cpcp-tab { flex: 1; padding: 10px 4px; font-size: 0.52rem; letter-spacing: 1.5px; justify-content: center; gap: 5px; }
          .cpcp-scroll-outer { margin-left: -16px; margin-right: -16px; }
          .cpcp-mobile-flex  { padding: 0 10vw; gap: 12px; }
        }

        @media (max-width: 400px) {
          .cpcp-tab       { font-size: 0.46rem; letter-spacing: 1px; gap: 4px; }
          .cpcp-poster    { width: 78vw; flex-basis: 78vw; }
          .cpcp-reel-card { width: 62vw; flex-basis: 62vw; }
          .cpcp-yt-card   { width: 84vw; flex-basis: 84vw; }
          .cpcp-mobile-flex { padding: 0 8vw; }
        }
      `}</style>

      <section className="cpcp-section">

        {/* ── HEADER ── */}
        <div className="cpcp-header" ref={headerRef}>
          <motion.div className="cpcp-header-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="cpcp-header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="cpcp-header-icon"><Clapperboard size={18} /></div>
            <div>
              <span className="cpcp-overline">CAMPAIGN STRATEGY · CONTENT</span>
              <h2 className="cpcp-heading">
                CREATIVE <span className="cpcp-heading-yellow">PRODUCER</span>
              </h2>
            </div>
          </motion.div>
          <motion.div className="cpcp-header-rule cpcp-header-rule--r"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>

        <div className="cpcp-inner">

          {/* ── FEATURE CARD ── */}
          <motion.div
            className="cpcp-feature"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cpcp-img-side">
              <div className="cpcp-img-glow" />
              {(['tl','tr','bl','br'] as const).map(pos => (
                <div key={pos} className={`cpcp-corner cpcp-corner--${pos}`} />
              ))}
              <motion.img
                src={Images.madras} alt="Madras Motion Pictures"
                className="cpcp-img"
                whileHover={{ scale: 1.04, rotate: -1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Instagram CTA — anchored below image */}
              <a
                href="https://www.instagram.com/madrasmotionpictures/"
                target="_blank" rel="noreferrer"
                className="cpcp-insta-btn"
              >
                <Instagram size={13} />
                <span>FOLLOW ON INSTAGRAM</span>
              </a>
            </div>

            <div className="cpcp-content">
              <div className="cpcp-pre">
                <div className="cpcp-pre-line" />
                <span className="cpcp-pre-text">DIGITAL ARCHITECT</span>
              </div>
              <h3 className="cpcp-title">
                TURNING FRAMES<br />
                <span className="cpcp-title-yellow">INTO FAME</span>
              </h3>
              <p className="cpcp-tagline">Campaign Strategy · Content Curation · Growth</p>
              <div className="cpcp-rule" />
              <p className="cpcp-desc">
                I specialise in engineering the digital heartbeat of modern cinema — executing
                high-stakes reveal campaigns that transform raw cinematic footage into{" "}
                <span className="cpcp-highlight">unavoidable content</span>.
              </p>
              <div className="cpcp-stats">
                <div className="cpcp-stat">
                  <span className="cpcp-stat-num">500K<span className="cpcp-stat-plus">+</span></span>
                  <span className="cpcp-stat-label">IMPRESSIONS</span>
                </div>
                <div className="cpcp-stat-divider" />
                <div className="cpcp-stat">
                  <span className="cpcp-stat-num">3</span>
                  <span className="cpcp-stat-label">CAMPAIGNS</span>
                </div>
                <div className="cpcp-stat-divider" />
                <div className="cpcp-stat">
                  <span className="cpcp-stat-num">∞</span>
                  <span className="cpcp-stat-label">IMPACT</span>
                </div>
              </div>
              <motion.a
                href="https://www.instagram.com/madrasmotionpictures/"
                target="_blank" rel="noreferrer"
                className="cpcp-cta"
                whileHover="hover"
              >
                <motion.span
                  className="cpcp-cta-bg"
                  variants={{ hover: { scaleX: 1 } }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="cpcp-cta-label">VISIT INSTAGRAM</span>
                <ExternalLink size={13} />
              </motion.a>
            </div>
          </motion.div>

          {/* ── TABS ── */}
          <motion.div
            className="cpcp-tabs-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cpcp-tab-bar">
              {tabs.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  className={`cpcp-tab ${activeTab === key ? "cpcp-tab--active" : ""}`}
                  onClick={() => setActiveTab(key)}
                >
                  {activeTab === key && (
                    <motion.div className="cpcp-tab-pill" layoutId="cpcp-tab-pill" />
                  )}
                  <Icon size={13} className="cpcp-tab-icon" />
                  <span className="cpcp-tab-label">{label}</span>
                </button>
              ))}
            </div>

            {/* ── DESKTOP GRID ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + "-desktop"}
                className={`cpcp-desktop-grid cpcp-desktop-grid--${activeTab}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeTab === "images" && imagesList.map((img, i) => (
                  <motion.div key={i} data-card={i} className="cpcp-poster"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
                  >
                    <img src={img} alt="Work" />
                    <div className="cpcp-poster-overlay" />
                    <div className="cpcp-poster-tl" /><div className="cpcp-poster-br" />
                  </motion.div>
                ))}
                {activeTab === "reels" && reelsList.map((reel, i) => (
                  <motion.div key={i} data-card={i} className="cpcp-reel-card"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                  >
                    <video src={reel} muted loop autoPlay playsInline className="cpcp-reel-video" />
                    <div className="cpcp-reel-gradient" />
                    <div className="cpcp-reel-tag">
                      <span>REEL</span>
                      <span className="cpcp-reel-num">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </motion.div>
                ))}
                {activeTab === "youtube" && youtubeList.map((yt, i) => (
                  <div key={yt.id} data-card={i}><YTCard item={yt} index={i} /></div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* ── MOBILE SCROLL ── */}
            <div className="cpcp-scroll-outer" ref={scrollRef} onScroll={handleScroll}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + "-mobile"}
                  className="cpcp-mobile-flex"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeTab === "images" && imagesList.map((img, i) => (
                    <motion.div key={i} data-card={i} className="cpcp-poster"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07, duration: 0.45 }}
                    >
                      <img src={img} alt="Work" />
                      <div className="cpcp-poster-overlay" />
                      <div className="cpcp-poster-tl" /><div className="cpcp-poster-br" />
                    </motion.div>
                  ))}
                  {activeTab === "reels" && reelsList.map((reel, i) => (
                    <motion.div key={i} data-card={i} className="cpcp-reel-card"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08, duration: 0.45 }}
                    >
                      <video src={reel} muted loop autoPlay playsInline className="cpcp-reel-video" />
                      <div className="cpcp-reel-gradient" />
                      <div className="cpcp-reel-tag">
                        <span>REEL</span>
                        <span className="cpcp-reel-num">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                    </motion.div>
                  ))}
                  {activeTab === "youtube" && youtubeList.map((yt, i) => (
                    <div key={yt.id} data-card={i}><YTCard item={yt} index={i} /></div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── DOTS ── */}
            <div className="cpcp-dots">
              {currentList.map((_, i) => (
                <div
                  key={i}
                  className={`cpcp-dot ${scrollIndex === i ? "cpcp-dot--active" : ""}`}
                  onClick={() => scrollToCard(i)}
                />
              ))}
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CreativeProducer;
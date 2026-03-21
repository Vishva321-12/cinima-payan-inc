import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Instagram, Facebook, Twitter, Youtube, ExternalLink } from "lucide-react";
import { Images, VideoAssets } from "./assets/assets";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const vjVideos = [
  { id: 1,  title: "Anirudh Ravichander", role: "Composer · Producer",       link: "https://youtu.be/dESRRC-uVME",  preview: VideoAssets.vjPreviews[0], thumb: Images.ScreenshotAR  },
  { id: 2,  title: "Venkat Prabhu",       role: "Director · Actor",          link: "https://youtu.be/lAH_99cCcos", preview: VideoAssets.vjPreviews[1], thumb: Images.ScreenshotVP  },
  { id: 3,  title: "Silambarasan TR",     role: "Actor",                     link: "https://youtu.be/GKHk7d_bQh0", preview: VideoAssets.vjPreviews[2], thumb: Images.ScreenshotSTR },
  { id: 4,  title: "Vijay Sethupathi",    role: "Actor · Producer",          link: "https://youtu.be/77oGSFHYzSY", preview: VideoAssets.vjPreviews[3], thumb: Images.ScreenshotVJS },
  { id: 5,  title: "Arjun DAS",           role: "Actor",                     link: "https://youtu.be/fEpt5b794ys", preview: VideoAssets.vjPreviews[4], thumb: Images.ScreenshotAD  },
  { id: 6,  title: "T. Kumararaja",       role: "Director · Writer",         link: "https://youtu.be/BBnY5tE7-Wo", preview: VideoAssets.vjPreviews[5], thumb: Images.ScreenshotTK  },
  { id: 7,  title: "Kamal Haasan",        role: "Actor · Director · Legend", link: "https://www.youtube.com/watch?v=JzsDo_hf5cg", preview: VideoAssets.vjPreviews[6], thumb: Images.ScreenshotKH  },
  { id: 8,  title: "Dulquer Salmaan",     role: "Actor · Producer",          link: "https://youtu.be/sSmudmwhMgc", preview: VideoAssets.vjPreviews[7], thumb: Images.ScreenshotDQ  },
  { id: 9,  title: "GVM",                 role: "Director · Visionary",      link: "https://youtu.be/hKbP91H0_Do", preview: VideoAssets.vjPreviews[8], thumb: Images.ScreenshotGVM },
  { id: 10, title: "Ashok Selvan",        role: "Actor",                     link: "https://youtu.be/uXQOlL7EjzA", preview: VideoAssets.vjPreviews[9], thumb: Images.ScreenshotAS  },
];

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

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function ClapperIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" width={size} height={size}>
      <rect x="2" y="7" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M9.5 10.5l5 3-5 3v-6z" fill="currentColor"/>
      <path d="M2 7h18" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5.5 7l2.5-4M10 7l2.5-4M14.5 7l2.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function YTIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" width={size} height={size}>
      <rect x="1.5" y="4.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M9 8l6 3.5-6 3.5V8z" fill="currentColor"/>
    </svg>
  );
}

function RadioMicIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" width={size} height={size}>
      <rect x="7.5" y="2" width="7" height="10" rx="3.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M4 10a7 7 0 0014 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M11 17v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M7.5 20h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M2 7.5a10 10 0 000 7M20 7.5a10 10 0 010 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   TAB CONFIG
───────────────────────────────────────────── */
type TabId = "vj" | "openpannaa" | "rj";

const TABS: { id: TabId; label: string; sub: string; accent: string; borderColor: string }[] = [
  { id: "vj",        label: "VJ",         sub: "CURATED CONVERSATIONS", accent: "#fde047", borderColor: "rgba(253,224,71,0.35)"  },
  { id: "openpannaa",label: "OPEN PANNAA", sub: "FILM CRITIC · YOUTUBE", accent: "#ff4444", borderColor: "rgba(255,68,68,0.35)"   },
  { id: "rj",        label: "RJ",          sub: "BROADCAST ARCHIVES",    accent: "#32c5f4", borderColor: "rgba(50,197,244,0.35)"  },
];

/* ─────────────────────────────────────────────
   VJ CARD
───────────────────────────────────────────── */
function VJCard({ video, isActive, onActivate }: { video: typeof vjVideos[0]; index: number; isActive: boolean; onActivate: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered || isActive) { v.muted = true; v.play().catch(() => {}); }
    else { v.pause(); v.currentTime = 0; }
  }, [hovered, isActive]);

  const show = hovered || isActive;

  return (
    <div
      className={`cc-vj-card${isActive ? " cc-vj-card--active" : ""}`}
      onMouseEnter={() => { setHovered(true); onActivate(); }}
      onMouseLeave={() => setHovered(false)}
      onClick={onActivate}
    >
      <div className="cc-vj-media">
        <img src={video.thumb} alt={video.title} className={`cc-vj-thumb${show ? " cc-vj-thumb--hide" : ""}`} />
        <video ref={videoRef} src={video.preview} className={`cc-vj-vid${show ? " cc-vj-vid--show" : ""}`} muted loop playsInline preload="none" />
        <div className="cc-vj-overlay" />
        <span className="cc-vj-ghost">{String(video.id).padStart(2,"0")}</span>
        <a href={video.link} target="_blank" rel="noreferrer"
          className={`cc-vj-play${show ? " cc-vj-play--show" : ""}`}
          onClick={e => e.stopPropagation()}>
          <Play fill="black" size={14} />
        </a>
        <div className={`cc-vj-bar${isActive ? " cc-vj-bar--on" : ""}`} />
      </div>
      <div className="cc-vj-info">
        <div className="cc-vj-info-top">
          <span className="cc-vj-sess">SESSION {String(video.id).padStart(2,"0")}</span>
          <ExternalLink size={11} className="cc-vj-ext" />
        </div>
        <h4 className="cc-vj-name">{video.title}</h4>
        <span className="cc-vj-role">{video.role}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OPEN PANNAA CARD
───────────────────────────────────────────── */
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
    <motion.a href={item.link} target="_blank" rel="noreferrer"
      className="cc-op-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16,1,0.3,1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cc-op-media">
        <video ref={videoRef} src={item.video} className="cc-op-vid" muted loop playsInline />
        <div className="cc-op-grad" />
        <span className="cc-op-tag">{item.tag}</span>
        <motion.div className="cc-op-play"
          animate={{ opacity: hovered ? 1 : 0.7, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Play fill="black" size={16} />
        </motion.div>
        <motion.div className="cc-op-scan"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
        />
        <div className="cc-op-tl"/><div className="cc-op-br"/>
      </div>
      <div className="cc-op-info">
        <div className="cc-op-left">
          <span className="cc-op-num">{String(item.id).padStart(2,"0")}</span>
          <div>
            <span className="cc-op-lbl">{item.tag}</span>
            <h4 className="cc-op-title">{item.title}</h4>
          </div>
        </div>
        <motion.div className="cc-op-ext"
          animate={{ opacity: hovered ? 1 : 0.3, x: hovered ? 0 : -4 }}
        >
          <ExternalLink size={13} />
        </motion.div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const CinemaChannels = () => {
  const [activeTab, setActiveTab] = useState<TabId>("vj");
  const [vjActiveIndex, setVjActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const inView     = useInView(headerRef, { once: true, amount: 0.3 });

  const CARD_W   = 340;
  const CARD_GAP = 16;
  const CARD_STEP = CARD_W + CARD_GAP;
  const TOTAL    = vjVideos.length;
  const SET_W    = TOTAL * CARD_STEP;
  const loopList = [...vjVideos, ...vjVideos, ...vjVideos];

  /* auto-scroll VJ carousel */
  useEffect(() => {
    if (activeTab !== "vj") return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = SET_W;

    let raf: number;
    const tick = () => {
      if (!isPaused && track) {
        track.scrollLeft += 0.7;
        if (track.scrollLeft >= SET_W * 2) track.scrollLeft -= SET_W;
        if (track.scrollLeft < SET_W)      track.scrollLeft += SET_W;
        const pos = (track.scrollLeft - SET_W) % SET_W;
        setVjActiveIndex(Math.round(pos / CARD_STEP) % TOTAL);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeTab, isPaused, SET_W, CARD_STEP, TOTAL]);

  const currentTab = TABS.find(t => t.id === activeTab)!;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');

        /* ═══════════════════════════════════
           SECTION SHELL
        ═══════════════════════════════════ */
        .cc-section {
          background: #080c16;
          padding: 80px 0 100px;
          overflow: hidden;
          position: relative;
        }
        .cc-section::before {
          content: '';
          position: absolute; top: 0; left: 6%; right: 6%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.18) 50%, transparent);
        }

        .cc-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(16px, 5%, 56px);
        }

        /* ═══════════════════════════════════
           HEADER
        ═══════════════════════════════════ */
        .cc-header {
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 52px;
        }
        .cc-header-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.35));
          transform-origin: left;
        }
        .cc-header-rule--r {
          background: linear-gradient(90deg, rgba(50,197,244,0.3), transparent);
          transform-origin: right;
        }
        .cc-header-mid {
          display: flex; flex-direction: column; align-items: center;
          gap: 4px; flex-shrink: 0;
        }
        .cc-overline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.4vw, 0.56rem);
          font-weight: 400; letter-spacing: 7px;
          color: rgba(255,255,255,0.35); text-transform: uppercase;
        }
        .cc-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 5vw, 3.4rem);
          font-weight: 400; color: #fff;
          line-height: 1; margin: 0; letter-spacing: 4px;
          text-align: center;
        }
        .cc-heading span { color: #fde047; }

        /* ═══════════════════════════════════
           3-BOX TAB SELECTOR
        ═══════════════════════════════════ */
        .cc-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-bottom: 48px;
          border: 1px solid rgba(255,255,255,0.07);
        }

        .cc-tab {
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          align-items: flex-start;
          padding: clamp(18px,3vw,28px) clamp(16px,3vw,28px);
          cursor: pointer;
          background: rgba(8,12,22,0.9);
          border-right: 1px solid rgba(255,255,255,0.06);
          transition: background 0.35s;
          gap: 10px;
        }
        .cc-tab:last-child { border-right: none; }

        /* shimmer fill on active */
        .cc-tab::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.025);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
          z-index: 0;
        }
        .cc-tab--active::before { transform: scaleY(1); }

        /* top accent bar */
        .cc-tab::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.77,0,0.18,1);
        }
        .cc-tab--vj::after        { background: #fde047; }
        .cc-tab--openpannaa::after { background: #ff4444; }
        .cc-tab--rj::after         { background: #32c5f4; }
        .cc-tab--active::after    { transform: scaleX(1); }

        .cc-tab-icon {
          position: relative; z-index: 1;
          width: 38px; height: 38px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.3s, color 0.3s;
        }
        .cc-tab--vj        .cc-tab-icon { color: rgba(253,224,71,0.4); }
        .cc-tab--openpannaa .cc-tab-icon { color: rgba(255,68,68,0.4); }
        .cc-tab--rj         .cc-tab-icon { color: rgba(50,197,244,0.4); }
        .cc-tab--active.cc-tab--vj        .cc-tab-icon { color: #fde047; border-color: rgba(253,224,71,0.4); }
        .cc-tab--active.cc-tab--openpannaa .cc-tab-icon { color: #ff4444; border-color: rgba(255,68,68,0.4); }
        .cc-tab--active.cc-tab--rj         .cc-tab-icon { color: #32c5f4; border-color: rgba(50,197,244,0.4); }

        .cc-tab-text { position: relative; z-index: 1; }
        .cc-tab-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.4rem, 3.5vw, 2.4rem);
          letter-spacing: 4px; line-height: 1;
          color: rgba(255,255,255,0.35);
          display: block;
          transition: color 0.3s;
        }
        .cc-tab--active .cc-tab-label { color: #fff; }

        .cc-tab-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 1.1vw, 0.5rem);
          letter-spacing: 4px; font-weight: 400;
          color: rgba(255,255,255,0.22); text-transform: uppercase;
          display: block; margin-top: 4px;
          transition: color 0.3s;
        }
        .cc-tab--active.cc-tab--vj        .cc-tab-sub { color: rgba(253,224,71,0.6); }
        .cc-tab--active.cc-tab--openpannaa .cc-tab-sub { color: rgba(255,68,68,0.6); }
        .cc-tab--active.cc-tab--rj         .cc-tab-sub { color: rgba(50,197,244,0.6); }

        /* corner bracket on active */
        .cc-tab-corner {
          position: absolute; bottom: 10px; right: 10px;
          width: 10px; height: 10px;
          border-bottom: 1px solid; border-right: 1px solid;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 1;
        }
        .cc-tab--active.cc-tab--vj        .cc-tab-corner { border-color: rgba(253,224,71,0.4); opacity: 1; }
        .cc-tab--active.cc-tab--openpannaa .cc-tab-corner { border-color: rgba(255,68,68,0.4);  opacity: 1; }
        .cc-tab--active.cc-tab--rj         .cc-tab-corner { border-color: rgba(50,197,244,0.4); opacity: 1; }

        /* seq number ghost */
        .cc-tab-seq {
          position: absolute; bottom: 8px; left: clamp(14px,3vw,26px);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: rgba(255,255,255,0.04);
          line-height: 1; user-select: none; z-index: 0;
        }

        /* ═══════════════════════════════════
           CONTENT PANEL
        ═══════════════════════════════════ */
        .cc-panel {
          position: relative; min-height: 420px;
        }

        /* ═══════════════════════════════════
           VJ PANEL
        ═══════════════════════════════════ */
        .cc-vj-track-wrap { position: relative; margin: 0 -clamp(16px,5%,56px); }
        .cc-vj-track-wrap::before, .cc-vj-track-wrap::after {
          content: '';
          position: absolute; top: 0; bottom: 0; width: 60px;
          z-index: 5; pointer-events: none;
        }
        .cc-vj-track-wrap::before { left: 0;  background: linear-gradient(to right, #080c16, transparent); }
        .cc-vj-track-wrap::after  { right: 0; background: linear-gradient(to left,  #080c16, transparent); }

        .cc-vj-track {
          display: flex; gap: 16px;
          overflow-x: scroll; scrollbar-width: none;
          padding: 16px clamp(16px,5%,56px) 20px;
        }
        .cc-vj-track::-webkit-scrollbar { display: none; }

        .cc-vj-card {
          flex: 0 0 clamp(200px, 30vw, 340px);
          background: #0d1220;
          border: 1px solid rgba(50,197,244,0.07);
          cursor: pointer;
          transition: border-color 0.3s, transform 0.35s, box-shadow 0.35s;
        }
        .cc-vj-card:hover,
        .cc-vj-card--active {
          border-color: rgba(253,224,71,0.22);
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.6);
        }
        .cc-vj-media { position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #060a10; }
        .cc-vj-thumb,
        .cc-vj-vid   { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .cc-vj-thumb { transition: opacity 0.4s; }
        .cc-vj-thumb--hide { opacity: 0; }
        .cc-vj-vid   { opacity: 0; transition: opacity 0.4s; }
        .cc-vj-vid--show { opacity: 1; }
        .cc-vj-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%);
          z-index: 2; pointer-events: none;
        }
        .cc-vj-ghost {
          position: absolute; top: 6px; left: 8px; z-index: 3;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: rgba(253,224,71,0.12); line-height: 1; user-select: none;
        }
        .cc-vj-play {
          position: absolute; bottom: 10px; right: 10px; z-index: 5;
          width: 34px; height: 34px; border-radius: 50%;
          background: #fde047;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          opacity: 0; transform: scale(0.7);
          transition: opacity 0.25s, transform 0.25s;
        }
        .cc-vj-play--show { opacity: 1; transform: scale(1); }
        .cc-vj-bar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 6;
          height: 2px;
          background: linear-gradient(90deg, #fde047, #32c5f4);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s;
        }
        .cc-vj-bar--on { transform: scaleX(1); }
        .cc-vj-info { padding: 10px 12px 12px; background: #080c14; }
        .cc-vj-info-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .cc-vj-sess {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 1vw, 0.5rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(253,224,71,0.7); text-transform: uppercase;
        }
        .cc-vj-ext { color: rgba(255,255,255,0.22); transition: color 0.25s; }
        .cc-vj-card:hover .cc-vj-ext { color: #32c5f4; }
        .cc-vj-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.9rem, 2vw, 1.2rem);
          letter-spacing: 2px; color: #fff;
          margin: 0 0 3px; line-height: 1.1;
        }
        .cc-vj-role {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 0.9vw, 0.48rem);
          font-weight: 300; letter-spacing: 2px;
          color: rgba(255,255,255,0.4); text-transform: uppercase; display: block;
        }
        .cc-vj-card:hover .cc-vj-role { color: rgba(50,197,244,0.7); }

        /* VJ ticker */
        .cc-vj-ticker {
          display: flex; align-items: center; gap: 0;
          margin-top: 20px;
        }
        .cc-vj-tbar {
          flex: 1; height: 2px; background: rgba(255,255,255,0.05);
          position: relative; overflow: hidden;
        }
        .cc-vj-tbar-fill {
          position: absolute; top: 0; left: 0; height: 100%;
          background: linear-gradient(90deg, #fde047, #32c5f4);
          transition: width 0.5s cubic-bezier(0.77,0,0.18,1);
        }
        .cc-vj-tbar--r .cc-vj-tbar-fill {
          background: linear-gradient(90deg, #32c5f4, transparent);
        }
        .cc-vj-tpanel {
          flex-shrink: 0; display: flex; align-items: center; gap: 10px;
          padding: 0 clamp(10px,2vw,20px);
          border-left: 1px solid rgba(255,255,255,0.07);
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .cc-vj-tidx {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          color: rgba(253,224,71,0.85); line-height: 1; min-width: 28px; text-align: right;
        }
        .cc-vj-tdiv { width: 1px; height: 26px; background: rgba(255,255,255,0.08); }
        .cc-vj-tinfo { display: flex; flex-direction: column; gap: 3px; }
        .cc-vj-tname {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.85rem, 2vw, 1rem);
          letter-spacing: 2px; color: #fff; line-height: 1;
        }
        .cc-vj-trole {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.36rem, 0.9vw, 0.48rem);
          font-weight: 300; letter-spacing: 3px;
          color: rgba(50,197,244,0.75); text-transform: uppercase;
        }
        .cc-vj-ttotal {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 0.9vw, 0.5rem);
          letter-spacing: 3px; color: rgba(255,255,255,0.18);
          text-transform: uppercase; padding-left: 10px; align-self: center;
        }
        .cc-vj-hint {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 1vw, 0.5rem);
          font-weight: 300; letter-spacing: 4px;
          color: rgba(255,255,255,0.18); text-transform: uppercase;
          text-align: center; margin-top: 12px; transition: color 0.3s;
        }
        .cc-vj-hint--paused { color: rgba(253,224,71,0.5); }

        /* ═══════════════════════════════════
           OPEN PANNAA PANEL
        ═══════════════════════════════════ */
        .cc-op-hero {
          position: relative; overflow: hidden;
          width: 100%; margin-bottom: 28px;
          border: 1px solid rgba(255,68,68,0.08);
          cursor: default;
        }
        .cc-op-hero-img {
          width: 100%; aspect-ratio: 21/7;
          object-fit: cover; display: block;
        }
        .cc-op-hero-vig {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 25%, rgba(13,6,9,0.9) 100%);
          pointer-events: none; z-index: 2;
        }
        .cc-op-hero-bar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 5;
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px;
          background: rgba(13,6,9,0.9);
          border-top: 1px solid rgba(255,68,68,0.1);
          gap: 12px;
        }
        .cc-op-hero-live {
          display: flex; align-items: center; gap: 6px; flex-shrink: 0;
        }
        .cc-op-hero-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ff3333; box-shadow: 0 0 8px rgba(255,51,51,0.8);
          animation: ccDot 1.5s step-end infinite;
        }
        @keyframes ccDot { 0%,100%{opacity:1} 50%{opacity:0.15} }
        .cc-op-hero-lbl {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.4rem, 1vw, 0.52rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(255,255,255,0.7); text-transform: uppercase;
        }
        .cc-op-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.9rem, 2.5vw, 1.6rem);
          letter-spacing: 4px; color: #fff; flex: 1; text-align: center;
        }
        .cc-op-hero-badge {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 0.9vw, 0.5rem);
          font-weight: 700; letter-spacing: 3px;
          color: #000; background: #fde047;
          padding: 4px 10px; text-transform: uppercase; flex-shrink: 0;
        }

        .cc-op-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px; margin-bottom: 36px;
        }
        .cc-op-card {
          background: #1e0a0d;
          border: 1px solid rgba(253,224,71,0.06);
          overflow: hidden; text-decoration: none; display: block;
          transition: border-color 0.3s, transform 0.35s, box-shadow 0.3s;
        }
        .cc-op-card:hover {
          border-color: rgba(253,224,71,0.18);
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.55);
        }
        .cc-op-media {
          position: relative; width: 100%; aspect-ratio: 16/9;
          background: #160508; overflow: hidden;
        }
        .cc-op-vid {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
        }
        .cc-op-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%);
          pointer-events: none; z-index: 2;
        }
        .cc-op-tag {
          position: absolute; top: 8px; left: 8px; z-index: 5;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.36rem, 0.9vw, 0.48rem);
          font-weight: 700; letter-spacing: 3px;
          color: #000; background: #fde047; padding: 3px 8px; text-transform: uppercase;
        }
        .cc-op-play {
          position: absolute; bottom: 8px; right: 8px; z-index: 5;
          width: 32px; height: 32px; border-radius: 50%;
          background: #fde047;
          display: flex; align-items: center; justify-content: center;
        }
        .cc-op-scan {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 6;
          height: 2px; background: linear-gradient(90deg, #ff4444, #fde047);
          transform-origin: left;
        }
        .cc-op-tl {
          position: absolute; top: 0; left: 0; z-index: 4;
          width: 10px; height: 10px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
        }
        .cc-op-br {
          position: absolute; bottom: 0; right: 0; z-index: 4;
          width: 10px; height: 10px;
          border-bottom: 1px solid rgba(50,197,244,0.35);
          border-right: 1px solid rgba(50,197,244,0.35);
        }
        .cc-op-info {
          padding: 12px 14px;
          display: flex; align-items: center; justify-content: space-between;
          background: #160508;
          border-top: 1px solid rgba(253,224,71,0.05);
        }
        .cc-op-left { display: flex; align-items: center; gap: 10px; }
        .cc-op-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          color: rgba(253,224,71,0.18); line-height: 1; flex-shrink: 0;
        }
        .cc-op-lbl {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.36rem, 0.9vw, 0.48rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(253,224,71,0.6); text-transform: uppercase;
          display: block; margin-bottom: 2px;
        }
        .cc-op-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.9rem, 1.8vw, 1.1rem);
          letter-spacing: 2px; color: #fff; margin: 0; line-height: 1.1;
        }
        .cc-op-ext { color: rgba(255,255,255,0.3); transition: color 0.25s; }
        .cc-op-card:hover .cc-op-ext { color: #32c5f4; }

        /* Open Pannaa footer */
        .cc-op-footer {
          display: flex; align-items: center; flex-wrap: wrap;
          gap: 20px; padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .cc-op-logo-wrap {
          position: relative; flex-shrink: 0;
          width: 60px; height: 60px;
          display: flex; align-items: center; justify-content: center;
        }
        .cc-op-logo {
          width: 48px; height: 48px; object-fit: contain; border-radius: 50%;
          position: relative; z-index: 2;
        }
        .cc-op-logo-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px dashed rgba(253,224,71,0.25);
        }
        .cc-op-meta { flex: 1; min-width: 120px; }
        .cc-op-meta-over {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 0.9vw, 0.5rem);
          font-weight: 400; letter-spacing: 5px;
          color: rgba(255,255,255,0.4); text-transform: uppercase; display: block; margin-bottom: 4px;
        }
        .cc-op-meta-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.3rem, 3vw, 2rem);
          letter-spacing: 3px; color: #fff; margin: 0; line-height: 1;
        }
        .cc-op-socials { display: flex; gap: 8px; flex-wrap: wrap; flex-shrink: 0; }
        .cc-op-social {
          position: relative; overflow: hidden;
          width: 38px; height: 38px;
          border: 1px solid rgba(253,224,71,0.25);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.55); text-decoration: none;
          transition: color 0.3s;
        }
        .cc-op-social::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047; transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.32s cubic-bezier(0.77,0,0.18,1);
        }
        .cc-op-social:hover::before { transform: scaleX(1); }
        .cc-op-social:hover { color: #000; }
        .cc-op-social svg { position: relative; z-index: 1; }
        .cc-op-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 20px; padding: 12px 22px;
          border: 1px solid #fde047; color: #fde047;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.4rem, 1vw, 0.52rem);
          font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
          transition: color 0.3s;
        }
        .cc-op-cta-bg {
          position: absolute; inset: 0; background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .cc-op-cta:hover .cc-op-cta-bg { transform: scaleX(1); }
        .cc-op-cta:hover { color: #000; }
        .cc-op-cta span, .cc-op-cta svg { position: relative; z-index: 1; }

        /* ═══════════════════════════════════
           RJ PANEL
        ═══════════════════════════════════ */
        .cc-rj-stage {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 40px; align-items: center;
        }
        .cc-rj-card {
          position: relative; overflow: hidden;
          display: block; text-decoration: none;
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.3s;
        }
        .cc-rj-card:hover { border-color: rgba(50,197,244,0.22); }
        .cc-rj-img {
          width: 100%; aspect-ratio: 16/9;
          object-fit: cover; display: block;
          filter: grayscale(0.3);
          transition: transform 0.55s, filter 0.45s;
        }
        .cc-rj-card:hover .cc-rj-img { transform: scale(1.05); filter: grayscale(0); }
        .cc-rj-strip {
          position: absolute; bottom: 0; left: 0; right: 0;
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          background: rgba(8,13,21,0.93);
          border-top: 1px solid rgba(50,197,244,0.07);
          z-index: 4;
        }
        .cc-rj-strip-l { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .cc-rj-on-air {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 1vw, 0.5rem);
          font-weight: 400; letter-spacing: 3px;
          color: rgba(255,255,255,0.5); text-transform: uppercase;
        }
        .cc-rj-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ff3333; box-shadow: 0 0 7px rgba(255,51,51,0.8);
          animation: ccDot 1s step-end infinite;
        }
        .cc-rj-strip-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.7rem, 1.8vw, 0.95rem);
          letter-spacing: 3px; color: rgba(255,255,255,0.8); flex: 1;
        }
        .cc-rj-hover {
          position: absolute; inset: 0; z-index: 5;
          background: rgba(0,0,0,0.78);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 10px;
          opacity: 0; transition: opacity 0.3s;
        }
        .cc-rj-card:hover .cc-rj-hover { opacity: 1; }
        .cc-rj-play-btn {
          width: 48px; height: 48px; border-radius: 50%;
          background: #fde047;
          display: flex; align-items: center; justify-content: center;
        }
        .cc-rj-hover-cta {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.8rem, 2vw, 0.95rem);
          letter-spacing: 5px; color: #fff;
        }
        .cc-rj-hover-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 0.9vw, 0.5rem);
          font-weight: 300; letter-spacing: 3px;
          color: rgba(255,255,255,0.4); text-transform: uppercase;
        }
        .cc-rj-wave {
          display: flex; align-items: center; gap: 3px;
          position: absolute; bottom: 44px; left: 14px; z-index: 3;
          pointer-events: none;
        }
        .cc-rj-wave-bar {
          width: 3px; border-radius: 2px;
          background: rgba(50,197,244,0.45);
          animation: ccWave 1.1s ease-in-out infinite;
        }
        @keyframes ccWave { 0%,100%{height:4px} 50%{height:18px} }

        .cc-rj-meta {
          display: flex; flex-direction: column;
          border: 1px solid rgba(50,197,244,0.07);
          background: #0d1220; align-self: stretch;
        }
        .cc-rj-meta-item {
          flex: 1; display: flex; flex-direction: column;
          align-items: flex-start; gap: 5px;
          padding: 20px 22px;
          border-bottom: 1px solid rgba(50,197,244,0.06);
        }
        .cc-rj-meta-item:last-child { border-bottom: none; }
        .cc-rj-meta-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          color: #32c5f4; line-height: 1; letter-spacing: 2px;
        }
        .cc-rj-meta-plus { font-size: 0.55em; vertical-align: super; color: #fde047; }
        .cc-rj-meta-lbl {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.38rem, 0.9vw, 0.5rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(255,255,255,0.4); text-transform: uppercase;
        }

        /* ═══════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════ */
        @media (max-width: 860px) {
          .cc-op-grid    { grid-template-columns: repeat(2, 1fr); }
          .cc-rj-stage   { grid-template-columns: 1fr; gap: 24px; }
          .cc-rj-meta    { flex-direction: row; }
          .cc-rj-meta-item { border-bottom: none; border-right: 1px solid rgba(50,197,244,0.06); }
          .cc-rj-meta-item:last-child { border-right: none; }
        }
        @media (max-width: 640px) {
          .cc-section { padding: 56px 0 72px; }
          .cc-tabs { grid-template-columns: 1fr; }
          .cc-tab  { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); flex-direction: row; align-items: center; gap: 14px; padding: 14px 16px; }
          .cc-tab:last-child { border-bottom: none; }
          .cc-tab::after { top: auto; bottom: 0; left: 0; right: auto; width: 100%; height: 2px; }
          .cc-tab-seq { display: none; }
          .cc-tab-sub { display: none; }
          .cc-op-grid { grid-template-columns: 1fr; }
          .cc-rj-meta { flex-direction: column; }
          .cc-rj-meta-item { border-right: none; border-bottom: 1px solid rgba(50,197,244,0.06); }
          .cc-rj-meta-item:last-child { border-bottom: none; }
          .cc-vj-ttotal { display: none; }
          .cc-header-rule { display: none; }
        }
        @media (max-width: 400px) {
          .cc-op-grid { gap: 12px; }
        }
      `}</style>

      <section className="cc-section">
        <div className="cc-inner">

          {/* ── HEADER ── */}
          <div className="cc-header" ref={headerRef}>
            <motion.div className="cc-header-rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div className="cc-header-mid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <span className="cc-overline">CINEMAPAYYAN INC</span>
              <h2 className="cc-heading">CINEMA <span>CHANNELS</span></h2>
            </motion.div>
            <motion.div className="cc-header-rule cc-header-rule--r"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ delay: 0.12, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>

          {/* ── 3-BOX TABS ── */}
          <motion.div className="cc-tabs"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {TABS.map((tab, i) => (
              <div
                key={tab.id}
                className={`cc-tab cc-tab--${tab.id}${activeTab === tab.id ? " cc-tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="cc-tab-seq">{String(i + 1).padStart(2, "0")}</span>
                <div className="cc-tab-icon">
                  {tab.id === "vj"         && <ClapperIcon size={18} />}
                  {tab.id === "openpannaa" && <YTIcon size={18} />}
                  {tab.id === "rj"         && <RadioMicIcon size={18} />}
                </div>
                <div className="cc-tab-text">
                  <span className="cc-tab-label">{tab.label}</span>
                  <span className="cc-tab-sub">{tab.sub}</span>
                </div>
                <div className="cc-tab-corner" />
              </div>
            ))}
          </motion.div>

          {/* ── CONTENT PANEL ── */}
          <div className="cc-panel">
            <AnimatePresence mode="wait">

              {/* ══ VJ PANEL ══ */}
              {activeTab === "vj" && (
                <motion.div key="vj"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="cc-vj-track-wrap"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <div className="cc-vj-track" ref={trackRef}>
                      {loopList.map((video, i) => {
                        const ri = i % TOTAL;
                        return (
                          <VJCard key={`${i}-${video.id}`} video={video} index={ri}
                            isActive={ri === vjActiveIndex}
                            onActivate={() => setVjActiveIndex(ri)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="cc-vj-ticker">
                    <div className="cc-vj-tbar">
                      <div className="cc-vj-tbar-fill" style={{ width: `${((vjActiveIndex + 1) / TOTAL) * 100}%` }} />
                    </div>
                    <div className="cc-vj-tpanel">
                      <span className="cc-vj-tidx">{String(vjActiveIndex + 1).padStart(2, "0")}</span>
                      <div className="cc-vj-tdiv" />
                      <div className="cc-vj-tinfo">
                        <span className="cc-vj-tname">{vjVideos[vjActiveIndex].title}</span>
                        <span className="cc-vj-trole">{vjVideos[vjActiveIndex].role}</span>
                      </div>
                      <span className="cc-vj-ttotal">/ {String(TOTAL).padStart(2, "0")}</span>
                    </div>
                    <div className="cc-vj-tbar cc-vj-tbar--r">
                      <div className="cc-vj-tbar-fill" style={{ width: `${((TOTAL - vjActiveIndex - 1) / TOTAL) * 100}%` }} />
                    </div>
                  </div>
                  <p className={`cc-vj-hint${isPaused ? " cc-vj-hint--paused" : ""}`}>
                    {isPaused ? "● PAUSED — HOVER TO PREVIEW" : "● AUTO SCROLLING — HOVER TO PAUSE"}
                  </p>
                </motion.div>
              )}

              {/* ══ OPEN PANNAA PANEL ══ */}
              {activeTab === "openpannaa" && (
                <motion.div key="openpannaa"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="cc-op-hero">
                    <img src={Images.openpanna} alt="Open Pannaa" className="cc-op-hero-img" />
                    <div className="cc-op-hero-vig" />
                    <div className="cc-op-hero-bar">
                      <div className="cc-op-hero-live">
                        <motion.div className="cc-op-hero-dot"
                          animate={{ opacity: [1, 0.15, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="cc-op-hero-lbl">CHANNEL</span>
                      </div>
                      <span className="cc-op-hero-title">OPEN PANNAA</span>
                      <span className="cc-op-hero-badge">FILM CRITICISM</span>
                    </div>
                  </div>

                  <div className="cc-op-grid">
                    {criticPreviews.map((item, i) => (
                      <CriticCard key={item.id} item={item} index={i} />
                    ))}
                  </div>

                  <div className="cc-op-footer">
                    <div className="cc-op-logo-wrap">
                      <img src={Images.OpenPannaimg} alt="Open Pannaa" className="cc-op-logo" />
                      <motion.div className="cc-op-logo-ring"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <div className="cc-op-meta">
                      <span className="cc-op-meta-over">FILM CRITICISM · REVIEWS · ANALYSIS</span>
                      <h3 className="cc-op-meta-name">OPEN PANNAA</h3>
                    </div>
                    <div className="cc-op-socials">
                      {socialLinks.map(({ icon: Icon, href, label }) => (
                        <a key={label} href={href} target="_blank" rel="noreferrer"
                          className="cc-op-social" aria-label={label}>
                          <Icon size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                  <a href="https://youtube.com/@OpenPannaa" target="_blank" rel="noreferrer" className="cc-op-cta">
                    <div className="cc-op-cta-bg" />
                    <span>WATCH ALL REVIEWS</span>
                    <ExternalLink size={12} />
                  </a>
                </motion.div>
              )}

              {/* ══ RJ PANEL ══ */}
              {activeTab === "rj" && (
                <motion.div key="rj"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="cc-rj-stage">
                    <a href="https://soundcloud.com/rj-abishek" target="_blank" rel="noreferrer" className="cc-rj-card">
                      <img src={Images.AbishakeAudio} alt="RJ Archive" className="cc-rj-img" />
                      <div className="cc-rj-strip">
                        <div className="cc-rj-strip-l">
                          <span className="cc-rj-on-air">ON AIR</span>
                          <div className="cc-rj-dot" />
                        </div>
                        <span className="cc-rj-strip-title">RJ ABISHEK · ARCHIVES</span>
                        <ExternalLink size={12} style={{ color: "rgba(255,255,255,0.28)", flexShrink: 0 }} />
                      </div>
                      <div className="cc-rj-hover">
                        <div className="cc-rj-play-btn"><Play fill="black" size={18} /></div>
                        <span className="cc-rj-hover-cta">LISTEN TO ALL EPISODES</span>
                        <span className="cc-rj-hover-sub">SOUNDCLOUD ARCHIVES</span>
                      </div>
                      <div className="cc-rj-wave">
                        {Array.from({ length: 22 }).map((_, i) => (
                          <div key={i} className="cc-rj-wave-bar"
                            style={{ animationDelay: `${i * 0.07}s`, height: `${4 + Math.random() * 14}px` }}
                          />
                        ))}
                      </div>
                    </a>

                    <div className="cc-rj-meta">
                      <div className="cc-rj-meta-item">
                        <span className="cc-rj-meta-num">100<span className="cc-rj-meta-plus">+</span></span>
                        <span className="cc-rj-meta-lbl">EPISODES</span>
                      </div>
                      <div className="cc-rj-meta-item">
                        <span className="cc-rj-meta-num">FM</span>
                        <span className="cc-rj-meta-lbl">BROADCAST</span>
                      </div>
                      <div className="cc-rj-meta-item">
                        <span className="cc-rj-meta-num">∞</span>
                        <span className="cc-rj-meta-lbl">ON DEMAND</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  );
};

export default CinemaChannels;
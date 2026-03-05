import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Mic2, Tv, ExternalLink } from "lucide-react";
import { Images, VideoAssets } from "./assets/assets";

/* ─── Data ─────────────────────────────────── */
const vjVideos = [
  { id: 1,  title: "Anirudh Ravichander", role: "Composer · Producer",       link: "https://youtu.be/dESRRC-uVME",  preview: VideoAssets.vjPreviews[0], thumb: Images.ScreenshotAR  },
  { id: 2,  title: "Venkat Prabhu",       role: "Director · Actor",          link: "https://youtu.be/lAH_99cCcos", preview: VideoAssets.vjPreviews[1], thumb: Images.ScreenshotVP  },
  { id: 3,  title: "Silambarasan TR",     role: "Actor",                     link: "https://youtu.be/GKHk7d_bQh0", preview: VideoAssets.vjPreviews[2], thumb: Images.ScreenshotSTR },
  { id: 4,  title: "Vijay Sethupathi",    role: "Actor · Producer",          link: "https://youtu.be/77oGSFHYzSY", preview: VideoAssets.vjPreviews[3], thumb: Images.ScreenshotVJS },
  { id: 5,  title: "Arjun DAS",           role: "Actor",                     link: "https://youtu.be/fEpt5b794ys", preview: VideoAssets.vjPreviews[4], thumb: Images.ScreenshotAD  },
  { id: 6,  title: "T. Kumararaja",       role: "Director · Writer",         link: "https://youtu.be/BBnY5tE7-Wo", preview: VideoAssets.vjPreviews[5], thumb: Images.ScreenshotTK  },
  { id: 7,  title: "Kamal Haasan",        role: "Actor · Director · Legend", link: "https://youtube.com/link7",    preview: VideoAssets.vjPreviews[6], thumb: Images.ScreenshotKH  },
  { id: 8,  title: "Dulquer Salmaan",     role: "Actor · Producer",          link: "https://youtu.be/JzsDo_hf5cg", preview: VideoAssets.vjPreviews[7], thumb: Images.ScreenshotDQ  },
  { id: 9,  title: "GVM",                 role: "Director · Visionary",      link: "https://youtu.be/hKbP91H0_Do", preview: VideoAssets.vjPreviews[8], thumb: Images.ScreenshotGVM },
  { id: 10, title: "Ashok Selvan",        role: "Actor",                     link: "https://youtu.be/uXQOlL7EjzA", preview: VideoAssets.vjPreviews[9], thumb: Images.ScreenshotAS  },
];

/* ─── Single Card ───────────────────────────── */
function VJCard({
  video,
  isActive,
  onActivate,
}: {
  video: typeof vjVideos[0];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered || isActive) {
      v.muted = true;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered, isActive]);

  const showVideo = hovered || isActive;

  return (
    <div
      className={`vjl-card ${isActive ? "vjl-card--active" : ""}`}
      onMouseEnter={() => { setHovered(true); onActivate(); }}
      onMouseLeave={() => setHovered(false)}
      onClick={onActivate}
    >
      <div className="vjl-media">
        <img
          src={video.thumb}
          alt={video.title}
          className={`vjl-thumb ${showVideo ? "vjl-thumb--hidden" : ""}`}
        />
        <video
          ref={videoRef}
          src={video.preview}
          className={`vjl-video ${showVideo ? "vjl-video--show" : ""}`}
          muted loop playsInline preload="none"
        />
        <div className="vjl-overlay" />
        <div className="vjl-num-tag">{String(video.id).padStart(2, "0")}</div>
        <a
          href={video.link}
          target="_blank"
          rel="noreferrer"
          className={`vjl-play ${showVideo ? "vjl-play--show" : ""}`}
          onClick={e => e.stopPropagation()}
        >
          <Play fill="black" size={16} />
        </a>
        <div className={`vjl-active-bar ${isActive ? "vjl-active-bar--on" : ""}`} />
      </div>

      <div className="vjl-info">
        <div className="vjl-info-row">
          <span className="vjl-session-lbl">SESSION {String(video.id).padStart(2, "0")}</span>
          <ExternalLink size={12} className="vjl-ext" />
        </div>
        <h4 className="vjl-title">{video.title}</h4>
        <span className="vjl-role">{video.role}</span>
      </div>
    </div>
  );
}

/* ─── Main ──────────────────────────────────── */
const AboutWork = () => {
  const vjHeaderRef = useRef<HTMLDivElement>(null);
  const rjHeaderRef = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const vjInView    = useInView(vjHeaderRef, { once: true, amount: 0.4 });
  const rjInView    = useInView(rjHeaderRef, { once: true, amount: 0.4 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused,    setIsPaused]    = useState(false);

  const CARD_W    = 400;
  const CARD_GAP  = 20;
  const CARD_STEP = CARD_W + CARD_GAP;
  const TOTAL     = vjVideos.length;
  const SET_W     = TOTAL * CARD_STEP;

  const loopList = [...vjVideos, ...vjVideos, ...vjVideos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = SET_W;

    let raf: number;
    const speed = 0.7;

    const tick = () => {
      if (!isPaused && track) {
        track.scrollLeft += speed;
        if (track.scrollLeft >= SET_W * 2) track.scrollLeft -= SET_W;
        if (track.scrollLeft < SET_W)      track.scrollLeft += SET_W;
        const posInSet = (track.scrollLeft - SET_W) % SET_W;
        const idx = Math.round(posInSet / CARD_STEP) % TOTAL;
        setActiveIndex(idx);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, SET_W, CARD_STEP, TOTAL]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;0,800;1,700;1,800&display=swap');

        /* ══════════════════════════════════════════
           SECTION SHELL
        ══════════════════════════════════════════ */
        .vjl-section {
          background: #000;
          padding: 90px 0 100px;
          overflow: hidden;
          position: relative;
        }
        .vjl-section::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 50%, transparent);
        }

        /* ══════════════════════════════════════════
           SECTION HEADER
        ══════════════════════════════════════════ */
        .vjl-header {
          display: flex; align-items: center; gap: 20px;
          padding: 0 clamp(20px,6%,60px);
          margin-bottom: 48px;
        }
        .vjl-header-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.4));
          transform-origin: left;
        }
        .vjl-header-rule--r {
          background: linear-gradient(90deg, rgba(50,197,244,0.35), transparent);
          transform-origin: right;
        }
        .vjl-header-content {
          display: flex; align-items: center;
          gap: 14px; flex-shrink: 0;
        }
        .vjl-header-icon {
          width: 38px; height: 38px;
          border: 1px solid rgba(253,224,71,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #fde047; flex-shrink: 0;
        }
        .vjl-header-icon.cyan { border-color: rgba(50,197,244,0.3); color: #32c5f4; }

        .vjl-overline {
          display: block;
          font-family: 'Courier New', monospace;
          font-size: clamp(0.55rem, 1.8vw, 0.68rem);
          letter-spacing: 5px; color: rgba(255,255,255,0.45);
          text-transform: uppercase; margin-bottom: 4px;
        }
        .vjl-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 4vw, 2.8rem);
          font-weight: 800; font-style: italic;
          color: #fff; line-height: 1; margin: 0;
        }
        .vjl-heading-yellow { color: #fde047; font-style: normal; }
        .vjl-heading-cyan   { color: #32c5f4; font-style: normal; }

        .vjl-ep-count {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800; color: rgba(253,224,71,0.25);
          line-height: 1; flex-shrink: 0;
        }
        .vjl-ep-lbl {
          display: block;
          font-family: 'Courier New', monospace;
          font-size: clamp(0.55rem, 1.2vw, 0.65rem);
          letter-spacing: 4px; color: rgba(255,255,255,0.45);
          text-transform: uppercase;
        }

        /* ══════════════════════════════════════════
           LOOP TRACK
        ══════════════════════════════════════════ */
        .vjl-track-wrap {
          position: relative;
        }
        .vjl-track-wrap::before,
        .vjl-track-wrap::after {
          content: '';
          position: absolute; top: 0; bottom: 0; width: 140px;
          z-index: 5; pointer-events: none;
        }
        .vjl-track-wrap::before {
          left: 0;
          background: linear-gradient(to right, #000, transparent);
        }
        .vjl-track-wrap::after {
          right: 0;
          background: linear-gradient(to left, #000, transparent);
        }

        .vjl-track {
          display: flex;
          gap: 20px;
          overflow-x: scroll;
          scrollbar-width: none;
          padding: 20px 140px 24px;
        }
        .vjl-track::-webkit-scrollbar { display: none; }

        /* ══════════════════════════════════════════
           CARD
        ══════════════════════════════════════════ */
        .vjl-card {
          flex: 0 0 400px;
          background: rgba(10,10,10,0.9);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: border-color 0.35s, transform 0.4s, box-shadow 0.4s;
          position: relative;
        }
        .vjl-card:hover,
        .vjl-card--active {
          border-color: rgba(253,224,71,0.25);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.7);
        }

        .vjl-media {
          position: relative;
          width: 100%; aspect-ratio: 16/9;
          overflow: hidden; background: #0a0a0a;
        }
        .vjl-thumb, .vjl-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .vjl-thumb { transition: opacity 0.4s; opacity: 1; }
        .vjl-thumb--hidden { opacity: 0; }
        .vjl-video { opacity: 0; transition: opacity 0.4s; }
        .vjl-video--show { opacity: 1; }

        .vjl-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 35%,
            rgba(0,0,0,0.45) 65%,
            rgba(0,0,0,0.88) 100%
          );
          z-index: 2; pointer-events: none;
        }

        .vjl-num-tag {
          position: absolute; top: 8px; left: 10px; z-index: 4;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem; font-weight: 800; font-style: italic;
          color: rgba(253,224,71,0.15); line-height: 1;
          user-select: none;
        }

        .vjl-play {
          position: absolute; bottom: 12px; right: 12px; z-index: 5;
          width: 42px; height: 42px; border-radius: 50%;
          background: #fde047;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          opacity: 0; transform: scale(0.7);
          transition: opacity 0.3s, transform 0.3s;
        }
        .vjl-play--show { opacity: 1; transform: scale(1); }

        .vjl-active-bar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 6;
          height: 2px;
          background: linear-gradient(90deg, #fde047, #32c5f4);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s ease;
        }
        .vjl-active-bar--on { transform: scaleX(1); }

        .vjl-info {
          padding: 14px 16px 16px;
          background: rgba(0,0,0,0.9);
        }
        .vjl-info-row {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .vjl-session-lbl {
          font-family: 'Courier New', monospace;
          font-size: 0.6rem; letter-spacing: 4px;
          color: rgba(253,224,71,0.75);
          text-transform: uppercase;
        }
        .vjl-ext {
          color: rgba(255,255,255,0.25); flex-shrink: 0;
          transition: color 0.3s;
        }
        .vjl-card:hover .vjl-ext { color: #32c5f4; }

        .vjl-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.1rem, 2.2vw, 1.3rem);
          font-weight: 800; font-style: italic;
          color: #fff; margin: 0 0 5px; line-height: 1.2;
        }
        .vjl-role {
          font-family: 'Courier New', monospace;
          font-size: 0.55rem; letter-spacing: 3px;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase; display: block;
        }
        .vjl-card:hover .vjl-role { color: rgba(50,197,244,0.75); }

        /* ══════════════════════════════════════════
           DESKTOP INDICATOR
           Filmstrip ticker bar — name + dual progress.
           No arrows. No dots.
        ══════════════════════════════════════════ */
        .vjl-ticker {
          display: flex;
          align-items: center;
          gap: 0;
          margin-top: 32px;
          padding: 0 clamp(20px,6%,60px);
        }

        .vjl-ticker-bar {
          flex: 1; height: 2px;
          background: rgba(255,255,255,0.06);
          position: relative; overflow: hidden;
        }
        .vjl-ticker-bar-fill {
          position: absolute; top: 0; left: 0; height: 100%;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          transition: width 0.5s cubic-bezier(0.77,0,0.18,1);
        }

        .vjl-ticker-panel {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 16px;
          padding: 0 28px;
          border-left: 1px solid rgba(255,255,255,0.08);
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .vjl-ticker-idx {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.8rem; font-weight: 800; font-style: italic;
          color: rgba(253,224,71,0.9); line-height: 1;
          min-width: 52px; text-align: right;
        }
        .vjl-ticker-divider {
          width: 1px; height: 36px;
          background: rgba(255,255,255,0.1);
        }
        .vjl-ticker-info {
          display: flex; flex-direction: column; gap: 4px;
        }
        .vjl-ticker-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.05rem; font-weight: 800; font-style: italic;
          color: #fff; line-height: 1;
        }
        .vjl-ticker-role {
          font-family: 'Courier New', monospace;
          font-size: 0.55rem; letter-spacing: 3px;
          color: rgba(50,197,244,0.8); text-transform: uppercase;
        }
        .vjl-ticker-total {
          font-family: 'Courier New', monospace;
          font-size: 0.6rem; letter-spacing: 3px;
          color: rgba(255,255,255,0.22); text-transform: uppercase;
          flex-shrink: 0; padding-left: 16px;
          align-self: center;
        }

        .vjl-ticker-bar--r .vjl-ticker-bar-fill {
          background: linear-gradient(90deg, #fde047, transparent);
        }

        .vjl-pause-hint {
          font-family: 'Courier New', monospace;
          font-size: 0.6rem; letter-spacing: 4px;
          color: rgba(255,255,255,0.2); text-transform: uppercase;
          text-align: center; margin-top: 14px;
          transition: color 0.3s;
        }
        .vjl-pause-hint.paused { color: rgba(253,224,71,0.6); }

        /* ══════════════════════════════════════════
           MOBILE INDICATOR
           Vertical filmstrip reel with sprocket holes.
           Shown only on ≤640px.
        ══════════════════════════════════════════ */
        .vjl-mobile-reel {
          display: none;
          margin-top: 28px;
          padding: 0 20px;
        }

        .vjl-reel-strip {
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(8,8,8,0.95);
          overflow: hidden;
        }

        /* sprocket hole rows top/bottom */
        .vjl-reel-holes {
          height: 16px;
          background-image: radial-gradient(circle, rgba(253,224,71,0.4) 38%, transparent 42%);
          background-size: 30px 16px;
          background-repeat: repeat-x;
          background-position: 6px center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .vjl-reel-holes--bot {
          border-bottom: none;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .vjl-reel-list { padding: 2px 0; }

        .vjl-reel-row {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          position: relative;
          transition: background 0.25s;
        }
        .vjl-reel-row:last-child { border-bottom: none; }
        .vjl-reel-row--active {
          background: rgba(253,224,71,0.04);
        }

        /* yellow left accent on active */
        .vjl-reel-row--active::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #fde047, #32c5f4);
        }

        /* film frame number box */
        .vjl-reel-frame {
          width: 30px; height: 20px; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Courier New', monospace;
          font-size: 0.5rem; letter-spacing: 1px;
          color: rgba(255,255,255,0.2);
          transition: border-color 0.3s, color 0.3s;
        }
        .vjl-reel-row--active .vjl-reel-frame {
          border-color: rgba(253,224,71,0.5);
          color: #fde047;
        }

        .vjl-reel-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.95rem; font-weight: 800; font-style: italic;
          color: rgba(255,255,255,0.3); flex: 1; line-height: 1;
          transition: color 0.3s;
        }
        .vjl-reel-row--active .vjl-reel-name { color: #fff; }

        /* blinking REC dot on active row */
        .vjl-reel-rec {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ff3333;
          box-shadow: 0 0 6px rgba(255,51,51,0.8);
          flex-shrink: 0;
          opacity: 0;
          animation: vjlRecBlink 1s step-end infinite;
        }
        .vjl-reel-row--active .vjl-reel-rec { opacity: 1; }
        @keyframes vjlRecBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ══════════════════════════════════════════
           RJ BLOCK
        ══════════════════════════════════════════ */
        .vjl-rj-block {
          margin-top: 100px;
          padding: 0 clamp(20px,6%,60px);
        }

        .vjl-rj-stage {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px; align-items: center;
          margin-top: 48px;
        }

        .vjl-rj-card {
          position: relative; overflow: hidden;
          display: block; text-decoration: none;
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.35s;
        }
        .vjl-rj-card:hover { border-color: rgba(50,197,244,0.25); }

        .vjl-rj-img {
          width: 100%; aspect-ratio: 16/9;
          object-fit: cover; display: block;
          filter: grayscale(0.3);
          transition: transform 0.6s, filter 0.5s;
        }
        .vjl-rj-card:hover .vjl-rj-img {
          transform: scale(1.05); filter: grayscale(0);
        }

        .vjl-rj-strip {
          position: absolute; bottom: 0; left: 0; right: 0;
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          background: rgba(0,0,0,0.82);
          border-top: 1px solid rgba(255,255,255,0.06);
          z-index: 4;
        }
        .vjl-rj-strip-left {
          display: flex; align-items: center; gap: 7px; flex-shrink: 0;
        }
        .vjl-rj-on-air {
          font-family: 'Courier New', monospace;
          font-size: 0.58rem; letter-spacing: 3px;
          color: rgba(255,255,255,0.55); text-transform: uppercase;
        }
        .vjl-rj-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ff3333;
          box-shadow: 0 0 8px rgba(255,51,51,0.8); flex-shrink: 0;
          animation: vjlRec 1s step-end infinite;
        }
        @keyframes vjlRec { 0%,100%{opacity:1} 50%{opacity:0} }
        .vjl-rj-strip-title {
          font-family: 'Courier New', monospace;
          font-size: 0.6rem; letter-spacing: 4px;
          color: rgba(255,255,255,0.75); text-transform: uppercase; flex: 1;
        }
        .vjl-rj-strip-icon { color: rgba(255,255,255,0.3); flex-shrink: 0; }

        .vjl-rj-hover {
          position: absolute; inset: 0; z-index: 5;
          background: rgba(0,0,0,0.78);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 12px;
          opacity: 0; transition: opacity 0.35s;
        }
        .vjl-rj-card:hover .vjl-rj-hover { opacity: 1; }
        .vjl-rj-play-btn {
          width: 52px; height: 52px; border-radius: 50%;
          background: #fde047;
          display: flex; align-items: center; justify-content: center;
        }
        .vjl-rj-hover-cta {
          font-family: 'Courier New', monospace;
          font-size: 0.62rem; letter-spacing: 4px;
          color: #fff; text-transform: uppercase;
        }
        .vjl-rj-hover-sub {
          font-family: 'Courier New', monospace;
          font-size: 0.52rem; letter-spacing: 3px;
          color: rgba(255,255,255,0.45); text-transform: uppercase;
        }

        .vjl-rj-wave {
          display: flex; align-items: center; gap: 3px;
          position: absolute; bottom: 52px; left: 16px; z-index: 3;
          pointer-events: none;
        }
        .vjl-rj-wave-bar {
          width: 3px; border-radius: 2px;
          background: rgba(50,197,244,0.5);
          animation: vjlWave 1.1s ease-in-out infinite;
        }
        @keyframes vjlWave { 0%,100%{height:4px} 50%{height:20px} }

        .vjl-rj-meta {
          display: flex; flex-direction: column;
          gap: 0;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          align-self: stretch;
        }
        .vjl-rj-meta-item {
          flex: 1; display: flex; flex-direction: column;
          align-items: flex-start; gap: 6px;
          padding: 22px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .vjl-rj-meta-item:last-child { border-bottom: none; }
        .vjl-rj-meta-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800; color: #32c5f4; line-height: 1;
        }
        .vjl-rj-meta-plus { font-size: 0.6em; vertical-align: super; color: #fde047; }
        .vjl-rj-meta-lbl {
          font-family: 'Courier New', monospace;
          font-size: 0.58rem; letter-spacing: 4px;
          color: rgba(255,255,255,0.45); text-transform: uppercase;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 900px) {
          .vjl-rj-stage { grid-template-columns: 1fr; gap: 32px; }
          .vjl-rj-meta  { flex-direction: row; }
          .vjl-rj-meta-item { border-bottom: none; border-right: 1px solid rgba(255,255,255,0.07); }
          .vjl-rj-meta-item:last-child { border-right: none; }
        }

        @media (max-width: 640px) {
          .vjl-section  { padding: 70px 0 80px; }
          .vjl-header   { flex-direction: column; align-items: flex-start; gap: 10px; }
          .vjl-header-rule { display: none; }
          .vjl-track    { padding: 16px 40px 20px; gap: 12px; }
          .vjl-track-wrap::before,
          .vjl-track-wrap::after { width: 40px; }
          .vjl-card     { flex: 0 0 300px; }
          .vjl-rj-block { padding: 0 16px; }
          .vjl-rj-meta  { flex-direction: column; }
          .vjl-rj-meta-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .vjl-rj-meta-item:last-child { border-bottom: none; }

          /* hide desktop ticker on mobile */
          .vjl-ticker     { display: none; }
          .vjl-pause-hint { display: none; }

          /* show mobile reel */
          .vjl-mobile-reel { display: block; }
        }
      `}</style>

      <section className="vjl-section">

        {/* ══ VJ SESSIONS ═══════════════════════ */}
        <div>
          <div className="vjl-header" ref={vjHeaderRef}>
            <motion.div className="vjl-header-rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: vjInView ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.76,0,0.24,1] }}
            />
            <motion.div className="vjl-header-content"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: vjInView ? 1 : 0, y: vjInView ? 0 : 18 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="vjl-header-icon"><Tv size={18} /></div>
              <div>
                <span className="vjl-overline">CURATED CONVERSATIONS</span>
                <h2 className="vjl-heading">
                  VJ <span className="vjl-heading-yellow">SESSIONS</span>
                </h2>
              </div>
              <div style={{ marginLeft: 12 }}>
                <span className="vjl-ep-count">10</span>
                <span className="vjl-ep-lbl">EPISODES</span>
              </div>
            </motion.div>
            <motion.div className="vjl-header-rule vjl-header-rule--r"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: vjInView ? 1 : 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.76,0,0.24,1] }}
            />
          </div>

          {/* ── INFINITE LOOP TRACK ── */}
          <div
            className="vjl-track-wrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="vjl-track" ref={trackRef}>
              {loopList.map((video, i) => {
                const realIndex = i % TOTAL;
                return (
                  <VJCard
                    key={`${i}-${video.id}`}
                    video={video}
                    index={realIndex}
                    isActive={realIndex === activeIndex}
                    onActivate={() => setActiveIndex(realIndex)}
                  />
                );
              })}
            </div>
          </div>

          {/* ── DESKTOP: ticker only, no arrows/dots ── */}
          <div className="vjl-ticker">
            <div className="vjl-ticker-bar">
              <div
                className="vjl-ticker-bar-fill"
                style={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
              />
            </div>

            <div className="vjl-ticker-panel">
              <span className="vjl-ticker-idx">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div className="vjl-ticker-divider" />
              <div className="vjl-ticker-info">
                <span className="vjl-ticker-name">{vjVideos[activeIndex].title}</span>
                <span className="vjl-ticker-role">{vjVideos[activeIndex].role}</span>
              </div>
              <span className="vjl-ticker-total">/ {String(TOTAL).padStart(2, "0")}</span>
            </div>

            <div className="vjl-ticker-bar vjl-ticker-bar--r">
              <div
                className="vjl-ticker-bar-fill"
                style={{ width: `${((TOTAL - activeIndex - 1) / TOTAL) * 100}%` }}
              />
            </div>
          </div>

          <p className={`vjl-pause-hint ${isPaused ? "paused" : ""}`}>
            {isPaused ? "● PAUSED — HOVER TO PREVIEW" : "● AUTO SCROLLING — HOVER TO PAUSE"}
          </p>

          {/* ── MOBILE: vertical filmstrip reel ── */}
          <div className="vjl-mobile-reel">
            <div className="vjl-reel-strip">
              <div className="vjl-reel-holes" />
              <div className="vjl-reel-list">
                {vjVideos.map((v, i) => (
                  <div
                    key={v.id}
                    className={`vjl-reel-row ${i === activeIndex ? "vjl-reel-row--active" : ""}`}
                  >
                    <div className="vjl-reel-frame">{String(v.id).padStart(2, "0")}</div>
                    <span className="vjl-reel-name">{v.title}</span>
                    <div className="vjl-reel-rec" />
                  </div>
                ))}
              </div>
              <div className="vjl-reel-holes vjl-reel-holes--bot" />
            </div>
          </div>
        </div>

        {/* ══ RJ ARCHIVES ═══════════════════════ */}
        <div className="vjl-rj-block">
          <div className="vjl-header" ref={rjHeaderRef}>
            <motion.div className="vjl-header-rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: rjInView ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.76,0,0.24,1] }}
            />
            <motion.div className="vjl-header-content"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: rjInView ? 1 : 0, y: rjInView ? 0 : 18 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="vjl-header-icon cyan"><Mic2 size={18} /></div>
              <div>
                <span className="vjl-overline">BROADCAST ARCHIVES</span>
                <h2 className="vjl-heading">
                  RJ <span className="vjl-heading-cyan">ARCHIVES</span>
                </h2>
              </div>
            </motion.div>
            <motion.div className="vjl-header-rule vjl-header-rule--r"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: rjInView ? 1 : 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.76,0,0.24,1] }}
            />
          </div>

          <motion.div className="vjl-rj-stage"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            <a href="https://soundcloud.com/rj-abishek" target="_blank" rel="noreferrer" className="vjl-rj-card">
              <img src={Images.AbishakeAudio} alt="RJ Archive" className="vjl-rj-img" />
              <div className="vjl-rj-strip">
                <div className="vjl-rj-strip-left">
                  <span className="vjl-rj-on-air">ON AIR</span>
                  <div className="vjl-rj-dot" />
                </div>
                <span className="vjl-rj-strip-title">RJ ABISHEK · ARCHIVES</span>
                <ExternalLink size={13} className="vjl-rj-strip-icon" />
              </div>
              <div className="vjl-rj-hover">
                <div className="vjl-rj-play-btn"><Play fill="black" size={20} /></div>
                <span className="vjl-rj-hover-cta">LISTEN TO ALL EPISODES</span>
                <span className="vjl-rj-hover-sub">SOUNDCLOUD ARCHIVES</span>
              </div>
              <div className="vjl-rj-wave">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="vjl-rj-wave-bar"
                    style={{ animationDelay: `${i * 0.07}s`, height: `${4 + Math.random() * 16}px` }}
                  />
                ))}
              </div>
            </a>

            <div className="vjl-rj-meta">
              <div className="vjl-rj-meta-item">
                <span className="vjl-rj-meta-num">100<span className="vjl-rj-meta-plus">+</span></span>
                <span className="vjl-rj-meta-lbl">EPISODES</span>
              </div>
              <div className="vjl-rj-meta-item">
                <span className="vjl-rj-meta-num">FM</span>
                <span className="vjl-rj-meta-lbl">BROADCAST</span>
              </div>
              <div className="vjl-rj-meta-item">
                <span className="vjl-rj-meta-num">∞</span>
                <span className="vjl-rj-meta-lbl">ON DEMAND</span>
              </div>
            </div>
          </motion.div>
        </div>

      </section>
    </>
  );
};

export default AboutWork;
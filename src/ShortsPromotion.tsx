import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { VideoAssets, Images } from "./assets/assets";

/* ─────────────────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────────────────── */
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   MOBILE AUTO-SCROLL CAROUSEL
───────────────────────────────────────────────────────── */
interface CarouselItem {
  id: number;
  tag?: string;
  title: string;
  link: string;
  aspect?: "16/9" | "9/16";
}

const MobileCarousel: React.FC<{ items: CarouselItem[]; label: string }> = ({ items, label }) => {
  const trackRef  = useRef<HTMLDivElement>(null);
  const posRef    = useRef(0);
  const velRef    = useRef(0);
  const rafRef    = useRef<number>(0);
  const dragging  = useRef(false);
  const dragStart = useRef(0);
  const posStart  = useRef(0);
  const lastX     = useRef(0);
  const lastT     = useRef(0);
  const didDrag   = useRef(false);

  const CARD_W  = items[0]?.aspect === "9/16" ? 122 : 192;
  const SPEED   = 0.5;
  const LOOP_W  = items.length * CARD_W;
  const tripled = [...items, ...items, ...items];

  const applyTransform = () => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
  };

  useEffect(() => {
    posRef.current = LOOP_W;
    applyTransform();
    const step = () => {
      if (!dragging.current) {
        if (Math.abs(velRef.current) > 0.05) { velRef.current *= 0.92; posRef.current += velRef.current; }
        else { velRef.current = 0; posRef.current += SPEED; }
        if (posRef.current >= LOOP_W * 2) posRef.current -= LOOP_W;
        if (posRef.current <  LOOP_W)     posRef.current += LOOP_W;
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items, LOOP_W]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true; didDrag.current = false;
    dragStart.current = e.clientX; posStart.current = posRef.current;
    lastX.current = e.clientX; lastT.current = Date.now(); velRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    const now = Date.now(); const dt = Math.max(1, now - lastT.current);
    velRef.current = ((lastX.current - e.clientX) / dt) * 16;
    lastX.current = e.clientX; lastT.current = now;
    posRef.current = posStart.current - dx;
    if (posRef.current >= LOOP_W * 2) posRef.current -= LOOP_W;
    if (posRef.current <  LOOP_W)     posRef.current += LOOP_W;
    applyTransform();
  };
  const onPointerUp = () => { dragging.current = false; };
  const onLinkClick = (e: React.MouseEvent) => { if (didDrag.current) e.preventDefault(); };

  return (
    <div className="cp-mob-carousel-wrap">
      <div className="cp-mob-carousel-label-row">
        <div className="cp-mob-carousel-label-line" />
        <span className="cp-mob-carousel-label-text">{label}</span>
        <div className="cp-mob-carousel-label-line" />
      </div>
      <div className="cp-mob-carousel-window"
        onPointerDown={onPointerDown} onPointerMove={onPointerMove}
        onPointerUp={onPointerUp} onPointerLeave={onPointerUp}
        style={{ cursor: dragging.current ? "grabbing" : "grab", touchAction: "pan-y" }}
      >
        <div className="cp-mob-carousel-track" ref={trackRef}>
          {tripled.map((item, idx) => (
            <a key={`${item.id}-${idx}`} href={item.link} target="_blank" rel="noreferrer"
              draggable={false} onClick={onLinkClick}
              className={`cp-mob-card ${item.aspect === "9/16" ? "cp-mob-card--portrait" : "cp-mob-card--landscape"}`}
            >
              <video autoPlay muted loop playsInline className="cp-mob-card-vid">
                <source src={VideoAssets.vjPreviews[item.id]} type="video/mp4" />
              </video>
              <div className="cp-mob-card-grad" />
              {item.tag && <span className="cp-mob-card-tag">{item.tag}</span>}
              <p className="cp-mob-card-title">{item.title}</p>
            </a>
          ))}
        </div>
        <div className="cp-mob-fade cp-mob-fade--left"  />
        <div className="cp-mob-fade cp-mob-fade--right" />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
const ShortsPromotion: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide,   setPrevSlide]   = useState(0);

  const goTo = (i: number) => { setPrevSlide(activeSlide); setActiveSlide(i); };
  const dir = activeSlide > prevSlide ? 1 : -1;

  /* ── DATA ── */

  // Slide 0 — YT grid (Mood of Iraivan replaces Amazon Prime; Amazon Prime moved below)
  const topYT: CarouselItem[] = [
    { id: 25, tag: "YT", title: "Naga Chaitanya tests Venkat Prabhu", link: "https://youtu.be/XbvzHgeK3VI?si=HeroAaf4kXPLaDLF", aspect: "16/9" },
    { id: 38, tag: "YT", title: "Venkat Parbu",                    link: "https://youtu.be/aHxx-NtpAwQ?si=hoArL4w8_2clt2O7 ", aspect: "16/9" },
    { id: 23, tag: "YT", title: "CUSTODY Game | CSK Vs SRH",          link: "https://youtu.be/aHxx-NtpAwQ?si=hoArL4w8_2clt2O7", aspect: "16/9" },
  ];

  // Events — removed KRR Countdown 2 (36); added 40, 41, 42
  const eventsReels: CarouselItem[] = [
    { id: 34, tag: "HOST",   title: "A Venkat Prabhu Forge",           link: "https://www.instagram.com/reel/DB_VDkiPnQN/?igsh=MnRzeGhlanBnbm51",          aspect: "9/16" },
    { id: 35, tag: "HOST",  title: "Kadhal Reset Repeat",             link: "https://www.instagram.com/reel/DVu87daiQWN/?igsh=cGFpYjFlb3E0ZGpk",          aspect: "9/16" },
    { id: 40, tag: "HOST", title: "Startda GVPrakash",               link: "https://www.instagram.com/reel/C3JxabMPy2y/?igsh=NmkyMTljMmQydGk4",           aspect: "9/16" },
    { id: 41, tag: "HOST", title: "#arugevaa with @rseanroldan",      link: "https://www.instagram.com/reel/C9t027wCW5b/?igsh=MTJmeTV6NHBtMzl4YQ==",       aspect: "9/16" },
    { id: 42, tag: "HOST", title: "#MoiVirundhu",                    link: "https://www.instagram.com/reel/DBEqOxGISiW/?igsh=MWE1a2NmNnhkdWQ0NQ==",       aspect: "9/16" },
    { id: 46,  tag: "HOST", title: "Madras Matniee",               link: "https://www.instagram.com/reel/DHDBqnoTWmu/?igsh=b3N4dW15cTEydGh5",                             aspect: "9/16" },

  ];

  // Countdown — removed PERSU Short (26); added 44, 36, 45
  const countdownReels: CarouselItem[] = [
    { id: 31,  tag: "RaguThatha",   title: "RaguThatha Countdown", link: "https://www.instagram.com/reel/C-hRTVyIwLj/",                                                    aspect: "9/16" },
    { id: 37,  tag: "DEAR",   title: "Dear",                 link: "https://www.instagram.com/reel/C5aVNAay_nG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", aspect: "9/16" },
    { id: 44,  tag: "Chithha",     title: "Chithha",             link: "https://www.instagram.com/reel/CxnLHbMS1GU/?igsh=MWpscTNpZ3pyaXI4bQ%3D%3D",                    aspect: "9/16" },
    { id: 36,  tag: "KRR",    title: "Kadhal Reset Repeat",  link: "https://www.instagram.com/reel/DVnrPw1iUSU/?igsh=ZWUzd2hkYzh5bDE1",                             aspect: "9/16" },
    { id: 45,  tag: "PERUSU", title: "Perusu",               link: "https://www.instagram.com/reel/DHDBqnoTWmu/?igsh=b3N4dW15cTEydGh5",                             aspect: "9/16" },
  ];

  // Tab labels — first tab renamed
  const slides = [
    { key: "specialty", label: "CINEMAPAYYAN SPECIALTY", sublabel: "YouTube"         },
    { key: "events",    label: "EVENTS",                  sublabel: "LIVE & SPECIAL"  },
    { key: "countdown", label: "COUNTDOWN SPECIALTY",     sublabel: "SIGNATURE FORMAT"},
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ══ ROOT ══ */
        .cp-sp-section {
          background:#060a0f; color:#fff;
          padding:100px 0 0; overflow:hidden; position:relative;
        }
        .cp-sp-top-fade {
          position:absolute; top:0; left:0; right:0; height:130px;
          background:linear-gradient(to bottom,rgba(14,10,4,0.45),transparent);
          pointer-events:none; z-index:1;
        }
        .cp-sp-glow-tl {
          position:absolute; top:-60px; left:-60px; width:480px; height:480px;
          background:radial-gradient(circle,rgba(50,197,244,0.06) 0%,transparent 65%);
          pointer-events:none; z-index:0;
        }
        .cp-sp-glow-br {
          position:absolute; bottom:-60px; right:-60px; width:420px; height:420px;
          background:radial-gradient(circle,rgba(253,224,71,0.04) 0%,transparent 65%);
          pointer-events:none; z-index:0;
        }
        .cp-sp-scanlines {
          position:absolute; inset:0;
          background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(50,197,244,0.012) 2px,rgba(50,197,244,0.012) 4px);
          pointer-events:none; z-index:0; opacity:0.5;
        }
        .cp-sp-section::after {
          content:'CP'; position:absolute; right:3%; bottom:-20px;
          font-size:22rem; color:rgba(50,197,244,0.018); font-family:serif; line-height:1;
          pointer-events:none; user-select:none; z-index:0;
        }
        .cp-sp-section::before {
          content:''; position:absolute; top:0; left:8%; right:8%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(50,197,244,0.12) 50%,transparent);
          pointer-events:none;
        }
        .cp-sp-section a { text-decoration:none !important; color:inherit; }

        /* ══ TAB BAR ══ */
        .cp-tab-bar {
          display:flex; justify-content:center; gap:0;
          position:relative; z-index:20;
          margin-bottom:60px; padding:0 clamp(20px,5%,40px);
        }
        .cp-tab-btn {
          position:relative; overflow:hidden; padding:18px 36px;
          border:1px solid rgba(50,197,244,0.12); background:transparent;
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(0.9rem,1.8vw,1.3rem); letter-spacing:3px;
          color:rgba(255,255,255,0.30); cursor:pointer; transition:color 0.35s;
          flex:1; max-width:340px; text-align:center;
        }
        .cp-tab-btn + .cp-tab-btn { border-left:none; }
        .cp-tab-btn::before {
          content:''; position:absolute; inset:0;
          background:rgba(50,197,244,0.05);
          transform:scaleY(0); transform-origin:bottom;
          transition:transform 0.4s cubic-bezier(0.77,0,0.18,1); z-index:0;
        }
        .cp-tab-btn.active::before { transform:scaleY(1); }
        .cp-tab-btn.active { color:#fff; border-color:rgba(50,197,244,0.35); }
        .cp-tab-btn-inner  { position:relative; z-index:1; }
        .cp-tab-btn-sub {
          display:block; font-family:'Inter',sans-serif;
          font-size:0.5rem; font-weight:600; letter-spacing:4px;
          color:rgba(50,197,244,0.7); margin-bottom:4px; text-transform:uppercase;
        }
        .cp-tab-indicator {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#32c5f4,#fde047);
          transform:scaleX(0); transform-origin:left;
          transition:transform 0.45s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-tab-btn.active .cp-tab-indicator { transform:scaleX(1); }

        /* ══ SLIDES ══ */
        .cp-slides-viewport { position:relative; overflow:hidden; min-height:600px; }
        .cp-slide-panel { width:100%; padding-bottom:120px; }

        /* ══ LABEL ROWS ══ */
        .cp-sp-dual-label-row {
          display:flex; align-items:center; gap:0;
          max-width:1180px; margin:0 auto 24px;
          padding:0 clamp(20px,5%,40px); position:relative; z-index:5;
        }
        .cp-sp-label-line { width:28px; height:1px; background:#32c5f4; opacity:0.4; flex-shrink:0; }
        .cp-sp-label-text {
          font-family:'Inter',sans-serif; font-size:0.65rem; font-weight:600;
          letter-spacing:5px; color:rgba(50,197,244,0.8); text-transform:uppercase; white-space:nowrap;
        }
        .cp-sp-label-spacer { flex:1; }

        /* ══ YT GRID ══ */
        .cp-sp-yt-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:20px;
          max-width:1180px; margin:0 auto 0;
          padding:0 clamp(20px,5%,40px); position:relative; z-index:5;
        }
        .cp-sp-yt-card {
          display:flex; flex-direction:column; background:#04080d;
          border:1px solid rgba(50,197,244,0.07); overflow:hidden;
          transition:border-color 0.4s,box-shadow 0.4s;
        }
        .cp-sp-yt-card:hover {
          border-color:rgba(50,197,244,0.22);
          box-shadow:0 14px 44px rgba(0,0,0,0.7),0 0 20px rgba(50,197,244,0.05);
        }
        .cp-sp-thumb {
          position:relative; width:100%; aspect-ratio:16/9;
          background:#030710; overflow:hidden;
        }
        .cp-sp-thumb::before {
          content:''; position:absolute; top:8px; left:8px; width:10px; height:10px;
          border-top:1px solid rgba(253,224,71,0.4); border-left:1px solid rgba(253,224,71,0.4);
          z-index:4; pointer-events:none;
        }
        .cp-sp-thumb::after {
          content:''; position:absolute; bottom:8px; right:8px; width:10px; height:10px;
          border-bottom:1px solid rgba(253,224,71,0.4); border-right:1px solid rgba(253,224,71,0.4);
          z-index:4; pointer-events:none;
        }
        .cp-sp-vid {
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-sp-yt-card:hover .cp-sp-vid { transform:scale(1.04); }
        .cp-sp-thumb-grad {
          position:absolute; inset:0;
          background:linear-gradient(to bottom,transparent 40%,rgba(6,10,15,0.55) 100%);
          z-index:2; pointer-events:none;
        }
        .cp-sp-yt-tag {
          position:absolute; top:10px; right:10px;
          font-family:'Bebas Neue',sans-serif; font-size:0.8rem; letter-spacing:3px;
          color:#000; background:#fde047; padding:3px 8px; z-index:5;
        }
        .cp-sp-hover-overlay {
          position:absolute; inset:0; background:rgba(6,10,15,0.75);
          display:flex; align-items:center; justify-content:center;
          opacity:0; z-index:10; backdrop-filter:blur(4px); transition:opacity 0.3s;
        }
        .cp-sp-yt-card:hover .cp-sp-hover-overlay,
        .cp-sp-reel-card:hover .cp-sp-hover-overlay { opacity:1; }
        .cp-sp-hover-label {
          font-family:'Inter',sans-serif; font-size:0.6rem; font-weight:600;
          letter-spacing:4px; color:#000; background:#fde047;
          padding:8px 18px; text-transform:uppercase;
          transform:translateY(6px); transition:transform 0.3s;
        }
        .cp-sp-yt-card:hover .cp-sp-hover-label,
        .cp-sp-reel-card:hover .cp-sp-hover-label { transform:translateY(0); }
        .cp-sp-yt-info { padding:16px 18px 20px; border-top:1px solid rgba(50,197,244,0.06); }
        .cp-sp-yt-title {
          font-family:'Inter',sans-serif; font-size:clamp(0.8rem,1.3vw,0.95rem); font-weight:500;
          color:rgba(255,255,255,0.82); margin:0; line-height:1.5;
          border-left:2px solid rgba(50,197,244,0.35); padding-left:10px; transition:color 0.3s;
        }
        .cp-sp-yt-card:hover .cp-sp-yt-title { color:#fff; }
        .cp-sp-scan {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#32c5f4,#fde047); transform-origin:left; z-index:6;
        }

        /* ══ DUAL VIDEO ROW ══ */
        .cp-sp-dual-video-row {
          display:grid; grid-template-columns:1fr 1fr; gap:0;
          border:1px solid rgba(50,197,244,0.10);
          overflow:hidden; background:rgba(50,197,244,0.02);
        }
        .cp-sp-dual-vid-card {
          display:block; position:relative;
          aspect-ratio:16/9; overflow:hidden; background:#030710;
          transition:box-shadow 0.4s;
          border-right:1px solid rgba(50,197,244,0.10);
        }
        .cp-sp-dual-vid-card:hover { box-shadow:inset 0 0 0 1px rgba(253,224,71,0.25); }
        .cp-sp-dual-vid-card video { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.5s; }
        .cp-sp-dual-vid-card:hover video { transform:scale(1.03); }
        .cp-sp-dual-vid-tag {
          position:absolute; top:0; left:0;
          font-family:'Inter',sans-serif; font-size:0.6rem; font-weight:700;
          letter-spacing:3px; padding:7px 14px; z-index:15; text-transform:uppercase;
          display:flex; align-items:center; gap:7px; color:#000;
        }
        .cp-sp-dual-vid-tag--yellow { background:#fde047; }
        .cp-sp-dual-dot { width:7px; height:7px; border-radius:50%; background:#000; animation:cpDot 1.2s step-end infinite; }
        @keyframes cpDot { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .cp-sp-large-scan {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#32c5f4,#fde047); transform-origin:left; z-index:6;
        }

        /* ══ AMAZON PRIME ROW ══ */
        .cp-sp-prime-row {
          max-width:1180px; margin:20px auto 70px;
          padding:0 clamp(20px,5%,40px); position:relative; z-index:5;
        }
        .cp-sp-prime-label-row {
          display:flex; align-items:center; gap:14px; margin-bottom:14px;
        }
        .cp-sp-prime-label-line { width:28px; height:1px; background:#00A8E1; opacity:0.5; flex-shrink:0; }
        .cp-sp-prime-label-text {
          font-family:'Inter',sans-serif; font-size:0.65rem; font-weight:600;
          letter-spacing:5px; color:rgba(0,168,225,0.85); text-transform:uppercase;
        }
        .cp-sp-prime-card {
          display:block; position:relative; width:100%;
          aspect-ratio:16/9; overflow:hidden;
          border:1px solid rgba(0,168,225,0.18); background:#030710;
          transition:border-color 0.4s,box-shadow 0.4s;
        }
        .cp-sp-prime-card:hover {
          border-color:rgba(0,168,225,0.40);
          box-shadow:0 20px 60px rgba(0,0,0,0.8),0 0 30px rgba(0,168,225,0.08);
        }
        .cp-sp-prime-card video {
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-sp-prime-card:hover video { transform:scale(1.03); }
        .cp-sp-prime-badge {
          position:absolute; top:0; left:0;
          font-family:'Inter',sans-serif; font-size:0.6rem; font-weight:700;
          letter-spacing:3px; color:#fff; background:#00A8E1;
          padding:7px 14px; z-index:15; text-transform:uppercase;
          display:flex; align-items:center; gap:7px;
        }
        .cp-sp-prime-badge::before {
          content:''; width:7px; height:7px; border-radius:50%; background:#fff;
          opacity:0.85; flex-shrink:0; animation:cpDot 1.2s step-end infinite;
        }
        .cp-sp-prime-hover-overlay {
          position:absolute; inset:0; background:rgba(6,10,15,0.75);
          display:flex; align-items:center; justify-content:center;
          opacity:0; z-index:10; backdrop-filter:blur(4px); transition:opacity 0.3s;
        }
        .cp-sp-prime-card:hover .cp-sp-prime-hover-overlay { opacity:1; }
        .cp-sp-prime-hover-label {
          font-family:'Inter',sans-serif; font-size:0.6rem; font-weight:600;
          letter-spacing:4px; color:#fff; background:#00A8E1;
          padding:10px 24px; text-transform:uppercase;
          transform:translateY(8px); transition:transform 0.3s;
        }
        .cp-sp-prime-card:hover .cp-sp-prime-hover-label { transform:translateY(0); }
        .cp-sp-prime-scan {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#00A8E1,#32c5f4); transform-origin:left; z-index:6;
          transform:scaleX(0); transition:transform 0.45s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-sp-prime-card:hover .cp-sp-prime-scan { transform:scaleX(1); }

        /* ══ SPECIAL wrapper (kept for mobile) ══ */
        .cp-sp-special {
          max-width:1180px; margin:0 auto 50px;
          padding:0 clamp(20px,5%,40px); position:relative; z-index:5;
        }

        /* ══ EVENTS TAB ══ */
        .cp-events-wrap {
          max-width:1180px; margin:0 auto 70px;
          padding:0 clamp(20px,5%,40px); position:relative; z-index:5;
        }
        .cp-events-header { text-align:center; margin-bottom:40px; }
        .cp-events-pre { display:inline-flex; align-items:center; gap:12px; margin-bottom:12px; }
        .cp-events-pre-line { width:32px; height:1px; background:#fde047; opacity:0.5; }
        .cp-events-pre-text {
          font-family:'Inter',sans-serif; font-size:clamp(0.5rem,1.3vw,0.62rem);
          font-weight:600; letter-spacing:6px; color:rgba(253,224,71,0.85); text-transform:uppercase;
        }
        .cp-events-title {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(2.6rem,6vw,5rem);
          font-weight:400; color:#fff; letter-spacing:4px; margin:0 0 12px;
        }
        .cp-events-title span { color:#fde047; }
        .cp-events-rule {
          width:80px; height:1px;
          background:linear-gradient(90deg,#fde047,#32c5f4);
          margin:0 auto; opacity:0.7;
        }
        /* 5 items → 3+2 in 3-col grid */
        .cp-events-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:20px;
        }
        .cp-sp-reel-card {
          aspect-ratio:9/16; overflow:hidden;
          border:1px solid rgba(50,197,244,0.08); position:relative;
          transition:border-color 0.35s,box-shadow 0.35s,transform 0.45s;
        }
        .cp-sp-reel-card:hover {
          border-color:rgba(50,197,244,0.28);
          box-shadow:0 10px 35px rgba(0,0,0,0.7),0 0 20px rgba(50,197,244,0.06);
          transform:translateY(-8px);
        }
        .cp-sp-reel-tl,.cp-sp-reel-br { position:absolute; z-index:4; width:10px; height:10px; pointer-events:none; }
        .cp-sp-reel-tl::before,.cp-sp-reel-tl::after,
        .cp-sp-reel-br::before,.cp-sp-reel-br::after { content:''; position:absolute; background:rgba(50,197,244,0.4); }
        .cp-sp-reel-tl::before{width:100%;height:1px;top:0;left:0;}
        .cp-sp-reel-tl::after{width:1px;height:100%;top:0;left:0;}
        .cp-sp-reel-tl{top:7px;left:7px;}
        .cp-sp-reel-br::before{width:100%;height:1px;bottom:0;right:0;}
        .cp-sp-reel-br::after{width:1px;height:100%;bottom:0;right:0;}
        .cp-sp-reel-br{bottom:7px;right:7px;}
        .cp-sp-reel-grad {
          position:absolute; inset:0;
          background:linear-gradient(to bottom,transparent 55%,rgba(6,10,15,0.75) 100%);
          z-index:2; pointer-events:none;
        }
        .cp-reel-caption {
          position:absolute; bottom:0; left:0; right:0; padding:12px 16px; z-index:5;
          font-family:'Inter',sans-serif; font-size:0.75rem; font-weight:500;
          color:rgba(255,255,255,0.85); border-left:2px solid #fde047;
          margin:0 10px 12px; background:rgba(6,10,15,0.50); backdrop-filter:blur(4px);
        }

        /* ══ COUNTDOWN TAB ══ */
        .cp-countdown-hero {
          max-width:1180px; margin:0 auto 70px;
          padding:0 clamp(20px,5%,40px); position:relative; z-index:5;
        }
        .cp-cd-compact-header {
          display:flex; align-items:center; gap:24px;
          padding:22px 0 28px; margin-bottom:28px;
          border-bottom:1px solid rgba(50,197,244,0.10);
        }
        .cp-cd-compact-logo { height:44px; flex-shrink:0; filter:drop-shadow(0 0 10px rgba(50,197,244,0.45)); }
        .cp-cd-compact-text { flex:1; min-width:0; }
        .cp-cd-compact-over {
          font-family:'Inter',sans-serif; font-size:0.56rem; font-weight:600;
          letter-spacing:5px; color:rgba(50,197,244,0.75); text-transform:uppercase;
          display:block; margin-bottom:4px;
        }
        .cp-cd-compact-title {
          font-family:'Bebas Neue',sans-serif; font-size:clamp(1.8rem,3.5vw,2.8rem);
          font-weight:400; color:#fde047; margin:0; letter-spacing:3px; line-height:1;
        }
        .cp-cd-compact-desc {
          font-family:'Inter',sans-serif; font-size:clamp(0.78rem,1.1vw,0.88rem);
          font-weight:300; color:rgba(255,255,255,0.40); margin:6px 0 0; line-height:1.5;
        }
        .cp-cd-compact-desc strong { color:#fde047; font-weight:600; }
        .cp-cd-compact-rule {
          width:1px; height:60px; flex-shrink:0;
          background:linear-gradient(to bottom,rgba(50,197,244,0.4),transparent);
        }
        /* 6 cards → 3 cols × 2 rows */
        .cp-cd-reels-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:20px;
        }

        /* ══ MOBILE CAROUSEL ══ */
        .cp-mob-carousel-wrap { margin-bottom:30px; }
        .cp-mob-carousel-label-row { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:14px; padding:0 20px; }
        .cp-mob-carousel-label-line { flex:1; max-width:44px; height:1px; background:#32c5f4; opacity:0.4; }
        .cp-mob-carousel-label-text { font-family:'Inter',sans-serif; font-size:0.6rem; font-weight:600; letter-spacing:4px; color:rgba(50,197,244,0.85); text-transform:uppercase; white-space:nowrap; }
        .cp-mob-carousel-window { position:relative; overflow:hidden; width:100%; }
        .cp-mob-carousel-track  { display:flex; gap:12px; will-change:transform; padding:0 10px; }
        .cp-mob-card--landscape { flex:0 0 180px; aspect-ratio:16/9; overflow:hidden; border:1px solid rgba(50,197,244,0.10); position:relative; }
        .cp-mob-card--portrait  { flex:0 0 110px; aspect-ratio:9/16; overflow:hidden; border:1px solid rgba(50,197,244,0.10); position:relative; }
        .cp-mob-card-vid { width:100%; height:100%; object-fit:cover; display:block; }
        .cp-mob-card-grad { position:absolute; inset:0; background:linear-gradient(to bottom,transparent 50%,rgba(6,10,15,0.75) 100%); pointer-events:none; z-index:2; }
        .cp-mob-card-tag { position:absolute; top:5px; right:5px; font-family:'Bebas Neue',sans-serif; font-size:0.6rem; letter-spacing:2px; color:#000; background:#fde047; padding:2px 5px; z-index:5; }
        .cp-mob-card-title { position:absolute; bottom:0; left:0; right:0; margin:0 5px 6px; padding:5px 7px; font-family:'Inter',sans-serif; font-size:0.58rem; font-weight:500; color:rgba(255,255,255,0.85); border-left:2px solid #fde047; background:rgba(6,10,15,0.55); backdrop-filter:blur(4px); line-height:1.3; z-index:5; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
        .cp-mob-fade { position:absolute; top:0; bottom:0; width:32px; pointer-events:none; z-index:10; }
        .cp-mob-fade--left  { left:0;  background:linear-gradient(to right,#060a0f,transparent); }
        .cp-mob-fade--right { right:0; background:linear-gradient(to left,#060a0f,transparent);  }

        /* mobile brand panel */
        .cp-cd-mob-brand { text-align:center; padding:32px 20px 24px; margin:0 16px 28px; background:rgba(50,197,244,0.02); border:1px solid rgba(50,197,244,0.08); border-top:2px solid rgba(50,197,244,0.30); }
        .cp-cd-mob-logo { height:46px; margin-bottom:14px; filter:drop-shadow(0 0 10px rgba(50,197,244,0.45)); }
        .cp-cd-mob-pre { display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:8px; }
        .cp-cd-mob-pre-line { width:22px; height:1px; background:#32c5f4; opacity:0.5; }
        .cp-cd-mob-pre-text { font-family:'Inter',sans-serif; font-size:0.56rem; font-weight:600; letter-spacing:4px; color:rgba(50,197,244,0.85); text-transform:uppercase; }
        .cp-cd-mob-title { font-family:'Bebas Neue',sans-serif; font-size:2.2rem; font-weight:400; color:#fde047; margin:0 0 10px; letter-spacing:2px; line-height:1; }
        .cp-cd-mob-rule { width:100%; height:1px; background:linear-gradient(90deg,transparent,rgba(50,197,244,0.3),rgba(253,224,71,0.2),transparent); margin-bottom:12px; }
        .cp-cd-mob-desc { font-family:'Inter',sans-serif; font-size:0.8rem; font-weight:300; color:rgba(255,255,255,0.45); line-height:1.7; }
        .cp-cd-mob-desc strong { display:block; margin-top:10px; color:#fde047; font-weight:600; font-size:0.72rem; letter-spacing:4px; text-transform:uppercase; animation:cpPulse 2s infinite ease-in-out; }
        @keyframes cpPulse { 0%,100%{opacity:0.8;transform:scale(1);} 50%{opacity:1;transform:scale(1.03);} }

        /* mobile special promo */
        .cp-sp-special-mob { display:block; margin:0 16px 28px; border:1px solid rgba(50,197,244,0.10); background:rgba(50,197,244,0.02); overflow:hidden; position:relative; }
        .cp-sp-special-mob video { width:100%; aspect-ratio:16/9; display:block; object-fit:cover; }
        .cp-sp-special-mob-info  { padding:16px 16px 20px; border-top:1px solid rgba(50,197,244,0.08); }
        .cp-sp-special-mob-pre { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
        .cp-sp-special-mob-pre-line { width:18px; height:1px; background:#32c5f4; opacity:0.5; }
        .cp-sp-special-mob-pre-txt { font-family:'Inter',sans-serif; font-size:0.55rem; font-weight:600; letter-spacing:3px; color:rgba(50,197,244,0.85); text-transform:uppercase; }
        .cp-sp-special-mob-title { font-family:'Bebas Neue',sans-serif; font-size:1.7rem; color:#32c5f4; letter-spacing:2px; margin:0 0 10px; line-height:1.1; }
        .cp-sp-special-mob-body { font-family:'Inter',sans-serif; font-size:0.78rem; font-weight:300; color:rgba(255,255,255,0.40); line-height:1.7; margin-bottom:14px; }
        .cp-sp-cta-mob { display:inline-flex; align-items:center; padding:9px 18px; border:1px solid #fde047; color:#fde047; font-family:'Inter',sans-serif; font-size:0.58rem; font-weight:600; letter-spacing:3px; text-transform:uppercase; }

        /* mobile events */
        .cp-events-mob-header { text-align:center; padding:0 16px 24px; }
        .cp-events-mob-title { font-family:'Bebas Neue',sans-serif; font-size:2rem; font-weight:400; color:#fff; letter-spacing:3px; margin:0 0 6px; }
        .cp-events-mob-title span { color:#fde047; }
        .cp-events-mob-rule { width:60px; height:1px; background:linear-gradient(90deg,#fde047,#32c5f4); margin:0 auto; opacity:0.7; }

        /* ══ VISIBILITY HELPERS ══ */
        .cp-desktop-only { display:block; }
        .cp-mobile-only  { display:none;  }

        /* ══ RESPONSIVE ══ */
        @media (max-width:768px) {
          .cp-tab-bar     { padding:0 8px; margin-bottom:32px; }
          .cp-tab-btn     { padding:10px 6px; letter-spacing:0px; font-size:0.75rem; }
          .cp-tab-btn-sub { font-size:0.38rem; letter-spacing:2px; margin-bottom:2px; }
          .cp-desktop-only { display:none  !important; }
          .cp-mobile-only  { display:block !important; }
          .cp-slide-panel  { padding-bottom:60px; }
        }
        @media (min-width:769px) and (max-width:1024px) {
          .cp-sp-yt-grid    { grid-template-columns:repeat(2,1fr); }
          .cp-cd-reels-grid { grid-template-columns:repeat(2,1fr); }
          .cp-events-grid   { grid-template-columns:repeat(2,1fr); }
          .cp-sp-dual-video-row { grid-template-columns:1fr; }
          .cp-sp-dual-vid-card  { border-right:none; border-bottom:1px solid rgba(50,197,244,0.10); aspect-ratio:16/9; }
        }
      `}</style>

      <section className="cp-sp-section">
        <div className="cp-sp-top-fade" />
        <div className="cp-sp-glow-tl" />
        <div className="cp-sp-glow-br" />
        <div className="cp-sp-scanlines" />

        {/* ══ TAB BAR ══ */}
        <div className="cp-tab-bar">
          {slides.map((s, i) => (
            <button key={s.key} className={`cp-tab-btn${activeSlide === i ? " active" : ""}`} onClick={() => goTo(i)}>
              <span className="cp-tab-btn-inner">
                <span className="cp-tab-btn-sub">{s.sublabel}</span>
                {s.label}
              </span>
              <span className="cp-tab-indicator" />
            </button>
          ))}
        </div>

        {/* ══ SLIDES ══ */}
        <div className="cp-slides-viewport">
          <AnimatePresence mode="wait" custom={dir}>

            {/* ── SLIDE 0: CINEMAPAYYAN SPECIALTY ── */}
            {activeSlide === 0 && (
              <motion.div key="specialty" className="cp-slide-panel" custom={dir}
                initial={{ opacity:0, x: dir * -60 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x: dir * 60 }}
                transition={{ duration:0.38, ease:[0.16,1,0.3,1] }}
              >
                {/* DESKTOP */}
                <div className="cp-desktop-only">

                  {/* DUAL VIDEO ROW:
                      LEFT  = id 38 · VPNEW latest review  (unchanged)
                      RIGHT = id 24 · Venkat Prabhu Arrested / Custody Promo  (swapped in from YT grid)
                  */}
                  <ScrollReveal>
                    <div className="cp-sp-special">
                      <div className="cp-sp-dual-video-row">
                        {/* LEFT — VPNEW */}
                        <a href="https://youtu.be/aHxx-NtpAwQ?si=hoArL4w8_2clt2O7" target="_blank" rel="noreferrer" className="cp-sp-dual-vid-card">
                          <video autoPlay muted loop playsInline>
                            <source src={VideoAssets.vjPreviews[38]} type="video/mp4" />
                          </video>
                          <div className="cp-sp-dual-vid-tag cp-sp-dual-vid-tag--yellow">
                            <span className="cp-sp-dual-dot" />REVIEW
                          </div>
                          <div className="cp-sp-hover-overlay"><span className="cp-sp-hover-label">WATCH NOW</span></div>
                          <div className="cp-sp-large-scan" />
                        </a>

                        {/* RIGHT — Custody Promo id 24 */}
                        <a href="https://youtu.be/2M-A_3U-Zmc?si=FPJ7TfFoZvRtPoZH" target="_blank" rel="noreferrer" className="cp-sp-dual-vid-card" style={{borderRight:"none"}}>
                          <video autoPlay muted loop playsInline>
                            <source src={VideoAssets.vjPreviews[24]} type="video/mp4" />
                          </video>
                          <div className="cp-sp-dual-vid-tag cp-sp-dual-vid-tag--yellow">
                            <span className="cp-sp-dual-dot" />CUSTODY PROMO
                          </div>
                          <div className="cp-sp-hover-overlay"><span className="cp-sp-hover-label">WATCH NOW</span></div>
                          <div className="cp-sp-large-scan" />
                        </a>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* YT FEATURES label */}
                  <ScrollReveal delay={0.05}>
                    <div className="cp-sp-dual-label-row">
                      <div className="cp-sp-label-line" />
                      <span className="cp-sp-label-text">YOUTUBE FEATURES</span>
                      <div className="cp-sp-label-spacer" />
                    </div>
                  </ScrollReveal>

                  {/* YT GRID: id 25, 29 (Mood of Iraivan), 23 */}
                  <ScrollReveal delay={0.08}>
                    <div className="cp-sp-yt-grid" style={{marginBottom:"0"}}>
                      {topYT.map((vid) => (
                        <a key={vid.id} href={vid.link} target="_blank" rel="noreferrer" className="cp-sp-yt-card">
                          <div className="cp-sp-thumb">
                            <video autoPlay muted loop playsInline className="cp-sp-vid">
                              <source src={VideoAssets.vjPreviews[vid.id]} type="video/mp4" />
                            </video>
                            <div className="cp-sp-thumb-grad" />
                            <div className="cp-sp-yt-tag">YT</div>
                            <div className="cp-sp-hover-overlay"><span className="cp-sp-hover-label">WATCH NOW</span></div>
                            <motion.div className="cp-sp-scan" initial={{scaleX:0}} whileHover={{scaleX:1}} transition={{duration:0.4}} />
                          </div>
                          <div className="cp-sp-yt-info"><p className="cp-sp-yt-title">{vid.title}</p></div>
                        </a>
                      ))}
                    </div>
                  </ScrollReveal>

                  {/* AMAZON PRIME — full-width card below YT grid */}
                  <ScrollReveal delay={0.10}>
                    <div className="cp-sp-prime-row">
                      <div className="cp-sp-prime-label-row">
                        <div className="cp-sp-prime-label-line" />
                        <span className="cp-sp-prime-label-text">AMAZON PRIME ASSOCIATION</span>
                      </div>
                      <a href="https://youtu.be/tclNknwYTS0?si=6PeS3GpsiD7bqPJS" target="_blank" rel="noreferrer" className="cp-sp-prime-card">
                        <video autoPlay muted loop playsInline>
                          <source src={VideoAssets.vjPreviews[32]} type="video/mp4" />
                        </video>
                        <div className="cp-sp-prime-badge">AMAZON PRIME</div>
                        <div className="cp-sp-prime-hover-overlay">
                          <span className="cp-sp-prime-hover-label">WATCH FULL PROMO</span>
                        </div>
                        <div className="cp-sp-prime-scan" />
                      </a>
                    </div>
                  </ScrollReveal>

                </div>

                {/* MOBILE */}
                <div className="cp-mobile-only">
                  {/* VPNEW */}
                  <a href="https://youtu.be/3IAV3UISk8U?si=ZwWgCxUeejVHDsqW" target="_blank" rel="noreferrer" className="cp-sp-special-mob" style={{marginBottom:"12px"}}>
                    <video autoPlay muted loop playsInline><source src={VideoAssets.vjPreviews[29]} type="video/mp4" /></video>
                    <div className="cp-sp-special-mob-info">
                      <div className="cp-sp-special-mob-pre"><div className="cp-sp-special-mob-pre-line" /><span className="cp-sp-special-mob-pre-txt">REVIEW · FEATURED</span></div>
                      <p className="cp-sp-special-mob-title" style={{color:"#fde047"}}>Mood Of Iraivan</p>
                    </div>
                  </a>
                  {/* Custody Promo id 24 */}
                  <a href="https://youtu.be/2M-A_3U-Zmc?si=FPJ7TfFoZvRtPoZH" target="_blank" rel="noreferrer" className="cp-sp-special-mob" style={{marginBottom:"12px"}}>
                    <video autoPlay muted loop playsInline><source src={VideoAssets.vjPreviews[24]} type="video/mp4" /></video>
                    <div className="cp-sp-special-mob-info">
                      <div className="cp-sp-special-mob-pre"><div className="cp-sp-special-mob-pre-line" /><span className="cp-sp-special-mob-pre-txt">CUSTODY PROMO</span></div>
                      <p className="cp-sp-special-mob-title">Venkat Prabhu ARRESTED</p>
                    </div>
                  </a>
                  {/* Amazon Prime id 32 */}
                  <a href="https://youtu.be/tclNknwYTS0?si=6PeS3GpsiD7bqPJS" target="_blank" rel="noreferrer" className="cp-sp-special-mob">
                    <video autoPlay muted loop playsInline><source src={VideoAssets.vjPreviews[32]} type="video/mp4" /></video>
                    <div className="cp-sp-special-mob-info">
                      <div className="cp-sp-special-mob-pre"><div className="cp-sp-special-mob-pre-line" /><span className="cp-sp-special-mob-pre-txt" style={{color:"#00A8E1"}}>AMAZON PRIME ASSOCIATION</span></div>
                      <p className="cp-sp-special-mob-title">CINEMAPAYYAN SPECIAL PROMOTION</p>
                      <p className="cp-sp-special-mob-body">High-octane anticipation through rhythmic editing and cinematic precision.</p>
                      <span className="cp-sp-cta-mob">WATCH FULL PROMO</span>
                    </div>
                  </a>
                  <MobileCarousel items={topYT} label="YOUTUBE FEATURES" />
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 1: EVENTS ── */}
            {activeSlide === 1 && (
              <motion.div key="events" className="cp-slide-panel" custom={dir}
                initial={{ opacity:0, x: dir * -60 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x: dir * 60 }}
                transition={{ duration:0.38, ease:[0.16,1,0.3,1] }}
              >
                {/* DESKTOP */}
                <div className="cp-desktop-only">
                  <ScrollReveal>
                    <div className="cp-events-wrap">
                      <div className="cp-events-header">
                        <div className="cp-events-pre">
                          <div className="cp-events-pre-line" />
                          <span className="cp-events-pre-text">LIVE · ON GROUND · SPECIAL</span>
                          <div className="cp-events-pre-line" />
                        </div>
                        <h2 className="cp-events-title">EVENTS <span>&amp; ACTIVATIONS</span></h2>
                        <div className="cp-events-rule" />
                      </div>
                      <div className="cp-events-grid">
                        {eventsReels.map((reel) => (
                          <a key={reel.id} href={reel.link} target="_blank" rel="noreferrer" className="cp-sp-reel-card">
                            <video autoPlay muted loop playsInline style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}>
                              <source src={VideoAssets.vjPreviews[reel.id]} type="video/mp4" />
                            </video>
                            <div className="cp-sp-reel-grad" />
                            <div className="cp-sp-reel-tl" /><div className="cp-sp-reel-br" />
                            <div className="cp-sp-yt-tag">{reel.tag}</div>
                            <div className="cp-sp-hover-overlay"><span className="cp-sp-hover-label">WATCH</span></div>
                            <p className="cp-reel-caption">{reel.title}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* MOBILE */}
                <div className="cp-mobile-only">
                  <div className="cp-events-mob-header">
                    <h2 className="cp-events-mob-title">EVENTS <span>&amp; ACTIVATIONS</span></h2>
                    <div className="cp-events-mob-rule" />
                  </div>
                  <MobileCarousel items={eventsReels} label="EVENTS" />
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 2: COUNTDOWN SPECIALTY ── */}
            {activeSlide === 2 && (
              <motion.div key="countdown" className="cp-slide-panel" custom={dir}
                initial={{ opacity:0, x: dir * 60  }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x: dir * -60 }}
                transition={{ duration:0.38, ease:[0.16,1,0.3,1] }}
              >
                {/* DESKTOP */}
                <div className="cp-desktop-only">
                  <div className="cp-countdown-hero">
                    <ScrollReveal>
                      <div className="cp-cd-compact-header">
                        <img src={Images.logo} alt="CinemaPayyan" className="cp-cd-compact-logo" />
                        <div className="cp-cd-compact-text">
                          <span className="cp-cd-compact-over">SIGNATURE FORMAT</span>
                          <h2 className="cp-cd-compact-title">COUNTDOWN SPECIALTY</h2>
                          <p className="cp-cd-compact-desc">High-energy rhythmic edits — <strong>Namma Specialty.</strong></p>
                        </div>
                        <div className="cp-cd-compact-rule" />
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                      {/* 6 cards → 3 cols × 2 rows */}
                      <div className="cp-cd-reels-grid">
                        {countdownReels.map((reel) => (
                          <a key={reel.id} href={reel.link} target="_blank" rel="noreferrer" className="cp-sp-reel-card">
                            <video autoPlay muted loop playsInline style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}>
                              <source src={VideoAssets.vjPreviews[reel.id]} type="video/mp4" />
                            </video>
                            <div className="cp-sp-reel-grad" />
                            <div className="cp-sp-reel-tl" /><div className="cp-sp-reel-br" />
                            <div className="cp-sp-yt-tag">{reel.tag}</div>
                            <div className="cp-sp-hover-overlay"><span className="cp-sp-hover-label">WATCH</span></div>
                            <p className="cp-reel-caption">{reel.title}</p>
                          </a>
                        ))}
                      </div>
                    </ScrollReveal>
                  </div>
                </div>

                {/* MOBILE */}
                <div className="cp-mobile-only">
                  <div className="cp-cd-mob-brand">
                    <img src={Images.logo} alt="CinemaPayyan" className="cp-cd-mob-logo" />
                    <div className="cp-cd-mob-pre">
                      <div className="cp-cd-mob-pre-line" />
                      <span className="cp-cd-mob-pre-text">SIGNATURE FORMAT</span>
                      <div className="cp-cd-mob-pre-line" />
                    </div>
                    <h2 className="cp-cd-mob-title">COUNTDOWN SPECIALTY</h2>
                    <div className="cp-cd-mob-rule" />
                    <p className="cp-cd-mob-desc">
                      High-energy rhythmic edits designed to build maximum anticipation.
                      <strong>Namma Specialty.</strong>
                    </p>
                  </div>
                  <MobileCarousel items={countdownReels} label="COUNTDOWN VIDEOS" />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default ShortsPromotion;
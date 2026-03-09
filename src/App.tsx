import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import About            from "./About";
import Work             from "./Work";
import ProductionLogo   from "./ProductionLogo";
import Comic            from "./Comic";
import ShortsPromotion  from "./ShortsPromotion";
import ShadowPromotion  from "./ShadowPromotion";
import Contact          from "./Contact";
import Munai            from "./Munai";
import AboutWork        from "./VjSession";
import Filmcritic       from "./openpannaa";
import Host             from "./Host";
import Director         from "./Director";
import CreativeProducer from "./CreativeProducer";
import Accelerator      from "./Accelerator";

const repoBasename = "/cinima-payan-inc";

// ─────────────────────────────────────────────
//  TOKENS
// ─────────────────────────────────────────────
const TOKENS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
  :root {
    --cyan:        #32c5f4;
    --yellow:      #fde047;
    --black:       #000000;
    --white:       #ffffff;
    --cyan-glow:   rgba(50,197,244,0.18);
    --cyan-mid:    rgba(50,197,244,0.38);
    --yellow-glow: rgba(253,224,71,0.14);
    --yellow-mid:  rgba(253,224,71,0.40);
    --surface:     #0b0b0b;
    --surface2:    #131313;
    --border:      rgba(255,255,255,0.06);
    --muted:       rgba(255,255,255,0.35);
    --font-head:   'Bebas Neue', sans-serif;
    --font-mono:   'DM Mono', monospace;
    --ease:        cubic-bezier(0.4,0,0.2,1);
    --tr:          0.28s cubic-bezier(0.4,0,0.2,1);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { color: inherit; text-decoration: none; }
`;

const NAV_LINKS = [
  { label: "HOME",     to: "/" },
  { label: "ABOUT",    to: "/about" },
  { label: "WORK",     to: "/work" },
  { label: "SERVICES", to: "/services" },
  { label: "PARTNERS", to: "/partners" },
  { label: "CONTACT",  to: "/contact" },
];

// ─────────────────────────────────────────────
//  GLOBAL NAV
// ─────────────────────────────────────────────
function GlobalNav({ transparent = false }) {
  const location = useLocation();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = !transparent || scrolled || open;

  return (
    <>
      <style>{`
        .gn {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 9900; height: 58px;
          display: flex; align-items: center; padding: 0 32px;
          transition: background 0.4s, border-color 0.4s;
        }
        .gn.solid {
          background: rgba(0,0,0,0.93);
          border-bottom: 1px solid rgba(50,197,244,0.12);
          backdrop-filter: blur(14px);
        }
        .gn.clear { background: transparent; border-bottom: 1px solid transparent; }
        .gn__logo {
          font-family: var(--font-head);
          font-size: 1.25rem; letter-spacing: 0.14em;
          color: var(--yellow); white-space: nowrap; flex-shrink: 0;
          text-shadow: 0 0 24px rgba(253,224,71,0.3);
          transition: text-shadow 0.3s;
          /* FIX: logo always visible above hero overlay */
          position: relative; z-index: 1;
        }
        .gn__logo:hover { text-shadow: 0 0 40px rgba(253,224,71,0.7); }
        .gn__links {
          display: flex; gap: 28px; list-style: none; margin-left: auto;
        }
        .gn__links a {
          font-family: var(--font-head);
          font-size: 0.78rem; letter-spacing: 0.2em;
          color: var(--muted);
          transition: color var(--tr);
          position: relative; padding-bottom: 3px;
        }
        .gn__links a::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, var(--cyan), var(--yellow));
          transform: scaleX(0); transform-origin: left;
          transition: transform var(--tr);
        }
        .gn__links a:hover, .gn__links a.act { color: var(--white); }
        .gn__links a:hover::after, .gn__links a.act::after { transform: scaleX(1); }
        .gn__burger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 6px; margin-left: auto;
          background: none; border: none;
        }
        .gn__burger span {
          display: block; width: 24px; height: 1.5px; background: var(--yellow);
          transition: transform 0.36s var(--ease), opacity 0.2s;
          transform-origin: center;
        }
        .gn__burger.op span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .gn__burger.op span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .gn__burger.op span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        .gn__drawer {
          position: fixed; inset: 58px 0 0 0; z-index: 9800;
          background: #000;
          display: flex; flex-direction: column;
          clip-path: inset(0 0 100% 0);
          transition: clip-path 0.48s var(--ease);
          pointer-events: none;
          overflow: hidden;
        }
        .gn__drawer.op { clip-path: inset(0 0 0% 0); pointer-events: all; }
        .gn__drawer::before, .gn__drawer::after {
          content: '';
          position: absolute; top: 0; bottom: 0; width: 24px;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 12px,
            rgba(50,197,244,0.1) 12px, rgba(50,197,244,0.1) 22px,
            transparent 22px, transparent 24px
          );
          border-width: 1px; border-style: solid; border-color: rgba(50,197,244,0.08);
        }
        .gn__drawer::before { left: 0; }
        .gn__drawer::after  { right: 0; }
        .gn__di {
          padding: 22px 56px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: space-between;
        }
        .gn__di:first-child { border-top: 1px solid rgba(255,255,255,0.04); margin-top: auto; }
        .gn__di:last-child { margin-bottom: auto; }
        .gn__drawer a {
          font-family: var(--font-head);
          font-size: clamp(2rem, 8vw, 2.8rem);
          letter-spacing: 0.12em; color: rgba(255,255,255,0.45);
          transition: color 0.25s;
        }
        .gn__drawer a:hover, .gn__drawer a.act { color: var(--yellow); }
        .gn__dn {
          font-family: var(--font-mono); font-size: 0.58rem;
          color: var(--cyan); letter-spacing: 2px; opacity: 0.5;
        }
        @media (max-width: 860px) {
          .gn__links { display: none; }
          .gn__burger { display: flex; }
        }
        @media (max-width: 480px) {
          .gn { padding: 0 20px; }
          .gn__di { padding: 18px 44px; }
        }
      `}</style>

      <nav className={`gn ${solid ? "solid" : "clear"}`}>
        <Link to="/" className="gn__logo">CINEMAPAYYAN</Link>
        <ul className="gn__links">
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <Link to={l.to}
                className={(l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to)) ? "act" : ""}
              >{l.label}</Link>
            </li>
          ))}
        </ul>
        <button className={`gn__burger ${open ? "op" : ""}`} onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`gn__drawer ${open ? "op" : ""}`}>
        {NAV_LINKS.map((l, i) => (
          <div key={l.to} className="gn__di">
            <Link to={l.to}
              className={location.pathname === l.to ? "act" : ""}
              onClick={() => setOpen(false)}
            >{l.label}</Link>
            <span className="gn__dn">0{i + 1}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
//  PAGE SHELL
// ─────────────────────────────────────────────
function PageShell({ children }) {
  return (
    <>
      <GlobalNav />
      <main style={{ paddingTop: "58px", minHeight: "100vh" }}>{children}</main>
      <SiteFooter />
    </>
  );
}

function Breadcrumb({ crumbs }) {
  return (
    <>
      <style>{`
        .bc { display: flex; align-items: center; gap: 8px; padding: 20px 40px 0;
              font-size: 0.68rem; letter-spacing: 0.14em; color: var(--muted); }
        .bc a:hover { color: var(--cyan); }
        .bc__sep { color: rgba(50,197,244,0.3); }
        @media(max-width:480px){ .bc { padding: 16px 20px 0; } }
      `}</style>
      <nav className="bc">
        {crumbs.map((c, i) => (
          <span key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
            {i > 0 && <span className="bc__sep">›</span>}
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span style={{ color:"var(--yellow)" }}>{c.label}</span>}
          </span>
        ))}
      </nav>
    </>
  );
}

function PageHero({ title, subtitle, tag }) {
  return (
    <>
      <style>{`
        .ph { padding: 56px 40px 44px; border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
        .ph::before {
          content:''; position: absolute; top:0; right:0; bottom:0; width:50%;
          background: radial-gradient(ellipse at 80% 50%, rgba(50,197,244,0.06) 0%, transparent 65%);
          pointer-events:none;
        }
        .ph__tag { font-family:var(--font-mono); font-size:0.66rem; letter-spacing:0.26em; color:var(--cyan); margin-bottom:12px; text-transform:uppercase; }
        .ph__title { font-family:var(--font-head); font-size:clamp(3rem,8vw,6.5rem); letter-spacing:0.05em; line-height:0.9; color:var(--white); margin-bottom:16px; }
        .ph__sub { font-family:var(--font-mono); font-size:0.88rem; color:var(--muted); max-width:460px; line-height:1.7; }
        @media(max-width:480px){ .ph { padding: 40px 20px 32px; } }
      `}</style>
      <div className="ph">
        {tag && <div className="ph__tag">— {tag}</div>}
        <h1 className="ph__title">{title}</h1>
        {subtitle && <p className="ph__sub">{subtitle}</p>}
      </div>
    </>
  );
}

function HubGrid({ children, cols = 3 }) {
  return (
    <>
      <style>{`
        .hg { display:grid; grid-template-columns:repeat(var(--hg-cols,3),1fr); gap:1px; background:rgba(50,197,244,0.07); }
        .hg > * { background: var(--black); }
        @media(max-width:900px){ .hg { --hg-cols:2; } }
        @media(max-width:560px){ .hg { --hg-cols:1; } }
      `}</style>
      <div className="hg" style={{ "--hg-cols": cols }}>{children}</div>
    </>
  );
}

function HubCard({ to, label, sub, tag, num }) {
  return (
    <>
      <style>{`
        .hc { display:block; padding:36px 32px 48px; position:relative; overflow:hidden; background:var(--black); transition:background var(--tr); cursor:pointer; }
        .hc::before { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--cyan),var(--yellow)); transform:scaleX(0); transform-origin:left; transition:transform 0.4s var(--ease); }
        .hc:hover { background: rgba(50,197,244,0.03); }
        .hc:hover::before { transform: scaleX(1); }
        .hc__num { font-family:var(--font-mono); font-size:0.58rem; letter-spacing:3px; color:rgba(50,197,244,0.35); margin-bottom:12px; display:block; }
        .hc__tag { font-family:var(--font-mono); font-size:0.6rem; letter-spacing:0.2em; color:var(--cyan); margin-bottom:8px; text-transform:uppercase; opacity:0.75; }
        .hc__label { font-family:var(--font-head); font-size:clamp(1.6rem,3.5vw,2.2rem); letter-spacing:0.08em; line-height:1; color:var(--white); margin-bottom:12px; transition:color var(--tr); }
        .hc:hover .hc__label { color: var(--yellow); }
        .hc__sub { font-family:var(--font-mono); font-size:0.78rem; color:var(--muted); line-height:1.6; max-width:260px; }
        .hc__arrow { position:absolute; bottom:22px; right:26px; font-size:1.2rem; color:rgba(50,197,244,0.25); transition:color var(--tr),transform var(--tr); }
        .hc:hover .hc__arrow { color:var(--cyan); transform:translate(3px,-3px); }
        @media(max-width:480px){ .hc { padding: 28px 20px 42px; } }
      `}</style>
      <Link to={to} className="hc">
        {num && <span className="hc__num">{num}</span>}
        {tag && <div className="hc__tag">{tag}</div>}
        <div className="hc__label">{label}</div>
        {sub && <div className="hc__sub">{sub}</div>}
        <span className="hc__arrow">↗</span>
      </Link>
    </>
  );
}

function SiteFooter() {
  return (
    <>
      <style>{`
        .sf { background:#000; border-top:1px solid rgba(50,197,244,0.12); padding:40px 40px 32px;
              display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:24px; }
        .sf__brand { font-family:var(--font-head); font-size:1.4rem; letter-spacing:0.14em; color:var(--yellow); }
        .sf__brand span { color:var(--cyan); }
        .sf__nav { display:flex; gap:20px; flex-wrap:wrap; justify-content:center; }
        .sf__nav a { font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.16em; color:var(--muted); transition:color var(--tr); }
        .sf__nav a:hover { color:var(--cyan); }
        .sf__copy { font-family:var(--font-mono); font-size:0.62rem; color:rgba(255,255,255,0.2); text-align:right; letter-spacing:0.08em; }
        @media(max-width:700px){ .sf { grid-template-columns:1fr; text-align:center; padding:32px 20px; } .sf__copy { text-align:center; } }
      `}</style>
      <footer className="sf">
        <div className="sf__brand">CINEMA<span>PAYYAN</span> INC.</div>
        <nav className="sf__nav">{NAV_LINKS.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}</nav>
        <div className="sf__copy">© 2025 · EST. 2014 · CHENNAI</div>
      </footer>
    </>
  );
}

// ─────────────────────────────────────────────
//  CANVAS
// ─────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles = Array.from({ length: 80 }, () => ({
      x:  Math.random() * 1400,
      y:  Math.random() * 900,
      vy: 0.3 + Math.random() * 0.6,
      vx: (Math.random() - 0.5) * 0.18,
      op: 0.05 + Math.random() * 0.2,
      r:  Math.random() > 0.55 ? 1.4 : 0.65,
      c:  Math.random() > 0.42 ? "#32c5f4" : "#fde047",
    }));

    let t = 0, raf;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.006;

      ctx.strokeStyle = `rgba(50,197,244,${0.016 + Math.sin(t) * 0.006})`;
      ctx.lineWidth = 0.4;
      for (let x = 0; x < W + 80; x += 80) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H + 80; y += 80) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      const sy = ((t * 55) % (H + 100)) - 50;
      const sg = ctx.createLinearGradient(0, sy-50, 0, sy+50);
      sg.addColorStop(0,   "rgba(50,197,244,0)");
      sg.addColorStop(0.5, "rgba(50,197,244,0.022)");
      sg.addColorStop(1,   "rgba(50,197,244,0)");
      ctx.fillStyle = sg; ctx.fillRect(0, sy-50, W, 100);

      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.c; ctx.globalAlpha = p.op; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y > H + 4) { p.y = -4; p.x = Math.random() * W; }
        if (p.x < -4 || p.x > W + 4) p.x = Math.random() * W;
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:1, pointerEvents:"none" }} />;
}

// ─────────────────────────────────────────────
//  ANIMATED STAT
// ─────────────────────────────────────────────
function AnimStat({ num, sup, label, isStatic }) {
  const [val, setVal] = useState(isStatic ? num : 0);
  const [on, setOn]   = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isStatic) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [isStatic]);

  useEffect(() => {
    if (!on || isStatic) return;
    let t0 = null;
    const raf = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / 1600, 1);
      setVal(Math.floor(p * num));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [on, num, isStatic]);

  const lines = label.split("\n");
  return (
    <div ref={ref} className="hs__stat">
      <span className="hs__snum">{val}{sup && <sup className="hs__ssup">{sup}</sup>}</span>
      <span className="hs__slbl">{lines[0]}<br />{lines[1]}</span>
    </div>
  );
}

// ═════════════════════════════════════════════
//  HOME PAGE
// ═════════════════════════════════════════════
const TICKER_ITEMS = ["CINEMAPAYYAN","PRODUCTIONS","STORYTELLING","DIRECTION","COMEDY","DRAMA","SHORTS","ORIGINALS","CHENNAI","EST 2014"];

function HomePage() {
  return (
    <>
      <style>{`
        /* ══ HERO SECTION ══ */
        .hs {
          position: relative; min-height: 100svh;
          display: flex; flex-direction: column;
          background: #000; overflow: hidden;
        }

        /* film-strip columns — desktop only */
        .hs__strip {
          position: absolute; top: 0; bottom: 0; width: 40px;
          z-index: 4; pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 10px,
            rgba(0,0,0,0.88) 10px, rgba(0,0,0,0.88) 22px,
            transparent 22px, transparent 32px
          );
          display: flex; flex-direction: column;
          align-items: center; padding-top: 70px; gap: 10px;
        }
        .hs__strip--l { left:0; border-right: 1px solid rgba(50,197,244,0.08); }
        .hs__strip--r { right:0; border-left: 1px solid rgba(50,197,244,0.08); }
        .hs__hole {
          width: 16px; height: 11px; border-radius: 2px;
          background: #000; border: 1px solid rgba(50,197,244,0.15);
          flex-shrink: 0;
        }

        /* overlays */
        .hs__vig {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 70% at 50% 45%, transparent 25%, rgba(0,0,0,0.88) 80%),
            linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.75) 100%);
        }
        .hs__crt {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.055) 3px, rgba(0,0,0,0.055) 4px);
        }

        /* corner brackets */
        .hs__corner {
          position: absolute; width: 22px; height: 22px; z-index: 10; pointer-events: none;
        }
        .hs__corner--tl { top:68px; left:50px; border-top:1.5px solid rgba(50,197,244,0.45); border-left:1.5px solid rgba(50,197,244,0.45); }
        .hs__corner--tr { top:68px; right:50px; border-top:1.5px solid rgba(50,197,244,0.45); border-right:1.5px solid rgba(50,197,244,0.45); }
        .hs__corner--bl { bottom:48px; left:50px; border-bottom:1.5px solid rgba(253,224,71,0.3); border-left:1.5px solid rgba(253,224,71,0.3); }
        .hs__corner--br { bottom:48px; right:50px; border-bottom:1.5px solid rgba(253,224,71,0.3); border-right:1.5px solid rgba(253,224,71,0.3); }

        /* REC badge */
        .hs__rec {
          position: absolute; top: 72px; right: 60px; z-index: 10; pointer-events: none;
          display: flex; align-items: center; gap: 6px;
        }
        .hs__rec-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #ff3333;
          box-shadow: 0 0 10px rgba(255,50,50,0.9);
          animation: recB 1.1s step-end infinite;
        }
        @keyframes recB { 0%,100%{opacity:1} 50%{opacity:0} }
        .hs__rec-txt { font-family:var(--font-mono); font-size:0.5rem; letter-spacing:3px; color:rgba(255,60,60,0.85); }

        /* ── MAIN CONTENT ── */
        .hs__content {
          position: relative; z-index: 10;
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 90px 56px 28px;
          text-align: center; gap: 0;
        }

        .hs__eyebrow {
          font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 8px;
          color: rgba(50,197,244,0.6); text-transform: uppercase;
          margin-bottom: 20px; display: flex; align-items: center; gap: 16px;
        }
        .hs__eyebrow::before, .hs__eyebrow::after {
          content:''; display:block; height:1px; width:44px;
          background: rgba(50,197,244,0.32);
        }

        /* GIANT TITLE */
        .hs__title {
          font-family: var(--font-head);
          font-size: clamp(56px, 14vw, 160px);
          line-height: 0.86; letter-spacing: 0.03em;
          margin-bottom: 4px;
        }
        .hs__t1 { color: var(--white); display: block; }
        .hs__t2 {
          color: var(--cyan); display: block;
          text-shadow: 0 0 70px rgba(50,197,244,0.45), 0 0 140px rgba(50,197,244,0.15);
        }
        .hs__inc {
          font-family: var(--font-head);
          font-size: clamp(11px, 2vw, 22px);
          color: var(--yellow); letter-spacing: 10px;
          display: block; margin-top: 8px;
          text-shadow: 0 0 20px rgba(253,224,71,0.5);
          animation: incP 3s ease-in-out infinite;
        }
        @keyframes incP { 0%,100%{opacity:.4} 50%{opacity:1} }

        /* rule */
        .hs__rule {
          width: clamp(80px, 26%, 200px); height: 1.5px;
          background: linear-gradient(90deg, transparent, var(--cyan) 30%, var(--yellow) 70%, transparent);
          margin: 22px auto; opacity: 0.65;
        }

        .hs__tagline {
          font-family: var(--font-mono); font-size: clamp(0.72rem, 1.8vw, 0.92rem);
          color: rgba(255,255,255,0.35); line-height: 1.9; max-width: 400px; margin: 0 auto 24px;
        }
        .hs__tagline strong { color:rgba(255,255,255,0.78); font-weight:400; border-bottom:1px solid rgba(253,224,71,0.35); padding-bottom:1px; }

        /* STATS */
        .hs__stats {
          display: flex; border: 1px solid rgba(50,197,244,0.1);
          width: 100%; max-width: 420px; margin-bottom: 28px;
        }
        .hs__stat {
          flex:1; padding:14px 6px;
          display:flex; flex-direction:column; align-items:center; gap:3px;
        }
        .hs__stat + .hs__stat { border-left: 1px solid rgba(50,197,244,0.1); }
        .hs__snum { font-family:var(--font-head); font-size:clamp(1.5rem,4vw,2.4rem); color:var(--cyan); line-height:1; }
        .hs__ssup { font-size:0.5em; vertical-align:super; color:var(--yellow); }
        .hs__slbl { font-family:var(--font-mono); font-size:0.42rem; letter-spacing:2.5px; color:rgba(255,255,255,0.28); text-transform:uppercase; text-align:center; line-height:1.55; }

        /* bottom row */
        .hs__bottom {
          display: flex; align-items: flex-end; justify-content: space-between;
          width: 100%; max-width: 420px;
        }
        .hs__byl { font-family:var(--font-mono); font-size:0.48rem; letter-spacing:4px; color:rgba(50,197,244,0.38); display:block; margin-bottom:3px; }
        .hs__byn { font-family:var(--font-head); font-size:clamp(1rem,2.5vw,1.7rem); color:rgba(255,255,255,0.62); letter-spacing:4px; }
        .hs__scrollind { display:flex; flex-direction:column; align-items:center; gap:5px; }
        .hs__scrlbl { font-family:var(--font-mono); font-size:0.42rem; letter-spacing:4px; color:rgba(255,255,255,0.18); text-transform:uppercase; }
        .hs__mouse { width:18px; height:28px; border:1px solid rgba(50,197,244,0.22); border-radius:9px; display:flex; justify-content:center; padding-top:5px; }
        .hs__wheel { width:2px; height:5px; background:var(--cyan); border-radius:2px; animation:wh 1.5s ease-in-out infinite; }
        @keyframes wh { 0%,100%{transform:translateY(0);opacity:1} 60%{transform:translateY(7px);opacity:0} }
        .hs__scrl { width:1px; height:18px; background:linear-gradient(to bottom,var(--cyan),transparent); animation:sl 2s ease-in-out infinite; }
        @keyframes sl { 0%,100%{opacity:.2} 50%{opacity:1} }

        /* ── TICKER ── */
        .hs__ticker {
          position: relative; z-index: 10;
          background: rgba(50,197,244,0.04);
          border-bottom: 1px solid rgba(50,197,244,0.13);
          height: 38px; overflow: hidden;
          display: flex; align-items: center;
        }
        .hs__ttrack { display:flex; white-space:nowrap; animation:tick 30s linear infinite; }
        @keyframes tick { to { transform:translateX(-50%); } }
        .hs__titem { font-family:var(--font-head); font-size:0.95rem; letter-spacing:6px; color:rgba(50,197,244,0.58); padding:0 24px; flex-shrink:0; }
        .hs__tsep { color:var(--yellow); margin:0 2px; }

        /* ══ EXPLORE SECTION ══ */
        .home-explore-label {
          display:flex; align-items:center; gap:16px; padding:48px 40px 24px;
        }
        .home-explore-label__line {
          flex:1; height:1px;
          background:linear-gradient(90deg, rgba(50,197,244,0.22), transparent);
        }
        .home-explore-label__line--r {
          background:linear-gradient(90deg, transparent, rgba(253,224,71,0.18));
        }
        .home-explore-label__txt {
          font-family:var(--font-mono); font-size:0.6rem; letter-spacing:0.22em;
          color:rgba(50,197,244,0.45); text-transform:uppercase; white-space:nowrap;
        }

        /* ══ CINEMATIC TILES ══ */
        .htiles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(50,197,244,0.07);
        }

        .htile {
          position: relative; overflow: hidden;
          background: #000; padding: 40px 32px 54px;
          display: flex; flex-direction: column;
          cursor: pointer; min-height: 220px;
          transition: background 0.35s;
          text-decoration: none; color: inherit;
        }
        /* left accent bar grows on hover */
        .htile::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
          background:linear-gradient(to bottom, var(--cyan), var(--yellow));
          transform:scaleY(0); transform-origin:top;
          transition:transform 0.45s var(--ease);
        }
        /* top shine sweep */
        .htile::after {
          content:''; position:absolute; top:0; left:-80%; width:60%; height:100%;
          background:linear-gradient(105deg, transparent 40%, rgba(50,197,244,0.04) 50%, transparent 60%);
          transition:left 0.6s var(--ease); pointer-events:none;
        }
        .htile:hover { background: rgba(50,197,244,0.032); }
        .htile:hover::before { transform: scaleY(1); }
        .htile:hover::after  { left: 120%; }

        /* ghost large number */
        .htile__bgn {
          position:absolute; bottom:-8px; right:10px;
          font-family:var(--font-head); font-size:6.5rem; line-height:1;
          color:rgba(255,255,255,0.022); pointer-events:none; user-select:none;
          transition:color 0.35s;
        }
        .htile:hover .htile__bgn { color:rgba(50,197,244,0.055); }

        .htile__num { font-family:var(--font-mono); font-size:0.56rem; letter-spacing:3px; color:rgba(50,197,244,0.38); margin-bottom:12px; }
        .htile__tag { font-family:var(--font-mono); font-size:0.58rem; letter-spacing:0.2em; color:var(--cyan); margin-bottom:8px; text-transform:uppercase; opacity:0.7; }
        .htile__lbl {
          font-family:var(--font-head);
          font-size:clamp(1.7rem, 3.5vw, 2.4rem);
          letter-spacing:0.07em; line-height:1; color:var(--white);
          margin-bottom:10px; transition:color 0.3s;
        }
        .htile:hover .htile__lbl { color:var(--yellow); }
        .htile__sub { font-family:var(--font-mono); font-size:0.75rem; color:var(--muted); line-height:1.65; margin-top:auto; max-width:230px; }
        .htile__arrow { position:absolute; bottom:20px; right:22px; font-size:1.1rem; color:rgba(50,197,244,0.22); transition:color 0.3s,transform 0.3s; }
        .htile:hover .htile__arrow { color:var(--cyan); transform:translate(3px,-3px); }

        /* featured: 2 col span, bigger label */
        .htile--feat { grid-column:span 2; min-height:260px; }
        .htile--feat .htile__lbl { font-size:clamp(2.2rem,5vw,3.8rem); }
        .htile--feat::before { background:linear-gradient(to bottom, var(--yellow), var(--cyan)); }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .htiles { grid-template-columns: repeat(2,1fr); }
          .htile--feat { grid-column: span 2; }
          .hs__strip--l, .hs__strip--r { display:none; }
          .hs__corner { display:none; }
        }
        @media (max-width: 600px) {
          .htiles { grid-template-columns: 1fr; }
          .htile--feat { grid-column: span 1; }
          .htile { min-height:160px; padding:28px 20px 44px; }
          .htile__lbl { font-size:2rem; }
          .htile--feat .htile__lbl { font-size:2.4rem; }
          .hs__content { padding:80px 24px 24px; }
          .hs__eyebrow::before, .hs__eyebrow::after { width:20px; }
          .hs__stats { max-width:100%; }
          .hs__bottom { flex-direction:column; align-items:center; gap:16px; }
          .hs__rec { top:66px; right:24px; }
          .home-explore-label { padding:32px 20px 18px; }
        }
        @media (max-width:380px) {
          .hs__title { font-size: 46px; }
        }
      `}</style>

      <div style={{ background: "var(--black)" }}>
        <GlobalNav transparent />

        {/* ══ HERO ══ */}
        <section className="hs">
          <HeroCanvas />
          <div className="hs__vig" />
          <div className="hs__crt" />

          {/* film-strip sides */}
          <div className="hs__strip hs__strip--l">
            {Array.from({ length: 40 }).map((_,i) => <div key={i} className="hs__hole" />)}
          </div>
          <div className="hs__strip hs__strip--r">
            {Array.from({ length: 40 }).map((_,i) => <div key={i} className="hs__hole" />)}
          </div>

          {/* corners */}
          <div className="hs__corner hs__corner--tl" />
          <div className="hs__corner hs__corner--tr" />
          <div className="hs__corner hs__corner--bl" />
          <div className="hs__corner hs__corner--br" />

          {/* REC */}
          <div className="hs__rec">
            <div className="hs__rec-dot" />
            <span className="hs__rec-txt">REC</span>
          </div>

          {/* content */}
          <div className="hs__content">
            <div className="hs__eyebrow">EST. 2014 · CHENNAI</div>

            <h1 className="hs__title">
              <span className="hs__t1">CINEMA</span>
              <span className="hs__t2">PAYYAN</span>
              <span className="hs__inc">INC</span>
            </h1>

            <div className="hs__rule" />

            <p className="hs__tagline">
              <strong>Storytelling</strong> through a cinematic lens —<br />
              where every frame is a declaration.
            </p>

            <div className="hs__stats">
              <AnimStat num={10}  sup="+" label={"YEARS OF\nEVOLUTION"} />
              <AnimStat num={44}  sup="K" label={"INSTAGRAM\nFOLLOWERS"} />
              <AnimStat num="∞"         label={"CINEMATIC\nVISION"} isStatic />
            </div>

            <div className="hs__bottom">
              <div>
                <span className="hs__byl">CINEMA ENTREPRENEUR</span>
                <div className="hs__byn">ABISHEK RAAJA</div>
              </div>
              <div className="hs__scrollind">
                <span className="hs__scrlbl">EXPLORE</span>
                <div className="hs__mouse"><div className="hs__wheel" /></div>
                <div className="hs__scrl" />
              </div>
            </div>
          </div>

          {/* ticker */}
          <div className="hs__ticker">
            <div className="hs__ttrack">
              {[0,1].map(r => TICKER_ITEMS.map((w,i) => (
                <span key={`${r}-${i}`} className="hs__titem">{w}<span className="hs__tsep"> ◆ </span></span>
              )))}
            </div>
          </div>
        </section>

        {/* ══ EXPLORE TILES ══ */}
        <div className="home-explore-label">
          <div className="home-explore-label__line" />
          <span className="home-explore-label__txt">— SELECT YOUR DESTINATION</span>
          <div className="home-explore-label__line home-explore-label__line--r" />
        </div>

        <div className="htiles">
          {/* WORK — featured, spans 2 columns */}
          <Link to="/work" className="htile htile--feat">
            <span className="htile__num">02</span>
            <div className="htile__tag">PROJECTS</div>
            <div className="htile__lbl">WORK</div>
            <div className="htile__sub">VJ Sessions · Open Pannaa · Shorts · Comics & more</div>
            <div className="htile__bgn">02</div>
            <span className="htile__arrow">↗</span>
          </Link>

          <Link to="/services" className="htile">
            <span className="htile__num">03</span>
            <div className="htile__tag">WHAT I DO</div>
            <div className="htile__lbl">SERVICES</div>
            <div className="htile__sub">Host · Director · Producer · Accelerator</div>
            <div className="htile__bgn">03</div>
            <span className="htile__arrow">↗</span>
          </Link>

          <Link to="/about" className="htile">
            <span className="htile__num">01</span>
            <div className="htile__tag">WHO I AM</div>
            <div className="htile__lbl">ABOUT</div>
            <div className="htile__sub">The person behind the camera and the mic.</div>
            <div className="htile__bgn">01</div>
            <span className="htile__arrow">↗</span>
          </Link>

          <Link to="/partners" className="htile">
            <span className="htile__num">04</span>
            <div className="htile__tag">TIE-UPS</div>
            <div className="htile__lbl">PARTNERS</div>
            <div className="htile__sub">Brands & production houses.</div>
            <div className="htile__bgn">04</div>
            <span className="htile__arrow">↗</span>
          </Link>

          <Link to="/contact" className="htile">
            <span className="htile__num">05</span>
            <div className="htile__tag">GET IN TOUCH</div>
            <div className="htile__lbl">BOOK A SESSION</div>
            <div className="htile__sub">Collaborate or commission a project.</div>
            <div className="htile__bgn">05</div>
            <span className="htile__arrow">↗</span>
          </Link>

          <Link to="/munai" className="htile">
            <span className="htile__num">06</span>
            <div className="htile__tag">PORTAL</div>
            <div className="htile__lbl">MUNAI</div>
            <div className="htile__sub">A dedicated project page.</div>
            <div className="htile__bgn">06</div>
            <span className="htile__arrow">↗</span>
          </Link>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}

// ═════════════════════════════════════════════
//  OTHER PAGES
// ═════════════════════════════════════════════
const bcrumb = (crumbs) => <Breadcrumb crumbs={crumbs} />;
const H = { label: "HOME", to: "/" };

function AboutPage()       { return <PageShell>{bcrumb([H,{label:"ABOUT"}])}<PageHero title="ABOUT" subtitle="Filmmaker. Host. Director. Creative Producer." tag="Who I Am" /><About /></PageShell>; }
function WorkHubPage() {
  return (
    <PageShell>
      {bcrumb([H,{label:"WORK"}])}
      <PageHero title="WORK" subtitle="Browse projects by category." tag="Projects" />
      <HubGrid cols={3}>
        <HubCard to="/work/finished"    label="FINISHED PROJECTS"  tag="Portfolio"   num="01" sub="Completed productions and releases." />
        <HubCard to="/work/vj-session"  label="VJ SESSION"         tag="Live"        num="02" sub="VJ work, mixing and live performance." />
        <HubCard to="/work/open-pannaa" label="OPEN PANNAA"        tag="Film Critic" num="03" sub="Reviews, critiques and film essays." />
        <HubCard to="/work/shorts"      label="SHORTS PROMOTION"   tag="Promo"       num="04" sub="Short film promotional content." />
        <HubCard to="/work/shadow"      label="SHADOW PROMOTION"   tag="Promo"       num="05" sub="Shadow promotional campaigns." />
        <HubCard to="/work/comic"       label="RETRO BTS COMIC"    tag="BTS"         num="06" sub="Behind-the-scenes in comic form." />
      </HubGrid>
    </PageShell>
  );
}
function VjSessionPage()    { return <PageShell>{bcrumb([H,{label:"WORK",to:"/work"},{label:"VJ SESSION"}])}<PageHero title="VJ SESSION" tag="Live / Mix" /><AboutWork /></PageShell>; }
function OpenPannaaPage()   { return <PageShell>{bcrumb([H,{label:"WORK",to:"/work"},{label:"OPEN PANNAA"}])}<PageHero title="OPEN PANNAA" tag="Film Critic" /><Filmcritic /></PageShell>; }
function ShortsPage()       { return <PageShell>{bcrumb([H,{label:"WORK",to:"/work"},{label:"SHORTS PROMOTION"}])}<PageHero title="SHORTS PROMOTION" tag="Promo" /><ShortsPromotion /></PageShell>; }
function ShadowPage()       { return <PageShell>{bcrumb([H,{label:"WORK",to:"/work"},{label:"SHADOW PROMOTION"}])}<PageHero title="SHADOW PROMOTION" tag="Promo" /><ShadowPromotion /></PageShell>; }
function ComicPage()        { return <PageShell>{bcrumb([H,{label:"WORK",to:"/work"},{label:"RETRO BTS COMIC"}])}<PageHero title="RETRO BTS COMIC" tag="BTS" /><Comic /></PageShell>; }
function FinishedWorkPage() { return <PageShell>{bcrumb([H,{label:"WORK",to:"/work"},{label:"FINISHED PROJECTS"}])}<PageHero title="FINISHED PROJECTS" tag="Portfolio" /><Work /></PageShell>; }
function ServicesHubPage() {
  return (
    <PageShell>
      {bcrumb([H,{label:"SERVICES"}])}
      <PageHero title="SERVICES" subtitle="What I bring to your project." tag="What I Do" />
      <HubGrid cols={2}>
        <HubCard to="/services/host"        label="HOST"              tag="On-Screen"     num="01" sub="MC, presenter and on-camera host work." />
        <HubCard to="/services/director"    label="DIRECTOR"          tag="Behind Camera" num="02" sub="Narrative and commercial direction." />
        <HubCard to="/services/producer"    label="CREATIVE PRODUCER" tag="Production"    num="03" sub="End-to-end creative production management." />
        <HubCard to="/services/accelerator" label="ACCELERATOR"       tag="Growth"        num="04" sub="The Accelerator programme for creatives." />
      </HubGrid>
    </PageShell>
  );
}
function HostPage()        { return <PageShell>{bcrumb([H,{label:"SERVICES",to:"/services"},{label:"HOST"}])}<PageHero title="HOST" tag="On-Screen" /><Host /></PageShell>; }
function DirectorPage()    { return <PageShell>{bcrumb([H,{label:"SERVICES",to:"/services"},{label:"DIRECTOR"}])}<PageHero title="DIRECTOR" tag="Behind Camera" /><Director /></PageShell>; }
function ProducerPage()    { return <PageShell>{bcrumb([H,{label:"SERVICES",to:"/services"},{label:"CREATIVE PRODUCER"}])}<PageHero title="CREATIVE PRODUCER" tag="Production" /><CreativeProducer /></PageShell>; }
function AcceleratorPage() { return <PageShell>{bcrumb([H,{label:"SERVICES",to:"/services"},{label:"ACCELERATOR"}])}<PageHero title="THE ACCELERATOR" tag="Growth Programme" /><Accelerator /></PageShell>; }
function PartnersPage()    { return <PageShell>{bcrumb([H,{label:"PARTNERS"}])}<PageHero title="TIE-UP PARTNERS" tag="Collaborators" /><ProductionLogo /></PageShell>; }
function ContactPage()     { return <PageShell>{bcrumb([H,{label:"CONTACT"}])}<PageHero title="BOOK A SESSION" tag="Get In Touch" /><Contact /></PageShell>; }

// ═════════════════════════════════════════════
//  ROOT
// ═════════════════════════════════════════════
function App() {
  return (
    <Router basename={repoBasename}>
      <style>{TOKENS}</style>
      <Routes>
        <Route path="/"                       element={<HomePage />} />
        <Route path="/about"                  element={<AboutPage />} />
        <Route path="/work"                   element={<WorkHubPage />} />
        <Route path="/work/vj-session"        element={<VjSessionPage />} />
        <Route path="/work/open-pannaa"       element={<OpenPannaaPage />} />
        <Route path="/work/shorts"            element={<ShortsPage />} />
        <Route path="/work/shadow"            element={<ShadowPage />} />
        <Route path="/work/comic"             element={<ComicPage />} />
        <Route path="/work/finished"          element={<FinishedWorkPage />} />
        <Route path="/services"               element={<ServicesHubPage />} />
        <Route path="/services/host"          element={<HostPage />} />
        <Route path="/services/director"      element={<DirectorPage />} />
        <Route path="/services/producer"      element={<ProducerPage />} />
        <Route path="/services/accelerator"   element={<AcceleratorPage />} />
        <Route path="/partners"               element={<PartnersPage />} />
        <Route path="/contact"                element={<ContactPage />} />
        <Route path="/munai"                  element={<Munai />} />
      </Routes>
    </Router>
  );
}

export default App;
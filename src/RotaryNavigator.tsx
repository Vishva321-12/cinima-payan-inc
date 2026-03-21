import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface CinemaNavigatorProps {
  refs: {
    homeRef?: React.RefObject<HTMLElement>;
    aboutRef?: React.RefObject<HTMLElement>;
    workRef?: React.RefObject<HTMLElement>;
    promotionsRef?: React.RefObject<HTMLElement>;
    contactRef?: React.RefObject<HTMLElement>;
  };
}

/* ── Sections — matches App.tsx order exactly ── */
const SECTIONS = [
  { id: "home",        label: "HOME",              sub: "WELCOME",           ref: "homeRef",      route: null        },
  { id: "about",       label: "ABOUT",             sub: "IDENTITY",          ref: "aboutRef",     route: null        },
  { id: "channels",    label: "CINEMA CHANNELS",   sub: "VJ · FILM · RJ",   ref: null,           route: null        },
  { id: "host",        label: "HOST",              sub: "ON STAGE",          ref: null,           route: null        },
  { id: "director",    label: "DIRECTOR",          sub: "BEHIND LENS",       ref: null,           route: null        },
  { id: "producer",    label: "CREATIVE PRODUCER", sub: "BACKING THE RIGHT", ref: "promotionsRef",route: null        },
  { id: "accelerator", label: "ACCELERATOR",       sub: "INDUSTRY LINKS",    ref: null,           route: null        },
  { id: "inkblood",    label: "INKBLOOD",          sub: "BTS COMIC",         ref: null,           route: null        },
  { id: "shorts",      label: "SHORTS",            sub: "PROMOTIONS",        ref: null,           route: null        },
  { id: "work",        label: "FINISHED PROJECTS", sub: "PORTFOLIO",         ref: "workRef",      route: null        },
  { id: "partners",    label: "TIE-UP PARTNERS",   sub: "COLLABORATIONS",    ref: null,           route: null        },
  { id: "contact",     label: "CONTACT",           sub: "BOOK A SESSION",    ref: "contactRef",   route: null        },
  { id: "munai",       label: "MUNAI",             sub: "ORIGINALS",         ref: null,           route: "/munai"    },
];

export default function CinemaNavigator({ refs }: CinemaNavigatorProps) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const isMunai   = location.pathname.includes("/munai");

  const [activeIdx,  setActiveIdx]  = useState(0);
  const [expanded,   setExpanded]   = useState(false);
  const [visible,    setVisible]    = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);

  /* ── show nav after 80px scroll (always visible on Munai) ── */
  useEffect(() => {
    if (isMunai) { setVisible(true); return; }
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMunai]);

  /* ── track active section (skip on Munai) ── */
  useEffect(() => {
    if (isMunai) return;
    const fn = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const mid = window.innerHeight * 0.4;
        let best = 0, bestD = Infinity;
        SECTIONS.forEach((sec, i) => {
          const el = (sec.ref ? (refs as any)[sec.ref]?.current : null)
                  || document.getElementById(sec.id);
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - mid);
          if (d < bestD) { bestD = d; best = i; }
        });
        setActiveIdx(best);
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [refs, isMunai]);

  const goHome = useCallback(() => {
    navigate("/");
    setMobileOpen(false);
    setExpanded(false);
  }, [navigate]);

  const scrollTo = useCallback((sec: typeof SECTIONS[0]) => {
    if (sec.route) {
      navigate(sec.route);
      setMobileOpen(false);
      setExpanded(false);
      return;
    }
    if (isMunai) {
      // on Munai page — navigate home first, then scroll after landing
      navigate("/");
      setTimeout(() => {
        const el = (sec.ref ? (refs as any)[sec.ref]?.current : null)
                 || document.getElementById(sec.id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
      setMobileOpen(false);
      setExpanded(false);
      return;
    }
    const el = (sec.ref ? (refs as any)[sec.ref]?.current : null)
             || document.getElementById(sec.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
    setExpanded(false);
  }, [refs, navigate, isMunai]);

  const handleMouseEnter = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    setExpanded(true);
  };
  const handleMouseLeave = () => {
    collapseTimer.current = setTimeout(() => setExpanded(false), 400);
  };

  const activeSection = isMunai
    ? SECTIONS.find(s => s.id === "munai")
    : SECTIONS[activeIdx];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700&display=swap');

        /* ════════════════════════════════
           DESKTOP VERTICAL STRIP
        ════════════════════════════════ */
        .cnav-wrap {
          position: fixed;
          right: 0; top: 50%;
          transform: translateY(-50%);
          z-index: 9500;
          display: flex;
          flex-direction: row;
          align-items: center;
          pointer-events: none;
          transition: opacity 0.4s, transform 0.4s;
        }
        .cnav-wrap.cnav-hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-50%) translateX(20px);
        }
        .cnav-wrap.cnav-visible {
          opacity: 1;
          pointer-events: all;
          transform: translateY(-50%) translateX(0);
        }

        /* active section floating label */
        .cnav-active-badge {
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          margin-right: 12px;
          opacity: 0;
          transform: translateX(6px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .cnav-wrap.cnav-expanded .cnav-active-badge {
          opacity: 1;
          transform: translateX(0);
        }
        .cnav-badge-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.38rem; letter-spacing: 4px;
          color: rgba(50,197,244,0.6); text-transform: uppercase;
          white-space: nowrap;
        }
        .cnav-badge-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem; letter-spacing: 4px;
          color: rgba(255,255,255,0.5);
          line-height: 1; white-space: nowrap;
        }

        /* the strip */
        .cnav-strip {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          background: rgba(5,8,14,0.85);
          border: 1px solid rgba(50,197,244,0.10);
          border-right: none;
          padding: 10px 0;
          backdrop-filter: blur(12px);
          position: relative;
        }
        .cnav-strip::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 2px; height: 100%;
          background: linear-gradient(to bottom,
            transparent,
            rgba(50,197,244,0.35) 30%,
            rgba(253,224,71,0.35) 70%,
            transparent);
        }

        /* expand toggle */
        .cnav-toggle {
          pointer-events: all;
          position: absolute; left: -20px; top: 50%;
          transform: translateY(-50%);
          width: 20px; height: 40px;
          background: rgba(5,8,14,0.9);
          border: 1px solid rgba(50,197,244,0.15);
          border-right: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          transition: color 0.25s, background 0.25s;
        }
        .cnav-toggle:hover { background: rgba(50,197,244,0.08); color: #32c5f4; }

        /* each row */
        .cnav-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          gap: 0;
          width: 100%;
          cursor: pointer;
          padding: 5px 10px 5px 0;
          transition: background 0.2s;
          position: relative;
        }
        .cnav-item:hover { background: rgba(50,197,244,0.04); }

        /* label — slides in when expanded */
        .cnav-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.44rem;
          letter-spacing: 3.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          white-space: nowrap;
          max-width: 0;
          overflow: hidden;
          opacity: 0;
          margin-right: 0;
          transition: max-width 0.35s cubic-bezier(0.77,0,0.18,1),
                      opacity 0.28s ease,
                      color 0.2s,
                      margin-right 0.3s;
        }
        .cnav-wrap.cnav-expanded .cnav-label {
          max-width: 140px;
          opacity: 1;
          margin-right: 8px;
        }
        .cnav-item:hover .cnav-label,
        .cnav-item.cnav-active .cnav-label {
          color: rgba(255,255,255,0.85);
        }
        .cnav-item.cnav-active .cnav-label {
          color: #fde047;
        }

        /* dot */
        .cnav-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          flex-shrink: 0;
          transition: background 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .cnav-item:hover .cnav-dot {
          background: #32c5f4;
          transform: scale(1.4);
        }
        .cnav-item.cnav-active .cnav-dot {
          background: #fde047;
          box-shadow: 0 0 8px rgba(253,224,71,0.8);
          transform: scale(1.7);
        }

        /* section number ghost */
        .cnav-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.5rem;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.12);
          margin-right: 4px;
          min-width: 14px;
          text-align: right;
          flex-shrink: 0;
          max-width: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-width 0.35s cubic-bezier(0.77,0,0.18,1), opacity 0.28s;
        }
        .cnav-wrap.cnav-expanded .cnav-num {
          max-width: 20px;
          opacity: 1;
        }
        .cnav-item.cnav-active .cnav-num { color: rgba(253,224,71,0.3); }

        /* ════════════════════════════════
           MOBILE FAB + DRAWER
        ════════════════════════════════ */
        .cnav-fab {
          display: none;
          position: fixed;
          top: 0; right: 0;
          z-index: 9600;
          width: auto; height: auto;
          background: rgba(5,8,14,0.92);
          border: none;
          border-bottom: 1px solid rgba(253,224,71,0.25);
          border-left: 1px solid rgba(253,224,71,0.25);
          border-radius: 0 0 0 10px;
          align-items: center; justify-content: center;
          gap: 7px;
          padding: 7px 14px 8px;
          cursor: pointer;
          color: #fde047;
          pointer-events: all;
          transition: background 0.25s, border-color 0.25s;
        }
        .cnav-fab:active {
          background: rgba(10,20,32,0.98);
          border-color: rgba(253,224,71,0.5);
        }
        .cnav-fab-txt {
          font-family: 'Inter', sans-serif;
          font-size: 0.42rem; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(50,197,244,0.85);
          white-space: nowrap; max-width: 90px;
          overflow: hidden; text-overflow: ellipsis;
        }

        .cnav-drawer {
          display: none;
          position: fixed; inset: 0;
          z-index: 9550;
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(16px);
          flex-direction: column;
          padding: 56px 24px 40px;
          overflow-y: auto;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s;
        }
        .cnav-drawer.cnav-drawer-open {
          opacity: 1;
          pointer-events: all;
        }

        .cnav-drawer-close {
          position: absolute; top: 16px; right: 16px;
          width: 38px; height: 38px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.55);
        }

        .cnav-drawer-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem; letter-spacing: 6px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 28px;
        }
        .cnav-drawer-title span { color: #fde047; }

        .cnav-drawer-list { display: flex; flex-direction: column; gap: 0; }

        .cnav-drawer-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: padding-left 0.22s;
        }
        .cnav-drawer-item:hover { padding-left: 6px; }
        .cnav-drawer-item:last-child { border-bottom: none; }

        .cnav-drawer-item.cnav-drawer-active .cnav-drawer-dot { background: #fde047; box-shadow: 0 0 8px rgba(253,224,71,0.6); }
        .cnav-drawer-item.cnav-drawer-active .cnav-drawer-name { color: #fde047; }
        .cnav-drawer-item.cnav-drawer-route .cnav-drawer-name {
          color: rgba(253,224,71,0.7);
        }
        .cnav-drawer-item.cnav-drawer-route .cnav-drawer-dot {
          background: rgba(253,224,71,0.4);
        }
        .cnav-drawer-item.cnav-drawer-route:hover .cnav-drawer-name {
          color: #fde047;
        }

        .cnav-drawer-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.18); flex-shrink: 0;
          transition: background 0.2s;
        }
        .cnav-drawer-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem; letter-spacing: 2px;
          color: rgba(255,255,255,0.1);
          min-width: 24px; flex-shrink: 0;
        }
        .cnav-drawer-item.cnav-drawer-active .cnav-drawer-num { color: rgba(253,224,71,0.25); }
        .cnav-drawer-text { flex: 1; }
        .cnav-drawer-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem; letter-spacing: 3px;
          color: rgba(255,255,255,0.7);
          line-height: 1; display: block;
          transition: color 0.2s;
        }
        .cnav-drawer-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.38rem; letter-spacing: 4px;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          display: block; margin-top: 2px;
        }

        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */
        @media (max-width: 768px) {
          .cnav-wrap { display: none; }
          .cnav-fab  { display: flex; }
          .cnav-drawer { display: flex; }
        }
        @media (min-width: 769px) {
          .cnav-fab    { display: none !important; }
          .cnav-drawer { display: none !important; }
        }
      `}</style>

      {/* ════ DESKTOP STRIP ════ */}
      <div
        className={`cnav-wrap ${visible ? "cnav-visible" : "cnav-hidden"} ${expanded ? "cnav-expanded" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* floating active section badge */}
        <div className="cnav-active-badge">
          {isMunai && (
            <span className="cnav-badge-sub" style={{color:"rgba(253,224,71,0.7)"}}>← BACK TO MAIN SITE</span>
          )}
          <span className="cnav-badge-sub">{activeSection?.sub}</span>
          <span className="cnav-badge-label">{activeSection?.label}</span>
        </div>

        {/* expand chevron */}
        <div className="cnav-toggle" onClick={() => setExpanded(e => !e)}>
          <svg viewBox="0 0 12 12" width="9" height="9" fill="none">
            <path
              d={expanded ? "M8 2L4 6l4 4" : "M4 2l4 4-4 4"}
              stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="cnav-strip">
          {/* Home button — always pinned at top, highlighted on Munai */}
          {isMunai && (
            <div
              className="cnav-item cnav-home-pin"
              onClick={goHome}
              title="Back to Home"
              style={{borderBottom:"1px solid rgba(253,224,71,0.15)",marginBottom:"4px",paddingBottom:"8px"}}
            >
              <span className="cnav-label" style={{color:"rgba(253,224,71,0.8)",maxWidth:"140px",opacity:1,marginRight:"8px"}}>
                ← HOME
              </span>
              <span className="cnav-dot" style={{background:"#fde047",boxShadow:"0 0 8px rgba(253,224,71,0.8)"}} />
            </div>
          )}
          {SECTIONS.map((sec, i) => (
            <div
              key={sec.id}
              className={`cnav-item${!isMunai && activeIdx === i ? " cnav-active" : ""}${isMunai && sec.id === "munai" ? " cnav-active" : ""}`}
              onClick={() => scrollTo(sec)}
              title={sec.label}
            >
              <span className="cnav-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="cnav-label">
                {sec.label}{sec.route ? " ↗" : ""}
              </span>
              <span className="cnav-dot" style={sec.route ? {background:"rgba(253,224,71,0.35)"} : undefined} />
            </div>
          ))}
        </div>
      </div>

      {/* ════ MOBILE FAB — top-right corner tab ════ */}
      <button
        className="cnav-fab"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
          <path d="M3 5h14M3 10h14M3 15h14"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <span className="cnav-fab-txt">
          {isMunai ? "← HOME" : activeSection?.label}
        </span>
      </button>

      {/* ════ MOBILE DRAWER ════ */}
      <div
        className={`cnav-drawer${mobileOpen ? " cnav-drawer-open" : ""}`}
        style={{ display: "flex" }}
      >
        <button className="cnav-drawer-close" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
            <path d="M2 2l12 12M14 2L2 14"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <h2 className="cnav-drawer-title">
          {isMunai ? <><span>MUNAI</span> · NAVIGATE</> : <>NAVIGATE <span>·</span></>}
        </h2>

        {/* Home shortcut on Munai */}
        {isMunai && (
          <div
            className="cnav-drawer-item"
            onClick={goHome}
            style={{
              marginBottom:"16px",
              paddingBottom:"16px",
              borderBottom:"1px solid rgba(253,224,71,0.15)",
              background:"rgba(253,224,71,0.03)",
              padding:"14px 12px",
              borderRadius:"2px",
            }}
          >
            <span className="cnav-drawer-dot" style={{background:"#fde047",boxShadow:"0 0 7px rgba(253,224,71,0.6)"}} />
            <span className="cnav-drawer-num" style={{color:"rgba(253,224,71,0.35)"}}>←</span>
            <div className="cnav-drawer-text">
              <span className="cnav-drawer-name" style={{color:"#fde047"}}>BACK TO HOME</span>
              <span className="cnav-drawer-sub">MAIN SITE</span>
            </div>
          </div>
        )}

        <div className="cnav-drawer-list">
          {SECTIONS.map((sec, i) => (
            <div
              key={sec.id}
              className={`cnav-drawer-item${!isMunai && activeIdx === i ? " cnav-drawer-active" : ""}${isMunai && sec.id === "munai" ? " cnav-drawer-active" : ""}${sec.route ? " cnav-drawer-route" : ""}`}
              onClick={() => scrollTo(sec)}
            >
              <span className="cnav-drawer-dot" />
              <span className="cnav-drawer-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="cnav-drawer-text">
                <span className="cnav-drawer-name">
                  {sec.label}
                  {sec.route && (
                    <span style={{fontSize:"0.5rem",letterSpacing:"2px",color:"rgba(253,224,71,0.5)",marginLeft:"8px",verticalAlign:"middle"}}>↗</span>
                  )}
                </span>
                <span className="cnav-drawer-sub">{sec.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
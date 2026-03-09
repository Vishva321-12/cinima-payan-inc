import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Images } from "./assets/assets";
// import "./App.css";
import Header           from "./Header";
import Hero             from "./Hero";
import Logo             from "./Logo";
import { useScrollTo }  from "./useScrollTo";
import About            from "./About";
import Work             from "./Work";
import ProductionLogo   from "./ProductionLogo";
import Comic            from "./Comic";
import ShortsPromotion  from "./ShortsPromotion";
import ShadowPromotion  from "./ShadowPromotion";
import Contact          from "./Contact";
import Footer           from "./Footer";
import Munai            from "./Munai";
import AboutWork        from "./VjSession";
import Filmcritic       from "./openpannaa";
import Host             from "./Host";
import Director         from "./Director";
import CreativeProducer from "./CreativeProducer";
import Accelerator      from "./Accelerator";
import SectionDivider   from "./Sectiondivider";

function App() {
  const [offset,     setOffset]     = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollToSection, refs }   = useScrollTo();
  const repoBasename = "/cinima-payan-inc";

  // ── FIX 2: throttled scroll listener via rAF ──
  useEffect(() => {
    let ticking = false;
    const h = () => {
      if (!isMenuOpen && !ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setOffset(window.pageYOffset);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const handleScrollRequest = (target: any) => {
    setIsMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <Router basename={repoBasename}>
      <style>{`
        /* ── HAMBURGER ── */
        .cp-app-burger {
          position: fixed;
          top: 18px; right: 18px;
          z-index: 9999;
          display: none;
          flex-direction: column; gap: 6px;
          cursor: pointer; padding: 12px 14px;
          /* FIX 4: removed backdrop-filter blur, use solid bg + will-change */
          background: rgba(0,0,0,0.92);
          border: 1px solid rgba(253,224,71,0.22);
          transition: border-color 0.3s;
          will-change: transform;
        }
        .cp-app-burger:hover { border-color: rgba(253,224,71,0.55); }
        .cp-app-burger.open  { border-color: rgba(253,224,71,0.5); background: rgba(0,0,0,0.95); }

        .cp-app-burger-line {
          width: 26px; height: 1.5px;
          background: #fde047;
          transition: transform 0.38s cubic-bezier(0.77,0,0.18,1), opacity 0.25s;
          transform-origin: center;
        }
        .cp-app-burger.open .cp-app-burger-line:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .cp-app-burger.open .cp-app-burger-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .cp-app-burger.open .cp-app-burger-line:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

        @media (max-width: 1024px) {
          .cp-app-burger { display: flex; }
        }

        /* ── FIX 1: parallax banner — no background-attachment:fixed ── */
        .cinenaPaitanBanner {
          background-attachment: scroll !important;
          will-change: transform;
        }
      `}</style>

      <div
        className={`cp-app-burger ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span className="cp-app-burger-line" />
        <span className="cp-app-burger-line" />
        <span className="cp-app-burger-line" />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* ── HERO ────────────────────────────── */}
              <div className="App" id="home" ref={refs.homeRef}>
                <Header
                  onScrollRequest={handleScrollRequest}
                  refs={refs}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
                <Logo />
                <Hero onScrollRequest={handleScrollRequest} />
              </div>

              {/* ── PARALLAX BANNER ─────────────────── */}
              <div className="container1">
                <div
                  className="cinenaPaitanBanner"
                  style={{
                    backgroundImage: `url(${Images.banner})`,
                    "--scroll-offset": `${offset}px`,
                  } as any}
                >
                  <div className="banner-overlay" />
                </div>
              </div>

              <SectionDivider variant="timecode"  label="CUT TO — ABOUT"               index={1}  />
              <section id="about" ref={refs.aboutRef}><About /></section>

              <SectionDivider variant="filmstrip" label="VJ SESSION"                              />
              <AboutWork />

              <SectionDivider variant="slash"     label="OPEN PANNAA"                  index={3}  />
              <Filmcritic />

              <SectionDivider variant="reel"      label="HOST"                                    />
              <Host />

              <SectionDivider variant="scanline"  label="DIRECTOR"                     index={5}  />
              <Director />

              <SectionDivider variant="marquee"   label="CINEMAPAYYAN • CREATIVE PRODUCER"        />
              <section id="promotions" ref={refs.promotionsRef}><CreativeProducer /></section>

              <SectionDivider variant="timecode"  label="THE ACCELERATOR"              index={7}  />
              <Accelerator />

              <SectionDivider variant="filmstrip" label="FINISHED PROJECTS"                       />
              <section id="work" ref={refs.workRef}><Work /></section>

              <SectionDivider variant="slash"     label="TIE-UP PARTNERS"              index={9}  />
              <ProductionLogo />

              <SectionDivider variant="reel"      label="RETRO BTS COMIC"                         />
              <Comic />

              <SectionDivider variant="scanline"  label="SHORTS PROMOTION"             index={11} />
              <ShortsPromotion />

              <SectionDivider variant="marquee"   label="SHADOW PROMOTION"                        />
              <ShadowPromotion />

              <SectionDivider variant="timecode"  label="BOOK A SESSION"               index={13} />
              <section id="contact" ref={refs.contactRef}><Contact /></section>

              <SectionDivider variant="slash"     label="FIN"                          index={14} />
              <Footer />
            </>
          }
        />
        <Route path="/munai" element={<Munai />} />
      </Routes>
    </Router>
  );
}

export default App;
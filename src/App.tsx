import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Images } from "./assets/assets";
import Header from "./Header";
import Hero from "./Hero";
import Logo from "./Logo";
import { useScrollTo } from "./useScrollTo";
import About from "./About";
import Work from "./Work";
import ProductionLogo from "./ProductionLogo";
import Comic from "./Comic";
import ShortsPromotion from "./ShortsPromotion";
import ShadowPromotion from "./ShadowPromotion";
import Contact from "./Contact";
import Footer from "./Footer";
import Munai from "./Munai";
import AboutWork from "./VjSession";
import Filmcritic from "./openpannaa";
import RjArchives from "./RjArchives"; // ← NEW standalone RJ component
import Host from "./Host";
import Director from "./Director";
import CreativeProducer from "./CreativeProducer";
import Accelerator from "./Accelerator";
import SectionDivider from "./Sectiondivider";
import CinemaNavigator from "./RotaryNavigator";

function App() {
  const [offset, setOffset] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { scrollToSection, refs } = useScrollTo();
  const repoBasename = "/cinima-payan-inc";

  useEffect(() => {
    let ticking = false;
    const h = (): void => {
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

  const handleScrollRequest = (target: any): void => {
    setIsMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <Router basename={repoBasename}>
      <style>{`
        .cinenaPaitanBanner {
          background-attachment: scroll !important;
          will-change: transform;
        }

        /* ── Film Critic Identity Heading ── */
        .fci-heading-block {
          background: #000;
          padding: 72px clamp(20px, 6%, 60px) 64px;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          position: relative;
        }
        .fci-heading-block::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.12) 50%, transparent);
        }
        .fci-name-display {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 7.5vw, 7rem);
          font-weight: 400; letter-spacing: clamp(4px, 1vw, 10px);
          color: #fff; line-height: 0.92; margin: 0 0 16px;
        }
        .fci-roles-row { display: flex; align-items: center; flex-wrap: wrap; justify-content: center; }
        .fci-role {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.9rem, 2.2vw, 1.5rem);
          letter-spacing: clamp(3px, 0.6vw, 6px);
          color: rgba(255,255,255,0.4); text-transform: uppercase; white-space: nowrap;
        }
        .fci-role-dot { color: #fde047; margin: 0 clamp(8px, 1.2vw, 16px); opacity: 0.55; font-size: 1.1rem; }
        .fci-sub-list { display: flex; align-items: center; flex-wrap: wrap; justify-content: center; margin-top: 16px; }
        .fci-sub-item {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.2vw, 0.6rem);
          font-weight: 400; letter-spacing: 4px;
          color: rgba(255,255,255,0.25); text-transform: uppercase; white-space: nowrap;
        }
        .fci-sub-sep { color: rgba(50,197,244,0.4); margin: 0 clamp(6px, 1vw, 14px); font-size: 0.5rem; }
        .fci-heading-rule {
          width: clamp(80px, 20%, 180px); height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.35), rgba(50,197,244,0.2), transparent);
          margin-top: 22px;
        }

        /* ── Banner purchase link ── */
        .banner-purchase-wrap { position: relative; }
        .banner-purchase-link {
          position: absolute; bottom: 24px; left: 50%;
          transform: translateX(-50%); z-index: 20;
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none;
          background: rgba(0,0,0,0.72); backdrop-filter: blur(14px);
          border: 1px solid rgba(253,224,71,0.45);
          padding: 10px 22px;
          color: rgba(255,255,255,0.88);
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.3vw, 0.58rem);
          font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
          white-space: nowrap; overflow: hidden;
          transition: color 0.3s, border-color 0.3s;
          animation: bpl-pulse 2.8s ease-in-out infinite;
        }
        @keyframes bpl-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(253,224,71,0); border-color: rgba(253,224,71,0.45); }
          50%      { box-shadow: 0 0 18px 4px rgba(253,224,71,0.18); border-color: rgba(253,224,71,0.75); }
        }
        .banner-purchase-link::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.38s cubic-bezier(0.77,0,0.18,1);
        }
        .banner-purchase-link:hover::before { transform: scaleX(1); }
        .banner-purchase-link:hover { color: #000; border-color: #fde047; }
        .banner-purchase-link > * { position: relative; z-index: 1; }
        .banner-purchase-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #fde047; box-shadow: 0 0 8px rgba(253,224,71,0.9);
          flex-shrink: 0; animation: bpd 1.4s step-end infinite;
        }
        @keyframes bpd { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .banner-purchase-icon {
          width: 14px; height: 14px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }

        @media (max-width: 600px) {
          .fci-heading-block { padding: 52px 16px 48px; }
          .banner-purchase-link { bottom: 14px; padding: 8px 16px; font-size: 0.5rem; letter-spacing: 2.5px; }
        }
      `}</style>

      <CinemaNavigator refs={refs} />

      <Routes>
        <Route
          path="/"
          element={
            <>
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

              {/* ── BANNER with purchase link ── */}
              <div className="container1 banner-purchase-wrap">
                <div
                  className="cinenaPaitanBanner"
                  style={{
                    backgroundImage: `url(${Images.banner})`,
                    "--scroll-offset": `${offset}px`,
                  } as any}
                >
                  <div className="banner-overlay" />
                </div>
                <a
                  href="https://coveritup.com/collections/hoodies-sweatshirts"
                  target="_blank" rel="noreferrer"
                  className="banner-purchase-link"
                >
                  <span className="banner-purchase-dot" />
                  <span className="banner-purchase-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </span>
                  <span>SHOP THE LOOK — COVER IT UP</span>
                </a>
              </div>

              <SectionDivider variant="timecode" label="CUT TO — ABOUT" index={1} />
              <section id="about" ref={refs.aboutRef}>
                <About />
              </section>

              {/* ── FILM CRITIC IDENTITY HEADING ── */}
              <SectionDivider variant="filmstrip" label="FILM CRITIC · REVIEWER · ANALYST" />
              <div className="fci-heading-block">
                <h2 className="fci-name-display">Abishek Raaja</h2>
                <div className="fci-roles-row">
                  {["Film Critic", "Reviewer", "Analyst", "Industry Tracker"].map((r, i, arr) => (
                    <span key={i}>
                      <span className="fci-role">{r}</span>
                      {i < arr.length - 1 && <span className="fci-role-dot">·</span>}
                    </span>
                  ))}
                </div>
                <div className="fci-sub-list">
                  {["Curated Conversations — VJ Sessions", "Open Pannaa", "Breaking Down Cinema", "RJ"].map((item, i, arr) => (
                    <span key={i}>
                      <span className="fci-sub-item">{item}</span>
                      {i < arr.length - 1 && <span className="fci-sub-sep">•</span>}
                    </span>
                  ))}
                </div>
                <div className="fci-heading-rule" />
              </div>

              {/* ══ 1. VJ SESSIONS ══ */}
              <SectionDivider variant="filmstrip" label="VJ SESSION" />
              <section id="vjsession">
                <AboutWork />
              </section>

              {/* ══ 2. OPEN PANNAA ══ */}
              <SectionDivider variant="slash" label="OPEN PANNAA" index={2} />
              <section id="openpannaa">
                <Filmcritic />
              </section>

              {/* ══ 3. RJ ARCHIVES ══ */}
              <SectionDivider variant="reel" label="RJ ARCHIVES" index={3} />
              <section id="rjarchives">
                <RjArchives />
              </section>

              {/* ── remaining sections ── */}
              <SectionDivider variant="reel" label="HOST" />
              <section id="host">
                <Host />
              </section>

              <SectionDivider variant="scanline" label="DIRECTOR" index={5} />
              <section id="director">
                <Director />
              </section>

              <SectionDivider variant="marquee" label="CINEMAPAYYAN • CREATIVE PRODUCER" />
              <section id="producer" ref={refs.promotionsRef}>
                <CreativeProducer />
              </section>

              <SectionDivider variant="timecode" label="THE ACCELERATOR" index={7} />
              <section id="accelerator">
                <Accelerator />
              </section>

              <SectionDivider variant="filmstrip" label="FINISHED PROJECTS" />
              <section id="work" ref={refs.workRef}>
                <Work />
              </section>

              <SectionDivider variant="slash" label="TIE-UP PARTNERS" index={9} />
              <section id="partners">
                <ProductionLogo />
              </section>

              <SectionDivider variant="reel" label="RETRO BTS COMIC" />
              <section id="comic">
                <Comic />
              </section>

              <SectionDivider variant="scanline" label="SHORTS PROMOTION" index={11} />
              <section id="shorts">
                <ShortsPromotion />
              </section>

              <SectionDivider variant="marquee" label="SHADOW PROMOTION" />
              <section id="shadow">
                <ShadowPromotion />
              </section>

              <SectionDivider variant="timecode" label="BOOK A SESSION" index={13} />
              <section id="contact" ref={refs.contactRef}>
                <Contact />
              </section>

              <SectionDivider variant="slash" label="FIN" index={14} />
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
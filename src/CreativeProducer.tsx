import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, Clapperboard, ExternalLink, Star } from "lucide-react";
import { Images } from "./assets/assets";

/* ─── MAIN ──────────────────────────────────── */
const CreativeProducer = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');

        .cpcp-section {
          background: #0e0814;
          background: radial-gradient(ellipse at top center, #1a0d28 0%, #0e0814 55%, #090610 100%);
          padding: 90px 0 110px;
          overflow: hidden;
          position: relative;
        }
        .cpcp-section::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.1) 50%, transparent);
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
        .cpcp-overline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.5vw, 0.6rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(255,255,255,0.55); text-transform: uppercase;
          display: block; margin-bottom: 5px;
        }
        .cpcp-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 3.2rem);
          font-weight: 400; letter-spacing: 3px;
          color: #fff; line-height: 1; margin: 0;
        }
        .cpcp-heading-yellow { color: #fde047; }

        /* ═══════════════════════════════════════
           TOP LOGO BLOCK — centered
        ═══════════════════════════════════════ */
        .cpcp-logo-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 64px;
        }

        .cpcp-logo-corners {
          position: relative;
          display: inline-block;
        }
        .cpcp-logo-corner { position: absolute; width: 20px; height: 20px; pointer-events: none; }
        .cpcp-logo-corner--tl { top:-10px; left:-10px; border-top:1px solid rgba(253,224,71,0.5); border-left:1px solid rgba(253,224,71,0.5); }
        .cpcp-logo-corner--tr { top:-10px; right:-10px; border-top:1px solid rgba(253,224,71,0.5); border-right:1px solid rgba(253,224,71,0.5); }
        .cpcp-logo-corner--bl { bottom:-10px; left:-10px; border-bottom:1px solid rgba(50,197,244,0.4); border-left:1px solid rgba(50,197,244,0.4); }
        .cpcp-logo-corner--br { bottom:-10px; right:-10px; border-bottom:1px solid rgba(50,197,244,0.4); border-right:1px solid rgba(50,197,244,0.4); }

        .cpcp-logo-img {
          width: clamp(160px, 26vw, 280px);
          height: auto; display: block;
          filter: drop-shadow(0 0 40px rgba(253,224,71,0.15)) drop-shadow(0 20px 50px rgba(0,0,0,0.85));
          transition: filter 0.5s ease, transform 0.5s ease;
        }
        .cpcp-logo-corners:hover .cpcp-logo-img {
          filter: drop-shadow(0 0 55px rgba(253,224,71,0.28)) drop-shadow(0 20px 50px rgba(0,0,0,0.85));
          transform: scale(1.03);
        }

        .cpcp-logo-insta {
          margin-top: 22px;
          display: inline-flex; align-items: center; gap: 9px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.56rem);
          font-weight: 700; letter-spacing: 4px;
          text-transform: uppercase; text-decoration: none;
          white-space: nowrap;
          color: rgba(255,255,255,0.85);
          background: rgba(14,8,20,0.85);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(253,224,71,0.35);
          padding: 10px 24px;
          position: relative; overflow: hidden;
          transition: color 0.3s;
        }
        .cpcp-logo-insta::before {
          content: '';
          position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.38s cubic-bezier(0.77,0,0.18,1);
        }
        .cpcp-logo-insta:hover::before { transform: scaleX(1); }
        .cpcp-logo-insta:hover { color: #000; }
        .cpcp-logo-insta svg,
        .cpcp-logo-insta span { position: relative; z-index: 1; }

        .cpcp-logo-meta { margin-top: 28px; text-align: center; }

        .cpcp-pre {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 10px;
        }
        .cpcp-pre-line { width: 28px; height: 1px; background: #fde047; opacity: 0.5; }
        .cpcp-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.48rem, 1.2vw, 0.6rem);
          font-weight: 400; letter-spacing: 6px;
          color: rgba(253,224,71,0.8); text-transform: uppercase;
        }

        .cpcp-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 400; letter-spacing: 4px;
          color: #fff; line-height: 0.95; margin: 0 0 14px;
        }
        .cpcp-title-yellow { color: #fde047; }

        .cpcp-tagline-pills {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: center; margin: 0 0 16px;
        }
        .cpcp-pill {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.1vw, 0.56rem);
          font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          padding: 5px 14px; border: 1px solid; white-space: nowrap;
        }
        .cpcp-pill--1 { color: #32c5f4; border-color: rgba(50,197,244,0.35); background: rgba(50,197,244,0.06); }
        .cpcp-pill--2 { color: #fde047; border-color: rgba(253,224,71,0.35); background: rgba(253,224,71,0.06); }
        .cpcp-pill--3 { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.04); }

        .cpcp-rule {
          width: clamp(160px, 40%, 380px); margin: 0 auto 16px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.3), rgba(50,197,244,0.2), transparent);
        }
        .cpcp-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.82rem, 1.2vw, 0.95rem);
          font-weight: 300;
          color: rgba(255,255,255,0.65); line-height: 1.85;
          max-width: 560px; margin: 0 auto;
        }
        .cpcp-highlight { color: #fff; font-weight: 700; border-bottom: 1px solid rgba(253,224,71,0.4); }

        /* ═══════════════════════════════════════
           TWO CARDS SIDE BY SIDE
        ═══════════════════════════════════════ */
        .cpcp-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 50px;
        }

        .cpcp-lcu-card {
          position: relative;
          border: 1px solid rgba(253,224,71,0.25);
          background: rgba(253,224,71,0.03);
          padding: 0; overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s;
          text-decoration: none;
          display: flex; flex-direction: column;
        }
        .cpcp-lcu-card:hover {
          border-color: rgba(253,224,71,0.55);
          box-shadow: 0 8px 32px rgba(253,224,71,0.08);
        }
        .cpcp-lcu-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 3px; height: 100%;
          background: linear-gradient(to bottom, #fde047, #32c5f4);
          z-index: 6;
        }
        .cpcp-lcu-card--cyan { border-color: rgba(50,197,244,0.25); background: rgba(50,197,244,0.02); }
        .cpcp-lcu-card--cyan:hover { border-color: rgba(50,197,244,0.5); box-shadow: 0 8px 32px rgba(50,197,244,0.07); }
        .cpcp-lcu-card--cyan::before { background: linear-gradient(to bottom, #32c5f4, #fde047); }

        /* ── image area ── */
        .cpcp-lcu-img-wrap {
          position: relative; width: 100%;
          background: #0a0614; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }

        /* Madras — contain, full poster visible, centered */
        .cpcp-lcu-img-wrap--contain {
          padding: 20px 12%;
          min-height: 220px;
        }
        .cpcp-lcu-img-wrap--contain .cpcp-lcu-img {
          width: auto; max-width: 100%; max-height: 340px; height: auto;
          object-fit: contain; position: static;
        }

        /* LCU — cover landscape */
        .cpcp-lcu-img-wrap--cover {
          aspect-ratio: 16/9;
        }
        .cpcp-lcu-img-wrap--cover .cpcp-lcu-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
        }

        .cpcp-lcu-img {
          display: block;
          transition: transform 0.65s ease, filter 0.45s ease;
          filter: brightness(0.88) saturate(0.9);
        }
        .cpcp-lcu-card:hover .cpcp-lcu-img {
          transform: scale(1.04);
          filter: brightness(1) saturate(1.05);
        }
        .cpcp-lcu-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(14,8,20,0.65) 100%);
          pointer-events: none; z-index: 2;
        }
        .cpcp-lcu-img-tl, .cpcp-lcu-img-br {
          position: absolute; width: 14px; height: 14px;
          pointer-events: none; z-index: 4;
        }
        .cpcp-lcu-img-tl { top:10px; left:14px; border-top:1px solid rgba(253,224,71,0.6); border-left:1px solid rgba(253,224,71,0.6); }
        .cpcp-lcu-img-br { bottom:10px; right:10px; border-bottom:1px solid rgba(50,197,244,0.5); border-right:1px solid rgba(50,197,244,0.5); }
        .cpcp-lcu-play {
          position: absolute; bottom: 12px; right: 12px;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(253,224,71,0.92);
          display: flex; align-items: center; justify-content: center;
          z-index: 4; opacity: 0; transform: scale(0.8);
          transition: opacity 0.3s, transform 0.3s;
        }
        .cpcp-lcu-card:hover .cpcp-lcu-play { opacity: 1; transform: scale(1); }

        /* card body */
        .cpcp-lcu-body {
          padding: 16px 20px 18px 20px;
          position: relative; flex: 1;
        }
        .cpcp-lcu-body::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(253,224,71,0.04), transparent 60%);
          opacity: 0; transition: opacity 0.35s; pointer-events: none;
        }
        .cpcp-lcu-card:hover .cpcp-lcu-body::after { opacity: 1; }

        .cpcp-lcu-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .cpcp-lcu-badge {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 0.42rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #000;
          background: #fde047; padding: 3px 8px; white-space: nowrap;
        }
        .cpcp-lcu-badge--cyan { background: #32c5f4; }
        .cpcp-lcu-view-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem; letter-spacing: 3px;
          color: rgba(255,255,255,0.5); text-transform: uppercase;
          margin-left: auto; display: flex; align-items: center; gap: 6px;
        }
        .cpcp-lcu-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.05rem, 1.9vw, 1.4rem);
          letter-spacing: 3px; color: #fff; line-height: 1.1; margin: 0 0 8px;
        }
        .cpcp-lcu-title span { color: #fde047; }
        .cpcp-lcu-title-cyan { color: #32c5f4 !important; }
        .cpcp-lcu-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.67rem, 1vw, 0.76rem);
          font-weight: 300; letter-spacing: 0.3px;
          color: rgba(255,255,255,0.6); line-height: 1.75; margin: 0;
        }
        .cpcp-lcu-desc em { color: #32c5f4; font-style: normal; font-weight: 700; }
        .cpcp-lcu-footer {
          display: flex; align-items: center; gap: 8px;
          margin-top: 12px; padding-top: 10px;
          border-top: 1px solid rgba(253,224,71,0.1);
          flex-wrap: wrap;
        }
        .cpcp-lcu-collab {
          font-family: 'Inter', sans-serif;
          font-size: 0.44rem; font-weight: 400; letter-spacing: 1.5px;
          color: rgba(255,255,255,0.4); text-transform: uppercase;
          flex: 1; min-width: 0;
        }
        .cpcp-lcu-collab strong { color: rgba(253,224,71,0.7); font-weight: 700; }
        .cpcp-lcu-cta {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Inter', sans-serif;
          font-size: 0.44rem; font-weight: 700; letter-spacing: 2px;
          color: #fde047; text-transform: uppercase; flex-shrink: 0;
          transition: gap 0.3s;
        }
        .cpcp-lcu-card:hover .cpcp-lcu-cta { gap: 8px; }
        .cpcp-lcu-cta--cyan { color: #32c5f4; }
        .cpcp-lcu-mention {
          color: #32c5f4; font-weight: 700; text-decoration: none;
          border-bottom: 1px solid rgba(50,197,244,0.3);
          transition: color 0.2s, border-color 0.2s;
        }
        .cpcp-lcu-mention:hover { color: #fff; border-color: #fff; }
        .cpcp-lcu-collab-link { color: inherit; text-decoration: none; transition: color 0.2s; }
        .cpcp-lcu-collab-link:hover strong { color: #fff; }

        /* bottom CTA */
        .cpcp-cta-wrap { display: flex; justify-content: center; margin-top: 44px; }
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

        /* ════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════ */
        @media (max-width: 860px) {
          .cpcp-cards-grid {
            grid-template-columns: 1fr;
            max-width: 520px; margin-left: auto; margin-right: auto;
          }
        }
        @media (max-width: 700px) {
          .cpcp-header {
            flex-direction: column; align-items: flex-start;
            gap: 10px; padding: 0 clamp(16px,5%,40px); margin-bottom: 40px;
          }
          .cpcp-header-rule { display: none; }
          .cpcp-header-content { flex-direction: column; align-items: flex-start; gap: 10px; }
          .cpcp-header-icon { width: 30px; height: 30px; }
          .cpcp-lcu-view-label { display: none; }
        }
        @media (max-width: 600px) {
          .cpcp-section { padding: 60px 0 70px; }
          .cpcp-inner   { padding: 0 16px; }
          .cpcp-lcu-img-wrap--contain { padding: 14px 8%; min-height: 180px; }
          .cpcp-lcu-img-wrap--contain .cpcp-lcu-img { max-height: 260px; }
        }
      `}</style>

      <section className="cpcp-section">
        {/* ── SECTION HEADER ── */}
        <div className="cpcp-header" ref={headerRef}>
          <motion.div
            className="cpcp-header-rule"
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
            <div className="cpcp-header-icon">
              <Clapperboard size={18} />
            </div>
            <div>
              <span className="cpcp-overline">EVERY BET · A BLOCKBUSTER</span>
              <h2 className="cpcp-heading">
                CREATIVE <span className="cpcp-heading-yellow">PRODUCER</span>
              </h2>
            </div>
          </motion.div>
          <motion.div
            className="cpcp-header-rule cpcp-header-rule--r"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{
              delay: 0.15,
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </div>

        <div className="cpcp-inner">
          {/* ══ LOGO — top center ══ */}
          <motion.div
            className="cpcp-logo-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cpcp-logo-corners">
              <div className="cpcp-logo-corner cpcp-logo-corner--tl" />
              <div className="cpcp-logo-corner cpcp-logo-corner--tr" />
              <div className="cpcp-logo-corner cpcp-logo-corner--bl" />
              <div className="cpcp-logo-corner cpcp-logo-corner--br" />
              <img
                src={Images.logo}
                alt="CinemaPayyan"
                className="cpcp-logo-img"
              />
            </div>

            <a
              href="https://www.instagram.com/cinemapayyan.inc/"
              target="_blank"
              rel="noreferrer"
              className="cpcp-logo-insta"
            >
              <Instagram size={13} />
              <span>FOLLOW ON INSTAGRAM</span>
            </a>

            <div className="cpcp-logo-meta">
              <div className="cpcp-pre">
                <div className="cpcp-pre-line" />
                <span className="cpcp-pre-text">DIGITAL ARCHITECT</span>
                <div className="cpcp-pre-line" />
              </div>
              <h3 className="cpcp-title">
                TURNING FRAMES&nbsp;
                <span className="cpcp-title-yellow">INTO FAME</span>
              </h3>
              <div className="cpcp-tagline-pills">
                <span className="cpcp-pill cpcp-pill--1">Industry Tracker</span>
                <span className="cpcp-pill cpcp-pill--2">Content Curation</span>
                <span className="cpcp-pill cpcp-pill--3">Content Selling</span>
              </div>
              <div className="cpcp-rule" />
              <p className="cpcp-desc">
                I specialise in engineering the digital heartbeat of modern
                cinema — executing high-stakes reveal campaigns that transform
                raw cinematic footage into{" "}
                <span className="cpcp-highlight">unavoidable content</span>.
              </p>
            </div>
          </motion.div>

          {/* ══ TWO CARDS — left & right ══ */}
          <div className="cpcp-cards-grid">
            {/* LEFT — Madras Matinee */}
            <motion.div
              className="cpcp-lcu-card cpcp-lcu-card--cyan"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {/* full poster — contain, centered, no crop */}
              <div className="cpcp-lcu-img-wrap cpcp-lcu-img-wrap--contain">
                <img
                  src={Images.madrasMatniee}
                  alt="Madras Matinee"
                  className="cpcp-lcu-img"
                />
                <div className="cpcp-lcu-img-overlay" />
                <div className="cpcp-lcu-img-tl" />
                <div className="cpcp-lcu-img-br" />
                <a
                  href="https://www.instagram.com/madrasmotionpictures/"
                  target="_blank"
                  rel="noreferrer"
                  className="cpcp-lcu-play"
                >
                  <ExternalLink size={13} color="#000" />
                </a>
              </div>
              <div className="cpcp-lcu-body">
                <div className="cpcp-lcu-header">
                  <div className="cpcp-lcu-badge cpcp-lcu-badge--cyan">
                    <Star size={9} fill="black" />
                    FIRST AS CREATIVE PRODUCER
                  </div>
                  <span className="cpcp-lcu-view-label">
                    <Instagram size={11} />
                    VIEW
                  </span>
                </div>
                <h4 className="cpcp-lcu-title">
                  Madras <span className="cpcp-lcu-title-cyan">Matinee</span>
                </h4>
                <p className="cpcp-lcu-desc">
                  <a
                    href="https://www.instagram.com/DreamWarriorPictures/"
                    target="_blank"
                    rel="noreferrer"
                    className="cpcp-lcu-mention"
                  >
                    @dreamwarriorpictures
                  </a>{" "}
                  presents <em>#MadrasMatinee</em> — a{" "}
                  <a
                    href="https://www.instagram.com/madrasmotionpictures/"
                    target="_blank"
                    rel="noreferrer"
                    className="cpcp-lcu-mention"
                  >
                    @madrasmotionpictures
                  </a>{" "}
                  production 💥 A very special film from <em>@keyanmk</em> and
                  team. My <em>first</em> as a creative producer ❤️
                </p>
                <div className="cpcp-lcu-footer">
                  <span className="cpcp-lcu-collab">
                    <a
                      href="https://www.instagram.com/DreamWarriorPictures/"
                      target="_blank"
                      rel="noreferrer"
                      className="cpcp-lcu-collab-link"
                    >
                      <strong>@dreamwarriorpictures</strong>
                    </a>
                    {" × "}
                    <a
                      href="https://www.instagram.com/madrasmotionpictures/"
                      target="_blank"
                      rel="noreferrer"
                      className="cpcp-lcu-collab-link"
                    >
                      <strong>@madrasmotionpictures</strong>
                    </a>
                  </span>
                  <span className="cpcp-lcu-cta cpcp-lcu-cta--cyan">
                    <a
                      href="https://www.instagram.com/madrasmotionpictures/"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      INSTAGRAM <ExternalLink size={10} />
                    </a>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — LCU Most Hailed */}
            <motion.div
              className="cpcp-lcu-card"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              <div className="cpcp-lcu-img-wrap cpcp-lcu-img-wrap--cover">
                <img
                  src={Images.LCU}
                  alt="Origins of LCU"
                  className="cpcp-lcu-img"
                />
                <div className="cpcp-lcu-img-overlay" />
                <div className="cpcp-lcu-img-tl" />
                <div className="cpcp-lcu-img-br" />
                <a
                  href="https://www.instagram.com/p/DBjBOAWSI0X/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="cpcp-lcu-play"
                >
                  <ExternalLink size={13} color="#000" />
                </a>
              </div>
              <div className="cpcp-lcu-body">
                <div className="cpcp-lcu-header">
                  <div className="cpcp-lcu-badge">
                    <Star size={9} fill="black" />
                    MOST HAILED
                  </div>
                  <span className="cpcp-lcu-view-label">
                    <Instagram size={11} />
                    VIEW POST
                  </span>
                </div>
                <h4 className="cpcp-lcu-title">
                  10 Minute Prelude to the <span>Origins of LCU</span>
                </h4>
                <p className="cpcp-lcu-desc">
                  A teaching exercise that led to a{" "}
                  <em>'10 minute Prelude to the Origins of LCU'</em>.{" "}
                  <em>#ChapterZeroFL</em> unlock 💥 — where filmmaking education
                  collided with cinematic universe building in one explosive
                  session.
                </p>
                <div className="cpcp-lcu-footer">
                  <span className="cpcp-lcu-collab">
                    <a
                      href="https://www.instagram.com/gsquadoffl/"
                      target="_blank"
                      rel="noreferrer"
                      className="cpcp-lcu-collab-link"
                    >
                      <strong>@gsquadoffl</strong>
                    </a>
                    {" × "}
                    <strong>@cinemapayyan.inc</strong>
                    {" × "}
                    <a
                      href="https://www.instagram.com/levelup_filmmaking/"
                      target="_blank"
                      rel="noreferrer"
                      className="cpcp-lcu-collab-link"
                    >
                      <strong>@levelup_filmmaking</strong>
                    </a>
                  </span>
                  <span className="cpcp-lcu-cta">
                    <a
                      href="https://www.instagram.com/p/DBjBOAWSI0X/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=="
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      INSTAGRAM <ExternalLink size={10} />
                    </a>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* bottom CTA */}
          <div className="cpcp-cta-wrap">
            <motion.a
              href="https://www.instagram.com/cinemapayyan.inc/"
              target="_blank"
              rel="noreferrer"
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
        </div>
      </section>
    </>
  );
};

export default CreativeProducer;

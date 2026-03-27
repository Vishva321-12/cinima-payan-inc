import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTwitter, FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';

const BookingContact: React.FC = () => {
  const [isTorn,    setIsTorn]    = useState(false);
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const filmStrip = " • CINEMAPAYYAN • NOW BOOKING • ".repeat(20);

  const WEB3FORMS_KEY = "eb4aabc2-f58b-4521-a027-7295fa2c22e0";

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSending(true);

    const fd = new FormData(formRef.current);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject:    "New Booking — CinemaPayyan Productions",
          from_name:  "CinemaPayyan Booking",
          name:       fd.get("name"),
          email:      fd.get("email"),
          phone:      fd.get("phone"),
          message:    fd.get("message"),
        }),
      });
      const data = await res.json();

      if (data.success) {
        setIsTorn(true);
      } else {
        alert(`Booking failed: ${data.message || "Please try again."}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ═══════════════════════════════════════════
           BG: Deep Cinematic Amber-Black — #0c0800
           Flow: graphite-violet #0a0a0e → amber-black #0c0800
           Feels like: theatre house lights dimming to gold
           just before the curtain rises.
           The yellow ticket EXPLODES on this warm base.
        ═══════════════════════════════════════════ */
        .cp-bk-section {
          background: #0c0800;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        /* Top fade — violet graphite dissolves into amber-black */
        .cp-bk-top-fade {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 140px;
          background: linear-gradient(to bottom, rgba(10,10,14,0.55), transparent);
          pointer-events: none; z-index: 1;
        }

        /* Grand amber radial glow — center stage */
        .cp-bk-section::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 900px; height: 700px;
          background: radial-gradient(
            ellipse at center,
            rgba(253,224,71,0.07) 0%,
            rgba(200,120,10,0.04) 40%,
            transparent 70%
          );
          pointer-events: none; z-index: 0;
        }

        /* Kanji watermark — warm amber tint, finale theme */
        .cp-bk-section::after {
          content: '映';
          position: absolute;
          right: 3%; bottom: -20px;
          font-size: 22rem;
          color: rgba(253,180,30,0.025);
          font-family: serif; line-height: 1;
          pointer-events: none; user-select: none; z-index: 0;
        }

        /* Corner amber glow accents */
        .cp-bk-corner-tl {
          position: absolute;
          top: -80px; left: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(253,224,71,0.05) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }
        .cp-bk-corner-br {
          position: absolute;
          bottom: -80px; right: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(253,224,71,0.04) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }

        /* ═══════════════════════════════════════════
           MARQUEE BANDS — amber bg on amber-black = 🔥
        ═══════════════════════════════════════════ */
        .cp-bk-band {
          position: absolute;
          width: 150%;
          background: #fde047;
          padding: 10px 0;
          z-index: 1;
          overflow: hidden;
          /* subtle amber glow on band */
          box-shadow: 0 0 30px rgba(253,224,71,0.25);
        }
        .cp-bk-band--top    { top: 5%;    transform: rotate(-2deg); }
        .cp-bk-band--bottom { bottom: 5%; transform: rotate(1deg);  }

        .cp-bk-band-text {
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 5px;
          color: #000;
          text-transform: uppercase;
        }

        /* ═══════════════════════════════════════════
           TICKET AREA
        ═══════════════════════════════════════════ */
        .cp-bk-ticket-area {
          z-index: 10;
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0 clamp(16px, 5%, 40px);
        }

        /* ── THE TICKET ── */
        .cp-bk-ticket {
          background: #fde047;
          color: #000;
          width: 88vw;
          max-width: 960px;
          min-height: 480px;
          display: flex;
          box-shadow:
            0 40px 100px rgba(0,0,0,0.8),
            0 0 60px rgba(253,224,71,0.12),
            0 0 0 1px rgba(255,255,255,0.04);
          position: relative;
        }

        .cp-bk-ticket::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 20px; height: 20px;
          border-top: 2px solid rgba(0,0,0,0.25);
          border-left: 2px solid rgba(0,0,0,0.25);
          pointer-events: none; z-index: 5;
        }
        .cp-bk-ticket::after {
          content: '';
          position: absolute; bottom: 0; right: 0;
          width: 20px; height: 20px;
          border-bottom: 2px solid rgba(0,0,0,0.25);
          border-right: 2px solid rgba(0,0,0,0.25);
          pointer-events: none; z-index: 5;
        }

        .cp-bk-form { display: flex; width: 100%; }

        /* ── INFO SIDE ── */
        .cp-bk-info {
          flex: 2;
          padding: clamp(24px, 4vw, 44px);
        }

        .cp-bk-ticket-header {
          border-bottom: 1px solid rgba(0,0,0,0.2);
          margin-bottom: 28px;
          padding-bottom: 14px;
        }

        .cp-bk-ticket-pre {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 8px;
        }
        .cp-bk-ticket-pre-line {
          width: 24px; height: 1px;
          background: rgba(0,0,0,0.35);
        }
        .cp-bk-ticket-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 4px;
          color: rgba(0,0,0,0.7); text-transform: uppercase;
        }

        .cp-bk-ticket-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.2rem);
          font-weight: 400; color: #000;
          margin: 0 0 4px;
          letter-spacing: 3px; line-height: 1;
        }
        .cp-bk-ticket-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 4px;
          color: rgba(0,0,0,0.65); text-transform: uppercase; margin: 0;
        }

        /* inputs */
        .cp-bk-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .cp-bk-field { display: flex; flex-direction: column; gap: 5px; }
        .cp-bk-field--full { grid-column: span 2; }

        .cp-bk-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 4px;
          color: rgba(0,0,0,0.7); text-transform: uppercase;
        }

        .cp-bk-input,
        .cp-bk-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.2);
          padding: 7px 0;
          font-family: 'Inter', sans-serif;
          font-weight: 500; font-size: 0.95rem; color: #000;
          transition: border-color 0.25s;
          box-sizing: border-box;
        }
        .cp-bk-input::placeholder,
        .cp-bk-textarea::placeholder {
          color: rgba(0,0,0,0.3);
          font-style: italic; font-weight: 300;
        }
        .cp-bk-input:focus,
        .cp-bk-textarea:focus {
          outline: none;
          border-bottom-color: rgba(0,0,0,0.55);
        }
        .cp-bk-textarea { resize: none; }

        /* ── DIVIDER ── */
        .cp-bk-divider {
          width: 2px; position: relative;
          border-left: 2px dashed rgba(0,0,0,0.2);
          margin: 28px 0;
        }
        .cp-bk-punch {
          width: 40px; height: 40px;
          background: #0c0800;
          border-radius: 50%;
          position: absolute; left: -21px;
        }
        .cp-bk-punch--top    { top: -50px; }
        .cp-bk-punch--bottom { bottom: -50px; }

        /* ── STUB ── */
        .cp-bk-stub {
          flex: 0.8;
          padding: clamp(20px, 3.5vw, 40px);
          display: flex; flex-direction: column;
          justify-content: space-between;
          background: rgba(0,0,0,0.07);
          position: relative;
        }

        .cp-bk-stub-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 4px;
          color: rgba(0,0,0,0.7); text-transform: uppercase; margin: 0 0 12px;
        }

        .cp-bk-icons {
          display: flex; gap: 14px; margin-bottom: 16px;
        }
        .cp-bk-icons a {
          color: #000; font-size: 1.3rem;
          transition: opacity 0.2s; text-decoration: none;
        }
        .cp-bk-icons a:hover { opacity: 0.5; }

        .cp-bk-notion {
          display: flex; align-items: center;
          justify-content: center; gap: 8px;
          padding: 9px 14px;
          border: 1px solid rgba(0,0,0,0.3);
          background: transparent;
          color: #000; text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase;
          position: relative; overflow: hidden;
          transition: color 0.35s; margin-bottom: 0;
        }
        .cp-bk-notion::before {
          content: ''; position: absolute; inset: 0;
          background: #000;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-bk-notion:hover::before { transform: scaleX(1); }
        .cp-bk-notion:hover { color: #fde047; }
        .cp-bk-notion span,
        .cp-bk-notion svg { position: relative; z-index: 1; }

        .cp-bk-confirm {
          position: relative; overflow: hidden;
          width: 100%; padding: 15px;
          border: 1px solid #000;
          background: #000; color: #fde047;
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          cursor: pointer; transition: color 0.35s;
        }
        .cp-bk-confirm::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-bk-confirm:hover:not(:disabled)::before { transform: scaleX(1); }
        .cp-bk-confirm:hover:not(:disabled) { color: #000; }
        .cp-bk-confirm:disabled { opacity: 0.4; cursor: not-allowed; }
        .cp-bk-confirm span { position: relative; z-index: 1; }

        /* ── SUCCESS SCREEN ── */
        .cp-bk-success {
          background: #fde047;
          width: 88vw; max-width: 960px;
          min-height: 480px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: clamp(40px, 8vw, 100px);
          position: relative;
          box-shadow:
            0 40px 100px rgba(0,0,0,0.8),
            0 0 60px rgba(253,224,71,0.15);
        }
        .cp-bk-success::before {
          content: '';
          position: absolute; top:0; left:0;
          width: 20px; height: 20px;
          border-top: 2px solid rgba(0,0,0,0.25);
          border-left: 2px solid rgba(0,0,0,0.25);
        }
        .cp-bk-success::after {
          content: '';
          position: absolute; bottom:0; right:0;
          width: 20px; height: 20px;
          border-bottom: 2px solid rgba(0,0,0,0.25);
          border-right: 2px solid rgba(0,0,0,0.25);
        }

        .cp-bk-success-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 12vw, 8rem);
          font-weight: 400; color: #000;
          margin: 0 0 10px;
          letter-spacing: 5px; line-height: 1;
        }

        .cp-bk-success-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 5px;
          color: rgba(0,0,0,0.65); text-transform: uppercase; margin: 0 0 28px;
        }

        .cp-bk-success-rule {
          width: 80px; height: 1px;
          background: rgba(0,0,0,0.2);
          margin: 0 auto 28px;
        }

        .cp-bk-back {
          position: relative; overflow: hidden;
          padding: 12px 32px;
          border: 1px solid #000;
          background: #000; color: #fde047;
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          cursor: pointer; transition: color 0.35s;
        }
        .cp-bk-back::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0.15);
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .cp-bk-back:hover::before { transform: scaleX(1); }
        .cp-bk-back span { position: relative; z-index: 1; }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 768px) {
          .cp-bk-ticket { flex-direction: column; height: auto; width: 91vw; }
          .cp-bk-form   { flex-direction: column; }
          .cp-bk-info   { padding: 26px 18px; }
          .cp-bk-grid   { grid-template-columns: 1fr; }
          .cp-bk-field--full { grid-column: span 1; }
          .cp-bk-divider {
            width: 100%; height: 2px;
            border-left: none;
            border-top: 2px dashed rgba(0,0,0,0.18);
            margin: 0;
          }
          .cp-bk-punch {
            left: 50%; top: auto; bottom: auto;
            margin-left: -20px;
          }
          .cp-bk-punch--top    { top: -21px; }
          .cp-bk-punch--bottom { bottom: -21px; }
          .cp-bk-stub {
            padding: 24px 18px;
            flex-direction: row; flex-wrap: wrap;
            align-items: center; gap: 16px;
          }
          .cp-bk-confirm { width: 48%; }
        }

        @media (max-width: 480px) {
          .cp-bk-section  { padding: 70px 0; }
          .cp-bk-stub     { flex-direction: column; align-items: flex-start; }
          .cp-bk-confirm  { width: 100%; }
          .cp-bk-band-text { font-size: 0.6rem; }
        }
      `}</style>

      <section className="cp-bk-section">
        <div className="cp-bk-top-fade" />
        <div className="cp-bk-corner-tl" />
        <div className="cp-bk-corner-br" />

        {/* ── TOP BAND ────────────────────────────── */}
        <div className="cp-bk-band cp-bk-band--top">
          <motion.div
            className="cp-bk-band-text"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          >
            {filmStrip}
          </motion.div>
        </div>

        {/* ── TICKET AREA ─────────────────────────── */}
        <div className="cp-bk-ticket-area">
          <AnimatePresence mode="wait">
            {!isTorn ? (

              <motion.div
                key="ticket"
                className="cp-bk-ticket"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -1000, rotate: -10, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <form ref={formRef} className="cp-bk-form" onSubmit={sendEmail}>

                  <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                  <input type="hidden" name="subject"    value="New Booking — CinemaPayyan Productions" />
                  <input type="hidden" name="from_name"  value="CinemaPayyan Booking" />

                  {/* INFO SIDE */}
                  <div className="cp-bk-info">
                    <div className="cp-bk-ticket-header">
                      <div className="cp-bk-ticket-pre">
                        <div className="cp-bk-ticket-pre-line" />
                        <span className="cp-bk-ticket-pre-text">CINEMAPAYYAN PRODUCTIONS</span>
                      </div>
                      <h2 className="cp-bk-ticket-title">ADMIT ONE</h2>
                      <p className="cp-bk-ticket-sub">OFFICIAL BOOKING TICKET</p>
                    </div>

                    <div className="cp-bk-grid">
                      <div className="cp-bk-field">
                        <label className="cp-bk-label">NAME</label>
                        <input name="name" type="text" placeholder="Your Name" className="cp-bk-input" required />
                      </div>
                      <div className="cp-bk-field">
                        <label className="cp-bk-label">EMAIL</label>
                        <input name="email" type="email" placeholder="Email Address" className="cp-bk-input" required />
                      </div>
                      <div className="cp-bk-field cp-bk-field--full">
                        <label className="cp-bk-label">CONTACT NUMBER</label>
                        <input name="phone" type="tel" placeholder="+91" className="cp-bk-input" />
                      </div>
                      <div className="cp-bk-field cp-bk-field--full">
                        <label className="cp-bk-label">ABOUT THE PROJECT</label>
                        <textarea name="message" placeholder="Tell us your story..." rows={2} className="cp-bk-textarea" required />
                      </div>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="cp-bk-divider">
                    <div className="cp-bk-punch cp-bk-punch--top" />
                    <div className="cp-bk-punch cp-bk-punch--bottom" />
                  </div>

                  {/* STUB */}
                  <div className="cp-bk-stub">
                    <div>
                      <p className="cp-bk-stub-label">FOLLOW US</p>
                      <div className="cp-bk-icons">
                        <a href="https://www.instagram.com/cinemapayyan.inc/" target="_blank" rel="noreferrer"><FaInstagram /></a>
                        <a href="https://x.com/cinemapayyan"                  target="_blank" rel="noreferrer"><FaTwitter /></a>
                        <a href="https://www.youtube.com/@OpenPannaa"         target="_blank" rel="noreferrer"><FaYoutube /></a>
                      </div>
                      <a
                        href="https://woolen-sodalite-e73.notion.site/16909085b6758040a618e11e9b9dabef"
                        target="_blank" rel="noreferrer"
                        className="cp-bk-notion"
                      >
                        <span>MUNAI PORTAL</span>
                        <FaExternalLinkAlt size={7} />
                      </a>
                    </div>

                    <button type="submit" className="cp-bk-confirm" disabled={isSending}>
                      <span>{isSending ? 'SENDING...' : 'CONFIRM BOOKING'}</span>
                    </button>
                  </div>

                </form>
              </motion.div>

            ) : (

              <motion.div
                key="success"
                className="cp-bk-success"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 18 }}
              >
                <h1 className="cp-bk-success-title">BOOKED!</h1>
                <p className="cp-bk-success-sub">We will reach out soon</p>
                <div className="cp-bk-success-rule" />
                <button className="cp-bk-back" onClick={() => setIsTorn(false)}>
                  <span>BACK</span>
                </button>
              </motion.div>

            )}
          </AnimatePresence>
        </div>

        {/* ── BOTTOM BAND ─────────────────────────── */}
        <div className="cp-bk-band cp-bk-band--bottom">
          <motion.div
            className="cp-bk-band-text"
            animate={{ x: [-1000, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          >
            {filmStrip}
          </motion.div>
        </div>

      </section>
    </>
  );
};

export default BookingContact;
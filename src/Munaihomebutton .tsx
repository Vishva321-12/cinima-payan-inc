import { useNavigate } from "react-router-dom";
import { Images } from "./assets/assets";

/**
 * MunaiHomeButton
 * ───────────────
 * A fixed logo + "HOME" label in the top-left of the Munai page.
 * Clicking it navigates back to the main site home page.
 * Drop this inside the Munai component's JSX at the top level.
 */
export default function MunaiHomeButton() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;700&display=swap');

        .mhb-wrap {
          position: fixed;
          top: 0; left: 0;
          z-index: 9400;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px 9px 14px;
          background: rgba(5,8,14,0.90);
          border-bottom: 1px solid rgba(253,224,71,0.22);
          border-right: 1px solid rgba(253,224,71,0.22);
          border-radius: 0 0 10px 0;
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: background 0.25s, border-color 0.25s;
          text-decoration: none;
        }
        .mhb-wrap:hover {
          background: rgba(10,20,32,0.98);
          border-color: rgba(253,224,71,0.5);
        }
        .mhb-wrap:hover .mhb-label { color: #fde047; }
        .mhb-wrap:hover .mhb-arrow { opacity: 1; }

        .mhb-logo {
          height: 28px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 6px rgba(253,224,71,0.35));
          flex-shrink: 0;
        }

        .mhb-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .mhb-arrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.38rem;
          letter-spacing: 3px;
          color: rgba(50,197,244,0.65);
          text-transform: uppercase;
          opacity: 0.8;
          transition: opacity 0.25s;
          line-height: 1;
        }

        .mhb-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.75);
          line-height: 1;
          transition: color 0.25s;
        }

        @media (max-width: 480px) {
          .mhb-logo  { height: 22px; }
          .mhb-label { font-size: 0.82rem; letter-spacing: 3px; }
          .mhb-wrap  { padding: 7px 14px 8px 10px; gap: 8px; }
        }
      `}</style>

      <button className="mhb-wrap" onClick={() => navigate("/")} aria-label="Back to home">
        <img src={Images.logo} alt="CinemaPayyan" className="mhb-logo" />
        <div className="mhb-text">
          <span className="mhb-arrow">← BACK TO SITE</span>
          <span className="mhb-label">CINEMAPAYYAN</span>
        </div>
      </button>
    </>
  );
}
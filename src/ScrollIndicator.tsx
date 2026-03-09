import { useState, useEffect, useRef, FC } from "react";

interface Section {
  id: string;
  label: string;
  ref: React.RefObject<HTMLElement> | null;
}

interface CinemaNavigatorProps {
  refs: {
    homeRef?: React.RefObject<HTMLElement>;
    aboutRef?: React.RefObject<HTMLElement>;
    workRef?: React.RefObject<HTMLElement>;
    promotionsRef?: React.RefObject<HTMLElement>;
    contactRef?: React.RefObject<HTMLElement>;
  };
}

const CinemaNavigator: FC<CinemaNavigatorProps> = ({ refs }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [scrollLineHeight, setScrollLineHeight] = useState<string>("0%");
  const containerRef = useRef<HTMLDivElement>(null);

  const allSections: Section[] = [
    { id: "home", label: "HOME", ref: refs.homeRef || null },
    { id: "about", label: "ABOUT", ref: refs.aboutRef || null },
    { id: "vj", label: "VJ SESSION", ref: null },
    { id: "pannaa", label: "OPEN PANNAA", ref: null },
    { id: "host", label: "HOST", ref: null },
    { id: "director", label: "DIRECTOR", ref: null },
    { id: "producer", label: "CREATIVE PRODUCER", ref: refs.promotionsRef || null },
    { id: "accelerator", label: "ACCELERATOR", ref: null },
    { id: "work", label: "FINISHED PROJECTS", ref: refs.workRef || null },
    { id: "partners", label: "TIE-UP PARTNERS", ref: null },
    { id: "comic", label: "BTS COMIC", ref: null },
    { id: "shorts", label: "SHORTS", ref: null },
    { id: "shadow", label: "SHADOW", ref: null },
    { id: "contact", label: "CONTACT", ref: refs.contactRef || null },
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollLineHeight(`${Math.max(0, Math.min(scrollPercent, 100))}%`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (section: Section): void => {
    if (section.ref?.current) {
      section.ref.current.scrollIntoView({ behavior: "smooth" });
    } else {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll =
        (allSections.findIndex((s) => s.id === section.id) / allSections.length) * docHeight;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
    setTimeout(() => setIsExpanded(false), 300);
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isExpanded]);

  return (
    <div className="cinema-nav-wrapper" ref={containerRef}>
      <style>{`
        :root {
          --cyan: #32c5f4;
          --yellow: #fde047;
          --black: #000000;
          --white: #ffffff;
        }

        .cinema-nav-wrapper {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 100vh;
          z-index: 9999;
          pointer-events: none;
        }

        .scroll-indicator-line {
          position: fixed;
          right: 0;
          top: 0;
          width: 3px;
          height: 100vh;
          background: rgba(50, 197, 244, 0.08);
          z-index: 9996;
          pointer-events: none;
          border-left: 1px solid rgba(50, 197, 244, 0.15);
        }

        .scroll-indicator-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background: linear-gradient(180deg, #32c5f4 0%, #fde047 50%, #32c5f4 100%);
          box-shadow: 0 0 6px rgba(50, 197, 244, 0.5);
          transition: height 0.1s ease-out;
        }

        .cinema-nav-toggle {
          position: fixed;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, rgba(50, 197, 244, 0.9) 0%, rgba(50, 197, 244, 0.65) 100%);
          border: 1.5px solid rgba(253, 224, 71, 0.7);
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 9999;
          overflow: hidden;
          backdrop-filter: blur(6px);
          box-shadow: 0 6px 24px rgba(50, 197, 244, 0.25), inset 0 0 15px rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .cinema-nav-toggle::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.15), transparent 65%);
          pointer-events: none;
        }

        .cinema-nav-toggle:hover {
          transform: translateY(-50%) scale(1.08);
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 30px rgba(50, 197, 244, 0.35), inset 0 0 18px rgba(255, 255, 255, 0.12);
        }

        .cinema-nav-toggle.active {
          border-color: rgba(253, 224, 71, 0.9);
          transform: translateY(-50%) scale(1.1) rotate(-15deg);
          box-shadow: 0 10px 36px rgba(50, 197, 244, 0.45), inset 0 0 20px rgba(255, 255, 255, 0.15);
          background: linear-gradient(135deg, rgba(50, 197, 244, 1) 0%, rgba(50, 197, 244, 0.75) 100%);
        }

        .nav-icon {
          width: 22px;
          height: 22px;
          position: relative;
          z-index: 2;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.4));
        }

        .cinema-nav-toggle.active .nav-icon {
          transform: rotate(180deg) scale(0.9);
          filter: drop-shadow(0 1px 3px rgba(253, 224, 71, 0.6));
        }

        .cinema-nav-menu {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%) translateX(100%);
          width: 300px;
          max-height: 75vh;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.97) 0%, rgba(15, 15, 25, 0.96) 100%);
          border: 1.5px solid rgba(50, 197, 244, 0.4);
          border-right: none;
          border-radius: 20px 0 0 20px;
          overflow: hidden;
          z-index: 9998;
          pointer-events: none;
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(12px);
          box-shadow: -8px 0 32px rgba(50, 197, 244, 0.15);
        }

        .cinema-nav-menu.expanded {
          transform: translateY(-50%) translateX(0);
          pointer-events: auto;
        }

        .nav-menu-header {
          padding: 18px 16px;
          background: linear-gradient(90deg, rgba(50, 197, 244, 0.1) 0%, transparent 100%);
          border-bottom: 1px solid rgba(50, 197, 244, 0.2);
          font-family: "Courier New", monospace;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(50, 197, 244, 0.25);
        }

        .nav-menu-items {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 12px 0;
          max-height: calc(75vh - 70px);
          overflow-y: auto;
        }

        .nav-menu-item {
          padding: 11px 16px;
          background: transparent;
          border: none;
          border-left: 2px solid rgba(50, 197, 244, 0.5);
          font-family: "Courier New", monospace;
          font-size: 9px;
          letter-spacing: 0.8px;
          color: rgba(255, 255, 255, 0.65);
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 0 4px;
          border-radius: 6px;
        }

        .nav-menu-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(50, 197, 244, 0.15) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
        }

        .nav-menu-item:hover::before {
          transform: translateX(100%);
        }

        .nav-menu-item:hover {
          background: rgba(50, 197, 244, 0.08);
          border-left-color: rgba(253, 224, 71, 0.7);
          color: rgba(255, 255, 255, 0.95);
          padding-left: 20px;
          box-shadow: inset 0 0 10px rgba(50, 197, 244, 0.05);
        }

        .nav-menu-items::-webkit-scrollbar {
          width: 4px;
        }

        .nav-menu-items::-webkit-scrollbar-track {
          background: transparent;
        }

        .nav-menu-items::-webkit-scrollbar-thumb {
          background: rgba(50, 197, 244, 0.25);
          border-radius: 2px;
        }

        .nav-menu-items::-webkit-scrollbar-thumb:hover {
          background: rgba(50, 197, 244, 0.5);
        }

        @media (max-width: 768px) {
          .cinema-nav-toggle {
            width: 40px;
            height: 40px;
            right: 12px;
          }

          .nav-icon {
            width: 20px;
            height: 20px;
          }

          .cinema-nav-menu {
            width: 280px;
          }

          .nav-menu-item {
            font-size: 8px;
            padding: 10px 14px;
          }

          .nav-menu-header {
            font-size: 9px;
            padding: 16px 14px;
          }
        }

        @media (max-width: 480px) {
          .cinema-nav-toggle {
            width: 38px;
            height: 38px;
            right: 10px;
          }

          .nav-icon {
            width: 18px;
            height: 18px;
          }

          .cinema-nav-menu {
            width: 240px;
          }

          .nav-menu-item {
            font-size: 7px;
            padding: 9px 12px;
            margin: 0 3px;
          }

          .nav-menu-header {
            font-size: 8px;
            padding: 14px 12px;
          }

          .scroll-indicator-line {
            width: 2px;
          }
        }
      `}</style>

      <div className="scroll-indicator-line">
        <div className="scroll-indicator-fill" style={{ height: scrollLineHeight }} />
      </div>

      <div
        className={`cinema-nav-toggle ${isExpanded ? "active" : ""}`}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <svg
          className="nav-icon"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="1.8" opacity="0.8" />
          <line x1="50" y1="8" x2="50" y2="22" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="78.6" y1="21.4" x2="71.3" y2="28.7" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="92" y1="50" x2="78" y2="50" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="78.6" y1="78.6" x2="71.3" y2="71.3" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="50" y1="92" x2="50" y2="78" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="21.4" y1="78.6" x2="28.7" y2="71.3" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="8" y1="50" x2="22" y2="50" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="21.4" y1="21.4" x2="28.7" y2="28.7" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <circle cx="50" cy="50" r="8" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
          <circle cx="50" cy="50" r="3" fill="white" opacity="0.9" />
        </svg>
      </div>

      <div className={`cinema-nav-menu ${isExpanded ? "expanded" : ""}`}>
        <div className="nav-menu-header">🎬 NAVIGATE</div>
        <div className="nav-menu-items">
          {allSections.map((section) => (
            <div
              key={section.id}
              className="nav-menu-item"
              onClick={() => handleSectionClick(section)}
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSectionClick(section);
                }
              }}
            >
              {section.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinemaNavigator;
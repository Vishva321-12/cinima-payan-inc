import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Play, Mic2, Tv, ExternalLink } from "lucide-react";
import { Images, VideoAssets } from "./assets/assets";

/* ─── Data ─────────────────────────────────── */
const vjVideos = [
  { id: 1,  title: "Anirudh Ravichander", role: "Composer · Producer",       link: "https://youtu.be/dESRRC-uVME",                               preview: VideoAssets.vjPreviews[0], thumb: Images.ScreenshotAR  },
  { id: 2,  title: "Venkat Prabhu",       role: "Director · Actor",          link: "https://youtu.be/lAH_99cCcos?si=GtlnhQydVJNfRBop",           preview: VideoAssets.vjPreviews[1], thumb: Images.ScreenshotVP  },
  { id: 3,  title: "Silambarasan TR",     role: "Actor",                     link: "https://youtu.be/GKHk7d_bQh0?si=h-8nwdu3qtytPPCV",           preview: VideoAssets.vjPreviews[2], thumb: Images.ScreenshotSTR },
  { id: 4,  title: "Vijay Sethupathi",    role: "Actor · Producer",          link: "https://youtu.be/77oGSFHYzSY?si=dumaevinjdTtEVX6",           preview: VideoAssets.vjPreviews[3], thumb: Images.ScreenshotVJS },
  { id: 5,  title: "Arjun DAS",           role: "Actor",                     link: "https://youtu.be/fEpt5b794ys?si=9r3yKH1OSU5di5ag",           preview: VideoAssets.vjPreviews[4], thumb: Images.ScreenshotAD  },
  { id: 6,  title: "T. Kumararaja",       role: "Director · Writer",         link: "https://youtu.be/BBnY5tE7-Wo?si=DV1P17OplHXoo0DE",           preview: VideoAssets.vjPreviews[5], thumb: Images.ScreenshotTK  },
  { id: 7,  title: "Kamal Haasan",        role: "Actor · Director · Legend", link: "https://youtube.com/link7",                                  preview: VideoAssets.vjPreviews[6], thumb: Images.ScreenshotKH  },
  { id: 8,  title: "Dulquer Salmaan",     role: "Actor · Producer",          link: "https://youtu.be/JzsDo_hf5cg?si=kpsF9KLqm0cfFIdq",           preview: VideoAssets.vjPreviews[7], thumb: Images.ScreenshotDQ  },
  { id: 9,  title: "GVM",                 role: "Director · Visionary",      link: "https://youtu.be/hKbP91H0_Do?si=T2FJcb3BiPK9lrYk",           preview: VideoAssets.vjPreviews[8], thumb: Images.ScreenshotGVM },
  { id: 10, title: "Ashok Selvan",        role: "Actor",                     link: "https://youtu.be/uXQOlL7EjzA?si=GYx6_KE1WFmjQXz_",           preview: VideoAssets.vjPreviews[9], thumb: Images.ScreenshotAS  },
];

/* ─── VJ Card ───────────────────────────────── */
function VJCard({ video, index }: { video: typeof vjVideos[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-60, 60], [6, -6]);
  const rotateY = useTransform(mouseX, [-80, 80], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) { v.muted = true; v.play().catch(() => {}); }
    else v.pause();
  }, [hovered]);

  return (
    <motion.div
      className="vj-card"
      data-index={index}
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="vj-card-inner"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Media */}
        <div className="vj-media">
          <img
            src={video.thumb}
            alt={video.title}
            className={`vj-thumb ${hovered ? "vj-thumb--hidden" : ""}`}
          />
          <video
            ref={videoRef}
            src={video.preview}
            className={`vj-video ${hovered ? "vj-video--visible" : ""}`}
            muted loop playsInline
          />
          <div className="vj-media-overlay" />
          <div className="vj-badge">
            <span className="vj-badge-num">{String(video.id).padStart(2, "0")}</span>
          </div>
          <a
            href={video.link}
            target="_blank"
            rel="noreferrer"
            className={`vj-play-btn ${hovered ? "vj-play-btn--visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Play fill="black" size={18} />
          </a>
          <motion.div
            className="vj-spotlight"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Info bar */}
        <div className="vj-info">
          <div className="vj-info-left">
            <span className="vj-session-label">SESSION {String(video.id).padStart(2, "0")}</span>
            <h4 className="vj-title">{video.title}</h4>
            <span className="vj-role">{video.role}</span>
          </div>
          <motion.div
            className="vj-info-arrow"
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.35 }}
          >
            <ExternalLink size={14} />
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="vj-card-line"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────── */
const AboutWork = () => {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const sliderRef    = useRef<HTMLDivElement>(null);
  const vjHeaderRef  = useRef<HTMLDivElement>(null);
  const rjHeaderRef  = useRef<HTMLDivElement>(null);
  const vjInView     = useInView(vjHeaderRef, { once: true, amount: 0.5 });
  const rjInView     = useInView(rjHeaderRef, { once: true, amount: 0.5 });

  const [activeIndex, setActiveIndex] = useState(0);

  /* Track which card is closest to center of slider */
  const updateActiveIndex = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
    const cards = slider.querySelectorAll<HTMLElement>(".vj-card");
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(sliderCenter - cardCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  }, []);

  /* Scroll to a card by index — snap it to center */
  const scrollToIndex = (i: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelectorAll<HTMLElement>(".vj-card")[i];
    if (!card) return;
    const targetLeft = card.offsetLeft - (slider.clientWidth - card.offsetWidth) / 2;
    slider.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  /* On mount: scroll first card to center */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const firstCard = slider.querySelector<HTMLElement>(".vj-card");
    if (!firstCard) return;
    const targetLeft = firstCard.offsetLeft - (slider.clientWidth - firstCard.offsetWidth) / 2;
    slider.scrollLeft = targetLeft;
    updateActiveIndex();
  }, [updateActiveIndex]);

  return (
    <section id="production" className="work-section" ref={sectionRef}>

      {/* ── VJ SESSIONS ───────────────────────── */}
      <div className="work-block">

        <div className="cinema-section-header" ref={vjHeaderRef}>
          <motion.div
            className="cinema-header-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: vjInView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="cinema-header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: vjInView ? 1 : 0, y: vjInView ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="cinema-header-icon">
              <Tv size={18} />
            </div>
            <div className="cinema-header-text">
              <span className="cinema-overline">CURATED CONVERSATIONS</span>
              <h2 className="cinema-heading">
                VJ <span className="text-yellow">SESSIONS</span>
              </h2>
            </div>
            <div className="cinema-header-count">
              <span>{vjVideos.length.toString().padStart(2, "0")}</span>
              <span className="count-label">EPISODES</span>
            </div>
          </motion.div>
          <motion.div
            className="cinema-header-rule cinema-header-rule--right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: vjInView ? 1 : 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>

        {/* Slider */}
        <div className="vj-slider-wrap">
          <div
            className="vj-slider"
            ref={sliderRef}
            onScroll={updateActiveIndex}
          >
            {vjVideos.map((video, i) => (
              <VJCard key={video.id} video={video} index={i} />
            ))}
          </div>

          {/* Fade edges */}
          <div className="slider-fade-left" />
          <div className="slider-fade-right" />
        </div>

        {/* Dot indicators — visible only on small screens */}
        <div className="vj-dots">
          {vjVideos.map((_, i) => (
            <button
              key={i}
              className={`vj-dot ${i === activeIndex ? "vj-dot--active" : ""}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to session ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── RJ ARCHIVES ───────────────────────── */}
      <div className="work-block rj-block">

        <div className="cinema-section-header" ref={rjHeaderRef}>
          <motion.div
            className="cinema-header-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: rjInView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="cinema-header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: rjInView ? 1 : 0, y: rjInView ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="cinema-header-icon cyan-icon">
              <Mic2 size={18} />
            </div>
            <div className="cinema-header-text">
              <span className="cinema-overline">BROADCAST ARCHIVES</span>
              <h2 className="cinema-heading">
                RJ <span className="text-cyan">ARCHIVES</span>
              </h2>
            </div>
          </motion.div>
          <motion.div
            className="cinema-header-rule cinema-header-rule--right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: rjInView ? 1 : 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>

        <motion.div
          className="rj-stage"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="https://soundcloud.com/rj-abishek"
            target="_blank"
            rel="noreferrer"
            className="rj-card"
            whileHover="hover"
          >
            <motion.img
              src={Images.AbishakeAudio}
              alt="RJ Archive"
              className="rj-img"
              variants={{ hover: { scale: 1.06, filter: "grayscale(0)" } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ filter: "grayscale(0.3)" }}
            />
            <div className="rj-strip">
              <div className="rj-strip-left">
                <span className="rj-strip-label">ON AIR</span>
                <span className="rj-strip-dot" />
              </div>
              <span className="rj-strip-title">RJ ABISHEK · ARCHIVES</span>
              <ExternalLink size={13} className="rj-strip-icon" />
            </div>
            <motion.div
              className="rj-hover-overlay"
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                className="rj-overlay-inner"
                variants={{ hover: { y: 0, opacity: 1 } }}
                initial={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div className="rj-overlay-play">
                  <Play fill="black" size={22} />
                </div>
                <span className="rj-overlay-cta">LISTEN TO ALL EPISODES</span>
                <span className="rj-overlay-sub">SOUNDCLOUD ARCHIVES</span>
              </motion.div>
            </motion.div>
            <div className="rj-waveform">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="rj-wave-bar" style={{ animationDelay: `${i * 0.06}s` }} />
              ))}
            </div>
          </motion.a>

          <div className="rj-meta">
            <div className="rj-meta-item">
              <span className="rj-meta-num">100<span className="rj-meta-plus">+</span></span>
              <span className="rj-meta-label">EPISODES</span>
            </div>
            <div className="rj-meta-divider" />
            <div className="rj-meta-item">
              <span className="rj-meta-num">FM</span>
              <span className="rj-meta-label">BROADCAST</span>
            </div>
            <div className="rj-meta-divider" />
            <div className="rj-meta-item">
              <span className="rj-meta-num">∞</span>
              <span className="rj-meta-label">ON DEMAND</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutWork;
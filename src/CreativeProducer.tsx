import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Instagram, LayoutGrid, Youtube, Play, Clapperboard, ExternalLink } from "lucide-react";
import { Images, VideoAssets } from "./assets/assets";
import "./App.css";

const CreativeProducer = () => {
  const [activeTab, setActiveTab]     = useState("images");
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const inView     = useInView(headerRef, { once: true, amount: 0.5 });

  const imagesList = useMemo(() => [
    Images.CreativePr1, Images.CreativePr2, Images.CreativePr3,
    Images.CreativePr4, Images.CreativePr5,
  ], []);

  const reelsList = useMemo(() => [
    VideoAssets.vjPreviews[15], VideoAssets.vjPreviews[16],
    VideoAssets.vjPreviews[17], VideoAssets.vjPreviews[18],
  ], []);

  const youtubeList = useMemo(() => [
    {
      id: 1, title: "Madras Matinee Reveal",
      desc: "Engineered the official digital reveal campaign, generating 500k+ organic impressions.",
      link: "https://youtu.be/iOoRSnCsftQ",
      preview: VideoAssets.vjPreviews[19], tag: "BRAND REVEAL",
    },
    {
      id: 2, title: "Marketing Strategy",
      desc: "High-impact precision targeting campaign focusing on regional cinema demographics.",
      link: "https://youtu.be/O_3zIwyqL6s",
      preview: VideoAssets.vjPreviews[20], tag: "DIGITAL STRATEGY",
    },
    {
      id: 3, title: "Matinee Trailer Drop",
      desc: "Coordinated cross-platform trailer distribution and hype-cycle management.",
      link: "https://youtu.be/F_LRE9Bfaw0",
      preview: VideoAssets.vjPreviews[21], tag: "PROMO DROP",
    },
  ], []);

  const currentList = activeTab === "images" ? imagesList
    : activeTab === "reels" ? reelsList : youtubeList;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (el.offsetWidth * 0.82));
    setScrollIndex(Math.min(Math.max(idx, 0), currentList.length - 1));
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    setScrollIndex(0);
  }, [activeTab]);

  const tabs = [
    { key: "images",  label: "IMAGES",  Icon: LayoutGrid },
    { key: "reels",   label: "REELS",   Icon: Instagram  },
    { key: "youtube", label: "YOUTUBE", Icon: Youtube    },
  ];

  return (
    <section className="cp-section">

      {/* ── SECTION HEADER ───────────────────── */}
      <div className="cinema-section-header" ref={headerRef}>
        <motion.div
          className="cinema-header-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="cinema-header-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="cinema-header-icon">
            <Clapperboard size={18} />
          </div>
          <div className="cinema-header-text">
            <span className="cinema-overline">CAMPAIGN STRATEGY · CONTENT</span>
            <h2 className="cinema-heading">
              CREATIVE <span className="text-yellow">PRODUCER</span>
            </h2>
          </div>
        </motion.div>
        <motion.div
          className="cinema-header-rule cinema-header-rule--right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>

      <div className="cp-inner">

        {/* ── FEATURE CARD ─────────────────────── */}
        <motion.div
          className="cp-feature"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Image side */}
          <div className="cp-img-side">
            <motion.img
              src={Images.madras}
              alt="Madras Motion Pictures"
              className="cp-img"
              whileHover={{ scale: 1.07, rotate: -1.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* radial glow behind logo */}
            <div className="cp-img-glow" />

            {/* Corner marks */}
            {['tl','tr','bl','br'].map(pos => (
              <div key={pos} className={`cp-corner cp-corner--${pos}`} />
            ))}

            {/* Instagram badge */}
            <motion.a
              href="https://www.instagram.com/madrasmotionpictures/"
              target="_blank" rel="noreferrer"
              className="cp-insta-btn"
              whileHover={{ scale: 1.08 }}
            >
              <Instagram size={15} />
              <span>INSTAGRAM</span>
            </motion.a>
          </div>

          {/* Content side */}
          <div className="cp-content">

            <div className="cp-pre">
              <div className="cp-pre-line" />
              <span className="cp-pre-text">DIGITAL ARCHITECT</span>
            </div>

            <h3 className="cp-title">
              TURNING FRAMES<br />
              <span className="cp-title--yellow">INTO FAME</span>
            </h3>

            <p className="cp-tagline">Campaign Strategy · Content Curation · Growth</p>

            <div className="cp-rule" />

            <p className="cp-desc">
              I specialise in engineering the digital heartbeat of modern cinema — executing
              high-stakes reveal campaigns that transform raw cinematic footage into{" "}
              <span className="cp-highlight">unavoidable content</span>.
            </p>

            {/* Stats strip */}
            <div className="cp-stats">
              <div className="cp-stat">
                <span className="cp-stat-num">500K<span className="cp-stat-plus">+</span></span>
                <span className="cp-stat-label">IMPRESSIONS</span>
              </div>
              <div className="cp-stat-divider" />
              <div className="cp-stat">
                <span className="cp-stat-num">3</span>
                <span className="cp-stat-label">CAMPAIGNS</span>
              </div>
              <div className="cp-stat-divider" />
              <div className="cp-stat">
                <span className="cp-stat-num">∞</span>
                <span className="cp-stat-label">IMPACT</span>
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="https://www.instagram.com/madrasmotionpictures/"
              target="_blank" rel="noreferrer"
              className="cp-cta"
              whileHover="hover"
            >
              <motion.span
                className="cp-cta-bg"
                variants={{ hover: { scaleX: 1 } }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.4 }}
              />
              <span className="cp-cta-label">VISIT INSTAGRAM</span>
              <ExternalLink size={14} className="cp-cta-icon" />
            </motion.a>
          </div>
        </motion.div>

        {/* ── MEDIA TABS ───────────────────────── */}
        <motion.div
          className="cp-tabs-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tab bar */}
          <div className="cp-tab-bar">
            {tabs.map(({ key, label, Icon }) => (
              <button
                key={key}
                className={`cp-tab ${activeTab === key ? "cp-tab--active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {activeTab === key && (
                  <motion.div className="cp-tab-pill" layoutId="cp-tab-pill" />
                )}
                <Icon size={13} className="cp-tab-icon" />
                <span className="cp-tab-label">{label}</span>
              </button>
            ))}
          </div>

          {/* Media grid */}
          <div className="cp-media-scroll" ref={scrollRef} onScroll={handleScroll}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className={`cp-grid cp-grid--${activeTab}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >

                {/* IMAGES */}
                {activeTab === "images" && imagesList.map((img, i) => (
                  <motion.div
                    key={i}
                    className="cp-poster"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
                    whileHover="hover"
                  >
                    <motion.img
                      src={img} alt="Work"
                      variants={{ hover: { scale: 1.07 } }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="cp-poster-overlay"
                      variants={{ hover: { opacity: 1 } }}
                      initial={{ opacity: 0 }}
                    />
                    {/* frame marks */}
                    <div className="cp-poster-tl" />
                    <div className="cp-poster-br" />
                  </motion.div>
                ))}

                {/* REELS */}
                {activeTab === "reels" && reelsList.map((reel, i) => (
                  <motion.div
                    key={i}
                    className="cp-reel"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                  >
                    <video src={reel} muted loop autoPlay playsInline className="cp-reel-video" />
                    <div className="cp-reel-gradient" />
                    <div className="cp-reel-tag">
                      <span>REEL</span>
                      <span className="cp-reel-num">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </motion.div>
                ))}

                {/* YOUTUBE */}
                {activeTab === "youtube" && youtubeList.map((yt, i) => (
                  <YTCard key={yt.id} item={yt} index={i} />
                ))}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots — mobile only */}
          <div className="cp-dots">
            {currentList.map((_, i) => (
              <span key={i} className={`cp-dot ${scrollIndex === i ? "cp-dot--active" : ""}`} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

/* ─── YouTube Card ──────────────────────────── */
function YTCard({ item, index }: { item: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) { v.muted = true; v.play().catch(() => {}); }
    else { v.pause(); v.currentTime = 0; }
  }, [hovered]);

  return (
    <motion.div
      className="cp-yt-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video */}
      <div className="cp-yt-media">
        <video ref={videoRef} src={item.preview} className="cp-yt-video" muted loop playsInline />
        <div className="cp-yt-gradient" />
        <div className="cp-yt-tag">{item.tag}</div>
        <motion.a
          href={item.link} target="_blank" rel="noreferrer"
          className="cp-yt-play"
          animate={{ opacity: hovered ? 1 : 0.7, scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <Play fill="black" size={20} />
        </motion.a>
        <motion.div
          className="cp-yt-scan"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Info */}
      <div className="cp-yt-info">
        <h5 className="cp-yt-title">{item.title}</h5>
        <p className="cp-yt-desc">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default CreativeProducer;
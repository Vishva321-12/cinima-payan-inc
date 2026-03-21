import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, VideoAssets } from "./assets/assets";

const INSTAGRAM_REEL = "https://www.instagram.com/reel/DJTP1Aiz1ps/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";

const InkbloodAndShadows: React.FC = () => {
  const comicPages = [
    Images.ComicPag0,
    Images.ComicPag1,
    Images.ComicPag2,
    Images.ComicPag3,
    Images.ComicPag4,
    Images.ComicPag5,
    Images.ComicPag6,
    Images.ComicPag7,
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [ctaHovered, setCtaHovered]   = useState(false);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);

  const paginate = (dir: number) => {
    const next = currentPage + dir;
    if (next >= 0 && next < comicPages.length) setCurrentPage(next);
  };

  const handleCtaEnter = () => {
    setCtaHovered(true);
    if (ctaVideoRef.current) {
      ctaVideoRef.current.currentTime = 0;
      ctaVideoRef.current.play().catch(() => {});
    }
  };
  const handleCtaLeave = () => {
    setCtaHovered(false);
    if (ctaVideoRef.current) ctaVideoRef.current.pause();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ═══════════════════════════════════════
           COMIC SECTION
        ═══════════════════════════════════════ */
        .ibs-comic-section {
          background: #0e0a04;
          color: #fff;
          padding: 100px 0 110px;
          overflow-x: hidden;
          position: relative;
        }
        .ibs-comic-ambient {
          position: absolute; top: 30%; left: 50%;
          transform: translate(-50%, -50%);
          width: 70%; height: 50%;
          background: radial-gradient(ellipse at center,
            rgba(253,224,71,0.04) 0%,
            rgba(180,100,20,0.03) 40%,
            transparent 70%);
          filter: blur(80px);
          pointer-events: none; z-index: 1;
        }
        .ibs-comic-cool-accent {
          position: absolute; bottom: 0; right: 0;
          width: 380px; height: 380px;
          background: radial-gradient(circle at bottom right, rgba(50,197,244,0.045) 0%, transparent 65%);
          pointer-events: none; z-index: 1;
        }
        .ibs-comic-section::before {
          content: ''; position: absolute;
          top: 0; left: 8%; right: 8%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(253,224,71,0.10) 50%, transparent);
          pointer-events: none;
        }

        /* ── Inner wrapper ── */
        .ibs-comic-inner {
          max-width: 1180px; margin: 0 auto;
          padding: 0 clamp(16px, 5%, 50px);
          position: relative; z-index: 5;
        }

        /* ── Comic Header ── */
        .ibs-comic-header {
          text-align: center; margin-bottom: 56px;
        }
        .ibs-comic-pre {
          display: inline-flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        .ibs-comic-pre-line { width: 32px; height: 1px; background: #fde047; opacity: 0.5; }
        .ibs-comic-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.5rem, 1.4vw, 0.65rem);
          font-weight: 600; letter-spacing: 5px;
          color: rgba(253,224,71,0.85); text-transform: uppercase;
        }
        .ibs-comic-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 9vw, 6.5rem);
          font-weight: 400; color: #fff;
          line-height: 0.95; letter-spacing: 3px; margin: 0 0 18px;
        }
        .ibs-comic-title-cyan   { color: #32c5f4; }
        .ibs-comic-title-yellow { color: #fde047; }
        .ibs-comic-rule {
          width: 80px; height: 1px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          margin: 0 auto; opacity: 0.7;
        }

        /* ── BTS Image ── */
        .ibs-bts-wrap {
          margin: 0 0 72px;
        }
        .ibs-bts-container {
          position: relative;
          border: 1px solid rgba(253,224,71,0.08);
          background: #0a0702; overflow: hidden;
          transition: border-color 0.5s, box-shadow 0.5s;
        }
        .ibs-bts-container:hover {
          border-color: rgba(253,224,71,0.18);
          box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(253,200,80,0.06);
        }
        .ibs-bts-badge {
          position: absolute; top: 18px; left: 18px;
          display: flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.44rem, 1.2vw, 0.6rem);
          font-weight: 600; letter-spacing: 3px;
          color: rgba(255,255,255,0.85);
          background: rgba(14,10,4,0.82);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 7px 14px; z-index: 10; text-transform: uppercase;
          transition: border-color 0.3s, color 0.3s;
        }
        .ibs-bts-container:hover .ibs-bts-badge { border-color: #fde047; color: #fde047; }
        .ibs-bts-badge-dot {
          width: 6px; height: 6px; background: #32c5f4;
          border-radius: 50%; flex-shrink: 0;
        }
        .ibs-bts-img-wrap {
          width: 100%; aspect-ratio: 21/7;
          overflow: hidden; position: relative;
        }
        @media (max-width: 600px) {
          .ibs-bts-img-wrap { aspect-ratio: 16/9; }
        }
        .ibs-bts-img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center 20%;
          filter: contrast(1.06) brightness(0.85) sepia(0.08);
          transition: transform 0.6s ease; display: block;
        }
        .ibs-bts-container:hover .ibs-bts-img { transform: scale(1.03); }
        .ibs-bts-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(circle, transparent 30%, rgba(14,10,4,0.72) 100%);
          pointer-events: none;
        }
        .ibs-bts-corner {
          position: absolute; z-index: 11;
          width: 22px; height: 22px; pointer-events: none;
        }
        .ibs-bts-corner::before,
        .ibs-bts-corner::after {
          content: ''; position: absolute; background: rgba(253,224,71,0.45);
        }
        .ibs-bts-corner-tl { top: 0; left: 0; }
        .ibs-bts-corner-tl::before { width: 100%; height: 1px; top: 0; left: 0; }
        .ibs-bts-corner-tl::after  { width: 1px; height: 100%; top: 0; left: 0; }
        .ibs-bts-corner-br { bottom: 0; right: 0; }
        .ibs-bts-corner-br::before { width: 100%; height: 1px; bottom: 0; right: 0; }
        .ibs-bts-corner-br::after  { width: 1px; height: 100%; bottom: 0; right: 0; }

        /* ── Comic Grid ── */
        .ibs-comic-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: clamp(28px, 5vw, 65px);
          align-items: center;
        }

        .ibs-book-wrap { max-width: 340px; margin: 0 auto; width: 100%; }
        .ibs-comic-sheet {
          aspect-ratio: 3/4.2;
          border: 1px solid rgba(253,224,71,0.10);
          position: relative; background: transparent;
          box-shadow: 0 20px 60px rgba(0,0,0,0.75), 0 0 30px rgba(253,200,80,0.05);
          overflow: hidden;
        }
        .ibs-comic-sheet-img {
          width: 100%; height: 100%; object-fit: contain; display: block;
        }
        .ibs-issue-tag {
          position: absolute; top: 12px; left: 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem; letter-spacing: 3px;
          color: #000; background: #fde047;
          padding: 4px 10px; z-index: 4;
        }
        .ibs-nav-bar {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 20px; padding: 13px 18px;
          background: rgba(253,224,71,0.025);
          border: 1px solid rgba(253,224,71,0.08);
        }
        .ibs-nav-btn {
          position: relative; overflow: hidden;
          padding: 8px 20px;
          border: 1px solid #32c5f4; color: #32c5f4;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.5rem, 1.2vw, 0.6rem);
          font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
          cursor: pointer; transition: color 0.35s;
        }
        .ibs-nav-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #32c5f4;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .ibs-nav-btn:hover:not(:disabled)::before { transform: scaleX(1); }
        .ibs-nav-btn:hover:not(:disabled) { color: #000; }
        .ibs-nav-btn span { position: relative; z-index: 1; }
        .ibs-nav-btn:disabled { opacity: 0.22; cursor: not-allowed; }
        .ibs-dots-row { display: flex; gap: 6px; align-items: center; }
        .ibs-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.12);
          transition: background 0.3s, width 0.3s, border-radius 0.3s;
        }
        .ibs-dot.active { background: #fde047; width: 18px; border-radius: 3px; }

        /* ── Vision Card ── */
        .ibs-vision-card {
          padding: clamp(24px, 4vw, 42px);
          background: rgba(253,224,71,0.02);
          border: 1px solid rgba(253,224,71,0.08);
          border-left: 2px solid rgba(253,224,71,0.30);
          position: relative; overflow: hidden;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .ibs-vision-card:hover {
          border-color: rgba(253,224,71,0.20);
          box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 30px rgba(253,200,80,0.05);
        }
        .ibs-vision-pre { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .ibs-vision-pre-line { width: 28px; height: 1px; background: #fde047; opacity: 0.5; }
        .ibs-vision-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.5rem, 1.2vw, 0.6rem);
          font-weight: 600; letter-spacing: 5px;
          color: rgba(253,224,71,0.85); text-transform: uppercase;
        }
        .ibs-vision-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 4.5vw, 4.2rem);
          font-weight: 400; color: #fde047;
          margin: 0 0 14px; letter-spacing: 3px; line-height: 1;
        }
        .ibs-vision-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.25), rgba(50,197,244,0.2), transparent);
          margin-bottom: 24px;
        }
        .ibs-vision-lead {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 1.3vw, 1rem);
          font-weight: 400; color: rgba(255,255,255,0.85);
          line-height: 1.75; margin-bottom: 18px;
        }
        .ibs-vision-body {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.78rem, 1.1vw, 0.875rem);
          font-weight: 300; color: rgba(255,255,255,0.40);
          line-height: 1.85; margin-bottom: 28px;
        }
        .ibs-vision-body strong { color: rgba(253,224,71,0.8); font-weight: 600; }

        /* ── CTA with hover video ── */
        .ibs-vision-cta-wrap {
          position: relative; display: block; width: 100%;
        }
        .ibs-vision-cta {
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          width: 100%; padding: 15px;
          border: 1px solid #fde047; color: #fde047;
          text-decoration: none; text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.5rem, 1.2vw, 0.65rem);
          font-weight: 600; letter-spacing: 4px; text-transform: uppercase;
          transition: color 0.4s; cursor: pointer;
          z-index: 1;
        }
        .ibs-vision-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .ibs-vision-cta:hover::before { transform: scaleX(1); }
        .ibs-vision-cta:hover { color: #000; }
        .ibs-vision-cta span { position: relative; z-index: 1; }

        /* hover video preview — floats above the button */
        .ibs-cta-video-preview {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%; transform: translateX(-50%);
          width: clamp(160px, 30vw, 220px);
          aspect-ratio: 9/16;
          background: #000;
          border: 1px solid rgba(253,224,71,0.3);
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.85);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
          transform: translateX(-50%) translateY(8px);
          z-index: 20;
        }
        .ibs-cta-video-preview.visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .ibs-cta-video-preview video {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .ibs-cta-video-preview-tag {
          position: absolute; bottom: 0; left: 0; right: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.75rem; letter-spacing: 3px;
          color: #000; background: #fde047;
          padding: 4px 0; text-align: center; text-transform: uppercase;
        }

        /* ══════════════════════════════════════
           SHADOW PROMOTION SECTION
        ══════════════════════════════════════ */
        .ibs-sh-section {
          background: #0a0a0e;
          padding: 90px clamp(16px, 5%, 60px) 110px;
          overflow: hidden; position: relative;
        }
        .ibs-sh-glow-tr {
          position: absolute; top: -80px; right: -80px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(140,80,255,0.06) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }
        .ibs-sh-glow-bl {
          position: absolute; bottom: -60px; left: -60px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(50,197,244,0.05) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .ibs-sh-section::before {
          content: ''; position: absolute;
          top: 0; left: 8%; right: 8%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(140,80,255,0.12) 50%, transparent);
          pointer-events: none;
        }
        .ibs-sh-inner {
          max-width: 1180px; margin: 0 auto;
          display: flex; align-items: center; gap: clamp(28px, 5vw, 65px);
          position: relative; z-index: 5;
        }
        .ibs-sh-left { flex: 1; min-width: 0; }
        .ibs-sh-pre { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .ibs-sh-pre-line { width: 32px; height: 1px; background: #fde047; opacity: 0.5; }
        .ibs-sh-pre-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.5rem, 1.4vw, 0.65rem);
          font-weight: 600; letter-spacing: 5px;
          color: rgba(253,224,71,0.85); text-transform: uppercase;
        }
        .ibs-sh-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.6rem, 6.5vw, 5.5rem);
          font-weight: 400; color: #fff;
          line-height: 0.95; letter-spacing: 3px; margin: 0 0 10px;
        }
        .ibs-sh-title-cyan { color: #32c5f4; }
        .ibs-sh-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(253,224,71,0.25), rgba(140,80,255,0.20), rgba(50,197,244,0.15), transparent);
          margin-bottom: 28px;
        }
        .ibs-sh-story {
          background: rgba(140,80,255,0.025);
          border: 1px solid rgba(140,80,255,0.10);
          border-left: 1px solid rgba(50,197,244,0.22);
          padding: clamp(18px, 3vw, 28px);
          position: relative; overflow: hidden;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .ibs-sh-story:hover {
          border-color: rgba(140,80,255,0.18);
          box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(140,80,255,0.05);
        }
        .ibs-sh-story::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 14px; height: 14px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          pointer-events: none;
        }
        .ibs-sh-story::after {
          content: ''; position: absolute; bottom: 0; right: 0;
          width: 14px; height: 14px;
          border-bottom: 1px solid rgba(253,224,71,0.4);
          border-right: 1px solid rgba(253,224,71,0.4);
          pointer-events: none;
        }
        .ibs-sh-quote {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.88rem, 1.4vw, 1.1rem);
          font-style: italic; font-weight: 500;
          color: #fde047; line-height: 1.6; margin: 0 0 20px;
        }
        .ibs-sh-body {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.78rem, 1.2vw, 0.9rem);
          font-weight: 300; color: rgba(255,255,255,0.42);
          line-height: 1.85; margin: 0 0 14px;
        }
        .ibs-sh-body strong { color: rgba(255,255,255,0.85); font-weight: 600; }
        .ibs-sh-body em     { color: rgba(50,197,244,0.75); font-style: italic; }
        .ibs-sh-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: 24px; padding: 13px 28px;
          border: 1px solid #fde047; color: #fde047;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.5rem, 1.2vw, 0.65rem);
          font-weight: 600; letter-spacing: 4px; text-transform: uppercase;
          transition: color 0.4s;
        }
        .ibs-sh-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #fde047;
          transform: scaleX(0); transform-origin: left; z-index: 0;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .ibs-sh-cta:hover::before { transform: scaleX(1); }
        .ibs-sh-cta:hover { color: #000; }
        .ibs-sh-cta span { position: relative; z-index: 1; }

        /* ── Video card ── */
        .ibs-sh-right { flex: 1.2; min-width: 0; }
        .ibs-sh-video-card {
          display: block; width: 100%; aspect-ratio: 16/9;
          overflow: hidden; position: relative;
          border: 1px solid rgba(140,80,255,0.10);
          background: #07070b;
          transition: border-color 0.4s, box-shadow 0.4s;
          text-decoration: none;
        }
        .ibs-sh-video-card:hover {
          border-color: rgba(50,197,244,0.22);
          box-shadow: 0 14px 50px rgba(0,0,0,0.75), 0 0 30px rgba(140,80,255,0.07);
        }
        .ibs-sh-video-card::before {
          content: ''; position: absolute; top: 8px; left: 8px;
          width: 12px; height: 12px;
          border-top: 1px solid rgba(253,224,71,0.4);
          border-left: 1px solid rgba(253,224,71,0.4);
          z-index: 5; pointer-events: none;
        }
        .ibs-sh-video-card::after {
          content: ''; position: absolute; bottom: 8px; right: 8px;
          width: 12px; height: 12px;
          border-bottom: 1px solid rgba(253,224,71,0.4);
          border-right: 1px solid rgba(253,224,71,0.4);
          z-index: 5; pointer-events: none;
        }
        .ibs-sh-vid {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .ibs-sh-video-card:hover .ibs-sh-vid { transform: scale(1.04); }
        .ibs-sh-vid-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(10,10,14,0.55) 100%);
          z-index: 2; pointer-events: none;
        }
        .ibs-sh-vid-tag {
          position: absolute; top: 10px; right: 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.8rem; letter-spacing: 3px;
          color: #000; background: #32c5f4;
          padding: 3px 8px; z-index: 6; text-transform: uppercase;
        }
        .ibs-sh-vid-overlay {
          position: absolute; inset: 0;
          background: rgba(10,10,14,0.75);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; z-index: 10; backdrop-filter: blur(4px);
          transition: opacity 0.3s;
        }
        .ibs-sh-video-card:hover .ibs-sh-vid-overlay { opacity: 1; }
        .ibs-sh-vid-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.5rem, 1.2vw, 0.6rem);
          font-weight: 600; letter-spacing: 4px;
          color: #000; background: #fde047;
          padding: 8px 20px; text-transform: uppercase;
          transform: translateY(6px); transition: transform 0.3s;
        }
        .ibs-sh-video-card:hover .ibs-sh-vid-label { transform: translateY(0); }
        .ibs-sh-scan {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #32c5f4, #fde047);
          transform: scaleX(0); transform-origin: left; z-index: 6;
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
        .ibs-sh-video-card:hover .ibs-sh-scan { transform: scaleX(1); }

        /* ══════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════ */
        @media (max-width: 900px) {
          .ibs-comic-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .ibs-book-wrap { max-width: 320px; }
          .ibs-sh-inner  { flex-direction: column; gap: 40px; }
          .ibs-sh-pre    { justify-content: center; }
          .ibs-sh-left   { text-align: center; }
          .ibs-sh-rule   { margin: 0 auto 28px; width: 60%; }
          .ibs-sh-cta    { margin: 24px auto 0; }
          .ibs-sh-right  { width: 100%; }
          .ibs-sh-story  { text-align: left; }
        }
        @media (max-width: 600px) {
          .ibs-comic-section { padding: 70px 0 80px; }
          .ibs-sh-section    { padding: 70px clamp(16px,5%,28px) 80px; }
          .ibs-book-wrap     { max-width: 280px; }
          .ibs-vision-card   { padding: 20px 16px; }
          .ibs-sh-story      { padding: 18px 14px; }
          .ibs-cta-video-preview { width: 140px; bottom: calc(100% + 6px); }
        }
      `}</style>

      {/* ══════════════════════════════════════
          COMIC SECTION
      ══════════════════════════════════════ */}
      <section className="ibs-comic-section">
        <div className="ibs-comic-ambient" />
        <div className="ibs-comic-cool-accent" />

        <div className="ibs-comic-inner">

          {/* Header */}
          <header className="ibs-comic-header">
            <div className="ibs-comic-pre">
              <div className="ibs-comic-pre-line" />
              <span className="ibs-comic-pre-text">CINEMAPAYYAN ORIGINALS</span>
              <div className="ibs-comic-pre-line" />
            </div>
            <motion.h1
              className="ibs-comic-title"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              RETRO <span className="ibs-comic-title-cyan">BTS</span>{" "}
              <span className="ibs-comic-title-yellow">COMIC</span>
            </motion.h1>
            <div className="ibs-comic-rule" />
          </header>

          {/* BTS Image */}
          <div className="ibs-bts-wrap">
            <div className="ibs-bts-container">
              <div className="ibs-bts-badge">
                <div className="ibs-bts-badge-dot" />
                <span>BEHIND THE SCENES</span>
              </div>
              <div className="ibs-bts-img-wrap">
                <img src={Images.ComicCOverimg} alt="BTS" className="ibs-bts-img" />
                <div className="ibs-bts-vignette" />
              </div>
              <div className="ibs-bts-corner ibs-bts-corner-tl" />
              <div className="ibs-bts-corner ibs-bts-corner-br" />
            </div>
          </div>

          {/* Comic Grid */}
          <div className="ibs-comic-grid">

            {/* Book viewer */}
            <div className="ibs-book-wrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  className="ibs-comic-sheet"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <img
                    src={comicPages[currentPage]}
                    alt="Comic Page"
                    className="ibs-comic-sheet-img"
                  />
                  <div className="ibs-issue-tag">ISSUE.{currentPage + 1}</div>
                </motion.div>
              </AnimatePresence>

              <div className="ibs-nav-bar">
                <button
                  className="ibs-nav-btn"
                  onClick={() => paginate(-1)}
                  disabled={currentPage === 0}
                >
                  <span>PREV</span>
                </button>
                <div className="ibs-dots-row">
                  {comicPages.map((_, i) => (
                    <span key={i} className={`ibs-dot${i === currentPage ? " active" : ""}`} />
                  ))}
                </div>
                <button
                  className="ibs-nav-btn"
                  onClick={() => paginate(1)}
                  disabled={currentPage === comicPages.length - 1}
                >
                  <span>NEXT</span>
                </button>
              </div>
            </div>

            {/* Vision card */}
            <aside className="ibs-vision-card">
              <div className="ibs-vision-pre">
                <div className="ibs-vision-pre-line" />
                <span className="ibs-vision-pre-text">CREATIVE VISION</span>
              </div>
              <h2 className="ibs-vision-title">THE VISION</h2>
              <div className="ibs-vision-rule" />
              <p className="ibs-vision-lead">
                Where the raw grit of cinema meets the electric pulse of ink — a
                tribute to the golden era of visual storytelling, reimagined panel by panel.
              </p>
              <p className="ibs-vision-body">
                Conceived and crafted by the creative force of{" "}
                <strong>Abishake Raja</strong>, every frame is a statement — bold
                lines, deeper meaning. The <strong>Cinema Payyan</strong>{" "}
                collective doesn't just make films; they leave marks. This is not
                a behind-the-scenes — it's a front-row seat to obsession.
              </p>

              {/* CTA with hover video preview */}
              <div
                className="ibs-vision-cta-wrap"
                onMouseEnter={handleCtaEnter}
                onMouseLeave={handleCtaLeave}
              >
                {/* floating video preview */}
                <div className={`ibs-cta-video-preview${ctaHovered ? " visible" : ""}`}>
                  <video
                    ref={ctaVideoRef}
                    src={VideoAssets.vjPreviews[22]}
                    muted
                    loop
                    playsInline
                    preload="none"
                  />
                  <div className="ibs-cta-video-preview-tag">PREVIEW</div>
                </div>

                <a
                  href={INSTAGRAM_REEL}
                  target="_blank"
                  rel="noreferrer"
                  className="ibs-vision-cta"
                >
                  <span>VIEW FULL ARCHIVE</span>
                </a>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SHADOW PROMOTION SECTION
      ══════════════════════════════════════ */}
      <section className="ibs-sh-section">
        <div className="ibs-sh-glow-tr" />
        <div className="ibs-sh-glow-bl" />

        <div className="ibs-sh-inner">
          <div className="ibs-sh-left">
            <div className="ibs-sh-pre">
              <div className="ibs-sh-pre-line" />
              <span className="ibs-sh-pre-text">CINEMAPAYYAN ORIGINALS</span>
            </div>
            <motion.h2
              className="ibs-sh-title"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
            >
              SHADOW <span className="ibs-sh-title-cyan">PROMOTION</span>
            </motion.h2>
            <div className="ibs-sh-rule" />
            <div className="ibs-sh-story">
              <p className="ibs-sh-quote">
                "When light bends, legends are born — and Sathyam felt every shadow."
              </p>
              <p className="ibs-sh-body">
                <strong style={{ display: "block", fontSize: "1.1rem", marginBottom: "8px", color: "#fff" }}>
                  We don't just promote stories; we live the impact.
                </strong>
                For <strong>Sivakarthikeyan's</strong> <em>Maaveeran</em>, we transformed{" "}
                <strong>Sathyam Cinemas</strong> into a visceral battlefield of shadow and
                light. By blurring the lines between the screen and the streets, we ensured
                this warrior's journey wasn't just seen — it was <strong>felt.</strong>
              </p>
              <p className="ibs-sh-body">
                Directed by <strong>Madonne Ashwin</strong> · Celebrating <em>#VeerameJeyam</em> ·
                Ideation &amp; execution by <strong>CinemaPayyan Inc</strong> — where every frame
                has a heartbeat.
              </p>
              <a
                href="https://www.instagram.com/reel/CuoYbZqghwl/"
                target="_blank"
                rel="noreferrer"
                className="ibs-sh-cta"
              >
                <span>WATCH FULL VIDEO 🔥</span>
              </a>
            </div>
          </div>

          <div className="ibs-sh-right">
            <a
              href="https://www.instagram.com/reel/CuoYbZqghwl/"
              target="_blank"
              rel="noreferrer"
              className="ibs-sh-video-card"
            >
              <video autoPlay muted loop playsInline className="ibs-sh-vid">
                <source src={VideoAssets.vjPreviews[33]} type="video/mp4" />
              </video>
              <div className="ibs-sh-vid-grad" />
              <div className="ibs-sh-vid-tag">REEL</div>
              <div className="ibs-sh-vid-overlay">
                <span className="ibs-sh-vid-label">WATCH NOW</span>
              </div>
              <div className="ibs-sh-scan" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default InkbloodAndShadows;
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type DividerVariant = 'filmstrip' | 'scanline' | 'reel' | 'timecode' | 'slash' | 'marquee';
interface SectionDividerProps {
  variant?: DividerVariant;
  label?: string;
  index?: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

const SHARED_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');

/* ── keyframes ── */
@keyframes cpdPerf      { to { transform: translateX(-1480px); } }
@keyframes cpdBeam      { 0%{left:-320px;opacity:0} 12%{opacity:1} 88%{opacity:1} 100%{left:110%;opacity:0} }
@keyframes cpdDotOn     { 0%,100%{opacity:1;box-shadow:0 0 8px rgba(50,197,244,0.9)} 50%{opacity:0.1;box-shadow:none} }
@keyframes cpdRec       { 0%,44%{opacity:1} 50%,94%{opacity:0} }
@keyframes cpdSpin      { to{transform:rotate(360deg)} }
@keyframes cpdFlicker   { 0%,100%{opacity:1} 91%{opacity:.9} 92%{opacity:.25} 93.5%{opacity:1} 96%{opacity:.65} 97%{opacity:1} }
@keyframes cpdPulseGlow { 0%,100%{box-shadow:0 0 4px rgba(253,224,71,.25),0 0 10px rgba(253,224,71,.08)} 50%{box-shadow:0 0 10px rgba(253,224,71,.6),0 0 26px rgba(253,224,71,.2)} }
@keyframes cpdCorePulse { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
@keyframes cpdVuL       { 0%,100%{width:38%} 30%{width:72%} 60%{width:55%} 80%{width:82%} }
@keyframes cpdVuR       { 0%,100%{width:42%} 25%{width:68%} 55%{width:88%} 75%{width:50%} }
@keyframes cpdVuM       { 0%,100%{width:30%} 40%{width:60%} 70%{width:78%} }
@keyframes cpdHatch     { from{background-position:0 0} to{background-position:40px 0} }
@keyframes cpdBulb      { 0%,100%{opacity:.15;transform:scale(.82)} 50%{opacity:1;transform:scale(1)} }
@keyframes cpdBulbInv   { 0%,100%{opacity:1;transform:scale(1)}   50%{opacity:.15;transform:scale(.82)} }

/* ── root ── */
.cpd-root {
  width:100%; background:#000; overflow:hidden;
  opacity:0; transform:translateY(10px);
  transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1);
}
.cpd-root.in { opacity:1; transform:translateY(0); }

/* ── perforations ── */
.cpd-perfs {
  width:100%; overflow:hidden; position:relative;
  border-top:1px solid rgba(255,255,255,.035);
  border-bottom:1px solid rgba(255,255,255,.035);
  box-shadow:inset 0 2px 8px rgba(0,0,0,.75),inset 0 -2px 8px rgba(0,0,0,.75);
  height:22px;
}
@media(max-width:480px){ .cpd-perfs{ height:16px; } }

.cpd-perfs--y { background:linear-gradient(180deg,#0d0d0a,#111108 50%,#0d0d0a); }
.cpd-perfs--c { background:linear-gradient(180deg,#05080d,#070f18 50%,#05080d); }

.cpd-perfs-track {
  display:flex; align-items:center; height:100%;
  will-change:transform;
  animation:cpdPerf 8s linear infinite;
  animation-delay:-4s;
}
.cpd-perf-hole {
  display:inline-flex; flex-shrink:0;
  width:14px; height:10px; border-radius:2px; margin:0 11.5px;
  position:relative;
  background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,var(--ph-col,#fde047) 28%,var(--ph-col,#fde047) 72%,rgba(0,0,0,.45) 100%);
  opacity:var(--ph-op,.88);
  box-shadow:0 0 6px var(--ph-col,#fde047),0 0 18px color-mix(in srgb,var(--ph-col,#fde047) 28%,transparent),inset 0 1px 0 rgba(255,255,255,.32),inset 0 -1px 0 rgba(0,0,0,.55);
}
.cpd-perf-hole::after {
  content:''; position:absolute; top:1px; left:2px; right:2px; height:3px;
  border-radius:1px; background:rgba(255,255,255,.2);
}
@media(max-width:480px){
  .cpd-perf-hole{ width:9px; height:7px; margin:0 8px; }
}
@media(max-width:360px){
  .cpd-perf-hole{ width:7px; height:5px; margin:0 6px; }
}

/* ── label base ── */
.cpd-lbl {
  font-family:'DM Mono',monospace; font-weight:400;
  text-transform:uppercase;
  font-size:clamp(.48rem,2.2vw,.64rem);
  letter-spacing:clamp(1.5px,1.2vw,9px);
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  flex-shrink:1; min-width:0;
}

/* ══════════════════════════════════
   1. FILMSTRIP
══════════════════════════════════ */
.cpd-fs {
  background:linear-gradient(180deg,#0f0f0d,#0a0a09 50%,#0f0f0d);
  border-top:1px solid rgba(253,224,71,.22);
  border-bottom:1px solid rgba(253,224,71,.22);
  box-shadow:inset 0 1px 0 rgba(253,224,71,.06),inset 0 -1px 0 rgba(253,224,71,.06);
}
.cpd-fs-body {
  display:flex; align-items:center;
  padding:10px clamp(6px,3%,36px); min-height:48px; position:relative;
}
.cpd-fs-body::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(ellipse 60% 100% at 50% 50%,rgba(253,224,71,.04),transparent 70%);
}
.cpd-fs-box {
  flex-shrink:0; position:relative;
  width:clamp(18px,5.5vw,42px); height:clamp(14px,3.8vw,30px);
  border:1px solid rgba(253,224,71,.28);
  background:linear-gradient(135deg,rgba(253,224,71,.04),transparent 60%);
  box-shadow:inset 0 0 8px rgba(0,0,0,.8),0 0 4px rgba(253,224,71,.08);
  transition:all .3s;
}
.cpd-fs-box::before { content:''; position:absolute; inset:3px; border:1px solid rgba(253,224,71,.12); }
.cpd-fs-box::after  { content:''; position:absolute; top:2px; left:2px; right:2px; height:1px; background:rgba(255,255,255,.06); }
.cpd-fs-notch { position:absolute; bottom:0; right:0; width:5px; height:5px; border-top:1px solid rgba(253,224,71,.3); border-left:1px solid rgba(253,224,71,.3); }
@media(max-width:360px){ .cpd-fs-box{ display:none; } }

.cpd-fs-mid {
  flex:1; display:flex; align-items:center;
  gap:clamp(4px,1.5vw,14px); padding:0 clamp(4px,1.5vw,14px); min-width:0;
}
.cpd-fs-rule { flex:1; height:1px; min-width:4px; position:relative; }
.cpd-fs-rule--l { background:linear-gradient(90deg,transparent,rgba(253,224,71,.12) 20%,rgba(253,224,71,.55) 80%,rgba(253,224,71,.7)); }
.cpd-fs-rule--r { background:linear-gradient(90deg,rgba(253,224,71,.7),rgba(253,224,71,.55) 20%,rgba(253,224,71,.12) 80%,transparent); }
.cpd-fs-rule::after { content:''; position:absolute; top:-3px; width:1px; height:7px; background:rgba(253,224,71,.45); }
.cpd-fs-rule--l::after { right:0; }
.cpd-fs-rule--r::after { left:0; }
.cpd-fs-lbl {
  color:#fde047;
  text-shadow:0 0 12px rgba(253,224,71,.6),0 0 28px rgba(253,224,71,.22);
  animation:cpdFlicker 9s ease-in-out infinite;
  position:relative; z-index:1;
}
.cpd-fs-vu {
  position:absolute; bottom:3px; left:50%; transform:translateX(-50%);
  display:flex; gap:2px; align-items:flex-end;
  height:3px; width:clamp(28px,8vw,72px);
}
.cpd-fs-vu-bar { flex:1; height:100%; border-radius:1px; position:relative; overflow:hidden; background:rgba(253,224,71,.06); }
.cpd-fs-vu-bar::after { content:''; position:absolute; top:0; left:0; height:100%; border-radius:1px; background:linear-gradient(90deg,rgba(253,224,71,.2),rgba(253,224,71,.6)); }
.cpd-fs-vu-bar:nth-child(1)::after { animation:cpdVuL 2.1s ease-in-out infinite; }
.cpd-fs-vu-bar:nth-child(2)::after { animation:cpdVuR 1.8s ease-in-out infinite .3s; }

/* ══════════════════════════════════
   2. SCANLINE
══════════════════════════════════ */
.cpd-scan {
  background:linear-gradient(180deg,#060a0f,#070c13 50%,#060a0f);
  border-top:1px solid rgba(50,197,244,.22);
  border-bottom:1px solid rgba(50,197,244,.22);
  box-shadow:inset 0 1px 0 rgba(50,197,244,.07),inset 0 -1px 0 rgba(50,197,244,.07);
  position:relative;
}
.cpd-scan::after {
  content:''; position:absolute; top:0; bottom:0; width:340px;
  background:linear-gradient(90deg,transparent,rgba(50,197,244,.06) 30%,rgba(50,197,244,.14) 50%,rgba(50,197,244,.06) 70%,transparent);
  animation:cpdBeam 4.4s cubic-bezier(.4,0,.6,1) infinite .8s;
  pointer-events:none;
}
.cpd-scan-body {
  display:flex; align-items:center;
  padding:8px clamp(6px,4vw,44px);
  gap:clamp(5px,1.8vw,18px);
  min-height:52px; position:relative; z-index:1;
}
.cpd-scan-lens {
  flex-shrink:0; position:relative;
  width:clamp(24px,5.5vw,42px); height:clamp(24px,5.5vw,42px);
  display:flex; align-items:center; justify-content:center;
}
.cpd-scan-lens-outer {
  position:absolute; inset:0; border-radius:50%;
  border:1px solid rgba(50,197,244,.25);
  box-shadow:inset 0 0 10px rgba(50,197,244,.08),0 0 8px rgba(50,197,244,.12);
}
.cpd-scan-lens::before,.cpd-scan-lens::after {
  content:''; position:absolute; background:rgba(50,197,244,.18); z-index:1;
}
.cpd-scan-lens::before { top:50%; left:15%; right:15%; height:1px; margin-top:-.5px; }
.cpd-scan-lens::after  { left:50%; top:15%; bottom:15%; width:1px; margin-left:-.5px; }
.cpd-scan-ring { position:absolute; inset:4px; border:1px dashed rgba(50,197,244,.2); border-radius:50%; }
.cpd-scan-spoke {
  position:absolute; top:50%; left:50%;
  width:1px; height:16px;
  background:linear-gradient(to top,rgba(50,197,244,.55),transparent);
  transform-origin:bottom center; margin-left:-.5px; margin-top:-16px;
}
.cpd-scan-core {
  width:clamp(8px,2vw,13px); height:clamp(8px,2vw,13px); border-radius:50%; z-index:2;
  background:radial-gradient(circle at 35% 35%,rgba(180,240,255,.9),rgba(50,197,244,.6) 50%,rgba(20,100,140,.4));
  border:1px solid rgba(50,197,244,.6);
  box-shadow:0 0 8px rgba(50,197,244,.8),0 0 20px rgba(50,197,244,.3),inset 0 1px 0 rgba(255,255,255,.4);
  animation:cpdCorePulse 2s ease-in-out infinite;
}
.cpd-scan-vdiv {
  width:1px; height:28px; flex-shrink:0;
  background:linear-gradient(180deg,transparent,rgba(50,197,244,.3),transparent);
}
@media(max-width:360px){ .cpd-scan-vdiv{ display:none; } }

.cpd-scan-info { flex:1; min-width:0; display:flex; flex-direction:column; gap:3px; overflow:hidden; }
.cpd-scan-seq {
  font-family:'DM Mono',monospace; font-size:clamp(.36rem,1vw,.48rem);
  font-weight:300; letter-spacing:clamp(1px,.8vw,5px);
  color:rgba(50,197,244,.55); text-transform:uppercase;
}
.cpd-scan-lbl { color:rgba(255,255,255,.92); text-shadow:0 0 18px rgba(50,197,244,.35); }

.cpd-scan-db {
  display:flex; flex-direction:column; gap:2px; flex-shrink:0;
  width:clamp(14px,3.5vw,34px);
}
.cpd-scan-db-bar { height:3px; border-radius:1px; background:rgba(50,197,244,.1); position:relative; overflow:hidden; }
.cpd-scan-db-bar::after { content:''; position:absolute; top:0; left:0; height:100%; border-radius:1px; background:linear-gradient(90deg,rgba(50,197,244,.35),rgba(50,197,244,.9)); }
.cpd-scan-db-bar:nth-child(1)::after { animation:cpdVuL 1.9s ease-in-out infinite; }
.cpd-scan-db-bar:nth-child(2)::after { animation:cpdVuR 2.3s ease-in-out infinite .4s; }
.cpd-scan-db-bar:nth-child(3)::after { animation:cpdVuM 1.7s ease-in-out infinite .9s; }

.cpd-scan-sig { display:flex; gap:clamp(3px,1vw,5px); align-items:center; flex-shrink:0; }
.cpd-scan-dot {
  width:clamp(5px,1.5vw,7px); height:clamp(5px,1.5vw,7px); border-radius:50%;
  border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.06);
}
.cpd-scan-dot--on { background:#32c5f4; border-color:rgba(50,197,244,.8); animation:cpdDotOn 1.1s step-end infinite; }

/* ══════════════════════════════════
   3. REEL  (hub circle removed)
══════════════════════════════════ */
.cpd-reel {
  background:linear-gradient(180deg,#0a0a08,#070705 50%,#0a0a08);
  border-top:1px solid rgba(253,224,71,.18);
  border-bottom:1px solid rgba(253,224,71,.18);
  box-shadow:inset 0 1px 0 rgba(253,224,71,.05),inset 0 -1px 0 rgba(253,224,71,.05);
}
.cpd-reel-body {
  display:flex; align-items:center;
  padding:10px clamp(6px,4vw,44px);
  gap:clamp(6px,2vw,24px); min-height:54px;
}
.cpd-reel-rule { flex:1; min-width:4px; display:flex; flex-direction:column; gap:4px; }
.cpd-reel-rl { height:1px; }
.cpd-reel-rule--l .cpd-reel-rl:nth-child(1){ background:linear-gradient(90deg,transparent,rgba(253,224,71,.55)); }
.cpd-reel-rule--l .cpd-reel-rl:nth-child(2){ background:linear-gradient(90deg,transparent,rgba(253,224,71,.16)); height:.5px; }
.cpd-reel-rule--r .cpd-reel-rl:nth-child(1){ background:linear-gradient(90deg,rgba(50,197,244,.4),transparent); }
.cpd-reel-rule--r .cpd-reel-rl:nth-child(2){ background:linear-gradient(90deg,rgba(50,197,244,.14),transparent); height:.5px; }
@media(max-width:360px){
  .cpd-reel-rule{ min-width:2px; flex:0 0 2px; }
  .cpd-reel-rl:nth-child(2){ display:none; }
}

.cpd-reel-lbl { color:rgba(255,255,255,.88); text-shadow:0 0 14px rgba(253,224,71,.2); flex-shrink:1; min-width:0; overflow:hidden; text-overflow:ellipsis; }

/* ══════════════════════════════════
   4. TIMECODE
══════════════════════════════════ */
.cpd-tc {
  background:linear-gradient(180deg,#0c0c0a,#090908 50%,#0c0c0a);
  border-top:1px solid rgba(253,224,71,.22);
  border-bottom:1px solid rgba(253,224,71,.22);
}
.cpd-tc-body { display:flex; align-items:stretch; min-height:52px; }
.cpd-tc-clap {
  flex-shrink:0; width:clamp(28px,8vw,66px);
  background:#0d0d0b; border-right:1px solid rgba(255,255,255,.06);
  display:flex; flex-direction:column; overflow:hidden;
  box-shadow:inset -4px 0 12px rgba(0,0,0,.6);
}
.cpd-tc-stripes { display:flex; height:clamp(10px,2.5vw,20px); overflow:hidden; }
.cpd-tc-stripe { flex:1; }
.cpd-tc-stripe--y { background:linear-gradient(180deg,#ffe566,#d4b800); box-shadow:inset 0 -1px 0 rgba(0,0,0,.3); }
.cpd-tc-stripe--k { background:linear-gradient(180deg,#1a1a18,#0d0d0b); }
.cpd-tc-clap-base { flex:1; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#111,#0a0a0a); padding:3px 2px; }
.cpd-tc-scn { font-family:'Bebas Neue',sans-serif; font-size:clamp(.44rem,1.8vw,.8rem); letter-spacing:2px; color:rgba(255,255,255,.38); text-shadow:0 1px 0 rgba(0,0,0,.8); }
@media(max-width:340px){ .cpd-tc-clap{ display:none; } }

.cpd-tc-content {
  flex:1; display:flex; align-items:center;
  padding:0 clamp(6px,3%,32px); gap:clamp(4px,1.5vw,18px); min-width:0; overflow:hidden;
}
.cpd-tc-left { display:flex; align-items:center; gap:clamp(3px,1vw,10px); flex-shrink:1; min-width:0; overflow:hidden; }
.cpd-tc-seq {
  font-family:'DM Mono',monospace; font-size:clamp(.34rem,1vw,.52rem);
  font-weight:300; letter-spacing:clamp(1px,.6vw,4px);
  color:rgba(253,224,71,.62); white-space:nowrap; flex-shrink:0;
}
@media(max-width:420px){ .cpd-tc-seq{ display:none; } }
.cpd-tc-slash { color:rgba(255,255,255,.14); font-size:1rem; flex-shrink:0; line-height:1; }
@media(max-width:420px){ .cpd-tc-slash{ display:none; } }
.cpd-tc-lbl { color:rgba(255,255,255,.92); text-shadow:0 0 16px rgba(253,224,71,.18); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.cpd-tc-rule { flex:1; height:1px; min-width:6px; background:linear-gradient(90deg,rgba(253,224,71,.22),rgba(50,197,244,.15),transparent); }
.cpd-tc-right { flex-shrink:0; display:flex; flex-direction:column; gap:3px; align-items:flex-end; }
.cpd-tc-rec {
  font-family:'DM Mono',monospace; font-size:clamp(.42rem,1.3vw,.58rem);
  font-weight:500; letter-spacing:2px; color:#ff3737;
  text-shadow:0 0 8px rgba(255,55,55,.7);
  animation:cpdRec 1.1s step-end infinite; white-space:nowrap;
}
.cpd-tc-fps {
  font-family:'DM Mono',monospace; font-size:clamp(.3rem,.9vw,.44rem);
  font-weight:300; letter-spacing:2px; color:rgba(255,255,255,.18); white-space:nowrap;
}
@media(max-width:360px){ .cpd-tc-fps{ display:none; } }

/* ══════════════════════════════════
   5. SLASH
══════════════════════════════════ */
.cpd-slash-wrap { background:#000; }
.cpd-slash-edge {
  height:7px;
  background:repeating-linear-gradient(90deg,rgba(253,224,71,.12) 0,rgba(253,224,71,.12) 8px,transparent 8px,transparent 16px);
  border-bottom:1px solid rgba(253,224,71,.1);
  animation:cpdHatch 3s linear infinite;
}
.cpd-slash-edge--bot { border-top:1px solid rgba(253,224,71,.1); border-bottom:none; animation-direction:reverse; }
.cpd-slash-main {
  background:linear-gradient(180deg,#0d0d0b,#080806 50%,#0d0d0b);
  border-top:1px solid rgba(253,224,71,.26);
  border-bottom:1px solid rgba(253,224,71,.26);
  box-shadow:inset 0 2px 8px rgba(0,0,0,.7),inset 0 -2px 8px rgba(0,0,0,.7);
}
.cpd-slash-body {
  display:flex; align-items:center;
  padding:9px clamp(6px,4vw,44px);
  gap:clamp(6px,1.8vw,20px); min-height:50px;
}
.cpd-slash-num {
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(1.3rem,5vw,2.8rem);
  color:rgba(253,224,71,.78); line-height:1; flex-shrink:0; letter-spacing:3px;
  text-shadow:0 0 20px rgba(253,224,71,.4),0 2px 0 rgba(0,0,0,.8); position:relative;
}
.cpd-slash-num::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:2px; background:linear-gradient(90deg,rgba(253,224,71,.5),transparent); border-radius:1px; }
.cpd-slash-rule { height:1px; flex:1; min-width:4px; }
.cpd-slash-rule--y { background:linear-gradient(90deg,rgba(253,224,71,.6),rgba(253,224,71,.05)); box-shadow:0 0 4px rgba(253,224,71,.1); }
.cpd-slash-rule--c { background:linear-gradient(90deg,rgba(50,197,244,.05),rgba(50,197,244,.5)); }
@media(max-width:380px){ .cpd-slash-rule--c{ display:none; } }
.cpd-slash-lbl { color:rgba(255,255,255,.92); text-shadow:0 0 20px rgba(253,224,71,.14); flex-shrink:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.cpd-slash-aspect {
  font-family:'DM Mono',monospace; font-size:clamp(.4rem,1.2vw,.6rem);
  letter-spacing:2px; color:rgba(50,197,244,.35); flex-shrink:0;
  border:1px solid rgba(50,197,244,.15); padding:2px 4px; border-radius:2px; white-space:nowrap;
}
@media(max-width:400px){ .cpd-slash-aspect{ display:none; } }

/* ══════════════════════════════════
   6. MARQUEE
══════════════════════════════════ */
.cpd-mq {
  background:linear-gradient(180deg,#0a0a08,#070705 50%,#0a0a08);
  border-top:1px solid rgba(253,224,71,.28);
  border-bottom:1px solid rgba(253,224,71,.28);
  overflow:hidden;
}
.cpd-mq-bulbs {
  display:flex; justify-content:space-around; align-items:center; padding:5px 0;
  background:linear-gradient(180deg,#111108,#0d0d0b);
  border-bottom:1px solid rgba(0,0,0,.4);
  box-shadow:inset 0 -2px 6px rgba(0,0,0,.5);
}
.cpd-mq-bulbs--bot { border-top:1px solid rgba(0,0,0,.4); border-bottom:none; box-shadow:inset 0 2px 6px rgba(0,0,0,.5); }
.cpd-mq-bulb {
  width:clamp(3px,1.2vw,6px); height:clamp(3px,1.2vw,6px); border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#fff8c0,#fde047 50%,#b8930a);
  border:1px solid rgba(253,224,71,.35);
  flex-shrink:0;
}
.cpd-mq-row { overflow:hidden; white-space:nowrap; }
.cpd-mq-row span { display:inline-block; }
.cpd-mq-row--fwd { padding:8px 0; background:linear-gradient(180deg,#080806,#060604); border-bottom:1px solid rgba(255,255,255,.03); }
.cpd-mq-row--fwd span {
  font-family:'DM Mono',monospace; font-size:clamp(.42rem,1.5vw,.56rem);
  font-weight:400; letter-spacing:clamp(2px,1.4vw,8px);
  color:rgba(253,224,71,.72); text-transform:uppercase;
  text-shadow:0 0 10px rgba(253,224,71,.3);
}
.cpd-mq-row--rev { padding:7px 0; background:linear-gradient(180deg,#060604,#040402); }
.cpd-mq-row--rev span {
  font-family:'DM Mono',monospace; font-size:clamp(.42rem,1.5vw,.56rem);
  font-weight:300; letter-spacing:clamp(2px,1.4vw,8px);
  color:rgba(50,197,244,.75); text-transform:uppercase;
  text-shadow:0 0 10px rgba(50,197,244,.3);
}
`;

/* ── Film perforations ── */
const FilmPerfs = ({ color='#fde047', opacity=0.88, variant='y' }: { color?:string; opacity?:number; variant?:'y'|'c' }) => (
  <div className={`cpd-perfs cpd-perfs--${variant}`} style={{ '--ph-col':color, '--ph-op':String(opacity) } as React.CSSProperties}>
    <div className="cpd-perfs-track">
      {[0,1,2,3].flatMap(s => Array.from({ length:40 }, (_,i) => <span key={`${s}-${i}`} className="cpd-perf-hole" />))}
    </div>
  </div>
);

/* ══ 1. FILMSTRIP ══ */
const FilmstripDivider = ({ label }: { label:string }) => (
  <div className="cpd-fs">
    <FilmPerfs />
    <div className="cpd-fs-body">
      <div className="cpd-fs-box"><div className="cpd-fs-notch" /></div>
      <div className="cpd-fs-mid">
        <div className="cpd-fs-rule cpd-fs-rule--l" />
        <span className="cpd-lbl cpd-fs-lbl">{label}</span>
        <div className="cpd-fs-rule cpd-fs-rule--r" />
      </div>
      <div className="cpd-fs-box"><div className="cpd-fs-notch" /></div>
      <div className="cpd-fs-vu">
        <div className="cpd-fs-vu-bar" /><div className="cpd-fs-vu-bar" />
      </div>
    </div>
    <FilmPerfs />
  </div>
);

/* ══ 2. SCANLINE ══ */
const ScanlineDivider = ({ label, index }: { label:string; index:number }) => (
  <div className="cpd-scan">
    <FilmPerfs color="#32c5f4" opacity={0.65} variant="c" />
    <div className="cpd-scan-body">
      <div className="cpd-scan-lens">
        <div className="cpd-scan-lens-outer" />
        <motion.div
          className="cpd-scan-ring"
          style={{ position:'absolute', inset:4, borderRadius:'50%' }}
          animate={{ rotate:360 }}
          transition={{ duration:14, repeat:Infinity, ease:'linear' }}
        >
          {Array.from({ length:8 }, (_,i) => (
            <span key={i} className="cpd-scan-spoke" style={{ transform:`rotate(${i*45}deg)` }} />
          ))}
        </motion.div>
        <div className="cpd-scan-core" />
      </div>

      <div className="cpd-scan-vdiv" />

      <div className="cpd-scan-info">
        <span className="cpd-scan-seq">FRAME {pad(index)}</span>
        <span className="cpd-lbl cpd-scan-lbl">Cinemapayyan Specilitys</span>
      </div>

      <div className="cpd-scan-db">
        <div className="cpd-scan-db-bar" />
        <div className="cpd-scan-db-bar" />
        <div className="cpd-scan-db-bar" />
      </div>

      <div className="cpd-scan-sig">
        <div className="cpd-scan-dot" />
        <div className="cpd-scan-dot" />
        <div className="cpd-scan-dot cpd-scan-dot--on" />
      </div>
    </div>
    <FilmPerfs color="#32c5f4" opacity={0.65} variant="c" />
  </div>
);

/* ══ 3. REEL — hub circle removed ══ */
const ReelDivider = ({ label }: { label:string }) => (
  <div className="cpd-reel">
    <FilmPerfs opacity={0.62} />
    <div className="cpd-reel-body">
      <div className="cpd-reel-rule cpd-reel-rule--l">
        <div className="cpd-reel-rl" /><div className="cpd-reel-rl" />
      </div>

      <span className="cpd-lbl cpd-reel-lbl">{label}</span>
      <div className="cpd-reel-rule cpd-reel-rule--r">
        <div className="cpd-reel-rl" /><div className="cpd-reel-rl" />
      </div>
    </div>
    <FilmPerfs opacity={0.62} />
  </div>
);

/* ══ 4. TIMECODE ══ */
const TimecodeDivider = ({ label, index }: { label:string; index:number }) => (
  <div className="cpd-tc">
    <FilmPerfs opacity={0.68} />
    <div className="cpd-tc-body">
      <div className="cpd-tc-clap">
        <div className="cpd-tc-stripes">
          {Array.from({ length:8 }, (_,i) => (
            <div key={i} className={`cpd-tc-stripe ${i%2===0?'cpd-tc-stripe--y':'cpd-tc-stripe--k'}`} />
          ))}
        </div>
        <div className="cpd-tc-clap-base">
          <span className="cpd-tc-scn">SC {pad(index)}</span>
        </div>
      </div>
      <div className="cpd-tc-content">
        <div className="cpd-tc-left">
          <span className="cpd-tc-seq">SCENE {pad(index)}</span>
          <span className="cpd-tc-slash">／</span>
          <span className="cpd-lbl cpd-tc-lbl">{label}</span>
        </div>
        <div className="cpd-tc-rule" />
        <div className="cpd-tc-right">
          <span className="cpd-tc-rec">● REC</span>
          <span className="cpd-tc-fps">24 FPS</span>
        </div>
      </div>
    </div>
    <FilmPerfs opacity={0.68} />
  </div>
);

/* ══ 5. SLASH ══ */
const SlashDivider = ({ label, index }: { label:string; index:number }) => (
  <div className="cpd-slash-wrap">
    <div className="cpd-slash-edge" />
    <div className="cpd-slash-main">
      <FilmPerfs opacity={0.55} />
      <div className="cpd-slash-body">
        <div className="cpd-slash-num">{pad(index)}</div>
        <div className="cpd-slash-rule cpd-slash-rule--y" />
        <span className="cpd-lbl cpd-slash-lbl">{label}</span>
        <div className="cpd-slash-rule cpd-slash-rule--c" />
        <div className="cpd-slash-aspect">2.39:1</div>
      </div>
      <FilmPerfs opacity={0.55} />
    </div>
    <div className="cpd-slash-edge cpd-slash-edge--bot" />
  </div>
);

/* ══ 6. MARQUEE ══ */
const MarqueeDivider = ({ label }: { label:string }) => {
  const repeat = `${label} ★ `.repeat(18);
  return (
    <div className="cpd-mq">
      <div className="cpd-mq-bulbs">
        {Array.from({ length:34 }, (_,i) => (
          <motion.div key={i} className="cpd-mq-bulb"
            animate={{ opacity:[.15,1,.15], scale:[.82,1,.82] }}
            transition={{ duration:1.6, repeat:Infinity, delay:(i*.09)%1.6, ease:'easeInOut' }}
          />
        ))}
      </div>
      <div className="cpd-mq-row cpd-mq-row--fwd">
        <motion.span animate={{ x:['0%','-50%'] }} transition={{ duration:30, repeat:Infinity, ease:'linear' }}>
          {repeat}{repeat}
        </motion.span>
      </div>
      <div className="cpd-mq-row cpd-mq-row--rev">
        <motion.span animate={{ x:['-50%','0%'] }} transition={{ duration:34, repeat:Infinity, ease:'linear' }}>
          {repeat}{repeat}
        </motion.span>
      </div>
      <div className="cpd-mq-bulbs cpd-mq-bulbs--bot">
        {Array.from({ length:34 }, (_,i) => (
          <motion.div key={i} className="cpd-mq-bulb"
            animate={{ opacity:[1,.15,1], scale:[1,.82,1] }}
            transition={{ duration:1.6, repeat:Infinity, delay:(i*.09)%1.6, ease:'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
};

/* ════════════════════════════════
   ROOT
════════════════════════════════ */
const SectionDivider = ({ variant='filmstrip', label='SECTION', index=1 }: SectionDividerProps) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  return (
    <>
      <style>{SHARED_CSS}</style>
      <div ref={ref} className={`cpd-root${inView?' in':''}`}>
        {variant==='filmstrip' && <FilmstripDivider label={label} />}
        {variant==='scanline'  && <ScanlineDivider  label={label} index={index} />}
        {variant==='reel'      && <ReelDivider      label={label} />}
        {variant==='timecode'  && <TimecodeDivider  label={label} index={index} />}
        {variant==='slash'     && <SlashDivider     label={label} index={index} />}
        {variant==='marquee'   && <MarqueeDivider   label={label} />}
      </div>
    </>
  );
};

export default SectionDivider;
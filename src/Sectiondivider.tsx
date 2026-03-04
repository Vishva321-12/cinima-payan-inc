import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type DividerVariant = 'filmstrip' | 'scanline' | 'reel' | 'timecode' | 'slash' | 'marquee';

interface SectionDividerProps {
  variant?: DividerVariant;
  label?: string;
  index?: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

const FilmstripDivider = ({ label }: { label: string }) => (
  <div className="cpd-filmstrip">
    <div className="cpd-fs-holes cpd-fs-holes--top" />
    <div className="cpd-fs-content">
      <div className="cpd-fs-line cpd-fs-line--l" />
      <span className="cpd-fs-label">{label}</span>
      <div className="cpd-fs-line cpd-fs-line--r" />
    </div>
    <div className="cpd-fs-holes cpd-fs-holes--bot" />
  </div>
);

const ScanlineDivider = ({ label, index }: { label: string; index: number }) => (
  <div className="cpd-scan">
    <div className="cpd-scan-beam" />
    <div className="cpd-scan-num">{pad(index)}</div>
    <div className="cpd-scan-vline" />
    <div className="cpd-scan-label">{label}</div>
    <div className="cpd-scan-dots">
      <div className="cpd-scan-dot" /><div className="cpd-scan-dot" />
      <div className="cpd-scan-dot cpd-scan-dot--on" />
    </div>
  </div>
);

const ReelDivider = ({ label }: { label: string }) => (
  <div className="cpd-reel">
    <div className="cpd-reel-line cpd-reel-line--l" />
    <div className="cpd-reel-hub">
      <motion.div className="cpd-reel-ring" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="cpd-reel-tick" style={{ transform: `rotate(${i * 30}deg)` }} />
        ))}
      </motion.div>
      <div className="cpd-reel-core" />
    </div>
    <div className="cpd-reel-label">{label}</div>
    <div className="cpd-reel-line cpd-reel-line--r" />
  </div>
);

const TimecodeDivider = ({ label, index }: { label: string; index: number }) => (
  <div className="cpd-tc">
    <div className="cpd-tc-left">
      <span className="cpd-tc-seq">SEQ {pad(index)}</span>
      <span className="cpd-tc-slash">／</span>
      <span className="cpd-tc-label">{label}</span>
    </div>
    <div className="cpd-tc-bar" />
    <div className="cpd-tc-right">
      <span className="cpd-tc-rec">● REC</span>
    </div>
  </div>
);

const SlashDivider = ({ label, index }: { label: string; index: number }) => (
  <div className="cpd-slash">
    <div className="cpd-slash-num">{pad(index)}</div>
    <div className="cpd-slash-bar cpd-slash-bar--y" />
    <div className="cpd-slash-text">{label}</div>
    <div className="cpd-slash-bar cpd-slash-bar--c" />
  </div>
);

const MarqueeDivider = ({ label }: { label: string }) => {
  const repeat = `${label} • `.repeat(20);
  return (
    <div className="cpd-mq">
      <div className="cpd-mq-row cpd-mq-row--fwd">
        <motion.span animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>{repeat}{repeat}</motion.span>
      </div>
      <div className="cpd-mq-row cpd-mq-row--rev">
        <motion.span animate={{ x: ['-50%', '0%'] }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>{repeat}{repeat}</motion.span>
      </div>
    </div>
  );
};

const SectionDivider = ({ variant = 'filmstrip', label = 'SECTION', index = 1 }: SectionDividerProps) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,800&display=swap');

        .cpd-root { width:100%; background:#000; overflow:hidden; opacity:0; transform:translateY(8px); transition:opacity .55s ease,transform .55s ease; }
        .cpd-root.in { opacity:1; transform:translateY(0); }

        /* FILMSTRIP */
        .cpd-filmstrip { width:100%; background:#0c0c0c; border-top:2px solid rgba(253,224,71,0.55); border-bottom:2px solid rgba(253,224,71,0.55); padding:8px 0; }
        .cpd-fs-holes { height:22px; background-image:radial-gradient(circle,#fde047 38%,transparent 42%); background-size:54px 22px; background-repeat:repeat-x; animation:cpdFsMove 2.5s linear infinite; }
        @keyframes cpdFsMove { to { background-position:54px 0; } }
        .cpd-fs-content { display:flex; align-items:center; justify-content:center; gap:16px; padding:10px 5%; }
        .cpd-fs-line { flex:1; height:1px; }
        .cpd-fs-line--l { background:linear-gradient(90deg,transparent,rgba(253,224,71,0.6)); }
        .cpd-fs-line--r { background:linear-gradient(90deg,rgba(253,224,71,0.6),transparent); }
        .cpd-fs-label { font-family:'Courier New',monospace; font-size:0.65rem; letter-spacing:8px; color:#fde047; text-transform:uppercase; white-space:nowrap; flex-shrink:0; }

        /* SCANLINE */
        .cpd-scan { width:100%; height:64px; background:#060606; border-top:2px solid rgba(50,197,244,0.45); border-bottom:2px solid rgba(50,197,244,0.45); display:flex; align-items:center; padding:0 6%; gap:20px; position:relative; overflow:hidden; }
        .cpd-scan-beam { position:absolute; top:0; bottom:0; width:220px; background:linear-gradient(90deg,transparent,rgba(50,197,244,0.15),transparent); animation:cpdBeam 3s ease-in-out infinite; pointer-events:none; }
        @keyframes cpdBeam { 0%{left:-220px} 100%{left:110%} }
        .cpd-scan-num { font-family:'Cormorant Garamond',Georgia,serif; font-size:2.4rem; font-weight:800; font-style:italic; color:rgba(50,197,244,0.6); line-height:1; flex-shrink:0; }
        .cpd-scan-vline { width:1px; height:32px; background:rgba(255,255,255,0.15); flex-shrink:0; }
        .cpd-scan-label { font-family:'Courier New',monospace; font-size:0.62rem; letter-spacing:6px; color:rgba(255,255,255,0.65); text-transform:uppercase; flex:1; }
        .cpd-scan-dots { display:flex; gap:8px; align-items:center; flex-shrink:0; }
        .cpd-scan-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.18); }
        .cpd-scan-dot--on { background:#32c5f4; box-shadow:0 0 10px rgba(50,197,244,0.9); animation:cpdDotOn 1.1s step-end infinite; }
        @keyframes cpdDotOn { 0%,100%{opacity:1} 50%{opacity:0.15} }

        /* REEL */
        .cpd-reel { width:100%; height:68px; background:#000; border-top:1px solid rgba(253,224,71,0.3); border-bottom:1px solid rgba(253,224,71,0.3); display:flex; align-items:center; justify-content:center; gap:28px; }
        .cpd-reel-line { flex:1; height:1px; }
        .cpd-reel-line--l { background:linear-gradient(to right,transparent,rgba(253,224,71,0.55)); }
        .cpd-reel-line--r { background:linear-gradient(to left,transparent,rgba(50,197,244,0.45)); }
        .cpd-reel-hub { position:relative; width:44px; height:44px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cpd-reel-ring { position:absolute; inset:0; }
        .cpd-reel-tick { position:absolute; top:0; left:50%; width:1.5px; height:8px; background:rgba(253,224,71,0.6); transform-origin:bottom center; margin-left:-.75px; }
        .cpd-reel-core { width:14px; height:14px; border-radius:50%; border:1.5px solid rgba(253,224,71,0.7); background:#000; position:relative; z-index:2; }
        .cpd-reel-label { font-family:'Courier New',monospace; font-size:0.62rem; letter-spacing:7px; color:rgba(255,255,255,0.5); text-transform:uppercase; flex-shrink:0; }

        /* TIMECODE */
        .cpd-tc { width:100%; height:56px; background:#080808; border-top:2px solid rgba(253,224,71,0.35); border-bottom:2px solid rgba(253,224,71,0.35); display:flex; align-items:center; padding:0 6%; gap:20px; }
        .cpd-tc-left,.cpd-tc-right { display:flex; align-items:center; gap:12px; flex-shrink:0; }
        .cpd-tc-bar { flex:1; height:1px; background:linear-gradient(90deg,rgba(253,224,71,0.35),rgba(50,197,244,0.25),transparent); }
        .cpd-tc-seq { font-family:'Courier New',monospace; font-size:0.58rem; letter-spacing:4px; color:rgba(253,224,71,0.8); text-transform:uppercase; }
        .cpd-tc-slash { font-family:serif; font-size:1.1rem; color:rgba(255,255,255,0.2); }
        .cpd-tc-label { font-family:'Courier New',monospace; font-size:0.62rem; letter-spacing:5px; color:rgba(255,255,255,0.55); text-transform:uppercase; }
        .cpd-tc-rec { font-family:'Courier New',monospace; font-size:0.5rem; letter-spacing:2px; color:rgba(255,60,60,0.85); animation:cpdRec 1s step-end infinite; }
        @keyframes cpdRec { 0%,100%{opacity:1} 50%{opacity:0} }

        /* SLASH */
        .cpd-slash { width:100%; height:64px; background:#060606; border-top:1px solid rgba(255,255,255,0.08); border-bottom:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; padding:0 6%; gap:24px; }
        .cpd-slash-num { font-family:'Cormorant Garamond',Georgia,serif; font-size:3rem; font-weight:800; font-style:italic; color:rgba(253,224,71,0.28); line-height:1; flex-shrink:0; }
        .cpd-slash-bar { height:1px; flex:1; }
        .cpd-slash-bar--y { background:linear-gradient(90deg,rgba(253,224,71,0.65),transparent); }
        .cpd-slash-bar--c { background:linear-gradient(90deg,transparent,rgba(50,197,244,0.5)); }
        .cpd-slash-text { font-family:'Courier New',monospace; font-size:0.65rem; letter-spacing:8px; color:rgba(255,255,255,0.5); text-transform:uppercase; flex-shrink:0; }

        /* MARQUEE */
        .cpd-mq { width:100%; overflow:hidden; background:#090909; border-top:2px solid rgba(253,224,71,0.3); border-bottom:2px solid rgba(253,224,71,0.3); }
        .cpd-mq-row { overflow:hidden; white-space:nowrap; }
        .cpd-mq-row span { display:inline-block; }
        .cpd-mq-row--fwd { padding:10px 0; }
        .cpd-mq-row--fwd span { font-family:'Courier New',monospace; font-size:0.65rem; letter-spacing:7px; color:rgba(253,224,71,0.65); text-transform:uppercase; }
        .cpd-mq-row--rev { padding:8px 0; border-top:1px solid rgba(255,255,255,0.05); }
        .cpd-mq-row--rev span { font-family:'Courier New',monospace; font-size:0.55rem; letter-spacing:8px; color:rgba(50,197,244,0.45); text-transform:uppercase; }

        /* RESPONSIVE */
        @media (max-width:600px) {
          .cpd-scan-num { font-size:1.7rem; }
          .cpd-scan-label,.cpd-reel-label,.cpd-tc-label,.cpd-slash-text,.cpd-fs-label { font-size:0.5rem; letter-spacing:4px; }
          .cpd-tc { height:48px; }
          .cpd-slash { height:56px; }
          .cpd-slash-num { font-size:2.2rem; }
          .cpd-scan { height:56px; }
        }
      `}</style>

      <div ref={ref} className={`cpd-root ${inView ? 'in' : ''}`}>
        {variant === 'filmstrip' && <FilmstripDivider label={label} />}
        {variant === 'scanline'  && <ScanlineDivider  label={label} index={index} />}
        {variant === 'reel'      && <ReelDivider      label={label} />}
        {variant === 'timecode'  && <TimecodeDivider  label={label} index={index} />}
        {variant === 'slash'     && <SlashDivider     label={label} index={index} />}
        {variant === 'marquee'   && <MarqueeDivider   label={label} />}
      </div>
    </>
  );
};

export default SectionDivider;
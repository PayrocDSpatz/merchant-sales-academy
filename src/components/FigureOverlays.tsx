"use client";
import { useEffect, useRef, useState } from "react";

// Code-drawn animations layered on top of lesson stills: glows, rings and
// drawn lines lined up with elements already in the picture. The SVG uses the
// image's own pixel coordinates (viewBox 1672x941), so it scales with the image.
// Plays through twice (about 10 seconds) once the image is on screen, pausing
// while it's scrolled away, then stops on the plain picture so it doesn't pull
// the eye while the rep reads. Not shown at all for "reduce motion" users.

const W = 1672, H = 941;
const GREEN = "#5dff8f";

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

// Module 3, Lesson 1: the merchant's three checkpoints (who, why me, a question)
// light up in turn, then a line draws along the arc to the clock.
export function CheckpointsOverlay() {
  const [ref, inView] = useInView<SVGSVGElement>();
  const cards = [
    { x: 582, y: 270, w: 145, h: 185, cx: 706, cy: 292 },
    { x: 769, y: 285, w: 146, h: 185, cx: 891, cy: 298 },
    { x: 960, y: 288, w: 150, h: 187, cx: 1084, cy: 302 },
  ];
  return (
    <svg ref={ref} className={`fig-overlay${inView ? " playing" : ""}`} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <defs>
        <filter id="cp-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {cards.map((c, i) => (
        <g key={i}>
          <rect className="cp-card" x={c.x} y={c.y} width={c.w} height={c.h} rx="10" fill="none" stroke={GREEN} strokeWidth="4" filter="url(#cp-glow)" style={{ animationDelay: `${i * 0.7}s` }} />
          <circle className="cp-ring" cx={c.cx} cy={c.cy} r="17" fill="none" stroke={GREEN} strokeWidth="4" style={{ animationDelay: `${i * 0.7}s` }} />
        </g>
      ))}
      <path className="cp-arc" d="M595,230 C680,120 930,70 1090,195" pathLength={1} fill="none" stroke={GREEN} strokeWidth="7" strokeLinecap="round" filter="url(#cp-glow)" />
      <circle className="cp-clock" cx="1163" cy="220" r="55" fill="none" stroke={GREEN} strokeWidth="5" filter="url(#cp-glow)" />
      <style>{`
        .fig-overlay{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
        .fig-overlay *{animation-play-state:paused!important}
        .fig-overlay.playing *{animation-play-state:running!important}
        .cp-card{opacity:0;animation:cp-card 5s ease-out 2 backwards}
        .cp-ring{opacity:0;transform-box:fill-box;transform-origin:center;animation:cp-ring 5s ease-out 2 backwards}
        .cp-arc{stroke-dasharray:1;stroke-dashoffset:1;animation:cp-arc 5s ease-in-out 2.1s 2 backwards}
        .cp-clock{opacity:0;transform-box:fill-box;transform-origin:center;animation:cp-clock 5s ease-out 3.1s 2 backwards}
        @keyframes cp-card{0%{opacity:0}5%{opacity:.95}18%{opacity:0}100%{opacity:0}}
        @keyframes cp-ring{0%{opacity:0;transform:scale(1)}4%{opacity:1}20%{opacity:0;transform:scale(2.8)}100%{opacity:0;transform:scale(2.8)}}
        @keyframes cp-arc{0%{stroke-dashoffset:1;opacity:1}20%{stroke-dashoffset:0;opacity:1}34%{stroke-dashoffset:0;opacity:0}100%{stroke-dashoffset:1;opacity:0}}
        @keyframes cp-clock{0%{opacity:0;transform:scale(1)}4%{opacity:1}24%{opacity:0;transform:scale(1.7)}100%{opacity:0;transform:scale(1.7)}}
        @media (prefers-reduced-motion: reduce){.fig-overlay{display:none}}
      `}</style>
    </svg>
  );
}

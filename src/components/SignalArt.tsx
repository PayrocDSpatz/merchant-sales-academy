export function SignalArt() {
  return (
    <div className="signal-art" aria-hidden="true">
      <svg viewBox="0 0 620 660" role="img">
        <defs>
          <pattern id="dither-dots" width="11" height="11" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="2.4" fill="currentColor" />
            <circle cx="8.5" cy="8.5" r="1.15" fill="currentColor" opacity=".65" />
          </pattern>
          <pattern id="micro-dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.35" fill="currentColor" />
          </pattern>
          <clipPath id="portrait-clip">
            <path d="M151 608c12-93 36-151 88-179 26-14 52-20 70-31 17-10 23-30 24-54-42-27-65-76-65-133 0-85 50-144 126-144 81 0 128 61 128 145 0 57-22 106-65 132 1 25 8 44 25 55 18 11 46 17 72 31 51 29 76 87 87 178z" />
          </clipPath>
        </defs>
        <g className="portrait-fill" clipPath="url(#portrait-clip)">
          <rect x="120" y="32" width="500" height="590" fill="url(#dither-dots)" />
          <path d="M140 200h500v64H140zm0 116h500v22H140zm0 79h500v42H140zm0 117h500v16H140z" fill="currentColor" opacity=".18" />
        </g>
        <path className="headset" d="M253 180c0-180 284-180 284 0m-284 0v56c0 10 10 18 24 18h23v-70h-23c-14 0-24 8-24 18m284-22v56c0 10-10 18-24 18h-23V184h23c14 0 24 8 24 18m-17 52c0 40-20 62-59 65m0 0h-22" fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" />
        <rect x="70" y="88" width="146" height="48" rx="24" className="signal-pill" />
        <text x="143" y="118" textAnchor="middle" className="signal-text">LIVE CALL</text>
        <g className="wave">
          <path d="M52 553h54l13-50 20 103 24-142 22 89h53l16-37 19 37h64" fill="none" stroke="currentColor" strokeWidth="8" />
        </g>
        <rect x="407" y="482" width="185" height="92" className="objection-card" />
        <text x="426" y="510" className="tiny-label">OBJECTION 04</text>
        <text x="426" y="543" className="objection-text">“SEND INFO.”</text>
      </svg>
      <span className="crosshair crosshair-a">+</span>
      <span className="crosshair crosshair-b">+</span>
    </div>
  );
}

export function MiniWaveform() {
  return <div className="mini-wave" aria-hidden="true">{[18,38,24,60,42,76,30,52,82,45,32,68,25,46,18].map((h,i)=><i key={i} style={{height:h}} />)}</div>;
}

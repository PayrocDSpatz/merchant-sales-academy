export function MiniWaveform() {
  return <div className="mini-wave" aria-hidden="true">{[18,38,24,60,42,76,30,52,82,45,32,68,25,46,18].map((h,i)=><i key={i} style={{height:h}} />)}</div>;
}

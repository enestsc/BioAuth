import { Activity, ScanFace, ShieldCheck } from "lucide-react";

// Deterministic, synthetic face surface. No photograph or biometric data is used.
const dots = Array.from({ length: 62 }, (_, row) => {
  const v = row / 61;
  const y = 72 + v * 294;
  const width = Math.sin(Math.PI * (0.055 + v * 0.89)) * (v > 0.64 ? 93 - (v - 0.64) * 55 : 93);
  return Array.from({ length: 39 }, (_, col) => {
    const u = (col / 38) * 2 - 1;
    const x = 266 + u * width;
    const eye = Math.exp(-((Math.abs(u) - 0.43) ** 2) / 0.03 - ((v - 0.43) ** 2) / 0.004);
    const mouth = Math.exp(-(u ** 2) / 0.13 - ((v - 0.77) ** 2) / 0.0007);
    const nose = Math.exp(-(u ** 2) / 0.025 - ((v - 0.59) ** 2) / 0.012);
    return { x: x + nose * 4, y: y - nose * 9, r: 0.65 + (1 - Math.abs(u)) * 0.48, opacity: Math.max(0.1, 0.3 + Math.cos(u * 1.5) * 0.5 - eye * 0.57 - mouth * 0.46) };
  });
}).flat();

export function BiometricVisual() {
  return (
    <div className="biometric-visual" aria-label="Conceptual diagram of facial regions used to combine identity, visual attack and physiological evidence">
      <div className="visual-heading"><span><span className="status-dot" /> BIOMETRIC EVIDENCE</span><span>FIG. 01 / CONCEPT</span></div>
      <svg viewBox="0 0 530 410" className="face-diagram" role="img" aria-label="Synthetic point cloud face with forehead and cheek regions of interest">
        <defs>
          <radialGradient id="face-glow"><stop stopColor="#4ec59b" stopOpacity=".16" /><stop offset="1" stopColor="#4ec59b" stopOpacity="0" /></radialGradient>
          <pattern id="visual-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#9ac9b5" strokeOpacity=".08" /></pattern>
          <linearGradient id="roi-fill" x2="1" y2="1"><stop stopColor="#b7efb8" stopOpacity=".16" /><stop offset="1" stopColor="#b7efb8" stopOpacity=".03" /></linearGradient>
        </defs>
        <rect width="530" height="410" fill="url(#visual-grid)" />
        <ellipse cx="265" cy="210" rx="220" ry="210" fill="url(#face-glow)" />
        <path d="M266 38V384M112 210H419" stroke="#8cb5a2" strokeOpacity=".16" strokeDasharray="3 6" />
        <g fill="#bde7cc">{dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} opacity={d.opacity} />)}</g>
        <g fill="url(#roi-fill)" stroke="#c4f0b4" strokeWidth="1">
          <rect x="218" y="117" width="96" height="42" rx="4" />
          <rect x="188" y="213" width="48" height="55" rx="4" />
          <rect x="294" y="213" width="48" height="55" rx="4" />
        </g>
        <g fill="none" stroke="#93bfaa" strokeWidth=".8"><path d="M218 138H140L119 117H53M342 240H383L407 216H474M236 242H133L111 265H53" /></g>
        <g fill="#c5ddce" fontFamily="monospace" fontSize="9" letterSpacing="1.3"><text x="54" y="106">FOREHEAD ROI</text><text x="409" y="205">FACIAL MESH</text><text x="54" y="283">CHEEK ROI</text></g>
        <g fill="none" stroke="#bce7ae" strokeWidth="1.5"><path d="M164 88V65H189M343 65H368V88M164 339V362H189M343 362H368V339" /></g>
        <path className="scan-line" d="M166 180H366" stroke="#c4f0b4" strokeWidth="1" opacity=".55" />
        <text x="265" y="398" fill="#829e8f" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1.6">SYNTHETIC VISUALIZATION · NO LIVE CAPTURE</text>
      </svg>
      <div className="visual-signal"><div><Activity size={14} /><span>rPPG signal</span><span className="signal-label">ILLUSTRATIVE</span></div><svg viewBox="0 0 460 45" preserveAspectRatio="none" aria-hidden="true"><path d={Array.from({ length: 230 }, (_, i) => `${i ? "L" : "M"}${i * 2},${23 - Math.sin(i * 0.16) * (9 + Math.sin(i * 0.03) * 4) - Math.sin(i * 0.32) * 3}`).join(" ")} fill="none" stroke="#bce7ae" strokeWidth="1.4" /></svg></div>
      <div className="visual-channels"><span><ScanFace size={13} /> Face verification</span><span><ShieldCheck size={13} /> Visual PAD</span><span><Activity size={13} /> Physiology</span></div>
    </div>
  );
}

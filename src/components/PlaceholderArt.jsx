/**
 * PlaceholderArt
 * -------------------------------------------------------------------------
 * Generates an abstract, painterly SVG placeholder from a product's color
 * palette so the shop looks intentional before real photography is added.
 *
 * >>> REPLACE THIS <<<
 * Once you have real photos of your artwork, swap this component out for a
 * plain <img src={product.images[0]} alt={product.title} /> — see the
 * comment in ProductCard.jsx and ProductDetail.jsx for exactly where.
 */
export default function PlaceholderArt({ palette = ['#B14E33', '#E0A339', '#F7F1E7'], seed = 1, className = '' }) {
  const id = `art-${seed}`
  const [c1, c2, c3, c4] = [palette[0], palette[1] || palette[0], palette[2] || '#F7F1E7', palette[3] || palette[0]]

  // Deterministic pseudo-random offsets from the seed so each card looks distinct but stable
  const n = (typeof seed === 'number' ? seed : 1)
  const a = (n * 37) % 100
  const b = (n * 61) % 100
  const cx = 20 + a
  const cy = 20 + b

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} role="img" aria-label="Placeholder artwork image — replace with real photography">
      <svg viewBox="0 0 400 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c3} />
            <stop offset="100%" stopColor={c3} stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id={`${id}-blob1`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={c1} stopOpacity="0.95" />
            <stop offset="100%" stopColor={c1} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-blob2`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={c2} stopOpacity="0.9" />
            <stop offset="100%" stopColor={c2} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#${id}-bg)`} />
        <ellipse cx={cx * 3.2} cy={cy * 3.4} rx="220" ry="240" fill={`url(#${id}-blob1)`} />
        <ellipse cx={400 - cx * 2.6} cy={500 - cy * 2.2} rx="200" ry="180" fill={`url(#${id}-blob2)`} />
        <path
          d={`M0,${140 + (n * 13) % 60} C 100,${100 + (n * 7) % 120} 300,${220 + (n * 17) % 100} 400,${160 + (n * 5) % 80} L400,500 L0,500 Z`}
          fill={c4}
          opacity="0.35"
        />
        <line x1="0" y1={250 + (n * 9) % 40} x2="400" y2={230 + (n * 21) % 60} stroke={c4} strokeWidth="1.5" opacity="0.4" />
      </svg>
      <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1 text-[10px] tracking-wide text-cream backdrop-blur-sm">
        Placeholder — add artwork photo
      </span>
    </div>
  )
}

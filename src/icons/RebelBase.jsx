function RebelBase({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield dome */}
      <path
        d="M 4 18 Q 4 8, 12 8 Q 20 8, 20 18 Z"
        fill="#ff6b35"
        opacity="0.3"
        stroke="#ff6b35"
        strokeWidth="1.5"
      />

      {/* Main tower structure */}
      <rect x="10" y="12" width="4" height="8" fill="#8b4513" stroke="#654321" strokeWidth="1" />

      {/* Tower top */}
      <path d="M 9 12 L 12 9 L 15 12 Z" fill="#654321" stroke="#654321" strokeWidth="1" />

      {/* Communication dish */}
      <ellipse cx="12" cy="10" rx="3" ry="1.5" fill="#888" stroke="#666" strokeWidth="0.8" />
      <line x1="12" y1="9" x2="12" y2="12" stroke="#666" strokeWidth="0.8" />

      {/* Side buildings - left */}
      <rect x="6" y="16" width="3" height="4" fill="#a0522d" stroke="#654321" strokeWidth="0.8" />

      {/* Side buildings - right */}
      <rect x="15" y="16" width="3" height="4" fill="#a0522d" stroke="#654321" strokeWidth="0.8" />

      {/* Ground platform */}
      <rect x="4" y="19.5" width="16" height="1" fill="#654321" />

      {/* Shield energy lines */}
      <path d="M 6 16 Q 12 10, 18 16" stroke="#ff6b35" strokeWidth="0.8" opacity="0.5" fill="none" />
      <path d="M 7 14 Q 12 9, 17 14" stroke="#ff6b35" strokeWidth="0.8" opacity="0.4" fill="none" />
    </svg>
  )
}

export default RebelBase

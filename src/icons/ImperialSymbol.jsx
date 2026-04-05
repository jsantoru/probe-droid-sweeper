function ImperialSymbol({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Imperial Crest - simplified cogwheel design */}

      {/* Outer circle */}
      <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2" fill="#1a1a1a" />

      {/* Inner hexagon */}
      <path
        d="M 12 5 L 17 8.5 L 17 15.5 L 12 19 L 7 15.5 L 7 8.5 Z"
        fill="#2a2a2a"
        stroke="#888"
        strokeWidth="1.5"
      />

      {/* Center circle */}
      <circle cx="12" cy="12" r="3" fill="#1a1a1a" stroke="#cc0000" strokeWidth="1.5" />

      {/* Spokes */}
      <line x1="12" y1="5" x2="12" y2="9" stroke="#888" strokeWidth="1.5" />
      <line x1="12" y1="15" x2="12" y2="19" stroke="#888" strokeWidth="1.5" />
      <line x1="17" y1="8.5" x2="14.5" y2="10.5" stroke="#888" strokeWidth="1.5" />
      <line x1="9.5" y1="13.5" x2="7" y2="15.5" stroke="#888" strokeWidth="1.5" />
      <line x1="17" y1="15.5" x2="14.5" y2="13.5" stroke="#888" strokeWidth="1.5" />
      <line x1="9.5" y1="10.5" x2="7" y2="8.5" stroke="#888" strokeWidth="1.5" />
    </svg>
  )
}

export default ImperialSymbol

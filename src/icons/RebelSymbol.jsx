function RebelSymbol({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Simplified Rebel Alliance Starbird */}
      <path
        d="M 12 3 Q 8 6, 6 12 Q 8 10, 12 12 Q 16 10, 18 12 Q 16 6, 12 3 Z"
        fill="#ff6b35"
        stroke="#ff6b35"
        strokeWidth="1"
      />
      <path
        d="M 12 12 Q 10 16, 8 21 M 12 12 Q 14 16, 16 21"
        stroke="#ff6b35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="#ff6b35" />
      <path
        d="M 3 12 Q 6 11, 9 12 M 15 12 Q 18 11, 21 12"
        stroke="#ff6b35"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default RebelSymbol

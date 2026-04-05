function TargetLock({ size = 24, className = '', variant = 'rebel' }) {
  const color = variant === 'rebel' ? '#ff6b35' : '#cc0000'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" opacity="0.8" />

      {/* Inner circle */}
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" opacity="0.9" />

      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" fill={color} />

      {/* Crosshairs - top */}
      <line x1="12" y1="1" x2="12" y2="5" stroke={color} strokeWidth="2" />

      {/* Crosshairs - bottom */}
      <line x1="12" y1="19" x2="12" y2="23" stroke={color} strokeWidth="2" />

      {/* Crosshairs - left */}
      <line x1="1" y1="12" x2="5" y2="12" stroke={color} strokeWidth="2" />

      {/* Crosshairs - right */}
      <line x1="19" y1="12" x2="23" y2="12" stroke={color} strokeWidth="2" />

      {/* Corner brackets - top-left */}
      <path d="M 4 4 L 4 7 M 4 4 L 7 4" stroke={color} strokeWidth="1.5" opacity="0.7" />

      {/* Corner brackets - top-right */}
      <path d="M 20 4 L 20 7 M 20 4 L 17 4" stroke={color} strokeWidth="1.5" opacity="0.7" />

      {/* Corner brackets - bottom-left */}
      <path d="M 4 20 L 4 17 M 4 20 L 7 20" stroke={color} strokeWidth="1.5" opacity="0.7" />

      {/* Corner brackets - bottom-right */}
      <path d="M 20 20 L 20 17 M 20 20 L 17 20" stroke={color} strokeWidth="1.5" opacity="0.7" />
    </svg>
  )
}

export default TargetLock

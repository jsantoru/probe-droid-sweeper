function ProbeDroid({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main sphere body */}
      <circle cx="12" cy="12" r="6" fill="#2a2a2a" stroke="#666" strokeWidth="1" />

      {/* Eye/sensor */}
      <circle cx="12" cy="12" r="2.5" fill="#cc0000" opacity="0.8" />
      <circle cx="12" cy="12" r="1.2" fill="#ff3333" />

      {/* Top antenna */}
      <line x1="12" y1="6" x2="12" y2="2" stroke="#666" strokeWidth="1.5" />
      <circle cx="12" cy="2" r="1" fill="#888" />

      {/* Side sensors - left */}
      <line x1="6" y1="10" x2="3" y2="8" stroke="#666" strokeWidth="1.2" />
      <circle cx="3" cy="8" r="0.8" fill="#888" />

      {/* Side sensors - right */}
      <line x1="18" y1="10" x2="21" y2="8" stroke="#666" strokeWidth="1.2" />
      <circle cx="21" cy="8" r="0.8" fill="#888" />

      {/* Bottom sensors - left */}
      <line x1="8" y1="17" x2="6" y2="21" stroke="#666" strokeWidth="1.2" />
      <circle cx="6" cy="21" r="0.8" fill="#888" />

      {/* Bottom sensors - right */}
      <line x1="16" y1="17" x2="18" y2="21" stroke="#666" strokeWidth="1.2" />
      <circle cx="18" cy="21" r="0.8" fill="#888" />

      {/* Panel details on sphere */}
      <path d="M 9 12 L 15 12" stroke="#444" strokeWidth="0.5" opacity="0.6" />
      <path d="M 12 9 L 12 15" stroke="#444" strokeWidth="0.5" opacity="0.6" />
    </svg>
  )
}

export default ProbeDroid

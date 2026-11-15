export default function Logo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="flui-logo-gradient" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="0.55" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
      <circle cx="13.5" cy="20" r="4.5" fill="url(#flui-logo-gradient)" />
      <circle cx="27" cy="12.5" r="3.2" fill="#22d3ee" />
      <circle cx="27" cy="27.5" r="3.2" fill="#a78bfa" />
      <path d="M17.5 18.2L24 14.2M17.5 21.8L24 25.8" stroke="white" strokeOpacity="0.62" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

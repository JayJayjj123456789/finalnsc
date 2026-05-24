// Elegant 2D Fallback Globe Component with zero Three.js/R3F dependencies
export default function ElegantEarthFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative select-none">
      {/* Atmosphere Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
      <div className="absolute w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl animate-pulse delay-750" />
      
      {/* SVG Animated Globe */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin [animation-duration:20s]" />
        <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/20 animate-spin [animation-duration:35s] [animation-direction:reverse]" />
        
        {/* Globe SVG */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-48 h-48 md:w-60 md:h-60 text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]"
        >
          <defs>
            <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.8" />
            </radialGradient>
            <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Base sphere */}
          <circle cx="50%" cy="50%" r="48" fill="url(#globeGrad)" stroke="#34d399" strokeWidth="0.5" strokeOpacity="0.3" />
          
          {/* Longitude and Latitude Grid */}
          <g stroke="url(#gridGrad)" strokeWidth="0.3" fill="none">
            {/* Latitudes */}
            <ellipse cx="50" cy="50" rx="48" ry="12" />
            <ellipse cx="50" cy="50" rx="48" ry="24" />
            <ellipse cx="50" cy="50" rx="48" ry="36" />
            <line x1="2" y1="50" x2="98" y2="50" />
            {/* Longitudes */}
            <ellipse cx="50" cy="50" rx="12" ry="48" className="animate-pulse" />
            <ellipse cx="50" cy="50" rx="24" ry="48" />
            <ellipse cx="50" cy="50" rx="36" ry="48" />
            <line x1="50" y1="2" x2="50" y2="98" />
          </g>

          {/* Continents stylized dots */}
          <g fill="#34d399" opacity="0.85">
            {/* Thailand / Asia area highlight */}
            <circle cx="68" cy="45" r="2.5" className="animate-ping" fill="#22d3ee" />
            <circle cx="68" cy="45" r="1.5" fill="#22d3ee" />
            {/* Asia dots */}
            <circle cx="62" cy="35" r="1" />
            <circle cx="65" cy="38" r="1" />
            <circle cx="72" cy="36" r="1.2" />
            <circle cx="75" cy="40" r="1" />
            <circle cx="70" cy="48" r="1" />
            <circle cx="60" cy="42" r="1" />
            <circle cx="58" cy="30" r="1" />
            {/* Europe */}
            <circle cx="45" cy="32" r="1" />
            <circle cx="48" cy="35" r="1.2" />
            <circle cx="42" cy="38" r="1" />
            <circle cx="38" cy="34" r="1" />
            {/* Africa */}
            <circle cx="42" cy="55" r="1.2" />
            <circle cx="46" cy="62" r="1" />
            <circle cx="44" cy="68" r="1" />
            <circle cx="50" cy="52" r="1" />
            {/* Americas */}
            <circle cx="20" cy="40" r="1" />
            <circle cx="24" cy="36" r="1.2" />
            <circle cx="22" cy="48" r="1" />
            <circle cx="28" cy="65" r="1" />
            <circle cx="30" cy="70" r="1.2" />
          </g>
        </svg>

        {/* Orbiting particles */}
        <div className="absolute w-4 h-4 bg-cyan-400 rounded-full blur-[2px] animate-ping [animation-duration:3s]" style={{ top: '20%', left: '15%' }} />
        <div className="absolute w-3 h-3 bg-emerald-400 rounded-full blur-[1px] animate-pulse" style={{ bottom: '25%', right: '15%' }} />
      </div>

      <p className="text-slate-400 text-sm mt-4 text-center max-w-xs leading-relaxed font-medium">
        หมุนเพื่อสำรวจเส้นทางท่องเที่ยวจำลอง
      </p>
    </div>
  )
}

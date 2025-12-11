function CongratsSection({ showPrize }) {
  return (
    <div className={`relative flex items-center justify-center transition-all duration-500 ${showPrize ? 'mt-4 -translate-y-8' : 'mt-8'}`}>
      <div className="relative inline-block">
        {/* CONGRATULATION Image */}
        <img 
          src="/congrats.png" 
          alt="CONGRATULATION"
          className="relative z-10 max-w-full h-auto"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(96, 165, 250, 0.8)) drop-shadow(0 0 60px rgba(96, 165, 250, 0.6))',
            maxHeight: '120px',
            width: 'auto'
          }}
        />
        
        {/* Lens flares above G and T - positioned relative to image */}
        <div className="absolute top-[-80px] left-[15%] w-40 h-40 opacity-90" style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(96, 165, 250, 0.8) 20%, rgba(96, 165, 250, 0.4) 40%, transparent 70%)',
          filter: 'blur(25px)',
          transform: 'translateX(-50%)'
        }}></div>
        <div className="absolute top-[-80px] left-[55%] w-40 h-40 opacity-90" style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(96, 165, 250, 0.8) 20%, rgba(96, 165, 250, 0.4) 40%, transparent 70%)',
          filter: 'blur(25px)',
          transform: 'translateX(-50%)'
        }}></div>

        {/* Horizontal light streaks from lens flares */}
        <div className="absolute top-[-40px] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent blur-sm"></div>

        {/* Circuit board lines - Above image */}
        <svg className="absolute -top-20 left-0 w-full h-40 opacity-70" style={{ pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.9)" />
              <stop offset="100%" stopColor="rgba(96, 165, 250, 0.5)" />
            </linearGradient>
          </defs>
          {/* Lines from C (left side) */}
          <line x1="4%" y1="70%" x2="2%" y2="10%" stroke="url(#circuitGradient)" strokeWidth="2" />
          <line x1="4%" y1="70%" x2="6%" y2="10%" stroke="url(#circuitGradient)" strokeWidth="2" />
          <circle cx="2%" cy="10%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          <circle cx="6%" cy="10%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          {/* Lines from G */}
          <line x1="17%" y1="70%" x2="14%" y2="10%" stroke="url(#circuitGradient)" strokeWidth="2" />
          <circle cx="14%" cy="10%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          {/* Lines from T */}
          <line x1="54%" y1="70%" x2="51%" y2="10%" stroke="url(#circuitGradient)" strokeWidth="2" />
          <circle cx="51%" cy="10%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          {/* Lines from L */}
          <line x1="64%" y1="70%" x2="67%" y2="10%" stroke="url(#circuitGradient)" strokeWidth="2" />
          <circle cx="67%" cy="10%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          {/* Lines from second T */}
          <line x1="74%" y1="70%" x2="77%" y2="10%" stroke="url(#circuitGradient)" strokeWidth="2" />
          <circle cx="77%" cy="10%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          {/* Lines from O */}
          <line x1="81%" y1="70%" x2="84%" y2="10%" stroke="url(#circuitGradient)" strokeWidth="2" />
          <circle cx="84%" cy="10%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          {/* Lines from N (right side) */}
          <line x1="94%" y1="70%" x2="96%" y2="10%" stroke="url(#circuitGradient)" strokeWidth="2" />
          <line x1="94%" y1="70%" x2="98%" y2="10%" stroke="url(#circuitGradient)" strokeWidth="2" />
          <circle cx="96%" cy="10%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          <circle cx="98%" cy="10%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
        </svg>

        {/* Circuit board lines - Below image */}
        <svg className="absolute -bottom-20 left-0 w-full h-40 opacity-70" style={{ pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="circuitGradientBottom" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.5)" />
              <stop offset="100%" stopColor="rgba(96, 165, 250, 0.9)" />
            </linearGradient>
          </defs>
          {/* Lines from C (left side) */}
          <line x1="4%" y1="30%" x2="2%" y2="90%" stroke="url(#circuitGradientBottom)" strokeWidth="2" />
          <line x1="4%" y1="30%" x2="6%" y2="90%" stroke="url(#circuitGradientBottom)" strokeWidth="2" />
          <circle cx="2%" cy="90%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          <circle cx="6%" cy="90%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          {/* Lines from G */}
          <line x1="17%" y1="30%" x2="14%" y2="90%" stroke="url(#circuitGradientBottom)" strokeWidth="2" />
          <circle cx="14%" cy="90%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          {/* Lines from N (right side) */}
          <line x1="94%" y1="30%" x2="96%" y2="90%" stroke="url(#circuitGradientBottom)" strokeWidth="2" />
          <line x1="94%" y1="30%" x2="98%" y2="90%" stroke="url(#circuitGradientBottom)" strokeWidth="2" />
          <circle cx="96%" cy="90%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
          <circle cx="98%" cy="90%" r="4" fill="rgba(96, 165, 250, 1)" style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))' }} />
        </svg>
      </div>
    </div>
  )
}

export default CongratsSection

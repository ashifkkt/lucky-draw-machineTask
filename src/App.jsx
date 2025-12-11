import { useState, useRef } from 'react'

function App() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [showPrize, setShowPrize] = useState(false)
  const [scrollPositions, setScrollPositions] = useState([0, 0, 0, 0, 0, 0])
  const panelRefs = useRef([])

  // Numbers 1-6 for each panel
  const numbers = [1, 2, 3, 4, 5, 6]

  // Generate random positions for particles and lines once using lazy initialization
  const [particlePositions] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2
    }))
  )

  const [linePositions] = useState(() =>
    Array.from({ length: 8 }).map(() => ({
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100
    }))
  )

  const spin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setShowPrize(false)

    // Generate winning number (1-6)
    const targetNumber = Math.floor(Math.random() * 6) + 1

    // Get current positions as starting point
    const startPositions = [...scrollPositions]

    // Animate each panel with slight stagger but same final position
    const duration = 3500 // 3.5 seconds
    const startTime = Date.now()
    
    // Calculate the exact target position for the winning number
    // num.png contains numbers 0-9 stacked vertically (10 numbers total)
    // Each number takes up exactly 1/10th of the total image height
    // The scroll area height is approximately 32% of the panel height (178px)
    // So visible area is about 57px, and each number in num.png is 1/10 of its total height
    const scrollAreaHeight = 178 * 0.32 // Height of the visible scroll area (~57px)
    const numImageTotalHeight = scrollAreaHeight * 10 // Full num.png height when displayed
    const numberHeight = numImageTotalHeight / 10 // Height of each individual number segment
    
    // Normalize starting positions to nearest number boundary for clean alignment
    const normalizedStartPositions = startPositions.map(pos => {
      // Round to nearest multiple of numberHeight
      return Math.round(pos / numberHeight) * numberHeight
    })
    
    // Calculate base scroll to show target number at top of visible area
    // We want to position so the target number is visible in the center/top of the frame
    const baseScroll = (targetNumber - 1) * numberHeight
    
    // Add multiple full rotations for effect (same for all panels)
    const rotations = 6 + Math.random() * 2 // 6-8 full rotations
    const fullRotation = 10 * numberHeight // Full rotation through all 10 numbers (0-9)
    
    // Final position must align to show the target number
    const finalTargetPosition = baseScroll + (rotations * fullRotation)
    
    // Ensure it's a perfect multiple for alignment
    const alignedFinalPosition = Math.round(finalTargetPosition / numberHeight) * numberHeight

    // Add slight stagger delays for visual effect (but all end at same position)
    const staggerDelays = [0, 30, 60, 90, 120, 150] // milliseconds

    const animate = () => {
      const elapsed = Date.now() - startTime

      // Calculate positions for each panel with stagger
      const newPositions = normalizedStartPositions.map((startPos, index) => {
        const adjustedElapsed = Math.max(0, elapsed - staggerDelays[index])
        const progress = Math.min(adjustedElapsed / duration, 1)

        // Easing function for smooth slowdown (ease-out cubic)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)

        // All panels end at the same final position
        return startPos + (alignedFinalPosition - startPos) * easeOutCubic
      })

      setScrollPositions(newPositions)

      const maxProgress = Math.max(...normalizedStartPositions.map((_, index) => {
        const adjustedElapsed = Math.max(0, elapsed - staggerDelays[index])
        return Math.min(adjustedElapsed / duration, 1)
      }))

      if (maxProgress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Animation complete - ensure all panels are at exact final position
        setScrollPositions([alignedFinalPosition, alignedFinalPosition, alignedFinalPosition, alignedFinalPosition, alignedFinalPosition, alignedFinalPosition])
        setIsSpinning(false)

        // Show prize message after a short delay
        setTimeout(() => {
          setShowPrize(true)
        }, 500)
      }
    }

    requestAnimationFrame(animate)
  }

  // Reset function to start fresh
  const reset = () => {
    setScrollPositions([0, 0, 0, 0, 0, 0])
    setShowPrize(false)
    setIsSpinning(false)
  }

  return (
    <div className="h-screen bg-gradient-to-b from-purple-950 via-black to-purple-950 relative overflow-hidden">
      {/* Animated background particles and lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing particles */}
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              boxShadow: '0 0 10px rgba(96, 165, 250, 0.8)'
            }}
          />
        ))}
        
        {/* Glowing lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.3)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(96, 165, 250, 0.3)" />
            </linearGradient>
          </defs>
          {linePositions.map((line, i) => (
            <line
              key={i}
              x1={line.x1 + '%'}
              y1={line.y1 + '%'}
              x2={line.x2 + '%'}
              y2={line.y2 + '%'}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              opacity={0.4}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 h-screen flex flex-col items-center p-8 overflow-hidden" style={{ paddingBottom: 0 }}>
        {/* Magenta arc at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent blur-sm"></div>
        
        {/* CONGRATULATION Image */}
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

        {/* 1ST PRIZE Message */}
        {showPrize && (
          <div className="text-center animate-fade-in relative z-20" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="inline-block">
              <h2 
                className="mb-4"
                style={{
                  fontFamily: 'AspireSCBlackOblique-Regular, sans-serif',
                  fontWeight: 900,
                  fontStyle: 'oblique',
                  fontSize: '80px',
                  lineHeight: '100%',
                  letterSpacing: '7%',
                  color: '#ef4444',
                  WebkitTextStroke: '1px #ef4444',
                  textShadow: '0 0 20px rgba(139, 92, 246, 0.9), 0 0 40px rgba(139, 92, 246, 0.7), 0 0 60px rgba(139, 92, 246, 0.5), 0 0 80px rgba(96, 165, 250, 0.4), 2px 2px 0px rgba(0, 0, 0, 0.3)'
                }}
              >
                1ST PRIZE
              </h2>
            </div>
          </div>
        )}

        {/* Number Panels Container - matching Figma layout exactly */}
        <div className="flex gap-3 md:gap-4 relative z-10 justify-center items-end" style={{ width: '100%', maxWidth: '1200px', marginTop: 'auto', marginBottom: '80px' }}>
          {numbers.map((panelNum, panelIndex) => (
            <div key={panelIndex} className="flex flex-col items-center justify-end" style={{ margin: 0, padding: 0 }}>
              {/* Number Panel with each.png (includes frame and pedestal) */}
              <div className="relative flex flex-col items-center justify-end" style={{ margin: 0, padding: 0 }}>
                {/* each.png contains the entire component: neon frame + pedestal */}
                <div className="relative" style={{ width: '178px', height: 'auto', margin: 0, padding: 0, flexShrink: 0 }}>
                  {/* Background image with frame and pedestal - this is the outer layout */}
                  <img 
                    src="/each.png" 
                    alt={`Panel ${panelNum}`}
                    className="w-full h-auto"
                    style={{
                      filter: 'drop-shadow(0 0 25px rgba(139, 92, 246, 0.8))',
                      pointerEvents: 'none',
                      display: 'block',
                      margin: 0,
                      padding: 0,
                      verticalAlign: 'bottom',
                      objectFit: 'contain',
                      width: '100%',
                      height: 'auto',
                      lineHeight: 0,
                      fontSize: 0
                    }}
                  />
                  
                  {/* Scrolling numbers using num.png - positioned inside the neon frame area */}
                  <div 
                    ref={el => panelRefs.current[panelIndex] = el}
                    className="absolute overflow-hidden"
                    style={{
                      // Positioned to match the frame opening in each.png
                      // Frame is in upper portion, numbers should be large and prominent
                      // Positioned at bottom of frame area to eliminate gap with pedestal
                      bottom: '25%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '50%',
                      height: '48%',
                      zIndex: 5
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full transition-transform duration-100"
                      style={{
                        transform: `translateY(-${scrollPositions[panelIndex]}px)`,
                        transition: isSpinning ? 'none' : 'transform 0.1s ease-out'
                      }}
                    >
                      {/* Multiple copies of num.png for seamless scrolling */}
                      {Array.from({ length: 20 }).map((_, setIndex) => (
                        <img
                          key={setIndex}
                          src="/num.png"
                          alt="Numbers"
                          className="w-full h-auto block"
                          style={{
                            display: 'block',
                            width: '100%',
                            minWidth: '100%',
                            margin: 0,
                            padding: 0,
                            height: 'auto',
                            lineHeight: 0,
                            fontSize: 0,
                            filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 1)) drop-shadow(0 0 40px rgba(96, 165, 250, 0.8)) drop-shadow(0 0 60px rgba(96, 165, 250, 0.5)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) brightness(1.1) contrast(1.1)',
                            WebkitFilter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 1)) drop-shadow(0 0 40px rgba(96, 165, 250, 0.8)) drop-shadow(0 0 60px rgba(96, 165, 250, 0.5)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) brightness(1.1) contrast(1.1)'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SPIN Button Container - positioned above base */}
        <div className="relative z-20 flex items-center justify-center" style={{ marginTop: '0' }}>
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`relative transition-all duration-300 transform ${
              isSpinning
                ? 'cursor-not-allowed opacity-50'
                : 'hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0
            }}
          >
            <img 
              src="/spin.png" 
              alt="SPIN"
              className="max-w-xs md:max-w-sm h-auto"
              style={{
                filter: isSpinning ? 'grayscale(50%) brightness(0.7)' : 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))',
                pointerEvents: 'none'
              }}
            />
            {isSpinning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-yellow-400 text-xl md:text-2xl font-bold" style={{
                  textShadow: '0 0 10px rgba(250, 204, 21, 0.8)'
                }}>
                  SPINNING...
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Reset Button */}
        {!isSpinning && (showPrize || scrollPositions.some(pos => pos > 0)) && (
          <div className="relative z-20 mt-6">
            <button
              onClick={reset}
              className="px-8 py-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors border border-cyan-500/50 rounded-lg"
            >
              Reset
            </button>
          </div>
        )}

        {/* Bottom Base Frame - using base.png image */}
        <div className="absolute bottom-0 left-0 right-0 w-full" style={{ margin: 0, padding: 0 }}>
          <img 
            src="/base.png" 
            alt="Base Frame"
            className="w-full h-auto object-cover"
            style={{
              maxHeight: '200px',
              objectPosition: 'bottom',
              display: 'block',
              margin: 0,
              padding: 0,
              verticalAlign: 'bottom'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App

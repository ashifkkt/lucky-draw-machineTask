import { useState } from 'react'

function AnimatedBackground() {
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

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
  )
}

export default AnimatedBackground

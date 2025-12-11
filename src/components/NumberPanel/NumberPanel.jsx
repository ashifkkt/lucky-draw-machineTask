function NumberPanel({ panelIndex, scrollPosition, isSpinning, panelRef }) {
  return (
    <div className="flex flex-col items-center justify-end" style={{ margin: 0, padding: 0 }}>
      <div className="relative flex flex-col items-center justify-end" style={{ margin: 0, padding: 0 }}>
        <div className="relative" style={{ width: '178px', height: 'auto', margin: 0, padding: 0, flexShrink: 0 }}>
          <img 
            src="/each.png" 
            alt={`Panel ${panelIndex + 1}`}
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
          
          <div 
            ref={panelRef}
            className="absolute overflow-hidden"
            style={{
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
                transform: `translateY(-${scrollPosition}px)`,
                transition: isSpinning ? 'none' : 'transform 0.1s ease-out'
              }}
            >
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
  )
}

export default NumberPanel

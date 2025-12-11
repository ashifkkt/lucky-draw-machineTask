function PrizeMessage({ showPrize }) {
  if (!showPrize) return null

  return (
    <div className="text-center animate-fade-in relative z-20" style={{ marginTop: '10px', marginBottom: '10px' }}>
      <div className="inline-block">
        <h2 
          className="mb-4 animate-color-switch"
          style={{
            fontFamily: 'AspireSCBlackOblique-Regular, sans-serif',
            fontWeight: 900,
            fontStyle: 'oblique',
            fontSize: '80px',
            lineHeight: '100%',
            letterSpacing: '7%',
            textShadow: '0 0 20px rgba(139, 92, 246, 0.9), 0 0 40px rgba(139, 92, 246, 0.7), 0 0 60px rgba(139, 92, 246, 0.5), 0 0 80px rgba(96, 165, 250, 0.4), 2px 2px 0px rgba(0, 0, 0, 0.3)'
          }}
        >
          1ST PRIZE
        </h2>
      </div>
    </div>
  )
}

export default PrizeMessage

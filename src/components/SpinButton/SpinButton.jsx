function SpinButton({ onSpin, isSpinning }) {
  return (
    <div className="relative z-20 flex items-center justify-center" style={{ marginTop: '0' }}>
      <button
        onClick={onSpin}
        disabled={isSpinning}
        className={`relative transition-all duration-300 transform ${
          isSpinning
            ? 'cursor-not-allowed'
            : 'hover:scale-105 active:scale-95 cursor-pointer'
        }`}
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0
        }}
      >
        {!isSpinning && (
          <img 
            src="/spin.png" 
            alt="SPIN"
            className="max-w-xs md:max-w-sm h-auto"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))',
              pointerEvents: 'none'
            }}
          />
        )}
        {isSpinning && (
          <div className="flex items-center justify-center" style={{
            minWidth: '200px',
            minHeight: '80px'
          }}>
            <span className="text-yellow-400 text-2xl md:text-3xl font-bold" style={{
              textShadow: '0 0 10px rgba(250, 204, 21, 0.8), 0 0 20px rgba(250, 204, 21, 0.6)'
            }}>
              SPINNING...
            </span>
          </div>
        )}
      </button>
    </div>
  )
}

export default SpinButton

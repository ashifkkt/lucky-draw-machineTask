function ResetButton({ onReset, isSpinning, showPrize, hasScrolled }) {
  if (isSpinning || (!showPrize && !hasScrolled)) return null

  return (
    <div className="relative z-20 mt-6">
      <button
        onClick={onReset}
        className="px-8 py-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors border border-cyan-500/50 rounded-lg"
      >
        Reset
      </button>
    </div>
  )
}

export default ResetButton

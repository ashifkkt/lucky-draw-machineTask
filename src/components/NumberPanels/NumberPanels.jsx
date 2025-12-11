import NumberPanel from '../NumberPanel'

function NumberPanels({ numbers, scrollPositions, isSpinning, panelRefs, showPrize }) {
  return (
    <div className="flex gap-3 md:gap-4 relative z-10 justify-center items-end" style={{ width: '100%', maxWidth: '1200px', marginTop: showPrize ? '0' : 'auto', marginBottom: '80px' }}>
      {numbers.map((panelNum, panelIndex) => (
        <NumberPanel
          key={panelIndex}
          panelIndex={panelIndex}
          scrollPosition={scrollPositions[panelIndex]}
          isSpinning={isSpinning}
          panelRef={el => panelRefs.current[panelIndex] = el}
        />
      ))}
    </div>
  )
}

export default NumberPanels

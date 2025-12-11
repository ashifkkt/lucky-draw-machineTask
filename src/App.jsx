import { useSpinWheel } from './hooks/useSpinWheel'
import AnimatedBackground from './components/AnimatedBackground'
import CongratsSection from './components/CongratsSection'
import PrizeMessage from './components/PrizeMessage'
import NumberPanels from './components/NumberPanels'
import SpinButton from './components/SpinButton'
import ResetButton from './components/ResetButton'
import BaseFrame from './components/BaseFrame'

function App() {
  const {
    isSpinning,
    showPrize,
    scrollPositions,
    numbers,
    panelRefs,
    spin,
    reset
  } = useSpinWheel()

  const hasScrolled = scrollPositions.some(pos => pos > 0)

  return (
    <div className="h-screen bg-gradient-to-b from-purple-950 via-black to-purple-950 relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 h-screen flex flex-col items-center p-8 overflow-hidden" style={{ paddingBottom: 0 }}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent blur-sm"></div>
        
        <CongratsSection showPrize={showPrize} />
        <PrizeMessage showPrize={showPrize} />

        <NumberPanels
          numbers={numbers}
          scrollPositions={scrollPositions}
          isSpinning={isSpinning}
          panelRefs={panelRefs}
          showPrize={showPrize}
        />

        <SpinButton onSpin={spin} isSpinning={isSpinning} />

        <ResetButton
          onReset={reset}
          isSpinning={isSpinning}
          showPrize={showPrize}
          hasScrolled={hasScrolled}
        />

        <BaseFrame />
      </div>
    </div>
  )
}

export default App

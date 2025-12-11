import { useState, useRef, useEffect } from 'react'

export function useSpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [showPrize, setShowPrize] = useState(false)
  const [scrollPositions, setScrollPositions] = useState([0, 0, 0, 0, 0, 0])
  const [numberHeight, setNumberHeight] = useState(null)
  const [visibleAreaHeight, setVisibleAreaHeight] = useState(null)
  const panelRefs = useRef([])

  // Numbers 1-6 for each panel
  const numbers = [1, 2, 3, 4, 5, 6]

  // Measure actual dimensions for accurate centering
  useEffect(() => {
    const measureDimensions = () => {
      const scrollContainer = panelRefs.current[0]
      if (scrollContainer) {
        const containerHeight = scrollContainer.offsetHeight
        setVisibleAreaHeight(containerHeight)
        
        // Try to get the actual rendered height of num.png
        const numImage = scrollContainer.querySelector('img')
        if (numImage && numImage.complete && numImage.naturalHeight) {
          // Calculate the actual rendered height
          const renderedImageHeight = numImage.offsetHeight || (numImage.naturalHeight * (numImage.offsetWidth / numImage.naturalWidth))
          const calculatedNumberHeight = renderedImageHeight / 10
          setNumberHeight(calculatedNumberHeight)
        } else if (numImage) {
          // Wait for image to load
          numImage.onload = () => {
            const renderedImageHeight = numImage.offsetHeight || (numImage.naturalHeight * (numImage.offsetWidth / numImage.naturalWidth))
            const calculatedNumberHeight = renderedImageHeight / 10
            setNumberHeight(calculatedNumberHeight)
          }
        }
      }
    }

    // Measure on mount and when window resizes
    measureDimensions()
    window.addEventListener('resize', measureDimensions)
    return () => window.removeEventListener('resize', measureDimensions)
  }, [])

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
    // Use measured dimensions if available, otherwise fall back to estimates
    const panelHeight = 178 // Height of each panel in pixels
    const actualVisibleHeight = visibleAreaHeight || (panelHeight * 0.48) // Use measured or fallback
    const actualNumberHeight = numberHeight || (actualVisibleHeight / 1.3) // Use measured or fallback
    
    // Normalize starting positions to nearest number boundary for clean alignment
    const normalizedStartPositions = startPositions.map(pos => {
      // Round to nearest multiple of actualNumberHeight
      return Math.round(pos / actualNumberHeight) * actualNumberHeight
    })
    
    // Calculate base scroll to center the target number in the visible area
    // Position the number so it's vertically centered
    const numberTopPosition = (targetNumber - 1) * actualNumberHeight
    const centerOffset = (actualVisibleHeight / 2) - (actualNumberHeight / 2)
    const baseScroll = numberTopPosition + centerOffset
    
    // Add multiple full rotations for effect (same for all panels)
    const rotations = 6 + Math.random() * 2 // 6-8 full rotations
    const fullRotation = 10 * actualNumberHeight // Full rotation through all 10 numbers (0-9)
    
    // Final position must align to show the target number
    const finalTargetPosition = baseScroll + (rotations * fullRotation)
    
    // Ensure it's a perfect multiple for alignment
    const alignedFinalPosition = Math.round(finalTargetPosition / actualNumberHeight) * actualNumberHeight

    // Add slight stagger delays for visual effect (but all end at same position)
    const staggerDelays = [0, 30, 60, 90, 120, 150] // milliseconds

    const animate = () => {
      const elapsed = Date.now() - startTime

      // Calculate positions for each panel with stagger
      const newPositions = normalizedStartPositions.map((startPos, index) => {
        const adjustedElapsed = Math.max(0, elapsed - staggerDelays[index])
        const progress = Math.min(adjustedElapsed / duration, 1)

        // Easing function for smooth slowdown - stronger ease-out for lottery effect
        // Uses ease-out quintic for more pronounced slowdown at the end
        const easeOutQuintic = 1 - Math.pow(1 - progress, 5)

        // All panels end at the same final position
        return startPos + (alignedFinalPosition - startPos) * easeOutQuintic
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

  return {
    isSpinning,
    showPrize,
    scrollPositions,
    numbers,
    panelRefs,
    spin,
    reset
  }
}

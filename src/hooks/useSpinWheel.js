import { useState, useRef, useEffect } from 'react'

export function useSpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [showPrize, setShowPrize] = useState(false)
  const [scrollPositions, setScrollPositions] = useState([0, 0, 0, 0, 0, 0])
  const [numberHeight, setNumberHeight] = useState(null)
  const [visibleAreaHeight, setVisibleAreaHeight] = useState(null)
  const panelRefs = useRef([])

  const numbers = [1, 2, 3, 4, 5, 6]

  useEffect(() => {
    const measureDimensions = () => {
      const scrollContainer = panelRefs.current[0]
      if (scrollContainer) {
        const containerHeight = scrollContainer.offsetHeight
        setVisibleAreaHeight(containerHeight)
        
        const numImage = scrollContainer.querySelector('img')
        if (numImage && numImage.complete && numImage.naturalHeight) {
          const renderedImageHeight = numImage.offsetHeight || (numImage.naturalHeight * (numImage.offsetWidth / numImage.naturalWidth))
          const calculatedNumberHeight = renderedImageHeight / 10
          setNumberHeight(calculatedNumberHeight)
        } else if (numImage) {
          numImage.onload = () => {
            const renderedImageHeight = numImage.offsetHeight || (numImage.naturalHeight * (numImage.offsetWidth / numImage.naturalWidth))
            const calculatedNumberHeight = renderedImageHeight / 10
            setNumberHeight(calculatedNumberHeight)
          }
        }
      }
    }

    measureDimensions()
    window.addEventListener('resize', measureDimensions)
    return () => window.removeEventListener('resize', measureDimensions)
  }, [])

  const spin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setShowPrize(false)

    const targetNumber = Math.floor(Math.random() * 6) + 1
    const startPositions = [...scrollPositions]
    const duration = 3500
    const startTime = Date.now()
    
    const panelHeight = 178
    const actualVisibleHeight = visibleAreaHeight || (panelHeight * 0.48)
    const actualNumberHeight = numberHeight || (actualVisibleHeight / 1.3)
    
    const normalizedStartPositions = startPositions.map(pos => {
      return Math.round(pos / actualNumberHeight) * actualNumberHeight
    })
    
    const numberTopPosition = (targetNumber - 1) * actualNumberHeight
    const centerOffset = (actualVisibleHeight / 2) - (actualNumberHeight / 2)
    const baseScroll = numberTopPosition + centerOffset
    
    const rotations = 6 + Math.random() * 2
    const fullRotation = 10 * actualNumberHeight
    
    const finalTargetPosition = baseScroll + (rotations * fullRotation)
    const alignedFinalPosition = Math.round(finalTargetPosition / actualNumberHeight) * actualNumberHeight

    const staggerDelays = [0, 30, 60, 90, 120, 150]

    const animate = () => {
      const elapsed = Date.now() - startTime

      const newPositions = normalizedStartPositions.map((startPos, index) => {
        const adjustedElapsed = Math.max(0, elapsed - staggerDelays[index])
        const progress = Math.min(adjustedElapsed / duration, 1)
        const easeOutQuintic = 1 - Math.pow(1 - progress, 5)

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
        setScrollPositions([alignedFinalPosition, alignedFinalPosition, alignedFinalPosition, alignedFinalPosition, alignedFinalPosition, alignedFinalPosition])
        setIsSpinning(false)

        setTimeout(() => {
          setShowPrize(true)
        }, 500)
      }
    }

    requestAnimationFrame(animate)
  }

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

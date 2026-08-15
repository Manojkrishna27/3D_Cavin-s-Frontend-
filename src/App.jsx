import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import HeroSequence from './components/HeroSequence'
import ProductExperience from './components/ProductExperience'
import ChocolateSection from './components/ChocolateSection'
import CreamySection from './components/CreamySection'
import FlavourCollection from './components/FlavourCollection'
import BrandStory from './components/BrandStory'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

gsap.registerPlugin(ScrollTrigger)

// Number of frames to preload before showing site (keep small for speed)
const PRELOAD_COUNT = 12
const TOTAL_FRAMES = 200

export default function App() {
  const [siteLoaded, setSiteLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const lenisRef = useRef(null)

  useEffect(() => {
    let loadedCount = 0

    const onFrameLoad = () => {
      loadedCount++
      setLoadProgress(Math.round((loadedCount / PRELOAD_COUNT) * 100))
      if (loadedCount >= PRELOAD_COUNT) {
        // Slight delay for smooth transition
        setTimeout(() => setSiteLoaded(true), 500)
      }
    }

    // Preload the first PRELOAD_COUNT frames critically
    for (let i = 1; i <= PRELOAD_COUNT; i++) {
      const img = new Image()
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
      img.onload = onFrameLoad
      img.onerror = onFrameLoad // count errors too so we don't hang
    }

    // Eagerly kick off background loading of remaining frames
    // (browser will cache these for the HeroSequence component)
    const lazyLoad = () => {
      for (let i = PRELOAD_COUNT + 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image()
        img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
        img.decoding = 'async'
      }
    }
    // Defer lazy loading until after first paint
    if ('requestIdleCallback' in window) {
      requestIdleCallback(lazyLoad, { timeout: 3000 })
    } else {
      setTimeout(lazyLoad, 1000)
    }
  }, [])

  // Initialize Lenis smooth scroll (for all sections below the hero)
  useEffect(() => {
    if (!siteLoaded) return

    const timer = setTimeout(() => {
      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        infinite: false,
        syncTouch: true,
      })

      lenisRef.current = lenis

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timer)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [siteLoaded])

  return (
    <>
      {!siteLoaded && <LoadingScreen progress={loadProgress} />}
      {siteLoaded && (
        <>
          <div className="grain-overlay" aria-hidden="true" />
          <Navigation />
          <main id="main-content">
            <HeroSequence />
            <ProductExperience />
            <ChocolateSection />
            <CreamySection />
            <FlavourCollection />
            <BrandStory />
            <FinalCTA />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

import { useEffect, useRef, useCallback } from 'react'
import './HeroSequence.css'

const TOTAL_FRAMES = 200
const FRAME_PREFIX = '/frames/ezgif-frame-'
// Total scrollable height for hero animation (keeps canvas sticky while scrolling)
const SCROLL_HEIGHT_VH = 600

function padFrame(n) {
  return String(n).padStart(3, '0')
}

export default function HeroSequence() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  // Raw float frame index driven by scroll
  const targetFrameRef = useRef(0)
  // Smoothed float frame index for lerp
  const currentFrameRef = useRef(0)
  const rafRef = useRef(null)
  const ctxRef = useRef(null)
  const isRafRunningRef = useRef(false)

  // Overlay DOM refs (avoid React state for perf)
  const headlineGroupRef = useRef(null)
  const subGroupRef = useRef(null)
  const ctaGroupRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const frameCounterRef = useRef(null)
  const progressBarRef = useRef(null)
  const scrollArrowRef = useRef(null)

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // ─── Draw a single frame to canvas ────────────────────────────────────────
  const drawFrame = useCallback((index) => {
    const img = imagesRef.current[index]
    if (!img || !img.complete || !ctxRef.current || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    const dpr = canvas._dpr || window.devicePixelRatio || 1
    // Logical CSS-pixel dimensions — ctx is already scaled by DPR so we
    // must work in logical coords to avoid double-scaling.
    const cw = canvas.width  / dpr
    const ch = canvas.height / dpr
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    if (!iw || !ih) return
    // Object-fit: cover — fill viewport, centre image
    const scale = Math.max(cw / iw, ch / ih)
    const sw = iw * scale
    const sh = ih * scale
    const sx = (cw - sw) / 2
    const sy = (ch - sh) / 2
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, sx, sy, sw, sh)
  }, [])

  // ─── rAF loop: lerp toward target frame ───────────────────────────────────
  const renderLoop = useCallback(() => {
    const target = targetFrameRef.current
    const current = currentFrameRef.current
    const diff = target - current

    if (Math.abs(diff) < 0.15) {
      currentFrameRef.current = target
      drawFrame(Math.round(target))
      isRafRunningRef.current = false
      return
    }

    // Smooth lerp — feels natural on fast or slow scrolling
    currentFrameRef.current += diff * 0.14
    drawFrame(Math.round(currentFrameRef.current))
    rafRef.current = requestAnimationFrame(renderLoop)
  }, [drawFrame])

  // ─── Kick off the rAF loop (idempotent) ───────────────────────────────────
  const scheduleRender = useCallback(() => {
    if (isRafRunningRef.current) return
    isRafRunningRef.current = true
    rafRef.current = requestAnimationFrame(renderLoop)
  }, [renderLoop])

  // ─── Resize canvas to fill viewport (DPR-aware) ──────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const w   = window.innerWidth
    const h   = window.innerHeight

    // Set the canvas *buffer* size at full physical pixel resolution
    canvas.width  = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)

    // Keep the CSS display size at logical (CSS) pixels
    canvas.style.width  = `${w}px`
    canvas.style.height = `${h}px`

    // Get a fresh context and scale all drawing by DPR
    const ctx = canvas.getContext('2d', { alpha: false })
    ctx.scale(dpr, dpr)
    ctxRef.current = ctx

    // Store DPR so drawFrame can use logical dimensions
    canvas._dpr = dpr

    drawFrame(Math.round(currentFrameRef.current))
  }, [drawFrame])

  // ─── Update overlay elements based on scroll progress ─────────────────────
  const updateOverlay = useCallback((progress) => {
    const frameNum = Math.round(progress * (TOTAL_FRAMES - 1)) + 1 // 1–200

    // ── Frame counter text
    if (frameCounterRef.current) {
      frameCounterRef.current.textContent =
        `${String(frameNum).padStart(3, '0')} / ${TOTAL_FRAMES}`
    }

    // ── Progress bar
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress})`
    }

    // ── Swap scroll arrow → frame counter at 1% scroll
    const showingProgress = progress > 0.01
    if (scrollArrowRef.current) {
      scrollArrowRef.current.style.opacity = showingProgress ? '0' : '1'
      scrollArrowRef.current.style.pointerEvents = showingProgress ? 'none' : 'auto'
    }
    if (frameCounterRef.current) {
      const counterOpacity =
        showingProgress && progress < 0.97
          ? Math.min(1, (progress - 0.01) * 20)
          : progress >= 0.97
          ? 1 - (progress - 0.97) / 0.03
          : 0
      frameCounterRef.current.style.opacity = counterOpacity
    }

    // ── Fade hero text in first 8% of scroll
    const textProgress = Math.min(1, progress / 0.08)
    const textOpacity = 1 - textProgress

    if (headlineGroupRef.current) {
      headlineGroupRef.current.style.opacity = textOpacity
      headlineGroupRef.current.style.transform = `translateY(${textProgress * -40}px)`
    }
    if (subGroupRef.current) {
      subGroupRef.current.style.opacity = Math.max(0, 1 - textProgress * 1.5)
    }
    if (ctaGroupRef.current) {
      ctaGroupRef.current.style.opacity = Math.max(0, 1 - textProgress * 2)
    }
  }, [])

  // ─── Main scroll handler ───────────────────────────────────────────────────
  const onScroll = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    const sectionH = section.offsetHeight
    // progress 0 → 1 as section scrolls from top to bottom of viewport
    const scrolled = -rect.top
    const progress = Math.max(0, Math.min(1, scrolled / (sectionH - window.innerHeight)))

    targetFrameRef.current = progress * (TOTAL_FRAMES - 1)
    updateOverlay(progress)
    scheduleRender()
  }, [scheduleRender, updateOverlay])

  // ─── Entrance animations using CSS class toggling ─────────────────────────
  const playEntranceAnims = useCallback(() => {
    const els = [
      headlineGroupRef.current,
      subGroupRef.current,
      ctaGroupRef.current,
      scrollIndicatorRef.current,
    ]
    els.forEach((el, i) => {
      if (!el) return
      el.style.transition = 'none'
      el.style.opacity = '0'
      el.style.transform = 'translateY(40px)'
      // Stagger using setTimeout
      setTimeout(() => {
        el.style.transition = `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.18}s,
                                transform 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.18}s`
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 200 + i * 80)
    })
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    // ── Load all 200 frames (decoding: async for perf)
    const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image()
      img.src = `${FRAME_PREFIX}${padFrame(i + 1)}.jpg`
      img.decoding = 'async'
      return img
    })
    imagesRef.current = images

    // ── Setup canvas
    resizeCanvas()
    const resizeObs = new ResizeObserver(resizeCanvas)
    if (canvasRef.current) resizeObs.observe(document.body)

    // ── Draw frame 0 as soon as it loads
    if (images[0].complete) {
      drawFrame(0)
      playEntranceAnims()
    } else {
      images[0].onload = () => {
        drawFrame(0)
        playEntranceAnims()
      }
    }

    // ── Scroll listener (passive for performance)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // run once to set initial state

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
      resizeObs.disconnect()
      isRafRunningRef.current = false
    }
  }, [prefersReducedMotion, resizeCanvas, drawFrame, onScroll, playEntranceAnims])

  const handleCTAClick = (e) => {
    e.preventDefault()
    const el = document.querySelector('#products')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // ─── Reduced-motion static fallback ───────────────────────────────────────
  if (prefersReducedMotion) {
    return (
      <section id="hero" className="hero hero--static" aria-label="Cavin's hero">
        <div
          className="hero__bg-static"
          style={{ backgroundImage: `url(/frames/ezgif-frame-100.jpg)` }}
          aria-hidden="true"
        />
        <div className="hero__vignette" aria-hidden="true" />
        <div className="hero__overlay hero__overlay--static">
          <div className="hero__content">
            <div className="hero__headline-group">
              <p className="label-sm text-gold hero__eyebrow">Cavin&apos;s · Since 1825</p>
              <h1 className="display-xl text-cream hero__headline">
                Delicious.<br />Thick.<br />Creamy.
              </h1>
            </div>
            <p className="body-lg hero__sub">
              A rich chocolate experience made for every moment.
            </p>
            <a href="#products" className="btn-primary hero__cta" onClick={handleCTAClick}>
              <span>Explore the Flavour</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ─── Full animated hero ────────────────────────────────────────────────────
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero"
      aria-label="Cavin's Chocolate Milkshake — cinematic hero"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      {/* ── Sticky full-screen canvas ── */}
      <div className="hero__sticky" aria-hidden="true">
        <canvas
          ref={canvasRef}
          className="hero__canvas"
          aria-hidden="true"
        />
        <div className="hero__vignette" aria-hidden="true" />
      </div>

      {/* ── Sticky overlay (text + UI) ── */}
      <div className="hero__overlay">

        {/* Eyebrow + Headline */}
        <div className="hero__content">
          <div className="hero__headline-group" ref={headlineGroupRef}>
            <p className="label-sm text-gold hero__eyebrow">Cavin&apos;s · Since 1825</p>
            <h1 className="display-xl text-cream hero__headline">
              Delicious.<br />Thick.<br />Creamy.
            </h1>
          </div>

          {/* Sub + CTA */}
          <div className="hero__sub-group" ref={subGroupRef}>
            <p className="body-lg hero__sub">
              A rich chocolate experience made<br />for every moment.
            </p>
          </div>

          <div ref={ctaGroupRef}>
            <a
              href="#products"
              className="btn-primary hero__cta"
              onClick={handleCTAClick}
              id="hero-cta"
            >
              <span>Explore the Flavour</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>

        {/* ── Scroll indicator (bottom-right) ── */}
        <div
          ref={scrollIndicatorRef}
          className="hero__scroll-indicator"
          aria-label="Scroll to explore"
        >
          {/* Arrow shown at start */}
          <div ref={scrollArrowRef} className="hero__scroll-arrow-wrap">
            <span className="hero__scroll-text label-sm">Scroll to Experience</span>
            <span className="hero__scroll-line" aria-hidden="true" />
          </div>

          {/* Frame counter shown while scrolling */}
          <span
            ref={frameCounterRef}
            className="hero__frame-counter label-sm"
            aria-live="polite"
            aria-label="Animation frame progress"
          >
            001 / 200
          </span>
        </div>

        {/* ── Progress bar (bottom of viewport) ── */}
        <div className="hero__progress-track" aria-hidden="true">
          <div ref={progressBarRef} className="hero__progress-fill" />
        </div>

      </div>
    </section>
  )
}

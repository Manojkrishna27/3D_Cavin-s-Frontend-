import { useEffect, useRef } from 'react'

export default function LoadingScreen({ progress }) {
  const logoRef = useRef(null)
  const barRef = useRef(null)

  // Animate logo in
  useEffect(() => {
    const logo = logoRef.current
    if (!logo) return
    logo.style.opacity = '0'
    logo.style.transform = 'translateY(20px)'
    requestAnimationFrame(() => {
      logo.style.transition = 'opacity 1s ease, transform 1s ease'
      logo.style.opacity = '1'
      logo.style.transform = 'translateY(0)'
    })
  }, [])

  return (
    <div
      className="loading-screen"
      role="status"
      aria-label="Loading Cavin's chocolate experience"
    >
      {/* Animated background grain */}
      <div className="loading-screen__grain" aria-hidden="true" />

      {/* Logo */}
      <div ref={logoRef} className="loading-logo">
        Cavin&apos;s
      </div>

      {/* Progress */}
      <div className="loading-progress-wrap">
        <div
          ref={barRef}
          className="loading-bar-container"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Loading: ${progress}%`}
        >
          <div
            className="loading-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loading-labels">
          <span className="loading-text">
            {progress < 100 ? 'Loading Experience...' : 'Ready'}
          </span>
          <span className="loading-text loading-pct">
            {progress}%
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p className="label-sm text-muted loading-since">
        Cavin&apos;s Chocolate Milkshake · Since 1825
      </p>
    </div>
  )
}

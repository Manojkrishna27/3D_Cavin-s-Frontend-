import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FinalCTA.css'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background subtle slow zoom
      gsap.to(bgRef.current, {
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3,
        },
      })

      // Product image cinematic rise
      gsap.fromTo(
        imageRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Product floating animation
      gsap.to(imageRef.current, {
        y: -16,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      })

      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      )

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          delay: 0.5,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section final-cta"
      aria-label="Explore the Collection"
    >
      {/* Background */}
      <div className="final-cta__bg" aria-hidden="true">
        <div ref={bgRef} className="final-cta__bg-inner">
          <img
            src="/frames/ezgif-frame-001.jpg"
            alt=""
            className="final-cta__bg-img"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
        <div className="final-cta__bg-overlay" />
      </div>

      <div className="final-cta__inner">
        <div className="final-cta__content">
          <span className="label-sm text-gold final-cta__eyebrow">The Experience Awaits</span>

          <div className="clip-hidden">
            <h2 ref={headlineRef} className="display-xl final-cta__headline">
              Ready for Something<br />Delicious?
            </h2>
          </div>

          <p className="body-lg final-cta__sub">
            One sip is all it takes.
          </p>

          <div ref={ctaRef} className="final-cta__actions">
            <a
              href="#flavours"
              className="btn-gold final-cta__cta"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#flavours')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>Explore the Collection</span>
              <span className="btn-arrow">→</span>
            </a>
            <a
              href="#story"
              className="btn-primary final-cta__cta-secondary"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>Our Story</span>
            </a>
          </div>
        </div>

        {/* Floating product */}
        <div className="final-cta__product" ref={imageRef} aria-hidden="true">
          <img
            src="/frames/ezgif-frame-200.jpg"
            alt="Cavin's Chocolate Milkshake — the complete product"
            className="final-cta__product-img"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

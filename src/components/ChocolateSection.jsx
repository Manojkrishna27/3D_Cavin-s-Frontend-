import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ChocolateSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function ChocolateSection() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const img1Ref = useRef(null)
  const img2Ref = useRef(null)
  const img3Ref = useRef(null)
  const textBlockRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Large background image parallax
      gsap.to(img1Ref.current, {
        y: -100,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

      // Second image reveals from bottom
      gsap.fromTo(
        img2Ref.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Third image floating
      gsap.fromTo(
        img3Ref.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      )

      // Floating animation on img3
      gsap.to(img3Ref.current, {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Headline mask reveal
      gsap.fromTo(
        headlineRef.current,
        { clipPath: 'inset(100% 0 0 0)', y: 40 },
        {
          clipPath: 'inset(0% 0 0 0)',
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        textBlockRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 45%',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="chocolate"
      ref={sectionRef}
      className="section chocolate-section"
      aria-label="Chocolate Experience"
    >
      {/* Background image full width */}
      <div className="chocolate-section__bg" aria-hidden="true">
        <div ref={img1Ref} className="chocolate-section__bg-img-wrap">
          <img
            src="/frames/ezgif-frame-150.jpg"
            alt=""
            className="chocolate-section__bg-img"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
        <div className="chocolate-section__bg-overlay" />
      </div>

      <div className="chocolate-section__inner">
        <div className="chocolate-section__content">
          <span className="label-sm text-gold chocolate-section__eyebrow">The Chocolate</span>
          <div className="chocolate-section__headline-clip">
            <h2 ref={headlineRef} className="display-lg chocolate-section__headline">
              Chocolate,<br />Unapologetically<br />Rich.
            </h2>
          </div>
          <div ref={textBlockRef} className="chocolate-section__text-block">
            <p className="body-lg chocolate-section__copy">
              Deep, dark cocoa. A velvety richness that lingers on the palate.
              Cavin&apos;s Chocolate Milkshake doesn&apos;t compromise — it delivers
              an unapologetically indulgent chocolate experience in every sip.
            </p>
            <span className="divider" />
            <p className="label-sm text-muted">100% Natural Cocoa · Since 1825</p>
          </div>
        </div>

        <div className="chocolate-section__visuals" aria-hidden="true">
          <div className="chocolate-section__img-secondary-wrap" ref={img2Ref}>
            <img
              src="/frames/ezgif-frame-170.jpg"
              alt="Cavin's Chocolate Milkshake with rich chocolate splash"
              className="chocolate-section__img-secondary"
              loading="lazy"
            />
          </div>
          <div className="chocolate-section__img-float-wrap" ref={img3Ref}>
            <img
              src="/frames/ezgif-frame-130.jpg"
              alt="Cavin's Chocolate Milkshake product detail"
              className="chocolate-section__img-float"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

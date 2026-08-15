import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CreamySection.css'

gsap.registerPlugin(ScrollTrigger)

export default function CreamySection() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal line grows in
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Headline reveal from bottom
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
          delay: 0.1,
        }
      )

      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
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
          delay: 0.3,
        }
      )

      // Image reveal with mask
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(0 0 100% 0)', y: 30 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 1.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Subtle parallax on image
      gsap.to(imgRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section creamy-section"
      aria-label="Creamy Experience"
    >
      <div className="creamy-section__inner">
        {/* Full-width image on the left */}
        <div className="creamy-section__image-col">
          <div className="creamy-section__image-wrap">
            <img
              ref={imgRef}
              src="/frames/ezgif-frame-080.jpg"
              alt="Cavin's Chocolate Milkshake — creamy texture and rich milk"
              className="creamy-section__image"
              loading="lazy"
            />
            <div className="creamy-section__image-gradient" aria-hidden="true" />
          </div>
        </div>

        {/* Right text column */}
        <div className="creamy-section__text-col">
          <div ref={lineRef} className="creamy-section__line" aria-hidden="true" />
          <span className="label-sm text-gold creamy-section__eyebrow">The Texture</span>

          <div className="clip-hidden">
            <h2 ref={headlineRef} className="display-lg creamy-section__headline">
              Thick.<br />Creamy.<br />Irresistible.
            </h2>
          </div>

          <div ref={textRef} className="creamy-section__text-block">
            <p className="body-lg creamy-section__copy">
              Every carton is made from real milk, blended with rich chocolate
              for a texture that&apos;s gloriously thick — coating every sip with
              creaminess that stays with you.
            </p>

            <div className="creamy-section__attributes">
              {[
                { icon: '✦', text: 'Real Milk Blend' },
                { icon: '✦', text: 'Velvety Smooth' },
                { icon: '✦', text: 'Naturally Rich' },
              ].map((attr, i) => (
                <div key={i} className="creamy-section__attribute">
                  <span className="creamy-section__attribute-icon">{attr.icon}</span>
                  <span className="label-sm text-muted">{attr.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

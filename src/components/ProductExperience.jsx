import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProductExperience.css'

gsap.registerPlugin(ScrollTrigger)

export default function ProductExperience() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const copyRef = useRef(null)
  const imageRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline word-by-word reveal
      gsap.fromTo(
        headlineRef.current,
        { y: 80, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        copyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      )

      gsap.fromTo(
        imageRef.current,
        { scale: 1.12, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Parallax on image
      gsap.to(imageRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.fromTo(
        labelRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section product-experience"
      aria-label="Product Experience"
    >
      <div className="product-experience__inner">
        <div className="product-experience__text-col">
          <span ref={labelRef} className="label-sm text-gold product-experience__label">
            The Experience
          </span>
          <div className="product-experience__headline-wrap clip-hidden">
            <h2 ref={headlineRef} className="display-lg product-experience__headline">
              More Than<br />a Milkshake.
            </h2>
          </div>
          <p ref={copyRef} className="body-lg product-experience__copy">
            Rich chocolate. Creamy texture.<br />An indulgent taste made for moments<br />worth slowing down for.
          </p>
          <div className="product-experience__stats">
            {[
              { num: '1825', label: 'Est.' },
              { num: '200ml', label: 'Pure Indulgence' },
              { num: '100%', label: 'Natural Cocoa' },
            ].map((s, i) => (
              <div key={i} className="product-experience__stat">
                <span className="product-experience__stat-num">{s.num}</span>
                <span className="label-sm text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="product-experience__image-col">
          <div className="product-experience__image-wrap" ref={imageRef}>
            <img
              src="/frames/ezgif-frame-100.jpg"
              alt="Cavin's Chocolate Milkshake product — elegant presentation on chocolate surface"
              className="product-experience__image"
              loading="lazy"
            />
            <div className="product-experience__image-overlay" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}

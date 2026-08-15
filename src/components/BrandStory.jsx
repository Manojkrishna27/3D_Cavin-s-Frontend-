import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './BrandStory.css'

gsap.registerPlugin(ScrollTrigger)

export default function BrandStory() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const quoteRef = useRef(null)
  const textRef = useRef(null)
  const img1Ref = useRef(null)
  const img2Ref = useRef(null)
  const yearRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        yearRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

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
        quoteRef.current,
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
          delay: 0.35,
        }
      )

      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
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
          delay: 0.45,
        }
      )

      gsap.fromTo(
        img1Ref.current,
        { scale: 1.1, opacity: 0, x: -30 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        img2Ref.current,
        { scale: 1.1, opacity: 0, x: 30 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      )

      // Parallax images
      gsap.to(img1Ref.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

      gsap.to(img2Ref.current, {
        y: -70,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="section brand-story"
      aria-label="Brand Story"
    >
      <div className="brand-story__inner">
        {/* Text side */}
        <div className="brand-story__text-col">
          <div ref={yearRef} className="brand-story__year-bg" aria-hidden="true">
            1825
          </div>

          <span className="label-sm text-gold brand-story__eyebrow">Our Story</span>

          <div className="clip-hidden">
            <h2 ref={headlineRef} className="display-lg brand-story__headline">
              Made for Moments<br />That Matter.
            </h2>
          </div>

          <blockquote ref={quoteRef} className="brand-story__quote">
            <p className="elegant-xl brand-story__quote-text">
              &ldquo;Real milk. Real chocolate.<br />Real moments.&rdquo;
            </p>
          </blockquote>

          <div ref={textRef} className="brand-story__body">
            <p className="body-lg brand-story__copy">
              Since 1825, Cavin&apos;s has been crafting beverages that bring people
              together. Our Chocolate Milkshake isn&apos;t just a product — it&apos;s a
              ritual. A moment of pause in a fast-moving world.
            </p>
            <p className="body-lg brand-story__copy">
              Made with fresh milk and the finest cocoa, every carton is a
              commitment to quality that has been trusted by generations.
            </p>
            <div className="brand-story__divider-group">
              <span className="divider" />
              <span className="label-sm text-muted">Cavin&apos;s · Chennai, India · Est. 1825</span>
            </div>
          </div>
        </div>

        {/* Images side */}
        <div className="brand-story__images-col">
          <div className="brand-story__img-wrap brand-story__img-wrap--1" ref={img1Ref}>
            <img
              src="/frames/ezgif-frame-060.jpg"
              alt="Cavin's Chocolate Milkshake — brand story visual"
              className="brand-story__img"
              loading="lazy"
            />
          </div>
          <div className="brand-story__img-wrap brand-story__img-wrap--2" ref={img2Ref}>
            <img
              src="/frames/ezgif-frame-120.jpg"
              alt="Cavin's Chocolate Milkshake — product presentation"
              className="brand-story__img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

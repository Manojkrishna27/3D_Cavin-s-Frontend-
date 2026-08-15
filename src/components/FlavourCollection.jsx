import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import strawberryImg from '../assets/strawberry.png'
import vanillaImg from '../assets/vanilla.png'
import butterscotchImg from '../assets/butterscotch.png'
import './FlavourCollection.css'

gsap.registerPlugin(ScrollTrigger)

const flavours = [
  {
    id: 'chocolate',
    name: 'Chocolate',
    sub: 'Milkshake',
    description:
      'The signature. Deep, velvety cocoa with real milk — unapologetically rich in every sip.',
    img: '/frames/ezgif-frame-200.jpg',
    tag: 'Signature',
    note: 'Real Cocoa · Bold',
    accent: '#c9a96e',         // gold
    bgFrom: '#3d1c0e',
    bgTo: '#1a0a04',
    textDark: false,
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    sub: 'Milkshake',
    description:
      'Bursting with real strawberry sweetness, blended with fresh milk for a fruity, creamy delight.',
    img: strawberryImg,
    tag: 'Fruity',
    note: 'Real Strawberry · Sweet',
    accent: '#e8637a',
    bgFrom: '#3d0a1a',
    bgTo: '#200510',
    textDark: false,
  },
  {
    id: 'vanilla',
    name: 'Vanilla',
    sub: 'Milkshake',
    description:
      'Classic, gentle, endlessly refreshing. Real vanilla meets cold, creamy milk for pure comfort.',
    img: vanillaImg,
    tag: 'Classic',
    note: 'Real Vanilla · Smooth',
    accent: '#5bb8e8',
    bgFrom: '#0a1f38',
    bgTo: '#060f1e',
    textDark: false,
  },
  {
    id: 'butterscotch',
    name: 'Kaju Butterscotch',
    sub: 'Milkshake',
    description:
      'Golden butterscotch richness with cashew warmth — an indulgent, nutty twist on a classic.',
    img: butterscotchImg,
    tag: 'Premium',
    note: 'Butterscotch · Kaju',
    accent: '#e8a83a',
    bgFrom: '#3d2200',
    bgTo: '#1f1000',
    textDark: false,
  },
]

function FlavourCard({ flavour, index }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const glowRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        delay: index * 0.12,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  const onEnter = () => {
    setHovered(true)
    gsap.to(imgRef.current, { scale: 1.07, y: -8, duration: 0.55, ease: 'power2.out' })
    gsap.to(glowRef.current, { opacity: 0.55, duration: 0.4, ease: 'power2.out' })
  }

  const onLeave = () => {
    setHovered(false)
    gsap.to(imgRef.current, { scale: 1, y: 0, duration: 0.55, ease: 'power2.out' })
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <article
      ref={cardRef}
      className={`fc-card ${hovered ? 'fc-card--hovered' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={`${flavour.name} ${flavour.sub} — ${flavour.description}`}
      style={{
        '--fc-accent': flavour.accent,
        '--fc-bg-from': flavour.bgFrom,
        '--fc-bg-to': flavour.bgTo,
      }}
    >
      {/* Coloured background gradient */}
      <div className="fc-card__bg" aria-hidden="true" />

      {/* Accent glow on hover */}
      <div ref={glowRef} className="fc-card__glow" aria-hidden="true" />

      {/* Tag */}
      <span className="fc-card__tag label-sm">{flavour.tag}</span>

      {/* Product image — full carton, contained */}
      <div className="fc-card__img-wrap">
        <img
          ref={imgRef}
          src={flavour.img}
          alt={`Cavin's ${flavour.name} ${flavour.sub}`}
          className="fc-card__img"
          loading="lazy"
          draggable="false"
        />
      </div>

      {/* Text */}
      <div className="fc-card__body">
        <span className="label-sm fc-card__note" style={{ color: flavour.accent }}>
          {flavour.note}
        </span>
        <h3 className="fc-card__name">
          {flavour.name}<br />
          <span className="fc-card__name-sub">{flavour.sub}</span>
        </h3>
        <p className="fc-card__desc body-md">{flavour.description}</p>

        <div className={`fc-card__cta-wrap ${hovered ? 'fc-card__cta-wrap--show' : ''}`}>
          <button
            className="fc-card__cta"
            style={{ borderColor: flavour.accent, color: flavour.accent }}
            aria-label={`Explore ${flavour.name} ${flavour.sub}`}
          >
            <span>Explore</span>
            <span className="fc-card__arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default function FlavourCollection() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.4, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
        }
      )
      gsap.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2, ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="flavours"
      ref={sectionRef}
      className="section flavour-collection"
      aria-label="Flavour Collection"
    >
      <div className="flavour-collection__inner">

        {/* Header */}
        <div className="flavour-collection__header">
          <span className="label-sm text-gold flavour-collection__eyebrow">
            The Collection
          </span>
          <div className="clip-hidden">
            <h2
              ref={headlineRef}
              className="display-lg flavour-collection__headline"
            >
              Find Your<br />Favourite.
            </h2>
          </div>
          <p ref={subRef} className="body-lg flavour-collection__sub">
            Four flavours. One promise — deliciously creamy,<br />
            every single time.
          </p>
        </div>

        {/* Cards grid */}
        <div className="flavour-collection__grid">
          {flavours.map((f, i) => (
            <FlavourCard key={f.id} flavour={f} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

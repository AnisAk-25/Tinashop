import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const slides = [
  {
    img: 'https://placehold.co/800x900/d4cfc8/4a4a4a?text=New+Collection',
    labelFr: 'Nouvelle Collection', labelAr: 'كولكشن جديد',
    subFr: 'Robes & Hauts', subAr: 'فساتين وبلوزات',
  },
  {
    img: 'https://placehold.co/800x900/c8cfd4/4a4a4a?text=Été+2025',
    labelFr: 'Été 2025', labelAr: 'صيف 2025',
    subFr: 'Légère & Élégante', subAr: 'خفيفة وأنيقة',
  },
  {
    img: 'https://placehold.co/800x900/d4c8c8/4a4a4a?text=Soldes',
    labelFr: 'Soldes', labelAr: 'تخفيضات',
    subFr: 'Jusqu\'à -40%', subAr: 'حتى -40%',
  },
]

export default function Hero() {
  const { t, lang } = useCart()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent(c => (c + 1) % slides.length)

  const s = {
    wrap: { position: 'relative', overflow: 'hidden', background: '#e8e8e8' },
    slide: (active) => ({
      position: active ? 'relative' : 'absolute',
      top: 0, left: 0, width: '100%',
      opacity: active ? 1 : 0,
      transition: 'opacity 0.6s ease',
      pointerEvents: active ? 'all' : 'none',
    }),
    img: { width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' },
    overlay: {
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', padding: '28px 20px',
    },
    label: {
      fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: '300',
      color: 'white', letterSpacing: '1px', lineHeight: '1.1', marginBottom: '6px',
      fontStyle: 'italic',
    },
    sub: { fontSize: '13px', color: 'rgba(255,255,255,0.8)', letterSpacing: '2px', textTransform: 'uppercase' },
    shopBtn: {
      marginTop: '16px', display: 'inline-block',
      background: 'white', color: 'var(--dark)',
      border: 'none', borderRadius: '2px',
      padding: '11px 24px', fontSize: '11px',
      fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase',
      cursor: 'pointer', width: 'fit-content',
    },
    arrowBtn: (side) => ({
      position: 'absolute', top: '50%', [side]: '12px',
      transform: 'translateY(-50%)',
      background: 'rgba(255,255,255,0.85)', border: 'none',
      borderRadius: '50%', width: '36px', height: '36px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', fontSize: '14px', zIndex: 10,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    }),
    dots: {
      position: 'absolute', bottom: '14px', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', gap: '6px', zIndex: 10,
    },
    dot: (active) => ({
      width: active ? '20px' : '7px', height: '7px',
      borderRadius: '4px',
      background: active ? 'white' : 'rgba(255,255,255,0.5)',
      transition: 'all 0.3s',
    }),
  }

  return (
    <div style={s.wrap}>
      {slides.map((slide, i) => (
        <div key={i} style={s.slide(i === current)}>
          <img src={slide.img} alt={slide.labelFr} style={s.img} />
          <div style={s.overlay}>
            <div style={s.label}>{lang === 'ar' ? slide.labelAr : slide.labelFr}</div>
            <div style={s.sub}>{lang === 'ar' ? slide.subAr : slide.subFr}</div>
            <button
              style={s.shopBtn}
              onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('Découvrir', 'اكتشفي')}
            </button>
          </div>
        </div>
      ))}

      <button style={s.arrowBtn('left')} onClick={prev}>‹</button>
      <button style={s.arrowBtn('right')} onClick={next}>›</button>

      <div style={s.dots}>
        {slides.map((_, i) => <div key={i} style={s.dot(i === current)} onClick={() => setCurrent(i)} />)}
      </div>
    </div>
  )
}

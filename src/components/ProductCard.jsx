import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, onClick }) {
  const { t, lang } = useCart()
  const [hovered, setHovered] = useState(false)

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  const s = {
    card: {
      background: 'white', borderRadius: '4px',
      overflow: 'hidden', cursor: 'pointer',
      transition: 'transform 0.3s, box-shadow 0.3s',
      transform: hovered ? 'translateY(-4px)' : 'none',
      boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
    },
    imgWrap: {
      position: 'relative', aspectRatio: '3/4',
      overflow: 'hidden', background: 'var(--sand)',
    },
    img: {
      width: '100%', height: '100%', objectFit: 'cover',
      transition: 'transform 0.5s',
      transform: hovered ? 'scale(1.04)' : 'scale(1)',
    },
    badge: {
      position: 'absolute', top: '12px',
      [lang === 'ar' ? 'right' : 'left']: '12px',
      background: product.badge === 'SOLDES' ? 'var(--accent)' : 'var(--dark)',
      color: 'white', fontSize: '9px', fontWeight: '700',
      letterSpacing: '2px', padding: '4px 8px', borderRadius: '2px',
    },
    outOfStock: {
      position: 'absolute', inset: 0,
      background: 'rgba(249,246,241,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '13px', color: 'var(--muted)', fontWeight: '500',
      letterSpacing: '1px',
    },
    info: { padding: '14px 16px 18px' },
    name: {
      fontSize: '15px', fontWeight: '400',
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)',
      marginBottom: '6px', color: 'var(--dark)',
    },
    priceRow: { display: 'flex', alignItems: 'center', gap: '8px' },
    price: { fontSize: '15px', fontWeight: '600', color: 'var(--dark)' },
    oldPrice: {
      fontSize: '13px', textDecoration: 'line-through',
      color: 'var(--muted)',
    },
    discBadge: {
      fontSize: '10px', background: '#fef3e2',
      color: 'var(--accent)', padding: '2px 6px', borderRadius: '2px',
      fontWeight: '700',
    },
    colors: { display: 'flex', gap: '6px', marginTop: '10px' },
    dot: (c) => ({
      width: '14px', height: '14px', borderRadius: '50%',
      background: c, border: '2px solid white',
      boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
    }),
  }

  return (
    <div
      style={s.card}
      onClick={() => onClick(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.imgWrap}>
        <img src={product.image} alt={lang === 'ar' ? product.nameAr : product.nameFr} style={s.img} />
        {product.badge && <div style={s.badge}>{product.badge}</div>}
        {!product.inStock && (
          <div style={s.outOfStock}>
            {t('Épuisé', 'نفد المخزون')}
          </div>
        )}
      </div>
      <div style={s.info}>
        <div style={s.name}>{lang === 'ar' ? product.nameAr : product.nameFr}</div>
        <div style={s.priceRow}>
          <span style={s.price}>{product.price.toFixed(3)} {t('DT', 'د.ت')}</span>
          {product.oldPrice && <span style={s.oldPrice}>{product.oldPrice.toFixed(3)}</span>}
          {discount && <span style={s.discBadge}>-{discount}%</span>}
        </div>
        <div style={s.colors}>
          {product.colors.map((c, i) => <div key={i} style={s.dot(c)} />)}
        </div>
      </div>
    </div>
  )
}

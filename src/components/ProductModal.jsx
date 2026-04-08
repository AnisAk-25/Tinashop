import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductModal({ product, onClose }) {
  const { addItem, t, lang } = useCart()
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0])
      setSelectedSize(null)
      setAdded(false)
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [product])

  if (!product) return null

  const handleAdd = () => {
    if (!selectedSize) return
    addItem(product, selectedColor, selectedSize)
    setAdded(true)
    setTimeout(onClose, 800)
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  const s = {
    overlay: {
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(26,23,20,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 0.2s ease',
    },
    modal: {
      background: 'white', width: '100%', maxWidth: '100%',
      borderRadius: '20px 20px 0 0', maxHeight: '92vh',
      overflowY: 'auto', padding: '28px 20px',
      animation: 'fadeUp 0.3s ease',
    },
    handle: {
      width: '40px', height: '4px', background: 'var(--sand)',
      borderRadius: '2px', margin: '0 auto 24px',
    },
    img: {
      width: '100%', aspectRatio: '4/3', objectFit: 'cover',
      borderRadius: '12px', marginBottom: '20px', background: 'var(--sand)',
    },
    name: {
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)',
      fontSize: '24px', fontWeight: lang === 'ar' ? '700' : '400',
      marginBottom: '6px',
    },
    desc: {
      fontSize: '14px', color: 'var(--muted)', lineHeight: '1.6',
      marginBottom: '20px',
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-sans)',
    },
    priceRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' },
    price: { fontSize: '22px', fontWeight: '700' },
    oldPrice: { fontSize: '16px', textDecoration: 'line-through', color: 'var(--muted)' },
    discBadge: {
      background: '#fef3e2', color: 'var(--accent)',
      padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '700',
    },
    label: {
      fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
      color: 'var(--muted)', marginBottom: '10px', fontWeight: '500',
    },
    colorRow: { display: 'flex', gap: '10px', marginBottom: '20px' },
    colorDot: (c, active) => ({
      width: '28px', height: '28px', borderRadius: '50%', background: c,
      cursor: 'pointer', border: active ? '3px solid var(--dark)' : '2px solid white',
      boxShadow: active ? '0 0 0 1px var(--dark)' : '0 0 0 1px rgba(0,0,0,0.15)',
      transition: 'all 0.15s',
    }),
    sizeRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' },
    sizeBtn: (active) => ({
      padding: '8px 16px', border: `1.5px solid ${active ? 'var(--dark)' : 'var(--sand)'}`,
      background: active ? 'var(--dark)' : 'white',
      color: active ? 'white' : 'var(--dark)',
      borderRadius: '4px', fontSize: '13px', fontWeight: '600',
      cursor: 'pointer', transition: 'all 0.15s',
      minWidth: '48px', textAlign: 'center',
    }),
    addBtn: {
      width: '100%', padding: '16px',
      background: added ? 'var(--green)' : (!selectedSize ? 'var(--sand)' : 'var(--dark)'),
      color: added ? 'white' : (!selectedSize ? 'var(--muted)' : 'white'),
      border: 'none', borderRadius: '6px',
      fontSize: '14px', fontWeight: '600', letterSpacing: '1px',
      cursor: selectedSize ? 'pointer' : 'not-allowed',
      transition: 'all 0.3s',
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-sans)',
    },
    closeBtn: {
      position: 'absolute', top: '16px', right: '16px',
      background: 'var(--sand)', border: 'none', borderRadius: '50%',
      width: '32px', height: '32px', fontSize: '16px', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
  }

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>
        <div style={s.handle} />
        <img src={product.image} alt={lang === 'ar' ? product.nameAr : product.nameFr} style={s.img} />
        <h2 style={s.name}>{lang === 'ar' ? product.nameAr : product.nameFr}</h2>
        <p style={s.desc}>{lang === 'ar' ? product.descAr : product.descFr}</p>

        <div style={s.priceRow}>
          <span style={s.price}>{product.price.toFixed(3)} {t('DT', 'د.ت')}</span>
          {product.oldPrice && <span style={s.oldPrice}>{product.oldPrice.toFixed(3)}</span>}
          {discount && <span style={s.discBadge}>-{discount}%</span>}
        </div>

        <div style={s.label}>{t('Couleur', 'اللون')}</div>
        <div style={s.colorRow}>
          {product.colors.map((c, i) => (
            <div key={i} style={s.colorDot(c, selectedColor === c)} onClick={() => setSelectedColor(c)} />
          ))}
        </div>

        <div style={s.label}>{t('Taille', 'المقاس')}</div>
        <div style={s.sizeRow}>
          {product.sizes.map(sz => (
            <button key={sz} style={s.sizeBtn(selectedSize === sz)} onClick={() => setSelectedSize(sz)}>
              {sz}
            </button>
          ))}
        </div>

        <button style={s.addBtn} onClick={handleAdd} disabled={!product.inStock}>
          {!product.inStock
            ? t('Épuisé', 'نفد المخزون')
            : added
            ? t('✓ Ajouté !', '✓ تمت الإضافة!')
            : !selectedSize
            ? t('Choisir une taille', 'اختاري المقاس')
            : t('Ajouter au panier', 'أضيفي للسلة')}
        </button>
      </div>
    </div>
  )
}

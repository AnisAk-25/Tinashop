import { useState } from 'react'
import { products, categories } from '../data/products'
import ProductCard from './ProductCard'
import { useCart } from '../context/CartContext'

export default function ProductGrid({ onProductClick }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const { t, lang } = useCart()

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  const s = {
    section: { padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '40px' },
    eyebrow: {
      fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase',
      color: 'var(--accent)', marginBottom: '12px',
      fontFamily: 'var(--font-sans)',
    },
    title: {
      fontFamily: 'var(--font-serif)', fontSize: '36px',
      fontWeight: '300', color: 'var(--dark)',
    },
    filters: {
      display: 'flex', gap: '8px', justifyContent: 'center',
      flexWrap: 'wrap', marginBottom: '40px',
    },
    filterBtn: (active) => ({
      padding: '8px 20px',
      background: active ? 'var(--dark)' : 'white',
      color: active ? 'white' : 'var(--muted)',
      border: `1px solid ${active ? 'var(--dark)' : 'var(--sand)'}`,
      borderRadius: '2px', fontSize: '12px',
      letterSpacing: '1px', fontWeight: '500',
      cursor: 'pointer', transition: 'all 0.2s',
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-sans)',
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '20px',
    },
  }

  return (
    <section id="catalogue" style={s.section}>
      <div style={s.header}>
        <p style={s.eyebrow}>{t('Notre Sélection', 'مجموعتنا')}</p>
        <h2 style={s.title}>
          {t('Catalogue', 'الكاتالوج')}
        </h2>
      </div>

      <div style={s.filters}>
        {categories.map(cat => (
          <button
            key={cat.id}
            style={s.filterBtn(activeCategory === cat.id)}
            onClick={() => setActiveCategory(cat.id)}
          >
            {lang === 'ar' ? cat.ar : cat.fr}
          </button>
        ))}
      </div>

      <div style={s.grid}>
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </div>
    </section>
  )
}

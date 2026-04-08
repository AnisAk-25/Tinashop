import { useCart } from '../context/CartContext'

export default function Cart({ onCheckout }) {
  const { items, removeItem, updateQty, total, cartOpen, setCartOpen, t, lang } = useCart()

  const s = {
    overlay: {
      position: 'fixed', inset: 0, zIndex: 400,
      background: 'rgba(26,23,20,0.5)', backdropFilter: 'blur(3px)',
      opacity: cartOpen ? 1 : 0,
      pointerEvents: cartOpen ? 'all' : 'none',
      transition: 'opacity 0.3s',
    },
    drawer: {
      position: 'fixed', top: 0,
      [lang === 'ar' ? 'left' : 'right']: 0,
      width: '100%', maxWidth: '400px', height: '100%',
      background: 'white', zIndex: 401,
      transform: cartOpen ? 'translateX(0)' : (lang === 'ar' ? 'translateX(-100%)' : 'translateX(100%)'),
      transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      display: 'flex', flexDirection: 'column',
    },
    header: {
      padding: '20px', borderBottom: '1px solid var(--sand)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    title: {
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)',
      fontSize: '20px', fontWeight: lang === 'ar' ? '700' : '400',
    },
    closeBtn: {
      background: 'var(--sand)', border: 'none', borderRadius: '50%',
      width: '34px', height: '34px', fontSize: '16px', cursor: 'pointer',
    },
    body: { flex: 1, overflowY: 'auto', padding: '16px' },
    empty: {
      textAlign: 'center', padding: '60px 20px',
      color: 'var(--muted)', fontSize: '14px',
    },
    item: {
      display: 'flex', gap: '12px', padding: '14px 0',
      borderBottom: '1px solid var(--sand)',
    },
    itemImg: {
      width: '64px', height: '80px', objectFit: 'cover',
      borderRadius: '6px', background: 'var(--sand)', flexShrink: 0,
    },
    itemInfo: { flex: 1 },
    itemName: {
      fontSize: '14px', fontWeight: '500', marginBottom: '4px',
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)',
    },
    itemMeta: { fontSize: '12px', color: 'var(--muted)', marginBottom: '10px' },
    itemActions: { display: 'flex', alignItems: 'center', gap: '8px' },
    qtyBtn: {
      width: '26px', height: '26px', border: '1px solid var(--sand)',
      background: 'white', borderRadius: '4px', cursor: 'pointer',
      fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    qtyVal: { fontSize: '14px', fontWeight: '600', minWidth: '20px', textAlign: 'center' },
    removeBtn: {
      marginRight: 'auto', background: 'none', border: 'none',
      color: 'var(--muted)', fontSize: '12px', cursor: 'pointer',
      textDecoration: 'underline',
    },
    footer: {
      padding: '20px', borderTop: '1px solid var(--sand)',
    },
    totalRow: {
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', marginBottom: '16px',
    },
    totalLabel: { fontSize: '14px', color: 'var(--muted)' },
    totalVal: { fontSize: '22px', fontWeight: '700' },
    checkoutBtn: {
      width: '100%', padding: '16px',
      background: 'var(--dark)', color: 'white', border: 'none',
      borderRadius: '6px', fontSize: '14px', fontWeight: '600',
      cursor: 'pointer', letterSpacing: '1px',
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-sans)',
      transition: 'background 0.2s',
    },
  }

  return (
    <>
      <div style={s.overlay} onClick={() => setCartOpen(false)} />
      <div style={s.drawer}>
        <div style={s.header}>
          <span style={s.title}>{t('Mon Panier', 'سلتي')} ({items.length})</span>
          <button style={s.closeBtn} onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div style={s.body}>
          {items.length === 0 ? (
            <div style={s.empty}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛍️</div>
              <p>{t('Votre panier est vide', 'سلتك فارغة')}</p>
            </div>
          ) : items.map(item => (
            <div key={item.key} style={s.item}>
              <img src={item.product.image} alt="" style={s.itemImg} />
              <div style={s.itemInfo}>
                <div style={s.itemName}>
                  {lang === 'ar' ? item.product.nameAr : item.product.nameFr}
                </div>
                <div style={s.itemMeta}>
                  {t('Taille', 'مقاس')}: {item.size} •{' '}
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: item.color, verticalAlign: 'middle' }} />
                </div>
                <div style={s.itemActions}>
                  <button style={s.qtyBtn} onClick={() => updateQty(item.key, -1)}>−</button>
                  <span style={s.qtyVal}>{item.qty}</span>
                  <button style={s.qtyBtn} onClick={() => updateQty(item.key, 1)}>+</button>
                  <button style={s.removeBtn} onClick={() => removeItem(item.key)}>
                    {t('Retirer', 'إزالة')}
                  </button>
                </div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', flexShrink: 0 }}>
                {(item.product.price * item.qty).toFixed(3)}
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={s.footer}>
            <div style={s.totalRow}>
              <span style={s.totalLabel}>{t('Total', 'المجموع')}</span>
              <span style={s.totalVal}>{total.toFixed(3)} {t('DT', 'د.ت')}</span>
            </div>
            <button style={s.checkoutBtn} onClick={onCheckout}>
              {t('Commander', 'اطلبي الآن')} →
            </button>
          </div>
        )}
      </div>
    </>
  )
}

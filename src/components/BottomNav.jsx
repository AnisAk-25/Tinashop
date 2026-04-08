import { useCart } from '../context/CartContext'

export default function BottomNav({ onCartOpen, onWishlist, page, setPage }) {
  const { count, t, lang } = useCart()

  const items = [
    {
      id: 'shop',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
          <path d="M3 9h18l-2 11H5L3 9z"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/>
        </svg>
      ),
      labelFr: 'Shop', labelAr: 'المتجر',
    },
    {
      id: 'wishlist',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'red' : 'none'} stroke={active ? 'red' : 'currentColor'} strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      labelFr: 'Wishlist', labelAr: 'المفضلة',
    },
    {
      id: 'cart',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
      labelFr: 'Cart', labelAr: 'السلة',
      badge: count,
    },
    {
      id: 'account',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      labelFr: 'My account', labelAr: 'حسابي',
    },
  ]

  const handleClick = (id) => {
    if (id === 'cart') { onCartOpen(); return }
    setPage(id)
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 'var(--bottom-nav-h)', background: 'white',
      borderTop: '1px solid #ececec', display: 'flex',
      alignItems: 'center', zIndex: 300,
      boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
    }}>
      {items.map(item => {
        const active = page === item.id
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '3px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: active ? 'var(--dark)' : '#aaa',
              position: 'relative', height: '100%',
            }}
          >
            {item.icon(active)}
            {item.badge > 0 && (
              <span style={{
                position: 'absolute', top: '8px', right: 'calc(50% - 18px)',
                background: 'var(--dark)', color: 'white',
                borderRadius: '2px', width: '16px', height: '16px',
                fontSize: '9px', fontWeight: '700',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{item.badge}</span>
            )}
            <span style={{
              fontSize: '10px', fontWeight: active ? '600' : '400',
              fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-sans)',
            }}>
              {lang === 'ar' ? item.labelAr : item.labelFr}
            </span>
          </button>
        )
      })}
    </div>
  )
}

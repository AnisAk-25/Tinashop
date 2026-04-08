import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { lang, setLang, t } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const s = {
    nav: {
      position: 'sticky', top: 0, zIndex: 200,
      background: 'white', borderBottom: '1px solid #ececec',
    },
    inner: {
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px', height: '56px', position: 'relative',
    },
    iconBtn: {
      background: 'none', border: 'none',
      width: '40px', height: '40px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '20px', cursor: 'pointer', color: 'var(--dark)', borderRadius: '0px',
    },
    logo: {
      fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: '400',
      letterSpacing: '3px', color: 'var(--dark)',
      position: 'absolute', left: '50%', transform: 'translateX(-50%)',
      whiteSpace: 'nowrap',
    },
    right: { display: 'flex', alignItems: 'center', gap: '4px' },
    langBtn: {
      background: 'none', border: '1px solid #e0e0e0',
      borderRadius: '0px', padding: '3px 8px',
      fontSize: '11px', color: 'var(--muted)', cursor: 'pointer',
    },
    overlay: {
      position: 'fixed', inset: 0, zIndex: 499,
      background: 'rgba(0,0,0,0.35)',
      opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none',
      transition: 'opacity 0.3s',
    },
    drawer: {
      position: 'fixed', top: 0, left: 0,
      width: '72%', maxWidth: '280px', height: '100%',
      background: 'white', zIndex: 500,
      transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
      paddingTop: '0',
    },
    drawerHead: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 20px', borderBottom: '1px solid #f0f0f0',
    },
    drawerLogo: { fontFamily: 'var(--font-serif)', fontSize: '18px', letterSpacing: '2px', color: 'var(--dark)' },
    closeBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#999' },
    menuItem: {
      display: 'block', width: '100%', textAlign: 'left',
      padding: '13px 24px', fontSize: '12px', fontWeight: '500',
      letterSpacing: '1.5px', textTransform: 'uppercase',
      color: 'var(--dark)', borderBottom: '1px solid #f8f8f8',
      background: 'none', border: 'none', cursor: 'pointer',
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-sans)',
    },
  }

  const items = [
    { fr: 'Nouveautés', ar: 'جديد' },
    { fr: 'Robes', ar: 'فساتين' },
    { fr: 'Hauts', ar: 'بلوزات' },
    { fr: 'Pantalons', ar: 'بنطلونات' },
    { fr: 'Accessoires', ar: 'إكسسوارات' },
    { fr: 'Soldes', ar: 'تخفيضات' },
  ]

  return (
    <>
      <nav style={s.nav}>
        <div style={s.inner}>
          <button style={s.iconBtn} onClick={() => setMenuOpen(true)} aria-label="Menu">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <rect width="20" height="2" rx="1" fill="currentColor"/>
              <rect y="6" width="14" height="2" rx="1" fill="currentColor"/>
              <rect y="12" width="20" height="2" rx="1" fill="currentColor"/>
            </svg>
          </button>
          <div style={s.logo}>Tinashop ✨</div>
          <div style={s.right}>
            <button style={s.iconBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button style={s.langBtn} onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}>
              {lang === 'fr' ? 'عربي' : 'FR'}
            </button>
          </div>
        </div>
      </nav>
      <div style={s.overlay} onClick={() => setMenuOpen(false)} />
      <div style={s.drawer}>
        <div style={s.drawerHead}>
          <span style={s.drawerLogo}>Tinashop ✨</span>
          <button style={s.closeBtn} onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        {items.map((item, i) => (
          <button key={i} style={s.menuItem} onClick={() => setMenuOpen(false)}>
            {lang === 'ar' ? item.ar : item.fr}
          </button>
        ))}
      </div>
    </>
  )
}

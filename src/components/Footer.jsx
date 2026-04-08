import { useCart } from '../context/CartContext'

export default function Footer() {
  const { t, lang } = useCart()
  return (
    <footer style={{
      background: 'var(--dark)', color: 'rgba(255,255,255,0.5)',
      padding: '48px 20px 32px', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: '32px',
        fontWeight: '300', letterSpacing: '6px',
        color: 'white', marginBottom: '8px',
      }}>
        Tinashop ✨
      </div>
      <p style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '32px' }}>
        {t('MODE & ÉLÉGANCE', 'أزياء وأناقة')}
      </p>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '32px',
        flexWrap: 'wrap', fontSize: '12px', marginBottom: '32px',
      }}>
        {[
          t('Livraison 48h', 'توصيل 48س'),
          t('Retours gratuits', 'إرجاع مجاني'),
          t('Paiement à la livraison', 'دفع عند التسليم'),
        ].map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--accent)' }}>✓</span> {item}
          </span>
        ))}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '24px',
        flexWrap: 'wrap', fontSize: '11px', marginBottom: '24px',
      }}>
        <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
          {t('Conditions générales', 'الشروط والأحكام')}
        </a>
        <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
          {t('Politique de confidentialité', 'سياسة الخصوصية')}
        </a>
        <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
          {t('Contact', 'اتصل بنا')}
        </a>
      </div>
      <div style={{ fontSize: '11px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
        © {new Date().getFullYear()} Tinashop — {t('Tous droits réservés', 'جميع الحقوق محفوظة')}
      </div>
    </footer>
  )
}

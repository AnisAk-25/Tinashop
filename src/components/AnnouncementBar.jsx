import { useCart } from '../context/CartContext'

export default function AnnouncementBar() {
  const { t } = useCart()
  const msg = t(
    'Livraison gratuite à partir de 150dt d\'achats  •  Livraison gratuite à partir de 150dt d\'achats  •  Livraison gratuite à partir de 150dt d\'achats  •  ',
    'توصيل مجاني من 150 دت  •  توصيل مجاني من 150 دت  •  توصيل مجاني من 150 دت  •  '
  )

  return (
    <div style={{
      background: 'var(--green-banner)',
      color: 'white',
      height: '36px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'marquee 18s linear infinite',
        fontSize: '13px',
        fontStyle: 'italic',
        letterSpacing: '0.3px',
      }}>
        <span style={{ paddingRight: '60px' }}>{msg}</span>
        <span style={{ paddingRight: '60px' }}>{msg}</span>
      </div>
    </div>
  )
}

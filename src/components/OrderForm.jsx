import { useState } from 'react'
import { useCart } from '../context/CartContext'

// ← ضع URL الـ Google Apps Script هنا
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbz2zctqnpdaEVArvkLEplainLiB4wTZaC0HJxZwQudVHPl2fjcl7_nwyIP8LfJIZCFtwg/exec'

export default function OrderForm({ onClose }) {
  const { items, total, t, lang } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const e = {}
    if (!form.phone.trim()) e.phone = t('Téléphone requis', 'رقم الهاتف مطلوب')
    else if (!/^[0-9]{8,}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = t('Numéro invalide !', 'رقم غير صالح!')
    if (!form.address.trim()) e.address = t('Adresse requise', 'العنوان مطلوب')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setStatus('loading')
    const orderData = {
      date: new Date().toLocaleString('fr-TN'),
      name: form.name, phone: form.phone, address: form.address,
      items: items.map(i => `${lang === 'ar' ? i.product.nameAr : i.product.nameFr} (${i.size}) x${i.qty}`).join(' | '),
      total: total.toFixed(3) + ' DT',
    }
    try {
      if (SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        await fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(orderData) })
      } else {
        console.log('📋 Commande:', orderData)
      }
      if (window.fbq) window.fbq('track', 'Purchase', { value: total, currency: 'TND' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const fontFamily = lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-sans)'
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const s = {
    overlay: {
      position: 'fixed', inset: 0, zIndex: 600,
      background: 'rgba(26,23,20,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      animation: 'fadeIn 0.2s ease',
    },
    modal: {
      background: 'white', width: '100%', maxWidth: '480px',
      borderRadius: '20px 20px 0 0', padding: '28px 24px 32px',
      maxHeight: '90vh', overflowY: 'auto',
      animation: 'fadeUp 0.3s ease',
      fontFamily, direction: dir,
    },
    handle: { width: '40px', height: '4px', background: 'var(--sand)', borderRadius: '2px', margin: '0 auto 24px' },
    title: {
      fontFamily: lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)',
      fontSize: '22px', fontWeight: lang === 'ar' ? '900' : '400',
      marginBottom: '20px',
    },
    summary: {
      background: 'var(--cream)', borderRadius: '10px',
      padding: '14px', marginBottom: '24px', fontSize: '13px', color: 'var(--muted)',
    },
    label: { fontSize: '12px', fontWeight: '600', color: 'var(--muted)', marginBottom: '6px', display: 'block', letterSpacing: '1px' },
    input: (err) => ({
      width: '100%', padding: '12px 14px',
      border: `1.5px solid ${err ? '#ef4444' : 'var(--sand)'}`,
      borderRadius: '8px', fontSize: '14px', fontFamily,
      outline: 'none', marginBottom: '4px',
      background: err ? '#fef2f2' : 'white',
      direction: 'rtl',
    }),
    error: { fontSize: '12px', color: '#ef4444', fontWeight: '600', marginBottom: '12px' },
    group: { marginBottom: '16px' },
    btn: {
      width: '100%', padding: '16px',
      background: 'var(--accent)', color: 'white', border: 'none',
      borderRadius: '0px', fontSize: '15px', fontWeight: '700',
      cursor: 'pointer', fontFamily, marginTop: '8px',
      transition: 'all 0.2s',
      opacity: status === 'loading' ? 0.7 : 1,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    success: {
      textAlign: 'center', padding: '40px 20px',
    },
  }

  if (status === 'success') return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <div style={{ ...s.success, fontFamily }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ ...s.title, textAlign: 'center' }}>
            {t('Commande envoyée !', 'تم استلام طلبك!')}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7' }}>
            {t(
              'Merci ! Nous vous contacterons bientôt pour confirmer votre commande.',
              'شكراً! سنتصل بك قريباً لتأكيد الطلبية.'
            )}
          </p>
          <button style={{ ...s.btn, marginTop: '24px' }} onClick={onClose}>
            {t('Continuer les achats', 'متابعة التسوق')}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>
        <div style={s.handle} />
        <h2 style={s.title}>{t('Finaliser la commande', 'إتمام الطلب')}</h2>

        <div style={s.summary}>
          <strong>{t('Récapitulatif', 'ملخص الطلب')} :</strong><br />
          {items.map(i => (
            <span key={i.key}>
              {lang === 'ar' ? i.product.nameAr : i.product.nameFr} × {i.qty} &nbsp;
            </span>
          ))}
          <br />
          <strong>{t('Total', 'المجموع')} : {total.toFixed(3)} DT</strong>
        </div>

        <div style={s.group}>
          <label style={s.label}>{t('NOM', 'الاسم')}</label>
          <input name="name" value={form.name} onChange={handleChange}
            placeholder={t('Votre nom', 'اسمك')} style={s.input(false)} />
        </div>

        <div style={s.group}>
          <label style={s.label}>{t('TÉLÉPHONE *', 'الهاتف *')}</label>
          <input name="phone" value={form.phone} onChange={handleChange}
            placeholder="XX XXX XXX" style={s.input(!!errors.phone)} dir="ltr" />
          {errors.phone && <div style={s.error}>{errors.phone}</div>}
        </div>

        <div style={s.group}>
          <label style={s.label}>{t('ADRESSE *', 'العنوان *')}</label>
          <input name="address" value={form.address} onChange={handleChange}
            placeholder={t('Ville, rue...', 'المدينة، الشارع...')} style={s.input(!!errors.address)} />
          {errors.address && <div style={s.error}>{errors.address}</div>}
        </div>

        <button style={s.btn} onClick={handleSubmit} disabled={status === 'loading'}>
          {status === 'loading'
            ? t('Envoi en cours...', '⏳ جاري الإرسال...')
            : t('✓ Confirmer la commande', '✓ تأكيد الطلبية')}
        </button>
      </div>
    </div>
  )
}

import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [lang, setLang] = useState('fr') // 'fr' | 'ar'

  const addItem = (product, color, size) => {
    setItems(prev => {
      const key = `${product.id}-${color}-${size}`
      const exists = prev.find(i => i.key === key)
      if (exists) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { key, product, color, size, qty: 1 }]
    })
    setCartOpen(true)
  }

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key))

  const updateQty = (key, delta) => {
    setItems(prev => prev
      .map(i => i.key === key ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    )
  }

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  const t = (fr, ar) => lang === 'ar' ? ar : fr

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, total, count, cartOpen, setCartOpen, lang, setLang, t }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

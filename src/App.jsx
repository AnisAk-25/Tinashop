import { useState } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import Cart from './components/Cart'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'

function BottomNavWrapper({ page, setPage }) {
  const { setCartOpen } = useCart()
  return <BottomNav onCartOpen={() => setCartOpen(true)} page={page} setPage={setPage} />
}

function StoreApp() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [page, setPage] = useState('shop')

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', background: 'white', minHeight: '100vh' }}>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <ProductGrid onProductClick={setSelectedProduct} />
      <Footer />

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <Cart onCheckout={() => setCheckoutOpen(true)} />
      {checkoutOpen && <OrderForm onClose={() => setCheckoutOpen(false)} />}

      <BottomNavWrapper page={page} setPage={setPage} />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  )
}

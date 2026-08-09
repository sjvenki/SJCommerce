import { useState } from 'react'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import PaymentPage from './pages/PaymentPage'
import OrderSuccess from './pages/OrderSuccess'

export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  unit: string
  badge?: string
  rating: number
  reviews: number
}

export type CartItem = Product & { qty: number }

export type Page = 'home' | 'cart' | 'payment' | 'success'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const updateQty = (id: number, delta: number) => {
    setCart(prev =>
      prev.flatMap(i => {
        if (i.id !== id) return [i]
        const next = i.qty + delta
        return next <= 0 ? [] : [{ ...i, qty: next }]
      })
    )
  }

  const removeItem = (id: number) => setCart(prev => prev.filter(i => i.id !== id))

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a1f0e' }}>
      {page === 'home' && (
        <HomePage
          cart={cart}
          cartCount={cartCount}
          onAddToCart={addToCart}
          onGoCart={() => setPage('cart')}
        />
      )}
      {page === 'cart' && (
        <CartPage
          cart={cart}
          cartTotal={cartTotal}
          onUpdateQty={updateQty}
          onRemoveItem={removeItem}
          onBack={() => setPage('home')}
          onCheckout={() => setPage('payment')}
        />
      )}
      {page === 'payment' && (
        <PaymentPage
          cartTotal={cartTotal}
          cart={cart}
          onBack={() => setPage('cart')}
          onSuccess={() => { setCart([]); setPage('success') }}
        />
      )}
      {page === 'success' && (
        <OrderSuccess onHome={() => setPage('home')} />
      )}
    </div>
  )
}

import { useState } from 'react'
import type { Product, CartItem } from '../App'

const PRODUCTS: Product[] = [
  { id: 1, name: 'Organic Bananas', category: 'Fruits', price: 2.49, originalPrice: 3.29, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&auto=format', unit: '6 pcs', badge: 'SALE', rating: 4.8, reviews: 214 },
  { id: 2, name: 'Fresh Strawberries', category: 'Fruits', price: 4.99, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop&auto=format', unit: '250g', badge: 'FRESH', rating: 4.9, reviews: 187 },
  { id: 3, name: 'Whole Milk', category: 'Dairy', price: 1.89, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop&auto=format', unit: '1L', rating: 4.6, reviews: 302 },
  { id: 4, name: 'Free-Range Eggs', category: 'Dairy', price: 3.49, originalPrice: 4.49, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop&auto=format', unit: '12 pcs', badge: 'DEAL', rating: 4.7, reviews: 156 },
  { id: 5, name: 'Sourdough Bread', category: 'Bakery', price: 5.99, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&auto=format', unit: '800g', badge: 'FRESH', rating: 4.9, reviews: 421 },
  { id: 6, name: 'Baby Spinach', category: 'Vegetables', price: 2.29, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&auto=format', unit: '200g', rating: 4.5, reviews: 98 },
  { id: 7, name: 'Cherry Tomatoes', category: 'Vegetables', price: 3.19, originalPrice: 3.99, image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400&h=400&fit=crop&auto=format', unit: '300g', badge: 'SALE', rating: 4.7, reviews: 173 },
  { id: 8, name: 'Greek Yogurt', category: 'Dairy', price: 4.49, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop&auto=format', unit: '500g', badge: 'NEW', rating: 4.8, reviews: 89 },
  { id: 9, name: 'Avocados', category: 'Fruits', price: 5.49, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop&auto=format', unit: '3 pcs', rating: 4.6, reviews: 264 },
  { id: 10, name: 'Orange Juice', category: 'Beverages', price: 3.79, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop&auto=format', unit: '1L', badge: 'FRESH', rating: 4.7, reviews: 132 },
  { id: 11, name: 'Chicken Breast', category: 'Meat', price: 7.99, originalPrice: 9.99, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d11560?w=400&h=400&fit=crop&auto=format', unit: '500g', badge: 'DEAL', rating: 4.5, reviews: 201 },
  { id: 12, name: 'Brown Rice', category: 'Grains', price: 3.29, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&auto=format', unit: '1kg', rating: 4.4, reviews: 77 },
]

const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Beverages', 'Grains']

const HERO_SLIDES = [
  {
    title: 'Groceries at\nLightning Speed',
    sub: 'Delivered in 10 minutes or less',
    cta: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=600&fit=crop&auto=format',
    accent: '#22c55e',
  },
  {
    title: 'Fresh Produce\nEvery Day',
    sub: 'Farm to doorstep — always organic',
    cta: 'Explore Fresh',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900&h=600&fit=crop&auto=format',
    accent: '#4ade80',
  },
]

type Props = {
  cart: CartItem[]
  cartCount: number
  onAddToCart: (p: Product) => void
  onGoCart: () => void
}

export default function HomePage({ cart, cartCount, onAddToCart, onGoCart }: Props) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [slide, setSlide] = useState(0)
  const [addedId, setAddedId] = useState<number | null>(null)

  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === 'All' || p.category === category
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleAdd = (p: Product) => {
    onAddToCart(p)
    setAddedId(p.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  const inCart = (id: number) => cart.find(i => i.id === id)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a1f0e' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: '#0a1f0ecc', borderColor: '#22c55e18' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 6h19l-2 9H5L3 6z" stroke="#052e16" strokeWidth="2" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.5" fill="#052e16"/><circle cx="17" cy="20" r="1.5" fill="#052e16"/><path d="M1 2h3l.5 2" stroke="#052e16" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ color: '#f0fdf4' }}>
              SJ<span style={{ color: '#22c55e' }}>Commerce</span>
            </span>
          </div>

          <div className="hidden sm:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#4ade80' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search groceries..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{ backgroundColor: '#142e18', color: '#f0fdf4', border: '1px solid #22c55e30' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-sm" style={{ color: '#86efac' }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3" fill="currentColor" stroke="none"/></svg>
              <span className="font-medium">10 min delivery</span>
            </div>
            <button
              onClick={onGoCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: '#22c55e', color: '#052e16' }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 6h19l-2 9H5L3 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.5" fill="currentColor"/><circle cx="17" cy="20" r="1.5" fill="currentColor"/></svg>
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center" style={{ backgroundColor: '#052e16', color: '#22c55e' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: 420, backgroundColor: '#0f2d15' }}>
        <img
          src={HERO_SLIDES[slide].image}
          alt="Fresh groceries"
          className="absolute inset-0 w-full h-full object-cover opacity-20 transition-opacity duration-700"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a1f0ef0 0%, #052e1680 100%)' }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ backgroundColor: '#22c55e20', color: '#4ade80', border: '1px solid #22c55e40' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Now delivering in your area
            </div>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-4" style={{ color: '#f0fdf4', letterSpacing: '-1px' }}>
              {HERO_SLIDES[slide].title.split('\n').map((t, i) => (
                <span key={i}>{t}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="text-lg mb-8" style={{ color: '#86efac' }}>{HERO_SLIDES[slide].sub}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCategory('All')}
                className="px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 pulse-green"
                style={{ backgroundColor: '#22c55e', color: '#052e16' }}
              >
                {HERO_SLIDES[slide].cta}
              </button>
              <button
                onClick={onGoCart}
                className="px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ backgroundColor: 'transparent', color: '#4ade80', border: '1.5px solid #22c55e50' }}
              >
                View Cart
              </button>
            </div>
            <div className="flex items-center gap-8 mt-10">
              {[['10 min', 'Delivery'], ['50K+', 'Customers'], ['500+', 'Products']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="text-2xl font-black" style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>{val}</div>
                  <div className="text-xs" style={{ color: '#4ade8080' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide dots */}
          <div className="flex lg:flex-col gap-2 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className="rounded-full transition-all"
                style={{ width: i === slide ? 28 : 8, height: 8, backgroundColor: i === slide ? '#22c55e' : '#22c55e40' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Delivery badges */}
      <div className="border-y" style={{ borderColor: '#22c55e15', backgroundColor: '#0f2d15' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-6 justify-center">
          {[
            ['⚡', 'Express 10 min', 'Lightning fast delivery'],
            ['🥬', '100% Fresh', 'Quality guaranteed'],
            ['💚', 'No markups', 'Store prices always'],
            ['🔄', 'Free returns', 'On all fresh produce'],
          ].map(([icon, title, sub]) => (
            <div key={title} className="flex items-center gap-3">
              <span className="text-xl">{icon}</span>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#f0fdf4' }}>{title}</div>
                <div className="text-xs" style={{ color: '#4ade8060' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="flex-none px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
              style={category === cat
                ? { backgroundColor: '#22c55e', color: '#052e16' }
                : { backgroundColor: '#142e18', color: '#86efac', border: '1px solid #22c55e25' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile search */}
      <div className="sm:hidden max-w-7xl mx-auto px-4 mt-4">
        <div className="relative w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#4ade80' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search groceries..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ backgroundColor: '#142e18', color: '#f0fdf4', border: '1px solid #22c55e30' }}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pb-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold" style={{ color: '#f0fdf4' }}>
            {category === 'All' ? 'All Products' : category}
            <span className="ml-2 text-sm font-normal" style={{ color: '#4ade8060' }}>({filtered.length})</span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: '#4ade8060' }}>
            <div className="text-5xl mb-4">🥬</div>
            <p className="font-medium">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => {
              const qty = inCart(product.id)?.qty ?? 0
              const justAdded = addedId === product.id
              return (
                <div
                  key={product.id}
                  className="rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 group"
                  style={{ backgroundColor: '#142e18', border: '1px solid #22c55e15' }}
                >
                  <div className="relative overflow-hidden" style={{ height: 160, backgroundColor: '#0f2d15' }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    {product.badge && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-bold" style={{
                        backgroundColor: product.badge === 'SALE' || product.badge === 'DEAL' ? '#dc2626' : '#22c55e',
                        color: product.badge === 'SALE' || product.badge === 'DEAL' ? '#fff' : '#052e16'
                      }}>
                        {product.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex flex-col flex-1">
                    <div className="text-xs font-medium mb-1" style={{ color: '#4ade80', fontFamily: "'JetBrains Mono', monospace" }}>
                      {product.category}
                    </div>
                    <div className="font-semibold text-sm leading-tight mb-1" style={{ color: '#f0fdf4' }}>{product.name}</div>
                    <div className="text-xs mb-2" style={{ color: '#4ade8060' }}>{product.unit}</div>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#22c55e' : '#22c55e30'}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        ))}
                      </div>
                      <span className="text-xs" style={{ color: '#4ade8060' }}>({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="font-black text-base" style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="ml-1 text-xs line-through" style={{ color: '#4ade8040' }}>
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 font-bold text-lg"
                        style={{
                          backgroundColor: justAdded || qty > 0 ? '#22c55e' : '#1e3d24',
                          color: justAdded || qty > 0 ? '#052e16' : '#4ade80',
                        }}
                      >
                        {qty > 0 ? qty : '+'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Floating cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <button
            onClick={onGoCart}
            className="flex items-center gap-4 px-6 py-3.5 rounded-2xl font-semibold shadow-2xl transition-all hover:scale-105"
            style={{ backgroundColor: '#22c55e', color: '#052e16', boxShadow: '0 8px 32px #22c55e60' }}
          >
            <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold">{cartCount}</span>
            View Cart
            <span className="font-black" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              ${cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

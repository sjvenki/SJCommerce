import type { CartItem } from '../App'

type Props = {
  cart: CartItem[]
  cartTotal: number
  onUpdateQty: (id: number, delta: number) => void
  onRemoveItem: (id: number) => void
  onBack: () => void
  onCheckout: () => void
}

export default function CartPage({ cart, cartTotal, onUpdateQty, onRemoveItem, onBack, onCheckout }: Props) {
  const delivery = cartTotal > 30 ? 0 : 2.99
  const subtotal = cartTotal
  const total = subtotal + delivery

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a1f0e' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: '#0a1f0ecc', borderColor: '#22c55e18' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium transition-all hover:translate-x-[-2px]" style={{ color: '#4ade80' }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to Shop
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M3 6h19l-2 9H5L3 6z" stroke="#052e16" strokeWidth="2" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.5" fill="#052e16"/><circle cx="17" cy="20" r="1.5" fill="#052e16"/></svg>
            </div>
            <span className="font-bold" style={{ color: '#3b82f6' }}>Shop Groceries</span>
          </div>
          <div className="w-24" />
        </div>
      </nav>

      {/* Progress steps */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex items-center gap-0">
          {['Cart', 'Payment', 'Done'].map((step, i) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{ backgroundColor: i === 0 ? '#22c55e' : '#1e3d24', color: i === 0 ? '#052e16' : '#4ade8040' }}>
                  {i === 0 ? '✓' : i + 1}
                </div>
                <span className="text-xs font-medium" style={{ color: i === 0 ? '#22c55e' : '#4ade8040' }}>{step}</span>
              </div>
              {i < 2 && <div className="flex-1 h-0.5 mb-5 mx-2" style={{ backgroundColor: i < 0 ? '#22c55e' : '#22c55e20' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 pb-24">
        <h1 className="text-2xl font-black mb-6" style={{ color: '#f0fdf4' }}>
          Your Cart <span style={{ color: '#4ade8060', fontWeight: 400, fontSize: 16 }}>({cart.length} items)</span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-lg font-semibold mb-2" style={{ color: '#f0fdf4' }}>Your cart is empty</p>
            <p className="text-sm mb-6" style={{ color: '#4ade8060' }}>Add items from the shop to get started</p>
            <button onClick={onBack} className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: '#22c55e', color: '#052e16' }}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Item list */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl animate-slide-up" style={{ backgroundColor: '#142e18', border: '1px solid #22c55e15' }}>
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-none" style={{ backgroundColor: '#0f2d15' }}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium mb-0.5" style={{ color: '#4ade80', fontFamily: "'JetBrains Mono', monospace" }}>{item.category}</div>
                    <div className="font-semibold text-sm mb-0.5 truncate" style={{ color: '#f0fdf4' }}>{item.name}</div>
                    <div className="text-xs mb-2" style={{ color: '#4ade8060' }}>{item.unit}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-xl overflow-hidden" style={{ backgroundColor: '#0f2d15' }}>
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center font-bold transition-all hover:bg-white/10 text-lg"
                          style={{ color: '#4ade80' }}
                        >−</button>
                        <span className="w-6 text-center font-bold text-sm" style={{ color: '#f0fdf4', fontFamily: "'JetBrains Mono', monospace" }}>{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center font-bold transition-all hover:bg-white/10 text-lg"
                          style={{ color: '#4ade80' }}
                        >+</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-base" style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>
                          ₹{(item.price * item.qty).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-900/30"
                          style={{ color: '#ef444480' }}
                        >
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div className="p-4 rounded-2xl mt-2" style={{ backgroundColor: '#142e18', border: '1px solid #22c55e15' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: '#f0fdf4' }}>Have a coupon?</p>
                <div className="flex gap-2">
                  <input
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ backgroundColor: '#0f2d15', color: '#f0fdf4', border: '1px solid #22c55e25' }}
                  />
                  <button className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80" style={{ backgroundColor: '#22c55e20', color: '#4ade80', border: '1px solid #22c55e40' }}>
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl p-5 sticky top-24" style={{ backgroundColor: '#142e18', border: '1px solid #22c55e20' }}>
                <h2 className="font-bold text-base mb-5" style={{ color: '#f0fdf4' }}>Order Summary</h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#4ade8080' }}>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                    <span style={{ color: '#f0fdf4', fontFamily: "'JetBrains Mono', monospace" }}>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#4ade8080' }}>Delivery fee</span>
                    {delivery === 0
                      ? <span className="font-semibold" style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>FREE</span>
                      : <span style={{ color: '#f0fdf4', fontFamily: "'JetBrains Mono', monospace" }}>₹{delivery.toFixed(2)}</span>
                    }
                  </div>
                  {delivery > 0 && (
                    <div className="text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: '#22c55e15', color: '#4ade80' }}>
                      Add ₹{(30 - subtotal).toFixed(2)} more for free delivery
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between" style={{ borderColor: '#22c55e20' }}>
                    <span className="font-bold" style={{ color: '#f0fdf4' }}>Total</span>
                    <span className="font-black text-lg" style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl" style={{ backgroundColor: '#0f2d15' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3" fill="#052e16"/></svg>
                  <span className="text-xs font-medium" style={{ color: '#4ade80' }}>Deliver in <span className="font-bold text-white">~10 minutes</span></span>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] pulse-green"
                  style={{ backgroundColor: '#22c55e', color: '#052e16', boxShadow: '0 4px 20px #22c55e40' }}
                >
                  Proceed to Payment →
                </button>

                <div className="flex items-center justify-center gap-4 mt-4">
                  {['visa', 'mc', 'amex', 'gpay'].map(m => (
                    <div key={m} className="px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: '#0f2d15', color: '#4ade8060' }}>
                      {m === 'visa' ? 'VISA' : m === 'mc' ? 'MC' : m === 'amex' ? 'AMEX' : 'GPay'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

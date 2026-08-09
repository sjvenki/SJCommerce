import { useState } from 'react'
import type { CartItem } from '../App'

type Props = {
  cartTotal: number
  cart: CartItem[]
  onBack: () => void
  onSuccess: () => void
}

type PayMethod = 'card' | 'upi' | 'wallet' | 'cod'

export default function PaymentPage({ cartTotal, cart, onBack, onSuccess }: Props) {
  const delivery = cartTotal > 30 ? 0 : 2.99
  const total = cartTotal + delivery

  const [method, setMethod] = useState<PayMethod>('card')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [upi, setUpi] = useState('')
  const [wallet, setWallet] = useState('paytm')
  const [address, setAddress] = useState({ line1: '', line2: '', city: '', zip: '', phone: '' })
  const [processing, setProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!address.line1) e.line1 = 'Required'
    if (!address.city) e.city = 'Required'
    if (!address.zip || !/^\d{5,6}$/.test(address.zip)) e.zip = 'Valid ZIP required'
    if (!address.phone || !/^\d{10}$/.test(address.phone)) e.phone = '10-digit number required'
    if (method === 'card') {
      if (!card.number || card.number.replace(/\s/g, '').length < 16) e.cardNumber = 'Valid 16-digit number required'
      if (!card.name) e.cardName = 'Required'
      if (!card.expiry || card.expiry.length < 5) e.expiry = 'MM/YY required'
      if (!card.cvv || card.cvv.length < 3) e.cvv = '3–4 digits required'
    }
    if (method === 'upi' && !upi.includes('@')) e.upi = 'Valid UPI ID required (e.g. name@upi)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = () => {
    if (!validate()) return
    setProcessing(true)
    setTimeout(() => { setProcessing(false); onSuccess() }, 2200)
  }

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#86efac' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{error}</p>}
    </div>
  )

  const Input = ({ value, onChange, placeholder, type = 'text', error }: { value: string; onChange: (v: string) => void; placeholder: string; type?: string; error?: boolean }) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
      style={{
        backgroundColor: '#0f2d15',
        color: '#f0fdf4',
        border: `1px solid ${error ? '#ef4444' : '#22c55e25'}`,
        fontFamily: value ? "'JetBrains Mono', monospace" : undefined,
      }}
    />
  )

  const payMethods: { id: PayMethod; label: string; icon: string; sub: string }[] = [
    { id: 'card', label: 'Credit / Debit Card', icon: '💳', sub: 'Visa, Mastercard, Amex' },
    { id: 'upi', label: 'UPI', icon: '⚡', sub: 'Google Pay, PhonePe, Paytm' },
    { id: 'wallet', label: 'Wallet', icon: '👛', sub: 'Paytm, Amazon Pay' },
    { id: 'cod', label: 'Cash on Delivery', icon: '💵', sub: 'Pay when delivered' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a1f0e' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: '#0a1f0ecc', borderColor: '#22c55e18' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium transition-all hover:translate-x-[-2px]" style={{ color: '#4ade80' }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to Cart
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M3 6h19l-2 9H5L3 6z" stroke="#052e16" strokeWidth="2" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.5" fill="#052e16"/><circle cx="17" cy="20" r="1.5" fill="#052e16"/></svg>
            </div>
            <span className="font-bold" style={{ color: '#f0fdf4' }}>SJ<span style={{ color: '#22c55e' }}>Commerce</span></span>
          </div>
          <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: '#22c55e15', color: '#4ade80' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Secure checkout
          </div>
        </div>
      </nav>

      {/* Progress */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex items-center gap-0">
          {['Cart', 'Payment', 'Done'].map((step, i) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{ backgroundColor: i <= 1 ? '#22c55e' : '#1e3d24', color: i <= 1 ? '#052e16' : '#4ade8040' }}>
                  {i === 0 ? '✓' : i + 1}
                </div>
                <span className="text-xs font-medium" style={{ color: i <= 1 ? '#22c55e' : '#4ade8040' }}>{step}</span>
              </div>
              {i < 2 && <div className="flex-1 h-0.5 mb-5 mx-2" style={{ backgroundColor: i < 1 ? '#22c55e' : '#22c55e20' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 pb-24">
        <h1 className="text-2xl font-black mb-6" style={{ color: '#f0fdf4' }}>Payment & Delivery</h1>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: forms */}
          <div className="lg:col-span-3 space-y-5">
            {/* Delivery address */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#142e18', border: '1px solid #22c55e15' }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#22c55e20' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3" fill="#052e16"/></svg>
                </div>
                <h2 className="font-bold text-sm" style={{ color: '#f0fdf4' }}>Delivery Address</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Field label="Address Line 1" error={errors.line1}>
                  <Input value={address.line1} onChange={v => setAddress(a => ({ ...a, line1: v }))} placeholder="House no., Street name" error={!!errors.line1} />
                </Field>
                <Field label="Address Line 2 (optional)">
                  <Input value={address.line2} onChange={v => setAddress(a => ({ ...a, line2: v }))} placeholder="Apartment, landmark" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City" error={errors.city}>
                    <Input value={address.city} onChange={v => setAddress(a => ({ ...a, city: v }))} placeholder="Mumbai" error={!!errors.city} />
                  </Field>
                  <Field label="PIN Code" error={errors.zip}>
                    <Input value={address.zip} onChange={v => setAddress(a => ({ ...a, zip: v.replace(/\D/g, '').slice(0, 6) }))} placeholder="400001" error={!!errors.zip} />
                  </Field>
                </div>
                <Field label="Phone Number" error={errors.phone}>
                  <Input value={address.phone} onChange={v => setAddress(a => ({ ...a, phone: v.replace(/\D/g, '').slice(0, 10) }))} placeholder="9876543210" type="tel" error={!!errors.phone} />
                </Field>
              </div>
            </div>

            {/* Payment method */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#142e18', border: '1px solid #22c55e15' }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#22c55e20' }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
                </div>
                <h2 className="font-bold text-sm" style={{ color: '#f0fdf4' }}>Payment Method</h2>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-5">
                {payMethods.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className="flex items-start gap-3 p-3 rounded-xl text-left transition-all"
                    style={{
                      backgroundColor: method === m.id ? '#22c55e15' : '#0f2d15',
                      border: `1.5px solid ${method === m.id ? '#22c55e' : '#22c55e20'}`,
                    }}
                  >
                    <span className="text-lg mt-0.5">{m.icon}</span>
                    <div>
                      <div className="text-xs font-semibold" style={{ color: method === m.id ? '#f0fdf4' : '#86efac' }}>{m.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#4ade8050' }}>{m.sub}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Card form */}
              {method === 'card' && (
                <div className="space-y-3 animate-fade-in">
                  <Field label="Card Number" error={errors.cardNumber}>
                    <Input
                      value={card.number}
                      onChange={v => setCard(c => ({ ...c, number: formatCard(v) }))}
                      placeholder="4242 4242 4242 4242"
                      error={!!errors.cardNumber}
                    />
                  </Field>
                  <Field label="Cardholder Name" error={errors.cardName}>
                    <Input value={card.name} onChange={v => setCard(c => ({ ...c, name: v }))} placeholder="Alex Johnson" error={!!errors.cardName} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry" error={errors.expiry}>
                      <Input value={card.expiry} onChange={v => setCard(c => ({ ...c, expiry: formatExpiry(v) }))} placeholder="MM/YY" error={!!errors.expiry} />
                    </Field>
                    <Field label="CVV" error={errors.cvv}>
                      <Input value={card.cvv} onChange={v => setCard(c => ({ ...c, cvv: v.replace(/\D/g, '').slice(0, 4) }))} placeholder="•••" type="password" error={!!errors.cvv} />
                    </Field>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {['VISA', 'MC', 'AMEX', 'RuPay'].map(b => (
                      <div key={b} className="px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: '#0f2d15', color: '#4ade8060' }}>{b}</div>
                    ))}
                    <div className="ml-auto flex items-center gap-1 text-xs" style={{ color: '#4ade8060' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      256-bit SSL
                    </div>
                  </div>
                </div>
              )}

              {/* UPI form */}
              {method === 'upi' && (
                <div className="animate-fade-in">
                  <Field label="UPI ID" error={errors.upi}>
                    <Input value={upi} onChange={setUpi} placeholder="yourname@upi" error={!!errors.upi} />
                  </Field>
                  <div className="flex gap-2 mt-3">
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(w => (
                      <button key={w} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:border-green-400" style={{ backgroundColor: '#0f2d15', color: '#4ade80', border: '1px solid #22c55e25' }}>{w}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Wallet */}
              {method === 'wallet' && (
                <div className="animate-fade-in grid grid-cols-2 gap-2">
                  {['paytm', 'amazon', 'mobikwik', 'freecharge'].map(w => (
                    <button
                      key={w}
                      onClick={() => setWallet(w)}
                      className="px-3 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all"
                      style={{
                        backgroundColor: wallet === w ? '#22c55e15' : '#0f2d15',
                        color: wallet === w ? '#f0fdf4' : '#86efac',
                        border: `1.5px solid ${wallet === w ? '#22c55e' : '#22c55e20'}`,
                      }}
                    >
                      {w === 'mobikwik' ? 'MobiKwik' : w === 'freecharge' ? 'FreeCharge' : w === 'amazon' ? 'Amazon Pay' : 'Paytm'}
                    </button>
                  ))}
                </div>
              )}

              {/* COD */}
              {method === 'cod' && (
                <div className="animate-fade-in p-4 rounded-xl" style={{ backgroundColor: '#0f2d15', border: '1px solid #22c55e20' }}>
                  <p className="text-sm" style={{ color: '#86efac' }}>Pay ₹{total.toFixed(2)} in cash when your order arrives. No additional fee.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-5 sticky top-24" style={{ backgroundColor: '#142e18', border: '1px solid #22c55e20' }}>
              <h2 className="font-bold text-sm mb-4" style={{ color: '#f0fdf4' }}>Order Summary</h2>

              <div className="space-y-2 mb-4 max-h-56 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-none" style={{ backgroundColor: '#0f2d15' }}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate" style={{ color: '#f0fdf4' }}>{item.name}</div>
                      <div className="text-xs" style={{ color: '#4ade8060' }}>×{item.qty}</div>
                    </div>
                    <span className="text-xs font-bold flex-none" style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2" style={{ borderColor: '#22c55e20' }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#4ade8080' }}>Subtotal</span>
                  <span style={{ color: '#f0fdf4', fontFamily: "'JetBrains Mono', monospace" }}>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#4ade8080' }}>Delivery</span>
                  {delivery === 0
                    ? <span style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>FREE</span>
                    : <span style={{ color: '#f0fdf4', fontFamily: "'JetBrains Mono', monospace" }}>${delivery.toFixed(2)}</span>
                  }
                </div>
                <div className="flex justify-between font-black pt-2 border-t" style={{ borderColor: '#22c55e20' }}>
                  <span style={{ color: '#f0fdf4' }}>Total</span>
                  <span className="text-xl" style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={processing}
                className="w-full py-4 rounded-xl font-black text-sm mt-5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#22c55e', color: '#052e16', boxShadow: '0 4px 20px #22c55e40' }}
              >
                {processing ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>
                    Processing…
                  </div>
                ) : (
                  `Pay $${total.toFixed(2)}`
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-4 text-xs" style={{ color: '#4ade8050' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Encrypted & secured by 256-bit SSL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = { onHome: () => void }

export default function OrderSuccess({ onHome }: Props) {
  const eta = new Date(Date.now() + 10 * 60 * 1000)
  const etaStr = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-fade-in" style={{ backgroundColor: '#0a1f0e' }}>
      {/* Ripple */}
      <div className="relative w-28 h-28 mb-8">
        <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: '#22c55e' }} />
        <div className="absolute inset-2 rounded-full animate-ping opacity-10 animation-delay-150" style={{ backgroundColor: '#22c55e' }} />
        <div className="relative w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#052e16" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl font-black mb-2 text-center" style={{ color: '#f0fdf4' }}>Order Confirmed!</h1>
      <p className="text-base mb-1 text-center" style={{ color: '#86efac' }}>Your groceries are on their way</p>

      <div className="mt-8 p-6 rounded-2xl text-center w-full max-w-sm" style={{ backgroundColor: '#142e18', border: '1px solid #22c55e30' }}>
        <div className="text-4xl font-black mb-1" style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>~10 min</div>
        <div className="text-sm" style={{ color: '#4ade80' }}>Estimated delivery by <span className="font-bold text-white">{etaStr}</span></div>

        <div className="mt-6 flex justify-between items-center">
          {[
            { icon: '📦', label: 'Packed' },
            { icon: '🛵', label: 'On the way' },
            { icon: '🏠', label: 'Delivered' },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="text-2xl">{s.icon}</div>
              <div className="text-xs font-medium" style={{ color: i === 0 ? '#22c55e' : '#4ade8040' }}>{s.label}</div>
              {i < 2 && <div className="absolute" />}
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-between items-center text-xs px-2" style={{ color: '#4ade8040' }}>
          <span>Order #SJC-{Math.floor(Math.random() * 90000 + 10000)}</span>
          <span>Receipt sent to email</span>
        </div>
      </div>

      <button
        onClick={onHome}
        className="mt-8 px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
        style={{ backgroundColor: '#22c55e', color: '#052e16', boxShadow: '0 4px 20px #22c55e40' }}
      >
        Continue Shopping
      </button>
    </div>
  )
}

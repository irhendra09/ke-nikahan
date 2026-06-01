'use client'

import { useActionState, useEffect } from 'react'
import { processCheckout } from '../actions'
import { useRouter } from 'next/navigation'

export default function CheckoutForm({ templateId }: { templateId: string }) {
  const [state, formAction, pending] = useActionState(processCheckout, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success && state.waUrl) {
      // Buka WhatsApp di tab/jendela yang sama
      window.location.href = state.waUrl
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="templateId" value={templateId} />

      {state?.error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium">
          {state.error}
          {state.details && (
            <ul className="mt-2 list-disc list-inside text-xs opacity-80">
              {Object.entries(state.details).map(([field, msgs]) => (
                <li key={field}>{String(msgs)}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Lengkap</label>
        <input 
          type="text" 
          name="fullName" 
          required 
          className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all placeholder:text-text-muted/50" 
          placeholder="Misal: Budi Santoso" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Alamat Email</label>
        <input 
          type="email" 
          name="email" 
          required 
          className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all placeholder:text-text-muted/50" 
          placeholder="budi@example.com" 
        />
        <p className="text-[11px] text-text-muted mt-1">Akses login dan password akan dikirimkan ke email ini.</p>
      </div>

      <div className="space-y-2">
        <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nomor WhatsApp</label>
        <input 
          type="tel" 
          name="phone" 
          required 
          className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all placeholder:text-text-muted/50" 
          placeholder="081234567890" 
        />
      </div>

      <div className="pt-4 border-t border-rosegold/10">
        <button 
          type="submit" 
          disabled={pending}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-rosegold to-rosegold-light text-white text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-rosegold/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Memproses Pesanan...
            </>
          ) : 'Bayar Sekarang (Simulasi)'}
        </button>
        <p className="text-center text-[10px] text-text-muted mt-4">
          Dengan melakukan pembayaran, Anda menyetujui Syarat dan Ketentuan layanan KeNikahan.
        </p>
      </div>
    </form>
  )
}

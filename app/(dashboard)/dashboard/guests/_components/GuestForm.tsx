'use client'

import { useActionState, useRef, useEffect } from 'react'
import { addGuest } from '../actions'

export default function GuestForm({ invitationId }: { invitationId: string }) {
  const [state, formAction, pending] = useActionState(addGuest, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <div className="bg-black/30 border border-white/5 p-4 rounded-2xl w-full md:w-auto">
      <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Tambah Tamu Manual</h3>
      
      {state?.error && (
        <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-medium">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="mb-3 p-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-xs font-medium">
          Berhasil ditambahkan!
        </div>
      )}

      <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-2">
        <input type="hidden" name="invitationId" value={invitationId} />
        <input 
          type="text" 
          name="name" 
          placeholder="Nama Lengkap Tamu" 
          required
          className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50" 
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="No. HP / WA (Opsional)" 
          className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50" 
        />
        <button 
          type="submit" 
          disabled={pending}
          className="bg-amber-500 text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {pending ? '...' : 'Tambah'}
        </button>
      </form>
    </div>
  )
}

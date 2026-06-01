'use client'

import { useState } from 'react'
import { Wish } from '@/lib/types/invitation'

type Props = {
    invitationId: string
    wishes: Wish[]
    onWishAdded: (wish: Wish) => void
}

function timeAgo(dateStr: string | Date) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 1) return 'Baru saja'
    if (mins < 60) return `${mins} menit lalu`
    if (hours < 24) return `${hours} jam lalu`
    return `${days} hari lalu`
}

export default function WishSection({ invitationId, wishes, onWishAdded }: Props) {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/wish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    invitationId,
                    name,
                    message,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit wish');
            }

            const data = await response.json();
            
            // Map Prisma fields to existing Wish type if needed
            // (Standardizing created_at to string or Date as expected by Wish type)
            onWishAdded(data as Wish)
            setSent(true)
            setName('')
            setMessage('')
            setTimeout(() => setSent(false), 3000)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="py-20 px-6 bg-stone-100">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-amber-700/60 text-xs tracking-[0.4em] uppercase mb-3">
                        Ucapan & Doa
                    </p>
                    <h2 className="text-stone-800 text-2xl"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        Tulis ucapanmu
                    </h2>
                </div>

                {/* Form ucapan */}
                <form onSubmit={handleSubmit}
                      className="bg-white rounded-2xl border border-stone-100
                         shadow-sm p-6 mb-8 space-y-4">
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nama kamu"
                        required
                        className="w-full border border-stone-200 rounded-xl px-4 py-3
                       text-sm focus:outline-none focus:ring-2
                       focus:ring-amber-400/50 focus:border-amber-400
                       bg-stone-50"
                    />
                    <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Tulis doa dan ucapan untuk pengantin..."
                        rows={3}
                        required
                        className="w-full border border-stone-200 rounded-xl px-4 py-3
                       text-sm focus:outline-none focus:ring-2
                       focus:ring-amber-400/50 focus:border-amber-400
                       bg-stone-50 resize-none"
                    />

                    {sent && (
                        <p className="text-green-600 text-sm text-center">
                            ✨ Ucapan terkirim! Terima kasih.
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-stone-900 text-amber-200 py-3 rounded-xl
                       text-sm tracking-wider font-medium hover:bg-stone-800
                       transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Mengirim...' : 'Kirim Ucapan 💌'}
                    </button>
                </form>

                {/* Daftar ucapan */}
                <div className="space-y-4">
                    {wishes.length === 0 ? (
                        <p className="text-center text-stone-400 text-sm py-8">
                            Belum ada ucapan. Jadilah yang pertama! 🌸
                        </p>
                    ) : (
                        wishes.map(wish => (
                            <div key={wish.id}
                                 className="bg-white rounded-2xl p-5 border border-stone-100">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex
                                    items-center justify-center text-amber-700
                                    text-sm font-medium">
                                            {wish.name.charAt(0).toUpperCase()}
                                        </div>
                                        <p className="font-medium text-stone-800 text-sm">
                                            {wish.name}
                                        </p>
                                    </div>
                                    <span className="text-stone-400 text-xs">
                    {timeAgo(wish.createdAt)}
                  </span>
                                </div>
                                <p className="text-stone-600 text-sm leading-relaxed pl-11">
                                    {wish.message}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}
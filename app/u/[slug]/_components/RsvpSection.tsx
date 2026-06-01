'use client'

import { useState } from 'react'

type Props = { invitationId: string }

export default function RsvpSection({ invitationId }: Props) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [guestCount, setGuestCount] = useState(1)
    const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | ''>('')
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!attendance) return setError('Pilih konfirmasi kehadiran dulu')
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    invitationId,
                    name,
                    phone,
                    guestCount,
                    attendance,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit RSVP');
            }

            setDone(true);
        } catch {
            setError('Gagal mengirim RSVP. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="py-20 px-6 bg-[#faf8f5]">
            <div className="max-w-lg mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-amber-700/60 text-xs tracking-[0.4em] uppercase mb-3">
                        Konfirmasi Kehadiran
                    </p>
                    <h2 className="text-stone-800 text-2xl"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        Apakah kamu hadir?
                    </h2>
                    <p className="text-stone-400 text-sm mt-2">
                        Mohon konfirmasi kehadiran sebelum acara berlangsung
                    </p>
                </div>

                {done ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl
                          p-8 text-center">
                        <div className="text-4xl mb-3">🎊</div>
                        <h3 className="font-semibold text-stone-800 text-lg mb-1"
                            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                            {attendance === 'hadir'
                                ? 'Terima kasih! Sampai jumpa di hari bahagia kami.'
                                : 'Terima kasih atas responnya. Doa kami tetap menyertai.'}
                        </h3>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}
                          className="bg-white rounded-2xl border border-stone-100
                           shadow-sm p-8 space-y-5">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600
                              text-sm rounded-xl px-4 py-3">
                                {error}
                            </div>
                        )}

                        {/* Nama */}
                        <div>
                            <label className="block text-xs text-stone-500 tracking-wider
                                uppercase mb-2">
                                Nama
                            </label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Nama lengkap kamu"
                                required
                                className="w-full border border-stone-200 rounded-xl px-4 py-3
                           text-sm text-stone-800 focus:outline-none
                           focus:ring-2 focus:ring-amber-400/50
                           focus:border-amber-400 bg-stone-50"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-xs text-stone-500 tracking-wider
                                uppercase mb-2">
                                No. WhatsApp <span className="text-stone-300">(opsional)</span>
                            </label>
                            <input
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder="08xxxxxxxxxx"
                                type="tel"
                                className="w-full border border-stone-200 rounded-xl px-4 py-3
                           text-sm text-stone-800 focus:outline-none
                           focus:ring-2 focus:ring-amber-400/50
                           focus:border-amber-400 bg-stone-50"
                            />
                        </div>

                        {/* Jumlah tamu */}
                        <div>
                            <label className="block text-xs text-stone-500 tracking-wider
                                uppercase mb-2">
                                Jumlah Tamu
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                                    className="w-10 h-10 rounded-full border border-stone-200
                             flex items-center justify-center text-stone-600
                             hover:bg-stone-100 transition-colors text-lg"
                                >
                                    −
                                </button>
                                <span className="text-stone-800 font-medium text-lg w-8
                                 text-center">
                  {guestCount}
                </span>
                                <button
                                    type="button"
                                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                                    className="w-10 h-10 rounded-full border border-stone-200
                             flex items-center justify-center text-stone-600
                             hover:bg-stone-100 transition-colors text-lg"
                                >
                                    +
                                </button>
                                <span className="text-stone-400 text-sm">orang</span>
                            </div>
                        </div>

                        {/* Kehadiran */}
                        <div>
                            <label className="block text-xs text-stone-500 tracking-wider
                                uppercase mb-3">
                                Konfirmasi Kehadiran
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {([
                                    { value: 'hadir', label: '✅ Hadir' },
                                    { value: 'tidak_hadir', label: '❌ Tidak hadir' },
                                ] as const).map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setAttendance(opt.value)}
                                        className={`py-3 rounded-xl text-sm font-medium border
                                transition-all ${
                                            attendance === opt.value
                                                ? 'bg-amber-600 border-amber-600 text-white shadow-sm'
                                                : 'border-stone-200 text-stone-600 hover:border-amber-300 bg-white'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-stone-900 text-amber-200 py-3.5 rounded-xl
                         text-sm tracking-wider font-medium hover:bg-stone-800
                         transition-colors disabled:opacity-50 mt-2"
                        >
                            {loading ? 'Mengirim...' : 'Kirim Konfirmasi'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    )
}
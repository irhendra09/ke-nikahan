'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import Link from 'next/link'

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const callbackError = searchParams.get('error')

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Gagal login');
            }

            router.push('/dashboard')
            router.refresh()
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Gagal masuk';
            setError(message);
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <div className="mb-8">
                <h2 className="text-2xl font-bold font-serif text-text-dark">
                    Selamat datang kembali
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Silakan masuk untuk mengelola undangan Anda
                </p>
            </div>

            {/* Error Messages */}
            {(callbackError || error) && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-medium
                        rounded-lg px-4 py-3 mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {callbackError ? 'Terjadi kesalahan saat login. Silakan coba lagi.' : error}
                </div>
            )}

            {/* Form Login */}
            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        required
                        className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-2.5
                       text-sm text-text-dark focus:outline-none focus:ring-1
                       focus:ring-rosegold/50 focus:border-rosegold/50
                       transition-all duration-200 placeholder:text-text-muted/50"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Password
                        </label>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-2.5
                       text-sm text-text-dark focus:outline-none focus:ring-1
                       focus:ring-rosegold/50 focus:border-rosegold/50
                       transition-all duration-200 placeholder:text-text-muted/50"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-rosegold to-rosegold-light text-white rounded-xl py-3 text-sm
                     font-bold hover:shadow-lg hover:shadow-rosegold/20 transition-all active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Memproses...
                        </span>
                    ) : 'Masuk'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
                Belum punya akun?{' '}
                <Link href="/register" className="text-rosegold font-bold hover:text-rosegold-light transition-colors">
                    Daftar sekarang
                </Link>
            </p>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col items-center justify-center min-h-[400px]">
                <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-sm text-gray-500 mt-4">Memuat...</p>
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}

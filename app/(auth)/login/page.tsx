'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import Link from 'next/link'

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingGoogle, setLoadingGoogle] = useState(false)
    const [error, setError] = useState('')

    const callbackError = searchParams.get('error')

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(
                error.message === 'Invalid login credentials'
                    ? 'Email atau password salah'
                    : error.message
            )
            setLoading(false)
            return
        }

        router.push('/dashboard')
        router.refresh()
    }

    async function handleGoogleLogin() {
        setLoadingGoogle(true)
        setError('')

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError('Gagal login dengan Google')
            setLoadingGoogle(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900">
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

            {/* Google Login */}
            <button
                onClick={handleGoogleLogin}
                disabled={loadingGoogle}
                className="w-full flex items-center justify-center gap-3 border
                   border-gray-200 rounded-xl py-2.5 text-sm font-medium
                   text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
                {loadingGoogle ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Menghubungkan...
                    </span>
                ) : (
                    <>
                        <svg width="18" height="18" viewBox="0 0 18 18">
                            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                            <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
                            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 6.294C4.672 4.167 6.656 3.58 9 3.58z"/>
                        </svg>
                        Masuk dengan Google
                    </>
                )}
            </button>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">atau dengan email</span>
                <div className="flex-1 h-px bg-gray-100" />
            </div>

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
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5
                       text-sm focus:outline-none focus:ring-2
                       focus:ring-black/5 focus:border-gray-900
                       transition-all duration-200"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-xs text-gray-400 hover:text-black transition-colors"
                        >
                            Lupa?
                        </Link>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5
                       text-sm focus:outline-none focus:ring-2
                       focus:ring-black/5 focus:border-gray-900
                       transition-all duration-200"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm
                     font-semibold hover:bg-black transition-all active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-black/5"
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
                <Link href="/register" className="text-gray-900 font-semibold hover:underline decoration-gray-300 underline-offset-4">
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
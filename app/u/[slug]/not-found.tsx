import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center
                    bg-stone-50 text-center px-4">
            <p className="text-6xl mb-4">💌</p>
            <h1 className="text-2xl font-semibold text-stone-800 mb-2">
                Undangan tidak ditemukan
            </h1>
            <p className="text-stone-500 text-sm mb-6">
                Link undangan mungkin sudah kadaluarsa atau salah ketik.
            </p>
            <Link href="/"
                  className="text-sm text-stone-600 border border-stone-300
                       px-5 py-2.5 rounded-full hover:bg-stone-100
                       transition-colors">
                Kembali ke beranda
            </Link>
        </div>
    )
}
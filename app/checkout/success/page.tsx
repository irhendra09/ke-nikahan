import Link from 'next/link'

export const metadata = {
  title: 'Pembayaran Berhasil - KeNikahan',
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#141417] border border-white/10 rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-green-500 opacity-50" />
        
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white font-heading mb-3">Pesanan Berhasil!</h1>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
          Terima kasih telah memesan. Akun Dashboard Anda telah dibuat dan <strong>Password</strong> telah dikirimkan ke alamat email Anda.
        </p>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-left mb-8">
          <p className="text-xs text-amber-400 font-medium mb-1">Cek Kotak Masuk (Inbox) atau Spam Email Anda</p>
          <p className="text-[11px] text-zinc-500">Gunakan email yang Anda daftarkan dan password dari email tersebut untuk login.</p>
        </div>

        <Link 
          href="/login" 
          className="block w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Login ke Dashboard
        </Link>
      </div>
    </div>
  )
}

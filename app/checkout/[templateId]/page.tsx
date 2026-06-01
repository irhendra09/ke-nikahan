import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CheckoutForm from './_components/CheckoutForm'
import Image from 'next/image'

export const metadata = {
  title: 'Checkout - KeNikahan',
}

interface PageProps {
  params: Promise<{ templateId: string }>
}

export default async function CheckoutPage({ params }: PageProps) {
  const { templateId } = await params

  // Validasi templateId format uuid
  if (!templateId || templateId.length < 32) {
    notFound()
  }

  const template = await prisma.template.findUnique({
    where: { id: templateId }
  })

  if (!template || !template.isActive) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-ivory text-text-dark py-20 px-6">
      <div className="max-w-4xl mx-auto mt-10">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3 text-text-dark">Selesaikan Pesanan Anda</h1>
          <p className="text-text-muted text-sm">Isi data diri di bawah ini untuk mendapatkan akses penuh ke Dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          
          {/* Rangkuman Pesanan */}
          <div className="md:col-span-2 bg-white border border-rosegold/20 rounded-3xl p-6 shadow-xl shadow-rosegold/5 order-2 md:order-1">
            <h2 className="text-lg font-bold mb-6 font-serif border-b border-rosegold/10 pb-4 text-text-dark">Ringkasan Pesanan</h2>
            
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-28 bg-ivory-dark rounded-xl relative overflow-hidden flex-shrink-0 border border-rosegold/20">
                {template.thumbnailUrl ? (
                  <Image src={template.thumbnailUrl} alt={template.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-text-muted">No Img</div>
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold text-rosegold uppercase tracking-widest">{template.category.replace('_', ' ')}</span>
                <h3 className="font-bold text-text-dark mb-1 leading-tight">{template.name}</h3>
                <p className="text-sm text-text-muted">Lisensi 6 Bulan (Aktif)</p>
              </div>
            </div>

            <div className="space-y-3 text-sm border-t border-rosegold/10 pt-4 mb-4">
              <div className="flex justify-between text-text-muted">
                <span>Harga Tema</span>
                <span>Rp {template.basePrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Biaya Admin</span>
                <span>Gratis (Promo)</span>
              </div>
            </div>
            
            <div className="flex justify-between text-text-dark font-bold text-lg border-t border-rosegold/10 pt-4">
              <span>Total Bayar</span>
              <span className="text-rosegold">Rp {template.basePrice.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Form Checkout */}
          <div className="md:col-span-3 bg-white border border-rosegold/20 rounded-3xl p-6 md:p-8 shadow-xl shadow-rosegold/5 order-1 md:order-2">
            <CheckoutForm templateId={template.id} />
          </div>

        </div>
      </div>
    </div>
  )
}

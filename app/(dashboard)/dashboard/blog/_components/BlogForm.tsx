'use client'

import { useActionState } from 'react'

interface BlogFormProps {
  action: (state: any, payload: FormData) => Promise<any>;
  initialData?: {
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string | null;
    imageUrl?: string | null;
    published?: boolean;
  };
  isEditing?: boolean;
}

export default function BlogForm({ action, initialData, isEditing }: BlogFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  const getVal = (key: keyof NonNullable<BlogFormProps['initialData']>) => initialData?.[key] || '';

  return (
    <div className="bg-[#0c0c0f] border border-white/[0.06] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50" />

      {state?.error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium">
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

      <form action={formAction} className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">Judul Artikel</label>
            <input name="title" defaultValue={getVal('title') as string} required className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all" placeholder="Misal: Tips Memilih Tema Pernikahan" />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">Slug (URL)</label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-white/10 bg-white/[0.02] text-zinc-500 text-sm">
                kenikahan.com/blog/
              </span>
              <input name="slug" defaultValue={getVal('slug') as string} required className="flex-1 min-w-0 bg-[#141417] border border-white/10 rounded-r-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all" placeholder="tips-memilih-tema" />
            </div>
            <p className="text-[11px] text-zinc-600 mt-1">Harus unik, huruf kecil, angka, dan strip.</p>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">URL Gambar Sampul (Opsional)</label>
            <input type="url" name="imageUrl" defaultValue={getVal('imageUrl') as string} className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all" placeholder="https://contoh.com/gambar.jpg" />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">Kutipan Pendek (Excerpt)</label>
            <textarea name="excerpt" defaultValue={getVal('excerpt') as string} rows={3} className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all resize-none" placeholder="Ringkasan singkat tentang artikel ini..." />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">Konten Artikel</label>
            <textarea name="content" defaultValue={getVal('content') as string} required rows={10} className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all resize-y" placeholder="Tulis konten artikel di sini..." />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input type="checkbox" name="published" id="published" defaultChecked={initialData?.published} className="w-4 h-4 rounded bg-[#141417] border-white/10 text-amber-500 focus:ring-amber-500/50" />
            <label htmlFor="published" className="text-sm font-medium text-white cursor-pointer">
              Publish Artikel Ini
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-8 mt-8 border-t border-white/[0.06]">
          <button type="button" onClick={() => window.history.back()} className="px-6 py-3 rounded-xl text-[13px] font-bold text-zinc-400 hover:text-white transition-colors">
            Batal
          </button>
          <button type="submit" disabled={pending} className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[13px] font-bold hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {pending ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Buat Artikel')}
          </button>
        </div>
      </form>
    </div>
  )
}

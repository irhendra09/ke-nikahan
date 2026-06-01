'use client'

import { useActionState, useState } from 'react'
import { InvitationContent } from '@/lib/types/invitation'

// Tipe props yang dibutuhkan form
interface InvitationFormProps {
  action: (state: any, payload: FormData) => Promise<any>;
  initialData?: {
    slug?: string;
    templateId?: string;
    status?: string;
    eventDate?: string | null;
    content?: Partial<InvitationContent>;
  };
  templates: { id: string; name: string; category: string }[];
  isEditing?: boolean;
  isUserMode?: boolean;
  readOnlyInfo?: {
    slug?: string;
    templateName?: string;
    status?: string;
    expiresAt?: string | null;
  };
}

export default function InvitationForm({ action, initialData, templates, isEditing, isUserMode, readOnlyInfo }: InvitationFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [activeTab, setActiveTab] = useState<'basic' | 'event' | 'location' | 'media'>('basic');

  // Helper untuk mendapatkan nilai awal
  const getVal = (key: keyof NonNullable<InvitationFormProps['initialData']>) => initialData?.[key] || '';
  const getContentVal = (key: keyof InvitationContent) => initialData?.content?.[key] || '';

  // Tab Navigation
  const tabs = [
    { id: 'basic', label: 'Info Dasar' },
    { id: 'event', label: 'Waktu Acara' },
    { id: 'location', label: 'Lokasi' },
    { id: 'media', label: 'Media & Galeri' },
    { id: 'gift', label: 'Kirim Hadiah' },
  ] as const;

  return (
    <div className="bg-white border border-rosegold/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rosegold to-rosegold-light opacity-50" />

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

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-rosegold/10 pb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-rosegold/10 text-rosegold border border-rosegold/20'
                : 'text-text-muted hover:text-text-dark hover:bg-rosegold/5 border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form action={formAction} className="space-y-8">
        
        {/* TAB: INFO DASAR */}
        <div className={activeTab === 'basic' ? 'block space-y-6' : 'hidden'}>

          {/* Read-only info banner for user mode */}
          {isUserMode && readOnlyInfo && (
            <div className="p-5 bg-ivory/50 border border-rosegold/10 rounded-2xl space-y-3 mb-2">
              <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mb-3">Info Undangan (Dikelola Admin)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Slug URL</p>
                  <p className="text-sm text-rosegold font-mono mt-0.5">/{readOnlyInfo.slug}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Template</p>
                  <p className="text-sm text-text-dark mt-0.5">{readOnlyInfo.templateName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</p>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    readOnlyInfo.status === 'active' ? 'bg-green-500/15 text-green-400 border border-green-500/20' :
                    readOnlyInfo.status === 'expired' ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
                    'bg-zinc-500/15 text-text-muted border border-zinc-500/20'
                  }`}>{readOnlyInfo.status}</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Berlaku Hingga</p>
                  <p className="text-sm text-text-dark mt-0.5">
                    {readOnlyInfo.expiresAt ? new Date(readOnlyInfo.expiresAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Mempelai Wanita</label>
                <input name="bride_name" defaultValue={getContentVal('bride_name') as string} required className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Siti Aminah" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Panggilan Wanita</label>
                <input name="bride_nickname" defaultValue={getContentVal('bride_nickname') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Siti" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Ayah Mempelai Wanita</label>
                <input name="bride_father_name" defaultValue={getContentVal('bride_father_name') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Bpk. Ahmad" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Ibu Mempelai Wanita</label>
                <input name="bride_mother_name" defaultValue={getContentVal('bride_mother_name') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Ibu Aminah" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Mempelai Pria</label>
                <input name="groom_name" defaultValue={getContentVal('groom_name') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Budi Santoso" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Panggilan Pria</label>
                <input name="groom_nickname" defaultValue={getContentVal('groom_nickname') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Budi" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Ayah Mempelai Pria</label>
                <input name="groom_father_name" defaultValue={getContentVal('groom_father_name') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Bpk. Santoso" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Ibu Mempelai Pria</label>
                <input name="groom_mother_name" defaultValue={getContentVal('groom_mother_name') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Ibu Endang" />
              </div>
            </div>
          </div>

          {/* Admin-only fields */}
          {!isUserMode && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Slug (URL)</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-rosegold/20 bg-ivory/50 text-text-muted text-sm">
                      kenikahan.com/u/
                    </span>
                    <input name="slug" defaultValue={getVal('slug') as string} required className="flex-1 min-w-0 bg-ivory-dark border border-rosegold/20 rounded-r-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="siti-budi" />
                  </div>
                  <p className="text-[11px] text-text-muted mt-1">Harus unik, huruf kecil, angka, dan strip.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Template</label>
                  <select name="templateId" defaultValue={getVal('templateId') as string} required className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all">
                    <option value="">Pilih Template...</option>
                    {templates.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Tanggal Acara</label>
                  <input type="date" name="eventDate" defaultValue={getVal('eventDate') ? new Date(getVal('eventDate') as string).toISOString().split('T')[0] : ''} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all " />
                </div>

                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Masa Aktif</label>
                  <select name="activePeriod" defaultValue="6" className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all">
                    <option value="3">3 Bulan</option>
                    <option value="6">6 Bulan</option>
                    <option value="9">9 Bulan</option>
                    <option value="12">1 Tahun</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Status</label>
                  <select name="status" defaultValue={(getVal('status') as string) || 'draft'} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all">
                    <option value="draft">Draft (Belum Publik)</option>
                    <option value="active">Active (Publik)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Tanggal acara for user mode (user can edit this) */}
          {isUserMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Tanggal Acara</label>
                <input type="date" name="eventDate" defaultValue={getVal('eventDate') ? new Date(getVal('eventDate') as string).toISOString().split('T')[0] : ''} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all " />
              </div>
            </div>
          )}
        </div>

        {/* TAB: ACARA */}
        <div className={activeTab === 'event' ? 'block space-y-6' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Waktu Akad/Pemberkatan</label>
              <input name="akad_time" defaultValue={getContentVal('akad_time') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: 08:00 - 10:00 WIB" />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Waktu Resepsi</label>
              <input name="reception_time" defaultValue={getContentVal('reception_time') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: 11:00 - Selesai" />
            </div>
          </div>
        </div>

        {/* TAB: LOKASI */}
        <div className={activeTab === 'location' ? 'block space-y-6' : 'hidden'}>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Tempat (Venue)</label>
            <input name="venue_name" defaultValue={getContentVal('venue_name') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Gedung Serbaguna Senayan" />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Alamat Lengkap</label>
            <textarea name="venue_address" defaultValue={getContentVal('venue_address') as string} rows={3} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all resize-none" placeholder="Jl. Pintu Satu Senayan..." />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Link Google Maps (URL)</label>
            <input type="url" name="maps_url" defaultValue={getContentVal('maps_url') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="https://maps.google.com/..." />
          </div>
        </div>

        {/* TAB: MEDIA */}
        <div className={activeTab === 'media' ? 'block space-y-6' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">URL Foto Cover</label>
              <input type="url" name="cover_photo" defaultValue={getContentVal('cover_photo') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="https://contoh.com/foto.jpg" />
              <p className="text-[11px] text-text-muted mt-1">Masukkan URL link gambar langsung.</p>
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">URL Foto Mempelai Wanita</label>
              <input type="url" name="bride_photo" defaultValue={getContentVal('bride_photo') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="https://contoh.com/wanita.jpg" />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">URL Foto Mempelai Pria</label>
              <input type="url" name="groom_photo" defaultValue={getContentVal('groom_photo') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="https://contoh.com/pria.jpg" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">URL Musik Latar (MP3)</label>
            <input type="url" name="music_url" defaultValue={getContentVal('music_url') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="https://contoh.com/musik.mp3" />
            <p className="text-[11px] text-text-muted mt-1">Masukkan URL langsung ke file MP3.</p>
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">URL Galeri & Video (Pisahkan dengan koma)</label>
            <textarea name="gallery" defaultValue={((getContentVal('gallery') as string[]) || []).join(', ')} rows={4} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all resize-none" placeholder="https://img1.jpg, https://youtube.com/watch?v=..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-rosegold/10">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Kutipan (Quote)</label>
              <textarea name="quote" defaultValue={getContentVal('quote') as string} rows={3} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all resize-none" placeholder="Dan di antara tanda-tanda kebesaran-Nya..." />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Sumber Kutipan</label>
              <input name="quote_source" defaultValue={getContentVal('quote_source') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="QS. Ar-Rum: 21" />
            </div>
          </div>
        </div>

        {/* TAB: KIRIM HADIAH */}
        <div className={activeTab === 'gift' ? 'block space-y-6' : 'hidden'}>
          <div className="bg-rosegold/10 border border-rosegold/20 rounded-2xl p-6">
            <h3 className="text-rosegold font-bold mb-2">Amplop Digital (Opsional)</h3>
            <p className="text-sm text-text-muted mb-6">Tambahkan nomor rekening agar tamu dapat memberikan hadiah secara digital.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Nama Bank</label>
                <input name="bank_name" defaultValue={getContentVal('bank_name') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: BCA, Mandiri, dll" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">No. Rekening</label>
                <input name="bank_account_number" defaultValue={getContentVal('bank_account_number') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: 1234567890" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Atas Nama</label>
                <input name="bank_account_name" defaultValue={getContentVal('bank_account_name') as string} className="w-full bg-ivory-dark border border-rosegold/20 rounded-xl px-4 py-3 text-sm text-text-dark focus:outline-none focus:border-rosegold/50 focus:ring-1 focus:ring-rosegold/50 transition-all" placeholder="Misal: Budi Santoso" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-8 mt-8 border-t border-rosegold/10">
          <button type="button" onClick={() => window.history.back()} className="px-6 py-3 rounded-xl text-[13px] font-bold text-text-muted hover:text-text-dark transition-colors">
            Batal
          </button>
          <button type="submit" disabled={pending} className="px-8 py-3 rounded-xl bg-gradient-to-r from-rosegold to-rosegold-light text-text-dark text-[13px] font-bold hover:shadow-lg hover:shadow-rosegold/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {pending ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Buat Undangan')}
          </button>
        </div>
      </form>
    </div>
  )
}

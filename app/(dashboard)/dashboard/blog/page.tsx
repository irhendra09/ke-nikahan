import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DeletePostButton from './_components/DeletePostButton'

export const metadata = {
  title: 'Manajemen Blog | KeNikahan Admin',
}

export default async function BlogPage() {
  const session = await requireAuth()

  const profile = await prisma.profile.findUnique({
    where: { id: session.userId },
    select: { role: true },
  })

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { fullName: true } } }
  })

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-zinc-500 uppercase tracking-wider hover:text-amber-500 transition-colors"
          >
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            Manajemen Blog
          </h1>
          <p className="text-sm text-zinc-400">
            {posts.length} artikel terdaftar di sistem
          </p>
        </div>
        
        <Link
          href="/dashboard/blog/create"
          className="px-6 py-3 rounded-xl bg-amber-500 text-black text-[13px] font-bold hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20"
        >
          + Tulis Artikel
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="p-20 text-center bg-black/20 border border-dashed border-white/[0.06] rounded-[2rem]">
          <p className="text-zinc-500 text-sm">Belum ada artikel yang dibuat.</p>
        </div>
      ) : (
        <div className="bg-black/20 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Judul</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Slug</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Tanggal Dibuat</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors truncate max-w-[250px]">
                          {post.title}
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-1">Oleh {post.author.fullName || 'Admin'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-amber-500/60 font-mono italic truncate max-w-[150px]">/{post.slug}</span>
                    </td>
                    <td className="px-6 py-5">
                      {post.published ? (
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-green-500/15 text-green-400 border-green-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-zinc-500/15 text-zinc-400 border-zinc-500/20">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-zinc-400">
                        {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/blog/edit/${post.id}`}
                          className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-400 hover:bg-amber-500/20 transition-all"
                        >
                          Edit
                        </Link>
                        <DeletePostButton id={post.id} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

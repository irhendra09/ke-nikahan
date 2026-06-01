import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import BlogForm from '../../_components/BlogForm'
import { updatePost } from '../../actions'

export const metadata = {
  title: 'Edit Artikel | KeNikahan Admin',
}

type Props = { params: Promise<{ id: string }> }

export default async function EditBlogPage({ params }: Props) {
  const session = await requireAuth()
  const { id } = await params

  const profile = await prisma.profile.findUnique({
    where: { id: session.userId },
    select: { role: true },
  })

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  const post = await prisma.post.findUnique({
    where: { id }
  })

  if (!post) {
    notFound()
  }

  const updateAction = updatePost.bind(null, id)

  return (
    <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
        <div className="space-y-4">
          <Link
            href="/dashboard/blog"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-zinc-500 uppercase tracking-wider hover:text-amber-500 transition-colors"
          >
            ← Kembali ke Daftar Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            Edit Artikel
          </h1>
          <p className="text-sm text-zinc-400">
            Perbarui konten artikel Anda di sini.
          </p>
        </div>
      </div>

      <BlogForm action={updateAction} initialData={post} isEditing />
    </div>
  )
}

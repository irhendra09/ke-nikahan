'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/session'

const blogSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  slug: z.string().min(3, "Slug minimal 3 karakter").regex(/^[a-z0-9-]+$/, "Slug hanya boleh berisi huruf kecil, angka, dan strip (-)"),
  content: z.string().min(10, "Konten wajib diisi minimal 10 karakter"),
  excerpt: z.string().optional(),
  imageUrl: z.string().url("Format URL gambar tidak valid").optional().or(z.literal('')),
  published: z.string().optional(), // from checkbox
})

export async function createPost(prevState: any, formData: FormData) {
  try {
    const session = await requireAuth();

    const profile = await prisma.profile.findUnique({
      where: { id: session.userId }
    });

    if (profile?.role !== 'admin') {
      return { error: "Akses Ditolak. Hanya admin yang dapat membuat artikel." };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedData = blogSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { 
        error: "Validasi gagal", 
        details: validatedData.error.flatten().fieldErrors 
      };
    }

    const data = validatedData.data;

    // Check slug uniqueness
    const existing = await prisma.post.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return { error: "Slug sudah digunakan, silakan pilih yang lain." };
    }

    await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl || null,
        published: data.published === 'on',
        authorId: session.userId,
      }
    });

  } catch (error: any) {
    console.error("Failed to create post:", error);
    return { error: error.message || "Gagal membuat artikel." };
  }

  revalidatePath('/dashboard/blog');
  revalidatePath('/');
  redirect('/dashboard/blog');
}

export async function updatePost(id: string, prevState: any, formData: FormData) {
  try {
    const session = await requireAuth();

    const profile = await prisma.profile.findUnique({
      where: { id: session.userId }
    });

    if (profile?.role !== 'admin') {
      return { error: "Akses Ditolak. Hanya admin yang dapat mengedit artikel." };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedData = blogSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { 
        error: "Validasi gagal", 
        details: validatedData.error.flatten().fieldErrors 
      };
    }

    const data = validatedData.data;

    // Check slug uniqueness excluding self
    const existing = await prisma.post.findUnique({ where: { slug: data.slug } });
    if (existing && existing.id !== id) {
      return { error: "Slug sudah digunakan, silakan pilih yang lain." };
    }

    await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl || null,
        published: data.published === 'on',
      }
    });

  } catch (error: any) {
    console.error("Failed to update post:", error);
    return { error: error.message || "Gagal memperbarui artikel." };
  }

  revalidatePath('/dashboard/blog');
  revalidatePath('/');
  redirect('/dashboard/blog');
}

export async function deletePost(id: string) {
  try {
    const session = await requireAuth();

    const profile = await prisma.profile.findUnique({
      where: { id: session.userId }
    });

    if (profile?.role !== 'admin') {
      throw new Error("Akses Ditolak. Hanya admin yang dapat menghapus artikel.");
    }

    await prisma.post.delete({
      where: { id }
    });

    revalidatePath('/dashboard/blog');
    revalidatePath('/');
  } catch (error: any) {
    console.error("Failed to delete post:", error);
    throw new Error(error.message || "Gagal menghapus artikel.");
  }
}

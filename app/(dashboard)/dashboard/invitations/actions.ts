'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/session'
import { InvitationContent } from '@/lib/types/invitation'
import { InvitationStatus } from '@prisma/client'

// Skema Validasi Form menggunakan Zod
const invitationSchema = z.object({
  slug: z.string().min(3, "Slug minimal 3 karakter").regex(/^[a-z0-9-]+$/, "Slug hanya boleh berisi huruf kecil, angka, dan strip (-)"),
  templateId: z.string().min(1, "Template harus dipilih"),
  eventDate: z.string().optional().nullable(),
  status: z.enum(['draft', 'active', 'expired']).default('draft'),
  activePeriod: z.enum(['3', '6', '9', '12']).default('6'),
  
  // Konten Undangan
  bride_name: z.string().min(1, "Nama mempelai wanita wajib diisi"),
  bride_nickname: z.string().optional(),
  bride_father_name: z.string().optional(),
  bride_mother_name: z.string().optional(),
  bride_photo: z.string().url("Format URL foto mempelai wanita tidak valid").optional().or(z.literal('')),
  groom_name: z.string().optional(),
  groom_nickname: z.string().optional(),
  groom_father_name: z.string().optional(),
  groom_mother_name: z.string().optional(),
  groom_photo: z.string().url("Format URL foto mempelai pria tidak valid").optional().or(z.literal('')),
  akad_time: z.string().optional(),
  reception_time: z.string().optional(),
  venue_name: z.string().optional(),
  venue_address: z.string().optional(),
  maps_url: z.string().url("Format URL Maps tidak valid").optional().or(z.literal('')),
  cover_photo: z.string().url("Format URL foto tidak valid").optional().or(z.literal('')),
  music_url: z.string().url("Format URL musik (MP3) tidak valid").optional().or(z.literal('')),
  quote: z.string().optional(),
  quote_source: z.string().optional(),
  gallery: z.string().optional(), // Di-parse sebagai comma separated
  bank_name: z.string().optional(),
  bank_account_name: z.string().optional(),
  bank_account_number: z.string().optional(),
})

// Fungsi Helper untuk generate slug unik
async function getUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await prisma.invitation.findUnique({
      where: { slug }
    });

    if (!existing || existing.id === excludeId) {
      isUnique = true;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  return slug;
}

export async function createInvitation(prevState: any, formData: FormData) {
  try {
    const session = await requireAuth();
    
    // Parse input
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = invitationSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { 
        error: "Validasi gagal", 
        details: validatedData.error.flatten().fieldErrors 
      };
    }

    const data = validatedData.data;

    // Pastikan slug unik
    const uniqueSlug = await getUniqueSlug(data.slug);

    // Parsing Gallery
    let galleryArray: string[] = [];
    if (data.gallery) {
      galleryArray = data.gallery.split(',').map(s => s.trim()).filter(s => s.length > 0 && s.startsWith('http'));
    }

    // Susun objek konten
    const content: InvitationContent = {
      bride_name: data.bride_name,
      bride_nickname: data.bride_nickname,
      bride_father_name: data.bride_father_name,
      bride_mother_name: data.bride_mother_name,
      bride_photo: data.bride_photo,
      groom_name: data.groom_name,
      groom_nickname: data.groom_nickname,
      groom_father_name: data.groom_father_name,
      groom_mother_name: data.groom_mother_name,
      groom_photo: data.groom_photo,
      akad_time: data.akad_time,
      reception_time: data.reception_time,
      venue_name: data.venue_name,
      venue_address: data.venue_address,
      maps_url: data.maps_url,
      cover_photo: data.cover_photo,
      music_url: data.music_url,
      quote: data.quote,
      quote_source: data.quote_source,
      gallery: galleryArray.length > 0 ? galleryArray : undefined,
      bank_name: data.bank_name,
      bank_account_name: data.bank_account_name,
      bank_account_number: data.bank_account_number,
    };

    // Parse tanggal
    let parsedEventDate = null;
    let expiresAt = new Date();
    
    if (data.eventDate) {
      parsedEventDate = new Date(data.eventDate);
      expiresAt = new Date(parsedEventDate);
    }
    
    // Tambahkan masa aktif bulan
    expiresAt.setMonth(expiresAt.getMonth() + parseInt(data.activePeriod));

    const invitation = await prisma.invitation.create({
      data: {
        userId: session.userId,
        templateId: data.templateId,
        slug: uniqueSlug,
        status: data.status as InvitationStatus,
        eventDate: parsedEventDate,
        expiresAt: expiresAt,
        content: content as any,
      }
    });

  } catch (error: any) {
    console.error("Failed to create invitation:", error);
    return { error: error.message || "Gagal membuat undangan." };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateInvitation(id: string, prevState: any, formData: FormData) {
  let existingSlug = '';
  
  try {
    const session = await requireAuth();
    
    // Ambil profile untuk cek role
    const profile = await prisma.profile.findUnique({
      where: { id: session.userId }
    });

    if (profile?.role !== 'admin') {
      return { error: "Akses Ditolak. Hanya admin yang dapat mengedit konten undangan." };
    }
    
    // Pastikan user memiliki undangan ini (Atau Admin bebas edit? Jika bebas, hapus validasi userId)
    // Jika Admin mengedit untuk pelanggan lain, kita perlu mematikan cek userId ini atau sesuaikan.
    // Asumsi: Admin bisa mengedit SEMUA undangan, tidak terikat pada session.userId
    const existing = await prisma.invitation.findUnique({
      where: { id }
    });

    if (!existing) {
      return { error: "Undangan tidak ditemukan" };
    }
    
    existingSlug = existing.slug;

    // Parse input
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = invitationSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { 
        error: "Validasi gagal", 
        details: validatedData.error.flatten().fieldErrors 
      };
    }

    const data = validatedData.data;

    // Pastikan slug unik (kecuali milik sendiri)
    const uniqueSlug = await getUniqueSlug(data.slug, id);

    // Parsing Gallery
    let galleryArray: string[] = [];
    if (data.gallery) {
      galleryArray = data.gallery.split(',').map(s => s.trim()).filter(s => s.length > 0 && s.startsWith('http'));
    }

    // Susun objek konten
    const content: InvitationContent = {
      bride_name: data.bride_name,
      bride_nickname: data.bride_nickname,
      bride_father_name: data.bride_father_name,
      bride_mother_name: data.bride_mother_name,
      bride_photo: data.bride_photo,
      groom_name: data.groom_name,
      groom_nickname: data.groom_nickname,
      groom_father_name: data.groom_father_name,
      groom_mother_name: data.groom_mother_name,
      groom_photo: data.groom_photo,
      akad_time: data.akad_time,
      reception_time: data.reception_time,
      venue_name: data.venue_name,
      venue_address: data.venue_address,
      maps_url: data.maps_url,
      cover_photo: data.cover_photo,
      music_url: data.music_url,
      quote: data.quote,
      quote_source: data.quote_source,
      gallery: galleryArray.length > 0 ? galleryArray : undefined,
      bank_name: data.bank_name,
      bank_account_name: data.bank_account_name,
      bank_account_number: data.bank_account_number,
    };

    // Parse tanggal
    let parsedEventDate = null;
    let expiresAt = new Date();

    if (data.eventDate) {
      parsedEventDate = new Date(data.eventDate);
      expiresAt = new Date(parsedEventDate);
    }
    
    // Tambahkan masa aktif bulan
    expiresAt.setMonth(expiresAt.getMonth() + parseInt(data.activePeriod));

    await prisma.invitation.update({
      where: { id },
      data: {
        templateId: data.templateId,
        slug: uniqueSlug,
        status: data.status as InvitationStatus,
        eventDate: parsedEventDate,
        expiresAt: expiresAt,
        content: content as any,
      }
    });
    
    existingSlug = uniqueSlug; // Update to the new slug if changed

  } catch (error: any) {
    console.error("Failed to update invitation:", error);
    return { error: error.message || "Gagal memperbarui undangan." };
  }

  revalidatePath('/dashboard');
  if (existingSlug) {
    revalidatePath(`/u/${existingSlug}`);
  }
  redirect('/dashboard');
}

// ── Skema Validasi untuk User (tanpa field admin-only) ──────────
const userInvitationSchema = z.object({
  // Konten Undangan
  bride_name: z.string().min(1, "Nama mempelai wanita wajib diisi"),
  bride_nickname: z.string().optional(),
  bride_father_name: z.string().optional(),
  bride_mother_name: z.string().optional(),
  bride_photo: z.string().url("Format URL foto mempelai wanita tidak valid").optional().or(z.literal('')),
  groom_name: z.string().optional(),
  groom_nickname: z.string().optional(),
  groom_father_name: z.string().optional(),
  groom_mother_name: z.string().optional(),
  groom_photo: z.string().url("Format URL foto mempelai pria tidak valid").optional().or(z.literal('')),
  akad_time: z.string().optional(),
  reception_time: z.string().optional(),
  venue_name: z.string().optional(),
  venue_address: z.string().optional(),
  maps_url: z.string().url("Format URL Maps tidak valid").optional().or(z.literal('')),
  cover_photo: z.string().url("Format URL foto tidak valid").optional().or(z.literal('')),
  music_url: z.string().url("Format URL musik (MP3) tidak valid").optional().or(z.literal('')),
  quote: z.string().optional(),
  quote_source: z.string().optional(),
  gallery: z.string().optional(),
  bank_name: z.string().optional(),
  bank_account_name: z.string().optional(),
  bank_account_number: z.string().optional(),
  eventDate: z.string().optional().nullable(),
})

export async function updateInvitationByUser(id: string, prevState: any, formData: FormData) {
  try {
    const session = await requireAuth();

    // Pastikan undangan milik user ini
    const existing = await prisma.invitation.findUnique({
      where: { id }
    });

    if (!existing) {
      return { error: "Undangan tidak ditemukan" };
    }

    if (existing.userId !== session.userId) {
      return { error: "Akses Ditolak. Anda hanya dapat mengedit undangan milik sendiri." };
    }

    // Parse input
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = userInvitationSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { 
        error: "Validasi gagal", 
        details: validatedData.error.flatten().fieldErrors 
      };
    }

    const data = validatedData.data;

    // Parsing Gallery
    let galleryArray: string[] = [];
    if (data.gallery) {
      galleryArray = data.gallery.split(',').map(s => s.trim()).filter(s => s.length > 0 && s.startsWith('http'));
    }

    // Susun objek konten
    const content: InvitationContent = {
      bride_name: data.bride_name,
      bride_nickname: data.bride_nickname,
      bride_father_name: data.bride_father_name,
      bride_mother_name: data.bride_mother_name,
      bride_photo: data.bride_photo,
      groom_name: data.groom_name,
      groom_nickname: data.groom_nickname,
      groom_father_name: data.groom_father_name,
      groom_mother_name: data.groom_mother_name,
      groom_photo: data.groom_photo,
      akad_time: data.akad_time,
      reception_time: data.reception_time,
      venue_name: data.venue_name,
      venue_address: data.venue_address,
      maps_url: data.maps_url,
      cover_photo: data.cover_photo,
      music_url: data.music_url,
      quote: data.quote,
      quote_source: data.quote_source,
      gallery: galleryArray.length > 0 ? galleryArray : undefined,
      bank_name: data.bank_name,
      bank_account_name: data.bank_account_name,
      bank_account_number: data.bank_account_number,
    };

    // Parse tanggal — hanya update eventDate, BUKAN expiresAt/status/slug/template
    let parsedEventDate = existing.eventDate;
    if (data.eventDate) {
      parsedEventDate = new Date(data.eventDate);
    }

    await prisma.invitation.update({
      where: { id },
      data: {
        content: content as any,
        eventDate: parsedEventDate,
        // Tidak mengubah: slug, templateId, status, expiresAt
      }
    });

  } catch (error: any) {
    console.error("Failed to update invitation (user):", error);
    return { error: error.message || "Gagal memperbarui undangan." };
  }

  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/edit-undangan/${id}`);
  redirect(`/dashboard/edit-undangan/${id}`);
}

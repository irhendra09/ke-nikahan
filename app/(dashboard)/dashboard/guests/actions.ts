'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addGuest(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const invitationId = formData.get('invitationId') as string

    if (!name || name.trim().length < 2) {
      return { error: 'Nama tamu terlalu pendek' }
    }

    if (!invitationId) {
      return { error: 'ID Undangan tidak valid' }
    }

    await prisma.guest.create({
      data: {
        name,
        phone: phone || null,
        invitationId,
      }
    })

    revalidatePath('/dashboard/guests')
    return { success: true }
  } catch (error: any) {
    console.error('Add Guest Error:', error)
    return { error: 'Terjadi kesalahan saat menambahkan tamu' }
  }
}

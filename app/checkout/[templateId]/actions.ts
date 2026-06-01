'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { sendEmail } from '@/lib/mail'
import { redirect } from 'next/navigation'
import crypto from 'crypto'

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Nama terlalu pendek"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(9, "Nomor HP tidak valid"),
  templateId: z.string().min(1),
})

function generateRandomPassword() {
  return crypto.randomBytes(4).toString('hex') // e.g. "a1b2c3d4"
}

// Helper untuk memastikan slug slug unik
async function getUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await prisma.invitation.findUnique({ where: { slug } });
    if (!existing) {
      isUnique = true;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
  return slug;
}

export async function processCheckout(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries())
    const validated = checkoutSchema.safeParse(rawData)

    if (!validated.success) {
      return { 
        error: "Validasi gagal", 
        details: validated.error.flatten().fieldErrors 
      }
    }

    const { fullName, email, phone, templateId } = validated.data

    // 1. Cek ketersediaan Template
    const template = await prisma.template.findUnique({ where: { id: templateId } })
    if (!template) {
      return { error: "Template tidak ditemukan" }
    }

    // 2. Buat atau temukan User
    let user = await prisma.profile.findUnique({ where: { email } })
    let isNewUser = false
    let rawPassword = ""

    if (!user) {
      isNewUser = true
      rawPassword = generateRandomPassword()
      const hashedPassword = await hash(rawPassword, 10)

      user = await prisma.profile.create({
        data: {
          email,
          password: hashedPassword,
          fullName,
          phone,
          role: 'user',
        }
      })
    }

    // 3. Buat Order (Mocking Pembayaran Sukses)
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        amount: template.basePrice,
        status: 'paid', // Karena ini mock payment, langsung paid
        packageType: 'basic',
        paidAt: new Date(),
        paymentGatewayId: `mock_trx_${Date.now()}`
      }
    })

    // 4. Buat Undangan (Draft)
    const baseSlug = fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const uniqueSlug = await getUniqueSlug(baseSlug || 'invitation')
    
    // Masa aktif default 6 bulan
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 6)

    const invitation = await prisma.invitation.create({
      data: {
        userId: user.id,
        templateId: template.id,
        orderId: order.id,
        slug: uniqueSlug,
        status: 'draft',
        expiresAt: expiresAt,
        content: {
          bride_name: "Nama Mempelai 1",
          groom_name: "Nama Mempelai 2",
        },
      }
    })

    // 5. Kirim Email (Hanya untuk pengguna baru)
    if (isNewUser) {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f59e0b;">Selamat Datang di KeNikahan!</h2>
          <p>Halo ${fullName},</p>
          <p>Terima kasih telah melakukan pemesanan. Akun dashboard Anda telah berhasil dibuat.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>URL Login:</strong> <a href="https://kenikahan.com/login">https://kenikahan.com/login</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong>Password:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; padding: 2px 6px; background: #e5e7eb; border-radius: 4px;">${rawPassword}</span></p>
          </div>
          <p>Silakan login untuk mulai mengedit detail undangan Anda. Demi keamanan, jangan berikan password ini kepada siapapun.</p>
          <br/>
          <p>Salam hangat,<br/>Tim KeNikahan</p>
        </div>
      `
      await sendEmail({
        to: email,
        subject: "Akses Dashboard KeNikahan Anda",
        html: emailHtml,
      })
    }

    const waMessage = `Halo Admin KeNikahan, saya baru saja memesan undangan digital.

*Detail Pesanan:*
Nama: ${fullName}
Email: ${email}
No HP: ${phone}
Template: ${template.name}
Total Bayar: Rp ${template.basePrice.toLocaleString('id-ID')}
Order ID: ${order.id}

Mohon informasi untuk metode pembayarannya. Terima kasih.`

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(waMessage)}`

    // Kembalikan flag success dan waUrl
    return { success: true, waUrl }
  } catch (error: any) {
    console.error("Checkout Error:", error)
    return { error: error.message || "Terjadi kesalahan saat memproses pesanan." }
  }
}

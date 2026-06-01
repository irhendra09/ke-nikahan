import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function requireAuth() {
    const session = await getSession()
    if (!session?.userId) redirect('/login')
    return session
}

export async function getCurrentUser() {
    const session = await getSession()
    if (!session?.userId) return null

    return prisma.profile.findUnique({
        where: { id: session.userId },
        select: { id: true, fullName: true, email: true, role: true },
    })
}
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/auth/LogoutButton'

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Double-check proteksi — middleware sudah handle ini,
    // tapi ini sebagai safety net
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center
                        justify-between">
                    <Link href="/dashboard"
                          className="text-lg font-semibold text-gray-900">
                        Undangan Digital
                    </Link>

                    <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">
              {profile?.full_name ?? user.email}
            </span>
                        <LogoutButton />
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    )
}
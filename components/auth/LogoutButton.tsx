'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const router = useRouter()
    const supabase = createClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors
                 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50"
        >
            Keluar
        </button>
    )
}
'use client'

import { useRouter } from 'next/navigation'

interface LogoutButtonProps {
    className?: string
}

export default function LogoutButton({ className }: LogoutButtonProps) {
    const router = useRouter()

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/login')
        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            className={className || "text-sm font-medium text-zinc-500 hover:text-amber-500 transition-colors"}
        >
            Logout
        </button>
    )
}

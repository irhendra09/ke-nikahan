import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Sidebar from './_components/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) redirect('/login')

  const profile = await prisma.profile.findUnique({
    where: { id: session.userId },
    select: { fullName: true, email: true, role: true },
  })

  return (
    <div className="min-h-screen bg-ivory text-text-dark flex font-sans">
      {/* Sidebar — client component with mobile toggle */}
      <Sidebar profile={profile} />

      {/* Content area */}
      <main className="flex-1 min-w-0 relative">
        {/* Top header bar */}
        <header className="h-16 border-b border-rosegold/10 bg-ivory/80 backdrop-blur-2xl flex items-center px-8 md:px-12 sticky top-0 z-10 justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile brand (shows when sidebar is hidden) */}
            <div className="md:hidden flex items-center gap-3 ml-12">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rosegold to-rosegold-light flex items-center justify-center text-white text-sm font-bold shadow-md shadow-rosegold/20">
                K
              </div>
              <span className="font-serif font-bold text-[15px] text-text-dark tracking-tight">
                KeNikahan
              </span>
            </div>

            {/* Desktop breadcrumb label */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
                Digital Workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Live Status
            </span>
          </div>
        </header>

        <div className="p-8 md:p-12 lg:p-20 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}

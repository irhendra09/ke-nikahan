'use client'

interface StatusBadgeProps {
  status: string
}

const STATUS_MAP: Record<string, { label: string; bg: string; color: string; dot: string }> = {
  active: { label: 'Aktif', bg: 'bg-green-500/10', color: 'text-green-400', dot: 'bg-green-500' },
  draft: { label: 'Draft', bg: 'bg-amber-500/10', color: 'text-amber-400', dot: 'bg-amber-500' },
  expired: { label: 'Kadaluarsa', bg: 'bg-red-500/10', color: 'text-red-400', dot: 'bg-red-500' },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.draft

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${s.bg} ${s.color}`}
    >
      <span className={`w-1 h-1 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

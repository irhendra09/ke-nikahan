'use client'

interface AttendanceBadgeProps {
  attendance: string
}

const ATTENDANCE_MAP: Record<string, { label: string; color: string; bg: string }> = {
  hadir: { label: 'Hadir', color: 'text-green-400', bg: 'bg-green-500/10' },
  tidak_hadir: { label: 'Tidak Hadir', color: 'text-red-400', bg: 'bg-red-500/10' },
  mungkin: { label: 'Mungkin', color: 'text-amber-400', bg: 'bg-amber-500/10' },
}

export default function AttendanceBadge({ attendance }: AttendanceBadgeProps) {
  const s = ATTENDANCE_MAP[attendance] ?? ATTENDANCE_MAP.mungkin

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.bg} ${s.color}`}>
      {s.label}
    </span>
  )
}

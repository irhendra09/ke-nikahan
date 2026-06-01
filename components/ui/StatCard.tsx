'use client'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent: string
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-8 relative overflow-hidden group transition-all hover:bg-[#141414]">
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity"
        style={{ background: accent }}
      />

      <div className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.3em] mb-3">
        {label}
      </div>

      <div className="text-5xl font-bold text-zinc-100 font-serif leading-none tracking-tighter">
        {value}
      </div>

      {sub && (
        <div className="text-[11px] text-zinc-500 mt-3 font-semibold tracking-wide">
          {sub}
        </div>
      )}
    </div>
  )
}

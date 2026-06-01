/**
 * Shared formatting utilities for the KeNikahan dashboard.
 *
 * All date / label helpers live here so every component
 * uses the same logic without duplicating code.
 */

/** Relative time label in Bahasa Indonesia (e.g. "5m lalu"). */
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)

  if (mins < 1) return 'Baru saja'
  if (mins < 60) return `${mins}m lalu`
  if (hours < 24) return `${hours}j lalu`
  return `${days}h lalu`
}

/** Short Indonesian date, e.g. "12 Des 2025". */
export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** Human-readable category label. */
export function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    nikah: 'Pernikahan',
    ulang_tahun: 'Ulang Tahun',
    khitanan: 'Khitanan',
    lainnya: 'Lainnya',
  }
  return map[cat] ?? cat
}

/** Days remaining until a given date (min 0). */
export function daysUntil(dateStr: string | null): number {
  if (!dateStr) return 0
  const diff = new Date(dateStr).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / 86_400_000))
}

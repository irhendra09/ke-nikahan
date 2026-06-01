'use client'

import { useState } from 'react'
import { deletePost } from '../actions'

export default function DeletePostButton({ id, title }: { id: string, title: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      setIsDeleting(true)
      try {
        await deletePost(id)
      } catch (error) {
        alert("Gagal menghapus artikel")
        setIsDeleting(false)
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] font-bold text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50"
    >
      {isDeleting ? 'Menghapus...' : 'Hapus'}
    </button>
  )
}

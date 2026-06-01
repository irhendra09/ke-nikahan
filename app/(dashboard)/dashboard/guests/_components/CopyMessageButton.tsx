'use client'

import { useState } from 'react'
import { InvitationContent } from '@/lib/types/invitation'

interface CopyMessageButtonProps {
  guestName: string
  invitationSlug: string
  content: InvitationContent
}

export default function CopyMessageButton({ guestName, invitationSlug, content }: CopyMessageButtonProps) {
  const [copied, setCopied] = useState(false)

  // Mengambil nama mempelai pria (l) dan wanita (p)
  // Berdasarkan asumsi: groom_name = Laki-laki, bride_name = Perempuan
  const namaL = content.groom_name || 'Nama Mempelai Pria'
  const namaP = content.bride_name || 'Nama Mempelai Wanita'
  
  const nicknameL = content.groom_nickname || namaL.split(' ')[0]
  const nicknameP = content.bride_nickname || namaP.split(' ')[0]

  const bapakL = content.groom_father_name ? `Bpk. ${content.groom_father_name}` : 'Bpk. ...'
  const ibuL = content.groom_mother_name ? `Ibu ${content.groom_mother_name}` : 'Ibu ...'
  const descL = `Putra dari keluarga ${bapakL} & ${ibuL}`

  const bapakP = content.bride_father_name ? `Bpk. ${content.bride_father_name}` : 'Bpk. ...'
  const ibuP = content.bride_mother_name ? `Ibu ${content.bride_mother_name}` : 'Ibu ...'
  const descP = `Putri dari keluarga ${bapakP} & ${ibuP}`

  const encodedGuestName = encodeURIComponent(guestName)
  const invitationUrl = `https://kenikahan.com/u/${invitationSlug}?to=${encodedGuestName}`

  const messageTemplate = `Kepada Yth,
Bapak/Ibu/Sdr/i
${guestName}

Bismillahirrahmanirrahim
Assalamualaikum Warahmatullahi Wabarakatuh

Dengan memohon rahmat dan ridho-Mu Ya Allah, Kami bermaksud mengundang anda pada acara resepsi pernikahan putra dan putri kami :

${namaL}
(${descL})

&

${namaP}
(${descP})

Berikut kami lampirkan link undangan acara pernikahan kedua mempelai :
${invitationUrl}

Merupakan kehormatan bagi kami apabila Bapak/Ibu/Sdr/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.
Atas kehadiran, perhatian dan doa Bapak/Ibu/Sdr/i kami ucapakan terima kasih.

Kami yang berbahagia
${nicknameL} & ${nicknameP}
Beserta keluarga besar

Wassalamualaikum Warahmatullahi Wabarakatuh`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageTemplate)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Gagal menyalin:', err)
      alert('Gagal menyalin pesan. Silakan coba lagi.')
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
        copied 
          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20'
      }`}
      title="Salin pesan undangan WhatsApp"
    >
      {copied ? '✔ Tersalin' : '📋 Copy Pesan'}
    </button>
  )
}

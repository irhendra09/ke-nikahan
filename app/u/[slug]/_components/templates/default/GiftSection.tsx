'use client'

import { useState } from 'react'
import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function GiftSection({ content }: Props) {
    const [copied, setCopied] = useState(false)

    // Check if we have bank details to show
    if (!content.bank_name || !content.bank_account_number || !content.bank_account_name) {
        return null
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content.bank_account_number || '')
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy', err)
        }
    }

    return (
        <section className="py-24 px-6 relative bg-[#2a1f17] flex flex-col items-center">
            {/* Ornaments */}
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#1a1008] to-transparent" />
            
            <div className="text-center mb-10 relative z-10 max-w-md mx-auto">
                <p className="text-amber-500/80 text-xs tracking-[0.3em] uppercase mb-3">
                    Amplop Digital
                </p>
                <h2 className="text-amber-100 text-3xl mb-6"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}>
                    Kirim Hadiah
                </h2>
                <p className="text-amber-100/60 text-sm leading-relaxed font-light">
                    Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
                    Namun jika Anda hendak memberikan tanda kasih, Anda dapat mengirimkannya melalui:
                </p>
            </div>

            <div className="bg-[#1a1008] border border-amber-900/30 rounded-3xl p-8 w-full max-w-sm shadow-2xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                <div className="absolute -right-4 -top-4 text-8xl opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    💳
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                    <p className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">
                        {content.bank_name}
                    </p>
                    
                    <p className="text-white text-2xl font-mono tracking-wider mb-2">
                        {content.bank_account_number}
                    </p>
                    
                    <p className="text-amber-100/50 text-sm uppercase tracking-wider mb-8">
                        A.n. {content.bank_account_name}
                    </p>

                    <button
                        onClick={handleCopy}
                        className={`w-full py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                            copied 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20'
                        }`}
                    >
                        {copied ? (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                Berhasil Disalin
                            </>
                        ) : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                Salin No. Rekening
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    )
}

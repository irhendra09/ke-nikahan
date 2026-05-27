import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user!.id)
        .single()

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Halo, {profile?.full_name?.split(' ')[0] ?? 'Kamu'} 👋
            </h1>
            <p className="text-gray-500 mb-8">
                Selamat datang di dashboard undangan digital kamu.
            </p>

            {/* Placeholder — akan diisi di langkah berikutnya */}
            <div className="bg-white border border-dashed border-gray-300
                      rounded-2xl p-12 text-center">
                <p className="text-gray-400 text-sm">
                    Dashboard sedang dalam pengembangan.
                    <br />
                    Selanjutnya: buat undangan pertama kamu!
                </p>
            </div>
        </div>
    )
}
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LandingNavbar from "./_components/LandingNavbar";

export const metadata = {
  title: "KeNikahan - Undangan Digital Modern & Elegan",
  description: "Buat undangan digital impianmu dengan mudah, elegan, dan instan. KeNikahan menawarkan berbagai template premium dengan fitur RSVP, buku tamu, dan galeri foto.",
  keywords: ["undangan digital", "undangan pernikahan online", "buat undangan online", "kenikahan", "template undangan", "undangan website"],
  openGraph: {
    title: "KeNikahan - Undangan Digital Modern",
    description: "Buat undangan digital impianmu dengan mudah, elegan, dan instan.",
    url: "https://kenikahan.com",
    siteName: "KeNikahan",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeNikahan - Undangan Digital Modern",
    description: "Buat undangan digital impianmu dengan mudah, elegan, dan instan.",
  }
};

export default async function Home() {
  const templates = await prisma.template.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return (
    <div className="min-h-screen bg-ivory text-text-dark selection:bg-rosegold-light/30 selection:text-rosegold scroll-smooth">

      <LandingNavbar />

      <main id="beranda" className="pt-40 md:pt-56 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Hero Section */}
        <div className="w-full flex flex-col items-center pb-20">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Rilis Versi 2.0
          </div> */}
          <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tighter mb-6 max-w-4xl leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Undangan Digital <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rosegold to-rosegold-light">
              Elegan & Instan.
            </span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            Buat undangan pernikahan, ulang tahun, atau acara spesial lainnya dalam hitungan menit. Pilih desain, isi data, dan sebarkan ke semua tamu Anda.
          </p>
          <a href="#desain" className="px-8 py-4 rounded-full bg-gradient-to-r from-rosegold to-rosegold-light text-white font-medium text-lg hover:shadow-xl hover:shadow-rosegold/20 hover:scale-105 transition-all">
            Buat Undangan Sekarang
          </a>
        </div>

        {/* Features / Steps */}
        <section className="w-full py-20 text-left border-t border-rosegold/10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight mb-4 text-text-dark">Cara Kerja</h2>
            <p className="text-text-muted max-w-xl mx-auto">Tiga langkah mudah untuk membuat undangan pernikahan digital Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Pilih Desain", desc: "Temukan template yang paling sesuai dengan tema pernikahan Anda.", icon: "🎨" },
              { title: "Isi Informasi", desc: "Masukkan detail acara, cerita cinta, dan galeri foto dengan mudah.", icon: "📝" },
              { title: "Sebarkan", desc: "Bagikan link undangan ke semua tamu melalui WhatsApp atau Sosmed.", icon: "🚀" }
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-rosegold/20 text-center hover:shadow-lg hover:shadow-rosegold/10 transition-all">
                <div className="w-16 h-16 mx-auto bg-ivory-dark text-rosegold rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold font-serif mb-3 text-text-dark">{step.title}</h3>
                <p className="text-text-muted text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Templates Grid */}
        <section id="desain" className="w-full py-20 text-left border-t border-rosegold/10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight mb-2 text-text-dark">Pilih Desain Impianmu</h2>
              <p className="text-text-muted text-sm">Berbagai pilihan tema premium yang siap digunakan.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div key={template.id} className="group relative bg-white rounded-3xl border border-rosegold/20 overflow-hidden hover:border-rosegold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-rosegold/10">
                <div className="aspect-[4/5] bg-ivory-dark relative overflow-hidden">
                  {template.thumbnailUrl ? (
                    <Image
                      src={template.thumbnailUrl}
                      alt={template.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-text-muted font-medium">
                      No Preview
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Action Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                    <Link
                      href={`/demo/${template.slug}`}
                      className="w-full py-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white text-sm font-medium text-center hover:bg-white/30 border border-white/30 transition-colors"
                    >
                      Lihat Demo
                    </Link>
                    <Link
                      href={`/checkout/${template.id}`}
                      className="w-full py-3 rounded-xl bg-rosegold text-white text-sm font-medium text-center hover:bg-rosegold-light transition-colors shadow-lg shadow-rosegold/20"
                    >
                      Pesan Sekarang (Rp {template.basePrice.toLocaleString('id-ID')})
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-rosegold transition-colors text-text-dark">{template.name}</h3>
                  <p className="text-sm text-text-muted capitalize">{template.category.replace('_', ' ')}</p>
                </div>
              </div>
            ))}
          </div>

          {templates.length === 0 && (
            <div className="text-center py-20 border border-rosegold/20 border-dashed rounded-3xl bg-white/[0.02]">
              <p className="text-text-muted">Belum ada template yang tersedia saat ini.</p>
            </div>
          )}
        </section>

        {/* Blog Highlights Section */}
        <section id="blog" className="w-full py-20 text-left border-t border-rosegold/10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight mb-2 text-text-dark">Inspirasi & Tips Pernikahan</h2>
              <p className="text-text-muted text-sm">Temukan berbagai artikel menarik untuk persiapan hari bahagiamu.</p>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 border border-rosegold/20 border-dashed rounded-3xl bg-white/[0.02]">
              <p className="text-text-muted">Belum ada artikel yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map(post => (
                <div key={post.id} className="group cursor-pointer bg-white rounded-3xl border border-rosegold/20 overflow-hidden hover:border-rosegold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-rosegold/10">
                  <div className="aspect-[16/10] bg-ivory-dark overflow-hidden relative border-b border-rosegold/10 group-hover:border-rosegold/30 transition-all">
                    {post.imageUrl ? (
                      <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-50">✍️</div>
                    )}
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-xs font-bold text-rosegold uppercase tracking-widest">
                      {new Date(post.createdAt).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-xl font-bold font-serif group-hover:text-rosegold transition-colors line-clamp-2 text-text-dark">
                      {post.title}
                    </h3>
                    <p className="text-text-muted text-sm line-clamp-3">
                      {post.excerpt || post.content.substring(0, 120) + '...'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bantuan CTA */}
        <section className="w-full mt-10 bg-gradient-to-r from-ivory to-white border border-rosegold/20 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-rosegold transition-colors shadow-sm hover:shadow-lg hover:shadow-rosegold/10">
          <div className="text-center md:text-left flex-1 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4 text-text-dark">Butuh Bantuan?</h2>
            <p className="text-text-muted text-base leading-relaxed">
              Jika Anda mengalami kesulitan, ingin custom desain, atau sudah melakukan pembayaran, silakan hubungi Admin kami.
            </p>
          </div>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/30 font-bold transition-all text-sm shadow-xl shadow-green-500/10 hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Hubungi via WhatsApp
          </a>
        </section>
      </main>

      {/* Footer Lengkap */}
      <footer className="border-t border-rosegold/10 bg-ivory pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rosegold to-rosegold-light flex items-center justify-center text-white text-sm font-bold shadow-md shadow-rosegold/20">K</div>
                <span className="font-serif font-bold text-xl text-text-dark">KeNikahan</span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed max-w-sm">
                Platform pembuat undangan digital premium terpercaya. Kami membantu pasangan membagikan momen bahagia dengan cara yang modern, mudah, dan ramah lingkungan.
              </p>
            </div>

            <div>
              <h4 className="text-text-dark font-bold mb-6 tracking-wide">Navigasi</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li><a href="#beranda" className="hover:text-rosegold transition-colors">Beranda</a></li>
                <li><a href="#fitur" className="hover:text-rosegold transition-colors">Cara Kerja</a></li>
                <li><a href="#desain" className="hover:text-rosegold transition-colors">Desain Undangan</a></li>
                <li><a href="#blog" className="hover:text-rosegold transition-colors">Artikel & Tips</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-text-dark font-bold mb-6 tracking-wide">Kontak Kami</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="flex items-center gap-2">📍 Jakarta, Indonesia</li>
                <li className="flex items-center gap-2">📞 +62 812-3456-7890</li>
                <li className="flex items-center gap-2">✉️ hello@kenikahan.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-rosegold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted font-medium">
            <p>© {new Date().getFullYear()} KeNikahan. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-rosegold transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-rosegold transition-colors">Kebijakan Privasi</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WA Button */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/30 hover:scale-110 hover:bg-green-600 transition-all duration-300 group"
        aria-label="Hubungi via WhatsApp"
      >
        <span className="absolute right-full mr-4 bg-white text-text-dark text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-rosegold/10 shadow-xl shadow-rosegold/5 font-medium">
          Tanya Admin
        </span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    </div>
  );
}


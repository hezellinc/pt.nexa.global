import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const portfolioDetailsData: Record<string, any> = {
  p1: {
    title: 'EcoShop E-Commerce',
    category: 'NEXAWEB',
    imgSrc: '/nexaweb.png',
    client: 'EcoLife Retail Nusantara',
    challenge: 'Klien membutuhkan platform penjualan mandiri yang tangguh untuk menggantikan kebergantungan pada marketplace eksternal, dengan sistem manajemen inventaris gudang yang terhubung secara real-time.',
    solution: 'Membangun ekosistem e-commerce kustom menggunakan Next.js dan Node.js. Terintegrasi dengan payment gateway lokal, sistem kurir otomatis, dan panel admin khusus untuk manajemen stok dan pesanan multi-gudang.',
    result: 'Penjualan mandiri meningkat 200% di kuartal pertama. Biaya potongan marketplace berkurang drastis, meningkatkan margin keuntungan bersih klien sebesar 15%.'
  },
  p2: {
    title: 'FinTrack Dashboard',
    category: 'NEXADESIGN',
    imgSrc: '/nexadesign.png',
    client: 'Finova Financial B2B',
    challenge: 'Antarmuka aplikasi analitik keuangan klien sangat kompleks dan usang, menyebabkan tingginya tingkat kesalahan pengguna dan lamanya proses onboarding klien baru.',
    solution: 'Mendesain ulang seluruh sistem UI/UX dengan pendekatan arsitektur informasi yang baru. Menggunakan gaya visual bersih (Clean UI) dengan grafik data interaktif yang mudah dicerna, serta mode gelap (Dark Mode).',
    result: 'Waktu onboarding klien baru turun dari 2 minggu menjadi 3 hari. Skor kepuasan pengguna (NPS) melonjak dari 45 menjadi 82.'
  },
  p3: {
    title: 'Smart HR Absensi',
    category: 'NEXAAPP',
    imgSrc: '/nexaapp.png',
    client: 'PT Manufaktur Baja Perkasa',
    challenge: 'Kesulitan melacak absensi ribuan pekerja pabrik secara akurat. Sistem manual sering dimanipulasi dan proses rekapitulasi gaji HR memakan waktu berhari-hari.',
    solution: 'Mengembangkan aplikasi mobile internal berbasis React Native yang dilengkapi dengan verifikasi Face ID (Pengenalan Wajah) dan pembatasan geolokasi presisi (Geofencing) di area pabrik.',
    result: 'Manipulasi absensi turun hingga 0%. Tim HR menghemat waktu rekapitulasi gaji sebanyak 40 jam kerja per bulan. Sistem terhubung langsung ke software payroll.'
  },
  p4: {
    title: 'Bite & Brew Rebranding',
    category: 'NEXABRAND',
    imgSrc: '/nexabrand.png',
    client: 'Bite & Brew Coffee Chain',
    challenge: 'Identitas visual waralaba terlihat kuno dan tidak menarik bagi demografi milenial dan Gen-Z, menghambat rencana ekspansi ke kota-kota besar.',
    solution: 'Merombak total identitas merek: merancang logo minimalis baru, menetapkan palet warna yang modern dan hangat, serta membuat pedoman merek (Brand Book) lengkap untuk desain interior gerai dan kemasan.',
    result: 'Ekspansi 10 cabang baru sukses besar di bulan pertama. Interaksi dan penyebutan (mentions) di media sosial naik 400% berkat kemasan yang estetik dan Instagramable.'
  },
  p5: {
    title: 'TechGrow SEO Campaign',
    category: 'NEXADIGITAL',
    imgSrc: '/nexadigital.png',
    client: 'TechGrow Software Solution',
    challenge: 'Website klien tenggelam di mesin pencari, gagal mendapatkan leads organik B2B yang berkualitas, dan kalah saing dari kompetitor.',
    solution: 'Audit SEO menyeluruh, perbaikan struktur teknis website, riset kata kunci long-tail spesifik B2B, dan pembuatan pilar konten (artikel & whitepaper) berkualitas tinggi selama 6 bulan berturut-turut.',
    result: 'Mendominasi halaman 1 Google untuk 15 kata kunci utama industri. Peningkatan traffic organik sebesar 300% dan konversi leads B2B berkualitas meningkat tajam.'
  },
  p6: {
    title: 'MedikaCare Portal',
    category: 'NEXAWEB',
    imgSrc: '/nexaprofile.png',
    client: 'RS Medika Sejahtera',
    challenge: 'Antrean pendaftaran pasien di rumah sakit memakan waktu lama, rekam medis sulit diakses oleh dokter antar departemen, dan sering terjadi kesalahan input data.',
    solution: 'Membuat portal pasien yang responsif untuk pendaftaran mandiri (self-service booking), serta sistem backend rekam medis elektronik (EMR) dengan otorisasi ketat (Role-Based Access Control) bagi tenaga medis.',
    result: 'Antrean fisik berkurang sebesar 70%. Dokter dapat mengakses rekam medis pasien 3x lebih cepat, mengurangi tingkat kesalahan diagnostik akibat data yang hilang.'
  }
};

export default function PortfolioDetailModal() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      const id = customEvent.detail;
      
      if (portfolioDetailsData[id]) {
        setActiveId(id);
        document.body.style.overflow = 'hidden';
      }
    };

    window.addEventListener('open-portfolio', handleOpen);
    return () => window.removeEventListener('open-portfolio', handleOpen);
  }, []);

  const close = () => {
    setActiveId(null);
    document.body.style.overflow = 'auto';
  };

  const data = activeId ? portfolioDetailsData[activeId] : null;

  return (
    <AnimatePresence>
      {activeId && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-4xl max-h-[90vh] bg-[var(--bg-color)] rounded-[2rem] shadow-2xl overflow-y-auto clay relative border border-white/20"
          >
            {/* Close Button */}
            <button 
              onClick={close}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-3 clay-sm rounded-full text-text hover:text-primary transition-colors bg-[var(--bg-color)] shadow-sm"
            >
              <X size={24} />
            </button>

            {/* Clean Image Banner */}
            <div className="w-full h-48 md:h-64 bg-black/5 dark:bg-white/5 relative flex items-center justify-center overflow-hidden border-b border-text/5 p-8">
               <motion.img 
                 src={data.imgSrc}
                 alt={data.title}
                 initial={{ y: 20, scale: 0.9, opacity: 0 }}
                 animate={{ y: 0, scale: 1, opacity: 1 }}
                 transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                 className="w-full h-full object-contain relative z-10 drop-shadow-md"
               />
            </div>

            <div className="p-6 md:p-10 relative z-20">
              
              <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1 rounded-full clay-sm text-primary font-bold text-xs tracking-widest uppercase mb-4">
                  {data.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-black mb-4 text-text">{data.title}</h2>
                <p className="text-lg opacity-60 font-semibold">Klien: {data.client}</p>
              </div>

              <div className="space-y-8">
                {/* Challenge */}
                <div className="clay p-6 md:p-8">
                  <h3 className="text-xl font-bold text-rose-500 mb-3 border-b border-rose-500/20 pb-2">Tantangan Klien</h3>
                  <p className="opacity-90 leading-relaxed text-base md:text-lg">
                    {data.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="clay p-6 md:p-8">
                  <h3 className="text-xl font-bold text-blue-500 mb-3 border-b border-blue-500/20 pb-2">Solusi NexaTech</h3>
                  <p className="opacity-90 leading-relaxed text-base md:text-lg">
                    {data.solution}
                  </p>
                </div>

                {/* Result */}
                <div className="clay p-6 md:p-8 bg-emerald-500/5 border border-emerald-500/20">
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-3 border-b border-emerald-500/20 pb-2">Hasil Akhir</h3>
                  <p className="opacity-90 leading-relaxed text-base md:text-lg font-medium">
                    {data.result}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

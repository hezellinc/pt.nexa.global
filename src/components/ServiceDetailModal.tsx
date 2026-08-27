import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Layout, Globe, Smartphone, PenTool, Megaphone, Zap, Target, ShieldCheck, Users } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

const serviceDetailsData: Record<string, any> = {
  NEXAWEB: {
    title: 'Pengembangan Website Enterprise',
    subtitle: 'NEXAWEB',
    icon: Globe,
    colorClass: 'glass-icon-box-alt2',
    description: 'Kami merancang dan mengembangkan solusi website kustom berkinerja tinggi, mulai dari company profile elegan, portal B2B, hingga sistem e-commerce kompleks yang siap menangani ribuan transaksi per detik.',
    benefits: [
      'Performa Pemuatan Super Cepat (Optimasi Core Web Vitals)',
      'Desain Responsif Sempurna di Semua Perangkat',
      'Keamanan Tingkat Lanjut (Anti-DDoS & Enkripsi Data)',
      'Struktur SEO Friendly Bawaan'
    ],
    process: [
      { name: 'Analisis Kebutuhan', desc: 'Memahami visi, target audiens, dan fitur yang dibutuhkan bisnis Anda.' },
      { name: 'Wireframing & UI/UX', desc: 'Pembuatan kerangka visual dan purwarupa interaktif.' },
      { name: 'Pengembangan (Coding)', desc: 'Penulisan kode menggunakan teknologi modern (React, Node.js).' },
      { name: 'QA & Pengujian', desc: 'Uji fungsionalitas, keamanan, dan kompatibilitas peramban.' },
      { name: 'Peluncuran', desc: 'Penyebaran ke server produksi dan pemantauan awal.' }
    ],
    caseStudy: 'Revamp E-Commerce Retail Lokal meningkatkan kecepatan muat sebesar 60% dan mendorong peningkatan penjualan organik sebesar 150% dalam kuartal pertama.'
  },
  NEXADESIGN: {
    title: 'Desain UI/UX & Interaksi',
    subtitle: 'NEXADESIGN',
    icon: Layout,
    colorClass: 'glass-icon-box-alt1',
    description: 'Menciptakan antarmuka digital yang tidak hanya memukau secara visual, tetapi juga sangat intuitif. Kami berfokus pada User-Centered Design (UCD) untuk memastikan setiap klik memiliki tujuan yang jelas.',
    benefits: [
      'Peningkatan Tingkat Retensi Pengguna',
      'Penurunan Bounce Rate',
      'Sistem Desain (Design System) Konsisten',
      'Aksesibilitas Sesuai Standar Global (WCAG)'
    ],
    process: [
      { name: 'Riset Pengguna', desc: 'Wawancara dan analisis perilaku target audiens.' },
      { name: 'Arsitektur Informasi', desc: 'Menyusun struktur navigasi dan hierarki konten.' },
      { name: 'Desain Visual', desc: 'Penerapan warna, tipografi, dan gaya visual (seperti Claymorphism).' },
      { name: 'Prototyping', desc: 'Pembuatan purwarupa yang dapat diklik untuk uji coba.' },
      { name: 'Handoff Developer', desc: 'Penyerahan aset dan dokumentasi desain ke tim pengembang.' }
    ],
    caseStudy: 'Desain ulang dashboard SaaS B2B berhasil mengurangi waktu penyelesaian tugas pengguna hingga 40% dan menekan tiket keluhan pelanggan secara drastis.'
  },
  NEXAAPP: {
    title: 'Aplikasi Mobile & Web Sederhana',
    subtitle: 'NEXAAPP',
    icon: Smartphone,
    colorClass: 'glass-icon-box-alt3',
    description: 'Solusi perangkat lunak cerdas untuk memecahkan masalah spesifik operasional bisnis Anda. Dari aplikasi kasir (POS), absensi pintar, hingga sistem manajemen inventaris.',
    benefits: [
      'Otomatisasi Proses Manual',
      'Manajemen Data Tersentralisasi',
      'Integrasi API Pihak Ketiga',
      'Antarmuka Ramah Pengguna untuk Staf'
    ],
    process: [
      { name: 'Pemetaan Proses Bisnis', desc: 'Identifikasi alur kerja yang akan didigitalkan.' },
      { name: 'Desain Database', desc: 'Perancangan skema data yang aman dan efisien.' },
      { name: 'Pembuatan MVP', desc: 'Pengembangan Minimum Viable Product untuk pengujian awal.' },
      { name: 'Iterasi & Umpan Balik', desc: 'Penyempurnaan berdasarkan masukan pengguna lapangan.' },
      { name: 'Implementasi Skala Penuh', desc: 'Pelatihan staf dan migrasi data sepenuhnya.' }
    ],
    caseStudy: 'Implementasi Smart HR Absensi di perusahaan manufaktur menghemat 15 jam kerja divisi HR setiap bulannya dalam merekap gaji.'
  },
  NEXABRAND: {
    title: 'Identitas Merek & Desain Grafis',
    subtitle: 'NEXABRAND',
    icon: PenTool,
    colorClass: 'glass-icon-box-alt4',
    description: 'Kami membantu menerjemahkan nilai, misi, dan visi perusahaan Anda menjadi identitas visual yang kuat, ikonik, dan mudah diingat oleh konsumen di pasar yang kompetitif.',
    benefits: [
      'Kesan Pertama yang Profesional & Kredibel',
      'Konsistensi Brand di Seluruh Platform',
      'Panduan Brand (Brand Guidelines) Lengkap',
      'Aset Visual Siap Cetak & Digital'
    ],
    process: [
      { name: 'Brand Discovery', desc: 'Workshop untuk menggali inti dan nilai merek Anda.' },
      { name: 'Moodboarding', desc: 'Eksplorasi arah visual, warna, dan tipografi.' },
      { name: 'Desain Logo', desc: 'Pembuatan sketsa dan digitalisasi logo utama.' },
      { name: 'Ekspansi Visual', desc: 'Penerapan logo pada kartu nama, kop surat, dan media sosial.' },
      { name: 'Penyusunan Pedoman', desc: 'Pembuatan buku pedoman identitas merek.' }
    ],
    caseStudy: 'Rebranding waralaba FnB nasional menghasilkan persepsi merek yang lebih modern, menarik demografi Gen-Z dan menaikkan pangsa pasar sebesar 25%.'
  },
  NEXADIGITAL: {
    title: 'Pemasaran Digital & SEO',
    subtitle: 'NEXADIGITAL',
    icon: Megaphone,
    colorClass: 'glass-icon-box',
    description: 'Tingkatkan visibilitas online Anda melalui strategi pemasaran berbasis data. Kami menggabungkan optimasi organik (SEO) dan kampanye iklan berbayar yang presisi (Performance Ads).',
    benefits: [
      'Peningkatan Traffic Organik & Berkualitas',
      'ROI Iklan (ROAS) yang Terukur',
      'Dominasi Kata Kunci Industri di Google',
      'Laporan Analitik Komprehensif'
    ],
    process: [
      { name: 'Audit Digital', desc: 'Evaluasi kinerja website dan media sosial saat ini.' },
      { name: 'Riset Kata Kunci', desc: 'Menemukan peluang pencarian dengan niat beli tinggi.' },
      { name: 'Strategi Konten & Iklan', desc: 'Pembuatan rencana kampanye multi-saluran.' },
      { name: 'Eksekusi Kampanye', desc: 'Optimasi on-page SEO dan peluncuran iklan Meta/Google.' },
      { name: 'Analisis & Optimasi', desc: 'Pemantauan hasil bulanan dan penyesuaian strategi.' }
    ],
    caseStudy: 'Kampanye SEO komprehensif untuk klien properti menghasilkan peningkatan lead kualifikasi sebesar 300% dengan biaya akuisisi (CPA) yang lebih rendah 40%.'
  }
};

export default function ServiceDetailModal() {
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      const id = customEvent.detail?.id || customEvent.detail;
      
      // Handle mapping for Catalog activeCategory which is exact key
      if (serviceDetailsData[id]) {
        setActiveService(id);
        document.body.style.overflow = 'hidden';
      }
    };

    window.addEventListener('open-service-detail', handleOpen);
    return () => window.removeEventListener('open-service-detail', handleOpen);
  }, []);

  const close = () => {
    setActiveService(null);
    document.body.style.overflow = 'auto';
  };

  const data = activeService ? serviceDetailsData[activeService] : null;

  return (
    <AnimatePresence>
      {activeService && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-5xl max-h-[90vh] bg-[var(--bg-color)] rounded-[2rem] shadow-2xl overflow-y-auto glass relative border border-white/20 dark:border-white/5"
          >
            {/* Close Button */}
            <button 
              onClick={close}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 glass-sm rounded-full text-text hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-10 lg:p-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-12">
                <div className="shrink-0">
                  <InteractiveIcon icon={data.icon} colorClass={data.colorClass} size={80} />
                </div>
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full glass-sm text-primary font-bold text-sm tracking-widest uppercase mb-4 border border-primary/10">
                    {data.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black mb-4 text-text leading-tight">{data.title}</h2>
                  <p className="text-lg opacity-80 leading-relaxed max-w-3xl">
                    {data.description}
                  </p>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
                {/* Benefits */}
                <div className="glass p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-amber-500" size={28} />
                    <h3 className="text-2xl font-bold text-text">Manfaat Utama</h3>
                  </div>
                  <ul className="space-y-4">
                    {data.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                        <span className="opacity-90 font-medium text-base md:text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Case Study */}
                <div className="glass p-6 md:p-8 bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="text-primary" size={28} />
                    <h3 className="text-2xl font-bold text-text">Dampak Nyata (Studi Kasus)</h3>
                  </div>
                  <div className="bg-[var(--bg-color)] p-5 rounded-2xl shadow-inner border border-text/5">
                    <p className="opacity-90 font-medium italic leading-relaxed text-base md:text-lg">
                      "{data.caseStudy}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div>
                <h3 className="text-2xl font-bold text-text mb-8 text-center">Proses Eksekusi Kami</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {data.process.map((step: any, i: number) => (
                    <div key={i} className="glass-sm p-5 text-center relative group">
                      <div className="w-10 h-10 rounded-full bg-primary text-white font-black flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <h4 className="font-bold mb-2 text-text">{step.name}</h4>
                      <p className="text-sm opacity-75">{step.desc}</p>
                      
                      {i < data.process.length - 1 && (
                        <div className="hidden md:block absolute top-10 -right-3 text-text/20">
                          <ArrowRight size={24} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <button 
                  onClick={() => {
                    close();
                    document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="glass-btn inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg"
                >
                  Mulai Proyek {data.subtitle} <ArrowRight size={20} />
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

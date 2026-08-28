import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Layout, Globe, Smartphone, PenTool, Megaphone, Zap, Target, ShieldCheck, Users } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

const serviceDetailsData: Record<string, any> = {
  NEXANET: {
    title: 'Infrastruktur Jaringan Terintegrasi',
    subtitle: 'NEXANET',
    icon: Globe,
    colorClass: 'glass-icon-box-alt2',
    description: 'Solusi lengkap instalasi dan manajemen jaringan mulai dari penarikan Fiber Optic, konfigurasi LAN/WAN, hingga manajemen lalu lintas data menggunakan router kelas enterprise (Mikrotik/Cisco).',
    benefits: [
      'Koneksi Internet Stabil dan Terdistribusi Merata',
      'Manajemen Bandwidth Presisi per Divisi/User',
      'Minim Downtime dengan Sistem Failover',
      'Kerapian dan Standar Keamanan Kabel Tingkat Tinggi'
    ],
    process: [
      { name: 'Site Survey', desc: 'Survei lokasi fisik untuk menentukan jalur kabel dan titik akses.' },
      { name: 'Topologi', desc: 'Pembuatan desain jaringan dan estimasi perangkat (BoQ).' },
      { name: 'Instalasi Fisik', desc: 'Penarikan kabel FO/UTP dan pemasangan rack server.' },
      { name: 'Konfigurasi', desc: 'Setting Mikrotik, Cisco, Access Point, dan VLAN.' },
      { name: 'Testing', desc: 'Uji beban, ping test, dan serah terima dokumen jaringan.' }
    ],
    caseStudy: 'Instalasi jaringan Fiber Optic di area pabrik seluas 5 hektar mengeliminasi masalah dead zone dan menstabilkan sistem ERP antar gudang.'
  },
  NEXASERVER: {
    title: 'Manajemen Server & Cloud',
    subtitle: 'NEXASERVER',
    icon: Layout,
    colorClass: 'glass-icon-box-alt1',
    description: 'Layanan administrasi server komprehensif, mencakup setup server fisik (Data Center lokal) maupun cloud (AWS, Google Cloud, VPS) untuk memastikan aplikasi dan data perusahaan berjalan lancar.',
    benefits: [
      'Kinerja Aplikasi Bisnis Cepat dan Tanpa Henti',
      'Sistem Pencadangan (Backup) Data Otomatis',
      'Keamanan Tingkat Server (Hardening OS)',
      'Manajemen Pengguna terpusat via Active Directory'
    ],
    process: [
      { name: 'Asesmen Beban', desc: 'Menghitung kebutuhan spesifikasi RAM, CPU, dan Storage.' },
      { name: 'Setup OS', desc: 'Instalasi Linux (Ubuntu/CentOS) atau Windows Server.' },
      { name: 'Konfigurasi', desc: 'Setting Web Server, Database, dan File Sharing.' },
      { name: 'Keamanan', desc: 'Implementasi aturan Firewall dasar dan SSL.' },
      { name: 'Monitoring', desc: 'Pemantauan resource server 24/7 (Zabbix/Prometheus).' }
    ],
    caseStudy: 'Migrasi sistem on-premise ke Cloud AWS berhasil mengurangi biaya operasional hardware hingga 40% dengan uptime mencapai 99.99%.'
  },
  NEXAWEB: {
    title: 'Pengembangan Aplikasi Web & Sistem',
    subtitle: 'NEXAWEB',
    icon: Smartphone,
    colorClass: 'glass-icon-box-alt3',
    description: 'Kami tidak hanya ahli di bidang hardware, tetapi juga mampu membangun perangkat lunak (Software) seperti Sistem Informasi Manajemen, ERP custom, dan Website Company Profile profesional.',
    benefits: [
      'Digitalisasi Proses Bisnis (Paperless)',
      'Akses Data Kapan Saja via Web Browser',
      'Integrasi Langsung ke Database Server Lokal',
      'Antarmuka Responsif (Mobile & Desktop)'
    ],
    process: [
      { name: 'Analisis Kebutuhan', desc: 'Wawancara kebutuhan alur kerja sistem.' },
      { name: 'Desain UI/UX', desc: 'Membuat tampilan antarmuka (mockup).' },
      { name: 'Coding', desc: 'Pengembangan backend dan frontend sistem.' },
      { name: 'Testing', desc: 'Uji fungsionalitas dan keamanan dari bug.' },
      { name: 'Deployment', desc: 'Pemasangan aplikasi ke server (VPS/Cloud) klien.' }
    ],
    caseStudy: 'Pengembangan aplikasi Smart Inventory mengotomatisasi pencatatan stok dari 3 cabang gudang ke satu server pusat secara real-time.'
  },
  NEXASECURE: {
    title: 'Keamanan Siber & Instalasi CCTV',
    subtitle: 'NEXASECURE',
    icon: PenTool,
    colorClass: 'glass-icon-box-alt4',
    description: 'Lindungi aset fisik dan digital perusahaan Anda. Kami melayani instalasi sistem pengawasan kamera keamanan (CCTV IP Camera) serta proteksi jaringan dari serangan siber menggunakan Firewall.',
    benefits: [
      'Pemantauan Keamanan Fisik 24 Jam via Smartphone',
      'Pencegahan Akses Ilegal (Hacking) ke Data Perusahaan',
      'Koneksi Jarak Jauh Aman Menggunakan VPN',
      'Penyimpanan Rekaman Kamera Resolusi Tinggi yang Lama'
    ],
    process: [
      { name: 'Audit Keamanan', desc: 'Mencari celah keamanan di sistem saat ini.' },
      { name: 'Perancangan', desc: 'Menentukan titik CCTV dan skema keamanan Firewall.' },
      { name: 'Instalasi', desc: 'Pemasangan IP Camera, NVR, dan hardware Firewall.' },
      { name: 'Konfigurasi', desc: 'Setting rules, port blocking, VPN, dan resolusi kamera.' },
      { name: 'Handover', desc: 'Pelatihan staf sekuriti dan IT internal.' }
    ],
    caseStudy: 'Implementasi VPN dan Fortinet Firewall mengamankan pertukaran data konfidensial bagi karyawan yang bekerja dari rumah (WFH).'
  },
  NEXAIOT: {
    title: 'Solusi IoT & Telekomunikasi Kantor',
    subtitle: 'NEXAIOT',
    icon: Megaphone,
    colorClass: 'glass-icon-box',
    description: 'Modernisasi lingkungan kerja Anda dengan perangkat cerdas Internet of Things (IoT) dan sistem komunikasi terpadu seperti PABX, VoIP, dan Mesin Absensi Biometrik.',
    benefits: [
      'Efisiensi Energi (Lampu/AC Otomatis Cerdas)',
      'Komunikasi Antar Divisi Gratis (PABX/VoIP)',
      'Otomatisasi Sistem Presensi Karyawan',
      'Kontrol Terpusat melalui Dashboard'
    ],
    process: [
      { name: 'Identifikasi Alat', desc: 'Memilih sensor dan alat yang sesuai kebutuhan.' },
      { name: 'Pemasangan Fisik', desc: 'Instalasi sensor IoT, telepon IP, dan mesin absensi.' },
      { name: 'Integrasi Sistem', desc: 'Menghubungkan alat dengan server dan software.' },
      { name: 'Kalibrasi', desc: 'Penyesuaian akurasi sensor dan pengujian suara VoIP.' },
      { name: 'Go Live', desc: 'Sistem aktif digunakan dalam operasional sehari-hari.' }
    ],
    caseStudy: 'Sistem IP PBX (VoIP) untuk perusahaan multi-cabang memangkas tagihan telepon bulanan hingga 65%.'
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
            className="w-full max-w-5xl max-h-[90vh] bg-[var(--bg-color)] rounded-[2rem] shadow-2xl overflow-y-auto glass relative border border-white/10"
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

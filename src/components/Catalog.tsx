import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, ShoppingBag, Layout, Code, Smartphone, Database, 
  PenTool, Monitor, Layers, Briefcase, Image as ImageIcon, 
  Share2, PlayCircle, BarChart3, Search, Megaphone, ArrowRight, BookOpen
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import InteractiveIcon from './InteractiveIcon';

const catalogData = {
  NEXANET: [
    {
      title: "Instalasi Fiber Optic & LAN",
      desc: "Penarikan kabel jaringan, terminasi FO, dan instalasi infrastruktur LAN untuk kantor atau instansi dengan standar rapi dan aman.",
      icon: Layers,
      colorClass: "glass-icon-box"
    },
    {
      title: "Konfigurasi Router Mikrotik & Cisco",
      desc: "Setting routing, manajemen bandwidth, load balancing, dan failover untuk menjamin koneksi internet perusahaan tetap stabil.",
      icon: Globe,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "Topologi & Desain Jaringan",
      desc: "Perencanaan dan pembuatan topologi jaringan skala enterprise yang efisien, mudah dikelola, dan terukur (scalable).",
      icon: PenTool,
      colorClass: "glass-icon-box-alt2"
    },
    {
      title: "Wireless Point-to-Point",
      desc: "Distribusi jaringan nirkabel (wireless) jarak jauh untuk menghubungkan antar gedung atau kantor cabang tanpa kabel.",
      icon: Share2,
      colorClass: "glass-icon-box-alt3"
    }
  ],
  NEXASERVER: [
    {
      title: "Setup Windows/Linux Server",
      desc: "Instalasi sistem operasi server, active directory, file sharing, dan manajemen user untuk kebutuhan internal kantor.",
      icon: Database,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "Cloud & Web Hosting",
      desc: "Migrasi dan manajemen cloud server (AWS, Google Cloud, VPS) untuk memastikan aplikasi bisnis berjalan 24/7 tanpa henti.",
      icon: Globe,
      colorClass: "glass-icon-box-alt4"
    },
    {
      title: "Data Backup & Recovery",
      desc: "Sistem pencadangan data otomatis (cloud/lokal) dan prosedur pemulihan bencana (Disaster Recovery) untuk mencegah kehilangan data.",
      icon: Layers,
      colorClass: "glass-icon-box-alt2"
    },
    {
      title: "Mail Server Perusahaan",
      desc: "Pembuatan email domain khusus perusahaan (@perusahaan.com) yang aman, profesional, dan bebas spam.",
      icon: Briefcase,
      colorClass: "glass-icon-box"
    }
  ],
  NEXAWEB: [
    {
      title: "Corporate Website Profile",
      desc: "Pembuatan website profil perusahaan yang modern, responsif, dan SEO friendly untuk kredibilitas digital.",
      icon: Monitor,
      colorClass: "glass-icon-box-alt3"
    },
    {
      title: "Sistem Informasi Manajemen",
      desc: "Pengembangan aplikasi berbasis web (SaaS) untuk administrasi, HRD, inventory, atau kebutuhan spesifik bisnis lainnya.",
      icon: Layout,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "E-Commerce Integrasi Payment",
      desc: "Toko online interaktif dengan keranjang belanja dan gateway pembayaran otomatis (transfer bank, e-wallet).",
      icon: ShoppingBag,
      colorClass: "glass-icon-box-alt2"
    }
  ],
  NEXASECURE: [
    {
      title: "Instalasi IP Camera & CCTV",
      desc: "Pemasangan sistem pengawasan CCTV resolusi tinggi yang dapat dipantau langsung dari smartphone kapan saja.",
      icon: Search,
      colorClass: "glass-icon-box-alt4"
    },
    {
      title: "Firewall & Keamanan Jaringan",
      desc: "Implementasi sistem firewall (Fortinet, Mikrotik) untuk memblokir serangan siber, malware, dan akses tidak sah.",
      icon: Database,
      colorClass: "glass-icon-box"
    },
    {
      title: "Setup VPN (Virtual Private Network)",
      desc: "Koneksi jarak jauh yang aman (VPN) agar karyawan dapat mengakses data kantor dari rumah secara terenkripsi.",
      icon: Share2,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "Network Audit & Penetration Testing",
      desc: "Evaluasi celah keamanan jaringan dan server, serta perbaikan sistem untuk mencegah kebocoran data.",
      icon: Code,
      colorClass: "glass-icon-box-alt2"
    }
  ],
  NEXAIOT: [
    {
      title: "Smart Office & Automation",
      desc: "Pemasangan perangkat pintar berbasis IoT seperti kontrol lampu, suhu, dan akses pintu secara otomatis.",
      icon: Smartphone,
      colorClass: "glass-icon-box"
    },
    {
      title: "PABX & IP PBX (Telepon Kantor)",
      desc: "Instalasi sistem telepon internal kantor (PABX) untuk komunikasi antar divisi yang efisien dan hemat biaya.",
      icon: Megaphone,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "Sistem Absensi Biometrik",
      desc: "Integrasi mesin sidik jari atau pengenalan wajah yang terhubung langsung ke server database perusahaan.",
      icon: Monitor,
      colorClass: "glass-icon-box-alt3"
    },
    {
      title: "VoIP (Voice over IP)",
      desc: "Solusi komunikasi suara jarak jauh melalui jaringan internet untuk menghemat tagihan telepon cabang bisnis Anda.",
      icon: Globe,
      colorClass: "glass-icon-box-alt2"
    }
  ]
};

type Category = keyof typeof catalogData;
const categories: Category[] = ["NEXANET", "NEXASERVER", "NEXAWEB", "NEXASECURE", "NEXAIOT"];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<Category>("NEXANET");
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCategoryChange = (cat: Category) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    setIsLoading(true);
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
    loadingTimeout.current = setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
    };
  }, []);

  return (
    <section id="katalog" className="lazy-section py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="text-center mb-10 md:mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-[var(--glass-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase border border-primary/10">
            Katalog Layanan Digital
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Detail Produk & Layanan</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Pilih kategori di bawah ini untuk melihat contoh konkret produk digital (seperti menu hidangan) yang bisa kami kembangkan untuk bisnis Anda.
          </p>
        </ScrollReveal>

        {/* Tab Navigation */}
        <ScrollReveal direction="up" delay={0.1} className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-[color-mix(in_srgb,var(--bg-color)_80%,transparent)] backdrop-blur-md rounded-2xl md:rounded-full glass-sm max-w-fit mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 md:px-6 py-2.5 rounded-xl md:rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md transform scale-105'
                    : 'text-text hover:bg-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
              >
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="glass p-6 md:p-8 flex items-start gap-4 md:gap-6">
                    <div className="shrink-0 mt-1 w-12 h-12 rounded-2xl bg-white/10 animate-pulse"></div>
                    <div className="w-full">
                      <div className="h-6 w-3/4 bg-white/10 rounded-md animate-pulse mb-4"></div>
                      <div className="h-4 w-full bg-white/10 rounded-md animate-pulse mb-2"></div>
                      <div className="h-4 w-5/6 bg-white/10 rounded-md animate-pulse mb-6"></div>
                      <div className="h-4 w-32 bg-white/10 rounded-md animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
              >
                {catalogData[activeCategory].map((product, index) => (
                  <div 
                    key={product.title} 
                    className="glass p-6 md:p-8 flex items-start gap-4 md:gap-6 group hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-service-detail', { detail: { id: activeCategory } }))}
                  >
                    <div className="shrink-0 mt-1">
                      <InteractiveIcon icon={product.icon} colorClass={product.colorClass} size={36} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-text group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="opacity-80 text-sm md:text-base leading-relaxed mb-4">
                        {product.desc}
                      </p>
                      <button className="flex items-center gap-2 text-sm font-bold text-primary group-hover:underline">
                        Konsultasi Solusi Ini <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  );
}

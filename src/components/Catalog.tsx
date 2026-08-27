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
  NEXAWEB: [
    {
      title: "Corporate Website (Company Profile)",
      desc: "Website profesional untuk membangun kredibilitas dan representasi resmi perusahaan Anda di dunia digital. Cocok untuk B2B.",
      icon: Briefcase,
      colorClass: "glass-icon-box"
    },
    {
      title: "E-Commerce System",
      desc: "Toko online canggih terintegrasi dengan payment gateway dan sistem manajemen pesanan cerdas.",
      icon: ShoppingBag,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "Custom Web Application",
      desc: "Aplikasi berbasis web (SaaS) khusus untuk operasional bisnis, seperti portal e-learning, sistem manajemen data, atau forum.",
      icon: Layout,
      colorClass: "glass-icon-box-alt2"
    },
    {
      title: "Landing Page Khusus (Campaign)",
      desc: "Halaman tunggal yang didesain khusus dengan copywriting persuasif untuk memaksimalkan konversi iklan atau peluncuran produk.",
      icon: Globe,
      colorClass: "glass-icon-box-alt3"
    }
  ],
  NEXAAPP: [
    {
      title: "Smart POS (Point of Sale)",
      desc: "Aplikasi kasir modern multi-cabang berbasis cloud untuk restoran, ritel, atau bisnis layanan dengan pencatatan otomatis.",
      icon: Monitor,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "HR & Attendance System",
      desc: "Sistem absensi dan manajemen karyawan terintegrasi dengan fitur geolokasi, pengajuan cuti, dan rekap penggajian.",
      icon: Database,
      colorClass: "glass-icon-box-alt4"
    },
    {
      title: "Inventory & Warehouse App",
      desc: "Aplikasi pelacakan stok barang secara real-time, manajemen pesanan, dan laporan keluar masuk gudang yang akurat.",
      icon: Layers,
      colorClass: "glass-icon-box-alt2"
    },
    {
      title: "Mobile App Konsumen (Android/iOS)",
      desc: "Pembuatan aplikasi mobile ringan untuk kemudahan interaksi langsung antara bisnis Anda dan konsumen setia.",
      icon: Smartphone,
      colorClass: "glass-icon-box"
    }
  ],
  NEXADESIGN: [
    {
      title: "UI/UX Mobile App Design",
      desc: "Riset dan perancangan antarmuka aplikasi seluler yang intuitif, nyaman, dan berpusat pada pengalaman pengguna (User-Centric).",
      icon: Smartphone,
      colorClass: "glass-icon-box-alt3"
    },
    {
      title: "Web Dashboard Interface",
      desc: "Desain panel admin atau dashboard SaaS yang rapi, informatif, dan menyederhanakan data kompleks menjadi visual yang mudah dibaca.",
      icon: Layout,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "Interactive Prototyping",
      desc: "Pembuatan purwarupa (mockup) interaktif klik-tayang yang bisa diuji coba secara langsung sebelum proses programming dimulai.",
      icon: PenTool,
      colorClass: "glass-icon-box-alt2"
    }
  ],
  NEXABRAND: [
    {
      title: "Corporate Logo Design",
      desc: "Perancangan logo perusahaan berstandar internasional yang ikonik, bermakna, dan mampu merepresentasikan visi misi bisnis Anda.",
      icon: PenTool,
      colorClass: "glass-icon-box-alt4"
    },
    {
      title: "Brand Guidelines (Brand Book)",
      desc: "Buku pedoman identitas visual lengkap (palet warna, tipografi, aturan penggunaan logo) untuk menjaga konsistensi brand Anda.",
      icon: BookOpen,
      colorClass: "glass-icon-box"
    },
    {
      title: "Social Media Kit & Feed",
      desc: "Desain template untuk media sosial (Instagram, LinkedIn) yang seragam dan profesional untuk kebutuhan posting rutin.",
      icon: Share2,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "Print & Media Banner",
      desc: "Desain keperluan cetak seperti pamflet promosi, billboard, roll-up banner, atau company profile fisik eksklusif.",
      icon: ImageIcon,
      colorClass: "glass-icon-box-alt2"
    }
  ],
  NEXADIGITAL: [
    {
      title: "SEO Optimization",
      desc: "Optimasi mesin pencari organik agar website perusahaan Anda selalu muncul di halaman pertama Google untuk kata kunci relevan.",
      icon: Search,
      colorClass: "glass-icon-box"
    },
    {
      title: "Performance Ads (Meta & Google)",
      desc: "Manajemen kampanye iklan berbayar secara presisi di Google Search, Instagram, dan Facebook untuk mendapatkan leads berkualitas.",
      icon: Megaphone,
      colorClass: "glass-icon-box-alt1"
    },
    {
      title: "Social Media Management",
      desc: "Pengelolaan akun media sosial perusahaan, mulai dari perencanaan konten, copywriting, hingga interaksi harian.",
      icon: Share2,
      colorClass: "glass-icon-box-alt3"
    },
    {
      title: "Data Analytics & Reporting",
      desc: "Penyusunan laporan konversi bulanan berbasis data (Google Analytics) untuk mengevaluasi dan merencanakan langkah pemasaran selanjutnya.",
      icon: BarChart3,
      colorClass: "glass-icon-box-alt2"
    }
  ]
};

type Category = keyof typeof catalogData;
const categories: Category[] = ["NEXAWEB", "NEXAAPP", "NEXADESIGN", "NEXABRAND", "NEXADIGITAL"];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<Category>("NEXAWEB");
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

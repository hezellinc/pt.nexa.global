import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const portfolioData = [
  {
    id: 'p1',
    title: 'EcoShop E-Commerce',
    category: 'NEXAWEB',
    imgSrc: '/nexaweb.png',
    shortDesc: 'Platform e-commerce ramah lingkungan dengan sistem inventaris dan payment gateway terintegrasi.',
  },
  {
    id: 'p2',
    title: 'FinTrack Dashboard',
    category: 'NEXADESIGN',
    imgSrc: '/nexadesign.png',
    shortDesc: 'Desain ulang UI/UX dashboard analitik keuangan untuk B2B SaaS, meningkatkan retensi pengguna.',
  },
  {
    id: 'p3',
    title: 'Smart HR Absensi',
    category: 'NEXAAPP',
    imgSrc: '/nexaapp.png',
    shortDesc: 'Aplikasi mobile absensi karyawan berbasis geolokasi dan pengenalan wajah (Face ID).',
  },
  {
    id: 'p4',
    title: 'Bite & Brew Rebranding',
    category: 'NEXABRAND',
    imgSrc: '/nexabrand.png',
    shortDesc: 'Pembuatan identitas visual lengkap, logo, dan brand guidelines untuk waralaba kafe nasional.',
  },
  {
    id: 'p5',
    title: 'TechGrow SEO Campaign',
    category: 'NEXADIGITAL',
    imgSrc: '/nexadigital.png',
    shortDesc: 'Kampanye SEO dan manajemen Ads yang meningkatkan traffic organik klien sebesar 300% dalam 4 bulan.',
  },
  {
    id: 'p6',
    title: 'MedikaCare Portal',
    category: 'NEXAWEB',
    imgSrc: '/nexaprofile.png',
    shortDesc: 'Portal pendaftaran pasien rumah sakit dengan integrasi rekam medis elektronik yang aman.',
  }
];

const categories = ['Semua', 'NEXAWEB', 'NEXAAPP', 'NEXADESIGN', 'NEXABRAND', 'NEXADIGITAL'];

export default function Portfolio() {
  const [filter, setFilter] = useState('Semua');
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleFilterChange = (cat: string) => {
    if (cat === filter) return;
    setFilter(cat);
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

  const filteredPortfolio = filter === 'Semua' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);

  const openDetail = (id: string) => {
    window.dispatchEvent(new CustomEvent('open-portfolio', { detail: id }));
  };

  return (
    <section id="portofolio" className="lazy-section py-12 md:py-16 px-4 md:px-8 bg-[color-mix(in_srgb,var(--bg-color)_40%,transparent)]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="text-center mb-10 md:mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-[var(--glass-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase border border-primary/10">
            Karya Terbaik Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Portofolio Proyek</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Jelajahi berbagai solusi digital sukses yang telah kami kembangkan untuk klien dari berbagai industri.
          </p>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal direction="up" delay={0.1} className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-[color-mix(in_srgb,var(--bg-color)_80%,transparent)] backdrop-blur-md rounded-2xl md:rounded-full glass-sm max-w-fit mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-4 md:px-5 py-2 rounded-xl md:rounded-full text-sm font-bold transition-all duration-300 ${
                  filter === cat
                    ? 'bg-primary text-white shadow-md transform scale-105'
                    : 'text-text hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass overflow-hidden flex flex-col">
                    <div className="h-48 md:h-56 w-full bg-white/10 animate-pulse border-b border-text/5"></div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="h-6 w-2/3 bg-white/10 rounded-md animate-pulse mb-4"></div>
                      <div className="h-4 w-full bg-white/10 rounded-md animate-pulse mb-2"></div>
                      <div className="h-4 w-5/6 bg-white/10 rounded-md animate-pulse mb-6 flex-grow"></div>
                      <div className="h-4 w-32 bg-white/10 rounded-md animate-pulse mt-auto pt-4 border-t border-text/10"></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key={filter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredPortfolio.map((project) => (
                  <div
                    key={project.id}
                    className="glass overflow-hidden flex flex-col group cursor-pointer transition-transform hover:-translate-y-1 duration-300"
                    onClick={() => openDetail(project.id)}
                  >
                    {/* Clean Image Display */}
                    <div className="h-48 md:h-56 w-full bg-white/5 relative overflow-hidden flex items-center justify-center p-8 border-b border-text/5">
                      <img 
                        src={project.imgSrc}
                        alt={project.title}
                        className="w-full h-full object-contain drop-shadow-sm opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      />
                      
                      {/* Minimalist Badge */}
                      <div className="absolute top-4 right-4 z-20 bg-[var(--bg-color)] px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-text/10">
                        {project.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-text group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="opacity-70 text-sm leading-relaxed mb-4 flex-grow">
                        {project.shortDesc}
                      </p>
                      <button className="flex items-center gap-2 text-sm font-bold text-text group-hover:text-primary transition-colors mt-auto pt-4 border-t border-text/10">
                        Lihat Studi Kasus <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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

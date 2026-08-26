import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Smartphone, PenTool, Layout, Megaphone, ArrowRight, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import InteractiveIcon from './InteractiveIcon';

const portfolioData = [
  {
    id: 'p1',
    title: 'EcoShop E-Commerce',
    category: 'NEXAWEB',
    icon: Globe,
    colorClass: 'clay-icon-box',
    shortDesc: 'Platform e-commerce ramah lingkungan dengan sistem inventaris dan payment gateway terintegrasi.',
    image: 'bg-emerald-500/10'
  },
  {
    id: 'p2',
    title: 'FinTrack Dashboard',
    category: 'NEXADESIGN',
    icon: Layout,
    colorClass: 'clay-icon-box-alt1',
    shortDesc: 'Desain ulang UI/UX dashboard analitik keuangan untuk B2B SaaS, meningkatkan retensi pengguna.',
    image: 'bg-blue-500/10'
  },
  {
    id: 'p3',
    title: 'Smart HR Absensi',
    category: 'NEXAAPP',
    icon: Smartphone,
    colorClass: 'clay-icon-box-alt2',
    shortDesc: 'Aplikasi mobile absensi karyawan berbasis geolokasi dan pengenalan wajah (Face ID).',
    image: 'bg-purple-500/10'
  },
  {
    id: 'p4',
    title: 'Bite & Brew Rebranding',
    category: 'NEXABRAND',
    icon: PenTool,
    colorClass: 'clay-icon-box-alt4',
    shortDesc: 'Pembuatan identitas visual lengkap, logo, dan brand guidelines untuk waralaba kafe nasional.',
    image: 'bg-amber-500/10'
  },
  {
    id: 'p5',
    title: 'TechGrow SEO Campaign',
    category: 'NEXADIGITAL',
    icon: Megaphone,
    colorClass: 'clay-icon-box-alt3',
    shortDesc: 'Kampanye SEO dan manajemen Ads yang meningkatkan traffic organik klien sebesar 300% dalam 4 bulan.',
    image: 'bg-rose-500/10'
  },
  {
    id: 'p6',
    title: 'MedikaCare Portal',
    category: 'NEXAWEB',
    icon: Globe,
    colorClass: 'clay-icon-box-alt1',
    shortDesc: 'Portal pendaftaran pasien rumah sakit dengan integrasi rekam medis elektronik yang aman.',
    image: 'bg-cyan-500/10'
  }
];

const categories = ['Semua', 'NEXAWEB', 'NEXAAPP', 'NEXADESIGN', 'NEXABRAND', 'NEXADIGITAL'];

export default function Portfolio() {
  const [filter, setFilter] = useState('Semua');

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
          <div className="inline-block mb-4 px-4 py-2 bg-[var(--clay-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase border border-primary/10">
            Karya Terbaik Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Portofolio Proyek</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Jelajahi berbagai solusi digital sukses yang telah kami kembangkan untuk klien dari berbagai industri.
          </p>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal direction="up" delay={0.1} className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-[color-mix(in_srgb,var(--bg-color)_80%,transparent)] backdrop-blur-md rounded-2xl md:rounded-full clay-sm max-w-fit mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
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
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredPortfolio.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="clay overflow-hidden flex flex-col group cursor-pointer"
                  onClick={() => openDetail(project.id)}
                >
                  {/* Image Placeholder */}
                  <div className={`h-48 w-full ${project.image} relative overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative z-20 opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      <InteractiveIcon icon={project.icon} colorClass={project.colorClass} size={64} />
                    </motion.div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-primary/20">
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
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

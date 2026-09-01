import { motion } from 'motion/react';
import { Monitor, Smartphone, PenTool, LayoutTemplate } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';
import ShinyText from './ShinyText';

export default function Hero() {
  return (
    <section id="beranda" className="lazy-section pt-32 pb-12 flex flex-col items-center justify-center relative px-4">
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/4 left-[5%] md:left-[10%] opacity-30 md:opacity-50"
        >
          <InteractiveIcon icon={PenTool} colorClass="glass-icon-box-alt1" size={24} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/3 right-[5%] md:right-[15%] opacity-30 md:opacity-50"
        >
          <InteractiveIcon icon={Monitor} colorClass="glass-icon-box-alt2" size={24} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-[10%] md:left-[20%] opacity-30 md:opacity-50"
        >
          <InteractiveIcon icon={Smartphone} colorClass="glass-icon-box-alt3" size={24} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -15, 15, 0] }} 
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-[5%] md:right-[10%] opacity-30 md:opacity-50"
        >
          <InteractiveIcon icon={LayoutTemplate} colorClass="glass-icon-box-alt4" size={24} />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 md:px-6 py-2 bg-[var(--glass-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase"
        >
          Inovasi Digital Tanpa Batas
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 md:mb-8 flex justify-center w-full"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight px-2">
            <ShinyText
              text="Solusi B2B & Enterprise"
              speed={2}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              delay={0}
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
              className="tracking-tight"
            />
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl opacity-80 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Kami menjadi mitra strategis (B2B) dalam memberikan solusi IT komprehensif—mulai dari instalasi infrastruktur jaringan (TJKT), manajemen server cloud, hingga pengembangan aplikasi web dan IoT untuk operasional enterprise.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-6 w-full px-6"
        >
          <a href="#layanan" className="glass-btn-accent px-8 py-4 font-bold text-base md:text-lg w-full sm:w-auto flex items-center justify-center text-center">
            Eksplorasi Layanan
          </a>
          <a href="#kontak" className="glass-btn-accent opacity-80 hover:opacity-100 px-8 py-4 font-bold text-base md:text-lg w-full sm:w-auto flex items-center justify-center text-center">
            Konsultasi Gratis
          </a>
        </motion.div>
      </div>
    </section>
  );
}

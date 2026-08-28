import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, Play, Pause, MessageSquare } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  avatarColor: string;
  rating: number;
  service: string;
  comment: string;
  impactMetric: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Budi Perkasa',
    role: 'IT Director',
    company: 'PT Solusi Manufaktur Nusantara',
    avatar: 'BP',
    avatarColor: 'bg-primary/20 text-primary border-primary/30',
    rating: 5,
    service: 'NEXANET & NEXASERVER',
    comment: 'Instalasi topologi Fiber Optic dan migrasi server lokal yang dilakukan tim NexaTech sangat luar biasa. Masalah jaringan terputus antar pabrik kini teratasi sepenuhnya dengan uptime 99.9%.',
    impactMetric: 'Uptime Jaringan 99.9%'
  },
  {
    id: 2,
    name: 'Amanda Kirana',
    role: 'Head of Operations',
    company: 'Logistics Smart System',
    avatar: 'AK',
    avatarColor: 'bg-secondary/20 text-secondary border-secondary/30',
    rating: 5,
    service: 'NEXASECURE',
    comment: 'Pemasangan IP Camera resolusi 4K dan konfigurasi firewall Fortinet memberikan kami kendali penuh atas keamanan gudang. Sistem pemantauan terpusatnya bekerja tanpa cacat.',
    impactMetric: 'Keamanan Data & Aset'
  },
  {
    id: 3,
    name: 'Dr. Hendra Wijaya',
    role: 'Direktur Utama',
    company: 'RS Medika Sejahtera',
    avatar: 'HW',
    avatarColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    rating: 5,
    service: 'NEXAWEB & NEXASERVER',
    comment: 'Sistem Informasi Rumah Sakit yang dibangun dan dihosting di server on-premise kami berjalan sangat cepat. Keamanan rekam medis pasien terjamin, dan proses antrean menjadi sangat efisien.',
    impactMetric: 'Efisiensi Antrean +60%'
  },
  {
    id: 4,
    name: 'Siti Rahmawati',
    role: 'General Manager',
    company: 'EduTech Campus',
    avatar: 'SR',
    avatarColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    rating: 5,
    service: 'NEXAIOT & NEXANET',
    comment: 'Implementasi PABX/VoIP dan instalasi jaringan Wi-Fi di seluruh area kampus berlangsung rapi dan profesional. Tagihan komunikasi antar departemen kami turun drastis!',
    impactMetric: 'Hemat Biaya Telp 65%'
  },
  {
    id: 5,
    name: 'Kevin Tanujaya',
    role: 'CEO',
    company: 'Bintang Retail Group',
    avatar: 'KT',
    avatarColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    rating: 5,
    service: 'NEXASUPPORT',
    comment: 'Berkat kontrak IT Maintenance bulanan, kami tidak perlu lagi repot mengurus masalah hardware atau perbaikan server. Respon tim teknis sangat cepat saat terjadi kendala operasional.',
    impactMetric: 'SLA Respon < 2 Jam'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const activeTestimonial = testimonials[currentIndex];

  const slideVariants: Variants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 80 : -80,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -80 : 80,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    })
  };

  return (
    <section id="testimoni" className="lazy-section py-12 md:py-16 px-4 md:px-8 relative overflow-hidden bg-[color-mix(in_srgb,var(--bg-color)_60%,transparent)]">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-24 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[var(--glass-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase border border-primary/10">
            <MessageSquare size={16} className="text-primary" />
            <span>Kepercayaan Klien</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-text tracking-tight">
            Ulasan & Pengalaman <span className="text-primary">Mitra Bisnis</span>
          </h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Komitmen kami adalah menghadirkan dampak nyata dan kepuasan tinggi bagi setiap perusahaan yang berkolaborasi bersama PT NexaTech Solutions.
          </p>
        </ScrollReveal>

        {/* Testimonial Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main Claymorphism Card */}
          <div className="glass min-h-[380px] md:min-h-[340px] p-6 sm:p-8 md:p-12 relative flex flex-col justify-between overflow-hidden">
            
            {/* Top Decorative Quote & Badge Header */}
            <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl glass-sm flex items-center justify-center text-primary bg-primary/10">
                  <Quote size={28} className="fill-primary/20 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-1">
                    {activeTestimonial.service}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Impact Metric Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glass-sm text-xs md:text-sm font-bold text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>{activeTestimonial.impactMetric}</span>
              </div>
            </div>

            {/* Testimonial Content Slide with Animation */}
            <div className="relative flex-grow flex items-center my-2 min-h-[120px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed opacity-90 text-text italic">
                    "{activeTestimonial.comment}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Client Profile Footer */}
            <div className="pt-6 mt-4 border-t border-text/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl font-black text-lg md:text-xl flex items-center justify-center border-2 shadow-sm ${activeTestimonial.avatarColor}`}>
                  {activeTestimonial.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base md:text-lg text-text">
                      {activeTestimonial.name}
                    </h4>
                    <span className="inline-flex items-center text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded">
                      <CheckCircle2 size={12} className="mr-1" /> Terverifikasi
                    </span>
                  </div>
                  <p className="text-xs md:text-sm opacity-70">
                    {activeTestimonial.role} &bull; <span className="font-semibold">{activeTestimonial.company}</span>
                  </p>
                </div>
              </div>

              {/* Mobile Impact Metric Badge */}
              <div className="sm:hidden flex items-center gap-1.5 px-3 py-1 rounded-lg glass-sm text-xs font-bold text-emerald-400 self-start">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>{activeTestimonial.impactMetric}</span>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
            
            {/* Auto-play Status & Play/Pause */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 glass-sm rounded-xl text-text hover:text-primary transition-colors flex items-center gap-2 text-xs font-semibold"
                title={isPlaying ? "Jeda Otomatis" : "Putar Otomatis"}
              >
                {isPlaying ? (
                  <>
                    <Pause size={16} className="text-primary" />
                    <span className="hidden sm:inline">Jeda Carousel</span>
                  </>
                ) : (
                  <>
                    <Play size={16} className="text-primary" />
                    <span className="hidden sm:inline">Putar Otomatis</span>
                  </>
                )}
              </button>
              <span className="text-xs opacity-60">
                {currentIndex + 1} dari {testimonials.length} mitra
              </span>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => goToSlide(idx)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-primary shadow-sm'
                      : 'w-3 bg-text/20 hover:bg-text/40'
                  }`}
                  aria-label={`Ke ulasan ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="p-3 glass-sm rounded-2xl text-text hover:text-primary hover:scale-105 transition-all active:scale-95"
                aria-label="Ulasan Sebelumnya"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 glass-sm rounded-2xl text-text hover:text-primary hover:scale-105 transition-all active:scale-95"
                aria-label="Ulasan Selanjutnya"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';
import ScrollReveal from './ScrollReveal';

const faqs = [
  {
    question: "Apa saja layanan utama NexaTech di bidang TJKT?",
    answer: "Kami melayani instalasi infrastruktur jaringan (LAN, WAN, Fiber Optic), konfigurasi router/switch (Mikrotik, Cisco), instalasi CCTV & IP Camera, setup perangkat IoT (Smart Office), serta manajemen server dan cloud hosting (VPS, AWS, Google Cloud)."
  },
  {
    question: "Apakah NexaTech juga menerima pembuatan website atau aplikasi?",
    answer: "Ya, meskipun fokus kami adalah infrastruktur IT (TJKT), kami memiliki tim developer berpengalaman untuk membangun Sistem Informasi Manajemen, Web Company Profile, hingga aplikasi E-Commerce yang terintegrasi langsung dengan server lokal Anda."
  },
  {
    question: "Apakah perusahaan harus beli perangkat (hardware) sendiri?",
    answer: "Tidak perlu. Kami melayani skema End-to-End di mana kami yang akan merancang Bill of Quantities (BoQ) dan menyediakan seluruh hardware (Server, Router, Kabel, CCTV) dengan harga distributor resmi."
  },
  {
    question: "Bagaimana dengan jaminan atau garansi instalasi jaringan?",
    answer: "Kami memberikan garansi fisik instalasi dan SLA uptime jaringan sesuai paket yang dipilih (umumnya 1 hingga 6 bulan pertama). Jika ada kendala, tim dukungan teknis kami siap melakukan remote troubleshooting atau kunjungan fisik."
  },
  {
    question: "Apakah bisa melayani instalasi jaringan untuk proyek luar kota?",
    answer: "Sangat bisa. Engineer kami siap diberangkatkan ke berbagai kota di Indonesia untuk tahap Site Survey hingga instalasi, terutama untuk proyek menengah ke atas seperti pabrik, kampus, atau gedung perkantoran."
  },
  {
    question: "Apakah ada layanan IT Maintenance berkala?",
    answer: "Ya, kami menyediakan paket NEXASUPPORT berupa kontrak pemeliharaan IT bulanan atau tahunan. Layanan ini mencakup perbaikan jaringan, backup server, pembersihan hardware, dan optimasi keamanan siber perusahaan."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="lazy-section py-8 md:py-10 px-4 md:px-8 bg-[color-mix(in_srgb,var(--bg-color)_50%,transparent)]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal direction="up" className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-[var(--glass-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase">
            Tanya Jawab
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Frequently Asked Questions</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Jawaban untuk beberapa pertanyaan yang paling sering diajukan oleh calon klien kami.
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 0.08}
            >
              <div className={`glass-sm overflow-hidden transition-all duration-300 ${openIndex === index ? 'ring-2 ring-primary/20' : ''}`}>
                <button 
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex shrink-0">
                      <InteractiveIcon 
                        icon={MessageCircle} 
                        colorClass={openIndex === index ? 'glass-icon-box' : 'glass-icon-box-alt1'} 
                        size={20} 
                      />
                    </div>
                    <h3 className={`text-lg md:text-xl font-bold transition-colors ${openIndex === index ? 'text-primary' : 'text-text'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`shrink-0 ml-4 p-2 rounded-full glass-sm transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 md:p-6 pt-0 sm:pl-20">
                        <div className="p-4 rounded-2xl bg-white/5 opacity-90 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

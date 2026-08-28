import { Target, Users, Zap } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import InteractiveIcon from './InteractiveIcon';
import ScrollReveal from './ScrollReveal';
import TerminalVisual from './TerminalVisual';

const StatCounter = ({ end, suffix = "", label }: { end: number, suffix?: string, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const duration = 2000;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(ease * end);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end]);

  const displayCount = end % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <div ref={ref} className="glass-sm p-4 rounded-2xl text-center flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300">
      <div className="text-3xl md:text-4xl font-black text-primary mb-1">
        {displayCount}{suffix}
      </div>
      <div className="text-xs md:text-sm opacity-80 uppercase tracking-wider font-semibold">{label}</div>
    </div>
  );
};

export default function About() {
  return (
    <section id="tentang" className="lazy-section py-8 md:py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          
          {/* Image/Visual side */}
          <ScrollReveal direction="right" className="w-full lg:w-1/2 max-w-md lg:max-w-none mx-auto">
            <TerminalVisual />
          </ScrollReveal>

          {/* Text side */}
          <ScrollReveal direction="left" delay={0.15} className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-text">Mitra Transformasi IT & Digital Terpercaya</h2>
            <p className="opacity-80 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
              PT. NexaTech Solutions adalah pionir penyedia solusi digital B2B terintegrasi. Kami merancang infrastruktur digital yang tangguh, inovatif, dan efisien untuk memastikan margin keuntungan perusahaan Anda berakselerasi.
            </p>
            
            <div className="space-y-6">
              <div className="glass-sm p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary/80"></div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target size={20} className="text-primary" />
                  </div>
                  Visi Perusahaan
                </h3>
                <p className="opacity-80 text-sm md:text-base leading-relaxed">
                  Menjadi penyedia solusi Infrastruktur Jaringan (TJKT) dan sistem IT Enterprise terdepan yang andal, aman, dan terukur untuk mendukung percepatan digitalisasi bisnis global.
                </p>
              </div>

              <div className="glass-sm p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 left-0 w-2 h-full bg-purple-500/80"></div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Zap size={20} className="text-purple-500" />
                  </div>
                  Misi Utama
                </h3>
                <ul className="space-y-3 opacity-80 text-sm md:text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold mt-0.5 opacity-60">01.</span>
                    <span>Menghadirkan layanan instalasi jaringan, server, dan keamanan siber dengan standar uptime tinggi kelas enterprise.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold mt-0.5 opacity-60">02.</span>
                    <span>Mengoptimalkan efisiensi operasional klien melalui integrasi IoT, otomatisasi, dan pengembangan web sistem informasi.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold mt-0.5 opacity-60">03.</span>
                    <span>Memberikan dukungan teknis (IT Maintenance) jangka panjang berdasarkan profesionalisme dan SLA yang terjamin.</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Statistics Row */}
        <ScrollReveal direction="up" delay={0.2} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 md:mt-16">
          <StatCounter end={100} suffix="+" label="Server Dikelola" />
          <StatCounter end={50} suffix="Km+" label="Kabel FO Ditarik" />
          <StatCounter end={99.9} suffix="%" label="Uptime Jaringan" />
          <StatCounter end={24} suffix="/7" label="Monitoring Aktif" />
        </ScrollReveal>

      </div>
    </section>
  );
}

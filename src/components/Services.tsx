import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Services() {
  const services = [
    { 
      id: 1,
      title: 'NEXANET',
      subtitle: 'NETWORK INFRASTRUCTURE',
      desc: 'Instalasi dan konfigurasi jaringan LAN, WAN, Fiber Optic, dan manajemen router/switch (Mikrotik/Cisco).', 
      img: "/nexaweb.png",
      colorClass: 'glass-icon-box-alt2'
    },
    { 
      id: 2,
      title: 'NEXASERVER',
      subtitle: 'SERVER & CLOUD',
      desc: 'Pengelolaan web server, VPS, Data Center, dan sistem operasi jaringan (Linux/Windows Server) untuk perusahaan.', 
      img: "/nexaapp.png",
      colorClass: 'glass-icon-box-alt3'
    },
    { 
      id: 3,
      title: 'NEXAWEB',
      subtitle: 'WEB & APP DEVELOPMENT',
      desc: 'Pembuatan website company profile, e-commerce, hingga aplikasi sistem informasi untuk kebutuhan bisnis Anda.', 
      img: "/nexadesign.png",
      colorClass: 'glass-icon-box-alt1'
    },
    { 
      id: 4,
      title: 'NEXASECURE',
      subtitle: 'CYBER SECURITY & CCTV',
      desc: 'Pemasangan IP Camera, konfigurasi firewall, VPN, dan mitigasi keamanan jaringan untuk melindungi data Anda.', 
      img: "/nexabrand.png",
      colorClass: 'glass-icon-box-alt4'
    },
    { 
      id: 5,
      title: 'NEXAIOT',
      subtitle: 'IoT & TELECOM',
      desc: 'Integrasi perangkat Internet of Things, instalasi VoIP, PABX, dan smart office system modern.', 
      img: "/nexamedia.png",
      colorClass: 'glass-icon-box-alt2'
    },
    { 
      id: 6,
      title: 'NEXASUPPORT',
      subtitle: 'IT MAINTENANCE',
      desc: 'Perawatan rutin perangkat keras, troubleshooting komputer, perbaikan server, dan dukungan teknis IT.', 
      img: "/nexaprofile.png",
      colorClass: 'glass-icon-box-alt1'
    }
  ];

  return (
    <section id="layanan" className="lazy-section py-8 md:py-10 px-4 md:px-8 bg-[color-mix(in_srgb,var(--bg-color)_50%,transparent)]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Layanan Unggulan Kami</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Solusi digital komprehensif yang dirancang khusus untuk meningkatkan daya saing dan efisiensi bisnis Anda.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {services.map((service, index) => (
            <ScrollReveal 
              key={service.id}
              direction="up"
              delay={index * 0.08}
              className="h-full"
            >
              <motion.div 
                onClick={() => window.dispatchEvent(new CustomEvent('open-service-detail', { detail: { id: service.title } }))}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass p-6 md:p-8 flex flex-col h-full relative overflow-hidden group cursor-pointer"
              >
                <div className="mb-6 flex justify-between items-start">
                  <motion.img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md rounded-2xl"
                    whileHover={{ scale: 1.08, rotate: [-2, 2, -2, 0] }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div className="w-10 h-10 md:w-12 md:h-12 glass-sm flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors cursor-pointer shrink-0">
                    <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1 text-text">{service.title}</h3>
                <p className="text-xs font-semibold text-primary/80 mb-3 md:mb-4 uppercase tracking-wider">{service.subtitle}</p>
                <p className="opacity-80 leading-relaxed flex-grow text-sm md:text-base">
                  {service.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

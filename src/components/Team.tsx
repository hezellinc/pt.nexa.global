import { motion } from 'motion/react';
import { User, Briefcase, Palette, Calculator, Code, Megaphone } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';
import ScrollReveal from './ScrollReveal';

const teamMembers = [
  {
    name: 'Muhammad Zyldan Muzhaffar',
    jabatan: 'CEO',
    role: 'Corporate Strategy & Leadership',
    icon: Briefcase,
    colorClass: 'glass-icon-box',
    initials: 'MZ',
    image: '/zyldan.jpg'
  },
  {
    name: 'Muhammad Fariz Alfauzi',
    jabatan: 'Marketing',
    role: 'Digital Campaign & SEO',
    icon: Megaphone,
    colorClass: 'glass-icon-box-alt2',
    initials: 'MF',
    image: '/fariz.jpg'
  },
  {
    name: 'Dimas Alvino',
    jabatan: 'Marketing',
    role: 'B2B Client Acquisition',
    icon: Megaphone,
    colorClass: 'glass-icon-box-alt1',
    initials: 'DA',
    image: '/dimas.jpg'
  },
  {
    name: 'Reihan Alvin',
    jabatan: 'Designer',
    role: 'Product Structure & System Design',
    icon: Palette,
    colorClass: 'glass-icon-box-accent',
    initials: 'RA',
    image: '/alvin.jpg'
  },
  {
    name: 'Wolid Herdiansyah',
    jabatan: 'Designer',
    role: 'Visual & Branding Design',
    icon: Palette,
    colorClass: 'glass-icon-box-alt2',
    initials: 'WH',
    image: '/wolid.jpg'
  },
  {
    name: 'Annas Nasri',
    jabatan: 'Keuangan',
    role: 'Financial Planning & Budgeting',
    icon: Calculator,
    colorClass: 'glass-icon-box-alt3',
    initials: 'AN',
    image: '/annas.jpg'
  },
  {
    name: 'Zulpa Apriliani',
    jabatan: 'Keuangan',
    role: 'Accounting & Audit',
    icon: Calculator,
    colorClass: 'glass-icon-box-alt4',
    initials: 'ZA',
    image: '/zulpa.jpg'
  }
];

export default function Team() {
  return (
    <section id="tim" className="lazy-section py-8 md:py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Tim Kami</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Pakar-pakar kreatif dan teknis di balik kesuksesan solusi digital NexaTech.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <ScrollReveal
              key={member.name}
              direction="up"
              delay={index * 0.1}
              className="h-full"
            >
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass p-6 md:p-8 flex flex-col items-center text-center h-full group"
              >
                <div className="mb-6 relative">
                  {member.image ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-inner flex items-center justify-center">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover pointer-events-none select-none" 
                        draggable="false" 
                        onContextMenu={(e) => e.preventDefault()} 
                      />
                    </div>
                  ) : (
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-inner ${member.colorClass}`}>
                      {member.initials}
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-[var(--glass-bg)] rounded-full p-2 shadow-md">
                    <member.icon size={20} className="text-text" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-text group-hover:text-primary transition-colors">{member.name}</h3>
                
                {/* Jabatan Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                  {member.jabatan}
                </div>
                
                {/* Role Description */}
                <p className="text-sm opacity-70">
                  <span className="font-semibold text-white/90">Role:</span> {member.role}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

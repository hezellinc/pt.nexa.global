import { Check, ShoppingCart, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const plans = [
  {
    name: 'Starter',
    price: 'Rp 2.500.000',
    description: 'Cocok untuk UMKM dan bisnis rintisan yang ingin go digital.',
    features: [
      'Website Landing Page', 
      'Domain & Hosting 1 Tahun', 
      'Desain UI/UX Basic', 
      'Distribusi via Tautan Web',
      'Dukungan Teknis 1 Bulan'
    ],
    colorClass: 'glass-icon-box-alt2',
    buttonClass: 'glass-btn-accent',
    popular: false
  },
  {
    name: 'Professional',
    price: 'Rp 7.500.000',
    description: 'Solusi lengkap untuk perusahaan yang membutuhkan fungsionalitas tinggi.',
    features: [
      'Website Multi-halaman & CMS', 
      'Integrasi Payment Gateway (Penjualan)', 
      'Desain UI/UX Custom & Animasi', 
      'Distribusi Web & Aplikasi PWA', 
      'Dukungan Teknis 6 Bulan'
    ],
    colorClass: 'glass-icon-box',
    buttonClass: 'glass-btn',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Pengembangan skala besar dengan kebutuhan infrastruktur khusus.',
    features: [
      'Sistem Informasi & E-Commerce Kompleks', 
      'Aplikasi Mobile (Android & iOS)', 
      'UI/UX Research & Testing', 
      'Distribusi ke App Store & Play Store', 
      'Dukungan Teknis 1 Tahun'
    ],
    colorClass: 'glass-icon-box-alt1',
    buttonClass: 'glass-btn-accent',
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="harga" className="lazy-section py-8 md:py-10 px-4 md:px-8 bg-[color-mix(in_srgb,var(--bg-color)_30%,transparent)]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-[var(--glass-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase">
            Penjualan & Paket
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Pilihan Paket Layanan</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Kami siap membantu dari perancangan hingga produk didistribusikan.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <ScrollReveal 
              key={plan.name}
              direction="up"
              delay={index * 0.1}
              className="flex flex-col h-full"
            >
              <div className={`glass relative flex flex-col p-6 md:p-8 h-full ${plan.popular ? 'border-2 border-primary transform md:-translate-y-4' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
                    <Star size={16} className="fill-current" /> Paling Laris
                  </div>
                )}
                <h3 className="text-2xl font-bold text-text mb-2">{plan.name}</h3>
                <p className="opacity-60 text-sm mb-6 min-h-[40px]">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl lg:text-4xl font-black text-text">{plan.price}</span>
                </div>
                
                <button className={`${plan.buttonClass} w-full py-3 md:py-4 rounded-xl font-bold text-lg mb-8 flex items-center justify-center gap-2 transition-all`}>
                  <ShoppingCart size={20} /> Pesan Sekarang
                </button>
                
                <div className="flex flex-col gap-4 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white ${plan.colorClass}`}>
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="opacity-90 text-sm md:text-base font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

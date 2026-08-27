export default function ContactMap() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden z-10 relative bg-white/5">
      {/* Menggunakan Google Maps Iframe (100% Gratis, Tanpa API Key, Tanpa Billing) */}
      <iframe 
        title="Google Maps - NexaTech Solutions"
        src="https://maps.google.com/maps?q=Chinatown,Singapore&t=&z=15&ie=UTF8&iwloc=&output=embed" 
        width="100%" 
        height="100%" 
        style={{ border: 0, filter: 'contrast(1.05) opacity(0.9)' }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 z-0 grayscale-[20%] invert-[90%] hue-rotate-180 transition-all duration-500 hover:grayscale-0 hover:invert-0 hover:hue-rotate-0"
      ></iframe>
      
      {/* Layer Interaksi (Opsional: agar tetap empuk ala glassmorphism) */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-10 rounded-2xl"></div>
    </div>
  );
}

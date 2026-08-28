import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Trash2, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SYSTEM_PROMPT = `Anda adalah Nexa Assistant, konsultan AI resmi untuk PT. NexaTech Solutions.
Tugas Anda adalah membantu klien (fokus pada instansi, korporasi, dan perusahaan B2B) memahami layanan TJKT (Teknik Jaringan Komputer dan Telekomunikasi), Server, Keamanan Siber, dan infrastruktur IT kami.
Gunakan format **Markdown** untuk setiap jawaban Anda agar rapi, terstruktur, dan mudah dibaca (gunakan bullet points, bold, list, atau heading jika perlu). 

INFORMASI PERUSAHAAN (PT. NexaTech Solutions):
- **Fokus Utama**: Menjadi penyedia solusi Infrastruktur Jaringan (TJKT) dan sistem IT Enterprise yang andal dan terukur.
- **Lokasi Kantor**: Chinatown, Singapore.
- **Kontak**: Email (nexatech@yahoo.com), Telepon/WA (+62 877-9872-5167).

LAYANAN KAMI:
1. **NEXANET**: Infrastruktur Jaringan (Instalasi Fiber Optic, LAN, WAN, Konfigurasi Router/Switch Mikrotik & Cisco).
2. **NEXASERVER**: Manajemen Server & Cloud (Setup Windows/Linux Server, VPS, AWS/Google Cloud, Data Center).
3. **NEXAWEB**: Pengembangan Sistem Informasi & Web App (Terintegrasi dengan server lokal perusahaan, E-Commerce, Profile).
4. **NEXASECURE**: Keamanan Siber & CCTV (Instalasi IP Camera, Firewall Fortinet/Mikrotik, setup VPN).
5. **NEXAIOT**: Solusi IoT & Telekomunikasi (Smart Office, VoIP, Mesin Absensi Biometrik, PABX).
6. **NEXASUPPORT**: Layanan IT Maintenance bulanan/tahunan (Dukungan teknis hardware dan jaringan).

TIM KAMI (Engineer & Teknisi):
- **Muhammad Zyldan Muzhaffar**: CEO
- **Muhammad Fariz Alfauzi**: Network Engineer & Dev
- **Zulpa Apriliani**: Keuangan
- **Annas Nasri**: Keuangan
- **Dimas Alvino**: System Administrator
- **Reihan Alvin**: IT Support
- **Wolid Herdiansyah**: Technical Support

PANDUAN MENJAWAB:
1. Selalu bersikap profesional, ramah, dan sangat berpengetahuan dalam bidang TJKT, Jaringan, Hardware, dan infrastruktur IT.
2. Arahkan klien pada layanan infrastruktur dan TJKT yang paling tepat dari NexaTech sesuai kebutuhan efisiensi mereka. Jika mereka bertanya tentang web, sampaikan bahwa kita punya layanan NEXAWEB.
3. Selalu gunakan format **Markdown** agar tulisan rapi.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const DEFAULT_MESSAGE: Message = { role: 'assistant', content: 'Halo! Saya Nexa Assistant. Ada yang bisa saya bantu terkait layanan IT, IoT, atau AI di NexaTech Solutions?' };

export default function NexaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([DEFAULT_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('nexa_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error("Gagal memuat history chat:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('nexa_chat_history', JSON.stringify(messages));
    }
  }, [messages, isInitialized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const handleClearHistory = () => {
    setMessages([DEFAULT_MESSAGE]);
    setShowClearConfirm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Mengirim request ke endpoint backend lokal
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Server merespons dengan status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data?.choices?.[0]?.message?.content || "Maaf, respon tidak bisa dibuat.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, terjadi kesalahan koneksi dengan server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[80vh] glass bg-[var(--bg-color)] rounded-3xl flex flex-col overflow-hidden border border-text/10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass-icon-box flex items-center justify-center">
                  <Bot size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text">Nexa Assistant</h3>
                  <div className="text-xs opacity-70 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {showClearConfirm ? (
                  <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1.5 rounded-lg border border-red-500/30">
                    <span className="text-xs font-semibold mr-1">Hapus?</span>
                    <button onClick={handleClearHistory} className="p-1 hover:bg-red-500/30 rounded-md transition-colors"><Check size={14} /></button>
                    <button onClick={() => setShowClearConfirm(false)} className="p-1 hover:bg-red-500/30 rounded-md transition-colors"><X size={14} /></button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowClearConfirm(true)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-text/70 hover:text-red-400"
                    title="Hapus History"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-text"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl ${
                    msg.role === 'user' 
                      ? 'glass-btn text-white rounded-br-sm' 
                      : 'bg-[#2A2A35] border border-white/10 text-text rounded-bl-sm shadow-md'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2 opacity-80 border-b border-white/10 pb-2">
                        <Bot size={14} className="text-primary" /> <span className="text-xs font-bold text-primary">Nexa Assistant</span>
                      </div>
                    )}
                    <div className={`text-sm prose prose-sm max-w-none leading-relaxed prose-p:my-1 prose-ul:my-1 prose-li:my-0 ${
                      msg.role === 'user'
                      ? 'text-white prose-p:text-white prose-headings:text-white prose-strong:text-white prose-li:text-white'
                      : 'text-text prose-p:text-text prose-headings:text-text prose-strong:text-text prose-li:text-text prose-a:text-primary'
                    }`}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#2A2A35] border border-white/10 text-text rounded-3xl rounded-bl-sm p-4 flex items-center gap-3 shadow-md">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-sm font-semibold opacity-80">Mengetik balasan...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="flex-1 glass-input text-sm rounded-full px-4"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 rounded-full glass-btn flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full glass-btn flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Anda adalah Nexa Assistant, konsultan AI resmi untuk PT. NexaTech Solutions.
Tugas Anda adalah membantu klien (fokus pada instansi, korporasi, dan perusahaan B2B) memahami layanan TJKT (Teknik Jaringan Komputer dan Telekomunikasi), Server, Keamanan Siber, dan infrastruktur IT kami.
Gunakan format **Markdown** untuk setiap jawaban Anda agar rapi, terstruktur, dan mudah dibaca.

INFORMASI PERUSAHAAN (PT. NexaTech Solutions):
- **Fokus Utama**: Menjadi penyedia solusi Infrastruktur Jaringan (TJKT) dan sistem IT Enterprise yang andal dan terukur. Jasa utama kami adalah Hardware, Networking, Server, Keamanan Siber, dan IoT.
- **Lokasi Kantor**: Chinatown, Singapore.
- **Kontak**: Email (nexatech@yahoo.com), Telepon/WA (+62 877-9872-5167).

LAYANAN KAMI:
1. **NEXANET**: Infrastruktur Jaringan (Instalasi Fiber Optic, LAN, WAN, Konfigurasi Router/Switch Mikrotik & Cisco).
2. **NEXASERVER**: Manajemen Server & Cloud (Setup Windows/Linux Server, VPS, AWS/Google Cloud, Data Center).
3. **NEXAWEB**: Pengembangan Sistem Informasi Terintegrasi Jaringan (Misal: Web App lokal untuk memantau server, ERP perusahaan).
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
1. Selalu bersikap profesional sebagai Konsultan TJKT. Kuasai istilah jaringan (Bandwidth, Fiber Optic, Router, Firewall, Server, Uptime, Topologi, dll).
2. **SANGAT PENTING**: JANGAN menawarkan jasa PPLG/RPL seperti Desain UI/UX, SEO, Digital Marketing, Pembuatan Game, atau Aplikasi Mobile Konsumen. Jika klien meminta itu, tolak dengan halus dan tegaskan bahwa NexaTech fokus murni pada Infrastruktur Jaringan, Server, Hardware, dan Keamanan IT.
3. Arahkan klien pada layanan instalasi hardware dan jaringan yang paling tepat sesuai kebutuhan skala perusahaan mereka.`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Nexa Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
         return res.status(500).json({ error: "API Key belum di-setup di server" });
      }

      // Convert messages to Gemini format
      const history = messages.filter((m: any) => m.role !== 'system').map((m: any) => ({
         role: m.role === 'user' ? 'user' : 'model',
         parts: [{ text: m.content }]
      }));
      
      const lastMessage = history.pop(); // Ambil pesan user terakhir
      
      if (!lastMessage || lastMessage.role !== 'user') {
          return res.status(400).json({ error: "Pesan tidak valid" });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          { role: 'user', parts: [{ text: lastMessage.parts[0].text }] }
        ],
        config: {
           systemInstruction: SYSTEM_PROMPT
        }
      });

      res.json({
        choices: [{
          message: {
            content: response.text || "Maaf, respon tidak bisa dibuat."
          }
        }]
      });

    } catch (error) {
      console.error("Chat Server Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

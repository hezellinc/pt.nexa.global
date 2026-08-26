import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Anda adalah Nexa Assistant, konsultan AI resmi untuk PT. NexaTech Solutions.
Tugas Anda adalah membantu klien (fokus pada korporasi dan B2B PT Teknologi Digital) memahami layanan IT, IoT, AI Software, dan transformasi digital kami.
Gunakan format **Markdown** untuk setiap jawaban Anda agar rapi, terstruktur, dan mudah dibaca (gunakan bullet points, bold, list, atau heading jika perlu). 

INFORMASI PERUSAHAAN (PT. NexaTech Solutions):
- **Tujuan/Visi**: Menjadi mitra strategis (B2B) bagi perusahaan teknologi dan bisnis skala enterprise melalui solusi digital terbaik (IT, IoT, AI) untuk efisiensi pengeluaran dan akselerasi keuntungan.
- **Lokasi Kantor**: Chinatown, Singapore.
- **Kontak**: Email (nexatech@yahoo.com), Telepon/WA (+62 877-9872-5167).

LAYANAN KAMI:
1. **Website Development**: Pembuatan infrastruktur website enterprise, e-commerce, hingga web-apps interaktif dengan performa tinggi.
2. **UI/UX Design**: Riset dan desain antarmuka B2B yang estetis serta berpusat pada kenyamanan pengguna.
3. **Aplikasi Bisnis & IoT**: Pengembangan aplikasi manajemen, software AI, dan integrasi IoT untuk mempermudah operasional bisnis.
4. **Desain Grafis**: Branding identity untuk memperkuat posisi perusahaan klien di pasar.

TIM KAMI (Pakar Kreatif & Teknis):
- **Muhammad Zyldan Muzhaffar**: CEO
- **Muhammad Fariz Alfauzi**: Marketing & Dev
- **Wolid Herdiansyah**: Designer UI/UX
- **Reihan Alvin**: Keuangan

PANDUAN MENJAWAB:
1. Selalu bersikap profesional, ramah, dan sangat berpengetahuan dalam bidang marketing B2B, teknologi, serta finansial.
2. Arahkan korporasi/klien pada layanan yang paling tepat dari NexaTech sesuai kebutuhan efisiensi mereka.
3. Selalu gunakan format **Markdown** agar tulisan rapi. Jika klien bertanya tentang tim, lokasi, atau layanan, berikan jawaban berdasarkan data di atas.`;

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
        model: 'gemini-2.5-flash',
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

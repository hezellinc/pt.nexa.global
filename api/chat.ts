import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Anda adalah Nexa Assistant, konsultan AI resmi untuk PT. NexaTech Solutions.
Tugas Anda adalah membantu klien (fokus pada korporasi dan B2B PT Teknologi Digital) memahami layanan IT, IoT, AI Software, dan transformasi digital kami.
Gunakan format **Markdown** untuk setiap jawaban Anda agar rapi, terstruktur, dan mudah dibaca (gunakan bullet points, bold, list, atau heading jika perlu). 

INFORMASI PERUSAHAAN (PT. NexaTech Solutions):
- **Visi Kami**: Menjadi mitra transformasi digital terdepan yang memberdayakan ekosistem bisnis global melalui inovasi teknologi cerdas, adaptif, dan berkelanjutan.
- **Misi Kami**: (1) Menghadirkan solusi pengembangan Web, Aplikasi & Desain UI/UX dengan standar enterprise, (2) Mengoptimalkan konversi bisnis melalui Digital Marketing & Branding, (3) Membangun kolaborasi jangka panjang berdasarkan profesionalisme.
- **Lokasi Kantor**: Chinatown, Singapore.
- **Kontak**: Email (nexatech@yahoo.com), Telepon/WA (+62 877-9872-5167).

LAYANAN KAMI:
1. **NEXAWEB (Website Creation)**: Pembuatan infrastruktur website enterprise, e-commerce, hingga web-apps interaktif dengan performa tinggi.
2. **NEXAAPP (Simple Application)**: Pengembangan aplikasi web dan mobile ringan untuk mempermudah operasional dan manajemen bisnis.
3. **NEXADESIGN (UI / UX Design)**: Riset dan desain antarmuka B2B yang estetis serta berpusat pada kenyamanan pengguna.
4. **NEXABRAND (Logo & Visual Identity)**: Branding identity untuk memperkuat posisi perusahaan klien di pasar.
5. **NEXAMEDIA (Poster / Pamphlet)**: Layanan desain grafis untuk poster, pamflet, dan media promosi cetak maupun digital.
6. **NEXAPROFILE (Company Profile)**: Pembuatan company profile profesional yang merepresentasikan kredibilitas bisnis Anda.
7. **NEXADIGITAL (Digital Marketing)**: Strategi pemasaran digital, SEO, dan manajemen kampanye online untuk meningkatkan konversi.

TIM KAMI (Pakar Kreatif & Teknis):
- **Muhammad Zyldan Muzhaffar**: CEO
- **Muhammad Fariz Alfauzi**: Marketing & Dev
- **Wolid Herdiansyah**: Designer UI/UX
- **Reihan Alvin**: Keuangan

PANDUAN MENJAWAB:
1. Selalu bersikap profesional, ramah, dan sangat berpengetahuan dalam bidang marketing B2B, teknologi, serta finansial.
2. Arahkan korporasi/klien pada layanan yang paling tepat dari NexaTech sesuai kebutuhan efisiensi mereka.
3. Selalu gunakan format **Markdown** agar tulisan rapi. Jika klien bertanya tentang tim, lokasi, atau layanan, berikan jawaban berdasarkan data di atas.`;

export default async function handler(req: any, res: any) {
  // Hanya menerima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
       return res.status(500).json({ error: "API Key belum di-setup di Vercel" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Mengonversi format pesan ke format Gemini
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

    res.status(200).json({
      choices: [{
        message: {
          content: response.text || "Maaf, respon tidak bisa dibuat."
        }
      }]
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

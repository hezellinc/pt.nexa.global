import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function TerminalVisual() {
  const [text, setText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const fullText = `> nexatech connect --client "Enterprise"\n[OK] Establishing secure connection...\n[OK] Bypassing firewall node A...\n[OK] Fiber Optic latency: 2ms\n> Access Granted. Welcome to NexaTech.`;

  useEffect(() => {
    if (isInView) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
        if (currentIndex > fullText.length) {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isInView, fullText]);

  return (
    <div ref={ref} className="glass aspect-square p-4 md:p-6 flex flex-col relative overflow-hidden bg-[#0a0a0a]/80 border-primary/30 rounded-[2rem] shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="mx-auto flex items-center gap-2 text-xs md:text-sm text-white/50 font-mono">
          <TerminalIcon size={14} /> root@nexatech:~
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="flex-1 font-mono text-sm md:text-base lg:text-lg text-emerald-400 whitespace-pre-wrap break-words leading-relaxed text-left">
        {text}
        <span className="animate-pulse inline-block w-2 h-4 md:h-5 bg-emerald-400 ml-1 align-middle"></span>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useInView } from 'motion/react';

// Boot sequence lines
const BOOT_SEQUENCE = [
  "Initializing NexaOS kernel v9.4.2...",
  "[ OK ] Loaded Network Modules (TCP/IP, BGP, OSPF)",
  "[ OK ] Secured Firewall Rulesets",
  "[ OK ] Bypassing node security protocols...",
  "Checking fiber optic latency: 1ms",
  "System Ready. Type 'help' to see available commands."
];

export default function TerminalVisual() {
  const [history, setHistory] = useState<{id: string, text: string, isCommand: boolean}[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);
  
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, input, bootLine]);

  // Boot sequence effect
  useEffect(() => {
    if (isInView && isBooting) {
      if (bootLine < BOOT_SEQUENCE.length) {
        const timer = setTimeout(() => {
          setHistory(prev => [...prev, { id: Math.random().toString(), text: BOOT_SEQUENCE[bootLine], isCommand: false }]);
          setBootLine(prev => prev + 1);
        }, Math.random() * 400 + 200); // Random delay between 200-600ms
        return () => clearTimeout(timer);
      } else {
        setIsBooting(false);
      }
    }
  }, [isInView, isBooting, bootLine]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    setHistory(prev => [...prev, { id: Math.random().toString(), text: `admin@nexatech:~$ ${cmd}`, isCommand: true }]);
    
    // Process command
    let response = "";
    switch (trimmedCmd) {
      case 'help':
        response = "Available commands:\n  services : List of NexaTech IT services\n  ping     : Run network diagnostic\n  contact  : Get in touch with us\n  clear    : Clear terminal screen\n  whoami   : Display user info";
        break;
      case 'services':
        response = "[1] Fiber Optic & LAN (NEXANET)\n[2] Cloud & Data Center (NEXASERVER)\n[3] Web & ERP Systems (NEXAWEB)\n[4] Firewall & CCTV (NEXASECURE)\n[5] Smart Office (NEXAIOT)";
        break;
      case 'ping':
        response = "Pinging nexatech.id with 32 bytes of data:\nReply from 192.168.1.1: bytes=32 time=2ms TTL=64\nReply from 192.168.1.1: bytes=32 time=1ms TTL=64\nReply from 192.168.1.1: bytes=32 time=2ms TTL=64\n\nPing statistics:\n    Packets: Sent = 3, Received = 3, Lost = 0 (0% loss)";
        break;
      case 'whoami':
        response = "Guest User (Role: VIP Client)\nPermission Level: READ_ONLY";
        break;
      case 'contact':
        response = "Email: hello@nexatech.id\nPhone: +62 812-XXXX-XXXX\nAddress: Jakarta, Indonesia";
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case '':
        setInput('');
        return;
      default:
        response = `Command not found: ${trimmedCmd}. Type 'help' for a list of commands.`;
    }

    // Add response to history
    if (response) {
      setHistory(prev => [...prev, { id: Math.random().toString(), text: response, isCommand: false }]);
    }
    
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const focusInput = () => {
    if (!isBooting) {
      inputRef.current?.focus();
    }
  };

  return (
    <div 
      ref={ref} 
      onClick={focusInput}
      className="glass aspect-square md:aspect-auto md:h-[400px] p-4 md:p-6 flex flex-col relative overflow-hidden bg-[#0a0a0a]/90 border-emerald-500/30 rounded-[2rem] shadow-[0_0_40px_rgba(16,185,129,0.15)] group cursor-text"
    >
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-20"></div>
      
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10 relative z-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer"></div>
        </div>
        <div className="mx-auto flex items-center gap-2 text-xs md:text-sm text-white/50 font-mono">
          <TerminalIcon size={14} /> NOC_Terminal_v2.0
        </div>
      </div>
      
      {/* Terminal Body */}
      <div ref={containerRef} className="flex-1 overflow-y-auto font-mono text-sm md:text-base text-emerald-400 whitespace-pre-wrap break-words leading-relaxed text-left relative z-20 scrollbar-hide pb-4">
        
        {history.map((line) => (
          <div key={line.id} className={line.isCommand ? "text-white/90 mt-2" : "text-emerald-400/90 mb-1"}>
            {line.text}
          </div>
        ))}

        {!isBooting && (
          <div className="flex text-white/90 mt-2">
            <span className="text-emerald-400 mr-2 shrink-0">admin@nexatech:~$</span>
            <span className="relative flex-1">
              {input}
              <span className="animate-pulse inline-block w-2 h-4 md:h-5 bg-emerald-400 ml-[1px] align-middle relative top-[-2px]"></span>
            </span>
          </div>
        )}
      </div>

      {/* Hidden Input for Mobile/Desktop Typing */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 pointer-events-none -z-10"
        autoComplete="off"
        spellCheck="false"
        autoCapitalize="none"
        disabled={isBooting}
      />
    </div>
  );
}

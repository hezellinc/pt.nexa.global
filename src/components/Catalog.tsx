import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Server, Wifi, Database, Globe, ShieldCheck, Cpu, Activity, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const nodes = [
  { id: 'NEXANET', label: 'NEXANET', desc: 'Fiber Optic & LAN', icon: Wifi, x: 15, y: 25, color: '#3b82f6', latency: '2ms', traffic: '10 Gbps' },
  { id: 'NEXASERVER', label: 'NEXASERVER', desc: 'Cloud & Data Center', icon: Database, x: 85, y: 25, color: '#8b5cf6', latency: '4ms', traffic: '8 Gbps' },
  { id: 'NEXAWEB', label: 'NEXAWEB', desc: 'Web & ERP Systems', icon: Globe, x: 15, y: 75, color: '#10b981', latency: '12ms', traffic: '2 Gbps' },
  { id: 'NEXASECURE', label: 'NEXASECURE', desc: 'Firewall & CCTV', icon: ShieldCheck, x: 85, y: 75, color: '#ef4444', latency: '1ms', traffic: '5 Gbps' },
  { id: 'NEXAIOT', label: 'NEXAIOT', desc: 'Smart Office & VoIP', icon: Cpu, x: 50, y: 85, color: '#f59e0b', latency: '5ms', traffic: '1 Gbps' },
];

export default function Catalog() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    window.dispatchEvent(new CustomEvent('open-service-detail', { detail: { id } }));
  };

  return (
    <section id="katalog" className="lazy-section py-8 md:py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="text-center mb-10 md:mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-[var(--glass-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase border border-primary/10">
            Live Topology Map
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Network Operation Center (NOC)</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Pantau arsitektur solusi TJKT kami. Arahkan kursor pada node untuk melihat status koneksi, atau klik untuk mempelajari detail layanannya.
          </p>
        </ScrollReveal>

        <div className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-[4/3] lg:aspect-[16/9] glass rounded-[2rem] p-4 md:p-8 overflow-hidden bg-[#0a0a0a]/90 border-primary/20">
          
          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.2)" />
              </linearGradient>
            </defs>
            {nodes.map((node) => (
              <g key={`line-${node.id}`}>
                <line 
                  x1="50%" y1="45%" 
                  x2={`${node.x}%`} y2={`${node.y}%`} 
                  stroke="url(#line-gradient)" 
                  strokeWidth="2" 
                />
                {/* Animated data packet */}
                <circle r="3" fill={node.color} className="animate-pulse">
                  <animateMotion 
                    dur={`${Math.random() * 2 + 2}s`} 
                    repeatCount="indefinite" 
                    path={`M 50 ${45} L ${node.x} ${node.y}`} 
                    keyPoints="0;1" 
                    keyTimes="0;1" 
                    calcMode="linear" 
                  />
                  {/* Using raw SVG animation trick for percentage coordinates requires a bit of hack or exact coordinates. 
                      Since we use percentages, let's use CSS or just rely on a simpler dasharray animation. */}
                </circle>
              </g>
            ))}
          </svg>

          {/* SVG Lines - Alternative (Dasharray) for better percentage support */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {nodes.map((node) => (
              <line 
                key={`dash-${node.id}`}
                x1="50%" y1="45%" 
                x2={`${node.x}%`} y2={`${node.y}%`} 
                stroke={node.color}
                strokeWidth="2" 
                strokeDasharray="4 12"
                className="animate-[dash_2s_linear_infinite]"
                opacity={hoveredNode === node.id ? 1 : 0.3}
              />
            ))}
          </svg>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes dash {
              to { stroke-dashoffset: -16; }
            }
          `}} />

          {/* Core Node */}
          <div 
            className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-help"
            onMouseEnter={() => setHoveredNode('CORE')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping opacity-75"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 glass bg-[#0a0a0a] rounded-full flex items-center justify-center border-2 border-primary shadow-[0_0_30px_rgba(16,185,129,0.5)] z-10 relative">
                <Server size={32} className="text-primary animate-pulse" />
              </div>
            </div>
            <div className="mt-3 font-bold text-sm md:text-base text-white text-center bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
              CORE ROUTER
            </div>
            
            {/* Core Popup */}
            {hoveredNode === 'CORE' && (
              <div className="absolute top-full mt-4 w-48 bg-black/90 border border-primary/50 rounded-xl p-3 z-50 shadow-2xl backdrop-blur-md">
                <div className="text-xs text-primary font-bold mb-1 flex items-center gap-1"><Activity size={12} /> STATUS: ONLINE</div>
                <div className="text-xs text-white/80">Uptime: 99.999%</div>
                <div className="text-xs text-white/80">Total Bandwidth: 40 Gbps</div>
                <div className="text-xs text-white/80">Active Nodes: 5</div>
              </div>
            )}
          </div>

          {/* Peripheral Nodes */}
          {nodes.map((node) => (
            <div 
              key={node.id}
              className="absolute z-20 flex flex-col items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-110"
              style={{ top: `${node.y}%`, left: `${node.x}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(node.id)}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 glass bg-[#0a0a0a] rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-white/50 transition-colors relative">
                <div className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: node.color }}></div>
                <node.icon size={24} color={node.color} className="relative z-10" />
              </div>
              <div className="mt-2 font-bold text-xs md:text-sm text-white/90 text-center bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10">
                {node.label}
              </div>

              {/* Node Popup */}
              <div className={`absolute w-40 md:w-48 bg-black/90 border rounded-xl p-3 z-50 shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none ${hoveredNode === node.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                   style={{ borderColor: node.color, bottom: '100%', marginBottom: '16px', left: '50%', transform: hoveredNode === node.id ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)' }}>
                <div className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color: node.color }}>
                  <Zap size={12} /> {node.desc}
                </div>
                <div className="text-xs text-emerald-400 font-mono mb-1">● ONLINE</div>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10">
                  <div>
                    <div className="text-[10px] text-white/50 uppercase">Latency</div>
                    <div className="text-xs font-mono text-white/90">{node.latency}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50 uppercase">Traffic</div>
                    <div className="text-xs font-mono text-white/90">{node.traffic}</div>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-white/40 italic text-center">Klik untuk detail</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import brandSymbol from '../assets/brand/symbol.png';
import brandWordmark from '../assets/brand/wordmark.png';

// Official Brand Symbol Component
export const BrandSymbol: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <img 
    src={brandSymbol} 
    alt="CyberEmpireX Symbol" 
    className={`object-contain shrink-0 ${className}`} 
  />
);

// Official Brand Wordmark Component
export const BrandWordmark: React.FC<{ className?: string }> = ({ className = "h-6 w-auto" }) => (
  <img 
    src={brandWordmark} 
    alt="CyberEmpireX" 
    className={`object-contain shrink-0 ${className}`} 
  />
);

// 1. CEX Code Brackets Mark / Round Simple Logo (Official Symbol Asset)
export const CodeBracketsMark: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <img 
    src={brandSymbol} 
    alt="CyberEmpireX Symbol" 
    className={`object-contain shrink-0 ${className}`} 
  />
);

export const RoundSimpleLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <img 
    src={brandSymbol} 
    alt="CyberEmpireX Symbol" 
    className={`object-contain shrink-0 ${className}`} 
  />
);

// 2. Command Prompt Glyph ($ prompt with execution token)
export const CommandPromptGlyph: React.FC<{ command?: string; status?: string; className?: string }> = ({ 
  command = "cex --run-audit", 
  status = "200_OK",
  className = "w-full"
}) => (
  <div className={`font-mono text-[11px] bg-[#0F172A] border border-slate-800 rounded-xl p-3 text-slate-300 shadow-xs ${className}`}>
    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
      <div className="flex items-center space-x-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
        <span className="text-[10px] text-slate-400 font-bold ml-1">sh_session #4091</span>
      </div>
      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">
        {status}
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-emerald-400 font-bold">$</span>
      <span className="text-blue-300 font-bold">{command}</span>
      <span className="w-2 h-4 bg-blue-400 animate-pulse"></span>
    </div>
  </div>
);

// 3. Filesystem Structure Visual (Tree Diagram with drwxr-xr-x & Inode Block)
export const FilesystemTreeVisual: React.FC<{ className?: string }> = ({ className = "w-full" }) => (
  <div className={`bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs font-mono text-xs space-y-3 ${className}`}>
    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        </svg>
        <span className="font-bold text-[#111827]">VFS Inode Tree</span>
      </div>
      <span className="text-[10px] bg-[#EEF4FF] text-[#2563EB] px-2 py-0.5 rounded-md font-bold border border-blue-200">
        ext4 / 4096B
      </span>
    </div>

    <div className="space-y-1.5 text-[11px] text-[#111827]">
      <div className="flex items-center justify-between text-[#6B7280] font-bold border-b border-dashed border-[#E5E7EB] pb-1 text-[10px]">
        <span>PERMISSION</span>
        <span>INODE</span>
        <span>PATH</span>
      </div>
      <div className="flex items-center justify-between hover:bg-[#F8FAFC] p-1 rounded">
        <span className="text-emerald-600 font-bold">drwxr-xr-x</span>
        <span className="text-[#6B7280]">#1024</span>
        <span className="font-bold text-[#2563EB]">/root/bin</span>
      </div>
      <div className="flex items-center justify-between pl-3 hover:bg-[#F8FAFC] p-1 rounded border-l-2 border-blue-200">
        <span className="text-slate-600">-rwxr-xr-x</span>
        <span className="text-[#6B7280]">#1028</span>
        <span className="font-semibold text-slate-800">├── nmap.sh</span>
      </div>
      <div className="flex items-center justify-between pl-3 hover:bg-[#F8FAFC] p-1 rounded border-l-2 border-blue-200">
        <span className="text-slate-600">-rw-r--r--</span>
        <span className="text-[#6B7280]">#1031</span>
        <span className="font-semibold text-slate-800">└── config.json</span>
      </div>
    </div>
  </div>
);

// 5. Git Repository Mark (Commit Graph Diagram)
export const GitRepositoryMark: React.FC<{ className?: string }> = ({ className = "w-full" }) => (
  <div className={`bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs space-y-3 ${className}`}>
    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M6 9v12" />
          <path d="M18 15V9a3 3 0 00-3-3H6" />
        </svg>
        <span className="text-xs font-bold text-[#111827]">Open Source Git Graph</span>
      </div>
      <span className="text-[10px] font-mono text-[#2563EB] bg-[#EEF4FF] px-2 py-0.5 rounded font-bold border border-blue-200">
        main / v2026.1
      </span>
    </div>

    <div className="space-y-2 text-xs font-mono">
      <div className="flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
        <span className="font-bold text-[#2563EB]">a1f8b2c</span>
        <span className="text-[#111827] font-sans text-[11px] truncate">feat(cli): add termux package matrix</span>
      </div>
      <div className="flex items-center space-x-2 pl-3 border-l-2 border-blue-200">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span className="font-bold text-emerald-600">e4d91a0</span>
        <span className="text-[#6B7280] font-sans text-[11px] truncate">security(audit): sanitize parameter inputs</span>
      </div>
    </div>
  </div>
);

// 6. Linux Package Symbol (.deb / .apk / pkg hash symbol)
export const LinuxPackageSymbol: React.FC<{ pkgName?: string; hash?: string; className?: string }> = ({
  pkgName = "nmap-security",
  hash = "sha256:8f9a2c...",
  className = "w-full"
}) => (
  <div className={`p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl flex items-center justify-between font-mono text-xs ${className}`}>
    <div className="flex items-center space-x-2.5">
      <div className="p-2 rounded-lg bg-[#2563EB] text-white">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>
      <div>
        <div className="font-bold text-[#111827]">{pkgName}</div>
        <div className="text-[10px] text-[#6B7280]">{hash}</div>
      </div>
    </div>
    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
      VERIFIED
    </span>
  </div>
);

// 7. Subtle Technical Background Grid Pattern
export const TechGridPattern: React.FC<{ className?: string }> = ({ className = "opacity-10" }) => (
  <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="cex-tech-grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" />
        <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#cex-tech-grid)" />
  </svg>
);

// 8. TECH BRAND LOGO SVGs (Open Source / Simple Icons Specs)
export const LinuxBrandLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.003 2c-2.22 0-4.015 1.79-4.015 4 0 .7.18 1.36.5 1.94C6.543 8.89 5.003 11.23 5.003 14c0 1.66.57 3.19 1.53 4.41C5.603 19.16 5.003 20.25 5.003 21.5c0 .28.22.5.5.5h12.997c.28 0 .5-.22.5-.5 0-1.25-.6-2.34-1.53-3.09.96-1.22 1.53-2.75 1.53-4.41 0-2.77-1.54-5.11-3.485-6.06.32-.58.5-1.24.5-1.94 0-2.21-1.795-4-4.012-4zm0 2c1.12 0 2.015.89 2.015 2s-.895 2-2.015 2c-1.11 0-2.015-.89-2.015-2s.905-2 2.015-2z"/>
  </svg>
);

export const PythonBrandLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-3.5 0-5.5 1.5-5.5 3.5v2.5h5.5v1H4c-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5h1.5v-2.5c0-1.5 1.2-2.5 2.5-2.5h6v-1c0-2-1.5-3.5-3.5-3.5h-1V5.5C9.5 3.5 10.5 2 12 2zm-2 2.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm2 17.5c3.5 0 5.5-1.5 5.5-3.5v-2.5h-5.5v-1H20c2 0 3.5-1.5 3.5-3.5s-1.5-3.5-3.5-3.5h-1.5v2.5c0 1.5-1.2 2.5-2.5 2.5h-6v1c0 2 1.5 3.5 3.5 3.5h1v1.5c0 2-1 3.5-2.5 3.5zm2-2.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/>
  </svg>
);

export const WiresharkBrandLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12c4-8 12-8 16-2 2 3 2 7 2 7s-3-2-6-2c-4 0-7 3-12 2z" fill="#2563EB" fillOpacity="0.2" />
    <path d="M12 21a9 9 0 0 0 9-9c0-3-1.5-5-3.5-6.5L12 12v9z" fill="#2563EB" />
  </svg>
);

export const NmapBrandLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" stroke="#2563EB" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="6" stroke="#2563EB" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="2" fill="#2563EB" />
    <line x1="12" y1="3" x2="12" y2="21" stroke="#2563EB" strokeWidth="1" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="#2563EB" strokeWidth="1" />
  </svg>
);

export const DockerBrandLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.98 11.08h2.12v2.09h-2.12zm-3.08 0h2.12v2.09h-2.12zm-3.09 0h2.12v2.09H7.81zm-3.09 0h2.12v2.09H4.72zm6.18-3.09h2.12v2.09h-2.12zm-3.09 0h2.12v2.09H7.81zm-3.09 0h2.12v2.09H4.72zm3.09-3.09h2.12v2.09H7.81zm14.8 6.84c-.38-.28-1.58-.93-3.23-.74-.25-.86-.88-1.58-1.72-1.95l-.42-.18-.28.38c-.53.72-.73 1.63-.58 2.52-1.12.18-2.12.63-2.92 1.28H1.5v1.27c0 2.91 1.7 5.2 4.8 6.13 1.25.37 2.68.45 4.1.45 4.85 0 8.98-2.3 10.42-6.09.43-.07 1.21-.29 1.79-1.07.39-.53.37-1.02.39-1.09l-.4-.2c-.01-.01-.29-.15-.69-.71z"/>
  </svg>
);

export const PostgresBrandLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="6" rx="8" ry="3" fill="#2563EB" fillOpacity="0.15" stroke="#2563EB" strokeWidth="1.5" />
    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#2563EB" strokeWidth="1.5" />
    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#2563EB" strokeWidth="1.5" />
  </svg>
);

export const BurpSuiteLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#0F172A" />
    <path d="M7 17L12 7L17 17H14L12 12L10 17H7Z" fill="#F97316" />
    <path d="M10 14H14" stroke="#38BDF8" strokeWidth="1.5" />
  </svg>
);

export const CompTiaBrandLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#C026D3" fillOpacity="0.1" />
    <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" stroke="#C026D3" strokeWidth="1.8" />
    <path d="M9 12L11 14L15 9" stroke="#C026D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const OffSecBrandLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#DC2626" fillOpacity="0.1" />
    <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="#DC2626" strokeWidth="1.8" />
    <path d="M12 7V17M8 10L16 14M16 10L8 14" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CiscoBrandLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#0284C7" fillOpacity="0.1" />
    <path d="M6 16V12M9 18V8M12 20V6M15 18V8M18 16V12" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const OpenSourceLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489l2.23-4.59C8.91 16.275 7.5 14.31 7.5 12c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 2.31-1.41 4.275-3.569 4.899l2.23 4.59C19.135 20.166 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

// 9. ARCHITECTURE & CONCEPT DIAGRAM SVGs
export const FirewallTopologyDiagram: React.FC<{ className?: string }> = ({ className = "w-full" }) => (
  <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white font-mono shadow-md ${className}`}>
    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
      <div className="flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span className="text-xs font-bold text-slate-200">Stateful Inspection Topology</span>
      </div>
      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30 font-bold">
        EDGE_INSPECTION_MODE
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
      {/* Node 1: Untrusted Traffic */}
      <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex flex-col items-center justify-center space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center font-bold text-xs">
          IN
        </div>
        <span className="text-[11px] font-bold text-slate-200">Untrusted Web</span>
        <span className="text-[9px] text-slate-400 font-mono">0.0.0.0/0</span>
      </div>

      {/* Node 2: Stateful Firewall */}
      <div className="p-3 bg-blue-950/80 rounded-xl border border-blue-500/50 flex flex-col items-center justify-center space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-blue-500/30 text-blue-300 border border-blue-400/50 flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
          </svg>
        </div>
        <span className="text-[11px] font-bold text-blue-300">Packet Filter</span>
        <span className="text-[9px] text-blue-400 font-mono">DROP SYN-FLOOD</span>
      </div>

      {/* Node 3: Encrypted Tunnel */}
      <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex flex-col items-center justify-center space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <span className="text-[11px] font-bold text-emerald-300">TLS 1.3 Tunnel</span>
        <span className="text-[9px] text-emerald-400 font-mono">AES-256-GCM</span>
      </div>

      {/* Node 4: Secured Internal Network */}
      <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 flex flex-col items-center justify-center space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 flex items-center justify-center">
          <svg className="w-4 h-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <span className="text-[11px] font-bold text-emerald-200">Internal Subnet</span>
        <span className="text-[9px] text-emerald-400 font-mono">10.0.4.0/24</span>
      </div>
    </div>
  </div>
);

export const NetworkNodeTopologyDiagram: React.FC<{ className?: string }> = ({ className = "w-full" }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4">
    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
      <div className="flex items-center space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></div>
        <span className="text-xs font-mono font-bold text-[#111827]">Zero-Trust Security Node Architecture</span>
      </div>
      <span className="text-[10px] font-mono text-[#2563EB] bg-[#EEF4FF] px-2 py-0.5 rounded font-bold border border-blue-200">
        ISO-27001
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="p-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-1.5">
        <div className="text-[10px] font-mono font-bold text-[#2563EB] uppercase">Layer 01 — Gateway</div>
        <div className="text-xs font-bold text-[#111827]">Cloudflare Edge WAF</div>
        <div className="text-[11px] text-[#6B7280]">Filters OWASP Top 10 exploits & volumetric DDoS spikes before reaching pods.</div>
      </div>

      <div className="p-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-1.5">
        <div className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Layer 02 — Compute</div>
        <div className="text-xs font-bold text-[#111827]">Isolated Container Pods</div>
        <div className="text-[11px] text-[#6B7280]">Ephemeral Linux sandbox environments running gVisor micro-VM boundaries.</div>
      </div>

      <div className="p-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-1.5">
        <div className="text-[10px] font-mono font-bold text-indigo-700 uppercase">Layer 03 — Persistence</div>
        <div className="text-xs font-bold text-[#111827]">Encrypted Database Nodes</div>
        <div className="text-[11px] text-[#6B7280]">Row-level security policies, automated backups, and encrypted transit keys.</div>
      </div>
    </div>
  </div>
);

// 10. GAMIFICATION & RANK TROPHIES / BADGES
export const RankTrophyIcon: React.FC<{ tier?: 'bronze' | 'silver' | 'gold' | 'diamond'; className?: string }> = ({ 
  tier = 'gold', 
  className = "w-10 h-10" 
}) => {
  const tierColors = {
    bronze: { bg: '#D97706', border: '#B45309', fill: '#F59E0B' },
    silver: { bg: '#64748B', border: '#475569', fill: '#94A3B8' },
    gold: { bg: '#EAB308', border: '#CA8A04', fill: '#FACC15' },
    diamond: { bg: '#2563EB', border: '#1D4ED8', fill: '#60A5FA' }
  }[tier];

  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 6H22V14C22 17.3137 19.3137 20 16 20C12.6863 20 10 17.3137 10 14V6Z" fill={tierColors.fill} stroke={tierColors.border} strokeWidth="1.5" />
      <path d="M10 9H6C4.89543 9 4 9.89543 4 11V12C4 14.2091 5.79086 16 8 16H10" stroke={tierColors.border} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 9H26C27.1046 9 28 9.89543 28 11V12C28 14.2091 26.2091 16 24 16H22" stroke={tierColors.border} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 20V25" stroke={tierColors.border} strokeWidth="2" />
      <rect x="11" y="25" width="10" height="3" rx="1.5" fill={tierColors.bg} stroke={tierColors.border} strokeWidth="1.5" />
      <circle cx="16" cy="12" r="2.5" fill="#FFFFFF" />
    </svg>
  );
};

export const SkillBadgeIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-8 h-8" }) => (
  <div className={`rounded-xl bg-[#EEF4FF] border border-blue-200 p-2 flex items-center justify-center text-[#2563EB] shadow-2xs ${className}`}>
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#2563EB" fillOpacity="0.15" />
    </svg>
  </div>
);


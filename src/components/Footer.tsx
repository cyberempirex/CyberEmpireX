import React from 'react';
import { Github } from 'lucide-react';
import { ViewMode } from '../types';
import brandSymbol from '../assets/brand/symbol.png';
import brandWordmark from '../assets/brand/wordmark.png';

interface FooterProps {
  setView: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-16 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center space-x-4">
          <img 
            src={brandSymbol} 
            alt="CyberEmpireX Symbol" 
            className="h-14 sm:h-16 w-auto object-contain shrink-0" 
          />
          <div className="flex flex-col justify-center">
            <img 
              src={brandWordmark} 
              alt="CyberEmpireX" 
              className="h-7 sm:h-9 w-auto object-contain shrink-0" 
            />
            <div className="text-xs text-[#6B7280] mt-1 font-medium">
              Open Source Cybersecurity Platform
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#6B7280]">
          <button onClick={() => setView('disclaimer')} className="hover:text-[#111827] transition-colors cursor-pointer">
            Documentation
          </button>
          <a href="https://github.com/cyberempirex/CyberEmpireX" target="_blank" rel="noreferrer" className="hover:text-[#111827] transition-colors flex items-center space-x-1">
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-[#111827] transition-colors">
            Discord
          </a>
          <button onClick={() => setView('tools')} className="hover:text-[#111827] transition-colors cursor-pointer">
            Blog
          </button>
          <button onClick={() => setView('tools')} className="hover:text-[#111827] transition-colors cursor-pointer">
            API
          </button>
          <div className="flex items-center space-x-1.5 text-[#22C55E] font-mono text-[11px] bg-[#EEF4FF] px-2.5 py-1 rounded-full border border-[#22C55E]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>Status</span>
          </div>
          <button onClick={() => setView('disclaimer')} className="hover:text-[#111827] transition-colors cursor-pointer">
            Privacy
          </button>
          <button onClick={() => setView('disclaimer')} className="hover:text-[#111827] transition-colors cursor-pointer">
            Terms
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#6B7280] font-mono">
          © {new Date().getFullYear()} CyberEmpireX.
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { 
  Shield, 
  Terminal, 
  ArrowRight, 
  Wrench, 
  FolderGit2, 
  Globe, 
  Cloud, 
  Code, 
  GitBranch, 
  Network, 
  Lock,
  Cpu
} from 'lucide-react';
import { ViewMode } from '../types';

interface HeroSectionProps {
  setView: (view: ViewMode) => void;
  onOpenTerminalWithCmd?: (cmd: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setView }) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden transition-all">
      
      {/* Background Accent Mesh */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#EEF4FF] via-[#EEF4FF]/30 to-transparent pointer-events-none rounded-r-[20px]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Text & CTA Area (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Status Chip */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#EEF4FF] border border-[#2563EB]/20 rounded-full text-xs font-medium text-[#2563EB]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>Enterprise Open Source Engine</span>
            <span className="text-[#6B7280]">·</span>
            <span className="font-mono text-[11px] text-[#4F46E5]">v2.4 Live</span>
          </div>

          {/* Headlines */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
              Welcome back.
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2563EB] tracking-tight">
              Ready to build something secure?
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-xl">
            Learn cybersecurity, practice in interactive labs, build open-source tools, and earn certifications—all from one platform.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Primary Button */}
            <button
              onClick={() => setView('learning-beginner')}
              className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl shadow-sm transition-all flex items-center space-x-2 text-sm cursor-pointer"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => setView('tools')}
              className="px-6 py-3 bg-white hover:bg-[#F6F9FC] text-[#111827] font-semibold border border-[#E5E7EB] rounded-xl shadow-sm transition-all flex items-center space-x-2 text-sm cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-[#2563EB]" />
              <span>Explore Tools</span>
            </button>

            {/* Tertiary Button */}
            <button
              onClick={() => setView('tools-matrix')}
              className="px-6 py-3 bg-[#EEF4FF] hover:bg-[#E0EAFF] text-[#4F46E5] font-semibold rounded-xl transition-all flex items-center space-x-2 text-sm cursor-pointer"
            >
              <FolderGit2 className="w-4 h-4 text-[#4F46E5]" />
              <span>Open Workspace</span>
            </button>
          </div>

        </div>

        {/* Right Flat Professional Illustration Area (5 cols) */}
        {/* NOT robot, NOT hacker. Contains: shield, terminal, network nodes, code blocks, API, cloud, repository */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="w-full max-w-md bg-[#F6F9FC] border border-[#E5E7EB] rounded-[20px] p-5 shadow-inner relative space-y-4">
            
            {/* Top Bar: Terminal & Cloud Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center text-white">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111827] flex items-center space-x-1">
                    <span>CyberEmpireX Node</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                  </div>
                  <div className="text-[10px] text-[#6B7280] font-mono">10.0.4.12 · TLS 1.3</div>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] font-mono px-2 py-1 bg-white border border-[#E5E7EB] rounded-md text-[#4F46E5]">
                <Cloud className="w-3 h-3 text-[#2563EB]" />
                <span>API Gateway</span>
              </div>
            </div>

            {/* Interactive Illustration Elements Grid */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Terminal Code Snippet Block */}
              <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl shadow-2xl space-y-1">
                <div className="flex items-center justify-between text-[10px] text-[#6B7280] font-mono border-b border-[#E5E7EB] pb-1">
                  <span className="flex items-center space-x-1">
                    <Terminal className="w-3 h-3 text-[#2563EB]" />
                    <span>sh.terminal</span>
                  </span>
                  <span className="text-[#22C55E]">exec</span>
                </div>
                <div className="font-mono text-[10px] text-[#111827] space-y-0.5 pt-1">
                  <div className="text-[#2563EB]">$ nmap -sS -O scan</div>
                  <div className="text-[#6B7280]">PORT 80/443 OPEN</div>
                  <div className="text-[#22C55E]">STATUS: OK (200)</div>
                </div>
              </div>

              {/* Network Nodes Graph Block */}
              <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl shadow-2xl space-y-2">
                <div className="flex items-center justify-between text-[10px] text-[#6B7280] font-mono">
                  <span className="flex items-center space-x-1">
                    <Network className="w-3 h-3 text-[#4F46E5]" />
                    <span>Subnet Mesh</span>
                  </span>
                  <span className="text-[#2563EB]">1 Gbps</span>
                </div>
                <div className="flex items-center justify-around pt-1">
                  <div className="w-6 h-6 rounded-lg bg-[#EEF4FF] border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB]">
                    <Cpu className="w-3 h-3" />
                  </div>
                  <div className="h-0.5 w-6 bg-[#2563EB]"></div>
                  <div className="w-6 h-6 rounded-lg bg-[#EEF4FF] border border-[#4F46E5]/30 flex items-center justify-center text-[#4F46E5]">
                    <Globe className="w-3 h-3" />
                  </div>
                </div>
              </div>

            </div>

            {/* Repository & API Card */}
            <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#111827]">cyberempirex / security-core</div>
                  <div className="text-[10px] text-[#6B7280] font-mono">main branch · 4 active deployments</div>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono font-medium bg-[#22C55E]/10 text-[#22C55E] rounded-md border border-[#22C55E]/20">
                Passing
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

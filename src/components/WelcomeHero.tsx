import React from 'react';
import { ArrowRight, Terminal, Shield } from 'lucide-react';
import { ViewMode } from '../types';
import { CommandPromptGlyph } from './CexTechAssets';

interface WelcomeHeroProps {
  setView: (view: ViewMode) => void;
  onOpenTerminalWithCmd?: (cmd: string) => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ setView }) => {
  return (
    <section className="relative py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Text Content & Command Prompt */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#2563EB] text-white rounded-full text-xs font-mono font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-white">Open Source Cybersecurity Ecosystem</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              <span className="text-[#2563EB]">Welcome to CyberEmpireX.</span> <br />
              <span className="text-[#111827]">Build the Future of Cybersecurity.</span>
            </h1>
            <p className="text-base text-[#6B7280] max-w-2xl leading-relaxed">
              CyberEmpireX is the open-source home for cybersecurity and Termux. Discover tools, learn practical skills, build projects, collaborate with the community, and contribute to real-world open-source software.
            </p>
          </div>

          {/* CEX Technical Asset: Command Prompt Glyph */}
          <div className="pt-2">
            <CommandPromptGlyph command="pkg install nmap && nmap 127.0.0.1" status="ISOLATED_OK" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setView('terminal-lab')}
              className="px-6 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow-xs"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal Lab</span>
            </button>

            <button
              onClick={() => setView('tools')}
              className="px-6 py-3.5 bg-transparent hover:bg-[#F8FAFC] text-[#111827] text-xs font-semibold rounded-xl border border-[#E5E7EB] hover:border-[#2563EB]/40 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Explore Security Utilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Open Source Illustration & Technical Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hero Banner Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E5E7EB] bg-white group">
            <img
              src="/src/assets/images/hero_opensource_art_1786148297928.jpg"
              alt="Open Source Software & Technology Ecosystem"
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-mono font-bold text-white bg-[#2563EB]/90 px-3 py-1 rounded-full backdrop-blur-xs">
                Open Source Technology Platform
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
                <span className="text-xs font-mono font-bold text-[#111827]">Supported Open Source Engines</span>
              </div>
              <span className="text-[10px] font-mono text-[#2563EB] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E5E7EB]">v2.4 LTS</span>
            </div>

            {/* Tech Stack SVG Logos Grid */}
            <div className="grid grid-cols-3 gap-3">
              
              {/* Linux / Termux */}
              <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:bg-white flex flex-col items-center justify-center text-center space-y-2 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] flex items-center justify-center group-hover:border-[#2563EB] transition-all shadow-2xs">
                  {/* Linux Penguin SVG */}
                  <svg className="w-5 h-5 text-[#111827]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.003 2c-2.22 0-4.015 1.79-4.015 4 0 .7.18 1.36.5 1.94C6.543 8.89 5.003 11.23 5.003 14c0 1.66.57 3.19 1.53 4.41C5.603 19.16 5.003 20.25 5.003 21.5c0 .28.22.5.5.5h12.997c.28 0 .5-.22.5-.5 0-1.25-.6-2.34-1.53-3.09.96-1.22 1.53-2.75 1.53-4.41 0-2.77-1.54-5.11-3.485-6.06.32-.58.5-1.24.5-1.94 0-2.21-1.795-4-4.012-4zm0 2c1.12 0 2.015.89 2.015 2s-.895 2-2.015 2c-1.11 0-2.015-.89-2.015-2s.905-2 2.015-2z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#111827]">Linux POSIX</span>
              </div>

              {/* Git / GitHub */}
              <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:bg-white flex flex-col items-center justify-center text-center space-y-2 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] flex items-center justify-center group-hover:border-[#2563EB] transition-all shadow-2xs">
                  {/* Git SVG */}
                  <svg className="w-5 h-5 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.216 1.38-.071 1.892.441.516.516.66 1.256.442 1.902l2.66 2.66c.646-.218 1.387-.074 1.899.438.706.706.706 1.85 0 2.556-.706.707-1.85.707-2.556 0-.522-.522-.663-1.272-.433-1.921L12.7 8.784v6.236c.216.113.417.266.589.438.706.707.706 1.85 0 2.557-.707.706-1.85.706-2.557 0-.706-.706-.706-1.85 0-2.557.217-.217.472-.375.748-.466V8.672c-.276-.091-.531-.249-.748-.466-.525-.525-.662-1.278-.426-1.928L7.545 3.518.454 10.61c-.605.604-.605 1.582 0 2.187l10.48 10.478c.604.605 1.582.605 2.186 0l10.426-10.426c.605-.603.605-1.582 0-2.187z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#111827]">Git SCM</span>
              </div>

              {/* Bash Shell */}
              <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:bg-white flex flex-col items-center justify-center text-center space-y-2 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] flex items-center justify-center group-hover:border-[#2563EB] transition-all shadow-2xs">
                  <Terminal className="w-5 h-5 text-[#2563EB]" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#111827]">Bash CLI</span>
              </div>

              {/* OpenSSL Security */}
              <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:bg-white flex flex-col items-center justify-center text-center space-y-2 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] flex items-center justify-center group-hover:border-[#2563EB] transition-all shadow-2xs">
                  <Shield className="w-5 h-5 text-[#2563EB]" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#111827]">OpenSSL</span>
              </div>

              {/* Python */}
              <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:bg-white flex flex-col items-center justify-center text-center space-y-2 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] flex items-center justify-center group-hover:border-[#2563EB] transition-all shadow-2xs">
                  {/* Python SVG */}
                  <svg className="w-5 h-5 text-[#3776AB]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c-3.5 0-5.5 1.5-5.5 3.5v2.5h5.5v1H4c-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5h1.5v-2.5c0-1.5 1.2-2.5 2.5-2.5h6v-1c0-2-1.5-3.5-3.5-3.5h-1V5.5C9.5 3.5 10.5 2 12 2zm-2 2.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm2 17.5c3.5 0 5.5-1.5 5.5-3.5v-2.5h-5.5v-1H20c2 0 3.5-1.5 3.5-3.5s-1.5-3.5-3.5-3.5h-1.5v2.5c0 1.5-1.2 2.5-2.5 2.5h-6v1c0 2 1.5 3.5 3.5 3.5h1v1.5c0 2-1 3.5-2.5 3.5zm2-2.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#111827]">Python 3</span>
              </div>

              {/* Docker / Containers */}
              <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:bg-white flex flex-col items-center justify-center text-center space-y-2 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] flex items-center justify-center group-hover:border-[#2563EB] transition-all shadow-2xs">
                  {/* Docker SVG */}
                  <svg className="w-5 h-5 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.98 11.08h2.12v2.09h-2.12zm-3.08 0h2.12v2.09h-2.12zm-3.09 0h2.12v2.09H7.81zm-3.09 0h2.12v2.09H4.72zm6.18-3.09h2.12v2.09h-2.12zm-3.09 0h2.12v2.09H7.81zm-3.09 0h2.12v2.09H4.72zm3.09-3.09h2.12v2.09H7.81zm14.8 6.84c-.38-.28-1.58-.93-3.23-.74-.25-.86-.88-1.58-1.72-1.95l-.42-.18-.28.38c-.53.72-.73 1.63-.58 2.52-1.12.18-2.12.63-2.92 1.28H1.5v1.27c0 2.91 1.7 5.2 4.8 6.13 1.25.37 2.68.45 4.1.45 4.85 0 8.98-2.3 10.42-6.09.43-.07 1.21-.29 1.79-1.07.39-.53.37-1.02.39-1.09l-.4-.2c-.01-.01-.29-.15-.69-.71z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#111827]">Containers</span>
              </div>

            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
            <span>Verified Open Source Repositories</span>
            <span className="text-[#2563EB] font-bold">MIT & GPL-3.0</span>
          </div>

        </div>

      </div>
    </section>
  );
};

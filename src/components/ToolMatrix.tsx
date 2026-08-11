import React, { useState } from 'react';
import { ShieldAlert, Search, Copy, Check, Terminal, Sparkles, HelpCircle, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import { TERMUX_COMMANDS } from '../data/termuxCommands';
import { TermuxCommand } from '../types';
import { 
  LinuxBrandLogo, 
  PythonBrandLogo, 
  WiresharkBrandLogo, 
  NmapBrandLogo, 
  DockerBrandLogo, 
  PostgresBrandLogo, 
  BurpSuiteLogo 
} from './CexTechAssets';

interface ToolMatrixProps {
  onOpenTerminal: (cmdStr?: string) => void;
  onOpenAiExplain: (cmdStr: string) => void;
}

export const ToolMatrix: React.FC<ToolMatrixProps> = ({ onOpenTerminal, onOpenAiExplain }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Package Manager', 'Storage & System', 'Network & Recon', 'Web Exploitation', 'Termux API', 'Shell Utilities'];

  const filteredCommands = TERMUX_COMMANDS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getToolBrandLogo = (name: string, command: string) => {
    const str = (name + ' ' + command).toLowerCase();
    if (str.includes('nmap')) return <NmapBrandLogo className="w-5 h-5 text-[#2563EB]" />;
    if (str.includes('python') || str.includes('sqlmap')) return <PythonBrandLogo className="w-5 h-5 text-[#3776AB]" />;
    if (str.includes('tcpdump') || str.includes('wireshark') || str.includes('tshark')) return <WiresharkBrandLogo className="w-5 h-5" />;
    if (str.includes('docker')) return <DockerBrandLogo className="w-5 h-5 text-[#2496ED]" />;
    if (str.includes('postgres') || str.includes('sql')) return <PostgresBrandLogo className="w-5 h-5 text-[#2563EB]" />;
    if (str.includes('burp')) return <BurpSuiteLogo className="w-5 h-5" />;
    return <LinuxBrandLogo className="w-5 h-5 text-[#111827]" />;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Banner with Open Source Terminal Illustration */}
      <div className="bg-[#2563EB] text-white rounded-2xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="p-6 md:col-span-8 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
              Cheat Sheet & CLI Commands
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-amber-300" />
            <span>Termux Security Tool Vault & Matrix</span>
          </h1>
          <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
            Searchable cheat sheet with syntax breakdowns, flags, and copyable Termux command routines for open-source development and security testing.
          </p>

          {/* Quick Search Input */}
          <div className="relative w-full max-w-sm pt-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nmap, sqlmap, pkg, storage..."
              className="w-full bg-white text-[#111827] border border-blue-200 focus:border-white rounded-xl pl-9 pr-3 py-2 text-xs placeholder:text-slate-400 focus:outline-none font-medium shadow-xs"
            />
          </div>
        </div>

        <div className="md:col-span-4 h-full min-h-[140px] relative overflow-hidden hidden md:block">
          <img
            src="/src/assets/images/termux_terminal_art_1786148338867.jpg"
            alt="Open Source Terminal Workspace Illustration"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-white border border-[#E5E7EB] text-[#111827] hover:bg-[#F8FAFC]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool Command Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd.id}
            className="bg-white border border-[#E5E7EB] hover:border-[#2563EB]/40 rounded-2xl p-5 space-y-4 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F8FAFC] text-[#2563EB] border border-[#E5E7EB]">
                  {cmd.category}
                </span>
                {cmd.safetyWarning && (
                  <span className="flex items-center space-x-1 text-[10px] text-amber-600 font-mono font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    <span>White-Hat Warning</span>
                  </span>
                )}
              </div>

              {/* Name & Short Description */}
              <div>
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] shrink-0">
                    {getToolBrandLogo(cmd.name, cmd.command)}
                  </div>
                  <h3 className="text-base font-bold text-[#111827]">
                    {cmd.name}
                  </h3>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                  {cmd.shortDesc}
                </p>
              </div>

              {/* Syntax / Command Display Box */}
              <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono text-xs text-[#2563EB] font-bold flex items-center justify-between group">
                <code className="truncate pr-2">{cmd.command}</code>
                <button
                  onClick={() => copyToClipboard(cmd.command, cmd.id)}
                  className="p-1.5 bg-white hover:bg-blue-50 text-[#6B7280] hover:text-[#2563EB] rounded-lg border border-[#E5E7EB] transition-colors flex-shrink-0 cursor-pointer"
                  title="Copy command"
                >
                  {copiedId === cmd.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Detailed Explanation */}
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                {cmd.detailedDesc}
              </p>

              {/* Safety Warning notice if exists */}
              {cmd.safetyWarning && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-amber-800 font-mono">
                  ⚠️ {cmd.safetyWarning}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenAiExplain(cmd.command)}
                className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>AI Command Breakdown</span>
              </button>

              <button
                onClick={() => onOpenTerminal(cmd.command)}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Terminal className="w-3.5 h-3.5 text-white" />
                <span>Run in Terminal</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

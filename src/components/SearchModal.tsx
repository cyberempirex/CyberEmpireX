import React, { useState } from 'react';
import { Search, X, Terminal, ShieldAlert, Award, ChevronRight } from 'lucide-react';
import { TERMUX_COMMANDS } from '../data/termuxCommands';
import { CHALLENGES_DATA } from '../data/quizzes';
import { ViewMode } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: ViewMode) => void;
  onOpenTerminal: (cmdStr?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  setView,
  onOpenTerminal
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Matches in Termux Commands
  const matchedCommands = q.length > 0
    ? TERMUX_COMMANDS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.command.toLowerCase().includes(q) ||
          c.shortDesc.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  // Matches in Challenges
  const matchedChallenges = q.length > 0
    ? CHALLENGES_DATA.filter(
        (ch) =>
          ch.title.toLowerCase().includes(q) ||
          ch.scenario.toLowerCase().includes(q) ||
          ch.category.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-16 bg-[#111827]/50 backdrop-blur-xs">
      
      <div className="relative w-full max-w-2xl bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Input Header */}
        <div className="p-4 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#2563EB]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Termux commands (nmap, pkg, storage) or CTFs..."
            autoFocus
            className="flex-1 bg-transparent text-[#111827] text-sm focus:outline-none placeholder:text-[#6B7280] font-sans"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {q.length === 0 && (
            <div className="text-center py-8 text-[#6B7280] space-y-2">
              <Terminal className="w-8 h-8 text-[#2563EB] mx-auto" />
              <p>Type keywords like <span className="text-[#2563EB] font-mono font-bold">nmap</span>, <span className="text-emerald-600 font-mono font-bold">pkg</span>, <span className="text-amber-600 font-mono font-bold">storage</span>, or <span className="text-purple-600 font-mono font-bold">sqlmap</span></p>
            </div>
          )}

          {/* Commands Matches */}
          {matchedCommands.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                <span>Termux Tool Commands ({matchedCommands.length})</span>
              </h3>
              <div className="space-y-1.5">
                {matchedCommands.map((cmd) => (
                  <div
                    key={cmd.id}
                    className="p-3 bg-[#F8FAFC] hover:bg-blue-50/50 rounded-xl border border-[#E5E7EB] flex items-center justify-between group transition-colors"
                  >
                    <div className="space-y-1 pr-2 truncate">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#111827]">{cmd.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-white text-[#2563EB] rounded border border-[#E5E7EB]">
                          {cmd.category}
                        </span>
                      </div>
                      <code className="text-[11px] font-mono text-[#2563EB] font-bold block truncate">{cmd.command}</code>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenTerminal(cmd.command);
                      }}
                      className="px-3 py-1 bg-[#2563EB] text-white rounded-lg text-[10px] font-mono font-bold whitespace-nowrap shadow-2xs"
                    >
                      Run
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTF Challenge Matches */}
          {matchedChallenges.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>CTF Challenges ({matchedChallenges.length})</span>
              </h3>
              <div className="space-y-1.5">
                {matchedChallenges.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => {
                      onClose();
                      setView('challenges');
                    }}
                    className="p-3 bg-[#F8FAFC] hover:bg-blue-50/50 rounded-xl border border-[#E5E7EB] cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-600">{ch.difficulty} • {ch.points} XP</span>
                      <h4 className="text-xs font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                        {ch.title}
                      </h4>
                      <p className="text-[11px] text-[#6B7280] line-clamp-1">{ch.scenario}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#2563EB] transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {q.length > 0 && matchedCommands.length === 0 && matchedChallenges.length === 0 && (
            <div className="text-center py-8 text-[#6B7280]">
              No results found for "<span className="text-[#2563EB] font-bold">{query}</span>".
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

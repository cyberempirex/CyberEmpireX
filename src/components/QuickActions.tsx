import React from 'react';
import { ViewMode } from '../types';

interface QuickActionsProps {
  setView: (view: ViewMode) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ setView }) => {
  return (
    <section className="py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 className="text-sm font-bold text-[#111827]">Quick Actions</h3>
        <p className="text-xs text-[#6B7280]">Select your next step on the CyberEmpireX platform.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Action 1: Interactive Terminal Lab (Primary Blue Button) */}
        <button
          onClick={() => setView('terminal-lab')}
          className="flex-1 sm:flex-none px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          <span>Terminal Lab</span>
        </button>

        {/* Action 3: Security Utilities (Outlined Button) */}
        <button
          onClick={() => setView('tools')}
          className="flex-1 sm:flex-none px-5 py-2.5 bg-transparent hover:bg-[#EEF4FF] border border-[#E5E7EB] hover:border-[#2563EB]/40 text-[#111827] text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          <span>Security Utilities</span>
        </button>

        {/* Action 3: Termux Vault (Outlined Button) */}
        <button
          onClick={() => setView('termux-vault')}
          className="flex-1 sm:flex-none px-5 py-2.5 bg-transparent hover:bg-amber-50 border border-amber-200 hover:border-amber-400 text-[#111827] text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Termux Vault</span>
        </button>

        {/* Action 4: CTF Challenges (Outlined Button) */}
        <button
          onClick={() => setView('challenges')}
          className="flex-1 sm:flex-none px-5 py-2.5 bg-transparent hover:bg-[#EEF4FF] border border-[#E5E7EB] hover:border-[#2563EB]/40 text-[#111827] text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>CTF Challenges</span>
        </button>
      </div>
    </section>
  );
};

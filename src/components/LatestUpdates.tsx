import React from 'react';
import { ViewMode } from '../types';

interface LatestUpdatesProps {
  setView: (view: ViewMode) => void;
}

export const LatestUpdates: React.FC<LatestUpdatesProps> = ({ setView }) => {
  const updates = [
    {
      id: 'u1',
      tag: 'Release',
      title: 'Interactive Termux POSIX Sandbox Engine Update',
      date: '2 hours ago',
      icon: (
        /* Git Release Tag SVG */
        <svg className="w-4 h-4 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.216 1.38-.071 1.892.441.516.516.66 1.256.442 1.902l2.66 2.66c.646-.218 1.387-.074 1.899.441.706.706.706 1.85 0 2.556-.706.707-1.85.707-2.556 0-.522-.522-.663-1.272-.433-1.921L12.7 8.784v6.236c.216.113.417.266.589.438.706.707.706 1.85 0 2.557-.707.706-1.85.706-2.557 0-.706-.707-.706-1.85 0-2.557.217-.217.472-.375.748-.466V8.672c-.276-.091-.531-.249-.748-.466-.525-.525-.662-1.278-.426-1.928L7.545 3.518.454 10.61c-.605.604-.605 1.582 0 2.187l10.48 10.478c.604.605 1.582.605 2.186 0l10.426-10.426c.605-.603.605-1.582 0-2.187z"/>
        </svg>
      ),
      desc: 'Added multi-threaded terminal emulation, package installation hooks, and real-time execution.'
    },
    {
      id: 'u2',
      tag: 'Security',
      title: 'Linux Kernel Memory Buffer Bounds Check Patch Advisory',
      date: 'Yesterday',
      icon: (
        /* Security Shield SVG */
        <svg className="w-4 h-4 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      desc: 'Security advisory detailing bounds checks and heap isolation protocols for network services.'
    },
    {
      id: 'u3',
      tag: 'Docs',
      title: 'Updated Open-Source API Reference & Workspace Integration SDK',
      date: '3 days ago',
      icon: (
        /* Terminal / Docs SVG */
        <svg className="w-4 h-4 text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      desc: 'Complete documentation for automated tool schema validation and cURL command alias exports.'
    },
    {
      id: 'u4',
      tag: 'Community',
      title: 'Open-Source Cybersecurity Hackathon & CTF Announced',
      date: '5 days ago',
      icon: (
        /* GitHub SVG */
        <svg className="w-4 h-4 text-[#181717]" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      desc: 'Join researchers worldwide to build next-generation Termux and Linux security utilities.'
    }
  ];

  return (
    <section className="py-4 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
        <div>
          <h3 className="text-base font-bold text-[#111827]">Latest Updates</h3>
          <p className="text-xs text-[#6B7280]">Platform releases, security advisories, and community announcements.</p>
        </div>
        <button
          onClick={() => setView('community-contribute')}
          className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center space-x-1 cursor-pointer"
        >
          <span>View All</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Compact Timeline List */}
      <div className="divide-y divide-[#E5E7EB]">
        {updates.map((upd) => (
          <div key={upd.id} className="py-4 first:pt-0 hover:bg-[#F8FAFC] transition-colors flex items-start space-x-4">
            <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center shrink-0 mt-0.5">
              {upd.icon}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827]">
                    {upd.tag}
                  </span>
                  <span className="text-xs font-bold text-[#111827]">
                    {upd.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#6B7280] flex items-center space-x-1">
                  <svg className="w-3 h-3 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{upd.date}</span>
                </span>
              </div>

              <p className="text-xs text-[#6B7280] leading-relaxed">
                {upd.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

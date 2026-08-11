import React from 'react';
import { UserProgress } from '../types';

interface PlatformOverviewProps {
  userProgress: UserProgress;
}

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({ userProgress }) => {
  return (
    <section className="py-6 border-y border-[#E5E7EB]">
      <div className="text-xs font-mono font-bold text-[#6B7280] uppercase tracking-wider mb-6">
        Platform Overview
      </div>

      {/* Clean horizontal stats row separated with thin vertical dividers */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
        
        {/* Current Level */}
        <div className="py-3 md:py-0 md:px-6 first:pl-0 space-y-1">
          <div className="flex items-center space-x-2 text-xs text-[#6B7280] font-medium">
            {/* Terminal SVG */}
            <svg className="w-4 h-4 text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span>Current Level</span>
          </div>
          <div className="text-2xl font-extrabold text-[#111827]">
            Level {userProgress.level}
          </div>
          <div className="text-[11px] font-mono text-[#6B7280]">
            {userProgress.xp} XP Earned
          </div>
        </div>

        {/* Learning Progress */}
        <div className="py-3 md:py-0 md:px-6 space-y-1">
          <div className="flex items-center space-x-2 text-xs text-[#6B7280] font-medium">
            {/* Linux Tux SVG */}
            <svg className="w-4 h-4 text-[#111827]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.003 2c-2.22 0-4.015 1.79-4.015 4 0 .7.18 1.36.5 1.94C6.543 8.89 5.003 11.23 5.003 14c0 1.66.57 3.19 1.53 4.41C5.603 19.16 5.003 20.25 5.003 21.5c0 .28.22.5.5.5h12.997c.28 0 .5-.22.5-.5 0-1.25-.6-2.34-1.53-3.09.96-1.22 1.53-2.75 1.53-4.41 0-2.77-1.54-5.11-3.485-6.06.32-.58.5-1.24.5-1.94 0-2.21-1.795-4-4.012-4zm0 2c1.12 0 2.015.89 2.015 2s-.895 2-2.015 2c-1.11 0-2.015-.89-2.015-2s.905-2 2.015-2z"/>
            </svg>
            <span>Learning Progress</span>
          </div>
          <div className="text-2xl font-extrabold text-[#111827]">
            {(userProgress.completedLessonIds || []).length} / 12 Lessons
          </div>
          <div className="text-[11px] font-mono text-[#2563EB]">
            {Math.round(((userProgress.completedLessonIds || []).length / 12) * 100)}% Complete
          </div>
        </div>

        {/* Projects */}
        <div className="py-3 md:py-0 md:px-6 space-y-1">
          <div className="flex items-center space-x-2 text-xs text-[#6B7280] font-medium">
            {/* Git SVG */}
            <svg className="w-4 h-4 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.216 1.38-.071 1.892.441.516.516.66 1.256.442 1.902l2.66 2.66c.646-.218 1.387-.074 1.899.441.706.706.706 1.85 0 2.556-.706.707-1.85.707-2.556 0-.522-.522-.663-1.272-.433-1.921L12.7 8.784v6.236c.216.113.417.266.589.438.706.707.706 1.85 0 2.557-.707.706-1.85.706-2.557 0-.706-.707-.706-1.85 0-2.557.217-.217.472-.375.748-.466V8.672c-.276-.091-.531-.249-.748-.466-.525-.525-.662-1.278-.426-1.928L7.545 3.518.454 10.61c-.605.604-.605 1.582 0 2.187l10.48 10.478c.604.605 1.582.605 2.186 0l10.426-10.426c.605-.603.605-1.582 0-2.187z"/>
            </svg>
            <span>Active Repositories</span>
          </div>
          <div className="text-2xl font-extrabold text-[#111827]">
            4 Projects
          </div>
          <div className="text-[11px] font-mono text-[#6B7280]">
            Termux POSIX & CLI
          </div>
        </div>

        {/* Certificates */}
        <div className="py-3 md:py-0 md:px-6 space-y-1">
          <div className="flex items-center space-x-2 text-xs text-[#6B7280] font-medium">
            {/* OpenSSL Shield SVG */}
            <svg className="w-4 h-4 text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Certificates & Badges</span>
          </div>
          <div className="text-2xl font-extrabold text-[#111827]">
            {(userProgress.earnedBadges || []).length} Earned
          </div>
          <div className="text-[11px] font-mono text-[#22C55E]">
            Verified Open Source
          </div>
        </div>

      </div>
    </section>
  );
};

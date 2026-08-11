import React from 'react';
import { Award, Clock, FolderGit2, BadgeCheck, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProgress, ViewMode } from '../types';

interface QuickOverviewProps {
  userProgress: UserProgress;
  setView: (view: ViewMode) => void;
}

export const QuickOverview: React.FC<QuickOverviewProps> = ({ userProgress, setView }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold font-mono tracking-wider text-[#6B7280] uppercase">
          Quick Overview & Insights
        </h3>
        <span className="text-[11px] text-[#2563EB] font-medium font-mono">
          Updated Real-time
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Current Level */}
        <div 
          onClick={() => setView('certifications')}
          className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6B7280]">Current Level</span>
            <div className="w-8 h-8 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-all">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#111827] tracking-tight">
              Level {userProgress.level}
            </div>
            <div className="flex items-center space-x-1.5 mt-1 text-xs text-[#22C55E] font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+15% XP earned this week</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#E5E7EB] text-[11px] text-[#6B7280] flex justify-between items-center font-mono">
            <span>{userProgress.xp} Total XP</span>
            <span className="text-[#2563EB] font-semibold">Security Engineer</span>
          </div>
        </div>

        {/* Card 2: Learning Hours */}
        <div 
          onClick={() => setView('learning-beginner')}
          className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6B7280]">Learning Hours</span>
            <div className="w-8 h-8 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-all">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#111827] tracking-tight">
              42.8 hrs
            </div>
            <div className="flex items-center space-x-1.5 mt-1 text-xs text-[#22C55E] font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+4.2 hrs vs last week</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#E5E7EB] text-[11px] text-[#6B7280] flex justify-between items-center font-mono">
            <span>Streak: 12 Days</span>
            <span className="text-[#22C55E] font-semibold">Active Daily</span>
          </div>
        </div>

        {/* Card 3: Projects Built */}
        <div 
          onClick={() => setView('tools-matrix')}
          className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6B7280]">Projects Built</span>
            <div className="w-8 h-8 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-all">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#111827] tracking-tight">
              8 Repositories
            </div>
            <div className="flex items-center space-x-1.5 mt-1 text-xs text-[#2563EB] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2 active deployments</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#E5E7EB] text-[11px] text-[#6B7280] flex justify-between items-center font-mono">
            <span>Last commit 2h ago</span>
            <span className="text-[#4F46E5] font-semibold">v1.4</span>
          </div>
        </div>

        {/* Card 4: Certificates */}
        <div 
          onClick={() => setView('certifications')}
          className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6B7280]">Certificates</span>
            <div className="w-8 h-8 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-all">
              <BadgeCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#111827] tracking-tight">
              3 Earned
            </div>
            <div className="flex items-center space-x-1.5 mt-1 text-xs text-[#F59E0B] font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>1 in progress (Web Sec)</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#E5E7EB] text-[11px] text-[#6B7280] flex justify-between items-center font-mono">
            <span>Linux & Network Certs</span>
            <span className="text-[#2563EB] font-semibold">Verified</span>
          </div>
        </div>

      </div>
    </div>
  );
};

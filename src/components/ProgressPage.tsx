import React from 'react';
import { 
  Trophy, 
  Award, 
  Zap, 
  CheckCircle2, 
  BarChart3, 
  Terminal, 
  ShieldAlert, 
  Sparkles, 
  Flame,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { UserProgress, ViewMode } from '../types';
import { RankTrophyIcon, SkillBadgeIcon } from './CexTechAssets';

interface ProgressPageProps {
  userProgress: UserProgress;
  setView: (view: ViewMode) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  userProgress,
  setView
}) => {
  const xpForNextLevel = userProgress.level * 500;
  const currentLevelXp = userProgress.xp % 500;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / 500) * 100));

  const earnedBadgesCount = (userProgress.earnedBadges || []).length;
  const completedLabsCount = (userProgress.completedLabIds || []).length;

  const stats = [
    { label: 'Current Level', value: `Level ${userProgress.level || 1}`, sub: 'Security Specialist', icon: Trophy, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { label: 'Total XP Earned', value: `${userProgress.xp || 0} XP`, sub: `${500 - currentLevelXp} XP to next level`, icon: Zap, color: 'text-[#2563EB] bg-blue-50 border-blue-200' },
    { label: 'Badges Unlocked', value: earnedBadgesCount.toString(), sub: 'Platform Accomplishments', icon: Award, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { label: 'Completed Labs', value: completedLabsCount.toString(), sub: 'Practical Exercises', icon: Terminal, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Overview Banner */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-extrabold text-[#111827]">Security Skill Progress</h1>
            </div>
            <p className="text-xs text-[#6B7280]">
              Track your level progression, lab achievements, completed challenges, and earned certification badges.
            </p>
          </div>

          <button
            onClick={() => setView('terminal-lab')}
            className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl transition-all flex items-center space-x-2 cursor-pointer shrink-0 shadow-xs"
          >
            <Terminal className="w-4 h-4" />
            <span>Earn XP in Terminal Lab</span>
          </button>
        </div>

        {/* Level XP Progress Bar */}
        <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB]">
          <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
            <span className="flex items-center space-x-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Level {userProgress.level} Mastery Progress</span>
            </span>
            <span className="font-mono text-[#2563EB]">{progressPercent}% ({currentLevelXp} / 500 XP)</span>
          </div>

          <div className="w-full bg-[#E5E7EB] h-3 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-[#2563EB] to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex items-center space-x-4">
            <div className={`p-3 rounded-xl border ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-[#6B7280]">{s.label}</div>
              <div className="text-lg font-extrabold text-[#111827]">{s.value}</div>
              <div className="text-[10px] text-[#6B7280] font-mono mt-0.5">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Earned Badges Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#111827] flex items-center space-x-2">
          <Award className="w-5 h-5 text-[#2563EB]" />
          <span>Earned Badges & Certifications</span>
        </h2>

        {(userProgress.earnedBadges || []).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(userProgress.earnedBadges || []).map((badge, idx) => (
              <div key={idx} className="p-4 bg-white border border-[#E5E7EB] hover:border-[#2563EB]/40 rounded-xl flex items-center space-x-3 shadow-2xs transition-all">
                <RankTrophyIcon tier={idx % 2 === 0 ? 'gold' : 'diamond'} className="w-9 h-9 shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-[#111827]">{badge}</h3>
                  <span className="text-[10px] text-[#2563EB] font-mono font-bold">Verified Open Source Achievement</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-[#F8FAFC] border border-dashed border-[#E5E7EB] rounded-2xl space-y-3">
            <RankTrophyIcon tier="silver" className="w-10 h-10 mx-auto" />
            <p className="text-xs text-[#6B7280]">No badges earned yet. Complete CTF challenges and labs to earn badges!</p>
            <button
              onClick={() => setView('challenges')}
              className="px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Start CTF Challenges
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Award, 
  BadgeCheck, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Layers 
} from 'lucide-react';
import { UserProgress, ViewMode } from '../types';
import { CompTiaBrandLogo, OffSecBrandLogo, CiscoBrandLogo, RankTrophyIcon } from './CexTechAssets';

interface CertificationsSectionProps {
  userProgress: UserProgress;
  setView: (view: ViewMode) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ userProgress, setView }) => {
  const earnedBadges = [
    { id: 'b1', title: 'Termux Pioneer', date: 'Earned Aug 2026', desc: 'Mastered Linux terminal setup and Android storage permissions.', logo: <RankTrophyIcon tier="gold" className="w-8 h-8" /> },
    { id: 'b2', title: 'Linux Security Fundamentals', date: 'Earned Jul 2026', desc: 'Validated file permissions, chmod/chown, and process signals.', logo: <CompTiaBrandLogo className="w-8 h-8" /> },
    { id: 'b3', title: 'Network Reconnaissance Master', date: 'Earned Jun 2026', desc: 'Executed Nmap TCP/UDP scans and port service fingerings.', logo: <CiscoBrandLogo className="w-8 h-8" /> }
  ];

  const lockedBadges = [
    { id: 'b4', title: 'Web Exploitation Specialist', progress: 75, desc: 'Complete OWASP Top 10 web security lab assessments.', logo: <OffSecBrandLogo className="w-8 h-8" /> },
    { id: 'b5', title: 'Android Security Auditor', progress: 30, desc: 'Decompile APK binaries and inspect AndroidManifest files.', logo: <CompTiaBrandLogo className="w-8 h-8" /> },
    { id: 'b6', title: 'Cloud Security Defender', progress: 10, desc: 'Audit Docker container isolation and IAM policies.', logo: <CiscoBrandLogo className="w-8 h-8" /> }
  ];

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center font-bold">
            <BadgeCheck className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Certifications & Roadmap</h2>
            <p className="text-xs text-[#6B7280]">
              Verified cryptographic open-source credentials and career qualification tracks.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#2563EB] bg-[#EEF4FF] px-3 py-1.5 rounded-xl border border-[#2563EB]/20">
          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          <span>3 Badges Earned</span>
        </div>
      </div>

      {/* Earned Badges Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-mono">
          Earned Badges
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 bg-[#EEF4FF]/50 border border-[#2563EB]/30 rounded-xl space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="p-1 rounded-lg bg-white border border-[#2563EB]/20 shadow-2xs">
                  {badge.logo}
                </div>
                <span className="text-[10px] font-mono font-semibold text-[#22C55E] flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{badge.date}</span>
                </span>
              </div>
              <h5 className="text-xs font-bold text-[#111827]">
                {badge.title}
              </h5>
              <p className="text-[11px] text-[#6B7280]">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Badges Grid */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-mono">
          Badges In Progress
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {lockedBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 bg-[#F6F9FC] border border-[#E5E7EB] rounded-xl space-y-3 opacity-90 hover:opacity-100 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="p-1 rounded-lg bg-white border border-[#E5E7EB]">
                  {badge.logo}
                </div>
                <span className="text-[10px] font-mono font-bold text-[#2563EB]">
                  {badge.progress}% Complete
                </span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#111827]">
                  {badge.title}
                </h5>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  {badge.desc}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2563EB] rounded-full"
                  style={{ width: `${badge.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification Roadmap */}
      <div className="p-4 bg-[#F6F9FC] border border-[#E5E7EB] rounded-xl space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#111827]">
          <Layers className="w-4 h-4 text-[#2563EB]" />
          <span>Certification Roadmap Track</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 bg-white border border-[#2563EB] rounded-lg flex items-center space-x-3">
            <CompTiaBrandLogo className="w-8 h-8 shrink-0" />
            <div>
              <span className="text-[10px] text-[#22C55E] font-bold">STAGE 1 (ACTIVE)</span>
              <p className="font-bold text-[#111827]">Certified Security Practitioner (CSP)</p>
            </div>
          </div>
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-lg flex items-center space-x-3">
            <OffSecBrandLogo className="w-8 h-8 shrink-0" />
            <div>
              <span className="text-[10px] text-[#2563EB] font-bold">STAGE 2 (NEXT)</span>
              <p className="font-bold text-[#111827]">Open Security Developer (OSD)</p>
            </div>
          </div>
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-lg flex items-center space-x-3">
            <CiscoBrandLogo className="w-8 h-8 shrink-0" />
            <div>
              <span className="text-[10px] text-[#6B7280] font-bold">STAGE 3 (ADVANCED)</span>
              <p className="font-bold text-[#111827]">Enterprise Cyber Lead (ECL)</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

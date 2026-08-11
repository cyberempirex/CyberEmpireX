import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Award, 
  FileCheck2, 
  FileText, 
  UserCheck, 
  Check, 
  ArrowRight, 
  XCircle,
  FileCode2,
  ShieldAlert,
  Globe,
  ExternalLink,
  Terminal,
  BookOpen,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { UserProgress, ViewMode } from '../types';
import { OpenSourceLogo, CompTiaBrandLogo, OffSecBrandLogo, CiscoBrandLogo, LinuxBrandLogo, CommandPromptGlyph } from './CexTechAssets';

// Bespoke Professional SVGs for Governance Scope
const ScopeAuthorizedSvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScopeProhibitedSvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2"/>
    <path d="M5.636 5.636L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ScopeDisclosureSvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="18" height="11" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 10V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
  </svg>
);

const CheckBulletSvg: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="4" fill="currentColor" fillOpacity="0.15"/>
    <path d="M4.5 8.5L6.8 10.8L11.5 5.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BanBulletSvg: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="4" fill="currentColor" fillOpacity="0.15"/>
    <path d="M5 5L11 11M11 5L5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const LockBulletSvg: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="4" fill="currentColor" fillOpacity="0.15"/>
    <path d="M5 7V5.5C5 3.84315 6.34315 2.5 8 2.5C9.65685 2.5 11 3.84315 11 5.5V7" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="4.5" y="7" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

interface EthicalDisclaimerProps {
  userProgress?: UserProgress;
  setUserProgress?: React.Dispatch<React.SetStateAction<UserProgress>>;
  setView?: (view: ViewMode) => void;
}

export const EthicalDisclaimer: React.FC<EthicalDisclaimerProps> = ({
  userProgress,
  setUserProgress,
  setView
}) => {
  const isAgreed = Boolean(userProgress?.ethicalPledgeAgreed);
  const [agreedState, setAgreedState] = useState<boolean>(isAgreed);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'pillars' | 'legal' | 'pledge'>('overview');

  const handleTogglePledge = (checked: boolean) => {
    setAgreedState(checked);
    if (setUserProgress) {
      setUserProgress(prev => {
        const updatedBadges = [...prev.earnedBadges];
        if (checked && !updatedBadges.includes('Ethical Security Pledge')) {
          updatedBadges.push('Ethical Security Pledge');
        } else if (!checked && updatedBadges.includes('Ethical Security Pledge')) {
          const idx = updatedBadges.indexOf('Ethical Security Pledge');
          if (idx !== -1) updatedBadges.splice(idx, 1);
        }

        return {
          ...prev,
          ethicalPledgeAgreed: checked,
          ethicalPledgeDate: checked ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined,
          earnedBadges: updatedBadges,
          xp: checked ? prev.xp + 50 : prev.xp
        };
      });
    }

    if (checked) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Toast Notification for Unlocking Badge */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl shadow-2xl border border-emerald-400/50 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-400/30 shrink-0">
                <Award className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <p className="font-black text-sm text-white flex items-center space-x-2">
                  <span>Verified Ethical Hacker Tag Unlocked!</span>
                  <span className="px-2 py-0.5 bg-emerald-400 text-slate-950 font-mono text-[10px] font-black rounded-md">+50 XP</span>
                </p>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Your profile now displays the official <strong className="underline">Verified Ethical Hacker</strong> tag.
                </p>
              </div>
            </div>
            {setView && (
              <button
                onClick={() => setView('profile')}
                className="px-4 py-2 bg-white text-emerald-950 font-extrabold text-xs rounded-xl hover:bg-emerald-50 transition-colors flex items-center space-x-1.5 shrink-0 shadow-sm cursor-pointer ml-4"
              >
                <span>View Tag in Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Section - Deep Multi-Tone Surface with 3D Depth */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-700/60 shadow-[0_20px_50px_rgba(15,23,42,0.3)] overflow-hidden"
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2.5">
              <span className="text-[10px] font-mono font-black text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30 uppercase tracking-widest">
                Governance & Policy
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                Charter v2.4 (2026 Edition)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
              Governance & White-Hat Ethical Charter
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed pt-1 max-w-2xl">
              Official acceptable usage policy, legal compliance frameworks, and defensive security charter for CyberEmpireX. Designed to ensure all Termux tools, CTF labs, and open-source modules operate strictly within legal white-hat security boundaries.
            </p>
          </div>

          {/* Dynamic 3D Tag Status Card */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-5 rounded-2xl shadow-2xl flex items-center space-x-4 shrink-0 min-w-[280px]">
            <div className={`p-3 rounded-2xl shadow-inner shrink-0 ${agreedState ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
              {agreedState ? <UserCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Profile Tag Status
              </p>
              <p className={`text-sm font-black ${agreedState ? 'text-emerald-400' : 'text-amber-400'}`}>
                {agreedState ? 'Verified Ethical Hacker' : 'Charter Unsigned'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {agreedState 
                  ? `Signed on ${userProgress?.ethicalPledgeDate || 'Aug 2026'}` 
                  : 'Tick pledge below to grant tag'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selector Bar inside Hero */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Authorized Scope', icon: Layers },
            { id: 'pillars', label: '5 Ethical Pillars', icon: Scale },
            { id: 'legal', label: 'Statutory Legislation', icon: Lock },
            { id: 'pledge', label: 'Sign Charter Pledge', icon: FileCheck2 }
          ].map(tab => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Tabbed Views */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: OVERVIEW & AUTHORIZED SCOPE */}
        {(activeTab === 'overview' || activeTab === 'pillars') && (
          <motion.div 
            key="scope-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Core Scope Matrix - Open Fluid Layout (Un-boxed, Professional & Smooth) */}
            <div className="py-2">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
                
                {/* 1. Permitted Educational Use */}
                <div className="pt-6 lg:pt-0 lg:px-4 space-y-4 group">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <ScopeAuthorizedSvg className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-black tracking-widest text-emerald-600 uppercase block">
                        Authorized Scope
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                        Permitted Educational Use
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-2">
                    <li className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed group/item hover:text-slate-900 transition-colors">
                      <span className="mt-0.5 text-emerald-600 shrink-0">
                        <CheckBulletSvg className="w-4 h-4" />
                      </span>
                      <span>Local Termux emulator sandbox environment running on this device.</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed group/item hover:text-slate-900 transition-colors">
                      <span className="mt-0.5 text-emerald-600 shrink-0">
                        <CheckBulletSvg className="w-4 h-4" />
                      </span>
                      <span>Assigned CyberEmpireX CTF challenges, laboratories, and container targets.</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed group/item hover:text-slate-900 transition-colors">
                      <span className="mt-0.5 text-emerald-600 shrink-0">
                        <CheckBulletSvg className="w-4 h-4" />
                      </span>
                      <span>Verified Bug Bounty programs with explicit written scope (HackerOne / Bugcrowd).</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Strictly Prohibited */}
                <div className="pt-6 lg:pt-0 lg:px-6 space-y-4 group">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 border border-rose-500/20 shadow-xs group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <ScopeProhibitedSvg className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-black tracking-widest text-rose-600 uppercase block">
                        STRICTLY PROHIBITED
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                        Unauthorized Activity
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-2">
                    <li className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed group/item hover:text-slate-900 transition-colors">
                      <span className="mt-0.5 text-rose-600 shrink-0">
                        <BanBulletSvg className="w-4 h-4" />
                      </span>
                      <span>Port-scanning, probing, or testing third-party servers without consent.</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed group/item hover:text-slate-900 transition-colors">
                      <span className="mt-0.5 text-rose-600 shrink-0">
                        <BanBulletSvg className="w-4 h-4" />
                      </span>
                      <span>Executing Denial of Service (DoS/DDoS) stress tests on production networks.</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed group/item hover:text-slate-900 transition-colors">
                      <span className="mt-0.5 text-rose-600 shrink-0">
                        <BanBulletSvg className="w-4 h-4" />
                      </span>
                      <span>Deploying ransomware, backdoors, or unauthorized data exfiltration tools.</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Disclosure Protocol */}
                <div className="pt-6 lg:pt-0 lg:px-6 space-y-4 group">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 border border-blue-500/20 shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <ScopeDisclosureSvg className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-black tracking-widest text-blue-600 uppercase block">
                        DISCLOSURE PROTOCOL
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                        Vulnerability Disclosure
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-2">
                    <li className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed group/item hover:text-slate-900 transition-colors">
                      <span className="mt-0.5 text-blue-600 shrink-0">
                        <LockBulletSvg className="w-4 h-4" />
                      </span>
                      <span>Notify affected security teams privately with reproducible proof-of-concept steps.</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed group/item hover:text-slate-900 transition-colors">
                      <span className="mt-0.5 text-blue-600 shrink-0">
                        <LockBulletSvg className="w-4 h-4" />
                      </span>
                      <span>Allow a standard 90-day remediation window prior to public write-ups.</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed group/item hover:text-slate-900 transition-colors">
                      <span className="mt-0.5 text-blue-600 shrink-0">
                        <LockBulletSvg className="w-4 h-4" />
                      </span>
                      <span>Report platform issues directly to <strong className="text-slate-900 font-semibold">security@cyberempirex.org</strong>.</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* The 5 Pillars Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/20">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">The 5 Pillars of Ethical Security</h2>
                    <p className="text-xs text-slate-500">Universal operational principles enforced across all CyberEmpireX tools.</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Global White-Hat Standard
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Pillar 1 */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-md">
                      01
                    </span>
                    <CompTiaBrandLogo className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    Explicit Written Permission
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prior to executing port scans, automated fuzzers, or penetration scripts, ensure explicit written authorization is issued by the infrastructure owner.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-md">
                      02
                    </span>
                    <CiscoBrandLogo className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    Scope Boundary Integrity
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Honor program rules of engagement strictly. Never cross into secondary subdomains, unlisted third-party APIs, or out-of-scope targets.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-md">
                      03
                    </span>
                    <OffSecBrandLogo className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    Zero Operational Impact
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Defensive security audits must never compromise service availability, lock production databases, or leak user privacy records.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-md">
                      04
                    </span>
                    <LinuxBrandLogo className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    Coordinated Disclosure
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Share security findings confidentially with vendor security teams. Supply complete remediation guidelines and allow reasonable fix schedules.
                  </p>
                </div>

                {/* Pillar 5 */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 relative overflow-hidden group md:col-span-2 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-md">
                      05
                    </span>
                    <OpenSourceLogo className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    Community & Legal Professionalism
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Uphold open-source security integrity. Use knowledge acquired on CyberEmpireX to strengthen global defense, mentor aspiring security engineers, and preserve digital safety.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: LEGAL & STATUTORY STATUTES */}
        {(activeTab === 'overview' || activeTab === 'legal') && (
          <motion.div 
            key="legal-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-500/20 border border-blue-400/30 rounded-2xl text-blue-400 shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Statutory Cyber Crime Legislation</h3>
                    <p className="text-xs text-slate-400">Jurisdictional statutes governing unauthorized system access worldwide.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30 self-start sm:self-auto">
                  LEGAL STATUTE WARNING
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <strong className="text-blue-400 font-mono font-bold">United States: CFAA</strong>
                    <span className="text-[10px] text-slate-500 font-mono">18 U.S.C. § 1030</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Criminalizes intentional unauthorized access to protected computers, prohibiting data extortion, service disruption, or unauthorized credential harvesting.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <strong className="text-blue-400 font-mono font-bold">United Kingdom: CMA 1990</strong>
                    <span className="text-[10px] text-slate-500 font-mono">Computer Misuse Act</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Outlaws unauthorized access to computer material, unauthorized access with intent to commit further offences, and unauthorized modification of computer data.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <strong className="text-blue-400 font-mono font-bold">European Union: NIS2 Directive</strong>
                    <span className="text-[10px] text-slate-500 font-mono">Directive (EU) 2022/2555</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Enforces strict cybersecurity risk-management compliance standards and coordinated vulnerability reporting requirements for digital service providers.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <strong className="text-blue-400 font-mono font-bold">Global Standards: NIST SP 800-115</strong>
                    <span className="text-[10px] text-slate-500 font-mono">ISO/IEC 27001</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Provides technical guidelines for information security testing, defining rules of engagement for vulnerability assessments and penetration audits.
                  </p>
                </div>
              </div>

              {/* Terminal Verification Widget */}
              <CommandPromptGlyph 
                command="cex --verify-governance --user=current" 
                status="CHARTER_VERIFIED"
              />
            </div>
          </motion.div>
        )}

        {/* TAB 3: PLEDGE AGREEMENT & CERTIFICATION */}
        {(activeTab === 'overview' || activeTab === 'pledge') && (
          <motion.div 
            key="pledge-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.4)] text-white space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-5">
              <div className="flex items-center space-x-3.5">
                <div className={`p-3.5 rounded-2xl shadow-lg shrink-0 ${agreedState ? 'bg-emerald-500 text-slate-950' : 'bg-blue-600 text-white'}`}>
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Ethical Security Practitioner Pledge</h3>
                  <p className="text-xs text-slate-300">Sign the charter to receive your official Verified Ethical Hacker profile tag (+50 XP).</p>
                </div>
              </div>

              {agreedState && (
                <span className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 self-start sm:self-auto shadow-xs">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Charter Signatory Active</span>
                </span>
              )}
            </div>

            {/* Interactive Checkbox Control */}
            <label className="flex items-start space-x-4 p-5 bg-slate-950/80 border border-slate-700/80 rounded-2xl cursor-pointer hover:border-blue-400 transition-all duration-200 group">
              <input
                type="checkbox"
                checked={agreedState}
                onChange={(e) => handleTogglePledge(e.target.checked)}
                className="mt-1 w-6 h-6 accent-blue-500 rounded-md cursor-pointer shrink-0"
              />
              <div className="space-y-1">
                <span className="text-sm font-black text-white group-hover:text-blue-300 transition-colors flex items-center space-x-2">
                  <span>I solemnly pledge to uphold the CyberEmpireX Ethical Security Charter.</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  I confirm that I will use all Termux security tools, penetration testing scripts, terminal labs, and educational resources strictly for authorized, legal security audits and educational skill advancement.
                </p>
              </div>
            </label>

            {/* Dynamic Unlocked Profile Badge Tag Panel */}
            {agreedState ? (
              <div className="p-5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center space-x-3.5">
                  <OpenSourceLogo className="w-9 h-9 text-emerald-400 shrink-0" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-white">Profile Tag Active!</span>
                      <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 rounded text-[10px] font-mono font-black">
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      The official <strong className="font-bold text-white">Verified Ethical Hacker</strong> tag is now active on your account profile page.
                    </p>
                  </div>
                </div>

                {setView && (
                  <button
                    onClick={() => setView('profile')}
                    className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black rounded-xl transition-colors shadow-lg flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Go To Profile</span>
                  </button>
                )}
              </div>
            ) : (
              <p className="text-xs text-center text-slate-400 font-mono">
                * Checking the agreement box above attaches the <strong className="text-blue-400">Verified Ethical Hacker</strong> badge tag to your profile page.
              </p>
            )}

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};


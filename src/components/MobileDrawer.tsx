import React, { useState } from 'react';
import { 
  X, Terminal, BookOpen, ShieldAlert, Sparkles, Trophy, 
  Award, ChevronRight, ChevronDown, Wrench, User, 
  BarChart3, QrCode, KeyRound, Hash, Key, Lock, Globe,
  Search, FileSearch, ArrowLeftRight, ShieldCheck, Cpu, 
  Layers, LayoutDashboard, Server, Code, Zap,
  Users, HeartHandshake, DollarSign, Award as MedalIcon, HelpCircle,
  MessageSquare, FileText, Heart, Gift, Mail, LifeBuoy
} from 'lucide-react';
import { ViewMode, UserProgress } from '../types';
import brandSymbol from '../assets/brand/symbol.png';
import brandWordmark from '../assets/brand/wordmark.png';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  userProgress: UserProgress;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  setView,
  userProgress
}) => {
  // Collapsible nested navigation sections - DEFAULT COLLAPSED FOR PROGRESSIVE DISCLOSURE
  const [openSubMenu, setOpenSubMenu] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleSubMenu = (key: string) => {
    setOpenSubMenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNav = (view: ViewMode) => {
    setView(view);
    onClose();
  };

  const isNavActive = (view: ViewMode) => currentView === view;

  const navItemClass = (view: ViewMode) => {
    const active = isNavActive(view);
    return `
      w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
        active
          ? 'bg-[#2563EB] text-white font-semibold shadow-2xs'
          : 'text-[#374151] hover:bg-[#F1F5F9] hover:text-[#111827]'
      }
    `;
  };

  const parentHeaderClass = (isOpen: boolean) => `
    w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
      isOpen ? 'text-[#111827] bg-[#F8FAFC]' : 'text-[#4B5563] hover:bg-[#F1F5F9] hover:text-[#111827]'
    }
  `;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay Backdrop */}
      <div 
        className="fixed inset-0 bg-[#111827]/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl z-10 overflow-hidden animate-in slide-in-from-right duration-300 border-l border-[#E5E7EB]">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center space-x-3">
            <img 
              src={brandSymbol} 
              alt="CyberEmpireX Symbol" 
              className="h-12 sm:h-14 w-auto object-contain shrink-0" 
            />
            <div className="flex flex-col justify-center">
              <img 
                src={brandWordmark} 
                alt="CyberEmpireX" 
                className="h-6 sm:h-7.5 md:h-8.5 w-auto object-contain shrink-0" 
              />
              <p className="text-[10px] text-[#6B7280] mt-0.5 font-medium">Navigation Menu</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Progress Mini Badge */}
        <div className="p-3 m-3 mb-1 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] space-y-1.5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs font-bold text-[#111827]">Security Specialist</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-white px-2 py-0.5 rounded-md border border-[#E5E7EB]">
              Lvl {userProgress.level}
            </span>
          </div>

          <div className="flex justify-between text-[11px] text-[#6B7280] font-mono">
            <span>{userProgress.xp || 0} XP Earned</span>
            <span className="text-[#2563EB] font-bold">{(userProgress.earnedBadges || []).length} Badges</span>
          </div>
        </div>

        {/* NAVIGATION TREE LIST */}
        <div className="p-3 space-y-5 flex-1 overflow-y-auto">
          
          {/* SECTION 1: PLATFORM CORE */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-[#6B7280] tracking-wider uppercase">
              Platform Core
            </div>
            <div className="space-y-0.5">
              <button onClick={() => handleNav('home')} className={navItemClass('home')}>
                <div className="flex items-center space-x-2.5">
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Dashboard</span>
                </div>
              </button>
              <button onClick={() => handleNav('profile')} className={navItemClass('profile')}>
                <div className="flex items-center space-x-2.5">
                  <User className="w-4 h-4 shrink-0" />
                  <span>Profile & Settings</span>
                </div>
              </button>
              <button onClick={() => handleNav('progress')} className={navItemClass('progress')}>
                <div className="flex items-center space-x-2.5">
                  <BarChart3 className="w-4 h-4 shrink-0" />
                  <span>Progress</span>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 2: EDUCATION & LABS */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-[#6B7280] tracking-wider uppercase">
              Education & Labs
            </div>

            <div className="space-y-0.5">
              {/* Parent: Learning Paths */}
              <div>
                <button
                  onClick={() => toggleSubMenu('learningPaths')}
                  className={parentHeaderClass(!!openSubMenu.learningPaths)}
                >
                  <div className="flex items-center space-x-2.5">
                    <BookOpen className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>Learning Paths</span>
                  </div>
                  {openSubMenu.learningPaths ? (
                    <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                  )}
                </button>

                {openSubMenu.learningPaths && (
                  <div className="ml-3 pl-3 border-l border-[#E5E7EB] my-1 space-y-0.5">
                    {/* Sub-parent: Cybersecurity */}
                    <div>
                      <button
                        onClick={() => toggleSubMenu('cybersecurity')}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          openSubMenu.cybersecurity ? 'text-[#111827] bg-[#F8FAFC]' : 'text-[#4B5563] hover:text-[#111827]'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>Cybersecurity</span>
                        </div>
                        {openSubMenu.cybersecurity ? (
                          <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]" />
                        )}
                      </button>

                      {openSubMenu.cybersecurity && (
                        <div className="ml-2 pl-3 border-l border-[#E5E7EB] my-0.5 space-y-0.5">
                          <button onClick={() => handleNav('learning-beginner')} className={navItemClass('learning-beginner')}>
                            <span>Beginner</span>
                          </button>
                          <button onClick={() => handleNav('learning-intermediate')} className={navItemClass('learning-intermediate')}>
                            <span>Intermediate</span>
                          </button>
                          <button onClick={() => handleNav('learning-advanced')} className={navItemClass('learning-advanced')}>
                            <span>Advanced</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Education Items */}
              <button onClick={() => handleNav('labs')} className={navItemClass('labs')}>
                <div className="flex items-center space-x-2.5">
                  <Zap className="w-4 h-4 shrink-0" />
                  <span>Practice Labs</span>
                </div>
              </button>

              <button onClick={() => handleNav('terminal-lab')} className={navItemClass('terminal-lab')}>
                <div className="flex items-center space-x-2.5">
                  <Terminal className="w-4 h-4 shrink-0" />
                  <span>Interactive Terminal Lab</span>
                </div>
              </button>

              <button onClick={() => handleNav('challenges')} className={navItemClass('challenges')}>
                <div className="flex items-center space-x-2.5">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>CTF Challenges</span>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 3: TOOLS & AI */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-[#6B7280] tracking-wider uppercase">
              Tools & AI
            </div>

            <div className="space-y-0.5">
              <button onClick={() => handleNav('tools-matrix')} className={navItemClass('tools-matrix')}>
                <div className="flex items-center space-x-2.5">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>Security Tools Matrix</span>
                </div>
              </button>

              {/* Parent: Tools & Utilities */}
              <div>
                <button
                  onClick={() => toggleSubMenu('toolsUtilities')}
                  className={parentHeaderClass(!!openSubMenu.toolsUtilities)}
                >
                  <div className="flex items-center space-x-2.5">
                    <Wrench className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>Tools & Utilities</span>
                  </div>
                  {openSubMenu.toolsUtilities ? (
                    <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                  )}
                </button>

                {openSubMenu.toolsUtilities && (
                  <div className="ml-3 pl-3 border-l border-[#E5E7EB] my-1 space-y-1">
                    {/* Sub-group: Generators */}
                    <div>
                      <button
                        onClick={() => toggleSubMenu('generators')}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          openSubMenu.generators ? 'text-[#111827] bg-[#F8FAFC]' : 'text-[#4B5563] hover:text-[#111827]'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Code className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>Generators</span>
                        </div>
                        {openSubMenu.generators ? (
                          <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]" />
                        )}
                      </button>

                      {openSubMenu.generators && (
                        <div className="ml-2 pl-3 border-l border-[#E5E7EB] my-0.5 space-y-0.5">
                          <button onClick={() => handleNav('qr-generator')} className={navItemClass('qr-generator')}>
                            <div className="flex items-center space-x-2">
                              <QrCode className="w-3.5 h-3.5 shrink-0" />
                              <span>QR Code Generator</span>
                            </div>
                          </button>
                          <button onClick={() => handleNav('password-generator')} className={navItemClass('password-generator')}>
                            <div className="flex items-center space-x-2">
                              <KeyRound className="w-3.5 h-3.5 shrink-0" />
                              <span>Password Generator</span>
                            </div>
                          </button>
                          <button onClick={() => handleNav('hash-generator')} className={navItemClass('hash-generator')}>
                            <div className="flex items-center space-x-2">
                              <Hash className="w-3.5 h-3.5 shrink-0" />
                              <span>Hash Generator</span>
                            </div>
                          </button>
                          <button onClick={() => handleNav('token-generator')} className={navItemClass('token-generator')}>
                            <div className="flex items-center space-x-2">
                              <Key className="w-3.5 h-3.5 shrink-0" />
                              <span>Token Generator</span>
                            </div>
                          </button>
                          <button onClick={() => handleNav('crypto-tool')} className={navItemClass('crypto-tool')}>
                            <div className="flex items-center space-x-2">
                              <Lock className="w-3.5 h-3.5 shrink-0" />
                              <span>Encryption / Decryption</span>
                            </div>
                          </button>
                          <button onClick={() => handleNav('ip-lookup')} className={navItemClass('ip-lookup')}>
                            <div className="flex items-center space-x-2">
                              <Search className="w-3.5 h-3.5 shrink-0" />
                              <span>IP / Domain Lookup</span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Sub-group: Network Tools */}
                    <div>
                      <button
                        onClick={() => toggleSubMenu('networkTools')}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          openSubMenu.networkTools ? 'text-[#111827] bg-[#F8FAFC]' : 'text-[#4B5563] hover:text-[#111827]'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Globe className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>Network Tools</span>
                        </div>
                        {openSubMenu.networkTools ? (
                          <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]" />
                        )}
                      </button>

                      {openSubMenu.networkTools && (
                        <div className="ml-2 pl-3 border-l border-[#E5E7EB] my-0.5 space-y-0.5">
                          <button onClick={() => handleNav('dns-lookup')} className={navItemClass('dns-lookup')}>
                            <div className="flex items-center space-x-2">
                              <Globe className="w-3.5 h-3.5 shrink-0" />
                              <span>DNS Lookup</span>
                            </div>
                          </button>
                          <button onClick={() => handleNav('whois-lookup')} className={navItemClass('whois-lookup')}>
                            <div className="flex items-center space-x-2">
                              <FileSearch className="w-3.5 h-3.5 shrink-0" />
                              <span>WHOIS Lookup</span>
                            </div>
                          </button>
                          <button onClick={() => handleNav('reverse-dns')} className={navItemClass('reverse-dns')}>
                            <div className="flex items-center space-x-2">
                              <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
                              <span>Reverse DNS</span>
                            </div>
                          </button>
                          <button onClick={() => handleNav('ssl-checker')} className={navItemClass('ssl-checker')}>
                            <div className="flex items-center space-x-2">
                              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                              <span>SSL Certificate Checker</span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* AI Security Assistant */}
              <button onClick={() => handleNav('ai-coach')} className={navItemClass('ai-coach')}>
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>AI Security Assistant</span>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 4: KNOWLEDGE */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-[#6B7280] tracking-wider uppercase">
              Knowledge
            </div>

            <div className="space-y-0.5">
              <button onClick={() => handleNav('knowledge-linux')} className={navItemClass('knowledge-linux')}>
                <div className="flex items-center space-x-2.5">
                  <Server className="w-4 h-4 shrink-0" />
                  <span>Linux</span>
                </div>
              </button>
              <button onClick={() => handleNav('knowledge-networking')} className={navItemClass('knowledge-networking')}>
                <div className="flex items-center space-x-2.5">
                  <Globe className="w-4 h-4 shrink-0" />
                  <span>Networking</span>
                </div>
              </button>
              <button onClick={() => handleNav('knowledge-termux')} className={navItemClass('knowledge-termux')}>
                <div className="flex items-center space-x-2.5">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <span>Termux</span>
                </div>
              </button>
              <button onClick={() => handleNav('knowledge-concepts')} className={navItemClass('knowledge-concepts')}>
                <div className="flex items-center space-x-2.5">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Security Concepts</span>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 5: GOVERNANCE */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-[#6B7280] tracking-wider uppercase">
              Governance
            </div>

            <div className="space-y-0.5">
              <button onClick={() => handleNav('disclaimer')} className={navItemClass('disclaimer')}>
                <div className="flex items-center space-x-2.5">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500" />
                  <span>Ethical Guidelines</span>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 6: COMMUNITY & SUPPORT */}
          <div className="space-y-1">
            <div className="space-y-0.5">
              {/* Parent: Community & Support */}
              <div>
                <button
                  onClick={() => toggleSubMenu('communitySupport')}
                  className={parentHeaderClass(!!openSubMenu.communitySupport)}
                >
                  <div className="flex items-center space-x-2.5">
                    <Users className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>Community & Support</span>
                  </div>
                  {openSubMenu.communitySupport ? (
                    <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                  )}
                </button>

                {openSubMenu.communitySupport && (
                  <div className="ml-3 pl-3 border-l border-[#E5E7EB] my-1 space-y-0.5">
                    <button onClick={() => handleNav('community-contribute')} className={navItemClass('community-contribute')}>
                      <div className="flex items-center space-x-2">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span>Contribute</span>
                      </div>
                    </button>

                    <button onClick={() => handleNav('community-donate')} className={navItemClass('community-donate')}>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                        <span>Donate</span>
                      </div>
                    </button>

                    <button onClick={() => handleNav('community-sponsorship')} className={navItemClass('community-sponsorship')}>
                      <div className="flex items-center space-x-2">
                        <Gift className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                        <span>Sponsorship</span>
                      </div>
                    </button>

                    <button onClick={() => handleNav('community-support')} className={navItemClass('community-support')}>
                      <div className="flex items-center space-x-2">
                        <LifeBuoy className="w-3.5 h-3.5 shrink-0 text-[#2563EB]" />
                        <span>Support</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer inside Drawer */}
        <div className="p-3 bg-[#F8FAFC] border-t border-[#E5E7EB] text-center text-[10px] font-mono text-[#6B7280] shrink-0">
          CyberEmpireX Platform v2.0
        </div>

      </div>
    </div>
  );
};

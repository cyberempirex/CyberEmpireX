import React, { useState } from 'react';
import { 
  ArrowLeft, Users, Heart, Gift, LifeBuoy, CheckCircle2, 
  Code2, FileText, Bug, Sparkles, Globe, Shield, Terminal, 
  CreditCard, Mail, MessageSquare, Wrench, Copy, Check, ExternalLink,
  BookOpen, AlertTriangle, Scale, CheckSquare, Square,
  Search, ChevronDown, ChevronUp, Clock, Send, RefreshCw,
  FileCode, Activity, ThumbsUp, ThumbsDown, X, Key, Cpu, Server
} from 'lucide-react';
import { ViewMode, UserProfile } from '../types';
import openSourceImage from '../assets/images/open_source_community_1786186625329.jpg';
import brandSymbol from '../assets/brand/symbol.png';
import brandWordmark from '../assets/brand/wordmark.png';

interface CommunityPageProps {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  userProfile?: UserProfile;
}

// Clean Open-Source Official Vector SVG Logos
const GithubSvg = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const OpenSourceSvg = ({ className = "w-8 h-8 text-[#3DA639] shrink-0" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <path d="M 50,2 C 23.49,2 2,23.49 2,50 c 0,19.34 11.44,36.01 27.87,43.68 L 41.52,72.63 C 32.55,68.21 26.33,59.83 26.33,50 c 0,-13.07 10.6,-23.67 23.67,-23.67 13.07,0 23.67,10.6 23.67,23.67 0,9.83 -6.22,18.21 -15.19,22.63 L 70.13,93.68 C 86.56,86.01 98,69.34 98,50 98,23.49 76.51,2 50,2 Z" />
  </svg>
);

const EligibilityPersonSvg = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

const ExternalLinkSvg = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ArrowRightSvg = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const CommunityPage: React.FC<CommunityPageProps> = ({ view, setView, userProfile }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [checkedRules, setCheckedRules] = useState<Record<number, boolean>>({});
  
  // State for Contributor Eligibility permission
  const [isEligibilityConfirmed, setIsEligibilityConfirmed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('cyberempirex_eligibility_confirmed') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Modal popup state when clicking View Repository without eligibility permission
  const [showEligibilityModal, setShowEligibilityModal] = useState<boolean>(false);

  // Enterprise Support Portal States
  const [supportSearchQuery, setSupportSearchQuery] = useState('');
  const [selectedKbCategory, setSelectedKbCategory] = useState<string>('all');
  const [supportActiveTab, setSupportActiveTab] = useState<'kb' | 'ticket' | 'faq' | 'security'>('kb');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [faqRatings, setFaqRatings] = useState<Record<string, 'up' | 'down'>>({});
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  // Ticket Form state
  const [ticketForm, setTicketForm] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    category: 'terminal',
    priority: 'normal',
    subject: '',
    description: '',
    attachSysInfo: true,
  });
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    timestamp: string;
    category: string;
    priority: string;
    subject: string;
    email: string;
  } | null>(null);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [copiedDeskEmail, setCopiedDeskEmail] = useState(false);
  const [copiedSecurityEmail, setCopiedSecurityEmail] = useState(false);
  const [copiedPgpKey, setCopiedPgpKey] = useState(false);

  // Donate Page Interactive States
  const [donateTier, setDonateTier] = useState<'supporter' | 'defender' | 'patron' | 'custom'>('defender');
  const [donateCustomAmount, setDonateCustomAmount] = useState<string>('15');
  const [donatePaymentMethod, setDonatePaymentMethod] = useState<'card' | 'github' | 'crypto'>('card');
  const [copiedBtcAddress, setCopiedBtcAddress] = useState(false);
  const [copiedEthAddress, setCopiedEthAddress] = useState(false);
  const [isProcessingDonation, setIsProcessingDonation] = useState(false);
  const [donationSuccessMessage, setDonationSuccessMessage] = useState<string | null>(null);

  // Authentication Gate Check for Protected Pages
  const isProtectedView = view === 'community-contribute' || view === 'community-core-team' || view === 'community-eligibility';
  if (isProtectedView && !userProfile?.isLoggedIn) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-12 text-center space-y-6 animate-in fade-in duration-200">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm space-y-5">
          <div className="w-14 h-14 bg-blue-50 border border-blue-100 text-[#2563EB] rounded-2xl mx-auto flex items-center justify-center">
            <Shield className="w-7 h-7 text-[#2563EB]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Authentication Required
            </span>
            <h1 className="text-2xl font-black text-[#111827] tracking-tight">
              Sign in to Continue
            </h1>
            <p className="text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
              To view contributor guidelines, eligibility criteria, and apply for the Core Team, please sign in or create an account.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setView('auth')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Sign In / Sign Up →
            </button>
            <button
              onClick={() => setView('home')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#F8FAFC] hover:bg-slate-100 text-[#374151] font-semibold text-sm rounded-xl border border-[#E5E7EB] transition-colors cursor-pointer"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const toggleRule = (idx: number) => {
    setCheckedRules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleToggleEligibilityConfirm = (val: boolean) => {
    setIsEligibilityConfirmed(val);
    try {
      localStorage.setItem('cyberempirex_eligibility_confirmed', val ? 'true' : 'false');
    } catch (e) {
      console.warn('Failed to save eligibility status', e);
    }
  };

  const handleViewRepositoryClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!isEligibilityConfirmed) {
      setShowEligibilityModal(true);
    } else {
      window.open('https://github.com/cyberempirex/CyberEmpireX', '_blank', 'noopener,noreferrer');
    }
  };

  // Render Permission Required Popup Modal
  const renderEligibilityModal = () => {
    if (!showEligibilityModal) return null;
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-600 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Permission Required
              </span>
              <h3 className="text-lg font-black text-[#111827] tracking-tight">
                Contributor Permission Check Required
              </h3>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-[#374151] leading-relaxed font-medium bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB]">
            <p>
              You must complete the <strong className="text-[#111827]">Contributor Eligibility Check</strong> and confirm your permission agreement before accessing the CyberEmpireX repository.
            </p>
            <p className="text-xs text-[#6B7280]">
              This ensures all contributors understand responsible security guidelines, minimum age requirements (14+), and open-source licensing rules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-1">
            <button
              onClick={() => setShowEligibilityModal(false)}
              className="px-4 py-2.5 rounded-xl border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowEligibilityModal(false);
                setView('community-eligibility');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <EligibilityPersonSvg className="w-4 h-4 text-white" />
              <span>Check Eligibility Now →</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────
  // 1. CONTRIBUTE PAGE (community-contribute)
  // ─────────────────────────────────────────────────────────
  if (view === 'community-contribute') {
    const waysList = [
      {
        id: 'code',
        icon: Code2,
        title: 'Code',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        desc: 'Build features, improve existing functionality, fix bugs, optimize performance, and improve the platform architecture.'
      },
      {
        id: 'docs',
        icon: FileText,
        title: 'Documentation',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        desc: 'Improve explanations, documentation, setup instructions, tool documentation, and developer guides.'
      },
      {
        id: 'content',
        icon: BookOpen,
        title: 'Learning Content',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        desc: 'Create or improve tutorials, lessons, examples, diagrams, explanations, quizzes, summaries, and practical exercises.'
      },
      {
        id: 'research',
        icon: Shield,
        title: 'Security Research',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        desc: 'Contribute verified security information, vulnerability research, case studies, references, and defensive security knowledge.'
      },
      {
        id: 'tools',
        icon: Wrench,
        title: 'Tools & Utilities',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        desc: 'Build or improve safe, educational security utilities and generators used by learners and researchers.'
      },
      {
        id: 'testing',
        icon: Bug,
        title: 'Testing',
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        desc: 'Test features, report bugs, reproduce problems, check compatibility, and verify that new changes work correctly.'
      },
      {
        id: 'design',
        icon: Sparkles,
        title: 'Design & UX',
        color: 'text-cyan-600',
        bg: 'bg-cyan-50',
        desc: 'Improve layouts, navigation, accessibility, responsive behavior, information architecture, and overall usability.'
      },
      {
        id: 'review',
        icon: Scale,
        title: 'Review & Quality',
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        desc: 'Review code, technical explanations, commands, examples, and educational material for correctness, clarity, and safety.'
      }
    ];

    const filteredWays = activeTab === 'all' ? waysList : waysList.filter(w => w.id === activeTab);

    const beforeChecklist = [
      'Your contribution is original or properly licensed.',
      'Security-related material is intended for legal and educational use.',
      'Commands, tools, and examples are tested before being submitted.',
      'You do not include malware, credential theft, destructive payloads, or harmful functionality.',
      'You do not submit private information, leaked credentials, or unauthorized data.',
      'Third-party code and assets comply with their licenses.',
      'Educational content is accurate and clearly explained.',
      'Changes do not intentionally weaken platform security.'
    ];

    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 relative">
        {renderEligibilityModal()}

        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
          <button 
            onClick={() => setView('home')} 
            className="hover:text-[#2563EB] flex items-center space-x-1 cursor-pointer font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span>Community & Support</span>
          <span>/</span>
          <span className="text-[#2563EB] font-bold">Contribute</span>
        </div>

        {/* HERO SECTION */}
        <div className="relative overflow-hidden pt-2 pb-6 border-b border-[#E5E7EB]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-3">
                <OpenSourceSvg />
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold uppercase tracking-wide">
                  Open Source Initiative
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold font-mono tracking-widest text-[#2563EB] uppercase">
                  CONTRIBUTE
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight leading-tight">
                  Help build CyberEmpireX
                </h1>
              </div>

              <p className="text-base text-[#374151] leading-relaxed font-normal">
                CyberEmpireX is an open-source cybersecurity learning platform. Contributions help improve the learning experience, expand educational content, build useful tools, fix problems, and make the platform more valuable for learners and security researchers.
              </p>

              {/* SINGLE PRIMARY ACTION BUTTON PAIR ON PAGE */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    setView('community-eligibility');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-5 py-2.5 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
                    isEligibilityConfirmed 
                      ? 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800'
                      : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xs'
                  }`}
                >
                  <EligibilityPersonSvg className={`w-4 h-4 ${isEligibilityConfirmed ? 'text-emerald-700' : 'text-white'}`} />
                  <span>{isEligibilityConfirmed ? 'Eligibility Confirmed ✓' : 'Check Eligibility →'}</span>
                </button>

                <button
                  onClick={handleViewRepositoryClick}
                  className={`px-5 py-2.5 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
                    isEligibilityConfirmed
                      ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-[#111827] border border-[#CBD5E1]'
                  }`}
                >
                  <GithubSvg className="w-4 h-4" />
                  <span>View Repository</span>
                  {!isEligibilityConfirmed && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">
                      Check Required
                    </span>
                  )}
                  <ExternalLinkSvg className="w-3.5 h-3.5 opacity-80" />
                </button>
              </div>

              {/* Quick Git Command Terminal Snippet - Appears ONLY after permission confirmation */}
              {isEligibilityConfirmed ? (
                <div className="pt-2 animate-in fade-in duration-300">
                  <div className="bg-[#0F172A] text-slate-100 rounded-xl p-3.5 font-mono text-xs shadow-md border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2 overflow-x-auto">
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="text-slate-200">git clone https://github.com/cyberempirex/CyberEmpireX.git</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('git clone https://github.com/cyberempirex/CyberEmpireX.git')}
                      className="ml-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                      title="Copy command"
                    >
                      {copiedCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    onClick={() => setShowEligibilityModal(true)}
                    className="w-full bg-[#0F172A]/90 hover:bg-[#0F172A] border border-amber-500/30 text-slate-300 rounded-xl p-3.5 font-mono text-xs shadow-xs flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <span className="p-1 rounded bg-amber-500/10 text-amber-400 text-xs shrink-0">🔒</span>
                      <span className="text-slate-400 italic group-hover:text-amber-300 transition-colors truncate">
                        git clone URL hidden — complete eligibility check to reveal
                      </span>
                    </div>
                    <span className="text-[10px] font-sans font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-md shrink-0 ml-2">
                      Check Required 🔒
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Generated Image Container */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-lg bg-slate-50 group">
                <img 
                  src={openSourceImage} 
                  alt="CyberEmpireX Open Source Collaboration" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs font-medium flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Global Cybersecurity Open Source Community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────── */}
        {/* CONTRIBUTOR ELIGIBILITY INFORMATION BANNER CARD          */}
        {/* ───────────────────────────────────────────────────────── */}
        <div 
          onClick={() => {
            setView('community-eligibility');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-blue-50/90 hover:bg-blue-100/90 transition-all rounded-2xl p-5 sm:p-6 text-[#1E3A8A] cursor-pointer shadow-xs border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-[#2563EB] text-white rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <EligibilityPersonSvg className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-full">
                  Prerequisite Requirements
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#1E3A8A]">
                Contributor Eligibility & Guidelines
              </h3>
              <p className="text-xs text-blue-800 font-medium">
                {isEligibilityConfirmed 
                  ? '✓ You have verified eligibility and agreed to contributor requirements.' 
                  : 'Review minimum age (14+), code of conduct, and responsible security guidelines.'}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#2563EB] group-hover:translate-x-1 transition-transform flex items-center space-x-1 shrink-0 bg-white px-3 py-1.5 rounded-lg border border-blue-200">
            <span>{isEligibilityConfirmed ? 'View Requirements Status' : 'Review Requirements'}</span>
            <ArrowRightSvg className="w-3 h-3.5" />
          </span>
        </div>

        {/* WHY CONTRIBUTE SECTION */}
        <section className="space-y-6">
          <div className="flex items-baseline space-x-3 border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#111827]">WHY CONTRIBUTE</h2>
          </div>

          <p className="text-base text-[#374151] leading-relaxed">
            Contributing is more than adding code. You can help improve CyberEmpireX even if you are not a developer.
          </p>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Your contribution can:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'Improve cybersecurity learning materials',
                'Add or improve practical examples',
                'Fix bugs and usability problems',
                'Create useful security utilities',
                'Improve documentation',
                'Add safe educational labs and exercises',
                'Review existing content for accuracy',
                'Improve accessibility and user experience',
                'Share research, references, and learning resources'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#1F2937] font-medium">
                  <span className="text-[#2563EB] font-bold shrink-0">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAYS TO CONTRIBUTE SECTION */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB] pb-3 gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#111827]">WAYS TO CONTRIBUTE</h2>
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all' 
                    ? 'bg-[#2563EB] text-white shadow-xs' 
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                }`}
              >
                All ({waysList.length})
              </button>
              {waysList.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === item.id 
                      ? 'bg-[#2563EB] text-white shadow-xs' 
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredWays.map((way) => {
              const IconComponent = way.icon;
              return (
                <div 
                  key={way.id}
                  className="p-4 rounded-xl border border-[#E5E7EB] bg-white space-y-2 hover:border-[#2563EB] transition-all"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded-lg ${way.bg} ${way.color} shrink-0`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#111827]">{way.title}</h3>
                  </div>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {way.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW TO CONTRIBUTE SECTION */}
        <section className="space-y-6">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#111827]">HOW TO CONTRIBUTE</h2>
          </div>

          <div className="space-y-3">
            {[
              'Explore the project and understand what you want to improve.',
              'Check existing issues, discussions, and contribution documentation before starting major work.',
              'Fork the repository and create a separate branch for your work.',
              'Make your changes clearly and keep them focused.',
              'Test your changes before submitting them.',
              'Document important changes where necessary.',
              'Submit a pull request describing what you changed and why.',
              'Respond to review feedback and make revisions when required.'
            ].map((step, idx) => (
              <div key={idx} className="flex items-start space-x-3.5 p-3.5 rounded-xl border border-[#E5E7EB] bg-white">
                <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#1F2937] font-medium leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-[#1E40AF]">
            <span className="font-bold">Note: </span>
            For small corrections, such as documentation fixes or minor content improvements, keep the contribution simple and focused.
          </div>
        </section>

        {/* BEFORE YOU CONTRIBUTE SECTION (With Interactive Checklist) */}
        <section className="space-y-6">
          <div className="border-b border-[#E5E7EB] pb-3 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#111827]">BEFORE YOU CONTRIBUTE</h2>
            <span className="text-xs font-mono font-semibold text-[#6B7280]">
              Checklist ({Object.values(checkedRules).filter(Boolean).length}/{beforeChecklist.length})
            </span>
          </div>

          <p className="text-sm text-[#374151] font-medium">Please make sure that:</p>

          <div className="space-y-2">
            {beforeChecklist.map((rule, idx) => {
              const isChecked = !!checkedRules[idx];
              return (
                <div 
                  key={idx}
                  onClick={() => toggleRule(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                    isChecked 
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950' 
                      : 'bg-white border-[#E5E7EB] text-[#374151] hover:border-slate-300'
                  }`}
                >
                  <button className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {rule}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTRIBUTION GUIDELINES SECTION */}
        <section className="space-y-6">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#111827]">CONTRIBUTION GUIDELINES</h2>
          </div>

          <p className="text-sm text-[#374151] font-medium leading-relaxed">
            Keep contributions practical, understandable, maintainable, and useful to learners.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prefer Column */}
            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Prefer:</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
                {[
                  'Clear and readable code',
                  'Accurate technical explanations',
                  'Reproducible examples',
                  'Safe laboratory environments',
                  'Minimal dependencies',
                  'Accessible documentation',
                  'Small, focused changes'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid Column */}
            <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Avoid:</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-950 font-medium">
                {[
                  'Unnecessary complexity',
                  'Duplicate functionality',
                  'Unverified security claims',
                  'Copy-pasted content without proper licensing',
                  'Dangerous functionality without a legitimate educational purpose'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CODE OF CONDUCT SECTION */}
        <section className="space-y-6">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#111827]">CODE OF CONDUCT</h2>
          </div>

          <p className="text-sm text-[#374151] leading-relaxed">
            CyberEmpireX is intended to be a respectful and constructive open-source environment.
          </p>

          <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-white space-y-3">
            <h3 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Contributors should:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {[
                'Communicate respectfully',
                'Give useful technical feedback',
                'Accept reasonable review and correction',
                'Avoid harassment, discrimination, or personal attacks',
                'Respect other contributors and learners',
                'Keep discussions focused on improving the project'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-[#374151] font-medium">
                  <span className="text-[#2563EB] font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] text-xs text-[#4B5563] leading-relaxed font-medium">
              Security knowledge must be used responsibly. Contributions should support learning, research, defense, and authorized testing.
            </div>
          </div>
        </section>

        {/* CONTRIBUTOR RECOGNITION SECTION */}
        <section className="space-y-6">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#111827]">CONTRIBUTOR RECOGNITION</h2>
          </div>

          <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-slate-50 space-y-3 text-sm text-[#374151] leading-relaxed font-medium">
            <p>
              Contributions can be recognized through the project's contributor records, release notes, documentation, acknowledgements, or other appropriate project recognition.
            </p>
            <p>
              Recognition depends on the nature and quality of the contribution. Meaningful contributions are valued regardless of whether they involve code.
            </p>
          </div>
        </section>

        {/* START CONTRIBUTING SECTION */}
        <section className="pt-4 border-t-2 border-[#2563EB] space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">START CONTRIBUTING</h2>
            <p className="text-sm font-bold text-[#2563EB]">
              You do not need to be an expert to contribute.
            </p>
          </div>

          <p className="text-sm text-[#374151] leading-relaxed font-medium">
            Start with something useful and manageable: fix a typo, improve an explanation, report a bug, test a feature, improve documentation, create a learning example, or submit a technical improvement. Every useful contribution helps make CyberEmpireX better.
          </p>
        </section>

        {/* CORE TEAM RECRUITMENT CARD */}
        <section className="pt-4 border-t border-[#E5E7EB]">
          <div className="bg-[#151922] border border-[#262C3A] rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#1E2536] border border-[#2A324B] rounded-lg text-[#3B82F6] shrink-0">
                  <Users className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B82F6]">
                  Platform Management
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Want to help manage CyberEmpireX?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Join the limited Core Team and take responsibility for a specific platform role.
              </p>
            </div>

            <button
              onClick={() => {
                setView('community-core-team');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer shrink-0 w-full md:w-auto"
            >
              <span>Apply for Core Team →</span>
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // CORE TEAM PAGE (community-core-team)
  // ─────────────────────────────────────────────────────────
  if (view === 'community-core-team') {
    const rolesList = [
      { title: 'Learning & Curriculum', seats: 3, desc: 'Responsible for developing, improving, organizing, and reviewing cybersecurity learning paths and lessons.' },
      { title: 'Cybersecurity Research', seats: 2, desc: 'Researches cybersecurity topics, vulnerabilities, threats, technical developments, and reliable security information.' },
      { title: 'Labs & CTF', seats: 2, desc: 'Creates and maintains safe interactive labs, exercises, scenarios, and CTF challenges.' },
      { title: 'Tools & Generators', seats: 2, desc: 'Builds and maintains CyberEmpireX tools, generators, utilities, and related educational functionality.' },
      { title: 'Technical Engineering', seats: 3, desc: 'Maintains the platform\'s frontend, backend, infrastructure, performance, and technical systems.' },
      { title: 'Security Review', seats: 2, desc: 'Reviews platform features, code, security-related content, and potential security risks.' },
      { title: 'Documentation & Knowledge', seats: 2, desc: 'Maintains technical documentation, references, command explanations, and the knowledge base.' },
      { title: 'QA & Testing', seats: 2, desc: 'Tests platform features, learning content, labs, tools, compatibility, usability, and regressions.' },
      { title: 'UI/UX & Visual Design', seats: 1, desc: 'Maintains the platform\'s visual system, interfaces, accessibility, responsive design, and user experience.' },
      { title: 'AI & Interactive Learning', seats: 1, desc: 'Works on AI-assisted learning features, interactive learning systems, terminal/notebook experiences, and related educational functionality.' },
      { title: 'Content & Editorial', seats: 2, desc: 'Reviews educational content for clarity, consistency, quality, and editorial standards.' },
      { title: 'Platform Operations & Support', seats: 1, desc: 'Helps maintain platform operations, deployments, availability, and user-facing technical support.' }
    ];

    const coreResponsibilities = [
      'Actively contribute to their assigned area.',
      'Maintain the quality of their work.',
      'Follow CyberEmpireX guidelines and Code of Conduct.',
      'Protect platform and contributor security.',
      'Review work carefully before approving or publishing it.',
      'Communicate clearly with other Core Team members.',
      'Keep assigned areas maintained rather than abandoning them.',
      'Respect the open-source nature of CyberEmpireX.',
      'Use cybersecurity knowledge responsibly.',
      'Inform the appropriate person when they can no longer maintain their responsibility.'
    ];

    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 relative">
        {renderEligibilityModal()}

        {/* Top Back Navigation */}
        <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
          <button 
            onClick={() => {
              setView('community-contribute');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#2563EB] flex items-center space-x-1.5 cursor-pointer font-bold text-xs text-[#2563EB] transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>← Back to Contribute</span>
          </button>
          <span>/</span>
          <span className="text-[#111827] font-semibold">Core Team</span>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-2">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl text-[#2563EB] shrink-0">
              <Users className="w-7 h-7 text-[#2563EB]" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Platform Leadership
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight mt-1">
                Core Team
              </h1>
            </div>
          </div>
          <p className="text-sm text-[#374151] leading-relaxed font-medium pt-1">
            Help manage and shape the future of CyberEmpireX.
          </p>
        </div>

        {/* 1. ABOUT THE CORE TEAM */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              1. ABOUT THE CORE TEAM
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#374151] leading-relaxed font-medium">
            <p>
              CyberEmpireX is maintained by a small group of trusted contributors who take responsibility for different areas of the platform.
            </p>
            <p>
              The Core Team helps keep the platform reliable, accurate, secure, useful, and continuously improving.
            </p>
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-[#1E3A8A] font-semibold text-xs sm:text-sm">
              Core Team members are not simply contributors. They take ongoing responsibility for a specific area of CyberEmpireX.
            </div>
          </div>
        </section>

        {/* 2. CORE TEAM AVAILABILITY */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              2. CORE TEAM AVAILABILITY
            </h2>
            <span className="px-3 py-1 bg-blue-50 text-[#2563EB] border border-blue-200 font-mono text-xs font-bold rounded-full">
              24 Core Team Seats
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#374151] leading-relaxed font-medium">
            <p>
              The Core Team consists of 24 positions, including one Head of Core Team position appointed by the Founder.
            </p>
            <p className="p-3.5 rounded-xl bg-slate-50 border border-[#E5E7EB] text-xs text-[#4B5563] font-semibold">
              Note: Applicants cannot apply directly for the Head of Core Team position.
            </p>
          </div>
        </section>

        {/* 3. WHO CAN APPLY */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              3. WHO CAN APPLY
            </h2>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-xs font-bold rounded-full">
              Minimum age: 14+
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#374151] leading-relaxed font-medium">
            <p>
              The Core Team is intended for contributors who have demonstrated useful skills, reliability, responsible behavior, and meaningful contribution to CyberEmpireX.
            </p>
            <p>
              Applicants should be able to demonstrate relevant skills, knowledge, consistency, and willingness to take responsibility.
            </p>
          </div>
        </section>

        {/* 4. CORE TEAM ROLES */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-[#E5E7EB] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              4. CORE TEAM ROLES
            </h2>
            <span className="text-xs font-mono font-semibold text-[#6B7280]">
              23 Specialist Seats + 1 Head of Core Team Seat (Appointed) = 24 Total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rolesList.map((role, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#111827]">
                  {role.title}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100/80 text-[#2563EB] font-mono text-xs font-bold border border-blue-200 shrink-0">
                  {role.seats} {role.seats === 1 ? 'seat' : 'seats'}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold">
            Note: Applicants cannot select "Head of Core Team". The Head of Core Team position is appointed directly by the Founder.
          </div>
        </section>

        {/* 5. ROLE RESPONSIBILITIES */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              5. ROLE RESPONSIBILITIES
            </h2>
          </div>

          <div className="space-y-3.5">
            {rolesList.map((role, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E5E7EB] bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#2563EB]">{role.title}</h3>
                  <span className="text-[10px] font-mono font-semibold text-[#6B7280]">
                    {role.seats} {role.seats === 1 ? 'seat' : 'seats'}
                  </span>
                </div>
                <p className="text-xs text-[#374151] leading-relaxed font-medium">
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. HOW CORE TEAM MEMBERS ARE CHOSEN */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              6. HOW CORE TEAM MEMBERS ARE CHOSEN
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#374151] leading-relaxed font-medium">
            <p>
              Applicants complete a role assessment designed to understand their skills, experience, interests, and suitability for different Core Team responsibilities.
            </p>
            <p>
              The assessment recommends suitable roles, but the applicant can only select from roles that are currently available.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5E7EB] text-xs text-[#4B5563]">
              If a role becomes full before the application is submitted, it must immediately show as unavailable and the applicant must choose another available role.
            </div>
          </div>
        </section>

        {/* 7. RESPONSIBILITIES */}
        <section className="bg-white border-2 border-[#2563EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              7. RESPONSIBILITIES
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#374151] font-semibold">
            Core Team members are expected to:
          </p>

          <div className="space-y-2.5">
            {coreResponsibilities.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                <span className="w-5 h-5 rounded-md bg-blue-100 text-[#2563EB] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  •
                </span>
                <span className="text-xs sm:text-sm text-[#1F2937] font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Prominent blue button at the end */}
          <div className="pt-4 border-t border-[#E5E7EB] flex justify-center">
            <button
              onClick={() => {
                setView('core-team-apply');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-sm sm:text-base rounded-xl transition-all shadow-md flex items-center justify-center space-x-2.5 cursor-pointer w-full sm:w-auto"
            >
              <span>Start Core Team Application →</span>
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // 3. CONTRIBUTOR ELIGIBILITY PAGE (community-eligibility)
  // ─────────────────────────────────────────────────────────
  if (view === 'community-eligibility') {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 relative">
        {renderEligibilityModal()}

        {/* Top Back Navigation */}
        <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
          <button 
            onClick={() => {
              setView('community-contribute');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#2563EB] flex items-center space-x-1.5 cursor-pointer font-bold text-xs text-[#2563EB] transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>← Back to Contribute</span>
          </button>
          <span>/</span>
          <span className="text-[#111827] font-semibold">Contributor Eligibility</span>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl text-[#2563EB] shrink-0">
              <EligibilityPersonSvg className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Prerequisite Program
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight mt-1">
                CONTRIBUTOR ELIGIBILITY
              </h1>
            </div>
          </div>
          <p className="text-sm text-[#374151] leading-relaxed font-medium pt-1">
            Before contributing to CyberEmpireX, please review the eligibility requirements and contributor responsibilities.
          </p>
        </div>

        {/* SECTION 1: AGE REQUIREMENT */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              AGE REQUIREMENT
            </h2>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-xs font-bold rounded-full">
              Minimum age: 14+
            </span>
          </div>

          <div className="space-y-3 text-sm text-[#374151] leading-relaxed font-medium">
            <p>
              You must be at least 14 years old to participate in the CyberEmpireX contributor program.
            </p>
            <p className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#4B5563]">
              If you are under 14, you may use publicly available learning resources where permitted, but you cannot participate in the contributor program.
            </p>
          </div>
        </section>

        {/* SECTION 2: WHAT YOU ARE AGREEING TO */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              WHAT YOU ARE AGREEING TO
            </h2>
          </div>

          <p className="text-sm text-[#374151] leading-relaxed font-medium">
            Before submitting a contribution, you must agree to follow the CyberEmpireX contribution requirements.
          </p>

          <div className="space-y-3 pt-1">
            <h3 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              By proceeding, you confirm that:
            </h3>

            <div className="space-y-2.5">
              {[
                'I am 14 years of age or older.',
                'I understand that CyberEmpireX is an open-source project and my contribution may be publicly visible.',
                "I will follow the project's Contribution Guidelines.",
                'I will follow the CyberEmpireX Code of Conduct.',
                'I will only submit work that I have the right to contribute.',
                'I will respect applicable software, content, and third-party licenses.',
                'I will not submit private information, credentials, stolen data, malware, or intentionally harmful content.',
                'I will only perform security testing against systems where I have explicit authorization.',
                'I understand that contributions may be reviewed, modified, rejected, or removed by project maintainers.'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-[#2563EB] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-xs sm:text-sm text-[#1F2937] font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: RESPONSIBLE SECURITY REQUIREMENT */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              RESPONSIBLE SECURITY REQUIREMENT
            </h2>
          </div>

          <div className="space-y-2 text-sm text-[#374151] leading-relaxed font-medium">
            <p>
              CyberEmpireX is a cybersecurity learning platform.
            </p>
            <p>
              Security-related contributions must be designed for legitimate education, research, defense, or authorized testing.
            </p>
          </div>

          {/* Do Not Contribute Box */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
            <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Do not contribute:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-rose-950 font-medium">
              {[
                'Credential theft functionality',
                'Malware or destructive payloads',
                'Unauthorized access mechanisms',
                'Data-stealing functionality',
                'Real-world targets or leaked information',
                'Private credentials, tokens, or personal information',
                'Instructions intended to facilitate unauthorized attacks'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Permitted Box */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
            Safe demonstrations, intentionally vulnerable laboratory environments, defensive tools, educational examples, and authorized testing workflows are permitted when appropriately designed and documented.
          </div>
        </section>

        {/* SECTION 4: CONTRIBUTION REVIEW */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wide">
              CONTRIBUTION REVIEW
            </h2>
          </div>

          <p className="text-sm text-[#374151] leading-relaxed font-medium">
            Submitting a contribution does not guarantee acceptance.
          </p>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              Project maintainers may review contributions for:
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                'Technical quality',
                'Security',
                'Accuracy',
                'Licensing',
                'Educational value',
                'Maintainability',
                'Compatibility',
                'Compliance with guidelines'
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-semibold text-[#1F2937] text-center flex items-center justify-center">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#6B7280] font-medium pt-1">
            Maintainers may request changes before accepting a contribution.
          </p>
        </section>

        {/* SECTION 5: PERMISSION & CONFIRMATION */}
        <section className="bg-white border-2 border-[#2563EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#E5E7EB] pb-3 space-y-1">
            <h2 className="text-xl font-black text-[#111827] uppercase tracking-wide">
              PERMISSION & CONFIRMATION
            </h2>
            <p className="text-xs text-[#6B7280] font-medium">
              Before continuing, explicitly confirm the requirements.
            </p>
          </div>

          {/* Interactive Checkbox Box */}
          <div 
            onClick={() => handleToggleEligibilityConfirm(!isEligibilityConfirmed)}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
              isEligibilityConfirmed 
                ? 'bg-blue-50/80 border-[#2563EB] text-[#1E3A8A]' 
                : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#334155] hover:border-blue-400'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isEligibilityConfirmed ? (
                <CheckSquare className="w-5 h-5 text-[#2563EB]" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <span className="text-xs sm:text-sm font-semibold leading-relaxed">
              I confirm that I am 14 or older and agree to follow the CyberEmpireX Contribution Guidelines, Code of Conduct, licensing requirements, and responsible-security requirements.
            </span>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              disabled={!isEligibilityConfirmed}
              onClick={() => {
                if (isEligibilityConfirmed) {
                  setView('community-contribute');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
                isEligibilityConfirmed
                  ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
              }`}
            >
              <span>Continue to Contribution Guide →</span>
            </button>

            {/* View Repository Button on Eligibility Page */}
            <button
              onClick={handleViewRepositoryClick}
              className={`px-6 py-3.5 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-xs ${
                isEligibilityConfirmed
                  ? 'bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#111827]'
                  : 'bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-600'
              }`}
            >
              <GithubSvg className="w-4 h-4 text-[#111827]" />
              <span>View Repository</span>
              {!isEligibilityConfirmed && (
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">
                  Check Required
                </span>
              )}
              <ExternalLinkSvg className="w-3.5 h-3.5 text-[#6B7280]" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // DONATE PAGE (community-donate) - PROFESSIONAL & SMOOTH
  // ─────────────────────────────────────────────────────────
  if (view === 'community-donate') {
    const handleDonationAction = () => {
      setIsProcessingDonation(true);
      setTimeout(() => {
        setIsProcessingDonation(false);
        const amountStr = donateTier === 'custom' ? `$${donateCustomAmount || '15'}` : donateTier === 'supporter' ? '$10' : donateTier === 'defender' ? '$25' : '$50';
        setDonationSuccessMessage(`Thank you for supporting CyberEmpireX with your ${amountStr} contribution! An official confirmation receipt has been dispatched.`);
      }, 900);
    };

    return (
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
          <button 
            onClick={() => setView('home')} 
            className="hover:text-[#2563EB] flex items-center space-x-1 cursor-pointer font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span>Community & Support</span>
          <span>/</span>
          <span className="text-[#2563EB] font-bold">Donate</span>
        </div>

        {/* Page Hero Header - Professional Smooth Gradient */}
        <div className="bg-gradient-to-br from-white via-slate-50/80 to-blue-50/30 border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E5E7EB] pb-6">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs flex items-center justify-center shrink-0 p-2">
                <img src={brandSymbol} alt="CyberEmpireX Symbol" className="w-10 h-10 object-contain" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <img src={brandWordmark} alt="CyberEmpireX" className="h-7.5 sm:h-8.5 w-auto object-contain shrink-0" />
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                    Support The Mission
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                  Support CyberEmpireX
                </h1>
                <p className="text-xs sm:text-sm text-[#4B5563] max-w-2xl leading-relaxed">
                  CyberEmpireX is an independent open-source cybersecurity education platform. Your donations directly fund server infrastructure, cloud terminal sandboxes, and free educational access for students globally.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <button
                onClick={() => {
                  const el = document.getElementById('one-time-donation-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Make a Donation</span>
              </button>
            </div>
          </div>

          {/* Smooth Platform Impact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/90 p-3.5 rounded-xl border border-[#E5E7EB]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#2563EB]">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#6B7280]">100% Free Access</div>
                <div className="text-xs font-bold text-[#111827]">Zero Student Paywalls</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-[#334155]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#6B7280]">Ad-Free Platform</div>
                <div className="text-xs font-bold text-[#111827]">Independent Learning</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#6B7280]">Cloud Sandboxes</div>
                <div className="text-xs font-bold text-[#111827]">Live Lab Infrastructure</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Why Support CyberEmpireX */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-[#E5E7EB] pb-3.5 flex items-center space-x-2.5">
            <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
              1.
            </span>
            <h2 className="text-lg font-bold text-[#111827]">Why Support CyberEmpireX</h2>
          </div>

          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Running interactive terminal labs, live network analysis tools, and maintaining up-to-date cybersecurity learning materials requires dedicated cloud hosting resources.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-5 bg-[#F8FAFC] hover:bg-white border border-[#E5E7EB] hover:border-blue-200 rounded-xl space-y-2.5 transition-all shadow-2xs hover:shadow-xs group">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-[#111827]">Free Cloud Sandbox Labs</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Keep interactive practice labs 100% free for students without paywalls.
              </p>
            </div>

            <div className="p-5 bg-[#F8FAFC] hover:bg-white border border-[#E5E7EB] hover:border-blue-200 rounded-xl space-y-2.5 transition-all shadow-2xs hover:shadow-xs group">
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-[#334155] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-xs font-bold text-[#111827]">Updated Security Content</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Fund ongoing creation of current vulnerability scenarios and Termux tools guides.
              </p>
            </div>

            <div className="p-5 bg-[#F8FAFC] hover:bg-white border border-[#E5E7EB] hover:border-blue-200 rounded-xl space-y-2.5 transition-all shadow-2xs hover:shadow-xs group">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Globe className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h3 className="text-xs font-bold text-[#111827]">Independent & Ad-Free</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Maintain a pristine, ad-free learning interface focused entirely on education.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: One-Time Donation */}
        <div id="one-time-donation-section" className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#E5E7EB] pb-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                2.
              </span>
              <h2 className="text-lg font-bold text-[#111827]">One-Time Donation</h2>
            </div>
            <span className="text-[11px] font-mono text-[#6B7280]">Direct Infrastructure Fund</span>
          </div>

          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Make a single contribution to support platform hosting and security content updates:
          </p>

          {/* Donation Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Supporter Tier */}
            <button
              type="button"
              onClick={() => setDonateTier('supporter')}
              className={`p-5 rounded-2xl text-left transition-all border cursor-pointer relative flex flex-col justify-between space-y-3 ${
                donateTier === 'supporter'
                  ? 'bg-blue-50/40 border-[#2563EB] shadow-xs ring-1 ring-blue-500/20'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] hover:bg-white hover:border-[#CBD5E1]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111827]">Supporter</span>
                  {donateTier === 'supporter' && (
                    <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-[#2563EB] tracking-tight">$10</div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Helps cover server bandwidth for 100 sandbox sessions.
                </p>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#6B7280] block pt-1">
                Bandwidth Sponsor
              </span>
            </button>

            {/* Defender Tier (Recommended) */}
            <button
              type="button"
              onClick={() => setDonateTier('defender')}
              className={`p-5 rounded-2xl text-left transition-all border cursor-pointer relative flex flex-col justify-between space-y-3 ${
                donateTier === 'defender'
                  ? 'bg-blue-50/60 border-[#2563EB] shadow-xs ring-2 ring-blue-500/30'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] hover:bg-white hover:border-[#CBD5E1]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#111827]">Defender</span>
                    <span className="text-[9px] font-mono uppercase font-bold text-[#2563EB] bg-blue-100 px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  </div>
                  {donateTier === 'defender' && (
                    <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-[#2563EB] tracking-tight">$25</div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Funds new CTF lab scenario development and updates.
                </p>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#2563EB] block pt-1">
                Lab Development Sponsor
              </span>
            </button>

            {/* Patron Tier */}
            <button
              type="button"
              onClick={() => setDonateTier('patron')}
              className={`p-5 rounded-2xl text-left transition-all border cursor-pointer relative flex flex-col justify-between space-y-3 ${
                donateTier === 'patron'
                  ? 'bg-blue-50/40 border-[#2563EB] shadow-xs ring-1 ring-blue-500/20'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] hover:bg-white hover:border-[#CBD5E1]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111827]">Patron</span>
                  {donateTier === 'patron' && (
                    <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-[#2563EB] tracking-tight">$50</div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Supports specialized security tools matrix maintenance.
                </p>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#6B7280] block pt-1">
                Tools Matrix Sponsor
              </span>
            </button>
          </div>

          {/* Custom Amount Option */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span className="text-xs font-bold text-[#111827]">Custom Contribution Amount:</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#6B7280]">$</span>
              <input 
                type="number"
                min="5"
                max="5000"
                value={donateCustomAmount}
                onChange={(e) => {
                  setDonateCustomAmount(e.target.value);
                  setDonateTier('custom');
                }}
                placeholder="Custom Amount"
                className="w-28 px-3 py-1.5 bg-white border border-[#E5E7EB] focus:border-[#2563EB] rounded-lg text-xs font-mono font-bold text-[#111827] outline-none"
              />
              <button
                type="button"
                onClick={() => setDonateTier('custom')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  donateTier === 'custom'
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                Set Custom
              </button>
            </div>
          </div>

          {/* Payment Method Selector & Interactive Action */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <span className="text-xs font-bold text-[#111827]">Select Payment Method:</span>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setDonatePaymentMethod('card')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    donatePaymentMethod === 'card'
                      ? 'bg-white text-[#2563EB] shadow-2xs border border-[#E5E7EB]'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  Card / Stripe
                </button>
                <button
                  type="button"
                  onClick={() => setDonatePaymentMethod('github')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    donatePaymentMethod === 'github'
                      ? 'bg-white text-[#2563EB] shadow-2xs border border-[#E5E7EB]'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  GitHub Sponsors
                </button>
                <button
                  type="button"
                  onClick={() => setDonatePaymentMethod('crypto')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    donatePaymentMethod === 'crypto'
                      ? 'bg-white text-[#2563EB] shadow-2xs border border-[#E5E7EB]'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  Crypto
                </button>
              </div>
            </div>

            {/* Payment Details according to selected method */}
            {donatePaymentMethod === 'crypto' ? (
              <div className="space-y-3 pt-1">
                <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between font-mono text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Bitcoin (BTC) Wallet</span>
                    <span className="text-[#111827] font-semibold text-[11px]">bc1qcyberempirex8892301984209384029</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('bc1qcyberempirex8892301984209384029');
                      setCopiedBtcAddress(true);
                      setTimeout(() => setCopiedBtcAddress(false), 2000);
                    }}
                    className="px-3 py-1.5 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E5E7EB] rounded-lg text-xs font-sans font-bold text-[#2563EB] flex items-center space-x-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedBtcAddress ? 'Copied BTC' : 'Copy BTC'}</span>
                  </button>
                </div>

                <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between font-mono text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Ethereum / EVM (ETH) Wallet</span>
                    <span className="text-[#111827] font-semibold text-[11px]">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
                      setCopiedEthAddress(true);
                      setTimeout(() => setCopiedEthAddress(false), 2000);
                    }}
                    className="px-3 py-1.5 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E5E7EB] rounded-lg text-xs font-sans font-bold text-[#2563EB] flex items-center space-x-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedEthAddress ? 'Copied ETH' : 'Copy ETH'}</span>
                  </button>
                </div>
              </div>
            ) : donatePaymentMethod === 'github' ? (
              <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Donate directly through GitHub Sponsors with zero processing fees. Verified GitHub Sponsors automatically receive an open-source contributor badge.
                </p>
                <a
                  href="https://github.com/sponsors/cyberempirex"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#111827] hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-2xs"
                >
                  <GithubSvg className="w-4 h-4 fill-white" />
                  <span>Sponsor @cyberempirex on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {donationSuccessMessage ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium space-y-2 flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-emerald-900">{donationSuccessMessage}</p>
                      <button 
                        onClick={() => setDonationSuccessMessage(null)} 
                        className="text-[11px] underline text-emerald-700 hover:text-emerald-900 font-bold"
                      >
                        Make another contribution
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-[#6B7280]">
                      Selected Tier: <span className="font-bold text-[#111827] capitalize">{donateTier}</span> (
                      <span className="font-bold text-[#2563EB]">
                        {donateTier === 'custom' ? `$${donateCustomAmount || '15'}` : donateTier === 'supporter' ? '$10' : donateTier === 'defender' ? '$25' : '$50'}
                      </span>)
                    </div>

                    <button
                      type="button"
                      disabled={isProcessingDonation}
                      onClick={handleDonationAction}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-blue-300 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                    >
                      {isProcessingDonation ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Processing Contribution...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>
                            Contribute {donateTier === 'custom' ? `$${donateCustomAmount || '15'}` : donateTier === 'supporter' ? '$10' : donateTier === 'defender' ? '$25' : '$50'} One-Time
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Monthly Donation */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-[#E5E7EB] pb-3.5 flex items-center space-x-2.5">
            <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
              3.
            </span>
            <h2 className="text-lg font-bold text-[#111827]">Monthly Donation</h2>
          </div>

          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Become a sustaining monthly sponsor via GitHub Sponsors or Open Collective to receive an exclusive Supporter Badge on your CyberEmpireX profile.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <a
              href="https://github.com/sponsors/cyberempirex"
              target="_blank"
              rel="noreferrer"
              className="p-5 bg-[#F8FAFC] hover:bg-white border border-[#E5E7EB] hover:border-[#2563EB] rounded-2xl space-y-3 transition-all shadow-2xs hover:shadow-xs group cursor-pointer block"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#111827] text-white flex items-center justify-center shrink-0">
                    <GithubSvg className="w-4 h-4 fill-white" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                    GitHub Sponsors
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2563EB] transition-colors" />
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Recurring monthly sponsorship tiers starting from $5/month with automated profile badge sync.
              </p>
            </a>

            <a
              href="https://opencollective.com/cyberempirex"
              target="_blank"
              rel="noreferrer"
              className="p-5 bg-[#F8FAFC] hover:bg-white border border-[#E5E7EB] hover:border-[#2563EB] rounded-2xl space-y-3 transition-all shadow-2xs hover:shadow-xs group cursor-pointer block"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <OpenSourceSvg className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                    Open Collective
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2563EB] transition-colors" />
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Transparent community ledger backing platform cloud expenses, tooling, and education.
              </p>
            </a>
          </div>
        </div>

      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // SPONSORSHIP PAGE (community-sponsorship)
  // ─────────────────────────────────────────────────────────
  if (view === 'community-sponsorship') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
          <button 
            onClick={() => setView('home')} 
            className="hover:text-[#2563EB] flex items-center space-x-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span>Community & Support</span>
          <span>/</span>
          <span className="text-[#2563EB] font-bold">Sponsorship</span>
        </div>

        {/* Page Hero Header */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Enterprise & Academic
              </span>
              <h1 className="text-2xl font-extrabold text-[#111827] mt-1">Sponsorship Opportunities</h1>
            </div>
          </div>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            Partner with CyberEmpireX to empower the next generation of security professionals, pentesters, and ethical hackers while demonstrating your organization's commitment to cybersecurity education.
          </p>
        </div>

        {/* Section 1: Sponsorship Options */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#111827] flex items-center space-x-2 border-b border-[#E5E7EB] pb-3">
            <span className="text-[#2563EB] font-mono">1.</span>
            <span>Sponsorship Options</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-[#111827]">Academic & Educational Partner</h3>
              <p className="text-xs text-[#6B7280]">For universities, bootcamps, and non-profits looking to incorporate open security labs into their curriculum.</p>
            </div>
            <div className="p-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-[#111827]">Enterprise Security Partner</h3>
              <p className="text-xs text-[#6B7280]">For cybersecurity companies and tech organizations supporting open-source defensive tools and talent discovery.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Sponsorship Benefits */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#111827] flex items-center space-x-2 border-b border-[#E5E7EB] pb-3">
            <span className="text-[#2563EB] font-mono">2.</span>
            <span>Sponsorship Benefits</span>
          </h2>
          <ul className="space-y-3 text-xs text-[#4B5563]">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Logo placement on the CyberEmpireX main dashboard and official documentation.</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Custom co-branded CTF practice labs and educational challenges.</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Direct engagement with top-performing cybersecurity learners and talent.</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // SUPPORT PAGE (community-support) - ENTERPRISE GRADE
  // ─────────────────────────────────────────────────────────

  // KB Articles Collection
  const kbArticles = [
    {
      id: 'kb-terminal-1',
      category: 'terminal',
      categoryName: 'Terminal & Sandbox',
      title: 'Resetting Stalled Virtual Terminal Instances',
      desc: 'Fix broken terminal stdout streams, unfreeze xterm buffers, and reinstantiate clean sandbox containers.',
      command: 'reset-lab --force',
      sla: 'Self-service (< 3s)',
      tags: ['Terminal', 'CLI', 'WebShell', 'Sandbox'],
      body: `If your interactive Terminal Lab session becomes unresponsive, displays corrupted ANSI characters, or fails to emit stdout lines:
1. Click the 'Reset Terminal' button in the upper right control bar of the Terminal Lab page, or
2. Execute the CLI command 'reset-lab --force' directly inside the prompt.
This reinstantiates your virtual Linux micro-environment while preserving your stored lab XP and flag completions.`
    },
    {
      id: 'kb-ctf-1',
      category: 'ctf',
      categoryName: 'CTF & Flags',
      title: 'CTF Flag Format Verification & SHA-256 Hashing',
      desc: 'Troubleshoot invalid flag submission rejections, string encoding issues, and rate limits.',
      command: 'echo "CEX{example_flag}" | tr -d \' \\n\'',
      sla: 'Automated Real-time',
      tags: ['CTF', 'Flags', 'Verification', 'XP Points'],
      body: `All CTF flags on CyberEmpireX strictly follow the standard syntax: CEX{...} (case-sensitive).
Common causes for flag rejection:
• Including trailing newline or space characters copied from terminal output. Use 'tr -d "\\n"' to trim whitespace.
• Submitting raw challenge binary output instead of extracted flag string.
• Rate limit threshold exceeded (5 submissions allowed per minute).`
    },
    {
      id: 'kb-tools-1',
      category: 'tools',
      categoryName: 'Security Tools',
      title: 'Executing Security Matrix Tools in Termux & Web Workers',
      desc: 'How to invoke web-based utilities and copy automated Android Termux installation payloads.',
      command: 'pkg update && pkg install git python -y',
      sla: 'Real-time Client Processing',
      tags: ['Tools', 'Nmap', 'WHOIS', 'Termux', 'Android'],
      body: `The Security Tools Matrix features both browser-based client utilities (WHOIS lookup, Hash Decoders, JWT inspect) and native command line scripts for Termux on Android.
To execute tools locally in Termux:
1. Copy the 'Termux Installer' command block from any tool details drawer.
2. Grant storage permission: 'termux-setup-storage'
3. Paste the installer script into your Termux terminal prompt.`
    },
    {
      id: 'kb-auth-1',
      category: 'auth',
      categoryName: 'Account & Auth',
      title: 'Firestore Cloud Sync & Session Recovery',
      desc: 'Synchronize learning progress across multiple devices or resolve local storage cache conflicts.',
      command: 'cyberempirex --sync-profile',
      sla: 'Real-time Cloud Sync',
      tags: ['Firestore', 'Sync', 'Account', 'Session'],
      body: `Your earned badges, levels, and completed CTF flags are saved locally in browser storage and synchronized with Cloud Firestore when logged in.
If your progress does not sync:
1. Navigate to Profile -> Sync Progress to force a Cloud write operation.
2. Ensure browser cookies and third-party storage permissions are enabled for 'cyberempirex.org'.`
    },
    {
      id: 'kb-termux-1',
      category: 'termux',
      categoryName: 'Termux & Android',
      title: 'Android Storage Permissions & Repository Setup',
      desc: 'Configure termux-setup-storage, update repository mirrors, and resolve apt-get dependency locks.',
      command: 'termux-setup-storage && termux-change-repo',
      sla: 'Automated Guide',
      tags: ['Android', 'Termux', 'Storage', 'APT'],
      body: `When running pentesting scripts inside Android Termux:
1. Grant storage access: 'termux-setup-storage'
2. If package installation fails with 404 repository errors, run 'termux-change-repo' and select the official Main repository mirror.
3. Update package index: 'pkg update && pkg upgrade -y'`
    },
    {
      id: 'kb-security-1',
      category: 'security',
      categoryName: 'Security Disclosure',
      title: 'Vulnerability Disclosure & Safe Harbor Policy',
      desc: 'Guidelines for security researchers submitting vulnerability reports and testing platform targets.',
      command: 'gpg --import cyberempirex-security.asc',
      sla: 'Priority Escalation (< 1h)',
      tags: ['Safe Harbor', 'Disclosure', 'PGP', 'CVSS'],
      body: `CyberEmpireX provides Safe Harbor protection for security researchers acting in good faith:
• Do not access or alter private user account data.
• Report suspected security issues directly to security@cyberempirex.org.
• Encrypt sensitive bug report details using our official PGP key (Fingerprint: 4A82 9B12 E029 C89F 3311 A908 B2C1 4110).`
    }
  ];

  // FAQ Items
  const faqItems = [
    {
      id: 'faq-1',
      category: 'platform',
      categoryName: 'Platform & Access',
      question: 'Is CyberEmpireX completely free to use for students and security teams?',
      answer: 'Yes! CyberEmpireX is an open-source cybersecurity education platform funded by community sponsors. All practice labs, interactive terminal environments, security tools, and certifications are 100% free with no hidden fees.',
      code: ''
    },
    {
      id: 'faq-2',
      category: 'terminal',
      categoryName: 'Terminal & Sandbox',
      question: 'How does the Terminal Lab safely execute commands inside my browser?',
      answer: 'The Terminal Lab utilizes a virtualized xterm.js engine paired with a WebAssembly Linux runtime and cloud sandbox container. Commands execute strictly within sandboxed memory boundaries without accessing your local system or network.',
      code: 'uname -a # Output: Linux cyberempirex-sandbox 6.1.0-8-amd64 #1 SMP'
    },
    {
      id: 'faq-3',
      category: 'ctf',
      categoryName: 'CTF & Flags',
      question: 'What should I do if a valid CTF flag is rejected by the grading system?',
      answer: 'Ensure that your flag begins with CEX{ and ends with }. Remove any surrounding whitespace or quote marks. If a flag continues to fail due to a suspected platform bug, submit a Support Ticket with category "CTF Flag Grading".',
      code: 'echo -n "CEX{flag_content}" | md5sum'
    },
    {
      id: 'faq-4',
      category: 'termux',
      categoryName: 'Termux & Android',
      question: 'Can I install CyberEmpireX tools directly into Android Termux?',
      answer: 'Yes! Every security utility card includes a 1-click Termux installer script. Grant storage permissions in Termux using termux-setup-storage, then paste the provided installation snippet.',
      code: 'termux-setup-storage && pkg update && pkg install git -y'
    },
    {
      id: 'faq-5',
      category: 'auth',
      categoryName: 'Account & Licensing',
      question: 'How is my account progress and certification history backed up?',
      answer: 'When signed in, your XP, completed CTF challenges, level status, and earned badges are automatically synchronized with Cloud Firestore. You can export or sync your profile anytime from the User Profile page.',
      code: ''
    }
  ];

  // Filtered KB Articles
  const filteredKb = kbArticles.filter(art => {
    const matchesCat = selectedKbCategory === 'all' || art.category === selectedKbCategory;
    const matchesSearch = !supportSearchQuery.trim() || 
      art.title.toLowerCase().includes(supportSearchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(supportSearchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(supportSearchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Ticket Form Handler
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) return;

    setIsSubmittingTicket(true);
    setTimeout(() => {
      const ticketId = `TICK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket({
        id: ticketId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: ticketForm.category,
        priority: ticketForm.priority,
        subject: ticketForm.subject,
        email: ticketForm.email || 'user@cyberempirex.org'
      });
      setIsSubmittingTicket(false);
    }, 800);
  };

  const handleSupportCopy = (text: string, type: 'desk' | 'sec' | 'pgp' = 'desk') => {
    navigator.clipboard.writeText(text);
    if (type === 'desk') {
      setCopiedDeskEmail(true);
      setTimeout(() => setCopiedDeskEmail(false), 2000);
    } else if (type === 'sec') {
      setCopiedSecurityEmail(true);
      setTimeout(() => setCopiedSecurityEmail(false), 2000);
    } else if (type === 'pgp') {
      setCopiedPgpKey(true);
      setTimeout(() => setCopiedPgpKey(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
        <button 
          onClick={() => setView('home')} 
          className="hover:text-[#2563EB] flex items-center space-x-1 cursor-pointer font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span>Community & Support</span>
        <span>/</span>
        <span className="text-[#2563EB] font-bold">Enterprise Support Desk</span>
      </div>

      {/* 2. Enterprise Hero Banner */}
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-slate-50 border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E5E7EB] pb-6">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center shrink-0 p-2">
              <img src={brandSymbol} alt="CyberEmpireX Symbol" className="w-10 h-10 object-contain" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <img src={brandWordmark} alt="CyberEmpireX" className="h-7.5 sm:h-8.5 w-auto object-contain shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Enterprise Operations Desk
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                Support & Technical Operations
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] max-w-2xl">
                SLA-backed technical support for interactive terminal sandboxes, CTF flag verification, security tool execution, and responsible disclosures.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setSupportActiveTab('ticket')}
              className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Support Ticket</span>
            </button>
            <button
              onClick={() => setSupportActiveTab('security')}
              className="px-4 py-2.5 bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#111827] hover:text-[#2563EB] rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Security Incident Disclosure</span>
            </button>
          </div>
        </div>

        {/* Real-time System Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-xl border border-[#E5E7EB]">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div>
              <div className="text-[10px] font-mono uppercase text-[#6B7280]">Terminal Sandbox</div>
              <div className="text-xs font-bold text-[#111827]">99.98% Uptime SLA</div>
            </div>
          </div>
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <div>
              <div className="text-[10px] font-mono uppercase text-[#6B7280]">CTF Grading Engine</div>
              <div className="text-xs font-bold text-[#111827]">Operational</div>
            </div>
          </div>
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <div>
              <div className="text-[10px] font-mono uppercase text-[#6B7280]">Tools Matrix API</div>
              <div className="text-xs font-bold text-[#111827]">Active (0ms delay)</div>
            </div>
          </div>
          <div className="flex items-center space-x-2.5">
            <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
            <div>
              <div className="text-[10px] font-mono uppercase text-[#6B7280]">First Response SLA</div>
              <div className="text-xs font-bold text-[#111827]">&lt; 2 Hours Average</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search Bar & Tab Navigation */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={supportSearchQuery}
            onChange={(e) => setSupportSearchQuery(e.target.value)}
            placeholder="Search 50+ troubleshooting guides, terminal commands, CTF flag syntax, error codes..."
            className="w-full pl-11 pr-10 py-3 bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#2563EB] rounded-xl text-xs sm:text-sm text-[#111827] outline-none transition-all placeholder:text-[#9CA3AF]"
          />
          {supportSearchQuery && (
            <button 
              onClick={() => setSupportSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Main Tab Selectors */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 border-b border-[#E5E7EB] no-scrollbar">
          <button
            onClick={() => setSupportActiveTab('kb')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shrink-0 transition-all cursor-pointer ${
              supportActiveTab === 'kb' 
                ? 'bg-[#2563EB] text-white shadow-xs' 
                : 'bg-[#F8FAFC] text-[#4B5563] hover:bg-[#F1F5F9] hover:text-[#111827]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Knowledge Base & Guides</span>
          </button>

          <button
            onClick={() => setSupportActiveTab('ticket')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shrink-0 transition-all cursor-pointer ${
              supportActiveTab === 'ticket' 
                ? 'bg-[#2563EB] text-white shadow-xs' 
                : 'bg-[#F8FAFC] text-[#4B5563] hover:bg-[#F1F5F9] hover:text-[#111827]'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Submit Ticket / Incident</span>
          </button>

          <button
            onClick={() => setSupportActiveTab('faq')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shrink-0 transition-all cursor-pointer ${
              supportActiveTab === 'faq' 
                ? 'bg-[#2563EB] text-white shadow-xs' 
                : 'bg-[#F8FAFC] text-[#4B5563] hover:bg-[#F1F5F9] hover:text-[#111827]'
            }`}
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </button>

          <button
            onClick={() => setSupportActiveTab('security')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shrink-0 transition-all cursor-pointer ${
              supportActiveTab === 'security' 
                ? 'bg-[#2563EB] text-white shadow-xs' 
                : 'bg-[#F8FAFC] text-[#4B5563] hover:bg-[#F1F5F9] hover:text-[#111827]'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Responsible Disclosure (PGP)</span>
          </button>
        </div>
      </div>

      {/* 4. TAB CONTENT: KNOWLEDGE BASE */}
      {supportActiveTab === 'kb' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', name: 'All Topics' },
              { id: 'terminal', name: 'Terminal Sandbox' },
              { id: 'ctf', name: 'CTF & Flags' },
              { id: 'tools', name: 'Security Tools' },
              { id: 'auth', name: 'Account & Auth' },
              { id: 'termux', name: 'Termux & Android' },
              { id: 'security', name: 'Security Policy' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedKbCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  selectedKbCategory === cat.id
                    ? 'bg-[#111827] text-white font-bold'
                    : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] hover:border-[#CBD5E1]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* KB Articles Grid */}
          {filteredKb.length === 0 ? (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center space-y-3">
              <Search className="w-10 h-10 text-[#9CA3AF] mx-auto" />
              <h3 className="text-base font-bold text-[#111827]">No troubleshooting guides found</h3>
              <p className="text-xs text-[#6B7280]">Try searching for different keywords or clear your active category filter.</p>
              <button 
                onClick={() => { setSupportSearchQuery(''); setSelectedKbCategory('all'); }}
                className="px-4 py-2 bg-blue-50 text-[#2563EB] text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors inline-block cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredKb.map(art => (
                <div 
                  key={art.id}
                  className="bg-white border border-[#E5E7EB] hover:border-[#2563EB] rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-all space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {art.categoryName}
                      </span>
                      <span className="text-[11px] font-mono text-[#6B7280] flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{art.sla}</span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {art.title}
                    </h3>

                    <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-2">
                      {art.desc}
                    </p>

                    {art.command && (
                      <div className="p-2.5 bg-[#0F172A] rounded-xl font-mono text-[11px] text-emerald-400 border border-slate-800 flex items-center justify-between">
                        <span className="truncate">{art.command}</span>
                        <Copy 
                          onClick={() => handleSupportCopy(art.command, 'desk')}
                          className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer shrink-0 ml-2" 
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                      {art.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-[#6B7280] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E5E7EB]">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedArticle(art)}
                      className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center space-x-1 shrink-0 cursor-pointer ml-2"
                    >
                      <span>View Guide</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. TAB CONTENT: SUBMIT TICKET */}
      {supportActiveTab === 'ticket' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {submittedTicket ? (
            /* Ticket Confirmation Screen */
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Ticket Dispatched to Platform Engineers
                </span>
                <h2 className="text-xl font-extrabold text-[#111827]">
                  Support Ticket Received #{submittedTicket.id}
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Confirmation message dispatched to <span className="font-mono text-[#111827] font-semibold">{submittedTicket.email}</span>. Our technical operations desk will respond within the SLA window.
                </p>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[#6B7280]">Ticket Reference:</span>
                  <span className="font-bold text-[#2563EB]">{submittedTicket.id}</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[#6B7280]">Subject Line:</span>
                  <span className="text-[#111827] truncate max-w-[240px]">{submittedTicket.subject}</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[#6B7280]">Category:</span>
                  <span className="text-[#111827] capitalize">{submittedTicket.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">First Response SLA:</span>
                  <span className="text-emerald-600 font-bold">&lt; 2 Hours (Active Queue)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Submit Another Ticket
                </button>
                <button
                  onClick={() => setSupportActiveTab('kb')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#111827] rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Return to Knowledge Base
                </button>
              </div>
            </div>
          ) : (
            /* Ticket Creation Form */
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-[#E5E7EB] pb-4 space-y-1">
                <div className="flex items-center space-x-2">
                  <FileCode className="w-5 h-5 text-[#2563EB]" />
                  <h2 className="text-lg font-bold text-[#111827]">Submit Technical Incident Ticket</h2>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Report a broken practice lab, flag grading anomaly, account auth error, or security tool bug directly to our operations team.
                </p>
              </div>

              <form onSubmit={handleTicketSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111827] block">Your Full Name *</label>
                    <input 
                      type="text"
                      required
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#2563EB] rounded-xl text-xs text-[#111827] outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111827] block">Contact Email Address *</label>
                    <input 
                      type="email"
                      required
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                      placeholder="e.g. alex@cyberempirex.org"
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#2563EB] rounded-xl text-xs text-[#111827] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111827] block">Incident Category *</label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#2563EB] rounded-xl text-xs text-[#111827] outline-none cursor-pointer"
                    >
                      <option value="terminal">💻 Terminal Sandbox & CLI Error</option>
                      <option value="ctf">🎯 CTF Flag Grading & Scoreboard</option>
                      <option value="auth">🔑 Account, Auth & Cloud Sync</option>
                      <option value="tools">🛠️ Security Tool Matrix Bug</option>
                      <option value="security">🚨 Vulnerability Disclosure (Safe Harbor)</option>
                      <option value="general">❓ General Technical Query</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#111827] block">Severity SLA *</label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#2563EB] rounded-xl text-xs text-[#111827] outline-none cursor-pointer"
                    >
                      <option value="low">Low (Informational - 24h SLA)</option>
                      <option value="normal">Normal (Standard Support - 12h SLA)</option>
                      <option value="high">High (Lab Blocking Error - 4h SLA)</option>
                      <option value="critical">Critical (Platform Outage / Security Incident - 1h SLA)</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] block">Subject Line *</label>
                  <input 
                    type="text"
                    required
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    placeholder="Brief summary of the issue (e.g. WebSocket buffer stall on Terminal port 3000)"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#2563EB] rounded-xl text-xs text-[#111827] outline-none"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] block">Detailed Description & Steps to Reproduce *</label>
                  <textarea 
                    rows={5}
                    required
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    placeholder="Please provide explicit details, error message output, lab challenge name, or CLI commands executed..."
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#2563EB] rounded-xl text-xs text-[#111827] outline-none font-mono"
                  />
                </div>

                {/* Checkbox: Attach System Info */}
                <div className="flex items-center space-x-2 pt-1">
                  <input 
                    type="checkbox"
                    id="sysinfo"
                    checked={ticketForm.attachSysInfo}
                    onChange={(e) => setTicketForm({ ...ticketForm, attachSysInfo: e.target.checked })}
                    className="w-4 h-4 text-[#2563EB] rounded border-[#E5E7EB]"
                  />
                  <label htmlFor="sysinfo" className="text-xs text-[#4B5563] cursor-pointer">
                    Attach anonymous browser environment diagnostic dump (Browser UserAgent, Screen Resolution, Local Session State)
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#6B7280]">
                    Protected by CyberEmpireX Responsible Security Policy
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmittingTicket}
                    className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-blue-300 text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-xs"
                  >
                    {isSubmittingTicket ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Dispatching Ticket...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Support Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* 6. TAB CONTENT: FAQ */}
      {supportActiveTab === 'faq' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#E5E7EB] pb-3">
              <h2 className="text-lg font-bold text-[#111827] flex items-center space-x-2">
                <LifeBuoy className="w-5 h-5 text-[#2563EB]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Instant answers to platform access, lab execution, CTF flag submission, and licensing queries.
              </p>
            </div>

            <div className="space-y-3">
              {faqItems.map(item => {
                const isExpanded = expandedFaqId === item.id;
                return (
                  <div 
                    key={item.id}
                    className="border border-[#E5E7EB] hover:border-[#CBD5E1] rounded-xl overflow-hidden transition-all bg-white"
                  >
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : item.id)}
                      className="w-full p-4 text-left flex items-center justify-between space-x-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                          {item.categoryName}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-[#111827]">
                          {item.question}
                        </h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#6B7280] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#6B7280] shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-white border-t border-[#E5E7EB] space-y-3 text-xs text-[#4B5563] leading-relaxed">
                        <p>{item.answer}</p>
                        
                        {item.code && (
                          <div className="p-3 bg-[#0F172A] rounded-xl text-emerald-400 font-mono text-[11px] border border-slate-800 flex items-center justify-between">
                            <code>{item.code}</code>
                            <Copy 
                              onClick={() => handleSupportCopy(item.code, 'desk')}
                              className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer shrink-0 ml-2" 
                            />
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px]">
                          <span className="text-[#9CA3AF]">Was this answer helpful?</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setFaqRatings({ ...faqRatings, [item.id]: 'up' })}
                              className={`p-1.5 rounded-lg border flex items-center space-x-1 cursor-pointer transition-colors ${
                                faqRatings[item.id] === 'up'
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold'
                                  : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>Helpful</span>
                            </button>

                            <button
                              onClick={() => setFaqRatings({ ...faqRatings, [item.id]: 'down' })}
                              className={`p-1.5 rounded-lg border flex items-center space-x-1 cursor-pointer transition-colors ${
                                faqRatings[item.id] === 'down'
                                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                                  : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
                              }`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                              <span>Needs Info</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB CONTENT: RESPONSIBLE DISCLOSURE (SECURITY) */}
      {supportActiveTab === 'security' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#E5E7EB] pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#111827]">Vulnerability Disclosure & Safe Harbor</h2>
                <p className="text-xs text-[#6B7280]">
                  Responsible security testing guidelines for authorized researchers and bug bounty reporters.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Safe Harbor Terms */}
              <div className="p-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorized Testing Scope (Safe Harbor)</span>
                </div>
                <ul className="space-y-2 text-xs text-[#4B5563] list-disc list-inside leading-relaxed">
                  <li>Security assessments conducted exclusively against designated CTF lab containers are authorized.</li>
                  <li>Do not attempt Denial of Service (DoS) attacks on shared Cloud Run instances.</li>
                  <li>Do not access or modify personal credentials or user account state.</li>
                  <li>Report findings within 24 hours to receive official acknowledgment and hall-of-fame badges.</li>
                </ul>
              </div>

              {/* Card 2: Escalation Channels */}
              <div className="p-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-[#2563EB] font-bold text-xs">
                  <Key className="w-4 h-4" />
                  <span>Encrypted PGP Reporting Channels</span>
                </div>
                <div className="space-y-2 text-xs text-[#4B5563]">
                  <p>Send encrypted vulnerability reports to our dedicated incident desk:</p>
                  
                  <div className="p-2.5 bg-[#0F172A] rounded-xl font-mono text-[11px] text-emerald-400 border border-slate-800 flex items-center justify-between">
                    <span>security@cyberempirex.org</span>
                    <button
                      onClick={() => handleSupportCopy('security@cyberempirex.org', 'sec')}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer font-sans underline ml-2 shrink-0"
                    >
                      {copiedSecurityEmail ? 'Copied!' : 'Copy Email'}
                    </button>
                  </div>

                  <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-xl font-mono text-[10px] text-[#111827] space-y-1">
                    <div className="text-[10px] font-bold text-[#6B7280]">PGP Fingerprint:</div>
                    <div className="text-[#2563EB] break-all">4A82 9B12 E029 C89F 3311 A908 B2C1 4110</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Direct Escalation Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-5 bg-white border border-[#E5E7EB] hover:border-[#2563EB] rounded-2xl shadow-2xs space-y-2 transition-all">
          <Mail className="w-6 h-6 text-[#2563EB]" />
          <h3 className="text-xs font-bold text-[#111827]">Email Support Operations</h3>
          <p className="text-xs text-[#6B7280]">24/7 SLA monitored inbox for platform help and technical issues.</p>
          <div className="pt-2">
            <button 
              onClick={() => handleSupportCopy('support@cyberempirex.org', 'desk')}
              className="text-xs font-mono font-bold text-[#2563EB] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>support@cyberempirex.org</span>
              {copiedDeskEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="p-5 bg-white border border-[#E5E7EB] hover:border-[#2563EB] rounded-2xl shadow-2xs space-y-2 transition-all">
          <MessageSquare className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xs font-bold text-[#111827]">GitHub Community Discussions</h3>
          <p className="text-xs text-[#6B7280]">Connect with maintainers, ask questions, and share Linux CLI tips.</p>
          <div className="pt-2">
            <a 
              href="https://github.com/cyberempirex/CyberEmpireX/discussions" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-mono font-bold text-emerald-600 hover:underline flex items-center space-x-1"
            >
              <span>GitHub Discussions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="p-5 bg-white border border-[#E5E7EB] hover:border-[#2563EB] rounded-2xl shadow-2xs space-y-2 transition-all">
          <Shield className="w-6 h-6 text-amber-500" />
          <h3 className="text-xs font-bold text-[#111827]">Security Incident Response</h3>
          <p className="text-xs text-[#6B7280]">Priority desk for reporting platform security issues and Safe Harbor disclosures.</p>
          <div className="pt-2">
            <button 
              onClick={() => handleSupportCopy('security@cyberempirex.org', 'sec')}
              className="text-xs font-mono font-bold text-amber-600 hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>security@cyberempirex.org</span>
              {copiedSecurityEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 9. Modal for Viewing Article Detail */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 max-w-xl w-full shadow-xl space-y-4 relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#111827] p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-[#E5E7EB] pb-3">
              <span className="text-[10px] font-mono uppercase font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {selectedArticle.categoryName}
              </span>
              <h2 className="text-lg font-extrabold text-[#111827] mt-1">{selectedArticle.title}</h2>
            </div>

            <div className="space-y-3 text-xs text-[#4B5563] leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p className="whitespace-pre-line font-normal">{selectedArticle.body}</p>

              {selectedArticle.command && (
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#111827]">Recommended CLI Resolution Command:</div>
                  <div className="p-3 bg-[#0F172A] rounded-xl font-mono text-[11px] text-emerald-400 border border-slate-800 flex items-center justify-between">
                    <code>{selectedArticle.command}</code>
                    <Copy 
                      onClick={() => handleSupportCopy(selectedArticle.command, 'desk')}
                      className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer shrink-0 ml-2" 
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#6B7280]">
                Resolution SLA: {selectedArticle.sla}
              </span>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-[#111827] text-white font-bold rounded-xl text-xs hover:bg-[#1F2937] transition-colors cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

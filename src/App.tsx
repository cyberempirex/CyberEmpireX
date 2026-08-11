import React, { useState, useEffect } from 'react';
import { ViewMode, UserProgress, UserProfile } from './types';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { WelcomeHero } from './components/WelcomeHero';
import { AboutSection } from './components/AboutSection';
import { PlatformOverview } from './components/PlatformOverview';
import { QuickActions } from './components/QuickActions';
import { LatestUpdates } from './components/LatestUpdates';
import { Footer } from './components/Footer';

// Sub-page component views
import { ToolMatrix } from './components/ToolMatrix';
import { CyberToolsSection } from './components/CyberToolsSection';
import { PracticeLabsSection } from './components/PracticeLabsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { AICoachModal } from './components/AICoachModal';
import { QuizSection } from './components/QuizSection';
import { EthicalDisclaimer } from './components/EthicalDisclaimer';
import { SearchModal } from './components/SearchModal';
import { ProfilePage } from './components/ProfilePage';
import { TerminalLab } from './components/TerminalLab';
import { QrCodeGeneratorPage } from './components/tools/QrCodeGeneratorPage';
import { LearningPathsPage } from './components/LearningPathsPage';
import { KnowledgeSection } from './components/KnowledgeSection';
import { ProgressPage } from './components/ProgressPage';
import { CommunityPage } from './components/CommunityPage';
import { CoreTeamApplyPage } from './components/CoreTeamApplyPage';
import { AuthPage } from './components/AuthPage';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { syncUserProfileFromFirestore } from './lib/userAuthService';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // User Profile Account State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('cyberempirex_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse user profile', e);
    }
    return {
      isLoggedIn: false,
      name: 'Guest User',
      username: '@guest',
      email: '',
      joinedDate: 'Aug 2026',
      role: 'Guest'
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('cyberempirex_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Failed to save profile', e);
    }
  }, [userProfile]);

  // Subscribe to real Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await syncUserProfileFromFirestore(firebaseUser);
          setUserProfile(profile);
        } catch (e) {
          console.warn('Profile sync fallback active:', e);
          setUserProfile({
            isLoggedIn: true,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            username: `@${(firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'user').toLowerCase().replace(/[^a-z0-9_]/g, '')}`,
            email: firebaseUser.email || '',
            avatarUrl: firebaseUser.photoURL || '',
            joinedDate: 'Aug 2026',
            role: 'Registered User',
            country: 'Global',
            emailVerified: firebaseUser.emailVerified,
            accountStatus: 'Active',
            lastActivity: new Date().toISOString()
          });
        }
      } else {
        setUserProfile({
          isLoggedIn: false,
          name: 'Guest User',
          username: '@guest',
          email: '',
          joinedDate: 'Aug 2026',
          role: 'Guest'
        });
      }
    });

    return () => unsubscribe();
  }, []);
  
  // Terminal Command Launcher State
  const [activeTerminalCmd, setActiveTerminalCmd] = useState<string | undefined>(undefined);

  // User Progress State with LocalStorage
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const defaultProgress: UserProgress = {
      xp: 1450,
      level: 4,
      completedLessonIds: ['termux-setup', 'termux-cli-nav'],
      completedChallengeIds: ['ctf-1'],
      completedLabIds: ['lab-1'],
      earnedBadges: ['Termux Pioneer', 'Linux Security Fundamentals', 'Network Reconnaissance Master'],
      terminalHistory: [],
      bookmarkedCommandIds: [],
      favoriteToolIds: ['port-scanner', 'http-client']
    };

    try {
      const saved = localStorage.getItem('cyberempirex_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultProgress,
          ...parsed,
          completedLessonIds: parsed.completedLessonIds || defaultProgress.completedLessonIds,
          completedChallengeIds: parsed.completedChallengeIds || defaultProgress.completedChallengeIds,
          completedLabIds: parsed.completedLabIds || parsed.completedLabs || defaultProgress.completedLabIds,
          earnedBadges: parsed.earnedBadges || defaultProgress.earnedBadges,
          terminalHistory: parsed.terminalHistory || [],
          bookmarkedCommandIds: parsed.bookmarkedCommandIds || [],
          favoriteToolIds: parsed.favoriteToolIds || defaultProgress.favoriteToolIds,
        };
      }
    } catch (e) {
      console.warn('Failed to parse user progress', e);
    }
    return defaultProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem('cyberempirex_progress', JSON.stringify(userProgress));
    } catch (e) {
      console.warn('Failed to save progress', e);
    }
  }, [userProgress]);

  // Global keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenTerminalWithCmd = (cmdStr?: string) => {
    if (cmdStr) {
      setActiveTerminalCmd(cmdStr);
    }
    setCurrentView('terminal-lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#111827] font-sans antialiased selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
      
      {/* Top Header Navigation Bar (Sticky 72px) */}
      <Header
        currentView={currentView}
        setView={setCurrentView}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        userProgress={userProgress}
        userProfile={userProfile}
      />

      {/* Mobile / Navigation Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentView={currentView}
        setView={setCurrentView}
        userProgress={userProgress}
      />

      {/* Main Container Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12">
        
        {/* HOMEPAGE VIEW: Contains strictly the 6 clean homepage sections */}
        {currentView === 'home' && (
          <div className="space-y-12">
            {/* 1. Welcome Hero */}
            <WelcomeHero 
              setView={setCurrentView} 
              onOpenTerminalWithCmd={handleOpenTerminalWithCmd} 
            />

            {/* 2. About CyberEmpireX */}
            <AboutSection />

            {/* 3. Platform Overview */}
            <PlatformOverview 
              userProgress={userProgress} 
            />

            {/* 4. Quick Actions */}
            <QuickActions 
              setView={setCurrentView} 
            />

            {/* 5. Latest Updates */}
            <LatestUpdates 
              setView={setCurrentView} 
            />
          </div>
        )}

        {/* PROGRESS PAGE */}
        {currentView === 'progress' && (
          <ProgressPage 
            userProgress={userProgress}
            setView={setCurrentView}
          />
        )}

        {/* LEARNING PATHS (BEGINNER / INTERMEDIATE / ADVANCED) */}
        {(currentView === 'learning-beginner' || currentView === 'learning-intermediate' || currentView === 'learning-advanced') && (
          <LearningPathsPage
            initialLevel={
              currentView === 'learning-beginner' ? 'Beginner' : currentView === 'learning-intermediate' ? 'Intermediate' : 'Advanced'
            }
            setView={setCurrentView}
            onOpenTerminalWithCmd={handleOpenTerminalWithCmd}
          />
        )}

        {/* KNOWLEDGE BASE (LINUX / NETWORKING / TERMUX / CONCEPTS) */}
        {(currentView === 'knowledge-linux' || currentView === 'knowledge-networking' || currentView === 'knowledge-termux' || currentView === 'knowledge-concepts') && (
          <KnowledgeSection
            initialCategory={
              currentView === 'knowledge-linux' ? 'linux' :
              currentView === 'knowledge-networking' ? 'networking' :
              currentView === 'knowledge-termux' ? 'termux' : 'concepts'
            }
            setView={setCurrentView}
            onOpenTerminalWithCmd={handleOpenTerminalWithCmd}
          />
        )}

        {/* CYBER TOOLS SUB-PAGE & SPECIFIC TOOL DEEP LINKS */}
        {(currentView === 'tools' || 
          currentView === 'password-generator' || 
          currentView === 'hash-generator' || 
          currentView === 'token-generator' || 
          currentView === 'crypto-tool' || 
          currentView === 'ip-lookup' || 
          currentView === 'dns-lookup' || 
          currentView === 'whois-lookup' || 
          currentView === 'reverse-dns' || 
          currentView === 'ssl-checker'
        ) && (
          <div className="space-y-6">
            <CyberToolsSection
              onOpenTerminalWithCmd={handleOpenTerminalWithCmd}
              setView={setCurrentView}
              initialToolId={currentView !== 'tools' ? currentView : undefined}
            />
          </div>
        )}

        {/* QR CODE GENERATOR DEDICATED PAGE */}
        {currentView === 'qr-generator' && (
          <div className="space-y-6">
            <QrCodeGeneratorPage
              onBack={() => setCurrentView('tools')}
            />
          </div>
        )}

        {/* TERMUX TOOL VAULT & MATRIX SUB-PAGE */}
        {(currentView === 'termux-vault' || currentView === 'tools-matrix') && (
          <div className="space-y-6">
            <ToolMatrix
              onOpenTerminal={handleOpenTerminalWithCmd}
              onOpenAiExplain={(cmd) => setIsAiModalOpen(true)}
            />
          </div>
        )}

        {/* PRACTICE LABS SUB-PAGE */}
        {currentView === 'labs' && (
          <div className="space-y-6">
            <PracticeLabsSection
              onOpenTerminalWithCmd={handleOpenTerminalWithCmd}
              setView={setCurrentView}
            />
          </div>
        )}

        {/* CERTIFICATIONS SUB-PAGE */}
        {currentView === 'certifications' && (
          <div className="space-y-6">
            <CertificationsSection
              userProgress={userProgress}
              setView={setCurrentView}
            />
          </div>
        )}

        {/* AI COACH SUB-PAGE */}
        {currentView === 'ai-coach' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-xl font-extrabold text-[#111827]">AI Security Assistant & Ethical Advisor</h2>
                <p className="text-xs text-[#6B7280]">Ask any cybersecurity, Termux script, or penetration testing question powered by Gemini.</p>
              </div>
            </div>

            <AICoachModal
              isOpen={true}
              onClose={() => setCurrentView('home')}
              onOpenTerminal={handleOpenTerminalWithCmd}
            />
          </div>
        )}

        {/* CTF CHALLENGES SUB-PAGE */}
        {currentView === 'challenges' && (
          <QuizSection
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            onOpenTerminal={handleOpenTerminalWithCmd}
          />
        )}

        {/* ETHICAL DISCLAIMER SUB-PAGE */}
        {currentView === 'disclaimer' && (
          <EthicalDisclaimer
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            setView={setCurrentView}
          />
        )}

        {/* TERMINAL LAB SUB-PAGE */}
        {currentView === 'terminal-lab' && (
          <TerminalLab
            initialCommand={activeTerminalCmd}
            setView={setCurrentView}
            setUserProgress={setUserProgress}
          />
        )}

        {/* AUTHENTICATION SUB-PAGE */}
        {currentView === 'auth' && (
          <AuthPage
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onSuccess={() => {
              setCurrentView('community-contribute');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCancel={() => setCurrentView('home')}
          />
        )}

        {/* ACCOUNT PROFILE SUB-PAGE */}
        {currentView === 'profile' && (
          <ProfilePage
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            setView={setCurrentView}
          />
        )}

        {/* CORE TEAM APPLICATION SUB-PAGE */}
        {currentView === 'core-team-apply' && (
          <CoreTeamApplyPage
            userProfile={userProfile}
            onNavigate={setCurrentView}
            onOpenAuth={() => {
              setCurrentView('auth');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* COMMUNITY & SUPPORT SUB-PAGES */}
        {currentView.startsWith('community-') && (
          <CommunityPage
            view={currentView}
            setView={setCurrentView}
            userProfile={userProfile}
          />
        )}

      </main>

      {/* Cookie Consent Banner for First Time Visitors */}
      <CookieConsentBanner />

      {/* 8. Footer (Always rendered at bottom) */}
      <Footer setView={setCurrentView} />

      {/* Modals */}
      {isAiModalOpen && currentView !== 'ai-coach' && (
        <AICoachModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onOpenTerminal={handleOpenTerminalWithCmd}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          setView={setCurrentView}
          onOpenTerminal={handleOpenTerminalWithCmd}
        />
      )}

    </div>
  );
}

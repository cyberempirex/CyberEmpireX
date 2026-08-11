import React, { useState } from 'react';
import { UserProfile, UserProgress, ViewMode } from '../types';
import { 
  User, 
  Shield, 
  ShieldCheck,
  Trash2, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Save, 
  Mail, 
  AtSign, 
  Award, 
  ArrowLeft,
  Lock,
  Globe
} from 'lucide-react';
import { logoutUser } from '../lib/userAuthService';
import { AuthPage } from './AuthPage';
import { OpenSourceLogo, RankTrophyIcon } from './CexTechAssets';

interface ProfilePageProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  setView: (view: ViewMode) => void;
  onCloseModal?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfile,
  setUserProfile,
  userProgress,
  setUserProgress,
  setView,
  onCloseModal
}) => {
  // Form State for Editing
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [usernameInput, setUsernameInput] = useState(userProfile.username);
  const [emailInput, setEmailInput] = useState(userProfile.email);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  // Auth Form State (For Logging In / Signing Up)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authUsername, setAuthUsername] = useState('');

  // Security Delete Account Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteCheck1, setDeleteCheck1] = useState(false);
  const [deleteCheck2, setDeleteCheck2] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Save Name & Username Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !usernameInput.trim()) {
      return;
    }
    const cleanUsername = usernameInput.startsWith('@') ? usernameInput : `@${usernameInput}`;
    setUserProfile(prev => ({
      ...prev,
      name: nameInput.trim(),
      username: cleanUsername,
      email: emailInput.trim() || prev.email
    }));
    setSavedSuccessMsg('Profile details updated successfully!');
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  // Sign In Handler
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) return;

    setUserProfile({
      isLoggedIn: true,
      name: authEmail.split('@')[0] || 'Security Developer',
      username: `@${authEmail.split('@')[0] || 'dev_user'}`,
      email: authEmail,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      role: 'Security Engineer'
    });
    setSavedSuccessMsg('Logged in successfully!');
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  // Sign Up Handler
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim() || !authName.trim()) return;

    const formattedUsername = authUsername.trim() 
      ? (authUsername.startsWith('@') ? authUsername : `@${authUsername}`)
      : `@${authName.toLowerCase().replace(/\s+/g, '_')}`;

    setUserProfile({
      isLoggedIn: true,
      name: authName.trim(),
      username: formattedUsername,
      email: authEmail.trim(),
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      role: 'Open Source Security Member'
    });
    setSavedSuccessMsg('Account created successfully!');
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logoutUser();
      setUserProfile({
        isLoggedIn: false,
        name: 'Guest User',
        username: '@guest',
        email: '',
        joinedDate: 'Aug 2026',
        role: 'Guest'
      });
      setSavedSuccessMsg('Logged out safely.');
      setTimeout(() => setSavedSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Confirm Account Permanent Deletion
  const REQUIRED_DELETE_STRING = 'DELETE';
  const isDeleteButtonEnabled = 
    deleteConfirmText.trim().toUpperCase() === REQUIRED_DELETE_STRING && 
    deleteCheck1 && 
    deleteCheck2;

  const handleConfirmDeleteAccount = () => {
    if (!isDeleteButtonEnabled) {
      setDeleteError('Please type DELETE and check all security checkboxes.');
      return;
    }

    // Reset User Profile & Progress
    setUserProfile({
      isLoggedIn: false,
      name: 'Guest User',
      username: '@guest',
      email: 'guest@open-source.org',
      joinedDate: 'N/A',
      role: 'Guest'
    });

    setUserProgress({
      xp: 0,
      level: 1,
      completedLessonIds: [],
      completedChallengeIds: [],
      earnedBadges: [],
      terminalHistory: [],
      bookmarkedCommandIds: [],
      favoriteToolIds: [],
      completedLabIds: []
    });

    try {
      localStorage.removeItem('cyberempirex_profile');
      localStorage.removeItem('cyberempirex_progress');
    } catch (e) {
      console.warn('Failed clearing local storage', e);
    }

    setIsDeleteModalOpen(false);
    setSavedSuccessMsg('Account and all associated local data permanently wiped.');
    setTimeout(() => setSavedSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 max-w-4xl mx-auto">
      
      {/* Top Banner & Navigation */}
      <div className="bg-[#2563EB] text-white rounded-2xl p-6 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              onClick={() => setView('home')}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-100 hover:text-white transition-colors cursor-pointer mb-1 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Overview</span>
            </button>
            <div className="flex items-center space-x-3">
              {/* Account Avatar / Open Source Logo */}
              <div className="w-12 h-12 rounded-xl bg-white text-[#2563EB] font-black flex items-center justify-center shadow-sm border border-blue-200 shrink-0">
                <OpenSourceLogo className="w-7 h-7 text-[#2563EB]" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
                  <span>{userProfile.isLoggedIn ? userProfile.name : 'Open Source Profile'}</span>
                  <OpenSourceLogo className="w-5 h-5 text-blue-200 inline-block" />
                </h1>
                <p className="text-xs text-blue-100 font-mono flex items-center space-x-1.5 mt-0.5">
                  <span>{userProfile.isLoggedIn ? userProfile.username : '@guest_developer'}</span>
                  <span>•</span>
                  <span>{userProfile.email}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Ethical Charter Tag */}
            {userProgress.ethicalPledgeAgreed || userProgress.earnedBadges?.includes('Ethical Security Pledge') ? (
              <span 
                onClick={() => setView('disclaimer')}
                className="px-3 py-1 bg-emerald-500/25 border border-emerald-400/50 text-emerald-100 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 cursor-pointer hover:bg-emerald-500/35 transition-colors shadow-xs"
                title="Verified Ethical White-Hat Charter Signatory"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verified Ethical Hacker</span>
              </span>
            ) : (
              <button 
                onClick={() => setView('disclaimer')}
                className="px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-100 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 cursor-pointer hover:bg-amber-500/30 transition-colors"
                title="Click to sign the White-Hat Governance Charter"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                <span>Sign Ethical Charter</span>
              </button>
            )}

            <span className={`px-3 py-1 border rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 ${
              userProfile.isLoggedIn 
                ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40' 
                : 'bg-white/10 text-blue-100 border-white/20'
            }`}>
              <span className={`w-2 h-2 rounded-full ${userProfile.isLoggedIn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'}`}></span>
              <span>{userProfile.isLoggedIn ? 'Account Signed In' : 'Guest Mode'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {savedSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center space-x-2 animate-in slide-in-from-top-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{savedSuccessMsg}</span>
        </div>
      )}

      {/* IF NOT LOGGED IN: SHOW AUTHENTICATION PAGE */}
      {!userProfile.isLoggedIn ? (
        <AuthPage
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onSuccess={() => {
            setSavedSuccessMsg('Signed in successfully!');
            setTimeout(() => setSavedSuccessMsg(''), 3000);
          }}
          onCancel={() => setView('home')}
        />
      ) : (
        /* IF LOGGED IN: EDIT PROFILE & ACCOUNT MANAGEMENT */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Edit Details Form */}
          <div className="md:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-6">
            <div className="border-b border-[#E5E7EB] pb-3">
              <h2 className="text-lg font-bold text-[#111827] flex items-center space-x-2">
                <User className="w-5 h-5 text-[#2563EB]" />
                <span>Account Profile Information</span>
              </h2>
              <p className="text-xs text-[#6B7280]">
                Update your display name and unique handle.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#111827] flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Full Display Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#111827] font-semibold focus:outline-none focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#111827] flex items-center space-x-1.5">
                  <AtSign className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Username Handle</span>
                </label>
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#111827] font-semibold focus:outline-none focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#111827] flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#111827] font-semibold focus:outline-none focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Statistics & Danger Zone */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Account Progress Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#111827] flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#2563EB]" />
                <span>Account Stats & Badges</span>
              </h3>

              {/* Ethical Governance Charter Status */}
              <div className={`p-3.5 rounded-xl border space-y-2 ${
                userProgress.ethicalPledgeAgreed || userProgress.earnedBadges?.includes('Ethical Security Pledge')
                  ? 'bg-emerald-50/80 border-emerald-200'
                  : 'bg-amber-50/80 border-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center space-x-1.5 text-[#111827]">
                    <ShieldCheck className={`w-4 h-4 ${
                      userProgress.ethicalPledgeAgreed || userProgress.earnedBadges?.includes('Ethical Security Pledge')
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`} />
                    <span>Governance Charter Status</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setView('disclaimer')}
                    className="text-[10px] font-mono font-bold text-[#2563EB] hover:underline cursor-pointer"
                  >
                    Manage
                  </button>
                </div>

                {userProgress.ethicalPledgeAgreed || userProgress.earnedBadges?.includes('Ethical Security Pledge') ? (
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-mono font-bold">
                        VERIFIED TAG ACTIVE
                      </span>
                      <span className="text-[11px] text-emerald-900 font-semibold">
                        Verified Ethical Hacker
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-[11px] text-amber-800">
                      You have not signed the White-Hat Governance Charter yet.
                    </p>
                    <button
                      type="button"
                      onClick={() => setView('disclaimer')}
                      className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Sign Ethical Guidelines & Unlock Tag
                    </button>
                  </div>
                )}
              </div>

              <div className="p-3.5 bg-[#EEF4FF] border border-blue-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2563EB] flex items-center space-x-1.5">
                    <OpenSourceLogo className="w-4 h-4 text-[#2563EB]" />
                    <span>Verified Open Source Badges</span>
                  </span>
                  <span className="text-[10px] font-mono text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200 font-bold">
                    {(userProgress.earnedBadges || []).length} Unlocked
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(userProgress.earnedBadges || []).map((badge, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white text-[#2563EB] border border-blue-200 rounded-lg text-[10px] font-mono font-bold flex items-center space-x-1.5 shadow-2xs">
                      <RankTrophyIcon tier={idx % 2 === 0 ? 'gold' : 'diamond'} className="w-4 h-4" />
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-[#F8FAFC] hover:bg-slate-100 text-[#111827] border border-[#E5E7EB] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4 text-[#6B7280]" />
                <span>Log Out of Account</span>
              </button>
            </div>

            {/* Danger Zone: Account Deletion */}
            <div className="bg-red-50/60 border border-red-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-bold">Security Danger Zone</h3>
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                Deleting your account will permanently wipe all your local saved commands, completed CTF labs, and certification records.
              </p>

              <button
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setDeleteConfirmText('');
                  setDeleteCheck1(false);
                  setDeleteCheck2(false);
                  setDeleteError('');
                }}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account...</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* MULTI-STEP SECURITY CONFIRMATION MODAL FOR ACCOUNT DELETION */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center space-x-2.5 text-red-600">
                <div className="p-2 rounded-xl bg-red-100 border border-red-200">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111827]">Security Verification Required</h3>
                  <p className="text-xs text-[#6B7280]">Account Permanent Deletion</p>
                </div>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-1 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Warning Message */}
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl space-y-1.5 text-xs text-red-800">
              <p className="font-bold flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-red-600 shrink-0" />
                <span>Action Cannot Be Undone</span>
              </p>
              <p className="leading-relaxed">
                This security safeguard prevents accidental deletion with a single click. Proceeding will wipe all account settings, certificates, and local progress records.
              </p>
            </div>

            {/* Security Check 1: Checkbox A */}
            <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-[#111827]">
              <input
                type="checkbox"
                checked={deleteCheck1}
                onChange={(e) => setDeleteCheck1(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span className="font-medium">
                I understand that my account ({userProfile.username}) and all associated certifications will be permanently deleted.
              </span>
            </label>

            {/* Security Check 2: Checkbox B */}
            <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-[#111827]">
              <input
                type="checkbox"
                checked={deleteCheck2}
                onChange={(e) => setDeleteCheck2(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span className="font-medium">
                I confirm I am authorized to perform this deletion and do not require data restoration.
              </span>
            </label>

            {/* Security Check 3: Text Input Match */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-[#111827] block">
                Type <span className="font-mono bg-red-100 text-red-700 px-1.5 py-0.5 rounded border border-red-200">DELETE</span> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE here..."
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-[#111827] focus:outline-none focus:border-red-500"
              />
            </div>

            {deleteError && (
              <p className="text-xs text-red-600 font-medium">{deleteError}</p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-2 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#E5E7EB] text-[#111827] font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!isDeleteButtonEnabled}
                onClick={handleConfirmDeleteAccount}
                className={`px-5 py-2 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5 ${
                  isDeleteButtonEnabled 
                    ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                    : 'bg-red-300 cursor-not-allowed opacity-60'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>Confirm Permanent Deletion</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Shield, 
  Lock, 
  Mail, 
  User, 
  Globe, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2,
  ArrowLeft,
  KeyRound
} from 'lucide-react';
import { 
  loginWithEmail, 
  registerWithEmail, 
  loginWithGoogle, 
  sendPasswordReset 
} from '../lib/userAuthService';
import brandSymbol from '../assets/brand/symbol.png';
import brandWordmark from '../assets/brand/wordmark.png';

interface AuthPageProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onSuccess: () => void;
  targetViewName?: string;
  onCancel?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  userProfile,
  setUserProfile,
  onSuccess,
  targetViewName,
  onCancel
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [country, setCountry] = useState('United States');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Helper to format Firebase Auth error codes into human-readable messages
  const formatAuthError = (err: any): string => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email address or password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email address already exists. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in popup was closed before completing.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful attempts. Please wait a moment and try again.';
      default:
        return err?.message || 'An authentication error occurred. Please try again.';
    }
  };

  // Handle Sign In / Sign Up Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (mode === 'forgot') {
      if (!email) {
        setErrorMsg('Please enter your email address to receive a password reset link.');
        return;
      }
      setIsSubmitting(true);
      try {
        await sendPasswordReset(email);
        setInfoMsg('Password reset link sent! Check your email inbox.');
        setIsSubmitting(false);
      } catch (err) {
        setErrorMsg(formatAuthError(err));
        setIsSubmitting(false);
      }
      return;
    }

    if (!email || !password) {
      setErrorMsg('Please provide both email address and password.');
      return;
    }

    if (mode === 'signup') {
      if (!displayName.trim()) {
        setErrorMsg('Please enter your display name.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        await registerWithEmail(email, password, displayName, country);
        setInfoMsg('Account created successfully! A verification link has been sent to your email.');
      } else {
        await loginWithEmail(email, password);
      }
      setIsSubmitting(false);
      onSuccess();
    } catch (err: any) {
      setErrorMsg(formatAuthError(err));
      setIsSubmitting(false);
    }
  };

  // Handle Google OAuth
  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    setErrorMsg('');
    setInfoMsg('');

    try {
      await loginWithGoogle();
      setIsGoogleLoading(false);
      onSuccess();
    } catch (err: any) {
      setErrorMsg(formatAuthError(err));
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 sm:py-12 space-y-6 animate-in fade-in duration-200">
      
      {/* Back / Navigation Header */}
      <div className="flex items-center justify-between">
        {onCancel ? (
          <button
            onClick={onCancel}
            className="flex items-center space-x-1.5 text-xs text-[#6B7280] hover:text-[#2563EB] font-bold cursor-pointer transition-colors bg-white px-3 py-1.5 rounded-xl border border-[#E5E7EB]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : <div />}

        <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
          <img src={brandSymbol} alt="CyberEmpireX Symbol" className="w-4 h-4 object-contain" />
          <span className="font-semibold text-[#111827]">CyberEmpireX Auth</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <img src={brandSymbol} alt="CyberEmpireX Symbol" className="h-10 sm:h-11 w-auto object-contain shrink-0" />
            <img src={brandWordmark} alt="CyberEmpireX" className="h-8 sm:h-9 md:h-10 w-auto object-contain shrink-0" />
          </div>
          <div>
            <h1 className="text-lg font-black text-[#111827] tracking-tight">
              {mode === 'signin' && 'Sign in to your account'}
              {mode === 'signup' && 'Create your platform account'}
              {mode === 'forgot' && 'Reset your password'}
            </h1>
            <p className="text-xs text-[#6B7280] mt-1 font-normal">
              {mode === 'signin' && 'Enter your credentials to access protected features.'}
              {mode === 'signup' && 'Join the platform to save progress and participate.'}
              {mode === 'forgot' && 'We will send a password reset link to your email address.'}
            </p>
          </div>
        </div>

        {targetViewName && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span>Sign in required to access <strong>{targetViewName}</strong>.</span>
          </div>
        )}

        {/* Google SSO Button */}
        {mode !== 'forgot' && (
          <>
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-[#E5E7EB] hover:border-slate-300 text-[#111827] text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center space-x-3 cursor-pointer"
            >
              {isGoogleLoading ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E5E7EB] w-full" />
              <span className="bg-white px-3 text-[11px] font-mono font-semibold text-[#9CA3AF] uppercase absolute">
                Or with email
              </span>
            </div>
          </>
        )}

        {/* Form Messages */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start space-x-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {infoMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start space-x-2 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#374151] flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Display Name</span>
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#374151] flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Country</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                  <option value="Global / Other">Global / Other</option>
                </select>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#374151] flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
            />
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#374151] flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Password</span>
                </label>
                {mode === 'signin' && (
                  <button 
                    type="button" 
                    onClick={() => { setMode('forgot'); setErrorMsg(''); setInfoMsg(''); }}
                    className="text-[11px] text-[#2563EB] hover:underline cursor-pointer font-medium"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
              />
            </div>
          )}

          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#374151] flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Confirm Password</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-xl transition-all shadow-2xs flex items-center justify-center space-x-2 cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle Mode Links */}
        <div className="pt-3 border-t border-[#E5E7EB] text-center text-xs text-[#6B7280]">
          {mode === 'signin' && (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMsg(''); setInfoMsg(''); }}
                className="text-[#2563EB] font-bold hover:underline cursor-pointer"
              >
                Create account
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('signin'); setErrorMsg(''); setInfoMsg(''); }}
                className="text-[#2563EB] font-bold hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMsg(''); setInfoMsg(''); }}
              className="text-[#2563EB] font-bold hover:underline cursor-pointer"
            >
              ← Back to Sign In
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

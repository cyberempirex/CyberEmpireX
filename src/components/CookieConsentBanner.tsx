import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Check, Lock, X, ShieldAlert, Info } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cyberempirex_cookie_consent');
      if (!consent) {
        // Show after 1 second delay
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Cookie consent check failed', e);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('cyberempirex_cookie_consent', JSON.stringify({
        essential: true,
        preferences: true,
        security: true,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('Failed to save cookie consent', e);
    }
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem('cyberempirex_cookie_consent', JSON.stringify({
        essential: true,
        preferences: false,
        security: true,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('Failed to save cookie consent', e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto bg-[#0F172A] border border-slate-800 text-slate-100 rounded-2xl shadow-2xl p-5 sm:p-6 pointer-events-auto backdrop-blur-xl space-y-4 animate-in slide-in-from-bottom-5 duration-300">
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Cookie & Privacy Preferences
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Privacy First
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-2xl">
                CyberEmpireX uses essential cookies and local session storage strictly for secure authentication sessions, preserving your learning progress, and platform preferences.
              </p>
            </div>
          </div>

          <button
            onClick={handleAcceptEssential}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {showDetails && (
          <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-2 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Session & Auth Cookies (Essential)</span>
              <span className="text-emerald-400 text-[10px] font-mono font-bold">REQUIRED</span>
            </div>
            <p className="text-[11px] text-slate-400">
              HttpOnly, Secure, SameSite=Lax flags used for server token validation and protecting user sessions against CSRF.
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="font-semibold text-slate-200">Learning Progress Storage</span>
              <span className="text-blue-400 text-[10px] font-mono font-bold">OPTIONAL</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Saves completed lessons, earned badges, and custom terminal history locally in your browser.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-slate-400 hover:text-blue-400 transition-colors underline cursor-pointer self-start sm:self-center"
          >
            {showDetails ? 'Hide details' : 'View cookie & security details'}
          </button>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleAcceptEssential}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer w-1/2 sm:w-auto"
            >
              Essential Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer w-1/2 sm:w-auto flex items-center justify-center space-x-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept All</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

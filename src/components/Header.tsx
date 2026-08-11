import React from 'react';
import { User } from 'lucide-react';
import { ViewMode, UserProgress, UserProfile } from '../types';
import brandSymbol from '../assets/brand/symbol.png';
import brandWordmark from '../assets/brand/wordmark.png';

interface HeaderProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
  userProgress: UserProgress;
  userProfile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setView,
  toggleDrawer,
  isDrawerOpen,
  userProgress,
  userProfile
}) => {

  return (
    <header className="sticky top-0 z-40 h-[72px] sm:h-[80px] bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] transition-all duration-200">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        
        {/* LEFT: Official Brand Symbol & Wordmark */}
        <div 
          onClick={() => setView('home')} 
          className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group py-1"
        >
          <img 
            src={brandSymbol} 
            alt="CyberEmpireX Symbol" 
            className="h-12 sm:h-14 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105" 
          />
          <div className="flex flex-col justify-center">
            <img 
              src={brandWordmark} 
              alt="CyberEmpireX" 
              className="h-6 sm:h-7.5 md:h-8.5 w-auto object-contain shrink-0" 
            />
            <span className="text-[10px] sm:text-[11px] font-medium text-[#6B7280] tracking-tight leading-none mt-0.5">
              Open Source Security Platform
            </span>
          </div>
        </div>

        {/* RIGHT: User Profile Button & Animated Hamburger Menu */}
        <div className="flex items-center space-x-3">
          
          {/* True Circular Profile Avatar Control */}
          <button
            onClick={() => setView(userProfile.isLoggedIn ? 'profile' : 'auth')}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none shrink-0 ${
              currentView === 'profile' || currentView === 'auth'
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#F8FAFC] text-[#111827] border border-[#E5E7EB] hover:bg-[#EEF4FF] hover:border-[#2563EB]/40 hover:text-[#2563EB]'
            }`}
            aria-label="User Account Profile"
            title={userProfile.isLoggedIn ? `Account Profile (${userProfile.name})` : "Sign In or Register"}
          >
            <User className="w-5.5 sm:w-6 h-5.5 sm:h-6 stroke-[1.75]" />
          </button>

          {/* Animated Hamburger Menu Button (Right side) */}
          <button
            onClick={toggleDrawer}
            className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] hover:bg-[#F8FAFC] hover:border-[#2563EB]/40 transition-all cursor-pointer flex items-center justify-center relative overflow-hidden focus:outline-none"
            aria-label={isDrawerOpen ? "Close Menu" : "Open Menu"}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center">
              <span 
                className={`w-5 h-0.5 bg-[#111827] rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                  isDrawerOpen ? 'translate-y-[7px] rotate-45 bg-[#2563EB]' : ''
                }`} 
              />
              <span 
                className={`w-5 h-0.5 bg-[#111827] rounded-full transition-all duration-200 ease-in-out ${
                  isDrawerOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`w-5 h-0.5 bg-[#111827] rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                  isDrawerOpen ? '-translate-y-[7px] -rotate-45 bg-[#2563EB]' : ''
                }`} 
              />
            </div>
          </button>

        </div>

      </div>
    </header>
  );
};

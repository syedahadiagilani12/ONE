import React from 'react';
import { LayoutDashboard, FileText, Map, Bell, Settings, LogOut, User } from 'lucide-react';
import { Screen, TransitionDirection } from '../types';

interface NavigationLayoutProps {
  activeScreen: Screen;
  onNavigate: (target: Screen, transition: TransitionDirection) => void;
  unreadAlertsCount: number;
  children: React.ReactNode;
}

export default function NavigationLayout({
  activeScreen,
  onNavigate,
  unreadAlertsCount,
  children
}: NavigationLayoutProps) {
  
  const handleAsideNavigate = (target: Screen) => {
    if (target === activeScreen) return;
    
    // Determine transition direction based on spec rules:
    // Reporting -> Dashboard: push_back (backward)
    // Map -> Dashboard: push_back (backward)
    // Alerts -> Dashboard: push_back (backward)
    // Others -> push (forward)
    if (target === 'dashboard') {
      onNavigate(target, 'backward');
    } else {
      onNavigate(target, 'forward');
    }
  };

  const handleMobileNavigate = (target: Screen) => {
    if (target === activeScreen) return;
    
    if (target === 'dashboard') {
      onNavigate(target, 'backward');
    } else {
      onNavigate(target, 'forward');
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* Desktop Navigation Drawer (aside) */}
      <aside className="hidden md:flex flex-col h-full w-72 bg-slate-900 text-slate-100 border-r border-slate-800 py-6 z-50 shrink-0">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight text-white tracking-tight">One Health</h1>
              <p className="text-slate-500 text-[9px] font-mono uppercase tracking-wider">Surveillance Network</p>
            </div>
          </div>
        </div>

        {/* Navigation links inside aside */}
        <nav className="flex-1 space-y-2 px-4">
          <button
            onClick={() => handleAsideNavigate('dashboard')}
            className={`w-full flex items-center px-4 py-3 transition-colors duration-150 active:scale-98 cursor-pointer ${
              activeScreen === 'dashboard'
                ? 'bg-blue-600/10 text-blue-400 rounded-xl border border-blue-600/20 font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white transition-colors rounded-xl'
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5 shrink-0" />
            <span className="font-display text-sm font-semibold">Dashboard</span>
          </button>

          <button
            onClick={() => handleAsideNavigate('report')}
            className={`w-full flex items-center px-4 py-3 transition-colors duration-150 active:scale-98 cursor-pointer ${
              activeScreen === 'report'
                ? 'bg-blue-600/10 text-blue-400 rounded-xl border border-blue-600/20 font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white transition-colors rounded-xl'
            }`}
          >
            <FileText className="mr-3 h-5 w-5 shrink-0" />
            <span className="font-display text-sm font-semibold">Report Disease</span>
          </button>

          <button
            onClick={() => handleAsideNavigate('map')}
            className={`w-full flex items-center px-4 py-3 transition-colors duration-150 active:scale-98 cursor-pointer ${
              activeScreen === 'map'
                ? 'bg-blue-600/10 text-blue-400 rounded-xl border border-blue-600/20 font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white transition-colors rounded-xl'
            }`}
          >
            <Map className="mr-3 h-5 w-5 shrink-0" />
            <span className="font-display text-sm font-semibold">Interactive Map</span>
          </button>

          <button
            onClick={() => handleAsideNavigate('alerts')}
            className={`w-full flex items-center justify-between px-4 py-3 transition-colors duration-150 active:scale-98 cursor-pointer relative ${
              activeScreen === 'alerts'
                ? 'bg-blue-600/10 text-blue-400 rounded-xl border border-blue-600/20 font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white transition-colors rounded-xl'
            }`}
          >
            <div className="flex items-center">
              <Bell className="mr-3 h-5 w-5 shrink-0" />
              <span className="font-display text-sm font-semibold">Alerts Center</span>
            </div>
            {unreadAlertsCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          <div className="pt-4 mt-4 border-t border-slate-800">
            <button className="w-full flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors rounded-xl cursor-pointer">
              <Settings className="mr-3 h-5 w-5 shrink-0" />
              <span className="font-display text-sm font-semibold">Settings</span>
            </button>
          </div>
        </nav>

        {/* User profile footer in sidebar */}
        <div className="mt-auto px-4 py-4 flex flex-col border-t border-slate-800 gap-4">
          <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-850">
            <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-bold">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs text-slate-200 font-medium">Global Sync Active</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-3 border border-slate-700 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-slate-700 text-slate-200 font-bold text-sm">SM</div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-display font-semibold text-xs truncate text-white">Dr. Sarah J. Mitchell</p>
              <p className="text-slate-400 text-[10px] truncate">Senior Epidemiologist</p>
            </div>
            <button 
              onClick={() => onNavigate('login', 'backward')}
              className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              title="Log out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="px-6 pt-2">
          <span className="text-slate-500 text-[10px] font-mono font-medium">V1.2.0 • Secure Node</span>
        </div>
      </aside>

      {/* Main Canvas content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {children}

        {/* Mobile Bottom Navigation Bar (nav with md:hidden) */}
        <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center h-20 px-4 pb-2 bg-slate-900 text-slate-400 border-t border-slate-800 shadow-xl rounded-t-2xl">
          <button
            onClick={() => handleMobileNavigate('dashboard')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
              activeScreen === 'dashboard'
                ? 'bg-blue-600 text-white px-5 py-1.5'
                : 'hover:text-white'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] font-display font-semibold mt-0.5">Dashboard</span>
          </button>

          <button
            onClick={() => handleMobileNavigate('report')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
              activeScreen === 'report'
                ? 'bg-blue-600 text-white px-5 py-1.5'
                : 'hover:text-white'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-[10px] font-display font-semibold mt-0.5">Report</span>
          </button>

          <button
            onClick={() => handleMobileNavigate('map')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
              activeScreen === 'map'
                ? 'bg-blue-600 text-white px-5 py-1.5'
                : 'hover:text-white'
            }`}
          >
            <Map className="h-5 w-5" />
            <span className="text-[10px] font-display font-semibold mt-0.5">Map</span>
          </button>

          <button
            onClick={() => handleMobileNavigate('alerts')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer relative ${
              activeScreen === 'alerts'
                ? 'bg-blue-600 text-white px-5 py-1.5'
                : 'hover:text-white'
            }`}
          >
            <Bell className="h-5 w-5" />
            <span className="text-[10px] font-display font-semibold mt-0.5">Alerts</span>
            {unreadAlertsCount > 0 && activeScreen !== 'alerts' && (
              <span className="absolute top-1 right-2 bg-red-500 w-2.5 h-2.5 rounded-full animate-ping" />
            )}
          </button>
        </nav>
      </div>
    </div>
  );
}

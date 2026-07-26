import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Layers, 
  Navigation, 
  Plus, 
  Minus, 
  Share2, 
  X, 
  SlidersHorizontal, 
  ChevronUp, 
  ChevronDown, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Heart, 
  Activity, 
  Droplet,
  Menu
} from 'lucide-react';
import { Report, Screen, TransitionDirection } from '../types';

interface SurveillanceMapProps {
  reports: Report[];
  onNavigate: (target: Screen, transition: TransitionDirection) => void;
}

export default function SurveillanceMap({ reports, onNavigate }: SurveillanceMapProps) {
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(true);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Diseases');

  const handleToggleDetailCard = () => {
    setIsDetailCardOpen(!isDetailCardOpen);
  };

  const handleToggleBottomSheet = () => {
    setIsBottomSheetExpanded(!isBottomSheetExpanded);
  };

  return (
    <div className="flex-grow h-full relative overflow-hidden bg-slate-100">
      
      {/* Search and context header */}
      <header className="absolute top-0 left-0 right-0 h-16 px-4 md:px-8 flex justify-between items-center z-30 bg-gradient-to-b from-white/90 to-white/0 backdrop-blur-xs pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <button className="md:hidden hover:bg-white rounded-full p-2 shadow-sm transition-all cursor-pointer">
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
          <h2 className="hidden md:block font-display font-extrabold text-lg text-blue-900 tracking-tight">Interactive Surveillance Map</h2>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search location or disease..." 
              className="bg-white/95 border-none rounded-full px-12 py-2 w-64 focus:ring-2 focus:ring-blue-600 text-sm shadow-md text-slate-800"
            />
            <Search className="absolute left-4 top-2.5 h-4 w-4 text-slate-400" />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Dr. Sarah J. Mitchell</p>
              <p className="text-[10px] text-slate-500 font-medium">Senior Epidemiologist</p>
            </div>
            <div 
              onClick={() => onNavigate('login', 'backward')}
              className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden cursor-pointer flex items-center justify-center bg-slate-300 text-slate-600 font-bold text-sm animate-pulse"
              title="Log Out / Sign In"
            >
              SM
            </div>
          </div>
        </div>
      </header>

      {/* GIS Full Screen Map Canvas Background */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <img 
          className="w-full h-full object-cover opacity-75"
          alt="GIS topographical biological heat map grid representation"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRN7urNHkIbgXZRyXqpxfH7tSgQr_0zyPDMAAORHMPZzuB82RIB-JlR9_NBU0mw-LtqvgS9oZPP9WyVmNBVduYfb67zOPoegB4LTeKfi_IWDCNI9p1fxCrXQaTFBMd2CkDG2_cWpGHOMg-vJbN0w2zCikzKzPd03T78P2uQM98KOJ85m9uOkL0fOqne6WdH5Y3Zmd0v8uw0ctETvwkkoc5TRJxAsLg1eVjX2wnt4W9kJ1GKRKKiHM"
        />

        {/* Map Interactive Marker 1: Critical (Toggles card on click) */}
        <button 
          onClick={handleToggleDetailCard}
          className="absolute top-[35%] left-[45%] z-20 flex flex-col items-center group cursor-pointer active:scale-90 transition-transform"
          title="Click to toggle details for Avian Flu H5N1 outbreak"
        >
          <div className="w-8 h-8 bg-red-600 rounded-full pulse-red border-2 border-white flex items-center justify-center text-white shadow-xl">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div className="mt-1 px-2.5 py-1 bg-slate-950 text-white rounded-lg shadow-xl text-[9px] font-mono font-bold border border-red-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            H5N1 OUTBREAK (CLICK)
          </div>
        </button>

        {/* Map Interactive Marker 2: Warning */}
        <div className="absolute top-[55%] left-[60%] z-20 flex flex-col items-center group cursor-default">
          <div className="w-7 h-7 bg-amber-500 rounded-full pulse-yellow border-2 border-white flex items-center justify-center text-white shadow-xl">
            <AlertTriangle className="h-3.5 w-3.5" />
          </div>
          <div className="mt-1 px-2 py-1 bg-slate-950 text-white rounded-lg shadow-xl text-[9px] font-mono font-bold border border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            UNUSUAL WILDLIFE MORTALITY
          </div>
        </div>

        {/* Map Interactive Marker 3: Stable */}
        <div className="absolute top-[25%] left-[20%] z-20 flex flex-col items-center">
          <div className="w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg">
            <CheckCircle2 className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Floating controls panel on the right */}
      <div className="absolute top-20 right-4 z-30 flex flex-col gap-2.5">
        <button className="bg-white hover:bg-slate-100 text-slate-800 p-3 rounded-2xl shadow-lg border border-slate-200/50 flex items-center justify-center transition-all active:scale-90 cursor-pointer">
          <Navigation className="h-4 w-4" />
        </button>
        <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
          <button className="p-3 hover:bg-slate-100 border-b border-slate-100 transition-colors cursor-pointer text-slate-800"><Plus className="h-4 w-4" /></button>
          <button className="p-3 hover:bg-slate-100 transition-colors cursor-pointer text-slate-800"><Minus className="h-4 w-4" /></button>
        </div>
        <button className="bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-2xl shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer">
          <Layers className="h-4 w-4" />
        </button>
      </div>

      {/* Toggled Outbreak Detail Card */}
      {isDetailCardOpen && (
        <div className="absolute top-24 left-4 md:left-8 z-30 w-full max-w-sm">
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-2xl p-5 overflow-hidden relative">
            <button 
              onClick={handleToggleDetailCard}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-[9px] font-mono font-black uppercase tracking-wider">
                Critical Alert
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-400">ID: SURV-2024-0012</span>
            </div>
            <h3 className="font-display font-extrabold text-lg text-slate-950 leading-snug mb-1">Avian Influenza (H5N1)</h3>
            <p className="text-slate-500 text-xs flex items-center gap-1 font-medium mb-4">
              <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" /> Geneva Wetlands, Switzerland
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Species Affected</p>
                <p className="font-display font-bold text-xs text-slate-800 mt-0.5">Migratory Birds</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Date Detected</p>
                <p className="font-display font-bold text-xs text-slate-800 mt-0.5">24 Oct 2024</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end text-[10px] font-mono">
                <p className="font-bold text-slate-400 uppercase tracking-wider">7-Day Incidence Trend</p>
                <p className="text-red-600 font-extrabold">+12% vs LW</p>
              </div>
              <div className="h-16 w-full flex items-end gap-1.5 px-1.5 pt-4">
                <div className="flex-1 bg-slate-200 rounded-t h-[40%]"></div>
                <div className="flex-1 bg-slate-200 rounded-t h-[35%]"></div>
                <div className="flex-1 bg-slate-200 rounded-t h-[50%]"></div>
                <div className="flex-1 bg-slate-200 rounded-t h-[45%]"></div>
                <div className="flex-1 bg-red-100 rounded-t h-[70%]"></div>
                <div className="flex-1 bg-red-200 rounded-t h-[85%]"></div>
                <div className="flex-1 bg-red-600 rounded-t h-[100%]"></div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-blue-800 text-white py-3 rounded-2xl font-display font-bold text-xs hover:bg-blue-900 shadow-md transition-colors cursor-pointer">
                Mobilize Team
              </button>
              <button className="w-12 h-12 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Layer and filter bar toolbar at the bottom above sheet/navigation */}
      <div className="absolute bottom-24 left-0 right-0 px-4 md:px-8 z-30 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/50 p-2 rounded-2xl shadow-xl flex items-center gap-4 overflow-x-auto max-w-fit mx-auto md:mx-0 pointer-events-auto">
          <div className="flex items-center gap-1.5 border-r border-slate-200 pr-4 mr-2">
            <SlidersHorizontal className="h-4 w-4 text-blue-600 shrink-0" />
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">FILTERS:</span>
          </div>
          <div className="flex gap-1.5">
            {['All Diseases', 'Avian (Birds)', 'Last 30 Days', 'High Risk Only'].map((filt) => (
              <button 
                key={filt}
                onClick={() => setActiveFilter(filt)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold font-display transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === filt
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-150'
                }`}
              >
                {filt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Collapsible statistics bottom sheet (above navigation bar) */}
      <div className={`fixed bottom-0 left-0 md:left-72 right-0 z-40 bg-white border-t border-slate-100 rounded-t-[32px] shadow-[0_-8px_24px_rgba(0,0,0,0.06)] transition-all duration-400 ${
        isBottomSheetExpanded ? 'translate-y-0 h-96' : 'translate-y-[calc(100%-64px)] h-96'
      }`}>
        
        {/* Handlebar toggler */}
        <div 
          onClick={handleToggleBottomSheet}
          className="w-full h-16 flex items-center justify-between px-6 md:px-8 cursor-pointer hover:bg-slate-50 transition-colors relative"
        >
          <div className="w-12 h-1 bg-slate-300 rounded-full absolute left-1/2 -translate-x-1/2 top-3"></div>
          
          <div className="flex items-center gap-2.5">
            <MapPin className="h-5 w-5 text-blue-600 shrink-0 animate-bounce" />
            <p className="font-display font-extrabold text-sm text-slate-900 uppercase tracking-wider">Selected Area Statistics</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-red-600"></span>
              <span className="text-xs font-bold text-slate-600">3 Critical Areas</span>
              <span className="flex h-2 w-2 rounded-full bg-amber-500 ml-2 pulse-yellow"></span>
              <span className="text-xs font-bold text-slate-600">12 Warning Signals</span>
            </div>
            {isBottomSheetExpanded ? (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            )}
          </div>
        </div>

        {/* Bottom sheet expand container metrics */}
        <div className="p-6 md:p-8 h-[calc(100%-64px)] overflow-y-auto bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
            
            {/* Human Health card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">HUMAN HEALTH</span>
              </div>
              <div>
                <p className="text-4xl font-display font-black text-slate-900 leading-none mb-2">08</p>
                <p className="text-slate-500 text-xs leading-relaxed">Confirmed spillover cases in sector A-4 wetlands zone.</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold">
                <span className="text-red-600">ACTIVE SIGNAL</span>
                <span className="text-slate-400">UPDATED 2H AGO</span>
              </div>
            </div>

            {/* Animal Health card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
                  <Activity className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">ANIMAL HEALTH</span>
              </div>
              <div>
                <p className="text-4xl font-display font-black text-slate-900 leading-none mb-2">142</p>
                <p className="text-slate-500 text-xs leading-relaxed">Active migratory and wild avian mortality alerts.</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold">
                <span className="text-red-600">+14% WEEK-OVER-WEEK</span>
                <span className="text-slate-400">UPDATED 15M AGO</span>
              </div>
            </div>

            {/* Environmental card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Droplet className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">ENVIRONMENTAL</span>
              </div>
              <div>
                <p className="text-4xl font-display font-black text-slate-900 leading-none mb-2">03</p>
                <p className="text-slate-500 text-xs leading-relaxed">Local aquifer testing sites showing elevated nitrate levels.</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold">
                <span className="text-emerald-600">STABLE MONITORING</span>
                <span className="text-slate-400">UPDATED 1H AGO</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

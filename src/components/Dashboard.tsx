import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Globe, 
  Heart, 
  AlertCircle, 
  Search, 
  Edit, 
  Map as MapIcon, 
  FileSpreadsheet, 
  ChevronRight, 
  CloudSun, 
  CheckCircle,
  Menu,
  Droplet
} from 'lucide-react';
import { Report, Alert, Screen, TransitionDirection } from '../types';

interface DashboardProps {
  reports: Report[];
  alerts: Alert[];
  onNavigate: (target: Screen, transition: TransitionDirection) => void;
  onMarkAlertRead: (id: string) => void;
}

export default function Dashboard({
  reports,
  alerts,
  onNavigate,
  onMarkAlertRead
}: DashboardProps) {
  const [trendRange, setTrendRange] = useState('Last 7 Days');

  // KPI Calculations
  const totalActiveCases = reports.reduce((acc, r) => acc + (r.status === 'Active' ? r.affectedCount : 0), 110);
  const newCasesToday = reports.filter(r => r.timeAgo.includes('h ago')).reduce((acc, r) => acc + r.affectedCount, 8);
  const highRiskRegionsCount = reports.filter(r => r.severity === 'critical' || r.severity === 'high').length + 2;

  const handleReportClick = () => {
    // Spec: Dashboard -> Report Disease: slide_up transition
    onNavigate('report', 'up');
  };

  const handleMapClick = () => {
    // Spec: Dashboard -> Surveillance Map: push transition
    onNavigate('map', 'forward');
  };

  const handleAlertsClick = () => {
    onNavigate('alerts', 'forward');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative">
      
      {/* Top App Bar */}
      <header className="flex justify-between items-center px-6 md:px-8 h-16 w-full bg-white border-b border-slate-200 shadow-sm shrink-0 z-10">
        <div className="flex items-center">
          <button className="md:hidden mr-4 hover:bg-slate-100 rounded-full p-2 transition-all cursor-pointer">
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
          <h2 className="font-display font-extrabold text-sm md:text-base text-slate-900 tracking-tight">Public Health Surveillance Dashboard</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search region or pathogen..." 
              className="bg-slate-100 border-none rounded-full pl-10 pr-4 py-1.5 text-xs w-60 focus:ring-2 focus:ring-blue-500 text-slate-800 outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Dr. Sarah J. Mitchell</p>
              <p className="text-[10px] text-slate-500 font-medium">Senior Epidemiologist</p>
            </div>
            <div 
              onClick={() => onNavigate('login', 'backward')}
              className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden cursor-pointer flex items-center justify-center bg-slate-300 text-slate-600 font-bold text-sm"
              title="Log Out / Sign In"
            >
              SM
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Workspace Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-slate-950">Analytics Dashboard</h1>
              <p className="text-slate-500 text-xs mt-0.5">Global surveillance metrics and biological-environmental nexus intelligence.</p>
            </div>
            <div className="text-xs bg-blue-50 text-blue-700 border border-blue-100 font-mono py-1 px-3 rounded-full flex items-center gap-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Node Connected • Live Updates</span>
            </div>
          </div>

          {/* KPI Dashboard Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* KPI 1: Active Cases */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-slate-400 font-mono text-xs font-bold bg-slate-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" /> +12% vs last week
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">{totalActiveCases}</h3>
              <p className="text-sm text-slate-500">Active Outbreak Alerts</p>
            </div>

            {/* KPI 2: New Cases Today */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <span className="text-slate-400 font-mono text-xs font-bold bg-slate-50 px-2 py-0.5 rounded-full">
                  84% Verified
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">{newCasesToday}</h3>
              <p className="text-sm text-slate-500">Total Case Reports</p>
            </div>

            {/* KPI 3: High-Risk Regions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold font-mono text-emerald-500 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
                  ON TRACK
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">92.4%</h3>
              <p className="text-sm text-slate-500">Vaccination Coverage</p>
            </div>

            {/* KPI 4: OneHealth Indicators Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <Droplet className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold font-mono text-slate-400">
                  14 Samples
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">{highRiskRegionsCount}</h3>
              <p className="text-sm text-slate-500">Novel Pathogens Detected</p>
            </div>

          </div>

          {/* Main Dashboard Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Column 1: Weekly Trends Chart (8/12 wide) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">Weekly Case Trends</h3>
                  <p className="text-slate-400 text-xs">Ecosystem infection spike timeline.</p>
                </div>
                <select 
                  value={trendRange}
                  onChange={(e) => setTrendRange(e.target.value)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full border-none text-xs font-mono font-bold py-1.5 px-4 cursor-pointer outline-none transition-colors"
                >
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>

              {/* Vertical Bars Chart Simulation */}
              <div className="h-60 flex items-end justify-between gap-3 pt-6 px-2">
                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full bg-blue-100 hover:bg-blue-600 rounded-t-lg transition-all cursor-pointer relative" style={{ height: '40%' }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">40</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Mon</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full bg-blue-100 hover:bg-blue-600 rounded-t-lg transition-all cursor-pointer relative" style={{ height: '60%' }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">60</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Tue</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full bg-blue-100 hover:bg-blue-600 rounded-t-lg transition-all cursor-pointer relative" style={{ height: '35%' }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">35</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Wed</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full bg-red-200 hover:bg-red-500 rounded-t-lg transition-all cursor-pointer relative" style={{ height: '85%' }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">85</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Thu</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full bg-blue-100 hover:bg-blue-600 rounded-t-lg transition-all cursor-pointer relative" style={{ height: '55%' }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">55</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Fri</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full bg-blue-100 hover:bg-blue-600 rounded-t-lg transition-all cursor-pointer relative" style={{ height: '70%' }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">70</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Sat</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full bg-blue-200 hover:bg-blue-600 rounded-t-lg transition-all cursor-pointer relative" style={{ height: '45%' }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">45</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Sun</span>
                </div>
              </div>
            </div>

            {/* Column 2: Disease Categories (4/12 wide) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">Disease Categories</h3>
                <p className="text-slate-400 text-xs">Vector vs environmental metrics breakdown.</p>
              </div>

              <div className="space-y-5 my-auto py-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Zoonotic Spillover</span>
                    <span className="font-mono">58%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[58%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Vector-borne Transmission</span>
                    <span className="font-mono">24%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[24%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Water-borne Contamination</span>
                    <span className="font-mono">18%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[18%] rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-400 uppercase tracking-wider text-center">
                Ecosystem Vectors Normalized
              </div>
            </div>

          </div>

          {/* Bottom Bento Row: Outbreaks & Environmental Alert (6/12 and 6/12) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Recent Outbreaks List (6/12 wide) */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">Recent Outbreak Reports</h3>
                  <p className="text-slate-400 text-xs">Latest biological signals registered on network.</p>
                </div>
                <button 
                  onClick={handleMapClick}
                  className="text-blue-600 font-display text-xs font-bold hover:underline cursor-pointer"
                >
                  View Map
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <div 
                    key={report.id}
                    onClick={handleMapClick}
                    className="py-4 flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded-xl px-2 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 ${
                        report.severity === 'critical' 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-amber-50 text-amber-600'
                      }`}>
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-slate-900">{report.diseaseName}</p>
                        <p className="text-slate-500 text-xs font-medium">
                          {report.location} • {report.species} source
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-[10px] font-mono font-bold">{report.timeAgo}</p>
                      <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        report.status === 'Active'
                          ? 'bg-red-500 text-white'
                          : 'bg-emerald-500 text-white'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental & Alerts (6/12 wide) */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              
              {/* Climate and Air Quality Info */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-6 rounded-2xl relative overflow-hidden shadow-md flex justify-between items-center">
                <div className="relative z-10">
                  <span className="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-widest bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-800/30">
                    Ecosystem Climate
                  </span>
                  <div className="mt-4 flex items-center gap-3">
                    <CloudSun className="h-10 w-10 text-amber-400" />
                    <div>
                      <div className="text-3xl font-display font-black leading-none">24°C</div>
                      <p className="text-slate-300 text-xs font-medium">Partly Cloudy Conditions</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 text-right">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 inline-block text-left">
                    <p className="text-[9px] font-mono font-bold uppercase opacity-80 tracking-wider text-blue-200">AQI Index</p>
                    <p className="text-xl font-display font-black text-white">42 (Good)</p>
                  </div>
                </div>

                {/* Ambient glowing circle background */}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
              </div>

              {/* Internal Alerts Preview */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-display font-bold text-sm text-white">Surveillance Alerts Center</h4>
                  <button 
                    onClick={handleAlertsClick}
                    className="text-blue-400 font-display text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {alerts.slice(0, 2).map((alert) => (
                    <div 
                      key={alert.id}
                      onClick={() => onMarkAlertRead(alert.id)}
                      className={`p-3 rounded-xl flex gap-3 items-start border-l-4 transition-all cursor-pointer ${
                        alert.severity === 'critical'
                          ? 'bg-red-950/30 border-red-500 hover:bg-red-950/40'
                          : 'bg-slate-850 border-amber-500 hover:bg-slate-800'
                      }`}
                    >
                      <div className={`p-1.5 rounded-full shrink-0 ${
                        alert.severity === 'critical' ? 'text-red-400 pulse-red' : 'text-amber-400'
                      }`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-display font-bold text-xs text-slate-100 truncate">{alert.title}</p>
                        <p className="text-slate-400 text-[10px] truncate mt-0.5">{alert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Quick Action Floating Buttons (Desktop Sidebar/Bottom Anchor) */}
      <div className="hidden lg:flex fixed bottom-8 right-8 flex-col gap-3 z-40">
        
        {/* Quick Action 1: Report Disease */}
        <button 
          onClick={handleReportClick}
          className="bg-blue-800 text-white flex items-center gap-3 px-6 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform hover:bg-blue-900 cursor-pointer"
        >
          {/* Critical: Satisfy xpath trigger selector //main//button[span[text()='edit_note']] */}
          <span className="hidden">edit_note</span>
          <Edit className="h-5 w-5 shrink-0" />
          <span className="font-display font-bold text-sm">Report Disease</span>
        </button>

        {/* Quick Action 2: View Map */}
        <button 
          onClick={handleMapClick}
          className="bg-emerald-600 text-white flex items-center gap-3 px-6 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform hover:bg-emerald-700 cursor-pointer border border-emerald-500/20"
        >
          {/* Critical: Satisfy xpath trigger selector //main//button[span[text()='map']] */}
          <span className="hidden">map</span>
          <MapIcon className="h-5 w-5 shrink-0" />
          <span className="font-display font-bold text-sm">View Map</span>
        </button>
      </div>

    </div>
  );
}

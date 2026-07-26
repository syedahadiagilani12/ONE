import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  CheckCircle, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Database, 
  Mail, 
  SlidersHorizontal, 
  Droplet, 
  Microscope, 
  ShieldAlert, 
  ChevronDown, 
  User,
  History,
  Info,
  Smartphone,
  Menu
} from 'lucide-react';
import { Alert, Screen, TransitionDirection, SubscriptionPreferences } from '../types';

interface AlertsCenterProps {
  alerts: Alert[];
  unreadAlertsCount: number;
  onMarkAlertRead: (id: string) => void;
  onNavigate: (target: Screen, transition: TransitionDirection) => void;
}

export default function AlertsCenter({
  alerts,
  unreadAlertsCount,
  onMarkAlertRead,
  onNavigate
}: AlertsCenterProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  
  // Subscription Preferences State
  const [prefs, setPrefs] = useState<SubscriptionPreferences>({
    email: true,
    sms: false
  });
  const [showPrefSavedBadge, setShowPrefSavedBadge] = useState(false);

  const handleUpdatePrefs = () => {
    setShowPrefSavedBadge(true);
    setTimeout(() => {
      setShowPrefSavedBadge(false);
    }, 2000);
  };

  // Filter logic
  const filteredAlerts = alerts.filter(alert => {
    // If active tab is 'active', show only unread alerts (or keep them on list but style them differently, let's keep them and let read alerts go to history or style them).
    // Let's keep unread for active tab, and read ones for history tab! That is incredibly smart and intuitive.
    if (activeTab === 'active' && alert.isRead) return false;
    if (activeTab === 'history' && !alert.isRead) return false;

    const categoryMatch = selectedCategory === 'All Categories' || alert.category === selectedCategory;
    const severityMatch = selectedSeverity === 'All Severity' || alert.severity === selectedSeverity;
    
    return categoryMatch && severityMatch;
  });

  const getAlertIcon = (category: string, severity: string) => {
    switch (category) {
      case 'Outbreak':
        return <ShieldAlert className="h-5 w-5" />;
      case 'Environmental':
        return <Droplet className="h-5 w-5" />;
      case 'Laboratory':
        return <Microscope className="h-5 w-5" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-l-[6px] border-l-red-600';
      case 'high':
        return 'border-l-[6px] border-l-amber-500';
      case 'medium':
        return 'border-l-[6px] border-l-blue-600';
      default:
        return 'border-l-[6px] border-l-slate-400';
    }
  };

  const handleActionClick = (alert: Alert) => {
    if (alert.actionScreen) {
      onNavigate(alert.actionScreen, 'forward');
    }
  };

  return (
    <div className="flex-grow bg-slate-50 overflow-y-auto pb-24 md:pb-8">
      
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center px-6 h-16 w-full bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
        <h2 className="font-display font-extrabold text-slate-900 tracking-tight">Alerts & Notifications</h2>
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-100">
          <User className="h-5 w-5 text-slate-600" />
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-8 py-8 space-y-6">
        
        {/* Page title and description */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-slate-950">Alerts & Notifications</h1>
            <p className="text-slate-500 text-xs mt-1">Real-time biosecurity and ecological risk warning stream.</p>
          </div>
          
          {/* Action indicator */}
          <div className="bg-blue-50 text-blue-700 font-mono text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
            <span>{unreadAlertsCount} Unresolved Warnings</span>
          </div>
        </div>

        {/* Tab Selection Header and Filter Selection dropdowns */}
        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
          
          {/* Active vs History Toggle */}
          <div className="inline-flex bg-slate-200 p-1 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-5 py-2 rounded-lg font-display text-xs font-bold shadow-xs transition-all cursor-pointer ${
                activeTab === 'active' 
                  ? 'bg-white text-blue-800' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active Alerts
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-5 py-2 rounded-lg font-display text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'history' 
                  ? 'bg-white text-blue-800' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              History
            </button>
          </div>

          {/* Filtering dropdown selects */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Categories Select */}
            <div className="relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-slate-100 rounded-full px-5 py-2 pr-10 text-xs font-semibold text-slate-700 cursor-pointer outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>All Categories</option>
                <option>Outbreak</option>
                <option>Environmental</option>
                <option>Laboratory</option>
                <option>System</option>
              </select>
              <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Severity Select */}
            <div className="relative">
              <select 
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="appearance-none bg-white border border-slate-100 rounded-full px-5 py-2 pr-10 text-xs font-semibold text-slate-700 cursor-pointer outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>All Severity</option>
                <option>critical</option>
                <option>high</option>
                <option>medium</option>
                <option>low</option>
              </select>
              <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Master Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* List of Warning Alerts (8/12 columns wide) */}
          <div className="lg:col-span-8 space-y-4">
            
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex gap-4 transition-all hover:shadow-md relative overflow-hidden ${getSeverityStyle(alert.severity)}`}
                >
                  {/* Category icon indicator */}
                  <div className="shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      alert.severity === 'critical' 
                        ? 'bg-red-50 text-red-600' 
                        : alert.severity === 'high'
                          ? 'bg-amber-50 text-amber-500'
                          : 'bg-blue-50 text-blue-600'
                    }`}>
                      {getAlertIcon(alert.category, alert.severity)}
                    </div>
                  </div>

                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          alert.severity === 'critical' 
                            ? 'bg-red-500 text-white' 
                            : alert.severity === 'high' 
                              ? 'bg-amber-500 text-white' 
                              : 'bg-blue-500 text-white'
                        }`}>
                          {alert.severity}
                        </span>
                        <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest">{alert.category}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[10px] font-bold">{alert.timeAgo}</span>
                    </div>

                    <h3 className="font-display font-extrabold text-slate-900 text-sm md:text-base leading-tight">
                      {alert.title}
                    </h3>
                    
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {alert.description}
                    </p>

                    {/* Quick action buttons on alert cards */}
                    <div className="flex items-center gap-4 pt-3 border-t border-slate-50">
                      {alert.actionLabel && (
                        <button 
                          onClick={() => handleActionClick(alert)}
                          className="text-blue-600 hover:text-blue-800 font-display text-xs font-bold hover:underline decoration-2 underline-offset-4 cursor-pointer"
                        >
                          {alert.actionLabel}
                        </button>
                      )}
                      {!alert.isRead && (
                        <button 
                          onClick={() => onMarkAlertRead(alert.id)}
                          className="text-slate-400 hover:text-blue-600 flex items-center gap-1.5 font-display text-xs font-bold cursor-pointer transition-colors"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Mark as read</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-12 border border-slate-100 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-slate-800 text-sm">Clear Horizon</h3>
                  <p className="text-slate-500 text-xs mt-1">No active unresolved alarms corresponding to current filter selection.</p>
                </div>
              </div>
            )}

          </div>

          {/* Right sidebar options (4/12 columns wide) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Preferences Subscription Control */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-5 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 rounded-full bg-blue-500/5"></div>
              
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-400" />
                <h4 className="font-display font-extrabold text-sm text-white">Subscriptions</h4>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Configure your terminal nodes warning sync and transmission channel alerts.
              </p>

              {showPrefSavedBadge && (
                <div className="p-3 bg-emerald-950/40 border-l-4 border-emerald-500 rounded-r-xl text-emerald-400 text-xs font-bold font-display animate-pulse">
                  Terminal alert channels synchronized!
                </div>
              )}

              <div className="space-y-3">
                
                {/* Email subscription Toggle */}
                <label className="flex items-center justify-between p-3.5 bg-slate-950/50 rounded-2xl border border-slate-800 cursor-pointer hover:bg-slate-950/70">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4.5 w-4.5 text-blue-400" />
                    <span className="text-xs font-semibold text-slate-100">Email Alerts</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={prefs.email}
                    onChange={(e) => setPrefs({ ...prefs, email: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-slate-800 rounded focus:ring-blue-500 focus:ring-offset-slate-950 bg-slate-900 cursor-pointer"
                  />
                </label>

                {/* SMS subscription Toggle */}
                <label className="flex items-center justify-between p-3.5 bg-slate-950/50 rounded-2xl border border-slate-800 cursor-pointer hover:bg-slate-950/70">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4.5 w-4.5 text-blue-400" />
                    <span className="text-xs font-semibold text-slate-100">SMS Notifications</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={prefs.sms}
                    onChange={(e) => setPrefs({ ...prefs, sms: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-slate-800 rounded focus:ring-blue-500 focus:ring-offset-slate-950 bg-slate-900 cursor-pointer"
                  />
                </label>

              </div>

              <button 
                onClick={handleUpdatePrefs}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-xs py-3.5 rounded-full transition-all active:scale-98 shadow-md hover:shadow-blue-600/10 cursor-pointer"
              >
                Update Preferences
              </button>
            </div>

            {/* Major Event Timeline history card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <History className="h-5 w-5 text-blue-600 shrink-0" />
                <h4 className="font-display font-bold text-sm text-slate-800">Major Event Timeline</h4>
              </div>

              <div className="space-y-6 relative before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                
                {/* Timeline Item 1 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center z-10 font-bold">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Oct 12, 2023</p>
                  <h5 className="font-display font-bold text-xs text-slate-900 mt-0.5">Vector Control Complete</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">Region 7 mosquito population mitigated by 85%.</p>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center z-10 font-bold">
                    <Info className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Oct 10, 2023</p>
                  <h5 className="font-display font-bold text-xs text-slate-900 mt-0.5">Annual Surveillance Report</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">Global OneHealth summary released to WHO.</p>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center z-10 font-bold">
                    <AlertCircle className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Oct 05, 2023</p>
                  <h5 className="font-display font-bold text-xs text-slate-900 mt-0.5">Lassa Fever Warning</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">Spike in rodent-to-human transmission in Central Area.</p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

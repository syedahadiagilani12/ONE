import React, { useState } from 'react';
import { 
  Check, 
  MapPin, 
  Upload, 
  FileText, 
  Plus, 
  User, 
  Database, 
  Thermometer, 
  CloudRain, 
  Droplet, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { Report, Screen, TransitionDirection } from '../types';

interface ReportFormProps {
  onAddReport: (report: Omit<Report, 'id' | 'timeAgo' | 'status'>) => void;
  onNavigate: (target: Screen, transition: TransitionDirection) => void;
}

export default function ReportForm({ onAddReport, onNavigate }: ReportFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Disease Info
  const [diseaseName, setDiseaseName] = useState('');
  const [species, setSpecies] = useState<'human' | 'livestock' | 'wildlife' | 'poultry' | 'other'>('human');
  const [affectedCount, setAffectedCount] = useState(1);
  const [severity, setSeverity] = useState<'low' | 'moderate' | 'high' | 'critical'>('moderate');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Fever']);
  const [customSymptom, setCustomSymptom] = useState('');
  const [showCustomSymptomModal, setShowCustomSymptomModal] = useState(false);

  // Step 2: Environment
  const [ambientTemp, setAmbientTemp] = useState(24);
  const [weeklyRainfall, setWeeklyRainfall] = useState(12);
  const [waterQuality, setWaterQuality] = useState(5); // Out of 10
  const [labStatus, setLabStatus] = useState<'pending' | 'transit' | 'confirmed'>('pending');

  // Step 3: Reporter
  const [reporterName, setReporterName] = useState('Dr. Sarah Chen');
  const [orgId, setOrgId] = useState('WHO-AFRO-2024-X');
  const [notes, setNotes] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string }[]>([
    { name: 'specimen_A1.jpg', size: '4.2 MB' }
  ]);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleAddCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms([...selectedSymptoms, customSymptom.trim()]);
      setCustomSymptom('');
      setShowCustomSymptomModal(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add default values for unspecified/simulated data
    onAddReport({
      diseaseName: diseaseName || 'Undefined Fever Cluster',
      species,
      affectedCount: Number(affectedCount) || 1,
      severity,
      symptoms: selectedSymptoms,
      location: 'Central Sector Node, Geneva Wetlands',
      gps: { lat: 46.2044, lng: 6.1432 },
      envMetrics: {
        temp: ambientTemp,
        rainfall: weeklyRainfall,
        waterQuality
      },
      labStatus,
      reporter: reporterName,
      orgId,
      notes: notes || 'Submitted via secure node terminal.'
    });

    // Navigate back to Dashboard with slide transition
    onNavigate('dashboard', 'backward');
  };

  const symptomsList = ['Fever', 'Respiratory Distress', 'Lesions', 'Sudden Death', 'Loss of Appetite'];

  return (
    <div className="flex-grow bg-slate-50 overflow-y-auto pb-24 md:pb-8">
      
      {/* Header and top branding */}
      <header className="md:hidden flex justify-between items-center px-6 h-16 w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <h2 className="font-display font-extrabold text-blue-900 tracking-tight">OneHealth</h2>
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
          <User className="h-5 w-5 text-slate-600" />
        </div>
      </header>

      <div className="max-w-[900px] mx-auto w-full px-6 md:px-8 py-8">
        
        {/* Screen Intro & Stepper Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="font-display text-2xl font-extrabold text-slate-950">New Disease Surveillance Report</h1>
          <p className="text-slate-500 text-sm mt-1">Securely document and transmit biological-environmental surveillance data to the central database.</p>
          
          {/* Multi-step progress tracker */}
          <div className="relative flex items-center justify-between max-w-2xl mx-auto md:mx-0 mt-8">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
            
            {/* Step 1 Node */}
            <div 
              onClick={() => setCurrentStep(1)} 
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-sm ${
                currentStep > 1 
                  ? 'bg-emerald-600 text-white' 
                  : currentStep === 1 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 text-slate-500'
              }`}>
                {currentStep > 1 ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                currentStep === 1 ? 'text-blue-600' : currentStep > 1 ? 'text-emerald-600' : 'text-slate-400'
              }`}>
                Disease Info
              </span>
            </div>

            {/* Step 2 Node */}
            <div 
              onClick={() => setCurrentStep(2)} 
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-sm ${
                currentStep > 2 
                  ? 'bg-emerald-600 text-white' 
                  : currentStep === 2 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 text-slate-500'
              }`}>
                {currentStep > 2 ? <Check className="h-5 w-5" /> : '2'}
              </div>
              <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                currentStep === 2 ? 'text-blue-600' : currentStep > 2 ? 'text-emerald-600' : 'text-slate-400'
              }`}>
                Environment
              </span>
            </div>

            {/* Step 3 Node */}
            <div 
              onClick={() => setCurrentStep(3)} 
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-sm ${
                currentStep === 3 
                  ? 'bg-blue-600 text-white animate-pulse' 
                  : 'bg-slate-200 text-slate-500'
              }`}>
                '3'
              </div>
              <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                currentStep === 3 ? 'text-blue-600' : 'text-slate-400'
              }`}>
                Reporter
              </span>
            </div>

          </div>
        </div>

        {/* Wizard Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
          
          {/* Step 1 content: Disease Info */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Disease Name input */}
                <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider">
                    Disease Name / Symptom Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Avian Influenza, Unknown Fever"
                    value={diseaseName}
                    onChange={(e) => setDiseaseName(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 px-4 py-3 outline-none transition-all font-medium text-slate-900"
                  />
                </div>

                {/* Affected Count */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider">
                    Affected Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Number of cases"
                    value={affectedCount}
                    onChange={(e) => setAffectedCount(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 px-4 py-3 outline-none transition-all font-medium text-slate-900"
                  />
                </div>

                {/* Target Species / Segmented Control */}
                <div className="col-span-2 flex flex-col gap-3">
                  <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider">
                    Target Species / Population
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(['human', 'livestock', 'wildlife', 'poultry', 'other'] as const).map((sp) => (
                      <button
                        key={sp}
                        type="button"
                        onClick={() => setSpecies(sp)}
                        className={`py-3 px-4 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all active:scale-98 cursor-pointer capitalize ${
                          species === sp
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md font-bold'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase tracking-wider">{sp}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Severity Level selection */}
                <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider">
                    Severity Level
                  </label>
                  <select
                    value={severity}
                    onChange={(e: any) => setSeverity(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 px-4 py-3 outline-none transition-all font-medium text-slate-900 appearance-none"
                  >
                    <option value="low">Low (Stable)</option>
                    <option value="moderate">Moderate (Monitoring)</option>
                    <option value="high">High (Urgent)</option>
                    <option value="critical">Critical (Immediate Outbreak Response)</option>
                  </select>
                </div>

                {/* Observed Symptoms List */}
                <div className="col-span-2 flex flex-col gap-3 pt-2">
                  <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider">
                    Observed Symptoms
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {symptomsList.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom);
                      return (
                        <button
                          key={symptom}
                          type="button"
                          onClick={() => toggleSymptom(symptom)}
                          className={`px-4 py-2 rounded-full border text-xs font-bold font-display transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                          }`}
                        >
                          {symptom}
                        </button>
                      );
                    })}
                    
                    {/* Trigger Custom Symptom dialog */}
                    <button
                      type="button"
                      onClick={() => setShowCustomSymptomModal(true)}
                      className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-blue-700 font-display text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Custom</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Step 2 content: Environmental Indicators */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" /> Incident Location
                </label>
                
                {/* Simulated interactive map preview */}
                <div className="h-64 w-full rounded-2xl overflow-hidden relative border border-slate-200 bg-slate-950">
                  <img
                    className="w-full h-full object-cover opacity-80"
                    alt="Surveillance location map satellite overview"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjwk3qqUaNmpGozI7dsdMIIut4Xn-qOZfs5uSHbT1-0yk13NnSYtPUXVmR0hDi7fXjjclRJWtPbx73M_6XXOhdHgNsKzgfiJkZNbGv96Gi2-e3G3UDS4B-ybgFDwdMcn_pbBqHuBGq1YHpu58JTl_vgDATRL7s7Sepo3tkvb_yz3QdFz-Gm25iIJC17EL6oVcufqpUgPsblNGv2MGt7N4JocllpB-7P46ngvR7ojxzOYbdE7wV65w"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-red-600 pulse-red border-2 border-white"></span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 text-slate-800 text-[10px] font-mono px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2 shadow-sm font-bold">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" /> Lat: -1.2921 • Lng: 36.8219
                  </div>
                </div>
              </div>

              {/* Environmental metrics sliders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700 font-display">
                    <span>Ambient Temp</span>
                    <span className="text-blue-600">{ambientTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700 font-display">
                    <span>Weekly Rainfall</span>
                    <span className="text-blue-600">{weeklyRainfall}mm</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={weeklyRainfall}
                    onChange={(e) => setWeeklyRainfall(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700 font-display">
                    <span>Water Quality</span>
                    <span className="text-blue-600">{waterQuality > 7 ? 'Excellent' : waterQuality > 4 ? 'Moderate' : 'Poor'}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={waterQuality}
                    onChange={(e) => setWaterQuality(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              {/* Laboratory status selection */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider block">
                  Laboratory Status
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['pending', 'transit', 'confirmed'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setLabStatus(st)}
                      className={`p-4 rounded-2xl border flex flex-col text-left gap-1 transition-all active:scale-98 cursor-pointer ${
                        labStatus === st
                          ? 'border-blue-600 bg-blue-50/50'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-display font-bold text-sm text-slate-900 capitalize">
                        {st === 'pending' ? 'Pending Collection' : st === 'transit' ? 'In Transit' : 'Confirmed'}
                      </span>
                      <span className="text-slate-400 text-xs">
                        {st === 'pending' 
                          ? 'Samples not yet taken' 
                          : st === 'transit' 
                            ? 'Shipped to reference lab' 
                            : 'Laboratory results attached'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 content: Reporter details */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Reporter name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider">
                    Reporting Entity
                  </label>
                  <input
                    type="text"
                    required
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 px-4 py-3 outline-none transition-all font-medium text-slate-900"
                  />
                </div>

                {/* Organization ID */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider">
                    Organization ID
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={orgId}
                    className="bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium text-slate-500 cursor-not-allowed"
                  />
                </div>

                {/* Evidence & documentation dropzone */}
                <div className="col-span-2">
                  <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider block mb-3">
                    Evidence & Documentation
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-slate-50/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform border border-blue-100">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <p className="font-display font-bold text-sm text-slate-800">Click or drag to upload files</p>
                      <p className="text-slate-400 text-xs mt-0.5">PNG, JPG, PDF (Max 20MB)</p>
                    </div>

                    {/* Pre-uploaded mockup file */}
                    {attachedFiles.length > 0 && (
                      <div className="mt-4 flex gap-4 w-full max-w-sm">
                        {attachedFiles.map((f, idx) => (
                          <div key={idx} className="flex-1 bg-slate-100 rounded-xl p-3 flex items-center justify-between relative border border-slate-200">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                              <div className="overflow-hidden">
                                <p className="text-xs font-bold text-slate-800 truncate">{f.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold">{f.size}</p>
                              </div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => setAttachedFiles([])}
                              className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                              <span className="text-xs font-bold">X</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Field Notes text area */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider">
                    Additional Field Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter any other relevant ecosystem, climate, or population observations..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 px-4 py-3 outline-none transition-all font-medium text-slate-900 resize-none"
                  />
                </div>

              </div>
            </div>
          )}

          {/* Form Action Controls */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-8">
            <div>
              <button
                type="button"
                onClick={prevStep}
                className={`w-full md:w-auto px-8 py-3 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-display font-bold text-sm active:scale-98 transition-all cursor-pointer ${
                  currentStep === 1 ? 'invisible pointer-events-none' : ''
                }`}
              >
                Back
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('dashboard', 'backward')}
                className="w-full md:w-auto px-8 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-bold text-xs cursor-pointer active:scale-98 transition-all"
              >
                Save Draft
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full md:w-auto px-10 py-3 rounded-full bg-blue-800 hover:bg-blue-900 text-white font-display font-bold text-xs cursor-pointer shadow-md hover:shadow-blue-800/10 active:scale-98 transition-all"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs cursor-pointer shadow-lg hover:shadow-emerald-600/10 active:scale-98 transition-all"
                >
                  Submit Report
                </button>
              )}
            </div>
          </div>

        </form>
      </div>

      {/* Inline Modal for custom symptoms */}
      {showCustomSymptomModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-slate-200 shadow-xl space-y-4">
            <h4 className="font-display font-extrabold text-base text-slate-900">Add Custom Symptom</h4>
            <input
              type="text"
              placeholder="e.g., Neurological Swell"
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none font-medium focus:border-blue-600 focus:bg-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCustomSymptomModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-full cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCustomSymptom}
                className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer"
              >
                Add Symptom
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

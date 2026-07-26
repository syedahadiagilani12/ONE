import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, RefreshCw, BrainCircuit, HeartHandshake } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('officer@onehealth.org');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative background blobs matching MD3/OneHealth design */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse duration-4000"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse duration-3000 delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[110px] animate-pulse duration-5000 delay-2000"></div>
      </div>

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-200">
        {/* Left Side: Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="font-display font-extrabold text-2xl text-blue-900 tracking-tight">OneHealth Surveillance</span>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-extrabold text-slate-900 mb-2">Welcome back, Health Officer</h1>
            <p className="text-slate-500 text-sm">Please enter your credentials to access the global surveillance dashboard.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium placeholder-slate-400"
                  id="email"
                  placeholder="officer@onehealth.org"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  className="block w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium placeholder-slate-400"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="text-xs font-semibold text-slate-600 cursor-pointer select-none" htmlFor="remember">
                  Remember Me
                </label>
              </div>
              <a className="text-xs font-bold text-blue-600 hover:underline" href="#forgot">
                Forgot Password?
              </a>
            </div>

            <div className="space-y-4 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-800 text-white font-display font-semibold py-4 px-8 rounded-full hover:bg-blue-900 transition-all shadow-lg hover:shadow-blue-800/10 active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-display font-semibold py-4 px-8 rounded-full transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <img
                  alt="Google Logo"
                  className="w-5 h-5 shrink-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEeLR8KiYZYj36uI0taR_vR1ico0-7fnLIPDVxhRfi0v3zjYc4QUEVk-EMMytyfRJquPGxhEry_uE7Jqphq-h3p2sWFihtZAjnk9fEh7ywtVOlK7BtqVnG61hHdjOjT798LRwBI8ImFP-fSVROxh80r0l9HoHbe-rTfYF4JJ8grRnV0HqA425qUhPKvnJx_aZguJKi-cbHIgZDs29MJlMn-VHZW8x7EIZp28acuOPXoVvh2Qjpthk"
                />
                <span>Sign in with Google</span>
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-xs">
              Don't have an account?{' '}
              <a className="text-blue-600 font-bold hover:underline" href="#request">
                Request access
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Graphic & Branding */}
        <div className="hidden lg:flex relative bg-slate-900 items-center justify-center overflow-hidden p-16 border-l border-slate-800">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-600/10"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600/10"></div>

          <div className="relative z-10 w-full max-w-lg space-y-12">
            {/* Visual illustration box matching MD3 mockup */}
            <div className="aspect-square relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-950">
              <img
                className="w-full h-full object-cover opacity-85"
                alt="OneHealth Ecosystem Surveillance Illustration"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8TNskHwCy82eWF6dgxSF7w9SE-JLq0I-HnYBs65dRNLxnGegAqE_kMOgz31qsA44kaXfTKNIGgMSuetIXvJiofsP3LEdEkiBFWK9ZUUuEV9iQQkXkUa26kNkPSoziDhuStnAd5S1ksSUh7UuMB5zRctOiJsyHgb8cpqogLbX-iJU0AO_bxLXgr6MYv9LZfTl4pDfi9EWVh1kaqpXbMlj9Fxr-dKHDLEt9aJ_BmvdU3aQjlhIg0iw"
              />

              {/* Floating Glass Indicator 1: Live Status */}
              <div className="absolute top-6 left-6 right-6 p-4 bg-slate-950/75 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-4 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">Live Status</p>
                  <p className="font-display font-bold text-sm text-white">Global Systems Stable</p>
                </div>
              </div>

              {/* Floating Glass Indicator 2: Regional Reach */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-950/75 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-4 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/20">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider">Regional Reach</p>
                  <p className="font-display font-bold text-sm text-white">194 Countries Active</p>
                </div>
              </div>
            </div>

            <div className="text-center text-slate-100 space-y-4">
              <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white">Securing the Nexus of Life</h2>
              <p className="text-slate-400 text-sm leading-relaxed px-6">
                Advanced monitoring of human-animal ecosystems to predict and prevent global health crises before they begin.
              </p>
            </div>

            {/* Small metadata badges */}
            <div className="flex justify-center gap-8 text-slate-500 font-mono text-[10px] uppercase tracking-widest font-semibold pt-4">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-blue-500" />
                <span>Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-emerald-500" />
                <span>Real-time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BrainCircuit className="h-3.5 w-3.5 text-indigo-500" />
                <span>Predictive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

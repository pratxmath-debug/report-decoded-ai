import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Sparkles, 
  RefreshCw, 
  SlidersHorizontal, 
  ArrowRight,
  TrendingUp,
  Zap,
  BookOpen
} from 'lucide-react';
import { SparkLogo, SparkWordmark } from './SparkLogo';

interface NavbarProps {
  onReset: () => void;
  onOpenSettings: () => void;
  hasActiveReport: boolean;
  isAiEnabled: boolean;
  onStartUpload?: () => void;
  onOpenComparison?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReset,
  onOpenSettings,
  hasActiveReport,
  isAiEnabled,
  onStartUpload,
  onOpenComparison
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBrandClick = () => {
    onReset();
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleUploadClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        onStartUpload?.();
      }, 50);
    } else {
      onStartUpload?.();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo & Brand Wordmark */}
          <div 
            onClick={handleBrandClick} 
            className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
            title="Spark Decoded — Return to start"
          >
            <SparkLogo size="md" className="group-hover:scale-105 transition-transform" />
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <SparkWordmark size="md" subtitle={false} />
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-800 border border-teal-200/80 rounded-full">
                  3.0
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden xl:block font-medium">
                Understand your lab report • Prepare for your next doctor's visit
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs">
            <NavLink 
              to="/"
              end
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-colors ${
                  isActive ? 'text-teal-900 bg-teal-50/80 font-black' : 'text-slate-600 hover:text-teal-700 font-bold'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/how-it-works"
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-colors ${
                  isActive ? 'text-teal-900 bg-teal-50/80 font-black' : 'text-slate-600 hover:text-teal-700 font-bold'
                }`
              }
            >
              How It Works
            </NavLink>
            <NavLink 
              to="/features"
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-colors ${
                  isActive ? 'text-teal-900 bg-teal-50/80 font-black' : 'text-slate-600 hover:text-teal-700 font-bold'
                }`
              }
            >
              Capabilities
            </NavLink>
            <NavLink 
              to="/tests"
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                  isActive ? 'text-teal-900 bg-teal-50/80 font-black' : 'text-slate-600 hover:text-teal-700 font-bold'
                }`
              }
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              <span>Medical Tests</span>
            </NavLink>
            <a 
              href="/#privacy"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3 py-1.5 rounded-xl text-slate-600 hover:text-teal-700 font-bold transition-colors cursor-pointer"
            >
              Clinical Integrity
            </a>
          </nav>

          {/* Action badges & controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Privacy indicator */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50/90 border border-slate-200/80 rounded-full text-xs text-slate-600 font-medium shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-teal-600" />
              <span>100% Client-Side</span>
            </div>

            {/* Compare Reports Quick Action (if active report) */}
            {hasActiveReport && onOpenComparison && (
              <button
                onClick={onOpenComparison}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-all cursor-pointer shadow-2xs"
                title="Compare with baseline report"
              >
                <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                <span>Compare</span>
              </button>
            )}

            {/* AI Config Indicator / Button */}
            <button
              onClick={onOpenSettings}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isAiEnabled
                  ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-900 border-teal-300 shadow-2xs hover:border-teal-400'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
              title="Configure optional Gemini AI key for educational assistance"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden sm:inline">AI Mode</span>
              {isAiEnabled && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              )}
            </button>

            {/* Decode My Report CTA (when on Landing or sub-pages) */}
            {!hasActiveReport && (
              <button
                onClick={handleUploadClick}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:from-[#0F766E] hover:to-[#0891B2] transition-all shadow-sm shadow-teal-700/20 active:scale-95 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-white text-white" />
                <span>Decode</span>
              </button>
            )}

            {/* Reset / New Report Button */}
            {hasActiveReport && (
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 transition-all shadow-2xs active:scale-95 cursor-pointer"
                title="Clear current report and start over"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">New Report</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

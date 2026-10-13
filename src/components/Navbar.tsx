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
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            title="Spark Decoded — Return to start"
          >
            <SparkLogo size="md" className="group-hover:scale-105 transition-transform" />
            <div className="flex items-center">
              <SparkWordmark size="md" subtitle={false} />
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs">
            <NavLink 
              to="/"
              end
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-colors ${
                  isActive ? 'text-[#124E4A] bg-[#E5F3ED] font-black' : 'text-[#667773] hover:text-[#124E4A] font-bold'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/how-it-works"
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-colors ${
                  isActive ? 'text-[#124E4A] bg-[#E5F3ED] font-black' : 'text-[#667773] hover:text-[#124E4A] font-bold'
                }`
              }
            >
              How It Works
            </NavLink>
            <NavLink 
              to="/features"
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-colors ${
                  isActive ? 'text-[#124E4A] bg-[#E5F3ED] font-black' : 'text-[#667773] hover:text-[#124E4A] font-bold'
                }`
              }
            >
              Features
            </NavLink>
            <NavLink 
              to="/tests"
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                  isActive ? 'text-[#124E4A] bg-[#E5F3ED] font-black' : 'text-[#667773] hover:text-[#124E4A] font-bold'
                }`
              }
            >
              <BookOpen className="w-3.5 h-3.5 text-[#287F78]" />
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
              className="px-3 py-1.5 rounded-xl text-[#667773] hover:text-[#124E4A] font-bold transition-colors cursor-pointer"
            >
              Clinical Integrity
            </a>
          </nav>

          {/* Action badges & controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Privacy indicator */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] border border-[#DCE7E3] rounded-full text-xs text-[#253532] font-medium shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-[#287F78]" />
              <span>100% Client-Side</span>
            </div>

            {/* Compare Reports Quick Action (if active report) */}
            {hasActiveReport && onOpenComparison && (
              <button
                onClick={onOpenComparison}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#E5F3ED] text-[#124E4A] border border-[#A8C8BA] hover:bg-[#D4E5DE] transition-all cursor-pointer shadow-2xs"
                title="Compare with baseline report"
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#287F78]" />
                <span>Compare</span>
              </button>
            )}

            {/* AI Config Indicator / Button */}
            <button
              onClick={onOpenSettings}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isAiEnabled
                  ? 'bg-[#E5F3ED] text-[#124E4A] border-[#A8C8BA] shadow-2xs hover:border-[#287F78]'
                  : 'bg-white text-[#667773] border-[#DCE7E3] hover:bg-[#FAF9F5] hover:border-[#A8C8BA]'
              }`}
              title="Configure optional Gemini AI key for educational assistance"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#287F78]" />
              <span className="hidden sm:inline">AI Mode</span>
              {isAiEnabled && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#287F78] animate-pulse" />
              )}
            </button>

            {/* Decode My Report CTA (when on Landing or sub-pages) */}
            {!hasActiveReport && (
              <button
                onClick={handleUploadClick}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[#124E4A] to-[#287F78] hover:from-[#0B3330] hover:to-[#1B5B56] transition-all shadow-sm shadow-teal-950/20 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
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

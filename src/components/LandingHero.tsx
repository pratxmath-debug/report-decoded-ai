import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Activity, 
  Lock,
  FileCheck2,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { SparkCore3D } from './SparkCore3D';
import { LandingSections } from './LandingSections';

interface LandingHeroProps {
  onStartUpload: () => void;
  onTrySample: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartUpload,
  onTrySample
}) => {
  return (
    <div className="relative overflow-hidden">
      
      {/* Dark Atmospheric Hero Canvas Background */}
      <div className="relative bg-gradient-to-b from-[#071426] via-[#0B192C] to-[#0F172A] text-white pt-8 pb-16 border-b border-slate-800">
        
        {/* Large Atmospheric Cyan & Teal Radial Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[680px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-10 right-10 w-[580px] h-[580px] bg-cyan-500/15 rounded-full blur-[130px] animate-pulse-subtle" />
          <div className="absolute top-28 left-4 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[120px] animate-pulse-subtle" />
          <div className="absolute -bottom-20 left-1/3 w-[620px] h-[320px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-4 pb-12">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-lg backdrop-blur-md">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span className="tracking-wide">HEALTHCARE AI • SPARK DECODED 3.0</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white">
                Understand Your Lab Reports.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-cyan-200">
                  Discover the Meaning Behind Every Number.
                </span>
              </h1>

              {/* Exact Requested Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Spark Decoded transforms complex laboratory reports into clear, understandable information. Explore what each test measures, verify extracted values against your original report, understand laboratory reference ranges, and prepare meaningful questions for your doctor.
              </p>

              {/* Three Actions (Primary, Secondary, Third) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 flex-wrap">
                <button
                  onClick={onStartUpload}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#0D9488] via-[#0F766E] to-[#06B6D4] hover:from-[#0F766E] hover:to-[#0891B2] text-white font-extrabold text-base shadow-xl shadow-cyan-950/50 hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2.5 group cursor-pointer active:scale-98"
                >
                  <Zap className="w-5 h-5 text-cyan-200 fill-cyan-300 group-hover:scale-110 transition-transform" />
                  <span>Decode My Report</span>
                  <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
                </button>

                <Link
                  to="/tests"
                  className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 shadow-md hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 backdrop-blur-md"
                >
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span>Explore Medical Tests</span>
                </Link>

                <Link
                  to="/how-it-works"
                  className="px-5 py-4 rounded-2xl text-slate-300 hover:text-white font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>See How It Works →</span>
                </Link>
              </div>

              {/* 3 Exact Trust Indicators */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Transparent reference-range comparisons</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Review and verify extracted values</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Educational information, not diagnosis</span>
                </div>
              </div>

            </div>

            {/* Right Hero Column: 3D Spark Intelligence Core Centerpiece */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <SparkCore3D onExploreDemo={onTrySample} />
            </div>

          </div>

        </div>
      </div>

      {/* Atmospheric Transition into Light Illustrated Workspace Sections */}
      <div className="relative bg-[#F8FAFC]">
        <LandingSections
          onStartUpload={onStartUpload}
          onExploreDemo={onTrySample}
        />
      </div>

    </div>
  );
};

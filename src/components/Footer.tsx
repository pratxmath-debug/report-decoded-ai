import React from 'react';
import { Link } from 'react-router-dom';
import { SparkLogo, SparkWordmark } from './SparkLogo';
import { ShieldCheck, Heart, ExternalLink, Activity, BookOpen, Layers, HelpCircle, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071426] text-white border-t border-slate-800 pt-16 pb-12 no-print relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <SparkLogo size="md" className="group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-white tracking-tight">Spark</span>
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 tracking-tight">Decoded</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                    3.0
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  Healthcare AI Platform • Team Solvyn
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Spark Decoded transforms complex laboratory reports into clear, understandable information. Compare verified results with printed reference ranges and prepare structured questions for your next doctor’s visit.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-bold">
                AAYU 2026 Hackathon
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Problem Statement T02</span>
            </div>
          </div>

          {/* Col 2: Navigation Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-wider text-slate-200 uppercase">
              Platform Pages
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span>Home & Decoder</span>
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-400" />
                  <span>Platform Features</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>How It Works</span>
                </Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Medical Test Explorer</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Integrity & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-wider text-slate-200 uppercase">
              Clinical Integrity
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Client-Side OCR Processing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Deterministic Arithmetic Rules</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Printed Lab Interval Matching</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Zero Patient Health Storage</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Medical Knowledge Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-wider text-slate-200 uppercase">
              Accredited Sources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-slate-300 font-semibold block">ADLM / Lab Tests Online</span>
                <span className="text-[11px] text-slate-500">Diagnostic Clinical Chemistry</span>
              </li>
              <li>
                <span className="text-slate-300 font-semibold block">Mayo Clinic Laboratories</span>
                <span className="text-[11px] text-slate-500">Test Directory Guidelines</span>
              </li>
              <li>
                <span className="text-slate-300 font-semibold block">NIH National Library of Medicine</span>
                <span className="text-[11px] text-slate-500">MedlinePlus Clinical Database</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Medical Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="max-w-2xl leading-relaxed">
            <p>
              <strong className="text-slate-300">Important Medical Disclaimer:</strong> Spark Decoded is an educational and communication aid designed to help patients understand laboratory parameters and prepare for clinic appointments. It does not provide medical diagnoses, clinical staging, treatment recommendations, or medication prescriptions. Always consult a qualified healthcare provider regarding individual test interpretations.
            </p>
          </div>

          <div className="text-center md:text-right shrink-0">
            <p className="text-slate-400 font-medium">
              © 2026 <strong className="text-slate-200">Team Solvyn</strong> • AAYU Hackathon
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Spark Decoded 3.0 Platform
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

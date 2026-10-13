import React from 'react';
import { Link } from 'react-router-dom';
import { SparkLogo, SparkWordmark } from './SparkLogo';
import { ShieldCheck, Heart, ExternalLink, Activity, BookOpen, Layers, HelpCircle, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#124E4A] text-white border-t border-[#1B5B56] pt-16 pb-12 no-print relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#287F78]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#A8C8BA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1B5B56]">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <SparkLogo size="md" className="group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-white tracking-tight">Spark</span>
                  <span className="text-xl font-black text-[#A8C8BA] tracking-tight">Decoded</span>
                </div>
                <span className="text-xs text-[#D4E5DE] font-medium">
                  Healthcare AI Platform • Team Solvyn
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#E5F3ED] leading-relaxed max-w-sm">
              Spark Decoded transforms complex laboratory reports into clear, understandable information. Compare verified results with printed reference ranges and prepare structured questions for your next doctor’s visit.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D4E5DE] pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-[#0E3E3B] border border-[#1B5B56] text-[#A8C8BA] font-bold">
                AAYU 2026 Hackathon
              </span>
              <span className="text-[#A8C8BA]/60">•</span>
              <span className="text-[#E5F3ED]">Problem Statement T02</span>
            </div>
          </div>

          {/* Col 2: Navigation Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-wider text-[#D4E5DE] uppercase">
              Platform Pages
            </h4>
            <ul className="space-y-2 text-xs text-[#E5F3ED]/90">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Home & Decoder</span>
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#A8C8BA]" />
                  <span>Platform Features</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#A8C8BA]" />
                  <span>How It Works</span>
                </Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#A8C8BA]" />
                  <span>Medical Test Explorer</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Integrity & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-wider text-[#D4E5DE] uppercase">
              Clinical Integrity
            </h4>
            <ul className="space-y-2 text-xs text-[#E5F3ED]/90">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#A8C8BA]" />
                <span>Client-Side OCR Processing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8C8BA]" />
                <span>Deterministic Arithmetic Rules</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#A8C8BA]" />
                <span>Printed Lab Interval Matching</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#A8C8BA]" />
                <span>Zero Patient Health Storage</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Medical Knowledge Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-wider text-[#D4E5DE] uppercase">
              Accredited Sources
            </h4>
            <ul className="space-y-2 text-xs text-[#E5F3ED]/90">
              <li>
                <span className="text-white font-semibold block">ADLM / Lab Tests Online</span>
                <span className="text-[11px] text-[#A8C8BA]">Diagnostic Clinical Chemistry</span>
              </li>
              <li>
                <span className="text-white font-semibold block">Mayo Clinic Laboratories</span>
                <span className="text-[11px] text-[#A8C8BA]">Test Directory Guidelines</span>
              </li>
              <li>
                <span className="text-white font-semibold block">NIH National Library of Medicine</span>
                <span className="text-[11px] text-[#A8C8BA]">MedlinePlus Clinical Database</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Medical Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#D4E5DE]">
          <div className="max-w-2xl leading-relaxed">
            <p>
              <strong className="text-white">Important Medical Disclaimer:</strong> Spark Decoded is an educational and communication aid designed to help patients understand laboratory parameters and prepare for clinic appointments. It does not provide medical diagnoses, clinical staging, treatment recommendations, or medication prescriptions. Always consult a qualified healthcare provider regarding individual test interpretations.
            </p>
          </div>

          <div className="text-center md:text-right shrink-0">
            <p className="text-[#E5F3ED] font-medium">
              © 2026 <strong className="text-white">Team Solvyn</strong> • AAYU Hackathon
            </p>
            <p className="text-[11px] text-[#A8C8BA] mt-0.5">
              Spark Decoded Healthcare Platform
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MedicalEquipmentKit: React.FC<Props> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-72 h-72 sm:w-80 sm:h-80',
    lg: 'w-96 h-96'
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#CDEBFA] via-[#EAF7FF] to-teal-50 rounded-full blur-2xl -z-10" />

      <svg
        viewBox="0 0 360 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="eqTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient id="eqAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <filter id="eqShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#071426" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Soft Organic Background Blob */}
        <path
          d="M60,180 C40,90 120,40 210,50 C300,60 340,140 330,230 C310,310 210,340 130,320 C60,300 80,260 60,180 Z"
          fill="#CDEBFA"
          opacity="0.6"
        />

        {/* Subtle grid lines */}
        <g stroke="#93C5FD" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5">
          <circle cx="180" cy="180" r="140" fill="none" />
          <circle cx="180" cy="180" r="100" fill="none" />
          <line x1="40" y1="180" x2="320" y2="180" />
          <line x1="180" y1="40" x2="180" y2="320" />
        </g>

        {/* CENTRAL FIRST-AID KIT CONTAINER */}
        <g transform="translate(105, 120)" filter="url(#eqShadow)">
          {/* Main Case */}
          <rect x="0" y="20" width="150" height="110" rx="20" fill="#FFFFFF" stroke="#0D9488" strokeWidth="3" />
          {/* Top Handle */}
          <path d="M45,20 C45,5 105,5 105,20" fill="none" stroke="#087F83" strokeWidth="4" strokeLinecap="round" />
          
          {/* Latch */}
          <rect x="68" y="18" width="14" height="10" rx="3" fill="#071426" />

          {/* Prominent Medical Cross in Deep Teal */}
          <rect x="65" y="48" width="20" height="54" rx="4" fill="#0D9488" />
          <rect x="48" y="65" width="54" height="20" rx="4" fill="#0D9488" />
        </g>

        {/* TEST TUBE RACK WITH GRADUATED REAGENT TUBES (LEFT) */}
        <g transform="translate(45, 140)" filter="url(#eqShadow)">
          {/* Rack Base */}
          <rect x="0" y="80" width="65" height="15" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          
          {/* Tube 1: Crimson / Blood Serum */}
          <g transform="translate(8, 0)">
            <rect x="0" y="0" width="14" height="80" rx="7" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.5" />
            <path d="M1,35 Q7,37 13,35 L13,72 A6,6 0 0,1 1,72 Z" fill="#EF4444" opacity="0.8" />
            {/* Rubber cap */}
            <rect x="-1" y="-4" width="16" height="8" rx="3" fill="#DC2626" />
          </g>

          {/* Tube 2: Medical Teal Reagent */}
          <g transform="translate(26, -10)" className="animate-float">
            <rect x="0" y="0" width="14" height="90" rx="7" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
            <path d="M1,40 Q7,42 13,40 L13,82 A6,6 0 0,1 1,82 Z" fill="url(#eqTeal)" opacity="0.85" />
            <rect x="-1" y="-4" width="16" height="8" rx="3" fill="#0D9488" />
            {/* Liquid measurement marks */}
            <line x1="3" y1="20" x2="8" y2="20" stroke="#64748B" strokeWidth="1" />
            <line x1="3" y1="26" x2="6" y2="26" stroke="#64748B" strokeWidth="1" />
            <line x1="3" y1="32" x2="8" y2="32" stroke="#64748B" strokeWidth="1" />
          </g>

          {/* Tube 3: Amber Plasma */}
          <g transform="translate(44, 10)">
            <rect x="0" y="0" width="14" height="70" rx="7" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.5" />
            <path d="M1,30 Q7,32 13,30 L13,62 A6,6 0 0,1 1,62 Z" fill="url(#eqAmber)" opacity="0.8" />
            <rect x="-1" y="-4" width="16" height="8" rx="3" fill="#F59E0B" />
          </g>
        </g>

        {/* STETHOSCOPE LOOPING AROUND RIGHT */}
        <g filter="url(#eqShadow)">
          <path
            d="M260,190 C300,190 320,230 300,270 C280,300 240,290 220,280"
            fill="none"
            stroke="#071426"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Cyan Chestpiece Diaphragm */}
          <circle cx="215" cy="278" r="14" fill="#06B6D4" stroke="#071426" strokeWidth="2.5" />
          <circle cx="215" cy="278" r="8" fill="#FFFFFF" opacity="0.6" />
        </g>

        {/* FLOATING 3D CAPSULES */}
        {/* Capsule 1: Top-Left */}
        <g transform="translate(75, 70) rotate(-40)" className="animate-float" filter="url(#eqShadow)">
          <rect x="0" y="0" width="46" height="18" rx="9" fill="#06B6D4" stroke="#0284C7" strokeWidth="1.5" />
          <rect x="23" y="0" width="23" height="18" rx="9" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="23" y1="0" x2="23" y2="18" stroke="#0284C7" strokeWidth="1" />
        </g>

        {/* Capsule 2: Top-Right */}
        <g transform="translate(255, 65) rotate(35)" className="animate-float" style={{ animationDelay: '1s' }} filter="url(#eqShadow)">
          <rect x="0" y="0" width="42" height="16" rx="8" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          <rect x="21" y="0" width="21" height="16" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        </g>

        {/* DNA Helix Accent Top Center */}
        <g stroke="#0D9488" strokeWidth="1.5" opacity="0.5" transform="translate(145, 45)">
          <path d="M0,15 Q35,0 70,15" fill="none" />
          <path d="M0,15 Q35,30 70,15" fill="none" />
          <line x1="18" y1="9" x2="18" y2="21" />
          <line x1="35" y1="7" x2="35" y2="23" />
          <line x1="52" y1="9" x2="52" y2="21" />
        </g>
      </svg>
    </div>
  );
};

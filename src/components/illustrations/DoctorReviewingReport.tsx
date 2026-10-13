import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DoctorReviewingReport: React.FC<Props> = ({ 
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-72 h-72 sm:w-80 sm:h-80',
    lg: 'w-96 h-96 max-w-full'
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}>
      {/* Background Soft Organic Blobs & Glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#CDEBFA]/80 via-[#EAF7FF]/90 to-teal-50/60 rounded-full blur-2xl -z-10 animate-pulse-subtle pointer-events-none" />

      <svg 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="drBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CDEBFA" />
            <stop offset="100%" stopColor="#EAF7FF" />
          </linearGradient>

          <linearGradient id="drCoatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>

          <linearGradient id="drTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient id="drPillCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#FFFFFF" />
          </linearGradient>

          <linearGradient id="drPillAmber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FFFFFF" />
          </linearGradient>

          <filter id="drSoftShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#071426" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Organic Light-Blue Background Base */}
        <path 
          d="M70,200 C50,110 130,40 220,50 C310,60 360,140 340,230 C320,320 230,360 140,340 C60,320 90,290 70,200 Z" 
          fill="url(#drBgGrad)" 
          opacity="0.85"
        />

        {/* Subtle grid accent inside background */}
        <g stroke="#93C5FD" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4">
          <line x1="120" y1="80" x2="120" y2="320" />
          <line x1="200" y1="60" x2="200" y2="340" />
          <line x1="280" y1="80" x2="280" y2="320" />
          <line x1="70" y1="160" x2="330" y2="160" />
          <line x1="70" y1="240" x2="330" y2="240" />
        </g>

        {/* Floating First-Aid Kit Top-Right */}
        <g transform="translate(290, 75)" className="animate-float" filter="url(#drSoftShadow)">
          <rect x="0" y="8" width="54" height="42" rx="10" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2.5" />
          {/* Handle */}
          <path d="M17,8 C17,2 37,2 37,8" fill="none" stroke="#087F83" strokeWidth="2.5" strokeLinecap="round" />
          {/* Teal Cross */}
          <rect x="23" y="20" width="8" height="18" rx="2" fill="#0D9488" />
          <rect x="18" y="25" width="18" height="8" rx="2" fill="#0D9488" />
        </g>

        {/* Floating Capsule 1 (Cyan/White) */}
        <g transform="translate(60, 110) rotate(-35)" className="animate-float" filter="url(#drSoftShadow)">
          <rect x="0" y="0" width="38" height="16" rx="8" fill="url(#drPillCyan)" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="9" cy="8" r="2" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* Floating Capsule 2 (Amber/White) Bottom-Right */}
        <g transform="translate(305, 270) rotate(25)" className="animate-float" style={{ animationDelay: '1.2s' }}>
          <rect x="0" y="0" width="34" height="14" rx="7" fill="url(#drPillAmber)" stroke="#D97706" strokeWidth="1.5" />
        </g>

        {/* Floating Centrifuge Test Tube Left */}
        <g transform="translate(55, 240) rotate(15)" className="animate-float" style={{ animationDelay: '0.8s' }}>
          {/* Tube glass */}
          <rect x="0" y="0" width="14" height="45" rx="7" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
          {/* Liquid level */}
          <path d="M1,22 Q7,24 13,22 L13,38 A6,6 0 0,1 1,38 Z" fill="url(#drTealGrad)" opacity="0.85" />
          {/* Graduations */}
          <line x1="3" y1="12" x2="8" y2="12" stroke="#64748B" strokeWidth="1" />
          <line x1="3" y1="17" x2="6" y2="17" stroke="#64748B" strokeWidth="1" />
        </g>

        {/* Main Illustrated Doctor Body */}
        {/* Torso / Lab Coat */}
        <g filter="url(#drSoftShadow)">
          {/* Inner scrubs */}
          <path d="M165,190 L235,190 L245,340 L155,340 Z" fill="#0D9488" />
          {/* V-neck */}
          <path d="M185,190 L200,225 L215,190 Z" fill="#0F766E" />
          
          {/* White Lab Coat Left Lapel */}
          <path d="M150,195 L180,240 L180,340 L140,340 C130,290 135,230 150,195 Z" fill="url(#drCoatGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
          
          {/* White Lab Coat Right Lapel */}
          <path d="M250,195 L220,240 L220,340 L260,340 C270,290 265,230 250,195 Z" fill="url(#drCoatGrad)" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Stethoscope around neck */}
          <path d="M172,192 C170,225 180,250 195,255 C210,250 220,225 218,192" fill="none" stroke="#071426" strokeWidth="3" strokeLinecap="round" />
          {/* Bell / Diaphragm */}
          <circle cx="195" cy="260" r="7" fill="#06B6D4" stroke="#071426" strokeWidth="2" />

          {/* Neck */}
          <rect x="187" y="165" width="26" height="30" rx="4" fill="#FBCFE8" />

          {/* Head & Face */}
          <ellipse cx="200" cy="140" rx="30" ry="34" fill="#FDE2D2" />
          
          {/* Friendly Hair */}
          <path d="M168,140 C165,110 180,95 200,95 C220,95 235,110 232,140 C228,118 215,110 200,110 C185,110 172,118 168,140 Z" fill="#1E293B" />

          {/* Friendly smiling face features */}
          {/* Eyes */}
          <circle cx="190" cy="138" r="3" fill="#071426" />
          <circle cx="210" cy="138" r="3" fill="#071426" />
          <circle cx="189" cy="137" r="1" fill="#FFFFFF" />
          <circle cx="209" cy="137" r="1" fill="#FFFFFF" />
          {/* Friendly Smile */}
          <path d="M192,150 Q200,157 208,150" fill="none" stroke="#071426" strokeWidth="2" strokeLinecap="round" />
          {/* Cheerful Blush */}
          <ellipse cx="182" cy="146" rx="4" ry="2.5" fill="#F43F5E" opacity="0.3" />
          <ellipse cx="218" cy="146" rx="4" ry="2.5" fill="#F43F5E" opacity="0.3" />
        </g>

        {/* Doctor Holding Digital Laboratory Report Tablet in Foreground */}
        <g transform="translate(130, 220)" filter="url(#drSoftShadow)">
          {/* Tablet frame */}
          <rect x="0" y="0" width="140" height="105" rx="14" fill="#FFFFFF" stroke="#071426" strokeWidth="2.5" />
          {/* Screen area */}
          <rect x="6" y="6" width="128" height="93" rx="10" fill="#F8FAFC" />
          
          {/* Screen Header with Spark Icon */}
          <rect x="12" y="12" width="116" height="18" rx="6" fill="#0B192C" />
          <path d="M20,21 L24,15 L23,21 L28,21 L21,27 L22,22 Z" fill="#67E8F9" />
          <text x="32" y="24" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="system-ui">SPARK DECODED</text>
          <circle cx="118" cy="21" r="3" fill="#10B981" />

          {/* Parameter Row 1: Glucose (Within Range) */}
          <rect x="12" y="36" width="116" height="16" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <text x="16" y="47" fill="#0B192C" fontSize="7" fontWeight="bold" fontFamily="system-ui">Fasting Glucose</text>
          <text x="82" y="47" fill="#0F766E" fontSize="7" fontWeight="900" fontFamily="system-ui">92 mg/dL</text>
          <circle cx="120" cy="44" r="2.5" fill="#10B981" />

          {/* Parameter Row 2: HbA1c (Attention) */}
          <rect x="12" y="56" width="116" height="16" rx="4" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1" />
          <text x="16" y="67" fill="#92400E" fontSize="7" fontWeight="bold" fontFamily="system-ui">HbA1c Glycated</text>
          <text x="82" y="67" fill="#B45309" fontSize="7" fontWeight="900" fontFamily="system-ui">6.2 %</text>
          <path d="M118,65 L121,62 L124,65 Z" fill="#D97706" />

          {/* Educational Clarity Tag */}
          <rect x="12" y="78" width="116" height="14" rx="4" fill="#E0F2FE" />
          <text x="16" y="88" fill="#0369A1" fontSize="6.5" fontWeight="600" fontFamily="system-ui">✓ Range: Non-diagnostic education</text>
        </g>

        {/* Doctor Hands holding tablet */}
        <ellipse cx="140" cy="275" rx="9" ry="7" fill="#FDE2D2" stroke="#CBD5E1" strokeWidth="1" />
        <ellipse cx="260" cy="275" rx="9" ry="7" fill="#FDE2D2" stroke="#CBD5E1" strokeWidth="1" />

        {/* Ambient Sparkles */}
        <g fill="#06B6D4">
          <path d="M100,80 L103,72 L106,80 L114,83 L106,86 L103,94 L100,86 L92,83 Z" opacity="0.75" />
          <path d="M315,160 L317,154 L319,160 L325,162 L319,164 L317,170 L315,164 L309,162 Z" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};

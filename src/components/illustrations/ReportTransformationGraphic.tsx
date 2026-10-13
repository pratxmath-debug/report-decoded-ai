import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ReportTransformationGraphic: React.FC<Props> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-64 h-36',
    md: 'w-full max-w-xl h-56 sm:h-64',
    lg: 'w-full max-w-2xl h-72'
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-[#EAF7FF] to-teal-50 rounded-3xl blur-xl -z-10" />

      <svg
        viewBox="0 0 540 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="rtGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#087F83" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>

          <filter id="rtShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#071426" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* LEFT: RAW PRINTED PAPER REPORT */}
        <g transform="translate(30, 30)" filter="url(#rtShadow)">
          {/* Paper sheet slightly rotated */}
          <rect x="0" y="0" width="145" height="180" rx="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 0" />
          
          {/* Header Lab Watermark */}
          <rect x="14" y="14" width="70" height="8" rx="2" fill="#CBD5E1" />
          <rect x="14" y="26" width="118" height="4" rx="2" fill="#E2E8F0" />
          <line x1="14" y1="36" x2="132" y2="36" stroke="#E2E8F0" strokeWidth="1" />

          {/* Raw cryptic table rows */}
          <g fill="#94A3B8">
            <rect x="14" y="46" width="45" height="5" rx="1.5" />
            <rect x="68" y="46" width="22" height="5" rx="1.5" />
            <rect x="98" y="46" width="30" height="5" rx="1.5" />

            {/* Row 1 */}
            <rect x="14" y="60" width="40" height="4" rx="1" fill="#64748B" />
            <rect x="68" y="60" width="18" height="4" rx="1" fill="#0F172A" />
            <rect x="98" y="60" width="28" height="4" rx="1" />

            {/* Row 2 with H flag */}
            <rect x="14" y="74" width="35" height="4" rx="1" fill="#64748B" />
            <rect x="68" y="74" width="16" height="4" rx="1" fill="#B91C1C" />
            <rect x="88" y="74" width="6" height="6" rx="1" fill="#EF4444" />
            <rect x="98" y="74" width="25" height="4" rx="1" />

            {/* Row 3 */}
            <rect x="14" y="88" width="48" height="4" rx="1" fill="#64748B" />
            <rect x="68" y="88" width="18" height="4" rx="1" fill="#0F172A" />
            <rect x="98" y="88" width="28" height="4" rx="1" />

            {/* Row 4 */}
            <rect x="14" y="102" width="42" height="4" rx="1" fill="#64748B" />
            <rect x="68" y="102" width="15" height="4" rx="1" fill="#0F172A" />
            <rect x="98" y="102" width="26" height="4" rx="1" />
          </g>

          {/* Scanner beam simulation */}
          <line x1="8" y1="76" x2="138" y2="76" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 2" opacity="0.8" />
          
          <rect x="14" y="148" width="118" height="16" rx="4" fill="#F1F5F9" />
          <text x="24" y="159" fill="#64748B" fontSize="7" fontWeight="bold" fontFamily="system-ui">Unfamiliar Abbreviations & Flags</text>
        </g>

        {/* CENTER: THE SPARK INTELLIGENCE TRANSFORMATION GATE */}
        <g transform="translate(225, 60)">
          {/* Electric ring gate */}
          <ellipse cx="45" cy="60" rx="28" ry="55" fill="none" stroke="url(#rtGlow)" strokeWidth="3.5" strokeDasharray="6 3" className="animate-spin-slow" />
          
          {/* Floating Lightning Bolt Centerpiece */}
          <g transform="translate(32, 42)" className="animate-pulse-subtle">
            <polygon points="16,0 4,18 14,18 10,34 26,14 16,14" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>

          {/* Motion Particles Flowing Right */}
          <g fill="#0D9488">
            <circle cx="78" cy="45" r="2.5" opacity="0.8" />
            <circle cx="85" cy="60" r="3" opacity="0.9" />
            <circle cx="80" cy="75" r="2" opacity="0.7" />
          </g>
        </g>

        {/* RIGHT: TRANSFORMED CRYSTAL-CLEAR EDUCATIONAL CARDS */}
        <g transform="translate(350, 20)" filter="url(#rtShadow)">
          {/* Transformed Card 1: Fasting Glucose */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="165" height="85" rx="12" fill="#FFFFFF" stroke="#99F6E4" strokeWidth="2" />
            
            <text x="14" y="22" fill="#071426" fontSize="9" fontWeight="bold" fontFamily="system-ui">Fasting Blood Glucose</text>
            <rect x="110" y="12" width="45" height="14" rx="7" fill="#D1FAE5" />
            <text x="118" y="22" fill="#065F46" fontSize="7" fontWeight="bold" fontFamily="system-ui">Normal</text>

            <text x="14" y="44" fill="#0F766E" fontSize="16" fontWeight="900" fontFamily="system-ui">92</text>
            <text x="40" y="44" fill="#64748B" fontSize="9" fontWeight="bold" fontFamily="system-ui">mg/dL</text>
            <text x="85" y="44" fill="#64748B" fontSize="8" fontFamily="system-ui">Ref: 70 - 99</text>

            {/* Clear Range Bar */}
            <rect x="14" y="54" width="138" height="6" rx="3" fill="#E2E8F0" />
            <rect x="35" y="54" width="80" height="6" rx="3" fill="#10B981" />
            <circle cx="75" cy="57" r="4.5" fill="#0F766E" stroke="#FFFFFF" strokeWidth="1.5" />

            <text x="14" y="74" fill="#047857" fontSize="7" fontWeight="600" fontFamily="system-ui">✓ Measures immediate energy handling</text>
          </g>

          {/* Transformed Card 2: HbA1c */}
          <g transform="translate(0, 98)">
            <rect x="0" y="0" width="165" height="85" rx="12" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="2" />
            
            <text x="14" y="22" fill="#071426" fontSize="9" fontWeight="bold" fontFamily="system-ui">HbA1c (Glycated)</text>
            <rect x="100" y="12" width="55" height="14" rx="7" fill="#FEF3C7" />
            <text x="106" y="22" fill="#92400E" fontSize="7" fontWeight="bold" fontFamily="system-ui">Above Ref</text>

            <text x="14" y="44" fill="#D97706" fontSize="16" fontWeight="900" fontFamily="system-ui">6.2</text>
            <text x="42" y="44" fill="#64748B" fontSize="9" fontWeight="bold" fontFamily="system-ui">%</text>
            <text x="85" y="44" fill="#64748B" fontSize="8" fontFamily="system-ui">Ref: &lt; 5.7 %</text>

            {/* Clear Range Bar */}
            <rect x="14" y="54" width="138" height="6" rx="3" fill="#E2E8F0" />
            <rect x="14" y="54" width="90" height="6" rx="3" fill="#10B981" />
            <circle cx="112" cy="57" r="4.5" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />

            <text x="14" y="74" fill="#B45309" fontSize="7" fontWeight="600" fontFamily="system-ui">✓ 2–3 month glucose binding average</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

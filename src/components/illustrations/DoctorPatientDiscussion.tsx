import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DoctorPatientDiscussion: React.FC<Props> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-56 h-44',
    md: 'w-80 h-64 sm:w-96 sm:h-72',
    lg: 'w-full max-w-xl h-80'
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#EAF7FF] via-[#CDEBFA]/70 to-teal-50/60 rounded-3xl blur-xl -z-10" />

      <svg
        viewBox="0 0 500 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="dpBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CDEBFA" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#EAF7FF" stopOpacity="0.9" />
          </linearGradient>

          <filter id="dpShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#071426" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Soft Organic Background Shape */}
        <path
          d="M40,160 C30,70 120,30 250,35 C380,40 470,80 460,180 C450,280 370,300 240,295 C110,290 50,250 40,160 Z"
          fill="url(#dpBg)"
        />

        {/* Subtle grid pattern */}
        <g stroke="#93C5FD" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4">
          <line x1="100" y1="60" x2="100" y2="280" />
          <line x1="250" y1="50" x2="250" y2="290" />
          <line x1="400" y1="60" x2="400" y2="280" />
          <line x1="50" y1="140" x2="450" y2="140" />
          <line x1="50" y1="220" x2="450" y2="220" />
        </g>

        {/* Consultation Table in Foreground */}
        <rect x="150" y="220" width="200" height="70" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" filter="url(#dpShadow)" />
        <rect x="170" y="225" width="160" height="6" rx="3" fill="#0D9488" opacity="0.7" />

        {/* Physical Report lying on Table with Checklist */}
        <g transform="translate(205, 205)" filter="url(#dpShadow)">
          <rect x="0" y="0" width="90" height="55" rx="5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Header line */}
          <line x1="10" y1="12" x2="45" y2="12" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
          {/* Parameter rows with checkmarks */}
          <circle cx="15" cy="24" r="3" fill="#10B981" />
          <line x1="24" y1="24" x2="78" y2="24" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="15" cy="34" r="3" fill="#F59E0B" />
          <line x1="24" y1="34" x2="68" y2="34" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="15" cy="44" r="3" fill="#10B981" />
          <line x1="24" y1="44" x2="74" y2="44" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Stethoscope resting on Table */}
        <path d="M165,245 C160,265 190,265 185,245" fill="none" stroke="#071426" strokeWidth="2" />
        <circle cx="185" cy="245" r="4" fill="#06B6D4" stroke="#071426" strokeWidth="1.5" />

        {/* LEFT: DOCTOR FIGURE */}
        <g filter="url(#dpShadow)">
          {/* Torso & White Coat */}
          <path d="M70,290 C70,220 95,190 135,185 L145,290 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M105,185 L120,220 L135,185 Z" fill="#0D9488" />
          {/* Neck */}
          <rect x="110" y="155" width="18" height="25" rx="3" fill="#FDE2D2" />
          {/* Head */}
          <ellipse cx="119" cy="130" rx="22" ry="26" fill="#FDE2D2" />
          {/* Hair */}
          <path d="M96,130 C94,105 106,94 122,94 C138,94 144,105 142,130 C138,112 128,106 119,106 C110,106 100,112 96,130 Z" fill="#334155" />
          {/* Face */}
          <circle cx="126" cy="128" r="2.5" fill="#071426" />
          <path d="M123,138 Q130,143 134,138" fill="none" stroke="#071426" strokeWidth="1.5" strokeLinecap="round" />
          {/* Doctor Arm gesturing toward report */}
          <path d="M135,210 C155,210 185,215 198,220" fill="none" stroke="#FDE2D2" strokeWidth="10" strokeLinecap="round" />
        </g>

        {/* RIGHT: PATIENT FIGURE */}
        <g filter="url(#dpShadow)">
          {/* Torso with comfortable sweater */}
          <path d="M365,185 C405,190 430,220 430,290 L355,290 Z" fill="#38BDF8" opacity="0.9" stroke="#0284C7" strokeWidth="1" />
          {/* Neck */}
          <rect x="372" y="155" width="18" height="25" rx="3" fill="#FDE2D2" />
          {/* Head */}
          <ellipse cx="381" cy="130" rx="22" ry="26" fill="#FDE2D2" />
          {/* Hair */}
          <path d="M358,130 C356,105 368,92 384,92 C400,92 406,105 404,130 C400,112 390,104 381,104 C372,104 362,112 358,130 Z" fill="#64748B" />
          {/* Face */}
          <circle cx="374" cy="128" r="2.5" fill="#071426" />
          <path d="M368,138 Q374,142 378,138" fill="none" stroke="#071426" strokeWidth="1.5" strokeLinecap="round" />
          {/* Patient arm on table */}
          <path d="M365,215 C345,215 320,222 305,225" fill="none" stroke="#FDE2D2" strokeWidth="9" strokeLinecap="round" />
        </g>

        {/* FLOATING SPEECH BUBBLE: CLINICAL EDUCATION & QUESTIONS */}
        <g transform="translate(190, 60)" filter="url(#dpShadow)" className="animate-float">
          {/* Bubble background */}
          <rect x="0" y="0" width="140" height="60" rx="14" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
          <polygon points="40,60 50,68 60,60" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
          {/* Clean over top join */}
          <line x1="41" y1="60" x2="59" y2="60" stroke="#FFFFFF" strokeWidth="3" />
          
          {/* Mini Range Visual inside speech bubble */}
          <text x="14" y="18" fill="#071426" fontSize="8" fontWeight="bold" fontFamily="system-ui">Prepared Questions:</text>
          <text x="14" y="30" fill="#087F83" fontSize="7" fontWeight="600" fontFamily="system-ui">✓ "Could fasting duration shift this?"</text>
          <text x="14" y="42" fill="#087F83" fontSize="7" fontWeight="600" fontFamily="system-ui">✓ "Should we re-test in 4 weeks?"</text>
          <text x="14" y="52" fill="#64748B" fontSize="6" fontFamily="system-ui">Partnership • Non-diagnostic</text>
        </g>

        {/* Floating Capsule Decor Top-Right */}
        <g transform="translate(425, 70) rotate(20)" className="animate-float" style={{ animationDelay: '1s' }}>
          <rect x="0" y="0" width="30" height="12" rx="6" fill="#06B6D4" stroke="#0284C7" strokeWidth="1" />
          <rect x="15" y="0" width="15" height="12" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        </g>

        {/* Small First Aid Cross Left */}
        <g transform="translate(50, 90)" className="animate-float" style={{ animationDelay: '1.5s' }}>
          <circle cx="12" cy="12" r="14" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
          <rect x="10" y="5" width="4" height="14" fill="#0D9488" rx="1" />
          <rect x="5" y="10" width="14" height="4" fill="#0D9488" rx="1" />
        </g>
      </svg>
    </div>
  );
};

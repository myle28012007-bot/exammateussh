import React from 'react';

interface CampusIllustrationProps {
  collapsed?: boolean;
}

export function CampusIllustration({ collapsed = false }: CampusIllustrationProps) {
  if (collapsed) {
    return (
      <div 
        className="mx-auto w-10 h-10 rounded-xl bg-crimson-50 border border-crimson-200 flex items-center justify-center text-crimson-800 text-xs font-bold"
        title="ĐH KHXH&NV — Học hôm nay, sáng tương lai"
      >
        🏛️
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAF4EB] to-[#F2E8D8] border border-[#E2D9CC] p-3.5 shadow-sm text-center">
      {/* Background Decorative campus arches */}
      <svg
        viewBox="0 0 240 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-20 mx-auto select-none opacity-90 transition-transform duration-300 hover:scale-102"
      >
        {/* Sky glow */}
        <path d="M 0 0 L 240 0 L 240 100 L 0 100 Z" fill="url(#skyGradient)" />
        
        {/* Campus Main Neoclassical Building Façade */}
        {/* Ground */}
        <line x1="10" y1="92" x2="230" y2="92" stroke="#8B0000" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Main Base */}
        <rect x="35" y="48" width="170" height="44" rx="2" fill="#FFFFFF" stroke="#D3C3AD" strokeWidth="1.2" />

        {/* Central Pediment (Triangular roof) */}
        <polygon points="120,18 78,48 162,48" fill="#8B0000" stroke="#700808" strokeWidth="1.2" />
        {/* Pediment crest emblem */}
        <circle cx="120" cy="38" r="5" fill="#FAF1D2" stroke="#E5C158" strokeWidth="1" />
        <text x="120" y="40" fontSize="3" fontWeight="bold" fill="#8B0000" textAnchor="middle">
          VNU
        </text>

        {/* Neoclassical Pillars / Columns */}
        <rect x="88" y="48" width="5" height="44" fill="#FBF9F5" stroke="#D3C3AD" strokeWidth="0.8" />
        <rect x="102" y="48" width="5" height="44" fill="#FBF9F5" stroke="#D3C3AD" strokeWidth="0.8" />
        <rect x="133" y="48" width="5" height="44" fill="#FBF9F5" stroke="#D3C3AD" strokeWidth="0.8" />
        <rect x="147" y="48" width="5" height="44" fill="#FBF9F5" stroke="#D3C3AD" strokeWidth="0.8" />

        {/* Central Portico Grand Entrance with Arch */}
        <path d="M 112 92 L 112 66 Q 120 58 128 66 L 128 92 Z" fill="#8B0000" />
        <circle cx="120" cy="64" r="2.5" fill="#FAF1D2" />

        {/* French Arched Windows (Left wing) */}
        <path d="M 46 80 L 46 62 Q 52 56 58 62 L 58 80 Z" fill="#FAF4EB" stroke="#D3C3AD" strokeWidth="0.8" />
        <line x1="52" y1="58" x2="52" y2="80" stroke="#8B0000" strokeWidth="0.6" />
        <path d="M 66 80 L 66 62 Q 72 56 78 62 L 78 80 Z" fill="#FAF4EB" stroke="#D3C3AD" strokeWidth="0.8" />
        <line x1="72" y1="58" x2="72" y2="80" stroke="#8B0000" strokeWidth="0.6" />

        {/* French Arched Windows (Right wing) */}
        <path d="M 162 80 L 162 62 Q 168 56 174 62 L 174 80 Z" fill="#FAF4EB" stroke="#D3C3AD" strokeWidth="0.8" />
        <line x1="168" y1="58" x2="168" y2="80" stroke="#8B0000" strokeWidth="0.6" />
        <path d="M 182 80 L 182 62 Q 188 56 194 62 L 194 80 Z" fill="#FAF4EB" stroke="#D3C3AD" strokeWidth="0.8" />
        <line x1="188" y1="58" x2="188" y2="80" stroke="#8B0000" strokeWidth="0.6" />

        {/* Roof tiles on side wings */}
        <polygon points="30,48 40,36 82,48" fill="#A31D1D" stroke="#700808" strokeWidth="0.8" />
        <polygon points="210,48 200,36 158,48" fill="#A31D1D" stroke="#700808" strokeWidth="0.8" />

        {/* Campus Trees / Foliage flanking */}
        <circle cx="22" cy="74" r="14" fill="#3A6B46" opacity="0.85" />
        <circle cx="28" cy="66" r="11" fill="#4B8258" opacity="0.9" />
        <line x1="25" y1="78" x2="25" y2="92" stroke="#5D4037" strokeWidth="2.5" />

        <circle cx="218" cy="74" r="14" fill="#3A6B46" opacity="0.85" />
        <circle cx="212" cy="66" r="11" fill="#4B8258" opacity="0.9" />
        <line x1="215" y1="78" x2="215" y2="92" stroke="#5D4037" strokeWidth="2.5" />

        {/* Small birds in sky */}
        <path d="M 50 18 Q 54 14 58 18 Q 62 14 66 18" stroke="#8B0000" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M 174 22 Q 177 19 180 22 Q 183 19 186 22" stroke="#8B0000" strokeWidth="0.8" fill="none" opacity="0.6" />

        <defs>
          <linearGradient id="skyGradient" x1="120" y1="0" x2="120" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFDF9" />
            <stop offset="1" stopColor="#F5EFE4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mt-2 text-center">
        <p className="text-[12px] font-bold text-neutral-800 tracking-wide font-sans">
          ĐH KHXH&amp;NV — VNU
        </p>
        <p className="text-[11px] font-medium text-crimson-800 italic mt-0.5">
          &ldquo;Học hôm nay, sáng tương lai&rdquo;
        </p>
      </div>
    </div>
  );
}

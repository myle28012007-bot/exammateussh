import React from 'react';

export function MascotBadge() {
  return (
    <div className="relative group shrink-0 select-none">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-amber-100 via-rose-50 to-amber-200 border-2 border-white shadow-md flex items-center justify-center p-2 relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
        {/* Soft background radial shine */}
        <div className="absolute inset-0 bg-radial from-amber-300/30 to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Owl Body */}
          <ellipse cx="50" cy="58" rx="30" ry="32" fill="#8B0000" />
          
          {/* Belly */}
          <ellipse cx="50" cy="64" rx="20" ry="22" fill="#FAF1D2" />
          <path d="M 43 56 Q 50 60 57 56" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 41 64 Q 50 68 59 64" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 43 72 Q 50 76 57 72" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />

          {/* Owl Wings */}
          <path d="M 20 54 Q 15 65 24 76 Q 26 65 22 54" fill="#6E0808" />
          <path d="M 80 54 Q 85 65 76 76 Q 74 65 78 54" fill="#6E0808" />

          {/* Eyes (Round, wise, scholarly glasses) */}
          <circle cx="38" cy="46" r="12" fill="#FFFFFF" stroke="#E5C158" strokeWidth="2.5" />
          <circle cx="62" cy="46" r="12" fill="#FFFFFF" stroke="#E5C158" strokeWidth="2.5" />
          {/* Glasses Bridge */}
          <path d="M 50 46 L 50 46" stroke="#E5C158" strokeWidth="3" strokeLinecap="round" />
          <line x1="49" y1="46" x2="51" y2="46" stroke="#E5C158" strokeWidth="3" />

          {/* Pupils */}
          <circle cx="40" cy="46" r="5" fill="#222222" />
          <circle cx="38" cy="44" r="1.8" fill="#FFFFFF" />
          <circle cx="64" cy="46" r="5" fill="#222222" />
          <circle cx="62" cy="44" r="1.8" fill="#FFFFFF" />

          {/* Beak */}
          <polygon points="50,51 46,57 54,57" fill="#F59E0B" />

          {/* Mortarboard / Graduation Cap */}
          <polygon points="50,15 20,26 50,33 80,26" fill="#1F1E1D" />
          <rect x="42" y="29" width="16" height="8" rx="2" fill="#1F1E1D" />
          {/* Gold Button on Cap */}
          <circle cx="50" cy="24" r="2.5" fill="#E5C158" />
          {/* Tassel */}
          <path d="M 50 24 Q 68 25 72 35" stroke="#E5C158" strokeWidth="1.8" fill="none" />
          <circle cx="72" cy="37" r="2" fill="#E5C158" />
        </svg>

        {/* Small floating badge: A+ */}
        <div className="absolute -top-1 -right-1 bg-amber-400 text-neutral-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-white shadow-xs">
          A+
        </div>
      </div>
    </div>
  );
}

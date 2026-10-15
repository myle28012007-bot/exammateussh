import React from 'react';

interface UsshLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function UsshLogo({ size = 48, className = '', showText = false }: UsshLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official circular USSH Crimson emblem logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none transition-transform hover:scale-105"
      >
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="48" fill="#8B0000" stroke="#E5C158" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="43.5" fill="#750000" stroke="#FAF1D2" strokeWidth="0.8" strokeDasharray="2 1.5" />

        {/* Inner Crest Background */}
        <circle cx="50" cy="50" r="32" fill="#5E0000" stroke="#E5C158" strokeWidth="1.5" />

        {/* Circular text path guide */}
        <path
          id="usshTextPathTop"
          d="M 22 50 A 28 28 0 0 1 78 50"
          fill="none"
        />
        <text fontSize="5.2" fontWeight="700" fill="#FAF1D2" letterSpacing="0.08em" textAnchor="middle">
          <textPath href="#usshTextPathTop" startOffset="50%">
            ĐHQG • USSH
          </textPath>
        </text>

        {/* Laurel Wreath at bottom */}
        <path
          d="M 28 62 C 34 76, 66 76, 72 62"
          stroke="#E5C158"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Small Decorative Stars */}
        <circle cx="30" cy="52" r="1.5" fill="#E5C158" />
        <circle cx="70" cy="52" r="1.5" fill="#E5C158" />

        {/* Central Torch / Flame of Wisdom */}
        <path
          d="M 50 31 C 52 35, 55 37, 53 41 C 51 44, 49 44, 47 41 C 45 37, 48 35, 50 31 Z"
          fill="#F59E0B"
        />
        <path
          d="M 50 34 C 51 36, 52 38, 51 40 C 50 41, 49 41, 49 39 C 48 37, 49 36, 50 34 Z"
          fill="#FEF08A"
        />

        {/* Torch Handle */}
        <path
          d="M 47.5 42 L 52.5 42 L 51.5 47 L 48.5 47 Z"
          fill="#E5C158"
        />

        {/* Open Book of Knowledge (Symbol of USSH Humanities) */}
        {/* Left page */}
        <path
          d="M 50 48 C 45 46.5, 37 46, 33 48.5 L 33 60 C 37 57.5, 45 58, 50 59.5 Z"
          fill="#FFFFFF"
          stroke="#E5C158"
          strokeWidth="1"
        />
        {/* Left page lines */}
        <path d="M 36 51 C 40 49.5, 45 50, 48 51.2" stroke="#8B0000" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M 36 54 C 40 52.5, 45 53, 48 54.2" stroke="#8B0000" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M 36 57 C 40 55.5, 45 56, 48 57.2" stroke="#8B0000" strokeWidth="0.8" strokeLinecap="round" />

        {/* Right page */}
        <path
          d="M 50 48 C 55 46.5, 63 46, 67 48.5 L 67 60 C 63 57.5, 55 58, 50 59.5 Z"
          fill="#FFFFFF"
          stroke="#E5C158"
          strokeWidth="1"
        />
        {/* Right page lines */}
        <path d="M 52 51.2 C 55 50, 60 49.5, 64 51" stroke="#8B0000" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M 52 54.2 C 55 53, 60 52.5, 64 54" stroke="#8B0000" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M 52 57.2 C 55 56, 60 55.5, 64 57" stroke="#8B0000" strokeWidth="0.8" strokeLinecap="round" />

        {/* Book Spine */}
        <path d="M 50 48 L 50 60.5" stroke="#E5C158" strokeWidth="1.4" strokeLinecap="round" />
        
        {/* 1957 or Year marker ribbon */}
        <rect x="42" y="63" width="16" height="5" rx="1.5" fill="#E5C158" />
        <text x="50" y="67" fontSize="3.6" fontWeight="800" fill="#8B0000" textAnchor="middle">
          1957
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg text-neutral-900 tracking-tight font-display">
              Exam<span className="text-crimson-800">Mate</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-crimson-100 text-crimson-800 rounded uppercase tracking-wider">
              USSH
            </span>
          </div>
          <span className="text-[11px] font-medium text-neutral-500 truncate">
            Ôn đúng trọng tâm – Thi vững tự tin!
          </span>
        </div>
      )}
    </div>
  );
}

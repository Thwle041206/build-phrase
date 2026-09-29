import React from 'react';

export default function TutorMateLogo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none shrink-0 ${className}`}>
      {/* High-fidelity SVG representing the graduation cap, stylized 't', and green orbit with spark */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 shrink-0"
      >
        {/* Blue Graduation Cap (Mũ cử nhân) */}
        <path
          d="M50 15L15 32L50 49L85 32L50 15Z"
          fill="#1E40AF"
        />
        <path
          d="M75 37.5V53C75 54.5 74 55.5 72.5 55.5C71 55.5 70 54.5 70 53V39.5L75 37.5Z"
          fill="#1E40AF"
        />
        <circle cx="72.5" cy="57" r="2" fill="#1E40AF" />

        {/* Stylized 't' shaped like a cross/plus in deep blue */}
        <path
          d="M44 40H52V52H63V58H52V82C52 85 54 86 57 86H61V91H54C46 91 44 87 44 81V58H38V52H44V40Z"
          fill="#1E40AF"
        />

        {/* Green Orbit ring circling the 't' */}
        <path
          d="M20 62C18 55 24 48 37 45C50 42 66 45 74 50C82 55 83 62 72 66C61 70 42 69 30 66"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        
        {/* Tiny green dot on the orbit ring */}
        <circle cx="68" cy="51.5" r="4.5" fill="#10B981" />

        {/* Spark decoration in green */}
        <path
          d="M80 43L84 41M86 47L91 47M81 52L85 55"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-sans font-bold text-2xl tracking-tight text-[#0F172A]">
        tutor<span className="text-[#1E40AF]">mate</span>
      </span>
    </div>
  );
}

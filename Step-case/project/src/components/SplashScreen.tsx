import React, { useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // Exact 1 second timer as specified in prompt
    const timer = setTimeout(() => {
      onFinish();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black select-none">
      <div className="flex flex-col items-center">
        {/* Geometric AXC SVG Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          className="w-72 h-72 drop-shadow-2xl animate-pulse"
        >
          <rect width="400" height="400" rx="40" fill="#000000" />
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeDasharray="8 6"
            opacity="0.4"
          />
          {/* Geometric 'AXC' Monogram */}
          <path
            d="M 90 290 L 150 110 L 210 290"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="112"
            y1="230"
            x2="188"
            y2="230"
            stroke="#FFFFFF"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* X intersecting lines */}
          <line
            x1="190"
            y1="130"
            x2="270"
            y2="290"
            stroke="#FFFFFF"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <line
            x1="270"
            y1="130"
            x2="190"
            y2="290"
            stroke="#FFFFFF"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* C arc */}
          <path
            d="M 330 150 A 90 90 0 1 0 330 250"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Typography */}
          <text
            x="200"
            y="345"
            fontFamily="'Nano Sans', 'Segoe UI', sans-serif"
            fontSize="20"
            fontWeight="900"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="6"
          >
            A X C
          </text>
          <text
            x="200"
            y="370"
            fontFamily="'Nano Sans', 'Segoe UI', sans-serif"
            fontSize="10"
            fontWeight="600"
            fill="#888888"
            textAnchor="middle"
            letterSpacing="2"
          >
            STEP-CASE RUNBOOK ENGINE
          </text>
        </svg>

        <div className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />
          Initializing PyQt6 Runtime...
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Heart, Shield, BookOpen } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const modalBg = isLight ? 'bg-white text-[#0033AA] border-2 border-[#0033AA]' : 'bg-black text-white border-2 border-white';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none">
      <div className={`w-full max-w-lg rounded-xs ${modalBg} shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className="p-4 border-b-2 border-current flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-sm tracking-wider uppercase">
            <BookOpen className="w-4 h-4" />
            <span>About Step-case</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-xs hover:opacity-75 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center mx-auto text-current font-black text-xl">
            AXC
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight">Step-case</h2>
            <p className="text-xs uppercase font-mono tracking-widest opacity-80">
              Interactive Playbook &amp; Runbook Engine
            </p>
          </div>

          <div className="p-4 border-2 border-current/40 rounded-xs space-y-2 text-xs leading-relaxed text-left">
            <p>
              Step-case is an offline, interactive SOP and playbook execution platform designed for laymen to construct and run interactive guides without editing raw JSON or Markdown.
            </p>
            <p>
              Built as a modular Python PyQt6 desktop application with an interactive companion emulator and portable ZIP packaging.
            </p>
          </div>

          <div className="py-2 border-t-2 border-current/20 flex items-center justify-center gap-2 text-sm font-black">
            <span>Made with Love by Alex Sakha</span>
            <Heart className="w-4 h-4 fill-current text-red-500 inline" />
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-current flex justify-center">
          <button
            onClick={onClose}
            className={`px-6 py-1.5 text-xs font-bold rounded-xs border-2 border-current cursor-pointer ${
              isLight ? 'bg-[#0033AA] text-white hover:bg-[#0055FF]' : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

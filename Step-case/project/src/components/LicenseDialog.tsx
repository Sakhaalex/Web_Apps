import React from 'react';

interface LicenseDialogProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const LicenseDialog: React.FC<LicenseDialogProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none p-4">
      {/* Classic Tkinter-style Window Frame */}
      <div className="w-full max-w-md bg-[#ECE9D8] text-black border-2 border-[#FFFFFF] shadow-[3px_3px_10px_rgba(0,0,0,0.5)] font-sans overflow-hidden rounded-xs">
        {/* Tkinter Title Bar */}
        <div className="bg-[#0055EA] text-white px-3 py-1 flex items-center justify-between text-xs font-bold tracking-wide select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-white/20 rounded-xs flex items-center justify-center text-[10px] text-white">
              ⚙
            </span>
            <span>Step-case — Welcome &amp; License</span>
          </div>
          <button
            onClick={onDecline}
            className="w-4 h-4 bg-[#D7433A] hover:bg-[#E8534A] text-white font-mono text-xs flex items-center justify-center rounded-xs"
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Tkinter Content Area */}
        <div className="p-5 flex gap-4 bg-[#ECE9D8]">
          {/* Classic Info Badge */}
          <div className="shrink-0 flex items-start justify-center pt-1">
            <div className="w-10 h-10 rounded-full border-2 border-[#0055EA] bg-white flex items-center justify-center text-[#0055EA] text-2xl font-serif font-black shadow-inner">
              i
            </div>
          </div>

          <div className="space-y-2.5 text-sm">
            <h3 className="font-bold text-[#000000] text-[15px] leading-tight">
              Step-case Interactive Playbook Engine
            </h3>
            <p className="text-[#111111] font-semibold text-[14px]">
              Made with Love by Alex Sakha
            </p>
            <p className="text-[#333333] text-xs leading-relaxed">
              Do you accept the license terms to launch and execute interactive playbooks in Step-case?
            </p>
          </div>
        </div>

        {/* Tkinter Button Footer Bar */}
        <div className="bg-[#ECE9D8] px-5 py-3 border-t border-[#D0CCC0] flex justify-end gap-3">
          <button
            onClick={onAccept}
            className="px-5 py-1.5 bg-[#ECE9D8] hover:bg-[#DFDCCB] active:border-inset text-black text-xs font-semibold border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#808080] border-b-[#808080] shadow-xs active:shadow-inner cursor-pointer min-w-[85px] focus:outline-1 focus:outline-black"
            autoFocus
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="px-5 py-1.5 bg-[#ECE9D8] hover:bg-[#DFDCCB] active:border-inset text-black text-xs font-semibold border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#808080] border-b-[#808080] shadow-xs active:shadow-inner cursor-pointer min-w-[85px] focus:outline-1 focus:outline-black"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

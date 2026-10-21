import React from 'react';
import { Playbook } from '../types/playbook';
import {
  ChevronRight,
  ChevronDown,
  BookOpen,
  GitBranch,
  ListOrdered,
  FileCheck,
  Edit3,
  Play
} from 'lucide-react';

interface SidebarTreeProps {
  playbook: Playbook;
  theme: 'light' | 'dark';
  activeMode: 'builder' | 'player';
  setActiveMode: (mode: 'builder' | 'player') => void;
  onNavigateScreen: (screenId: string) => void;
  onNavigateSequence: (seqId: string) => void;
  onNavigateStep: (seqId: string, stepId: string) => void;
  currentActiveId?: string;
}

export const SidebarTree: React.FC<SidebarTreeProps> = ({
  playbook,
  theme,
  activeMode,
  setActiveMode,
  onNavigateScreen,
  onNavigateSequence,
  onNavigateStep,
  currentActiveId
}) => {
  const [screensOpen, setScreensOpen] = React.useState(true);
  const [seqsOpen, setSeqsOpen] = React.useState(true);
  const isLight = theme === 'light';

  // Strict Theming:
  // Light: Pure Blue (#0033AA / #0055FF) and White (#FFFFFF) only
  // Dark: Pure Black (#000000) and White (#FFFFFF) only
  const sidebarBg = isLight ? 'bg-white text-[#0033AA] border-r-2 border-[#0033AA]' : 'bg-black text-white border-r-2 border-white';
  const headerBg = isLight ? 'bg-[#0033AA] text-white' : 'bg-black text-white border-b-2 border-white';
  const itemActive = isLight ? 'bg-[#0033AA] text-white font-bold' : 'bg-white text-black font-bold';
  const itemHover = isLight ? 'hover:bg-[#0033AA]/10' : 'hover:bg-white/15';

  return (
    <aside className={`w-72 flex flex-col shrink-0 select-none ${sidebarBg}`}>
      {/* Mode Switcher Pill Group */}
      <div className="p-3 border-b-2 border-current">
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xs border-2 border-current">
          <button
            onClick={() => setActiveMode('builder')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-bold rounded-xs transition-colors cursor-pointer ${
              activeMode === 'builder'
                ? isLight
                  ? 'bg-[#0033AA] text-white'
                  : 'bg-white text-black'
                : itemHover
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Builder</span>
          </button>
          <button
            onClick={() => setActiveMode('player')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-bold rounded-xs transition-colors cursor-pointer ${
              activeMode === 'player'
                ? isLight
                  ? 'bg-[#0033AA] text-white'
                  : 'bg-white text-black'
                : itemHover
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Player</span>
          </button>
        </div>
      </div>

      {/* Tree View Header */}
      <div className={`px-3 py-2 text-xs font-black tracking-wider uppercase flex items-center gap-2 ${headerBg}`}>
        <BookOpen className="w-4 h-4" />
        <span className="truncate">{playbook.title || 'Playbook'}</span>
      </div>

      {/* Hierarchy Tree Body */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
        {/* SECTION 1: SCREENS (DECISION MULTIPLEXERS) */}
        <div>
          <button
            onClick={() => setScreensOpen(!screensOpen)}
            className="w-full flex items-center gap-1.5 px-2 py-1.5 font-bold tracking-wide rounded-xs cursor-pointer hover:opacity-80"
          >
            {screensOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <GitBranch className="w-3.5 h-3.5" />
            <span>Decision Screens ({playbook.screens.length})</span>
          </button>

          {screensOpen && (
            <div className="ml-4 pl-2 border-l border-current/30 space-y-0.5 mt-0.5">
              {playbook.screens.map((screen) => {
                const isActive = currentActiveId === screen.id;
                return (
                  <button
                    key={screen.id}
                    onClick={() => onNavigateScreen(screen.id)}
                    className={`w-full text-left px-2 py-1.5 rounded-xs flex items-center justify-between transition-colors cursor-pointer truncate ${
                      isActive ? itemActive : itemHover
                    }`}
                  >
                    <span className="truncate">⬡ {screen.title}</span>
                    {screen.disable_back && (
                      <span className="text-[10px] px-1 border border-current rounded-xs ml-1 shrink-0" title="Back navigation disabled">
                        Locked
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 2: SEQUENCES & STEPS */}
        <div>
          <button
            onClick={() => setSeqsOpen(!seqsOpen)}
            className="w-full flex items-center gap-1.5 px-2 py-1.5 font-bold tracking-wide rounded-xs cursor-pointer hover:opacity-80"
          >
            {seqsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Sequences ({playbook.sequences.length})</span>
          </button>

          {seqsOpen && (
            <div className="ml-4 pl-2 border-l border-current/30 space-y-2 mt-0.5">
              {playbook.sequences.map((seq) => {
                const isSeqActive = currentActiveId === seq.id;
                return (
                  <div key={seq.id} className="space-y-0.5">
                    {/* Sequence Title */}
                    <button
                      onClick={() => onNavigateSequence(seq.id)}
                      className={`w-full text-left px-2 py-1 rounded-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer truncate ${
                        isSeqActive ? itemActive : itemHover
                      }`}
                    >
                      <span className="truncate">↳ {seq.title}</span>
                    </button>

                    {/* Steps within sequence */}
                    <div className="ml-3 pl-2 border-l border-current/20 space-y-0.5">
                      {seq.step_ids.map((stId) => {
                        const stepObj = playbook.steps.find((s) => s.id === stId);
                        const isStepActive = currentActiveId === stId;
                        return (
                          <button
                            key={stId}
                            onClick={() => onNavigateStep(seq.id, stId)}
                            className={`w-full text-left px-2 py-1 rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer truncate text-[11px] ${
                              isStepActive ? itemActive : itemHover
                            }`}
                          >
                            <FileCheck className="w-3 h-3 shrink-0" />
                            <span className="truncate">{stepObj?.title || stId}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info Badge */}
      <div className="p-3 border-t-2 border-current text-[11px] opacity-80 flex items-center justify-between">
        <span>Offline Runbook Mode</span>
        <span className="font-mono">v{playbook.version || '1.0'}</span>
      </div>
    </aside>
  );
};

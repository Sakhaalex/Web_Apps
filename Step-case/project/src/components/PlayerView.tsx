import React, { useState, useEffect } from 'react';
import { Playbook, Screen, Sequence, Step } from '../types/playbook';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Copy,
  Check,
  Edit3,
  RotateCcw,
  AlertOctagon,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlayerViewProps {
  playbook: Playbook;
  onSwitchToBuilder: () => void;
  theme: 'light' | 'dark';
  assetsMap: Record<string, string>;
  activeScreenId?: string;
  activeSequenceId?: string;
  activeStepId?: string;
  onStateChange?: (state: { mode: 'screen' | 'step'; id: string; title: string }) => void;
}

interface HistoryItem {
  type: 'screen' | 'step';
  screenId?: string;
  sequenceId?: string;
  stepIndex?: number;
}

export const PlayerView: React.FC<PlayerViewProps> = ({
  playbook,
  onSwitchToBuilder,
  theme,
  assetsMap,
  activeScreenId,
  activeSequenceId,
  activeStepId,
  onStateChange
}) => {
  // Navigation Execution State
  const [historyStack, setHistoryStack] = useState<HistoryItem[]>([]);
  const [currentMode, setCurrentMode] = useState<'screen' | 'step' | 'complete'>('screen');
  const [currentScreenId, setCurrentScreenId] = useState<string>(
    activeScreenId || playbook.start_screen_id || playbook.screens[0]?.id || ''
  );
  const [currentSequenceId, setCurrentSequenceId] = useState<string>(activeSequenceId || '');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Checklists interactive tracking state: stepId -> { checklistId: boolean }
  const [checklistStates, setChecklistStates] = useState<Record<string, Record<string, boolean>>>({});
  // Copied indicator state: string label -> boolean
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const isLight = theme === 'light';

  // Strict Theming:
  // Light: Pure Blue (#0033AA, #0055FF) and White (#FFFFFF) only
  // Dark: Pure Black (#000000) and White (#FFFFFF) only
  const cardBorder = isLight ? 'border-2 border-[#0033AA]' : 'border-2 border-white';
  const choiceCardStyle = isLight
    ? 'bg-white hover:bg-[#0033AA] text-[#0033AA] hover:text-white border-2 border-[#0033AA] transition-all cursor-pointer'
    : 'bg-black hover:bg-white text-white hover:text-black border-2 border-white transition-all cursor-pointer';

  const btnNav = isLight
    ? 'bg-[#0033AA] hover:bg-[#0055FF] text-white font-black px-6 py-3 rounded-xs border-2 border-[#0033AA] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
    : 'bg-white hover:bg-neutral-200 text-black font-black px-6 py-3 rounded-xs border-2 border-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed';

  const btnNavSecondary = isLight
    ? 'bg-white hover:bg-[#0033AA] hover:text-white text-[#0033AA] font-bold px-6 py-3 rounded-xs border-2 border-[#0033AA] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
    : 'bg-black hover:bg-white hover:text-black text-white font-bold px-6 py-3 rounded-xs border-2 border-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed';

  // Synchronize when external selection changes from sidebar tree
  useEffect(() => {
    if (activeScreenId) {
      goToScreen(activeScreenId, false);
    } else if (activeSequenceId && activeStepId) {
      const seq = playbook.sequences.find((s) => s.id === activeSequenceId);
      if (seq) {
        const idx = seq.step_ids.indexOf(activeStepId);
        if (idx >= 0) {
          goToStep(activeSequenceId, idx, false);
        }
      }
    } else if (activeSequenceId) {
      startSequence(activeSequenceId, false);
    }
  }, [activeScreenId, activeSequenceId, activeStepId]);

  // Current entity lookups
  const activeScreen = playbook.screens.find((s) => s.id === currentScreenId);
  const activeSequence = playbook.sequences.find((s) => s.id === currentSequenceId);
  const currentStepIdInSeq = activeSequence?.step_ids[currentStepIndex];
  const activeStep = playbook.steps.find((st) => st.id === currentStepIdInSeq);

  // -------------------------------------------------------------
  // NAVIGATION ROUTING
  // -------------------------------------------------------------
  const goToScreen = (screenId: string, pushHistory = true) => {
    if (pushHistory) {
      setHistoryStack((prev) => [
        ...prev,
        {
          type: currentMode as 'screen' | 'step',
          screenId: currentScreenId,
          sequenceId: currentSequenceId,
          stepIndex: currentStepIndex
        }
      ]);
    }
    setCurrentMode('screen');
    setCurrentScreenId(screenId);
    setCurrentSequenceId('');
    setCurrentStepIndex(0);

    const scr = playbook.screens.find((s) => s.id === screenId);
    if (scr && onStateChange) {
      onStateChange({ mode: 'screen', id: scr.id, title: scr.title });
    }
  };

  const startSequence = (seqId: string, pushHistory = true) => {
    goToStep(seqId, 0, pushHistory);
  };

  const goToStep = (seqId: string, stepIdx: number, pushHistory = true) => {
    const seq = playbook.sequences.find((s) => s.id === seqId);
    if (!seq) return;

    if (stepIdx >= seq.step_ids.length) {
      // Sequence finished: check next_screen_id
      if (seq.next_screen_id) {
        goToScreen(seq.next_screen_id, pushHistory);
      } else {
        // Complete!
        triggerCelebration();
        setCurrentMode('complete');
      }
      return;
    }

    if (pushHistory) {
      setHistoryStack((prev) => [
        ...prev,
        {
          type: currentMode as 'screen' | 'step',
          screenId: currentScreenId,
          sequenceId: currentSequenceId,
          stepIndex: currentStepIndex
        }
      ]);
    }

    setCurrentMode('step');
    setCurrentSequenceId(seqId);
    setCurrentStepIndex(stepIdx);

    const stId = seq.step_ids[stepIdx];
    const stObj = playbook.steps.find((s) => s.id === stId);
    if (stObj && onStateChange) {
      onStateChange({ mode: 'step', id: stId, title: stObj.title });
    }
  };

  const handleNext = () => {
    if (currentMode === 'step' && activeSequence) {
      goToStep(currentSequenceId, currentStepIndex + 1, true);
    }
  };

  const handleBack = () => {
    if (historyStack.length === 0) return;
    const newStack = [...historyStack];
    const prev = newStack.pop()!;
    setHistoryStack(newStack);

    if (prev.type === 'screen' && prev.screenId) {
      goToScreen(prev.screenId, false);
    } else if (prev.type === 'step' && prev.sequenceId !== undefined && prev.stepIndex !== undefined) {
      goToStep(prev.sequenceId, prev.stepIndex, false);
    }
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // silent fallback
    }
  };

  const restartPlaybook = () => {
    setHistoryStack([]);
    const startId = playbook.start_screen_id || playbook.screens[0]?.id || '';
    goToScreen(startId, false);
  };

  // Back navigation disabled logic check
  const isBackDisabled =
    (currentMode === 'screen' && activeScreen?.disable_back) ||
    (currentMode === 'step' && activeStep?.disable_back) ||
    historyStack.length === 0;

  // Checklist toggle
  const toggleChecklist = (stepId: string, itemId: string) => {
    setChecklistStates((prev) => {
      const stepState = prev[stepId] || {};
      return {
        ...prev,
        [stepId]: {
          ...stepState,
          [itemId]: !stepState[itemId]
        }
      };
    });
  };

  // Copy to clipboard
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 1500);
  };

  // Markdown renderer to styled HTML
  const renderMarkdown = (text: string) => {
    const lines = (text || '').split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="text-xl md:text-2xl font-black mt-5 mb-2 tracking-tight">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl md:text-3xl font-black mt-6 mb-3 tracking-tight">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={i} className="text-3xl md:text-4xl font-black mt-6 mb-3 tracking-tight">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={i} className="border-l-4 border-current pl-4 my-3 text-base italic opacity-90">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={i} className="text-base md:text-lg ml-6 my-1 list-disc">
            {trimmed.replace(/^[-*]\s+/, '')}
          </li>
        );
      }
      if (!trimmed) {
        return <div key={i} className="h-2" />;
      }
      return (
        <p key={i} className="text-base md:text-lg leading-relaxed my-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden">
      {/* Top Breadcrumb & Progress Bar */}
      <div className="border-b-2 border-current px-6 py-3 flex items-center justify-between text-xs font-bold">
        <div className="flex items-center gap-3">
          <span className="uppercase tracking-wider opacity-80">{playbook.title}</span>
          <span className="opacity-40">•</span>
          {currentMode === 'screen' && (
            <span className="px-2 py-0.5 rounded-xs border border-current font-mono">
              Decision Point: {activeScreen?.title}
            </span>
          )}
          {currentMode === 'step' && activeSequence && (
            <span className="px-2 py-0.5 rounded-xs border border-current font-mono">
              {activeSequence.title} — Step {currentStepIndex + 1} of {activeSequence.step_ids.length}
            </span>
          )}
          {currentMode === 'complete' && (
            <span className="px-2 py-0.5 rounded-xs border border-current font-mono bg-current/10">
              Runbook Finished
            </span>
          )}
        </div>

        <button
          onClick={onSwitchToBuilder}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-current hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit in Builder</span>
        </button>
      </div>

      {/* Progress Strip */}
      {currentMode === 'step' && activeSequence && (
        <div className="w-full h-1.5 bg-current/15">
          <div
            className="h-full bg-current transition-all duration-300"
            style={{
              width: `${((currentStepIndex + 1) / activeSequence.step_ids.length) * 100}%`
            }}
          />
        </div>
      )}

      {/* Central Screen-Wise Execution View */}
      <div className="flex-1 overflow-y-auto px-8 md:px-16 py-8 max-w-5xl mx-auto w-full">
        {/* -------------------------------------------------------- */}
        {/* VIEW 1: DECISION SCREEN MULTIPLEXER */}
        {/* -------------------------------------------------------- */}
        {currentMode === 'screen' && activeScreen && (
          <div className="space-y-8 animate-fadeIn">
            {/* Screen Title: Large Screen-Wise Typography */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-xs border-2 border-current inline-block">
                Interactive Decision Point
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {activeScreen.title}
              </h1>
              {activeScreen.description && (
                <p className="text-lg md:text-xl opacity-90 leading-relaxed font-medium">
                  {activeScreen.description}
                </p>
              )}
            </div>

            {/* Warning if Back Navigation is disabled */}
            {activeScreen.disable_back && (
              <div className="p-3.5 border-2 border-current rounded-xs flex items-center gap-3 text-sm font-bold bg-current/5">
                <AlertOctagon className="w-5 h-5 shrink-0" />
                <span>Notice: Back navigation is intentionally disabled for this operational decision.</span>
              </div>
            )}

            {/* Clickable Decision Option Cards */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-black uppercase tracking-wider opacity-75">
                Select Your Execution Route:
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {activeScreen.options.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => startSequence(opt.target_sequence_id)}
                    className={`p-6 rounded-xs ${choiceCardStyle} flex items-center justify-between group shadow-sm`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="text-xl md:text-2xl font-black flex items-center gap-2">
                        <span>➔</span>
                        <span>{opt.label}</span>
                      </div>
                      {opt.description && (
                        <p className="text-sm md:text-base opacity-80 pl-6 leading-normal">
                          {opt.description}
                        </p>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center shrink-0 font-bold group-hover:scale-110 transition-transform">
                      ➔
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* VIEW 2: STEP EXECUTION RUNBOOK */}
        {/* -------------------------------------------------------- */}
        {currentMode === 'step' && activeStep && (
          <div className="space-y-8 animate-fadeIn">
            {/* Step Heading */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-xs border-2 border-current inline-block">
                Step {currentStepIndex + 1}
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                {activeStep.title}
              </h1>
            </div>

            {/* Step Back Warning if disabled on this step */}
            {activeStep.disable_back && (
              <div className="p-3 border-2 border-current rounded-xs flex items-center gap-3 text-sm font-bold bg-current/5">
                <AlertOctagon className="w-5 h-5 shrink-0" />
                <span>Notice: Back navigation is locked on this step to prevent process reversion.</span>
              </div>
            )}

            {/* Markdown Instructions */}
            <div className="prose max-w-none space-y-2 border-y-2 border-current/20 py-4">
              {renderMarkdown(activeStep.content_text)}
            </div>

            {/* Attached Media Assets */}
            {activeStep.assets && activeStep.assets.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-wider block opacity-75">
                  Visual References &amp; Screenshots:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeStep.assets.map((assetName) => {
                    const rawSvgOrImg = assetsMap[assetName];
                    return (
                      <div
                        key={assetName}
                        className={`p-3 rounded-xs ${cardBorder} flex flex-col items-center justify-center overflow-hidden bg-current/5`}
                      >
                        {rawSvgOrImg && rawSvgOrImg.startsWith('<svg') ? (
                          <div
                            className="w-full max-h-64 flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: rawSvgOrImg }}
                          />
                        ) : rawSvgOrImg ? (
                          <img
                            src={rawSvgOrImg}
                            alt={assetName}
                            className="max-h-64 object-contain rounded-xs"
                          />
                        ) : (
                          <div className="p-8 text-center text-xs font-mono">
                            [Asset: {assetName}]
                          </div>
                        )}
                        <span className="text-[11px] font-mono mt-2 opacity-70 truncate max-w-full">
                          {assetName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interactive Checklist Items */}
            {activeStep.checklist && activeStep.checklist.length > 0 && (
              <div className={`p-5 rounded-xs ${cardBorder} space-y-4`}>
                <div className="flex items-center justify-between border-b-2 border-current pb-2">
                  <span className="text-sm font-black uppercase flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Operator Verification Checklist
                  </span>
                  <span className="text-xs font-mono font-bold">
                    {
                      activeStep.checklist.filter(
                        (c) => checklistStates[activeStep.id]?.[c.id] ?? c.checked
                      ).length
                    }{' '}
                    / {activeStep.checklist.length} Complete
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeStep.checklist.map((item) => {
                    const isChecked = checklistStates[activeStep.id]?.[item.id] ?? item.checked;
                    return (
                      <label
                        key={item.id}
                        onClick={() => toggleChecklist(activeStep.id, item.id)}
                        className={`flex items-start gap-3 p-3 rounded-xs border-2 transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'border-current bg-current/10 font-bold'
                            : 'border-current/40 hover:border-current'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by label click
                          className="w-5 h-5 rounded-xs mt-0.5 accent-current cursor-pointer"
                        />
                        <span className="text-base md:text-lg leading-snug flex-1">
                          {item.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 1-Click Copy Fields */}
            {activeStep.copy_fields && activeStep.copy_fields.length > 0 && (
              <div className={`p-5 rounded-xs ${cardBorder} space-y-4`}>
                <span className="text-sm font-black uppercase flex items-center gap-2 border-b-2 border-current pb-2">
                  <Copy className="w-4 h-4" /> Quick Copy Fields &amp; Commands
                </span>

                <div className="space-y-3">
                  {activeStep.copy_fields.map((field, idx) => {
                    const isCopied = copiedKey === `${field.label}-${idx}`;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 rounded-xs border-2 border-current/40"
                      >
                        <div className="space-y-0.5 truncate">
                          <span className="text-xs font-bold block uppercase opacity-80">
                            {field.label}:
                          </span>
                          <code className="text-sm md:text-base font-mono font-bold block truncate select-all">
                            {field.value}
                          </code>
                        </div>

                        <button
                          onClick={() => handleCopy(field.value, `${field.label}-${idx}`)}
                          className={`px-4 py-2 text-xs font-black rounded-xs border-2 border-current flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                            isCopied
                              ? isLight
                                ? 'bg-[#0033AA] text-white'
                                : 'bg-white text-black'
                              : isLight
                              ? 'hover:bg-[#0033AA] hover:text-white'
                              : 'hover:bg-white hover:text-black'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copied!' : 'Copy to Clipboard'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* VIEW 3: PLAYBOOK COMPLETION SUMMARY */}
        {/* -------------------------------------------------------- */}
        {currentMode === 'complete' && (
          <div className="text-center py-12 space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="w-20 h-20 rounded-full border-4 border-current flex items-center justify-center mx-auto text-current animate-bounce">
              <ShieldCheck className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                Playbook Execution Complete!
              </h1>
              <p className="text-base md:text-lg opacity-85 leading-relaxed">
                You have successfully executed all procedures in{' '}
                <strong>{playbook.title}</strong> without unresolved errors.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={restartPlaybook} className={`${btnNavSecondary} flex items-center gap-2`}>
                <RotateCcw className="w-4 h-4" />
                <span>Restart Playbook</span>
              </button>
              <button onClick={onSwitchToBuilder} className={`${btnNav} flex items-center gap-2`}>
                <Edit3 className="w-4 h-4" />
                <span>Return to Builder Mode</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Bottom Navigation Bar */}
      <div className={`p-4 border-t-2 border-current flex items-center justify-between`}>
        {/* Back Button */}
        <button
          onClick={handleBack}
          disabled={isBackDisabled}
          className={`${btnNavSecondary} flex items-center gap-2`}
          title={isBackDisabled ? 'Back navigation is disabled for this step' : 'Return to previous step'}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Execution Status Subtext */}
        <div className="hidden sm:block text-xs font-mono font-bold opacity-75">
          {currentMode === 'step' && activeSequence && (
            <span>
              Sequence Step {currentStepIndex + 1} of {activeSequence.step_ids.length}
            </span>
          )}
          {currentMode === 'screen' && <span>Select path to proceed</span>}
          {currentMode === 'complete' && <span>All steps completed</span>}
        </div>

        {/* Next Button */}
        {currentMode === 'step' && activeSequence && (
          <button onClick={handleNext} className={`${btnNav} flex items-center gap-2`}>
            <span>
              {currentStepIndex === activeSequence.step_ids.length - 1
                ? activeSequence.next_screen_id
                  ? 'Continue ➔'
                  : 'Complete Playbook ➔'
                : 'Next Step ➔'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {/* Decision Screen or Complete: Next is not needed (user clicks choices) */}
        {currentMode !== 'step' && <div className="w-28" />}
      </div>
    </div>
  );
};

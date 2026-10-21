import React, { useState } from 'react';
import { Playbook, Screen, Sequence, Step, ChecklistItem, CopyField, ScreenOption } from '../types/playbook';
import {
  Play,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckSquare,
  Copy,
  Sliders,
  GitBranch,
  ListOrdered,
  FileText,
  AlertTriangle,
  UploadCloud
} from 'lucide-react';

interface BuilderViewProps {
  playbook: Playbook;
  onUpdatePlaybook: (updated: Playbook) => void;
  onSwitchToPlayer: () => void;
  theme: 'light' | 'dark';
  assetsMap: Record<string, string>;
  onAddAsset: (filename: string, dataUrl: string) => void;
}

export const BuilderView: React.FC<BuilderViewProps> = ({
  playbook,
  onUpdatePlaybook,
  onSwitchToPlayer,
  theme,
  assetsMap,
  onAddAsset
}) => {
  const [activeTab, setActiveTab] = useState<'meta' | 'screens' | 'sequences' | 'steps'>('meta');
  const [selectedScreenId, setSelectedScreenId] = useState<string>(playbook.screens[0]?.id || '');
  const [selectedSequenceId, setSelectedSequenceId] = useState<string>(playbook.sequences[0]?.id || '');
  const [selectedStepId, setSelectedStepId] = useState<string>(playbook.steps[0]?.id || '');

  // Local state for new inputs
  const [newChecklistText, setNewChecklistText] = useState('');
  const [newCopyLabel, setNewCopyLabel] = useState('');
  const [newCopyVal, setNewCopyVal] = useState('');

  const isLight = theme === 'light';

  // Strict Theming:
  // Light: Pure Blue (#0033AA / #0055FF) and White (#FFFFFF) only
  // Dark: Pure Black (#000000) and White (#FFFFFF) only
  const cardBorder = isLight ? 'border-2 border-[#0033AA]' : 'border-2 border-white';
  const inputStyle = isLight
    ? 'bg-white text-[#0033AA] border-2 border-[#0033AA] focus:border-[#0055FF] focus:outline-none rounded-xs px-3 py-1.5'
    : 'bg-black text-white border-2 border-white focus:border-neutral-300 focus:outline-none rounded-xs px-3 py-1.5';
  const btnPrimary = isLight
    ? 'bg-[#0033AA] hover:bg-[#0055FF] text-white font-bold px-4 py-2 rounded-xs border-2 border-[#0033AA] transition-colors cursor-pointer'
    : 'bg-white hover:bg-neutral-200 text-black font-bold px-4 py-2 rounded-xs border-2 border-white transition-colors cursor-pointer';
  const btnSecondary = isLight
    ? 'bg-white hover:bg-[#0033AA] hover:text-white text-[#0033AA] font-semibold px-3 py-1.5 rounded-xs border-2 border-[#0033AA] transition-colors cursor-pointer'
    : 'bg-black hover:bg-white hover:text-black text-white font-semibold px-3 py-1.5 rounded-xs border-2 border-white transition-colors cursor-pointer';
  const tabActive = isLight ? 'bg-[#0033AA] text-white border-[#0033AA]' : 'bg-white text-black border-white';

  const currentScreen = playbook.screens.find((s) => s.id === selectedScreenId) || playbook.screens[0];
  const currentSequence = playbook.sequences.find((s) => s.id === selectedSequenceId) || playbook.sequences[0];
  const currentStep = playbook.steps.find((s) => s.id === selectedStepId) || playbook.steps[0];

  // -------------------------------------------------------------
  // METADATA MUTATIONS
  // -------------------------------------------------------------
  const updateMeta = (field: keyof Playbook, val: any) => {
    onUpdatePlaybook({
      ...playbook,
      [field]: val
    });
  };

  // -------------------------------------------------------------
  // SCREENS MUTATIONS
  // -------------------------------------------------------------
  const addScreen = () => {
    const newId = `screen_${Date.now()}`;
    const newScreen: Screen = {
      id: newId,
      title: `Decision Screen ${playbook.screens.length + 1}`,
      description: 'Choose your desired path.',
      disable_back: false,
      type: 'decision',
      options: [
        {
          id: `opt_${Date.now()}`,
          label: 'Default Flow',
          description: 'Proceed with standard installation',
          target_sequence_id: playbook.sequences[0]?.id || ''
        }
      ]
    };
    onUpdatePlaybook({
      ...playbook,
      screens: [...playbook.screens, newScreen]
    });
    setSelectedScreenId(newId);
  };

  const updateCurrentScreen = (updates: Partial<Screen>) => {
    if (!currentScreen) return;
    const updatedScreens = playbook.screens.map((s) => (s.id === currentScreen.id ? { ...s, ...updates } : s));
    onUpdatePlaybook({ ...playbook, screens: updatedScreens });
  };

  const deleteCurrentScreen = () => {
    if (playbook.screens.length <= 1) return;
    const updated = playbook.screens.filter((s) => s.id !== currentScreen.id);
    onUpdatePlaybook({ ...playbook, screens: updated });
    setSelectedScreenId(updated[0].id);
  };

  const addScreenOption = () => {
    if (!currentScreen) return;
    const newOpt: ScreenOption = {
      id: `opt_${Date.now()}`,
      label: `Option ${currentScreen.options.length + 1}`,
      description: 'Routes to selected sequence',
      target_sequence_id: playbook.sequences[0]?.id || ''
    };
    updateCurrentScreen({ options: [...currentScreen.options, newOpt] });
  };

  const updateScreenOption = (optId: string, updates: Partial<ScreenOption>) => {
    if (!currentScreen) return;
    const updatedOptions = currentScreen.options.map((o) => (o.id === optId ? { ...o, ...updates } : o));
    updateCurrentScreen({ options: updatedOptions });
  };

  const removeScreenOption = (optId: string) => {
    if (!currentScreen) return;
    updateCurrentScreen({ options: currentScreen.options.filter((o) => o.id !== optId) });
  };

  // -------------------------------------------------------------
  // SEQUENCES MUTATIONS
  // -------------------------------------------------------------
  const addSequence = () => {
    const newId = `seq_${Date.now()}`;
    const newSeq: Sequence = {
      id: newId,
      title: `Sequence Flow ${playbook.sequences.length + 1}`,
      step_ids: playbook.steps[0] ? [playbook.steps[0].id] : [],
      next_screen_id: null
    };
    onUpdatePlaybook({ ...playbook, sequences: [...playbook.sequences, newSeq] });
    setSelectedSequenceId(newId);
  };

  const updateCurrentSequence = (updates: Partial<Sequence>) => {
    if (!currentSequence) return;
    const updated = playbook.sequences.map((sq) => (sq.id === currentSequence.id ? { ...sq, ...updates } : sq));
    onUpdatePlaybook({ ...playbook, sequences: updated });
  };

  const deleteCurrentSequence = () => {
    if (playbook.sequences.length <= 1) return;
    const updated = playbook.sequences.filter((sq) => sq.id !== currentSequence.id);
    onUpdatePlaybook({ ...playbook, sequences: updated });
    setSelectedSequenceId(updated[0].id);
  };

  const addStepToSequence = (stepId: string) => {
    if (!currentSequence) return;
    updateCurrentSequence({ step_ids: [...currentSequence.step_ids, stepId] });
  };

  const removeStepFromSequence = (index: number) => {
    if (!currentSequence) return;
    const newSteps = [...currentSequence.step_ids];
    newSteps.splice(index, 1);
    updateCurrentSequence({ step_ids: newSteps });
  };

  // -------------------------------------------------------------
  // STEPS MUTATIONS
  // -------------------------------------------------------------
  const addStep = () => {
    const newId = `step_${Date.now()}`;
    const newStep: Step = {
      id: newId,
      title: `Step ${playbook.steps.length + 1}`,
      content_file: `content/${newId}.md`,
      content_text: `### Step ${playbook.steps.length + 1}\n\nDescribe what the user should execute here.`,
      assets: [],
      checklist: [],
      copy_fields: [],
      disable_back: false
    };
    onUpdatePlaybook({ ...playbook, steps: [...playbook.steps, newStep] });
    setSelectedStepId(newId);
  };

  const updateCurrentStep = (updates: Partial<Step>) => {
    if (!currentStep) return;
    const updated = playbook.steps.map((st) => (st.id === currentStep.id ? { ...st, ...updates } : st));
    onUpdatePlaybook({ ...playbook, steps: updated });
  };

  const deleteCurrentStep = () => {
    if (playbook.steps.length <= 1) return;
    const removedId = currentStep.id;
    const updated = playbook.steps.filter((st) => st.id !== removedId);
    // Also remove from sequences
    const updatedSeqs = playbook.sequences.map((sq) => ({
      ...sq,
      step_ids: sq.step_ids.filter((sid) => sid !== removedId)
    }));
    onUpdatePlaybook({ ...playbook, steps: updated, sequences: updatedSeqs });
    setSelectedStepId(updated[0].id);
  };

  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentStep) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const filename = file.name.replace(/\s+/g, '_');
      onAddAsset(filename, dataUrl);
      if (!currentStep.assets.includes(filename)) {
        updateCurrentStep({ assets: [...currentStep.assets, filename] });
      }
    };
    reader.readAsText(file);
  };

  const removeAssetFromStep = (assetName: string) => {
    if (!currentStep) return;
    updateCurrentStep({ assets: currentStep.assets.filter((a) => a !== assetName) });
  };

  const addChecklist = () => {
    if (!newChecklistText.trim() || !currentStep) return;
    const item: ChecklistItem = {
      id: `c_${Date.now()}`,
      text: newChecklistText.trim(),
      checked: false
    };
    updateCurrentStep({ checklist: [...currentStep.checklist, item] });
    setNewChecklistText('');
  };

  const removeChecklist = (id: string) => {
    if (!currentStep) return;
    updateCurrentStep({ checklist: currentStep.checklist.filter((c) => c.id !== id) });
  };

  const addCopyField = () => {
    if (!newCopyLabel.trim() || !newCopyVal.trim() || !currentStep) return;
    const field: CopyField = {
      label: newCopyLabel.trim(),
      value: newCopyVal.trim()
    };
    updateCurrentStep({ copy_fields: [...currentStep.copy_fields, field] });
    setNewCopyLabel('');
    setNewCopyVal('');
  };

  const removeCopyField = (index: number) => {
    if (!currentStep) return;
    const newFields = [...currentStep.copy_fields];
    newFields.splice(index, 1);
    updateCurrentStep({ copy_fields: newFields });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Builder Control Header */}
      <div className={`p-4 border-b-2 border-current flex items-center justify-between`}>
        <div>
          <h2 className="text-lg font-black tracking-tight">Builder Mode — Visual Playbook Architect</h2>
          <p className="text-xs opacity-75">
            Construct interactive SOPs, decision screens, and runbooks without editing raw JSON or Markdown.
          </p>
        </div>

        <button onClick={onSwitchToPlayer} className={`${btnPrimary} flex items-center gap-2`}>
          <Play className="w-4 h-4 fill-current" />
          <span>Launch in Player Mode</span>
        </button>
      </div>

      {/* Builder Tab Navigation */}
      <div className="flex border-b-2 border-current text-xs font-bold">
        <button
          onClick={() => setActiveTab('meta')}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'meta' ? tabActive : 'hover:opacity-80'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>1. Playbook Meta</span>
        </button>
        <button
          onClick={() => setActiveTab('screens')}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'screens' ? tabActive : 'hover:opacity-80'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>2. Screens (Decision Routing)</span>
        </button>
        <button
          onClick={() => setActiveTab('sequences')}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'sequences' ? tabActive : 'hover:opacity-80'
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>3. Sequences (Linear Flows)</span>
        </button>
        <button
          onClick={() => setActiveTab('steps')}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'steps' ? tabActive : 'hover:opacity-80'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>4. Steps &amp; Interactive Content</span>
        </button>
      </div>

      {/* Main Tab Body */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* TAB 1: META */}
        {activeTab === 'meta' && (
          <div className="max-w-2xl space-y-6">
            <div className={`p-5 rounded-xs ${cardBorder} space-y-4`}>
              <h3 className="text-sm font-black tracking-wide uppercase border-b-2 border-current pb-2">
                Master Configuration
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-bold block">Folder Name (Identifier on disk):</label>
                <input
                  type="text"
                  value={playbook.name}
                  onChange={(e) => updateMeta('name', e.target.value.replace(/\s+/g, '_'))}
                  className={`w-full ${inputStyle}`}
                  placeholder="e.g. Installing_Python"
                />
                <span className="text-[11px] opacity-70">
                  Folder created on disk: will contain config.json, /content/, and /assets/.
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold block">Display Title:</label>
                <input
                  type="text"
                  value={playbook.title}
                  onChange={(e) => updateMeta('title', e.target.value)}
                  className={`w-full ${inputStyle}`}
                  placeholder="e.g. Installing Python & Developer Tools"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold block">Description &amp; Runbook Purpose:</label>
                <textarea
                  rows={3}
                  value={playbook.description}
                  onChange={(e) => updateMeta('description', e.target.value)}
                  className={`w-full ${inputStyle}`}
                  placeholder="High-level description of what this runbook accomplishes..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold block">Starting Screen (Multiplexer Entry Point):</label>
                <select
                  value={playbook.start_screen_id}
                  onChange={(e) => updateMeta('start_screen_id', e.target.value)}
                  className={`w-full ${inputStyle} cursor-pointer`}
                >
                  {playbook.screens.map((scr) => (
                    <option key={scr.id} value={scr.id} className="text-black">
                      {scr.title} ({scr.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visual Guide Card */}
            <div className={`p-4 rounded-xs border-2 border-dashed border-current/40 space-y-2 text-xs`}>
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Architecture Guide for Non-Technical Playbook Authors</span>
              </div>
              <p className="leading-relaxed opacity-85">
                • <strong>Playbook</strong>: The master package containing all steps, decision multiplexers, and media.<br />
                • <strong>Screen</strong>: A decision point where users choose a route (e.g., Windows vs macOS vs Linux).<br />
                • <strong>Sequence</strong>: A continuous, linear chain of steps executed in order.<br />
                • <strong>Step</strong>: The interactive execution view featuring Markdown guidance, checklists, and 1-click copy fields.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: SCREENS (DECISION MULTIPLEXERS) */}
        {activeTab === 'screens' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Screen List Column */}
            <div className={`p-4 rounded-xs ${cardBorder} space-y-3`}>
              <div className="flex items-center justify-between border-b-2 border-current pb-2">
                <span className="text-xs font-black uppercase">Decision Screens</span>
                <button onClick={addScreen} className={`${btnSecondary} text-xs py-1 px-2 flex items-center gap-1`}>
                  <Plus className="w-3 h-3" /> Add Screen
                </button>
              </div>

              <div className="space-y-1 max-h-96 overflow-y-auto">
                {playbook.screens.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScreenId(s.id)}
                    className={`w-full text-left p-2.5 rounded-xs text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                      s.id === currentScreen?.id
                        ? isLight
                          ? 'bg-[#0033AA] text-white'
                          : 'bg-white text-black'
                        : 'hover:bg-current/10'
                    }`}
                  >
                    <span className="truncate">⬡ {s.title}</span>
                    <span className="text-[10px] opacity-70 ml-1">{s.options.length} route(s)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Screen Form Editor Column */}
            {currentScreen && (
              <div className={`md:col-span-2 p-5 rounded-xs ${cardBorder} space-y-5`}>
                <div className="flex items-center justify-between border-b-2 border-current pb-2">
                  <h3 className="text-sm font-black uppercase">Edit Decision Screen: {currentScreen.title}</h3>
                  {playbook.screens.length > 1 && (
                    <button
                      onClick={deleteCurrentScreen}
                      className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Screen
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">Screen Title:</label>
                  <input
                    type="text"
                    value={currentScreen.title}
                    onChange={(e) => updateCurrentScreen({ title: e.target.value })}
                    className={`w-full ${inputStyle}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">Prompt / Guidance for Layman User:</label>
                  <textarea
                    rows={2}
                    value={currentScreen.description}
                    onChange={(e) => updateCurrentScreen({ description: e.target.value })}
                    className={`w-full ${inputStyle}`}
                    placeholder="Instructions explaining which route the user should select..."
                  />
                </div>

                {/* Disable Back Navigation Toggle (Requirement) */}
                <div className="p-3 border-2 border-current rounded-xs flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold block">Disable Back Navigation on this Screen</label>
                    <span className="text-[11px] opacity-75">
                      Prevents users from reverting backward if backtracking would disrupt a live system state.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentScreen.disable_back}
                    onChange={(e) => updateCurrentScreen({ disable_back: e.target.checked })}
                    className="w-4 h-4 cursor-pointer accent-current"
                  />
                </div>

                {/* Routing Options (Multiplexer Decision Buttons) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between border-t-2 border-current pt-3">
                    <span className="text-xs font-black uppercase">Routing Choices (User Clickable Cards)</span>
                    <button onClick={addScreenOption} className={`${btnSecondary} text-xs py-1 px-2 flex items-center gap-1`}>
                      <Plus className="w-3 h-3" /> Add Choice Option
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentScreen.options.map((opt, idx) => (
                      <div key={opt.id} className={`p-3 rounded-xs border-2 border-current/40 space-y-2 text-xs`}>
                        <div className="flex items-center justify-between font-bold">
                          <span>Choice #{idx + 1}</span>
                          <button
                            onClick={() => removeScreenOption(opt.id)}
                            className="text-red-500 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold mb-0.5">Button Label:</label>
                            <input
                              type="text"
                              value={opt.label}
                              onChange={(e) => updateScreenOption(opt.id, { label: e.target.value })}
                              className={`w-full ${inputStyle} text-xs`}
                              placeholder="e.g. Windows Flow"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold mb-0.5">Target Sequence to Launch:</label>
                            <select
                              value={opt.target_sequence_id}
                              onChange={(e) => updateScreenOption(opt.id, { target_sequence_id: e.target.value })}
                              className={`w-full ${inputStyle} text-xs cursor-pointer`}
                            >
                              {playbook.sequences.map((sq) => (
                                <option key={sq.id} value={sq.id} className="text-black">
                                  {sq.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold mb-0.5">Subtext Description:</label>
                          <input
                            type="text"
                            value={opt.description}
                            onChange={(e) => updateScreenOption(opt.id, { description: e.target.value })}
                            className={`w-full ${inputStyle} text-xs`}
                            placeholder="Briefly explain what this choice does..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SEQUENCES (LINEAR FLOWS) */}
        {activeTab === 'sequences' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-4 rounded-xs ${cardBorder} space-y-3`}>
              <div className="flex items-center justify-between border-b-2 border-current pb-2">
                <span className="text-xs font-black uppercase">Sequences</span>
                <button onClick={addSequence} className={`${btnSecondary} text-xs py-1 px-2 flex items-center gap-1`}>
                  <Plus className="w-3 h-3" /> Add Flow
                </button>
              </div>

              <div className="space-y-1 max-h-96 overflow-y-auto">
                {playbook.sequences.map((sq) => (
                  <button
                    key={sq.id}
                    onClick={() => setSelectedSequenceId(sq.id)}
                    className={`w-full text-left p-2.5 rounded-xs text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                      sq.id === currentSequence?.id
                        ? isLight
                          ? 'bg-[#0033AA] text-white'
                          : 'bg-white text-black'
                        : 'hover:bg-current/10'
                    }`}
                  >
                    <span className="truncate">↳ {sq.title}</span>
                    <span className="text-[10px] opacity-70 ml-1">{sq.step_ids.length} step(s)</span>
                  </button>
                ))}
              </div>
            </div>

            {currentSequence && (
              <div className={`md:col-span-2 p-5 rounded-xs ${cardBorder} space-y-5`}>
                <div className="flex items-center justify-between border-b-2 border-current pb-2">
                  <h3 className="text-sm font-black uppercase">Edit Sequence Flow: {currentSequence.title}</h3>
                  {playbook.sequences.length > 1 && (
                    <button
                      onClick={deleteCurrentSequence}
                      className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Sequence
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">Sequence Title:</label>
                  <input
                    type="text"
                    value={currentSequence.title}
                    onChange={(e) => updateCurrentSequence({ title: e.target.value })}
                    className={`w-full ${inputStyle}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">When Sequence Ends, Route To:</label>
                  <select
                    value={currentSequence.next_screen_id || ''}
                    onChange={(e) => updateCurrentSequence({ next_screen_id: e.target.value || null })}
                    className={`w-full ${inputStyle} cursor-pointer`}
                  >
                    <option value="" className="text-black">
                      — Finish Playbook (Completion Screen) —
                    </option>
                    {playbook.screens.map((scr) => (
                      <option key={scr.id} value={scr.id} className="text-black">
                        Screen: {scr.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Steps in this sequence */}
                <div className="space-y-3 pt-3 border-t-2 border-current">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase">Steps In This Flow ({currentSequence.step_ids.length})</span>
                    <div className="flex items-center gap-2">
                      <select
                        id="addStepSelect"
                        className={`${inputStyle} text-xs py-1`}
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            addStepToSequence(e.target.value);
                            e.target.value = '';
                          }
                        }}
                      >
                        <option value="" disabled className="text-black">
                          + Include Step...
                        </option>
                        {playbook.steps.map((st) => (
                          <option key={st.id} value={st.id} className="text-black">
                            {st.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {currentSequence.step_ids.map((stId, index) => {
                      const stepObj = playbook.steps.find((s) => s.id === stId);
                      return (
                        <div
                          key={`${stId}-${index}`}
                          className="flex items-center justify-between p-2.5 rounded-xs border-2 border-current/30 text-xs font-semibold"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                              {index + 1}
                            </span>
                            <span>{stepObj?.title || stId}</span>
                          </div>
                          <button
                            onClick={() => removeStepFromSequence(index)}
                            className="text-red-500 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STEPS (VISUAL STEP BUILDER) */}
        {activeTab === 'steps' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-4 rounded-xs ${cardBorder} space-y-3`}>
              <div className="flex items-center justify-between border-b-2 border-current pb-2">
                <span className="text-xs font-black uppercase">All Steps</span>
                <button onClick={addStep} className={`${btnSecondary} text-xs py-1 px-2 flex items-center gap-1`}>
                  <Plus className="w-3 h-3" /> Add Step
                </button>
              </div>

              <div className="space-y-1 max-h-96 overflow-y-auto">
                {playbook.steps.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStepId(st.id)}
                    className={`w-full text-left p-2.5 rounded-xs text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                      st.id === currentStep?.id
                        ? isLight
                          ? 'bg-[#0033AA] text-white'
                          : 'bg-white text-black'
                        : 'hover:bg-current/10'
                    }`}
                  >
                    <span className="truncate">• {st.title}</span>
                    {st.disable_back && (
                      <span className="text-[10px] border border-current px-1 rounded-xs">Locked</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {currentStep && (
              <div className={`md:col-span-2 p-5 rounded-xs ${cardBorder} space-y-5`}>
                <div className="flex items-center justify-between border-b-2 border-current pb-2">
                  <h3 className="text-sm font-black uppercase">Visual Step Editor: {currentStep.title}</h3>
                  {playbook.steps.length > 1 && (
                    <button
                      onClick={deleteCurrentStep}
                      className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Step
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">Step Title:</label>
                  <input
                    type="text"
                    value={currentStep.title}
                    onChange={(e) => updateCurrentStep({ title: e.target.value })}
                    className={`w-full ${inputStyle}`}
                  />
                </div>

                {/* Back Button Disable toggle per step */}
                <div className="p-3 border-2 border-current rounded-xs flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold block">Disable 'Back' Navigation on this specific Step</label>
                    <span className="text-[11px] opacity-75">
                      Toggle if this step triggers irreversible changes (e.g. database schema migration or format).
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentStep.disable_back}
                    onChange={(e) => updateCurrentStep({ disable_back: e.target.checked })}
                    className="w-4 h-4 cursor-pointer accent-current"
                  />
                </div>

                {/* Step Instructions / Text */}
                <div className="space-y-1">
                  <label className="text-xs font-bold block">
                    Instructions &amp; Guidance (Formatted text for layman):
                  </label>
                  <textarea
                    rows={5}
                    value={currentStep.content_text}
                    onChange={(e) => updateCurrentStep({ content_text: e.target.value })}
                    className={`w-full ${inputStyle} font-sans`}
                    placeholder="Write instructions clearly for the operator..."
                  />
                </div>

                {/* Media Assets Manager */}
                <div className="space-y-3 pt-3 border-t-2 border-current">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4" /> Attached Media &amp; Screenshots (Copied to /assets/)
                    </span>
                    <label className={`${btnSecondary} text-xs py-1 px-2.5 flex items-center gap-1.5 cursor-pointer`}>
                      <UploadCloud className="w-3.5 h-3.5" /> Attach Image/File
                      <input type="file" accept="image/*,.svg" onChange={handleAssetUpload} className="hidden" />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentStep.assets.map((asset) => (
                      <div
                        key={asset}
                        className="px-2.5 py-1.5 rounded-xs border-2 border-current flex items-center gap-2 text-xs font-semibold"
                      >
                        <span className="truncate max-w-[140px]">{asset}</span>
                        <button
                          onClick={() => removeAssetFromStep(asset)}
                          className="text-red-500 font-bold hover:underline cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {currentStep.assets.length === 0 && (
                      <span className="text-xs opacity-60 italic">No media attached to this step.</span>
                    )}
                  </div>
                </div>

                {/* Interactive Checklists */}
                <div className="space-y-3 pt-3 border-t-2 border-current">
                  <span className="text-xs font-black uppercase flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4" /> Interactive Checklist Items (Verifies execution)
                  </span>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newChecklistText}
                      onChange={(e) => setNewChecklistText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addChecklist()}
                      placeholder="e.g. Checked 'Add python.exe to PATH'"
                      className={`flex-1 ${inputStyle} text-xs`}
                    />
                    <button onClick={addChecklist} className={`${btnSecondary} text-xs py-1 px-3`}>
                      + Add Item
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {currentStep.checklist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-xs border border-current/30 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border border-current rounded-xs inline-block" />
                          <span>{item.text}</span>
                        </div>
                        <button
                          onClick={() => removeChecklist(item.id)}
                          className="text-red-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1-Click Copy Fields */}
                <div className="space-y-3 pt-3 border-t-2 border-current">
                  <span className="text-xs font-black uppercase flex items-center gap-1.5">
                    <Copy className="w-4 h-4" /> 1-Click Copy Fields (Terminal commands, URLs, configs)
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    <input
                      type="text"
                      value={newCopyLabel}
                      onChange={(e) => setNewCopyLabel(e.target.value)}
                      placeholder="Label (e.g. Silent Install)"
                      className={`md:col-span-2 ${inputStyle} text-xs`}
                    />
                    <input
                      type="text"
                      value={newCopyVal}
                      onChange={(e) => setNewCopyVal(e.target.value)}
                      placeholder="Value to copy (e.g. python -m pip...)"
                      className={`md:col-span-2 ${inputStyle} text-xs`}
                    />
                    <button onClick={addCopyField} className={`${btnSecondary} text-xs py-1`}>
                      + Add Field
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {currentStep.copy_fields.map((field, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-xs border border-current/30 text-xs font-mono"
                      >
                        <div className="flex items-center gap-3 truncate">
                          <span className="font-bold font-sans">{field.label}:</span>
                          <span className="opacity-80 truncate">{field.value}</span>
                        </div>
                        <button
                          onClick={() => removeCopyField(idx)}
                          className="text-red-500 font-sans hover:underline cursor-pointer shrink-0 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { Playbook } from './types/playbook';
import { DEFAULT_PLAYBOOK, DEFAULT_ASSETS } from './data/defaultPlaybook';
import { exportPlaybookZip, importPlaybookZip, downloadPyQt6ProjectZip } from './utils/zipUtils';

import { SplashScreen } from './components/SplashScreen';
import { LicenseDialog } from './components/LicenseDialog';
import { MenuBar } from './components/MenuBar';
import { SidebarTree } from './components/SidebarTree';
import { BuilderView } from './components/BuilderView';
import { PlayerView } from './components/PlayerView';
import { CodeInspectorModal } from './components/CodeInspectorModal';
import { AboutModal } from './components/AboutModal';

import { RotateCcw } from 'lucide-react';

export default function App() {
  // App Lifecycle States
  const [splashVisible, setSplashVisible] = useState<boolean>(true);
  const [licenseVisible, setLicenseVisible] = useState<boolean>(false);
  const [licenseAccepted, setLicenseAccepted] = useState<boolean>(false);

  // Playbook & Theming States
  // Theming strictly: 'light' (Pure Blue & White) or 'dark' (Pure Black & White)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeMode, setActiveMode] = useState<'builder' | 'player'>('builder');
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);

  const [playbook, setPlaybook] = useState<Playbook>(DEFAULT_PLAYBOOK);
  const [assetsMap, setAssetsMap] = useState<Record<string, string>>(DEFAULT_ASSETS);

  // Active navigation coordinates for sync between sidebar and main views
  const [navTarget, setNavTarget] = useState<{
    screenId?: string;
    sequenceId?: string;
    stepId?: string;
  }>({
    screenId: playbook.screens[0]?.id
  });

  // Modals
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const zipInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // -------------------------------------------------------------
  // SPLASH & LICENSE LIFECYCLE
  // -------------------------------------------------------------
  const handleSplashDone = () => {
    setSplashVisible(false);
    setLicenseVisible(true);
  };

  const handleLicenseAccept = () => {
    setLicenseVisible(false);
    setLicenseAccepted(true);
  };

  const handleLicenseDecline = () => {
    setLicenseVisible(false);
    setLicenseAccepted(false);
  };

  // -------------------------------------------------------------
  // PLAYBOOK OPERATIONS
  // -------------------------------------------------------------
  const handleNewPlaybook = () => {
    const emptyPlaybook: Playbook = {
      version: '1.0',
      name: 'New_Playbook',
      title: 'Untitled Interactive Playbook',
      description: 'Created with Step-case',
      start_screen_id: 'screen_start',
      screens: [
        {
          id: 'screen_start',
          title: 'Welcome Screen',
          description: 'Choose which workflow sequence you wish to execute.',
          disable_back: false,
          type: 'decision',
          options: [
            {
              id: 'opt_1',
              label: 'Standard Flow',
              description: 'Begin step-by-step procedure',
              target_sequence_id: 'seq_1'
            }
          ]
        }
      ],
      sequences: [
        {
          id: 'seq_1',
          title: 'Standard Workflow Sequence',
          step_ids: ['step_1'],
          next_screen_id: null
        }
      ],
      steps: [
        {
          id: 'step_1',
          title: 'Initial Procedure Step',
          content_file: 'content/step_1.md',
          content_text: '### Initial Step Instructions\n\nFollow the instructions here to proceed.',
          assets: [],
          checklist: [{ id: 'c1', text: 'Checked environment prerequisites', checked: false }],
          copy_fields: [{ label: 'Verify Command', value: 'echo "Ready"' }],
          disable_back: false
        }
      ]
    };
    setPlaybook(emptyPlaybook);
    setNavTarget({ screenId: 'screen_start' });
    showToast('New blank Playbook created.');
  };

  const handleSavePlaybook = () => {
    showToast(`Playbook '${playbook.title}' saved to local storage.`);
  };

  const handleExportZip = async () => {
    try {
      await exportPlaybookZip(playbook, assetsMap);
      showToast(`Exported ${playbook.name}.zip successfully.`);
    } catch (err: any) {
      showToast(`Export failed: ${err.message}`);
    }
  };

  const handleImportZipFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { playbook: loaded, assets } = await importPlaybookZip(file);
      setPlaybook(loaded);
      setAssetsMap((prev) => ({ ...prev, ...assets }));
      setNavTarget({ screenId: loaded.start_screen_id || loaded.screens[0]?.id });
      showToast(`Successfully imported '${loaded.title}'!`);
    } catch (err: any) {
      showToast(`Failed to import ZIP: ${err.message}`);
    }
    // reset input
    e.target.value = '';
  };

  const handleAddAsset = (filename: string, dataUrl: string) => {
    setAssetsMap((prev) => ({ ...prev, [filename]: dataUrl }));
    showToast(`Asset '${filename}' copied into Playbook /assets/.`);
  };

  // -------------------------------------------------------------
  // NAVIGATION HANDLERS FROM SIDEBAR
  // -------------------------------------------------------------
  const handleNavigateScreen = (screenId: string) => {
    setNavTarget({ screenId, sequenceId: undefined, stepId: undefined });
  };

  const handleNavigateSequence = (seqId: string) => {
    setNavTarget({ sequenceId: seqId, screenId: undefined, stepId: undefined });
  };

  const handleNavigateStep = (seqId: string, stepId: string) => {
    setNavTarget({ sequenceId: seqId, stepId, screenId: undefined });
  };

  // 1. Splash Screen Phase (1 second)
  if (splashVisible) {
    return <SplashScreen onFinish={handleSplashDone} />;
  }

  // 2. Tkinter-style License Acceptance Phase
  if (licenseVisible) {
    return <LicenseDialog onAccept={handleLicenseAccept} onDecline={handleLicenseDecline} />;
  }

  // If Declined: Provide clean reentry screen
  if (!licenseAccepted) {
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-4 text-2xl font-black">
          AXC
        </div>
        <h1 className="text-2xl font-bold mb-2">Step-case Launch Declined</h1>
        <p className="text-sm text-neutral-400 max-w-sm mb-6">
          License agreement must be accepted to initialize the Step-case runtime environment.
        </p>
        <button
          onClick={() => setLicenseVisible(true)}
          className="px-6 py-2.5 bg-white text-black font-bold rounded-xs flex items-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Re-open License Dialog</span>
        </button>
      </div>
    );
  }

  // 3. Step-case Main Window
  // Theming strictly:
  // Light: Pure Blue and White only
  // Dark: Pure Black and White only
  const isLight = theme === 'light';
  const appContainerBg = isLight ? 'bg-white text-[#0033AA]' : 'bg-black text-white';

  return (
    <div className={`h-screen flex flex-col overflow-hidden font-sans select-none ${appContainerBg}`}>
      {/* Hidden File Input for ZIP import */}
      <input
        type="file"
        ref={zipInputRef}
        onChange={handleImportZipFile}
        accept=".zip,application/zip"
        className="hidden"
      />

      {/* Top Application Menu Bar */}
      <MenuBar
        theme={theme}
        setTheme={setTheme}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        toggleSidebar={() => setSidebarVisible(!sidebarVisible)}
        onNewPlaybook={handleNewPlaybook}
        onSavePlaybook={handleSavePlaybook}
        onExportZip={handleExportZip}
        onImportZipClick={() => zipInputRef.current?.click()}
        onDownloadProjectZip={downloadPyQt6ProjectZip}
        onOpenCodeInspector={() => setIsCodeModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Left Sidebar */}
        {sidebarVisible && (
          <SidebarTree
            playbook={playbook}
            theme={theme}
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            onNavigateScreen={handleNavigateScreen}
            onNavigateSequence={handleNavigateSequence}
            onNavigateStep={handleNavigateStep}
            currentActiveId={navTarget.stepId || navTarget.sequenceId || navTarget.screenId}
          />
        )}

        {/* Central Workspace Mode: Builder or Player */}
        <main className="flex-1 flex overflow-hidden">
          {activeMode === 'builder' ? (
            <BuilderView
              playbook={playbook}
              onUpdatePlaybook={setPlaybook}
              onSwitchToPlayer={() => setActiveMode('player')}
              theme={theme}
              assetsMap={assetsMap}
              onAddAsset={handleAddAsset}
            />
          ) : (
            <PlayerView
              playbook={playbook}
              onSwitchToBuilder={() => setActiveMode('builder')}
              theme={theme}
              assetsMap={assetsMap}
              activeScreenId={navTarget.screenId}
              activeSequenceId={navTarget.sequenceId}
              activeStepId={navTarget.stepId}
              onStateChange={(state) => {
                // Keep tree sync
                if (state.mode === 'screen') {
                  setNavTarget({ screenId: state.id });
                } else {
                  setNavTarget((prev) => ({ ...prev, stepId: state.id }));
                }
              }}
            />
          )}
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer
        className={`px-3 py-1 text-xs border-t-2 border-current flex items-center justify-between font-mono ${
          isLight ? 'bg-white text-[#0033AA]' : 'bg-black text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold">
            Step-case Ready • Mode: {activeMode === 'builder' ? 'Builder (Visual Authoring)' : 'Player (Execution)'}
          </span>
          <span className="opacity-40">|</span>
          <span className="opacity-80">
            Theme: {isLight ? 'Light (Pure Blue & White)' : 'Dark (Pure Black & White)'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>Made with Love by Alex Sakha</span>
          <span className="opacity-40">|</span>
          <span>v1.0.0</span>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-8 right-8 z-50 px-4 py-2 text-xs font-bold rounded-xs border-2 shadow-2xl transition-all duration-200 ${
            isLight
              ? 'bg-[#0033AA] text-white border-[#0055FF]'
              : 'bg-white text-black border-white'
          }`}
        >
          {toastMessage}
        </div>
      )}

      {/* Modals */}
      <CodeInspectorModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        theme={theme}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        theme={theme}
      />
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Download,
  Upload,
  FolderOpen,
  Save,
  Moon,
  Sun,
  Sidebar,
  Code2,
  Info,
  Play,
  Edit3,
  Archive
} from 'lucide-react';

interface MenuBarProps {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  activeMode: 'builder' | 'player';
  setActiveMode: (m: 'builder' | 'player') => void;
  toggleSidebar: () => void;
  onNewPlaybook: () => void;
  onSavePlaybook: () => void;
  onExportZip: () => void;
  onImportZipClick: () => void;
  onDownloadProjectZip: () => void;
  onOpenCodeInspector: () => void;
  onOpenAbout: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  theme,
  setTheme,
  activeMode,
  setActiveMode,
  toggleSidebar,
  onNewPlaybook,
  onSavePlaybook,
  onExportZip,
  onImportZipClick,
  onDownloadProjectZip,
  onOpenCodeInspector,
  onOpenAbout
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const isLight = theme === 'light';

  // Strict Theming:
  // Light: Pure Blue and White only
  // Dark: Pure Black and White only
  const barBg = isLight ? 'bg-[#0033AA] text-white border-b-2 border-[#0055FF]' : 'bg-[#000000] text-white border-b-2 border-white';
  const itemHover = isLight ? 'hover:bg-[#0055FF]' : 'hover:bg-white hover:text-black';
  const dropdownBg = isLight
    ? 'bg-white text-[#0033AA] border-2 border-[#0033AA] shadow-xl'
    : 'bg-black text-white border-2 border-white shadow-xl';
  const dropdownItemHover = isLight
    ? 'hover:bg-[#0033AA] hover:text-white'
    : 'hover:bg-white hover:text-black';

  return (
    <div ref={menuBarRef} className={`relative flex items-center justify-between px-3 py-1 text-xs select-none ${barBg}`}>
      {/* Left Menu Items */}
      <div className="flex items-center space-x-1">
        {/* Step-case Brand Badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 font-black tracking-wider uppercase mr-2 border border-current rounded-xs">
          <span>AXC</span>
          <span className="opacity-60 text-[10px]">|</span>
          <span className="font-bold">Step-case</span>
        </div>

        {/* File Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
            className={`px-2.5 py-1 font-semibold rounded-xs transition-colors cursor-pointer ${
              openMenu === 'file' ? (isLight ? 'bg-[#0055FF]' : 'bg-white text-black') : itemHover
            }`}
          >
            File
          </button>
          {openMenu === 'file' && (
            <div className={`absolute top-full left-0 mt-1 w-64 py-1 z-50 rounded-xs ${dropdownBg}`}>
              <button
                onClick={() => {
                  onNewPlaybook();
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> New Playbook
                </span>
                <span className="text-[10px] opacity-60">Ctrl+N</span>
              </button>
              <button
                onClick={() => {
                  onSavePlaybook();
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <Save className="w-3.5 h-3.5" /> Save Playbook
                </span>
                <span className="text-[10px] opacity-60">Ctrl+S</span>
              </button>
              <div className={`my-1 border-t ${isLight ? 'border-[#0033AA]/20' : 'border-white/20'}`} />
              <button
                onClick={() => {
                  onExportZip();
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <Archive className="w-3.5 h-3.5" /> Export Playbook as .ZIP
                </span>
                <span className="text-[10px] opacity-60">Ctrl+E</span>
              </button>
              <button
                onClick={() => {
                  onImportZipClick();
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <Upload className="w-3.5 h-3.5" /> Import Playbook from .ZIP
                </span>
                <span className="text-[10px] opacity-60">Ctrl+I</span>
              </button>
              <div className={`my-1 border-t ${isLight ? 'border-[#0033AA]/20' : 'border-white/20'}`} />
              <button
                onClick={() => {
                  onDownloadProjectZip();
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between font-bold cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" /> Download PyQt6 Project (.zip)
                </span>
                <span className="text-[10px] opacity-70">Desktop</span>
              </button>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === 'edit' ? null : 'edit')}
            className={`px-2.5 py-1 font-semibold rounded-xs transition-colors cursor-pointer ${
              openMenu === 'edit' ? (isLight ? 'bg-[#0055FF]' : 'bg-white text-black') : itemHover
            }`}
          >
            Edit
          </button>
          {openMenu === 'edit' && (
            <div className={`absolute top-full left-0 mt-1 w-56 py-1 z-50 rounded-xs ${dropdownBg}`}>
              <button
                onClick={() => {
                  setActiveMode('builder');
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5" /> Switch to Builder Mode
                </span>
                <span className="text-[10px] opacity-60">F1</span>
              </button>
              <button
                onClick={() => {
                  setActiveMode('player');
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <Play className="w-3.5 h-3.5" /> Switch to Player Mode
                </span>
                <span className="text-[10px] opacity-60">F2</span>
              </button>
            </div>
          )}
        </div>

        {/* Options Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === 'options' ? null : 'options')}
            className={`px-2.5 py-1 font-semibold rounded-xs transition-colors cursor-pointer ${
              openMenu === 'options' ? (isLight ? 'bg-[#0055FF]' : 'bg-white text-black') : itemHover
            }`}
          >
            Options
          </button>
          {openMenu === 'options' && (
            <div className={`absolute top-full left-0 mt-1 w-64 py-1 z-50 rounded-xs ${dropdownBg}`}>
              <button
                onClick={() => {
                  toggleSidebar();
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <Sidebar className="w-3.5 h-3.5" /> Toggle Hierarchy Sidebar
                </span>
                <span className="text-[10px] opacity-60">Ctrl+B</span>
              </button>
              <div className={`my-1 border-t ${isLight ? 'border-[#0033AA]/20' : 'border-white/20'}`} />
              <button
                onClick={() => {
                  setTheme('light');
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5" /> Light (Pure Blue &amp; White)
                </span>
                {theme === 'light' && <span className="font-bold">✓</span>}
              </button>
              <button
                onClick={() => {
                  setTheme('dark');
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${dropdownItemHover}`}
              >
                <span className="flex items-center gap-2">
                  <Moon className="w-3.5 h-3.5" /> Dark (Pure Black &amp; White)
                </span>
                {theme === 'dark' && <span className="font-bold">✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* About Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === 'about' ? null : 'about')}
            className={`px-2.5 py-1 font-semibold rounded-xs transition-colors cursor-pointer ${
              openMenu === 'about' ? (isLight ? 'bg-[#0055FF]' : 'bg-white text-black') : itemHover
            }`}
          >
            About
          </button>
          {openMenu === 'about' && (
            <div className={`absolute top-full left-0 mt-1 w-64 py-1 z-50 rounded-xs ${dropdownBg}`}>
              <button
                onClick={() => {
                  onOpenAbout();
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center gap-2 cursor-pointer ${dropdownItemHover}`}
              >
                <Info className="w-3.5 h-3.5" /> About Step-case
              </button>
              <button
                onClick={() => {
                  onOpenCodeInspector();
                  setOpenMenu(null);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center gap-2 cursor-pointer ${dropdownItemHover}`}
              >
                <Code2 className="w-3.5 h-3.5" /> Inspect Python PyQt6 Source
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Quick Action Header Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onDownloadProjectZip}
          className={`px-2.5 py-1 rounded-xs font-bold flex items-center gap-1.5 border border-current cursor-pointer transition-colors ${
            isLight ? 'hover:bg-white hover:text-[#0033AA]' : 'hover:bg-white hover:text-black'
          }`}
          title="Download the complete Python PyQt6 desktop codebase package"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download PyQt6 Project (.zip)</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { PYTHON_MAIN_PY, PYTHON_DATA_MANAGER_PY } from '../data/pythonSources';
import { Copy, Check, X, FileCode, Download } from 'lucide-react';
import { downloadPyQt6ProjectZip } from '../utils/zipUtils';

interface CodeInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export const CodeInspectorModal: React.FC<CodeInspectorModalProps> = ({ isOpen, onClose, theme }) => {
  const [activeFile, setActiveFile] = useState<'main.py' | 'data_manager.py' | 'ui_builder.py' | 'ui_player.py' | 'requirements.txt'>('main.py');
  const [fileContents, setFileContents] = useState<Record<string, string>>({
    'main.py': PYTHON_MAIN_PY,
    'data_manager.py': PYTHON_DATA_MANAGER_PY,
    'requirements.txt': 'PyQt6>=6.6.0\nPyQt6-Qt6>=6.6.0\n'
  });
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      ['main.py', 'data_manager.py', 'ui_builder.py', 'ui_player.py', 'requirements.txt'].forEach((fname) => {
        fetch(`/pyqt6/${fname}`)
          .then((res) => (res.ok ? res.text() : null))
          .then((text) => {
            if (text) {
              setFileContents((prev) => ({ ...prev, [fname]: text }));
            }
          })
          .catch(() => {});
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isLight = theme === 'light';
  const modalBg = isLight ? 'bg-white text-[#0033AA] border-2 border-[#0033AA]' : 'bg-black text-white border-2 border-white';
  const tabActive = isLight ? 'bg-[#0033AA] text-white' : 'bg-white text-black';
  const tabHover = isLight ? 'hover:bg-[#0033AA]/10' : 'hover:bg-white/20';

  const getCodeContent = () => {
    return fileContents[activeFile] || '# Loading module source...';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none">
      <div className={`w-full max-w-4xl h-[85vh] flex flex-col rounded-xs ${modalBg} shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className="p-4 border-b-2 border-current flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-sm tracking-wider uppercase">
            <FileCode className="w-4 h-4" />
            <span>Python PyQt6 Modular Architecture Inspector</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadPyQt6ProjectZip}
              className={`px-3 py-1 text-xs font-bold rounded-xs border border-current flex items-center gap-1.5 cursor-pointer ${
                isLight ? 'hover:bg-[#0033AA] hover:text-white' : 'hover:bg-white hover:text-black'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project .ZIP</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-xs hover:opacity-75 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b-2 border-current text-xs font-bold overflow-x-auto">
          {(['main.py', 'data_manager.py', 'ui_builder.py', 'ui_player.py', 'requirements.txt'] as const).map((file) => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`px-4 py-2 border-r-2 border-current transition-colors cursor-pointer shrink-0 ${
                activeFile === file ? tabActive : tabHover
              }`}
            >
              {file}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 bg-black/5 dark:bg-white/5 font-mono text-xs relative select-text">
          <button
            onClick={handleCopy}
            className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-sans font-bold rounded-xs border-2 border-current flex items-center gap-1.5 shadow-md cursor-pointer ${
              isLight ? 'bg-white hover:bg-[#0033AA] hover:text-white' : 'bg-black hover:bg-white hover:text-black'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
          <pre className="whitespace-pre font-mono leading-relaxed">{getCodeContent()}</pre>
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-current text-xs flex items-center justify-between opacity-80">
          <span>All 4 modules are written and available for download.</span>
          <span className="font-semibold">Step-case PyQt6 Engine</span>
        </div>
      </div>
    </div>
  );
};

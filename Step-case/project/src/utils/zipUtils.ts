import JSZip from 'jszip';
import { Playbook } from '../types/playbook';
import { DEFAULT_ASSETS } from '../data/defaultPlaybook';
import { PYTHON_MAIN_PY, PYTHON_DATA_MANAGER_PY } from '../data/pythonSources';

/**
 * Triggers a file download in the browser.
 */
export function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports the active playbook as a self-contained portable .zip file
 * strictly conforming to Step-case folder architecture:
 * <playbook_name>/
 *   ├── config.json
 *   ├── content/
 *   │   └── <step_id>.md
 *   └── assets/
 *       └── *.*
 */
export async function exportPlaybookZip(playbook: Playbook, assetsMap: Record<string, string> = {}) {
  const zip = new JSZip();
  const folderName = playbook.name.trim().replace(/\s+/g, '_') || 'Playbook';
  const root = zip.folder(folderName);
  if (!root) return;

  const contentFolder = root.folder('content');
  const assetsFolder = root.folder('assets');

  // Clone config without duplicate content_text
  const config = {
    version: playbook.version || '1.0',
    name: folderName,
    title: playbook.title,
    description: playbook.description,
    start_screen_id: playbook.start_screen_id,
    screens: playbook.screens,
    sequences: playbook.sequences,
    steps: playbook.steps.map((st) => ({
      id: st.id,
      title: st.title,
      content_file: `content/${st.id}.md`,
      assets: st.assets || [],
      checklist: st.checklist || [],
      copy_fields: st.copy_fields || [],
      disable_back: !!st.disable_back
    }))
  };

  root.file('config.json', JSON.stringify(config, null, 2));

  // Write content/*.md files
  if (contentFolder) {
    for (const step of playbook.steps) {
      contentFolder.file(`${step.id}.md`, step.content_text || '');
    }
  }

  // Write assets/*
  if (assetsFolder) {
    const combinedAssets = { ...DEFAULT_ASSETS, ...assetsMap };
    for (const [filename, content] of Object.entries(combinedAssets)) {
      assetsFolder.file(filename, content);
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerBlobDownload(blob, `${folderName}.zip`);
}

/**
 * Imports a portable Playbook .zip file and hydrates config + markdown + assets.
 */
export async function importPlaybookZip(file: File): Promise<{ playbook: Playbook; assets: Record<string, string> }> {
  const zip = await JSZip.loadAsync(file);

  // Find config.json file inside the zip archive
  const configPath = Object.keys(zip.files).find((p) => p.endsWith('config.json'));

  if (!configPath) {
    throw new Error('Invalid archive: No config.json found in the ZIP.');
  }

  const configFile = zip.file(configPath);
  if (!configFile) {
    throw new Error('Unable to read config.json.');
  }

  const rawConfigText = await configFile.async('text');
  const rawConfig = JSON.parse(rawConfigText) as Playbook;

  // Determine the root prefix (e.g. "Installing_Python/")
  const rootPrefix = configPath.includes('/') ? configPath.substring(0, configPath.lastIndexOf('/') + 1) : '';

  // Hydrate content_text from content/*.md
  const steps = await Promise.all(
    (rawConfig.steps || []).map(async (step) => {
      let contentText = '';
      const mdRelPath = step.content_file || `content/${step.id}.md`;
      const fullMdPath = rootPrefix + mdRelPath;
      const mdFile = zip.file(fullMdPath);
      if (mdFile) {
        contentText = await mdFile.async('text');
      } else {
        contentText = `# ${step.title}\n\n(No content found in archive)`;
      }
      return {
        ...step,
        content_text: contentText
      };
    })
  );

  // Load assets
  const assets: Record<string, string> = {};
  const assetsPrefix = `${rootPrefix}assets/`;
  const assetFiles = Object.keys(zip.files).filter((k) => k.startsWith(assetsPrefix) && !zip.files[k].dir);

  for (const path of assetFiles) {
    const filename = path.replace(assetsPrefix, '');
    const assetObj = zip.file(path);
    if (assetObj) {
      assets[filename] = await assetObj.async('text');
    }
  }

  const loadedPlaybook: Playbook = {
    ...rawConfig,
    steps
  };

  return { playbook: loadedPlaybook, assets };
}

/**
 * Packages and downloads the entire Python PyQt6 Desktop application
 * as a pristine .zip ready for local execution.
 */
export async function downloadPyQt6ProjectZip() {
  const zip = new JSZip();
  const root = zip.folder('Step-case-Desktop-PyQt6') || zip;

  const mainRes = await fetch('/pyqt6/main.py').catch(() => null);
  const mainText = mainRes ? await mainRes.text() : PYTHON_MAIN_PY;
  root.file('main.py', mainText);

  const dmRes = await fetch('/pyqt6/data_manager.py').catch(() => null);
  const dmText = dmRes ? await dmRes.text() : PYTHON_DATA_MANAGER_PY;
  root.file('data_manager.py', dmText);

  const uiBuilderResponse = await fetch('/pyqt6/ui_builder.py').catch(() => null);
  const uiBuilderText = uiBuilderResponse ? await uiBuilderResponse.text() : '# ui_builder.py included in bundle';
  root.file('ui_builder.py', uiBuilderText);

  const uiPlayerResponse = await fetch('/pyqt6/ui_player.py').catch(() => null);
  const uiPlayerText = uiPlayerResponse ? await uiPlayerResponse.text() : '# ui_player.py included in bundle';
  root.file('ui_player.py', uiPlayerText);

  root.file('requirements.txt', 'PyQt6>=6.6.0\nPyQt6-Qt6>=6.6.0\n');
  root.file(
    'README.md',
    `# Step-case — Desktop Interactive Playbook & Runbook

Made with Love by Alex Sakha.

## Quickstart (Desktop)
1. Install requirements:
   pip install -r requirements.txt

2. Run desktop app:
   python main.py

- Features 1s 'AXC' splash screen.
- License acceptance modal: "Made with Love by Alex Sakha".
- Pure Blue/White & Pure Black/White theming.
- Visual Builder & Screen-wise Player modes.
`
  );

  // Sample playbook folder
  const sampleFolder = root.folder('sample_playbooks');
  const pyFolder = sampleFolder?.folder('Installing_Python');
  if (pyFolder) {
    pyFolder.file(
      'config.json',
      JSON.stringify(
        {
          version: '1.0',
          name: 'Installing_Python',
          title: 'Installing Python & Developer Tools',
          description: 'Official interactive SOP runbook',
          start_screen_id: 'screen_os_select'
        },
        null,
        2
      )
    );
    const content = pyFolder.folder('content');
    content?.file('step_win_download.md', '### Step 1: Download Python 3.12 64-bit\n\nRun setup wizard.');
    const assets = pyFolder.folder('assets');
    for (const [fname, svg] of Object.entries(DEFAULT_ASSETS)) {
      assets?.file(fname, svg);
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerBlobDownload(blob, 'Step-case-PyQt6-Desktop.zip');
}

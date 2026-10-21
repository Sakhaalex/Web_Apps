import { Playbook } from '../types/playbook';

/**
 * 1. Playbook: On using Step-case (ours)
 * Interactive guide explaining core concepts, building, and running.
 */
export const PLAYBOOK_STEPCASE: Playbook = {
  version: '1.0',
  name: 'On_using_Step_case',
  title: 'On using Step-case (ours)',
  description: 'Simple interactive sequences for building, configuring, and executing playbooks in Step-case.',
  start_screen_id: 'screen_stepcase_welcome',
  screens: [
    {
      id: 'screen_stepcase_welcome',
      title: 'Welcome to Step-case: Choose a Guide Path',
      description: 'Step-case eliminates heavy .ppt / .pdf documentation. Choose which quick sequence you want to explore:',
      disable_back: false,
      type: 'decision',
      options: [
        {
          id: 'opt_builder_guide',
          label: '1. Building Playbooks (No-Code IDE)',
          description: 'Learn how to create Screens, Sequences, Steps, and attach media.',
          target_sequence_id: 'seq_stepcase_building'
        },
        {
          id: 'opt_player_guide',
          label: '2. Running in Player Mode (Interactive SOP)',
          description: 'See how layman users navigate steps, check boxes, and copy commands.',
          target_sequence_id: 'seq_stepcase_player'
        },
        {
          id: 'opt_export_guide',
          label: '3. Packaging & Portable .ZIP Export',
          description: 'Export and import offline bundles with complete assets and zero broken paths.',
          target_sequence_id: 'seq_stepcase_packaging'
        }
      ]
    },
    {
      id: 'screen_stepcase_completion',
      title: 'Step-case Guide Complete',
      description: 'You are now ready to build real-world SOPs and runbooks with Step-case.',
      disable_back: true,
      type: 'decision',
      options: [
        {
          id: 'opt_try_python',
          label: 'Explore "How to install python" Playbook',
          description: 'Switch to the multi-platform Python installation playbook in the left sidebar.',
          target_sequence_id: 'seq_stepcase_building'
        }
      ]
    }
  ],
  sequences: [
    {
      id: 'seq_stepcase_building',
      title: 'Building Playbooks in Step-case',
      step_ids: ['step_concepts', 'step_authoring', 'step_media_checklists'],
      next_screen_id: 'screen_stepcase_completion'
    },
    {
      id: 'seq_stepcase_player',
      title: 'Executing Workflows in Player Mode',
      step_ids: ['step_player_overview', 'step_player_actions'],
      next_screen_id: 'screen_stepcase_completion'
    },
    {
      id: 'seq_stepcase_packaging',
      title: 'Exporting & Offline Portability',
      step_ids: ['step_zip_export', 'step_zip_import'],
      next_screen_id: 'screen_stepcase_completion'
    }
  ],
  steps: [
    {
      id: 'step_concepts',
      title: 'Core Concepts: Playbook, Screen, Sequence, Step',
      content_file: 'content/step_concepts.md',
      content_text: `### The 4 Core Building Blocks of Step-case

Step-case replaces static PDF/Word manuals with interactive, living workflows. Every playbook is composed of four clean concepts:

1. **Playbook**: The master project folder (e.g., \`Installing_Python\` or \`Database_Migration\`).
2. **Screen**: A decision multiplexer. When a user arrives at a Screen, it presents choice cards that route them to a specific Sequence.
3. **Sequence**: A continuous linear series of steps (e.g., "Windows Install Flow" or "Rollback Procedure").
4. **Step**: A single, focused visual view showing Markdown text, optional media, checklists, and 1-click copy fields.

Everything is kept clean and minimalist—no complicated databases or nested forms.`,
      assets: ['stepcase_banner.svg'],
      disable_back: false,
      checklist: [
        { id: 'sc1', text: 'Understood the difference between a Screen (branching) and Sequence (linear)', checked: false },
        { id: 'sc2', text: 'Located the left sidebar showing available playbooks', checked: false }
      ],
      copy_fields: [
        { label: 'Step-case Concept Rule', value: 'Playbook -> Screens -> Sequences -> Steps' }
      ]
    },
    {
      id: 'step_authoring',
      title: 'Authoring Steps & Live Markdown',
      content_file: 'content/step_authoring.md',
      content_text: `### Visual Authoring Without Raw JSON Hassle

In **Builder Mode**, you create and edit steps directly:

- **Single Markdown Area**: Type your procedure text using standard Markdown headers, bold text, bullet points, and code blocks.
- **Immediate Live Preview**: Switch to Preview or run in Player mode to see exactly how your operators will experience the step.
- **Disable Back Navigation**: Lock critical irreversible steps (e.g. database migrations or destructive disk commands) by checking the "Disable Back" toggle.`,
      assets: [],
      disable_back: false,
      checklist: [
        { id: 'sc3', text: 'Explored the Step editor in Builder Mode', checked: false },
        { id: 'sc4', text: 'Noted the "Disable Back" option for irreversible operations', checked: false }
      ],
      copy_fields: [
        { label: 'Markdown Header Syntax', value: '### Step Title Here' },
        { label: 'Code Block Example', value: '```bash\necho "Hello Step-case"\n```' }
      ]
    },
    {
      id: 'step_media_checklists',
      title: 'Adding Media, Checklists & 1-Click Copy Fields',
      content_file: 'content/step_media_checklists.md',
      content_text: `### Interactive Controls for Layman Operators

Never let an operator guess whether they typed a command right or missed a prerequisite:

- **Attach Media**: Use the **"Add files"** button at the top right or "Attach Media" in any step to copy images, screenshots, or diagrams into \`/assets/\`.
- **Interactive Checklists**: Add required check items (e.g., "Verified sudo access"). Operators get a real-time progress bar.
- **1-Click Copy Fields**: Add commands, connection strings, or URLs. Operators simply click to copy directly to their clipboard with instant visual feedback.`,
      assets: ['stepcase_flow.svg'],
      disable_back: false,
      checklist: [
        { id: 'sc5', text: 'Tested clicking the "Copy" button on sample fields below', checked: false },
        { id: 'sc6', text: 'Checked out the top right "Add files" affordance', checked: false }
      ],
      copy_fields: [
        { label: 'Sample Docker Command', value: 'docker run -d -p 8080:80 nginx:alpine' },
        { label: 'Sample Healthcheck Endpoint', value: 'http://localhost:8080/healthz' }
      ]
    },
    {
      id: 'step_player_overview',
      title: 'Player Mode: Distraction-Free Execution',
      content_file: 'content/step_player_overview.md',
      content_text: `### The Player Experience

When you switch to **Player Mode** (via the top bar switcher or pressing F2):

- **Large, Clean Typography**: Built for readability with high-contrast text and zero visual clutter.
- **Progress Tracking**: A clean progress bar at the top shows step index and completion state.
- **Single Step Focus**: Only one step is displayed at a time, eliminating cognitive overload.
- **Next & Back Navigation**: Clear bottom controls guide the operator smoothly through the sequence.`,
      assets: [],
      disable_back: false,
      checklist: [
        { id: 'sc7', text: 'Noticed the step progress indicator at the top of the player', checked: false },
        { id: 'sc8', text: 'Observed how easy it is for non-technical users to follow', checked: false }
      ],
      copy_fields: [
        { label: 'Player Shortcut', value: 'Switch mode via the Google Material pill switch in the top bar' }
      ]
    },
    {
      id: 'step_player_actions',
      title: 'Decision Multiplexers & Sequence Routing',
      content_file: 'content/step_player_actions.md',
      content_text: `### Making Clear Choices at Decision Screens

Whenever a workflow has multiple paths (e.g. Windows vs. Mac vs. Linux, or Standard vs. Emergency Failover):

1. The player displays a **Decision Screen** with clean, elevated cards.
2. The user clicks their desired option.
3. The app smoothly transitions directly to the first step of that sequence.
4. When the sequence finishes, it can route to a follow-up verification screen or celebrate completion!`,
      assets: [],
      disable_back: false,
      checklist: [
        { id: 'sc9', text: 'Clicked decision choices on the welcome screen earlier', checked: false },
        { id: 'sc10', text: 'Verified smooth branching into this sequence', checked: false }
      ],
      copy_fields: [
        { label: 'Decision Routing Logic', value: 'Screen Options -> target_sequence_id -> Step 1' }
      ]
    },
    {
      id: 'step_zip_export',
      title: 'Exporting as Self-Contained .ZIP',
      content_file: 'content/step_zip_export.md',
      content_text: `### Full Offline Portability

A playbook is completely offline and self-contained:

- Contains \`config.json\` (the structure and routing skeleton).
- Contains \`/content/\` (all generated \`.md\` step files).
- Contains \`/assets/\` (all bundled images, diagrams, and media).

Click **Export Playbook as .ZIP** in the top bar to download the entire package in one click.`,
      assets: [],
      disable_back: false,
      checklist: [
        { id: 'sc11', text: 'Located the Export .ZIP icon (tray with arrow out) in top bar', checked: false }
      ],
      copy_fields: [
        { label: 'Zip Structure', value: 'my_playbook.zip -> config.json + /content/*.md + /assets/*' }
      ]
    },
    {
      id: 'step_zip_import',
      title: 'Importing on Any Machine Without Broken Paths',
      content_file: 'content/step_zip_import.md',
      content_text: `### Instant Sharing With Any Teammate

Send your exported \`.zip\` to any teammate or operator. When they launch Step-case and click **Import .ZIP** (tray with arrow in):

- The app extracts the \`config.json\` and step markdown files automatically.
- All bundled assets in \`/assets/\` are loaded without broken external URLs or missing dependencies.
- The playbook runs immediately in Player mode!`,
      assets: ['success_shield.svg'],
      disable_back: false,
      checklist: [
        { id: 'sc12', text: 'Understood zero-dependency offline sharing', checked: false },
        { id: 'sc13', text: 'Ready to build and share playbooks!', checked: false }
      ],
      copy_fields: [
        { label: 'Verification Toast', value: 'Successfully imported Playbook with all bundled assets!' }
      ]
    }
  ]
};

/**
 * 2. Playbook: How to install python
 * Comprehensive multi-platform runbook.
 */
export const PLAYBOOK_PYTHON: Playbook = {
  version: '1.0',
  name: 'How_to_install_python',
  title: 'How to install python',
  description: 'Interactive step-by-step installation runbook across Microsoft Windows, Apple macOS, and Linux.',
  start_screen_id: 'screen_os_select',
  screens: [
    {
      id: 'screen_os_select',
      title: 'Select Target Operating System',
      description: 'Choose the platform you are deploying or setting up Python on.',
      disable_back: false,
      type: 'decision',
      options: [
        {
          id: 'opt_win',
          label: 'Microsoft Windows (10 / 11)',
          description: 'Installer wizard flow with PATH configuration checklist.',
          target_sequence_id: 'seq_windows'
        },
        {
          id: 'opt_mac',
          label: 'Apple macOS (Apple Silicon / Intel)',
          description: 'Homebrew package manager installation.',
          target_sequence_id: 'seq_macos'
        },
        {
          id: 'opt_linux',
          label: 'Ubuntu / Debian Linux',
          description: 'APT package repository and virtualenv tooling.',
          target_sequence_id: 'seq_linux'
        }
      ]
    },
    {
      id: 'screen_completion',
      title: 'Installation Verification & Next Steps',
      description: 'Confirm successful installation and proceed with verification.',
      disable_back: true,
      type: 'decision',
      options: [
        {
          id: 'opt_verify',
          label: 'Run Verification Suite',
          description: 'Execute diagnostic commands and test script.',
          target_sequence_id: 'seq_verification'
        }
      ]
    }
  ],
  sequences: [
    {
      id: 'seq_windows',
      title: 'Windows Installation Flow',
      step_ids: ['step_win_download', 'step_win_run_install', 'step_win_verify'],
      next_screen_id: 'screen_completion'
    },
    {
      id: 'seq_macos',
      title: 'macOS Homebrew Flow',
      step_ids: ['step_mac_brew', 'step_mac_install'],
      next_screen_id: 'screen_completion'
    },
    {
      id: 'seq_linux',
      title: 'Linux APT Flow',
      step_ids: ['step_linux_apt', 'step_linux_venv'],
      next_screen_id: 'screen_completion'
    },
    {
      id: 'seq_verification',
      title: 'Final Environment Validation',
      step_ids: ['step_final_test'],
      next_screen_id: null
    }
  ],
  steps: [
    {
      id: 'step_win_download',
      title: 'Download Official Windows Installer',
      content_file: 'content/step_win_download.md',
      content_text: `### Step 1: Download Python 3.12 64-bit

Navigate to the official Python distribution mirror and obtain the Windows x86-64 executable installer.

> **Important:** Ensure you download the official binary signed by the Python Software Foundation. Do not install from unverified third-party mirrors.`,
      assets: ['python_banner.svg'],
      disable_back: false,
      checklist: [
        { id: 'c1', text: 'Verified 64-bit architecture on host machine', checked: false },
        { id: 'c2', text: 'Downloaded python-3.12.x-amd64.exe installer', checked: false }
      ],
      copy_fields: [
        { label: 'Download URL', value: 'https://www.python.org/downloads/windows/' },
        { label: 'SHA256 Checksum Command', value: 'Get-FileHash -Algorithm SHA256 .\\python-3.12.exe' }
      ]
    },
    {
      id: 'step_win_run_install',
      title: 'Execute Windows Setup Wizard',
      content_file: 'content/step_win_run_install.md',
      content_text: `### Step 2: Critical PATH Configuration

Run the installer executable as Administrator.

**CRITICAL ACTION:** Check the box at the bottom that says **\`Add python.exe to PATH\`** before clicking **Install Now**.

Failure to check this will prevent terminal invocation of Python scripts.`,
      assets: ['install_wizard.svg'],
      disable_back: false,
      checklist: [
        { id: 'c3', text: 'Launched installer with Admin privileges', checked: false },
        { id: 'c4', text: 'CHECKED "Add python.exe to PATH" checkbox', checked: false },
        { id: 'c5', text: 'Completed wizard without errors', checked: false }
      ],
      copy_fields: [
        { label: 'Silent Installation Command', value: 'python-3.12.exe /quiet InstallAllUsers=1 PrependPath=1' }
      ]
    },
    {
      id: 'step_win_verify',
      title: 'Validate Windows CLI Execution',
      content_file: 'content/step_win_verify.md',
      content_text: `### Step 3: Terminal Verification

Open a fresh PowerShell or Command Prompt terminal window to reload environment PATH variables. Execute the version check command below to confirm.`,
      assets: [],
      disable_back: false,
      checklist: [
        { id: 'c6', text: 'Opened fresh PowerShell instance', checked: false },
        { id: 'c7', text: 'Ran python --version successfully with output Python 3.12.x', checked: false }
      ],
      copy_fields: [
        { label: 'Verify Version', value: 'python --version' },
        { label: 'Verify Pip Package Manager', value: 'pip --version' }
      ]
    },
    {
      id: 'step_mac_brew',
      title: 'Ensure Homebrew Package Manager',
      content_file: 'content/step_mac_brew.md',
      content_text: `### Step 1: Check or Install Homebrew

Homebrew is the standard package manager for macOS developers. Open Terminal.app to check your setup.`,
      assets: ['terminal_icon.svg'],
      disable_back: false,
      checklist: [
        { id: 'c8', text: 'Tested `brew --version` in Terminal.app', checked: false }
      ],
      copy_fields: [
        { label: 'Homebrew One-Line Install', value: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' }
      ]
    },
    {
      id: 'step_mac_install',
      title: 'Install Python Formula',
      content_file: 'content/step_mac_install.md',
      content_text: `### Step 2: Install via Homebrew Formula

Run the brew command to fetch the optimized bottle for Apple Silicon or Intel architectures.`,
      assets: [],
      disable_back: false,
      checklist: [
        { id: 'c9', text: 'Ran brew install python@3.12', checked: false },
        { id: 'c10', text: 'Tested python3 --version output', checked: false }
      ],
      copy_fields: [
        { label: 'Install Formula', value: 'brew install python@3.12' },
        { label: 'Add to Zsh Profile', value: 'echo \'export PATH="/opt/homebrew/opt/python@3.12/bin:$PATH"\' >> ~/.zshrc' }
      ]
    },
    {
      id: 'step_linux_apt',
      title: 'Update Repository & Install Python3',
      content_file: 'content/step_linux_apt.md',
      content_text: `### Step 1: Debian/Ubuntu Aptitude Setup

Update package lists and install standard python3 runtime with pip tooling.`,
      assets: ['terminal_icon.svg'],
      disable_back: false,
      checklist: [
        { id: 'c11', text: 'System apt repositories updated', checked: false },
        { id: 'c12', text: 'Installed python3 and python3-pip', checked: false }
      ],
      copy_fields: [
        { label: 'Update & Install Command', value: 'sudo apt update && sudo apt install -y python3 python3-pip python3-venv' }
      ]
    },
    {
      id: 'step_linux_venv',
      title: 'Create Test Virtual Environment',
      content_file: 'content/step_linux_venv.md',
      content_text: `### Step 2: Verify Isolated Environment (PEP 668)

Modern distributions require creating virtual environments for package installations.`,
      assets: [],
      disable_back: false,
      checklist: [
        { id: 'c13', text: 'Created .venv directory', checked: false },
        { id: 'c14', text: 'Successfully activated environment', checked: false }
      ],
      copy_fields: [
        { label: 'Create venv', value: 'python3 -m venv .venv' },
        { label: 'Activate venv', value: 'source .venv/bin/activate' }
      ]
    },
    {
      id: 'step_final_test',
      title: 'Run Smoke Test Script',
      content_file: 'content/step_final_test.md',
      content_text: `### Congratulations: System Ready!

All prerequisite steps have completed successfully. Run this one-line benchmark to verify interactive interpreter capabilities.`,
      assets: ['success_shield.svg'],
      disable_back: true,
      checklist: [
        { id: 'c15', text: 'Script output confirmed: "Step-case Playbook Complete!"', checked: false }
      ],
      copy_fields: [
        { label: 'Smoke Test Command', value: 'python -c "import sys; print(f\'Python {sys.version.split()[0]} configured successfully via Step-case!\')"' }
      ]
    }
  ]
};

export const INITIAL_PLAYBOOKS: Playbook[] = [
  PLAYBOOK_STEPCASE,
  PLAYBOOK_PYTHON
];

export const DEFAULT_PLAYBOOK: Playbook = PLAYBOOK_STEPCASE;

// Embedded SVG assets dictionary for instant display in browser & zip export
export const DEFAULT_ASSETS: Record<string, string> = {
  'stepcase_banner.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
  <rect width="600" height="240" rx="16" fill="#1A73E8"/>
  <rect x="10" y="10" width="580" height="220" rx="12" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
  <circle cx="90" cy="120" r="45" fill="#FFFFFF"/>
  <text x="90" y="128" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="28" font-weight="900" fill="#1A73E8" text-anchor="middle">AXC</text>
  <text x="160" y="105" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="26" font-weight="800" fill="#FFFFFF">STEP-CASE RUNBOOK ENGINE</text>
  <text x="160" y="135" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="15" font-weight="500" fill="#FFFFFF" opacity="0.9">Interactive Playbooks • No-Code Authoring • Offline Portability</text>
  <rect x="160" y="155" width="220" height="32" rx="6" fill="#FFFFFF"/>
  <text x="270" y="176" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#1A73E8" text-anchor="middle">Made with Love by Alex Sakha</text>
</svg>`,
  'stepcase_flow.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
  <rect width="600" height="240" rx="16" fill="#0F172A"/>
  <rect x="20" y="20" width="560" height="200" rx="12" fill="#1E293B"/>
  <rect x="40" y="80" width="130" height="80" rx="8" fill="#1A73E8"/>
  <text x="105" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">SCREEN</text>
  <text x="105" y="135" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="500" fill="#FFFFFF" opacity="0.8" text-anchor="middle">Decision Point</text>
  <path d="M 175 120 L 225 120" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <polygon points="225,115 235,120 225,125" fill="#38BDF8"/>
  <rect x="240" y="80" width="130" height="80" rx="8" fill="#0284C7"/>
  <text x="305" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">SEQUENCE</text>
  <text x="305" y="135" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="500" fill="#FFFFFF" opacity="0.8" text-anchor="middle">Linear Flow</text>
  <path d="M 375 120 L 425 120" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <polygon points="425,115 435,120 425,125" fill="#38BDF8"/>
  <rect x="440" y="80" width="120" height="80" rx="8" fill="#10B981"/>
  <text x="500" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">STEP</text>
  <text x="500" y="135" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="500" fill="#FFFFFF" opacity="0.8" text-anchor="middle">Markdown + Media</text>
  <text x="300" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700" fill="#F8FAFC" text-anchor="middle">Execution Pipeline Architecture</text>
</svg>`,
  'python_banner.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
  <rect width="600" height="240" rx="16" fill="#1A73E8"/>
  <rect x="10" y="10" width="580" height="220" rx="12" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
  <text x="300" y="100" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle">PYTHON 3.12 64-BIT SETUP</text>
  <text x="300" y="140" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="16" font-weight="500" fill="#FFFFFF" text-anchor="middle" opacity="0.9">Verified Official Distribution • Step-case Playbook</text>
  <rect x="200" y="165" width="200" height="36" rx="6" fill="#FFFFFF"/>
  <text x="300" y="189" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#1A73E8" text-anchor="middle">python.org/downloads</text>
</svg>`,
  'install_wizard.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
  <rect width="600" height="240" rx="16" fill="#0F172A"/>
  <rect x="20" y="20" width="560" height="200" rx="8" fill="#FFFFFF"/>
  <rect x="20" y="20" width="560" height="36" rx="8" fill="#1A73E8"/>
  <text x="40" y="44" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Python 3.12 (64-bit) Setup Wizard</text>
  <rect x="50" y="80" width="22" height="22" rx="4" fill="#2563EB"/>
  <path d="M 55 91 L 59 96 L 68 85" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
  <text x="85" y="97" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="#1A73E8">[CRITICAL] Add python.exe to PATH</text>
  <rect x="50" y="125" width="22" height="22" rx="4" fill="#2563EB"/>
  <path d="M 55 136 L 59 141 L 68 130" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
  <text x="85" y="142" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="15" font-weight="600" fill="#222222">Use admin privileges when installing py.exe</text>
  <rect x="50" y="170" width="160" height="34" rx="6" fill="#1A73E8"/>
  <text x="130" y="193" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">Install Now ➔</text>
</svg>`,
  'terminal_icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
  <rect width="600" height="240" rx="16" fill="#0F172A"/>
  <rect x="20" y="20" width="560" height="30" rx="4" fill="#1E293B"/>
  <circle cx="40" cy="35" r="5" fill="#EF4444"/>
  <circle cx="58" cy="35" r="5" fill="#F59E0B"/>
  <circle cx="76" cy="35" r="5" fill="#10B981"/>
  <text x="100" y="39" font-family="monospace" font-size="12" fill="#94A3B8">terminal session</text>
  <text x="40" y="85" font-family="monospace" font-size="18" fill="#4ADE80">$ brew install python@3.12</text>
  <text x="40" y="125" font-family="monospace" font-size="16" fill="#F8FAFC">==> Fetching python@3.12 bottle...</text>
  <text x="40" y="160" font-family="monospace" font-size="16" fill="#38BDF8">==> Installed /opt/homebrew/bin/python3.12</text>
  <text x="40" y="200" font-family="monospace" font-size="18" fill="#4ADE80">$ python3 --version  ➔  Python 3.12.3</text>
</svg>`,
  'success_shield.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
  <rect width="600" height="240" rx="16" fill="#1A73E8"/>
  <circle cx="120" cy="120" r="60" fill="#FFFFFF"/>
  <path d="M 95 120 L 112 138 L 148 102" fill="none" stroke="#1A73E8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="210" y="110" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="28" font-weight="900" fill="#FFFFFF">CONFIGURATION VERIFIED</text>
  <text x="210" y="145" font-family="'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="16" font-weight="500" fill="#FFFFFF" opacity="0.9">Interactive SOP execution completed with zero defects.</text>
</svg>`
};

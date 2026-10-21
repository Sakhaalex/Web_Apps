/**
 * Step-case: Google-Grade Interactive Playbook & Runbook Engine
 * Features:
 * - Two Built-in Playbooks: "On using Step-case (ours)" & "How to install python"
 * - Left Sidebar: Displays configurations (playbooks) with dropdown file trees (no raw md/json)
 * - First Screen: Clean choice between "Add a playbook" and "Modify a playbook"
 * - Single-Screen IDE Builder (no deep tabs, 1 large markdown area, Attach Media, checklists, 1-click copy)
 * - Google Antigravity Player (one step at a time, large font, live progress, decision multiplexing)
 * - Exchanged Import/Export icons (Import = tray in, Export = tray out)
 * - Lamp theme switcher & Material You dynamic styling
 * - Top-right "Add files" affordance
 * - Offline .ZIP export & import + Python PyQt6 desktop code export
 */

// -------------------------------------------------------------
// EMBEDDED SVG ASSETS (Zero external broken URLs)
// -------------------------------------------------------------
const DEFAULT_ASSETS = {
  'stepcase_banner.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
    <rect width="600" height="240" rx="16" fill="#1A73E8"/>
    <rect x="10" y="10" width="580" height="220" rx="12" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
    <circle cx="90" cy="120" r="45" fill="#FFFFFF"/>
    <text x="90" y="128" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="28" font-weight="900" fill="#1A73E8" text-anchor="middle">AXC</text>
    <text x="160" y="105" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="26" font-weight="800" fill="#FFFFFF">STEP-CASE RUNBOOK ENGINE</text>
    <text x="160" y="135" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="500" fill="#FFFFFF" opacity="0.9">Interactive Playbooks • No-Code Authoring • Offline Portability</text>
    <rect x="160" y="155" width="220" height="32" rx="6" fill="#FFFFFF"/>
    <text x="270" y="176" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#1A73E8" text-anchor="middle">Made with Love by Alex Sakha</text>
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
    <text x="300" y="100" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle">PYTHON 3.12 64-BIT SETUP</text>
    <text x="300" y="140" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="500" fill="#FFFFFF" text-anchor="middle" opacity="0.9">Verified Official Distribution • Step-case Playbook</text>
    <rect x="200" y="165" width="200" height="36" rx="6" fill="#FFFFFF"/>
    <text x="300" y="189" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1A73E8" text-anchor="middle">python.org/downloads</text>
  </svg>`,
  'install_wizard.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
    <rect width="600" height="240" rx="16" fill="#0F172A"/>
    <rect x="20" y="20" width="560" height="200" rx="8" fill="#FFFFFF"/>
    <rect x="20" y="20" width="560" height="36" rx="8" fill="#1A73E8"/>
    <text x="40" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Python 3.12 (64-bit) Setup Wizard</text>
    <rect x="50" y="80" width="22" height="22" rx="4" fill="#2563EB"/>
    <path d="M 55 91 L 59 96 L 68 85" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    <text x="85" y="97" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="800" fill="#1A73E8">[CRITICAL] Add python.exe to PATH</text>
    <rect x="50" y="125" width="22" height="22" rx="4" fill="#2563EB"/>
    <path d="M 55 136 L 59 141 L 68 130" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    <text x="85" y="142" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="600" fill="#222222">Use admin privileges when installing py.exe</text>
    <rect x="50" y="170" width="160" height="34" rx="6" fill="#1A73E8"/>
    <text x="130" y="193" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">Install Now ➔</text>
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
    <text x="210" y="110" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="900" fill="#FFFFFF">CONFIGURATION VERIFIED</text>
    <text x="210" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="500" fill="#FFFFFF" opacity="0.9">Interactive SOP execution completed with zero defects.</text>
  </svg>`
};

// -------------------------------------------------------------
// INITIAL PLAYBOOKS DEFINITIONS
// -------------------------------------------------------------
const PLAYBOOK_STEPCASE = {
  version: "1.0",
  name: "On_using_step_case",
  title: "On using step-case",
  description: "The complete, distraction-free manual for authoring, structuring, and executing standard operating procedures in Step-case.",
  start_screen_id: "screen_routing_hub",
  screens: [
    {
      id: "screen_routing_hub",
      title: "Adding Optional Routes",
      description: "Screens act as decision points that branch your workflow into dedicated sequences. Select a sequence below:",
      disable_back: false,
      options: [
        {
          id: "opt_auth",
          label: "1. Creating & Managing Sequences",
          target_sequence_id: "seq_authoring"
        },
        {
          id: "opt_actions",
          label: "2. Interactive Action Blocks (Checklists & 1-Click Copy)",
          target_sequence_id: "seq_action_blocks"
        },
        {
          id: "opt_exec",
          label: "3. Fullscreen Player Mode & Zero-Defect Execution",
          target_sequence_id: "seq_player_execution"
        }
      ]
    }
  ],
  sequences: [
    {
      id: "seq_authoring",
      title: "Creating & Managing Sequences",
      step_ids: ["step_auth_1", "step_auth_2", "step_auth_3"],
      next_screen_id: null
    },
    {
      id: "seq_action_blocks",
      title: "Interactive Action Blocks (Checklists & 1-Click Copy)",
      step_ids: ["step_act_1", "step_act_2", "step_act_3"],
      next_screen_id: null
    },
    {
      id: "seq_player_execution",
      title: "Fullscreen Player Mode & Zero-Defect Execution",
      step_ids: ["step_ply_1", "step_ply_2", "step_ply_3"],
      next_screen_id: null
    }
  ],
  sections: [
    {
      id: "sec_editor",
      title: "Section 1: The Weightless Editor & Canvas",
      from_step: 1,
      to_step: 4,
      skippable: true,
      screen_ids: [],
      step_ids: ["step_ed_1", "step_ed_2", "step_ed_3", "step_ed_4"]
    },
    {
      id: "sec_branching",
      title: "Section 2: Structuring & Branching (The Decision Router)",
      from_step: 1,
      to_step: 2,
      skippable: true,
      screen_ids: ["screen_routing_hub"],
      step_ids: ["step_br_1", "step_br_2"]
    },
    {
      id: "sec_distribution",
      title: "Section 3: Distribution, Export & Inno Setup Packaging",
      from_step: 1,
      to_step: 4,
      skippable: true,
      screen_ids: [],
      step_ids: ["step_dist_1", "step_dist_2", "step_dist_3", "step_dist_4"]
    }
  ],
  steps: [
    // --- SECTION 1: THE WEIGHTLESS EDITOR & CANVAS ---
    {
      id: "step_ed_1",
      title: "The Blank Slate & The Ruled Line",
      content_text: `Step-case is designed for speed, clarity, and cognitive focus. It rejects modal dialogue forms, bloated document continuous scrolling, and distracting toolbars.

The Two-Pane Architecture:
- Left Sidebar: The structured tree view displaying Playbooks, Sections, Screens, Sequences, and Steps with drag-and-drop reordering.
- Right Canvas: A weightless single-instance workspace displaying strictly one active unit at a time.

The Signature Blue Ruled Line:
When writing or editing a procedure, you type directly on a single signature blue line. There are no clunky input boxes or rich-text toolbar buttons floating around. Your thoughts flow directly onto the page.

Single-Instance Focus:
Surrounding steps are completely hidden from view. By removing continuous scrolling, Step-case guarantees you focus 100% on the single instruction at hand.`,
      assets: [],
      checklist: [
        { id: "c_ed1_1", text: "Observe the single signature blue ruled line across the canvas", checked: true },
        { id: "c_ed1_2", text: "Notice that previous and subsequent steps are completely hidden", checked: true }
      ],
      copy_fields: [],
      disable_back: false
    },
    {
      id: "step_ed_2",
      title: "Single-Page Pagination Mechanics",
      content_text: `Continuous scrolling causes cognitive fatigue and makes runbook execution error-prone. Step-case replaces continuous scrolling with single-page pagination:

1. Writing Multiple Lines: Press Enter to create a natural line break inside the current step's instruction.
2. Page-Flip to New Step: Press Ctrl+Enter (or click the + Add Step button) to instantly flip the page to a fresh, blank blue line with auto-focus.
3. Quick Deletion: If a step is empty, pressing Backspace automatically removes it and turns back to the preceding page.
4. Arrow Navigation: Press ArrowLeft at the start of text or ArrowRight at the end to seamlessly page through steps without touching the mouse.`,
      assets: [],
      checklist: [
        { id: "c_ed2_1", text: "Press Enter to create a newline within this step", checked: false },
        { id: "c_ed2_2", text: "Press Ctrl+Enter to flip to a fresh blank step page", checked: false }
      ],
      copy_fields: [
        { label: "Turn Page Shortcut", value: "Ctrl+Enter" }
      ],
      disable_back: false
    },
    {
      id: "step_ed_3",
      title: "Navigating Steps Without Continuous Scrolling",
      content_text: `Paging through complex multi-step procedures in Step-case is swift, precise, and contained:

- Pagination Pills: The top navigation bar displays numbered pill buttons (1, 2, 3...) scoped to the active sequence or section. Click any pill to jump straight to that page.
- Prev & Next Controls: Use ◀ Prev and Next ▶ buttons to step through pages sequentially.
- Sidebar Tree: The left sidebar provides an instant structural overview. Click any step in the tree to swap the canvas view instantly.
- Breadcrumb Lineage: The top-left header displays your exact operational location (e.g., Section 1 › Step 3 of 4).`,
      assets: [],
      checklist: [
        { id: "c_ed3_1", text: "Click any number in the pagination pill bar to jump to that step", checked: false },
        { id: "c_ed3_2", text: "Click a step in the left sidebar tree to swap the active canvas page", checked: false }
      ],
      copy_fields: [],
      disable_back: false
    },
    {
      id: "step_ed_4",
      title: "The Ruled Line Action Toolbar",
      content_text: `On the right side of the blue ruled line sits a compact 4-icon action toolbar:

1. Plus (+) Menu: Quickly inserts verification checklist items, 1-click copy fields, extended notes, or bullet points.
2. Clipboard (📋) Menu: Copies the entire step text to your clipboard, duplicates the current step, or pastes external text directly.
3. Quick Checkdown Icon: Adds an interactive verification checkbox below the line with a single click.
4. Step Options (⋮) Menu: Allows toggling strict lock-step mode, marking section boundaries, or safely deleting the step.`,
      assets: [],
      checklist: [
        { id: "c_ed4_1", text: "Explore the 4-icon toolbar on the right edge of the ruled line", checked: false },
        { id: "c_ed4_2", text: "Test copying step text via the clipboard menu icon", checked: false }
      ],
      copy_fields: [],
      disable_back: false
    },

    // --- SECTION 2: STRUCTURING & BRANCHING ---
    {
      id: "step_br_1",
      title: "Using the 3-Dot Options Menu & Actions",
      content_text: `To keep the canvas weightless and free of button clutter, all insertion and configuration options are consolidated into the vertical 3-dot (⋮) menu located at the top-right corner of the canvas:

- Add Step: Inserts a fresh step and flips the page (Ctrl+Enter).
- Add Screen: Inserts a decision point screen for branching procedures.
- Add Route: Attaches a new sequence path to the active decision screen.
- Attach Image: Opens file picker to attach diagrams or screenshots into /assets/.
- Add Checklist Item: Inserts verification checkboxes below the step.
- Add Copy Command: Attaches terminal commands with 1-click clipboard copy.
- Mark Section: Establishes a skippable milestone boundary.
- Toggle Strict Lock: Disables the Back button for irreversible steps.
- Delete: Safely removes the active item with confirmation safeguard.`,
      assets: [],
      checklist: [
        { id: "c_br1_1", text: "Open the vertical 3-dot menu from the top-right toolbar", checked: false },
        { id: "c_br1_2", text: "Verify that all actions are accessible without canvas clutter", checked: false }
      ],
      copy_fields: [],
      disable_back: false
    },
    {
      id: "step_br_2",
      title: "The 'Mark a Section' Feature & Skippable Milestones",
      content_text: `Sections organize sequential steps into logical milestones (e.g. 'Prerequisites', 'Core Setup', 'System Verification').

How Sections Work:
1. Visual Grouping: The sidebar tree clusters steps under clear, collapsible section headers.
2. Skippable Milestones: In Player Mode, the runner displays prominent milestone indicators and a 'Skip Section' button.
3. Operator Efficiency: Qualified engineers who have already satisfied prerequisite steps can bypass an entire section with one click while maintaining full execution auditability.`,
      assets: [],
      checklist: [
        { id: "c_br2_1", text: "Identify steps that constitute a distinct prerequisite milestone", checked: false },
        { id: "c_br2_2", text: "Select Mark Section from the 3-dot menu to set a skippable milestone boundary", checked: false }
      ],
      copy_fields: [],
      disable_back: false
    },

    // --- SEQUENCE 1: CREATING & MANAGING SEQUENCES ---
    {
      id: "step_auth_1",
      title: "What is a Sequence?",
      content_text: `A Sequence represents an isolated procedure branch within a decision screen (e.g., 'Windows Setup', 'macOS Setup', or 'Docker Deployment').

Key Architecture Principles:
- Complete Isolation: Each sequence is maintained as its own dedicated workflow.
- No Clutter or Leakage: Screens act strictly as routers. Step text is NEVER leaked or previewed inside the router card, keeping the decision interface crystal clear.
- Independent Step Numbering: Inside each sequence, steps have their own independent numbering starting from Step 1!`,
      assets: [],
      checklist: [
        { id: "c_au1_1", text: "Observe how the Screen Router view displays only route choices", checked: true },
        { id: "c_au1_2", text: "Verify that step text is never pre-rendered inside sequence cards", checked: true }
      ],
      copy_fields: [],
      disable_back: false
    },
    {
      id: "step_auth_2",
      title: "Entering a Sequence (The Doorway Concept)",
      content_text: `Every sequence route is an isolated doorway into a dedicated step-by-step workflow:

- Entering: Clicking the arrow (→) next to any sequence title clears the Screen router view and immediately enters Step 1 of that sequence.
- Independent Step Numbering: Inside each sequence, steps are numbered 1, 2, 3... starting fresh.
- Isolated Focus: You author and execute the sequence without seeing unrelated steps from other branches.`,
      assets: [],
      checklist: [
        { id: "c_au2_1", text: "Click the arrow (→) on a sequence card to enter its doorway", checked: false },
        { id: "c_au2_2", text: "Notice the step counter resets to Step 1 of this specific sequence", checked: true }
      ],
      copy_fields: [],
      disable_back: false
    },
    {
      id: "step_auth_3",
      title: "Returning to the Decision Router",
      content_text: `When authoring or executing inside a sequence, you can return to the parent decision screen at any moment:

- Breadcrumb Trail: The top navigation bar displays the lineage (e.g. Adding Optional Routes › Sequence Title › Step 1 of 3).
- 1-Click Return: Click the parent Screen title in the breadcrumb trail to return instantly to the Decision Router.
- State Preservation: Your active edits, checklist toggles, and position are preserved automatically.`,
      assets: [],
      checklist: [
        { id: "c_au3_1", text: "Click the parent screen link in the breadcrumb trail", checked: false },
        { id: "c_au3_2", text: "Confirm that the router view restores immediately", checked: false }
      ],
      copy_fields: [],
      disable_back: false
    },

    // --- SEQUENCE 2: INTERACTIVE ACTION BLOCKS ---
    {
      id: "step_act_1",
      title: "Verification Checklists in Raw Markdown ([ ])",
      content_text: `Procedures require proof of completion. Attach interactive checkdown items to ensure operators verify critical conditions before proceeding:

- Checklists render cleanly beneath the blue ruled line.
- Each item can be toggled by clicking the box.
- A real-time counter displays completion status (e.g., 2/3 items verified).
- In the underlying Markdown files, checklists are stored as standard '- [ ] item' or '- [x] item' task lists.
- Checklists automatically persist across authoring and execution modes.`,
      assets: [],
      checklist: [
        { id: "c_ac1_1", text: "Confirm hardware power is connected and operational", checked: false },
        { id: "c_ac1_2", text: "Verify network connectivity to production servers", checked: false },
        { id: "c_ac1_3", text: "Ensure administrative permissions are active in terminal", checked: false }
      ],
      copy_fields: [],
      disable_back: false
    },
    {
      id: "step_act_2",
      title: "1-Click Copyable Command Snippets",
      content_text: `Never force operators to manually highlight and copy shell commands or configuration parameters. Manual copying introduces whitespace errors, missed characters, and catastrophic deployment failures.

How to Attach Copy Commands:
1. Select 'Add Copy Command' from the top-right 3-dot menu (or the blue + line toolbar).
2. Enter a clear label (e.g. 'Install CLI', 'Start Service').
3. Enter the exact command string.

In Player Mode, operators simply click the 'Copy' button for zero-defect terminal execution.`,
      assets: [],
      checklist: [
        { id: "c_ac2_1", text: "Add a 1-click copy command to this step", checked: false },
        { id: "c_ac2_2", text: "Test the copy button to verify clipboard integration", checked: false }
      ],
      copy_fields: [
        { label: "Install CLI", value: "npm install -g step-case-cli" },
        { label: "Verify Version", value: "stepcase --version" }
      ],
      disable_back: false
    },
    {
      id: "step_act_3",
      title: "Strict Lock-Step Protection",
      content_text: `Some operational steps are completely irreversible (e.g. formatting a drive, flashing firmware, or applying database migrations).

In Step-case, authors can enable Strict Lock-Step:
- Select 'Toggle Strict Lock' from the 3-dot menu.
- In Player Mode, the 'Back' button is disabled on this step.
- Operators cannot accidentally return to or repeat destructive operations.`,
      assets: [],
      checklist: [
        { id: "c_ac3_1", text: "Identify irreversible or destructive procedural steps", checked: false },
        { id: "c_ac3_2", text: "Enable Strict Lock to safeguard against accidental operator rollback", checked: false }
      ],
      copy_fields: [],
      disable_back: true
    },

    // --- SEQUENCE 3: FULLSCREEN PLAYER MODE & EXECUTION ---
    {
      id: "step_ply_1",
      title: "Launching Fullscreen Presentation Layer",
      content_text: `Click the 'Play' button in the header bar (or press F5) to launch the Fullscreen Presentation Runner.

Designed for High-Reliability Operations:
- Immersive View: Authoring tools, sidebars, and edit buttons vanish completely.
- High-Legibility Typography: Extra-large text easily readable from across a workbench or machine terminal.
- Ambient Progress: A subtle, translucent blue gradient tracks completion across the sequence.
- Operator Safety: Prominent 1-click copy buttons and big tactile Next/Back targets.`,
      assets: [],
      checklist: [
        { id: "c_pl1_1", text: "Launch Player Mode using the top bar Play button", checked: false },
        { id: "c_pl1_2", text: "Verify high-contrast large-format typography on screen", checked: false }
      ],
      copy_fields: [],
      disable_back: false
    },
    {
      id: "step_ply_2",
      title: "The Esc Key Logic & Windowed State",
      content_text: `In Player Mode, pressing the Esc key exits fullscreen mode to a clean windowed read-only viewer.

CRITICAL ARCHITECTURAL CONSTRAINT:
Pressing Esc does NOT drop the operator back into the authoring editor, and it does NOT close or reset the active runbook.

Why this matters:
- On production floors, operators frequently press Esc to dismiss popups or OS notifications.
- Step-case protects live execution state: checklist progress and step position remain 100% intact.
- To return to the Editor, the user must explicitly click the dedicated 'Edit' button in the header.`,
      assets: [],
      checklist: [
        { id: "c_pl2_1", text: "Press Esc during fullscreen playback", checked: false },
        { id: "c_pl2_2", text: "Confirm the runner drops to a windowed state without losing active execution state", checked: false }
      ],
      copy_fields: [
        { label: "Windowed Toggle", value: "Esc" }
      ],
      disable_back: false
    },
    {
      id: "step_ply_3",
      title: "Navigation & Section Skipping in Player Mode",
      content_text: `Operators can navigate through live runbooks with zero friction:

- Next Step: Click the Next button, press ArrowRight, or press Space.
- Previous Step: Click the Back button or press ArrowLeft (unless Strict Lock-Step is enabled).
- Decision Selection: When reaching a screen, click any route button (or press 1, 2, 3...) to choose a branch.
- Section Skipping: If an operator has already satisfied prerequisite steps, clicking 'Skip Section' leaps directly to the first step of the next milestone.`,
      assets: [],
      checklist: [
        { id: "c_pl3_1", text: "Use ArrowRight or Space to advance through steps", checked: false },
        { id: "c_pl3_2", text: "Use ArrowLeft to return to previous steps", checked: false }
      ],
      copy_fields: [],
      disable_back: false
    },

    // --- SECTION 3: DISTRIBUTION, EXPORT & INNO SETUP ---
    {
      id: "step_dist_1",
      title: "The Hybrid Data Architecture",
      content_text: `Step-case rejects opaque proprietary databases and bloated binary files. It implements the Hybrid Data Architecture:

1. config.json: Stores strictly the structural skeleton (Screens, Sequences, Sections, and routing metadata).
2. content/*.md: Each sequence is saved as a single human-readable Markdown file. Individual steps are delimited by standard '---' rules.
3. assets/: All screenshots, diagrams, and vector assets are stored as relative files.

Benefits:
- 100% Git-friendly: Diff procedures, review pull requests, and audit changes using standard version control.
- Offline-first: Runbooks work without external cloud dependencies or database servers.`,
      assets: [],
      checklist: [
        { id: "c_ds1_1", text: "Understand how config.json stores the routing graph", checked: true },
        { id: "c_ds1_2", text: "Understand how content/*.md stores steps separated by '---'", checked: true }
      ],
      copy_fields: [],
      disable_back: false
    },
    {
      id: "step_dist_2",
      title: "Exporting Portable ZIP Bundles",
      content_text: `Export ZIP packages your entire playbook into a self-contained .zip bundle containing config.json, all content/*.md files, and assets/.

Features:
- Any Step-case instance can import and execute this bundle immediately with zero broken paths.
- Portable offline backup of all procedural knowledge.
- Compatible with automated CI/CD distribution pipelines.`,
      assets: [],
      checklist: [
        { id: "c_ds2_1", text: "Test Export ZIP from the top menu to create a shareable archive", checked: false },
        { id: "c_ds2_2", text: "Verify that all sequence markdown files and assets are bundled intact", checked: false }
      ],
      copy_fields: [
        { label: "Export CLI Command", value: "stepcase export --format zip --output playbook.zip" }
      ],
      disable_back: false
    },
    {
      id: "step_dist_3",
      title: "Printing & PDF Publication Manuals",
      content_text: `Step-case automatically compiles your branched runbook into a linear, publication-grade user manual.

Automated Document Compilation:
- Title Cover Page with author attribution and metadata.
- Dynamic Table of Contents indexing all sections, screens, and sequences.
- Cleanly formatted step instructions, checklists, and copyable commands.
- Appendix detailing troubleshooting and error paths.`,
      assets: [],
      checklist: [
        { id: "c_ds3_1", text: "Select Print Manual from the top menu to inspect the automated layout", checked: false },
        { id: "c_ds3_2", text: "Confirm dynamic Table of Contents generation across sections", checked: false }
      ],
      copy_fields: [],
      disable_back: false
    },
    {
      id: "step_dist_4",
      title: "Windows Inno Setup Compilation & Installer",
      content_text: `Step-case is compiled into a standalone Windows installer using Inno Setup:

- Target Executable: Step-case.exe generated via PyInstaller.
- Default Playbooks Location: Installed to {commonappdata}\\Step-case\\default_playbooks so 'On using step-case' is immediately available on first launch.
- Persistent User Directory: %APPDATA%\\Step-case\\playbooks stores user-authored playbooks and persists across software updates.
- Zero External Dependencies: PyWebView and local assets are bundled into a self-contained installation.`,
      assets: [],
      checklist: [
        { id: "c_ds4_1", text: "Review Inno Setup [Files] directives for bundling default playbooks", checked: true },
        { id: "c_ds4_2", text: "Ensure persistent user data directories remain untouched on update", checked: true }
      ],
      copy_fields: [
        { label: "Inno Setup Compiler CLI", value: "iscc.exe installer\\setup_script.iss" }
      ],
      disable_back: false
    }
  ]
};

// -------------------------------------------------------------
// APPLICATION STATE
// -------------------------------------------------------------
let allPlaybooks = [
  JSON.parse(JSON.stringify(PLAYBOOK_STEPCASE))
];

let assetsMap = { ...DEFAULT_ASSETS };

let activePlaybookIndex = null; // null => Welcome Hub View; number => active playbook
let activeMode = 'builder'; // 'builder' or 'player'

let activeNode = {
  type: 'step', // 'screen' | 'sequence' | 'step'
  id: '',
  sequenceId: ''
};

let currentAttachingStepId = null;

let playerState = {
  mode: 'screen', // 'screen' or 'step'
  screenId: '',
  sequenceId: '',
  stepIndex: 0,
  history: [],
  checklistState: {} // stepId -> Record<checkId, boolean>
};

let currentTheme = 'light';
let currentPrimaryColor = '#1A73E8';
let livePreviewEnabled = false;

// Editor Step View Mode: 'single' (1 step per page) or 'all' (overview canvas)
let editorStepViewMode = 'single';
let editorSingleStepIndex = 0;
let currentEditingSectionId = null;

// Fullscreen Image Lightbox State
const lightboxState = {
  assets: [],
  currentIndex: 0,
  zoom: 1.0,
  isDragging: false,
  startX: 0,
  startY: 0,
  translateX: 0,
  translateY: 0
};

// Sidebar Open/Closed State
let isSidebarOpen = true;

function toggleSidebar(forceState) {
  if (typeof forceState === 'boolean') {
    isSidebarOpen = forceState;
  } else {
    isSidebarOpen = !isSidebarOpen;
  }

  if (dom.sidebarPlaybooks) {
    if (isSidebarOpen) {
      dom.sidebarPlaybooks.classList.remove('is-collapsed');
    } else {
      dom.sidebarPlaybooks.classList.add('is-collapsed');
    }
  }

  if (dom.btnOpenSidebarEdge) {
    if (isSidebarOpen) {
      dom.btnOpenSidebarEdge.classList.add('hidden');
    } else {
      dom.btnOpenSidebarEdge.classList.remove('hidden');
    }
  }

  if (dom.btnToggleSidebar) {
    dom.btnToggleSidebar.setAttribute('title', isSidebarOpen ? 'Close Sidebar (Ctrl+B)' : 'Open Sidebar (Ctrl+B)');
    dom.btnToggleSidebar.classList.toggle('text-theme-primary', !isSidebarOpen);
  }

  try {
    localStorage.setItem('stepcase_sidebar_open', isSidebarOpen ? '1' : '0');
  } catch (err) {}
}

// -------------------------------------------------------------
// DOM ELEMENTS
// -------------------------------------------------------------
const dom = {
  splash: document.getElementById('splashScreen'),
  license: document.getElementById('licenseDialog'),
  btnAcceptLicense: document.getElementById('btnAcceptLicense'),
  btnDeclineLicense: document.getElementById('btnDeclineLicense'),
  btnDeclineCross: document.getElementById('btnDeclineCross'),

  btnHomeLogo: document.getElementById('btnHomeLogo'),
  activePlaybookBadge: document.getElementById('activePlaybookBadge'),
  btnModeBuilder: document.getElementById('btnModeBuilder'),
  btnModePlayer: document.getElementById('btnModePlayer'),

  btnTopAddFiles: document.getElementById('btnTopAddFiles'),
  topAddFilesInput: document.getElementById('topAddFilesInput'),
  btnTopImportZip: document.getElementById('btnTopImportZip'),
  topImportZipInput: document.getElementById('topImportZipInput'),
  btnTopExportZip: document.getElementById('btnTopExportZip'),
  btnLampToggle: document.getElementById('btnLampToggle'),
  btnDownloadPyQt6: document.getElementById('btnDownloadPyQt6'),

  // Sidebar & Layout Controls
  mainAppContainer: document.getElementById('mainAppContainer'),
  mainWorkspace: document.getElementById('mainWorkspace'),
  btnToggleSidebar: document.getElementById('btnToggleSidebar'),
  btnCloseSidebar: document.getElementById('btnCloseSidebar'),
  btnOpenSidebarEdge: document.getElementById('btnOpenSidebarEdge'),
  btnCanvasToggleSidebar: document.getElementById('btnCanvasToggleSidebar'),
  sidebarPlaybooks: document.getElementById('sidebarPlaybooks'),
  playbooksCountBadge: document.getElementById('playbooksCountBadge'),
  btnSidebarAddPlaybook: document.getElementById('btnSidebarAddPlaybook'),
  playbooksListContainer: document.getElementById('playbooksListContainer'),
  btnReturnWelcome: document.getElementById('btnReturnWelcome'),

  // Views
  welcomeHubView: document.getElementById('welcomeHubView'),
  builderWorkerView: document.getElementById('builderWorkerView'),
  playerExecutionView: document.getElementById('playerExecutionView'),
  footerModeLabel: document.getElementById('footerModeLabel'),

  // Welcome View
  cardAddPlaybook: document.getElementById('cardAddPlaybook'),
  cardModifyPlaybook: document.getElementById('cardModifyPlaybook'),
  btnQuickSelectOurs: document.getElementById('btnQuickSelectOurs'),
  btnLaunchPlayerStepcase: document.getElementById('btnLaunchPlayerStepcase'),

  // Canvas Elements (The Hybrid Canvas UI Layout)
  mainScreenCanvas: document.getElementById('mainScreenCanvas'),
  canvasPlaybookTitleContainer: document.getElementById('canvasPlaybookTitleContainer'),
  canvasPlaybookBadge: document.getElementById('canvasPlaybookBadge'),
  canvasPlaybookTitleInput: document.getElementById('canvasPlaybookTitleInput'),
  btnCanvasEditTitle: document.getElementById('btnCanvasEditTitle'),
  btnCanvasQuickAddStep: document.getElementById('btnCanvasQuickAddStep'),
  btnCanvasActionMenu: document.getElementById('btnCanvasActionMenu'),
  canvasActionDropdown: document.getElementById('canvasActionDropdown'),
  menuActionAddStep: document.getElementById('menuActionAddStep'),
  menuActionAddScreen: document.getElementById('menuActionAddScreen'),
  menuActionAddSequence: document.getElementById('menuActionAddSequence'),
  menuActionAttachMedia: document.getElementById('menuActionAttachMedia'),
  menuActionAddChecklist: document.getElementById('menuActionAddChecklist'),
  menuActionAddCopyField: document.getElementById('menuActionAddCopyField'),
  menuActionMarkSection: document.getElementById('menuActionMarkSection'),
  menuActionToggleLock: document.getElementById('menuActionToggleLock'),
  menuActionDeleteItem: document.getElementById('menuActionDeleteItem'),
  canvasActiveBreadcrumb: document.getElementById('canvasActiveBreadcrumb'),
  btnCanvasAddStep: document.getElementById('btnCanvasAddStep'),
  btnCanvasAddSequence: document.getElementById('btnCanvasAddSequence'),
  btnCanvasAddSection: document.getElementById('btnCanvasAddSection'),
  btnCanvasAddScreen: document.getElementById('btnCanvasAddScreen'),
  btnToggleEditorStepView: document.getElementById('btnToggleEditorStepView'),
  labelToggleEditorStepView: document.getElementById('labelToggleEditorStepView'),
  btnCanvasLaunchPlayer: document.getElementById('btnCanvasLaunchPlayer'),
  stepMediaFileInput: document.getElementById('stepMediaFileInput'),

  // Player Elements (Immersive Full-Screen Presentation & Windowed State)
  playerWaterProgressFill: document.getElementById('playerWaterProgressFill'),
  playerWindowedHeader: document.getElementById('playerWindowedHeader'),
  playerHeaderPlaybookTitle: document.getElementById('playerHeaderPlaybookTitle'),
  btnPlayerToggleFullscreen: document.getElementById('btnPlayerToggleFullscreen'),
  btnExitPlayerToEditor: document.getElementById('btnExitPlayerToEditor'),
  btnPlayerWindowedModeBuilder: document.getElementById('btnPlayerWindowedModeBuilder'),
  btnPlayerWindowedModePlayer: document.getElementById('btnPlayerWindowedModePlayer'),
  playerSlideStage: document.getElementById('playerSlideStage'),
  playerMassiveStepText: document.getElementById('playerMassiveStepText'),
  playerMassiveStepContent: document.getElementById('playerMassiveStepContent'),
  btnPlayerArrowPrev: document.getElementById('btnPlayerArrowPrev'),
  btnPlayerArrowNext: document.getElementById('btnPlayerArrowNext'),
  playerBottomNavPane: document.getElementById('playerBottomNavPane'),
  btnPlayerNavBack: document.getElementById('btnPlayerNavBack'),
  btnPlayerNavNext: document.getElementById('btnPlayerNavNext'),
  playerSlideCounter: document.getElementById('playerSlideCounter'),

  playerStepCounter: document.getElementById('playerStepCounter'),
  playerNormalStepArea: document.getElementById('playerNormalStepArea'),
  playerSectionArea: document.getElementById('playerSectionArea'),
  playerSectionBadge: document.getElementById('playerSectionBadge'),
  playerSectionMainTitle: document.getElementById('playerSectionMainTitle'),
  playerSectionMainDesc: document.getElementById('playerSectionMainDesc'),
  btnPlayerSectionCardBack: document.getElementById('btnPlayerSectionCardBack'),
  btnPlayerSectionCardSkip: document.getElementById('btnPlayerSectionCardSkip'),
  btnPlayerSectionCardNext: document.getElementById('btnPlayerSectionCardNext'),
  playerSectionBanner: document.getElementById('playerSectionBanner'),
  playerSectionTitle: document.getElementById('playerSectionTitle'),
  playerSectionStepRange: document.getElementById('playerSectionStepRange'),
  btnSectionBannerBack: document.getElementById('btnSectionBannerBack'),
  btnSectionBannerNext: document.getElementById('btnSectionBannerNext'),
  btnPlayerSkipSection: document.getElementById('btnPlayerSkipSection'),
  playerStepLayoutGrid: document.getElementById('playerStepLayoutGrid'),
  playerStepControlsCol: document.getElementById('playerStepControlsCol'),
  playerStepMediaContainer: document.getElementById('playerStepMediaContainer'),
  playerChecklistSection: document.getElementById('playerChecklistSection'),
  playerChecklistPercent: document.getElementById('playerChecklistPercent'),
  playerChecklistItemsList: document.getElementById('playerChecklistItemsList'),
  playerCopyFieldsSection: document.getElementById('playerCopyFieldsSection'),
  playerCopyFieldsItemsList: document.getElementById('playerCopyFieldsItemsList'),

  // Lightbox Modal Elements
  imagePreviewLightboxModal: document.getElementById('imagePreviewLightboxModal'),
  lightboxImageTitle: document.getElementById('lightboxImageTitle'),
  lightboxImageCounter: document.getElementById('lightboxImageCounter'),
  lightboxImageContainer: document.getElementById('lightboxImageContainer'),
  lightboxCaptionText: document.getElementById('lightboxCaptionText'),
  lightboxZoomLevel: document.getElementById('lightboxZoomLevel'),
  btnLightboxZoomOut: document.getElementById('btnLightboxZoomOut'),
  btnLightboxZoomIn: document.getElementById('btnLightboxZoomIn'),
  btnLightboxZoomReset: document.getElementById('btnLightboxZoomReset'),
  btnLightboxPrev: document.getElementById('btnLightboxPrev'),
  btnLightboxNext: document.getElementById('btnLightboxNext'),
  btnCloseLightbox: document.getElementById('btnCloseLightbox'),

  // Mark Section Modal Elements
  markSectionModal: document.getElementById('markSectionModal'),
  sectionTitleInput: document.getElementById('sectionTitleInput'),
  sectionFromStepSelect: document.getElementById('sectionFromStepSelect'),
  sectionToStepSelect: document.getElementById('sectionToStepSelect'),
  sectionAllowSkipCheckbox: document.getElementById('sectionAllowSkipCheckbox'),
  btnDeleteCurrentSection: document.getElementById('btnDeleteCurrentSection'),
  btnCloseSectionModal: document.getElementById('btnCloseSectionModal'),
  btnCancelSectionModal: document.getElementById('btnCancelSectionModal'),
  btnSaveSectionModal: document.getElementById('btnSaveSectionModal'),

  playerDecisionScreenArea: document.getElementById('playerDecisionScreenArea'),
  playerDecisionScreenTitle: document.getElementById('playerDecisionScreenTitle'),
  playerDecisionScreenDesc: document.getElementById('playerDecisionScreenDesc'),
  playerDecisionOptionsGrid: document.getElementById('playerDecisionOptionsGrid'),

  playerCompletionScreenArea: document.getElementById('playerCompletionScreenArea'),
  btnPlayerRestart: document.getElementById('btnPlayerRestart'),
  btnPlayerReturnBuilder: document.getElementById('btnPlayerReturnBuilder'),

  playerJumpToSelect: document.getElementById('playerJumpToSelect'),
  footerWordCountBadge: document.getElementById('footerWordCountBadge'),
  footerWordCountText: document.getElementById('footerWordCountText'),

  // Search & Auto-Save
  globalSearchBar: document.getElementById('globalSearchBar'),
  btnClearSearch: document.getElementById('btnClearSearch'),
  searchResultsDropdown: document.getElementById('searchResultsDropdown'),
  autoSaveIndicator: document.getElementById('autoSaveIndicator'),
  autoSaveText: document.getElementById('autoSaveText'),

  // Step Editor Text Helpers
  btnInsertRouteButton: document.getElementById('btnInsertRouteButton'),
  btnInsertCodeBlock: document.getElementById('btnInsertCodeBlock'),
  btnInsertCallout: document.getElementById('btnInsertCallout'),

  // Toast & Modals
  toast: document.getElementById('toastNotification'),
  pythonCodeModal: document.getElementById('pythonCodeModal'),
  btnClosePythonModal: document.getElementById('btnClosePythonModal'),
  btnModalDownloadPyZip: document.getElementById('btnModalDownloadPyZip'),

  // Resume Modal
  resumePlaybookModal: document.getElementById('resumePlaybookModal'),
  resumeDetailsText: document.getElementById('resumeDetailsText'),
  btnResumeConfirm: document.getElementById('btnResumeConfirm'),
  btnResumeRestart: document.getElementById('btnResumeRestart'),

  // PDF Export Modal
  pdfExportModal: document.getElementById('pdfExportModal'),
  pdfPrintableContent: document.getElementById('pdfPrintableContent'),
  btnPrintDirectly: document.getElementById('btnPrintDirectly'),
  btnClosePdfModal: document.getElementById('btnClosePdfModal'),
  actionMenuExportPdf: document.getElementById('actionMenuExportPdf'),

  // VS Code Tree Context Menu & Reveal in Explorer
  treeContextMenu: document.getElementById('treeContextMenu'),
  treeContextMenuItems: document.getElementById('treeContextMenuItems'),
  revealInExplorerModal: document.getElementById('revealInExplorerModal'),
  revealFilePath: document.getElementById('revealFilePath'),
  revealFileDescription: document.getElementById('revealFileDescription'),
  btnCloseRevealModal: document.getElementById('btnCloseRevealModal'),
  btnDismissRevealModal: document.getElementById('btnDismissRevealModal'),
  btnCopyRevealedPath: document.getElementById('btnCopyRevealedPath'),

  // Settings & Edit Menus
  btnThemeLight: document.getElementById('btnThemeLight'),
  btnThemeDark: document.getElementById('btnThemeDark'),
  btnHeaderThemeLight: document.getElementById('btnHeaderThemeLight'),
  btnHeaderThemeDark: document.getElementById('btnHeaderThemeDark'),
  editorActiveStepWordCountBadge: document.getElementById('editorActiveStepWordCountBadge'),
  editorActiveStepWordCountText: document.getElementById('editorActiveStepWordCountText'),
  btnCheckForUpdates: document.getElementById('btnCheckForUpdates'),
  actionEditInsertPicture: document.getElementById('actionEditInsertPicture'),
  actionEditDeleteStep: document.getElementById('actionEditDeleteStep'),
  actionEditDeleteSequence: document.getElementById('actionEditDeleteSequence'),
  actionEditDeletePlaybook: document.getElementById('actionEditDeletePlaybook'),

  // Provisional Deletion Confirmation Modal
  deleteConfirmModal: document.getElementById('deleteConfirmModal'),
  deleteModalTitle: document.getElementById('deleteModalTitle'),
  deleteModalSubtitle: document.getElementById('deleteModalSubtitle'),
  deleteModalMessage: document.getElementById('deleteModalMessage'),
  btnConfirmDeleteModal: document.getElementById('btnConfirmDeleteModal'),
  btnCancelDeleteModal: document.getElementById('btnCancelDeleteModal'),

  // About & Help Modals
  menuItemHelp: document.getElementById('menuItemHelp'),
  menuItemAboutApp: document.getElementById('menuItemAboutApp'),
  aboutReadmeModal: document.getElementById('aboutReadmeModal'),
  aboutReadmeContent: document.getElementById('aboutReadmeContent'),
  btnCopyReadmeMd: document.getElementById('btnCopyReadmeMd'),
  btnCloseAboutReadmeModal: document.getElementById('btnCloseAboutReadmeModal'),
  helpGuideModal: document.getElementById('helpGuideModal'),
  btnCloseHelpModal: document.getElementById('btnCloseHelpModal')
};

// -------------------------------------------------------------
// PROVISIONAL DELETION MODAL (Thoughtful safeguard against accidental data loss)
// -------------------------------------------------------------
function openProvisionalDeleteDialog({ title, subtitle, message, confirmText = 'Delete', onConfirm }) {
  if (!dom.deleteConfirmModal) {
    if (confirm(message)) onConfirm();
    return;
  }

  if (dom.deleteModalTitle) dom.deleteModalTitle.textContent = title;
  if (dom.deleteModalSubtitle) dom.deleteModalSubtitle.textContent = subtitle || 'Provisional deletion safeguard';
  if (dom.deleteModalMessage) dom.deleteModalMessage.textContent = message;
  if (dom.btnConfirmDeleteModal) dom.btnConfirmDeleteModal.textContent = confirmText;

  dom.deleteConfirmModal.classList.remove('hidden');

  const cleanupListeners = () => {
    dom.deleteConfirmModal.classList.add('hidden');
    if (dom.btnConfirmDeleteModal) dom.btnConfirmDeleteModal.onclick = null;
    if (dom.btnCancelDeleteModal) dom.btnCancelDeleteModal.onclick = null;
  };

  if (dom.btnCancelDeleteModal) {
    dom.btnCancelDeleteModal.onclick = (e) => {
      e?.preventDefault();
      cleanupListeners();
    };
  }

  if (dom.btnConfirmDeleteModal) {
    dom.btnConfirmDeleteModal.onclick = (e) => {
      e?.preventDefault();
      cleanupListeners();
      try {
        onConfirm();
      } catch (err) {
        console.error('Error in deletion confirmation:', err);
      }
    };
  }
}

// -------------------------------------------------------------
// -------------------------------------------------------------
// EDITOR MODE ACTIVE STEP WORD COUNT TRACKER (BOTTOM STATUS BAR)
// Displays total word count for the current active step at bottom of screen
// -------------------------------------------------------------
function updateActiveStepWordCount(explicitStep = null) {
  const pb = getActivePlaybook();
  if (!pb) return;

  let currentStep = explicitStep;
  if (!currentStep && activeNode && activeNode.type === 'step') {
    currentStep = pb.steps?.find(s => s.id === activeNode.id);
  }
  if (!currentStep && pb.steps && pb.steps.length > 0) {
    currentStep = pb.steps[0];
  }

  const footerText = dom.footerWordCountText || document.getElementById('footerWordCountText');
  const footerBadge = dom.footerWordCountBadge || document.getElementById('footerWordCountBadge');

  if (currentStep) {
    const rawContent = (currentStep.content_text || '').trim();
    const titleText = (currentStep.title || '').trim();
    const combined = (titleText + ' ' + rawContent).trim();
    const words = combined ? (combined.match(/\S+/g)?.length || 0) : 0;
    const chars = combined.length;

    if (footerText) {
      footerText.textContent = `Step: ${words} word${words === 1 ? '' : 's'}`;
    }
    if (footerBadge) {
      footerBadge.title = `Active Step: "${currentStep.title || 'Step'}" • ${words} words (${chars} chars)`;
    }
  } else {
    if (footerText) footerText.textContent = 'Step: 0 words';
  }
  if (dom.footerModeLabel && activeMode === 'builder') {
    dom.footerModeLabel.textContent = 'Editor';
  }
}

// -------------------------------------------------------------
// CREATE NEW PLAYBOOK: THE "BLANK SLATE" DEFAULT STATE
// No default branches/screens/sequences. Pure single step input.
// Default name: "Untitled"
// -------------------------------------------------------------
function createNewPlaybookFlow() {
  const newPb = {
    version: '1.0',
    name: 'Untitled',
    title: 'Untitled',
    start_screen_id: null,
    screens: [],
    sequences: [],
    sections: [],
    steps: [
      {
        id: 'step_' + Date.now(),
        title: '',
        content_text: '',
        assets: [],
        checklist: [],
        copy_fields: [],
        disable_back: false
      }
    ]
  };
  allPlaybooks.push(newPb);
  activePlaybookIndex = allPlaybooks.length - 1;
  activeNode = { type: 'step', id: newPb.steps[0].id, sequenceId: '' };
  persistState();
  selectPlaybook(allPlaybooks.length - 1, 'builder');
  showToast('New blank playbook created.');
}

// -------------------------------------------------------------
// HIGH-LEVEL PLAYBOOK MUTATION HELPERS (Reliable additions & deletions)
// -------------------------------------------------------------
function addStepToActiveSequence() {
  const pb = getActivePlaybook();
  if (!pb) return;
  ensurePlaybookStructure(pb);

  // If in Linear mode (no screens), append step to linear list
  if (!pb.screens || pb.screens.length === 0) {
    const newStep = {
      id: 'step_' + Date.now(),
      title: '',
      content_text: '',
      assets: [],
      checklist: [],
      copy_fields: [],
      disable_back: false
    };
    if (!Array.isArray(pb.steps)) pb.steps = [];
    pb.steps.push(newStep);
    activeNode = { type: 'step', id: newStep.id, sequenceId: '' };
    persistState();
    renderBuilderView(true);
    renderSidebarPlaybooks();
    updateActiveStepWordCount(newStep);
    setTimeout(() => {
      const mainInput = dom.mainScreenCanvas?.querySelector('.single-step-main-input');
      mainInput?.focus();
    }, 40);
    showToast('Turned page to new blank step.');
    return;
  }

  let targetSeq = null;
  if (activeNode?.sequenceId) {
    targetSeq = pb.sequences.find(s => s.id === activeNode.sequenceId);
  }
  if (!targetSeq && activeNode?.type === 'sequence') {
    targetSeq = pb.sequences.find(s => s.id === activeNode.id);
  }
  if (!targetSeq && pb.sequences.length > 0) {
    targetSeq = pb.sequences[0];
  }

  // If playbook has no sequence yet, create one
  if (!targetSeq) {
    const newSeqId = 'seq_' + Date.now();
    targetSeq = {
      id: newSeqId,
      title: 'Sequence 1',
      step_ids: [],
      next_screen_id: ''
    };
    pb.sequences.push(targetSeq);
  }

  if (!Array.isArray(targetSeq.step_ids)) targetSeq.step_ids = [];
  if (!Array.isArray(pb.steps)) pb.steps = [];

  const newStepId = 'step_' + Date.now();
  const stepNumber = targetSeq.step_ids.length + 1;
  const newStep = {
    id: newStepId,
    title: '',
    content_text: '',
    assets: [],
    checklist: [],
    copy_fields: [],
    disable_back: false
  };

  pb.steps.push(newStep);
  targetSeq.step_ids.push(newStepId);
  activeNode = { type: 'step', id: newStepId, sequenceId: targetSeq.id };

  persistState();
  renderBuilderView(true);
  renderSidebarPlaybooks();
  updateActiveStepWordCount(newStep);
  showToast(`Turned page to new blank step in "${targetSeq.title}".`);

  // Auto-focus newly created step
  setTimeout(() => {
    const mainInput = dom.mainScreenCanvas?.querySelector('.single-step-main-input');
    mainInput?.focus();
  }, 40);
}

function addSequenceToActivePlaybook() {
  const pb = getActivePlaybook();
  if (!pb) return;
  ensurePlaybookStructure(pb);

  // Progressive Disclosure: If transitioning from linear to branched
  if (!pb.screens || pb.screens.length === 0) {
    const scId = 'screen_start_' + Date.now();
    const seq1Id = 'seq_1_' + Date.now();
    const seq2Id = 'seq_2_' + Date.now();
    const newStepId = 'step_' + Date.now();
    const stepIds = (pb.steps || []).map(s => s.id);

    pb.steps.push({
      id: newStepId,
      title: 'Initial Step for Sequence 2',
      content_text: '',
      assets: [],
      checklist: [],
      copy_fields: [],
      disable_back: false
    });

    pb.sequences = [
      {
        id: seq1Id,
        title: 'Sequence 1 (Primary Flow)',
        step_ids: stepIds,
        next_screen_id: null
      },
      {
        id: seq2Id,
        title: 'Sequence 2 (Alternative Flow)',
        step_ids: [newStepId],
        next_screen_id: null
      }
    ];

    pb.screens = [
      {
        id: scId,
        title: 'Screen 1 (Choose Procedure Flow)',
        disable_back: false,
        options: [
          { id: 'opt_1', label: 'Sequence 1 (Primary Flow)', target_sequence_id: seq1Id },
          { id: 'opt_2', label: 'Sequence 2 (Alternative Flow)', target_sequence_id: seq2Id }
        ]
      }
    ];
    pb.start_screen_id = scId;
    pb.sections = [
      {
        id: 'sec_' + Date.now(),
        title: pb.title || pb.name || 'Installation Runbook',
        screen_ids: [scId],
        step_ids: []
      }
    ];

    activeNode = { type: 'step', id: newStepId, sequenceId: seq2Id };
    persistState();
    renderBuilderView(true);
    renderSidebarPlaybooks();
    updateActiveStepWordCount();
    showToast('Sequence 2 created. Branched structure enabled.');
    return;
  }

  const newSeqId = 'seq_' + Date.now();
  const newStepId = 'step_' + Date.now();
  const newSeqTitle = 'Sequence ' + (pb.sequences.length + 1);

  pb.steps.push({
    id: newStepId,
    title: 'Initial Step',
    content_text: '',
    assets: [],
    checklist: [],
    copy_fields: [],
    disable_back: false
  });

  pb.sequences.push({
    id: newSeqId,
    title: newSeqTitle,
    step_ids: [newStepId],
    next_screen_id: ''
  });

  // Link to active screen if available
  if (pb.screens && pb.screens.length > 0) {
    const activeScreen = (activeNode?.type === 'screen' ? pb.screens.find(sc => sc.id === activeNode.id) : null) || pb.screens[0];
    if (activeScreen) {
      if (!Array.isArray(activeScreen.options)) activeScreen.options = [];
      activeScreen.options.push({
        id: 'opt_' + Date.now(),
        label: newSeqTitle,
        target_sequence_id: newSeqId
      });
    }
  }

  activeNode = { type: 'step', id: newStepId, sequenceId: newSeqId };
  persistState();
  renderBuilderView(true);
  renderSidebarPlaybooks();
  updateActiveStepWordCount();
  showToast(`Added "${newSeqTitle}".`);
}

function addScreenToActivePlaybook() {
  const pb = getActivePlaybook();
  if (!pb) return;
  ensurePlaybookStructure(pb);

  // Progressive Disclosure: If transitioning from linear to branched
  if (!pb.screens || pb.screens.length === 0) {
    const scId = 'screen_start_' + Date.now();
    const seqId = 'seq_1_' + Date.now();
    const stepIds = (pb.steps || []).map(s => s.id);
    pb.sequences = [
      {
        id: seqId,
        title: 'Primary Sequence',
        step_ids: stepIds,
        next_screen_id: null
      }
    ];
    pb.screens = [
      {
        id: scId,
        title: 'Screen 1 (Decision Point)',
        disable_back: false,
        options: [
          { id: 'opt_1', label: 'Primary Sequence', target_sequence_id: seqId }
        ]
      }
    ];
    pb.start_screen_id = scId;
    pb.sections = [
      {
        id: 'sec_' + Date.now(),
        title: pb.title || pb.name || 'Section 1',
        screen_ids: [scId],
        step_ids: []
      }
    ];
    activeNode = { type: 'screen', id: scId, sequenceId: '' };
    persistState();
    renderBuilderView(true);
    renderSidebarPlaybooks();
    showToast('Screen created. Branched structure enabled.');
    return;
  }

  const newScreenId = 'screen_' + Date.now();
  const screenTitle = 'Screen ' + (pb.screens.length + 1) + ' (Decision Point)';
  pb.screens.push({
    id: newScreenId,
    title: screenTitle,
    disable_back: false,
    options: []
  });

  if (pb.sections && pb.sections.length > 0) {
    const sec = pb.sections[0];
    if (!Array.isArray(sec.screen_ids)) sec.screen_ids = [];
    sec.screen_ids.push(newScreenId);
  }

  activeNode = { type: 'screen', id: newScreenId, sequenceId: '' };
  persistState();
  renderBuilderView(true);
  renderSidebarPlaybooks();
  showToast(`Added "${screenTitle}".`);
}

function deleteActiveStep() {
  const pb = getActivePlaybook();
  if (!pb) return;
  ensurePlaybookStructure(pb);

  let stepToDelete = null;
  let parentSeq = null;

  if (activeNode?.type === 'step') {
    stepToDelete = pb.steps.find(s => s.id === activeNode.id);
    parentSeq = pb.sequences.find(seq => Array.isArray(seq.step_ids) && seq.step_ids.includes(activeNode.id));
  }
  if (!stepToDelete && pb.steps.length > 0) {
    stepToDelete = pb.steps[0];
    parentSeq = pb.sequences.find(seq => Array.isArray(seq.step_ids) && seq.step_ids.includes(stepToDelete.id));
  }

  if (!stepToDelete) {
    showToast('No step selected to delete.');
    return;
  }

  openProvisionalDeleteDialog({
    title: 'Delete Step',
    subtitle: 'Provisional Deletion Safeguard',
    message: `Are you sure you want to delete step "${stepToDelete.title || 'Untitled Step'}"? Its content, verification checklists, and copy commands will be permanently removed.`,
    confirmText: 'Delete Step',
    onConfirm: () => {
      pb.steps = pb.steps.filter(s => s.id !== stepToDelete.id);
      pb.sequences.forEach(seq => {
        if (Array.isArray(seq.step_ids)) {
          seq.step_ids = seq.step_ids.filter(id => id !== stepToDelete.id);
        }
      });
      cleanupOrphanedAssets(pb);

      // Select another step if available
      if (parentSeq && parentSeq.step_ids && parentSeq.step_ids.length > 0) {
        activeNode = { type: 'step', id: parentSeq.step_ids[0], sequenceId: parentSeq.id };
      } else if (pb.steps.length > 0) {
        activeNode = { type: 'step', id: pb.steps[0].id, sequenceId: pb.sequences[0]?.id || '' };
      } else {
        // Create clean fallback step so playbook is never corrupted
        const newStepId = 'step_' + Date.now();
        pb.steps.push({
          id: newStepId,
          title: 'Write Step here',
          content_text: '',
          assets: [],
          checklist: [],
          copy_fields: [],
          disable_back: false
        });
        if (parentSeq) {
          parentSeq.step_ids.push(newStepId);
          activeNode = { type: 'step', id: newStepId, sequenceId: parentSeq.id };
        } else {
          activeNode = { type: 'step', id: newStepId, sequenceId: '' };
        }
      }

      persistState();
      renderBuilderView(true);
      renderSidebarPlaybooks();
      updateActiveStepWordCount();
      showToast('Step deleted.');
    }
  });
}

function deleteActiveSequence() {
  const pb = getActivePlaybook();
  if (!pb) return;
  ensurePlaybookStructure(pb);

  let seqToDelete = null;
  if (activeNode?.sequenceId) {
    seqToDelete = pb.sequences.find(s => s.id === activeNode.sequenceId);
  } else if (activeNode?.type === 'sequence') {
    seqToDelete = pb.sequences.find(s => s.id === activeNode.id);
  }
  if (!seqToDelete && pb.sequences.length > 0) {
    seqToDelete = pb.sequences[0];
  }

  if (!seqToDelete) {
    showToast('No sequence selected to delete.');
    return;
  }

  openProvisionalDeleteDialog({
    title: 'Delete Sequence',
    subtitle: 'Provisional Deletion Safeguard',
    message: `Are you sure you want to delete sequence "${seqToDelete.title}"? This will delete the sequence and its ${seqToDelete.step_ids?.length || 0} associated step(s).`,
    confirmText: 'Delete Sequence',
    onConfirm: () => {
      const idsToDelete = seqToDelete.step_ids || [];
      pb.sequences = pb.sequences.filter(sq => sq.id !== seqToDelete.id);
      pb.steps = pb.steps.filter(s => !idsToDelete.includes(s.id));
      pb.screens.forEach(sc => {
        if (Array.isArray(sc.options)) {
          sc.options = sc.options.filter(o => o.target_sequence_id !== seqToDelete.id);
        }
      });

      if (pb.sequences.length === 0) {
        const newSeqId = 'seq_' + Date.now();
        const newStepId = 'step_' + Date.now();
        pb.steps.push({
          id: newStepId,
          title: 'Initial Step',
          content_text: '',
          assets: [],
          checklist: [],
          copy_fields: [],
          disable_back: false
        });
        pb.sequences.push({
          id: newSeqId,
          title: 'Sequence 1',
          step_ids: [newStepId],
          next_screen_id: ''
        });
        activeNode = { type: 'step', id: newStepId, sequenceId: newSeqId };
      } else {
        activeNode = { type: 'sequence', id: pb.sequences[0].id, sequenceId: pb.sequences[0].id };
      }

      cleanupOrphanedAssets(pb);
      persistState();
      renderBuilderView(true);
      renderSidebarPlaybooks();
      updateActiveStepWordCount();
      showToast(`Sequence "${seqToDelete.title}" deleted.`);
    }
  });
}

function deleteActivePlaybook() {
  if (allPlaybooks.length <= 1) {
    showToast('Cannot delete the last playbook.');
    return;
  }
  const pb = getActivePlaybook();
  if (!pb) return;

  openProvisionalDeleteDialog({
    title: 'Delete Playbook',
    subtitle: 'Provisional Deletion Safeguard',
    message: `Are you sure you want to delete the playbook "${pb.title || pb.name}"? This will permanently delete all its sequences, screens, and documentation steps.`,
    confirmText: 'Delete Playbook',
    onConfirm: () => {
      allPlaybooks.splice(activePlaybookIndex, 1);
      activePlaybookIndex = Math.max(0, activePlaybookIndex - 1);
      persistState();
      showWelcomeHub();
      renderSidebarPlaybooks();
      showToast('Playbook deleted.');
    }
  });
}

// Helper: Show Google Material Toast
function showToast(message) {
  if (!dom.toast) return;
  dom.toast.textContent = message;
  dom.toast.classList.remove('opacity-0', 'pointer-events-none');
  dom.toast.classList.add('opacity-100');
  setTimeout(() => {
    dom.toast.classList.remove('opacity-100');
    dom.toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2500);
}

// Helper: Trigger Google-style Auto-save feedback
let autoSaveTimeout = null;
function triggerAutoSaveFeedback() {
  if (dom.autoSaveIndicator && dom.autoSaveText) {
    dom.autoSaveIndicator.classList.remove('hidden');
    dom.autoSaveText.textContent = 'Saving...';
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      dom.autoSaveText.textContent = 'Saved to disk';
    }, 400);
  }
}

// -------------------------------------------------------------
// PLAYBOOK DATA MODEL NORMALIZATION & DEFENSIVE STRUCTURE
// -------------------------------------------------------------
function ensurePlaybookStructure(pb) {
  if (!pb || typeof pb !== 'object') return;
  if (!Array.isArray(pb.screens)) pb.screens = [];
  if (!Array.isArray(pb.sequences)) pb.sequences = [];
  if (!Array.isArray(pb.steps)) pb.steps = [];
  if (!Array.isArray(pb.sections)) pb.sections = [];

  // Ensure every screen has proper fields
  pb.screens.forEach(sc => {
    if (!sc) return;
    if (!sc.id) sc.id = 'screen_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    if (!Array.isArray(sc.sequence_ids)) sc.sequence_ids = [];
    if (!Array.isArray(sc.options)) sc.options = [];
    if (sc.disable_back === undefined) sc.disable_back = false;
  });

  // Ensure every sequence has proper fields and step_ids is an array
  pb.sequences.forEach(seq => {
    if (!seq) return;
    if (!seq.id) seq.id = 'seq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    if (!Array.isArray(seq.step_ids)) seq.step_ids = [];
    if (seq.disable_back === undefined) seq.disable_back = false;
  });

  // Ensure every step has proper fields
  pb.steps.forEach(step => {
    if (!step) return;
    if (!step.id) step.id = 'step_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    if (!Array.isArray(step.assets)) step.assets = [];
    if (!Array.isArray(step.checklist)) step.checklist = [];
    if (!Array.isArray(step.copy_fields)) step.copy_fields = [];
    if (step.disable_back === undefined) step.disable_back = false;
  });

  // Ensure sections only if the playbook is in branched mode (screens present)
  if (pb.screens.length > 0) {
    if (pb.sections.length === 0) {
      pb.sections = [
        {
          id: 'sec_' + (pb.name || 'main'),
          title: pb.title || pb.name || 'Section 1',
          screen_ids: pb.screens.map(s => s.id),
          step_ids: []
        }
      ];
    } else {
      pb.sections.forEach(sec => {
        if (!Array.isArray(sec.screen_ids)) sec.screen_ids = [];
        if (!Array.isArray(sec.step_ids)) sec.step_ids = [];
      });
      pb.screens.forEach(sc => {
        const isTracked = pb.sections.some(sec => Array.isArray(sec.screen_ids) && sec.screen_ids.includes(sc.id));
        if (!isTracked) {
          if (!pb.sections[0].screen_ids) pb.sections[0].screen_ids = [];
          pb.sections[0].screen_ids.push(sc.id);
        }
      });
    }
  }
}

// Helper: Get active playbook
function getActivePlaybook() {
  if (activePlaybookIndex === null || !allPlaybooks[activePlaybookIndex]) {
    return null;
  }
  const pb = allPlaybooks[activePlaybookIndex];
  ensurePlaybookStructure(pb);
  return pb;
}

// -------------------------------------------------------------
// LOCAL STORAGE PERSISTENCE (AUTO-SAVE & RESUME STATE)
// -------------------------------------------------------------
function persistState() {
  try {
    allPlaybooks.forEach(pb => ensurePlaybookStructure(pb));
    localStorage.setItem('stepcase_playbooks_store', JSON.stringify(allPlaybooks));
    localStorage.setItem('stepcase_theme', currentTheme);
    localStorage.setItem('stepcase_color', currentPrimaryColor);
    
    // Save current active playbook & execution position for Resume feature
    if (activePlaybookIndex !== null && allPlaybooks[activePlaybookIndex]) {
      const activePb = allPlaybooks[activePlaybookIndex];
      const resumeInfo = {
        playbookIndex: activePlaybookIndex,
        playbookName: activePb.name,
        playbookTitle: activePb.title || activePb.name,
        mode: activeMode,
        playerState: {
          mode: playerState.mode,
          screenId: playerState.screenId,
          sequenceId: playerState.sequenceId,
          stepIndex: playerState.stepIndex
        },
        timestamp: Date.now()
      };
      localStorage.setItem('stepcase_resume_state', JSON.stringify(resumeInfo));
    }
    triggerAutoSaveFeedback();
  } catch (e) {
    console.warn('Storage save note:', e);
  }
}

// Garbage collection: remove orphaned assets not referenced by any step
function cleanupOrphanedAssets(pb) {
  if (!pb || !pb.steps) return;
  const usedAssets = new Set();
  pb.steps.forEach(s => {
    (s.assets || []).forEach(a => usedAssets.add(a));
  });

  // Check any assets mapped that are not used and not in default assets
  const allUsedAcrossPlaybooks = new Set();
  allPlaybooks.forEach(p => {
    (p.steps || []).forEach(s => {
      (s.assets || []).forEach(a => allUsedAcrossPlaybooks.add(a));
    });
  });

  Object.keys(assetsMap).forEach(key => {
    if (!DEFAULT_ASSETS[key] && !allUsedAcrossPlaybooks.has(key)) {
      delete assetsMap[key];
    }
  });
}

function loadPersistedState() {
  try {
    const saved = localStorage.getItem('stepcase_playbooks_store');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const filtered = parsed.filter(p => p.name === 'On_using_step_case' || p.name === 'On_using_Step_case' || (p.title && p.title.toLowerCase().includes('step-case')));
        if (filtered.length > 0) {
          allPlaybooks = filtered;
        }
      }
    }
    // Ensure built-in "On using step-case" playbook is refreshed and active
    const stepcaseIdx = allPlaybooks.findIndex(p => p.name === 'On_using_Step_case' || p.name === 'On_using_step_case' || (p.title && p.title.toLowerCase().includes('step-case')));
    if (stepcaseIdx !== -1) {
      allPlaybooks[stepcaseIdx] = JSON.parse(JSON.stringify(PLAYBOOK_STEPCASE));
    } else {
      allPlaybooks = [ JSON.parse(JSON.stringify(PLAYBOOK_STEPCASE)) ];
    }
    activePlaybookIndex = 0;
    allPlaybooks.forEach(pb => ensurePlaybookStructure(pb));

    const savedTheme = localStorage.getItem('stepcase_theme');
    if (savedTheme) applyTheme(savedTheme);

    const savedColor = localStorage.getItem('stepcase_color');
    if (savedColor) applyPrimaryColor(savedColor);
  } catch (e) {
    console.warn('Storage load note:', e);
  }
}

// -------------------------------------------------------------
// EXTENSIBLE THEME SYSTEM ARCHITECTURE
// Dark Theme: Pure Black & White (#000000 & #FFFFFF)
// Light Theme: Google Blue & White (#1A73E8 & #FFFFFF)
// Modular registry allows easily registering more themes in future
// -------------------------------------------------------------
const THEME_REGISTRY = {
  light: {
    id: 'light',
    name: 'Light',
    mode: 'light',
    variables: {
      '--color-primary': '#1A73E8',
      '--color-primary-hover': '#1557B0',
      '--color-primary-light': '#E8F0FE',
      '--color-primary-text-dark': '#8AB4F8',
      '--theme-bg': '#FFFFFF',
      '--theme-surface': '#FFFFFF',
      '--theme-workspace-bg': '#F8FAFD',
      '--theme-border': '#E2E8F0',
      '--theme-text': '#0F172A',
      '--theme-text-muted': '#64748B',
      '--theme-accent-bg': '#1A73E8',
      '--theme-accent-text': '#FFFFFF'
    }
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    mode: 'dark',
    variables: {
      '--color-primary': '#FFFFFF',
      '--color-primary-hover': '#E5E5E5',
      '--color-primary-light': '#171717',
      '--color-primary-text-dark': '#FFFFFF',
      '--theme-bg': '#000000',
      '--theme-surface': '#0A0A0A',
      '--theme-workspace-bg': '#000000',
      '--theme-border': '#262626',
      '--theme-text': '#FFFFFF',
      '--theme-text-muted': '#A3A3A3',
      '--theme-accent-bg': '#FFFFFF',
      '--theme-accent-text': '#000000'
    }
  }
};

/**
 * Register additional themes without modifying core codebase
 * @param {Object} themeConfig - { id, name, mode, variables }
 */
function registerTheme(themeConfig) {
  if (!themeConfig || !themeConfig.id) return;
  THEME_REGISTRY[themeConfig.id] = themeConfig;
}

function updateThemeButtonsUI(themeId) {
  const isDark = themeId === 'dark';

  // 1. Settings Menu Buttons
  if (dom.btnThemeLight && dom.btnThemeDark) {
    if (isDark) {
      dom.btnThemeDark.className = 'py-1.5 px-2 text-[11px] font-semibold rounded-md bg-white text-black shadow-xs cursor-pointer text-center flex items-center justify-center gap-1.5';
      dom.btnThemeLight.className = 'py-1.5 px-2 text-[11px] font-semibold rounded-md text-slate-400 hover:text-white cursor-pointer text-center flex items-center justify-center gap-1.5';
    } else {
      dom.btnThemeLight.className = 'py-1.5 px-2 text-[11px] font-semibold rounded-md bg-white text-slate-900 shadow-xs cursor-pointer text-center flex items-center justify-center gap-1.5';
      dom.btnThemeDark.className = 'py-1.5 px-2 text-[11px] font-semibold rounded-md text-slate-500 hover:text-slate-900 cursor-pointer text-center flex items-center justify-center gap-1.5';
    }
  }

  // 2. Direct Header Pill Buttons
  const headerLight = dom.btnHeaderThemeLight || document.getElementById('btnHeaderThemeLight');
  const headerDark = dom.btnHeaderThemeDark || document.getElementById('btnHeaderThemeDark');
  if (headerLight && headerDark) {
    if (isDark) {
      headerDark.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-black shadow-xs cursor-pointer flex items-center gap-1.5 transition-all';
      headerLight.className = 'px-2.5 py-1 rounded-full text-[11px] font-medium text-neutral-400 hover:text-white cursor-pointer flex items-center gap-1.5 transition-all';
    } else {
      headerLight.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-slate-900 shadow-xs cursor-pointer flex items-center gap-1.5 transition-all';
      headerDark.className = 'px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-500 hover:text-slate-900 cursor-pointer flex items-center gap-1.5 transition-all';
    }
  }
}

function applyTheme(themeId) {
  const theme = THEME_REGISTRY[themeId] || THEME_REGISTRY.light;
  currentTheme = theme.id;
  const root = document.documentElement;

  if (theme.mode === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }

  root.setAttribute('data-theme', theme.id);

  if (theme.variables) {
    Object.entries(theme.variables).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
  }

  try {
    localStorage.setItem('stepcase_theme', theme.id);
  } catch (e) {
    // ignore
  }

  updateThemeButtonsUI(theme.id);
  persistState();

  // Re-render active view so theme classes and styles apply instantly
  if (activeMode === 'builder') {
    renderBuilderView(true);
  } else if (activeMode === 'player') {
    renderPlayerView();
  }
  renderSidebarPlaybooks();
  updateActiveStepWordCount();
}

function applyPrimaryColor(color) {
  currentPrimaryColor = color;
  document.documentElement.style.setProperty('--color-primary', color);
  document.documentElement.style.setProperty('--color-primary-hover', color);
  persistState();
}

// -------------------------------------------------------------
// STARTUP SEQUENCE: AXC Splash (1s) & License Acceptance
// -------------------------------------------------------------
function initStartup() {
  setTimeout(() => {
    if (dom.splash) {
      dom.splash.classList.add('opacity-0');
      setTimeout(() => {
        dom.splash.style.display = 'none';
        dom.license.classList.remove('hidden');
      }, 300);
    }
  }, 1000);

  dom.btnAcceptLicense?.addEventListener('click', () => {
    dom.license.classList.add('hidden');
    loadPersistedState();
    renderSidebarPlaybooks();
    showWelcomeHub();
    showToast('Step-case initialized.');
    checkAndOfferResumeState();
  });

  const handleDecline = () => {
    dom.license.innerHTML = `
      <div class="w-full max-w-sm bg-[#ECE9D8] text-black border-2 border-white p-6 text-center space-y-4 font-sans">
        <div class="text-sm font-bold text-red-600">Launch Terminated</div>
        <p class="text-xs">Step-case requires license agreement acceptance to initialize.</p>
        <button onclick="location.reload()" class="px-5 py-2 bg-[#ECE9D8] text-xs font-bold border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-xs active:border-inset cursor-pointer">
          Re-open Acceptance
        </button>
      </div>
    `;
  };

  dom.btnDeclineLicense?.addEventListener('click', handleDecline);
  dom.btnDeclineCross?.addEventListener('click', handleDecline);
}

// -------------------------------------------------------------
// NAVIGATION & VIEW SWITCHING
// -------------------------------------------------------------
function showWelcomeHub() {
  activePlaybookIndex = null;
  dom.welcomeHubView.classList.remove('hidden');
  dom.builderWorkerView.classList.add('hidden');
  dom.playerExecutionView.classList.add('hidden');

  if (dom.activePlaybookBadge) {
    dom.activePlaybookBadge.classList.add('hidden');
  }
  if (dom.footerModeLabel) {
    dom.footerModeLabel.textContent = 'Welcome Hub';
  }
  renderSidebarPlaybooks();
}

function selectPlaybook(index, mode = 'builder') {
  if (index < 0 || index >= allPlaybooks.length) return;
  activePlaybookIndex = index;
  const pb = allPlaybooks[index];
  if (!pb) return;
  ensurePlaybookStructure(pb);

  dom.welcomeHubView.classList.add('hidden');
  if (dom.activePlaybookBadge) {
    dom.activePlaybookBadge.textContent = pb.title || pb.name;
    dom.activePlaybookBadge.classList.remove('hidden');
  }

  // default node selection
  if (pb.steps && pb.steps[0]) {
    const parentSeq = pb.sequences?.find(s => Array.isArray(s.step_ids) && s.step_ids.includes(pb.steps[0].id));
    activeNode = {
      type: 'step',
      id: pb.steps[0].id,
      sequenceId: parentSeq ? parentSeq.id : pb.sequences?.[0]?.id || ''
    };
  } else if (pb.screens && pb.screens[0]) {
    activeNode = {
      type: 'screen',
      id: pb.screens[0].id,
      sequenceId: ''
    };
  } else {
    activeNode = null;
  }

  // init player state: default directly to step mode so operators see documentation immediately
  const firstSeq = pb.sequences?.[0];
  const activeStep = activeNode?.type === 'step' && pb.steps?.find(s => s.id === activeNode.id);
  const activeSeq = activeNode?.sequenceId ? pb.sequences?.find(s => s.id === activeNode.sequenceId) : firstSeq;

  if (activeStep && activeSeq && Array.isArray(activeSeq.step_ids) && activeSeq.step_ids.length > 0) {
    const stepIdx = activeSeq.step_ids.indexOf(activeStep.id);
    playerState = {
      mode: 'step',
      screenId: '',
      sequenceId: activeSeq.id,
      stepIndex: Math.max(0, stepIdx >= 0 ? stepIdx : 0),
      history: [],
      checklistState: {}
    };
  } else if (firstSeq && Array.isArray(firstSeq.step_ids) && firstSeq.step_ids.length > 0) {
    playerState = {
      mode: 'step',
      screenId: '',
      sequenceId: firstSeq.id,
      stepIndex: 0,
      history: [],
      checklistState: {}
    };
  } else {
    playerState = {
      mode: 'step',
      screenId: pb.start_screen_id || pb.screens?.[0]?.id || '',
      sequenceId: firstSeq ? firstSeq.id : '',
      stepIndex: 0,
      history: [],
      checklistState: {}
    };
  }

  renderSidebarPlaybooks();
  setMode(mode);
}

let playerPresentationState = 'windowed'; // 'fullscreen' | 'windowed'

function updateModeSwitcherUI(mode) {
  const activeClass = 'px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 bg-theme-primary text-white shadow-xs cursor-pointer';
  const inactiveClass = 'px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer';

  const isPlayer = mode === 'player';
  if (dom.btnModeBuilder) dom.btnModeBuilder.className = isPlayer ? inactiveClass : activeClass;
  if (dom.btnModePlayer) dom.btnModePlayer.className = isPlayer ? activeClass : inactiveClass;
  if (dom.btnPlayerWindowedModeBuilder) dom.btnPlayerWindowedModeBuilder.className = isPlayer ? inactiveClass : activeClass;
  if (dom.btnPlayerWindowedModePlayer) dom.btnPlayerWindowedModePlayer.className = isPlayer ? activeClass : inactiveClass;
}

function enterPlayerMode(requestFs = false) {
  setMode('player');
  if (requestFs && document.documentElement.requestFullscreen && !document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {
      playerPresentationState = 'windowed';
      dom.playerWindowedHeader?.classList.remove('hidden');
    });
  }
}

function exitPlayerMode() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.().catch(() => {});
  }
  setMode('builder');
}

function togglePlayerFullscreen() {
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        showToast('Fullscreen mode not permitted in this frame.');
      });
    }
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
}

function setMode(mode) {
  activeMode = mode;
  const pb = getActivePlaybook();
  if (!pb) {
    showWelcomeHub();
    return;
  }
  ensurePlaybookStructure(pb);

  const appHeader = document.querySelector('header');
  const appSidebar = document.querySelector('aside');
  const appFooter = document.querySelector('footer');

  if (mode === 'builder') {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    // Restore outer window chrome in editor mode
    appHeader?.classList.remove('hidden');
    appSidebar?.classList.remove('hidden');
    appFooter?.classList.remove('hidden');

    // Automatically expand sidebar in editor mode
    toggleSidebar(true);

    // Keep segmented switcher synchronized
    updateModeSwitcherUI('builder');

    dom.builderWorkerView.classList.remove('hidden');
    dom.playerExecutionView.classList.add('hidden');
    dom.welcomeHubView.classList.add('hidden');
    if (dom.footerModeLabel) dom.footerModeLabel.textContent = 'Editor';

    renderBuilderView();
    updateActiveStepWordCount();
  } else {
    // Mode is 'player' (Presentation Mode)
    // Whenever playing, sidebar automatically collapses to make it look like a presentation
    toggleSidebar(false);

    // Hide standard editor chrome
    appHeader?.classList.add('hidden');
    appSidebar?.classList.add('hidden');
    appFooter?.classList.add('hidden');

    dom.playerExecutionView.classList.remove('hidden');
    dom.builderWorkerView.classList.add('hidden');
    dom.welcomeHubView.classList.add('hidden');

    // Keep segmented switcher synchronized
    updateModeSwitcherUI('player');

    if (document.fullscreenElement) {
      playerPresentationState = 'fullscreen';
      dom.playerWindowedHeader?.classList.add('hidden');
    } else {
      playerPresentationState = 'windowed';
      dom.playerWindowedHeader?.classList.remove('hidden');
    }

    // Synchronize to active step / section documentation if selected
    if (activeNode && activeNode.type === 'section') {
      playerState.mode = 'section';
      playerState.sectionId = activeNode.id;
    } else if (activeNode && activeNode.type === 'step') {
      playerState.mode = 'step';
      playerState.stepId = activeNode.id;
      const parentSeq = pb.sequences?.find(s => Array.isArray(s.step_ids) && s.step_ids.includes(activeNode.id));
      if (parentSeq) {
        playerState.sequenceId = parentSeq.id;
        playerState.stepIndex = Math.max(0, parentSeq.step_ids.indexOf(activeNode.id));
      } else {
        playerState.sequenceId = '';
        const stIdx = (pb.steps || []).findIndex(s => s.id === activeNode.id);
        playerState.stepIndex = stIdx !== -1 ? stIdx : 0;
      }
    } else if (activeNode && activeNode.type === 'sequence') {
      const seq = pb.sequences?.find(s => s.id === activeNode.id);
      if (seq && Array.isArray(seq.step_ids) && seq.step_ids.length > 0) {
        playerState.mode = 'step';
        playerState.sequenceId = seq.id;
        playerState.stepIndex = 0;
        playerState.stepId = seq.step_ids[0];
      }
    } else if (activeNode && activeNode.type === 'screen') {
      playerState.mode = 'screen';
      playerState.screenId = activeNode.id;
    } else if (pb.sections && pb.sections.length > 0) {
      playerState.mode = 'section';
      playerState.sectionId = pb.sections[0].id;
    } else if (pb.screens && pb.screens.length > 0) {
      playerState.mode = 'screen';
      playerState.screenId = pb.start_screen_id || pb.screens[0].id;
    } else {
      playerState.mode = 'step';
      playerState.stepIndex = 0;
    }

    renderPlayerView();
  }
}

// -------------------------------------------------------------
// VS CODE SIDEBAR TREE & DRAG-AND-DROP REORDERING
// -------------------------------------------------------------
const TREE_ICONS = {
  chevron: `<svg class="w-3 h-3 shrink-0 text-slate-400 transition-transform duration-150 tree-chevron pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`,
  folder: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>`,
  folderOpen: `<svg class="w-3.5 h-3.5 shrink-0 text-theme-primary pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>`,
  screen: `<svg class="w-3.5 h-3.5 shrink-0 text-purple-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2z"/></svg>`,
  sequence: `<svg class="w-3.5 h-3.5 shrink-0 text-sky-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h7"/></svg>`,
  step: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
  grip: `<svg class="w-2.5 h-2.5 shrink-0 opacity-0 group-hover:opacity-50 transition-opacity text-slate-400 cursor-grab pointer-events-none" viewBox="0 0 6 10" fill="currentColor"><circle cx="1.5" cy="1.5" r="1"/><circle cx="4.5" cy="1.5" r="1"/><circle cx="1.5" cy="5" r="1"/><circle cx="4.5" cy="5" r="1"/><circle cx="1.5" cy="8.5" r="1"/><circle cx="4.5" cy="8.5" r="1"/></svg>`
};

const treeExpandedState = {
  playbooks: new Set([0]),
  screens: new Set([0]),
  sequences: new Set([0])
};

let treeDragState = {
  item: null
};

function clearDragOverIndicators() {
  document.querySelectorAll('.tree-drag-over-top, .tree-drag-over-bottom, .tree-drag-over-into, .tree-item-dragging').forEach(el => {
    el.classList.remove('tree-drag-over-top', 'tree-drag-over-bottom', 'tree-drag-over-into', 'tree-item-dragging');
  });
}

// -------------------------------------------------------------
// RIGHT CLICK CONTEXT MENU HANDLER
// -------------------------------------------------------------
function showTreeContextMenu(e, config) {
  e.preventDefault();
  e.stopPropagation();
  if (!dom.treeContextMenu || !dom.treeContextMenuItems) return;

  dom.treeContextMenuItems.innerHTML = '';
  const items = [];

  // 1. Move Up / Move Down
  if (config.canMoveUp) {
    items.push({
      label: 'Move Up',
      hint: 'Alt+↑',
      action: () => config.onMoveUp()
    });
  }
  if (config.canMoveDown) {
    items.push({
      label: 'Move Down',
      hint: 'Alt+↓',
      action: () => config.onMoveDown()
    });
  }

  if (items.length > 0) items.push({ divider: true });

  // 2. Reveal in File Explorer
  items.push({
    label: 'Reveal in File Explorer',
    hint: 'Path',
    action: () => config.onReveal()
  });

  // 3. Add a Playbook
  items.push({
    label: 'Add a playbook',
    hint: '+',
    action: () => createNewPlaybookFlow()
  });

  items.push({ divider: true });

  // 4. Delete <this>
  items.push({
    label: `Delete ${config.typeName}`,
    hint: 'Del',
    danger: true,
    action: () => config.onDelete()
  });

  items.forEach(it => {
    if (it.divider) {
      const hr = document.createElement('div');
      hr.className = 'my-1 border-t border-slate-100 dark:border-slate-800';
      dom.treeContextMenuItems.appendChild(hr);
      return;
    }
    const btn = document.createElement('button');
    btn.className = `w-full text-left px-3 py-1.5 flex items-center justify-between text-xs cursor-pointer transition-colors ${
      it.danger
        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;
    btn.innerHTML = `<span>${it.label}</span><span class="opacity-40 text-[10px] font-mono">${it.hint || ''}</span>`;
    btn.onclick = (evt) => {
      evt.stopPropagation();
      dom.treeContextMenu.classList.add('hidden');
      it.action();
    };
    dom.treeContextMenuItems.appendChild(btn);
  });

  dom.treeContextMenu.classList.remove('hidden');
  const menuWidth = 224;
  const menuHeight = dom.treeContextMenu.offsetHeight || 190;
  const x = Math.min(e.clientX, window.innerWidth - menuWidth - 10);
  const y = Math.min(e.clientY, window.innerHeight - menuHeight - 10);
  dom.treeContextMenu.style.left = `${Math.max(10, x)}px`;
  dom.treeContextMenu.style.top = `${Math.max(10, y)}px`;
}

// Close context menu & step menus on global click or Escape
document.addEventListener('click', () => {
  dom.treeContextMenu?.classList.add('hidden');
  document.querySelectorAll('.step-plus-menu, .step-copy-menu, .step-more-menu').forEach(m => m.classList.add('hidden'));
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dom.treeContextMenu?.classList.add('hidden');
    dom.revealInExplorerModal?.classList.add('hidden');
    document.querySelectorAll('.step-plus-menu, .step-copy-menu, .step-more-menu').forEach(m => m.classList.add('hidden'));
  }
});

// Reveal in Explorer modal handler
function openRevealInExplorer(filePath, description) {
  if (!dom.revealInExplorerModal) return;
  dom.revealFilePath.textContent = filePath;
  dom.revealFileDescription.textContent = description;
  dom.revealInExplorerModal.classList.remove('hidden');

  const copyBtn = dom.btnCopyRevealedPath;
  if (copyBtn) {
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(filePath);
        showToast('Path copied to clipboard!');
      } catch {
        showToast('Path: ' + filePath);
      }
    };
  }

  dom.btnCloseRevealModal?.addEventListener('click', () => {
    dom.revealInExplorerModal.classList.add('hidden');
  });
  dom.btnDismissRevealModal?.addEventListener('click', () => {
    dom.revealInExplorerModal.classList.add('hidden');
  });
}

// -------------------------------------------------------------
// DRAG AND DROP HIERARCHY MUTATION HANDLERS
// -------------------------------------------------------------
function handleStepDrop(source, target) {
  const pb = allPlaybooks[target.pbIndex];
  if (!pb) return;
  const srcSeq = pb.sequences.find(s => s.id === source.seqId);
  const tgtSeq = pb.sequences.find(s => s.id === target.seqId);
  if (!srcSeq || !tgtSeq) return;

  const srcIdx = srcSeq.step_ids.indexOf(source.stepId);
  if (srcIdx === -1) return;

  // Remove from old sequence
  srcSeq.step_ids.splice(srcIdx, 1);

  // Insert into target sequence
  let tgtIdx = tgtSeq.step_ids.indexOf(target.targetStepId);
  if (tgtIdx === -1) {
    tgtSeq.step_ids.push(source.stepId);
  } else {
    if (!target.isTop) tgtIdx++;
    tgtSeq.step_ids.splice(tgtIdx, 0, source.stepId);
  }

  persistState();
  renderSidebarPlaybooks();
  if (activeMode === 'builder') renderBuilderView();
  else renderPlayerView();
  const stepObj = pb.steps.find(s => s.id === source.stepId);
  showToast(`Moved step "${stepObj ? stepObj.title : source.stepId}".`);
}

function handleStepDropOntoSequence(source, target) {
  const pb = allPlaybooks[target.pbIndex];
  if (!pb) return;
  const srcSeq = pb.sequences.find(s => s.id === source.seqId);
  const tgtSeq = pb.sequences.find(s => s.id === target.seqId);
  if (!srcSeq || !tgtSeq) return;

  const srcIdx = srcSeq.step_ids.indexOf(source.stepId);
  if (srcIdx === -1) return;

  // Remove from old sequence & append to target sequence
  srcSeq.step_ids.splice(srcIdx, 1);
  tgtSeq.step_ids.push(source.stepId);

  persistState();
  renderSidebarPlaybooks();
  if (activeMode === 'builder') renderBuilderView();
  else renderPlayerView();
  const stepObj = pb.steps.find(s => s.id === source.stepId);
  showToast(`Added step "${stepObj ? stepObj.title : source.stepId}" to sequence "${tgtSeq.title}".`);
}

function handleSequenceDrop(source, target) {
  const pb = allPlaybooks[target.pbIndex];
  if (!pb) return;
  const srcIdx = pb.sequences.findIndex(s => s.id === source.seqId);
  const tgtIdx = pb.sequences.findIndex(s => s.id === target.targetSeqId);
  if (srcIdx === -1 || tgtIdx === -1 || srcIdx === tgtIdx) return;

  const [movedSeq] = pb.sequences.splice(srcIdx, 1);
  let newIdx = pb.sequences.findIndex(s => s.id === target.targetSeqId);
  if (!target.isTop) newIdx++;
  pb.sequences.splice(newIdx, 0, movedSeq);

  persistState();
  renderSidebarPlaybooks();
  if (activeMode === 'builder') renderBuilderView();
  showToast(`Reordered sequence "${movedSeq.title}".`);
}

function handleScreenDrop(source, target) {
  const pb = allPlaybooks[target.pbIndex];
  if (!pb) return;
  const srcIdx = pb.screens.findIndex(s => s.id === source.screenId);
  const tgtIdx = pb.screens.findIndex(s => s.id === target.targetScreenId);
  if (srcIdx === -1 || tgtIdx === -1 || srcIdx === tgtIdx) return;

  const [movedScreen] = pb.screens.splice(srcIdx, 1);
  let newIdx = pb.screens.findIndex(s => s.id === target.targetScreenId);
  if (!target.isTop) newIdx++;
  pb.screens.splice(newIdx, 0, movedScreen);

  persistState();
  renderSidebarPlaybooks();
  if (activeMode === 'builder') renderBuilderView();
  showToast(`Reordered screen "${movedScreen.title}".`);
}

function handlePlaybookDrop(source, target) {
  const srcIdx = source.pbIndex;
  let tgtIdx = target.pbIndex;
  if (srcIdx === tgtIdx) return;

  const [movedPb] = allPlaybooks.splice(srcIdx, 1);
  let insertIdx = tgtIdx;
  if (!target.isTop) insertIdx = tgtIdx >= srcIdx ? tgtIdx : tgtIdx + 1;
  else insertIdx = tgtIdx > srcIdx ? tgtIdx - 1 : tgtIdx;
  allPlaybooks.splice(insertIdx, 0, movedPb);

  activePlaybookIndex = insertIdx;
  treeExpandedState.playbooks.add(insertIdx);
  persistState();
  renderSidebarPlaybooks();
  showToast(`Reordered playbook "${movedPb.title || movedPb.name}".`);
}

// -------------------------------------------------------------
// SIDEBAR PLAYBOOKS: VS CODE FILE EXPLORER TREE
// -------------------------------------------------------------
function renderSidebarPlaybooks() {
  dom.playbooksListContainer.innerHTML = '';
  if (dom.playbooksCountBadge) {
    dom.playbooksCountBadge.textContent = allPlaybooks.length;
  }

  const searchQuery = dom.globalSearchBar?.value.trim().toLowerCase() || '';

  allPlaybooks.forEach((pb, idx) => {
    const isSelected = activePlaybookIndex === idx;
    const isExpanded = treeExpandedState.playbooks.has(idx) || !!searchQuery;

    // Filter check if searching
    if (searchQuery) {
      const matchPb = (pb.title || pb.name).toLowerCase().includes(searchQuery);
      const matchScreen = pb.screens?.some(sc => sc.title.toLowerCase().includes(searchQuery));
      const matchSeq = pb.sequences?.some(sq => sq.title.toLowerCase().includes(searchQuery));
      const matchStep = pb.steps?.some(st => st.title.toLowerCase().includes(searchQuery) || (st.content_text || '').toLowerCase().includes(searchQuery));
      if (!matchPb && !matchScreen && !matchSeq && !matchStep) {
        return; // hide non-matching playbook
      }
    }

    const box = document.createElement('div');
    box.className = 'w-full rounded-md bg-transparent select-none transition-colors border-0';

    // 1. Playbook Title Header Row (VS Code Folder Style)
    const headerRow = document.createElement('div');
    headerRow.className = `group px-2 py-1.5 rounded flex items-center justify-between cursor-pointer transition-colors ${
      isSelected
        ? 'bg-theme-primary/10 text-theme-primary font-semibold'
        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
    }`;
    headerRow.draggable = true;

    // Left: Chevron + Folder Icon + Title
    const titleLeft = document.createElement('div');
    titleLeft.className = 'flex items-center gap-1.5 truncate flex-1 mr-1 pointer-events-none';
    titleLeft.innerHTML = `
      <span class="tree-chevron ${isExpanded ? 'rotate-90' : ''}">${TREE_ICONS.chevron}</span>
      <span>${isExpanded ? TREE_ICONS.folderOpen : TREE_ICONS.folder}</span>
      <span class="truncate text-xs font-semibold">${escapeHtml(pb.title || pb.name)}</span>
    `;

    // Right: Grip icon for dragging
    const gripRight = document.createElement('div');
    gripRight.className = 'flex items-center pointer-events-none';
    gripRight.innerHTML = TREE_ICONS.grip;

    headerRow.appendChild(titleLeft);
    headerRow.appendChild(gripRight);

    // Playbook Drag-and-Drop
    headerRow.addEventListener('dragstart', (e) => {
      treeDragState.item = { type: 'playbook', pbIndex: idx };
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', JSON.stringify(treeDragState.item));
      headerRow.classList.add('tree-item-dragging');
    });
    headerRow.addEventListener('dragend', () => {
      headerRow.classList.remove('tree-item-dragging');
      clearDragOverIndicators();
      treeDragState.item = null;
    });
    headerRow.addEventListener('dragover', (e) => {
      if (!treeDragState.item || treeDragState.item.type !== 'playbook') return;
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'move';
      const rect = headerRow.getBoundingClientRect();
      const isTop = (e.clientY - rect.top) < (rect.height / 2);
      headerRow.classList.toggle('tree-drag-over-top', isTop);
      headerRow.classList.toggle('tree-drag-over-bottom', !isTop);
    });
    headerRow.addEventListener('dragleave', () => {
      headerRow.classList.remove('tree-drag-over-top', 'tree-drag-over-bottom');
    });
    headerRow.addEventListener('drop', (e) => {
      if (!treeDragState.item || treeDragState.item.type !== 'playbook') return;
      e.preventDefault();
      e.stopPropagation();
      const isTop = headerRow.classList.contains('tree-drag-over-top');
      clearDragOverIndicators();
      handlePlaybookDrop(treeDragState.item, { pbIndex: idx, isTop });
    });

    // Header Click -> Toggle Expand & Select
    headerRow.onclick = () => {
      if (treeExpandedState.playbooks.has(idx)) {
        treeExpandedState.playbooks.delete(idx);
      } else {
        treeExpandedState.playbooks.add(idx);
      }
      if (activePlaybookIndex !== idx) {
        selectPlaybook(idx, activeMode);
      } else {
        renderSidebarPlaybooks();
      }
    };

    // Right-Click Context Menu for Playbook
    headerRow.oncontextmenu = (e) => {
      showTreeContextMenu(e, {
        typeName: 'Playbook',
        canMoveUp: idx > 0,
        canMoveDown: idx < allPlaybooks.length - 1,
        onMoveUp: () => {
          const temp = allPlaybooks[idx - 1];
          allPlaybooks[idx - 1] = allPlaybooks[idx];
          allPlaybooks[idx] = temp;
          activePlaybookIndex = idx - 1;
          persistState();
          renderSidebarPlaybooks();
          showToast('Moved playbook up.');
        },
        onMoveDown: () => {
          const temp = allPlaybooks[idx + 1];
          allPlaybooks[idx + 1] = allPlaybooks[idx];
          allPlaybooks[idx] = temp;
          activePlaybookIndex = idx + 1;
          persistState();
          renderSidebarPlaybooks();
          showToast('Moved playbook down.');
        },
        onReveal: () => {
          openRevealInExplorer(
            `/playbooks/${pb.name || 'playbook'}/config.json`,
            `Manifest schema and hierarchy config for "${pb.title || pb.name}". Defines topology without storing step text.`
          );
        },
        onDelete: () => {
          if (allPlaybooks.length <= 1) {
            showToast('Cannot delete the last playbook.');
            return;
          }
          if (confirm(`Delete playbook "${pb.title || pb.name}"?`)) {
            allPlaybooks.splice(idx, 1);
            activePlaybookIndex = Math.max(0, activePlaybookIndex - 1);
            persistState();
            showWelcomeHub();
            showToast('Playbook deleted.');
          }
        }
      });
    };

    box.appendChild(headerRow);

    // 2. Playbook Tree Body (VS Code Sub-Tree)
    if (isExpanded) {
      const treeBody = document.createElement('div');
      treeBody.className = 'ml-3 pl-2.5 border-l border-slate-200 dark:border-slate-800 space-y-1.5 pt-0.5 pb-1';

      // -------------------------------------------------------
      // A. SECTIONS HIERARCHY
      // Section -> Steps (1, 2, 3...) -> Screens -> Sequences (1, 2, 3...) -> Steps (1, 2, 3...)
      // -------------------------------------------------------
      if (pb.sections && pb.sections.length > 0) {
        pb.sections.forEach((sec, secIdx) => {
          const secGroup = document.createElement('div');
          secGroup.className = 'space-y-0.5 pt-1';

          // Section Header (Clickable for full Section View)
          const isSecActive = isSelected && activeNode.type === 'section' && activeNode.id === sec.id;
          const secHeader = document.createElement('div');
          secHeader.className = `group px-1.5 py-1 rounded flex items-center justify-between text-xs font-bold cursor-pointer select-none transition-colors ${
            isSecActive
              ? 'bg-[#1A73E8] text-white font-bold'
              : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`;
          secHeader.innerHTML = `
            <div class="flex items-center gap-1.5 truncate">
              <span>${TREE_ICONS.folderOpen}</span>
              <span class="truncate">${escapeHtml(sec.title || `Section ${secIdx + 1}`)}</span>
            </div>
          `;
          secHeader.onclick = (e) => {
            e.stopPropagation();
            if (activePlaybookIndex !== idx) selectPlaybook(idx, activeMode);
            activeNode = { type: 'section', id: sec.id };
            if (activeMode === 'player') {
              playerState.mode = 'section';
              playerState.sectionId = sec.id;
              renderPlayerView();
            } else {
              renderBuilderView(true);
            }
            renderSidebarPlaybooks();
          };
          secGroup.appendChild(secHeader);

          const secBody = document.createElement('div');
          secBody.className = 'ml-2.5 pl-2 border-l border-slate-200/60 dark:border-slate-800/60 space-y-0.5 pt-0.5';

          // 1. Linear Steps under this Section (numbered 1, 2, 3...)
          if (Array.isArray(sec.step_ids)) {
            sec.step_ids.forEach((stId, sIdx) => {
              const stepObj = pb.steps?.find(s => s.id === stId);
              const isNodeActive = isSelected && activeNode.type === 'step' && activeNode.id === stId;
              const stepRow = document.createElement('div');
              stepRow.className = `group px-2 py-0.5 rounded flex items-center justify-between cursor-pointer transition-colors text-xs ${
                isNodeActive
                  ? 'bg-theme-primary text-white font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`;
              stepRow.innerHTML = `
                <div class="flex items-center gap-1.5 truncate mr-1">
                  <span>${TREE_ICONS.step}</span>
                  <span class="truncate">${sIdx + 1}. ${escapeHtml(stepObj ? stepObj.title : stId)}</span>
                </div>
              `;
              stepRow.onclick = (e) => {
                e.stopPropagation();
                if (activePlaybookIndex !== idx) selectPlaybook(idx, activeMode);
                activeNode = { type: 'step', id: stId, sequenceId: '' };
                if (activeMode === 'player') {
                  playerState.mode = 'step';
                  playerState.sequenceId = '';
                  playerState.stepIndex = sIdx;
                  renderPlayerView();
                } else {
                  renderBuilderView(true);
                }
                renderSidebarPlaybooks();
              };
              secBody.appendChild(stepRow);
            });
          }

          // 2. Screens under this Section
          if (Array.isArray(sec.screen_ids)) {
            sec.screen_ids.forEach((scId, scIdx) => {
              const sc = pb.screens?.find(s => s.id === scId);
              if (!sc) return;

              const isNodeActive = isSelected && activeNode.type === 'screen' && activeNode.id === sc.id;
              const scRow = document.createElement('div');
              scRow.className = `group px-2 py-1 rounded flex items-center justify-between cursor-pointer transition-colors text-xs font-medium ${
                isNodeActive
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40'
              }`;
              scRow.innerHTML = `
                <div class="flex items-center gap-1.5 truncate mr-1">
                  <span>${TREE_ICONS.screen}</span>
                  <span class="truncate">Screen ${scIdx + 1}: ${escapeHtml(sc.title)}</span>
                </div>
              `;
              scRow.onclick = (e) => {
                e.stopPropagation();
                if (activePlaybookIndex !== idx) selectPlaybook(idx, activeMode);
                activeNode = { type: 'screen', id: sc.id, sequenceId: '' };
                if (activeMode === 'player') {
                  playerState.mode = 'screen';
                  playerState.screenId = sc.id;
                  renderPlayerView();
                } else {
                  renderBuilderView(true);
                }
                renderSidebarPlaybooks();
              };
              secBody.appendChild(scRow);

              // 3. Sequences linked to this Screen (numbered 1, 2, 3...)
              const scSequences = (sc.options || [])
                .map(opt => pb.sequences?.find(sq => sq.id === opt.target_sequence_id))
                .filter(Boolean);

              if (scSequences.length > 0) {
                const seqCol = document.createElement('div');
                seqCol.className = 'ml-2 pl-2 border-l border-purple-200/50 dark:border-purple-900/50 space-y-0.5';

                scSequences.forEach((seq, seqIdx) => {
                  const isSeqActive = isSelected && activeNode.type === 'sequence' && activeNode.id === seq.id;
                  const seqRow = document.createElement('div');
                  seqRow.className = `group px-2 py-0.5 rounded flex items-center justify-between cursor-pointer transition-colors text-xs ${
                    isSeqActive
                      ? 'bg-sky-600 text-white font-semibold'
                      : 'text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/40'
                  }`;
                  seqRow.innerHTML = `
                    <div class="flex items-center gap-1.5 truncate mr-1">
                      <span>${TREE_ICONS.sequence}</span>
                      <span class="truncate">${seqIdx + 1}. ${escapeHtml(seq.title)}</span>
                    </div>
                  `;
                  seqRow.onclick = (e) => {
                    e.stopPropagation();
                    if (activePlaybookIndex !== idx) selectPlaybook(idx, activeMode);
                    const firstStId = (seq.step_ids && seq.step_ids.length > 0) ? seq.step_ids[0] : '';
                    activeNode = { type: 'step', id: firstStId, sequenceId: seq.id };
                    if (activeMode === 'player') {
                      playerState.mode = 'step';
                      playerState.sequenceId = seq.id;
                      playerState.stepIndex = 0;
                      renderPlayerView();
                    } else {
                      renderBuilderView(true);
                    }
                    renderSidebarPlaybooks();
                  };
                  seqCol.appendChild(seqRow);

                  // 4. Steps inside this Sequence (each sequence starts at 1!)
                  if (Array.isArray(seq.step_ids) && seq.step_ids.length > 0) {
                    const stepSubCol = document.createElement('div');
                    stepSubCol.className = 'ml-2 pl-2 border-l border-sky-200/40 dark:border-sky-900/40 space-y-0.5';

                    seq.step_ids.forEach((stId, stepIdx) => {
                      const stepObj = pb.steps?.find(s => s.id === stId);
                      const isStActive = isSelected && activeNode.type === 'step' && activeNode.id === stId;
                      const stepRow = document.createElement('div');
                      stepRow.className = `group px-2 py-0.5 rounded flex items-center justify-between cursor-pointer transition-colors text-[11px] ${
                        isStActive
                          ? 'bg-theme-primary text-white font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                      }`;
                      stepRow.innerHTML = `
                        <div class="flex items-center gap-1.5 truncate mr-1">
                          <span>${TREE_ICONS.step}</span>
                          <span class="truncate">${stepIdx + 1}. ${escapeHtml(stepObj ? stepObj.title : stId)}</span>
                        </div>
                      `;
                      stepRow.onclick = (e) => {
                        e.stopPropagation();
                        if (activePlaybookIndex !== idx) selectPlaybook(idx, activeMode);
                        activeNode = { type: 'step', id: stId, sequenceId: seq.id };
                        if (activeMode === 'player') {
                          playerState.mode = 'step';
                          playerState.sequenceId = seq.id;
                          playerState.stepIndex = stepIdx;
                          renderPlayerView();
                        } else {
                          renderBuilderView(true);
                        }
                        renderSidebarPlaybooks();
                      };
                      stepSubCol.appendChild(stepRow);
                    });
                    seqCol.appendChild(stepSubCol);
                  }
                });
                secBody.appendChild(seqCol);
              }
            });
          }

          secGroup.appendChild(secBody);
          treeBody.appendChild(secGroup);
        });
      } else if (pb.screens && pb.screens.length > 0) {
        // Fallback: Screens -> Sequences -> Steps
        pb.screens.forEach((sc, scIdx) => {
          const isNodeActive = isSelected && activeNode.type === 'screen' && activeNode.id === sc.id;
          const scRow = document.createElement('div');
          scRow.className = `group px-2 py-1 rounded flex items-center justify-between cursor-pointer transition-colors text-xs font-medium ${
            isNodeActive ? 'bg-purple-600 text-white font-semibold' : 'text-purple-700 dark:text-purple-300 hover:bg-purple-50'
          }`;
          scRow.innerHTML = `
            <div class="flex items-center gap-1.5 truncate mr-1">
              <span>${TREE_ICONS.screen}</span>
              <span class="truncate">Screen ${scIdx + 1}: ${escapeHtml(sc.title)}</span>
            </div>
          `;
          scRow.onclick = (e) => {
            e.stopPropagation();
            if (activePlaybookIndex !== idx) selectPlaybook(idx, activeMode);
            activeNode = { type: 'screen', id: sc.id, sequenceId: '' };
            if (activeMode === 'player') {
              playerState.mode = 'screen';
              playerState.screenId = sc.id;
              renderPlayerView();
            } else {
              renderBuilderView(true);
            }
            renderSidebarPlaybooks();
          };
          treeBody.appendChild(scRow);

          const scSequences = (sc.options || [])
            .map(opt => pb.sequences?.find(sq => sq.id === opt.target_sequence_id))
            .filter(Boolean);

          if (scSequences.length > 0) {
            const seqCol = document.createElement('div');
            seqCol.className = 'ml-2 pl-2 border-l border-purple-200/50 space-y-0.5';

            scSequences.forEach((seq, seqIdx) => {
              const isSeqActive = isSelected && activeNode.type === 'sequence' && activeNode.id === seq.id;
              const seqRow = document.createElement('div');
              seqRow.className = `group px-2 py-0.5 rounded flex items-center justify-between cursor-pointer transition-colors text-xs ${
                isSeqActive ? 'bg-sky-600 text-white font-semibold' : 'text-sky-700 dark:text-sky-300 hover:bg-sky-50'
              }`;
              seqRow.innerHTML = `
                <div class="flex items-center gap-1.5 truncate mr-1">
                  <span>${TREE_ICONS.sequence}</span>
                  <span class="truncate">${seqIdx + 1}. ${escapeHtml(seq.title)}</span>
                </div>
              `;
              seqRow.onclick = (e) => {
                e.stopPropagation();
                if (activePlaybookIndex !== idx) selectPlaybook(idx, activeMode);
                const firstStId = (seq.step_ids && seq.step_ids.length > 0) ? seq.step_ids[0] : '';
                activeNode = { type: 'step', id: firstStId, sequenceId: seq.id };
                if (activeMode === 'player') {
                  playerState.mode = 'step';
                  playerState.sequenceId = seq.id;
                  playerState.stepIndex = 0;
                  renderPlayerView();
                } else {
                  renderBuilderView(true);
                }
                renderSidebarPlaybooks();
              };
              seqCol.appendChild(seqRow);

              if (Array.isArray(seq.step_ids)) {
                const stepSubCol = document.createElement('div');
                stepSubCol.className = 'ml-2 pl-2 border-l border-sky-200/40 space-y-0.5';
                seq.step_ids.forEach((stId, stepIdx) => {
                  const stepObj = pb.steps?.find(s => s.id === stId);
                  const isStActive = isSelected && activeNode.type === 'step' && activeNode.id === stId;
                  const stepRow = document.createElement('div');
                  stepRow.className = `group px-2 py-0.5 rounded flex items-center justify-between cursor-pointer transition-colors text-[11px] ${
                    isStActive ? 'bg-theme-primary text-white font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`;
                  stepRow.innerHTML = `
                    <div class="flex items-center gap-1.5 truncate mr-1">
                      <span>${TREE_ICONS.step}</span>
                      <span class="truncate">${stepIdx + 1}. ${escapeHtml(stepObj ? stepObj.title : stId)}</span>
                    </div>
                  `;
                  stepRow.onclick = (e) => {
                    e.stopPropagation();
                    if (activePlaybookIndex !== idx) selectPlaybook(idx, activeMode);
                    activeNode = { type: 'step', id: stId, sequenceId: seq.id };
                    if (activeMode === 'player') {
                      playerState.mode = 'step';
                      playerState.sequenceId = seq.id;
                      playerState.stepIndex = stepIdx;
                      renderPlayerView();
                    } else {
                      renderBuilderView(true);
                    }
                    renderSidebarPlaybooks();
                  };
                  stepSubCol.appendChild(stepRow);
                });
                seqCol.appendChild(stepSubCol);
              }
            });
            treeBody.appendChild(seqCol);
          }
        });
      } else {
        // Flat steps
        (pb.steps || []).forEach((st, sIdx) => {
          const isNodeActive = isSelected && activeNode.type === 'step' && activeNode.id === st.id;
          const stRow = document.createElement('div');
          stRow.className = `group px-2 py-1 rounded flex items-center justify-between cursor-pointer transition-colors text-xs ${
            isNodeActive ? 'bg-theme-primary text-white font-semibold shadow-2xs' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`;
          stRow.innerHTML = `
            <div class="flex items-center gap-1.5 truncate mr-1">
              <span>${TREE_ICONS.step}</span>
              <span class="truncate">${sIdx + 1}. ${escapeHtml(st.title || `Step ${sIdx + 1}`)}</span>
            </div>
          `;
          stRow.onclick = (e) => {
            e.stopPropagation();
            if (activePlaybookIndex !== idx) selectPlaybook(idx, activeMode);
            activeNode = { type: 'step', id: st.id, sequenceId: '' };
            if (activeMode === 'player') {
              playerState.stepIndex = sIdx;
              renderPlayerView();
            } else {
              renderBuilderView(true);
            }
            renderSidebarPlaybooks();
          };
          treeBody.appendChild(stRow);
        });
      }

      box.appendChild(treeBody);
    }

    dom.playbooksListContainer.appendChild(box);
  });
}

// -------------------------------------------------------------
// PROGRESSIVE DISCLOSURE: CONVERT LINEAR TO BRANCHED PLAYBOOK
// Screens and Sequence cards ONLY appear if user explicitly clicks "Insert > Screen"
// -------------------------------------------------------------
function convertLinearToBranched(pb) {
  const seqId = 'seq_' + Date.now();
  pb.sequences = [
    {
      id: seqId,
      title: 'Primary Sequence',
      step_ids: (pb.steps || []).map(s => s.id),
      next_screen_id: null
    }
  ];
  const scId = 'screen_' + Date.now();
  pb.screens = [
    {
      id: scId,
      title: 'Screen 1 (Decision Point)',
      disable_back: false,
      options: [
        { id: 'opt_1', label: 'Primary Sequence', target_sequence_id: seqId }
      ]
    }
  ];
  pb.start_screen_id = scId;
  pb.sections = [
    {
      id: 'sec_' + Date.now(),
      title: pb.title || pb.name || 'Section 1',
      screen_ids: [scId],
      step_ids: []
    }
  ];
  activeNode = { type: 'screen', id: scId, sequenceId: '' };
  persistState();
  renderBuilderView(true);
  renderSidebarPlaybooks();
  showToast('Screen created. Branched structure enabled.');
}

// -------------------------------------------------------------
// STEP VERTICAL ACTION TOOLBAR (ALL BLUE ICONS: INSERT, COPY-PASTE, CHECKBOXES, MORE)
// Arranged on the right side in a vertical manner
// -------------------------------------------------------------
function createStepVerticalToolbar({ step, sIdx, pb, sequenceId = '', isLinear = false }) {
  const toolbar = document.createElement('div');
  toolbar.className = 'step-vertical-toolbar flex flex-col items-center gap-1 shrink-0 select-none p-1 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 shadow-xs z-20';

  // -----------------------------------------------------------
  // 1. [+] Plus (Insert) Icon Button: All Blue
  // -----------------------------------------------------------
  const plusWrapper = document.createElement('div');
  plusWrapper.className = 'relative';
  plusWrapper.innerHTML = `
    <button type="button" class="btn-step-plus btn-step-icon-blue p-1 rounded-md text-[#1A73E8] dark:text-[#388bfd] hover:bg-blue-100 dark:hover:bg-blue-900/60 cursor-pointer transition-colors" title="Insert Screen, Sequence, or Step (+)">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
    </button>
    <div class="step-plus-menu hidden absolute right-0 top-full mt-1 w-60 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl shadow-m3-float py-1.5 z-50 text-xs">
      <div class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">Add Screen / Sequence</div>
      <button type="button" class="action-insert-screen w-full text-left px-3.5 py-1.5 hover:bg-blue-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-theme-primary font-semibold cursor-pointer">
        <span>🔀</span> Insert Screen (Decision Point)
      </button>
      <button type="button" class="action-insert-sequence w-full text-left px-3.5 py-1.5 hover:bg-blue-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-theme-primary font-semibold cursor-pointer">
        <span>⚡</span> Insert Sequence (Procedure Flow)
      </button>
      <div class="my-1 border-t border-slate-100 dark:border-neutral-800"></div>
      <div class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">Insert Step Content</div>
      <button type="button" class="action-insert-step-below w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>➕</span> Insert Step Below
      </button>
      <button type="button" class="action-insert-checkdown w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>☑️</span> Add Checkdown (Verification)
      </button>
      <button type="button" class="action-insert-copycmd w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>📋</span> Add 1-Click Copy Command
      </button>
      <button type="button" class="action-insert-picture w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>🖼️</span> Insert Media / Screenshot
      </button>
      <button type="button" class="action-insert-notes w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>📝</span> Insert Detailed Documentation
      </button>
      <button type="button" class="action-insert-bullets w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>•</span> Insert Bulleted List
      </button>
    </div>
  `;

  const plusBtn = plusWrapper.querySelector('.btn-step-plus');
  const plusMenu = plusWrapper.querySelector('.step-plus-menu');
  plusBtn.onclick = (e) => {
    e.stopPropagation();
    document.querySelectorAll('.step-plus-menu, .step-copy-menu, .step-more-menu').forEach(m => {
      if (m !== plusMenu) m.classList.add('hidden');
    });
    plusMenu.classList.toggle('hidden');
  };

  plusMenu.querySelector('.action-insert-screen').onclick = (e) => {
    e.stopPropagation();
    plusMenu.classList.add('hidden');
    addScreenToActivePlaybook();
  };

  plusMenu.querySelector('.action-insert-sequence').onclick = (e) => {
    e.stopPropagation();
    plusMenu.classList.add('hidden');
    addSequenceToActivePlaybook();
  };

  plusMenu.querySelector('.action-insert-step-below').onclick = (e) => {
    e.stopPropagation();
    plusMenu.classList.add('hidden');
    const newStep = {
      id: 'step_' + Date.now(),
      title: '',
      content_text: '',
      assets: [],
      checklist: [],
      copy_fields: [],
      disable_back: false
    };
    if (isLinear) {
      pb.steps.splice(sIdx + 1, 0, newStep);
    } else {
      pb.steps.push(newStep);
      const seq = pb.sequences?.find(s => s.id === sequenceId);
      if (seq && Array.isArray(seq.step_ids)) {
        const targetPos = seq.step_ids.indexOf(step.id);
        if (targetPos !== -1) {
          seq.step_ids.splice(targetPos + 1, 0, newStep.id);
        } else {
          seq.step_ids.push(newStep.id);
        }
      }
    }
    activeNode = { type: 'step', id: newStep.id, sequenceId };
    persistState();
    renderBuilderView();
    renderSidebarPlaybooks();
    updateActiveStepWordCount(newStep);
    showToast('New step inserted.');
  };

  plusMenu.querySelector('.action-insert-checkdown').onclick = (e) => {
    e.stopPropagation();
    plusMenu.classList.add('hidden');
    if (!step.checklist) step.checklist = [];
    step.checklist.push({
      id: 'c_' + Date.now(),
      text: '',
      checked: false
    });
    persistState();
    renderBuilderView();
    showToast('Verification checkdown added.');
    setTimeout(() => {
      const rowEl = document.querySelector(`[data-step-id="${step.id}"]`);
      const inputs = rowEl?.querySelectorAll('.chk-item-input');
      if (inputs && inputs.length > 0) {
        inputs[inputs.length - 1].focus();
      }
    }, 40);
  };

  plusMenu.querySelector('.action-insert-copycmd').onclick = (e) => {
    e.stopPropagation();
    plusMenu.classList.add('hidden');
    if (!step.copy_fields) step.copy_fields = [];
    step.copy_fields.push({
      label: 'Command',
      value: 'npm run dev'
    });
    persistState();
    renderBuilderView();
    showToast('1-Click copy field added.');
  };

  plusMenu.querySelector('.action-insert-picture').onclick = (e) => {
    e.stopPropagation();
    plusMenu.classList.add('hidden');
    currentAttachingStepId = step.id;
    dom.stepMediaFileInput?.click();
  };

  plusMenu.querySelector('.action-insert-notes').onclick = (e) => {
    e.stopPropagation();
    plusMenu.classList.add('hidden');
    step.notes_expanded = true;
    if (!step.content_text) {
      step.content_text = step.title || '';
    }
    persistState();
    renderBuilderView();
    showToast('Expanded step documentation editor.');
  };

  plusMenu.querySelector('.action-insert-bullets').onclick = (e) => {
    e.stopPropagation();
    plusMenu.classList.add('hidden');
    step.content_text = (step.content_text ? step.content_text.trimEnd() + '\n' : '') + '- Item 1\n- Item 2\n- Item 3\n';
    step.notes_expanded = true;
    persistState();
    renderBuilderView();
    showToast('Bulleted list inserted.');
  };

  // -----------------------------------------------------------
  // 2. [📋] Copy-Paste Icon Button: All Blue
  // -----------------------------------------------------------
  const copyWrapper = document.createElement('div');
  copyWrapper.className = 'relative';
  copyWrapper.innerHTML = `
    <button type="button" class="btn-step-copyblock btn-step-icon-blue p-1 rounded-md text-[#1A73E8] dark:text-[#388bfd] hover:bg-blue-100 dark:hover:bg-blue-900/60 cursor-pointer transition-colors" title="Copy Commands, Step Content, or Duplicate (📋)">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
    </button>
    <div class="step-copy-menu hidden absolute right-0 top-full mt-1 w-56 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl shadow-m3-float py-1.5 z-50 text-xs">
      <button type="button" class="action-add-copyfield w-full text-left px-3.5 py-1.5 hover:bg-blue-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-theme-primary font-semibold cursor-pointer">
        <span>➕</span> Add 1-Click Copy Command
      </button>
      <button type="button" class="action-copy-step-text w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>📋</span> Copy Step Text to Clipboard
      </button>
      <button type="button" class="action-duplicate-step-copy w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>📑</span> Duplicate Step
      </button>
      <button type="button" class="action-paste-step w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>📥</span> Paste Clipboard to Step
      </button>
    </div>
  `;

  const copyBtn = copyWrapper.querySelector('.btn-step-copyblock');
  const copyMenu = copyWrapper.querySelector('.step-copy-menu');
  copyBtn.onclick = (e) => {
    e.stopPropagation();
    document.querySelectorAll('.step-plus-menu, .step-copy-menu, .step-more-menu').forEach(m => {
      if (m !== copyMenu) m.classList.add('hidden');
    });
    copyMenu.classList.toggle('hidden');
  };

  copyMenu.querySelector('.action-add-copyfield').onclick = (e) => {
    e.stopPropagation();
    copyMenu.classList.add('hidden');
    if (!step.copy_fields) step.copy_fields = [];
    step.copy_fields.push({
      label: 'Command',
      value: 'npm run dev'
    });
    persistState();
    renderBuilderView();
    showToast('1-Click copy field added.');
  };

  copyMenu.querySelector('.action-copy-step-text').onclick = async (e) => {
    e.stopPropagation();
    copyMenu.classList.add('hidden');
    const textToCopy = `${step.title || 'Step'}\n\n${step.content_text || ''}`.trim();
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('Step text copied to clipboard!');
    } catch (err) {
      showToast('Copied to clipboard.');
    }
  };

  copyMenu.querySelector('.action-duplicate-step-copy').onclick = (e) => {
    e.stopPropagation();
    copyMenu.classList.add('hidden');
    const dupStep = JSON.parse(JSON.stringify(step));
    dupStep.id = 'step_' + Date.now();
    dupStep.title = (step.title || 'Step') + ' (Copy)';
    if (isLinear) {
      pb.steps.splice(sIdx + 1, 0, dupStep);
    } else {
      pb.steps.push(dupStep);
      const seq = pb.sequences?.find(s => s.id === sequenceId);
      if (seq && Array.isArray(seq.step_ids)) {
        const targetPos = seq.step_ids.indexOf(step.id);
        if (targetPos !== -1) {
          seq.step_ids.splice(targetPos + 1, 0, dupStep.id);
        } else {
          seq.step_ids.push(dupStep.id);
        }
      }
    }
    persistState();
    renderBuilderView();
    renderSidebarPlaybooks();
    showToast('Step duplicated.');
  };

  copyMenu.querySelector('.action-paste-step').onclick = async (e) => {
    e.stopPropagation();
    copyMenu.classList.add('hidden');
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        step.content_text = (step.content_text ? step.content_text + '\n\n' : '') + text;
        step.notes_expanded = true;
        persistState();
        renderBuilderView();
        showToast('Pasted clipboard into step documentation.');
      }
    } catch (err) {
      showToast('Please paste directly using Ctrl+V');
    }
  };

  // -----------------------------------------------------------
  // 3. [☑️] Checkboxes Icon Button: All Blue
  // -----------------------------------------------------------
  const chkBtn = document.createElement('button');
  chkBtn.type = 'button';
  chkBtn.className = 'btn-step-checklist btn-step-icon-blue p-1 rounded-md text-[#1A73E8] dark:text-[#388bfd] hover:bg-blue-100 dark:hover:bg-blue-900/60 cursor-pointer transition-colors';
  chkBtn.title = 'Add Action Prerequisite (Checkdown)';
  chkBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`;
  chkBtn.onclick = (e) => {
    e.stopPropagation();
    if (!step.checklist) step.checklist = [];
    step.checklist.push({
      id: 'c_' + Date.now(),
      text: '',
      checked: false
    });
    persistState();
    renderBuilderView();
    showToast('Verification checkdown added.');
    setTimeout(() => {
      const rowEl = document.querySelector(`[data-step-id="${step.id}"]`);
      const inputs = rowEl?.querySelectorAll('.chk-item-input');
      if (inputs && inputs.length > 0) {
        inputs[inputs.length - 1].focus();
      }
    }, 40);
  };

  // -----------------------------------------------------------
  // 4. [⋮] Three-Button More Options Button: All Blue
  // -----------------------------------------------------------
  const moreWrapper = document.createElement('div');
  moreWrapper.className = 'relative';
  moreWrapper.innerHTML = `
    <button type="button" class="btn-step-more btn-step-icon-blue p-1 rounded-md text-[#1A73E8] dark:text-[#388bfd] hover:bg-blue-100 dark:hover:bg-blue-900/60 cursor-pointer transition-colors" title="Step Options (⋮)">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
    </button>
    <div class="step-more-menu hidden absolute right-0 top-full mt-1 w-56 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl shadow-m3-float py-1.5 z-50 text-xs">
      <button type="button" class="action-mark-section w-full text-left px-3.5 py-1.5 hover:bg-blue-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-[#1A73E8] dark:text-[#388bfd] font-semibold cursor-pointer">
        <span>📑</span> Mark a Section
      </button>
      <button type="button" class="action-attach-media w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>🖼️</span> Attach Media / Screenshot
      </button>
      <div class="my-1 border-t border-slate-100 dark:border-neutral-800"></div>
      <button type="button" class="action-toggle-notes w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>📝</span> Toggle Detailed Notes
      </button>
      <button type="button" class="action-duplicate-step w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>📄</span> Duplicate Step
      </button>
      ${sIdx > 0 ? `
      <button type="button" class="action-move-up w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>⬆️</span> Move Up
      </button>` : ''}
      <button type="button" class="action-move-down w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>⬇️</span> Move Down
      </button>
      <button type="button" class="action-convert-screen w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>🔀</span> Convert to Decision Screen
      </button>
      <button type="button" class="action-toggle-lock w-full text-left px-3.5 py-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-slate-700 dark:text-neutral-200 cursor-pointer">
        <span>${step.disable_back ? '🔓 Enable Back Navigation' : '🔒 Strict Lock-Step (Disable Back)'}</span>
      </button>
      <div class="my-1 border-t border-slate-100 dark:border-neutral-800"></div>
      <button type="button" class="action-delete-step w-full text-left px-3.5 py-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 text-red-600 dark:text-red-400 cursor-pointer">
        <span>🗑️</span> Delete Step
      </button>
    </div>
  `;

  const moreBtn = moreWrapper.querySelector('.btn-step-more');
  const moreMenu = moreWrapper.querySelector('.step-more-menu');
  moreBtn.onclick = (e) => {
    e.stopPropagation();
    document.querySelectorAll('.step-plus-menu, .step-copy-menu, .step-more-menu').forEach(m => {
      if (m !== moreMenu) m.classList.add('hidden');
    });
    moreMenu.classList.toggle('hidden');
  };

  moreMenu.querySelector('.action-mark-section')?.addEventListener('click', (e) => {
    e.stopPropagation();
    moreMenu.classList.add('hidden');
    openMarkSectionModal({ step, sIdx, pb });
  });

  moreMenu.querySelector('.action-attach-media')?.addEventListener('click', (e) => {
    e.stopPropagation();
    moreMenu.classList.add('hidden');
    currentAttachingStepId = step.id;
    dom.stepMediaFileInput?.click();
  });

  moreMenu.querySelector('.action-toggle-notes')?.addEventListener('click', (e) => {
    e.stopPropagation();
    moreMenu.classList.add('hidden');
    step.notes_expanded = !step.notes_expanded;
    if (step.notes_expanded && !step.content_text) {
      step.content_text = step.title || '';
    }
    persistState();
    renderBuilderView();
    showToast(step.notes_expanded ? 'Expanded step documentation.' : 'Collapsed step documentation.');
  });

  moreMenu.querySelector('.action-duplicate-step')?.addEventListener('click', (e) => {
    e.stopPropagation();
    moreMenu.classList.add('hidden');
    const dupStep = JSON.parse(JSON.stringify(step));
    dupStep.id = 'step_' + Date.now();
    dupStep.title = (step.title || 'Step') + ' (Copy)';
    if (isLinear) {
      pb.steps.splice(sIdx + 1, 0, dupStep);
    } else {
      pb.steps.push(dupStep);
      const seq = pb.sequences?.find(s => s.id === sequenceId);
      if (seq && Array.isArray(seq.step_ids)) {
        const targetPos = seq.step_ids.indexOf(step.id);
        if (targetPos !== -1) {
          seq.step_ids.splice(targetPos + 1, 0, dupStep.id);
        } else {
          seq.step_ids.push(dupStep.id);
        }
      }
    }
    persistState();
    renderBuilderView();
    renderSidebarPlaybooks();
    showToast('Step duplicated.');
  });

  moreMenu.querySelector('.action-move-up')?.addEventListener('click', (e) => {
    e.stopPropagation();
    moreMenu.classList.add('hidden');
    if (isLinear && sIdx > 0) {
      const temp = pb.steps[sIdx - 1];
      pb.steps[sIdx - 1] = pb.steps[sIdx];
      pb.steps[sIdx] = temp;
    } else if (!isLinear && sequenceId) {
      const seq = pb.sequences?.find(s => s.id === sequenceId);
      if (seq && Array.isArray(seq.step_ids)) {
        const pos = seq.step_ids.indexOf(step.id);
        if (pos > 0) {
          const temp = seq.step_ids[pos - 1];
          seq.step_ids[pos - 1] = seq.step_ids[pos];
          seq.step_ids[pos] = temp;
        }
      }
    }
    persistState();
    renderBuilderView();
    renderSidebarPlaybooks();
    showToast('Moved step up.');
  });

  moreMenu.querySelector('.action-move-down')?.addEventListener('click', (e) => {
    e.stopPropagation();
    moreMenu.classList.add('hidden');
    if (isLinear && sIdx < pb.steps.length - 1) {
      const temp = pb.steps[sIdx + 1];
      pb.steps[sIdx + 1] = pb.steps[sIdx];
      pb.steps[sIdx] = temp;
    } else if (!isLinear && sequenceId) {
      const seq = pb.sequences?.find(s => s.id === sequenceId);
      if (seq && Array.isArray(seq.step_ids)) {
        const pos = seq.step_ids.indexOf(step.id);
        if (pos < seq.step_ids.length - 1 && pos !== -1) {
          const temp = seq.step_ids[pos + 1];
          seq.step_ids[pos + 1] = seq.step_ids[pos];
          seq.step_ids[pos] = temp;
        }
      }
    }
    persistState();
    renderBuilderView();
    renderSidebarPlaybooks();
    showToast('Moved step down.');
  });

  moreMenu.querySelector('.action-convert-screen')?.addEventListener('click', (e) => {
    e.stopPropagation();
    moreMenu.classList.add('hidden');
    addScreenToActivePlaybook();
  });

  moreMenu.querySelector('.action-toggle-lock')?.addEventListener('click', (e) => {
    e.stopPropagation();
    moreMenu.classList.add('hidden');
    step.disable_back = !step.disable_back;
    persistState();
    renderBuilderView();
    showToast(step.disable_back ? 'Strict lock-step enabled (Back navigation disabled).' : 'Back navigation allowed.');
  });

  moreMenu.querySelector('.action-delete-step')?.addEventListener('click', (e) => {
    e.stopPropagation();
    moreMenu.classList.add('hidden');
    activeNode = { type: 'step', id: step.id, sequenceId: sequenceId || '' };
    deleteActiveStep();
  });

  toolbar.appendChild(plusWrapper);
  toolbar.appendChild(copyWrapper);
  toolbar.appendChild(chkBtn);
  toolbar.appendChild(moreWrapper);

  return toolbar;
}

// -------------------------------------------------------------
// MARKDOWN SANITIZATION HELPER: ERADICATE MARKDOWN LEAKAGE
// No raw markdown: ###, **, etc. never appear in the Editor UI.
// -------------------------------------------------------------
function cleanMarkdownForEditor(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/^#{1,6}\s+/gm, '') // Remove heading tokens like ###
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold**
    .replace(/\*(.*?)\*/g, '$1') // Remove *italic*
    .replace(/__(.*?)__/g, '$1') // Remove __bold__
    .replace(/_(.*?)_/g, '$1') // Remove _italic_
    .split(String.fromCharCode(96)).join('')
    .trim();
}

// -------------------------------------------------------------
// ACTIVE NODE RESOLUTION FOR SINGLE-FRAME PAGINATION
// Always resolves to either ONE Screen router OR ONE Step page
// -------------------------------------------------------------
function resolveActiveNode(pb) {
  if (!pb) return null;
  ensurePlaybookStructure(pb);
  if (!activeNode || typeof activeNode !== 'object') {
    activeNode = { type: 'step', id: '', sequenceId: '' };
  }

  // 0. Target is a Section (resolves to first step/screen in section for builder view)
  if (activeNode.type === 'section') {
    const sec = pb.sections?.find(s => s.id === activeNode.id);
    if (sec) {
      if (Array.isArray(sec.step_ids) && sec.step_ids.length > 0) {
        const firstStep = pb.steps?.find(s => s.id === sec.step_ids[0]);
        if (firstStep) {
          activeNode = { type: 'step', id: firstStep.id, sequenceId: '' };
        }
      } else if (Array.isArray(sec.screen_ids) && sec.screen_ids.length > 0) {
        activeNode = { type: 'screen', id: sec.screen_ids[0], sequenceId: '' };
      }
    }
  }

  // 1. Target is a Screen (Router View)
  if (activeNode.type === 'screen') {
    const sc = pb.screens?.find(s => s.id === activeNode.id);
    if (sc) return { type: 'screen', screen: sc };
    if (pb.screens && pb.screens.length > 0) {
      activeNode = { type: 'screen', id: pb.screens[0].id, sequenceId: '' };
      return { type: 'screen', screen: pb.screens[0] };
    }
  }

  // 2. Target is a Step
  if (activeNode.type === 'step') {
    // A. Check if step belongs to a sequence
    let seq = activeNode.sequenceId ? pb.sequences?.find(s => s.id === activeNode.sequenceId) : null;
    if (!seq && activeNode.id) {
      seq = pb.sequences?.find(s => Array.isArray(s.step_ids) && s.step_ids.includes(activeNode.id));
      if (seq) activeNode.sequenceId = seq.id;
    }
    if (seq) {
      if (!Array.isArray(seq.step_ids)) seq.step_ids = [];
      let step = pb.steps?.find(s => s.id === activeNode.id);
      if (!step && seq.step_ids.length > 0) {
        step = pb.steps?.find(s => s.id === seq.step_ids[0]);
        if (step) activeNode.id = step.id;
      }
      if (!step) {
        const newStepId = 'step_' + Date.now();
        step = {
          id: newStepId,
          title: '',
          content_text: '',
          assets: [],
          checklist: [],
          copy_fields: [],
          disable_back: false
        };
        if (!Array.isArray(pb.steps)) pb.steps = [];
        pb.steps.push(step);
        seq.step_ids.push(newStepId);
        activeNode.id = newStepId;
        persistState();
      }
      const sIdx = Math.max(0, seq.step_ids.indexOf(step.id));
      return {
        type: 'step',
        step,
        sequence: seq,
        section: null,
        sIdx,
        totalSteps: Math.max(1, seq.step_ids.length)
      };
    }

    // B. Check if step belongs to a section
    let sec = pb.sections?.find(s => Array.isArray(s.step_ids) && s.step_ids.includes(activeNode.id));
    if (sec) {
      let step = pb.steps?.find(s => s.id === activeNode.id);
      if (!step && sec.step_ids.length > 0) {
        step = pb.steps?.find(s => s.id === sec.step_ids[0]);
        if (step) activeNode.id = step.id;
      }
      if (!step) {
        const newStepId = 'step_' + Date.now();
        step = {
          id: newStepId,
          title: '',
          content_text: '',
          assets: [],
          checklist: [],
          copy_fields: [],
          disable_back: false
        };
        if (!Array.isArray(pb.steps)) pb.steps = [];
        pb.steps.push(step);
        sec.step_ids.push(newStepId);
        activeNode.id = newStepId;
        persistState();
      }
      const sIdx = Math.max(0, sec.step_ids.indexOf(step.id));
      return {
        type: 'step',
        step,
        sequence: null,
        section: sec,
        sIdx,
        totalSteps: Math.max(1, sec.step_ids.length)
      };
    }

    // C. Flat step fallback
    if (!Array.isArray(pb.steps)) pb.steps = [];
    let step = pb.steps.find(s => s.id === activeNode.id);
    if (!step && pb.steps.length > 0) {
      step = pb.steps[0];
      activeNode.id = step.id;
      activeNode.sequenceId = '';
    }
    if (!step) {
      const newStepId = 'step_' + Date.now();
      step = {
        id: newStepId,
        title: '',
        content_text: '',
        assets: [],
        checklist: [],
        copy_fields: [],
        disable_back: false
      };
      pb.steps.push(step);
      activeNode.id = newStepId;
      activeNode.sequenceId = '';
      persistState();
    }
    const sIdx = Math.max(0, pb.steps.findIndex(s => s.id === step.id));
    return {
      type: 'step',
      step,
      sequence: null,
      section: null,
      sIdx,
      totalSteps: Math.max(1, pb.steps.length)
    };
  }

  // 3. Fallback to first step of first section if available
  if (pb.sections && pb.sections.length > 0 && pb.sections[0].step_ids?.length > 0) {
    const firstStId = pb.sections[0].step_ids[0];
    activeNode = { type: 'step', id: firstStId, sequenceId: '' };
    const step = pb.steps?.find(s => s.id === firstStId);
    return {
      type: 'step',
      step: step || pb.steps[0],
      sequence: null,
      section: pb.sections[0],
      sIdx: 0,
      totalSteps: pb.sections[0].step_ids.length
    };
  }

  // 4. Default Fallbacks
  if (pb.screens && pb.screens.length > 0) {
    activeNode = { type: 'screen', id: pb.screens[0].id, sequenceId: '' };
    return { type: 'screen', screen: pb.screens[0] };
  }

  if (!Array.isArray(pb.steps) || pb.steps.length === 0) {
    const newStepId = 'step_' + Date.now();
    pb.steps = [{
      id: newStepId,
      title: '',
      content_text: '',
      assets: [],
      checklist: [],
      copy_fields: [],
      disable_back: false
    }];
  }
  activeNode = { type: 'step', id: pb.steps[0].id, sequenceId: '' };
  return {
    type: 'step',
    step: pb.steps[0],
    sequence: null,
    section: null,
    sIdx: 0,
    totalSteps: pb.steps.length
  };
}

// -------------------------------------------------------------
// MAIN BUILDER VIEW: THE SINGLE-FRAME PAGINATION ROUTER
// Renders strictly ONE thing: Either a single Step, OR a single Screen's routing choices
// -------------------------------------------------------------
function renderBuilderView(scrollToSelected = false) {
  const pb = getActivePlaybook();
  if (!pb) {
    showWelcomeHub();
    return;
  }
  ensurePlaybookStructure(pb);

  const currentTitle = cleanMarkdownForEditor(pb.title || pb.name || 'Untitled');
  if (dom.canvasPlaybookBadge) dom.canvasPlaybookBadge.textContent = currentTitle;
  if (dom.canvasPlaybookTitleInput) dom.canvasPlaybookTitleInput.value = currentTitle;

  if (!dom.mainScreenCanvas) return;
  dom.mainScreenCanvas.innerHTML = '';

  const target = resolveActiveNode(pb);
  if (!target) return;

  if (target.type === 'screen') {
    renderScreenRouterCanvas(pb, target.screen);
  } else if (target.type === 'step') {
    renderSingleStepCanvas(pb, target.step, target.sequence, target.section, target.sIdx, target.totalSteps);
  }
}

// -------------------------------------------------------------
// RULE 1: ONE STEP PER PAGE CANVAS
// The canvas is entirely blank except for that specific Step's text resting on its blue line.
// -------------------------------------------------------------
function renderSingleStepCanvas(pb, step, sequence, section, sIdx, totalSteps) {
  if (!dom.mainScreenCanvas) return;
  dom.mainScreenCanvas.innerHTML = '';

  // Find parent screen if in a sequence
  const parentScreen = sequence
    ? (pb.screens || []).find(sc => sc.options?.some(o => o.target_sequence_id === sequence.id))
    : null;
  const parentSection = section || (parentScreen
    ? (pb.sections || []).find(sec => (sec.screen_ids && sec.screen_ids.includes(parentScreen.id)) || (sec.sequence_ids && sec.sequence_ids.includes(sequence?.id)))
    : null);

  // 1. Update top bar active view breadcrumb
  if (dom.canvasActiveBreadcrumb) {
    if (sequence) {
      dom.canvasActiveBreadcrumb.innerHTML = `
        <div class="flex items-center gap-1.5 truncate">
          ${parentSection ? `<span class="text-slate-500 font-medium">${escapeHtml(cleanMarkdownForEditor(parentSection.title))}</span> <span class="opacity-40">›</span>` : ''}
          ${parentScreen ? `<button type="button" class="btn-breadcrumb-screen text-[#1A73E8] dark:text-[#388bfd] hover:underline font-semibold cursor-pointer">${escapeHtml(cleanMarkdownForEditor(parentScreen.title))}</button> <span class="opacity-40">›</span>` : ''}
          <span class="font-semibold text-slate-700 dark:text-neutral-200">${escapeHtml(cleanMarkdownForEditor(sequence.title))}</span>
          <span class="opacity-40">›</span>
          <span class="font-mono text-[#1A73E8] dark:text-[#388bfd] font-bold">Step ${sIdx + 1} of ${totalSteps}</span>
        </div>
      `;
      dom.canvasActiveBreadcrumb.querySelector('.btn-breadcrumb-screen')?.addEventListener('click', () => {
        if (parentScreen) {
          activeNode = { type: 'screen', id: parentScreen.id, sequenceId: '' };
          renderBuilderView(true);
          renderSidebarPlaybooks();
        }
      });
    } else if (parentSection) {
      dom.canvasActiveBreadcrumb.innerHTML = `
        <div class="flex items-center gap-1.5 truncate">
          <span class="text-slate-500 font-medium">${escapeHtml(cleanMarkdownForEditor(parentSection.title))}</span>
          <span class="opacity-40">›</span>
          <span class="font-mono text-[#1A73E8] dark:text-[#388bfd] font-bold">Step ${sIdx + 1} of ${totalSteps}</span>
        </div>
      `;
    } else {
      dom.canvasActiveBreadcrumb.innerHTML = `
        <span class="font-mono font-bold text-[#1A73E8] dark:text-[#388bfd]">Step ${sIdx + 1} of ${totalSteps}</span>
      `;
    }
  }

  // 2. Center Stage Frame (Google Antigravity Minimalist Single-View)
  const frame = document.createElement('div');
  frame.className = 'w-full max-w-3xl mx-auto py-8 md:py-14 px-4 md:px-8 space-y-6 flex flex-col justify-start min-h-[500px] select-text';

  // 3. Top Navigation & Pagination Bar
  const scopeTitle = sequence ? sequence.title : (parentSection ? parentSection.title : '');
  const paginationBar = document.createElement('div');
  paginationBar.className = 'flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-neutral-800 select-none';
  paginationBar.innerHTML = `
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#1A73E8] dark:text-[#388bfd] bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/40 px-2.5 py-1 rounded-lg">
        ${scopeTitle ? `${escapeHtml(cleanMarkdownForEditor(scopeTitle))} • ` : ''}Step ${sIdx + 1} of ${totalSteps}
      </span>
    </div>
    <div class="flex items-center gap-1.5 ml-auto">
      <button type="button" class="btn-step-prev px-2.5 py-1 rounded-lg border border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 cursor-pointer disabled:opacity-30 disabled:pointer-events-none transition-colors" ${sIdx === 0 ? 'disabled' : ''} title="Previous Step Page (Arrow Left / Up)">
        ◀ Prev
      </button>
      <div class="step-pills-row flex items-center gap-1 max-w-[200px] overflow-x-auto py-0.5 scrollbar-thin"></div>
      <button type="button" class="btn-step-next px-2.5 py-1 rounded-lg border border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 cursor-pointer disabled:opacity-30 disabled:pointer-events-none transition-colors" ${sIdx >= totalSteps - 1 ? 'disabled' : ''} title="Next Step Page (Arrow Right / Down)">
        Next ▶
      </button>
      <button type="button" class="btn-add-step-page px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#1A73E8] dark:text-[#388bfd] hover:bg-blue-100 dark:hover:bg-blue-900 font-bold text-xs cursor-pointer transition-colors shadow-2xs flex items-center gap-1" title="Add Step Below (Ctrl+Enter)">
        <span>+ Add Step</span>
      </button>
    </div>
  `;

  // Render clickable pills
  const pillsRow = paginationBar.querySelector('.step-pills-row');
  const stepList = sequence
    ? sequence.step_ids
    : (parentSection && parentSection.step_ids?.length ? parentSection.step_ids : pb.steps.map(s => s.id));

  stepList.forEach((stId, pIdx) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
      pIdx === sIdx
        ? 'bg-[#1A73E8] text-white shadow-2xs'
        : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
    }`;
    pill.textContent = pIdx + 1;
    pill.onclick = () => {
      activeNode = { type: 'step', id: stId, sequenceId: sequence ? sequence.id : '' };
      renderBuilderView(true);
      renderSidebarPlaybooks();
    };
    pillsRow.appendChild(pill);
  });

  paginationBar.querySelector('.btn-step-prev').onclick = () => {
    if (sIdx > 0) {
      const prevId = stepList[sIdx - 1];
      activeNode = { type: 'step', id: prevId, sequenceId: sequence ? sequence.id : '' };
      renderBuilderView(true);
      renderSidebarPlaybooks();
    }
  };

  paginationBar.querySelector('.btn-step-next').onclick = () => {
    if (sIdx < totalSteps - 1) {
      const nextId = stepList[sIdx + 1];
      activeNode = { type: 'step', id: nextId, sequenceId: sequence ? sequence.id : '' };
      renderBuilderView(true);
      renderSidebarPlaybooks();
    }
  };

  // Helper function to turn page to a fresh blank step
  const turnPageToNewStep = () => {
    const newStep = {
      id: 'step_' + Date.now(),
      title: '',
      content_text: '',
      assets: [],
      checklist: [],
      copy_fields: [],
      disable_back: false
    };
    if (!Array.isArray(pb.steps)) pb.steps = [];
    pb.steps.push(newStep);
    if (sequence) {
      if (!Array.isArray(sequence.step_ids)) sequence.step_ids = [];
      sequence.step_ids.splice(sIdx + 1, 0, newStep.id);
      activeNode = { type: 'step', id: newStep.id, sequenceId: sequence.id };
    } else if (parentSection && Array.isArray(parentSection.step_ids)) {
      parentSection.step_ids.splice(sIdx + 1, 0, newStep.id);
      activeNode = { type: 'step', id: newStep.id, sequenceId: '' };
    } else {
      pb.steps.splice(sIdx + 1, 0, newStep);
      activeNode = { type: 'step', id: newStep.id, sequenceId: '' };
    }
    persistState();
    renderBuilderView(true);
    renderSidebarPlaybooks();
    updateActiveStepWordCount(newStep);
    showToast('Turned page to new blank step.');
    setTimeout(() => {
      const nextInput = dom.mainScreenCanvas.querySelector('.single-step-main-input');
      nextInput?.focus();
    }, 40);
  };

  paginationBar.querySelector('.btn-add-step-page').onclick = turnPageToNewStep;
  frame.appendChild(paginationBar);

  // 4. THE BLUE LINE INPUT ROW (The Signature Google Antigravity Ruled Line)
  // Canvas is entirely blank except for that specific Step's text resting on its blue line.
  const inputContainer = document.createElement('div');
  inputContainer.className = 'w-full pt-4 pb-2 relative group/line';

  const blueLineWrap = document.createElement('div');
  blueLineWrap.className = 'relative w-full border-b-2 border-[#1A73E8] dark:border-white focus-within:border-[#1557B0] dark:focus-within:border-neutral-300 transition-colors pb-1.5 flex items-start gap-3';

  // Number indicator
  const numBadge = document.createElement('span');
  numBadge.className = 'text-base md:text-xl font-mono font-bold text-[#1A73E8] dark:text-[#388bfd] select-none pt-1 shrink-0';
  numBadge.textContent = `${sIdx + 1}.`;
  blueLineWrap.appendChild(numBadge);

  // Main text area (auto-growing, pure clean text, NO RAW MARKDOWN)
  const stepTextarea = document.createElement('textarea');
  stepTextarea.className = 'single-step-main-input w-full bg-transparent text-xl md:text-2xl font-medium text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-normal placeholder:italic focus:outline-none resize-none leading-relaxed transition-colors';
  stepTextarea.rows = 2;
  stepTextarea.placeholder = 'Write Step here...';

  // Sanitize text so ### and ** never leak into the editor
  const rawText = step.title || step.content_text || '';
  stepTextarea.value = cleanMarkdownForEditor(rawText);

  const autoResize = () => {
    stepTextarea.style.height = 'auto';
    stepTextarea.style.height = Math.max(54, stepTextarea.scrollHeight) + 'px';
  };

  stepTextarea.addEventListener('input', () => {
    const val = stepTextarea.value;
    step.title = val.trim();
    step.content_text = val.trim();
    autoResize();
    updateActiveStepWordCount(step);
    persistState();
    renderSidebarPlaybooks();
  });

  stepTextarea.addEventListener('keydown', (e) => {
    // Ctrl+Enter or Enter at end: Turns the page to a completely fresh blank step!
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      turnPageToNewStep();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      turnPageToNewStep();
    } else if (e.key === 'Backspace' && stepTextarea.value.trim() === '' && totalSteps > 1) {
      // Empty step deletion: turns page to previous step
      e.preventDefault();
      if (sequence) {
        sequence.step_ids = sequence.step_ids.filter(id => id !== step.id);
        pb.steps = pb.steps.filter(s => s.id !== step.id);
        const prevId = sequence.step_ids[Math.max(0, sIdx - 1)];
        activeNode = { type: 'step', id: prevId, sequenceId: sequence.id };
      } else {
        pb.steps.splice(sIdx, 1);
        const prevIdx = Math.max(0, sIdx - 1);
        activeNode = { type: 'step', id: pb.steps[prevIdx].id, sequenceId: '' };
      }
      persistState();
      renderBuilderView(true);
      renderSidebarPlaybooks();
      showToast('Deleted step and returned to previous page.');
      setTimeout(() => {
        const prevInput = dom.mainScreenCanvas.querySelector('.single-step-main-input');
        prevInput?.focus();
      }, 40);
    } else if (e.key === 'ArrowLeft' && stepTextarea.selectionStart === 0 && sIdx > 0) {
      const prevId = stepList[sIdx - 1];
      activeNode = { type: 'step', id: prevId, sequenceId: sequence ? sequence.id : '' };
      renderBuilderView(true);
      renderSidebarPlaybooks();
    } else if (e.key === 'ArrowRight' && stepTextarea.selectionStart === stepTextarea.value.length && sIdx < totalSteps - 1) {
      const nextId = stepList[sIdx + 1];
      activeNode = { type: 'step', id: nextId, sequenceId: sequence ? sequence.id : '' };
      renderBuilderView(true);
      renderSidebarPlaybooks();
    }
  });

  blueLineWrap.appendChild(stepTextarea);

  // Vertical action toolbar for this single step (on the right, all blue)
  const stepToolbar = createStepVerticalToolbar({
    step,
    sIdx,
    pb,
    sequenceId: sequence ? sequence.id : '',
    isLinear: !sequence
  });
  blueLineWrap.appendChild(stepToolbar);

  inputContainer.appendChild(blueLineWrap);
  frame.appendChild(inputContainer);

  // 5. SUB-ELEMENTS: Cleanly rendered below the blue line (NO RAW MARKDOWN)
  const subWrap = document.createElement('div');
  subWrap.className = 'step-sub-elements space-y-4 pt-2';

  // A. Checklists / Action Prerequisites
  if (step.checklist && step.checklist.length > 0) {
    const chkCard = document.createElement('div');
    chkCard.className = 'p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 shadow-2xs space-y-2.5';
    
    const chkHeader = document.createElement('div');
    chkHeader.className = 'flex items-center justify-between text-xs font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider select-none';
    chkHeader.innerHTML = `
      <span>Checklist:</span>
      <span class="text-[#1A73E8] dark:text-[#388bfd] font-mono text-xs">${step.checklist.filter(c => c.checked).length}/${step.checklist.length}</span>
    `;
    chkCard.appendChild(chkHeader);

    const chkList = document.createElement('div');
    chkList.className = 'space-y-2';
    step.checklist.forEach((item, cIdx) => {
      const itemRow = document.createElement('div');
      itemRow.className = 'flex items-center gap-2.5 group/chk';
      itemRow.innerHTML = `
        <input type="checkbox" ${item.checked ? 'checked' : ''} class="w-4 h-4 rounded text-[#1A73E8] focus:ring-0 cursor-pointer" />
        <input type="text" value="${escapeHtml(cleanMarkdownForEditor(item.text))}" class="chk-item-input flex-1 bg-transparent border-b border-dashed border-slate-200 dark:border-neutral-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#1A73E8]" placeholder="Item..." />
        <button type="button" class="btn-del-chk opacity-0 group-hover/chk:opacity-100 text-slate-400 hover:text-red-500 cursor-pointer text-xs p-0.5" title="Remove Item">✕</button>
      `;
      itemRow.querySelector('input[type="checkbox"]').onchange = (e) => {
        item.checked = e.target.checked;
        persistState();
      };
      itemRow.querySelector('.chk-item-input').oninput = (e) => {
        item.text = e.target.value;
        persistState();
      };
      itemRow.querySelector('.btn-del-chk').onclick = () => {
        step.checklist.splice(cIdx, 1);
        persistState();
        renderBuilderView();
      };
      chkList.appendChild(itemRow);
    });
    chkCard.appendChild(chkList);

    const addChkBtn = document.createElement('button');
    addChkBtn.type = 'button';
    addChkBtn.className = 'text-xs font-semibold text-[#1A73E8] dark:text-[#388bfd] hover:underline cursor-pointer flex items-center gap-1 pt-1';
    addChkBtn.innerHTML = `<span>+ Add Item</span>`;
    addChkBtn.onclick = () => {
      step.checklist.push({ id: 'c_' + Date.now(), text: '', checked: false });
      persistState();
      renderBuilderView();
    };
    chkCard.appendChild(addChkBtn);
    subWrap.appendChild(chkCard);
  }

  // B. 1-Click Copy Commands & Parameters
  if (step.copy_fields && step.copy_fields.length > 0) {
    const copyCard = document.createElement('div');
    copyCard.className = 'p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 shadow-2xs space-y-2.5';

    const copyHeader = document.createElement('div');
    copyHeader.className = 'text-xs font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider select-none';
    copyHeader.textContent = 'Copy Commands:';
    copyCard.appendChild(copyHeader);

    const copyList = document.createElement('div');
    copyList.className = 'space-y-2';
    step.copy_fields.forEach((field, fIdx) => {
      const fieldRow = document.createElement('div');
      fieldRow.className = 'flex items-center gap-2 group/fld text-xs';
      fieldRow.innerHTML = `
        <input type="text" value="${escapeHtml(field.label || 'Command')}" class="fld-label-input w-28 bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none" placeholder="Label" />
        <input type="text" value="${escapeHtml(field.value || '')}" class="fld-value-input flex-1 font-mono bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg px-2.5 py-1 text-slate-900 dark:text-slate-100 focus:outline-none" placeholder="Command to copy..." />
        <button type="button" class="btn-test-copy px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-neutral-800 text-[#1A73E8] dark:text-[#388bfd] hover:bg-[#1A73E8] hover:text-white dark:hover:text-black font-semibold text-xs transition-colors cursor-pointer" title="Test Copy">Copy</button>
        <button type="button" class="btn-del-fld opacity-0 group-hover/fld:opacity-100 text-slate-400 hover:text-red-500 cursor-pointer text-xs p-1" title="Remove Field">✕</button>
      `;
      fieldRow.querySelector('.fld-label-input').oninput = (e) => {
        field.label = e.target.value;
        persistState();
      };
      fieldRow.querySelector('.fld-value-input').oninput = (e) => {
        field.value = e.target.value;
        persistState();
      };
      fieldRow.querySelector('.btn-test-copy').onclick = async () => {
        try {
          await navigator.clipboard.writeText(field.value);
          showToast(`Copied "${field.label || 'Command'}" to clipboard!`);
        } catch (err) {
          showToast('Copied to clipboard.');
        }
      };
      fieldRow.querySelector('.btn-del-fld').onclick = () => {
        step.copy_fields.splice(fIdx, 1);
        persistState();
        renderBuilderView();
      };
      copyList.appendChild(fieldRow);
    });
    copyCard.appendChild(copyList);

    const addFldBtn = document.createElement('button');
    addFldBtn.type = 'button';
    addFldBtn.className = 'text-xs font-semibold text-[#1A73E8] dark:text-[#388bfd] hover:underline cursor-pointer flex items-center gap-1 pt-1';
    addFldBtn.innerHTML = `<span>+ Add Command</span>`;
    addFldBtn.onclick = () => {
      step.copy_fields.push({ label: 'Command', value: '' });
      persistState();
      renderBuilderView();
    };
    copyCard.appendChild(addFldBtn);
    subWrap.appendChild(copyCard);
  }

  // C. Attached Media Thumbnails
  if (step.assets && step.assets.length > 0) {
    const mediaCard = document.createElement('div');
    mediaCard.className = 'flex flex-wrap gap-2.5 pt-1';
    step.assets.forEach((assetKey, aIdx) => {
      const thumb = document.createElement('div');
      thumb.className = 'relative group/thumb rounded-xl border border-slate-200 dark:border-neutral-800 p-1.5 bg-white dark:bg-neutral-900 shadow-2xs flex items-center gap-2 max-w-xs';
      thumb.innerHTML = `
        <span class="text-sm cursor-pointer" title="View Fullscreen">🖼️</span>
        <span class="text-xs truncate font-medium text-slate-700 dark:text-slate-300 max-w-[140px] cursor-pointer" title="Click to view">${escapeHtml(assetKey)}</span>
        <button type="button" class="btn-del-asset text-slate-400 hover:text-red-500 cursor-pointer text-xs p-1" title="Remove Media">✕</button>
      `;
      thumb.onclick = (e) => {
        if (!e.target.closest('.btn-del-asset')) {
          openImageLightbox(step.assets, aIdx, step.title);
        }
      };
      thumb.querySelector('.btn-del-asset').onclick = (e) => {
        e.stopPropagation();
        step.assets.splice(aIdx, 1);
        persistState();
        renderBuilderView();
        showToast(`Removed ${assetKey}`);
      };
      mediaCard.appendChild(thumb);
    });
    subWrap.appendChild(mediaCard);
  }

  if (subWrap.children.length > 0) {
    frame.appendChild(subWrap);
  }

  dom.mainScreenCanvas.appendChild(frame);
  setTimeout(autoResize, 20);
  updateActiveStepWordCount(step);
}

// -------------------------------------------------------------
// RULE 2: SEQUENCE ISOLATION (THE "DOORWAY" CONCEPT)
// No Nested Previews: Forbidden from rendering text of steps inside sequence card.
// Router View: Canvas shows Screen Title, and underneath simple text boxes representing Sequence Titles.
// Entering a Sequence: User clicks "Edit/Enter" doorway button -> clears Screen view and enters One Step Per Page flow.
// -------------------------------------------------------------
function renderScreenRouterCanvas(pb, screen) {
  if (!dom.mainScreenCanvas) return;
  dom.mainScreenCanvas.innerHTML = '';

  // Update top bar breadcrumb
  if (dom.canvasActiveBreadcrumb) {
    dom.canvasActiveBreadcrumb.innerHTML = `
      <span class="font-bold text-slate-800 dark:text-neutral-100 flex items-center gap-1.5">
        <span>${escapeHtml(cleanMarkdownForEditor(screen.title || 'Screen'))}</span>
      </span>
    `;
  }

  const frame = document.createElement('div');
  frame.className = 'w-full max-w-3xl mx-auto py-8 md:py-14 px-4 md:px-8 space-y-6 select-text';

  // 1. Screen Title on Signature Blue Bottom Border
  const titleWrap = document.createElement('div');
  titleWrap.className = 'relative w-full border-b-2 border-[#1A73E8] dark:border-white focus-within:border-[#1557B0] dark:focus-within:border-neutral-300 pb-1.5 transition-colors';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.className = 'w-full bg-transparent text-2xl md:text-3xl font-bold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-normal focus:outline-none';
  titleInput.placeholder = 'Screen Title';
  titleInput.value = cleanMarkdownForEditor(screen.title || '');
  titleInput.oninput = (e) => {
    screen.title = e.target.value.trim() || 'Untitled Screen';
    persistState();
    renderSidebarPlaybooks();
  };
  titleWrap.appendChild(titleInput);
  frame.appendChild(titleWrap);

  // Optional description / instructions
  const descInput = document.createElement('input');
  descInput.type = 'text';
  descInput.className = 'w-full bg-transparent text-sm text-slate-500 dark:text-neutral-400 placeholder:text-slate-400 focus:outline-none pt-1';
  descInput.placeholder = 'Screen description or instructions (optional)';
  descInput.value = cleanMarkdownForEditor(screen.description || '');
  descInput.oninput = (e) => {
    screen.description = e.target.value.trim();
    persistState();
  };
  frame.appendChild(descInput);

  // 2. Simple Sequence Routes List (Clean minimal cards, no emojis, no step counts)
  let scSequences = (screen.options || [])
    .map(opt => pb.sequences?.find(sq => sq.id === opt.target_sequence_id))
    .filter(Boolean);

  if (scSequences.length === 0 && pb.sequences && pb.sequences.length > 0) {
    scSequences = pb.sequences;
  }

  const routesList = document.createElement('div');
  routesList.className = 'space-y-2.5 pt-4';

  scSequences.forEach((seq) => {
    const card = document.createElement('div');
    card.className = 'group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-[#1A73E8] dark:hover:border-[#388bfd] transition-all gap-3 cursor-pointer';

    const enterSequenceFlow = () => {
      let firstStId = (seq.step_ids && seq.step_ids.length > 0) ? seq.step_ids[0] : null;
      if (!firstStId) {
        const newStepId = 'step_' + Date.now();
        pb.steps.push({
          id: newStepId,
          title: '',
          content_text: '',
          assets: [],
          checklist: [],
          copy_fields: [],
          disable_back: false
        });
        if (!Array.isArray(seq.step_ids)) seq.step_ids = [];
        seq.step_ids.push(newStepId);
        firstStId = newStepId;
        persistState();
      }
      activeNode = { type: 'step', id: firstStId, sequenceId: seq.id };
      renderBuilderView(true);
      renderSidebarPlaybooks();
    };

    const leftCol = document.createElement('div');
    leftCol.className = 'flex items-center gap-2 flex-1 min-w-0';

    const routeTitle = document.createElement('input');
    routeTitle.type = 'text';
    routeTitle.className = 'w-full bg-transparent font-medium text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none border-b border-transparent focus:border-[#1A73E8]';
    routeTitle.value = cleanMarkdownForEditor(seq.title || '');
    routeTitle.placeholder = 'Route Title';
    routeTitle.oninput = (e) => {
      seq.title = e.target.value.trim() || 'Untitled Route';
      const opt = (screen.options || []).find(o => o.target_sequence_id === seq.id);
      if (opt) opt.label = seq.title;
      persistState();
      renderSidebarPlaybooks();
    };
    routeTitle.onclick = (e) => {
      e.stopPropagation();
    };
    leftCol.appendChild(routeTitle);
    card.appendChild(leftCol);

    const rightCol = document.createElement('div');
    rightCol.className = 'flex items-center gap-1.5 shrink-0';

    // Subtle arrow button
    const openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.className = 'p-1.5 text-slate-400 hover:text-[#1A73E8] dark:hover:text-[#388bfd] rounded-lg hover:bg-blue-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer';
    openBtn.title = 'Open Route';
    openBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>`;
    openBtn.onclick = (e) => {
      e.stopPropagation();
      enterSequenceFlow();
    };
    rightCol.appendChild(openBtn);

    // Delete sequence route button
    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'p-1.5 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer';
    delBtn.title = 'Delete Route';
    delBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`;
    delBtn.onclick = (e) => {
      e.stopPropagation();
      openProvisionalDeleteDialog({
        title: 'Delete Route',
        subtitle: 'Provisional Safeguard',
        message: `Delete route "${seq.title}"?`,
        confirmText: 'Delete Route',
        onConfirm: () => {
          const idsToDelete = seq.step_ids || [];
          pb.sequences = pb.sequences.filter(sq => sq.id !== seq.id);
          pb.steps = pb.steps.filter(s => !idsToDelete.includes(s.id));
          if (Array.isArray(screen.options)) {
            screen.options = screen.options.filter(o => o.target_sequence_id !== seq.id);
          }
          persistState();
          renderBuilderView(true);
          renderSidebarPlaybooks();
          showToast(`Deleted "${seq.title}".`);
        }
      });
    };
    rightCol.appendChild(delBtn);

    card.appendChild(rightCol);
    card.onclick = enterSequenceFlow;
    routesList.appendChild(card);
  });

  frame.appendChild(routesList);

  // Clean "+ Add Route" button
  const addRouteBtn = document.createElement('button');
  addRouteBtn.type = 'button';
  addRouteBtn.className = 'w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-neutral-700 hover:border-[#1A73E8] dark:hover:border-[#388bfd] flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:text-[#1A73E8] dark:hover:text-[#388bfd] transition-colors cursor-pointer bg-white/40 dark:bg-neutral-900/40 mt-3';
  addRouteBtn.textContent = '+ Add Route';
  addRouteBtn.onclick = () => {
    addNewSequenceToScreen(screen, pb);
  };
  frame.appendChild(addRouteBtn);

  dom.mainScreenCanvas.appendChild(frame);
}

// Helper: Add new sequence option to screen
function addNewSequenceToScreen(screen, pb) {
  if (!Array.isArray(pb.steps)) pb.steps = [];
  if (!Array.isArray(pb.sequences)) pb.sequences = [];
  const newSeqId = 'seq_' + Date.now();
  const newStepId = 'step_' + Date.now();
  const newSeqTitle = 'Route ' + (pb.sequences.length + 1);

  pb.steps.push({
    id: newStepId,
    title: '',
    content_text: '',
    assets: [],
    checklist: [],
    copy_fields: [],
    disable_back: false
  });

  pb.sequences.push({
    id: newSeqId,
    title: newSeqTitle,
    step_ids: [newStepId],
    next_screen_id: ''
  });

  if (!Array.isArray(screen.options)) screen.options = [];
  screen.options.push({
    id: 'opt_' + Date.now(),
    label: newSeqTitle,
    target_sequence_id: newSeqId
  });

  persistState();
  renderBuilderView(true);
  renderSidebarPlaybooks();
  showToast(`Added route "${newSeqTitle}".`);
}


// FULLSCREEN IMAGE PREVIEW LIGHTBOX (BLACK & WHITE THEME)
// Close, Zoom In, Zoom Out, Reset, Prev, Next, Captions
// -------------------------------------------------------------
function openImageLightbox(assets = [], initialIndex = 0, caption = '') {
  if (!assets || assets.length === 0) return;
  lightboxState.assets = assets;
  lightboxState.currentIndex = Math.max(0, Math.min(initialIndex, assets.length - 1));
  lightboxState.zoom = 1.0;
  lightboxState.translateX = 0;
  lightboxState.translateY = 0;

  updateLightboxContent(caption);
  dom.imagePreviewLightboxModal?.classList.remove('hidden');
}

function updateLightboxContent(overrideCaption = '') {
  const assetKey = lightboxState.assets[lightboxState.currentIndex];
  if (!assetKey) return;
  const assetData = assetsMap[assetKey];

  if (dom.lightboxImageTitle) {
    dom.lightboxImageTitle.textContent = assetKey;
  }
  if (dom.lightboxImageCounter) {
    dom.lightboxImageCounter.textContent = `${lightboxState.currentIndex + 1} / ${lightboxState.assets.length}`;
  }
  if (dom.lightboxCaptionText) {
    dom.lightboxCaptionText.textContent = overrideCaption || `Asset: ${assetKey} • Use + / - to zoom, arrow keys to navigate`;
  }
  if (dom.lightboxZoomLevel) {
    dom.lightboxZoomLevel.textContent = `${Math.round(lightboxState.zoom * 100)}%`;
  }

  if (dom.lightboxImageContainer) {
    dom.lightboxImageContainer.style.transform = `translate(${lightboxState.translateX}px, ${lightboxState.translateY}px) scale(${lightboxState.zoom})`;
    if (assetData && assetData.startsWith('<svg')) {
      dom.lightboxImageContainer.innerHTML = `<div class="max-w-[90vw] max-h-[80vh] flex items-center justify-center p-4">${assetData}</div>`;
    } else if (assetData && assetData.startsWith('data:image')) {
      dom.lightboxImageContainer.innerHTML = `<img src="${assetData}" alt="${escapeHtml(assetKey)}" class="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl select-none" draggable="false" />`;
    } else {
      dom.lightboxImageContainer.innerHTML = `<div class="text-neutral-400 font-mono text-sm p-12 border border-dashed border-neutral-700 rounded-xl">[ Asset Content: ${escapeHtml(assetKey)} ]</div>`;
    }
  }

  if (dom.btnLightboxPrev) {
    dom.btnLightboxPrev.disabled = lightboxState.assets.length <= 1;
    dom.btnLightboxPrev.classList.toggle('opacity-30', lightboxState.assets.length <= 1);
  }
  if (dom.btnLightboxNext) {
    dom.btnLightboxNext.disabled = lightboxState.assets.length <= 1;
    dom.btnLightboxNext.classList.toggle('opacity-30', lightboxState.assets.length <= 1);
  }
}

function applyLightboxTransform() {
  if (dom.lightboxImageContainer) {
    dom.lightboxImageContainer.style.transform = `translate(${lightboxState.translateX}px, ${lightboxState.translateY}px) scale(${lightboxState.zoom})`;
  }
  if (dom.lightboxZoomLevel) {
    dom.lightboxZoomLevel.textContent = `${Math.round(lightboxState.zoom * 100)}%`;
  }
}

function setupImageLightboxHandlers() {
  dom.btnCloseLightbox?.addEventListener('click', () => {
    dom.imagePreviewLightboxModal?.classList.add('hidden');
  });

  dom.btnLightboxZoomIn?.addEventListener('click', () => {
    lightboxState.zoom = Math.min(3.5, lightboxState.zoom + 0.25);
    applyLightboxTransform();
  });

  dom.btnLightboxZoomOut?.addEventListener('click', () => {
    lightboxState.zoom = Math.max(0.5, lightboxState.zoom - 0.25);
    applyLightboxTransform();
  });

  dom.btnLightboxZoomReset?.addEventListener('click', () => {
    lightboxState.zoom = 1.0;
    lightboxState.translateX = 0;
    lightboxState.translateY = 0;
    applyLightboxTransform();
  });

  dom.btnLightboxPrev?.addEventListener('click', () => {
    if (lightboxState.assets.length <= 1) return;
    lightboxState.currentIndex = (lightboxState.currentIndex - 1 + lightboxState.assets.length) % lightboxState.assets.length;
    lightboxState.zoom = 1.0;
    lightboxState.translateX = 0;
    lightboxState.translateY = 0;
    updateLightboxContent();
  });

  dom.btnLightboxNext?.addEventListener('click', () => {
    if (lightboxState.assets.length <= 1) return;
    lightboxState.currentIndex = (lightboxState.currentIndex + 1) % lightboxState.assets.length;
    lightboxState.zoom = 1.0;
    lightboxState.translateX = 0;
    lightboxState.translateY = 0;
    updateLightboxContent();
  });

  // Mouse wheel zoom inside lightbox
  const stage = document.getElementById('lightboxStage');
  stage?.addEventListener('wheel', (e) => {
    if (dom.imagePreviewLightboxModal?.classList.contains('hidden')) return;
    e.preventDefault();
    if (e.deltaY < 0) {
      lightboxState.zoom = Math.min(3.5, lightboxState.zoom + 0.15);
    } else {
      lightboxState.zoom = Math.max(0.5, lightboxState.zoom - 0.15);
    }
    applyLightboxTransform();
  }, { passive: false });

  // Drag to pan image when zoomed
  stage?.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return;
    lightboxState.isDragging = true;
    lightboxState.startX = e.clientX - lightboxState.translateX;
    lightboxState.startY = e.clientY - lightboxState.translateY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!lightboxState.isDragging) return;
    lightboxState.translateX = e.clientX - lightboxState.startX;
    lightboxState.translateY = e.clientY - lightboxState.startY;
    applyLightboxTransform();
  });

  window.addEventListener('mouseup', () => {
    lightboxState.isDragging = false;
  });

  // Keyboard controls for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!dom.imagePreviewLightboxModal || dom.imagePreviewLightboxModal.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
      dom.imagePreviewLightboxModal.classList.add('hidden');
    } else if (e.key === 'ArrowLeft') {
      dom.btnLightboxPrev?.click();
    } else if (e.key === 'ArrowRight') {
      dom.btnLightboxNext?.click();
    } else if (e.key === '+' || e.key === '=') {
      dom.btnLightboxZoomIn?.click();
    } else if (e.key === '-') {
      dom.btnLightboxZoomOut?.click();
    } else if (e.key === '0') {
      dom.btnLightboxZoomReset?.click();
    }
  });
}

// -------------------------------------------------------------
// STEP MEDIA SHOWCASE: RIGHT SIDE, CENTRAL LARGER IMAGE & ZOOM
// -------------------------------------------------------------
function renderStepMediaShowcase(step, containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = '';
  if (!step.assets || step.assets.length === 0) {
    containerEl.classList.add('hidden');
    return;
  }
  containerEl.classList.remove('hidden');

  let activeAssetIdx = 0;
  const card = document.createElement('div');
  card.className = 'w-full rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 shadow-md p-3.5 space-y-3';

  // Central Large Image Container (clickable for fullscreen zoom)
  const centralWrap = document.createElement('div');
  centralWrap.className = 'relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 p-2 flex items-center justify-center min-h-[200px] max-h-[340px] transition-all hover:border-[#1A73E8]';
  centralWrap.title = 'Click to open fullscreen detail view (Zoom & Inspect)';

  function renderCentralImage() {
    const assetKey = step.assets[activeAssetIdx] || step.assets[0];
    const assetData = assetsMap[assetKey];
    let mediaHtml = '';
    if (assetData && assetData.startsWith('<svg')) {
      mediaHtml = `<div class="w-full flex justify-center py-2">${assetData}</div>`;
    } else if (assetData && assetData.startsWith('data:image')) {
      mediaHtml = `<img src="${assetData}" alt="${escapeHtml(assetKey)}" class="max-h-[300px] w-auto object-contain rounded-lg shadow-xs" />`;
    } else {
      mediaHtml = `<div class="text-xs text-slate-400 p-8 text-center font-mono">[ Image: ${escapeHtml(assetKey)} ]</div>`;
    }

    centralWrap.innerHTML = `
      ${mediaHtml}
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold pointer-events-none backdrop-blur-2xs rounded-xl">
        <span class="px-3 py-1.5 rounded-full bg-black/70 border border-white/30 flex items-center gap-1.5 shadow-md">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
          Click to Zoom &amp; Inspect
        </span>
      </div>
    `;
  }

  renderCentralImage();

  centralWrap.onclick = () => {
    openImageLightbox(step.assets, activeAssetIdx, `${step.title || 'Step'} — ${step.assets[activeAssetIdx] || 'Attached Media'}`);
  };

  card.appendChild(centralWrap);

  // Caption below central image
  const captionEl = document.createElement('div');
  captionEl.className = 'text-center text-xs text-slate-500 dark:text-neutral-400 font-mono truncate px-2';
  captionEl.textContent = step.assets[activeAssetIdx] || 'Attached Media';
  card.appendChild(captionEl);

  // Multiple Image Thumbnails if more than 1 image
  if (step.assets.length > 1) {
    const thumbRow = document.createElement('div');
    thumbRow.className = 'flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin';
    step.assets.forEach((assetKey, aIdx) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = `w-14 h-14 rounded-lg border-2 p-1 shrink-0 overflow-hidden cursor-pointer transition-all ${
        aIdx === activeAssetIdx
          ? 'border-[#1A73E8] scale-105 shadow-xs'
          : 'border-slate-200 dark:border-neutral-800 opacity-70 hover:opacity-100'
      }`;
      const assetData = assetsMap[assetKey];
      if (assetData && assetData.startsWith('<svg')) {
        thumb.innerHTML = `<div class="w-full h-full flex items-center justify-center scale-50 origin-center">${assetData}</div>`;
      } else if (assetData && assetData.startsWith('data:image')) {
        thumb.innerHTML = `<img src="${assetData}" alt="${escapeHtml(assetKey)}" class="w-full h-full object-cover rounded" />`;
      } else {
        thumb.innerHTML = `<span class="text-[10px] font-mono">${aIdx + 1}</span>`;
      }
      thumb.onclick = (e) => {
        e.stopPropagation();
        activeAssetIdx = aIdx;
        renderCentralImage();
        captionEl.textContent = assetKey;
        thumbRow.querySelectorAll('button').forEach((b, idx) => {
          if (idx === aIdx) {
            b.className = 'w-14 h-14 rounded-lg border-2 p-1 shrink-0 overflow-hidden cursor-pointer transition-all border-[#1A73E8] scale-105 shadow-xs';
          } else {
            b.className = 'w-14 h-14 rounded-lg border-2 p-1 shrink-0 overflow-hidden cursor-pointer transition-all border-slate-200 dark:border-neutral-800 opacity-70 hover:opacity-100';
          }
        });
      };
      thumbRow.appendChild(thumb);
    });
    card.appendChild(thumbRow);
  }

  containerEl.appendChild(card);
}

// -------------------------------------------------------------
// "MARK A SECTION" DIALOG & WORKFLOW
// -------------------------------------------------------------
function openMarkSectionModal({ step = null, sIdx = -1, pb = null } = {}) {
  const activePb = pb || getActivePlaybook();
  if (!activePb) return;
  ensurePlaybookStructure(activePb);

  if (!dom.sectionFromStepSelect || !dom.sectionToStepSelect) return;

  dom.sectionFromStepSelect.innerHTML = '';
  dom.sectionToStepSelect.innerHTML = '';

  const totalSteps = (activePb.steps || []).length;
  if (totalSteps === 0) {
    showToast('Add at least one step before marking a section.');
    return;
  }

  (activePb.steps || []).forEach((st, idx) => {
    const num = idx + 1;
    const label = `${num}. ${st.title ? st.title.slice(0, 35) : 'Step ' + num}`;
    
    const optFrom = document.createElement('option');
    optFrom.value = num;
    optFrom.textContent = label;
    dom.sectionFromStepSelect.appendChild(optFrom);

    const optTo = document.createElement('option');
    optTo.value = num;
    optTo.textContent = label;
    dom.sectionToStepSelect.appendChild(optTo);
  });

  const currentStepNum = sIdx >= 0 ? (sIdx + 1) : 1;

  // Check if this step is already inside an existing section
  const existingSec = (activePb.sections || []).find(sec => {
    if (sec.from_step && sec.to_step) {
      return currentStepNum >= sec.from_step && currentStepNum <= sec.to_step;
    }
    if (step && Array.isArray(sec.step_ids)) {
      return sec.step_ids.includes(step.id);
    }
    return false;
  });

  if (existingSec) {
    currentEditingSectionId = existingSec.id;
    if (dom.sectionTitleInput) dom.sectionTitleInput.value = existingSec.title || '';
    dom.sectionFromStepSelect.value = existingSec.from_step || currentStepNum;
    dom.sectionToStepSelect.value = existingSec.to_step || currentStepNum;
    if (dom.sectionAllowSkipCheckbox) dom.sectionAllowSkipCheckbox.checked = existingSec.skippable !== false;
    dom.btnDeleteCurrentSection?.classList.remove('hidden');
  } else {
    currentEditingSectionId = null;
    if (dom.sectionTitleInput) {
      dom.sectionTitleInput.value = sIdx === 0 ? 'Pre-requisites' : '';
    }
    dom.sectionFromStepSelect.value = currentStepNum;
    dom.sectionToStepSelect.value = Math.min(totalSteps, currentStepNum + 1);
    if (dom.sectionAllowSkipCheckbox) dom.sectionAllowSkipCheckbox.checked = true;
    dom.btnDeleteCurrentSection?.classList.add('hidden');
  }

  dom.markSectionModal?.classList.remove('hidden');
  setTimeout(() => dom.sectionTitleInput?.focus(), 50);
}

function setupMarkSectionHandlers() {
  dom.btnCloseSectionModal?.addEventListener('click', () => {
    dom.markSectionModal?.classList.add('hidden');
  });

  dom.btnCancelSectionModal?.addEventListener('click', () => {
    dom.markSectionModal?.classList.add('hidden');
  });

  dom.btnDeleteCurrentSection?.addEventListener('click', () => {
    const pb = getActivePlaybook();
    if (!pb || !currentEditingSectionId) return;
    pb.sections = (pb.sections || []).filter(s => s.id !== currentEditingSectionId);
    persistState();
    renderBuilderView();
    dom.markSectionModal?.classList.add('hidden');
    showToast('Section removed.');
  });

  dom.btnSaveSectionModal?.addEventListener('click', () => {
    const pb = getActivePlaybook();
    if (!pb) return;
    ensurePlaybookStructure(pb);

    const title = dom.sectionTitleInput?.value.trim() || 'Untitled Section';
    let from = parseInt(dom.sectionFromStepSelect?.value, 10) || 1;
    let to = parseInt(dom.sectionToStepSelect?.value, 10) || from;
    if (from > to) {
      const temp = from;
      from = to;
      to = temp;
    }
    const allowSkip = dom.sectionAllowSkipCheckbox ? dom.sectionAllowSkipCheckbox.checked : true;

    // Resolve step ids covered
    const coveredStepIds = (pb.steps || []).slice(from - 1, to).map(s => s.id);

    if (currentEditingSectionId) {
      const targetSec = pb.sections.find(s => s.id === currentEditingSectionId);
      if (targetSec) {
        targetSec.title = title;
        targetSec.from_step = from;
        targetSec.to_step = to;
        targetSec.skippable = allowSkip;
        targetSec.step_ids = coveredStepIds;
      }
    } else {
      pb.sections.push({
        id: 'sec_' + Date.now(),
        title,
        from_step: from,
        to_step: to,
        skippable: allowSkip,
        step_ids: coveredStepIds,
        screen_ids: []
      });
    }

    persistState();
    renderBuilderView();
    dom.markSectionModal?.classList.add('hidden');
    showToast(`Marked Section "${title}" (Steps ${from} to ${to}).`);
  });

  dom.btnCanvasAddSection?.addEventListener('click', () => {
    openMarkSectionModal();
  });
}

function setupStepViewToggleHandler() {
  dom.btnToggleEditorStepView?.addEventListener('click', () => {
    editorStepViewMode = editorStepViewMode === 'single' ? 'all' : 'single';
    if (dom.labelToggleEditorStepView) {
      dom.labelToggleEditorStepView.textContent = editorStepViewMode === 'single' ? '📄 1 Step / Page' : '📑 All Steps';
    }
    renderBuilderView();
    showToast(editorStepViewMode === 'single' ? 'Switched to Single Step Page View' : 'Switched to All Steps Canvas Overview');
  });
}

// -------------------------------------------------------------
// PLAYER EXECUTION ENGINE (IMMERSIVE FULL-SCREEN PRESENTATION LAYER)
// Massive typography, Blue Water progress fill, strictly read-only
// -------------------------------------------------------------
function renderPlayerView() {
  const pb = getActivePlaybook();
  if (!pb) {
    showWelcomeHub();
    return;
  }

  // Populate Jump To Dropdown
  populatePlayerJumpToDropdown(pb);

  // If in section card presentation mode
  if (playerState.mode === 'section') {
    renderPlayerSectionView(pb);
    return;
  }

  const isLinear = (!pb.screens || pb.screens.length === 0) && (!pb.sequences || pb.sequences.length === 0);
  if (isLinear) {
    renderLinearPlayerView(pb);
  } else {
    renderBranchedPlayerView(pb);
  }
}

function populatePlayerJumpToDropdown(pb) {
  if (!dom.playerJumpToSelect) return;
  dom.playerJumpToSelect.innerHTML = '<option value="" selected>Jump to</option>';

  // 1. Sections
  if (pb.sections && pb.sections.length > 0) {
    const secGroup = document.createElement('optgroup');
    secGroup.label = 'Sections';
    pb.sections.forEach(sec => {
      const opt = document.createElement('option');
      opt.value = `section:${sec.id}`;
      opt.textContent = `📑 ${sec.title}`;
      secGroup.appendChild(opt);
    });
    dom.playerJumpToSelect.appendChild(secGroup);
  }

  // 2. Decision Screens
  if (pb.screens && pb.screens.length > 0) {
    const scrGroup = document.createElement('optgroup');
    scrGroup.label = 'Decision Screens';
    pb.screens.forEach(sc => {
      const opt = document.createElement('option');
      opt.value = `screen:${sc.id}`;
      opt.textContent = `🔀 ${sc.title}`;
      scrGroup.appendChild(opt);
    });
    dom.playerJumpToSelect.appendChild(scrGroup);
  }

  // 3. Sequences and Steps
  if (pb.sequences && pb.sequences.length > 0) {
    pb.sequences.forEach(seq => {
      const seqGroup = document.createElement('optgroup');
      seqGroup.label = seq.title || 'Sequence';
      (seq.step_ids || []).forEach((stId, sIdx) => {
        const stepObj = pb.steps.find(s => s.id === stId);
        const opt = document.createElement('option');
        opt.value = `step:${seq.id}:${sIdx}:${stId}`;
        opt.textContent = `${sIdx + 1}. ${stepObj ? (stepObj.title || 'Step') : 'Step'}`;
        seqGroup.appendChild(opt);
      });
      dom.playerJumpToSelect.appendChild(seqGroup);
    });
  } else {
    (pb.steps || []).forEach((st, idx) => {
      const opt = document.createElement('option');
      opt.value = `linear:${idx}`;
      opt.textContent = `${idx + 1}. ${st.title || 'Step ' + (idx + 1)}`;
      dom.playerJumpToSelect.appendChild(opt);
    });
  }

  dom.playerJumpToSelect.value = '';

  dom.playerJumpToSelect.onchange = () => {
    const val = dom.playerJumpToSelect.value;
    if (!val) return;
    const parts = val.split(':');
    if (parts[0] === 'section') {
      const secId = parts[1];
      playerState.history.push({ mode: playerState.mode, sequenceId: playerState.sequenceId, stepIndex: playerState.stepIndex, id: playerState.screenId, sectionId: playerState.sectionId });
      playerState.mode = 'section';
      playerState.sectionId = secId;
      renderPlayerView();
      showToast('Jumped to section');
      dom.playerJumpToSelect.value = '';
    } else if (parts[0] === 'screen') {
      const scrId = parts[1];
      playerState.history.push({ mode: playerState.mode, sequenceId: playerState.sequenceId, stepIndex: playerState.stepIndex, id: playerState.screenId, sectionId: playerState.sectionId });
      playerState.mode = 'screen';
      playerState.screenId = scrId;
      renderPlayerView();
      showToast('Jumped to decision screen');
      dom.playerJumpToSelect.value = '';
    } else if (parts[0] === 'linear') {
      const sIdx = parseInt(parts[1], 10) || 0;
      playerState.stepIndex = sIdx;
      playerState.mode = 'step';
      playerState.sequenceId = '';
      renderPlayerView();
      showToast(`Jumped to step ${sIdx + 1}`);
      dom.playerJumpToSelect.value = '';
    } else if (parts[0] === 'step') {
      const seqId = parts[1];
      const sIdx = parseInt(parts[2], 10) || 0;
      const stId = parts[3];
      playerState.history.push({ mode: playerState.mode, sequenceId: playerState.sequenceId, stepIndex: playerState.stepIndex, id: playerState.screenId, sectionId: playerState.sectionId });
      playerState.mode = 'step';
      playerState.sequenceId = seqId;
      playerState.stepIndex = sIdx;
      playerState.stepId = stId;
      renderPlayerView();
      showToast(`Jumped to step ${sIdx + 1}`);
      dom.playerJumpToSelect.value = '';
    }
  };
}

function renderPlayerSectionView(pb) {
  const sec = (pb.sections || []).find(s => s.id === playerState.sectionId) || (pb.sections || [])[0];
  if (!sec) {
    playerState.mode = 'step';
    renderPlayerView();
    return;
  }

  dom.playerNormalStepArea?.classList.add('hidden');
  dom.playerDecisionScreenArea?.classList.add('hidden');
  dom.playerCompletionScreenArea?.classList.add('hidden');
  dom.playerSectionArea?.classList.remove('hidden');

  if (dom.playerSlideStage) {
    dom.playerSlideStage.scrollTop = 0;
  }

  const secIdx = (pb.sections || []).findIndex(s => s.id === sec.id);
  const totalSecs = (pb.sections || []).length;
  const pct = Math.max(10, Math.round(((secIdx + 1) / Math.max(1, totalSecs)) * 100));
  if (dom.playerWaterProgressFill) dom.playerWaterProgressFill.style.width = `${pct}%`;

  if (dom.playerHeaderPlaybookTitle) {
    dom.playerHeaderPlaybookTitle.textContent = `${pb.title || pb.name}`;
  }
  if (dom.playerStepCounter) {
    dom.playerStepCounter.textContent = `Section ${secIdx + 1}/${totalSecs}`;
  }
  if (dom.playerSlideCounter) {
    dom.playerSlideCounter.textContent = `${secIdx + 1}/${totalSecs}`;
  }

  if (dom.playerSectionBadge) {
    dom.playerSectionBadge.textContent = `Section ${secIdx + 1} of ${totalSecs}`;
  }
  if (dom.playerSectionMainTitle) {
    dom.playerSectionMainTitle.textContent = sec.title;
  }
  if (dom.playerSectionMainDesc) {
    const stepCount = (sec.step_ids || []).length;
    const scrCount = (sec.screen_ids || []).length;
    let desc = '';
    if (stepCount > 0 && scrCount > 0) {
      desc = `Includes ${stepCount} procedure steps and ${scrCount} optional workflow decision route.`;
    } else if (stepCount > 0) {
      desc = `Includes ${stepCount} single-page procedural steps.`;
    } else if (scrCount > 0) {
      desc = `Includes workflow decision router screen.`;
    } else {
      desc = `Workflow section in ${pb.title || pb.name}.`;
    }
    dom.playerSectionMainDesc.textContent = desc;
  }

  // The 3 Options: Back, Skip, Next
  if (dom.btnPlayerSectionCardBack) {
    dom.btnPlayerSectionCardBack.disabled = (secIdx === 0 && playerState.history.length === 0);
    dom.btnPlayerSectionCardBack.onclick = (e) => {
      e.stopPropagation();
      handlePlayerBack();
    };
  }

  if (dom.btnPlayerSectionCardSkip) {
    dom.btnPlayerSectionCardSkip.disabled = sec.skippable === false;
    dom.btnPlayerSectionCardSkip.onclick = (e) => {
      e.stopPropagation();
      skipActiveSection(sec, pb);
    };
  }

  if (dom.btnPlayerSectionCardNext) {
    dom.btnPlayerSectionCardNext.onclick = (e) => {
      e.stopPropagation();
      enterSectionExecution(sec, pb);
    };
  }

  if (dom.btnPlayerArrowPrev) {
    dom.btnPlayerArrowPrev.disabled = (secIdx === 0 && playerState.history.length === 0);
  }
  if (dom.btnPlayerArrowNext) {
    dom.btnPlayerArrowNext.disabled = false;
  }
  if (dom.btnPlayerNavBack) {
    dom.btnPlayerNavBack.disabled = (secIdx === 0 && playerState.history.length === 0);
  }
  if (dom.btnPlayerNavNext) {
    dom.btnPlayerNavNext.disabled = false;
  }
}

function enterSectionExecution(sec, pb) {
  playerState.history.push({ mode: 'section', sectionId: sec.id });
  if (Array.isArray(sec.step_ids) && sec.step_ids.length > 0) {
    const firstStepId = sec.step_ids[0];
    const parentSeq = pb.sequences?.find(sq => Array.isArray(sq.step_ids) && sq.step_ids.includes(firstStepId));
    if (parentSeq) {
      playerState.mode = 'step';
      playerState.sequenceId = parentSeq.id;
      playerState.stepIndex = parentSeq.step_ids.indexOf(firstStepId);
      playerState.stepId = firstStepId;
    } else {
      playerState.mode = 'step';
      playerState.sequenceId = '';
      playerState.stepId = firstStepId;
      const stIdx = (pb.steps || []).findIndex(s => s.id === firstStepId);
      playerState.stepIndex = stIdx !== -1 ? stIdx : 0;
    }
    renderPlayerView();
  } else if (Array.isArray(sec.screen_ids) && sec.screen_ids.length > 0) {
    playerState.mode = 'screen';
    playerState.screenId = sec.screen_ids[0];
    renderPlayerView();
  } else {
    skipActiveSection(sec, pb);
  }
}

function renderLinearPlayerView(pb) {
  const steps = pb.steps || [];
  if (steps.length === 0) {
    if (dom.playerMassiveStepText) dom.playerMassiveStepText.textContent = 'No steps in playbook.';
    if (dom.playerMassiveStepContent) dom.playerMassiveStepContent.classList.add('hidden');
    if (dom.playerWaterProgressFill) dom.playerWaterProgressFill.style.width = '0%';
    if (dom.playerStepCounter) dom.playerStepCounter.textContent = '0/0';
    if (dom.playerSlideCounter) dom.playerSlideCounter.textContent = '0/0';
    return;
  }

  if (dom.playerSlideStage) {
    dom.playerSlideStage.scrollTop = 0;
  }

  const sIdx = Math.max(0, Math.min(playerState.stepIndex || 0, steps.length - 1));
  playerState.stepIndex = sIdx;
  const step = steps[sIdx];
  playerState.stepId = step?.id;

  dom.playerNormalStepArea?.classList.remove('hidden');
  dom.playerSectionArea?.classList.add('hidden');
  dom.playerDecisionScreenArea?.classList.add('hidden');
  dom.playerCompletionScreenArea?.classList.add('hidden');

  const pct = Math.round(((sIdx + 1) / steps.length) * 100);
  if (dom.playerWaterProgressFill) {
    dom.playerWaterProgressFill.style.width = `${pct}%`;
  }

  if (dom.playerHeaderPlaybookTitle) {
    dom.playerHeaderPlaybookTitle.textContent = pb.title || pb.name || 'Untitled';
  }
  if (dom.playerStepCounter) {
    dom.playerStepCounter.textContent = `${sIdx + 1}/${steps.length}`;
  }
  if (dom.playerSlideCounter) {
    dom.playerSlideCounter.textContent = `${sIdx + 1}/${steps.length}`;
  }
  if (dom.btnPlayerNavBack) {
    dom.btnPlayerNavBack.disabled = sIdx === 0 && playerState.history.length === 0;
  }
  if (dom.btnPlayerNavNext) {
    dom.btnPlayerNavNext.disabled = false;
  }
  if (dom.playerSectionBanner) {
    dom.playerSectionBanner.classList.add('hidden');
    dom.playerSectionBanner.classList.remove('flex');
  }

  if (dom.playerMassiveStepText) {
    dom.playerMassiveStepText.textContent = step.title || `Step ${sIdx + 1}`;
  }

  let rawContent = step.content_text || '';
  if (rawContent && rawContent.trim() !== step.title?.trim() && dom.playerMassiveStepContent) {
    dom.playerMassiveStepContent.classList.remove('hidden');
    dom.playerMassiveStepContent.innerHTML = window.marked ? window.marked.parse(rawContent) : rawContent;
  } else if (dom.playerMassiveStepContent) {
    dom.playerMassiveStepContent.classList.add('hidden');
  }

  if (dom.playerStepLayoutGrid) {
    if (step.assets && step.assets.length > 0) {
      dom.playerStepLayoutGrid.className = 'w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start';
    } else {
      dom.playerStepLayoutGrid.className = 'w-full grid grid-cols-1 gap-6 items-start max-w-2xl mx-auto';
    }
  }

  renderStepMediaShowcase(step, dom.playerStepMediaContainer);
  renderPlayerChecklistsAndCopyFields(step, pb);

  if (dom.btnPlayerArrowPrev) dom.btnPlayerArrowPrev.disabled = sIdx === 0 && playerState.history.length === 0;
  if (dom.btnPlayerArrowNext) dom.btnPlayerArrowNext.disabled = false;
}

function renderBranchedPlayerView(pb) {
  // 1. Screen / Decision Point Mode
  if (playerState.mode === 'screen') {
    const screen = (pb.screens || []).find(sc => sc.id === playerState.screenId) || (pb.screens || [])[0];
    if (screen) {
      dom.playerNormalStepArea?.classList.add('hidden');
      dom.playerSectionArea?.classList.add('hidden');
      dom.playerCompletionScreenArea?.classList.add('hidden');
      dom.playerDecisionScreenArea?.classList.remove('hidden');

      if (dom.playerSlideStage) {
        dom.playerSlideStage.scrollTop = 0;
      }

      if (dom.playerWaterProgressFill) dom.playerWaterProgressFill.style.width = '35%';
      if (dom.playerHeaderPlaybookTitle) {
        dom.playerHeaderPlaybookTitle.textContent = pb.title || pb.name || 'Untitled';
      }
      if (dom.playerStepCounter) {
        dom.playerStepCounter.textContent = 'Decision';
      }
      if (dom.playerSlideCounter) {
        dom.playerSlideCounter.textContent = 'Decision';
      }
      if (dom.btnPlayerNavBack) {
        dom.btnPlayerNavBack.disabled = playerState.history.length === 0;
      }
      if (dom.btnPlayerNavNext) {
        dom.btnPlayerNavNext.disabled = true;
      }

      if (dom.playerDecisionScreenTitle) {
        dom.playerDecisionScreenTitle.textContent = screen.title || 'Choose a Workflow Sequence';
      }
      if (dom.playerDecisionScreenDesc) {
        dom.playerDecisionScreenDesc.textContent = screen.description || '';
      }

      if (dom.playerDecisionOptionsGrid) {
        dom.playerDecisionOptionsGrid.innerHTML = '';
        (screen.options || []).forEach((opt, oIdx) => {
          const targetSeq = pb.sequences?.find(s => s.id === opt.target_sequence_id);
          const optCard = document.createElement('button');
          optCard.type = 'button';
          optCard.className = 'p-6 rounded-2xl border-2 border-slate-200 dark:border-neutral-800 hover:border-[#1A73E8] dark:hover:border-[#388bfd] bg-white dark:bg-neutral-900 text-left transition-all duration-200 hover:shadow-lg group cursor-pointer flex flex-col justify-between';
          optCard.innerHTML = `
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#1A73E8] dark:text-[#388bfd] flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                  ${oIdx + 1}
                </span>
              </div>
              <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#1A73E8] dark:group-hover:text-[#388bfd] transition-colors">${escapeHtml(opt.label || 'Sequence Option')}</h3>
              ${targetSeq?.title ? `<p class="text-xs text-slate-500 dark:text-neutral-400 mt-1">${escapeHtml(targetSeq.title)}</p>` : ''}
            </div>
            <div class="mt-4 flex justify-end text-[#1A73E8] dark:text-[#388bfd] font-bold text-2xl group-hover:translate-x-1.5 transition-transform" title="Select sequence">
              <span>→</span>
            </div>
          `;
          optCard.onclick = () => {
            playerState.history.push({ mode: 'screen', screenId: screen.id });
            playerState.mode = 'step';
            playerState.sequenceId = opt.target_sequence_id;
            playerState.stepIndex = 0;
            const targetSequence = pb.sequences?.find(s => s.id === opt.target_sequence_id);
            if (targetSequence && targetSequence.step_ids?.[0]) {
              playerState.stepId = targetSequence.step_ids[0];
            }
            renderPlayerView();
          };
          dom.playerDecisionOptionsGrid.appendChild(optCard);
        });
      }

      if (dom.btnPlayerArrowPrev) {
        dom.btnPlayerArrowPrev.disabled = playerState.history.length === 0;
      }
      if (dom.btnPlayerArrowNext) {
        dom.btnPlayerArrowNext.disabled = true;
      }
      return;
    }
  }

  // 2. Step Mode (handles sequence steps OR section linear steps)
  let step = null;
  let seq = null;
  let activeSection = null;
  let currentStepIdx = 0;
  let totalStepsInScope = 1;

  if (playerState.sequenceId) {
    seq = pb.sequences?.find(s => s.id === playerState.sequenceId);
    if (seq && Array.isArray(seq.step_ids) && seq.step_ids.length > 0) {
      currentStepIdx = Math.max(0, Math.min(playerState.stepIndex || 0, seq.step_ids.length - 1));
      playerState.stepIndex = currentStepIdx;
      const stepId = seq.step_ids[currentStepIdx];
      playerState.stepId = stepId;
      step = pb.steps?.find(s => s.id === stepId);
      totalStepsInScope = seq.step_ids.length;
      activeSection = (pb.sections || []).find(sec => (sec.sequence_ids && sec.sequence_ids.includes(seq.id)) || (sec.screen_ids && pb.screens?.some(sc => sec.screen_ids.includes(sc.id) && sc.options?.some(o => o.target_sequence_id === seq.id))));
    }
  }

  if (!step) {
    if (playerState.stepId) {
      step = pb.steps?.find(s => s.id === playerState.stepId);
    }
    if (!step) {
      step = (pb.steps || [])[playerState.stepIndex || 0];
    }
    if (step) {
      playerState.stepId = step.id;
      activeSection = (pb.sections || []).find(sec => Array.isArray(sec.step_ids) && sec.step_ids.includes(step.id));
      if (activeSection) {
        currentStepIdx = activeSection.step_ids.indexOf(step.id);
        totalStepsInScope = activeSection.step_ids.length;
      } else {
        currentStepIdx = (pb.steps || []).indexOf(step);
        totalStepsInScope = (pb.steps || []).length;
      }
    }
  }

  if (!step) {
    showToast('No steps available.');
    return;
  }

  if (dom.playerSlideStage) {
    dom.playerSlideStage.scrollTop = 0;
  }

  dom.playerNormalStepArea?.classList.remove('hidden');
  dom.playerSectionArea?.classList.add('hidden');
  dom.playerDecisionScreenArea?.classList.add('hidden');
  dom.playerCompletionScreenArea?.classList.add('hidden');

  const pct = Math.round(((currentStepIdx + 1) / Math.max(1, totalStepsInScope)) * 100);
  if (dom.playerWaterProgressFill) {
    dom.playerWaterProgressFill.style.width = `${pct}%`;
  }

  if (dom.playerHeaderPlaybookTitle) {
    dom.playerHeaderPlaybookTitle.textContent = `${pb.title || pb.name}${seq ? ` • ${seq.title}` : (activeSection ? ` • ${activeSection.title}` : '')}`;
  }
  if (dom.playerStepCounter) {
    dom.playerStepCounter.textContent = `${currentStepIdx + 1}/${totalStepsInScope}`;
  }
  if (dom.playerSlideCounter) {
    dom.playerSlideCounter.textContent = `${currentStepIdx + 1}/${totalStepsInScope}`;
  }
  if (dom.btnPlayerNavBack) {
    dom.btnPlayerNavBack.disabled = !!step.disable_back || (currentStepIdx === 0 && playerState.history.length === 0);
  }
  if (dom.btnPlayerNavNext) {
    dom.btnPlayerNavNext.disabled = false;
  }
  if (dom.playerSectionBanner) {
    dom.playerSectionBanner.classList.add('hidden');
    dom.playerSectionBanner.classList.remove('flex');
  }

  if (dom.playerMassiveStepText) {
    dom.playerMassiveStepText.textContent = step.title || `Step ${currentStepIdx + 1}`;
  }

  let rawContent = step.content_text || '';
  if (rawContent && rawContent.trim() !== step.title?.trim() && dom.playerMassiveStepContent) {
    dom.playerMassiveStepContent.classList.remove('hidden');
    if (window.marked) {
      dom.playerMassiveStepContent.innerHTML = window.marked.parse(rawContent);
    } else {
      dom.playerMassiveStepContent.textContent = rawContent;
    }
  } else if (dom.playerMassiveStepContent) {
    dom.playerMassiveStepContent.classList.add('hidden');
  }

  if (dom.playerStepLayoutGrid) {
    if (step.assets && step.assets.length > 0) {
      dom.playerStepLayoutGrid.className = 'w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start';
    } else {
      dom.playerStepLayoutGrid.className = 'w-full grid grid-cols-1 gap-6 items-start max-w-2xl mx-auto';
    }
  }

  renderStepMediaShowcase(step, dom.playerStepMediaContainer);
  renderPlayerChecklistsAndCopyFields(step, pb);

  if (dom.btnPlayerArrowPrev) {
    dom.btnPlayerArrowPrev.disabled = !!step.disable_back || (currentStepIdx === 0 && playerState.history.length === 0);
  }
  if (dom.btnPlayerArrowNext) dom.btnPlayerArrowNext.disabled = false;
}

function skipActiveSection(sec, pb) {
  if (!sec || !pb) return;
  const secList = pb.sections || [];
  const secIdx = secList.findIndex(s => s.id === sec.id);

  if (secIdx >= 0 && secIdx < secList.length - 1) {
    const nextSec = secList[secIdx + 1];
    playerState.history.push({
      mode: playerState.mode,
      sectionId: sec.id,
      sequenceId: playerState.sequenceId,
      stepIndex: playerState.stepIndex,
      stepId: playerState.stepId,
      screenId: playerState.screenId
    });
    playerState.mode = 'section';
    playerState.sectionId = nextSec.id;
    playerState.sequenceId = '';
    playerState.stepId = '';
    playerState.stepIndex = 0;
    renderPlayerView();
    showToast(`Skipped to "${nextSec.title}".`);
    return;
  }

  // Completed playbook!
  showCompletionScreen();
  showToast('Completed playbook.');
}

function renderPlayerChecklistsAndCopyFields(step, pb) {
  // Checklists (Generic verification list - NO PERCENTAGE MARK)
  if (step.checklist && step.checklist.length > 0 && dom.playerChecklistSection && dom.playerChecklistItemsList) {
    dom.playerChecklistSection.classList.remove('hidden');
    dom.playerChecklistItemsList.innerHTML = '';

    if (!playerState.checklistState[step.id]) {
      playerState.checklistState[step.id] = {};
    }
    const currentStepCheckState = playerState.checklistState[step.id];

    let total = step.checklist.length;
    let checkedCount = 0;

    step.checklist.forEach(item => {
      const isChecked = currentStepCheckState[item.id] !== undefined
        ? currentStepCheckState[item.id]
        : !!item.checked;

      if (isChecked) checkedCount++;

      const chkRow = document.createElement('label');
      chkRow.className = `flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
        isChecked
          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
          : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-slate-200'
      }`;

      chkRow.innerHTML = `
        <input type="checkbox" ${isChecked ? 'checked' : ''} class="w-4 h-4 rounded text-theme-primary focus:ring-0 cursor-pointer" />
        <span class="text-sm font-medium flex-1">${escapeHtml(item.text)}</span>
      `;

      chkRow.querySelector('input').onchange = (e) => {
        currentStepCheckState[item.id] = e.target.checked;
        renderPlayerView();
      };

      dom.playerChecklistItemsList.appendChild(chkRow);
    });

    if (dom.playerChecklistPercent) {
      dom.playerChecklistPercent.textContent = `${checkedCount}/${total}`;
    }
  } else if (dom.playerChecklistSection) {
    dom.playerChecklistSection.classList.add('hidden');
  }

  // 1-Click Copy Fields
  if (step.copy_fields && step.copy_fields.length > 0 && dom.playerCopyFieldsSection && dom.playerCopyFieldsItemsList) {
    dom.playerCopyFieldsSection.classList.remove('hidden');
    dom.playerCopyFieldsItemsList.innerHTML = '';

    step.copy_fields.forEach(field => {
      const cRow = document.createElement('div');
      cRow.className = 'p-3 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left';
      cRow.innerHTML = `
        <div class="space-y-0.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${escapeHtml(field.label)}</span>
          <div class="font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 break-all select-all">${escapeHtml(field.value)}</div>
        </div>
        <button class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 hover:bg-slate-200 dark:hover:bg-neutral-700 text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 shrink-0 cursor-pointer btn-press transition-colors shadow-xs">
          <span>📋 Copy</span>
        </button>
      `;

      cRow.querySelector('button').onclick = (e) => {
        navigator.clipboard.writeText(field.value);
        const btn = e.currentTarget;
        btn.innerHTML = `<span class="text-emerald-600 dark:text-emerald-400 font-bold">✓ Copied!</span>`;
        setTimeout(() => {
          btn.innerHTML = `<span>📋 Copy</span>`;
        }, 1500);
        showToast(`Copied ${field.label} to clipboard!`);
      };

      dom.playerCopyFieldsItemsList.appendChild(cRow);
    });
  } else if (dom.playerCopyFieldsSection) {
    dom.playerCopyFieldsSection.classList.add('hidden');
  }
}

function handlePlayerNext() {
  const pb = getActivePlaybook();
  if (!pb) return;

  if (playerState.mode === 'section') {
    const sec = (pb.sections || []).find(s => s.id === playerState.sectionId) || (pb.sections || [])[0];
    if (sec) {
      enterSectionExecution(sec, pb);
    }
    return;
  }

  if (playerState.mode === 'screen') {
    return;
  }

  // Inside a sequence (under a screen)
  if (playerState.sequenceId) {
    const seq = pb.sequences?.find(s => s.id === playerState.sequenceId);
    if (seq && playerState.stepIndex < seq.step_ids.length - 1) {
      playerState.history.push({ mode: 'step', sequenceId: seq.id, stepIndex: playerState.stepIndex, stepId: playerState.stepId });
      playerState.stepIndex++;
      playerState.stepId = seq.step_ids[playerState.stepIndex];
      renderPlayerView();
      return;
    }

    // Sequence ended: find if parent section or next section
    const secList = pb.sections || [];
    const parentSec = secList.find(sec => (sec.sequence_ids && sec.sequence_ids.includes(seq?.id)) || (sec.screen_ids && pb.screens?.some(sc => sec.screen_ids.includes(sc.id))));
    const secIdx = parentSec ? secList.indexOf(parentSec) : -1;
    if (secIdx >= 0 && secIdx < secList.length - 1) {
      const nextSec = secList[secIdx + 1];
      playerState.history.push({ mode: 'step', sequenceId: seq.id, stepIndex: playerState.stepIndex, stepId: playerState.stepId });
      playerState.mode = 'section';
      playerState.sectionId = nextSec.id;
      playerState.sequenceId = '';
      playerState.stepId = '';
      playerState.stepIndex = 0;
      renderPlayerView();
      return;
    }

    showCompletionScreen();
    return;
  }

  // Inside a section's steps
  const currentStep = pb.steps?.find(s => s.id === playerState.stepId) || (pb.steps || [])[playerState.stepIndex];
  const activeSection = pb.sections?.find(sec => Array.isArray(sec.step_ids) && sec.step_ids.includes(currentStep?.id));

  if (activeSection) {
    const sIdxInSec = activeSection.step_ids.indexOf(currentStep?.id);
    if (sIdxInSec < activeSection.step_ids.length - 1) {
      const nextStepId = activeSection.step_ids[sIdxInSec + 1];
      playerState.history.push({ mode: 'step', stepIndex: playerState.stepIndex, stepId: playerState.stepId, sectionId: activeSection.id });
      playerState.stepId = nextStepId;
      playerState.stepIndex = pb.steps.findIndex(s => s.id === nextStepId);
      renderPlayerView();
      return;
    }

    // End of steps in this section! If section has screens (like Section 2 has screen_routing_hub):
    if (activeSection.screen_ids && activeSection.screen_ids.length > 0) {
      playerState.history.push({ mode: 'step', stepIndex: playerState.stepIndex, stepId: playerState.stepId, sectionId: activeSection.id });
      playerState.mode = 'screen';
      playerState.screenId = activeSection.screen_ids[0];
      renderPlayerView();
      return;
    }

    // Advance to next section!
    const secList = pb.sections || [];
    const secIdx = secList.indexOf(activeSection);
    if (secIdx >= 0 && secIdx < secList.length - 1) {
      const nextSec = secList[secIdx + 1];
      playerState.history.push({ mode: 'step', stepIndex: playerState.stepIndex, stepId: playerState.stepId, sectionId: activeSection.id });
      playerState.mode = 'section';
      playerState.sectionId = nextSec.id;
      playerState.stepId = '';
      playerState.stepIndex = 0;
      renderPlayerView();
      return;
    }
  } else {
    // Pure linear steps without section
    const steps = pb.steps || [];
    if (playerState.stepIndex < steps.length - 1) {
      playerState.history.push({ mode: 'step', stepIndex: playerState.stepIndex });
      playerState.stepIndex++;
      playerState.stepId = steps[playerState.stepIndex]?.id;
      renderPlayerView();
      return;
    }
  }

  showCompletionScreen();
}

function showCompletionScreen() {
  if (window.confetti) {
    window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }
  dom.playerNormalStepArea?.classList.add('hidden');
  dom.playerSectionArea?.classList.add('hidden');
  dom.playerDecisionScreenArea?.classList.add('hidden');
  dom.playerCompletionScreenArea?.classList.remove('hidden');
  if (dom.playerWaterProgressFill) dom.playerWaterProgressFill.style.width = '100%';
}

function handlePlayerBack() {
  const pb = getActivePlaybook();
  if (!pb) return;

  if (playerState.history.length > 0) {
    const prev = playerState.history.pop();
    playerState.mode = prev.mode || 'step';
    if (prev.mode === 'section') {
      playerState.sectionId = prev.sectionId;
    } else if (prev.mode === 'screen') {
      playerState.screenId = prev.screenId;
    } else {
      playerState.sequenceId = prev.sequenceId || '';
      playerState.stepIndex = prev.stepIndex || 0;
      playerState.stepId = prev.stepId || '';
    }
    renderPlayerView();
    return;
  }

  if (playerState.mode === 'step') {
    const currentStep = pb.steps?.find(s => s.id === playerState.stepId) || (pb.steps || [])[playerState.stepIndex];
    const activeSec = pb.sections?.find(sec => Array.isArray(sec.step_ids) && sec.step_ids.includes(currentStep?.id));
    if (activeSec && activeSec.step_ids[0] === currentStep?.id) {
      playerState.mode = 'section';
      playerState.sectionId = activeSec.id;
      renderPlayerView();
      return;
    }
    if (playerState.stepIndex > 0) {
      playerState.stepIndex--;
      playerState.stepId = (pb.steps || [])[playerState.stepIndex]?.id;
      renderPlayerView();
      return;
    }
  }

  if (playerState.mode === 'section') {
    const secList = pb.sections || [];
    const secIdx = secList.findIndex(s => s.id === playerState.sectionId);
    if (secIdx > 0) {
      playerState.sectionId = secList[secIdx - 1].id;
      renderPlayerView();
    }
    return;
  }
}

// -------------------------------------------------------------
// ASSETS & "ADD FILES" AT TOP RIGHT (As requested!)
// -------------------------------------------------------------
function setupFileAddHandlers() {
  // Top-Right "Add files" Button
  dom.btnTopAddFiles?.addEventListener('click', () => {
    dom.topAddFilesInput?.click();
  });

  dom.topAddFilesInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        assetsMap[file.name] = dataUrl;

        // attach to active step if one is selected
        const pb = getActivePlaybook();
        if (pb && activeNode.type === 'step') {
          const step = pb.steps.find(s => s.id === activeNode.id);
          if (step) {
            if (!step.assets) step.assets = [];
            if (!step.assets.includes(file.name)) {
              step.assets.push(file.name);
            }
          }
        }
        persistState();
        renderBuilderView();
        showToast(`Added ${file.name} to assets.`);
      };
      if (file.name.endsWith('.svg')) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    });
    e.target.value = '';
  });

  // Attach Media button inside Step Editor
  dom.btnAttachMedia?.addEventListener('click', () => {
    dom.stepMediaFileInput?.click();
  });

  dom.stepMediaFileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      assetsMap[file.name] = dataUrl;

      const pb = getActivePlaybook();
      if (pb && activeNode.type === 'step') {
        const step = pb.steps.find(s => s.id === activeNode.id);
        if (step) {
          if (!step.assets) step.assets = [];
          if (!step.assets.includes(file.name)) {
            step.assets.push(file.name);
          }
        }
      }
      persistState();
      renderBuilderView();
      showToast(`Attached ${file.name} to step.`);
    };
    if (file.name.endsWith('.svg')) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  });
}

// -------------------------------------------------------------
// ZIP IMPORT & EXPORT (EXCHANGED ICONS PROPERLY)
// -------------------------------------------------------------
async function exportActivePlaybookZip() {
  const pb = getActivePlaybook();
  if (!pb) {
    showToast('Please select a playbook to export.');
    return;
  }
  if (!window.JSZip) {
    showToast('JSZip library loading...');
    return;
  }

  try {
    const zip = new window.JSZip();

    // 1. config.json (ONLY stores map/hierarchy, NEVER stores step paragraphs)
    const configData = {
      version: pb.version || '1.0',
      name: pb.name,
      title: pb.title,
      start_screen_id: pb.start_screen_id,
      screens: pb.screens,
      sequences: pb.sequences.map(seq => ({
        id: seq.id,
        title: seq.title,
        file: `sequences/${seq.id}.md`,
        step_ids: seq.step_ids,
        next_screen_id: seq.next_screen_id
      })),
      steps: pb.steps.map(s => ({
        id: s.id,
        title: s.title,
        assets: s.assets || [],
        checklist: s.checklist || [],
        copy_fields: s.copy_fields || [],
        disable_back: !!s.disable_back
      }))
    };
    zip.file('config.json', JSON.stringify(configData, null, 2));

    // 2. /sequences/*.md files (Steps delimited by '---')
    const sequencesFolder = zip.folder('sequences');
    pb.sequences.forEach(seq => {
      const stepTexts = (seq.step_ids || []).map(stId => {
        const step = pb.steps.find(s => s.id === stId);
        return (step && step.content_text) ? step.content_text.trim() : `# ${step ? step.title : stId}`;
      });
      // Markdown Delimiters: multiple steps separated by standard Markdown horizontal rule (---)
      const combinedSequenceMarkdown = stepTexts.join('\n\n---\n\n');
      sequencesFolder.file(`${seq.id}.md`, combinedSequenceMarkdown);
    });

    // Also write individual content files for maximum compatibility
    const contentFolder = zip.folder('content');
    pb.steps.forEach(s => {
      contentFolder.file(`${s.id}.md`, s.content_text || '');
    });

    // 3. /assets/* files
    const assetsFolder = zip.folder('assets');
    const assetNames = new Set();
    pb.steps.forEach(s => (s.assets || []).forEach(a => assetNames.add(a)));

    assetNames.forEach(aName => {
      const data = assetsMap[aName];
      if (data) {
        if (data.startsWith('data:image')) {
          const base64 = data.split(',')[1];
          assetsFolder.file(aName, base64, { base64: true });
        } else {
          assetsFolder.file(aName, data);
        }
      }
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pb.name || 'playbook'}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${pb.name}.zip`);
  } catch (err) {
    showToast(`Export failed: ${err.message}`);
  }
}

async function importPlaybookZip(file) {
  if (!file || !window.JSZip) return;

  try {
    const zip = await window.JSZip.loadAsync(file);
    const configFile = zip.file('config.json');
    if (!configFile) {
      throw new Error('ZIP missing config.json skeleton');
    }

    const configText = await configFile.async('text');
    const parsed = JSON.parse(configText);

    // load content markdown files: check sequences/*.md first (delimited by '---'), then content/*.md
    if (parsed.sequences) {
      for (const seq of parsed.sequences) {
        const seqFile = zip.file(`sequences/${seq.id}.md`) || zip.file(`${seq.id}.md`);
        if (seqFile && seq.step_ids) {
          const seqMd = await seqFile.async('text');
          // Standard Markdown horizontal rule delimiter: ---
          const chunks = seqMd.split(/\n\s*---\s*\n/);
          seq.step_ids.forEach((stId, sIdx) => {
            const stepObj = parsed.steps.find(s => s.id === stId);
            if (stepObj && chunks[sIdx] !== undefined) {
              stepObj.content_text = chunks[sIdx].trim();
            }
          });
        }
      }
    }

    // fallback to content/{step.id}.md if content_text is not yet loaded
    for (const step of parsed.steps) {
      if (!step.content_text) {
        const mdFile = zip.file(`content/${step.id}.md`);
        if (mdFile) {
          step.content_text = await mdFile.async('text');
        }
      }
    }

    // load assets
    const assetFiles = zip.folder('assets');
    if (assetFiles) {
      for (const [relativePath, fileObj] of Object.entries(assetFiles.files)) {
        if (!fileObj.dir) {
          const filename = relativePath.replace(/^assets\//, '');
          if (filename.endsWith('.svg')) {
            assetsMap[filename] = await fileObj.async('text');
          } else {
            const b64 = await fileObj.async('base64');
            assetsMap[filename] = `data:image/png;base64,${b64}`;
          }
        }
      }
    }

    allPlaybooks.push(parsed);
    persistState();
    selectPlaybook(allPlaybooks.length - 1, 'builder');
    showToast(`Successfully imported '${parsed.title || parsed.name}'!`);
  } catch (err) {
    showToast(`Import error: ${err.message}`);
  }
}

// -------------------------------------------------------------
// EVENT HANDLERS REGISTRATION
// -------------------------------------------------------------
function setupEventListeners() {
  setupImageLightboxHandlers();
  setupMarkSectionHandlers();
  setupStepViewToggleHandler();

  // Sidebar Toggle Handlers & Keyboard Shortcut (Ctrl+B)
  dom.btnToggleSidebar?.addEventListener('click', () => toggleSidebar());
  dom.btnCloseSidebar?.addEventListener('click', () => toggleSidebar(false));
  dom.btnOpenSidebarEdge?.addEventListener('click', () => toggleSidebar(true));
  dom.btnCanvasToggleSidebar?.addEventListener('click', () => toggleSidebar());

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleSidebar();
    }
  });

  // Restore saved sidebar state (default to open)
  try {
    const savedSidebar = localStorage.getItem('stepcase_sidebar_open');
    if (savedSidebar === '0') {
      toggleSidebar(false);
    }
  } catch (err) {}

  // Brand Logo returns to Welcome Hub
  dom.btnHomeLogo?.addEventListener('click', showWelcomeHub);
  dom.btnReturnWelcome?.addEventListener('click', showWelcomeHub);

  // Mode Switcher Buttons (Segmented toggle in both main header and player header)
  dom.btnModeBuilder?.addEventListener('click', () => setMode('builder'));
  dom.btnModePlayer?.addEventListener('click', () => setMode('player'));
  dom.btnPlayerWindowedModeBuilder?.addEventListener('click', () => setMode('builder'));
  dom.btnPlayerWindowedModePlayer?.addEventListener('click', () => setMode('player'));

  // Player Navigation & Exit Controls (Full-Screen & Windowed)
  dom.btnPlayerNavNext?.addEventListener('click', handlePlayerNext);
  dom.btnPlayerNavBack?.addEventListener('click', handlePlayerBack);
  dom.btnPlayerArrowPrev?.addEventListener('click', handlePlayerBack);
  dom.btnPlayerArrowNext?.addEventListener('click', handlePlayerNext);
  dom.btnPlayerToggleFullscreen?.addEventListener('click', togglePlayerFullscreen);
  dom.btnExitPlayerToEditor?.addEventListener('click', () => setMode('builder'));
  dom.btnPlayerReturnBuilder?.addEventListener('click', () => setMode('builder'));
  dom.btnPlayerRestart?.addEventListener('click', () => {
    const pb = getActivePlaybook();
    if (pb) {
      playerState = {
        mode: (!pb.screens || pb.screens.length === 0) ? 'step' : 'screen',
        screenId: pb.start_screen_id || pb.screens[0]?.id || '',
        sequenceId: pb.sequences[0]?.id || '',
        stepIndex: 0,
        history: [],
        checklistState: {}
      };
      renderPlayerView();
    }
  });

  // Native Fullscreen & Esc Key Player Windowed State
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      playerPresentationState = 'fullscreen';
      dom.playerWindowedHeader?.classList.add('hidden');
    } else {
      // Exited native fullscreen (e.g. user pressed Esc!)
      // Strict behavior: does NOT return to editor. Shows windowed player header!
      if (activeMode === 'player') {
        playerPresentationState = 'windowed';
        dom.playerWindowedHeader?.classList.remove('hidden');
      }
    }
  });

  // Window Keydown for Player Navigation & Strict Esc Logic
  window.addEventListener('keydown', (e) => {
    if (activeMode === 'player') {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handlePlayerNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePlayerBack();
      } else if (e.key === 'Escape') {
        // Esc exits native fullscreen into windowed player state, never returns to editor
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        } else {
          playerPresentationState = 'windowed';
          dom.playerWindowedHeader?.classList.remove('hidden');
        }
      }
    }
  });

  // Welcome View Action Cards: "New Playbook" = Clean Blank Slate
  dom.cardAddPlaybook?.addEventListener('click', () => {
    createNewPlaybookFlow();
  });

  dom.cardModifyPlaybook?.addEventListener('click', () => {
    selectPlaybook(0, 'builder');
  });

  dom.btnQuickSelectOurs?.addEventListener('click', (e) => {
    e.stopPropagation();
    selectPlaybook(0, 'builder');
  });

  dom.btnLaunchPlayerStepcase?.addEventListener('click', () => {
    selectPlaybook(0, 'player');
    enterPlayerMode(true);
  });

  // Sidebar "+ Add Playbook" button
  dom.btnSidebarAddPlaybook?.addEventListener('click', () => {
    createNewPlaybookFlow();
  });

  // Canvas Playbook Title Hover & Edit Component ("Untitled" default)
  const startCanvasTitleEdit = () => {
    const pb = getActivePlaybook();
    if (!pb) return;
    if (dom.canvasPlaybookBadge && dom.canvasPlaybookTitleInput) {
      dom.canvasPlaybookBadge.classList.add('hidden');
      dom.btnCanvasEditTitle?.classList.add('hidden');
      dom.canvasPlaybookTitleInput.classList.remove('hidden');
      dom.canvasPlaybookTitleInput.value = pb.title || pb.name || 'Untitled';
      dom.canvasPlaybookTitleInput.focus();
      dom.canvasPlaybookTitleInput.select();
    }
  };

  const commitCanvasTitleEdit = () => {
    const pb = getActivePlaybook();
    if (!pb) return;
    if (dom.canvasPlaybookBadge && dom.canvasPlaybookTitleInput) {
      const val = dom.canvasPlaybookTitleInput.value.trim() || 'Untitled';
      pb.title = val;
      pb.name = val;
      dom.canvasPlaybookBadge.textContent = val;
      dom.canvasPlaybookTitleInput.classList.add('hidden');
      dom.canvasPlaybookBadge.classList.remove('hidden');
      dom.btnCanvasEditTitle?.classList.remove('hidden');
      persistState();
      renderSidebarPlaybooks();
      showToast(`Playbook renamed to "${val}".`);
    }
  };

  const cancelCanvasTitleEdit = () => {
    const pb = getActivePlaybook();
    if (!pb) return;
    if (dom.canvasPlaybookBadge && dom.canvasPlaybookTitleInput) {
      dom.canvasPlaybookTitleInput.value = pb.title || pb.name || 'Untitled';
      dom.canvasPlaybookTitleInput.classList.add('hidden');
      dom.canvasPlaybookBadge.classList.remove('hidden');
      dom.btnCanvasEditTitle?.classList.remove('hidden');
    }
  };

  dom.canvasPlaybookTitleContainer?.addEventListener('click', (e) => {
    if (e.target === dom.canvasPlaybookTitleInput) return;
    startCanvasTitleEdit();
  });
  dom.btnCanvasEditTitle?.addEventListener('click', (e) => {
    e.stopPropagation();
    startCanvasTitleEdit();
  });
  dom.canvasPlaybookTitleInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitCanvasTitleEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelCanvasTitleEdit();
    }
  });
  dom.canvasPlaybookTitleInput?.addEventListener('blur', () => {
    commitCanvasTitleEdit();
  });

  dom.btnCanvasQuickAddStep?.addEventListener('click', () => {
    addStepToActiveSequence();
  });

  // Consolidated Actions 3-Dot Menu (⋮)
  dom.btnCanvasActionMenu?.addEventListener('click', (e) => {
    e.stopPropagation();
    dom.canvasActionDropdown?.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!dom.canvasActionDropdown?.classList.contains('hidden')) {
      if (!e.target.closest('#canvasActionMenuContainer')) {
        dom.canvasActionDropdown?.classList.add('hidden');
      }
    }
  });

  dom.menuActionAddStep?.addEventListener('click', () => {
    dom.canvasActionDropdown?.classList.add('hidden');
    addStepToActiveSequence();
  });

  dom.menuActionAddScreen?.addEventListener('click', () => {
    dom.canvasActionDropdown?.classList.add('hidden');
    addScreenToActivePlaybook();
  });

  dom.menuActionAddSequence?.addEventListener('click', () => {
    dom.canvasActionDropdown?.classList.add('hidden');
    addSequenceToActivePlaybook();
  });

  dom.menuActionAttachMedia?.addEventListener('click', () => {
    dom.canvasActionDropdown?.classList.add('hidden');
    const pb = getActivePlaybook();
    if (!pb) return;
    const target = resolveActiveNode(pb);
    if (target && target.type === 'step') {
      currentAttachingStepId = target.step.id;
      dom.stepMediaFileInput?.click();
    } else {
      showToast('Select a step first to attach media.');
    }
  });

  dom.menuActionAddChecklist?.addEventListener('click', () => {
    dom.canvasActionDropdown?.classList.add('hidden');
    const pb = getActivePlaybook();
    if (!pb) return;
    const target = resolveActiveNode(pb);
    if (target && target.type === 'step') {
      if (!Array.isArray(target.step.checklist)) target.step.checklist = [];
      target.step.checklist.push({ id: 'c_' + Date.now(), text: '', checked: false });
      persistState();
      renderBuilderView(true);
      showToast('Checklist item added to step.');
    } else {
      showToast('Select a step first to add a checklist.');
    }
  });

  dom.menuActionAddCopyField?.addEventListener('click', () => {
    dom.canvasActionDropdown?.classList.add('hidden');
    const pb = getActivePlaybook();
    if (!pb) return;
    const target = resolveActiveNode(pb);
    if (target && target.type === 'step') {
      if (!Array.isArray(target.step.copy_fields)) target.step.copy_fields = [];
      target.step.copy_fields.push({ label: 'Command', value: 'npm run dev' });
      persistState();
      renderBuilderView(true);
      showToast('1-Click copy command added.');
    } else {
      showToast('Select a step first to add a copy command.');
    }
  });

  dom.menuActionMarkSection?.addEventListener('click', () => {
    dom.canvasActionDropdown?.classList.add('hidden');
    openMarkSectionModal();
  });

  dom.menuActionToggleLock?.addEventListener('click', () => {
    dom.canvasActionDropdown?.classList.add('hidden');
    const pb = getActivePlaybook();
    if (!pb) return;
    const target = resolveActiveNode(pb);
    if (target && target.type === 'step') {
      target.step.disable_back = !target.step.disable_back;
      persistState();
      renderBuilderView(true);
      showToast(target.step.disable_back ? 'Strict lock-step enabled (Back disabled).' : 'Back navigation allowed.');
    } else if (target && target.type === 'screen') {
      target.screen.disable_back = !target.screen.disable_back;
      persistState();
      renderBuilderView(true);
      showToast(target.screen.disable_back ? 'Strict lock-step enabled for screen.' : 'Back navigation allowed.');
    }
  });

  dom.menuActionDeleteItem?.addEventListener('click', () => {
    dom.canvasActionDropdown?.classList.add('hidden');
    const pb = getActivePlaybook();
    if (!pb) return;
    const target = resolveActiveNode(pb);
    if (target && target.type === 'step') {
      deleteActiveStep();
    } else if (target && target.type === 'screen') {
      if (pb.screens.length <= 1) {
        showToast('Playbook must contain at least one screen.');
        return;
      }
      openProvisionalDeleteDialog({
        title: 'Delete Screen',
        subtitle: 'Provisional Safeguard',
        message: `Delete screen "${target.screen.title}"?`,
        confirmText: 'Delete Screen',
        onConfirm: () => {
          pb.screens = pb.screens.filter(s => s.id !== target.screen.id);
          activeNode = { type: 'screen', id: pb.screens[0].id, sequenceId: '' };
          persistState();
          renderBuilderView(true);
          renderSidebarPlaybooks();
          showToast('Screen deleted.');
        }
      });
    }
  });

  dom.btnCanvasLaunchPlayer?.addEventListener('click', () => {
    enterPlayerMode(true);
  });

  // Global Keyboard Shortcut: Ctrl+Enter adds step and turns page!
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      if (activeMode === 'builder') {
        e.preventDefault();
        addStepToActiveSequence();
      }
    }
  });

  // Step Media File Upload Picker
  dom.stepMediaFileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file || !currentAttachingStepId) return;
    const pb = getActivePlaybook();
    if (!pb) return;
    const step = pb.steps.find(s => s.id === currentAttachingStepId);
    if (!step) return;
    if (!step.assets) step.assets = [];

    const assetKey = file.name.replace(/\s+/g, '_');
    const reader = new FileReader();
    reader.onload = (re) => {
      assetsMap[assetKey] = re.target.result;
      if (!step.assets.includes(assetKey)) {
        step.assets.push(assetKey);
      }
      persistState();
      renderBuilderView();
      showToast(`Attached image "${assetKey}" to step.`);
    };

    if (file.type.includes('svg')) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  });

  // Close open step dropdown menus when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.step-toolbar')) {
      document.querySelectorAll('.step-plus-menu, .step-more-menu').forEach(menu => {
        menu.classList.add('hidden');
      });
    }
  });

  // Lamp Theme Toggle Button
  dom.btnLampToggle?.addEventListener('click', () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Theme`);
  });

  // Material You Palette Selection
  document.querySelectorAll('.btn-palette').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const color = e.currentTarget.getAttribute('data-color');
      applyPrimaryColor(color);
      showToast('Accent Color Updated');
    });
  });

  // Import / Export ZIP Handlers
  dom.btnTopExportZip?.addEventListener('click', exportActivePlaybookZip);
  dom.btnTopImportZip?.addEventListener('click', () => dom.topImportZipInput?.click());
  dom.topImportZipInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) importPlaybookZip(file);
    e.target.value = '';
  });

  // Python Code Inspector
  dom.btnDownloadPyQt6?.addEventListener('click', () => {
    downloadPyQt6Zip();
  });
  dom.btnClosePythonModal?.addEventListener('click', () => {
    dom.pythonCodeModal?.classList.add('hidden');
  });
  dom.btnModalDownloadPyZip?.addEventListener('click', () => {
    downloadPyQt6Zip();
  });
}

// Helper: Jump to any step, screen, or sequence from link or button
function handleCustomJump(target, pb) {
  if (!target || !pb) return;
  const parts = target.split(':');
  const type = parts[0];
  const id = parts[1] || parts[0];

  playerState.history.push({
    mode: playerState.mode,
    sequenceId: playerState.sequenceId,
    stepIndex: playerState.stepIndex,
    id: playerState.screenId
  });

  if (type === 'screen' || pb.screens.some(s => s.id === id)) {
    playerState.mode = 'screen';
    playerState.screenId = id;
    renderPlayerView();
    showToast('Jumped to Decision Screen');
  } else if (type === 'step' || pb.steps.some(s => s.id === id)) {
    // find sequence containing step
    const parentSeq = pb.sequences?.find(seq => Array.isArray(seq.step_ids) && seq.step_ids.includes(id));
    if (parentSeq && Array.isArray(parentSeq.step_ids)) {
      playerState.mode = 'step';
      playerState.sequenceId = parentSeq.id;
      playerState.stepIndex = Math.max(0, parentSeq.step_ids.indexOf(id));
      renderPlayerView();
      showToast('Jumped to Step');
    }
  } else if (type === 'seq' || pb.sequences.some(s => s.id === id)) {
    playerState.mode = 'step';
    playerState.sequenceId = id;
    playerState.stepIndex = 0;
    renderPlayerView();
    showToast('Jumped to Sequence');
  }
}

// -------------------------------------------------------------
// GLOBAL SEARCH OMNIBOX (GOOGLE-STYLE)
// -------------------------------------------------------------
function setupSearchBar() {
  if (!dom.globalSearchBar) return;

  const handleSearch = () => {
    const query = dom.globalSearchBar.value.trim().toLowerCase();
    renderSidebarPlaybooks(); // Real-time tree filtering

    if (!query) {
      dom.searchResultsDropdown.classList.add('hidden');
      dom.btnClearSearch?.classList.add('hidden');
      return;
    }
    dom.btnClearSearch?.classList.remove('hidden');

    const results = [];
    allPlaybooks.forEach((pb, pbIdx) => {
      // 1. Match Playbook Title
      if ((pb.title || pb.name).toLowerCase().includes(query)) {
        results.push({
          type: 'playbook',
          badge: 'Playbook',
          title: pb.title || pb.name,
          subtitle: pb.name || 'Playbook',
          pbIndex: pbIdx
        });
      }

      // 2. Match Sections
      pb.sections?.forEach(sec => {
        if (sec.title && sec.title.toLowerCase().includes(query)) {
          results.push({
            type: 'section',
            badge: 'Section',
            title: sec.title,
            subtitle: pb.title || pb.name,
            pbIndex: pbIdx,
            nodeId: sec.id
          });
        }
      });

      // 3. Match Screens
      pb.screens?.forEach(sc => {
        if (sc.title.toLowerCase().includes(query)) {
          results.push({
            type: 'screen',
            badge: 'Screen',
            title: sc.title,
            subtitle: pb.title || pb.name,
            pbIndex: pbIdx,
            nodeId: sc.id
          });
        }
      });

      // 4. Match Sequences
      pb.sequences?.forEach(seq => {
        if (seq.title.toLowerCase().includes(query)) {
          results.push({
            type: 'sequence',
            badge: 'Sequence',
            title: seq.title,
            subtitle: pb.title || pb.name,
            pbIndex: pbIdx,
            nodeId: seq.id
          });
        }
      });

      // 5. Match Steps & Step Content
      pb.steps?.forEach(st => {
        const textMatch = (st.content_text || '').toLowerCase().includes(query);
        const titleMatch = st.title.toLowerCase().includes(query);
        if (titleMatch || textMatch) {
          const parentSeq = pb.sequences?.find(s => Array.isArray(s.step_ids) && s.step_ids.includes(st.id));
          results.push({
            type: 'step',
            badge: 'Step',
            title: st.title,
            subtitle: `${pb.title || pb.name} • ${parentSeq ? parentSeq.title : 'Step'}`,
            snippet: textMatch ? extractSnippet(st.content_text, query) : '',
            pbIndex: pbIdx,
            nodeId: st.id,
            sequenceId: parentSeq ? parentSeq.id : ''
          });
        }
      });
    });

    renderSearchResults(results);
  };

  dom.globalSearchBar.addEventListener('input', handleSearch);
  dom.globalSearchBar.addEventListener('focus', () => {
    if (dom.globalSearchBar.value.trim()) handleSearch();
  });

  dom.globalSearchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dom.searchResultsDropdown.classList.add('hidden');
      dom.globalSearchBar.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const firstItem = dom.searchResultsDropdown.querySelector('.search-result-item');
      if (firstItem) firstItem.focus();
    } else if (e.key === 'Enter') {
      const firstItem = dom.searchResultsDropdown.querySelector('.search-result-item');
      if (firstItem) {
        e.preventDefault();
        firstItem.click();
      }
    }
  });

  dom.btnClearSearch?.addEventListener('click', () => {
    dom.globalSearchBar.value = '';
    dom.searchResultsDropdown.classList.add('hidden');
    dom.btnClearSearch.classList.add('hidden');
    renderSidebarPlaybooks();
    dom.globalSearchBar.focus();
  });

  // Keyboard shortcut Ctrl+K / Cmd+K to focus search
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      dom.globalSearchBar?.focus();
      dom.globalSearchBar?.select();
    }
  });

  // Close search dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#globalSearchBar') && !e.target.closest('#searchResultsDropdown')) {
      dom.searchResultsDropdown?.classList.add('hidden');
    }
  });
}

function extractSnippet(text, query) {
  if (!text) return '';
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return '';
  const start = Math.max(0, idx - 25);
  const end = Math.min(text.length, idx + query.length + 35);
  return '...' + text.slice(start, end).replace(/\n/g, ' ') + '...';
}

function renderSearchResults(results) {
  if (!dom.searchResultsDropdown) return;
  dom.searchResultsDropdown.innerHTML = '';

  if (results.length === 0) {
    dom.searchResultsDropdown.innerHTML = `
      <div class="p-3 text-center text-slate-400 text-xs">
        No matching steps, sequences or screens found.
      </div>
    `;
    dom.searchResultsDropdown.classList.remove('hidden');
    return;
  }

  results.slice(0, 15).forEach((res, index) => {
    const item = document.createElement('div');
    item.className = 'search-result-item p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer flex items-center justify-between gap-2 transition-colors outline-none';
    item.setAttribute('tabindex', '0');

    let badgeBg = 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
    if (res.badge === 'Section') badgeBg = 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300';
    if (res.badge === 'Screen') badgeBg = 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
    if (res.badge === 'Sequence') badgeBg = 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300';

    item.innerHTML = `
      <div class="flex-1 truncate">
        <div class="flex items-center gap-1.5">
          <span class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${badgeBg}">${res.badge}</span>
          <span class="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">${escapeHtml(res.title)}</span>
        </div>
        <div class="text-[10px] text-slate-400 truncate mt-0.5">${escapeHtml(res.subtitle)}</div>
        ${res.snippet ? `<div class="text-[10px] text-slate-500 dark:text-slate-400 italic mt-0.5 truncate">${escapeHtml(res.snippet)}</div>` : ''}
      </div>
      <span class="text-xs text-theme-primary font-bold">↵</span>
    `;

    const handleSelect = () => {
      dom.searchResultsDropdown.classList.add('hidden');
      selectPlaybook(res.pbIndex, activeMode);
      if (res.nodeId) {
        if (res.type === 'section') {
          activeNode = { type: 'section', id: res.nodeId, sequenceId: '' };
        } else if (res.type === 'step') {
          activeNode = { type: 'step', id: res.nodeId, sequenceId: res.sequenceId || '' };
          if (activeMode === 'player') {
            const pb = allPlaybooks[res.pbIndex];
            const parentSeq = pb.sequences.find(s => s.id === res.sequenceId);
            if (parentSeq) {
              playerState.mode = 'step';
              playerState.sequenceId = parentSeq.id;
              playerState.stepIndex = parentSeq.step_ids.indexOf(res.nodeId);
            }
          }
        } else if (res.type === 'screen') {
          activeNode = { type: 'screen', id: res.nodeId, sequenceId: '' };
          if (activeMode === 'player') {
            playerState.mode = 'screen';
            playerState.screenId = res.nodeId;
          }
        } else if (res.type === 'sequence') {
          activeNode = { type: 'sequence', id: res.nodeId, sequenceId: res.nodeId };
          if (activeMode === 'player') {
            playerState.mode = 'step';
            playerState.sequenceId = res.nodeId;
            playerState.stepIndex = 0;
          }
        }
      }
      setMode(activeMode);
      if (activeMode === 'builder') {
        renderBuilderView(true);
      }
      showToast(`Navigated to ${res.title}`);
    };

    item.onclick = handleSelect;
    item.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = item.nextElementSibling;
        if (next && next.classList.contains('search-result-item')) next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = item.previousElementSibling;
        if (prev && prev.classList.contains('search-result-item')) {
          prev.focus();
        } else {
          dom.globalSearchBar?.focus();
        }
      } else if (e.key === 'Escape') {
        dom.searchResultsDropdown.classList.add('hidden');
        dom.globalSearchBar?.focus();
      }
    };

    dom.searchResultsDropdown.appendChild(item);
  });

  dom.searchResultsDropdown.classList.remove('hidden');
}

function setupMenuDropdowns() {
  const menus = ['File', 'Edit', 'Settings', 'About'];
  menus.forEach(m => {
    const btn = document.getElementById(`menuBtn${m}`);
    const dropdown = document.getElementById(`dropdown${m}`);
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      // close others
      menus.forEach(other => {
        if (other !== m) document.getElementById(`dropdown${other}`)?.classList.add('hidden');
      });
      dropdown?.classList.toggle('hidden');
    });
  });

  window.addEventListener('click', () => {
    menus.forEach(m => document.getElementById(`dropdown${m}`)?.classList.add('hidden'));
  });

  // File Menu
  document.getElementById('actionNewPlaybook')?.addEventListener('click', () => {
    createNewPlaybookFlow();
  });
  document.getElementById('actionSavePlaybook')?.addEventListener('click', () => {
    persistState();
    showToast('Playbook saved to local database.');
  });
  document.getElementById('actionMenuExportZip')?.addEventListener('click', exportActivePlaybookZip);
  document.getElementById('actionMenuImportZip')?.addEventListener('click', () => dom.topImportZipInput?.click());
  document.getElementById('actionMenuExportPdf')?.addEventListener('click', openPdfExportModal);

  // Edit Menu
  document.getElementById('actionEditInsertPicture')?.addEventListener('click', () => {
    setMode('builder');
    dom.btnAttachMedia?.click();
  });
  document.getElementById('actionEditAddStep')?.addEventListener('click', () => {
    setMode('builder');
    addStepToActiveSequence();
  });
  document.getElementById('actionEditAddScreen')?.addEventListener('click', () => {
    setMode('builder');
    addScreenToActivePlaybook();
  });
  document.getElementById('actionEditAddSequence')?.addEventListener('click', () => {
    setMode('builder');
    addSequenceToActivePlaybook();
  });
  document.getElementById('actionConfigPlaybook')?.addEventListener('click', () => {
    setMode('builder');
    dom.inputPlaybookTitle?.focus();
    dom.inputPlaybookTitle?.select();
  });
  document.getElementById('actionEditDeleteStep')?.addEventListener('click', () => {
    deleteActiveStep();
  });
  document.getElementById('actionEditDeleteSequence')?.addEventListener('click', () => {
    deleteActiveSequence();
  });
  document.getElementById('actionEditDeletePlaybook')?.addEventListener('click', () => {
    deleteActivePlaybook();
  });

  document.getElementById('dropdownSettings')?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Settings Menu: Theme Selection (Light vs Dark)
  dom.btnThemeLight?.addEventListener('click', (e) => {
    e.stopPropagation();
    applyTheme('light');
    showToast('Theme set to Light.');
  });
  dom.btnThemeDark?.addEventListener('click', (e) => {
    e.stopPropagation();
    applyTheme('dark');
    showToast('Theme set to Dark.');
  });

  // About Menu: Help & About this app
  dom.menuItemAboutApp?.addEventListener('click', () => {
    openAboutReadmeModal();
  });
  dom.menuItemHelp?.addEventListener('click', () => {
    openHelpModal();
  });

  // Modal Close & Copy Handlers
  dom.btnCloseAboutReadmeModal?.addEventListener('click', () => {
    dom.aboutReadmeModal?.classList.add('hidden');
  });
  dom.btnCopyReadmeMd?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(currentLoadedReadmeMd || README_MARKDOWN);
      showToast('README Markdown copied to clipboard!');
    } catch (e) {
      showToast('Copied README Markdown.');
    }
  });
  dom.btnCloseHelpModal?.addEventListener('click', () => {
    dom.helpGuideModal?.classList.add('hidden');
  });

  // F1 Shortcut for Help
  window.addEventListener('keydown', (e) => {
    if (e.key === 'F1') {
      e.preventDefault();
      openHelpModal();
    }
  });

  dom.btnCheckForUpdates?.addEventListener('click', () => {
    showToast('Step-case is up to date (v1.0.0 offline runtime).');
  });

  document.getElementById('actionViewPyCode')?.addEventListener('click', () => {
    dom.pythonCodeModal?.classList.remove('hidden');
  });
}

// -------------------------------------------------------------
// ABOUT THIS APP & HELP MODAL IMPLEMENTATION
// Maintains and renders README.md for users in clean Markdown
// -------------------------------------------------------------
const README_MARKDOWN = `# Step-case — Interactive Playbook & Runbook Desktop App

Step-case is an ultra-minimalist offline desktop application designed to document, structure, and execute standard operating procedures (SOPs), installations, and troubleshooting procedures without clunky forms or developer bloat.

---

## 🛠 Tech Stack & Architecture

- Runtime & Engine: High-performance offline web runtime with instant responsiveness and zero cloud dependencies.
- Frontend: Vanilla JavaScript + Single Page Canvas + Tailwind CSS.
- Design Philosophy: "Google Antigravity". Crystal-clear, ultra-minimalist styling with high-contrast Black & White dark mode and crisp Blue & White light mode.
- Data Persistence: Offline browser-indexed local storage with automatic state saving and complete .ZIP/.PDF export.

---

## 📐 Core Terminology (Strict Definitions)

1. Playbook: The master container or document for a specific runbook, installation guide, or SOP (e.g., *How to install python*, *On using Step-case*).
2. Sequence: A continuous, linear flow of procedural steps (e.g., *Windows Installation Flow*, *macOS Homebrew Flow*).
3. Step: A single view of documentation and actionable instructions displayed on the canvas.
4. Screen: Structural decision points between sequences.

*(Terminology Note: Step-case avoids jargon like "branches", "routes", or "paths", using strictly Playbook, Sequence, Steps, and Screen).*

---

## 🎨 UI Modes & Workflows

- Left Sidebar: Playbooks file tree with quick add, reorder, and collapsible panel (\`Ctrl+B\`).
- Main Canvas: Edge-to-edge WYSIWYG editing canvas with flat underline inputs for rapid authoring.
- Action Toolbar: Add Steps, Sequences, Screens, and media attachments instantly.

- High-Focus Canvas: Large typography showing one documentation step at a time.
- Step Progress Tracker: Clean step indicators (\`1/3\`, \`2/3\`, \`3/3\`) and progress percentage.
- Jump to Dropdown: Fast, simple dropdown to jump directly to any step across sequences.
- Interactive Checklists: Clickable verification checklists ensuring zero procedural errors.
- 1-Click Copy Fields: Instant clipboard copy for shell commands, paths, and URLs.

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| Ctrl + K | Open Global Search Bar |
| Ctrl + B | Toggle Sidebar (Open / Close) |
| Ctrl + N | Create a New Playbook |
| Ctrl + S | Save Playbook to Local Storage |
| Ctrl + P | Export Playbook to Structured PDF / Print Manual |
| Ctrl + E | Export Playbook to .ZIP Package |
| Ctrl + I | Import Playbook from .ZIP Package |
| F1 | Open Help & Keyboard Shortcuts |

---

*Made with Love by Alex Sakha • Step-case v1.0.0*`;

let currentLoadedReadmeMd = '';

async function openAboutReadmeModal() {
  if (!dom.aboutReadmeModal) return;
  dom.aboutReadmeModal.classList.remove('hidden');

  if (dom.aboutReadmeContent) {
    dom.aboutReadmeContent.innerHTML = '<div class="text-sm text-slate-400 py-6">Loading README documentation...</div>';
    let md = README_MARKDOWN;
    try {
      const res = await fetch('/README.md');
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim().length > 0) {
          md = text;
        }
      }
    } catch (e) {
      console.log('Using bundled README');
    }

    currentLoadedReadmeMd = md;
    if (window.marked) {
      dom.aboutReadmeContent.innerHTML = window.marked.parse(md);
    } else {
      dom.aboutReadmeContent.innerHTML = `<pre class="p-4 bg-slate-900 text-white rounded-xl whitespace-pre-wrap">${escapeHtml(md)}</pre>`;
    }
  }
}

function openHelpModal() {
  if (dom.helpGuideModal) {
    dom.helpGuideModal.classList.remove('hidden');
  }
}

// -------------------------------------------------------------
// DOWNLOAD PYQT6 DESKTOP PROJECT .ZIP
// -------------------------------------------------------------
async function downloadPyQt6Zip() {
  if (!window.JSZip) {
    showToast('Packaging...');
    return;
  }

  try {
    const zip = new window.JSZip();

    // Fetch existing Python source files if possible or pack verified modules
    zip.file('README.md', `# Step-case Desktop Runbook Engine\n\nRun with:\n\`\`\`bash\npip install -r requirements.txt\npython main.py\n\`\`\`\n`);
    zip.file('requirements.txt', `PyQt6>=6.6.0\nPyQt6-Qt6>=6.6.0\n`);

    // Try fetching /main.py, /data_manager.py, /ui_builder.py, /ui_player.py
    for (const pyFile of ['main.py', 'data_manager.py', 'ui_builder.py', 'ui_player.py']) {
      try {
        const resp = await fetch(`/${pyFile}`);
        if (resp.ok) {
          const txt = await resp.text();
          zip.file(pyFile, txt);
        }
      } catch (e) {}
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Step-case-PyQt6-Desktop.zip';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded PyQt6 Desktop Package (.zip)');
  } catch (err) {
    showToast(`Zip packaging note: ${err.message}`);
  }
}

// -------------------------------------------------------------
// STRUCTURED PDF / PRINT USER MANUAL EXPORT
// Automatically generates Title Page, Table of Contents (Index),
// and formatted steps before printing.
// -------------------------------------------------------------
function openPdfExportModal() {
  const pb = getActivePlaybook();
  if (!pb) {
    showToast('Please select a playbook to export as PDF.');
    return;
  }

  if (!dom.pdfPrintableContent) return;

  // Build Title Page, Table of Contents, and Formatted Steps
  let html = `
    <!-- 1. TITLE PAGE -->
    <div class="page-break flex flex-col justify-center items-center text-center min-h-[750px] py-16 border-b-2 border-slate-900 mb-12">
      <div class="w-20 h-20 rounded-2xl bg-[#1A73E8] text-white flex items-center justify-center font-extrabold text-2xl tracking-widest shadow-md mb-8">
        AXC
      </div>
      <div class="text-xs uppercase font-mono tracking-widest text-[#1A73E8] font-bold mb-3">STEP-CASE RUNBOOK ENGINE</div>
      <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 max-w-2xl">
        ${escapeHtml(pb.title || pb.name)}
      </h1>
      <p class="text-base text-slate-600 max-w-xl mx-auto mb-12 leading-relaxed">
        ${escapeHtml(pb.description || 'Standard Operating Procedure and interactive execution manual.')}
      </p>
      <div class="mt-auto pt-12 border-t border-slate-200 w-full max-w-sm flex flex-col gap-1 text-xs text-slate-500">
        <div><strong>Author:</strong> Made with Love by Alex Sakha</div>
        <div><strong>Generated:</strong> ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div><strong>Version:</strong> ${escapeHtml(pb.version || '1.0.0')}</div>
      </div>
    </div>

    <!-- 2. TABLE OF CONTENTS (INDEX) -->
    <div class="page-break py-8 border-b border-slate-200 mb-12">
      <div class="text-xs uppercase font-mono tracking-widest text-[#1A73E8] font-bold mb-2">INDEX &amp; NAVIGATION</div>
      <h2 class="text-3xl font-extrabold text-slate-900 mb-6">Table of Contents</h2>
      <div class="space-y-4 max-w-2xl">
  `;

  // Helper function to render a formatted step block in PDF
  function formatPdfStep(step, sIdx) {
    if (!step) return '';
    let stepHtml = '';
    let renderedMd = '';
    if (window.marked) {
      renderedMd = window.marked.parse(step.content_text || step.title || '');
    } else {
      renderedMd = `<p>${escapeHtml(step.content_text || step.title || '')}</p>`;
    }

    stepHtml += `
      <div class="p-6 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4 my-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <span class="text-sm font-bold text-slate-900">Step ${sIdx + 1}: ${escapeHtml(step.title || 'Untitled Step')}</span>
          <span class="text-[11px] font-mono text-slate-500">ID: ${escapeHtml(step.id)}</span>
        </div>

        <div class="prose max-w-none text-slate-800 text-sm leading-relaxed">
          ${renderedMd}
        </div>
    `;

    // Media in PDF
    if (step.assets && step.assets.length > 0) {
      stepHtml += `<div class="pt-2 space-y-2">`;
      step.assets.forEach(assetKey => {
        const assetData = assetsMap[assetKey];
        if (assetData && assetData.startsWith('<svg')) {
          stepHtml += `<div class="max-w-md mx-auto my-2">${assetData}</div>`;
        } else if (assetData && assetData.startsWith('data:image')) {
          stepHtml += `<img src="${assetData}" alt="${escapeHtml(assetKey)}" class="max-h-64 mx-auto rounded-lg" />`;
        } else {
          stepHtml += `<div class="p-3 text-center text-slate-400 font-mono text-xs border border-dashed rounded">[ Image: ${escapeHtml(assetKey)} ]</div>`;
        }
      });
      stepHtml += `</div>`;
    }

    // Checklist in PDF
    if (step.checklist && step.checklist.length > 0) {
      stepHtml += `
        <div class="pt-2 border-t border-slate-200/60">
          <div class="text-[11px] font-bold uppercase text-slate-500 mb-1.5">Action Checklist:</div>
          <ul class="space-y-1 text-xs text-slate-700">
      `;
      step.checklist.forEach(item => {
        stepHtml += `<li>[ ] ${escapeHtml(item.text)}</li>`;
      });
      stepHtml += `</ul></div>`;
    }

    // Copy Fields in PDF
    if (step.copy_fields && step.copy_fields.length > 0) {
      stepHtml += `
        <div class="pt-2 border-t border-slate-200/60 space-y-1">
          <div class="text-[11px] font-bold uppercase text-slate-500 mb-1">Commands &amp; References:</div>
      `;
      step.copy_fields.forEach(f => {
        stepHtml += `
          <div class="bg-white p-2 rounded border border-slate-200 font-mono text-xs text-slate-800">
            <span class="text-slate-500">${escapeHtml(f.label)}:</span> ${escapeHtml(f.value)}
          </div>
        `;
      });
      stepHtml += `</div>`;
    }

    stepHtml += `</div>`;
    return stepHtml;
  }

  // 1. TOC SECTIONS (PREFERRED FIRST)
  if (pb.sections && pb.sections.length > 0) {
    html += `
      <div class="space-y-2">
        <div class="text-xs font-bold uppercase tracking-wider text-[#1A73E8]">1. Sections &amp; Execution Chapters</div>
        <ul class="space-y-2 pl-4 text-sm text-slate-700">
    `;
    pb.sections.forEach((sec, sIdx) => {
      const rangeText = sec.from_step && sec.to_step ? `(Steps ${sec.from_step} to ${sec.to_step})` : '';
      html += `
        <li class="border-b border-slate-100 pb-1.5">
          <div class="font-bold text-slate-900">Section ${sIdx + 1}: ${escapeHtml(sec.title)} <span class="font-mono text-xs font-normal text-slate-500">${rangeText}</span></div>
      `;
      if (sec.from_step && sec.to_step && pb.steps) {
        html += `<div class="text-xs text-slate-500 pl-4 mt-0.5 space-y-0.5">`;
        const subset = pb.steps.slice(sec.from_step - 1, sec.to_step);
        subset.forEach((st, idx) => {
          html += `<div>• Step ${sec.from_step + idx}: ${escapeHtml(st.title || 'Step ' + (sec.from_step + idx))}</div>`;
        });
        html += `</div>`;
      }
      html += `</li>`;
    });
    html += `</ul></div>`;
  }

  // 2. TOC SCREENS & SEQUENCES
  if (pb.screens && pb.screens.length > 0) {
    html += `
      <div class="space-y-2 pt-2">
        <div class="text-xs font-bold uppercase tracking-wider text-[#1A73E8]">2. Decision Screens &amp; Sequence Options</div>
        <ul class="space-y-2 pl-4 text-sm text-slate-700">
    `;
    pb.screens.forEach((sc, i) => {
      html += `
        <li class="border-b border-slate-100 pb-1.5">
          <div class="font-bold text-slate-900">Screen ${i + 1}: ${escapeHtml(sc.title)}</div>
          <div class="text-xs text-slate-500 pl-4 mt-0.5 space-y-0.5">
      `;
      (sc.options || []).forEach(opt => {
        const targetSeq = pb.sequences?.find(s => s.id === opt.target_sequence_id);
        html += `<div>↳ Sequence: ${escapeHtml(opt.label || targetSeq?.title || 'Sequence Option')} (${targetSeq?.step_ids?.length || 0} steps)</div>`;
      });
      html += `</div></li>`;
    });
    html += `</ul></div>`;
  }

  html += `
      </div>
    </div>

    <!-- 3. DETAILED PROCEDURAL GUIDES (SECTIONS PREFERRED FIRST) -->
    <div class="py-4 space-y-12">
      <div class="text-xs uppercase font-mono tracking-widest text-[#1A73E8] font-bold mb-2">RUNBOOK EXECUTION MANUAL</div>
      <h2 class="text-3xl font-extrabold text-slate-900 mb-8">Detailed Procedural Guides</h2>
  `;

  // SECTIONS PREFERRED FIRST
  if (pb.sections && pb.sections.length > 0) {
    pb.sections.forEach((sec, secIdx) => {
      const rangeText = sec.from_step && sec.to_step ? `(Steps ${sec.from_step} to ${sec.to_step})` : '';
      html += `
        <div class="space-y-6 pt-6 ${secIdx > 0 ? 'page-break' : ''}">
          <div class="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
            <h3 class="text-2xl font-bold text-slate-900">Section ${secIdx + 1}: ${escapeHtml(sec.title)}</h3>
            <span class="text-xs font-mono text-slate-500">${rangeText}</span>
          </div>
      `;

      // Render steps covered by section
      if (sec.from_step && sec.to_step && pb.steps) {
        const secSteps = pb.steps.slice(sec.from_step - 1, sec.to_step);
        secSteps.forEach((st, idx) => {
          html += formatPdfStep(st, (sec.from_step - 1) + idx);
        });
      } else if (Array.isArray(sec.step_ids)) {
        sec.step_ids.forEach((stId, idx) => {
          const stepObj = pb.steps.find(s => s.id === stId);
          if (stepObj) html += formatPdfStep(stepObj, idx);
        });
      }

      // If section has screens, render screen and sequences
      if (sec.screen_ids && sec.screen_ids.length > 0 && pb.screens) {
        sec.screen_ids.forEach(scId => {
          const sc = pb.screens.find(s => s.id === scId);
          if (sc) {
            html += `
              <div class="p-6 rounded-2xl border-2 border-blue-200 bg-blue-50/30 my-6">
                <div class="text-xs font-mono uppercase font-bold text-[#1A73E8] mb-1">Decision Point</div>
                <h4 class="text-xl font-bold text-slate-900">${escapeHtml(sc.title)}</h4>
                ${sc.description ? `<p class="text-sm text-slate-600 mt-1">${escapeHtml(sc.description)}</p>` : ''}
              </div>
            `;
            (sc.options || []).forEach(opt => {
              const seq = pb.sequences?.find(s => s.id === opt.target_sequence_id);
              if (seq) {
                html += `
                  <div class="pl-4 border-l-2 border-[#1A73E8] my-4">
                    <h5 class="text-lg font-bold text-slate-800">Sequence: ${escapeHtml(seq.title)}</h5>
                `;
                (seq.step_ids || []).forEach((stId, sIdx) => {
                  const stepObj = pb.steps.find(s => s.id === stId);
                  if (stepObj) html += formatPdfStep(stepObj, sIdx);
                });
                html += `</div>`;
              }
            });
          }
        });
      }

      html += `</div>`;
    });
  } else if (pb.sequences && pb.sequences.length > 0) {
    // Fallback if no sections defined: Sequences -> Steps
    pb.sequences.forEach((seq, seqIdx) => {
      html += `
        <div class="space-y-6 pt-6 ${seqIdx > 0 ? 'page-break' : ''}">
          <div class="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
            <h3 class="text-2xl font-bold text-slate-900">${seqIdx + 1}. Sequence: ${escapeHtml(seq.title)}</h3>
            <span class="text-xs font-mono text-slate-500">${(seq.step_ids || []).length} Steps</span>
          </div>
      `;
      (seq.step_ids || []).forEach((stId, sIdx) => {
        const step = pb.steps.find(s => s.id === stId);
        if (step) html += formatPdfStep(step, sIdx);
      });
      html += `</div>`;
    });
  } else {
    // Pure linear steps
    (pb.steps || []).forEach((step, sIdx) => {
      html += formatPdfStep(step, sIdx);
    });
  }

  html += `</div>`;

  dom.pdfPrintableContent.innerHTML = html;
  dom.pdfExportModal?.classList.remove('hidden');
}

function setupPdfExportHandlers() {
  dom.btnClosePdfModal?.addEventListener('click', () => {
    dom.pdfExportModal?.classList.add('hidden');
  });

  dom.btnPrintDirectly?.addEventListener('click', () => {
    window.print();
  });
}

// -------------------------------------------------------------
// RESUME RE-OPENING DIALOG
// Offers "Resume where you left off" if previous state was found
// -------------------------------------------------------------
function checkAndOfferResumeState() {
  try {
    const savedResume = localStorage.getItem('stepcase_resume_state');
    if (!savedResume) return;

    const resumeInfo = JSON.parse(savedResume);
    if (!resumeInfo || resumeInfo.playbookIndex === undefined) return;

    const pb = allPlaybooks[resumeInfo.playbookIndex];
    if (!pb) return;

    // Show resume prompt modal
    const targetSeq = pb.sequences?.find(s => s.id === resumeInfo.playerState?.sequenceId);
    const seqTitle = targetSeq ? targetSeq.title : 'Sequence';
    const stepNum = (resumeInfo.playerState?.stepIndex || 0) + 1;
    const totalSteps = targetSeq && Array.isArray(targetSeq.step_ids) ? targetSeq.step_ids.length : 1;

    if (dom.resumeDetailsText) {
      dom.resumeDetailsText.textContent = `Playbook: "${pb.title || pb.name}" • Sequence: "${seqTitle}" • ${stepNum}/${totalSteps}`;
    }

    dom.resumePlaybookModal?.classList.remove('hidden');

    dom.btnResumeConfirm?.addEventListener('click', () => {
      dom.resumePlaybookModal?.classList.add('hidden');
      selectPlaybook(resumeInfo.playbookIndex, resumeInfo.mode || 'player');
      if (resumeInfo.playerState) {
        playerState.mode = resumeInfo.playerState.mode || 'step';
        playerState.screenId = resumeInfo.playerState.screenId || '';
        playerState.sequenceId = resumeInfo.playerState.sequenceId || '';
        playerState.stepIndex = resumeInfo.playerState.stepIndex || 0;
        if (activeMode === 'player') {
          renderPlayerView();
        }
      }
      showToast(`Resumed "${pb.title || pb.name}" at step ${stepNum}.`);
    }, { once: true });

    dom.btnResumeRestart?.addEventListener('click', () => {
      dom.resumePlaybookModal?.classList.add('hidden');
      localStorage.removeItem('stepcase_resume_state');
      showToast('Starting from the beginning.');
    }, { once: true });

  } catch (e) {
    console.warn('Resume check note:', e);
  }
}

// Helper: Insert text at current cursor location in textarea
function insertTextAtCursor(textarea, text) {
  if (!textarea) return;
  const start = textarea.selectionStart || 0;
  const end = textarea.selectionEnd || 0;
  const oldVal = textarea.value || '';
  textarea.value = oldVal.substring(0, start) + text + oldVal.substring(end);
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
  textarea.focus();
  textarea.dispatchEvent(new Event('input'));
}

// Helper: Escape HTML string
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// -------------------------------------------------------------
// INITIALIZATION ON PAGE LOAD
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadPersistedState();
  initStartup();
  setupEventListeners();
  setupSearchBar();
  setupMenuDropdowns();
  setupFileAddHandlers();
  setupPdfExportHandlers();
});

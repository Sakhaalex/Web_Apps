"""
Step-case: Python Backend API Bridge
Implements the Hybrid Data Architecture:
- config.json: Structural skeleton only (Screens, Sequences, Sections, Error Buckets).
- ONE Markdown (.md) file per Sequence inside /content/, split by '---' delimiter.
- Assets: Media copied to /assets/ with relative path references.
- Flat Export: Generates structured User Manual with Table of Contents and Error Appendix.
"""

import os
import json
import shutil
import zipfile
import re
from typing import Dict, Any, List, Optional

try:
    import webview
except ImportError:
    webview = None


class StepCaseAPI:
    """Backend bridge exposed to JS via window.pywebview.api"""

    def __init__(self, workspace_dir: Optional[str] = None):
        self.workspace_dir = workspace_dir or os.path.join(os.path.dirname(os.path.abspath(__file__)), "playbooks")
        os.makedirs(self.workspace_dir, exist_ok=True)
        self.current_playbook = "On_using_Step_case"
        self.ensure_default_playbooks()

    # -------------------------------------------------------------
    # DEFAULT PLAYBOOKS SETUP (Strict Hybrid Architecture)
    # -------------------------------------------------------------
    def ensure_default_playbooks(self):
        """Creates the default Step-case playbook with hybrid structure."""
        for legacy in ["Install_Python_Playbook", "How_to_install_python"]:
            legacy_path = os.path.join(self.workspace_dir, legacy)
            if os.path.exists(legacy_path):
                shutil.rmtree(legacy_path, ignore_errors=True)
        self.create_sample_stepcase_playbook()

    def create_sample_stepcase_playbook(self):
        pb_dir = os.path.join(self.workspace_dir, "On_Using_Step_case")
        content_dir = os.path.join(pb_dir, "content")
        assets_dir = os.path.join(pb_dir, "assets")
        os.makedirs(content_dir, exist_ok=True)
        os.makedirs(assets_dir, exist_ok=True)

        config_path = os.path.join(pb_dir, "config.json")
        config = {
            "version": "1.0",
            "playbook_name": "On using step-case",
            "name": "On_using_step_case",
            "title": "On using step-case",
            "flow": {
                "start_screen": "screen_optional_routes",
                "screens": [
                    {
                        "id": "screen_optional_routes",
                        "name": "Adding Optional Routes",
                        "title": "Adding Optional Routes (Decision Point)",
                        "description": "Decision points branch the linear flow into dedicated sequence paths. Select a sequence doorway below:",
                        "disable_back": false,
                        "routes": [
                            {"name": "Creating a Sequence", "sequence_id": "seq_creating_sequence"},
                            {"name": "Entering a Sequence (The Doorway)", "sequence_id": "seq_entering_sequence"}
                        ]
                    }
                ],
                "sequences": [
                    {
                        "id": "seq_weightless_editor",
                        "name": "The Weightless Editor",
                        "file": "sequence_weightless_editor.md",
                        "sections": [{"name": "The Weightless Editor", "start_step": 0, "end_step": 1}]
                    },
                    {
                        "id": "seq_structuring_branching",
                        "name": "Structuring & Branching",
                        "file": "sequence_structuring_branching.md",
                        "sections": [{"name": "Structuring & Branching", "start_step": 0, "end_step": 1}]
                    },
                    {
                        "id": "seq_creating_sequence",
                        "name": "Creating a Sequence",
                        "file": "sequence_creating_sequence.md",
                        "sections": [{"name": "Sequence Authoring", "start_step": 0, "end_step": 1}]
                    },
                    {
                        "id": "seq_entering_sequence",
                        "name": "Entering a Sequence (The Doorway)",
                        "file": "sequence_entering_sequence.md",
                        "sections": [{"name": "Sequence Doorways", "start_step": 0, "end_step": 1}]
                    },
                    {
                        "id": "seq_execution_distribution",
                        "name": "Execution & Distribution",
                        "file": "sequence_execution_distribution.md",
                        "sections": [{"name": "Execution & Distribution", "start_step": 0, "end_step": 2}]
                    }
                ]
            },
            "sections": [
                {
                    "id": "sec_weightless_editor",
                    "name": "Section 1: The Weightless Editor",
                    "skippable": true,
                    "sequence_ids": ["seq_weightless_editor"]
                },
                {
                    "id": "sec_structuring_branching",
                    "name": "Section 2: Structuring & Branching",
                    "skippable": true,
                    "sequence_ids": ["seq_structuring_branching", "seq_creating_sequence", "seq_entering_sequence"],
                    "screen_ids": ["screen_optional_routes"]
                },
                {
                    "id": "sec_execution_distribution",
                    "name": "Section 3: Execution & Distribution",
                    "skippable": true,
                    "sequence_ids": ["seq_execution_distribution"]
                }
            ],
            "errors": []
        }
        with open(config_path, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=2, ensure_ascii=False)

        editor_md = os.path.join(content_dir, "sequence_weightless_editor.md")
        with open(editor_md, "w", encoding="utf-8") as f:
            f.write(
                "# The Blank Slate\n\n"
                "The Step-case editor rejects form-filling and modal popups. When authoring an instruction, the canvas is completely blank except for a single ruled blue line.\n\n"
                "Type your step text directly on the line. When you focus on a step, the entire application yields to your instruction:\n\n"
                "- Single active step isolation: No endless document scroll.\n"
                "- Ruled blue line guide: Keeps technical documentation concise and scannable.\n"
                "- Distraction-free typography: Clean monospace numbering and proportional typography.\n\n"
                "[ ] Confirm that only a single active step line is visible on the canvas\n"
                "[ ] Notice that previous and subsequent steps are completely hidden\n\n"
                "![Step-case Ruled Line](assets/canvas_ruled_line.svg)\n\n"
                "---\n\n"
                "# Single-Page Pagination\n\n"
                "Step-case enforces strict one-step-per-page pagination to prevent cognitive overload during procedure authoring and execution:\n\n"
                "1. **Newlines:** Pressing `Enter` creates a natural line break within the current step text.\n"
                "2. **Page-Flipping:** Pressing `Ctrl+Enter` (or clicking the blue `+` button in the header) instantly clears the canvas, saves the active step, and flips to a pristine, fresh blue line for the next step.\n"
                "3. **Sidebar Tree Sync:** The left sidebar automatically registers each new step and highlights the active node.\n\n"
                "To navigate between steps, use `ArrowLeft` at the start of text, `ArrowRight` at the end, or click any step in the left sidebar tree.\n\n"
                "```cmd\nCtrl+Enter\n```\n\n"
                "[ ] Press Enter to add a descriptive line of text\n"
                "[ ] Press Ctrl+Enter to turn the page to a new step\n"
            )

        struct_md = os.path.join(content_dir, "sequence_structuring_branching.md")
        with open(struct_md, "w", encoding="utf-8") as f:
            f.write(
                "# Using the 3-Dot Options Menu\n\n"
                "All insertion, attachment, and structural actions are consolidated into the vertical 3-dot (`⋮`) menu at the top right of the canvas, placed directly beside the quick `+` button:\n\n"
                "- **Add Step:** Turns the page to a fresh blank line.\n"
                "- **Add Screen:** Inserts a decision point for branching flows.\n"
                "- **Add Route:** Attaches a new sequence path to the active screen.\n"
                "- **Attach Image:** Copies screenshots or diagrams into the `/assets/` directory.\n"
                "- **Add Checklist Item:** Inserts verification checkdown boxes below the step.\n"
                "- **Add Copy Command:** Attaches terminal commands with 1-click clipboard copy.\n"
                "- **Mark Section:** Establishes a skippable milestone boundary.\n\n"
                "Keeping all options in this single menu eliminates visual clutter and keeps the authoring line pristine.\n\n"
                "[ ] Open the vertical 3-dot menu from the top-right toolbar\n"
                "[ ] Verify that action controls do not interfere with the ruled writing line\n\n"
                "---\n\n"
                "# The \"Mark a Section\" Feature\n\n"
                "Sections organize sequential steps into logical milestones (e.g., \"Prerequisites\", \"Installation\", \"Verification\").\n\n"
                "When an author marks a section boundary:\n"
                "1. **Visual Grouping:** The sidebar tree clusters the steps under an explicit collapsible section header.\n"
                "2. **Skippable Milestones:** In Player mode, operators see a prominent **Skip Section** control. Advanced users who have already satisfied prerequisite steps can bypass the entire group in a single click without breaking the runbook sequence.\n\n"
                "```bash\nstepcase --mark-section \"Runtime Prerequisites\" --skippable true\n```\n\n"
                "[ ] Group related prerequisite steps under a logical title\n"
                "[ ] Test section skipping in Player Mode\n"
            )

        create_md = os.path.join(content_dir, "sequence_creating_sequence.md")
        with open(create_md, "w", encoding="utf-8") as f:
            f.write(
                "# Creating a Sequence\n\n"
                "A Sequence is an independent linear sub-flow linked from a decision Screen (such as \"Windows Route\", \"macOS Route\", or \"Linux Route\").\n\n"
                "When authoring a branched playbook:\n"
                "1. Navigate to the Decision Point Screen in the sidebar or breadcrumb.\n"
                "2. In the Sequence Routes list, click **+ Add Route**.\n"
                "3. Name the route clearly to describe the exact path or condition.\n\n"
                "Step-case creates an isolated sequence file in `content/` and automatically updates `config.json`.\n\n"
                "[ ] Ensure every route has a concise, self-describing title\n"
                "[ ] Verify that no step text leaks into the Screen's router card\n\n"
                "---\n\n"
                "# Attaching Actions & Commands\n\n"
                "Within each sequence step, attach copyable commands and checkdown items to ensure zero-defect execution.\n\n"
                "Operators never manually copy or retype shell syntax:\n\n"
                "```powershell\nwinget install -e --id Python.Python.3.12\n```\n\n"
                "1. Click **Add Copy Command** from the 3-dot menu.\n"
                "2. Set the descriptive command label and target CLI string.\n"
                "3. In Player Mode, operators click **Copy** for instant, error-free terminal execution.\n\n"
                "[ ] Add a 1-click command field with appropriate shell flags\n"
                "[ ] Test terminal syntax copying directly from the step canvas\n"
            )

        enter_md = os.path.join(content_dir, "sequence_entering_sequence.md")
        with open(enter_md, "w", encoding="utf-8") as f:
            f.write(
                "# Entering a Sequence (The Doorway)\n\n"
                "In Step-case, Screens function strictly as Decision Point Routers. They isolate branching complexity from step authoring.\n\n"
                "The Doorway Model guarantees:\n"
                "- **Zero Nested Clutter:** Step instructions are never rendered inside the screen's sequence cards.\n"
                "- **Doorway Entry:** Clicking the arrow (`→`) button beside a sequence title opens its dedicated \"One Step Per Page\" canvas.\n"
                "- **Context Clarity:** The router view clears completely so the author can focus entirely on Step 1 of that branch.\n\n"
                "[ ] Locate the target route on the Screen router canvas\n"
                "[ ] Click the arrow (→) button to enter the sequence doorway\n\n"
                "---\n\n"
                "# Navigating Isolated Sequence Pages\n\n"
                "Once inside a sequence branch, you operate in the standard single-instance environment:\n\n"
                "1. **Step Pagination:** Use the step pill row or Prev/Next buttons to step through instructions.\n"
                "2. **Breadcrumb Trail:** The top navigation bar displays the lineage (e.g., `Screen Title › Sequence Title › Step 1 of 3`).\n"
                "3. **Return to Doorway:** Click the parent Screen title in the breadcrumb trail to return instantly to the decision point.\n\n"
                "```cmd\ngit checkout -b feature/isolated-sequence-flow\n```\n\n"
                "[ ] Navigate between steps using the pagination pill row\n"
                "[ ] Click the parent screen link in the breadcrumb to return to the decision router\n"
            )

        exec_md = os.path.join(content_dir, "sequence_execution_distribution.md")
        with open(exec_md, "w", encoding="utf-8") as f:
            f.write(
                "# Fullscreen Player Mode\n\n"
                "Click the **Play** button in the canvas header to enter the Fullscreen Presentation Runner.\n\n"
                "Player Mode is engineered for high-stakes operational execution:\n"
                "- **Immersive View:** Authoring sidebars, line editors, and buttons fade away completely.\n"
                "- **Large Typography:** High-contrast, large-format step text readable from a workstation or machine console.\n"
                "- **Ambient Progress:** Non-intrusive progress track indicating exact sequence position.\n"
                "- **Single-Click Commands:** Operators click commands directly to copy without mouse selection errors.\n\n"
                "[ ] Click the Play button in the top bar to launch Player Mode\n"
                "[ ] Verify that only the active step and execution controls are visible\n\n"
                "---\n\n"
                "# The Esc Key Logic\n\n"
                "In Player Mode, pressing the `Esc` key exits fullscreen mode to a clean windowed read-only viewer.\n\n"
                "**Important Safeguard:**\n"
                "Pressing `Esc` does **NOT** drop the operator back into the authoring editor or close their active playbook session. This deliberate constraint prevents:\n"
                "- Accidental loss of execution state in production.\n"
                "- Accidental edits during live standard operating procedure execution.\n\n"
                "To return to the Editor, operators must explicitly click the dedicated **Edit** action button in the player header.\n\n"
                "```bash\n# Press Esc to toggle windowed execution\n```\n\n"
                "[ ] Press Esc during fullscreen playback to confirm windowed state\n"
                "[ ] Notice that active step state, checklist checks, and position remain preserved\n\n"
                "---\n\n"
                "# Exporting to PDF or ZIP\n\n"
                "Step-case playbooks are 100% portable, self-contained runbook archives.\n\n"
                "Distribution options:\n"
                "1. **Export ZIP:** Bundles the `config.json` routing skeleton, individual `content/*.md` files, and local assets into a standard `.zip` file for cross-machine deployment.\n"
                "2. **Print / PDF Manual:** Compiles the entire branched playbook into a linear, professional user manual featuring a Title page, auto-generated Table of Contents, formatted steps, and an Appendix of known error paths.\n\n"
                "```bash\nstepcase export --format zip --output ./dist/on_using_stepcase.zip\n```\n\n"
                "[ ] Test exporting a portable .zip package from the top menu\n"
                "[ ] Test generating a publication-grade PDF print preview\n"
            )

    # -------------------------------------------------------------
    # PLAYBOOK LISTING & LOADING
    # -------------------------------------------------------------
    def list_playbooks(self) -> List[Dict[str, Any]]:
        """Scans workspace and returns list of playbooks."""
        result = []
        if not os.path.exists(self.workspace_dir):
            return result

        for item in sorted(os.listdir(self.workspace_dir)):
            p_dir = os.path.join(self.workspace_dir, item)
            config_p = os.path.join(p_dir, "config.json")
            if os.path.isdir(p_dir) and os.path.exists(config_p):
                try:
                    with open(config_p, "r", encoding="utf-8") as f:
                        cfg = json.load(f)
                    result.append({
                        "folder": item,
                        "name": cfg.get("playbook_name", item)
                    })
                except Exception:
                    pass
        return result

    def load_playbook(self, folder_name: str) -> Dict[str, Any]:
        """
        Loads the hybrid playbook:
        1. Reads config.json skeleton
        2. For each sequence, reads sequence_<name>.md and splits by '---' into steps
        3. For each error, reads sequence_<err>.md and splits by '---'
        4. Lists assets
        """
        p_dir = os.path.join(self.workspace_dir, folder_name)
        config_p = os.path.join(p_dir, "config.json")
        if not os.path.exists(config_p):
            raise FileNotFoundError(f"Missing config.json in {folder_name}")

        with open(config_p, "r", encoding="utf-8") as f:
            config = json.load(f)

        content_dir = os.path.join(p_dir, "content")
        loaded_sequences = []

        for seq in config.get("flow", {}).get("sequences", []):
            seq_file = seq.get("file", f"sequence_{seq.get('id')}.md")
            abs_seq_p = os.path.join(content_dir, seq_file)
            steps = []
            if os.path.exists(abs_seq_p):
                with open(abs_seq_p, "r", encoding="utf-8") as f:
                    raw_text = f.read()
                # Split by standard Markdown horizontal rule delimiter
                raw_steps = re.split(r'\n\s*---\s*\n', raw_text)
                steps = [s.strip() for s in raw_steps if s.strip()]

            if not steps:
                steps = ["# New Step\n\nType step instructions here..."]

            loaded_sequences.append({
                "id": seq.get("id"),
                "name": seq.get("name"),
                "file": seq_file,
                "sections": seq.get("sections", []),
                "steps": steps
            })

        # Load error buckets
        loaded_errors = []
        for err in config.get("errors", []):
            err_file = err.get("file", f"sequence_{err.get('id')}.md")
            abs_err_p = os.path.join(content_dir, err_file)
            err_steps = []
            if os.path.exists(abs_err_p):
                with open(abs_err_p, "r", encoding="utf-8") as f:
                    raw_text = f.read()
                raw_steps = re.split(r'\n\s*---\s*\n', raw_text)
                err_steps = [s.strip() for s in raw_steps if s.strip()]
            if not err_steps:
                err_steps = [f"# Troubleshooting: {err.get('name')}\n\nTroubleshooting guidance here..."]

            loaded_errors.append({
                "id": err.get("id"),
                "name": err.get("name"),
                "sequence_id": err.get("sequence_id", err.get("id")),
                "file": err_file,
                "steps": err_steps
            })

        # Discover assets
        assets_dir = os.path.join(p_dir, "assets")
        assets = []
        if os.path.exists(assets_dir):
            assets = sorted(os.listdir(assets_dir))

        self.current_playbook = folder_name

        return {
            "folder": folder_name,
            "playbook_name": config.get("playbook_name", folder_name),
            "flow": {
                "start_screen": config.get("flow", {}).get("start_screen"),
                "screens": config.get("flow", {}).get("screens", []),
                "sequences": loaded_sequences
            },
            "errors": loaded_errors,
            "assets": assets
        }

    # -------------------------------------------------------------
    # PLAYBOOK SAVING (Preserving the Hybrid Model)
    # -------------------------------------------------------------
    def save_playbook(self, playbook_data: Dict[str, Any]) -> bool:
        """
        Saves:
        1. config.json containing ONLY skeleton & metadata
        2. ONE Markdown file per Sequence, joining steps with '---'
        3. ONE Markdown file per Error bucket, joining steps with '---'
        """
        folder_name = playbook_data.get("folder", playbook_data.get("playbook_name", "Playbook")).replace(" ", "_")
        p_dir = os.path.join(self.workspace_dir, folder_name)
        content_dir = os.path.join(p_dir, "content")
        assets_dir = os.path.join(p_dir, "assets")
        os.makedirs(content_dir, exist_ok=True)
        os.makedirs(assets_dir, exist_ok=True)

        config_skeleton = {
            "playbook_name": playbook_data.get("playbook_name", folder_name),
            "flow": {
                "start_screen": playbook_data.get("flow", {}).get("start_screen"),
                "screens": playbook_data.get("flow", {}).get("screens", []),
                "sequences": []
            },
            "errors": []
        }

        # Save Sequences (ONE Markdown file per sequence)
        for seq in playbook_data.get("flow", {}).get("sequences", []):
            seq_id = seq.get("id", "seq_main")
            seq_file = seq.get("file") or f"sequence_{seq_id}.md"
            file_path = os.path.join(content_dir, seq_file)

            steps = seq.get("steps", [])
            raw_text = "\n\n---\n\n".join([s.strip() for s in steps if s.strip()]) if steps else "# New Step\n"

            with open(file_path, "w", encoding="utf-8") as f:
                f.write(raw_text)

            config_skeleton["flow"]["sequences"].append({
                "id": seq_id,
                "name": seq.get("name", "Sequence"),
                "file": seq_file,
                "sections": seq.get("sections", [])
            })

        # Save Errors (ONE Markdown file per error sequence)
        for err in playbook_data.get("errors", []):
            err_id = err.get("id", "err_general")
            err_file = err.get("file") or f"sequence_{err_id}.md"
            file_path = os.path.join(content_dir, err_file)

            err_steps = err.get("steps", [])
            raw_text = "\n\n---\n\n".join([s.strip() for s in err_steps if s.strip()]) if err_steps else f"# {err.get('name')}\n"

            with open(file_path, "w", encoding="utf-8") as f:
                f.write(raw_text)

            config_skeleton["errors"].append({
                "id": err_id,
                "name": err.get("name", "Error"),
                "sequence_id": err.get("sequence_id", err_id),
                "file": err_file
            })

        # Write config.json
        config_path = os.path.join(p_dir, "config.json")
        with open(config_path, "w", encoding="utf-8") as f:
            json.dump(config_skeleton, f, indent=2, ensure_ascii=False)

        self.current_playbook = folder_name
        return True

    # -------------------------------------------------------------
    # ASSET HANDLING
    # -------------------------------------------------------------
    def attach_media_dialog(self, folder_name: str) -> Optional[str]:
        """Opens native file dialog, copies image into /assets/, returns relative Markdown path."""
        window = webview.windows[0] if webview and webview.windows else None
        if not window:
            return None

        result = window.create_file_dialog(
            dialog_type=webview.OPEN_DIALOG,
            file_types=('Image Files (*.png;*.jpg;*.jpeg;*.svg;*.gif;*.webp)', 'All files (*.*)')
        )
        if not result:
            return None

        source_path = result[0] if isinstance(result, (list, tuple)) else result
        p_dir = os.path.join(self.workspace_dir, folder_name.replace(" ", "_"))
        assets_dir = os.path.join(p_dir, "assets")
        os.makedirs(assets_dir, exist_ok=True)

        filename = os.path.basename(source_path)
        dest_path = os.path.join(assets_dir, filename)

        if os.path.abspath(source_path) != os.path.abspath(dest_path):
            shutil.copy2(source_path, dest_path)

        return f"assets/{filename}"

    # -------------------------------------------------------------
    # FLAT EXPORT (Print to PDF / Book)
    # Generates:
    # 1. Title Page (Playbook Name)
    # 2. Auto-generated Index (Table of Contents based on Sections)
    # 3. Core Sequences & Steps
    # 4. Appendix: Known Errors & Troubleshooting
    # -------------------------------------------------------------
    def export_flat_manual(self, folder_name: str) -> Dict[str, Any]:
        """Compiles the entire hybrid playbook into a single structured user manual."""
        pb = self.load_playbook(folder_name)
        title = pb.get("playbook_name", folder_name)

        toc = []
        body_sections = []

        # Table of contents & content compilation
        for seq in pb.get("flow", {}).get("sequences", []):
            seq_title = seq.get("name", "Sequence")
            sections = seq.get("sections", [])
            steps = seq.get("steps", [])

            if sections:
                for sec in sections:
                    s_name = sec.get("name", "Section")
                    s_start = sec.get("start_step", 0)
                    s_end = sec.get("end_step", len(steps) - 1)
                    toc.append(f"{seq_title} — {s_name} (Steps {s_start + 1}-{s_end + 1})")
            else:
                toc.append(f"{seq_title} ({len(steps)} steps)")

            # Steps
            body_sections.append({
                "type": "sequence",
                "name": seq_title,
                "sections": sections,
                "steps": steps
            })

        # Appendix: Errors
        error_items = []
        for err in pb.get("errors", []):
            error_items.append({
                "name": err.get("name"),
                "steps": err.get("steps", [])
            })

        return {
            "title": title,
            "toc": toc,
            "body": body_sections,
            "errors": error_items
        }

    # -------------------------------------------------------------
    # PORTABLE ZIP PACKAGING
    # -------------------------------------------------------------
    def export_zip(self, folder_name: str, output_path: Optional[str] = None) -> Optional[str]:
        """Packages folder into .zip."""
        p_dir = os.path.join(self.workspace_dir, folder_name.replace(" ", "_"))
        if not os.path.exists(p_dir):
            return None

        window = webview.windows[0] if webview and webview.windows else None
        if not output_path and window:
            default_name = f"{folder_name}.zip"
            save_dialog = window.create_file_dialog(
                dialog_type=webview.SAVE_DIALOG,
                save_filename=default_name,
                file_types=('ZIP archive (*.zip)',)
            )
            if not save_dialog:
                return None
            output_path = save_dialog if isinstance(save_dialog, str) else save_dialog[0]

        if not output_path:
            return None

        base_name = os.path.basename(os.path.normpath(p_dir))
        with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for root, _, files in os.walk(p_dir):
                for f in files:
                    abs_f = os.path.join(root, f)
                    rel_f = os.path.relpath(abs_f, p_dir)
                    zipf.write(abs_f, os.path.join(base_name, rel_f))
        return output_path

    def import_zip(self) -> Optional[str]:
        """Imports .zip into workspace."""
        window = webview.windows[0] if webview and webview.windows else None
        if not window:
            return None

        result = window.create_file_dialog(
            dialog_type=webview.OPEN_DIALOG,
            file_types=('ZIP archive (*.zip)',)
        )
        if not result:
            return None

        zip_p = result[0] if isinstance(result, (list, tuple)) else result
        with zipfile.ZipFile(zip_p, "r") as zipf:
            zipf.extractall(self.workspace_dir)

        for root, _, files in os.walk(self.workspace_dir):
            if "config.json" in files:
                return os.path.basename(root)

        return None

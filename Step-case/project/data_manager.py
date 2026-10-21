"""
Step-case: Data Manager Module
Handles JSON serialization, writing .md files, copying assets, and zip import/export.
"""

import json
import os
import shutil
import zipfile
from typing import Dict, Any, List, Optional


class PlaybookDataManager:
    """Manages the folder structure, config.json, markdown files, assets, and zip export/import."""

    @staticmethod
    def get_default_playbook() -> Dict[str, Any]:
        """Returns the default initial 'Installing Python' interactive playbook."""
        return {
            "version": "1.0",
            "name": "Installing_Python",
            "title": "Installing Python & Developer Tools",
            "description": "Complete interactive onboarding and installation runbook across operating systems.",
            "start_screen_id": "screen_os_select",
            "screens": [
                {
                    "id": "screen_os_select",
                    "title": "Select Target Operating System",
                    "description": "Choose the platform you are deploying or setting up Python on.",
                    "disable_back": False,
                    "type": "decision",
                    "options": [
                        {
                            "id": "opt_win",
                            "label": "Microsoft Windows (10 / 11)",
                            "description": "Installer wizard flow with PATH configuration checklist.",
                            "target_sequence_id": "seq_windows"
                        },
                        {
                            "id": "opt_mac",
                            "label": "Apple macOS (Apple Silicon / Intel)",
                            "description": "Homebrew package manager installation.",
                            "target_sequence_id": "seq_macos"
                        },
                        {
                            "id": "opt_linux",
                            "label": "Ubuntu / Debian Linux",
                            "description": "APT package repository and virtualenv tooling.",
                            "target_sequence_id": "seq_linux"
                        }
                    ]
                },
                {
                    "id": "screen_completion",
                    "title": "Installation Verification & Next Steps",
                    "description": "Confirm successful installation and proceed with verification.",
                    "disable_back": True,
                    "type": "decision",
                    "options": [
                        {
                            "id": "opt_verify",
                            "label": "Run Verification Suite",
                            "description": "Execute diagnostic commands and test script.",
                            "target_sequence_id": "seq_verification"
                        }
                    ]
                }
            ],
            "sequences": [
                {
                    "id": "seq_windows",
                    "title": "Windows Installation Flow",
                    "step_ids": ["step_win_download", "step_win_run_install", "step_win_verify"],
                    "next_screen_id": "screen_completion"
                },
                {
                    "id": "seq_macos",
                    "title": "macOS Homebrew Flow",
                    "step_ids": ["step_mac_brew", "step_mac_install"],
                    "next_screen_id": "screen_completion"
                },
                {
                    "id": "seq_linux",
                    "title": "Linux APT Flow",
                    "step_ids": ["step_linux_apt", "step_linux_venv"],
                    "next_screen_id": "screen_completion"
                },
                {
                    "id": "seq_verification",
                    "title": "Final Environment Validation",
                    "step_ids": ["step_final_test"],
                    "next_screen_id": None
                }
            ],
            "steps": [
                {
                    "id": "step_win_download",
                    "title": "Download Official Windows Installer",
                    "content_file": "content/step_win_download.md",
                    "content_text": "### Step 1: Download Python 3.12 64-bit\n\nNavigate to the official Python distribution mirror and obtain the Windows x86-64 executable installer.\n\n> **Important:** Ensure you download the official binary signed by the Python Software Foundation.",
                    "assets": ["python_banner.svg"],
                    "disable_back": False,
                    "checklist": [
                        {"id": "c1", "text": "Verified 64-bit architecture on host machine", "checked": False},
                        {"id": "c2", "text": "Downloaded python-3.12.x-amd64.exe", "checked": False}
                    ],
                    "copy_fields": [
                        {"label": "Download URL", "value": "https://www.python.org/downloads/windows/"},
                        {"label": "SHA256 Checksum Verification Command", "value": "Get-FileHash -Algorithm SHA256 .\\python-3.12.exe"}
                    ]
                },
                {
                    "id": "step_win_run_install",
                    "title": "Execute Windows Setup Wizard",
                    "content_file": "content/step_win_run_install.md",
                    "content_text": "### Step 2: Critical PATH Configuration\n\nRun the installer executable as Administrator.\n\n**CRITICAL ACTION:** Check the box that says **`Add python.exe to PATH`** before clicking **Install Now**.\n\nFailure to check this will prevent terminal invocation.",
                    "assets": ["install_wizard.svg"],
                    "disable_back": False,
                    "checklist": [
                        {"id": "c3", "text": "Launched installer with Admin privileges", "checked": False},
                        {"id": "c4", "text": "CHECKED 'Add python.exe to PATH' checkbox", "checked": False},
                        {"id": "c5", "text": "Completed wizard without errors", "checked": False}
                    ],
                    "copy_fields": [
                        {"label": "Silent Installation Command", "value": "python-3.12.exe /quiet InstallAllUsers=1 PrependPath=1"}
                    ]
                },
                {
                    "id": "step_win_verify",
                    "title": "Validate Windows CLI Execution",
                    "content_file": "content/step_win_verify.md",
                    "content_text": "### Step 3: Terminal Verification\n\nOpen a fresh PowerShell or Command Prompt terminal window to reload environment PATH variables.",
                    "assets": [],
                    "disable_back": False,
                    "checklist": [
                        {"id": "c6", "text": "Opened fresh PowerShell instance", "checked": False},
                        {"id": "c7", "text": "Ran python --version successfully", "checked": False}
                    ],
                    "copy_fields": [
                        {"label": "Verify Version", "value": "python --version"},
                        {"label": "Verify Pip Package Manager", "value": "pip --version"}
                    ]
                },
                {
                    "id": "step_mac_brew",
                    "title": "Ensure Homebrew Package Manager",
                    "content_file": "content/step_mac_brew.md",
                    "content_text": "### Step 1: Check or Install Homebrew\n\nHomebrew is the standard package manager for macOS developers.",
                    "assets": ["terminal_icon.svg"],
                    "disable_back": False,
                    "checklist": [
                        {"id": "c8", "text": "Tested `brew --version` in Terminal.app", "checked": False}
                    ],
                    "copy_fields": [
                        {"label": "Homebrew One-Line Install", "value": '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'}
                    ]
                },
                {
                    "id": "step_mac_install",
                    "title": "Install Python Formula",
                    "content_file": "content/step_mac_install.md",
                    "content_text": "### Step 2: Install via Homebrew Formula\n\nRun the brew command to fetch the optimized bottle for Apple Silicon or Intel architectures.",
                    "assets": [],
                    "disable_back": False,
                    "checklist": [
                        {"id": "c9", "text": "Ran brew install python@3.12", "checked": False},
                        {"id": "c10", "text": "Tested `python3 --version`", "checked": False}
                    ],
                    "copy_fields": [
                        {"label": "Install Formula", "value": "brew install python@3.12"},
                        {"label": "Add to Zsh Profile", "value": 'echo \'export PATH="/opt/homebrew/opt/python@3.12/bin:$PATH"\' >> ~/.zshrc'}
                    ]
                },
                {
                    "id": "step_linux_apt",
                    "title": "Update Repository & Install Python3",
                    "content_file": "content/step_linux_apt.md",
                    "content_text": "### Step 1: Debian/Ubuntu Aptitude Setup\n\nUpdate package lists and install standard python3 runtime with pip tooling.",
                    "assets": ["terminal_icon.svg"],
                    "disable_back": False,
                    "checklist": [
                        {"id": "c11", "text": "System apt repositories updated", "checked": False},
                        {"id": "c12", "text": "Installed python3 and python3-pip", "checked": False}
                    ],
                    "copy_fields": [
                        {"label": "Update & Install Command", "value": "sudo apt update && sudo apt install -y python3 python3-pip python3-venv"}
                    ]
                },
                {
                    "id": "step_linux_venv",
                    "title": "Create Test Virtual Environment",
                    "content_file": "content/step_linux_venv.md",
                    "content_text": "### Step 2: Verify Isolated Environment (PEP 668)\n\nModern distributions require creating virtual environments for package installations.",
                    "assets": [],
                    "disable_back": False,
                    "checklist": [
                        {"id": "c13", "text": "Created .venv directory", "checked": False},
                        {"id": "c14", "text": "Successfully activated environment", "checked": False}
                    ],
                    "copy_fields": [
                        {"label": "Create venv", "value": "python3 -m venv .venv"},
                        {"label": "Activate venv", "value": "source .venv/bin/activate"}
                    ]
                },
                {
                    "id": "step_final_test",
                    "title": "Run Smoke Test Script",
                    "content_file": "content/step_final_test.md",
                    "content_text": "### Congratulations: System Ready!\n\nAll prerequisite steps have completed successfully. Run this one-line benchmark to verify interactive interpreter capabilities.",
                    "assets": ["success_shield.svg"],
                    "disable_back": True,
                    "checklist": [
                        {"id": "c15", "text": "Script output confirmed: 'Step-case Playbook Complete!'", "checked": False}
                    ],
                    "copy_fields": [
                        {"label": "Smoke Test Command", "value": 'python -c "import sys; print(f\'Python {sys.version.split()[0]} configured successfully via Step-case!\')\"'}
                    ]
                }
            ]
        }

    @classmethod
    def save_playbook(cls, playbook: Dict[str, Any], base_directory: str) -> str:
        """
        Saves playbook structure complying strictly with:
        - Strict File Separation: config.json ONLY stores the map/hierarchy (never step paragraphs).
        - Markdown Delimiters: Step texts saved in .md files. Multiple steps within the same Sequence
          are saved in a single .md file (sequence_<id>.md), separated by the standard Markdown horizontal rule (---).
        - Asset Cleanup (Garbage Collection): Removes orphaned assets not referenced by any step.
        """
        folder_name = playbook.get("name", "Untitled_Playbook").strip().replace(" ", "_")
        playbook_dir = os.path.join(base_directory, folder_name)
        content_dir = os.path.join(playbook_dir, "content")
        assets_dir = os.path.join(playbook_dir, "assets")

        os.makedirs(content_dir, exist_ok=True)
        os.makedirs(assets_dir, exist_ok=True)

        # Clone config without bloating with full content_text (config.json ONLY stores hierarchy)
        config_data = {
            "version": playbook.get("version", "1.0"),
            "name": folder_name,
            "title": playbook.get("title", folder_name),
            "description": playbook.get("description", ""),
            "start_screen_id": playbook.get("start_screen_id", ""),
            "screens": playbook.get("screens", []),
            "sequences": playbook.get("sequences", []),
            "steps": []
        }

        # Index steps by id for fast retrieval
        steps_map = {step.get("id"): step for step in playbook.get("steps", [])}

        # 1. Group steps by sequence and save into single sequence_<seq_id>.md files separated by '---'
        saved_step_ids = set()
        for seq in playbook.get("sequences", []):
            seq_id = seq.get("id", "seq_main")
            seq_step_ids = seq.get("step_ids", [])
            seq_md_filename = f"sequence_{seq_id}.md"
            seq_md_abs_path = os.path.join(content_dir, seq_md_filename)

            step_texts = []
            for st_id in seq_step_ids:
                step_obj = steps_map.get(st_id)
                if step_obj:
                    step_texts.append(step_obj.get("content_text", ""))
                    saved_step_ids.add(st_id)

            if step_texts:
                with open(seq_md_abs_path, "w", encoding="utf-8") as f:
                    f.write("\n\n---\n\n".join(step_texts))

        # 2. Write individual step entries into config.json skeleton (pointing to file, assets, checklists)
        for step in playbook.get("steps", []):
            step_id = step.get("id", "step_unknown")
            step_entry = {
                "id": step_id,
                "title": step.get("title", "Untitled Step"),
                "content_file": f"content/{step_id}.md",
                "assets": step.get("assets", []),
                "checklist": step.get("checklist", []),
                "copy_fields": step.get("copy_fields", []),
                "disable_back": step.get("disable_back", False)
            }
            # Also keep individual step .md for direct individual node loading if needed
            ind_md_path = os.path.join(content_dir, f"{step_id}.md")
            with open(ind_md_path, "w", encoding="utf-8") as f:
                f.write(step.get("content_text", ""))

            config_data["steps"].append(step_entry)

        # 3. Asset Cleanup (Garbage Collection): Remove orphaned images not referenced in any step
        all_referenced_assets = set()
        for step in playbook.get("steps", []):
            for a in step.get("assets", []):
                all_referenced_assets.add(a)

        if os.path.exists(assets_dir):
            for existing_asset in os.listdir(assets_dir):
                if existing_asset not in all_referenced_assets:
                    try:
                        os.remove(os.path.join(assets_dir, existing_asset))
                    except Exception:
                        pass

        # Write config.json
        config_file_path = os.path.join(playbook_dir, "config.json")
        with open(config_file_path, "w", encoding="utf-8") as f:
            json.dump(config_data, f, indent=2, ensure_ascii=False)

        return playbook_dir

    @classmethod
    def load_playbook(cls, playbook_dir: str) -> Dict[str, Any]:
        """
        Loads a playbook from its folder structure:
        - Reads config.json skeleton
        - Hydrates step content from .md files (supporting sequence .md split by '---' and individual .md)
        - Handles missing images gracefully with minimal placeholders
        """
        config_file_path = os.path.join(playbook_dir, "config.json")
        if not os.path.exists(config_file_path):
            raise FileNotFoundError(f"Missing config.json in {playbook_dir}")

        with open(config_file_path, "r", encoding="utf-8") as f:
            playbook = json.load(f)

        content_dir = os.path.join(playbook_dir, "content")

        # Hydrate content_text: Check if sequence_<id>.md exists, split by '---'
        sequence_step_map: Dict[str, List[str]] = {}
        for seq in playbook.get("sequences", []):
            seq_id = seq.get("id")
            seq_file = f"sequence_{seq_id}.md"
            seq_path = os.path.join(content_dir, seq_file)
            if os.path.exists(seq_path):
                with open(seq_path, "r", encoding="utf-8") as f:
                    raw = f.read()
                parts = [p.strip() for p in raw.split("\n---\n") if p.strip()]
                if not parts:
                    parts = [p.strip() for p in raw.split("---") if p.strip()]
                sequence_step_map[seq_id] = parts

        # Assign hydrated text to steps
        for step in playbook.get("steps", []):
            step_id = step.get("id")
            assigned = False

            # Check if this step is part of a sequence with sequence_<seq_id>.md
            for seq in playbook.get("sequences", []):
                if step_id in seq.get("step_ids", []):
                    idx = seq["step_ids"].index(step_id)
                    seq_parts = sequence_step_map.get(seq.get("id"), [])
                    if idx < len(seq_parts):
                        step["content_text"] = seq_parts[idx]
                        assigned = True
                        break

            if not assigned:
                rel_file = step.get("content_file", f"content/{step_id}.md")
                abs_file = os.path.join(playbook_dir, rel_file) if rel_file else ""
                if abs_file and os.path.exists(abs_file):
                    with open(abs_file, "r", encoding="utf-8") as f:
                        step["content_text"] = f.read()
                else:
                    step["content_text"] = f"# {step.get('title', 'Step')}\n\n(Content file not found)"

        return playbook

    @classmethod
    def copy_asset(cls, playbook_dir: str, source_path: str) -> str:
        """Copies an asset into the playbook's /assets/ folder and returns the filename."""
        assets_dir = os.path.join(playbook_dir, "assets")
        os.makedirs(assets_dir, exist_ok=True)
        filename = os.path.basename(source_path)
        dest_path = os.path.join(assets_dir, filename)

        if os.path.abspath(source_path) != os.path.abspath(dest_path):
            shutil.copy2(source_path, dest_path)

        return filename

    @classmethod
    def export_as_zip(cls, playbook_dir: str, output_zip_path: str) -> str:
        """Compresses the playbook folder into a self-contained portable .zip file."""
        playbook_name = os.path.basename(os.path.normpath(playbook_dir))
        with zipfile.ZipFile(output_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for root, _, files in os.walk(playbook_dir):
                for file in files:
                    abs_path = os.path.join(root, file)
                    rel_path = os.path.relpath(abs_path, playbook_dir)
                    # Archive inside a top-level playbook folder name for clean extraction
                    arcname = os.path.join(playbook_name, rel_path)
                    zipf.write(abs_path, arcname)

        return output_zip_path

    @classmethod
    def import_from_zip(cls, zip_path: str, extract_base_dir: str) -> str:
        """Extracts a playbook .zip into extract_base_dir and returns the loaded playbook folder path."""
        with zipfile.ZipFile(zip_path, "r") as zipf:
            zipf.extractall(extract_base_dir)

        # Locate the directory containing config.json
        for root, _, files in os.walk(extract_base_dir):
            if "config.json" in files:
                return root

        raise ValueError("The provided ZIP archive does not contain a valid config.json playbook file.")

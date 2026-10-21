# Step-case — Interactive Playbook & Runbook Desktop Application

**Step-case** is an offline, interactive playbook and runbook desktop application built with Python and PyQt6. It empowers layman users to visually construct, package, and execute interactive step-by-step documentations (Standard Operating Procedures, developer installations, incident response, and error-handling workflows) with zero raw JSON or Markdown knowledge required.

*Made with Love by Alex Sakha*

---

## 🛠 Key Architecture & Modular Breakdown

The application strictly enforces modularity across dedicated, lightweight Python modules:

- **`main.py`**:
  - Main application entry point and lifecycle manager.
  - **Launch sequence**: Displays the animated geometric **'AXC' SVG splash screen** for exactly 1 second.
  - **License check**: Prompts the classic Tkinter-style Accept/Decline message box stating: *"Made with Love by Alex Sakha"*. Step-case only opens if the user clicks **Accept**.
  - **Menu Bar**: Full standard menu structure (`File`, `Edit`, `Options`, `About`).
  - **Collapsible Sidebar**: Tree hierarchy displaying `Screens` (Decision Multiplexers) → `Sequences` → `Steps`.
  - **Theming Engine**: Strictly two pure high-contrast themes:
    - **Light Theme**: Pure Blue (`#0033AA` / `#0055FF`) and White (`#FFFFFF`) only.
    - **Dark Theme**: Pure Black (`#000000`) and White (`#FFFFFF`) only.

- **`data_manager.py`**:
  - Handles JSON serialization into `config.json`.
  - Writes and synchronizes `.md` files in the `/content/` directory.
  - Copies media assets (images, videos, SVGs) into the `/assets/` directory.
  - Provides 1-click **ZIP export and import** for seamless portability between host systems without broken paths.

- **`ui_builder.py`**:
  - **Visual No-Code Builder**: Authors build workflows using clean GUI form fields without seeing or touching raw syntax.
  - **Decision Screens**: Configure multiple routing branches (Multiplexers) to steer users toward different sequences.
  - **"Disable Back Navigation" Safety Toggle**: Can be enabled for irreversible real-world software steps.
  - **Checklists & Copy Fields**: Add interactive checkboxes and 1-click copy-to-clipboard commands.

- **`ui_player.py`**:
  - **Execution Engine**: Renders one step at a time with large, screen-wise typography using clean "Nano Sans" / system font.
  - **Next / Back Navigation**: Intelligent state stack with safety protection for irreversible steps.
  - **Interactive Verification**: Real-time progress tracking, checklist state persistence, and 1-click clipboard copying.
  - **Decision Multiplexer**: Prominent visual choice cards for branching workflows.

---

## 🚀 Running Step-case Locally (Desktop)

### 1. Requirements
Ensure you have Python 3.9+ installed:
```bash
pip install -r requirements.txt
```

### 2. Launch
```bash
python main.py
```

1. The AXC splash screen appears for 1 second.
2. The license dialog appears: *"Made with Love by Alex Sakha"*.
3. Click **Accept** to enter Step-case.

---

## 📦 Playbook Directory Structure

Each Playbook is self-contained:
```text
Installing_Python/
├── config.json         # Routing multiplexer skeleton and metadata
├── content/            # Individual step texts (.md)
│   ├── step_1.md
│   └── ...
└── assets/             # Images, screenshots, and diagrams
    ├── python_banner.svg
    └── ...
```

Exporting from Step-case bundles this entire structure into a `.zip` archive that can be ported to any other machine.

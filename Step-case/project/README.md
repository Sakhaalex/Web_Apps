# Step-case — Interactive Playbook & Runbook Desktop App

**Step-case** is an ultra-minimalist offline desktop application designed to document, structure, and execute standard operating procedures (SOPs), installations, and software troubleshooting without clunky forms or developer bloat.

---

## 🛠 Tech Stack & Architecture

- **Offline-First Web Runtime:** Single-page application designed for instant offline execution.
- **Frontend Architecture:** Vanilla JavaScript + Google Antigravity Design + Tailwind CSS.
- **Strict Terminology:** Standardized exclusively on **Playbook**, **Sequence**, **Screen**, and **Steps**. (No confusing developer jargon like branches, routes, or paths).
- **Themes:** Extensible theme engine featuring a high-contrast **Black & White** dark theme and a clean **Blue & White** light theme.

---

## 📐 Core Terminology (Strict Definitions)

1. **Playbook:** The master document or container for a complete guide or procedure (e.g., *How to install python*, *On using Step-case*).
2. **Sequence:** A continuous, linear flow of procedural steps for execution (e.g., *Windows Installation Flow*, *macOS Homebrew Flow*).
3. **Step:** An individual instruction unit displayed on the canvas, containing markdown instructions, interactive checklists, copy fields, and media.
4. **Screen:** Structural decision points between sequences.

---

## 🎨 UI Modes & Workflows

### 1. Editor Mode
- **Left Sidebar:** Playbooks file tree with quick add, reorder, and collapsible panel (`Ctrl+B`).
- **Main Top Search Bar:** Centered omnibox with instant keyboard shortcut (`Ctrl+K`) to filter across Playbooks, Sequences, and Steps.
- **Main Canvas:** Edge-to-edge WYSIWYG editing canvas with flat underline inputs for rapid authoring.
- **Action Toolbar:** Add Steps, Sequences, Screens, and media attachments instantly.

### 2. Player Mode (Operator Execution)
- **High-Focus Canvas:** Large typography showing one documentation step at a time.
- **Step Progress Tracker:** Clean step indicators (`1/3`, `2/3`, `3/3`) and progress percentage.
- **Simple 'Jump to' Dropdown:** Instant navigation directly to any step across sequences without distracting interruptions.
- **Interactive Checklists:** Clickable verification checklists ensuring zero procedural errors.
- **1-Click Copy Fields:** Instant clipboard copy for shell commands, paths, and URLs.

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| **Ctrl + K** | Open Global Search Bar |
| **Ctrl + B** | Toggle Left Sidebar (Open / Close) |
| **Ctrl + N** | Create a New Playbook |
| **Ctrl + S** | Save Playbook to Local Storage |
| **Ctrl + P** | Export Playbook to Structured PDF / Print Manual |
| **Ctrl + E** | Export Playbook to .ZIP Package |
| **Ctrl + I** | Import Playbook from .ZIP Package |
| **F1** | Open Help & Quick Reference Guide |

---

*Made with Love by Alex Sakha • Step-case v1.0.0*

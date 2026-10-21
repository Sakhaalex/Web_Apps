# The Hybrid Data Architecture

Step-case rejects opaque proprietary databases and bloated binary files. It implements the Hybrid Data Architecture:

1. config.json: Stores strictly the structural skeleton (Screens, Sequences, Sections, and routing metadata).
2. content/*.md: Each sequence is saved as a single human-readable Markdown file. Individual steps are delimited by standard '---' rules.
3. assets/: All screenshots, diagrams, and vector assets are stored as relative files.

Benefits:
- 100% Git-friendly: Diff procedures, review pull requests, and audit changes using standard version control.
- Offline-first: Runbooks work without external cloud dependencies or database servers.

- [x] Understand how config.json stores the routing graph
- [x] Understand how content/*.md stores steps separated by '---'

---

# Exporting Portable ZIP Bundles

Export ZIP packages your entire playbook into a self-contained .zip bundle containing config.json, all content/*.md files, and assets/.

Features:
- Any Step-case instance can import and execute this bundle immediately with zero broken paths.
- Portable offline backup of all procedural knowledge.
- Compatible with automated CI/CD distribution pipelines.

- [ ] Test Export ZIP from the top menu to create a shareable archive
- [ ] Verify that all sequence markdown files and assets are bundled intact

```Export CLI Command
stepcase export --format zip --output playbook.zip
```

---

# Printing & PDF Publication Manuals

Step-case automatically compiles your branched runbook into a linear, publication-grade user manual.

Automated Document Compilation:
- Title Cover Page with author attribution and metadata.
- Dynamic Table of Contents indexing all sections, screens, and sequences.
- Cleanly formatted step instructions, checklists, and copyable commands.
- Appendix detailing troubleshooting and error paths.

- [ ] Select Print Manual from the top menu to inspect the automated layout
- [ ] Confirm dynamic Table of Contents generation across sections

---

# Windows Inno Setup Compilation & Installer

Step-case is compiled into a standalone Windows installer using Inno Setup:

- Target Executable: Step-case.exe generated via PyInstaller.
- Default Playbooks Location: Installed to {commonappdata}\Step-case\default_playbooks so 'On using step-case' is immediately available on first launch.
- Persistent User Directory: %APPDATA%\Step-case\playbooks stores user-authored playbooks and persists across software updates.
- Zero External Dependencies: PyWebView and local assets are bundled into a self-contained installation.

- [x] Review Inno Setup [Files] directives for bundling default playbooks
- [x] Ensure persistent user data directories remain untouched on update

```Inno Setup Compiler CLI
iscc.exe installer\setup_script.iss
```
# Verification Checklists in Raw Markdown ([ ])

Procedures require proof of completion. Attach interactive checkdown items to ensure operators verify critical conditions before proceeding:

- Checklists render cleanly beneath the blue ruled line.
- Each item can be toggled by clicking the box.
- A real-time counter displays completion status (e.g., 2/3 items verified).
- In the underlying Markdown files, checklists are stored as standard '- [ ] item' or '- [x] item' task lists.
- Checklists automatically persist across authoring and execution modes.

- [ ] Confirm hardware power is connected and operational
- [ ] Verify network connectivity to production servers
- [ ] Ensure administrative permissions are active in terminal

---

# 1-Click Copyable Command Snippets

Never force operators to manually highlight and copy shell commands or configuration parameters. Manual copying introduces whitespace errors, missed characters, and catastrophic deployment failures.

How to Attach Copy Commands:
1. Select 'Add Copy Command' from the top-right 3-dot menu (or the blue + line toolbar).
2. Enter a clear label (e.g. 'Install CLI', 'Start Service').
3. Enter the exact command string.

In Player Mode, operators simply click the 'Copy' button for zero-defect terminal execution.

- [ ] Add a 1-click copy command to this step
- [ ] Test the copy button to verify clipboard integration

```Install CLI
npm install -g step-case-cli
```
```Verify Version
stepcase --version
```

---

# Strict Lock-Step Protection

Some operational steps are completely irreversible (e.g. formatting a drive, flashing firmware, or applying database migrations).

In Step-case, authors can enable Strict Lock-Step:
- Select 'Toggle Strict Lock' from the 3-dot menu.
- In Player Mode, the 'Back' button is disabled on this step.
- Operators cannot accidentally return to or repeat destructive operations.

- [ ] Identify irreversible or destructive procedural steps
- [ ] Enable Strict Lock to safeguard against accidental operator rollback
# What is a Sequence?

A Sequence represents an isolated procedure branch within a decision screen (e.g., 'Windows Setup', 'macOS Setup', or 'Docker Deployment').

Key Architecture Principles:
- Complete Isolation: Each sequence is maintained as its own dedicated workflow.
- No Clutter or Leakage: Screens act strictly as routers. Step text is NEVER leaked or previewed inside the router card, keeping the decision interface crystal clear.
- Independent Step Numbering: Inside each sequence, steps have their own independent numbering starting from Step 1!

- [x] Observe how the Screen Router view displays only route choices
- [x] Verify that step text is never pre-rendered inside sequence cards

---

# Entering a Sequence (The Doorway Concept)

Every sequence route is an isolated doorway into a dedicated step-by-step workflow:

- Entering: Clicking the arrow (→) next to any sequence title clears the Screen router view and immediately enters Step 1 of that sequence.
- Independent Step Numbering: Inside each sequence, steps are numbered 1, 2, 3... starting fresh.
- Isolated Focus: You author and execute the sequence without seeing unrelated steps from other branches.

- [ ] Click the arrow (→) on a sequence card to enter its doorway
- [x] Notice the step counter resets to Step 1 of this specific sequence

---

# Returning to the Decision Router

When authoring or executing inside a sequence, you can return to the parent decision screen at any moment:

- Breadcrumb Trail: The top navigation bar displays the lineage (e.g. Adding Optional Routes › Sequence Title › Step 1 of 3).
- 1-Click Return: Click the parent Screen title in the breadcrumb trail to return instantly to the Decision Router.
- State Preservation: Your active edits, checklist toggles, and position are preserved automatically.

- [ ] Click the parent screen link in the breadcrumb trail
- [ ] Confirm that the router view restores immediately
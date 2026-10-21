# Launching Fullscreen Presentation Layer

Click the 'Play' button in the header bar (or press F5) to launch the Fullscreen Presentation Runner.

Designed for High-Reliability Operations:
- Immersive View: Authoring tools, sidebars, and edit buttons vanish completely.
- High-Legibility Typography: Extra-large text easily readable from across a workbench or machine terminal.
- Ambient Progress: A subtle, translucent blue gradient tracks completion across the sequence.
- Operator Safety: Prominent 1-click copy buttons and big tactile Next/Back targets.

- [ ] Launch Player Mode using the top bar Play button
- [ ] Verify high-contrast large-format typography on screen

---

# The Esc Key Logic & Windowed State

In Player Mode, pressing the Esc key exits fullscreen mode to a clean windowed read-only viewer.

CRITICAL ARCHITECTURAL CONSTRAINT:
Pressing Esc does NOT drop the operator back into the authoring editor, and it does NOT close or reset the active runbook.

Why this matters:
- On production floors, operators frequently press Esc to dismiss popups or OS notifications.
- Step-case protects live execution state: checklist progress and step position remain 100% intact.
- To return to the Editor, the user must explicitly click the dedicated 'Edit' button in the header.

- [ ] Press Esc during fullscreen playback
- [ ] Confirm the runner drops to a windowed state without losing active execution state

```Windowed Toggle
Esc
```

---

# Navigation & Section Skipping in Player Mode

Operators can navigate through live runbooks with zero friction:

- Next Step: Click the Next button, press ArrowRight, or press Space.
- Previous Step: Click the Back button or press ArrowLeft (unless Strict Lock-Step is enabled).
- Decision Selection: When reaching a screen, click any route button (or press 1, 2, 3...) to choose a branch.
- Section Skipping: If an operator has already satisfied prerequisite steps, clicking 'Skip Section' leaps directly to the first step of the next milestone.

- [ ] Use ArrowRight or Space to advance through steps
- [ ] Use ArrowLeft to return to previous steps
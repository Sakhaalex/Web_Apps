# Step-case

The minimalist, interactive playbook engine. Create weightless, distraction-free software runbooks without the dashboard bloat.

## Overview

Step-case is an offline, native desktop application designed to replace heavy, cluttered procedural documentation. Built with a strict "Google Antigravity" design philosophy, it provides a pure, edge-to-edge white canvas for authoring, and a frictionless, distraction-free Player Mode for execution.

## Core Philosophy

* **Zero Dashboard Bloat:** No heavy widgets, no complex grids, and no nested cards in the editor.
* **Offline First:** Entirely local. No cloud syncing, no required accounts.
* **Hybrid Architecture:** Uses a lightweight `config.json` for routing maps and pure `.md` files for step content, ensuring absolute zero file bloat.

## Core Terminology

Understanding the structure of a Step-case Playbook:

* **Playbook:** The master project folder containing your specific guide (e.g., "Install Python").
* **Screen:** A major decision point or crossroads in your playbook.
* **Sequence:** A continuous, linear series of steps (e.g., the "Windows" route vs. the "macOS" route).
* **Section:** A logical grouping inside a Sequence (like a chapter header) that allows users to seamlessly skip ahead.
* **Step:** A single, focused view of instructions displayed on the canvas.

## Authoring in the Editor

The Step-case Editor is designed to feel as effortless as a blank piece of paper.

### The Linear Canvas
When you create a new Playbook, you start with a purely linear flow. Steps are represented simply by text resting on a minimalist blue line. As you type, the line expands downwards natively.

### Adding Decision Routing
To create routing choices, insert a **Screen**. Beneath the Screen, you can add multiple **Sequences**. Sequences appear as clean, side-by-side white cards. Steps for each specific route live strictly inside their respective Sequence card.

### Contextual Formatting
All formatting tools stay out of your way until needed. Focus on a Step, and a subtle toolbar will appear on the far right of the line, allowing you to quickly insert images, interactive checklists, copy-paste blocks, and internal routing buttons.

## Player Mode Execution

When it is time to execute a Playbook, the application transforms into Player Mode. 

The authoring sidebar completely disappears, leaving a 100% edge-to-edge white canvas. As you progress through the instructions, an ambient translucent blue fill subtly rises from the bottom of the screen to indicate your progress. Navigation is handled instantly via a simple top-right "Jump to" menu.

## Packaging and Export

Step-case allows you to deploy your completed Playbooks anywhere:
* **PDF Manual:** Automatically generates a Title Page, Table of Contents, and formatted document for physical printing.
* **.ZIP Export:** Packages your JSON map, Markdown content, and local image assets into a single, highly portable archive.

---
*Made with Love by Alex Sakha*
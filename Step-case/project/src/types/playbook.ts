/**
 * Core Playbook data models matching Step-case architecture
 */

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface CopyField {
  label: string;
  value: string;
}

export interface Step {
  id: string;
  title: string;
  content_file: string; // e.g. "content/step_1.md"
  content_text: string; // Plain instructions / Markdown
  assets: string[];     // Filenames in assets/
  checklist: ChecklistItem[];
  copy_fields: CopyField[];
  disable_back: boolean;
}

export interface ScreenOption {
  id: string;
  label: string;
  description: string;
  target_sequence_id: string;
}

export interface Screen {
  id: string;
  title: string;
  description: string;
  disable_back: boolean;
  type: 'decision' | 'linear';
  options: ScreenOption[];
}

export interface Sequence {
  id: string;
  title: string;
  step_ids: string[];
  next_screen_id: string | null;
}

export interface Playbook {
  version: string;
  name: string;        // Master configuration folder name (e.g. Installing_Python)
  title: string;       // Display title
  description: string;
  start_screen_id: string;
  screens: Screen[];
  sequences: Sequence[];
  steps: Step[];
}

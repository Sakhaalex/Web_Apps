"""
Step-case: UI Player Module
The execution and rendering engine that displays Steps, Markdown-rendered text,
interactive checklists, 1-click copy fields, and handles Next/Back routing logic and decision multiplexers.
"""

import os
from typing import Dict, Any, List, Optional, Callable
from PyQt6.QtCore import Qt, pyqtSignal, QTimer
from PyQt6.QtGui import QFont, QClipboard, QPixmap, QIcon
from PyQt6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QLabel, QPushButton,
    QCheckBox, QTextBrowser, QProgressBar, QFrame, QScrollArea,
    QApplication, QSizePolicy, QGridLayout
)


class UIPlayer(QWidget):
    """Player Mode execution engine with screen-wise typography and Next/Back routing."""

    back_to_builder_requested = pyqtSignal()
    step_changed = pyqtSignal(dict)  # emits state information for sidebar sync

    def __init__(self, playbook_data: Dict[str, Any], get_playbook_dir_fn: Callable[[], str], parent=None):
        super().__init__(parent)
        self.playbook = playbook_data
        self.get_playbook_dir = get_playbook_dir_fn

        # Navigation execution state
        self.history_stack: List[Dict[str, Any]] = []
        self.current_screen_id: Optional[str] = None
        self.current_sequence_id: Optional[str] = None
        self.current_step_index_in_seq: int = 0
        self.current_mode_type: str = "screen"  # "screen", "step", or "complete"

        self.step_checkbox_states: Dict[str, Dict[str, bool]] = {}

        self.init_ui()
        self.start_playbook()

    def init_ui(self):
        self.main_layout = QVBoxLayout(self)
        self.main_layout.setContentsMargins(28, 20, 28, 20)
        self.main_layout.setSpacing(16)

        # Top Bar: Playbook Title, Current Sequence Badge, Switch to Builder
        top_bar = QHBoxLayout()

        self.lbl_playbook_title = QLabel(self.playbook.get("title", "Playbook Player"))
        self.lbl_playbook_title.setObjectName("playerTitle")
        self.lbl_playbook_title.setStyleSheet("font-size: 20px; font-weight: 800; letter-spacing: -0.5px;")

        self.lbl_breadcrumb = QLabel("")
        self.lbl_breadcrumb.setObjectName("playerBreadcrumb")
        self.lbl_breadcrumb.setStyleSheet("font-size: 13px; font-weight: 600; padding: 4px 10px; border-radius: 4px;")

        self.btn_switch_builder = QPushButton("✎ Edit in Builder Mode")
        self.btn_switch_builder.setObjectName("builderModeBtn")
        self.btn_switch_builder.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_switch_builder.clicked.connect(self.back_to_builder_requested.emit)

        top_bar.addWidget(self.lbl_playbook_title)
        top_bar.addSpacing(16)
        top_bar.addWidget(self.lbl_breadcrumb)
        top_bar.addStretch()
        top_bar.addWidget(self.btn_switch_builder)

        self.main_layout.addLayout(top_bar)

        # Progress bar
        self.progress_bar = QProgressBar()
        self.progress_bar.setObjectName("playerProgressBar")
        self.progress_bar.setFixedHeight(6)
        self.progress_bar.setTextVisible(False)
        self.main_layout.addWidget(self.progress_bar)

        # Scrollable Central Content Body
        self.scroll_area = QScrollArea()
        self.scroll_area.setObjectName("playerScrollArea")
        self.scroll_area.setWidgetResizable(True)
        self.scroll_area.setFrameShape(QFrame.Shape.NoFrame)

        self.content_widget = QWidget()
        self.content_layout = QVBoxLayout(self.content_widget)
        self.content_layout.setContentsMargins(16, 16, 16, 16)
        self.content_layout.setSpacing(20)

        self.scroll_area.setWidget(self.content_widget)
        self.main_layout.addWidget(self.scroll_area, 1)

        # Bottom Persistent Control Bar (Next, Back, Status)
        self.bottom_bar = QFrame()
        self.bottom_bar.setObjectName("playerBottomBar")
        self.bottom_bar.setStyleSheet("border-top-width: 2px; border-top-style: solid;")
        bottom_layout = QHBoxLayout(self.bottom_bar)
        bottom_layout.setContentsMargins(12, 14, 12, 6)

        self.btn_back = QPushButton("← Back")
        self.btn_back.setObjectName("btnPlayerBack")
        self.btn_back.setMinimumHeight(44)
        self.btn_back.setMinimumWidth(120)
        self.btn_back.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_back.clicked.connect(self.on_click_back)

        self.lbl_status_indicator = QLabel("")
        self.lbl_status_indicator.setObjectName("playerStatusText")
        self.lbl_status_indicator.setStyleSheet("font-size: 14px; font-weight: 500;")

        self.btn_next = QPushButton("Next Step →")
        self.btn_next.setObjectName("btnPlayerNext")
        self.btn_next.setMinimumHeight(44)
        self.btn_next.setMinimumWidth(150)
        self.btn_next.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_next.clicked.connect(self.on_click_next)

        bottom_layout.addWidget(self.btn_back)
        bottom_layout.addStretch()
        bottom_layout.addWidget(self.lbl_status_indicator)
        bottom_layout.addStretch()
        bottom_layout.addWidget(self.btn_next)

        self.main_layout.addWidget(self.bottom_bar)

    def set_playbook_data(self, playbook: Dict[str, Any]):
        """Reloads new or updated playbook data."""
        self.playbook = playbook
        self.lbl_playbook_title.setText(self.playbook.get("title", "Playbook Player"))
        self.start_playbook()

    def start_playbook(self):
        """Starts or restarts the playbook from start_screen_id."""
        self.history_stack.clear()
        start_scr_id = self.playbook.get("start_screen_id")
        screens = self.playbook.get("screens", [])

        if not start_scr_id and screens:
            start_scr_id = screens[0].get("id")

        if start_scr_id:
            self.show_screen(start_scr_id, push_history=False)
        else:
            self.render_empty_state("No starting screen found in this playbook.")

    # -------------------------------------------------------------
    # RENDER SCREEN (DECISION MULTIPLEXER)
    # -------------------------------------------------------------
    def show_screen(self, screen_id: str, push_history: bool = True):
        screen = next((s for s in self.playbook.get("screens", []) if s.get("id") == screen_id), None)
        if not screen:
            self.render_empty_state(f"Screen not found: {screen_id}")
            return

        if push_history:
            self.history_stack.append({
                "type": self.current_mode_type,
                "screen_id": self.current_screen_id,
                "sequence_id": self.current_sequence_id,
                "step_index": self.current_step_index_in_seq
            })

        self.current_mode_type = "screen"
        self.current_screen_id = screen_id
        self.current_sequence_id = None
        self.current_step_index_in_seq = 0

        self.clear_content_layout()

        # Update breadcrumbs and progress
        self.lbl_breadcrumb.setText("Decision Screen")
        self.progress_bar.setValue(10)

        # Screen Header with large screen-wise font
        title_label = QLabel(screen.get("title", "Choose a Path"))
        title_label.setObjectName("playerScreenHeading")
        title_label.setStyleSheet("font-size: 26px; font-weight: 800; line-height: 1.2;")
        title_label.setWordWrap(True)
        self.content_layout.addWidget(title_label)

        if screen.get("description"):
            desc_label = QLabel(screen.get("description"))
            desc_label.setObjectName("playerScreenSubheading")
            desc_label.setStyleSheet("font-size: 16px; margin-top: -6px;")
            desc_label.setWordWrap(True)
            self.content_layout.addWidget(desc_label)

        # If Back is disabled on this screen, show explicit notice
        is_back_disabled = screen.get("disable_back", False)
        if is_back_disabled:
            safety_note = QLabel("⚠ Back navigation is intentionally disabled for this decision step.")
            safety_note.setStyleSheet("font-size: 13px; font-weight: 600; padding: 6px 10px; border-radius: 4px;")
            self.content_layout.addWidget(safety_note)

        self.content_layout.addSpacing(10)

        # Render decision option cards/buttons
        options = screen.get("options", [])
        if not options:
            no_opts = QLabel("No routes configured for this screen in Builder Mode.")
            self.content_layout.addWidget(no_opts)
        else:
            options_box = QVBoxLayout()
            options_box.setSpacing(14)
            for opt in options:
                card = self.create_decision_card(opt)
                options_box.addWidget(card)
            self.content_layout.addLayout(options_box)

        self.content_layout.addStretch()

        # Configure Bottom Navigation
        can_go_back = (len(self.history_stack) > 0) and not is_back_disabled
        self.btn_back.setEnabled(can_go_back)
        self.btn_next.setVisible(False)  # User clicks a decision button above
        self.lbl_status_indicator.setText(f"{len(options)} routing option(s) available")

        # Emit state for sidebar sync
        self.step_changed.emit({
            "mode": "screen",
            "screen_id": screen_id,
            "title": screen.get("title")
        })

    def create_decision_card(self, opt: Dict[str, Any]) -> QFrame:
        card = QFrame()
        card.setObjectName("playerChoiceCard")
        card.setCursor(Qt.CursorShape.PointingHandCursor)
        card.setStyleSheet("border-width: 2px; border-style: solid; border-radius: 8px; padding: 14px;")

        layout = QVBoxLayout(card)
        layout.setContentsMargins(12, 8, 12, 8)
        layout.setSpacing(4)

        opt_title = QLabel(f"➔  {opt.get('label', 'Unnamed Option')}")
        opt_title.setStyleSheet("font-size: 18px; font-weight: bold;")
        layout.addWidget(opt_title)

        if opt.get("description"):
            opt_sub = QLabel(opt.get("description"))
            opt_sub.setStyleSheet("font-size: 14px; opacity: 0.85;")
            opt_sub.setWordWrap(True)
            layout.addWidget(opt_sub)

        # Route on click
        target_seq_id = opt.get("target_sequence_id")
        card.mousePressEvent = lambda event, s_id=target_seq_id: self.start_sequence(s_id)
        return card

    # -------------------------------------------------------------
    # RENDER STEP (LINEAR RUNBOOK EXECUTION)
    # -------------------------------------------------------------
    def start_sequence(self, sequence_id: str):
        self.show_step(sequence_id, 0, push_history=True)

    def show_step(self, sequence_id: str, step_index: int, push_history: bool = True):
        sequence = next((s for s in self.playbook.get("sequences", []) if s.get("id") == sequence_id), None)
        if not sequence:
            self.render_empty_state(f"Sequence not found: {sequence_id}")
            return

        step_ids = sequence.get("step_ids", [])
        if not step_ids or step_index >= len(step_ids):
            # Sequence finished: route to next_screen_id or complete
            next_scr = sequence.get("next_screen_id")
            if next_scr:
                self.show_screen(next_scr, push_history=push_history)
            else:
                self.show_completion()
            return

        if push_history:
            self.history_stack.append({
                "type": self.current_mode_type,
                "screen_id": self.current_screen_id,
                "sequence_id": self.current_sequence_id,
                "step_index": self.current_step_index_in_seq
            })

        self.current_mode_type = "step"
        self.current_sequence_id = sequence_id
        self.current_step_index_in_seq = step_index
        step_id = step_ids[step_index]

        step = next((st for st in self.playbook.get("steps", []) if st.get("id") == step_id), None)
        if not step:
            self.render_empty_state(f"Step data not found: {step_id}")
            return

        self.clear_content_layout()

        # Update Progress Bar & Breadcrumbs
        total_steps = len(step_ids)
        pct = int(((step_index + 1) / total_steps) * 100)
        self.progress_bar.setValue(pct)
        self.lbl_breadcrumb.setText(f"{sequence.get('title')}  •  Step {step_index + 1} of {total_steps}")

        # Large Screen-Wise Step Title
        title_label = QLabel(step.get("title", f"Step {step_index + 1}"))
        title_label.setObjectName("playerStepHeading")
        title_label.setStyleSheet("font-size: 26px; font-weight: 800; letter-spacing: -0.5px;")
        title_label.setWordWrap(True)
        self.content_layout.addWidget(title_label)

        # Markdown / Instructions Text Browser
        text_browser = QTextBrowser()
        text_browser.setObjectName("playerStepMarkdown")
        text_browser.setOpenExternalLinks(True)
        text_browser.setFrameShape(QFrame.Shape.NoFrame)

        # Parse markdown headings and code blocks into styled HTML
        html_content = self.render_markdown_to_html(step.get("content_text", ""))
        text_browser.setHtml(html_content)
        text_browser.document().adjustSize()
        text_browser.setFixedHeight(int(text_browser.document().size().height()) + 20)
        self.content_layout.addWidget(text_browser)

        # Render Attached Media / Assets
        assets = step.get("assets", [])
        if assets:
            media_row = QHBoxLayout()
            media_row.setSpacing(12)
            playbook_dir = self.get_playbook_dir()

            for asset_name in assets:
                asset_path = os.path.join(playbook_dir, "assets", asset_name)
                if os.path.exists(asset_path):
                    pix = QPixmap(asset_path)
                    if not pix.isNull():
                        img_label = QLabel()
                        img_label.setPixmap(pix.scaled(400, 260, Qt.AspectRatioMode.KeepAspectRatio, Qt.TransformationMode.SmoothTransformation))
                        img_label.setStyleSheet("border-radius: 6px; padding: 4px;")
                        media_row.addWidget(img_label)
            media_row.addStretch()
            self.content_layout.addLayout(media_row)

        # Render Interactive Checklist
        checklist = step.get("checklist", [])
        if checklist:
            cl_box = QFrame()
            cl_box.setObjectName("playerChecklistFrame")
            cl_box.setStyleSheet("border-width: 2px; border-style: solid; border-radius: 8px; padding: 14px;")
            cl_layout = QVBoxLayout(cl_box)
            cl_layout.setSpacing(10)

            cl_heading = QLabel("Execution Checklist:")
            cl_heading.setStyleSheet("font-size: 15px; font-weight: 700;")
            cl_layout.addWidget(cl_heading)

            self.step_checkbox_states.setdefault(step_id, {})

            for item in checklist:
                cid = item.get("id")
                cb = QCheckBox(item.get("text", ""))
                cb.setStyleSheet("font-size: 15px; padding: 4px 0;")
                is_checked = self.step_checkbox_states[step_id].get(cid, item.get("checked", False))
                cb.setChecked(is_checked)

                def make_toggle_handler(s_id, c_id):
                    return lambda state: self.on_check_toggled(s_id, c_id, state == Qt.CheckState.Checked.value)

                cb.stateChanged.connect(make_toggle_handler(step_id, cid))
                cl_layout.addWidget(cb)

            self.content_layout.addWidget(cl_box)

        # Render 1-Click Copy Fields
        copy_fields = step.get("copy_fields", [])
        if copy_fields:
            copy_box = QFrame()
            copy_box.setObjectName("playerCopyFrame")
            copy_box.setStyleSheet("border-width: 2px; border-style: solid; border-radius: 8px; padding: 14px;")
            cp_layout = QVBoxLayout(copy_box)
            cp_layout.setSpacing(12)

            cp_heading = QLabel("Quick Copy Fields & Terminal Commands:")
            cp_heading.setStyleSheet("font-size: 15px; font-weight: 700;")
            cp_layout.addWidget(cp_heading)

            for cf in copy_fields:
                field_row = QHBoxLayout()
                field_label = QLabel(cf.get("label", "Value:"))
                field_label.setStyleSheet("font-size: 14px; font-weight: 600; min-width: 140px;")

                val_text = QLabel(cf.get("value", ""))
                val_text.setTextInteractionFlags(Qt.TextInteractionFlag.TextSelectableByMouse)
                val_text.setStyleSheet("font-family: monospace; font-size: 14px; padding: 6px 10px; border-radius: 4px; border: 1px solid;")

                btn_copy = QPushButton("📋 Copy")
                btn_copy.setCursor(Qt.CursorShape.PointingHandCursor)
                btn_copy.setFixedWidth(80)

                def make_copy_handler(val, btn):
                    return lambda: self.copy_to_clipboard(val, btn)

                btn_copy.clicked.connect(make_copy_handler(cf.get("value", ""), btn_copy))

                field_row.addWidget(field_label)
                field_row.addWidget(val_text, 1)
                field_row.addWidget(btn_copy)
                cp_layout.addLayout(field_row)

            self.content_layout.addWidget(copy_box)

        self.content_layout.addStretch()

        # Bottom Bar configuration
        is_step_back_disabled = step.get("disable_back", False)
        can_go_back = (len(self.history_stack) > 0) and not is_step_back_disabled
        self.btn_back.setEnabled(can_go_back)
        self.btn_next.setVisible(True)

        is_last_step = (step_index == total_steps - 1)
        next_scr = sequence.get("next_screen_id")
        if is_last_step:
            self.btn_next.setText("Finish Flow →" if not next_scr else "Continue →")
        else:
            self.btn_next.setText(f"Next Step ({step_index + 2}/{total_steps}) →")

        self.lbl_status_indicator.setText(f"Step {step_index + 1} of {total_steps} in {sequence.get('title')}")

        # Emit state for sidebar sync
        self.step_changed.emit({
            "mode": "step",
            "sequence_id": sequence_id,
            "step_id": step_id,
            "step_index": step_index,
            "title": step.get("title")
        })

    # -------------------------------------------------------------
    # COMPLETION STATE
    # -------------------------------------------------------------
    def show_completion(self):
        self.current_mode_type = "complete"
        self.clear_content_layout()

        self.progress_bar.setValue(100)
        self.lbl_breadcrumb.setText("Playbook Finished")

        card = QFrame()
        card.setObjectName("playerCompletionCard")
        card.setStyleSheet("border-width: 2px; border-style: solid; border-radius: 12px; padding: 24px;")
        layout = QVBoxLayout(card)
        layout.setSpacing(16)
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

        h1 = QLabel("🎉 Playbook Execution Complete!")
        h1.setStyleSheet("font-size: 28px; font-weight: 800; text-align: center;")
        h1.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(h1)

        p = QLabel(
            f"You have successfully completed all steps in: {self.playbook.get('title')}.\n"
            "All procedures have been validated."
        )
        p.setStyleSheet("font-size: 16px; text-align: center; line-height: 1.5;")
        p.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(p)

        btn_box = QHBoxLayout()
        btn_restart = QPushButton("↺ Restart Playbook")
        btn_restart.setStyleSheet("padding: 10px 20px; font-size: 15px; font-weight: bold;")
        btn_restart.clicked.connect(self.start_playbook)

        btn_edit = QPushButton("✎ Return to Builder")
        btn_edit.setStyleSheet("padding: 10px 20px; font-size: 15px; font-weight: bold;")
        btn_edit.clicked.connect(self.back_to_builder_requested.emit)

        btn_box.addWidget(btn_restart)
        btn_box.addWidget(btn_edit)
        layout.addLayout(btn_box)

        self.content_layout.addStretch()
        self.content_layout.addWidget(card)
        self.content_layout.addStretch()

        self.btn_back.setEnabled(len(self.history_stack) > 0)
        self.btn_next.setVisible(False)
        self.lbl_status_indicator.setText("Runbook Completed")

    # -------------------------------------------------------------
    # NAVIGATION HANDLERS (NEXT / BACK)
    # -------------------------------------------------------------
    def on_click_next(self):
        if self.current_mode_type == "step" and self.current_sequence_id:
            sequence = next((s for s in self.playbook.get("sequences", []) if s.get("id") == self.current_sequence_id), None)
            if sequence:
                next_idx = self.current_step_index_in_seq + 1
                self.show_step(self.current_sequence_id, next_idx, push_history=True)

    def on_click_back(self):
        if not self.history_stack:
            return

        prev_state = self.history_stack.pop()
        prev_type = prev_state.get("type")

        if prev_type == "screen":
            self.show_screen(prev_state.get("screen_id"), push_history=False)
        elif prev_type == "step":
            self.show_step(prev_state.get("sequence_id"), prev_state.get("step_index"), push_history=False)
        else:
            self.start_playbook()

    # -------------------------------------------------------------
    # HELPERS
    # -------------------------------------------------------------
    def on_check_toggled(self, step_id: str, cid: str, checked: bool):
        self.step_checkbox_states.setdefault(step_id, {})[cid] = checked

    def copy_to_clipboard(self, text: str, btn: QPushButton):
        clipboard = QApplication.clipboard()
        clipboard.setText(text)
        orig_text = btn.text()
        btn.setText("✓ Copied!")
        QTimer.singleShot(1400, lambda: btn.setText(orig_text))

    def clear_content_layout(self):
        while self.content_layout.count():
            item = self.content_layout.takeAt(0)
            widget = item.widget()
            if widget:
                widget.deleteLater()

    def render_empty_state(self, msg: str):
        self.clear_content_layout()
        lbl = QLabel(msg)
        lbl.setStyleSheet("font-size: 16px; font-weight: bold;")
        self.content_layout.addWidget(lbl)

    def render_markdown_to_html(self, md_text: str) -> str:
        """Converts basic markdown syntax into clean semantic HTML with screen-wise typography."""
        import html
        lines = md_text.splitlines()
        html_lines = []

        in_code_block = False
        code_buffer = []

        for line in lines:
            if line.strip().startswith("```"):
                if in_code_block:
                    in_code_block = False
                    code_html = html.escape("\n".join(code_buffer))
                    html_lines.append(f"<pre style='background: rgba(125,125,125,0.12); padding: 12px; border-radius: 6px; font-family: monospace; font-size: 14px;'><code>{code_html}</code></pre>")
                    code_buffer = []
                else:
                    in_code_block = True
                    code_buffer = []
                continue

            if in_code_block:
                code_buffer.append(line)
                continue

            stripped = line.strip()
            if stripped.startswith("### "):
                html_lines.append(f"<h3 style='font-size: 20px; font-weight: 700; margin: 16px 0 8px 0;'>{html.escape(stripped[4:])}</h3>")
            elif stripped.startswith("## "):
                html_lines.append(f"<h2 style='font-size: 22px; font-weight: 800; margin: 18px 0 8px 0;'>{html.escape(stripped[3:])}</h2>")
            elif stripped.startswith("# "):
                html_lines.append(f"<h1 style='font-size: 24px; font-weight: 900; margin: 20px 0 10px 0;'>{html.escape(stripped[2:])}</h1>")
            elif stripped.startswith("> "):
                html_lines.append(f"<blockquote style='border-left: 4px solid; padding-left: 12px; margin: 12px 0; font-size: 15px; font-style: italic;'>{html.escape(stripped[2:])}</blockquote>")
            elif stripped.startswith("- ") or stripped.startswith("* "):
                html_lines.append(f"<li style='font-size: 16px; margin: 4px 0;'>{html.escape(stripped[2:])}</li>")
            elif stripped == "":
                html_lines.append("<br/>")
            else:
                # Basic inline formatting: **bold** and `code`
                formatted = html.escape(stripped)
                # bold
                import re
                formatted = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', formatted)
                formatted = re.sub(r'`(.*?)`', r"<code style='background: rgba(125,125,125,0.12); padding: 2px 6px; border-radius: 3px; font-family: monospace;'>\1</code>", formatted)
                html_lines.append(f"<p style='font-size: 16px; line-height: 1.6; margin: 8px 0;'>{formatted}</p>")

        return f"<div style='font-family: \"Nano Sans\", \"Segoe UI\", Roboto, sans-serif; font-size: 16px;'>{''.join(html_lines)}</div>"

"""
Step-case: UI Builder Module
Visual No-Code form components for laymen to construct interactive Playbooks,
Screens (decision multiplexers), Sequences, and Steps without writing raw JSON or Markdown.
"""

from typing import Dict, Any, List, Optional, Callable
from PyQt6.QtCore import Qt, pyqtSignal
from PyQt6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit,
    QTextEdit, QPushButton, QComboBox, QCheckBox, QListWidget,
    QListWidgetItem, QTabWidget, QGroupBox, QFileDialog,
    QScrollArea, QFrame, QMessageBox, QSplitter
)


class UIBuilder(QWidget):
    """Visual No-Code Playbook Builder component."""

    playbook_updated = pyqtSignal(dict)
    save_requested = pyqtSignal()
    switch_to_player_requested = pyqtSignal()

    def __init__(self, playbook_data: Dict[str, Any], get_playbook_dir_fn: Callable[[], str], parent=None):
        super().__init__(parent)
        self.playbook = playbook_data
        self.get_playbook_dir = get_playbook_dir_fn
        self.current_theme = "light"

        self.selected_screen_index = 0
        self.selected_sequence_index = 0
        self.selected_step_index = 0

        self.init_ui()
        self.load_playbook_into_ui()

    def init_ui(self):
        main_layout = QVBoxLayout(self)
        main_layout.setContentsMargins(16, 16, 16, 16)
        main_layout.setSpacing(12)

        # Header bar
        header_layout = QHBoxLayout()
        header_title = QLabel("Builder Mode — Visual Playbook Architect")
        header_title.setObjectName("builderHeading")
        header_title.setStyleSheet("font-size: 18px; font-weight: bold;")
        header_layout.addWidget(header_title)
        header_layout.addStretch()

        self.btn_preview_player = QPushButton("▶ Launch in Player Mode")
        self.btn_preview_player.setObjectName("primaryActionBtn")
        self.btn_preview_player.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_preview_player.clicked.connect(self.switch_to_player_requested.emit)
        header_layout.addWidget(self.btn_preview_player)

        main_layout.addLayout(header_layout)

        # Sub-tabs for: 1. Overview & Settings, 2. Screens (Multiplexers), 3. Sequences, 4. Steps
        self.tabs = QTabWidget()
        self.tabs.setObjectName("builderTabs")

        self.tab_overview = QWidget()
        self.tab_screens = QWidget()
        self.tab_sequences = QWidget()
        self.tab_steps = QWidget()

        self.setup_overview_tab()
        self.setup_screens_tab()
        self.setup_sequences_tab()
        self.setup_steps_tab()

        self.tabs.addTab(self.tab_overview, "1. Playbook Meta")
        self.tabs.addTab(self.tab_screens, "2. Screens (Decision Routing)")
        self.tabs.addTab(self.tab_sequences, "3. Sequences (Linear Flows)")
        self.tabs.addTab(self.tab_steps, "4. Steps & Interactive Content")

        main_layout.addWidget(self.tabs)

    # -------------------------------------------------------------
    # TAB 1: OVERVIEW & SETTINGS
    # -------------------------------------------------------------
    def setup_overview_tab(self):
        layout = QVBoxLayout(self.tab_overview)
        layout.setSpacing(14)

        info_box = QGroupBox("Master Configuration")
        info_layout = QVBoxLayout(info_box)

        name_row = QHBoxLayout()
        lbl_name = QLabel("Folder Name (ID):")
        lbl_name.setFixedWidth(160)
        self.edit_playbook_name = QLineEdit()
        self.edit_playbook_name.setPlaceholderText("e.g. Installing_Python")
        self.edit_playbook_name.textChanged.connect(self.on_metadata_changed)
        name_row.addWidget(lbl_name)
        name_row.addWidget(self.edit_playbook_name)
        info_layout.addLayout(name_row)

        title_row = QHBoxLayout()
        lbl_title = QLabel("Display Title:")
        lbl_title.setFixedWidth(160)
        self.edit_playbook_title = QLineEdit()
        self.edit_playbook_title.setPlaceholderText("e.g. Installing Python & Developer Tools")
        self.edit_playbook_title.textChanged.connect(self.on_metadata_changed)
        title_row.addWidget(lbl_title)
        title_row.addWidget(self.edit_playbook_title)
        info_layout.addLayout(title_row)

        desc_row = QVBoxLayout()
        lbl_desc = QLabel("Description & Purpose:")
        self.edit_playbook_desc = QTextEdit()
        self.edit_playbook_desc.setMaximumHeight(80)
        self.edit_playbook_desc.textChanged.connect(self.on_metadata_changed)
        desc_row.addWidget(lbl_desc)
        desc_row.addWidget(self.edit_playbook_desc)
        info_layout.addLayout(desc_row)

        start_row = QHBoxLayout()
        lbl_start = QLabel("Initial Screen:")
        lbl_start.setFixedWidth(160)
        self.combo_start_screen = QComboBox()
        self.combo_start_screen.currentIndexChanged.connect(self.on_start_screen_changed)
        start_row.addWidget(lbl_start)
        start_row.addWidget(self.combo_start_screen)
        info_layout.addLayout(start_row)

        layout.addWidget(info_box)

        # Help Card for Layman
        guide_box = QGroupBox("Architecture Guide for Layman Authors")
        guide_layout = QVBoxLayout(guide_box)
        guide_label = QLabel(
            "• Playbook: Self-contained runbook with config.json, content/*.md, and assets/*.\n"
            "• Screen: A decision point multiplexer where users click buttons to choose a Sequence.\n"
            "• Sequence: A continuous, ordered chain of Steps executed one after another.\n"
            "• Step: An interactive screen with instructions, checklists, and 1-click copy fields."
        )
        guide_label.setStyleSheet("line-height: 1.6; font-size: 13px;")
        guide_layout.addWidget(guide_label)
        layout.addWidget(guide_box)

        layout.addStretch()

    # -------------------------------------------------------------
    # TAB 2: SCREENS (DECISION MULTIPLEXERS)
    # -------------------------------------------------------------
    def setup_screens_tab(self):
        layout = QHBoxLayout(self.tab_screens)

        # Left: List of screens
        left_panel = QVBoxLayout()
        lbl_list = QLabel("Screens (Multiplexers):")
        lbl_list.setStyleSheet("font-weight: bold;")
        self.screens_list = QListWidget()
        self.screens_list.currentRowChanged.connect(self.on_screen_selected)

        btn_row = QHBoxLayout()
        btn_add = QPushButton("+ Add Screen")
        btn_add.clicked.connect(self.add_new_screen)
        btn_del = QPushButton("− Delete")
        btn_del.clicked.connect(self.delete_current_screen)
        btn_row.addWidget(btn_add)
        btn_row.addWidget(btn_del)

        left_panel.addWidget(lbl_list)
        left_panel.addWidget(self.screens_list)
        left_panel.addLayout(btn_row)

        left_widget = QWidget()
        left_widget.setLayout(left_panel)
        left_widget.setFixedWidth(260)

        # Right: Form editor
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        right_container = QWidget()
        right_layout = QVBoxLayout(right_container)
        right_layout.setSpacing(12)

        self.lbl_screen_form_title = QLabel("Edit Screen")
        self.lbl_screen_form_title.setStyleSheet("font-size: 15px; font-weight: bold;")
        right_layout.addWidget(self.lbl_screen_form_title)

        title_row = QHBoxLayout()
        title_row.addWidget(QLabel("Screen Title:"))
        self.edit_screen_title = QLineEdit()
        self.edit_screen_title.textChanged.connect(self.on_screen_field_edited)
        title_row.addWidget(self.edit_screen_title)
        right_layout.addLayout(title_row)

        desc_row = QVBoxLayout()
        desc_row.addWidget(QLabel("Prompt / Instructions for User:"))
        self.edit_screen_desc = QTextEdit()
        self.edit_screen_desc.setMaximumHeight(70)
        self.edit_screen_desc.textChanged.connect(self.on_screen_field_edited)
        desc_row.addWidget(self.edit_screen_desc)
        right_layout.addLayout(desc_row)

        # Disable Back Navigation Toggle (Requirement)
        self.chk_screen_disable_back = QCheckBox("Disable Back Navigation on this Screen")
        self.chk_screen_disable_back.setToolTip("Enable if reverting would crash a real-world software process.")
        self.chk_screen_disable_back.stateChanged.connect(self.on_screen_field_edited)
        right_layout.addWidget(self.chk_screen_disable_back)

        # Decision Routing Options Group
        options_box = QGroupBox("Decision Choices (Route buttons to Sequences)")
        options_layout = QVBoxLayout(options_box)

        self.options_list = QListWidget()
        options_layout.addWidget(self.options_list)

        opt_btn_row = QHBoxLayout()
        btn_add_opt = QPushButton("+ Add Decision Choice")
        btn_add_opt.clicked.connect(self.add_screen_option)
        btn_del_opt = QPushButton("− Remove Choice")
        btn_del_opt.clicked.connect(self.remove_screen_option)
        opt_btn_row.addWidget(btn_add_opt)
        opt_btn_row.addWidget(btn_del_opt)
        options_layout.addLayout(opt_btn_row)

        # Option editor sub-fields
        opt_fields = QVBoxLayout()
        self.edit_opt_label = QLineEdit()
        self.edit_opt_label.setPlaceholderText("Choice Button Label (e.g. Windows Flow)")
        self.edit_opt_label.textChanged.connect(self.on_current_option_edited)

        self.edit_opt_desc = QLineEdit()
        self.edit_opt_desc.setPlaceholderText("Choice Description (optional subtext)")
        self.edit_opt_desc.textChanged.connect(self.on_current_option_edited)

        target_row = QHBoxLayout()
        target_row.addWidget(QLabel("Target Sequence:"))
        self.combo_opt_target = QComboBox()
        self.combo_opt_target.currentIndexChanged.connect(self.on_current_option_edited)
        target_row.addWidget(self.combo_opt_target)

        opt_fields.addWidget(self.edit_opt_label)
        opt_fields.addWidget(self.edit_opt_desc)
        opt_fields.addLayout(target_row)
        options_layout.addLayout(opt_fields)

        self.options_list.currentRowChanged.connect(self.on_option_item_selected)

        right_layout.addWidget(options_box)
        right_layout.addStretch()

        scroll.setWidget(right_container)

        splitter = QSplitter(Qt.Orientation.Horizontal)
        splitter.addWidget(left_widget)
        splitter.addWidget(scroll)
        splitter.setSizes([260, 600])

        layout.addWidget(splitter)

    # -------------------------------------------------------------
    # TAB 3: SEQUENCES (LINEAR FLOWS)
    # -------------------------------------------------------------
    def setup_sequences_tab(self):
        layout = QHBoxLayout(self.tab_sequences)

        left_panel = QVBoxLayout()
        lbl_list = QLabel("Sequences:")
        lbl_list.setStyleSheet("font-weight: bold;")
        self.seq_list = QListWidget()
        self.seq_list.currentRowChanged.connect(self.on_sequence_selected)

        btn_row = QHBoxLayout()
        btn_add = QPushButton("+ Add Sequence")
        btn_add.clicked.connect(self.add_new_sequence)
        btn_del = QPushButton("− Delete")
        btn_del.clicked.connect(self.delete_current_sequence)
        btn_row.addWidget(btn_add)
        btn_row.addWidget(btn_del)

        left_panel.addWidget(lbl_list)
        left_panel.addWidget(self.seq_list)
        left_panel.addLayout(btn_row)

        left_widget = QWidget()
        left_widget.setLayout(left_panel)
        left_widget.setFixedWidth(260)

        # Right: Sequence settings
        right_container = QWidget()
        right_layout = QVBoxLayout(right_container)
        right_layout.setSpacing(12)

        self.lbl_seq_form_title = QLabel("Edit Sequence")
        self.lbl_seq_form_title.setStyleSheet("font-size: 15px; font-weight: bold;")
        right_layout.addWidget(self.lbl_seq_form_title)

        title_row = QHBoxLayout()
        title_row.addWidget(QLabel("Sequence Title:"))
        self.edit_seq_title = QLineEdit()
        self.edit_seq_title.textChanged.connect(self.on_seq_field_edited)
        title_row.addWidget(self.edit_seq_title)
        right_layout.addLayout(title_row)

        next_screen_row = QHBoxLayout()
        next_screen_row.addWidget(QLabel("On Sequence Complete, Route To:"))
        self.combo_seq_next_screen = QComboBox()
        self.combo_seq_next_screen.currentIndexChanged.connect(self.on_seq_field_edited)
        next_screen_row.addWidget(self.combo_seq_next_screen)
        right_layout.addLayout(next_screen_row)

        # Steps inside Sequence
        steps_group = QGroupBox("Ordered Steps in this Sequence")
        steps_group_layout = QVBoxLayout(steps_group)

        self.seq_steps_list = QListWidget()
        steps_group_layout.addWidget(self.seq_steps_list)

        steps_actions = QHBoxLayout()
        self.combo_available_steps = QComboBox()
        btn_include_step = QPushButton("+ Include Step")
        btn_include_step.clicked.connect(self.include_step_in_sequence)
        btn_remove_step = QPushButton("− Remove from Flow")
        btn_remove_step.clicked.connect(self.remove_step_from_sequence)

        steps_actions.addWidget(self.combo_available_steps, 2)
        steps_actions.addWidget(btn_include_step, 1)
        steps_actions.addWidget(btn_remove_step, 1)
        steps_group_layout.addLayout(steps_actions)

        right_layout.addWidget(steps_group)
        right_layout.addStretch()

        splitter = QSplitter(Qt.Orientation.Horizontal)
        splitter.addWidget(left_widget)
        splitter.addWidget(right_container)
        splitter.setSizes([260, 600])

        layout.addWidget(splitter)

    # -------------------------------------------------------------
    # TAB 4: STEPS (VISUAL NO-CODE STEP BUILDER)
    # -------------------------------------------------------------
    def setup_steps_tab(self):
        layout = QHBoxLayout(self.tab_steps)

        left_panel = QVBoxLayout()
        lbl_list = QLabel("All Steps:")
        lbl_list.setStyleSheet("font-weight: bold;")
        self.steps_list = QListWidget()
        self.steps_list.currentRowChanged.connect(self.on_step_selected)

        btn_row = QHBoxLayout()
        btn_add = QPushButton("+ Add Step")
        btn_add.clicked.connect(self.add_new_step)
        btn_del = QPushButton("− Delete Step")
        btn_del.clicked.connect(self.delete_current_step)
        btn_row.addWidget(btn_add)
        btn_row.addWidget(btn_del)

        left_panel.addWidget(lbl_list)
        left_panel.addWidget(self.steps_list)
        left_panel.addLayout(btn_row)

        left_widget = QWidget()
        left_widget.setLayout(left_panel)
        left_widget.setFixedWidth(260)

        # Right: Step visual editor
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        right_container = QWidget()
        right_layout = QVBoxLayout(right_container)
        right_layout.setSpacing(14)

        self.lbl_step_form_title = QLabel("Edit Step Content")
        self.lbl_step_form_title.setStyleSheet("font-size: 15px; font-weight: bold;")
        right_layout.addWidget(self.lbl_step_form_title)

        title_row = QHBoxLayout()
        title_row.addWidget(QLabel("Step Title:"))
        self.edit_step_title = QLineEdit()
        self.edit_step_title.textChanged.connect(self.on_step_field_edited)
        title_row.addWidget(self.edit_step_title)
        right_layout.addLayout(title_row)

        # Back button disable checkbox for safety
        self.chk_step_disable_back = QCheckBox("Disable 'Back' Navigation on this specific Step")
        self.chk_step_disable_back.setToolTip("Prevent backtracking if this step performs an irreversible operation.")
        self.chk_step_disable_back.stateChanged.connect(self.on_step_field_edited)
        right_layout.addWidget(self.chk_step_disable_back)

        # Content text (instructions)
        content_box = QGroupBox("Instructions & Guidance (Plain Text / Headings)")
        content_layout = QVBoxLayout(content_box)
        self.edit_step_content = QTextEdit()
        self.edit_step_content.setPlaceholderText("Write step instructions here... (Supports headers, bullet points, and code formatting)")
        self.edit_step_content.setMinimumHeight(140)
        self.edit_step_content.textChanged.connect(self.on_step_field_edited)
        content_layout.addWidget(self.edit_step_content)
        right_layout.addWidget(content_box)

        # Assets Manager (Uploads copied to /assets/)
        assets_box = QGroupBox("Attached Media & Screenshots (Copied to /assets/)")
        assets_layout = QVBoxLayout(assets_box)
        self.assets_list = QListWidget()
        self.assets_list.setMaximumHeight(80)
        assets_layout.addWidget(self.assets_list)

        asset_btn_row = QHBoxLayout()
        btn_upload_asset = QPushButton("📁 Attach Image/File (Auto-copy to /assets/)")
        btn_upload_asset.clicked.connect(self.upload_asset_for_step)
        btn_remove_asset = QPushButton("− Remove Asset")
        btn_remove_asset.clicked.connect(self.remove_asset_from_step)
        asset_btn_row.addWidget(btn_upload_asset)
        asset_btn_row.addWidget(btn_remove_asset)
        assets_layout.addLayout(asset_btn_row)
        right_layout.addWidget(assets_box)

        # Interactive Checklist Manager
        checklist_box = QGroupBox("Interactive Checklist Items (User verifies execution)")
        cl_layout = QVBoxLayout(checklist_box)
        self.cl_list = QListWidget()
        self.cl_list.setMaximumHeight(100)
        cl_layout.addWidget(self.cl_list)

        cl_input_row = QHBoxLayout()
        self.edit_new_cl_item = QLineEdit()
        self.edit_new_cl_item.setPlaceholderText("New checklist item (e.g. 'Checked Add to PATH')")
        btn_add_cl = QPushButton("+ Add Item")
        btn_add_cl.clicked.connect(self.add_checklist_item)
        btn_del_cl = QPushButton("− Remove")
        btn_del_cl.clicked.connect(self.remove_checklist_item)
        cl_input_row.addWidget(self.edit_new_cl_item, 3)
        cl_input_row.addWidget(btn_add_cl, 1)
        cl_input_row.addWidget(btn_del_cl, 1)
        cl_layout.addLayout(cl_input_row)
        right_layout.addWidget(checklist_box)

        # Interactive Copy-Paste Fields
        copy_box = QGroupBox("1-Click Copy Fields (Terminal commands, URLs, configs)")
        copy_layout = QVBoxLayout(copy_box)
        self.copy_fields_list = QListWidget()
        self.copy_fields_list.setMaximumHeight(100)
        copy_layout.addWidget(self.copy_fields_list)

        copy_input_row = QHBoxLayout()
        self.edit_copy_label = QLineEdit()
        self.edit_copy_label.setPlaceholderText("Field Label (e.g. 'CLI Command')")
        self.edit_copy_val = QLineEdit()
        self.edit_copy_val.setPlaceholderText("Value to copy (e.g. 'python --version')")
        btn_add_copy = QPushButton("+ Add Field")
        btn_add_copy.clicked.connect(self.add_copy_field)
        btn_del_copy = QPushButton("− Remove")
        btn_del_copy.clicked.connect(self.remove_copy_field)
        copy_input_row.addWidget(self.edit_copy_label, 2)
        copy_input_row.addWidget(self.edit_copy_val, 3)
        copy_input_row.addWidget(btn_add_copy, 1)
        copy_input_row.addWidget(btn_del_copy, 1)
        copy_layout.addLayout(copy_input_row)
        right_layout.addWidget(copy_box)

        scroll.setWidget(right_container)

        splitter = QSplitter(Qt.Orientation.Horizontal)
        splitter.addWidget(left_widget)
        splitter.addWidget(scroll)
        splitter.setSizes([260, 600])

        layout.addWidget(splitter)

    # -------------------------------------------------------------
    # DATA POPULATION & SYNC
    # -------------------------------------------------------------
    def load_playbook_into_ui(self):
        """Populates all GUI fields from current self.playbook data."""
        self.edit_playbook_name.setText(self.playbook.get("name", ""))
        self.edit_playbook_title.setText(self.playbook.get("title", ""))
        self.edit_playbook_desc.setPlainText(self.playbook.get("description", ""))

        self.refresh_screens_list()
        self.refresh_sequences_list()
        self.refresh_steps_list()
        self.refresh_screen_dropdowns()

    def refresh_screen_dropdowns(self):
        # Update Start Screen combo
        self.combo_start_screen.blockSignals(True)
        self.combo_start_screen.clear()
        start_id = self.playbook.get("start_screen_id", "")
        start_idx = 0
        for i, scr in enumerate(self.playbook.get("screens", [])):
            self.combo_start_screen.addItem(scr.get("title", scr.get("id")), scr.get("id"))
            if scr.get("id") == start_id:
                start_idx = i
        self.combo_start_screen.setCurrentIndex(start_idx)
        self.combo_start_screen.blockSignals(False)

        # Update Target Sequence dropdown
        self.combo_opt_target.blockSignals(True)
        self.combo_opt_target.clear()
        for seq in self.playbook.get("sequences", []):
            self.combo_opt_target.addItem(seq.get("title", seq.get("id")), seq.get("id"))
        self.combo_opt_target.blockSignals(False)

        # Update Next Screen dropdown in Sequences
        self.combo_seq_next_screen.blockSignals(True)
        self.combo_seq_next_screen.clear()
        self.combo_seq_next_screen.addItem("— Finish Playbook (End) —", "")
        for scr in self.playbook.get("screens", []):
            self.combo_seq_next_screen.addItem(scr.get("title", scr.get("id")), scr.get("id"))
        self.combo_seq_next_screen.blockSignals(False)

        # Update available steps in sequence builder
        self.combo_available_steps.clear()
        for step in self.playbook.get("steps", []):
            self.combo_available_steps.addItem(step.get("title", step.get("id")), step.get("id"))

    def refresh_screens_list(self):
        self.screens_list.blockSignals(True)
        self.screens_list.clear()
        for scr in self.playbook.get("screens", []):
            item = QListWidgetItem(scr.get("title", "Untitled Screen"))
            self.screens_list.addItem(item)
        if self.playbook.get("screens"):
            idx = min(self.selected_screen_index, len(self.playbook["screens"]) - 1)
            self.screens_list.setCurrentRow(idx)
        self.screens_list.blockSignals(False)
        self.on_screen_selected(self.screens_list.currentRow())

    def refresh_sequences_list(self):
        self.seq_list.blockSignals(True)
        self.seq_list.clear()
        for seq in self.playbook.get("sequences", []):
            item = QListWidgetItem(seq.get("title", "Untitled Sequence"))
            self.seq_list.addItem(item)
        if self.playbook.get("sequences"):
            idx = min(self.selected_sequence_index, len(self.playbook["sequences"]) - 1)
            self.seq_list.setCurrentRow(idx)
        self.seq_list.blockSignals(False)
        self.on_sequence_selected(self.seq_list.currentRow())

    def refresh_steps_list(self):
        self.steps_list.blockSignals(True)
        self.steps_list.clear()
        for st in self.playbook.get("steps", []):
            item = QListWidgetItem(st.get("title", "Untitled Step"))
            self.steps_list.addItem(item)
        if self.playbook.get("steps"):
            idx = min(self.selected_step_index, len(self.playbook["steps"]) - 1)
            self.steps_list.setCurrentRow(idx)
        self.steps_list.blockSignals(False)
        self.on_step_selected(self.steps_list.currentRow())

    # -------------------------------------------------------------
    # EVENT HANDLERS: METADATA
    # -------------------------------------------------------------
    def on_metadata_changed(self):
        self.playbook["name"] = self.edit_playbook_name.text().strip().replace(" ", "_")
        self.playbook["title"] = self.edit_playbook_title.text().strip()
        self.playbook["description"] = self.edit_playbook_desc.toPlainText().strip()
        self.playbook_updated.emit(self.playbook)

    def on_start_screen_changed(self):
        data = self.combo_start_screen.currentData()
        if data:
            self.playbook["start_screen_id"] = data
            self.playbook_updated.emit(self.playbook)

    # -------------------------------------------------------------
    # EVENT HANDLERS: SCREENS
    # -------------------------------------------------------------
    def on_screen_selected(self, index: int):
        if index < 0 or index >= len(self.playbook.get("screens", [])):
            return
        self.selected_screen_index = index
        scr = self.playbook["screens"][index]

        self.edit_screen_title.blockSignals(True)
        self.edit_screen_desc.blockSignals(True)
        self.chk_screen_disable_back.blockSignals(True)

        self.edit_screen_title.setText(scr.get("title", ""))
        self.edit_screen_desc.setPlainText(scr.get("description", ""))
        self.chk_screen_disable_back.setChecked(scr.get("disable_back", False))

        self.edit_screen_title.blockSignals(False)
        self.edit_screen_desc.blockSignals(False)
        self.chk_screen_disable_back.blockSignals(False)

        # Populate options
        self.options_list.clear()
        for opt in scr.get("options", []):
            self.options_list.addItem(f"{opt.get('label')} → [{opt.get('target_sequence_id')}]")
        if scr.get("options"):
            self.options_list.setCurrentRow(0)

    def on_screen_field_edited(self):
        idx = self.screens_list.currentRow()
        if idx < 0 or idx >= len(self.playbook.get("screens", [])):
            return
        scr = self.playbook["screens"][idx]
        scr["title"] = self.edit_screen_title.text()
        scr["description"] = self.edit_screen_desc.toPlainText()
        scr["disable_back"] = self.chk_screen_disable_back.isChecked()

        item = self.screens_list.item(idx)
        if item:
            item.setText(scr["title"])
        self.refresh_screen_dropdowns()
        self.playbook_updated.emit(self.playbook)

    def add_new_screen(self):
        new_id = f"screen_{len(self.playbook.get('screens', [])) + 1}"
        new_screen = {
            "id": new_id,
            "title": f"New Decision Screen {len(self.playbook.get('screens', [])) + 1}",
            "description": "Choose next path.",
            "disable_back": False,
            "type": "decision",
            "options": []
        }
        self.playbook.setdefault("screens", []).append(new_screen)
        self.selected_screen_index = len(self.playbook["screens"]) - 1
        self.refresh_screens_list()
        self.refresh_screen_dropdowns()
        self.playbook_updated.emit(self.playbook)

    def delete_current_screen(self):
        idx = self.screens_list.currentRow()
        if idx < 0 or len(self.playbook.get("screens", [])) <= 1:
            QMessageBox.warning(self, "Action Denied", "A playbook must have at least one Screen.")
            return
        self.playbook["screens"].pop(idx)
        self.selected_screen_index = max(0, idx - 1)
        self.refresh_screens_list()
        self.refresh_screen_dropdowns()
        self.playbook_updated.emit(self.playbook)

    def add_screen_option(self):
        idx = self.screens_list.currentRow()
        if idx < 0:
            return
        scr = self.playbook["screens"][idx]
        seqs = self.playbook.get("sequences", [])
        target_seq = seqs[0]["id"] if seqs else ""
        new_opt = {
            "id": f"opt_{len(scr.get('options', [])) + 1}",
            "label": f"Choice Option {len(scr.get('options', [])) + 1}",
            "description": "Proceed down this path",
            "target_sequence_id": target_seq
        }
        scr.setdefault("options", []).append(new_opt)
        self.on_screen_selected(idx)
        self.options_list.setCurrentRow(len(scr["options"]) - 1)
        self.playbook_updated.emit(self.playbook)

    def remove_screen_option(self):
        scr_idx = self.screens_list.currentRow()
        opt_idx = self.options_list.currentRow()
        if scr_idx < 0 or opt_idx < 0:
            return
        scr = self.playbook["screens"][scr_idx]
        if opt_idx < len(scr.get("options", [])):
            scr["options"].pop(opt_idx)
            self.on_screen_selected(scr_idx)
            self.playbook_updated.emit(self.playbook)

    def on_option_item_selected(self, index: int):
        scr_idx = self.screens_list.currentRow()
        if scr_idx < 0 or index < 0:
            return
        scr = self.playbook["screens"][scr_idx]
        if index >= len(scr.get("options", [])):
            return
        opt = scr["options"][index]

        self.edit_opt_label.blockSignals(True)
        self.edit_opt_desc.blockSignals(True)
        self.combo_opt_target.blockSignals(True)

        self.edit_opt_label.setText(opt.get("label", ""))
        self.edit_opt_desc.setText(opt.get("description", ""))

        target_idx = self.combo_opt_target.findData(opt.get("target_sequence_id", ""))
        if target_idx >= 0:
            self.combo_opt_target.setCurrentIndex(target_idx)

        self.edit_opt_label.blockSignals(False)
        self.edit_opt_desc.blockSignals(False)
        self.combo_opt_target.blockSignals(False)

    def on_current_option_edited(self):
        scr_idx = self.screens_list.currentRow()
        opt_idx = self.options_list.currentRow()
        if scr_idx < 0 or opt_idx < 0:
            return
        scr = self.playbook["screens"][scr_idx]
        if opt_idx >= len(scr.get("options", [])):
            return
        opt = scr["options"][opt_idx]
        opt["label"] = self.edit_opt_label.text()
        opt["description"] = self.edit_opt_desc.text()
        opt["target_sequence_id"] = self.combo_opt_target.currentData() or ""

        item = self.options_list.item(opt_idx)
        if item:
            item.setText(f"{opt['label']} → [{opt['target_sequence_id']}]")
        self.playbook_updated.emit(self.playbook)

    # -------------------------------------------------------------
    # EVENT HANDLERS: SEQUENCES
    # -------------------------------------------------------------
    def on_sequence_selected(self, index: int):
        if index < 0 or index >= len(self.playbook.get("sequences", [])):
            return
        self.selected_sequence_index = index
        seq = self.playbook["sequences"][index]

        self.edit_seq_title.blockSignals(True)
        self.combo_seq_next_screen.blockSignals(True)

        self.edit_seq_title.setText(seq.get("title", ""))

        next_idx = self.combo_seq_next_screen.findData(seq.get("next_screen_id", ""))
        if next_idx >= 0:
            self.combo_seq_next_screen.setCurrentIndex(next_idx)
        else:
            self.combo_seq_next_screen.setCurrentIndex(0)

        self.edit_seq_title.blockSignals(False)
        self.combo_seq_next_screen.blockSignals(False)

        # Populate included steps
        self.seq_steps_list.clear()
        step_map = {s["id"]: s.get("title", s["id"]) for s in self.playbook.get("steps", [])}
        for st_id in seq.get("step_ids", []):
            title = step_map.get(st_id, st_id)
            self.seq_steps_list.addItem(f"{title} ({st_id})")

    def on_seq_field_edited(self):
        idx = self.seq_list.currentRow()
        if idx < 0 or idx >= len(self.playbook.get("sequences", [])):
            return
        seq = self.playbook["sequences"][idx]
        seq["title"] = self.edit_seq_title.text()
        next_val = self.combo_seq_next_screen.currentData()
        seq["next_screen_id"] = next_val if next_val else None

        item = self.seq_list.item(idx)
        if item:
            item.setText(seq["title"])
        self.refresh_screen_dropdowns()
        self.playbook_updated.emit(self.playbook)

    def add_new_sequence(self):
        new_id = f"seq_{len(self.playbook.get('sequences', [])) + 1}"
        new_seq = {
            "id": new_id,
            "title": f"New Flow Sequence {len(self.playbook.get('sequences', [])) + 1}",
            "step_ids": [],
            "next_screen_id": None
        }
        self.playbook.setdefault("sequences", []).append(new_seq)
        self.selected_sequence_index = len(self.playbook["sequences"]) - 1
        self.refresh_sequences_list()
        self.refresh_screen_dropdowns()
        self.playbook_updated.emit(self.playbook)

    def delete_current_sequence(self):
        idx = self.seq_list.currentRow()
        if idx < 0 or len(self.playbook.get("sequences", [])) <= 1:
            QMessageBox.warning(self, "Action Denied", "A playbook must have at least one Sequence.")
            return
        self.playbook["sequences"].pop(idx)
        self.selected_sequence_index = max(0, idx - 1)
        self.refresh_sequences_list()
        self.refresh_screen_dropdowns()
        self.playbook_updated.emit(self.playbook)

    def include_step_in_sequence(self):
        idx = self.seq_list.currentRow()
        if idx < 0:
            return
        seq = self.playbook["sequences"][idx]
        step_id = self.combo_available_steps.currentData()
        if step_id:
            seq.setdefault("step_ids", []).append(step_id)
            self.on_sequence_selected(idx)
            self.playbook_updated.emit(self.playbook)

    def remove_step_from_sequence(self):
        seq_idx = self.seq_list.currentRow()
        step_row = self.seq_steps_list.currentRow()
        if seq_idx < 0 or step_row < 0:
            return
        seq = self.playbook["sequences"][seq_idx]
        if step_row < len(seq.get("step_ids", [])):
            seq["step_ids"].pop(step_row)
            self.on_sequence_selected(seq_idx)
            self.playbook_updated.emit(self.playbook)

    # -------------------------------------------------------------
    # EVENT HANDLERS: STEPS
    # -------------------------------------------------------------
    def on_step_selected(self, index: int):
        if index < 0 or index >= len(self.playbook.get("steps", [])):
            return
        self.selected_step_index = index
        st = self.playbook["steps"][index]

        self.edit_step_title.blockSignals(True)
        self.chk_step_disable_back.blockSignals(True)
        self.edit_step_content.blockSignals(True)

        self.edit_step_title.setText(st.get("title", ""))
        self.chk_step_disable_back.setChecked(st.get("disable_back", False))
        self.edit_step_content.setPlainText(st.get("content_text", ""))

        self.edit_step_title.blockSignals(False)
        self.chk_step_disable_back.blockSignals(False)
        self.edit_step_content.blockSignals(False)

        # Assets list
        self.assets_list.clear()
        for a in st.get("assets", []):
            self.assets_list.addItem(a)

        # Checklist
        self.cl_list.clear()
        for c in st.get("checklist", []):
            self.cl_list.addItem(f"☐  {c.get('text')}")

        # Copy fields
        self.copy_fields_list.clear()
        for cf in st.get("copy_fields", []):
            self.copy_fields_list.addItem(f"{cf.get('label')}: {cf.get('value')}")

    def on_step_field_edited(self):
        idx = self.steps_list.currentRow()
        if idx < 0 or idx >= len(self.playbook.get("steps", [])):
            return
        st = self.playbook["steps"][idx]
        st["title"] = self.edit_step_title.text()
        st["disable_back"] = self.chk_step_disable_back.isChecked()
        st["content_text"] = self.edit_step_content.toPlainText()

        item = self.steps_list.item(idx)
        if item:
            item.setText(st["title"])
        self.refresh_screen_dropdowns()
        self.playbook_updated.emit(self.playbook)

    def add_new_step(self):
        new_id = f"step_{len(self.playbook.get('steps', [])) + 1}"
        new_step = {
            "id": new_id,
            "title": f"Step {len(self.playbook.get('steps', [])) + 1}",
            "content_file": f"content/{new_id}.md",
            "content_text": f"### Step {len(self.playbook.get('steps', [])) + 1}\n\nEnter detailed instructions here.",
            "assets": [],
            "disable_back": False,
            "checklist": [],
            "copy_fields": []
        }
        self.playbook.setdefault("steps", []).append(new_step)
        self.selected_step_index = len(self.playbook["steps"]) - 1
        self.refresh_steps_list()
        self.refresh_screen_dropdowns()
        self.playbook_updated.emit(self.playbook)

    def delete_current_step(self):
        idx = self.steps_list.currentRow()
        if idx < 0 or len(self.playbook.get("steps", [])) <= 1:
            QMessageBox.warning(self, "Action Denied", "A playbook must have at least one Step.")
            return
        removed_id = self.playbook["steps"][idx].get("id")
        self.playbook["steps"].pop(idx)

        # Remove from any sequence references
        for seq in self.playbook.get("sequences", []):
            if removed_id in seq.get("step_ids", []):
                seq["step_ids"] = [sid for sid in seq["step_ids"] if sid != removed_id]

        self.selected_step_index = max(0, idx - 1)
        self.refresh_steps_list()
        self.refresh_screen_dropdowns()
        self.playbook_updated.emit(self.playbook)

    def upload_asset_for_step(self):
        idx = self.steps_list.currentRow()
        if idx < 0:
            return
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Attach Media Asset", "", "Media Files (*.png *.jpg *.jpeg *.svg *.mp4 *.gif *.webp);;All Files (*)"
        )
        if not file_path:
            return

        import os, shutil
        playbook_dir = self.get_playbook_dir()
        assets_dir = os.path.join(playbook_dir, "assets")
        os.makedirs(assets_dir, exist_ok=True)
        filename = os.path.basename(file_path)
        dest = os.path.join(assets_dir, filename)
        if os.path.abspath(file_path) != os.path.abspath(dest):
            shutil.copy2(file_path, dest)

        st = self.playbook["steps"][idx]
        st.setdefault("assets", [])
        if filename not in st["assets"]:
            st["assets"].append(filename)
            self.on_step_selected(idx)
            self.playbook_updated.emit(self.playbook)

    def remove_asset_from_step(self):
        st_idx = self.steps_list.currentRow()
        a_idx = self.assets_list.currentRow()
        if st_idx < 0 or a_idx < 0:
            return
        st = self.playbook["steps"][st_idx]
        if a_idx < len(st.get("assets", [])):
            st["assets"].pop(a_idx)
            self.on_step_selected(st_idx)
            self.playbook_updated.emit(self.playbook)

    def add_checklist_item(self):
        st_idx = self.steps_list.currentRow()
        text = self.edit_new_cl_item.text().strip()
        if st_idx < 0 or not text:
            return
        st = self.playbook["steps"][st_idx]
        new_cl = {
            "id": f"c_{len(st.get('checklist', [])) + 1}",
            "text": text,
            "checked": False
        }
        st.setdefault("checklist", []).append(new_cl)
        self.edit_new_cl_item.clear()
        self.on_step_selected(st_idx)
        self.playbook_updated.emit(self.playbook)

    def remove_checklist_item(self):
        st_idx = self.steps_list.currentRow()
        cl_idx = self.cl_list.currentRow()
        if st_idx < 0 or cl_idx < 0:
            return
        st = self.playbook["steps"][st_idx]
        if cl_idx < len(st.get("checklist", [])):
            st["checklist"].pop(cl_idx)
            self.on_step_selected(st_idx)
            self.playbook_updated.emit(self.playbook)

    def add_copy_field(self):
        st_idx = self.steps_list.currentRow()
        lbl = self.edit_copy_label.text().strip()
        val = self.edit_copy_val.text().strip()
        if st_idx < 0 or not lbl or not val:
            return
        st = self.playbook["steps"][st_idx]
        st.setdefault("copy_fields", []).append({"label": lbl, "value": val})
        self.edit_copy_label.clear()
        self.edit_copy_val.clear()
        self.on_step_selected(st_idx)
        self.playbook_updated.emit(self.playbook)

    def remove_copy_field(self):
        st_idx = self.steps_list.currentRow()
        cf_idx = self.copy_fields_list.currentRow()
        if st_idx < 0 or cf_idx < 0:
            return
        st = self.playbook["steps"][st_idx]
        if cf_idx < len(st.get("copy_fields", [])):
            st["copy_fields"].pop(cf_idx)
            self.on_step_selected(st_idx)
            self.playbook_updated.emit(self.playbook)

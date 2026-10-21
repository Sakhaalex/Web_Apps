"""
Step-case: Main Entry Point & Application Shell
Includes the AXC Splash Screen (1s timer), classic Tkinter-style License Dialog
('Made with Love by Alex Sakha'), Menu Bar, Collapsible Tree Sidebar,
Strict Pure Blue/White & Pure Black/White theming, and Builder/Player mode switcher.
"""

import os
import sys
import tempfile
from typing import Dict, Any, Optional

from PyQt6.QtCore import Qt, QTimer, QSize, pyqtSignal
from PyQt6.QtGui import QAction, QFont, QIcon, QPixmap, QPainter, QColor
from PyQt6.QtSvg import QSvgRenderer
from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QStackedWidget, QSplitter, QTreeWidget, QTreeWidgetItem,
    QLabel, QPushButton, QFileDialog, QMessageBox, QDialog,
    QDialogButtonBox, QMenuBar, QMenu, QStatusBar, QFrame
)

from data_manager import PlaybookDataManager
from ui_builder import UIBuilder
from ui_player import UIPlayer


# ----------------------------------------------------------------------
# AXC SVG LOGO ASSET
# ----------------------------------------------------------------------
AXC_SVG_DATA = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" rx="40" fill="#000000" />
  <circle cx="200" cy="200" r="160" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="8 6" opacity="0.6"/>
  <!-- Geometric 'AXC' Monogram -->
  <path d="M 90 290 L 150 110 L 210 290" fill="none" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="112" y1="230" x2="188" y2="230" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round"/>
  <!-- X intersect -->
  <line x1="190" y1="130" x2="270" y2="290" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round"/>
  <line x1="270" y1="130" x2="190" y2="290" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round"/>
  <!-- C outer arc -->
  <path d="M 330 150 A 90 90 0 1 0 330 250" fill="none" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round"/>
  <!-- Subtext -->
  <text x="200" y="345" font-family="'Nano Sans', 'Segoe UI', sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="6">A X C</text>
  <text x="200" y="370" font-family="'Nano Sans', 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#AAAAAA" text-anchor="middle" letter-spacing="2">STEP-CASE RUNBOOK ENGINE</text>
</svg>"""


# ----------------------------------------------------------------------
# THEME DEFINITIONS
# Strictly Two Themes:
# Light: Pure Blue (#0055FF, #0033AA) and White (#FFFFFF) only.
# Dark: Pure Black (#000000) and White (#FFFFFF) only.
# ----------------------------------------------------------------------
LIGHT_THEME_QSS = """
/* Pure Blue & Pure White Theme */
QWidget {
    background-color: #FFFFFF;
    color: #0033AA;
    font-family: 'Nano Sans', 'Segoe UI', 'Roboto', sans-serif;
    font-size: 14px;
}

QMainWindow, QDialog {
    background-color: #FFFFFF;
}

QMenuBar {
    background-color: #0033AA;
    color: #FFFFFF;
    border-bottom: 2px solid #0055FF;
    padding: 2px;
}
QMenuBar::item {
    background-color: transparent;
    color: #FFFFFF;
    padding: 6px 12px;
}
QMenuBar::item:selected {
    background-color: #0055FF;
    color: #FFFFFF;
}

QMenu {
    background-color: #FFFFFF;
    color: #0033AA;
    border: 2px solid #0033AA;
    padding: 4px;
}
QMenu::item {
    padding: 6px 20px;
}
QMenu::item:selected {
    background-color: #0055FF;
    color: #FFFFFF;
}

QPushButton {
    background-color: #FFFFFF;
    color: #0033AA;
    border: 2px solid #0033AA;
    border-radius: 6px;
    padding: 8px 16px;
    font-weight: 600;
}
QPushButton:hover {
    background-color: #0033AA;
    color: #FFFFFF;
}
QPushButton:pressed {
    background-color: #002277;
    color: #FFFFFF;
}
QPushButton:disabled {
    border-color: #A0C0FF;
    color: #A0C0FF;
    background-color: #FFFFFF;
}

QPushButton#btnPlayerNext, QPushButton#primaryActionBtn {
    background-color: #0033AA;
    color: #FFFFFF;
    border: 2px solid #0033AA;
    font-weight: bold;
}
QPushButton#btnPlayerNext:hover, QPushButton#primaryActionBtn:hover {
    background-color: #0055FF;
    border-color: #0055FF;
}

QLineEdit, QTextEdit, QTextBrowser, QComboBox {
    background-color: #FFFFFF;
    color: #0033AA;
    border: 2px solid #0033AA;
    border-radius: 6px;
    padding: 6px 10px;
}
QLineEdit:focus, QTextEdit:focus, QComboBox:focus {
    border: 2px solid #0055FF;
}

QComboBox QAbstractItemView {
    background-color: #FFFFFF;
    color: #0033AA;
    selection-background-color: #0055FF;
    selection-color: #FFFFFF;
    border: 2px solid #0033AA;
}

QTreeWidget, QListWidget {
    background-color: #FFFFFF;
    color: #0033AA;
    border: 2px solid #0033AA;
    border-radius: 6px;
    padding: 4px;
}
QTreeWidget::item:selected, QListWidget::item:selected {
    background-color: #0033AA;
    color: #FFFFFF;
}

QTabWidget::pane {
    border: 2px solid #0033AA;
    background-color: #FFFFFF;
}
QTabBar::tab {
    background-color: #FFFFFF;
    color: #0033AA;
    border: 2px solid #0033AA;
    border-bottom: none;
    padding: 8px 14px;
    margin-right: 2px;
    font-weight: 600;
}
QTabBar::tab:selected {
    background-color: #0033AA;
    color: #FFFFFF;
}

QGroupBox {
    border: 2px solid #0033AA;
    border-radius: 6px;
    margin-top: 14px;
    padding: 14px;
    font-weight: bold;
    color: #0033AA;
}
QGroupBox::title {
    subcontrol-origin: margin;
    subcontrol-position: top left;
    padding: 0 6px;
    background-color: #FFFFFF;
}

QProgressBar {
    background-color: #E6EFFF;
    border: 1px solid #0033AA;
    border-radius: 3px;
}
QProgressBar::chunk {
    background-color: #0033AA;
}

QCheckBox {
    color: #0033AA;
    font-weight: 500;
}
QCheckBox::indicator {
    width: 18px;
    height: 18px;
    border: 2px solid #0033AA;
    border-radius: 3px;
    background-color: #FFFFFF;
}
QCheckBox::indicator:checked {
    background-color: #0033AA;
}

#playerChoiceCard {
    background-color: #FFFFFF;
    border-color: #0033AA;
}
#playerChoiceCard:hover {
    background-color: #0033AA;
    color: #FFFFFF;
}

#sidebarHeader {
    background-color: #0033AA;
    color: #FFFFFF;
    padding: 10px;
    font-weight: bold;
}
"""

DARK_THEME_QSS = """
/* Pure Black & Pure White Theme */
QWidget {
    background-color: #000000;
    color: #FFFFFF;
    font-family: 'Nano Sans', 'Segoe UI', 'Roboto', sans-serif;
    font-size: 14px;
}

QMainWindow, QDialog {
    background-color: #000000;
}

QMenuBar {
    background-color: #000000;
    color: #FFFFFF;
    border-bottom: 2px solid #FFFFFF;
    padding: 2px;
}
QMenuBar::item {
    background-color: transparent;
    color: #FFFFFF;
    padding: 6px 12px;
}
QMenuBar::item:selected {
    background-color: #FFFFFF;
    color: #000000;
}

QMenu {
    background-color: #000000;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    padding: 4px;
}
QMenu::item {
    padding: 6px 20px;
}
QMenu::item:selected {
    background-color: #FFFFFF;
    color: #000000;
}

QPushButton {
    background-color: #000000;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    border-radius: 6px;
    padding: 8px 16px;
    font-weight: 600;
}
QPushButton:hover {
    background-color: #FFFFFF;
    color: #000000;
}
QPushButton:pressed {
    background-color: #CCCCCC;
    color: #000000;
}
QPushButton:disabled {
    border-color: #444444;
    color: #666666;
    background-color: #000000;
}

QPushButton#btnPlayerNext, QPushButton#primaryActionBtn {
    background-color: #FFFFFF;
    color: #000000;
    border: 2px solid #FFFFFF;
    font-weight: bold;
}
QPushButton#btnPlayerNext:hover, QPushButton#primaryActionBtn:hover {
    background-color: #CCCCCC;
    border-color: #CCCCCC;
}

QLineEdit, QTextEdit, QTextBrowser, QComboBox {
    background-color: #000000;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    border-radius: 6px;
    padding: 6px 10px;
}
QLineEdit:focus, QTextEdit:focus, QComboBox:focus {
    border: 2px solid #FFFFFF;
}

QComboBox QAbstractItemView {
    background-color: #000000;
    color: #FFFFFF;
    selection-background-color: #FFFFFF;
    selection-color: #000000;
    border: 2px solid #FFFFFF;
}

QTreeWidget, QListWidget {
    background-color: #000000;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    border-radius: 6px;
    padding: 4px;
}
QTreeWidget::item:selected, QListWidget::item:selected {
    background-color: #FFFFFF;
    color: #000000;
}

QTabWidget::pane {
    border: 2px solid #FFFFFF;
    background-color: #000000;
}
QTabBar::tab {
    background-color: #000000;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    border-bottom: none;
    padding: 8px 14px;
    margin-right: 2px;
    font-weight: 600;
}
QTabBar::tab:selected {
    background-color: #FFFFFF;
    color: #000000;
}

QGroupBox {
    border: 2px solid #FFFFFF;
    border-radius: 6px;
    margin-top: 14px;
    padding: 14px;
    font-weight: bold;
    color: #FFFFFF;
}
QGroupBox::title {
    subcontrol-origin: margin;
    subcontrol-position: top left;
    padding: 0 6px;
    background-color: #000000;
}

QProgressBar {
    background-color: #222222;
    border: 1px solid #FFFFFF;
    border-radius: 3px;
}
QProgressBar::chunk {
    background-color: #FFFFFF;
}

QCheckBox {
    color: #FFFFFF;
    font-weight: 500;
}
QCheckBox::indicator {
    width: 18px;
    height: 18px;
    border: 2px solid #FFFFFF;
    border-radius: 3px;
    background-color: #000000;
}
QCheckBox::indicator:checked {
    background-color: #FFFFFF;
}

#playerChoiceCard {
    background-color: #000000;
    border-color: #FFFFFF;
}
#playerChoiceCard:hover {
    background-color: #FFFFFF;
    color: #000000;
}

#sidebarHeader {
    background-color: #000000;
    color: #FFFFFF;
    border-bottom: 2px solid #FFFFFF;
    padding: 10px;
    font-weight: bold;
}
"""


# ----------------------------------------------------------------------
# SPLASH SCREEN & TKINTER-STYLE LICENSE DIALOG
# ----------------------------------------------------------------------
class AXCSplashScreen(QWidget):
    """Shows the AXC SVG logo for 1 second."""

    finished = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.setWindowFlags(Qt.WindowType.FramelessWindowHint | Qt.WindowType.WindowStaysOnTopHint)
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, False)
        self.setFixedSize(400, 400)

        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)

        # Render SVG into pixmap
        renderer = QSvgRenderer(AXC_SVG_DATA.encode("utf-8"))
        pix = QPixmap(400, 400)
        pix.fill(Qt.GlobalColor.black)
        painter = QPainter(pix)
        renderer.render(painter)
        painter.end()

        lbl = QLabel()
        lbl.setPixmap(pix)
        lbl.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(lbl)

        # Center on screen
        screen_geo = QApplication.primaryScreen().geometry()
        self.move(
            (screen_geo.width() - self.width()) // 2,
            (screen_geo.height() - self.height()) // 2
        )

    def launch(self):
        self.show()
        # Hold for 1 second as specified in requirements
        QTimer.singleShot(1000, self.on_timeout)

    def on_timeout(self):
        self.close()
        self.finished.emit()


class TkinterStyleLicenseBox(QDialog):
    """
    Classic Tkinter-style Accept/Decline message box stating:
    'Made with Love by Alex Sakha'.
    App only opens if accepted.
    """

    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Step-case — Welcome & License")
        self.setFixedSize(440, 210)
        self.setWindowFlags(Qt.WindowType.Dialog | Qt.WindowType.CustomizeWindowHint | Qt.WindowType.WindowTitleHint)

        # Classic Tkinter styling: gray system appearance with clear standard typography
        self.setStyleSheet("""
            QDialog {
                background-color: #ECE9D8;
                color: #000000;
                font-family: 'Tahoma', 'Segoe UI', sans-serif;
            }
            QLabel {
                font-size: 13px;
                color: #000000;
            }
            QPushButton {
                background-color: #ECE9D8;
                color: #000000;
                border: 2px outset #FFFFFF;
                border-radius: 2px;
                padding: 6px 18px;
                font-size: 12px;
                min-width: 85px;
            }
            QPushButton:hover {
                background-color: #E2DFCE;
            }
            QPushButton:pressed {
                border-style: inset;
            }
        """)

        layout = QVBoxLayout(self)
        layout.setContentsMargins(20, 20, 20, 16)
        layout.setSpacing(16)

        msg_layout = QHBoxLayout()
        # Tkinter exclamation / info style badge
        icon_lbl = QLabel("ℹ")
        icon_lbl.setStyleSheet("font-size: 32px; font-weight: bold; color: #0055EA; padding-right: 10px;")
        msg_layout.addWidget(icon_lbl)

        text_layout = QVBoxLayout()
        title_lbl = QLabel("Step-case Interactive Playbook Engine")
        title_lbl.setStyleSheet("font-size: 14px; font-weight: bold;")
        text_layout.addWidget(title_lbl)

        # Explicit required message
        body_lbl = QLabel("Made with Love by Alex Sakha\n\nDo you accept the terms to launch Step-case?")
        body_lbl.setStyleSheet("line-height: 1.4;")
        text_layout.addWidget(body_lbl)
        msg_layout.addLayout(text_layout)

        layout.addLayout(msg_layout)
        layout.addStretch()

        btn_row = QHBoxLayout()
        btn_row.addStretch()

        btn_accept = QPushButton("Accept")
        btn_accept.setDefault(True)
        btn_accept.clicked.connect(self.accept)

        btn_decline = QPushButton("Decline")
        btn_decline.clicked.connect(self.reject)

        btn_row.addWidget(btn_accept)
        btn_row.addSpacing(8)
        btn_row.addWidget(btn_decline)

        layout.addLayout(btn_row)

        # Center on screen
        screen_geo = QApplication.primaryScreen().geometry()
        self.move(
            (screen_geo.width() - self.width()) // 2,
            (screen_geo.height() - self.height()) // 2
        )


# ----------------------------------------------------------------------
# MAIN APPLICATION WINDOW
# ----------------------------------------------------------------------
class StepCaseMainWindow(QMainWindow):
    """Main window with top menu, collapsible tree sidebar, and Builder/Player modes."""

    def __init__(self, base_workspace_dir: Optional[str] = None):
        super().__init__()
        self.setWindowTitle("Step-case — Interactive Playbook & Runbook")
        self.resize(1180, 780)
        self.setMinimumSize(920, 600)

        # Working directory for playbooks
        if base_workspace_dir:
            self.base_workspace_dir = base_workspace_dir
        else:
            self.base_workspace_dir = os.path.join(tempfile.gettempdir(), "stepcase_workspace")
        os.makedirs(self.base_workspace_dir, exist_ok=True)

        # Current Playbook data and active folder
        self.playbook_data = PlaybookDataManager.get_default_playbook()
        self.current_playbook_dir = PlaybookDataManager.save_playbook(self.playbook_data, self.base_workspace_dir)

        # Theme state: strictly "light" (Pure Blue & White) or "dark" (Pure Black & White)
        self.current_theme = "light"

        self.init_menu_bar()
        self.init_main_layout()
        self.apply_theme("light")
        self.refresh_sidebar_tree()

    def get_current_playbook_dir(self) -> str:
        return self.current_playbook_dir

    # -------------------------------------------------------------
    # MENU BAR (File, Edit, Options, About)
    # -------------------------------------------------------------
    def init_menu_bar(self):
        menubar = self.menuBar()

        # File Menu
        file_menu = menubar.addMenu("&File")

        act_new = QAction("&New Playbook", self)
        act_new.setShortcut("Ctrl+N")
        act_new.triggered.connect(self.action_new_playbook)
        file_menu.addAction(act_new)

        act_open = QAction("&Open Playbook Folder...", self)
        act_open.setShortcut("Ctrl+O")
        act_open.triggered.connect(self.action_open_playbook)
        file_menu.addAction(act_open)

        act_save = QAction("&Save Playbook", self)
        act_save.setShortcut("Ctrl+S")
        act_save.triggered.connect(self.action_save_playbook)
        file_menu.addAction(act_save)

        file_menu.addSeparator()

        act_export_zip = QAction("&Export Playbook as .ZIP...", self)
        act_export_zip.setShortcut("Ctrl+E")
        act_export_zip.triggered.connect(self.action_export_zip)
        file_menu.addAction(act_export_zip)

        act_import_zip = QAction("&Import Playbook from .ZIP...", self)
        act_import_zip.setShortcut("Ctrl+I")
        act_import_zip.triggered.connect(self.action_import_zip)
        file_menu.addAction(act_import_zip)

        file_menu.addSeparator()

        act_exit = QAction("E&xit", self)
        act_exit.setShortcut("Ctrl+Q")
        act_exit.triggered.connect(self.close)
        file_menu.addAction(act_exit)

        # Edit Menu
        edit_menu = menubar.addMenu("&Edit")
        act_mode_builder = QAction("Switch to &Builder Mode", self)
        act_mode_builder.setShortcut("F1")
        act_mode_builder.triggered.connect(lambda: self.switch_mode("builder"))
        edit_menu.addAction(act_mode_builder)

        act_mode_player = QAction("Switch to &Player Mode", self)
        act_mode_player.setShortcut("F2")
        act_mode_player.triggered.connect(lambda: self.switch_mode("player"))
        edit_menu.addAction(act_mode_player)

        # Options Menu
        options_menu = menubar.addMenu("&Options")
        act_toggle_sidebar = QAction("Toggle &Sidebar", self)
        act_toggle_sidebar.setShortcut("Ctrl+B")
        act_toggle_sidebar.triggered.connect(self.toggle_sidebar)
        options_menu.addAction(act_toggle_sidebar)

        options_menu.addSeparator()

        act_theme_light = QAction("Theme: Light (Pure Blue & White)", self)
        act_theme_light.triggered.connect(lambda: self.apply_theme("light"))
        options_menu.addAction(act_theme_light)

        act_theme_dark = QAction("Theme: Dark (Pure Black & White)", self)
        act_theme_dark.triggered.connect(lambda: self.apply_theme("dark"))
        options_menu.addAction(act_theme_dark)

        # About Menu
        about_menu = menubar.addMenu("&About")
        act_about = QAction("&About Step-case", self)
        act_about.triggered.connect(self.show_about_dialog)
        about_menu.addAction(act_about)

    # -------------------------------------------------------------
    # MAIN LAYOUT & COLLAPSIBLE SIDEBAR
    # -------------------------------------------------------------
    def init_main_layout(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)

        main_layout = QHBoxLayout(central_widget)
        main_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.setSpacing(0)

        self.splitter = QSplitter(Qt.Orientation.Horizontal)

        # Collapsible Left Sidebar Widget
        self.sidebar_widget = QWidget()
        sidebar_layout = QVBoxLayout(self.sidebar_widget)
        sidebar_layout.setContentsMargins(10, 10, 10, 10)
        sidebar_layout.setSpacing(10)

        # Mode Selector Buttons in Sidebar
        mode_btn_box = QHBoxLayout()
        self.btn_side_builder = QPushButton("Builder")
        self.btn_side_builder.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_side_builder.clicked.connect(lambda: self.switch_mode("builder"))

        self.btn_side_player = QPushButton("Player")
        self.btn_side_player.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_side_player.clicked.connect(lambda: self.switch_mode("player"))

        mode_btn_box.addWidget(self.btn_side_builder)
        mode_btn_box.addWidget(self.btn_side_player)
        sidebar_layout.addLayout(mode_btn_box)

        # Hierarchy Tree Header
        lbl_tree_head = QLabel("Playbook Hierarchy")
        lbl_tree_head.setStyleSheet("font-weight: bold; font-size: 13px;")
        sidebar_layout.addWidget(lbl_tree_head)

        # Tree Widget (Screens -> Sequences -> Steps)
        self.tree_widget = QTreeWidget()
        self.tree_widget.setHeaderHidden(True)
        self.tree_widget.itemClicked.connect(self.on_tree_item_clicked)
        sidebar_layout.addWidget(self.tree_widget, 1)

        self.sidebar_widget.setFixedWidth(270)
        self.splitter.addWidget(self.sidebar_widget)

        # Right View: Stacked widget containing UIBuilder and UIPlayer
        self.stack = QStackedWidget()

        self.builder_view = UIBuilder(self.playbook_data, self.get_current_playbook_dir)
        self.builder_view.playbook_updated.connect(self.on_playbook_data_updated)
        self.builder_view.switch_to_player_requested.connect(lambda: self.switch_mode("player"))

        self.player_view = UIPlayer(self.playbook_data, self.get_current_playbook_dir)
        self.player_view.back_to_builder_requested.connect(lambda: self.switch_mode("builder"))
        self.player_view.step_changed.connect(self.on_player_step_changed)

        self.stack.addWidget(self.builder_view)  # index 0
        self.stack.addWidget(self.player_view)   # index 1

        self.splitter.addWidget(self.stack)
        self.splitter.setSizes([270, 910])

        main_layout.addWidget(self.splitter)

        # Status Bar
        self.status_bar = QStatusBar()
        self.setStatusBar(self.status_bar)
        self.status_bar.showMessage("Step-case Ready • Mode: Builder")

    # -------------------------------------------------------------
    # THEME SWITCHER
    # Strictly Two Themes:
    # Light: Pure Blue and White only.
    # Dark: Pure Black and White only.
    # -------------------------------------------------------------
    def apply_theme(self, theme_name: str):
        self.current_theme = theme_name
        if theme_name == "dark":
            self.setStyleSheet(DARK_THEME_QSS)
            self.status_bar.showMessage("Theme: Dark (Pure Black & White)")
        else:
            self.setStyleSheet(LIGHT_THEME_QSS)
            self.status_bar.showMessage("Theme: Light (Pure Blue & White)")

    def toggle_sidebar(self):
        is_visible = self.sidebar_widget.isVisible()
        self.sidebar_widget.setVisible(not is_visible)

    def switch_mode(self, mode: str):
        if mode == "builder":
            self.stack.setCurrentIndex(0)
            self.builder_view.load_playbook_into_ui()
            self.status_bar.showMessage("Switched to Builder Mode (Visual Authoring)")
        else:
            # Sync builder changes into player
            self.player_view.set_playbook_data(self.playbook_data)
            self.stack.setCurrentIndex(1)
            self.status_bar.showMessage("Switched to Player Mode (Execution)")
        self.refresh_sidebar_tree()

    # -------------------------------------------------------------
    # SIDEBAR TREE POPULATION
    # -------------------------------------------------------------
    def refresh_sidebar_tree(self):
        self.tree_widget.clear()

        # Root: Playbook title
        root_item = QTreeWidgetItem([f"📖 {self.playbook_data.get('title', 'Playbook')}"])
        root_item.setExpanded(True)
        self.tree_widget.addTopLevelItem(root_item)

        # Branch 1: Screens (Multiplexers)
        screens_node = QTreeWidgetItem(["🔀 Decision Screens"])
        screens_node.setExpanded(True)
        root_item.addChild(screens_node)

        for scr in self.playbook_data.get("screens", []):
            scr_item = QTreeWidgetItem([f"⬡ {scr.get('title', 'Screen')}"])
            scr_item.setData(0, Qt.ItemDataRole.UserRole, {"type": "screen", "id": scr.get("id")})
            screens_node.addChild(scr_item)

        # Branch 2: Sequences (Flows) & their Steps
        seqs_node = QTreeWidgetItem(["⛓ Sequences"])
        seqs_node.setExpanded(True)
        root_item.addChild(seqs_node)

        step_map = {s["id"]: s for s in self.playbook_data.get("steps", [])}

        for seq in self.playbook_data.get("sequences", []):
            seq_item = QTreeWidgetItem([f"↳ {seq.get('title', 'Sequence')}"])
            seq_item.setData(0, Qt.ItemDataRole.UserRole, {"type": "sequence", "id": seq.get("id")})
            seq_item.setExpanded(True)

            for step_id in seq.get("step_ids", []):
                step = step_map.get(step_id, {})
                title = step.get("title", step_id)
                step_item = QTreeWidgetItem([f"• {title}"])
                step_item.setData(0, Qt.ItemDataRole.UserRole, {
                    "type": "step",
                    "sequence_id": seq.get("id"),
                    "step_id": step_id
                })
                seq_item.addChild(step_item)

            seqs_node.addChild(seq_item)

    def on_tree_item_clicked(self, item: QTreeWidgetItem, column: int):
        data = item.data(0, Qt.ItemDataRole.UserRole)
        if not data:
            return

        item_type = data.get("type")
        if self.stack.currentIndex() == 0:
            # In Builder Mode: switch to corresponding tab
            if item_type == "screen":
                self.builder_view.tabs.setCurrentIndex(1)
            elif item_type == "sequence":
                self.builder_view.tabs.setCurrentIndex(2)
            elif item_type == "step":
                self.builder_view.tabs.setCurrentIndex(3)
        else:
            # In Player Mode: jump directly to screen or sequence step
            if item_type == "screen":
                self.player_view.show_screen(data.get("id"), push_history=True)
            elif item_type == "sequence":
                self.player_view.start_sequence(data.get("id"))
            elif item_type == "step":
                seq_id = data.get("sequence_id")
                st_id = data.get("step_id")
                seq = next((s for s in self.playbook_data.get("sequences", []) if s.get("id") == seq_id), None)
                if seq:
                    try:
                        idx = seq.get("step_ids", []).index(st_id)
                        self.player_view.show_step(seq_id, idx, push_history=True)
                    except ValueError:
                        pass

    def on_player_step_changed(self, state: dict):
        # Update status bar with active execution location
        self.status_bar.showMessage(f"Player: {state.get('title', '')}")

    def on_playbook_data_updated(self, updated_data: dict):
        self.playbook_data = updated_data
        self.refresh_sidebar_tree()

    # -------------------------------------------------------------
    # ACTIONS: FILE OPERATIONS
    # -------------------------------------------------------------
    def action_new_playbook(self):
        new_data = {
            "version": "1.0",
            "name": "New_Playbook",
            "title": "Untitled Interactive Playbook",
            "description": "Created in Step-case",
            "start_screen_id": "screen_start",
            "screens": [
                {
                    "id": "screen_start",
                    "title": "Welcome Screen",
                    "description": "Choose your workflow sequence to start.",
                    "disable_back": False,
                    "type": "decision",
                    "options": [
                        {"id": "opt_main", "label": "Start Main Workflow", "description": "Begin initial step", "target_sequence_id": "seq_main"}
                    ]
                }
            ],
            "sequences": [
                {
                    "id": "seq_main",
                    "title": "Initial Flow",
                    "step_ids": ["step_intro"],
                    "next_screen_id": None
                }
            ],
            "steps": [
                {
                    "id": "step_intro",
                    "title": "Welcome and Prerequisites",
                    "content_file": "content/step_intro.md",
                    "content_text": "### Getting Started\n\nFollow the instructions below to begin execution.",
                    "assets": [],
                    "disable_back": False,
                    "checklist": [{"id": "c1", "text": "Prerequisites installed", "checked": False}],
                    "copy_fields": [{"label": "Help URL", "value": "https://docs.python.org"}]
                }
            ]
        }
        self.playbook_data = new_data
        self.current_playbook_dir = PlaybookDataManager.save_playbook(self.playbook_data, self.base_workspace_dir)
        self.builder_view.playbook = self.playbook_data
        self.builder_view.load_playbook_into_ui()
        self.player_view.set_playbook_data(self.playbook_data)
        self.refresh_sidebar_tree()
        QMessageBox.information(self, "New Playbook", "Created a new blank Playbook template.")

    def action_open_playbook(self):
        folder = QFileDialog.getExistingDirectory(self, "Open Playbook Folder", self.base_workspace_dir)
        if not folder:
            return
        try:
            loaded = PlaybookDataManager.load_playbook(folder)
            self.playbook_data = loaded
            self.current_playbook_dir = folder
            self.builder_view.playbook = self.playbook_data
            self.builder_view.load_playbook_into_ui()
            self.player_view.set_playbook_data(self.playbook_data)
            self.refresh_sidebar_tree()
            QMessageBox.information(self, "Playbook Loaded", f"Loaded playbook '{loaded.get('title')}' successfully.")
        except Exception as e:
            QMessageBox.critical(self, "Load Error", f"Failed to load playbook: {str(e)}")

    def action_save_playbook(self):
        try:
            self.current_playbook_dir = PlaybookDataManager.save_playbook(self.playbook_data, self.base_workspace_dir)
            self.status_bar.showMessage(f"Playbook saved to: {self.current_playbook_dir}", 4000)
            QMessageBox.information(self, "Saved", f"Playbook successfully saved into folder:\n{self.current_playbook_dir}")
        except Exception as e:
            QMessageBox.critical(self, "Save Error", f"Failed to save playbook: {str(e)}")

    def action_export_zip(self):
        default_zip_name = f"{self.playbook_data.get('name', 'playbook')}.zip"
        save_path, _ = QFileDialog.getSaveFileName(self, "Export Playbook as .ZIP", default_zip_name, "Zip Archives (*.zip)")
        if not save_path:
            return
        try:
            # Ensure latest saved state
            PlaybookDataManager.save_playbook(self.playbook_data, self.base_workspace_dir)
            PlaybookDataManager.export_as_zip(self.current_playbook_dir, save_path)
            QMessageBox.information(self, "Export Successful", f"Playbook successfully packaged as standalone archive:\n{save_path}")
        except Exception as e:
            QMessageBox.critical(self, "Export Error", f"Failed to export ZIP: {str(e)}")

    def action_import_zip(self):
        zip_path, _ = QFileDialog.getOpenFileName(self, "Import Playbook .ZIP", "", "Zip Archives (*.zip)")
        if not zip_path:
            return
        try:
            extract_target = os.path.join(self.base_workspace_dir, "imported")
            os.makedirs(extract_target, exist_ok=True)
            loaded_dir = PlaybookDataManager.import_from_zip(zip_path, extract_target)
            loaded_data = PlaybookDataManager.load_playbook(loaded_dir)

            self.playbook_data = loaded_data
            self.current_playbook_dir = loaded_dir
            self.builder_view.playbook = self.playbook_data
            self.builder_view.load_playbook_into_ui()
            self.player_view.set_playbook_data(self.playbook_data)
            self.refresh_sidebar_tree()
            QMessageBox.information(self, "Import Successful", f"Successfully imported '{loaded_data.get('title')}'!")
        except Exception as e:
            QMessageBox.critical(self, "Import Error", f"Failed to import ZIP: {str(e)}")

    def show_about_dialog(self):
        QMessageBox.about(
            self,
            "About Step-case",
            "<b>Step-case Desktop Application</b><br/><br/>"
            "An offline, interactive playbook and runbook application for SOPs, installations, "
            "and error-handling workflows.<br/><br/>"
            "• Visual No-Code Builder<br/>"
            "• Decision Multiplexer Routing<br/>"
            "• Linear Sequences & Checklist State Tracking<br/>"
            "• Portable ZIP packaging<br/><br/>"
            "<b>Made with Love by Alex Sakha</b>"
        )


# ----------------------------------------------------------------------
# ENTRY POINT
# ----------------------------------------------------------------------
def main():
    app = QApplication(sys.argv)
    app.setApplicationName("Step-case")
    app.setOrganizationName("AXC")

    # 1. Show AXC Splash Screen for 1 second
    splash = AXCSplashScreen()

    # Callback when 1 second splash finishes
    def on_splash_done():
        # 2. Show Tkinter-style Accept/Decline message box
        license_box = TkinterStyleLicenseBox()
        accepted = license_box.exec()

        if accepted == QDialog.DialogCode.Accepted:
            # 3. App only opens if accepted
            main_window = StepCaseMainWindow()
            main_window.show()
            # Keep reference to prevent garbage collection
            app._main_window = main_window
        else:
            # Declined: Exit cleanly
            sys.exit(0)

    splash.finished.connect(on_splash_done)
    splash.launch()

    sys.exit(app.exec())


if __name__ == "__main__":
    main()

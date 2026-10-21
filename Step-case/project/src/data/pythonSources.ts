/**
 * Holds raw Python source code for in-browser inspection and full project zip packaging
 */

export const PYTHON_MAIN_PY = `"""
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


AXC_SVG_DATA = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" rx="40" fill="#000000" />
  <circle cx="200" cy="200" r="160" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="8 6" opacity="0.6"/>
  <path d="M 90 290 L 150 110 L 210 290" fill="none" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="112" y1="230" x2="188" y2="230" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round"/>
  <line x1="190" y1="130" x2="270" y2="290" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round"/>
  <line x1="270" y1="130" x2="190" y2="290" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round"/>
  <path d="M 330 150 A 90 90 0 1 0 330 250" fill="none" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round"/>
  <text x="200" y="345" font-family="'Nano Sans', 'Segoe UI', sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="6">A X C</text>
  <text x="200" y="370" font-family="'Nano Sans', 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#AAAAAA" text-anchor="middle" letter-spacing="2">STEP-CASE RUNBOOK ENGINE</text>
</svg>"""

LIGHT_THEME_QSS = """
QWidget {
    background-color: #FFFFFF;
    color: #0033AA;
    font-family: 'Nano Sans', 'Segoe UI', 'Roboto', sans-serif;
    font-size: 14px;
}
QMainWindow, QDialog { background-color: #FFFFFF; }
QMenuBar { background-color: #0033AA; color: #FFFFFF; border-bottom: 2px solid #0055FF; padding: 2px; }
QMenuBar::item { background-color: transparent; color: #FFFFFF; padding: 6px 12px; }
QMenuBar::item:selected { background-color: #0055FF; color: #FFFFFF; }
QMenu { background-color: #FFFFFF; color: #0033AA; border: 2px solid #0033AA; padding: 4px; }
QMenu::item { padding: 6px 20px; }
QMenu::item:selected { background-color: #0055FF; color: #FFFFFF; }
QPushButton {
    background-color: #FFFFFF; color: #0033AA; border: 2px solid #0033AA;
    border-radius: 6px; padding: 8px 16px; font-weight: 600;
}
QPushButton:hover { background-color: #0033AA; color: #FFFFFF; }
QPushButton:pressed { background-color: #002277; color: #FFFFFF; }
QPushButton:disabled { border-color: #A0C0FF; color: #A0C0FF; background-color: #FFFFFF; }
QPushButton#btnPlayerNext, QPushButton#primaryActionBtn {
    background-color: #0033AA; color: #FFFFFF; border: 2px solid #0033AA; font-weight: bold;
}
QPushButton#btnPlayerNext:hover, QPushButton#primaryActionBtn:hover { background-color: #0055FF; border-color: #0055FF; }
QLineEdit, QTextEdit, QTextBrowser, QComboBox {
    background-color: #FFFFFF; color: #0033AA; border: 2px solid #0033AA; border-radius: 6px; padding: 6px 10px;
}
QLineEdit:focus, QTextEdit:focus, QComboBox:focus { border: 2px solid #0055FF; }
QTreeWidget, QListWidget { background-color: #FFFFFF; color: #0033AA; border: 2px solid #0033AA; border-radius: 6px; }
QTreeWidget::item:selected, QListWidget::item:selected { background-color: #0033AA; color: #FFFFFF; }
QTabWidget::pane { border: 2px solid #0033AA; background-color: #FFFFFF; }
QTabBar::tab { background-color: #FFFFFF; color: #0033AA; border: 2px solid #0033AA; border-bottom: none; padding: 8px 14px; font-weight: 600; }
QTabBar::tab:selected { background-color: #0033AA; color: #FFFFFF; }
QGroupBox { border: 2px solid #0033AA; border-radius: 6px; margin-top: 14px; padding: 14px; font-weight: bold; color: #0033AA; }
QProgressBar { background-color: #E6EFFF; border: 1px solid #0033AA; border-radius: 3px; }
QProgressBar::chunk { background-color: #0033AA; }
QCheckBox::indicator { width: 18px; height: 18px; border: 2px solid #0033AA; border-radius: 3px; background-color: #FFFFFF; }
QCheckBox::indicator:checked { background-color: #0033AA; }
#playerChoiceCard { background-color: #FFFFFF; border-color: #0033AA; }
#playerChoiceCard:hover { background-color: #0033AA; color: #FFFFFF; }
"""

DARK_THEME_QSS = """
QWidget {
    background-color: #000000;
    color: #FFFFFF;
    font-family: 'Nano Sans', 'Segoe UI', 'Roboto', sans-serif;
    font-size: 14px;
}
QMainWindow, QDialog { background-color: #000000; }
QMenuBar { background-color: #000000; color: #FFFFFF; border-bottom: 2px solid #FFFFFF; padding: 2px; }
QMenuBar::item { background-color: transparent; color: #FFFFFF; padding: 6px 12px; }
QMenuBar::item:selected { background-color: #FFFFFF; color: #000000; }
QMenu { background-color: #000000; color: #FFFFFF; border: 2px solid #FFFFFF; padding: 4px; }
QMenu::item { padding: 6px 20px; }
QMenu::item:selected { background-color: #FFFFFF; color: #000000; }
QPushButton {
    background-color: #000000; color: #FFFFFF; border: 2px solid #FFFFFF;
    border-radius: 6px; padding: 8px 16px; font-weight: 600;
}
QPushButton:hover { background-color: #FFFFFF; color: #000000; }
QPushButton:pressed { background-color: #CCCCCC; color: #000000; }
QPushButton:disabled { border-color: #444444; color: #666666; background-color: #000000; }
QPushButton#btnPlayerNext, QPushButton#primaryActionBtn {
    background-color: #FFFFFF; color: #000000; border: 2px solid #FFFFFF; font-weight: bold;
}
QLineEdit, QTextEdit, QTextBrowser, QComboBox {
    background-color: #000000; color: #FFFFFF; border: 2px solid #FFFFFF; border-radius: 6px; padding: 6px 10px;
}
QTreeWidget, QListWidget { background-color: #000000; color: #FFFFFF; border: 2px solid #FFFFFF; border-radius: 6px; }
QTreeWidget::item:selected, QListWidget::item:selected { background-color: #FFFFFF; color: #000000; }
QTabWidget::pane { border: 2px solid #FFFFFF; background-color: #000000; }
QTabBar::tab { background-color: #000000; color: #FFFFFF; border: 2px solid #FFFFFF; border-bottom: none; padding: 8px 14px; font-weight: 600; }
QTabBar::tab:selected { background-color: #FFFFFF; color: #000000; }
QGroupBox { border: 2px solid #FFFFFF; border-radius: 6px; margin-top: 14px; padding: 14px; font-weight: bold; color: #FFFFFF; }
QProgressBar { background-color: #222222; border: 1px solid #FFFFFF; border-radius: 3px; }
QProgressBar::chunk { background-color: #FFFFFF; }
QCheckBox::indicator { width: 18px; height: 18px; border: 2px solid #FFFFFF; border-radius: 3px; background-color: #000000; }
QCheckBox::indicator:checked { background-color: #FFFFFF; }
#playerChoiceCard { background-color: #000000; border-color: #FFFFFF; }
#playerChoiceCard:hover { background-color: #FFFFFF; color: #000000; }
"""

class AXCSplashScreen(QWidget):
    finished = pyqtSignal()
    def __init__(self):
        super().__init__()
        self.setWindowFlags(Qt.WindowType.FramelessWindowHint | Qt.WindowType.WindowStaysOnTopHint)
        self.setFixedSize(400, 400)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        renderer = QSvgRenderer(AXC_SVG_DATA.encode("utf-8"))
        pix = QPixmap(400, 400)
        pix.fill(Qt.GlobalColor.black)
        painter = QPainter(pix)
        renderer.render(painter)
        painter.end()
        lbl = QLabel()
        lbl.setPixmap(pix)
        layout.addWidget(lbl)
        screen_geo = QApplication.primaryScreen().geometry()
        self.move((screen_geo.width() - 400) // 2, (screen_geo.height() - 400) // 2)

    def launch(self):
        self.show()
        QTimer.singleShot(1000, self.on_timeout)

    def on_timeout(self):
        self.close()
        self.finished.emit()

class TkinterStyleLicenseBox(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Step-case — Welcome & License")
        self.setFixedSize(440, 210)
        self.setStyleSheet("""
            QDialog { background-color: #ECE9D8; color: #000000; font-family: 'Tahoma', sans-serif; }
            QLabel { font-size: 13px; color: #000000; }
            QPushButton { background-color: #ECE9D8; color: #000000; border: 2px outset #FFFFFF; padding: 6px 18px; min-width: 85px; }
        """)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(20, 20, 20, 16)
        msg_layout = QHBoxLayout()
        icon_lbl = QLabel("ℹ")
        icon_lbl.setStyleSheet("font-size: 32px; font-weight: bold; color: #0055EA; padding-right: 10px;")
        msg_layout.addWidget(icon_lbl)
        text_layout = QVBoxLayout()
        title_lbl = QLabel("Step-case Interactive Playbook Engine")
        title_lbl.setStyleSheet("font-size: 14px; font-weight: bold;")
        text_layout.addWidget(title_lbl)
        body_lbl = QLabel("Made with Love by Alex Sakha\\n\\nDo you accept the terms to launch Step-case?")
        text_layout.addWidget(body_lbl)
        msg_layout.addLayout(text_layout)
        layout.addLayout(msg_layout)
        layout.addStretch()
        btn_row = QHBoxLayout()
        btn_row.addStretch()
        btn_accept = QPushButton("Accept")
        btn_accept.clicked.connect(self.accept)
        btn_decline = QPushButton("Decline")
        btn_decline.clicked.connect(self.reject)
        btn_row.addWidget(btn_accept)
        btn_row.addSpacing(8)
        btn_row.addWidget(btn_decline)
        layout.addLayout(btn_row)
        screen_geo = QApplication.primaryScreen().geometry()
        self.move((screen_geo.width() - 440) // 2, (screen_geo.height() - 210) // 2)

class StepCaseMainWindow(QMainWindow):
    def __init__(self, base_workspace_dir: Optional[str] = None):
        super().__init__()
        self.setWindowTitle("Step-case — Interactive Playbook & Runbook")
        self.resize(1180, 780)
        self.base_workspace_dir = base_workspace_dir or os.path.join(tempfile.gettempdir(), "stepcase_workspace")
        os.makedirs(self.base_workspace_dir, exist_ok=True)
        self.playbook_data = PlaybookDataManager.get_default_playbook()
        self.current_playbook_dir = PlaybookDataManager.save_playbook(self.playbook_data, self.base_workspace_dir)
        self.current_theme = "light"
        self.init_menu_bar()
        self.init_main_layout()
        self.apply_theme("light")
        self.refresh_sidebar_tree()

    def get_current_playbook_dir(self) -> str:
        return self.current_playbook_dir

    def init_menu_bar(self):
        mb = self.menuBar()
        fm = mb.addMenu("&File")
        fm.addAction("&New Playbook", self.action_new_playbook, "Ctrl+N")
        fm.addAction("&Open Playbook Folder...", self.action_open_playbook, "Ctrl+O")
        fm.addAction("&Save Playbook", self.action_save_playbook, "Ctrl+S")
        fm.addSeparator()
        fm.addAction("&Export Playbook as .ZIP...", self.action_export_zip, "Ctrl+E")
        fm.addAction("&Import Playbook from .ZIP...", self.action_import_zip, "Ctrl+I")
        fm.addSeparator()
        fm.addAction("E&xit", self.close, "Ctrl+Q")

        em = mb.addMenu("&Edit")
        em.addAction("Switch to &Builder Mode", lambda: self.switch_mode("builder"), "F1")
        em.addAction("Switch to &Player Mode", lambda: self.switch_mode("player"), "F2")

        om = mb.addMenu("&Options")
        om.addAction("Toggle &Sidebar", self.toggle_sidebar, "Ctrl+B")
        om.addSeparator()
        om.addAction("Theme: Light (Pure Blue & White)", lambda: self.apply_theme("light"))
        om.addAction("Theme: Dark (Pure Black & White)", lambda: self.apply_theme("dark"))

        am = mb.addMenu("&About")
        am.addAction("&About Step-case", self.show_about_dialog)

    def init_main_layout(self):
        cw = QWidget()
        self.setCentralWidget(cw)
        ml = QHBoxLayout(cw)
        ml.setContentsMargins(0, 0, 0, 0)
        self.splitter = QSplitter(Qt.Orientation.Horizontal)
        self.sidebar_widget = QWidget()
        sl = QVBoxLayout(self.sidebar_widget)
        sl.setContentsMargins(10, 10, 10, 10)
        mbb = QHBoxLayout()
        self.btn_side_builder = QPushButton("Builder")
        self.btn_side_builder.clicked.connect(lambda: self.switch_mode("builder"))
        self.btn_side_player = QPushButton("Player")
        self.btn_side_player.clicked.connect(lambda: self.switch_mode("player"))
        mbb.addWidget(self.btn_side_builder)
        mbb.addWidget(self.btn_side_player)
        sl.addLayout(mbb)
        sl.addWidget(QLabel("Playbook Hierarchy"))
        self.tree_widget = QTreeWidget()
        self.tree_widget.setHeaderHidden(True)
        self.tree_widget.itemClicked.connect(self.on_tree_item_clicked)
        sl.addWidget(self.tree_widget, 1)
        self.sidebar_widget.setFixedWidth(270)
        self.splitter.addWidget(self.sidebar_widget)
        self.stack = QStackedWidget()
        self.builder_view = UIBuilder(self.playbook_data, self.get_current_playbook_dir)
        self.builder_view.playbook_updated.connect(self.on_playbook_data_updated)
        self.builder_view.switch_to_player_requested.connect(lambda: self.switch_mode("player"))
        self.player_view = UIPlayer(self.playbook_data, self.get_current_playbook_dir)
        self.player_view.back_to_builder_requested.connect(lambda: self.switch_mode("builder"))
        self.stack.addWidget(self.builder_view)
        self.stack.addWidget(self.player_view)
        self.splitter.addWidget(self.stack)
        self.splitter.setSizes([270, 910])
        ml.addWidget(self.splitter)
        self.status_bar = QStatusBar()
        self.setStatusBar(self.status_bar)

    def apply_theme(self, theme_name: str):
        self.current_theme = theme_name
        self.setStyleSheet(DARK_THEME_QSS if theme_name == "dark" else LIGHT_THEME_QSS)

    def toggle_sidebar(self):
        self.sidebar_widget.setVisible(not self.sidebar_widget.isVisible())

    def switch_mode(self, mode: str):
        if mode == "builder":
            self.stack.setCurrentIndex(0)
            self.builder_view.load_playbook_into_ui()
        else:
            self.player_view.set_playbook_data(self.playbook_data)
            self.stack.setCurrentIndex(1)
        self.refresh_sidebar_tree()

    def refresh_sidebar_tree(self):
        self.tree_widget.clear()
        root = QTreeWidgetItem([f"📖 {self.playbook_data.get('title', 'Playbook')}"])
        root.setExpanded(True)
        self.tree_widget.addTopLevelItem(root)
        scr_n = QTreeWidgetItem(["🔀 Decision Screens"])
        scr_n.setExpanded(True)
        root.addChild(scr_n)
        for scr in self.playbook_data.get("screens", []):
            it = QTreeWidgetItem([f"⬡ {scr.get('title')}"])
            it.setData(0, Qt.ItemDataRole.UserRole, {"type": "screen", "id": scr.get("id")})
            scr_n.addChild(it)
        seq_n = QTreeWidgetItem(["⛓ Sequences"])
        seq_n.setExpanded(True)
        root.addChild(seq_n)
        step_map = {s["id"]: s for s in self.playbook_data.get("steps", [])}
        for seq in self.playbook_data.get("sequences", []):
            sq_it = QTreeWidgetItem([f"↳ {seq.get('title')}"])
            sq_it.setData(0, Qt.ItemDataRole.UserRole, {"type": "sequence", "id": seq.get("id")})
            sq_it.setExpanded(True)
            for sid in seq.get("step_ids", []):
                st = step_map.get(sid, {})
                stit = QTreeWidgetItem([f"• {st.get('title', sid)}"])
                stit.setData(0, Qt.ItemDataRole.UserRole, {"type": "step", "sequence_id": seq.get("id"), "step_id": sid})
                sq_it.addChild(stit)
            seq_n.addChild(sq_it)

    def on_tree_item_clicked(self, item: QTreeWidgetItem, column: int):
        data = item.data(0, Qt.ItemDataRole.UserRole)
        if not data:
            return
        t = data.get("type")
        if self.stack.currentIndex() == 0:
            if t == "screen": self.builder_view.tabs.setCurrentIndex(1)
            elif t == "sequence": self.builder_view.tabs.setCurrentIndex(2)
            elif t == "step": self.builder_view.tabs.setCurrentIndex(3)
        else:
            if t == "screen": self.player_view.show_screen(data.get("id"))
            elif t == "sequence": self.player_view.start_sequence(data.get("id"))
            elif t == "step":
                seq_id = data.get("sequence_id")
                st_id = data.get("step_id")
                seq = next((s for s in self.playbook_data.get("sequences", []) if s.get("id") == seq_id), None)
                if seq and st_id in seq.get("step_ids", []):
                    idx = seq["step_ids"].index(st_id)
                    self.player_view.show_step(seq_id, idx)

    def on_playbook_data_updated(self, d: dict):
        self.playbook_data = d
        self.refresh_sidebar_tree()

    def action_new_playbook(self):
        self.playbook_data = PlaybookDataManager.get_default_playbook()
        self.playbook_data["title"] = "New Playbook"
        self.builder_view.load_playbook_into_ui()
        self.player_view.set_playbook_data(self.playbook_data)
        self.refresh_sidebar_tree()

    def action_open_playbook(self):
        f = QFileDialog.getExistingDirectory(self, "Open Playbook Folder", self.base_workspace_dir)
        if f:
            self.playbook_data = PlaybookDataManager.load_playbook(f)
            self.builder_view.load_playbook_into_ui()
            self.player_view.set_playbook_data(self.playbook_data)
            self.refresh_sidebar_tree()

    def action_save_playbook(self):
        PlaybookDataManager.save_playbook(self.playbook_data, self.base_workspace_dir)
        QMessageBox.information(self, "Saved", "Playbook saved to disk.")

    def action_export_zip(self):
        p, _ = QFileDialog.getSaveFileName(self, "Export ZIP", f"{self.playbook_data.get('name')}.zip", "Zip Archives (*.zip)")
        if p:
            d = PlaybookDataManager.save_playbook(self.playbook_data, self.base_workspace_dir)
            PlaybookDataManager.export_as_zip(d, p)
            QMessageBox.information(self, "Exported", f"Exported to {p}")

    def action_import_zip(self):
        p, _ = QFileDialog.getOpenFileName(self, "Import ZIP", "", "Zip Archives (*.zip)")
        if p:
            ex = os.path.join(self.base_workspace_dir, "imported")
            d = PlaybookDataManager.import_from_zip(p, ex)
            self.playbook_data = PlaybookDataManager.load_playbook(d)
            self.builder_view.load_playbook_into_ui()
            self.player_view.set_playbook_data(self.playbook_data)
            self.refresh_sidebar_tree()

    def show_about_dialog(self):
        QMessageBox.about(self, "About Step-case", "Step-case Playbook Engine\\nMade with Love by Alex Sakha")

def main():
    app = QApplication(sys.argv)
    splash = AXCSplashScreen()
    def on_splash_done():
        license_box = TkinterStyleLicenseBox()
        if license_box.exec() == QDialog.DialogCode.Accepted:
            win = StepCaseMainWindow()
            win.show()
            app._main_window = win
        else:
            sys.exit(0)
    splash.finished.connect(on_splash_done)
    splash.launch()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
`;

export const PYTHON_DATA_MANAGER_PY = `"""
Step-case: Data Manager Module
Handles JSON serialization, writing .md files, copying assets, and zip import/export.
"""

import json
import os
import shutil
import zipfile
from typing import Dict, Any, List, Optional

class PlaybookDataManager:
    @staticmethod
    def get_default_playbook() -> Dict[str, Any]:
        # See full schema in sample_playbooks/Installing_Python/config.json
        pass

    @classmethod
    def save_playbook(cls, playbook: Dict[str, Any], base_directory: str) -> str:
        folder_name = playbook.get("name", "Untitled_Playbook").strip().replace(" ", "_")
        playbook_dir = os.path.join(base_directory, folder_name)
        content_dir = os.path.join(playbook_dir, "content")
        assets_dir = os.path.join(playbook_dir, "assets")
        os.makedirs(content_dir, exist_ok=True)
        os.makedirs(assets_dir, exist_ok=True)

        config_data = {
            "version": playbook.get("version", "1.0"),
            "name": folder_name,
            "title": playbook.get("title", folder_name),
            "description": playbook.get("description", ""),
            "start_screen_id": playbook.get("start_screen_id", ""),
            "screens": playbook.get("screens", []),
            "sequences": playbook.get("sequences", []),
            "steps": []
        }

        for step in playbook.get("steps", []):
            step_id = step.get("id", "step_unknown")
            md_filename = f"{step_id}.md"
            md_rel_path = f"content/{md_filename}"
            md_abs_path = os.path.join(content_dir, md_filename)
            with open(md_abs_path, "w", encoding="utf-8") as f:
                f.write(step.get("content_text", ""))
            config_data["steps"].append({
                "id": step_id,
                "title": step.get("title", "Untitled Step"),
                "content_file": md_rel_path,
                "assets": step.get("assets", []),
                "checklist": step.get("checklist", []),
                "copy_fields": step.get("copy_fields", []),
                "disable_back": step.get("disable_back", False)
            })

        with open(os.path.join(playbook_dir, "config.json"), "w", encoding="utf-8") as f:
            json.dump(config_data, f, indent=2, ensure_ascii=False)
        return playbook_dir

    @classmethod
    def load_playbook(cls, playbook_dir: str) -> Dict[str, Any]:
        with open(os.path.join(playbook_dir, "config.json"), "r", encoding="utf-8") as f:
            playbook = json.load(f)
        for step in playbook.get("steps", []):
            rel = step.get("content_file", "")
            if rel and os.path.exists(os.path.join(playbook_dir, rel)):
                with open(os.path.join(playbook_dir, rel), "r", encoding="utf-8") as f:
                    step["content_text"] = f.read()
        return playbook

    @classmethod
    def copy_asset(cls, playbook_dir: str, source_path: str) -> str:
        assets_dir = os.path.join(playbook_dir, "assets")
        os.makedirs(assets_dir, exist_ok=True)
        fn = os.path.basename(source_path)
        shutil.copy2(source_path, os.path.join(assets_dir, fn))
        return fn

    @classmethod
    def export_as_zip(cls, playbook_dir: str, output_zip_path: str) -> str:
        name = os.path.basename(os.path.normpath(playbook_dir))
        with zipfile.ZipFile(output_zip_path, "w", zipfile.ZIP_DEFLATED) as z:
            for root, _, files in os.walk(playbook_dir):
                for f in files:
                    abs_p = os.path.join(root, f)
                    z.write(abs_p, os.path.join(name, os.path.relpath(abs_p, playbook_dir)))
        return output_zip_path

    @classmethod
    def import_from_zip(cls, zip_path: str, extract_base_dir: str) -> str:
        with zipfile.ZipFile(zip_path, "r") as z:
            z.extractall(extract_base_dir)
        for root, _, files in os.walk(extract_base_dir):
            if "config.json" in files:
                return root
        raise ValueError("Invalid playbook ZIP: config.json missing")
`;

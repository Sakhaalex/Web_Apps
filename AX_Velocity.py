import tkinter as tk
from tkinter import filedialog, messagebox, scrolledtext, ttk
import subprocess
import threading
import json
import os
import sys
import csv

APP_NAME = "Python Script Dashboard"
STORAGE_DIR = os.path.join(os.getenv("LOCALAPPDATA", os.path.expanduser("~")), APP_NAME)
CONFIG_FILE = os.path.join(STORAGE_DIR, "config.json")


class PythonRunnerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("AX Velocity")
        self.root.geometry("950x600")

        self.scripts_data = {}
        self.ensure_storage_exists()

        style = ttk.Style()
        style.configure("TButton", padding=5)

        # LEFT PANEL
        self.left_frame = tk.Frame(root, width=300, padx=10, pady=10)
        self.left_frame.pack(side=tk.LEFT, fill=tk.Y)

        tk.Label(self.left_frame, text="SEARCH SCRIPTS", font=("Arial", 9, "bold")).pack(anchor="w")

        self.search_var = tk.StringVar()
        self.search_var.trace("w", self.refresh_listbox)
        tk.Entry(self.left_frame, textvariable=self.search_var).pack(fill=tk.X, pady=5)

        self.script_listbox = tk.Listbox(self.left_frame, height=15)
        self.script_listbox.pack(fill=tk.BOTH, expand=True)
        self.script_listbox.bind("<<ListboxSelect>>", self.update_info)

        self.status_label = tk.Label(self.left_frame, text="Status: Idle", fg="gray")
        self.status_label.pack(pady=5)

        # RIGHT PANEL
        self.right_frame = tk.Frame(root, padx=10, pady=10)
        self.right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)

        self.info_label = tk.Label(self.right_frame, text="Select a script to view details",
                                   wraplength=400, justify="left")
        self.info_label.pack(anchor="w", pady=5)

        # BUTTON BAR
        btn_bar = tk.Frame(self.right_frame)
        btn_bar.pack(fill=tk.X, pady=5)

        tk.Button(btn_bar, text="ADD", command=self.add_script, width=8).pack(side=tk.LEFT, padx=2)
        tk.Button(btn_bar, text="DIR", command=self.set_cwd, width=8).pack(side=tk.LEFT, padx=2)
        tk.Button(btn_bar, text="REMOVE", command=self.remove_script, width=8).pack(side=tk.LEFT, padx=2)
        tk.Button(btn_bar, text="RUN", bg="#28a745", fg="white",
                  command=self.start_thread, width=10).pack(side=tk.RIGHT, padx=2)
        tk.Button(btn_bar, text="CLEAR LOGS", command=self.clear_logs, width=10).pack(side=tk.RIGHT, padx=2)

        # LOG AREA
        self.log_area = scrolledtext.ScrolledText(self.right_frame, bg="#1e1e1e",
                                                  fg="#dcdcdc", font=("Consolas", 10))
        self.log_area.pack(fill=tk.BOTH, expand=True)

        self.load_scripts()

    # ------------------------------------------------------

    def ensure_storage_exists(self):
        if not os.path.exists(STORAGE_DIR):
            os.makedirs(STORAGE_DIR)

    def add_script(self):
        path = filedialog.askopenfilename(filetypes=[("Python Files", "*.py")])
        if path:
            name = os.path.basename(path)
            self.scripts_data[name] = {"path": path, "cwd": os.path.dirname(path)}
            self.refresh_listbox()
            self.save_scripts()

    def set_cwd(self):
        idx = self.script_listbox.curselection()
        if idx:
            name = self.script_listbox.get(idx)
            new_dir = filedialog.askdirectory()
            if new_dir:
                self.scripts_data[name]["cwd"] = new_dir
                self.update_info()
                self.save_scripts()

    def remove_script(self):
        idx = self.script_listbox.curselection()
        if idx:
            name = self.script_listbox.get(idx)
            del self.scripts_data[name]
            self.refresh_listbox()
            self.save_scripts()

    def refresh_listbox(self, *args):
        search_term = self.search_var.get().lower()
        self.script_listbox.delete(0, tk.END)
        for name in sorted(self.scripts_data.keys()):
            if search_term in name.lower():
                self.script_listbox.insert(tk.END, name)

    def update_info(self, event=None):
        idx = self.script_listbox.curselection()
        if idx:
            name = self.script_listbox.get(idx)
            data = self.scripts_data[name]
            self.info_label.config(text=f"File: {data['path']}\nWorking Dir: {data['cwd']}")

    def save_scripts(self):
        try:
            with open(CONFIG_FILE, "w") as f:
                json.dump(self.scripts_data, f, indent=4)
        except Exception as e:
            messagebox.showerror("Save Error", f"Could not save config: {e}")

    def load_scripts(self):
        if os.path.exists(CONFIG_FILE):
            try:
                with open(CONFIG_FILE, "r") as f:
                    self.scripts_data = json.load(f)
                self.refresh_listbox()
            except:
                pass

    # ------------------------------------------------------

    def log(self, message):
        self.log_area.insert(tk.END, message + "\n")
        self.log_area.see(tk.END)

    def clear_logs(self):
        self.log_area.delete("1.0", tk.END)

    def start_thread(self):
        idx = self.script_listbox.curselection()
        if not idx:
            messagebox.showwarning("Select Script", "Please select a script first.")
            return

        name = self.script_listbox.get(idx)
        self.status_label.config(text=f"Status: Running ({name})", fg="green")

        thread = threading.Thread(target=self.run_script, args=(name,))
        thread.daemon = True
        thread.start()

    def run_script(self, name):
        data = self.scripts_data[name]
        self.log(f"\n--- EXECUTION STARTED: {name} ---")

        try:
            process = subprocess.Popen(
                [sys.executable, "-u", data["path"]],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                cwd=data["cwd"],
                bufsize=1
            )

            for line in iter(process.stdout.readline, ''):
                self.log(line.strip())

            process.stdout.close()
            exit_code = process.wait()
            self.log(f"--- FINISHED (Exit Code: {exit_code}) ---\n")

        except Exception as e:
            self.log(f"CRITICAL ERROR: {str(e)}")

        finally:
            self.status_label.config(text="Status: Idle", fg="gray")


if __name__ == "__main__":
    root = tk.Tk()
    app = PythonRunnerApp(root)
    root.mainloop()

**AX Velocity**
Python Script Execution Dashboard

Overview

AX Velocity is a desktop application built with Python (Tkinter).
It allows you to:

• Add Python scripts
• Store them permanently
• Set working directories
• Run scripts in background threads
• View real-time logs
• Manage multiple scripts from one dashboard

Requirements

• Python 3.8 or higher
• Windows / Linux / macOS
• No external libraries required

How to Run – Windows

Method 1: Double Click

Install Python from https://python.org

Ensure “Add Python to PATH” is checked.

Save the file as:

AX_Velocity.py

Double-click the file.

If .py does not open automatically:

Right-click → Open With → Python

Method 2: Command Line

Open Command Prompt.

Navigate to project folder:

cd path\to\AX_Velocity

Run:

python AX_Velocity.py

If needed:

python3 AX_Velocity.py

How to Run – Linux

Open Terminal.

Navigate to folder:

cd /path/to/AX_Velocity

Run:

python3 AX_Velocity.py

How to Run – macOS

Open Terminal.

Navigate to folder:

cd /path/to/AX_Velocity

Run:

python3 AX_Velocity.py

How It Works

• Scripts are stored in local configuration folder.
• Config location:

Windows:
C:\Users\YourName\AppData\Local\Python Script Dashboard\config.json

Linux/macOS:
~/Python Script Dashboard/config.json

• Output is streamed live into log panel.
• Each script runs in separate thread.

Folder Structure (Recommended)

AX_Velocity/
│
├── AX_Velocity.py
└── README.md

Features
• Persistent script storage
• Search functionality
• Working directory override
• Real-time stdout capture
• Background execution
• Exit code reporting
• Log clearing

Notes:
• Designed for local automation workflows.
• No internet required.
• No database required.
• Pure standard library implementation.

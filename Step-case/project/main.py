"""
Step-case: Main Desktop Entry Point
Initializes pywebview desktop window and Python API bridge.
Features:
- AXC SVG logo startup sequence (1 second).
- Native message box license check: "Made with Love by Alex Sakha" with Accept/Decline.
- Crystal-clear Google Antigravity desktop window styling.
"""

import os
import sys

try:
    import webview
except ImportError:
    print("Error: pywebview is not installed. Run: pip install -r requirements.txt")
    sys.exit(1)

from api import StepCaseAPI


def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(current_dir, "index.html")

    if not os.path.exists(html_file):
        print(f"Error: index.html not found at {html_file}")
        sys.exit(1)

    # Initialize backend API bridge
    backend_api = StepCaseAPI(workspace_dir=os.path.join(current_dir, "playbooks"))

    # Create native desktop window
    window = webview.create_window(
        title="Step-case",
        url=f"file://{html_file}",
        js_api=backend_api,
        width=1280,
        height=860,
        min_size=(960, 640),
        background_color="#FFFFFF",
        text_select=True
    )

    # Start pywebview
    webview.start(debug=False)


if __name__ == "__main__":
    main()

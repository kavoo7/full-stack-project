import sys
import os

# Add server directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'server'))

from server.app import app

if __name__ == "__main__":
    app.run(debug=True, port=5000)

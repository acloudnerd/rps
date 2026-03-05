# Rock Paper Scissors Game

A modern web-based Rock Paper Scissors game built with React (frontend) and Flask (backend).

## Project Structure

```
rps/
├── src/                    # React source files
│   ├── App.jsx            # Main game component
│   ├── main.jsx           # React entry point
│   └── index.css          # Styles (Tailwind CSS)
├── app.py                 # Flask backend server
├── rps_core.py            # Game logic
├── package.json           # Node.js dependencies
├── requirements.txt       # Python dependencies
├── vite.config.js         # Vite build configuration
└── index.html             # HTML entry point
```

## Prerequisites

- **Python 3.8+**
- **Node.js 14+** and npm

## Installation

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- Flask
- Flask-Cors

### 2. Install Node.js Dependencies

```bash
npm install
```

This installs:
- React
- Vite (build tool)
- Tailwind CSS v4
- Lucide React (icons)

## Running the App

### Development Mode

#### Step 1: Build the React App
```bash
npm run build
```

This compiles the React frontend and creates the `dist/` folder.

#### Step 2: Start the Flask Server
```bash
python app.py
```

The server will run on `http://localhost:5001`

#### Step 3: Open in Browser
Navigate to `http://localhost:5001` in your web browser to play the game!

### Commands Summary

| Command | Purpose |
|---------|---------|
| `npm run build` | Build React app for production |
| `npm run dev` | Run Vite dev server (optional) |
| `python app.py` | Start Flask backend server |

## How to Play

1. Open `http://localhost:5001` in your browser
2. Click on Rock, Paper, or Scissors
3. See the result and your updated score
4. Click "Reset Game" to start over

## Features

- 🎮 Clean, modern UI with Tailwind CSS
- 🎨 Gradient backgrounds and smooth animations
- 📊 Real-time score tracking
- ⚡ Instant game results
- 🔄 Easy reset button
- 📱 Responsive design

## API Endpoints

The Flask backend provides these endpoints:

- `GET /api/state` - Get current game state
- `POST /api/play` - Play a round (send `{"move": "rock|paper|scissors"}`)
- `POST /api/reset` - Reset the game

## Troubleshooting

### Port 5001 Already in Use
If Flask won't start because port 5001 is in use:

```bash
# Find the process using port 5001
lsof -i :5001

# Kill the process (replace PID with the actual process ID)
kill <PID>

# Then start Flask again
python app.py
```

### Styles Not Loading
If the UI looks basic:
1. Hard refresh your browser: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Make sure you ran `npm run build` before starting Flask
3. Check that Flask is serving from the `dist/` folder

### Game Logic Issues
Check the Flask console for error messages. The `rps_core.py` file handles game logic.

## Development Tips

To make changes to the React frontend:
1. Edit files in `src/`
2. Run `npm run build`
3. Flask will auto-reload (if debug mode is on)
4. Refresh your browser

## Deployment

To deploy to production:
1. Build the React app: `npm run build`
2. Use a production WSGI server (not Flask's dev server):
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5001 app:app
   ```

## License

MIT

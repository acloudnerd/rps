import os
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from rps_core import play_round

def create_app():
    app = Flask(__name__, static_folder='dist', static_url_path='', template_folder='dist')
    CORS(app)
    
    app.secret_key = os.environ.get("SECRET_KEY", "someSecret")
    
    # In-memory game state
    game_state = {
        "player_score": 0,
        "computer_score": 0,
        "draws": 0,
        "last_result": None
    }
    
    # Serve React app
    @app.route('/')
    @app.route('/<path:path>')
    def serve_app(path=''):
        return send_from_directory('dist', 'index.html')
    
    # API Routes
    @app.get("/api/state")
    def get_state():
        """Get current game state"""
        return jsonify(game_state)
    
    @app.post("/api/play")
    def play():
        """Play a round"""
        data = request.get_json()
        move = data.get("move", "").strip().lower()
        
        try:
            result = play_round(move)
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        
        # Update scores
        if result.outcome == "win":
            game_state["player_score"] += 1
        elif result.outcome == "lose":
            game_state["computer_score"] += 1
        else:
            game_state["draws"] += 1
        
        game_state["last_result"] = {
            "player_move": result.player_move,
            "computer_move": result.computer_move,
            "outcome": result.outcome
        }
        
        return jsonify(game_state)
    
    @app.post("/api/reset")
    def reset():
        """Reset game"""
        game_state["player_score"] = 0
        game_state["computer_score"] = 0
        game_state["draws"] = 0
        game_state["last_result"] = None
        return jsonify(game_state)
    
    return app

app = create_app()

if __name__ == "__main__":
    print("🎮 Flask server running on http://localhost:5001")
    print("📍 API endpoints:")
    print("   GET  /api/state  - Get game state")
    print("   POST /api/play   - Play a round")
    print("   POST /api/reset  - Reset game")
    app.run(debug=True, host='0.0.0.0', port=5001)  

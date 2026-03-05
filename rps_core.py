
import random
from dataclasses import dataclass

MOVES = ("rock", "paper", "scissors")

@dataclass
class RoundResult:
    player_move: str
    computer_move: str
    outcome: str

def decide_winner(player: str, computer: str) -> str:
    if player == computer:
        return "draw"
    
    win_against = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper",  # FIXED: was "scissor"
    }
    return "win" if win_against[player] == computer else "lose"

def play_round(player_move: str) -> RoundResult:
    player_move = player_move.lower().strip()
    
    if player_move not in MOVES:  # FIXED: MOVES is a tuple, not a function
        raise ValueError(f"Invalid move: {player_move}. Choose one of {MOVES}.")
    
    computer_move = random.choice(MOVES)
    outcome = decide_winner(player_move, computer_move)
    
    return RoundResult(player_move=player_move, computer_move=computer_move, outcome=outcome)

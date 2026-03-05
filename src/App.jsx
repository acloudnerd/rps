import React, { useState, useEffect } from 'react';
import { RotateCcw, Zap } from 'lucide-react';

const RockPaperScissors = () => {
  const [gameState, setGameState] = useState({
    player_score: 0,
    computer_score: 0,
    draws: 0,
    last_result: null
  });
  const [loading, setLoading] = useState(false);
  const [selectedMove, setSelectedMove] = useState(null);

  const API_URL = 'http://localhost:5001/api';

  const moves = [
    { name: 'rock', emoji: '🪨', color: 'from-gray-500 to-gray-700' },
    { name: 'paper', emoji: '📄', color: 'from-blue-500 to-blue-700' },
    { name: 'scissors', emoji: '✂️', color: 'from-red-500 to-red-700' }
  ];

  useEffect(() => {
    fetchState();
  }, []);

  const fetchState = async () => {
    try {
      const response = await fetch(`${API_URL}/state`);
      const data = await response.json();
      setGameState(data);
    } catch (error) {
      console.error('Error fetching state:', error);
    }
  };

  const playRound = async (move) => {
    setLoading(true);
    setSelectedMove(move);
    
    try {
      const response = await fetch(`${API_URL}/play`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ move })
      });
      
      if (!response.ok) throw new Error('Play request failed');
      const data = await response.json();
      setGameState(data);
      
      setTimeout(() => setSelectedMove(null), 1500);
    } catch (error) {
      console.error('Error playing round:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetGame = async () => {
    try {
      const response = await fetch(`${API_URL}/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setGameState(data);
      setSelectedMove(null);
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  const getOutcomeMessage = () => {
    if (!gameState.last_result) return null;
    
    const { outcome } = gameState.last_result;
    const messages = {
      win: { text: '🎉 You won!', color: 'text-green-600', bg: 'bg-green-50' },
      lose: { text: '😔 You lost!', color: 'text-red-600', bg: 'bg-red-50' },
      draw: { text: '🤝 Draw!', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    };
    return messages[outcome];
  };

  const outcome = getOutcomeMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">⚔️ RPS</h1>
          <p className="text-purple-200 text-sm tracking-widest">ROCK · PAPER · SCISSORS</p>
        </div>

        {/* Score Card */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white border-opacity-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-purple-200 text-xs font-semibold mb-2">YOU</p>
              <p className="text-4xl font-bold text-white">{gameState.player_score}</p>
            </div>
            <div>
              <p className="text-purple-200 text-xs font-semibold mb-2">DRAWS</p>
              <p className="text-4xl font-bold text-yellow-300">{gameState.draws}</p>
            </div>
            <div>
              <p className="text-purple-200 text-xs font-semibold mb-2">CPU</p>
              <p className="text-4xl font-bold text-red-300">{gameState.computer_score}</p>
            </div>
          </div>
        </div>

        {/* Last Result */}
        {gameState.last_result && (
          <div className={`rounded-xl p-4 mb-6 ${outcome.bg} border border-opacity-20 border-current`}>
            <p className={`${outcome.color} font-bold text-center mb-2`}>{outcome.text}</p>
            <div className="flex justify-around items-center text-2xl">
              <div className="text-center">
                <p className="text-4xl mb-1">{moves.find(m => m.name === gameState.last_result.player_move)?.emoji}</p>
                <p className="text-xs text-gray-600 capitalize">{gameState.last_result.player_move}</p>
              </div>
              <p className="text-gray-400">vs</p>
              <div className="text-center">
                <p className="text-4xl mb-1">{moves.find(m => m.name === gameState.last_result.computer_move)?.emoji}</p>
                <p className="text-xs text-gray-600 capitalize">{gameState.last_result.computer_move}</p>
              </div>
            </div>
          </div>
        )}

        {/* Move Selection */}
        <div className="mb-6">
          <p className="text-purple-200 text-xs font-semibold mb-4 text-center tracking-widest">PICK YOUR MOVE</p>
          <div className="grid grid-cols-3 gap-3">
            {moves.map(move => (
              <button
                key={move.name}
                onClick={() => playRound(move.name)}
                disabled={loading}
                className={`
                  relative overflow-hidden rounded-xl p-4 font-bold text-white transition-all duration-300
                  transform hover:scale-105 active:scale-95
                  ${
                    selectedMove === move.name
                      ? `bg-gradient-to-br ${move.color} ring-2 ring-white scale-110`
                      : `bg-gradient-to-br ${move.color} hover:shadow-lg hover:shadow-white/20 opacity-80 hover:opacity-100`
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <div className="text-3xl mb-2">{move.emoji}</div>
                <div className="text-xs capitalize font-semibold">{move.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetGame}
          disabled={loading}
          className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-bold py-3 rounded-xl transition-all duration-300 border border-white border-opacity-20 hover:border-opacity-40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw size={18} />
          Reset Game
        </button>

        {/* Loading Indicator */}
        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="animate-spin">
              <Zap className="text-yellow-400" size={24} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RockPaperScissors;
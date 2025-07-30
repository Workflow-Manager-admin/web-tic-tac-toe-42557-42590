import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main App component for the 2-player Tic Tac Toe game.
 * Features:
 * - 2-player gameplay (local)
 * - Visual board and player move display
 * - Winner and draw detection
 * - Game reset
 * - Responsive, minimal, modern design
 */
function App() {
  // Game state: Array(9) for board, "X" or "O" for moves
  const [board, setBoard] = useState(Array(9).fill(null));
  // Is X's turn? (true = X, false = O)
  const [isXNext, setIsXNext] = useState(true);
  // Game result: null, "X", "O", or "Draw"
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  // PUBLIC_INTERFACE
  // Handle clicking on a board cell
  function handleCellClick(idx) {
    if (board[idx] || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  // Reset game state
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  // Status display text
  let status;
  if (winner) status = `Winner: ${winner}`;
  else if (isDraw) status = "It's a draw!";
  else status = `Next move: ${isXNext ? 'X' : 'O'}`;

  // Render grid cells (with responsive style)
  const renderCell = idx => (
    <button
      key={idx}
      className="ttt-cell"
      onClick={() => handleCellClick(idx)}
      aria-label={`Board cell ${idx + 1}`}
      disabled={!!board[idx] || !!winner}
      style={{ color: board[idx] === 'X' ? 'var(--primary-color)' : board[idx] === 'O' ? 'var(--secondary-color)' : undefined }}
    >
      {board[idx] === 'X' ? (
        <span className="ttt-x">X</span>
      ) : board[idx] === 'O' ? (
        <span className="ttt-o">O</span>
      ) : ''}
    </button>
  );

  // Winner line highlight
  const winLine = winner ? calcWinLine(board) : null;

  return (
    <div className="ttt-root">
      <h1 className="ttt-title">Tic Tac Toe</h1>
      <div className="ttt-status" role="status">{status}</div>
      <div className="ttt-board-outer">
        <div className="ttt-board" role="grid">
          {Array(9).fill(0).map((_, idx) => {
            const isWinning = winLine && winLine.includes(idx);
            return (
              <div
                key={idx}
                className={`ttt-cell-wrap${isWinning ? ' ttt-win' : ''}`}
              >
                {renderCell(idx)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="ttt-controls">
        <button className="ttt-btn ttt-btn-accent" onClick={handleReset}>
          Reset Game
        </button>
      </div>
      <footer className="ttt-footer">
        <span>
          <span role="img" aria-label="copyright">©</span> 2024 Minimal React Tic Tac Toe
        </span>
      </footer>
    </div>
  );
}

// Winner calculation helper
function calculateWinner(board) {
  // All win lines for 3x3 board
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}

// Get winning line indices
function calcWinLine(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) return [a,b,c];
  }
  return null;
}

export default App;

import { useEffect, useState } from 'react';
import Square from './Square';
import { TURNS } from '../constants.js';
import { calculateWinner } from '../logic/board.js';
import ResultModal from './ResultModal';
import { resetGameStorage, saveGameToStorage } from '../logic/storage/index.js';
import NextPlayer from './NextPlayer.jsx';

const Board = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.x;
  });
  const [isWinner, setIsWinner] = useState(null);
  const [tempWinningSquares, setWinningSquares] = useState(null);

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setIsWinner(null);
    resetGameStorage();
  };
  // After winning forbids rerenders
  // to make the winning row.
useEffect(() => {
  updateBoard()
  },[isWinner])

  const updateBoard = (index) => {
    // if element not null return.
    if (board[index] || isWinner) return;

    // update board
    const newBoard = [...board];
    newBoard[index] = turn;
    // check winner
    const tempWinningSquares = calculateWinner(newBoard);
    setWinningSquares(tempWinningSquares);

    setBoard(newBoard);
    // Save the board and the turn to localStorage
    saveGameToStorage({ board: newBoard, turn: turn });

    // Cambia el turno y el token
    const newTurn = TURNS.x === turn ? TURNS.o : TURNS.x;
    setTurn(() => newTurn);

    // check tie game
    const isTie = newBoard.every((item) => item !== null);
    // change turn  if no winner

    if (tempWinningSquares!==null) {
      setIsWinner(() => true);
      setTurn(turn);
    saveGameToStorage({ board: newBoard, turn: turn, isWinner: isWinner });
    } else if (isTie) {
      setIsWinner(false);
    }
  };

  return (
    <main>
      <div className="board">
        {board.map((mark, index) => {
          return (
            <Square
              key={index}
              id={index}
              updateBoard={() => updateBoard(index)}
              winningSquares={tempWinningSquares}
              isWinner={isWinner}
            >
              {mark}
            </Square>
          );
        })}
      </div>
      <footer>
        <NextPlayer TURNS={TURNS} currentTurn={turn} />
      </footer>
      <article
        className={
          isWinner !== null ? 'modal-container show-modal' : 'modal-container'
        }
      >
        <div className="modal-content">
          <ResultModal
            resetBoard={resetBoard}
            turn={turn}
            isWinner={isWinner}
          />
        </div>
      </article>
    </main>
  );
};

export default Board;

import Square from './Square';
import ResultModal from './ResultModal';
import NextPlayer from './NextPlayer.jsx';
import { TURNS } from '../constants.js';
import { useEffect, useState } from 'react';
import { calculateWinner } from '../logic/board.js';
import { resetGameStorage, saveGameToStorage } from '../logic/storage/index.js';
import Title from './Title.jsx';

const Board = () => {
  // Initialize board state
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });
  // Initialize turn state
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.x;
  });
  // Initialize isWinner state
  const [isWinner, setIsWinner] = useState(null);
  // Initialize tempWinningSquares state
  const [winningSquares, setWinningSquares] = useState(null);

  // resetBoard;
  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setIsWinner(null);
    resetGameStorage();
  };

  // After winning forbids rerenders
  // to make the winning row.
  useEffect(() => {
    updateBoard();
  }, [isWinner]);

  const updateBoard = (index) => {
    // if element not null return.
    if (board[index] || isWinner) return;

    // update board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // check winner
    const tempWinningSquares = calculateWinner(newBoard);
    setWinningSquares(tempWinningSquares);

    // Save the board and the turn to localStorage
    saveGameToStorage({ board: newBoard, turn: turn });

    // Cambia el turno y el token
    const newTurn = TURNS.x === turn ? TURNS.o : TURNS.x;
    setTurn(() => newTurn);

    // check tie game
    const isTie = newBoard.every((item) => item !== null);

    if (tempWinningSquares !== null) {
      setIsWinner(() => true);
      setTurn(turn);
      saveGameToStorage({ board: newBoard, turn: turn, isWinner: isWinner });
    } else if (isTie) {
      setIsWinner(false);
    }
  };

  return (
    <main>
      <Title resetBoard={resetBoard}/>
      <div className="board">
        {board.map((mark, index) => {
          return (
            <Square
              key={index}
              id={index}
              updateBoard={() => updateBoard(index)}
              winningSquares={winningSquares}
              isWinner={isWinner}
            >
              {mark}
            </Square>
          );
        })}
      </div>
      <NextPlayer TURNS={TURNS} currentTurn={turn} />
      <ResultModal resetBoard={resetBoard} turn={turn} isWinner={isWinner} />
    </main>
  );
};

export default Board;

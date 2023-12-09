import { winningLines } from "../constants";

export function calculateWinner(board) {
  for (const lines of winningLines) {
    const [a, b, c] = lines;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }
  return null;
}


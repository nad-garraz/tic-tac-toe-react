export const saveGameToStorage = ({
  board,
  turn,
  isWinner,
  tempWinningSquares,
}) => {
  // store locally newBoard
  window.localStorage.setItem('board', JSON.stringify(board));
  // store locally newTurn
  window.localStorage.setItem('turn', turn);
  // store locally isWinner
  window.localStorage.setItem('isWinner', isWinner);
  // store locally winningSquares
  window.localStorage.setItem('tempWinningSquares', tempWinningSquares);
};

export const resetGameStorage = () => {
  // window.localStorage.removeItem('board');
  // window.localStorage.removeItem('turn');
  // window.localStorage.removeItem('isWinner');
  // window.localStorage.removeItem('tempWinningSquares');
  window.localStorage.clear();
};

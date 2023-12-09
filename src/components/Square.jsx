const Square = ({ id, updateBoard, children, winningSquares }) => {
  const handleTurn = (id) => {
    updateBoard(id);
  };
  return (
    <div>
      <button className="square" onClick={() => handleTurn(id)}>
        <span
          className={winningSquares &&  winningSquares.includes(id) ? 'token token-win' : 'token' }
        >
          {children}
        </span>
      </button>
    </div>
  );
};

export default Square;

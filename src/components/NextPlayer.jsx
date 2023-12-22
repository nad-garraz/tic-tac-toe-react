const NextPlayer = ({TURNS, currentTurn}) => {
  return (
      <footer>
      <div className="currentPlayer-container">
        <p> Next Player:  </p>
        <div className={TURNS.x === currentTurn ? 'currentPlayer' : 'nextPlayer'}> {TURNS.x} </div>
        <div className={TURNS.o === currentTurn ? 'currentPlayer' : 'nextPlayer'}> {TURNS.o} </div>
        </div>
      </footer>
  )
}

export default NextPlayer

import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

const ResultModal = ({ resetBoard, isWinner, turn }) => {
  if (isWinner === null) return null; // avoid unneccesary renderization

  const congrats = () => {
    jsConfetti.addConfetti();
    return 'El ganador es:';
  };

  const tieGame = 'El juego fue un empate';

  return (
    <section className="resultado">
      {isWinner ? congrats() : tieGame}
      {isWinner && <div className="token-winner">{turn}</div>}
      <button onClick={resetBoard}> Restart Board </button>
    </section>
  );
};

export default ResultModal;

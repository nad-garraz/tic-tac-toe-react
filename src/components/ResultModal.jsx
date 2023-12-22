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
    <article
      className={
        isWinner !== null ? 'modal-container show-modal' : 'modal-container'
      }
    >
      <div className="modal-content">
        <section className="resultado">
          {isWinner ? congrats() : tieGame}
          {isWinner && <div className="token-winner">{turn}</div>}
          <button onClick={resetBoard}> Restart Board </button>
        </section>
      </div>
    </article>
  );
};

export default ResultModal;

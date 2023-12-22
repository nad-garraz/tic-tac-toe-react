const Title = ({resetBoard}) => {
  return (
    <div className="title-container">
      <h1> TIC-TAC-TOE </h1>
      <button className="restart-btn" onClick={resetBoard}> restart board </button>
    </div>
  );
};

export default Title;

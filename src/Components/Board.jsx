import Square from "./Square";

const Board = ({ xIsNext, squares, onPlay }) => {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo.winner;
  const isBoardFull = (squares) => squares.every((square) => square !== null);

  const onSquareClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice(); //hacemos una copia del array
    nextSquares[i] = xIsNext ? "X" : "O";
   onPlay(nextSquares);
  };

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isBoardFull(squares)) {
    status = "Draw! No Winner";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">
        <h1>juego de tres en raya</h1>
        {status}      
      </div>
      {Array(3)
        .fill(null)
        .map((_, row) => (
          <section className="board-row" key={row}>
            {Array(3)
              .fill(null)
              .map((_, col) => {
                const index = row * 3 + col;
                return (
                  <Square
                    key={index}
                    value={squares[index]}
                    onSquareClick={() => onSquareClick(index)}
                    highlight={winnerInfo.line.includes(index)}
                  />
                );
              })}
          </section>
        ))}
    </>
  );
};

export default Board;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
}

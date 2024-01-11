import { useState } from "react";

/* eslint-disable react/prop-types */
function Suqaure({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg"
    >
      {value}
    </button>
  );
}

const Board = ({ xIsNext, square, onPlay }) => {
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ` + (xIsNext ? "X" : "O");
  }
  function handleClick(i) {
    if (square[i] || calculateWinner(square)) {
      return;
    }
    const nextSquare = square.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    onPlay(nextSquare);
  }

  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Suqaure value={square[0]} onSquareClick={() => handleClick(0)} />
        <Suqaure value={square[1]} onSquareClick={() => handleClick(1)} />
        <Suqaure value={square[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="flex">
        <Suqaure value={square[3]} onSquareClick={() => handleClick(3)} />
        <Suqaure value={square[4]} onSquareClick={() => handleClick(4)} />
        <Suqaure value={square[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="flex">
        <Suqaure value={square[6]} onSquareClick={() => handleClick(6)} />
        <Suqaure value={square[7]} onSquareClick={() => handleClick(7)} />
        <Suqaure value={square[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquare) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the Game`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mt-10">Game: Tic Tac Toe</h1>
      <div className="flex flex-wrap justify-center items-center gap-10 mt-20">
        <div>
          <Board
            xIsNext={xIsNext}
            square={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="border-2 border-gray-400 p-2">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
};

export default Game;

function calculateWinner(square) {
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
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}

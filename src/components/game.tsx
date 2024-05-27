import { useState } from "react";
import "../App.css";

interface SquareProps {
  children?: any;
  updateBoard?: any;
  index?: number;
  key?: number;
  isSelected?: boolean;
}

const TURNS = {
  X: "x",
  O: "o",
};

const Square: React.FC<SquareProps> = ({
  children,
  isSelected,
  updateBoard,
  index,
}) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState<boolean | null>(null);
  // null = not winner, false = draw

  const checkWinner = (boardToCheck: any) => {
    for (const combo of WINNER_COMBOS) {
      //Check all the winner combinations
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && // x or o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const checkEndGame = (newBoard: any) => {
    return newBoard.every((index: number) => index !== null);
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };
  const updateBoard = (index: number) => {
    if (board[index] || winner) return;
    // Don't update the position if it is something
    // Or a winner
    // Update the board
    const newBoard = [...board];
    //Spread and rest operator
    newBoard[index] = turn; // X or O
    setBoard(newBoard);
    // Change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //To update the state we call 'setTurn' and pass the new value
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      //Check if game is over
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //DRAW
    }
  };

  return (
    <>
      <main className="board">
        <button onClick={resetGame}>Reset Game</button>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        {winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winner == false ? "DRAW" : "WON: "}</h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>New Round</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

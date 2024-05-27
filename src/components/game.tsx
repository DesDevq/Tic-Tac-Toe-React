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
  const [winner, setWinner] = useState(null);
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
    }
  };

  return (
    <>
      <main className="board">
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
      </main>
    </>
  );
};

import { useState } from "react";
import "./App.css";

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
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index: number) => {
    if (board[index]) return;
    // Don't update the position if it is something
    const newBoard = [...board];
    //Spread and rest operator
    newBoard[index] = turn; // X or O
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //To update the state we call 'setTurn' and pass the new value
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
}

export default App;

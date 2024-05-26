import { useState } from "react";
import "./App.css";

interface SquareProps {
  children?: any;
  updateBoard?: any;
  index?: number;
  key?: number;
  isSelected: boolean;
}

const TURNS = {
  X: "x",
  O: "o",
};

const Square: React.FC<SquareProps> = ({ children, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  return <div className={className}>{children}</div>;
};
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  return (
    <>
      <main className="board">
        <section className="game">
          {board.map((_, index) => {
            return <Square key={index} index={index}></Square>;
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

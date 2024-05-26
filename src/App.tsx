import "./App.css";

interface SquareProps {
  children?: any;
  updateBoard?: any;
  index: number;
  key: number;
}

const board = Array(9).fill(null);

const Square: React.FC<SquareProps> = ({ children }) => {
  return <div className="square">{children}</div>;
};
function App() {
  return (
    <>
      <main className="board">
        <section className="game">
          {board.map((_, index) => {
            return <Square key={index} index={index}></Square>;
          })}
        </section>
      </main>
    </>
  );
}

export default App;

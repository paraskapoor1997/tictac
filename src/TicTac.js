import React, { useState } from "react";
import "./TicTac.css";
const TicTac = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[1]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("already clicked");
      return;
    }
    if (winner) {
      return;
    }
    let squares = [...cells];
    if (turn === "x") {
      squares[num] = "x";
      setTurn("o");
    } else {
      squares[num] = "o";
      setTurn("x");
    }
    checkForWinner(squares);
    setCells(squares);
  };

  const handleReset = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <>
      <div className="turn">Turn: {turn.toUpperCase()}</div>
      <div className="table-container">
        <table>
          <tbody>
            <tr className="row1">
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr className="row2">
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr className="row3">
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
      </div>
      {winner && (
        <div className="winner-container">
          <div>{winner.toUpperCase()} is the winner</div>
          <div>
            <button onClick={handleReset}>Play Again</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TicTac;

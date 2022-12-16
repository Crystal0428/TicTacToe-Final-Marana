import React, { useState } from "react";
import "./styles.css";
import Header from "./Header";
import Board from "./Board";
import Button from "./Button";
import Score from "./Score";

function App(props) {
  const [resultColor, setResultColor] = useState("");
  const [sign, signChange] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [result, setResult] = useState("");
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const clickHandler = (i) => {
    if (sign[i] == "x" || sign[i] == "o") return;

    if (result.length) return;
    sign[i] = isX ? "x" : "o";
    signChange(sign);
    setIsX(!isX);

    checkWinner(0, 1, 2);
    checkWinner(3, 4, 5);
    checkWinner(6, 7, 8);
    checkWinner(0, 3, 6);
    checkWinner(1, 4, 7);
    checkWinner(2, 5, 8);
    checkWinner(0, 4, 8);
    checkWinner(6, 4, 2);
    // draw condition
    draw();
  };

  const checkWinner = (x, y, z) => {
    let playerX = "x".repeat(3);
    let playerO = "o".repeat(3);

    let fieldValues = sign[x] + sign[y] + sign[z];

    if (fieldValues == playerX) {
      setResult("Player X wins!");
      setResultColor("white");
      setScoreX(scoreX + 1);
    } else if (fieldValues == playerO) {
      setResult("Player O wins!");
      setResultColor("white");
      setScoreO(scoreO + 1);
    }
  };

  const draw = (_) => {
    let allContent = sign.every((e) => e);
    if (allContent && result.length == 0) {
      setResult("The game is tied!");
      setResultColor("red");
    }
  };

  const restartGameHandler = (_) => {
    setResult("");
    signChange(Array(9).fill(null));
  };
  return (
    <div className="game">
      <Header />

      <div className="heading">
        <h1 className="gametitle">TikTakToe</h1>
      </div>
      <Score pointX={scoreX} pointO={scoreO} />
      <Board>
        <Button value={sign[0]} onClick={() => clickHandler(0)} />
        <Button value={sign[1]} onClick={() => clickHandler(1)} />
        <Button value={sign[2]} onClick={() => clickHandler(2)} />
        <Button value={sign[3]} onClick={() => clickHandler(3)} />
        <Button value={sign[4]} onClick={() => clickHandler(4)} />
        <Button value={sign[5]} onClick={() => clickHandler(5)} />
        <Button value={sign[6]} onClick={() => clickHandler(6)} />
        <Button value={sign[7]} onClick={() => clickHandler(7)} />
        <Button value={sign[8]} onClick={() => clickHandler(8)} />
      </Board>
      <div id="resultDiv">
        <h2 style={{ color: "white" }}>Result: &nbsp;</h2>
        <h2 className="winner" style={{ color: resultColor }}>
          {result}
        </h2>
      </div>
      <button id="restartGame" onClick={restartGameHandler}>
        Restart game
      </button>
    </div>
  );
}

export default App;

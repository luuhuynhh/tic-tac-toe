import './App.css';
import { Board } from "./components/Board"
import React, { useState } from "react"
import { ScoreBoard } from './components/ScoreBoard';
import { ResetButton } from './components/ResetButton';
import { useToggle } from './hook/customeHook';

function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  const [board, setBoard] = useState(Array(9).fill(null));
  // const [xPlaying, setXPlaying] = useState(true);
  const [xPlaying, toggleXPlaying] = useToggle(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const handleBoxClick = (boxId) => {
    const updateBoard = board.map((value, index) => {
      if (index === boxId) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    })

    const winner = checkWinner(updateBoard);
    if (winner === "X") {
      let { xScore } = scores;
      xScore++;
      setScores(
        { ...scores, xScore }
      )
    } else if (winner === "O") {
      let { oScore } = scores;
      oScore++;
      setScores({ ...scores, oScore });
    }
    // console.log(scores);
    setBoard(updateBoard);
    // setXPlaying(pre => !pre);
    toggleXPlaying();
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
    return null;
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;

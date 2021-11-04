import './App.css';
import {useEffect, useState} from 'react'
import Square from "./Components/Square"
import {Patterns} from "./Patterns"
function App() {


  // State declerations for board, player, and result
  const [board, setBoard] = useState(["","", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" })


  // useEffect will execute the function we give it on the first render and every time the board state is updated.
  useEffect(() => {

    checkIfTie();
    checkVictory();
    
    // Switches player
    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  // useEffect will execute every time the result state is updated.
  useEffect(() => {
    if (result.state != "none") {
      alert(`Game Finished! Winning Player : ${result.winner}`)
      restartGame();
    }
    
  }, [result])


  // Function to change the value of the square to whatever the player's value is (i.e "X","O")
  const chooseSquare = (square) => {
    setBoard(board.map((val, i) => {
      if (i == square && val == "") {
        return player;
      } else {
        return val;
      }
    }))
  }


  // Logic to check for a win by comparing the board with the patterns specified in Patterns.js
  const checkVictory = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      let winningPatternFlag = true;
      if (firstPlayer == "") return;
      currPattern.forEach((i) => {
        if (board[i] != firstPlayer) {
          winningPatternFlag = false;
        }
      })

      if (winningPatternFlag) {
        setResult({winner: player, state: "won"})
      }
    });
  };


  // Logic to check if there is a tie (every square has been filled and a winning combination was not found)
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    })

    if (filled) {
      setResult({winner: "Nobody", state: "Tie"})
    }
  }


  // Simple function reset board and player back to their initial values.
  const restartGame = () => {
    setBoard(["","", "", "", "", "", "", "", ""]);
    setPlayer("O");
  }
  return ( 
  <div className="App">
    <div className="board"> 
      <div className="row">
        <Square val={board[0]} chooseSquare={()=> {chooseSquare(0)}}/>
        <Square val={board[1]} chooseSquare={()=> {chooseSquare(1)}}/>
        <Square val={board[2]} chooseSquare={()=> {chooseSquare(2)}}/>
      </div>
      <div className="row">
        <Square val={board[3]} chooseSquare={()=> {chooseSquare(3)}}/>
        <Square val={board[4]} chooseSquare={()=> {chooseSquare(4)}}/>
        <Square val={board[5]} chooseSquare={()=> {chooseSquare(5)}}/>
      </div>
      <div className="row">
        <Square val={board[6]} chooseSquare={()=> {chooseSquare(6)}}/>
        <Square val={board[7]} chooseSquare={()=> {chooseSquare(7)}}/>
        <Square val={board[8]} chooseSquare={()=> {chooseSquare(8)}}/>
      </div>
    </div>
  </div>
  )
}

export default App;


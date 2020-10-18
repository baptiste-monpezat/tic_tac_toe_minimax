import React, { useState } from "react";
import ReactDom from "react-dom";
import "./index.css";


function Square({value,onClick}){

  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Restart({onClick}){

  return (
    <button className="restart" onClick={onClick}>
      Play Again ! 
    </button>
  );
}

function Board({column_numbers}){

  const [squares,setsquares] = useState(Array(9).fill(null))
  const [isNext,setIsNext] = useState(true);
  const winner = calculateWinner(squares);
  const nextSymbol = isNext ? "X" : "O";


  if (nextSymbol==="O" && winner == null){
    const nextSquares = squares.slice()
    let index = bestMove(nextSquares) 
    squares[index] = nextSymbol
    setsquares(squares)
    setIsNext(!isNext)

  }

  function getStatus(){
    if (winner){
      return "Winner: " + winner;
    }
    else if(isBoardFull(squares)){
      return "Draw"
    }

  }

  function renderSquare(i){

    return <Square value={squares[i]} onClick={()=>{
        //const nextSquares = squares.slice();
        if (squares[i] == null && winner == null){
          squares[i]= nextSymbol;
          setsquares(squares)
          setIsNext(!isNext)
        }

      }}
    />
   
  };

  function renderRestartButton(){

    return <Restart onClick={()=>{

        setsquares(Array(9).fill(null));
        setIsNext(true);

      }
    }
    />
  }
  

  const columns = row_numbers.map((column_index) =>
      <div key={column_index.toString()} className="board-row">
        {renderSquare(column_index)}
        {renderSquare(column_index+1)}
        {renderSquare(column_index+2)}
      </div>
  );


  return(

    <div className="container">
      <div className="game">
        <div className="game-board">
          {columns}
        </div>
        <div className="game-info">{getStatus()}</div>
        <div className="restart-button">{renderRestartButton()}</div>

      </div>
    </div>

  );

}

function calculateWinner(squares){

  const possibleLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]


  for(let i=0;i<possibleLines.length;i++){
    const [a,b,c] = possibleLines[i];

    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a];
    }

  }
  return null;
}


function isBoardFull(squares){

  for(let i=0;i<squares.length;i++){
    if(squares[i]==null){
      return false;
    }
  }
  return true;
}


function bestMove(squares){
  let bestScore = -Infinity;
  let move;

  for(let i=0;i<squares.length;i++){
    if(squares[i]==null){
      squares[i]="O"

      let score = minimax(squares,0,-Infinity,Infinity,false);
      squares[i] = null;
      
      if(score>bestScore){
        bestScore = score
        move = i
      }
    }
  }
  return move

}


function minimax(squares,depth,alpha,beta,isMaximizer){

  let scores = {
    "X":-1,
    "O":1
  }

  let result = calculateWinner(squares);
  if(result!=null){
    return scores[result];
  }
  else if(isBoardFull(squares)){
    return 0
  }

  if(isMaximizer){
    let bestScore= -Infinity
    for(let i=0;i<squares.length;i++){
      if(squares[i]==null){
        squares[i]="O";
        let score = minimax(squares,depth+1,alpha,beta,false);
        squares[i]=null;
        bestScore = Math.max(score,bestScore);
        alpha = Math.max(alpha,score);
        if(beta<alpha){
          break;
        }
      }
    }
  return bestScore
  }
  else{
    let bestScore= Infinity
    for(let i=0;i<squares.length;i++){
      if(squares[i]==null){
        squares[i]="X";
        let score = minimax(squares,depth+1,alpha,beta,true)
        squares[i]=null;
        bestScore = Math.min(score,bestScore);
        beta = Math.min(beta,score);
        if(beta<alpha){
          break;
        }
      }
    }
  return bestScore
  }

}



const row_numbers = [0,3,6];
ReactDom.render(<Board row_numbers={row_numbers}/>,document.getElementById("root"));
import React, { useState } from "react";
import ReactDom from "react-dom";
import "./index.css";
import {bestMove,isBoardFull,calculateWinner} from "./minimax/minimax.js"


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

function Level({value,selected,onClick}){
  return (
  <button className={value===selected ? 'level selected':'level'}  onClick={onClick}>
    {value}
  </button>
  );
}

function Board({column_numbers}){

  const [squares,setsquares] = useState(Array(9).fill(null))
  const [isNext,setIsNext] = useState(true);
  const [level,setLevel] = useState("easy");
  const winner = calculateWinner(squares);
  const nextSymbol = isNext ? "X" : "O";


  if (nextSymbol==="O" && winner == null){
    const nextSquares = squares.slice()
    let index = bestMove(nextSquares,level) 
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

  function renderLevelButton(key,value,level){

    return <Level key={key} value={value} selected={level} onClick={()=>{
        setLevel(value);
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

  const levels = ["easy","medium","hard"].map((column_index) => 
    renderLevelButton(column_index,column_index,level)
  );


  return(

    <div className="container">

      <div className="game">
        <div className="game-board">
          {columns}
        </div>
        <div className="game-info">{getStatus()}</div>
        <div className="levels-button">{levels}</div>
        <div className="restart-button">{renderRestartButton()}</div>

      </div>


    </div>

  );

}




const row_numbers = [0,3,6];
ReactDom.render(<Board row_numbers={row_numbers}/>,document.getElementById("root"));
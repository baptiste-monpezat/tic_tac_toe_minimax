export function calculateWinner(squares){

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
    
    
export function isBoardFull(squares){

for(let i=0;i<squares.length;i++){
    if(squares[i]==null){
    return false;
    }
}
return true;
}
      

export function minimax(squares,depth,level,alpha,beta,isMaximizer){

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
                let score = minimax(squares,depth+1,level,alpha,beta,false);
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
        let score = minimax(squares,depth+1,level,alpha,beta,true)
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

export function bestMove(squares,level){
    let bestScore = -Infinity;
    let move;
    var availableMove = [];
    var randomMoveChoice = [true,false,false,false,true,false];

    let randomMove = randomMoveChoice[randomMoveChoice.length*Math.random()<<0]



    if(level==="easy" ||(level==="medium" && randomMove)){

        for(let i=0;i<squares.length;i++){
            if(squares[i]==null){
                availableMove.push(i);
                
            }
        }
        console.log("coucou");

        return availableMove[availableMove.length*Math.random()<<0]


    }
    else{
        for(let i=0;i<squares.length;i++){
            if(squares[i]==null){
            squares[i]="O"
            let score = minimax(squares,0,level,-Infinity,Infinity,false);
            squares[i] = null;
    
            if(score>bestScore){
                bestScore = score
                move = i
            }
                }
        }

    }


    return move

    }


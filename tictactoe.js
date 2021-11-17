const gameBoard = (() => { //module
    let board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    const generateBoard = () => {
        const boardContainer = document.querySelector('.boardContainer');
        for (let i = 0; i < (board.length); i++){
            let div = document.createElement('div');
            div.setAttribute('class', 'gridDiv')
            div.innerHTML = board[i];
            boardContainer.appendChild(div);
        }
    }
    const updateBoard = (index, player) => {
        board[index] = player
        return board;
    }

    const resetBoard = () => { //makes all the array spaces blank again
        board = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
        let div = document.querySelectorAll('.gridDiv');
        div.forEach((element) => {
            element.innerText = ' ';
        });
        return board;
    }

    const returnBoard = () => {
        return board;
    }

    return {
        board,
        generateBoard,
        updateBoard,
        resetBoard,
        returnBoard
    };
})();


const gameController = (() => { //module
    let activePlayer = 'X';
    let gameOver = false;
    let winnerDisplay = document.querySelector('.winnerDisplay');
    const markSpace = () => {
        let div = document.querySelectorAll('.gridDiv');
        div.forEach((element,index) => {
            element.setAttribute('data-index', index)
            element.addEventListener('click', function(e)  {
                if (element.innerText === '') {
                    if (activePlayer === 'X' && gameOver === false){
                       setActivePlayer('O');
                        element.innerText = 'X'
                        gameBoard.updateBoard(index, 'X')
                    } else if (activePlayer === 'O' && gameOver === false){
                        setActivePlayer('X');
                        element.innerText = 'O'
                        gameBoard.updateBoard(index, 'O')
                    }
                    if (checkWin('X')){
                        console.log('X wins!');
                        winnerDisplay.innerText = 'Player X Wins!'
                        gameOver = true;
                    }
                    else if (checkWin('O')){
                        console.log('O wins!');
                        winnerDisplay.innerText = 'Player O wins!'
                        gameOver = true;
                    }
                    else if(checkTie()){
                        console.log('Tie game!');
                        winnerDisplay.innerText = 'Tie game!'
                        gameOver = true;
                    }
                    
                }
            });
        })
    }


    const checkTie = () => {
       const blankSpace = (element) => element === ' '; 
       return (!gameBoard.returnBoard().some(blankSpace)) // returns true if there are no blank spaces
    } 
    const  checkWin = (player) => {
        // player = 'X' or 'O'
      
        const horizontal = [0,3,6].map(i=>{return[i,i+1,i+2]});
        const vertical = [0,1,2].map(i=>{return[i,i+3,i+6]});
        const diagonal = [[0,4,8],[2,4,6]];
      
        var allwins = [].concat(horizontal).concat(vertical).concat(diagonal);
        let res = allwins.some(indices => { 
            return gameBoard.returnBoard()[indices[0]] == player && 
                   gameBoard.returnBoard()[indices[1]] == player && 
                   gameBoard.returnBoard()[indices[2]] == player})
        if (res)           
        return res;
      }

      
    const resetGame = () => {
        gameBoard.resetBoard();
        gameOver = false;
        setActivePlayer('X');
    }

    const btn = document.querySelector('#btn');
    btn.addEventListener('click', resetGame);

    const setActivePlayer = (player) => { //player is "x" or "o"
        activePlayer = player; 
        winnerDisplay.innerText = `Player ${player}'s turn`
        // winnerDisplay.innerText = 'Player '+player+' has won!'
    }
        
    return {
        markSpace,
        checkWin,
        gameOver,
        resetGame,
        setActivePlayer,
    };
})();

const Player = (name) => { //factory function
    const sayName = () => console.log(`I am player ${name}`)
    return {sayName}
}

gameBoard.generateBoard();
gameController.markSpace();
gameController.setActivePlayer('X')
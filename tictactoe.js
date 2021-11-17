let clickedFlag = false;

const gameBoard = (() => { //module
    const board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
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
        console.log(board)
    }

    return {
        board,
        generateBoard,
        updateBoard,
    };
})();


const gameController = (() => { //module
    const markSpace = () => {
        let div = document.querySelectorAll('.gridDiv');
        div.forEach((element,index) => {
            element.setAttribute('data-index', index)
            element.addEventListener('click', function(e)  {
                if (element.innerText === '') {
                    if (clickedFlag === false){
                        clickedFlag = true;
                        element.innerText = 'X'
                        gameBoard.updateBoard(index, 'X')
                    } else {
                        clickedFlag = false;
                        element.innerText = 'O'
                        gameBoard.updateBoard(index, 'O')
                    }
                    if (checkWin('X')){
                        console.log('X wins!');
                    }
                    else if (checkWin('O')){
                        console.log('O wins!');
                    }
                    else {
                        checkTie();
                    }
                    
                }
            });
        })
    }
    const resetBoard = () => { //makes all the array spaces blank again
        gameBoard.board = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
        let div = document.querySelectorAll('.gridDiv');
        div.forEach((element) => {
            element.innerText = ' ';
        });
    }

    const btn = document.querySelector('#btn');
    btn.addEventListener('click', resetBoard);

    const checkTie = () => {
       const blankSpace = (element) => element === ' ';
       if (!gameBoard.board.some(blankSpace)) {
           console.log('Tie game!');
       }
    } 
    const  checkWin = (player) => {
        // player = 'X' or 'O'
      
        const horizontal = [0,3,6].map(i=>{return[i,i+1,i+2]});
        const vertical = [0,1,2].map(i=>{return[i,i+3,i+6]});
        const diagonal = [[0,4,8],[2,4,6]];
      
        var allwins = [].concat(horizontal).concat(vertical).concat(diagonal);
        let res = allwins.some(indices => { 
            return gameBoard.board[indices[0]] == player && 
                   gameBoard.board[indices[1]] == player && 
                   gameBoard.board[indices[2]] == player})
        return res;
      }

    return {
        markSpace,
        resetBoard,
        checkWin,
    };
})();

const Player = (name) => { //factory function
    const sayName = () => console.log(`I am player ${name}`)
    return {sayName}
}

gameBoard.generateBoard();
gameController.markSpace();

//TODO
// Allow input of player names
// Set up a display element that announces the winning player
// Style more if I care
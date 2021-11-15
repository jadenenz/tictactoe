const gameBoard = (() => { //module
    const boardArray = ['x','o','x','o','x','o','x','o','x'];
    const generateBoard = () => {
        const boardContainer = document.querySelector('.boardContainer');
        const div = document.createElement('div');
        for (let i = 0; i < (boardArray.length); i++){
            boardContainer.appendChild(div);
            div.innerHTML = boardArray[i];
            console.log(i)
        }
    }
    return {
        boardArray,
        generateBoard,
    };
})();

const gameController = (() => { //module
    const markSpace = () => console.log('idk') //change clicked on array space to either x or o, depending on who's turn it is
    const resetBoard = () => console.log('idk') //makes all the array spaces blank again
    return {
        markSpace,
        resetBoard,
    };
})();

const Player = (name) => { //factory function
    const sayName = () => console.log(`I am player ${name}`)
    return {sayName}
}

gameBoard.generateBoard();


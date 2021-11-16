let clickedFlag = false;

const gameBoard = (() => { //module
    const boardArray = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    const generateBoard = () => {
        const boardContainer = document.querySelector('.boardContainer');
        for (let i = 0; i < (boardArray.length); i++){
            let div = document.createElement('div');
            div.setAttribute('class', 'gridDiv')
            div.innerHTML = boardArray[i];
            boardContainer.appendChild(div);
        }
    }
    return {
        boardArray,
        generateBoard,
    };
})();

// just added data indeces, need to update the array using data index in order
//to make a function called after the if else statements to check for a winner

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
                    } else {
                        clickedFlag = false;
                        element.innerText = 'O'
                    }
                }
            });
        })
    }
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
gameController.markSpace();


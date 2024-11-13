/*-------------------------------- Constants --------------------------------*/
const board = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
]
/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/
const gameBoard = document.querySelector('.game')
/*-------------------------------- Functions --------------------------------*/
const createBoard = () => {
  board.forEach((row) => {
    row.forEach((cell) => {
      const cellBox = document.createElement('div')
      if (cell === 1) {
        cellBox.classList.add('wall')
      } else if (cell === 0) {
        cellBox.classList.add('path')
      } else {
        return
      }
      gameBoard.appendChild(cellBox)
    })
  })
}
createBoard()

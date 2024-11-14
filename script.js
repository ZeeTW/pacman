/*-------------------------------- Constants --------------------------------*/
const board = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 2, 1, 0, 0, 1, 1],
  [3, 3, 3, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
]
/*---------------------------- Variables (state) ----------------------------*/
let pacmanPosition = {
  x: 4,
  y: 5
}

/*------------------------ Cached Element References ------------------------*/
const gameBoard = document.querySelector('.game')
const position = document.querySelector('.pacman')

/*-------------------------------- Functions --------------------------------*/
const createBoard = () => {
  gameBoard.innerHTML = ''

  board.forEach((row, rowI) => {
    row.forEach((cell, cellI) => {
      const cellBox = document.createElement('div')
      if (rowI === pacmanPosition.y && cellI === pacmanPosition.x) {
        cellBox.classList.add('pacman')
      } else if (cell === 1) {
        cellBox.classList.add('wall')
      } else if (cell === 0 || cell === 2) {
        cellBox.classList.add('path')
      } else if (cell === 3) {
        cellBox.classList.add('points')
      } else {
        return
      }
      gameBoard.appendChild(cellBox)
    })
  })
}

const updatePosition = () => {
  document.addEventListener('keydown', (event) => {
    let newPositionX = pacmanPosition.x
    let newPositionY = pacmanPosition.y
    if (event.key === 'ArrowUp') {
      newPositionY -= 1
    } else if (event.key === 'ArrowDown') {
      newPositionY += 1
    } else if (event.key === 'ArrowLeft') {
      newPositionX -= 1
    } else if (event.key === 'ArrowRight') {
      newPositionX += 1
    } else {
      console.log('no')
    }

    if (
      newPositionX >= 0 &&
      newPositionY >= 0 &&
      newPositionY < board.length &&
      newPositionX < board[0].length &&
      board[newPositionY][newPositionX] !== 1
    ) {
      pacmanPosition = { x: newPositionX, y: newPositionY }
    } else {
      console.log('hit a wall/out of boundaries')
    }

    createBoard()
  })
}

createBoard()
updatePosition()

/*----------------------------- Event Listeners -----------------------------*/

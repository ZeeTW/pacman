/*-------------------------------- Constants --------------------------------*/
const board = [
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 1, 1, 3, 1, 1, 3, 1, 1, 3],
  [3, 1, 1, 3, 1, 1, 3, 1, 1, 3],
  [3, 3, 3, 3, 1, 1, 3, 3, 3, 3],
  [1, 3, 3, 1, 1, 1, 1, 3, 3, 1],
  [1, 1, 3, 3, 1, 1, 3, 3, 1, 1],
  [1, 3, 3, 3, 0, 3, 3, 3, 3, 1],
  [1, 3, 1, 1, 3, 3, 1, 1, 3, 1],
  [1, 3, 1, 1, 3, 3, 1, 1, 3, 1],
  [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
/*---------------------------- Variables (state) ----------------------------*/
let pacmanPosition = {
  x: 4,
  y: 6
}
let direction = null
let moveInt = null
let score = 0

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

// const updatePosition = () => {
//   document.addEventListener('keydown', (event) => {
//     let newPositionX = pacmanPosition.x
//     let newPositionY = pacmanPosition.y
//     if (event.key === 'ArrowUp') {
//       newPositionY -= 1
//     } else if (event.key === 'ArrowDown') {
//       newPositionY += 1
//     } else if (event.key === 'ArrowLeft') {
//       newPositionX -= 1
//     } else if (event.key === 'ArrowRight') {
//       newPositionX += 1
//     } else {
//       console.log('no')
//     }

//     if (
//       newPositionX >= 0 &&
//       newPositionY >= 0 &&
//       newPositionY < board.length &&
//       newPositionX < board[0].length &&
//       board[newPositionY][newPositionX] !== 1
//     ) {
//       pacmanPosition = { x: newPositionX, y: newPositionY }
//       createBoard()
//     } else {
//       console.log('hit a wall/out of boundaries')
//     }
//   })
// }

const updatePosition = () => {
  let newPositionX = pacmanPosition.x
  let newPositionY = pacmanPosition.y
  if (direction === 'up') {
    newPositionY -= 1
  } else if (direction === 'down') {
    newPositionY += 1
  } else if (direction === 'left') {
    newPositionX -= 1
  } else if (direction === 'right') {
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
    if (board[newPositionY][newPositionX] === 3) {
      board[newPositionY][newPositionX] = 0
      score += 100
      document.getElementByName('h2').textContent = `Score:${score}`
    }
    pacmanPosition = { x: newPositionX, y: newPositionY }
    createBoard()
  } else {
    console.log('hit a wall/out of boundaries')
  }
}

const startMove = (way) => {
  if (direction !== way) {
    direction = way
    clearInterval(moveInt)
    moveInt = setInterval(updatePosition, 400)
  }
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    startMove('up')
  } else if (event.key === 'ArrowDown') {
    startMove('down')
  } else if (event.key === 'ArrowRight') {
    startMove('right')
  } else if (event.key === 'ArrowLeft') {
    startMove('left')
  }
})

createBoard()

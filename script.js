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
  x: 5,
  y: 4
}

/*------------------------ Cached Element References ------------------------*/
const gameBoard = document.querySelector('.game')
const position = document.querySelector('.pacman')

/*-------------------------------- Functions --------------------------------*/
const createBoard = () => {
  board.forEach((row) => {
    row.forEach((cell) => {
      const cellBox = document.createElement('div')
      if (cell === 1) {
        cellBox.classList.add('wall')
      } else if (cell === pacmanPosition) {
        cellBox.classList.add('pacman')
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
createBoard()
// console.log(board.indexOf(pacmanPosition))

const updatePosition = () => {
  document.addEventListener('keydown', (event) => {
    let x = [5]
    let y = [4]
    if (event.key === 'ArrowUp') {
      y--
      console.log(pacmanPosition)
      pacmanPosition = { ...pacmanPosition, x: pacmanPosition.x - 1 }
      console.log(pacmanPosition)
    } else {
      console.log('no')
    }
  })
}
//   if (logKey === 'ArrowUp') {
//     console.log('yes')
//   } else {
//     console.log('wrong')
//   }
// }
updatePosition()
// const keyboardClick = (event) =>{
//   const index = Array.from(board).indexOf(event.target)
//   if()
// }

/*----------------------------- Event Listeners -----------------------------*/
// board.forEach((cell) => {
//   cell.addEventListener('keydown')
// })

/*-------------------------------- Constants --------------------------------*/
const board = [
  [3, 3, 3, 3, 0, 0, 0, 0, 3, 3],
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
let ghosts = [
  { name: 'blinky', x: 4, y: 0, direction: null, scared: false },
  { name: 'pinky', x: 5, y: 0, direction: null, scared: false },
  { name: 'inky', x: 6, y: 0, direction: null, scared: false },
  { name: 'clyde', x: 7, y: 0, direction: null, scared: false }
]

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
      } else if (cell === 0) {
        cellBox.classList.add('path')
      } else if (cell === 3) {
        cellBox.classList.add('points')
      } else {
        return
      }
      gameBoard.appendChild(cellBox)
    })
  })
  // adding ghosts to the game
  ghosts.forEach((ghost) => {
    const ghostI = ghost.y * board[0].length + ghost.x
    const ghostCell = gameBoard.children[ghostI]
    ghostCell.classList.add(ghost.name)
  })
}
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
      document.getElementById('score-text').innerText = `Score: ${score}`
    }
    pacmanPosition = { x: newPositionX, y: newPositionY }
    createBoard()
    collisions()
  } else {
    console.log('hit a wall/out of boundaries')
  }
}

const startMove = (way) => {
  if (direction !== way) {
    direction = way
    clearInterval(moveInt)
    moveInt = setInterval(updatePosition, 300)
  }
}

const moveGhosts = (ghost) => {
  const directions = ['up', 'down', 'left', 'right']
  let canMove = []

  directions.forEach((direction) => {
    let newGhostX = ghost.x
    let newGhostY = ghost.y

    if (direction === 'up') {
      newGhostY -= 1
    } else if (direction === 'down') {
      newGhostY += 1
    } else if (direction === 'left') {
      newGhostX -= 1
    } else if (direction === 'right') {
      newGhostX += 1
    }

    if (
      newGhostX >= 0 &&
      newGhostY >= 0 &&
      newGhostX < board[0].length &&
      newGhostY < board.length &&
      board[newGhostY][newGhostX] !== 1
    ) {
      canMove.push({ x: newGhostX, y: newGhostY, direction: direction })
    }
  })

  if (canMove.length > 0) {
    let move
    move = canMove[Math.floor(Math.random() * canMove.length)]
    ghost.x = move.x
    ghost.y = move.y
    ghost.direction = move.direction
  }
  collisions()
}

const startGhosts = () => {
  ghosts.forEach((ghost) => moveGhosts(ghost))
  createBoard()
}
ghostMove = setInterval(startGhosts, 250)

const collisions = () => {
  ghosts.forEach((ghost) => {
    if (pacmanPosition.x === ghost.x && pacmanPosition.y === ghost.y) {
      gameOver()
    }
  })
}

const gameOver = () => {
  clearInterval(moveInt)
  clearInterval(ghostMove)
  document.getElementById('game-over').textContent = 'Game is over ya loser!'
}

const checkForWinner = () => {
  if (score === 300) {
    clearInterval(moveInt)
    clearInterval(ghostMove)
    document.getElementById('you-won').textContent = 'EZ WINNNNNNNNNNNNNNN'
  }
}
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    startMove('up')
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    startMove('down')
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    startMove('right')
  } else if (event.key === 'ArrowLeft' || event.key === 'a') {
    startMove('left')
  }
})

startGhosts()
collisions()
checkForWinner()
createBoard()

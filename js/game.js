'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '💥'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false,
    isVictory: false,
    foodCount: 0
}

var gCherryInterval 
var gBoard


function onInit() {
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(addCherry,5000)
    hideModal()
}

function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    addPowerFood(board)
    return board
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    // DOM
    const elScore = document.querySelector('.score')
    elScore.innerText = gGame.score

}

function showModal(msg) {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
    const elUserMsg = document.querySelector('.user-msg')
    elUserMsg.innerText = msg

}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

function gameOver() {
    console.log('Game Over')
    gGame.score = 0
    updateScore(gGame.score)
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
    var msg = gGame.isVictory ? 'You Win' : 'You Lose'
    showModal(msg)
}

function checkVictory() {
    if (gGame.foodCount === 0) {
        gGame.isVictory = true
        gameOver()
    }
}

function addPowerFood(board) {
    board[1][1] = POWER_FOOD
    board[1][board[0].length - 2] = POWER_FOOD
    board[board.length - 2][1] = POWER_FOOD
    board[board.length - 2][board[0].length - 2] = POWER_FOOD
    gGame.foodCount -= 4
}

function getEmptyLocation(board) {
    var emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyLocations.push({ i, j })
            }
        }
    }
    if (!emptyLocations.length) return null
    var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    return emptyLocations[randIdx]
}

function addCherry() {
    var emptyLocation = getEmptyLocation(gBoard)
    if (!emptyLocation) return
    // Update Model
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    // Update DOM
    renderCell(emptyLocation, CHERRY)
}

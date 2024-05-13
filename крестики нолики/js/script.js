let currentPlayer = 'X'
let gameEnd = false
let board = ['', '', '', '', '', '', '', '', '',]
const winPattners = [
    [0, 1, 2], [3, 4, 5],
    [2, 5, 8], [0, 3, 6],
    [6, 7, 8], [1, 4, 7],
    [0, 4, 8], [2, 4, 6],
]

function cellClicked(cellIndex) {
    if (!gameEnd && board[cellIndex] === '') {
        const cell = document.getElementById(`cell${cellIndex}`)
        cell.textContent = currentPlayer
        cell.setAttribute('data-value', currentPlayer)
        board[cellIndex] = currentPlayer
        if (checkWinner(currentPlayer)) {
            document.getElementById('message').textContent = `Игрок ${currentPlayer} победил!`
            gameEnd = true
        } else if (isBoardFull()) {
            document.getElementById('message').textContent = 'Ничья!'
            gameEnd = true
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        }

    }
}

function checkWinner(player) {
    for (const pattern of winPattners) {
        const [a, b, c] = pattern
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true
        }
    }
    return false
}

function isBoardFull() {
    return board.every(cell => cell !== '')
}
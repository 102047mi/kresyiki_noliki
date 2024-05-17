let currentPlayer = 'X';
let gameEnd = false;
let board = ['', '', '', '', '', '', '', '', ''];
const winPatterns = [
    [0, 1, 2], [3, 4, 5],
    [2, 5, 8], [0, 3, 6],
    [6, 7, 8], [1, 4, 7],
    [0, 4, 8], [2, 4, 6],
];

function cellClicked(cellIndex) {
    if (!gameEnd && board[cellIndex] === '') {
        const cell = document.getElementById(`cell${cellIndex}`);
        cell.textContent = currentPlayer;
        cell.setAttribute('data-value', currentPlayer);
        board[cellIndex] = currentPlayer;

        if (checkWinner(currentPlayer)) {
            showResult('win', currentPlayer);
        } else if (isBoardFull()) {
            showResult('draw');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner(player) {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function showResult(result, player = null) {
    gameEnd = true;
    const resultBlock = document.getElementById('resultBlock');
    const resultGif = document.getElementById('resultGif');
    const resultText = document.getElementById('resultText');

    if (result === 'win') {
        resultGif.src = 'https://media1.tenor.com/m/zxgz7Fi7aqQAAAAC/goblin-green-monster.gif';
        resultText.textContent = `Игрок ${player} победил!`;
    } else {
        resultGif.src = 'https://media1.tenor.com/m/AGjt8YB2KnEAAAAC/%D0%BF%D0%BE%D1%81%D1%85%D0%B0%D0%BB%D0%BA%D0%BE-1488.gif';
        resultText.textContent = 'Ничья! Попробуйте ещё раз';
    }

    resultBlock.classList.remove('hidden');
    restartButton.addEventListener('click', restartGame);
}

function restartGame() {
    gameEnd = false;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('resultBlock').classList.add('hidden');

    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell${i}`);
        cell.textContent = '';
        cell.setAttribute('data-value', '');
    }
}
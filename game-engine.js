export const GameStage = {
    DRAW: 'DRAW',
    PLAYER_ONE_WON: 'PLAYER_ONE_WON',
    PLAYER_TWO_WON: 'PLAYER_TWO_WON',
    PLAYING: 'PLAYING',
}

export function determineGameStage(gameBoard, playerOneToken, playerTwoToken) {
    if (isDraw(gameBoard)) {
        return GameStage.DRAW;
    }
    if (isTokenWinner(gameBoard, playerOneToken)) {
        return GameStage.PLAYER_ONE_WON;
    }
    if (isTokenWinner(gameBoard, playerTwoToken)) {
        return GameStage.PLAYER_TWO_WON;
    }
    return GameStage.PLAYING;
}

function isTokenWinner(gameBoard, token) {
    const isRowVictory = isRowWon(gameBoard, 0, token) || isRowWon(gameBoard, 1, token) || isRowWon(gameBoard, 2, token);
    const isColumnVictory = isColumnWon(gameBoard, 0, token) || isColumnWon(gameBoard, 1, token) || isColumnWon(gameBoard, 2, token);
    const isCrossVictory = isCrossWon(gameBoard, token);
    
    return isRowVictory || isColumnVictory || isCrossVictory;
}

function isRowWon(gameBoard, rowIndex, token) {
    return gameBoard[rowIndex][0] === token && gameBoard[rowIndex][1] === token && gameBoard[rowIndex][2] === token;
}

function isColumnWon(gameBoard, columnIndex, token) {
    return gameBoard[0][columnIndex] === token && gameBoard[1][columnIndex] === token && gameBoard[2][columnIndex] === token;
}

function isCrossWon(gameBoard, token) {
    const slantDownVictory = gameBoard[0][0] === token && gameBoard[1][1] === token && gameBoard[2][2] === token;
    const slantUpVictory = gameBoard[2][0] == token && gameBoard[1][1] === token && gameBoard[0][2] === token;
    return slantDownVictory || slantUpVictory;
}

function isDraw(gameBoard) {
    return !doesRowHaveEmptyCell(gameBoard[0]) && !doesRowHaveEmptyCell(gameBoard[1]) && !doesRowHaveEmptyCell(gameBoard[2]);
}

function doesRowHaveEmptyCell(gameRow) {
    return gameRow.some(cell => cell === null);
}

export function isMovePossible(gameBoard, move) {
    move = move.toUpperCase();
    const columnIndex = getColumnIndex(move[0]);
    const rowIndex = getRowIndex(move[1]);

    if (columnIndex === null || rowIndex === null) {
        return false;
    }

    const cell = gameBoard[rowIndex][columnIndex];
    return cell === null;
}

function getColumnIndex(columnMove) {
    if (columnMove === 'A') {
        return 0;
    }
    if (columnMove === 'B') {
        return 1;
    }
    if (columnMove === 'C') {
        return 2;
    }
    return null;
}

function getRowIndex(rowMove) {
    if (rowMove === '1') {
        return 0;
    }
    if (rowMove === '2') {
        return 1;
    }
    if (rowMove === '3') {
        return 2;
    }
    return null;
}

export function getEmptyGameBoard() {
    return [[null, null, null], [null, null, null], [null, null, null]];
}

export function applyMove(gameBoard, move, token) {
    move = move.toUpperCase();
    const columnIndex = getColumnIndex(move[0]);
    const rowIndex = getRowIndex(move[1]);

    gameBoard[rowIndex][columnIndex] = token;
}

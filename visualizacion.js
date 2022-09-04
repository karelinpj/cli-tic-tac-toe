
import cli from "cli-color";

const boardColor = cli.blueBright;

export function printBoard(gameBoard, playerOneToken, playerTwoToken) {
    console.log();
    printHeaderRow();
    printGameRow(gameBoard, 0, playerOneToken, playerTwoToken);
    printHorizontalLine()
    printGameRow(gameBoard, 1, playerOneToken, playerTwoToken);
    printHorizontalLine()
    printGameRow(gameBoard, 2, playerOneToken, playerTwoToken);
    console.log();
}

function printHeaderRow() {
    console.log(boardColor("    A    B    C"));
}

function printHorizontalLine() {
    console.log(boardColor("  --------------"));
}

function printGameRow(gameBoard, rowIndex, playerOneToken, playerTwoToken) {
    let row = boardColor(rowIndex + 1) + ' ';
    row += getCell(gameBoard[rowIndex][0], playerOneToken, playerTwoToken);
    row += boardColor("|");
    row += getCell(gameBoard[rowIndex][1], playerOneToken, playerTwoToken);
    row += boardColor("|");
    row += getCell(gameBoard[rowIndex][2], playerOneToken, playerTwoToken);
    console.log(row);
}

function getCell(value, playerOneToken, playerTwoToken) {
    let middle = '  ';
    if (value === playerTwoToken) {
        middle = cli.magentaBright(value);
    }
    if (value === playerOneToken) {
        middle = cli.yellowBright(value);
    }
    return ' ' + middle + ' ';
}
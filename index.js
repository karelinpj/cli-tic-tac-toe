import cli from 'cli-color';

import { printBoard } from "./visualizacion.js";
import { getFirstPlayerName, getSecondPlayerName, getDesiredPosition } from "./preguntas.js";
import { getEmptyGameBoard, GameStage, determineGameStage, applyMove } from './game-engine.js';

async function startGame() {
    const playerOneToken = '👽';
    const playerTwoToken = '👻';
    const firstPlayerName = await getFirstPlayerName(playerOneToken);
    const secondPlayerName = await getSecondPlayerName(playerTwoToken);

    const gameBoard = getEmptyGameBoard();
    let isPlayerOneTurn = true;

    let gameStage = determineGameStage(gameBoard, playerOneToken, playerTwoToken);
    while(gameStage === GameStage.PLAYING) {
        const currentPlayer = isPlayerOneTurn ? firstPlayerName : secondPlayerName;
        const playerToken = isPlayerOneTurn ? playerOneToken : playerTwoToken;

        printBoard(gameBoard, playerOneToken, playerTwoToken);
        const position = await getDesiredPosition(gameBoard,currentPlayer, playerToken);
        applyMove(gameBoard, position, playerToken);

        isPlayerOneTurn = !isPlayerOneTurn;
        gameStage = determineGameStage(gameBoard, playerOneToken, playerTwoToken);
    }

    printBoard(gameBoard, playerOneToken, playerTwoToken);

    switch (gameStage) {
        case GameStage.PLAYER_ONE_WON:
        case GameStage.PLAYER_TWO_WON:
            const winningPlayer = !isPlayerOneTurn ? firstPlayerName : secondPlayerName;
            console.log(cli.cyan(`\n🎉🎉 ${winningPlayer} won! 🎉🎉\n`));
            break;
        case GameStage.DRAW:
            console.log(cli.cyan('\nGame draw 😑\n'));
            break;
    }
}

startGame();

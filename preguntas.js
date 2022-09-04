import prompt from 'prompt';
import cli from 'cli-color';
import { isMovePossible } from './game-engine.js';

prompt.message = "";
prompt.delimiter = "";

const questionColor = cli.magenta;

function getNameSchema(message) {
    return {
        properties: {
            name: {
                message: questionColor(message),
                required: true
            },
        }
    }
}

export async function getFirstPlayerName(token) {
    console.log();
    const schema = getNameSchema(`First player's name (${token})?`);
    const result = await prompt.get(schema);
    return result.name;
}

export async function getSecondPlayerName(token) {
    console.log();
    const schema = getNameSchema(`Second player's name (${token})?`);
    const result = await prompt.get(schema);
    return result.name;
}

export async function getDesiredPosition(gameBoard, name, token) {
    const schema = {
        properties: {
            position: {
                message: questionColor(`${name}'s turn (${token}). Desired position, for example "A1"?`),
                required: true, 
            }
        }
    };
    let result = await prompt.get(schema);
    let position = result.position;


    while(!isMovePossible(gameBoard, position)) {
        console.log(cli.red("\nMove is not valid. Please select again."));

        result = await prompt.get(schema);
        position = result.position;
    }

    return result.position;
}

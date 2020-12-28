import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import io from 'socket.io-client';
import GameWaiting from './GameWaiting';
import GameInProgress from './GameInProgress';
import './game.scss';
import './gameWaiting.scss';

let socket;

function Game({ location }) {
    const ENDPOINT = '192.168.0.35:5000';
    // const ENDPOINT = '192.168.1.55:5000';
    const history = useHistory();

    const [gameStarted, setGameStarted] = useState(false);
    // const [gameStarted, setGameStarted] = useState(true);
    const [player, setPlayer] = useContext(PlayerContext);
    const [gameCode, setGameCode] = useState('');
    const [gameState, setGameState] = useState(null);
    // const [gameState, setGameState] = useState(EXAMPLE_STATE);

    useEffect(() => {
        socket = io(ENDPOINT);
        console.log('game code input', location.gameCodeInput ? 1 : 2);
        if (location.gameCodeInput === '') {
            console.log('empty code');
            alert('empty code');
            history.push('/');
        } else if (location.gameCodeInput) {
            console.log('join');
            socket.emit('joinGame', { playerName: player.name, gameCode: location.gameCodeInput }, (error) => {
                alert(error);
                history.push('/');
            });
        } else {
            console.log('start');
            socket.emit('newGame', player.name, (error) => {
                alert(error);
                history.push('/');
            });
        }

        return () => {
            handleDisconnect();
            setPlayer({ ...player, number: 0 });
        }

    }, [location, ENDPOINT]);

    useEffect(() => {
        socket.on('info', handleInfo);
        socket.on('gameCode', handleNewGameCode);
        socket.on('init', handleInit);
        socket.on('gameState', handleGameState);
    }, [])

    useEffect(() => {
        console.log('state pre if', gameState);
        if (gameState && gameState.gameStatus === 'started') {
            setGameStarted(true);
        }
        else if (gameState && gameState.gameStatus === 'finished') {
            if (gameState.winner === player.number) {
                alert('YOU WON!');
            } else {
                alert('YOU LOST!');
            }
        }
    }, [gameState]);

    const handleInfo = (info) => {
        if (info.includes('has left the game')) {
            alert(info);
            history.push('/');
        } else {
            console.log('info:', info);
        }
    }

    const handleNewGameCode = (gameCode) => {
        setGameCode(gameCode);
    }

    const handleInit = (initNumber) => {
        setPlayer({ ...player, number: initNumber });
        console.log('init number', initNumber);
    }

    const handleGameState = (game) => {
        setGameState(game);
        console.log('postavljen state');
    }

    const handleDisconnect = () => {
        setGameStarted(false);
        socket.close();
        console.log("handle disconnect - ", player.name);
    }

    return (
        <div className="game">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
            <hr />

            <div>
                {gameStarted ?
                    <GameInProgress socket={socket} player={player} gameState={gameState} />
                    :
                    <GameWaiting player={player} gameCode={gameCode} />
                }
            </div>

        </div>
    );
}

// const SAMPLE_STATE = {
//     "players": [
//         { "name": "tanja", "card": { "id": 18, "elements": [37, 36, 3, 20, 28, 53, 45, 12] }, "score": 0 },
//         { "name": "mila", "card": { "id": 24, "elements": [40, 51, 49, 29, 4, 11, 31, 20] }, "score": 0 }
//     ],
//     "deckOfCards": [{ "id": 40, "elements": [13, 47, 28, 6, 51, 43, 17, 32] }, { "id": 14, "elements": [36, 2, 15, 57, 43, 22, 50, 29] }, { "id": 54, "elements": [31, 25, 50, 13, 19, 56, 37, 8] }, { "id": 5, "elements": [37, 41, 43, 40, 1, 38, 42, 39] }, { "id": 6, "elements": [44, 50, 45, 1, 49, 46, 48, 47] }, { "id": 9, "elements": [10, 45, 52, 17, 38, 31, 24, 2] }, { "id": 42, "elements": [6, 38, 23, 34, 49, 19, 53, 15] }, { "id": 15, "elements": [33, 25, 57, 49, 3, 41, 9, 17] }, { "id": 13, "elements": [2, 14, 49, 28, 21, 56, 35, 42] }, { "id": 25, "elements": [32, 41, 21, 50, 12, 23, 4, 52] }, { "id": 32, "elements": [51, 38, 48, 12, 35, 5, 22, 25] }, { "id": 2, "elements": [18, 19, 21, 22, 1, 17, 20, 16] }, { "id": 26, "elements": [33, 22, 44, 24, 13, 53, 42, 4] }, { "id": 49, "elements": [52, 30, 42, 25, 7, 15, 47, 20] }, { "id": 51, "elements": [16, 53, 47, 10, 41, 8, 35, 29] }, { "id": 45, "elements": [11, 33, 7, 55, 38, 28, 50, 16] }, { "id": 17, "elements": [11, 44, 52, 27, 43, 35, 19, 3] }, { "id": 19, "elements": [13, 3, 29, 38, 54, 46, 21, 30] }, { "id": 52, "elements": [54, 17, 8, 11, 42, 36, 23, 48] }, { "id": 50, "elements": [46, 28, 9, 8, 40, 22, 52, 34] }, { "id": 16, "elements": [51, 3, 42, 18, 34, 26, 10, 50] }, { "id": 11, "elements": [40, 54, 2, 26, 19, 12, 47, 33] }, { "id": 22, "elements": [36, 56, 27, 4, 9, 18, 47, 38] }, { "id": 35, "elements": [54, 5, 31, 15, 18, 41, 28, 44] }, { "id": 31, "elements": [34, 47, 37, 24, 11, 57, 21, 5] }, { "id": 20, "elements": [47, 3, 23, 14, 22, 55, 39, 31] }, { "id": 36, "elements": [35, 6, 39, 54, 20, 9, 50, 24] }, { "id": 8, "elements": [2, 23, 16, 30, 51, 9, 37, 44] }, { "id": 27, "elements": [14, 43, 4, 16, 34, 45, 25, 54] }, { "id": 53, "elements": [30, 55, 8, 18, 12, 24, 49, 43] }, { "id": 10, "elements": [53, 11, 25, 2, 18, 32, 46, 39] }, { "id": 41, "elements": [48, 37, 6, 52, 18, 29, 14, 33] }, { "id": 34, "elements": [53, 40, 5, 30, 50, 27, 14, 17] }, { "id": 39, "elements": [27, 57, 6, 16, 31, 42, 46, 12] }, { "id": 33, "elements": [16, 39, 5, 26, 13, 49, 52, 36] }, { "id": 0, "elements": [3, 2, 5, 4, 7, 1, 8, 6] }, { "id": 1, "elements": [10, 12, 13, 15, 11, 1, 14, 9] }, { "id": 37, "elements": [6, 10, 40, 21, 55, 25, 44, 36] }, { "id": 12, "elements": [55, 20, 48, 13, 2, 34, 27, 41] }, { "id": 55, "elements": [14, 44, 38, 32, 26, 8, 20, 57] }, { "id": 44, "elements": [37, 49, 7, 22, 27, 10, 54, 32] }, { "id": 28, "elements": [26, 17, 15, 37, 4, 46, 35, 55] }, { "id": 43, "elements": [31, 53, 26, 48, 9, 21, 7, 43] }, { "id": 4, "elements": [36, 34, 1, 33, 32, 31, 35, 30] }, { "id": 23, "elements": [57, 39, 19, 28, 10, 30, 48, 4] }, { "id": 48, "elements": [14, 19, 7, 24, 41, 36, 46, 51] }, { "id": 38, "elements": [30, 11, 6, 41, 22, 56, 45, 26] }, { "id": 46, "elements": [44, 34, 56, 39, 17, 7, 12, 29] }, { "id": 29, "elements": [55, 29, 32, 19, 45, 42, 5, 9] }, { "id": 7, "elements": [1, 52, 55, 51, 57, 54, 53, 56] }, { "id": 56, "elements": [39, 27, 8, 33, 21, 51, 45, 15] }, { "id": 47, "elements": [13, 45, 35, 23, 18, 57, 40, 7] }, { "id": 3, "elements": [29, 26, 25, 24, 23, 1, 28, 27] }, { "id": 30, "elements": [10, 56, 43, 33, 20, 5, 46, 23] }, { "id": 21, "elements": [24, 16, 3, 48, 15, 56, 32, 40] }],
//     "gameStatus": "active",
//     "winner": 1
// }

// const SAMPLE_CARDS = [
//     {
//         id: 0,
//         elements: [2, 3, 4, 5, 1, 6, 7, 8]
//     },
//     {
//         id: 1,
//         elements: [9, 10, 11, 12, 13, 14, 15, 1]
//     },
//     {
//         id: 2,
//         elements: [16, 17, 1, 18, 19, 20, 21, 22]
//     }
// ]

export default Game;

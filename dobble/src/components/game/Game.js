import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import io from 'socket.io-client';
import GameWaiting from './GameWaiting';
import GameInProgress from './GameInProgress';

let socket;

function Game({ location }) {
    const ENDPOINT = 'localhost:5000';
    const history = useHistory();

    const [gameStarted, setGameStarted] = useState(false);
    const [player, setPlayer] = useContext(PlayerContext);
    const [gameCode, setGameCode] = useState('');
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        socket = io(ENDPOINT);
        
        if (!location.gameCodeInput) {
            socket.emit('newGame', player.name, (error) => {
                alert(error);
                history.push('/');
            });
        } else {
            socket.emit('joinGame', { playerName: player.name, gameCode: location.gameCodeInput }, (error) => {
                alert(error);
                history.push('/');
            });
        }

        return () => {
            handleDisconnect();
        }

    }, [location, ENDPOINT]);

    useEffect(() => {
        socket.on('info', handleInfo);
        socket.on('gameCode', handleNewGameCode);
        socket.on('init', handleInit);
        socket.on('gameState', handleGameState);
        socket.on('gameOver', handleGameOver);
    }, [])

    const handleInfo = (info) => {
        console.log('info:', info);
    }

    const handleNewGameCode = (gameCode) => {
        setGameCode(gameCode);
    }

    const handleInit = (initNumber) => {
        setPlayer({ ...player, number: initNumber });
        console.log('init number', initNumber);
    }

    const handleGameState = (gameState) => {
        setGameState(gameState);
        console.log('player', player);
        if (gameState.gameStatus === 'started') {
            setGameStarted(true);
        }
    }

    const handleGameOver = (winner) => {

        if (winner === player.number) {
            alert('YOU WON!');
        } else {
            alert('YOU LOST!');
        }
    }

    const handleDisconnect = () => {
        setGameStarted(false);
        socket.close();
        console.log("handle disconnect - ", player.name);
    }


    return (
        <div className="Game">
            Game
            <hr />
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
            <hr />

            <div>
                {gameStarted ?
                    <GameInProgress socket={socket} player ={player} gameState={gameState} />
                    :
                    <GameWaiting player={player} gameCode={gameCode} />
                }
            </div>

        </div>
    );
}

export default Game;

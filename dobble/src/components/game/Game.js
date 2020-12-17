import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import io from 'socket.io-client';
import GameWaiting from './GameWaiting';
import GameInProgress from './GameInProgress';

let socket;

function Game({ location }) {
    const ENDPOINT = '192.168.0.35:5000';
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
    }, [])

    useEffect(() => {
        console.log('player', player);
        console.log('state pre if', gameState);
        if (gameState && gameState.gameStatus === 'started') {
            setGameStarted(true);
        }
        else if (gameState && gameState.gameStatus === 'finished') {
            console.log('status finished', gameState.gameStatus);
            console.log('winner', gameState.winner);
            console.log('player number', player.number);
            if (gameState.winner === player.number) {
                alert('YOU WON!');
            } else {
                alert('YOU LOST!');
            }
        }
    }, [gameState, player]);

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

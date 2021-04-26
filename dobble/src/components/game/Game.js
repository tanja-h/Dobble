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
    const ENDPOINT = '192.168.1.55:5000';
    const history = useHistory();

    const [gameStarted, setGameStarted] = useState(false);
    const [player, setPlayer] = useContext(PlayerContext);
    const [gameCode, setGameCode] = useState('');
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        socket = io(ENDPOINT);
        console.log('game code input', location.gameCodeInput ? 1 : 2);
        if (player.name === '') {
            console.log('empty name');
            alert('Please enter your name');
            history.push('/');
        }
        else if (location.gameCodeInput === '') {
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
            {gameState && gameState.gameStatus === 'finished' ?
                <div className="overlay-text">
                    <b>{gameState.winner === player.number ? "YOU WON" : "YOU LOST"}</b>
                    {console.log('winner',gameState.winner)}
                    <Link to="/"><span className="overlay-text-small">Go back to Home Page</span></Link>
                </div>
                :
                null
            }
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

export default Game;

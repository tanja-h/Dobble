import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import io from 'socket.io-client';
import GameStarted from './GameStarted';
import GameWaiting from './GameWaiting';
import Slike from '../cards/Slike';

let socket;

function Game({ location }) {
    const ENDPOINT = 'localhost:5000';
    socket = io(ENDPOINT);
    const history = useHistory();

    const [gameStarted, setGameStarted] = useState(false);
    const [player, setPlayer] = useContext(PlayerContext);
    const [gameCode, setGameCode] = useState('');
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        socket.emit('start', player, (error) => {
            alert(error);
            history.push('/');
        });

        return () => {
            handleDisconnect();
        }

    }, [location]); //ENDPOINT, location.search

    socket.on('info', handleInfo);
    socket.on('gameCode', handleGameCode);
    socket.on('init', handleInit);
    socket.on('gameState', handleGameState);

    function handleInfo(info) {
        console.log('info:', info);
    }

    function handleGameCode(gameCode) {
        setGameCode(gameCode);
    }

    function handleInit(initNumber) {
        setPlayer({ ...player, number: initNumber });
    }

    function handleGameState(gameState) {
        setGameState(gameState);
        if (gameState.gameActive) {
            setGameStarted(true);
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
                    // <GameStarted socket={socket} players={players} newCards={cards} />
                    <Slike socket={socket} gameState={gameState} />
                    :
                    <GameWaiting player={player} gameCode={gameCode} />
                }
            </div>

        </div>
    );
}

export default Game;

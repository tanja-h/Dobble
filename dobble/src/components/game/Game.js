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

    const [players, setPlayers] = useState([]);
    const [cards, setCards] = useState([]);

    // const [gameState, setGameState] = useState({
    //     players: [{
    //         card: {},
    //         score: 0
    //     },
    //     {
    //         card: {},
    //         score: 0
    //     }],
    //     deckOfCards: [],
    //     gameActive: false
    // });


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
    socket.on('start1', handleStart);
    socket.on('gameCode', handleGameCode);
    socket.on('init', handleInit);


    function handleInfo(info) {
        console.log('info:', info);
    }

    function handleGameCode(gameCode) {
        setGameCode(gameCode);
    }

    function handleInit(initNumber) {
        // console.log('init number', initNumber);
        setPlayer({ ...player, number: initNumber });
        // console.log('init', player);s
    }

    function handleStart(data) {
        var pl = data.players; //array

        // if (player.name === pl[1].name) {
        //     //rotate players in the array so the main player is first in his list
        //     pl = ([pl[1], pl[0]]);
        // }

        setPlayers(pl);
        setCards(data.cards);
        setGameStarted(true);
    }

    const handleDisconnect = () => {
        socket.close();
        setPlayers([]);
        setCards([]);
        setGameStarted(false);
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
                    <Slike socket={socket} players={players} newCards={cards} />
                    :
                    <GameWaiting player={player} gameCode={gameCode} />
                }
            </div>

        </div>
    );
}

export default Game;

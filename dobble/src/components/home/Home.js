import React, { useState, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from './logo.png';
import Modal from 'react-modal';
// import io from 'socket.io-client';

import { PlayerContext } from '../../context/PlayerContext';
import './home.scss';

Modal.setAppElement('#root');

// let socket1;

function Home({ socket1 }) {
    console.log("socket1 u home", socket1);
    // const ENDPOINT = 'localhost:5000';
    // socket1 = io(ENDPOINT);
    const [gameCodeInput, setGameCodeInput] = useState('');

    const [player, setPlayer] = useContext(PlayerContext);
    const history = useHistory();

    const [inputName, setInputName] = useState(player.name);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const inputRef = useRef();

    socket1.on('gameCode', handleGameCode);
    socket1.on('init', handleInit);


    const handleOpenModule = () => {
        setModalIsOpen(true);
    }

    const changeInputName = e => {
        setInputName(e.target.value);
    }

    const handleSave = () => {
        setPlayer({ ...player, name: inputName });
        handleCancel();
        console.log(player);
    }

    const handleCancel = () => {
        setModalIsOpen(false);
    }

    const handleEnter = e => {
        if (e.key === 'Enter') {
            handleSave();
        }
        if (e.key === 'Escape') {
            handleCancel();
        }
    }

    const handleNewGame = () => {
        socket1.emit('newGame', player, (error) => {
            alert(error);
            // history.push('/');
        });
    }

    function handleGameCode(gameCode) {
        // setGameCode(gameCode);
        console.log("gameCode u home", gameCode);
        setPlayer({ ...player, room: gameCode });

        history.push({
            pathname: '/gamejoin'
            // gamejoinProps: {
            // gameCode: gameCode
            // socket: socket1
            // }
        });
    }

    function handleInit(number) {
        setPlayer({ ...player, number: number });
        if (number === 2) {

            history.push({
                pathname: '/gamejoin',
                gamejoinProps: {
                    gameCode: player.room
                    // socket: socket1
                }
            });
        }
    }

    const handleJoin = () => {
        setPlayer({ ...player, room: gameCodeInput });
        console.log("player u handleJoinGame", player);
        socket1.emit('joinGame', player, (error) => {
            alert(error);
            // history.push('/');
        });
    }

    return (
        <div className="home">
            Home
            <hr />

            <div className="elements">
                <img src={Logo} alt="img missing" />
                <Link to="/rules">
                    <h2>Rules</h2>
                </Link>
                <div className="gameOptions">
                    <Link to="/game">
                        <h2>Start</h2>
                    </Link>
                    <h2 onClick={handleNewGame}>NEW GAME</h2>
                    <p>OR</p>
                    <div className="join">
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter Game Code"
                            onChange={e => setGameCodeInput(e.target.value)}
                        />
                        <h2 onClick={handleJoin}>Join Game</h2>
                    </div>
                </div>
                <h3>Hello {player.name}</h3>
                <button className="btn" onClick={handleOpenModule}>
                    Change name
                </button>
            </div>

            <div>
                <Modal
                    className="modal"
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    onAfterOpen={() => inputRef.current.focus()}
                >
                    <label>Enter Name: </label>
                    <input
                        ref={inputRef}
                        className="input"
                        type="text"
                        onChange={changeInputName}
                        onKeyPress={handleEnter}
                    ></input>
                    <div className="btn-group">
                        <button className="btn" onClick={handleSave}>Save name</button>
                        <button className="btn" onClick={handleCancel}>Cancel</button>
                    </div>
                </Modal>
            </div>

        </div >
    );
}

export default Home;

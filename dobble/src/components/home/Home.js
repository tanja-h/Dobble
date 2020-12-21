import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import Modal from 'react-modal';

import { PlayerContext } from '../../context/PlayerContext';
import './home.scss';

Modal.setAppElement('#root');

function Home() {
    const [player, setPlayer] = useContext(PlayerContext);
    const [gameCodeInput, setGameCodeInput] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputName, setInputName] = useState(player.name);
    const inputRef = useRef();

    const handleOpenModule = () => {
        setModalIsOpen(true);
    }

    const changeInputName = e => {
        setInputName(e.target.value);
    }

    const handleSave = () => {
        if (inputName.trim() !== '' && inputName.length !== 0) {
            setPlayer({ ...player, name: inputName });
        }
        handleCancel();
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

    return (
        <div className="home">
            <img src={Logo} alt="img missing" />
            <Link to="/rules">
                <h2>Rules</h2>
            </Link>
            <div className="gameOptions">
                <div className="startNewGame">
                    <Link to='/game'>
                        <h2>Start New Game</h2>
                    </Link>
                </div>
                <p>OR</p>
                <div className="join">
                    <input
                        type="text"
                        className="input"
                        placeholder="Enter Game Code"
                        onChange={e => setGameCodeInput(e.target.value)}
                    />
                    <Link to={{
                        pathname: '/game',
                        gameCodeInput: gameCodeInput
                    }}>
                        <h2>Join Game</h2>
                    </Link>
                </div>
            </div>
            <h3>Hello {player.name}</h3>
            <button className="btn" onClick={handleOpenModule}>
                Change name
            </button>

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

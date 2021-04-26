import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { PlayerContext } from '../../context/PlayerContext';
import './home.scss';
import Modal from '../modal/Modal';

function Home() {
    const [player, setPlayer] = useContext(PlayerContext);
    const [gameCodeInput, setGameCodeInput] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [inputName, setInputName] = useState(player.name);
    const inputRef = useRef();

    const handleOpenModule = () => {
        setModalOpen(true);
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
        setModalOpen(false);
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            console.log('enter');
            handleSave();
        }
        if (e.key === 'Escape') {
            console.log('escape');
            handleCancel();
        }
    }

    return (
        <div className="home">
            <img src={Logo} alt="img missing" />

            <h3>Hello {player.name}</h3>
            <button className="btn" onClick={handleOpenModule}>Change your name</button>

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
            
            <Link to="/rules">
                <h2>Rules</h2>
            </Link>
            
            <div className={modalOpen ? 'show-modal' : 'hide-modal'}>
                <Modal
                    modalOpen={modalOpen}
                    playerName={inputName}
                    inputRef={inputRef}
                    changeInputName={changeInputName}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    handleKeyPress={handleKeyPress}
                />
            </div>

        </div >
    );
}


export default Home;

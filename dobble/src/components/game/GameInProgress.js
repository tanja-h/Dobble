import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import './gameInProgress.scss';

function GameInProgress({ socket, player, gameState }) {
    const mainPlayerIndex = player.number - 1;
    const opponentPlayerIndex = 2 - player.number;
    const [lastMove, setLastMove] = useState(false);
    const [animation, setAnimation] = useState('');
    const [currentState, setCurrentState] = useState(gameState);

    useEffect(() => {
        console.log('useeffect za gamestate - ', animation);
        if (gameState.gameStatus === 'active' || gameState.gameStatus === 'finished') {
            console.log('active ili finished');
            const firstPlayerScores = [currentState.players[0].score, gameState.players[0].score];
            if (firstPlayerScores[0] !== firstPlayerScores[1]) {
                console.log('animacija 1-1');
                handleCardAnimation(1);
            } else {
                console.log('animacija 1-2');
                handleCardAnimation(2);
            }
        }

        if (gameState.deckOfCards.length <= 1) {
            setLastMove(true);
        }

        setCurrentState(gameState);
        console.log('postavljen novi state');
    }, [gameState]);

    useEffect(() => {
        console.log('useeffect animacija 3', animation);
        if (animation !== '') {
            const timer = setTimeout(() => {
                setAnimation('');
            }, 1000);
            clearTimeout(timer);
        }
    }, [animation])

    const handleCardAnimation = (winner) => {
        console.log('handle animacija 2', winner);
        if (winner === player.number) {
            setAnimation('animation-down');
        } else {
            setAnimation('animation-up');
        }
    }

    const handleGuess = (element) => {
        console.log('guess', element);
        socket.emit('guessElement', element);
    }

    return (
        <div className="gameInProgress">
            <div className="opponent" id="opponent">
                <div className="mobile-view-group">
                    <div className="name">Opponent - {currentState.players[opponentPlayerIndex].name}</div>
                    <div className="score mobile-view">score: {currentState.players[opponentPlayerIndex].score}</div>
                </div>
                <Card card={currentState.players[opponentPlayerIndex].card} handleGuess={null} />
                <div className="score desktop-view">score: {currentState.players[opponentPlayerIndex].score}</div>
            </div>
            <div className="deck-of-cards" id="deck-of-cards">
                {lastMove ? null :
                    <>
                        <div className="deck-shadow"></div>
                        <Card card={currentState.deckOfCards[1]} className="duplicate" />
                    </>
                }
                {currentState.deckOfCards[0] === null ? null :
                    <Card card={currentState.deckOfCards[0]} className={animation} handleGuess={handleGuess} />
                }
            </div>
            <div className="main-player" id="main-player">
                <div className="name desktop-view">Your name - {currentState.players[mainPlayerIndex].name}</div>
                <Card card={currentState.players[mainPlayerIndex].card} handleGuess={null} />
                <div className="mobile-view-group">
                    <div className="name mobile-view">Your name - {currentState.players[mainPlayerIndex].name}</div>
                    <div className="score">score: {currentState.players[mainPlayerIndex].score}</div>
                </div>
            </div>
        </div>
    );
}

export default GameInProgress;

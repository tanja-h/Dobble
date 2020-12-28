import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import './gameInProgress.scss';

function GameInProgress({ socket, player, gameState }) {
    const mainPlayerIndex = player.number - 1;
    const opponentPlayerIndex = 2 - player.number;

    const [currentState, setCurrentState] = useState(gameState);
    const [lastMove, setLastMove] = useState(false);
    const [animation, setAnimation] = useState('');
    const [oldCard, setOldCard] = useState(gameState.deckOfCards[0]);
    const [animationCard, setAnimationCard] = useState(gameState.deckOfCards[0]);
    const [shadow, setShadow] = useState(-43);

    useEffect(() => {
        console.log('useeffect za gamestate - ', animation);
        if (gameState.gameStatus === 'active' || gameState.gameStatus === 'finished') {
            console.log(gameState.status);
            let playerScoredUp;
            const firstPlayerScores = [currentState.players[0].score, gameState.players[0].score];

            if (firstPlayerScores[0] !== firstPlayerScores[1]) {
                console.log('animacija 1-1');
                playerScoredUp = 1;
            } else {
                console.log('animacija 1-2');
                playerScoredUp = 2
            }
            setOldCard(currentState.players[playerScoredUp - 1].card);
            setAnimationCard(gameState.players[playerScoredUp - 1].card);
            handleCardAnimation(playerScoredUp);
            moveShadow();
        }

        if (gameState.deckOfCards.length <= 1) {
            setLastMove(true);
        }

        setCurrentState(gameState);
        console.log('postavljen novi current state');
    }, [gameState]);

    useEffect(() => {
        console.log('useeffect animacija 3', animation);
        const timer = setTimeout(() => {
            if (animation !== '') {
                setAnimation('');
                console.log('animacija empty', animation);
            }
        }, 700);

        return () => {
            clearTimeout(timer);
        }
    }, [animation]);

    const moveShadow = () => {
        if (document.getElementById('shadow')){  
            document.getElementById('shadow').style.transform = `translate(calc(${shadow}px + 0.7px))`;
            setShadow(prevShadow => prevShadow + 0.7);
        }
    }

    const handleCardAnimation = (winner) => {
        console.log('handle animacija 2', winner);
        if (winner === player.number) {
            setAnimation('down');
        } else {
            setAnimation('up');
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
                    <div className="name">Opponent - {gameState.players[opponentPlayerIndex].name}</div>
                    <div className="score mobile-view">score: {gameState.players[opponentPlayerIndex].score}</div>
                </div>
                {animation === 'up' ? <Card card={oldCard}/> : <Card card={gameState.players[opponentPlayerIndex].card}/>}
                <div className="score desktop-view">score: {gameState.players[opponentPlayerIndex].score}</div>
            </div>
            <div className="deck-of-cards" id="deck-of-cards">
                {lastMove ? null : <div id="shadow" className="deck-shadow"></div>}
                {gameState.deckOfCards.length === 0 ? null :
                    <Card card={gameState.deckOfCards[0]} handleGuess={handleGuess} />
                }
                <Card card={animationCard} className={`animation ${animation}`} />
            </div>
            <div className="main-player" id="main-player">
                <div className="name desktop-view">Your name - {gameState.players[mainPlayerIndex].name}</div>
                {animation === 'down' ? <Card card={oldCard}/> : <Card card={gameState.players[mainPlayerIndex].card}/>}
                <div className="mobile-view-group">
                    <div className="name mobile-view">Your name - {gameState.players[mainPlayerIndex].name}</div>
                    <div className="score">score: {gameState.players[mainPlayerIndex].score}</div>
                </div>
            </div>
        </div>
    );
}

export default GameInProgress;

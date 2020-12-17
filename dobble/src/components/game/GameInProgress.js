import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import './gameInProgress.scss';

function GameInProgress({ socket, player, gameState }) {
    const mainPlayerIndex = player.number - 1;
    const opponentPlayerIndex = 2 - player.number;
    const [lastCard, setLastCard] = useState(false);

    useEffect(() => {
        if (gameState.deckOfCards.length === 1) {
            setLastCard(true);
        }
    }, [gameState]);

    const handleGuess = (element) => {
        console.log('guess', element);
        socket.emit('guessElement', element);
    }

    const handleDisableGuessing = (element) => {
        console.log('wrong deck', element);
    }

    return (
        <div className="container">
            <div className="opponent">
                <div className="name">Opponent - {gameState.players[opponentPlayerIndex].name}</div>
                <Card card={gameState.players[opponentPlayerIndex].card} handleGuess={handleDisableGuessing} />
                <div className="score">score: {gameState.players[opponentPlayerIndex].score}</div>
            </div>
            <div className="deck-of-cards">
                <Card
                    card={gameState.deckOfCards[0]}
                    handleGuess={gameState.gameStatus === 'finished' ? handleDisableGuessing : handleGuess} />
                {lastCard ? null : <div className="deck"></div>}
            </div>
            <div className="main-player">
                <div className="name">Main player - {gameState.players[mainPlayerIndex].name}</div>
                <Card card={gameState.players[mainPlayerIndex].card} handleGuess={handleDisableGuessing} />
                <div className="score">score: {gameState.players[mainPlayerIndex].score}</div>
            </div>
        </div>
    );
}

// const [cards, setCards] = useState(SAMPLE_CARDS);
// const SAMPLE_CARDS = [
//     {
//         id: 0,
//         elements: [2, 3, 4, 5, 1, 6, 7, 8]
//     },
//     {
//         id: 1,
//         elements: [9, 10, 11, 12, 13, 14, 15, 1]
//     },
//     {
//         id: 2,
//         elements: [16, 17, 1, 18, 19, 20, 21, 22]
//     }
// ]

export default GameInProgress

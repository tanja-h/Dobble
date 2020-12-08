import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import { PlayerContext } from '../../context/PlayerContext';
// import { algorithm, shuffleCards } from './algorithm';

import './slike.scss';

function Slike({ socket, players, newCards }) {
    const [lastCard, setLastCard] = useState(false);
    const [cards, setCards] = useState(SAMPLE_CARDS);

    const [player, setPlayer] = useContext(PlayerContext);

    useEffect(() => {
        setCards(newCards);
        console.log("socket id", socket.id);
    }, [])

    const handleGuess = () => {
        // socket.emit('guess', );
        console.log("klik");
    }

    return (
        // <div>
        //     <div className="card-grid">
        //         {cards.map(card => (
        //             <Card card={card} key={card.id} />
        //         ))}
        //     </div>
        // </div>

        <div className="container">
            <div className="opponent">
                <div className="name">Opponent - {players[2 - player.number].name}</div>
                <Card card={cards[1]} />
                <div className="score">score: {players[2 - player.number].score}</div>
            </div>
            <div className="deck-of-cards">
                <Card card={cards[2]} handleGuess={handleGuess}/>
                {lastCard ? null : <div className="deck"></div>}
            </div>
            <div className="main-player">
                <div className="name">Main player - {players[player.number - 1].name}</div>
                <Card card={cards[0]} />
                <div className="score">score: {players[player.number - 1].score}</div>
            </div>
        </div>
    );
}

const SAMPLE_CARDS = [
    {
        id: 0,
        elements: [2, 3, 4, 5, 1, 6, 7, 8]
    },
    {
        id: 1,
        elements: [9, 10, 11, 12, 13, 14, 15, 1]
    },
    {
        id: 2,
        elements: [16, 17, 1, 18, 19, 20, 21, 22]
    }
]

export default Slike

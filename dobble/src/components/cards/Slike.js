import React, { useState, useEffect } from 'react';
import { algorithm, shuffleCards } from './algorithm';
import Card from './Card';

import './slike.scss';

function Slike() {
    const [lastCard, setLastCard] = useState(false);
    const [cards, setCards] = useState(SAMPLE_CARDS);

    // useEffect(() => {
    //     setCards(algorithm());
    // }, [])

    return (
        // <div>
        //     <button onClick={shuffleCards}>Shuffle cards</button>
        //     <div className="card-grid">
        //         {cards.map(card => (
        //             <Card card={card} key={card.id} />
        //         ))}
        //     </div>
        // </div>

        <div className="container">
            <div className="opponent">
                <div className="name">Opponent</div>
                <Card card={cards[1]} />
                <div className="score">score: 13</div>
            </div>
            <div className="deck-of-cards">
                <Card card={cards[2]} />
                {lastCard ? null : <div className="deck"></div>}
            </div>
            <div className="main-player">
                <div className="name">main player</div>
                <Card card={cards[0]} />
                <div className="score">score: 10</div>
            </div>
            <button onClick={() => setCards(shuffleCards(cards))}>Shuffle cards</button>
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

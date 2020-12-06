import React, { useState, useEffect } from 'react';
import Card from '../cards/Card';
import '../cards/slike.scss';

function GameStarted({ socket, players, newCards }) {
    // const [players, setPlayers] = useState([]);
    const [cards, setCards] = useState([]);

    // setPlayer({
    //     ...player, id: socket.id
    // });
    // console.log(player);

    useEffect(() => {
        setCards(newCards);
    }, [])

    return (
        <div className="gameStarted">
            <p>Player name: {players[0].name}</p>
            <p>{socket.id}</p>
            {/* <ul>
                {players.map((player, id) => (
                    <li key={id}>
                        <h3>{player.name}</h3>
                    </li>
                ))}
            </ul> */}
            <div className="card-grid">
                {cards.map(card => (
                    <Card card={card} key={card.id} />
                ))}
            </div>
        </div>
    );
}

export default GameStarted

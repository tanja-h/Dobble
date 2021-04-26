import React from 'react';

function GameWaiting({ player, gameCode }) {

    return (
        <div className="gameWaiting">
            <p>Welcome <b>{player.name}</b></p>
            <p>Your game code is: <b>{gameCode}</b></p>
            <p>Waiting for the other player . . .</p>
            <div className="loading-spinner"></div>
        </div>
    );
}

export default GameWaiting

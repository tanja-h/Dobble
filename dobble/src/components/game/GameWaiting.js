import React from 'react';

function GameWaiting({ player, gameCode }) {

    return (
        <div className="gameWaiting">
            <p>Welcome {player.name}</p>
            <p>Your game code is: {gameCode}</p>
            {/* <p>Waiting for players...</p> */}
        </div>
    );
}

export default GameWaiting

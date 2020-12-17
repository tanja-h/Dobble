const { createNewDeck } = require("./Algorithm");

function createGameState(playersArray) {
    let newCards = createNewDeck();
    const firstCards = newCards.splice(0, 2);

    return {
        players: [{
            name: playersArray[0].name,
            card: firstCards[0],
            score: 0
        },
        {
            name: playersArray[1].name,
            card: firstCards[1],
            score: 0
        }],
        deckOfCards: newCards,
        gameStatus: 'started',
        winner: null
    }
}

function findMatchingElement(centralCard, playerCard) {
    let match = -1;
    centralCard.elements.forEach(elementC => {
        playerCard.elements.forEach(elementP => {
            if (elementC == elementP) {
                match = elementC;
            }
        })

    });
    return match;
}

function updateGameState(gameState, playerIndex) {
    gameState.players[playerIndex].score += 1;

    // gameState.gameStatus = 'finished';
    // gameState.winner = playerIndex + 1;

    if (gameState.deckOfCards.length == 1) {
        gameState.gameStatus = 'finished';
        gameState.winner = gameState.players[0].score > gameState.players[1].score ? 1 : 2;
    } else {
        gameState.players[playerIndex].card = gameState.deckOfCards.shift();
        gameState.gameStatus = 'active';
    }

    return gameState;
}

module.exports = { createGameState, findMatchingElement, updateGameState }
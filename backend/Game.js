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
        gameStatus: 'started'
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
    if (gameState.deckOfCards.length == 1) {
        const winner = gameState.players[0].score > gameState.players[1].score ? 1 : 2;
        return { winner };
    }

    gameState.players[playerIndex].card = gameState.deckOfCards.shift();
    gameState.players[playerIndex].score += 1;
    gameState.gameState = 'active';
    return { gameState };
}

module.exports = { createGameState, findMatchingElement, updateGameState }
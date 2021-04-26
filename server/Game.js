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

function updateGameState(gameState, playerNumber) {
    // gameState.gameStatus = 'finished';
    // gameState.winner = playerNumber;
    gameState.players[playerNumber - 1].card = gameState.deckOfCards.shift();
    gameState.players[playerNumber - 1].score += 1;

    if (gameState.deckOfCards.length == 0) {
        gameState.gameStatus = 'finished';
        gameState.winner = gameState.players[0].score > gameState.players[1].score ? 1 : 2;
    } else {
        gameState.gameStatus = 'active';
    }

    return gameState;
}

const EXAMPLE_STATE = {
    "players": [
        { "name": "tanja", "card": { "id": 18, "elements": [37, 36, 3, 20, 28, 53, 45, 12] }, "score": 0 },
        { "name": "jasmina", "card": { "id": 24, "elements": [40, 51, 49, 29, 4, 11, 31, 20] }, "score": 0 }
    ],
    "deckOfCards": [{ "id": 40, "elements": [13, 47, 28, 6, 51, 43, 17, 32] }],
    "gameStatus": "started",
    "winner": null
}

module.exports = { createGameState, findMatchingElement, updateGameState }
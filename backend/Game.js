// function initGame(players, newCards) {
//     const state = createGameState(players, newCards);
//     return state;
// }
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
        gameActive: true
    }
}

function getUpdatedCards() {}

module.exports = { createGameState, getUpdatedCards }
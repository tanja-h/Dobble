function initGame(newCards) {
    const state = createGameState(newCards);
    return state;
}

function createGameState(cards) {
    return {
        players: [{
            card: cards[0],
            score: 0
        },
        {
            card: cards[1],
            score: 0
        }],
        deckOfCards: cards.splice(0,2),
        gameActive: true
    }
}

function getUpdatedCards() {

}

module.exports = { initGame, getUpdatedCards }
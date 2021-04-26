const algorithm = () => {
    var N = 8;      // number of symbols on each card
    let cards = [];     // array of series (cards)

    for (let i = 0; i <= N - 1; i++) {
        let c = [];
        c.push(1);
        for (let i2 = 1; i2 <= N - 1; i2++) {
            c.push((N - 1) + (N - 1) * (i - 1) + (i2 + 1));
        }
        let card = {
            id: cards.length,
            elements: c
        }

        cards.push(card);
    }

    for (let i = 1; i <= N - 1; i++) {
        for (let i2 = 1; i2 <= N - 1; i2++) {
            let c = [];
            c.push(i + 1);
            for (let i3 = 1; i3 <= N - 1; i3++) {
                c.push((N + 1) + (N - 1) * (i3 - 1) + (((i - 1) * (i3 - 1) + (i2 - 1))) % (N - 1));
            }
            let card = {
                id: cards.length,
                elements: c
            }

            cards.push(card);
        }
    }
    return cards;
}



const shuffleArray = (oldArray) => {
    let newArray = [...oldArray]
    for (let i = newArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
    return newArray;
}

const shuffleCards = (cards) => {
    //1.shuffling elements
    let newCards = [];
    cards.forEach(card => {
        let c = {
            id: card.id,
            elements: shuffleArray(card.elements)
        }
        newCards.push(c);
    })

    //2.shufling all cards
    return shuffleArray(newCards);
}

const createNewDeck = () => {
    let newDeck = shuffleCards(algorithm());
    return newDeck;
}

module.exports = { createNewDeck }
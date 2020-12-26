import React from 'react';
import { Link } from 'react-router-dom'
import Card from '../card/Card';
import './rules.scss'

function Rules() {
    return (
        <div className="rules">
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
            </ul>
            <hr />
            <ol className="about">
                <li>
                    <p>What is Dobble? </p>
                    <p>
                        Dobble is a multiplayer speedy observation game consisting of 57 cards, each containing 8 symbols. Each card is unique and has only one symbol in common with any other card in the deck. Get ready to find matching symbols while testing your eyes and reflexes :) .
                    </p>
                </li>
                <li>
                    <p>Goal of the game</p>
                    <p>
                        Be the fastest player to find the identical between most of the cards.
                    </p>
                </li>
                <li>
                    <p>Instructions</p>
                    <p>
                        Each player is dealt one card facing up. The remaining cards are in the middle facing up. The cards are drawn from that pile. How to play? Players try to spot the same symbol on their card and the card on the central pile. As soon as one player sees it, he clicks on the central card and gets a card from the central pile above his card. Now the player looks at his new card at the top and looks for the same symbol on the new central card. The game lasts until all cards from the middle are used up. The player who collects the most cards wins.
                    </p>
                </li>
                <li>
                    <p>Starting the game</p>
                    <p>
                        Before starting the game, change your name on the Home page. Press Start New Game button to enter the game. You will get a code to share with the other player. The other player enters the code in the input field and presses the Join Game button.
                    </p>
                </li>
                {/* <li>
                    <p>Tie?</p> //nereseno
                    <p>Na kraju igre, igrači koji imaju nerešeni rezultat idu u dvoboj. Nasumično se otkrivaju dve karte i igrač koji prvi uoči identičan simbol odnosi pobedu.</p>
                </li> */}
            </ol>
            <div className="game-example">
                <p>Game example</p>
                <div id="first-card" className="player-card">
                    <h5>YOUR OPPONENT</h5>
                    <Card card={EXAMPLE_CARDS[0]} handleGuess={null} />
                </div>
                <div id="second-card">
                    <Card card={EXAMPLE_CARDS[1]} handleGuess={null} />
                </div>
                <div id="third-card" className="player-card">
                    <Card card={EXAMPLE_CARDS[2]} handleGuess={null} />
                    <h5>YOU</h5>
                </div>
            </div>
        </div>
    );
}

const EXAMPLE_CARDS = [
    {
        id: 0,
        elements: [2, 3, 1, 4, 5, 6, 7, 8]
    },
    {
        id: 1,
        elements: [13, 10, 11, 12, 1, 14, 15, 16]
    },
    {
        id: 2,
        elements: [17, 18, 20, 15, 21, 22, 23, 24]
    }
]

export default Rules;

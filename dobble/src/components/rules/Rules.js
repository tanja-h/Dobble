import React from 'react';
import { Link } from 'react-router-dom'
import './rules.scss'

function Rules() {
    return (
        <div className="rules">
            Rules
            <hr />
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
            </ul>
            <hr />
            <ol className="list">
                <li className="list-item">
                    <p>What is Dobble? </p>
                    <p>Dobble is a speedy observation game consisting of 57 cards, each containing 8 symbols.
                    Each card is unique and has only one symbol in common with any other card in the deck.
                    Get ready to find matching symbols while testing your eyes and reflexes :) .
                    {/* Dobble creates excitement for children and adults alike while keeping every player involved in the action. */}
                    </p>
                </li>
                <li>
                    <p>Goal of the game</p>
                    <p>Be the fastest player to find the identical symbol between most of the cards.</p>
                </li>
                <li>
                    <p>Instructions</p>
                    <p>Each player is dealt one card facing up. The remaining cards are in the middle facing up.
                    The cards are drawn from that pile. How to play? Players try to spot the same symbol on their
                    card and the card on the central pile. As soon as one player sees it, he clicks on it and gets
                    a card from the central pile above his card. Now the player looks at his new card at the top
                    and looks for the same symbol on the new center card. The game lasts until all cards from
                    the middle are used up. The player who collects the most cards wins.</p>
                </li>
                {/* <li>
                    <p>Tie?</p> //nereseno
                    <p>Na kraju igre, igrači koji imaju nerešeni rezultat idu u dvoboj. Nasumično se otkrivaju dve karte i igrač koji prvi uoči identičan simbol odnosi pobedu.</p>
                </li> */}
            </ol>
        </div>
    );
}

export default Rules;

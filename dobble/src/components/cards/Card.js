import React from 'react';
import images from './ElementImages';


function Card({ card, handleGuess }) {

    return (
        <div className="card">
            {card.elements.map(element =>
                <div className="card-element" key={element}>
                    {/* {element} */}
                    <img
                        src={images[`${element}.png`]}
                        alt={element}
                        onClick={handleGuess}
                    />
                </div>
            )}
        </div>
    );
}

export default Card

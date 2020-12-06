import React from 'react';
import images from './ElementImages';


function Card({ card }) {

    return (
        <div className="card">
            {card.elements.map(element =>
                <div className="card-element" key={element}>
                    {/* {element} */}
                    <img src={images[`${element}.png`]} alt={element} />
                </div>
            )}
        </div>
    );
}

export default Card
